import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';
import { storage } from './server/storage';

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Enable CORS & Preflight handling for all requests (including iframes, previews, mobile, custom domains)
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
      return res.sendStatus(200);
    }
    next();
  });

  // JSON Body Parser with reasonable payload limit for image data
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));

  // Serve static assets from public directory (e.g. permanent logos, icons)
  app.use(express.static(path.join(process.cwd(), 'public')));

  // --- API ROUTES ---

  // Health check
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', service: 'Arudhra Singapore Recruitment API', timestamp: new Date().toISOString() });
  });

  // Middleware to require valid server-side admin authorization token
  const requireAdminAuth: express.RequestHandler = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized: Admin authentication and valid authorization header required.'
      });
    }
    const token = authHeader.split(' ')[1];
    if (!storage.validateAdminToken(token)) {
      return res.status(403).json({
        success: false,
        message: 'Forbidden: Invalid or expired admin session token. Please sign in again.'
      });
    }
    next();
  };

  // Dashboard Stats
  app.get('/api/stats', (req, res) => {
    try {
      const stats = storage.getDashboardStats();
      res.json({ success: true, stats });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  });

  // Settings
  app.get('/api/settings', (req, res) => {
    try {
      const settings = storage.getSettings();
      res.json({ success: true, settings });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  });

  app.put('/api/settings', requireAdminAuth, (req, res) => {
    try {
      const updated = storage.updateSettings(req.body);
      res.json({ success: true, settings: updated, message: 'Settings updated successfully' });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  });

  // Authentication - Candidate Direct Login (handles all common route paths & aliases)
  const handleCandidateLogin: express.RequestHandler = (req, res) => {
    try {
      const { mobile, name, email } = req.body;
      const identifier = mobile || email;
      if (!identifier) {
        return res.status(400).json({ success: false, message: 'Email address or WhatsApp mobile number is required' });
      }
      const result = storage.candidateDirectLogin(identifier, name, email);
      if (!result.success) {
        return res.status(400).json(result);
      }
      res.json(result);
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message || 'Error processing candidate login' });
    }
  };

  app.post('/api/auth/candidate/login', handleCandidateLogin);
  app.post('/api/candidate/login', handleCandidateLogin);
  app.post('/api/auth/candidate-login', handleCandidateLogin);
  app.post('/api/candidate-login', handleCandidateLogin);
  app.post('/api/auth/candidate/direct-login', handleCandidateLogin);

  // Authentication - Candidate Email OTP via Brevo
  app.get(['/api/brevo/status', '/api/admin/brevo/status'], (req, res) => {
    try {
      const status = storage.getBrevoStatus();
      res.json({ success: true, ...status });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  });

  app.post(['/api/brevo/test', '/api/admin/brevo/test'], requireAdminAuth, async (req, res) => {
    try {
      const { email, apiKey, senderEmail, senderName } = req.body;
      if (!email) {
        return res.status(400).json({ success: false, message: 'Recipient email address is required for test' });
      }
      const result = await storage.testBrevoEmail(email, apiKey, senderEmail, senderName);
      res.json(result);
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  });

  const handleEmailOtpSend: express.RequestHandler = async (req, res) => {
    try {
      const { email, name, mobile } = req.body;
      if (!email || typeof email !== 'string') {
        return res.status(400).json({ success: false, message: 'Valid candidate email address is required' });
      }
      const result = await storage.sendEmailOtp(email, name, mobile);
      if (!result.success) {
        return res.status(400).json(result);
      }
      res.json(result);
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message || 'Error processing email OTP request' });
    }
  };

  const handleEmailOtpVerify: express.RequestHandler = (req, res) => {
    try {
      const { email, code, name, mobile } = req.body;
      if (!email || !code) {
        return res.status(400).json({ success: false, message: 'Email address and 6-digit OTP code are required' });
      }
      const result = storage.verifyEmailOtp(email, code, name, mobile);
      if (!result.success) {
        return res.status(400).json(result);
      }
      res.json(result);
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  };

  app.post('/api/auth/email-otp/send', handleEmailOtpSend);
  app.post('/api/email-otp/send', handleEmailOtpSend);
  app.post('/api/auth/email-otp/verify', handleEmailOtpVerify);
  app.post('/api/email-otp/verify', handleEmailOtpVerify);

  // Authentication - Customer Mobile OTP via Real WhatsApp
  app.post('/api/auth/otp/send', async (req, res) => {
    try {
      const { mobile } = req.body;
      if (!mobile || typeof mobile !== 'string') {
        return res.status(400).json({ success: false, message: 'Valid mobile number is required' });
      }
      const result = await storage.sendOtp(mobile);
      if (!result.success) {
        return res.status(400).json(result);
      }
      res.json(result);
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message || 'Internal server error processing OTP request' });
    }
  });

  app.post('/api/auth/otp/verify', (req, res) => {
    try {
      const { mobile, code, name, email } = req.body;
      if (!mobile || !code) {
        return res.status(400).json({ success: false, message: 'Mobile number and OTP code are required' });
      }
      const result = storage.verifyOtp(mobile, code, name, email);
      if (!result.success) {
        return res.status(400).json(result);
      }
      res.json(result);
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  });

  // Authentication - Admin Login & 2FA Verification
  app.post('/api/auth/admin/login', (req, res) => {
    try {
      const { username, password, twoFactorCode, temp2faToken } = req.body;
      if (!username || !password) {
        return res.status(400).json({ success: false, message: 'Username/Email and Password are required' });
      }
      const result = storage.adminLogin(username, password, twoFactorCode, temp2faToken);
      if (result.requires2FA) {
        return res.json(result);
      }
      if (!result.success) {
        return res.status(401).json(result);
      }
      res.json(result);
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  });

  app.post('/api/auth/admin/2fa/verify', (req, res) => {
    try {
      const { temp2faToken, code } = req.body;
      if (!temp2faToken || !code) {
        return res.status(400).json({ success: false, message: 'Session token and 2FA code are required' });
      }
      const result = storage.verifyAdmin2fa(temp2faToken, code);
      if (!result.success) {
        return res.status(400).json(result);
      }
      res.json(result);
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  });

  app.post('/api/auth/admin/2fa/resend', (req, res) => {
    try {
      const { temp2faToken } = req.body;
      if (!temp2faToken) {
        return res.status(400).json({ success: false, message: 'Session token is required' });
      }
      const result = storage.resendAdmin2faCode(temp2faToken);
      res.json(result);
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  });

  app.post('/api/auth/admin/2fa/reset-enrollment', requireAdminAuth, (req, res) => {
    try {
      const result = storage.resetAdmin2faEnrollment();
      res.json(result);
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  });

  app.get('/api/auth/admin/2fa/qr', (req, res) => {
    try {
      const authHeader = req.headers.authorization;
      const tempToken = req.query.temp2faToken as string;
      let authorized = false;

      if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.split(' ')[1];
        authorized = storage.validateAdminToken(token);
      } else if (tempToken) {
        authorized = storage.validateAdmin2faChallenge(tempToken);
      }

      if (!authorized) {
        return res.status(401).json({ success: false, message: 'Unauthorized: Admin session or valid 2FA token required' });
      }

      const qrData = storage.getAdmin2faQrData();
      res.json({ success: true, ...qrData });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  });

  app.get('/api/auth/admin/verify', requireAdminAuth, (req, res) => {
    res.json({
      success: true,
      user: {
        id: 'ADM-001',
        name: 'Arudhra Administrator',
        email: 'info@arudhraconsultancy.com',
        mobile: '+919840123456',
        role: 'admin'
      }
    });
  });

  app.post('/api/auth/admin/logout', (req, res) => {
    try {
      const authHeader = req.headers.authorization;
      if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.split(' ')[1];
        storage.revokeAdminToken(token);
      }
      res.json({ success: true, message: 'Admin session ended successfully' });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  });

  // Jobs Endpoints
  app.get('/api/jobs', (req, res) => {
    try {
      const { category, search, jobType, featured, latest, adminView } = req.query;
      const jobs = storage.getJobs({
        category: category as string,
        search: search as string,
        jobType: jobType as string,
        featured: featured === 'true',
        latest: latest === 'true',
        adminView: adminView === 'true'
      });
      res.json({ success: true, count: jobs.length, jobs });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  });

  app.get('/api/jobs/:id', (req, res) => {
    try {
      const authHeader = req.headers.authorization;
      const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : '';
      const isAdmin = storage.validateAdminToken(token);
      const job = storage.getJobById(req.params.id, isAdmin);
      if (!job) {
        return res.status(404).json({ success: false, message: 'Job not found or not published' });
      }
      res.json({ success: true, job });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  });

  app.post('/api/jobs', requireAdminAuth, (req, res) => {
    try {
      const jobData = req.body;
      if (!jobData.title || !jobData.category || !jobData.location || !jobData.salary) {
        return res.status(400).json({ success: false, message: 'Title, Category, Location, and Salary are mandatory' });
      }
      const replaceExisting = jobData.replaceExisting;
      const clearOldLeads = jobData.clearOldLeads;
      const { job, deletedJobsCount, deletedLeadsCount } = storage.createJob({
        ...jobData,
        status: jobData.status || 'published',
        featured: Boolean(jobData.featured),
        latest: Boolean(jobData.latest),
        responsibilities: Array.isArray(jobData.responsibilities) ? jobData.responsibilities : [],
        requirements: Array.isArray(jobData.requirements) ? jobData.requirements : [],
        benefits: Array.isArray(jobData.benefits) ? jobData.benefits : [],
        requiredDocuments: Array.isArray(jobData.requiredDocuments) ? jobData.requiredDocuments : [],
        postedDate: jobData.postedDate || new Date().toISOString().split('T')[0]
      }, { replaceExisting, clearOldLeads });

      let msg = 'Singapore Job created successfully.';
      if (deletedJobsCount > 0 && deletedLeadsCount > 0) {
        msg = `New job is now live! ${deletedJobsCount} previous job(s) and ${deletedLeadsCount} old candidate application(s) were automatically deleted.`;
      } else if (deletedJobsCount > 0) {
        msg = `New job is now live! ${deletedJobsCount} previous job(s) were automatically deleted from the website.`;
      }

      res.status(201).json({
        success: true,
        job,
        deletedJobsCount,
        deletedLeadsCount,
        message: msg
      });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  });

  app.put('/api/jobs/:id', requireAdminAuth, (req, res) => {
    try {
      const updated = storage.updateJob(req.params.id, req.body);
      if (!updated) {
        return res.status(404).json({ success: false, message: 'Job not found' });
      }
      res.json({ success: true, job: updated, message: 'Job updated successfully' });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  });

  app.delete('/api/jobs/:id', requireAdminAuth, (req, res) => {
    try {
      const deleted = storage.deleteJob(req.params.id);
      if (!deleted) {
        return res.status(404).json({ success: false, message: 'Job not found' });
      }
      res.json({ success: true, message: 'Job deleted successfully' });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  });

  app.post('/api/jobs/:id/duplicate', requireAdminAuth, (req, res) => {
    try {
      const duplicated = storage.duplicateJob(req.params.id);
      if (!duplicated) {
        return res.status(404).json({ success: false, message: 'Job not found' });
      }
      res.json({ success: true, job: duplicated, message: 'Job duplicated successfully as draft' });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  });

  // Enquiries / Leads Endpoints
  // Admin Enquiries Export (Protected Admin Endpoint)
  app.get('/api/admin/enquiries/export', requireAdminAuth, (_req, res) => {
    try {
      const enquiries = storage.getEnquiries();
      const headers = [
        'Enquiry ID',
        'Customer Name',
        'Mobile Number',
        'Email',
        'Job Ref ID',
        'Job Title',
        'Sector',
        'Status',
        'Trade',
        'Experience',
        'Notes',
        'Admin Notes',
        'Follow Up Date',
        'Created At'
      ];

      const escapeCsv = (val: any): string => {
        if (val === null || val === undefined) return '""';
        const str = String(val).replace(/"/g, '""');
        return `"${str}"`;
      };

      const rows = enquiries.map(e => [
        escapeCsv(e.id),
        escapeCsv(e.customerName || ''),
        escapeCsv(e.mobile || ''),
        escapeCsv(e.email || ''),
        escapeCsv(e.jobId || ''),
        escapeCsv(e.jobTitle || ''),
        escapeCsv(e.jobCategory || ''),
        escapeCsv(e.status || 'New'),
        escapeCsv(e.candidateTrade || ''),
        escapeCsv(e.candidateExperience || ''),
        escapeCsv(e.candidateNotes || ''),
        escapeCsv(e.adminNotes || ''),
        escapeCsv(e.followUpDate || ''),
        escapeCsv(e.createdAt || '')
      ].join(','));

      const csvContent = '\uFEFF' + [headers.join(','), ...rows].join('\r\n');
      const filename = `enquiries_export_${new Date().toISOString().split('T')[0]}.csv`;

      res.setHeader('Content-Type', 'text/csv; charset=utf-8');
      res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
      res.status(200).send(csvContent);
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message || 'Failed to export enquiries' });
    }
  });

  app.get('/api/enquiries', (req, res) => {
    try {
      const { userId, mobile, status, search } = req.query;

      // If querying all leads (not filtering by own user or mobile), require admin token
      if (!userId && !mobile) {
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : '';
        if (!storage.validateAdminToken(token)) {
          return res.status(403).json({
            success: false,
            message: 'Forbidden: Admin authorization required to view all candidate enquiries.'
          });
        }
      }

      const list = storage.getEnquiries({
        userId: userId as string,
        mobile: mobile as string,
        status: status as string,
        search: search as string
      });
      res.json({ success: true, count: list.length, enquiries: list });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  });

  app.post('/api/enquiries', (req, res) => {
    try {
      const { userId, customerName, mobile, email, jobId, candidateTrade, candidateExperience, candidateNotes } = req.body;
      if (!customerName || !mobile || !jobId) {
        return res.status(400).json({ success: false, message: 'Name, mobile number, and Job ID are required' });
      }
      const newEnquiry = storage.createEnquiry({
        userId,
        customerName,
        mobile,
        email,
        jobId,
        candidateTrade,
        candidateExperience,
        candidateNotes
      });
      res.status(201).json({
        success: true,
        enquiry: newEnquiry,
        message: 'Your enquiry has been received. Our team will contact you shortly.'
      });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  });

  app.patch('/api/enquiries/:id/status', requireAdminAuth, (req, res) => {
    try {
      const { status, noteText, followUpDate } = req.body;
      if (!status) {
        return res.status(400).json({ success: false, message: 'Status is required' });
      }
      const updated = storage.updateEnquiryStatus(req.params.id, status, noteText, followUpDate);
      if (!updated) {
        return res.status(404).json({ success: false, message: 'Enquiry not found' });
      }
      res.json({ success: true, enquiry: updated, message: 'Lead status updated successfully' });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  });

  app.post('/api/enquiries/:id/notes', requireAdminAuth, (req, res) => {
    try {
      const { text, author } = req.body;
      if (!text) {
        return res.status(400).json({ success: false, message: 'Note text is required' });
      }
      const updated = storage.addEnquiryNote(req.params.id, text, author || 'Admin');
      if (!updated) {
        return res.status(404).json({ success: false, message: 'Enquiry not found' });
      }
      res.json({ success: true, enquiry: updated, message: 'Note added successfully' });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  });

  app.delete('/api/enquiries/:id', requireAdminAuth, (req, res) => {
    try {
      const deleted = storage.deleteEnquiry(req.params.id);
      if (!deleted) {
        return res.status(404).json({ success: false, message: 'Enquiry not found' });
      }
      res.json({ success: true, message: 'Candidate application deleted successfully' });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  });

  app.post('/api/enquiries/batch-delete', requireAdminAuth, (req, res) => {
    try {
      const { ids } = req.body;
      if (!Array.isArray(ids) || ids.length === 0) {
        return res.status(400).json({ success: false, message: 'Array of candidate application IDs is required' });
      }
      const result = storage.deleteEnquiries(ids);
      res.json({
        success: true,
        deletedCount: result.deletedCount,
        message: `${result.deletedCount} candidate application(s) deleted successfully`
      });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  });

  app.post('/api/enquiries/purge-all', requireAdminAuth, (req, res) => {
    try {
      const result = storage.purgeAllEnquiries();
      res.json({
        success: true,
        deletedCount: result.deletedCount,
        message: `${result.deletedCount} candidate lead(s) and application(s) purged successfully.`
      });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  });

  app.post('/api/cleanup-old-data', requireAdminAuth, (req, res) => {
    try {
      const { purgeJobs, purgeLeads, purgeAds, purgeVideos, jobs, enquiries, ads, videos } = req.body;
      const result = storage.purgeAllOldData({
        jobs: purgeJobs !== undefined ? Boolean(purgeJobs) : (jobs !== undefined ? Boolean(jobs) : true),
        enquiries: purgeLeads !== undefined ? Boolean(purgeLeads) : (enquiries !== undefined ? Boolean(enquiries) : true),
        ads: purgeAds !== undefined ? Boolean(purgeAds) : (ads !== undefined ? Boolean(ads) : true),
        videos: purgeVideos !== undefined ? Boolean(purgeVideos) : (videos !== undefined ? Boolean(videos) : true)
      });
      res.json({
        success: true,
        result,
        message: 'Selected data cleaned and purged successfully.'
      });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  });

  // YouTube Videos Endpoints
  app.get('/api/videos', (req, res) => {
    try {
      const all = req.query.all === 'true';
      const videos = storage.getVideos(!all);
      res.json({ success: true, videos });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  });

  app.post('/api/videos', requireAdminAuth, (req, res) => {
    try {
      const { youtubeUrl, title, description, status, order, replaceExisting } = req.body;
      if (!youtubeUrl || !title) {
        return res.status(400).json({ success: false, message: 'YouTube URL and Title are required' });
      }
      const { video, deletedVideosCount } = storage.createVideo({
        youtubeUrl,
        title,
        description: description || '',
        status: status || 'published',
        order: Number(order) || 1
      }, { replaceExisting });

      const msg = deletedVideosCount > 0
        ? `New video published! ${deletedVideosCount} previous video(s) deleted automatically so only this video is live.`
        : 'Video added successfully';

      res.status(201).json({ success: true, video, deletedVideosCount, message: msg });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  });

  app.put('/api/videos/:id', requireAdminAuth, (req, res) => {
    try {
      const updated = storage.updateVideo(req.params.id, req.body);
      if (!updated) {
        return res.status(404).json({ success: false, message: 'Video not found' });
      }
      res.json({ success: true, video: updated, message: 'Video updated successfully' });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  });

  app.delete('/api/videos/:id', requireAdminAuth, (req, res) => {
    try {
      const deleted = storage.deleteVideo(req.params.id);
      if (!deleted) {
        return res.status(404).json({ success: false, message: 'Video not found' });
      }
      res.json({ success: true, message: 'Video deleted successfully' });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  });

  // Advertisements & Banners Endpoints
  app.get('/api/ads', (req, res) => {
    try {
      const all = req.query.all === 'true';
      const ads = storage.getAdvertisements(!all);
      res.json({ success: true, ads });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  });

  app.post('/api/ads', requireAdminAuth, (req, res) => {
    try {
      const { title, subtitle, image, link, type, status, order, replaceExisting } = req.body;
      if (!title || !image) {
        return res.status(400).json({ success: false, message: 'Title and Image are required' });
      }
      const { ad, deletedAdsCount } = storage.createAdvertisement({
        title,
        subtitle: subtitle || '',
        image,
        link: link || '',
        type: type || 'promo_card',
        status: status || 'active',
        order: Number(order) || 1
      }, { replaceExisting });

      const msg = deletedAdsCount > 0
        ? `New recruitment flyer live! ${deletedAdsCount} previous flyer(s) deleted automatically.`
        : 'Advertisement banner created successfully';

      res.status(201).json({ success: true, ad, deletedAdsCount, message: msg });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  });

  app.put('/api/ads/:id', requireAdminAuth, (req, res) => {
    try {
      const updated = storage.updateAdvertisement(req.params.id, req.body);
      if (!updated) {
        return res.status(404).json({ success: false, message: 'Advertisement not found' });
      }
      res.json({ success: true, ad: updated, message: 'Advertisement banner updated' });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  });

  app.delete('/api/ads/:id', requireAdminAuth, (req, res) => {
    try {
      const deleted = storage.deleteAdvertisement(req.params.id);
      if (!deleted) {
        return res.status(404).json({ success: false, message: 'Advertisement not found' });
      }
      res.json({ success: true, message: 'Advertisement deleted successfully' });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  });

  // ----------------------------------------------------
  // CANDIDATE ENDPOINTS (CUSTOMER)
  // ----------------------------------------------------

  // Get current customer's Candidate Master record
  app.get('/api/candidate/me', (req, res) => {
    try {
      const userId = req.query.userId as string;
      const mobile = req.query.mobile as string;

      if (!userId && !mobile) {
        return res.status(400).json({ success: false, message: 'userId or mobile number is required' });
      }

      // Security check: If a customer bearer token is provided, verify they only access their own profile
      const authHeader = req.headers.authorization;
      if (authHeader) {
        const tokenAuth = storage.validateCustomerToken(authHeader);
        if (tokenAuth.valid && tokenAuth.userId && tokenAuth.userId !== 'admin') {
          if (userId && tokenAuth.userId !== userId) {
            return res.status(403).json({ success: false, message: 'Access denied: You cannot view another candidate\'s private record' });
          }
        }
      }

      const candidate = storage.getCandidateForUser(userId, mobile);
      res.json({ success: true, candidate: candidate || null });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  });

  // Update customer's Candidate Profile (Personal, Passport, Education, Experience, Skills, Career)
  app.put('/api/candidate/me/profile', (req, res) => {
    try {
      const { userId, mobile, ...profileUpdates } = req.body;
      const lookupKey = userId || mobile;

      if (!lookupKey) {
        return res.status(400).json({ success: false, message: 'userId or mobile is required to update profile' });
      }

      // Security check: verify caller authorization
      const authHeader = req.headers.authorization;
      if (authHeader) {
        const tokenAuth = storage.validateCustomerToken(authHeader);
        if (tokenAuth.valid && tokenAuth.userId && tokenAuth.userId !== 'admin') {
          if (userId && tokenAuth.userId !== userId) {
            return res.status(403).json({ success: false, message: 'Access denied: You cannot update another candidate\'s private record' });
          }
        }
      }

      // Ensure candidate exists
      let candidate = storage.getCandidateForUser(userId, mobile);
      if (!candidate) {
        const dummyUser = {
          id: userId || `USR-${Date.now().toString().slice(-5)}`,
          mobile: mobile || '',
          name: profileUpdates.fullName || '',
          role: 'customer' as const,
          createdAt: new Date().toISOString()
        };
        candidate = storage.getOrCreateCandidateForUser(dummyUser);
      }

      const updated = storage.updateCandidateProfile(candidate.id, profileUpdates);
      res.json({ success: true, candidate: updated, message: 'Candidate Profile updated and synchronized with Admin Panel' });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  });

  // Upload a document to candidate profile
  app.post('/api/candidate/me/documents', (req, res) => {
    try {
      const { userId, mobile, type, name, fileData, fileSize } = req.body;
      if (!type || !name) {
        return res.status(400).json({ success: false, message: 'Document type and name are required' });
      }

      let candidate = storage.getCandidateForUser(userId, mobile);
      if (!candidate) {
        const dummyUser = {
          id: userId || `USR-${Date.now().toString().slice(-5)}`,
          mobile: mobile || '',
          name: '',
          role: 'customer' as const,
          createdAt: new Date().toISOString()
        };
        candidate = storage.getOrCreateCandidateForUser(dummyUser);
      }

      const newDoc = storage.addCandidateDocument(candidate.id, {
        type,
        name,
        fileData,
        fileSize
      });

      res.status(201).json({ success: true, document: newDoc, message: 'Document uploaded and linked to Candidate ID' });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  });

  // Delete a document from candidate profile
  app.delete('/api/candidate/me/documents/:docId', (req, res) => {
    try {
      const { userId, mobile } = req.query;
      const candidate = storage.getCandidateForUser(userId as string, mobile as string);
      if (!candidate) {
        return res.status(404).json({ success: false, message: 'Candidate record not found' });
      }

      const removed = storage.deleteCandidateDocument(candidate.id, req.params.docId);
      if (!removed) {
        return res.status(404).json({ success: false, message: 'Document not found' });
      }

      res.json({ success: true, message: 'Document removed from Candidate profile' });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  });

  // Get candidate interested jobs
  app.get('/api/candidate/me/interested-jobs', (req, res) => {
    try {
      const { userId, mobile } = req.query;
      const candidate = storage.getCandidateForUser(userId as string, mobile as string);
      if (!candidate) {
        return res.json({ success: true, interestedJobs: [] });
      }
      res.json({ success: true, interestedJobs: candidate.interestedJobs });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  });

  // Mark job as Interested (1-click customer interest)
  app.post('/api/candidate/me/interested-jobs', (req, res) => {
    try {
      const { userId, mobile, jobId } = req.body;
      if (!jobId) {
        return res.status(400).json({ success: false, message: 'Job ID is required' });
      }

      let candidate = storage.getCandidateForUser(userId, mobile);
      if (!candidate) {
        const dummyUser = {
          id: userId || `USR-${Date.now().toString().slice(-5)}`,
          mobile: mobile || '',
          name: '',
          role: 'customer' as const,
          createdAt: new Date().toISOString()
        };
        candidate = storage.getOrCreateCandidateForUser(dummyUser);
      }

      const interest = storage.addInterestedJob(candidate.id, jobId);
      if (!interest) {
        return res.status(404).json({ success: false, message: 'Job not found' });
      }

      res.json({
        success: true,
        interestedJob: interest,
        message: 'Job marked as Interested and recorded under your Candidate Profile'
      });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  });

  // Remove job from interested list
  app.delete('/api/candidate/me/interested-jobs/:jobId', (req, res) => {
    try {
      const { userId, mobile } = req.query;
      const candidate = storage.getCandidateForUser(userId as string, mobile as string);
      if (!candidate) {
        return res.status(404).json({ success: false, message: 'Candidate record not found' });
      }

      const removed = storage.removeInterestedJob(candidate.id, req.params.jobId);
      res.json({ success: true, message: 'Job removed from interested list' });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  });

  // ----------------------------------------------------
  // ADMIN CANDIDATES MANAGEMENT (STRICTLY ADMIN ONLY)
  // ----------------------------------------------------

  // Customer / Candidate Data Export (CSV / JSON) - Protected Admin Endpoint
  app.get(['/api/admin/candidates/export', '/api/admin/customers/export'], requireAdminAuth, (req, res) => {
    try {
      const format = (req.query.format as string)?.toLowerCase() || 'csv';
      const candidates = storage.getAdminCandidates();

      if (format === 'json') {
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Content-Disposition', `attachment; filename="candidates_export_${new Date().toISOString().split('T')[0]}.json"`);
        return res.json({ success: true, count: candidates.length, exportedAt: new Date().toISOString(), candidates });
      }

      // Generate clean, RFC 4180 compliant CSV
      const headers = [
        'Candidate ID',
        'Full Name',
        'Mobile Number',
        'Email',
        'Trade / Skill',
        'Experience (Years)',
        'Passport Number',
        'Passport Expiry',
        'Current Location',
        'Preferred Sector',
        'Pipeline Status',
        'Total Applied Jobs',
        'Applied Job Titles',
        'Total Documents',
        'Registered Date',
        'Last Profile Update',
        'Admin Remarks'
      ];

      const escapeCsv = (val: any): string => {
        if (val === null || val === undefined) return '""';
        const str = String(val).replace(/"/g, '""');
        return `"${str}"`;
      };

      const rows = candidates.map(c => {
        const appliedTitles = (c.interestedJobs || []).map(j => j.jobTitle).join('; ');
        const expStr = c.totalExperienceYears 
          ? `${c.totalExperienceYears} yrs` 
          : [c.singaporeExperienceYears ? `${c.singaporeExperienceYears} yrs SG` : '', c.gulfExperienceYears ? `${c.gulfExperienceYears} yrs Gulf` : '', c.indiaExperienceYears ? `${c.indiaExperienceYears} yrs India` : ''].filter(Boolean).join(', ');
        return [
          escapeCsv(c.candidateId || c.id),
          escapeCsv(c.fullName || ''),
          escapeCsv(c.mobile || ''),
          escapeCsv(c.email || ''),
          escapeCsv(c.trade || c.educationTrade || ''),
          escapeCsv(expStr || ''),
          escapeCsv(c.passportNumber || ''),
          escapeCsv(c.passportExpiryDate || ''),
          escapeCsv([c.city, c.state, c.country].filter(Boolean).join(', ') || c.address || ''),
          escapeCsv(c.educationTrade || c.trade || ''),
          escapeCsv(c.applicationStatus || 'New Candidate'),
          escapeCsv((c.interestedJobs || []).length),
          escapeCsv(appliedTitles),
          escapeCsv((c.documents || []).length),
          escapeCsv(c.createdAt || ''),
          escapeCsv(c.updatedAt || ''),
          escapeCsv(c.adminRemarks || '')
        ].join(',');
      });

      const csvContent = '\uFEFF' + [headers.join(','), ...rows].join('\r\n');
      const filename = `candidates_export_${new Date().toISOString().split('T')[0]}.csv`;

      res.setHeader('Content-Type', 'text/csv; charset=utf-8');
      res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
      res.status(200).send(csvContent);
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message || 'Failed to export candidate records' });
    }
  });

  // Search & Filter all Candidates
  app.get('/api/admin/candidates', requireAdminAuth, (req, res) => {
    try {
      const { search, status, jobId } = req.query;
      const candidates = storage.getAdminCandidates({
        search: search as string,
        status: status as string,
        jobId: jobId as string
      });

      res.json({ success: true, count: candidates.length, candidates });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  });

  // Get specific Candidate Profile details
  app.get('/api/admin/candidates/:id', requireAdminAuth, (req, res) => {
    try {
      const candidate = storage.getCandidateById(req.params.id);
      if (!candidate) {
        return res.status(404).json({ success: false, message: 'Candidate not found' });
      }
      res.json({ success: true, candidate });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  });

  // Update Candidate Application Status & Admin Remarks
  app.patch('/api/admin/candidates/:id/status', requireAdminAuth, (req, res) => {
    try {
      const { applicationStatus, adminRemarks } = req.body;
      const updated = storage.updateCandidateAdminFields(req.params.id, {
        applicationStatus,
        adminRemarks
      });

      if (!updated) {
        return res.status(404).json({ success: false, message: 'Candidate not found' });
      }

      res.json({
        success: true,
        candidate: updated,
        message: `Candidate status updated to '${applicationStatus || updated.applicationStatus}' and synchronized to customer portal`
      });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  });

  // Update Candidate Admin Remarks
  app.put('/api/admin/candidates/:id/remarks', requireAdminAuth, (req, res) => {
    try {
      const { adminRemarks } = req.body;
      const updated = storage.updateCandidateAdminFields(req.params.id, {
        adminRemarks
      });

      if (!updated) {
        return res.status(404).json({ success: false, message: 'Candidate not found' });
      }

      res.json({ success: true, candidate: updated, message: 'Admin remarks updated successfully' });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  });

  // Admin Candidate Document Deletion (Secure & Authenticated)
  app.delete('/api/admin/candidates/:candidateId/documents/:docId', requireAdminAuth, (req, res) => {
    try {
      const { candidateId, docId } = req.params;
      if (!candidateId || !docId) {
        return res.status(400).json({
          success: false,
          message: 'Candidate ID and Document ID are required.'
        });
      }

      const result = storage.deleteAdminCandidateDocument(candidateId, docId);
      if (!result.success) {
        return res.status(404).json(result);
      }

      res.json({
        success: true,
        message: 'Document deleted successfully.',
        candidateId,
        docId
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message || 'Server error occurred while deleting candidate document.'
      });
    }
  });

  // Admin Candidate Document Replace (Secure & Authenticated)
  app.put('/api/admin/candidates/:candidateId/documents/:docId', requireAdminAuth, (req, res) => {
    try {
      const { candidateId, docId } = req.params;
      const { name, fileData, fileSize, type } = req.body;

      if (!candidateId || !docId) {
        return res.status(400).json({
          success: false,
          message: 'Candidate ID and Document ID are required.'
        });
      }

      const result = storage.replaceCandidateDocument(candidateId, docId, {
        name,
        fileData,
        fileSize,
        type
      });

      if (!result.success) {
        return res.status(404).json(result);
      }

      res.json({
        success: true,
        message: 'Document replaced successfully.',
        document: result.document
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message || 'Server error occurred while replacing candidate document.'
      });
    }
  });

  // Admin Candidate Document Upload (Secure & Authenticated)
  app.post('/api/admin/candidates/:candidateId/documents', requireAdminAuth, (req, res) => {
    try {
      const { candidateId } = req.params;
      const { type, name, fileData, fileSize } = req.body;

      if (!type || !name) {
        return res.status(400).json({
          success: false,
          message: 'Document type and name are required.'
        });
      }

      const newDoc = storage.addCandidateDocument(candidateId, {
        type,
        name,
        fileData,
        fileSize
      });

      if (!newDoc) {
        return res.status(404).json({
          success: false,
          message: 'Candidate record not found.'
        });
      }

      res.status(201).json({
        success: true,
        message: 'Document uploaded successfully.',
        document: newDoc
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message || 'Server error occurred while uploading candidate document.'
      });
    }
  });

  // Admin Candidate Deletion (Secure & Authenticated)
  app.delete('/api/admin/candidates/:id', requireAdminAuth, (req, res) => {
    try {
      const candidateId = req.params.id;
      if (!candidateId) {
        return res.status(400).json({
          success: false,
          message: 'Candidate ID is required for deletion.'
        });
      }

      const result = storage.deleteCandidate(candidateId);
      if (!result.success) {
        return res.status(404).json(result);
      }

      res.json({
        success: true,
        message: result.message,
        candidateId
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message || 'Server error occurred while deleting candidate record.'
      });
    }
  });

  // Image upload simulation / direct base64 handler
  app.post('/api/upload', requireAdminAuth, (req, res) => {
    try {
      const { image, name } = req.body;
      if (!image) {
        return res.status(400).json({ success: false, message: 'Image data is required' });
      }
      // If it's already a URL or base64, return it safely
      const imageUrl = image.startsWith('http') || image.startsWith('data:image')
        ? image
        : `data:image/jpeg;base64,${image}`;

      res.json({ success: true, url: imageUrl, message: 'Image uploaded successfully' });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  });

  // Catch-all for unhandled /api requests - return clean JSON, never HTML
  app.all('/api/*', (req, res) => {
    res.status(404).json({
      success: false,
      message: `API endpoint ${req.method} ${req.originalUrl} not found`
    });
  });

  // Global error handler for API exceptions - guarantees JSON response, never HTML
  app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (req.path.startsWith('/api')) {
      console.error('[API Error]:', err);
      return res.status(500).json({
        success: false,
        message: err?.message || 'Internal server error occurred'
      });
    }
    next(err);
  });

  // --- VITE MIDDLEWARE / SPA FALLBACK ---
  const distPath = path.join(process.cwd(), 'dist');
  const distIndexExists = fs.existsSync(path.join(distPath, 'index.html'));

  if (process.env.NODE_ENV === 'production' && distIndexExists) {
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  } else {
    // If running in development OR if dist hasn't been built yet, use Vite dev middleware
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Arudhra Singapore Recruitment Server running at http://localhost:${PORT}`);
  });
}

startServer().catch(err => {
  console.error('Failed to start server:', err);
});
