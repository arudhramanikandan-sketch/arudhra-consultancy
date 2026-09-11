export type JobCategory =
  | 'All'
  | 'Construction & Civil'
  | 'Marine & Shipyard'
  | 'Manufacturing & Production'
  | 'F&B & Hospitality'
  | 'Logistics & Warehouse'
  | 'Retail & Customer Service'
  | 'Automotive & Mechanical'
  | 'Electrical & Maintenance'
  | 'Healthcare & Nursing'
  | 'IT & Admin Support';

export type JobType =
  | 'Work Permit'
  | 'NTS Work Permit'
  | 'NTS Workpermit'
  | 'PCM'
  | 'Construction Permit'
  | 'Marine Permit'
  | 'S Pass'
  | 'E Pass'
  | 'Full-Time'
  | 'Contract'
  | string;

export type ApplicationStatus =
  | 'Submitted'
  | 'Under Review'
  | 'Shortlisted'
  | 'Interview'
  | 'Selected'
  | 'Rejected'
  | 'On Hold'
  | 'submitted'
  | 'under_review'
  | 'shortlisted'
  | 'interview'
  | 'selected'
  | 'rejected'
  | 'on_hold';

export type EnquiryStatus =
  | 'New'
  | 'Contacted'
  | 'Interested'
  | 'Documents Pending'
  | 'Processing'
  | 'Selected'
  | 'Closed'
  | 'new'
  | 'contacted'
  | 'interested'
  | 'documents_pending'
  | 'processing'
  | 'selected'
  | 'closed';

export interface LeadNote {
  id: string;
  text: string;
  createdAt: string;
  author: string;
}

export type DocumentType =
  | 'resume'
  | 'passport'
  | 'education'
  | 'experience'
  | 'trade_certificate'
  | 'photo'
  | 'other';

export interface CandidateDocument {
  id: string;
  candidateId: string;
  type: DocumentType;
  name: string;
  fileData?: string; // base64 / dataUrl / placeholder
  fileSize?: string;
  uploadedAt: string;
}

export interface InterestedJob {
  id?: string;
  candidateId?: string;
  jobId: string;
  jobTitle: string;
  employer?: string;
  location?: string;
  country?: string;
  salary?: string;
  category?: string;
  markedDate?: string;
  markedAt?: string;
}

export interface CandidateRecord {
  id: string; // e.g. "CAND-0001" or storage uuid
  candidateId?: string; // "CAND-0001"
  userId: string; // links to User.id
  fullName: string;
  mobile: string;
  email?: string;
  dateOfBirth?: string;
  dob?: string;
  gender?: 'Male' | 'Female' | 'Other' | 'male' | 'female' | 'other';
  maritalStatus?: 'Single' | 'Married' | 'single' | 'married';
  nationality?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  postalCode?: string;
  // Passport Details
  passportNumber?: string;
  passportIssueDate?: string;
  passportExpiryDate?: string;
  passportPlaceOfIssue?: string;
  passportEcrStatus?: 'ECNR' | 'ECR' | string;
  // Education
  highestQualification?: string;
  educationQualification?: string;
  educationTrade?: string;
  trade?: string;
  institutionName?: string;
  educationInstitute?: string;
  yearOfPassing?: string;
  educationPassingYear?: string;
  // Work Experience
  totalExperienceYears?: number | string;
  singaporeExperienceYears?: number | string;
  gulfExperienceYears?: number | string;
  indiaExperienceYears?: number | string;
  currentEmployer?: string;
  currentDesignation?: string;
  previousCompany?: string;
  pastSingaporeFin?: string;
  // Skills & Languages
  skills?: string[];
  languages?: string[];
  // Career Preferences
  preferredTrade?: string;
  expectedSalarySgd?: number | string;
  noticePeriod?: string;
  availabilityNoticePeriod?: string;
  singaporeFinOrPassHistory?: string;
  // Admin fields
  applicationStatus: ApplicationStatus;
  adminRemarks?: string;
  // Relational records
  documents: CandidateDocument[];
  interestedJobs: InterestedJob[];
  applications: Enquiry[];
  createdAt: string;
  updatedAt: string;
}

export interface Job {
  id: string;
  title: string;
  employer?: string;
  category: string;
  location: string; // e.g. "Jurong, Singapore", "Changi, Singapore"
  salary: string; // e.g. "SGD 2,200 - 2,800 / month"
  qualification: string; // e.g. "ITI / Diploma / 10th / 12th"
  experience: string; // e.g. "2+ Years (Singapore / Gulf / Fresh)"
  jobType: JobType;
  vacancyCount?: number;
  description: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
  requiredDocuments: string[];
  image?: string; // Poster URL
  status: 'published' | 'unpublished';
  featured: boolean;
  latest: boolean;
  postedDate: string;
  deadline?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Enquiry {
  id: string;
  userId?: string;
  customerName: string;
  mobile: string;
  email?: string;
  jobId: string;
  jobTitle: string;
  jobCategory?: string;
  location?: string;
  salary?: string;
  candidateTrade?: string;
  candidateExperience?: string;
  candidateNotes?: string;
  status: EnquiryStatus;
  notes?: LeadNote[];
  adminNotes?: string;
  assignedAdmin?: string;
  followUpDate?: string;
  lastFollowUpDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  mobile: string;
  name: string;
  email?: string;
  role: 'customer' | 'admin';
  trade?: string;
  experience?: string;
  createdAt: string;
}

export interface VideoItem {
  id: string;
  youtubeUrl: string;
  title: string;
  description: string;
  status: 'published' | 'unpublished';
  order: number;
  createdAt: string;
}
export type Video = VideoItem;

export interface Advertisement {
  id: string;
  title: string;
  subtitle?: string;
  image: string;
  link?: string;
  linkUrl?: string;
  type?: 'hero_banner' | 'promo_card' | 'campaign_banner';
  status: 'active' | 'inactive';
  order: number;
  createdAt: string;
}
export type AdBanner = Advertisement;

export type AppTab =
  | 'home'
  | 'jobs'
  | 'about'
  | 'videos'
  | 'reviews'
  | 'contact'
  | 'candidate-login'
  | 'portal'
  | 'admin-login'
  | 'admin';

export interface SiteSettings {
  businessName: string;
  tagline: string;
  phone: string;
  whatsappNumber: string;
  email: string;
  officeAddress: string;
  city: string;
  country: string;
  postalCode: string;
  // Branding & Logo
  logoUrl?: string;
  mobileLogoUrl?: string;
  logoEmblemText?: string;
  logoTitle?: string;
  logoSubtitle?: string;
  logoDisplayMode?: 'emblem_text' | 'image_only' | 'image_text';
  logoEmblemBg?: string;
  logoEmblemShape?: 'rounded-xl' | 'rounded-full' | 'rounded-2xl' | 'rounded-lg';
  // Google Maps & Reviews
  googleMapsEmbedUrl: string;
  googleMapsDirectionUrl: string;
  facebookUrl: string;
  instagramUrl: string;
  youtubeUrl: string;
  googleReviewsUrl: string;
  googleRating: number;
  totalReviewsCount: number;
  // Content
  heroHeadline: string;
  heroSubheadline: string;
  aboutTitle: string;
  aboutContent: string;
  aboutPoints: string[];
  licenseNotice?: string;
  // Admin 2FA Password & Security (TOTP RFC 6238)
  admin2faEnabled?: boolean;
  admin2faEnrolled?: boolean;
  admin2faEnrolledAt?: string;
  admin2faSecret?: string;
  admin2faPin?: string;
  admin2faBackupCodes?: string[];
  // Theme & Appearance
  themeColor?: 'crimson' | 'navy' | 'emerald' | 'charcoal' | 'amber';
  themeMode?: 'light' | 'dark';
  // Brevo (Sendinblue) Transactional Email Gateway
  brevoApiKey?: string;
  brevoSenderEmail?: string;
  brevoSenderName?: string;
  // Exclusive Live Website Mode & Auto-Cleanup
  autoReplaceOldJobs?: boolean;
  autoReplaceOldFlyers?: boolean;
  autoReplaceOldVideos?: boolean;
  autoClearOldLeadsOnNewJob?: boolean;
  autoPruneOldLeads?: boolean;
}
