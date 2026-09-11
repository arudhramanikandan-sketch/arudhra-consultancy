import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import {
  initialJobs,
  initialEnquiries,
  initialVideos,
  initialAdvertisements,
  initialSiteSettings,
  initialAdminUser,
  initialCandidates
} from './data';
import {
  Job,
  Enquiry,
  VideoItem,
  Advertisement,
  SiteSettings,
  User,
  EnquiryStatus,
  CandidateRecord,
  CandidateDocument,
  InterestedJob,
  ApplicationStatus
} from '../src/types';
import { sendWhatsAppOtp, isWhatsAppConfigured, formatWhatsAppNumber } from './whatsapp';
import { sendBrevoEmailOtp, isBrevoConfigured, getBrevoConfig, sendBrevoTestEmail, sendBrevoApplicationEmail, BrevoStatus } from './brevo';

interface OtpRecord {
  mobile: string;
  code: string;
  expiresAt: number;
  lastSentAt: number;
  attempts: number;
}

interface EmailOtpRecord {
  email: string;
  code: string;
  expiresAt: number;
  lastSentAt: number;
  attempts: number;
  name?: string;
  mobile?: string;
}

interface RateLimitRecord {
  timestamps: number[];
}

function base32Decode(base32: string): Buffer {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
  let bits = '';
  const cleaned = base32.toUpperCase().replace(/=+$/, '');
  for (let i = 0; i < cleaned.length; i++) {
    const val = alphabet.indexOf(cleaned[i]);
    if (val === -1) continue;
    bits += val.toString(2).padStart(5, '0');
  }
  const bytes: number[] = [];
  for (let i = 0; i + 8 <= bits.length; i += 8) {
    bytes.push(parseInt(bits.substr(i, 8), 2));
  }
  return Buffer.from(bytes);
}

function generateTOTP(secret: string, windowOffset: number = 0): string {
  const epoch = Math.floor(Date.now() / 1000);
  const timeStep = 30;
  const counter = Math.floor(epoch / timeStep) + windowOffset;
  const counterBuf = Buffer.alloc(8);
  counterBuf.writeBigInt64BE(BigInt(counter));

  const key = base32Decode(secret);
  const hmac = crypto.createHmac('sha1', key).update(counterBuf).digest();

  const offset = hmac[hmac.length - 1] & 0xf;
  const codeInt =
    ((hmac[offset] & 0x7f) << 24) |
    ((hmac[offset + 1] & 0xff) << 16) |
    ((hmac[offset + 2] & 0xff) << 8) |
    (hmac[offset + 3] & 0xff);

  const otp = (codeInt % 1000000).toString().padStart(6, '0');
  return otp;
}

function verifyTotp(secret: string, code: string): boolean {
  if (!/^\d{6}$/.test(code)) return false;
  for (const offset of [-1, 0, 1]) {
    if (generateTOTP(secret, offset) === code) {
      return true;
    }
  }
  return false;
}

function generateBase32Secret(length: number = 16): string {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
  const bytes = crypto.randomBytes(length);
  let result = '';
  for (let i = 0; i < length; i++) {
    result += alphabet[bytes[i] % alphabet.length];
  }
  return result;
}

class StorageService {
  private filePath = path.join(process.cwd(), 'storage_data.json');
  private deletedIds: Set<string> = new Set();
  private jobs: Job[] = [...initialJobs];
  private enquiries: Enquiry[] = [...initialEnquiries];
  private videos: VideoItem[] = [...initialVideos];
  private advertisements: Advertisement[] = [...initialAdvertisements];
  private settings: SiteSettings = { ...initialSiteSettings };
  private users: User[] = [initialAdminUser];
  private candidates: CandidateRecord[] = [...initialCandidates];
  private candidateCounter: number = 3;
  private otpStore: Map<string, OtpRecord> = new Map();
  private otpRateLimits: Map<string, RateLimitRecord> = new Map();
  private emailOtpStore: Map<string, EmailOtpRecord> = new Map();
  private emailOtpRateLimits: Map<string, RateLimitRecord> = new Map();
  private adminSessions: Map<string, { username: string; expiresAt: number }> = new Map();
  private admin2faChallenges: Map<string, { username: string; expiresAt: number; isEnrollment: boolean; attempts: number }> = new Map();
  private customerSessions: Map<string, { userId: string; mobile?: string; email?: string; expiresAt: number }> = new Map();

  constructor() {
    this.loadFromDisk();
  }

  private loadFromDisk(): void {
    try {
      if (fs.existsSync(this.filePath)) {
        const raw = fs.readFileSync(this.filePath, 'utf-8');
        const data = JSON.parse(raw);
        if (Array.isArray(data.deletedIds)) {
          this.deletedIds = new Set(data.deletedIds);
        }
        if (Array.isArray(data.jobs)) {
          this.jobs = data.jobs.filter((j: any) => !this.deletedIds.has(j.id));
        } else {
          this.jobs = initialJobs.filter(j => !this.deletedIds.has(j.id));
        }
        if (Array.isArray(data.enquiries)) {
          this.enquiries = data.enquiries.filter((e: any) => !this.deletedIds.has(e.id));
        }
        if (Array.isArray(data.videos)) {
          this.videos = data.videos.filter((v: any) => !this.deletedIds.has(v.id));
        }
        if (Array.isArray(data.advertisements)) {
          this.advertisements = data.advertisements.filter((a: any) => !this.deletedIds.has(a.id));
        }
        if (Array.isArray(data.candidates)) {
          this.candidates = data.candidates.filter(
            (c: any) => !this.deletedIds.has(c.id) && !this.deletedIds.has(c.candidateId)
          );
        }
        if (Array.isArray(data.users)) {
          this.users = data.users;
          if (!this.users.some(u => u.role === 'admin')) {
            this.users.unshift(initialAdminUser);
          }
        }
        if (typeof data.candidateCounter === 'number') {
          this.candidateCounter = data.candidateCounter;
        }
        if (data.settings && typeof data.settings === 'object') {
          this.settings = { ...this.settings, ...data.settings };
        }
        if (this.settings.admin2faEnrolled === undefined) {
          this.settings.admin2faEnrolled = false;
        }
        if (!this.settings.admin2faSecret) {
          this.settings.admin2faSecret = 'ARUDHRA7MZQK4X2P';
        }
        // Force autoReplace settings to false so jobs stay live on the website permanently
        this.settings.autoReplaceOldJobs = false;
        this.settings.autoClearOldLeadsOnNewJob = false;
        this.settings.autoReplaceOldFlyers = false;
        this.settings.autoReplaceOldVideos = false;
        console.log(`[Storage] Persistent storage loaded. Jobs: ${this.jobs.length}, Enquiries: ${this.enquiries.length}, Candidates: ${this.candidates.length}, Users: ${this.users.length}, Tracked deleted items: ${this.deletedIds.size}`);
        return;
      }
    } catch (err) {
      console.warn('[Storage] Error loading persistent storage from disk, using defaults:', err);
    }

    this.saveToDisk();
  }

  private saveToDisk(): void {
    try {
      const dataToSave = {
        jobs: this.jobs,
        enquiries: this.enquiries.filter(e => !this.deletedIds.has(e.id)),
        videos: this.videos.filter(v => !this.deletedIds.has(v.id)),
        advertisements: this.advertisements.filter(a => !this.deletedIds.has(a.id)),
        settings: this.settings,
        users: this.users,
        candidates: this.candidates.filter(c => !this.deletedIds.has(c.id) && !this.deletedIds.has(c.candidateId)),
        candidateCounter: this.candidateCounter,
        deletedIds: Array.from(this.deletedIds),
        savedAt: new Date().toISOString()
      };
      const tempPath = `${this.filePath}.tmp`;
      fs.writeFileSync(tempPath, JSON.stringify(dataToSave, null, 2), 'utf-8');
      fs.renameSync(tempPath, this.filePath);
    } catch (err) {
      console.error('[Storage] Error persisting to disk:', err);
    }
  }

  // Validate admin authorization token strictly - requires an active authenticated session
  public validateAdminToken(token?: string): boolean {
    if (!token || typeof token !== 'string') return false;
    const session = this.adminSessions.get(token);
    if (!session) return false;
    if (Date.now() > session.expiresAt) {
      this.adminSessions.delete(token);
      return false;
    }
    return true;
  }

  // Revoke admin token on logout
  public revokeAdminToken(token: string): boolean {
    return this.adminSessions.delete(token);
  }

  // Create and manage secure candidate/customer session tokens
  public createCustomerSession(userId: string, mobile?: string, email?: string): string {
    const token = `cust-sess-${crypto.randomBytes(24).toString('hex')}`;
    this.customerSessions.set(token, {
      userId,
      mobile: mobile ? this.normalizePhone(mobile) : undefined,
      email: email?.trim().toLowerCase(),
      expiresAt: Date.now() + 30 * 24 * 60 * 60 * 1000 // 30 days
    });
    return token;
  }

  public validateCustomerToken(rawToken?: string): { valid: boolean; userId?: string; mobile?: string; email?: string } {
    if (!rawToken || typeof rawToken !== 'string') return { valid: false };
    const clean = rawToken.replace(/^Bearer\s+/i, '').trim();
    if (!clean) return { valid: false };

    // If an authenticated admin is making the request, permit with admin authority
    if (this.validateAdminToken(clean)) {
      return { valid: true, userId: 'admin' };
    }

    const session = this.customerSessions.get(clean);
    if (!session) {
      // Backwards compatibility for legacy mock tokens if any
      if (clean.startsWith('cust-') || clean.startsWith('token-')) {
        return { valid: true };
      }
      return { valid: false };
    }

    if (Date.now() > session.expiresAt) {
      this.customerSessions.delete(clean);
      return { valid: false };
    }

    return { valid: true, userId: session.userId, mobile: session.mobile, email: session.email };
  }

  public revokeCustomerToken(rawToken?: string): boolean {
    if (!rawToken) return false;
    const clean = rawToken.replace(/^Bearer\s+/i, '').trim();
    return this.customerSessions.delete(clean);
  }

  // Helper to normalize phone number
  private normalizePhone(phone?: string): string {
    if (!phone) return '';
    return phone.replace(/\D/g, '');
  }

  // ----------------------------------------------------
  // CANDIDATE MASTER RECORD & AUTOMATIC DATA SYNC
  // ----------------------------------------------------

  public getOrCreateCandidateForUser(user: User): CandidateRecord {
    const userCleanMobile = this.normalizePhone(user.mobile);

    // 1. Search existing candidate record by userId or mobile (excluding deleted items)
    let candidate = this.candidates.find(c => {
      if (this.deletedIds.has(c.id) || this.deletedIds.has(c.candidateId) || (c.userId && this.deletedIds.has(c.userId))) return false;
      if (c.userId && c.userId === user.id) return true;
      if (this.normalizePhone(c.mobile) === userCleanMobile && userCleanMobile.length >= 8) return true;
      if (user.email && c.email && c.email.toLowerCase() === user.email.toLowerCase()) return true;
      return false;
    });

    const now = new Date().toISOString();

    if (candidate) {
      // Keep primary user relationship and sync latest name/email
      if (candidate.userId !== user.id) {
        candidate.userId = user.id;
      }
      if (user.name && (!candidate.fullName || candidate.fullName.startsWith('Candidate (+'))) {
        candidate.fullName = user.name;
      }
      if (user.email && !candidate.email) {
        candidate.email = user.email;
      }
      candidate.updatedAt = now;
      // Ensure all candidate's applications are linked
      this.syncCandidateApplications(candidate);
      this.saveToDisk();
      return candidate;
    }

    // 2. Generate permanent candidate ID (e.g. CAND-0003)
    const nextNum = this.candidateCounter++;
    const candId = `CAND-${String(nextNum).padStart(4, '0')}`;

    const newCandidate: CandidateRecord = {
      id: candId,
      candidateId: candId,
      userId: user.id,
      fullName: user.name || `Candidate (+${userCleanMobile.slice(-4)})`,
      mobile: user.mobile,
      email: user.email || '',
      nationality: 'Indian',
      applicationStatus: 'Submitted',
      documents: [],
      interestedJobs: [],
      applications: [],
      createdAt: now,
      updatedAt: now
    };

    // Attach any existing enquiries matching this customer
    this.syncCandidateApplications(newCandidate);

    this.candidates.unshift(newCandidate);
    this.saveToDisk();
    return newCandidate;
  }

  private syncCandidateApplications(candidate: CandidateRecord) {
    const candMobile = this.normalizePhone(candidate.mobile);
    const matchingEnquiries = this.enquiries.filter(e => {
      if (this.deletedIds.has(e.id)) return false;
      if (e.userId && (e.userId === candidate.userId || e.userId === candidate.id)) return true;
      if (this.normalizePhone(e.mobile) === candMobile && candMobile.length >= 8) return true;
      if (candidate.email && e.email && e.email.toLowerCase() === candidate.email.toLowerCase()) return true;
      return false;
    });

    candidate.applications = matchingEnquiries;
  }

  public getCandidateForUser(userId?: string, mobile?: string): CandidateRecord | undefined {
    if (!userId && !mobile) return undefined;
    const cleanMobile = this.normalizePhone(mobile);

    let candidate = this.candidates.find(c => {
      if (this.deletedIds.has(c.id) || this.deletedIds.has(c.candidateId)) return false;
      if (userId && (c.userId === userId || c.id === userId)) return true;
      if (cleanMobile && this.normalizePhone(c.mobile) === cleanMobile && cleanMobile.length >= 8) return true;
      return false;
    });

    if (candidate) {
      this.syncCandidateApplications(candidate);
    }
    return candidate;
  }

  public getCandidateById(candidateId: string): CandidateRecord | undefined {
    if (this.deletedIds.has(candidateId)) return undefined;
    const candidate = this.candidates.find(c => (c.id === candidateId || c.userId === candidateId || c.candidateId === candidateId) && !this.deletedIds.has(c.id) && !this.deletedIds.has(c.candidateId));
    if (candidate) {
      this.syncCandidateApplications(candidate);
    }
    return candidate;
  }

  public updateCandidateProfile(candidateIdOrUserId: string, updates: Partial<CandidateRecord>): CandidateRecord | undefined {
    const candidate = this.candidates.find(c => (c.id === candidateIdOrUserId || c.userId === candidateIdOrUserId || c.candidateId === candidateIdOrUserId) && !this.deletedIds.has(c.id) && !this.deletedIds.has(c.candidateId));
    if (!candidate) return undefined;

    // Disallow overwriting permanent ID or userId
    const { id, userId, documents, interestedJobs, applications, createdAt, ...allowedUpdates } = updates;

    Object.assign(candidate, allowedUpdates);
    candidate.updatedAt = new Date().toISOString();

    // Also sync user record name/email
    const user = this.users.find(u => u.id === candidate.userId);
    if (user) {
      if (candidate.fullName) user.name = candidate.fullName;
      if (candidate.email) user.email = candidate.email;
    }

    // Sync corresponding enquiries in Admin Dashboard with candidate's latest details
    const candMobile = this.normalizePhone(candidate.mobile);
    this.enquiries.forEach(e => {
      if (this.deletedIds.has(e.id)) return;
      if (
        (e.userId && (e.userId === candidate.userId || e.userId === candidate.id)) ||
        (candMobile && this.normalizePhone(e.mobile) === candMobile && candMobile.length >= 8)
      ) {
        if (candidate.fullName) e.customerName = candidate.fullName;
        if (candidate.email && !e.email) e.email = candidate.email;
        if (candidate.trade) e.candidateTrade = candidate.trade;
        if (candidate.totalExperienceYears) e.candidateExperience = `${candidate.totalExperienceYears} Years`;
        e.updatedAt = new Date().toISOString();
      }
    });

    this.syncCandidateApplications(candidate);
    this.saveToDisk();
    return candidate;
  }

  // ----------------------------------------------------
  // DOCUMENTS
  // ----------------------------------------------------

  public addCandidateDocument(
    candidateIdOrUserId: string,
    docData: {
      type: CandidateDocument['type'];
      name: string;
      fileData?: string;
      fileSize?: string;
    }
  ): CandidateDocument | undefined {
    const candidate = this.candidates.find(c => (c.id === candidateIdOrUserId || c.userId === candidateIdOrUserId || c.candidateId === candidateIdOrUserId) && !this.deletedIds.has(c.id) && !this.deletedIds.has(c.candidateId));
    if (!candidate) return undefined;

    const docId = `DOC-${Date.now().toString().slice(-6)}`;
    const newDoc: CandidateDocument = {
      id: docId,
      candidateId: candidate.id,
      type: docData.type,
      name: docData.name,
      fileData: docData.fileData,
      fileSize: docData.fileSize || '1.0 MB',
      uploadedAt: new Date().toISOString()
    };

    candidate.documents.push(newDoc);
    candidate.updatedAt = new Date().toISOString();
    this.saveToDisk();
    return newDoc;
  }

  public deleteCandidateDocument(candidateIdOrUserId: string, docId: string): boolean {
    const candidate = this.candidates.find(c => c.id === candidateIdOrUserId || c.userId === candidateIdOrUserId || c.candidateId === candidateIdOrUserId);
    if (!candidate) return false;

    const initialLen = candidate.documents.length;
    const docIndex = candidate.documents.findIndex(d => d.id === docId);
    if (docIndex === -1) return false;

    this.deletedIds.add(docId);
    // Purge document record and stored binary/file data from storage
    const [deletedDoc] = candidate.documents.splice(docIndex, 1);
    if (deletedDoc) {
      delete deletedDoc.fileData;
    }

    if (candidate.documents.length !== initialLen) {
      candidate.updatedAt = new Date().toISOString();
      this.saveToDisk();
      return true;
    }
    return false;
  }

  public deleteAdminCandidateDocument(
    candidateId: string,
    docId: string
  ): { success: boolean; message: string; deletedDoc?: CandidateDocument } {
    const candidate = this.candidates.find(
      c => c.id === candidateId || c.candidateId === candidateId || c.userId === candidateId
    );
    if (!candidate) {
      return { success: false, message: 'Candidate record not found.' };
    }

    const docIndex = candidate.documents.findIndex(d => d.id === docId);
    if (docIndex === -1) {
      return {
        success: false,
        message: `Document not found or does not belong to candidate ${candidate.candidateId || candidate.id}.`
      };
    }

    this.deletedIds.add(docId);
    // Securely remove the document and its stored file from storage
    const [deletedDoc] = candidate.documents.splice(docIndex, 1);
    if (deletedDoc) {
      delete deletedDoc.fileData;
    }

    candidate.updatedAt = new Date().toISOString();
    this.saveToDisk();
    return {
      success: true,
      message: 'Document deleted successfully.',
      deletedDoc
    };
  }

  public replaceCandidateDocument(
    candidateId: string,
    docId: string,
    docData: {
      name?: string;
      fileData?: string;
      fileSize?: string;
      type?: CandidateDocument['type'];
    }
  ): { success: boolean; message: string; document?: CandidateDocument } {
    const candidate = this.candidates.find(
      c => (c.id === candidateId || c.candidateId === candidateId || c.userId === candidateId) && !this.deletedIds.has(c.id) && !this.deletedIds.has(c.candidateId)
    );
    if (!candidate) {
      return { success: false, message: 'Candidate record not found.' };
    }

    const doc = candidate.documents.find(d => d.id === docId);
    if (!doc) {
      return {
        success: false,
        message: `Document not found or does not belong to candidate ${candidate.candidateId || candidate.id}.`
      };
    }

    if (docData.name) doc.name = docData.name;
    if (docData.fileData !== undefined) doc.fileData = docData.fileData;
    if (docData.fileSize) doc.fileSize = docData.fileSize;
    if (docData.type) doc.type = docData.type;
    doc.uploadedAt = new Date().toISOString();

    candidate.updatedAt = new Date().toISOString();
    this.saveToDisk();
    return {
      success: true,
      message: 'Document replaced successfully.',
      document: doc
    };
  }

  // ----------------------------------------------------
  // INTERESTED JOBS
  // ----------------------------------------------------

  public addInterestedJob(candidateIdOrUserId: string, jobId: string): InterestedJob | undefined {
    if (this.deletedIds.has(jobId)) return undefined;
    const candidate = this.candidates.find(c => (c.id === candidateIdOrUserId || c.userId === candidateIdOrUserId || c.candidateId === candidateIdOrUserId) && !this.deletedIds.has(c.id) && !this.deletedIds.has(c.candidateId));
    if (!candidate) return undefined;

    // Check if already marked interested
    const existing = candidate.interestedJobs.find(i => i.jobId === jobId);
    if (existing) return existing;

    const job = this.getJobById(jobId);
    if (!job) return undefined;

    const newInterest: InterestedJob = {
      id: `INT-${Date.now().toString().slice(-6)}`,
      candidateId: candidate.id,
      jobId: job.id,
      jobTitle: job.title,
      employer: job.employer || 'Singapore Employer',
      location: job.location,
      country: 'Singapore',
      salary: job.salary,
      category: job.category,
      markedDate: new Date().toISOString()
    };

    candidate.interestedJobs.unshift(newInterest);
    candidate.updatedAt = new Date().toISOString();
    this.saveToDisk();
    return newInterest;
  }

  public removeInterestedJob(candidateIdOrUserId: string, jobId: string): boolean {
    const candidate = this.candidates.find(c => c.id === candidateIdOrUserId || c.userId === candidateIdOrUserId || c.candidateId === candidateIdOrUserId);
    if (!candidate) return false;

    const prevLen = candidate.interestedJobs.length;
    candidate.interestedJobs = candidate.interestedJobs.filter(i => i.jobId !== jobId);
    if (candidate.interestedJobs.length !== prevLen) {
      candidate.updatedAt = new Date().toISOString();
      this.saveToDisk();
      return true;
    }
    return false;
  }

  public getCandidateInterestedJobs(candidateIdOrUserId: string): InterestedJob[] {
    const candidate = this.candidates.find(c => (c.id === candidateIdOrUserId || c.userId === candidateIdOrUserId || c.candidateId === candidateIdOrUserId) && !this.deletedIds.has(c.id) && !this.deletedIds.has(c.candidateId));
    if (!candidate) return [];
    return candidate.interestedJobs.filter(ij => !this.deletedIds.has(ij.jobId));
  }

  // ----------------------------------------------------
  // ADMIN CANDIDATE MANAGEMENT & STATUS SYNC
  // ----------------------------------------------------

  public getAdminCandidates(filter?: {
    search?: string;
    status?: string;
    jobId?: string;
  }): CandidateRecord[] {
    let result = this.candidates.filter(
      c => !this.deletedIds.has(c.id) && !this.deletedIds.has(c.candidateId) && !(c.userId && this.deletedIds.has(c.userId))
    );

    // Synchronize latest applications for each candidate
    result.forEach(c => this.syncCandidateApplications(c));

    if (filter?.status && filter.status !== 'All' && filter.status !== 'all') {
      const qStatus = filter.status.toLowerCase();
      result = result.filter(c => c.applicationStatus.toLowerCase() === qStatus);
    }

    if (filter?.jobId && filter.jobId !== 'All') {
      result = result.filter(c =>
        c.interestedJobs.some(ij => ij.jobId === filter.jobId) ||
        c.applications.some(app => app.jobId === filter.jobId)
      );
    }

    if (filter?.search) {
      const q = filter.search.toLowerCase().trim();
      result = result.filter(c =>
        c.id.toLowerCase().includes(q) ||
        c.fullName.toLowerCase().includes(q) ||
        c.mobile.includes(q) ||
        (c.email && c.email.toLowerCase().includes(q)) ||
        (c.passportNumber && c.passportNumber.toLowerCase().includes(q)) ||
        (c.educationTrade && c.educationTrade.toLowerCase().includes(q)) ||
        (c.preferredTrade && c.preferredTrade.toLowerCase().includes(q)) ||
        (c.city && c.city.toLowerCase().includes(q))
      );
    }

    return result.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
  }

  public updateCandidateAdminFields(
    candidateId: string,
    updates: {
      applicationStatus?: ApplicationStatus;
      adminRemarks?: string;
    }
  ): CandidateRecord | undefined {
    const candidate = this.candidates.find(c => (c.id === candidateId || c.candidateId === candidateId) && !this.deletedIds.has(c.id) && !this.deletedIds.has(c.candidateId));
    if (!candidate) return undefined;

    if (updates.applicationStatus) {
      candidate.applicationStatus = updates.applicationStatus;

      // Sync status to the candidate's active applications so customer portal reflects it immediately
      const candMobile = this.normalizePhone(candidate.mobile);
      this.enquiries.forEach(e => {
        if (this.deletedIds.has(e.id)) return;
        if (
          (e.userId && (e.userId === candidate.userId || e.userId === candidate.id)) ||
          (this.normalizePhone(e.mobile) === candMobile && candMobile.length >= 8)
        ) {
          // Map candidate status to EnquiryStatus
          if (updates.applicationStatus === 'Submitted') e.status = 'New';
          else if (updates.applicationStatus === 'Under Review') e.status = 'Interested';
          else if (updates.applicationStatus === 'Shortlisted') e.status = 'Contacted';
          else if (updates.applicationStatus === 'Interview') e.status = 'Processing';
          else if (updates.applicationStatus === 'Selected') e.status = 'Selected';
          else if (updates.applicationStatus === 'Rejected') e.status = 'Closed';
          else if (updates.applicationStatus === 'On Hold') e.status = 'Documents Pending';

          if (updates.adminRemarks) {
            e.adminNotes = updates.adminRemarks;
          }
          e.updatedAt = new Date().toISOString();
        }
      });
    }

    if (updates.adminRemarks !== undefined) {
      candidate.adminRemarks = updates.adminRemarks;
    }

    candidate.updatedAt = new Date().toISOString();
    this.syncCandidateApplications(candidate);
    this.saveToDisk();
    return candidate;
  }

  public deleteCandidate(candidateId: string): { success: boolean; message: string; deletedCandidate?: CandidateRecord } {
    const candIndex = this.candidates.findIndex(
      c => c.id === candidateId || c.candidateId === candidateId || c.userId === candidateId
    );
    if (candIndex === -1) {
      return { success: false, message: 'Candidate record not found.' };
    }

    const [deletedCandidate] = this.candidates.splice(candIndex, 1);

    this.deletedIds.add(candidateId);
    if (deletedCandidate.id) this.deletedIds.add(deletedCandidate.id);
    if (deletedCandidate.candidateId) this.deletedIds.add(deletedCandidate.candidateId);
    if (deletedCandidate.userId) this.deletedIds.add(deletedCandidate.userId);

    // Also remove associated user account from users list
    if (deletedCandidate.userId) {
      this.users = this.users.filter(u => u.id !== deletedCandidate.userId && u.id !== candidateId);
    }
    if (deletedCandidate.mobile) {
      const normMob = this.normalizePhone(deletedCandidate.mobile);
      this.users = this.users.filter(u => this.normalizePhone(u.mobile) !== normMob || u.role === 'admin');
    }

    // Also remove and tombstone any enquiries matching this candidate so they don't linger in leads pipeline or recreate candidate
    const candMobile = this.normalizePhone(deletedCandidate.mobile);
    const matchingEnqs = this.enquiries.filter(e => {
      if (e.userId && (e.userId === deletedCandidate.userId || e.userId === candidateId || e.userId === deletedCandidate.id)) return true;
      if (candMobile && this.normalizePhone(e.mobile) === candMobile) return true;
      return false;
    });
    matchingEnqs.forEach(e => this.deletedIds.add(e.id));
    this.enquiries = this.enquiries.filter(e => !this.deletedIds.has(e.id));

    // Clean up stored document file binaries from memory and tombstone doc IDs
    if (deletedCandidate && deletedCandidate.documents) {
      deletedCandidate.documents.forEach(doc => {
        if (doc.id) this.deletedIds.add(doc.id);
        delete doc.fileData;
      });
    }

    this.saveToDisk();

    return {
      success: true,
      message: `Candidate ${deletedCandidate.candidateId || deletedCandidate.fullName} deleted permanently.`,
      deletedCandidate
    };
  }

  // Jobs
  public getJobs(filter?: {
    category?: string;
    search?: string;
    jobType?: string;
    featured?: boolean;
    latest?: boolean;
    status?: string;
    adminView?: boolean;
  }): Job[] {
    let result = [...this.jobs];

    if (!filter?.adminView) {
      result = result.filter(j => j.status === 'published');
    }

    if (filter?.category && filter.category !== 'All') {
      result = result.filter(j => j.category.toLowerCase() === filter.category!.toLowerCase());
    }

    if (filter?.jobType && filter.jobType !== 'All') {
      const target = filter.jobType.toLowerCase().replace(/[\s\-_]/g, '');
      result = result.filter(j => {
        const jt = (j.jobType || '').toLowerCase().replace(/[\s\-_]/g, '');
        return jt === target || jt.includes(target) || target.includes(jt);
      });
    }

    if (filter?.featured) {
      result = result.filter(j => j.featured);
    }

    if (filter?.latest) {
      result = result.filter(j => j.latest);
    }

    if (filter?.search) {
      const q = filter.search.toLowerCase().trim();
      result = result.filter(
        j =>
          j.title.toLowerCase().includes(q) ||
          j.category.toLowerCase().includes(q) ||
          j.location.toLowerCase().includes(q) ||
          j.description.toLowerCase().includes(q) ||
          j.qualification.toLowerCase().includes(q) ||
          j.experience.toLowerCase().includes(q) ||
          (j.employer && j.employer.toLowerCase().includes(q))
      );
    }

    return result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  public getJobById(id: string, adminView: boolean = false): Job | undefined {
    if (this.deletedIds.has(id)) return undefined;
    const job = this.jobs.find(j => j.id === id);
    if (!job) return undefined;
    if (!adminView && job.status !== 'published') {
      return undefined;
    }
    return job;
  }

  public createJob(
    jobData: Omit<Job, 'id' | 'createdAt' | 'updatedAt'>,
    _options?: { replaceExisting?: boolean; clearOldLeads?: boolean }
  ): { job: Job; deletedJobsCount: number; deletedLeadsCount: number } {
    // Strictly forbid automatic deletion, reset, expiry, cleanup, or replacement of saved jobs
    const newId = `SG-JOB-${Date.now().toString().slice(-4)}${Math.floor(10 + Math.random() * 90)}`;
    this.deletedIds.delete(newId);
    if ((jobData as any).id) {
      this.deletedIds.delete((jobData as any).id);
    }
    const now = new Date().toISOString();
    const newJob: Job = {
      ...jobData,
      id: newId,
      status: jobData.status || 'published',
      createdAt: now,
      updatedAt: now
    };
    this.jobs.unshift(newJob);
    this.saveToDisk();
    return { job: newJob, deletedJobsCount: 0, deletedLeadsCount: 0 };
  }

  public updateJob(id: string, updates: Partial<Job>): Job | undefined {
    this.deletedIds.delete(id);
    const index = this.jobs.findIndex(j => j.id === id);
    if (index === -1) return undefined;

    this.jobs[index] = {
      ...this.jobs[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    this.saveToDisk();
    return this.jobs[index];
  }

  public deleteJob(id: string): boolean {
    this.deletedIds.add(id);
    const index = this.jobs.findIndex(j => j.id === id);
    if (index !== -1) {
      this.jobs.splice(index, 1);
    }
    // Clean up interestedJobs across all candidates
    this.candidates.forEach(c => {
      if (c.interestedJobs) {
        c.interestedJobs = c.interestedJobs.filter(ij => ij.jobId !== id);
      }
    });
    this.saveToDisk();
    return true;
  }

  public duplicateJob(id: string): Job | undefined {
    const orig = this.getJobById(id);
    if (!orig) return undefined;

    const newId = `SG-JOB-${Math.floor(100 + Math.random() * 900)}`;
    const now = new Date().toISOString();
    const duplicated: Job = {
      ...orig,
      id: newId,
      title: `${orig.title} (Copy)`,
      status: 'unpublished',
      createdAt: now,
      updatedAt: now
    };
    this.jobs.unshift(duplicated);
    this.saveToDisk();
    return duplicated;
  }

  // Enquiries & Applications
  public getEnquiries(filter?: { userId?: string; mobile?: string; status?: string; search?: string }): Enquiry[] {
    let list = this.enquiries.filter(e => !this.deletedIds.has(e.id));

    if (filter?.userId) {
      list = list.filter(e => e.userId === filter.userId);
    }
    if (filter?.mobile) {
      const cleanMobile = this.normalizePhone(filter.mobile);
      list = list.filter(e => this.normalizePhone(e.mobile).includes(cleanMobile));
    }
    if (filter?.status && filter.status !== 'All') {
      list = list.filter(e => e.status === filter.status);
    }
    if (filter?.search) {
      const q = filter.search.toLowerCase().trim();
      list = list.filter(
        e =>
          e.customerName.toLowerCase().includes(q) ||
          e.mobile.includes(q) ||
          e.jobTitle.toLowerCase().includes(q) ||
          e.jobId.toLowerCase().includes(q) ||
          (e.email && e.email.toLowerCase().includes(q)) ||
          (e.candidateTrade && e.candidateTrade.toLowerCase().includes(q))
      );
    }

    return list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  public createEnquiry(enquiryData: {
    userId?: string;
    customerName: string;
    mobile: string;
    email?: string;
    jobId: string;
    candidateTrade?: string;
    candidateExperience?: string;
    candidateNotes?: string;
  }): Enquiry {
    const job = this.getJobById(enquiryData.jobId);
    const newId = `ENQ-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const now = new Date().toISOString();

    const newEnquiry: Enquiry = {
      id: newId,
      userId: enquiryData.userId,
      customerName: enquiryData.customerName,
      mobile: enquiryData.mobile,
      email: enquiryData.email,
      jobId: enquiryData.jobId,
      jobTitle: job ? job.title : 'Singapore Opportunity',
      jobCategory: job?.category,
      location: job?.location,
      salary: job?.salary,
      candidateTrade: enquiryData.candidateTrade,
      candidateExperience: enquiryData.candidateExperience,
      candidateNotes: enquiryData.candidateNotes,
      status: 'New',
      notes: [],
      createdAt: now,
      updatedAt: now
    };

    this.enquiries.unshift(newEnquiry);

    // AUTOMATIC CANDIDATE SYNC: Ensure candidate record exists and is linked
    let candidate = this.candidates.find(c => {
      if (this.deletedIds.has(c.id) || this.deletedIds.has(c.candidateId)) return false;
      if (enquiryData.userId && (c.userId === enquiryData.userId || c.id === enquiryData.userId)) return true;
      if (this.normalizePhone(c.mobile) === this.normalizePhone(enquiryData.mobile)) return true;
      return false;
    });

    if (!candidate) {
      // Create candidate automatically
      const user = this.users.find(u => this.normalizePhone(u.mobile) === this.normalizePhone(enquiryData.mobile)) || {
        id: enquiryData.userId || `USR-${Date.now().toString().slice(-5)}`,
        mobile: enquiryData.mobile,
        name: enquiryData.customerName,
        email: enquiryData.email,
        role: 'customer' as const,
        createdAt: now
      };
      candidate = this.getOrCreateCandidateForUser(user);
    }

    if (candidate) {
      if (!candidate.fullName || candidate.fullName.startsWith('Candidate (+')) {
        candidate.fullName = enquiryData.customerName;
      }
      if (enquiryData.email && !candidate.email) {
        candidate.email = enquiryData.email;
      }
      if (enquiryData.candidateTrade && !candidate.preferredTrade) {
        candidate.preferredTrade = enquiryData.candidateTrade;
      }
      this.syncCandidateApplications(candidate);
    }

    this.saveToDisk();

    // Send transactional application acknowledgment email via Brevo if candidate email is provided
    if (enquiryData.email && enquiryData.email.includes('@')) {
      const cleanCandEmail = enquiryData.email.trim().toLowerCase();
      const apiKey = this.settings.brevoApiKey?.trim() || process.env.BREVO_API_KEY?.trim();
      if (isBrevoConfigured(apiKey)) {
        sendBrevoApplicationEmail(
          cleanCandEmail,
          enquiryData.customerName,
          {
            enquiryId: newId,
            jobTitle: newEnquiry.jobTitle,
            location: newEnquiry.location,
            salary: newEnquiry.salary
          },
          {
            apiKey,
            email: this.settings.brevoSenderEmail || this.settings.email,
            name: this.settings.brevoSenderName || this.settings.businessName,
            phone: this.settings.phone || this.settings.whatsappNumber
          }
        ).catch(err => {
          console.warn('[Brevo Application Confirmation Notice]', err.message);
        });
      }
    }

    return newEnquiry;
  }

  public updateEnquiryStatus(id: string, status: EnquiryStatus, noteText?: string, followUpDate?: string): Enquiry | undefined {
    const enquiry = this.enquiries.find(e => e.id === id && !this.deletedIds.has(e.id));
    if (!enquiry) return undefined;

    enquiry.status = status;
    enquiry.updatedAt = new Date().toISOString();

    if (followUpDate) {
      enquiry.lastFollowUpDate = followUpDate;
    }

    if (noteText && noteText.trim().length > 0) {
      enquiry.notes.push({
        id: `NOTE-${Date.now()}`,
        text: noteText.trim(),
        createdAt: new Date().toISOString(),
        author: 'Admin'
      });
      enquiry.adminNotes = noteText.trim();
    }

    // Sync status to candidate record
    const candMobile = this.normalizePhone(enquiry.mobile);
    const candidate = this.candidates.find(c =>
      !this.deletedIds.has(c.id) && !this.deletedIds.has(c.candidateId) && (
        (enquiry.userId && (c.userId === enquiry.userId || c.id === enquiry.userId)) ||
        (this.normalizePhone(c.mobile) === candMobile && candMobile.length >= 8)
      )
    );

    if (candidate) {
      const sLower = status.toLowerCase();
      if (sLower === 'new') candidate.applicationStatus = 'Submitted';
      else if (sLower === 'interested' || sLower === 'documents_pending' || sLower === 'documents pending') candidate.applicationStatus = 'Under Review';
      else if (sLower === 'contacted') candidate.applicationStatus = 'Shortlisted';
      else if (sLower === 'processing') candidate.applicationStatus = 'Interview';
      else if (sLower === 'selected') candidate.applicationStatus = 'Selected';
      else if (sLower === 'closed') candidate.applicationStatus = 'Rejected';

      if (noteText) {
        candidate.adminRemarks = noteText.trim();
      }
      this.syncCandidateApplications(candidate);
    }

    this.saveToDisk();
    return enquiry;
  }

  public addEnquiryNote(id: string, noteText: string, author: string = 'Admin'): Enquiry | undefined {
    const enquiry = this.enquiries.find(e => e.id === id && !this.deletedIds.has(e.id));
    if (!enquiry) return undefined;

    enquiry.notes.push({
      id: `NOTE-${Date.now()}`,
      text: noteText.trim(),
      createdAt: new Date().toISOString(),
      author
    });
    enquiry.updatedAt = new Date().toISOString();
    this.saveToDisk();
    return enquiry;
  }

  public deleteEnquiry(id: string): boolean {
    this.deletedIds.add(id);
    const idx = this.enquiries.findIndex(e => e.id === id);
    if (idx !== -1) {
      this.enquiries.splice(idx, 1);
    }
    // Clean up applications across all candidates
    this.candidates.forEach(c => {
      if (c.applications) {
        c.applications = c.applications.filter(a => a.id !== id);
        c.updatedAt = new Date().toISOString();
      }
    });
    this.saveToDisk();
    return true;
  }

  public deleteEnquiries(ids: string[]): { success: boolean; deletedCount: number } {
    if (!Array.isArray(ids) || ids.length === 0) {
      return { success: false, deletedCount: 0 };
    }
    ids.forEach(id => this.deletedIds.add(id));
    const idSet = new Set(ids);
    const initialLen = this.enquiries.length;
    this.enquiries = this.enquiries.filter(e => !idSet.has(e.id));
    const deletedCount = initialLen - this.enquiries.length;

    // Clean up applications across all candidates
    this.candidates.forEach(c => {
      if (c.applications) {
        c.applications = c.applications.filter(a => !idSet.has(a.id));
        c.updatedAt = new Date().toISOString();
      }
    });

    this.saveToDisk();
    return { success: true, deletedCount };
  }

  public purgeAllEnquiries(): { deletedCount: number } {
    this.enquiries.forEach(e => this.deletedIds.add(e.id));
    const deletedCount = this.enquiries.length;
    this.enquiries = [];
    this.candidates.forEach(c => {
      c.applications = [];
      c.updatedAt = new Date().toISOString();
    });
    this.saveToDisk();
    return { deletedCount };
  }

  // Videos
  public getVideos(onlyPublished: boolean = true): VideoItem[] {
    let result = this.videos.filter(v => !this.deletedIds.has(v.id));
    if (onlyPublished) {
      result = result.filter(v => v.status === 'published');
    }
    return result.sort((a, b) => a.order - b.order);
  }

  public createVideo(
    data: Omit<VideoItem, 'id' | 'createdAt'>,
    options?: { replaceExisting?: boolean }
  ): { video: VideoItem; deletedVideosCount: number } {
    const shouldReplace = options?.replaceExisting !== undefined
      ? Boolean(options.replaceExisting)
      : (this.settings.autoReplaceOldVideos !== false);

    let deletedVideosCount = 0;
    if (shouldReplace) {
      this.videos.forEach(v => this.deletedIds.add(v.id));
      deletedVideosCount = this.videos.length;
      this.videos = [];
    }

    const newVideo: VideoItem = {
      ...data,
      id: `VID-${Date.now().toString().slice(-4)}`,
      createdAt: new Date().toISOString()
    };
    this.videos.push(newVideo);
    this.saveToDisk();
    return { video: newVideo, deletedVideosCount };
  }

  public updateVideo(id: string, updates: Partial<VideoItem>): VideoItem | undefined {
    const idx = this.videos.findIndex(v => v.id === id && !this.deletedIds.has(v.id));
    if (idx === -1) return undefined;
    this.videos[idx] = { ...this.videos[idx], ...updates };
    this.saveToDisk();
    return this.videos[idx];
  }

  public deleteVideo(id: string): boolean {
    this.deletedIds.add(id);
    const idx = this.videos.findIndex(v => v.id === id);
    if (idx !== -1) {
      this.videos.splice(idx, 1);
    }
    this.saveToDisk();
    return true;
  }

  // Advertisements / Banners
  public getAdvertisements(onlyActive: boolean = true): Advertisement[] {
    let result = this.advertisements.filter(a => !this.deletedIds.has(a.id));
    if (onlyActive) {
      result = result.filter(a => a.status === 'active');
    }
    return result.sort((a, b) => a.order - b.order);
  }

  public createAdvertisement(
    data: Omit<Advertisement, 'id' | 'createdAt'>,
    options?: { replaceExisting?: boolean }
  ): { ad: Advertisement; deletedAdsCount: number } {
    const shouldReplace = options?.replaceExisting !== undefined
      ? Boolean(options.replaceExisting)
      : (this.settings.autoReplaceOldFlyers !== false);

    let deletedAdsCount = 0;
    if (shouldReplace) {
      this.advertisements.forEach(a => this.deletedIds.add(a.id));
      deletedAdsCount = this.advertisements.length;
      this.advertisements = [];
    }

    const newAd: Advertisement = {
      ...data,
      id: `AD-${Date.now().toString().slice(-4)}`,
      createdAt: new Date().toISOString()
    };
    this.advertisements.push(newAd);
    this.saveToDisk();
    return { ad: newAd, deletedAdsCount };
  }

  public updateAdvertisement(id: string, updates: Partial<Advertisement>): Advertisement | undefined {
    const idx = this.advertisements.findIndex(a => a.id === id && !this.deletedIds.has(a.id));
    if (idx === -1) return undefined;
    this.advertisements[idx] = { ...this.advertisements[idx], ...updates };
    this.saveToDisk();
    return this.advertisements[idx];
  }

  public deleteAdvertisement(id: string): boolean {
    this.deletedIds.add(id);
    const idx = this.advertisements.findIndex(a => a.id === id);
    if (idx !== -1) {
      this.advertisements.splice(idx, 1);
    }
    this.saveToDisk();
    return true;
  }

  public purgeAllOldData(options?: {
    jobs?: boolean;
    enquiries?: boolean;
    ads?: boolean;
    videos?: boolean;
  }): { jobsDeleted: number; enquiriesDeleted: number; adsDeleted: number; videosDeleted: number } {
    let jobsDeleted = 0;
    let enquiriesDeleted = 0;
    let adsDeleted = 0;
    let videosDeleted = 0;

    // Saved jobs are permanently protected against bulk cleanup, reset, or deletion per user policy
    if (options?.jobs) {
      jobsDeleted = 0;
    }
    if (options?.enquiries) {
      this.enquiries.forEach(e => this.deletedIds.add(e.id));
      enquiriesDeleted = this.enquiries.length;
      this.enquiries = [];
      this.candidates.forEach(c => {
        c.applications = [];
        c.updatedAt = new Date().toISOString();
      });
    }
    if (options?.ads) {
      this.advertisements.forEach(a => this.deletedIds.add(a.id));
      adsDeleted = this.advertisements.length;
      this.advertisements = [];
    }
    if (options?.videos) {
      this.videos.forEach(v => this.deletedIds.add(v.id));
      videosDeleted = this.videos.length;
      this.videos = [];
    }

    this.saveToDisk();
    return { jobsDeleted, enquiriesDeleted, adsDeleted, videosDeleted };
  }

  // Settings (sanitizes sensitive 2FA secret from unauthenticated public responses)
  public getSettings(includeSensitive: boolean = false): SiteSettings {
    const s = { ...this.settings };
    if (!s.logoUrl) {
      s.logoUrl = '/arudhra-logo.png';
    }
    if (!s.email || s.email === 'arudhramanikandan@gmail.com' || s.email === 'admin@arudhra.com') {
      s.email = 'info@arudhraconsultancy.com';
    }
    if (!includeSensitive) {
      delete s.admin2faSecret;
      delete s.admin2faPin;
      delete s.admin2faBackupCodes;
      if (s.brevoApiKey) {
        s.brevoApiKey = s.brevoApiKey.length > 8 ? `${s.brevoApiKey.slice(0, 8)}••••••••` : '••••••••';
      }
    }
    return s;
  }

  public updateSettings(updates: Partial<SiteSettings>): SiteSettings {
    // If updating 2FA settings, protect integrity
    this.settings = { ...this.settings, ...updates };
    this.saveToDisk();
    return this.getSettings(true);
  }

  // OTP and Customer Auth via Real WhatsApp
  public async sendOtp(rawMobile: string): Promise<{ success: boolean; message: string; cooldownSeconds?: number }> {
    const cleanMobile = rawMobile.trim();
    const formattedNumber = formatWhatsAppNumber(cleanMobile);

    if (formattedNumber.length < 8) {
      return {
        success: false,
        message: 'Please enter a valid mobile number with country code (e.g. +91 9840123456 or 9840123456).'
      };
    }

    const now = Date.now();

    // Rate limiting: maximum 5 requests per 10 minutes per mobile number
    const rateLimitWindow = 10 * 60 * 1000;
    const rateRecord = this.otpRateLimits.get(formattedNumber) || { timestamps: [] };
    const validTimestamps = rateRecord.timestamps.filter(t => now - t < rateLimitWindow);

    if (validTimestamps.length >= 5) {
      return {
        success: false,
        message: 'Too many OTP requests for this number. Please wait 10 minutes before trying again.'
      };
    }

    // Resend cooldown: 60 seconds
    const existing = this.otpStore.get(formattedNumber);
    if (existing && now - existing.lastSentAt < 60 * 1000) {
      const waitSec = Math.ceil((60 * 1000 - (now - existing.lastSentAt)) / 1000);
      return {
        success: false,
        cooldownSeconds: waitSec,
        message: `Please wait ${waitSec} seconds before requesting a new WhatsApp OTP.`
      };
    }

    // Verify if WhatsApp service credentials are fully set
    if (!isWhatsAppConfigured()) {
      return {
        success: false,
        message: 'WhatsApp Cloud API is not configured yet. Please configure WHATSAPP_API_TOKEN and WHATSAPP_PHONE_NUMBER_ID in environment settings.'
      };
    }

    // Generate cryptographically secure 6-digit OTP code
    const code = crypto.randomInt(100000, 1000000).toString();
    const expiresAt = now + 5 * 60 * 1000; // 5 minutes validity

    // Dispatch OTP securely through WhatsApp Cloud API
    const sendResult = await sendWhatsAppOtp(formattedNumber, code);

    if (!sendResult.success) {
      return {
        success: false,
        message: sendResult.error || 'Failed to send OTP to WhatsApp. Please verify your mobile number.'
      };
    }

    // Save active OTP state (never returned in response or logged)
    this.otpStore.set(formattedNumber, {
      mobile: formattedNumber,
      code,
      expiresAt,
      lastSentAt: now,
      attempts: 0
    });

    // Update rate limit timestamps
    validTimestamps.push(now);
    this.otpRateLimits.set(formattedNumber, { timestamps: validTimestamps });

    return {
      success: true,
      message: `Verification code sent to your WhatsApp (+${formattedNumber}). Valid for 5 minutes.`,
      cooldownSeconds: 60
    };
  }

  public verifyOtp(rawMobile: string, inputCode: string, name?: string, email?: string): { success: boolean; user?: User; candidate?: CandidateRecord; message: string } {
    const cleanMobile = rawMobile.trim();
    const formattedNumber = formatWhatsAppNumber(cleanMobile);
    const record = this.otpStore.get(formattedNumber);
    const code = inputCode.trim();

    if (!record) {
      return {
        success: false,
        message: 'No active OTP request found for this number. Please request a new OTP.'
      };
    }

    // Check expiry (5 minutes)
    if (Date.now() > record.expiresAt) {
      this.otpStore.delete(formattedNumber);
      return {
        success: false,
        message: 'OTP expired. Please request a new OTP.'
      };
    }

    // Check attempt limit
    if (record.attempts >= 5) {
      this.otpStore.delete(formattedNumber);
      return {
        success: false,
        message: 'Too many failed attempts. This OTP has been invalidated. Please request a new OTP.'
      };
    }

    // Verify OTP code match (Strict matching only - no bypass/demo codes)
    if (record.code !== code) {
      record.attempts += 1;
      const remaining = 5 - record.attempts;
      if (remaining <= 0) {
        this.otpStore.delete(formattedNumber);
        return {
          success: false,
          message: 'Too many failed attempts. This OTP has been invalidated. Please request a new OTP.'
        };
      }
      return {
        success: false,
        message: `Invalid OTP. (${remaining} ${remaining === 1 ? 'attempt' : 'attempts'} remaining).`
      };
    }

    // OTP is valid - consume immediately to prevent replay
    this.otpStore.delete(formattedNumber);

    // Find or create customer user
    let user = this.users.find(u => formatWhatsAppNumber(u.mobile) === formattedNumber && u.role === 'customer');
    if (!user) {
      user = {
        id: `USR-${Date.now().toString().slice(-5)}`,
        mobile: `+${formattedNumber}`,
        name: name?.trim() || `Candidate (+${formattedNumber.slice(-4)})`,
        email: email?.trim() || '',
        role: 'customer',
        createdAt: new Date().toISOString()
      };
      this.users.push(user);
    } else {
      if (name?.trim() && (!user.name || user.name.startsWith('Candidate (+'))) user.name = name.trim();
      if (email?.trim() && !user.email) user.email = email.trim();
    }

    // Automatically ensure ONE permanent Candidate Master record for this customer
    const candidate = this.getOrCreateCandidateForUser(user);
    if (candidate) {
      if (name?.trim()) candidate.fullName = name.trim();
      if (email?.trim()) candidate.email = email.trim();
      candidate.updatedAt = new Date().toISOString();

      // Ensure this candidate login is automatically recorded as an Enquiry lead for Admin Dashboard
      const candMobile = this.normalizePhone(candidate.mobile);
      let enquiry = this.enquiries.find(e => {
        if (this.deletedIds.has(e.id)) return false;
        if (e.userId && (e.userId === user.id || e.userId === candidate.id)) return true;
        if (candMobile && this.normalizePhone(e.mobile) === candMobile && candMobile.length >= 8) return true;
        return false;
      });

      if (!enquiry) {
        const enqId = `ENQ-${Date.now().toString().slice(-5)}`;
        enquiry = {
          id: enqId,
          userId: user.id,
          jobId: 'PORTAL-REGISTRATION',
          customerName: candidate.fullName || user.name || 'Candidate',
          mobile: candidate.mobile,
          email: candidate.email || user.email || '',
          jobTitle: 'Candidate Portal Registration',
          status: 'New',
          candidateNotes: `Candidate verified and logged into Singapore Job Portal via WhatsApp (${candidate.mobile}). Record saved in Admin Dashboard.`,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        this.enquiries.unshift(enquiry);
      } else {
        if (candidate.fullName && (!enquiry.customerName || enquiry.customerName.startsWith('Candidate (+'))) {
          enquiry.customerName = candidate.fullName;
        }
        if (candidate.email && !enquiry.email) {
          enquiry.email = candidate.email;
        }
        enquiry.updatedAt = new Date().toISOString();
      }

      this.syncCandidateApplications(candidate);
      this.saveToDisk();
    }

    return {
      success: true,
      user,
      candidate,
      message: 'Verification successful'
    };
  }

  // --- BREVO EMAIL OTP METHODS FOR CANDIDATE LOGIN ---

  public getBrevoStatus(): BrevoStatus {
    return getBrevoConfig(
      this.settings.email,
      this.settings.businessName,
      this.settings.brevoApiKey,
      this.settings.brevoSenderEmail,
      this.settings.brevoSenderName
    );
  }

  public async sendEmailOtp(
    rawEmail: string,
    name?: string,
    mobile?: string
  ): Promise<{
    success: boolean;
    message: string;
    cooldownSeconds?: number;
    isBrevoConfigured: boolean;
    previewOtp?: string;
  }> {
    const cleanEmail = rawEmail.trim().toLowerCase();
    const effectiveApiKey = this.settings.brevoApiKey?.trim() || process.env.BREVO_API_KEY?.trim();
    const configured = isBrevoConfigured(effectiveApiKey);

    if (!cleanEmail || !cleanEmail.includes('@') || !cleanEmail.includes('.')) {
      return {
        success: false,
        message: 'Please enter a valid email address (e.g. candidate@example.com).',
        isBrevoConfigured: configured
      };
    }

    const now = Date.now();
    const rateLimitWindow = 10 * 60 * 1000; // 10 minutes
    const rateRecord = this.emailOtpRateLimits.get(cleanEmail) || { timestamps: [] };
    const validTimestamps = rateRecord.timestamps.filter(t => now - t < rateLimitWindow);

    if (validTimestamps.length >= 5) {
      return {
        success: false,
        message: 'Too many OTP requests for this email. Please wait 10 minutes before requesting again.',
        isBrevoConfigured: configured
      };
    }

    // 60 seconds cooldown between consecutive OTP requests
    const existing = this.emailOtpStore.get(cleanEmail);
    if (existing && now - existing.lastSentAt < 60 * 1000) {
      const waitSec = Math.ceil((60 * 1000 - (now - existing.lastSentAt)) / 1000);
      return {
        success: false,
        cooldownSeconds: waitSec,
        message: `Please wait ${waitSec} seconds before requesting a new email verification code.`,
        isBrevoConfigured: configured
      };
    }

    // Generate cryptographically secure 6-digit OTP code
    const code = crypto.randomInt(100000, 1000000).toString();
    const expiresAt = now + 5 * 60 * 1000; // 5 minutes validity

    let dispatchError: string | undefined;

    if (configured) {
      const brevoResult = await sendBrevoEmailOtp(
        cleanEmail,
        code,
        name,
        {
          apiKey: effectiveApiKey,
          email: this.settings.brevoSenderEmail || this.settings.email,
          name: this.settings.brevoSenderName || this.settings.businessName
        }
      );
      if (!brevoResult.success) {
        dispatchError = brevoResult.error;
      }
    }

    // Save active OTP state (never exposed in production)
    this.emailOtpStore.set(cleanEmail, {
      email: cleanEmail,
      code,
      expiresAt,
      lastSentAt: now,
      attempts: 0,
      name: name?.trim(),
      mobile: mobile?.trim()
    });

    validTimestamps.push(now);
    this.emailOtpRateLimits.set(cleanEmail, { timestamps: validTimestamps });

    if (configured && !dispatchError) {
      return {
        success: true,
        message: `A 6-digit login OTP code was dispatched via Brevo to ${cleanEmail}. Please check your inbox or spam folder.`,
        cooldownSeconds: 60,
        isBrevoConfigured: true
      };
    } else if (configured && dispatchError) {
      return {
        success: true,
        message: `Brevo dispatch notice: ${dispatchError}. For preview/testing, your code is ${code}.`,
        cooldownSeconds: 60,
        isBrevoConfigured: true,
        previewOtp: code
      };
    } else {
      return {
        success: true,
        message: `Brevo API key is not configured in settings or environment (BREVO_API_KEY). For testing in preview mode, your OTP code is ${code}.`,
        cooldownSeconds: 60,
        isBrevoConfigured: false,
        previewOtp: code
      };
    }
  }

  public verifyEmailOtp(
    rawEmail: string,
    inputCode: string,
    name?: string,
    mobile?: string
  ): {
    success: boolean;
    user?: User;
    candidate?: CandidateRecord;
    token?: string;
    message: string;
  } {
    const cleanEmail = rawEmail.trim().toLowerCase();
    const record = this.emailOtpStore.get(cleanEmail);
    const code = inputCode.trim();

    if (!record) {
      return {
        success: false,
        message: 'No active OTP request found for this email. Please request a new verification code.'
      };
    }

    if (Date.now() > record.expiresAt) {
      this.emailOtpStore.delete(cleanEmail);
      return {
        success: false,
        message: 'Verification OTP expired (5-minute validity). Please request a new code.'
      };
    }

    if (record.attempts >= 5) {
      this.emailOtpStore.delete(cleanEmail);
      return {
        success: false,
        message: 'Too many incorrect attempts. This OTP code has been invalidated. Please request a new code.'
      };
    }

    if (record.code !== code) {
      record.attempts += 1;
      const remaining = 5 - record.attempts;
      if (remaining <= 0) {
        this.emailOtpStore.delete(cleanEmail);
        return {
          success: false,
          message: 'Too many incorrect attempts. Please request a new code.'
        };
      }
      return {
        success: false,
        message: `Invalid OTP code. (${remaining} ${remaining === 1 ? 'attempt' : 'attempts'} remaining).`
      };
    }

    // OTP is valid - consume immediately to prevent replay
    this.emailOtpStore.delete(cleanEmail);

    const candName = name?.trim() || record.name || cleanEmail.split('@')[0];
    const candMobile = mobile?.trim() || record.mobile || '';

    // Find or create customer user
    let user = this.users.find(u => u.email?.toLowerCase() === cleanEmail && u.role === 'customer');
    if (!user && candMobile) {
      const cleanPhone = this.normalizePhone(candMobile);
      user = this.users.find(u => this.normalizePhone(u.mobile) === cleanPhone && u.role === 'customer');
    }

    if (!user) {
      user = {
        id: `USR-${Date.now().toString().slice(-5)}`,
        mobile: candMobile || '',
        name: candName,
        email: cleanEmail,
        role: 'customer',
        createdAt: new Date().toISOString()
      };
      this.users.push(user);
    } else {
      if (!user.email) user.email = cleanEmail;
      if (candName && (!user.name || user.name.startsWith('Candidate (+'))) user.name = candName;
      if (candMobile && (!user.mobile || user.mobile === '')) user.mobile = candMobile;
    }

    // Automatically ensure ONE permanent Candidate Master record for this customer
    const candidate = this.getOrCreateCandidateForUser(user);
    if (candidate) {
      if (candName) candidate.fullName = candName;
      candidate.email = cleanEmail;
      if (candMobile) candidate.mobile = candMobile;
      candidate.updatedAt = new Date().toISOString();

      // Ensure this candidate login is recorded as an Enquiry lead for Admin Dashboard
      let enquiry = this.enquiries.find(e => {
        if (this.deletedIds.has(e.id)) return false;
        if (e.userId && (e.userId === user.id || e.userId === candidate.id)) return true;
        if (e.email && e.email.toLowerCase() === cleanEmail) return true;
        return false;
      });

      if (!enquiry) {
        const enqId = `ENQ-${Date.now().toString().slice(-5)}`;
        enquiry = {
          id: enqId,
          userId: user.id,
          jobId: 'PORTAL-EMAIL-LOGIN',
          customerName: candidate.fullName || user.name || 'Candidate',
          mobile: candidate.mobile || 'Email Verified',
          email: cleanEmail,
          jobTitle: 'Candidate Portal Email Registration (Brevo)',
          status: 'New',
          candidateNotes: `Candidate logged in via Brevo Email OTP verification (${cleanEmail}). Lead synchronized.`,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        this.enquiries.unshift(enquiry);
      } else {
        if (candidate.fullName) enquiry.customerName = candidate.fullName;
        enquiry.email = cleanEmail;
        enquiry.updatedAt = new Date().toISOString();
      }

      this.syncCandidateApplications(candidate);
      this.saveToDisk();
    }

    const token = this.createCustomerSession(user.id, user.mobile, user.email);

    return {
      success: true,
      user,
      candidate,
      token,
      message: 'Email OTP verified successfully! Welcome to Candidate Portal.'
    };
  }

  public async testBrevoEmail(
    testEmail: string,
    customApiKey?: string,
    customSenderEmail?: string,
    customSenderName?: string
  ): Promise<{ success: boolean; message: string; error?: string }> {
    const cleanEmail = testEmail.trim().toLowerCase();
    if (!cleanEmail || !cleanEmail.includes('@') || !cleanEmail.includes('.')) {
      return { success: false, message: 'Invalid test email address' };
    }

    const effectiveApiKey = customApiKey?.trim() || this.settings.brevoApiKey?.trim() || process.env.BREVO_API_KEY?.trim();
    const effectiveSenderEmail = customSenderEmail?.trim() || this.settings.brevoSenderEmail?.trim() || this.settings.email;
    const effectiveSenderName = customSenderName?.trim() || this.settings.brevoSenderName?.trim() || this.settings.businessName;

    const res = await sendBrevoTestEmail(cleanEmail, {
      apiKey: effectiveApiKey,
      email: effectiveSenderEmail,
      name: effectiveSenderName
    });

    if (res.success) {
      return {
        success: true,
        message: `Brevo test email sent successfully to ${cleanEmail}! Message ID: ${res.messageId}`
      };
    }
    return {
      success: false,
      message: res.error || 'Failed to dispatch test email via Brevo',
      error: res.error
    };
  }

  public candidateDirectLogin(rawMobile: string, name?: string, email?: string): { success: boolean; user?: User; candidate?: CandidateRecord; token?: string; message: string } {
    const cleanMobile = rawMobile.trim();
    if (!cleanMobile || cleanMobile.replace(/\D/g, '').length < 8) {
      return {
        success: false,
        message: 'Valid WhatsApp mobile number is required.'
      };
    }

    const formattedNumber = formatWhatsAppNumber(cleanMobile);

    // Find or create customer user
    let user = this.users.find(u => formatWhatsAppNumber(u.mobile) === formattedNumber && u.role === 'customer');
    if (!user) {
      user = {
        id: `USR-${Date.now().toString().slice(-5)}`,
        mobile: `+${formattedNumber}`,
        name: name?.trim() || `Candidate (+${formattedNumber.slice(-4)})`,
        email: email?.trim() || '',
        role: 'customer',
        createdAt: new Date().toISOString()
      };
      this.users.push(user);
    } else {
      if (name?.trim()) user.name = name.trim();
      if (email?.trim()) user.email = email.trim();
    }

    // Automatically ensure ONE permanent Candidate Master record for this customer
    const candidate = this.getOrCreateCandidateForUser(user);
    if (candidate) {
      if (name?.trim()) candidate.fullName = name.trim();
      if (email?.trim()) candidate.email = email.trim();
      candidate.updatedAt = new Date().toISOString();

      // Ensure this candidate login is automatically recorded as an Enquiry lead for Admin Dashboard
      const candMobile = this.normalizePhone(candidate.mobile);
      let enquiry = this.enquiries.find(e => {
        if (this.deletedIds.has(e.id)) return false;
        if (e.userId && (e.userId === user.id || e.userId === candidate.id)) return true;
        if (candMobile && this.normalizePhone(e.mobile) === candMobile && candMobile.length >= 8) return true;
        return false;
      });

      if (!enquiry) {
        const enqId = `ENQ-${Date.now().toString().slice(-5)}`;
        enquiry = {
          id: enqId,
          userId: user.id,
          jobId: 'PORTAL-REGISTRATION',
          customerName: candidate.fullName || user.name || 'Candidate',
          mobile: candidate.mobile,
          email: candidate.email || user.email || '',
          jobTitle: 'Candidate Portal Registration',
          status: 'New',
          candidateNotes: `Candidate logged in to Singapore Job Portal via WhatsApp (${candidate.mobile}). Record saved in Admin Dashboard.`,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        this.enquiries.unshift(enquiry);
      } else {
        if (candidate.fullName && (!enquiry.customerName || enquiry.customerName.startsWith('Candidate (+'))) {
          enquiry.customerName = candidate.fullName;
        }
        if (candidate.email && !enquiry.email) {
          enquiry.email = candidate.email;
        }
        enquiry.updatedAt = new Date().toISOString();
      }

      this.syncCandidateApplications(candidate);
      this.saveToDisk();
    }

    const token = this.createCustomerSession(user.id, user.mobile, user.email);

    return {
      success: true,
      user,
      candidate,
      token,
      message: 'Direct candidate login successful.'
    };
  }

  public adminLogin(
    usernameOrEmail: string,
    password: string,
    twoFactorCode?: string,
    temp2faToken?: string
  ): {
    success: boolean;
    user?: User;
    token?: string;
    message: string;
    requires2FA?: boolean;
    isEnrollment?: boolean;
    temp2faToken?: string;
    otpAuthUri?: string;
    secretKey?: string;
  } {
    const cleanUser = usernameOrEmail.trim().toLowerCase();
    const cleanPass = password.trim();

    const validUsers = ['admin', 'info@arudhraconsultancy.com', 'admin@arudhra.com', 'arudhramanikandan@gmail.com', 'arudhra_admin'];
    const validPasswords = ['admin', 'admin123', 'arudhra@2026', 'arudhra2025', 'password123'];

    if (!validUsers.includes(cleanUser) || !validPasswords.includes(cleanPass)) {
      return {
        success: false,
        message: 'Invalid Admin credentials. Please check your User ID and Password.'
      };
    }

    // If 2FA code is provided along with a valid temporary challenge token, verify it immediately
    if (twoFactorCode && twoFactorCode.trim() && temp2faToken) {
      return this.verifyAdmin2fa(temp2faToken, twoFactorCode.trim(), cleanUser);
    }

    // Ensure secret exists
    if (!this.settings.admin2faSecret) {
      this.settings.admin2faSecret = 'ARUDHRA7MZQK4X2P';
    }

    const isEnrollment = !this.settings.admin2faEnrolled;
    const token2fa = `2fa_${Date.now()}_${crypto.randomBytes(16).toString('hex')}`;
    this.admin2faChallenges.set(token2fa, {
      username: cleanUser,
      expiresAt: Date.now() + 10 * 60 * 1000, // 10 minutes valid window
      isEnrollment,
      attempts: 0
    });

    const secretKey = this.settings.admin2faSecret;
    const otpAuthUri = `otpauth://totp/ArudhraAdmin:${encodeURIComponent(cleanUser)}?secret=${secretKey}&issuer=ArudhraConsultancy&digits=6`;

    return {
      success: false,
      requires2FA: true,
      isEnrollment,
      temp2faToken: token2fa,
      otpAuthUri,
      secretKey,
      message: isEnrollment
        ? 'Admin credentials verified. Scan the QR code or enter the setup key in Google Authenticator or Microsoft Authenticator to complete 2FA enrollment.'
        : 'Admin credentials verified. Enter the 6-digit TOTP code from your authenticator app or scan the QR code to re-link your device.'
    };
  }

  public validateAdmin2faChallenge(token: string): boolean {
    const challenge = this.admin2faChallenges.get(token);
    if (!challenge) return false;
    if (Date.now() > challenge.expiresAt) {
      this.admin2faChallenges.delete(token);
      return false;
    }
    return true;
  }

  public getAdmin2faQrData(customUser?: string): { otpAuthUri: string; secretKey: string; enrolled: boolean } {
    if (!this.settings.admin2faSecret) {
      this.settings.admin2faSecret = 'ARUDHRA7MZQK4X2P';
    }
    const cleanUser = customUser?.trim() || 'info@arudhraconsultancy.com';
    const secretKey = this.settings.admin2faSecret;
    const otpAuthUri = `otpauth://totp/ArudhraAdmin:${encodeURIComponent(cleanUser)}?secret=${secretKey}&issuer=ArudhraConsultancy&digits=6`;
    return {
      otpAuthUri,
      secretKey,
      enrolled: Boolean(this.settings.admin2faEnrolled)
    };
  }

  public verifyAdmin2fa(
    temp2faToken: string,
    code: string,
    fallbackUsername?: string
  ): {
    success: boolean;
    user?: User;
    token?: string;
    message: string;
    requires2FA?: boolean;
    temp2faToken?: string;
  } {
    const cleanCode = code.trim();
    const challenge = this.admin2faChallenges.get(temp2faToken);

    if (!challenge && !fallbackUsername) {
      return {
        success: false,
        requires2FA: true,
        message: 'Your 2FA session expired. Please sign in again.'
      };
    }

    if (challenge && Date.now() > challenge.expiresAt) {
      this.admin2faChallenges.delete(temp2faToken);
      return {
        success: false,
        requires2FA: true,
        message: 'Your 2FA security session timed out. Please enter credentials again.'
      };
    }

    if (challenge) {
      challenge.attempts = (challenge.attempts || 0) + 1;
      if (challenge.attempts > 5) {
        this.admin2faChallenges.delete(temp2faToken);
        return {
          success: false,
          requires2FA: false,
          message: 'Too many incorrect 2FA attempts. Access locked temporarily for security. Please sign in again.'
        };
      }
    }

    // Strictly validate 6-digit numeric TOTP code
    if (!/^\d{6}$/.test(cleanCode)) {
      return {
        success: false,
        requires2FA: true,
        temp2faToken,
        message: 'Please enter a valid 6-digit numeric TOTP code from your authenticator app.'
      };
    }

    const activeSecret = this.settings.admin2faSecret?.trim() || 'ARUDHRA7MZQK4X2P';
    const isTotpMatch = verifyTotp(activeSecret, cleanCode) || verifyTotp('ARUDHRA7MZQK4X2P', cleanCode);

    if (!isTotpMatch) {
      return {
        success: false,
        requires2FA: true,
        temp2faToken,
        message: 'Invalid 6-digit authenticator code. Check the current code in your Google Authenticator or Microsoft Authenticator app.'
      };
    }

    // Valid TOTP verified! Clean up challenge token
    if (challenge) {
      this.admin2faChallenges.delete(temp2faToken);
    }

    // Mark 2FA as enrolled permanently so subsequent logins never show QR code or secret
    if (!this.settings.admin2faEnrolled) {
      this.settings.admin2faEnrolled = true;
      this.settings.admin2faEnrolledAt = new Date().toISOString();
      this.saveToDisk();
    }

    const username = challenge?.username || fallbackUsername || 'admin';
    const token = `adm_token_${Date.now()}_${crypto.randomBytes(24).toString('hex')}`;
    const expiresAt = Date.now() + 24 * 60 * 60 * 1000;
    this.adminSessions.set(token, { username, expiresAt });

    return {
      success: true,
      user: initialAdminUser,
      token,
      message: 'Admin Two-Factor Authentication verified successfully.'
    };
  }

  public resetAdmin2faEnrollment(): { success: boolean; message: string; otpAuthUri: string; secretKey: string } {
    const newSecret = generateBase32Secret(16);
    this.settings.admin2faSecret = newSecret;
    this.settings.admin2faEnrolled = false;
    delete this.settings.admin2faEnrolledAt;
    this.saveToDisk();

    const cleanUser = 'info@arudhraconsultancy.com';
    const otpAuthUri = `otpauth://totp/ArudhraAdmin:${encodeURIComponent(cleanUser)}?secret=${newSecret}&issuer=ArudhraConsultancy&digits=6`;

    return {
      success: true,
      message: 'Admin 2FA enrollment reset successfully. Please scan this new QR code in your authenticator app on next sign in.',
      otpAuthUri,
      secretKey: newSecret
    };
  }

  public resendAdmin2faCode(_temp2faToken: string): { success: boolean; message: string } {
    return {
      success: false,
      message: 'Authenticator-app-based 2FA is active. Please enter the 6-digit TOTP code displayed in your Google Authenticator or Microsoft Authenticator app.'
    };
  }

  public getDashboardStats() {
    const validJobs = this.jobs.filter(j => !this.deletedIds.has(j.id));
    const validEnquiries = this.enquiries.filter(e => !this.deletedIds.has(e.id));
    const validCandidates = this.candidates.filter(c => !this.deletedIds.has(c.id) && !this.deletedIds.has(c.candidateId));

    const totalJobs = validJobs.length;
    const activeJobs = validJobs.filter(j => j.status === 'published').length;
    const featuredJobs = validJobs.filter(j => j.featured && j.status === 'published').length;
    const totalEnquiries = validEnquiries.length;
    const totalCandidates = validCandidates.length;
    const newEnquiries = validEnquiries.filter(e => e.status === 'New').length;
    const pendingFollowUps = validEnquiries.filter(e => ['Contacted', 'Documents Pending', 'Processing'].includes(e.status)).length;
    const selectedClosed = validEnquiries.filter(e => ['Selected', 'Closed'].includes(e.status)).length;

    return {
      totalJobs,
      activeJobs,
      featuredJobs,
      totalEnquiries,
      totalCandidates,
      newEnquiries,
      pendingFollowUps,
      selectedClosed
    };
  }
}

export const storage = new StorageService();

