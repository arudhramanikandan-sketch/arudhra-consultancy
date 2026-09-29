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
  whatsappNumber?: string;
  alternateMobile?: string;
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
  status: 'published' | 'unpublished' | 'active' | 'deleted' | string;
  is_deleted?: boolean;
  isDeleted?: boolean;
  deleted?: boolean;
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
  whatsappNumber?: string;
  alternateMobile?: string;
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
  | 'admin'
  | 'esim'
  | 'cv';

export type CVPackageType =
  | 'basic'
  | 'professional'
  | 'modern'
  | 'overseas'
  | 'cv_cover_letter';

export type CVExperienceLevel =
  | 'Fresher / No Experience'
  | '1–2 Years'
  | '3–5 Years'
  | '5+ Years';

export type CVPaymentStatus =
  | 'payment_verification_pending'
  | 'payment_verified'
  | 'payment_rejected'
  | 'pending'
  | 'paid'
  | 'failed';

export type CVOrderStatus =
  | 'order_received'
  | 'details_under_review'
  | 'cv_preparation'
  | 'cv_ready'
  | 'delivered'
  | 'revision_requested'
  | 'completed'
  | 'payment_pending'
  | 'paid'
  | 'details_pending'
  | 'details_received'
  | 'in_preparation'
  | 'under_review'
  | 'cancelled';

export interface CVPersonalDetails {
  fullName: string;
  mobile: string;
  email: string;
  fatherParentName?: string;
  fatherName?: string;
  dateOfBirth?: string;
  dob?: string;
  gender?: string;
  maritalStatus?: string;
  nationality?: string;
  currentCity?: string;
  country?: string;
  communicationAddress?: string;
  profilePhotoUrl?: string;
}

export interface CVEducationRecord {
  id: string;
  qualificationLevel: string; // '10th / Secondary' | '12th / Higher Secondary' | 'Diploma' | 'ITI' | 'UG' | 'PG' | 'PhD / Doctorate' | 'Professional Certification' | 'Other'
  courseDegree: string;
  specialization?: string;
  schoolCollege: string;
  boardUniversity?: string;
  location?: string;
  yearJoining?: string;
  yearPassing: string;
  percentageCgpa?: string;
  notes?: string;
}

export interface CVEmploymentRecord {
  id: string;
  companyName: string;
  jobTitle: string;
  location?: string;
  startDate: string;
  endDate?: string;
  isCurrentlyWorking: boolean;
  responsibilities: string;
  keySkills?: string;
  achievements?: string;
}

export interface CVLanguageItem {
  name: string;
  proficiency: 'Basic' | 'Intermediate' | 'Fluent' | 'Native';
}

export interface CVSkillsData {
  technicalSkills: string[];
  softwareTools: string[];
  professionalSkills: string[];
  languagesKnown: CVLanguageItem[];
  otherSkills: string[];
}

export interface CVProjectRecord {
  id: string;
  title: string;
  description?: string;
  role?: string;
  toolsUsed?: string;
  duration?: string;
  outcome?: string;
}

export interface CVInternshipRecord {
  id: string;
  company: string;
  position: string;
  startDate?: string;
  endDate?: string;
  responsibilities?: string;
  skillsLearned?: string;
}

export interface CVCertificationRecord {
  id: string;
  name: string;
  issuingOrganization: string;
  yearDate?: string;
  certificateId?: string;
  description?: string;
}

export interface CVSeminarRecord {
  id: string;
  title: string;
  organization?: string;
  dateYear?: string;
  description?: string;
}

export interface CVActivityRecord {
  id: string;
  category: 'Sports' | 'Competitions' | 'Leadership' | 'Volunteer Activities' | 'Clubs / Organizations' | 'Other';
  title: string;
  description?: string;
}

export interface CVAchievementRecord {
  id: string;
  title: string;
  description?: string;
  dateYear?: string;
}

export interface CVOverseasInfo {
  preferredPosition?: string;
  preferredCountry?: string;
  preferredLocation?: string;
  passportAvailable?: 'Yes' | 'No';
  passportExpiryDate?: string;
  visaStatus?: string;
  noticePeriod?: string;
  drivingLicence?: string;
  linkedinProfile?: string;
  portfolioWebsite?: string;
}

export interface CVSupportingDocument {
  id: string;
  name: string;
  type: string;
  fileSize?: string;
  fileData?: string;
  uploadedAt: string;
}

export interface CVFresherDetails {
  qualification: string;
  courseDegree: string;
  institution: string;
  yearOfPassing: string;
  internship?: string;
  academicProject?: string;
  skills: string;
  certifications?: string;
}

export interface CVPackageInfo {
  id: CVPackageType;
  name: string;
  price: number;
  badge?: string;
  popular?: boolean;
  description: string;
  features: string[];
  revisions: string;
  deliveryTime: string;
  recommendedFor?: string;
}

export interface CVOrder {
  id: string; // e.g. AR-CV-100001
  customerName: string;
  mobile: string;
  email: string;
  jobCategory: string;
  customCategory?: string;
  experienceLevel: CVExperienceLevel;
  cvType: CVPackageType;
  cvPackageName: string;
  selectedTemplateId?: string;
  selectedTemplateName?: string;
  amount: number;
  currency: string;
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  paymentMethod?: 'upi' | 'card' | 'netbanking' | 'qr';
  paymentId?: string;
  paidAt?: string;
  orderStatus: CVOrderStatus;
  notes?: string;
  adminNotes?: string;

  // Complete Detailed Candidate Profile Data:
  personalDetails?: CVPersonalDetails;
  careerObjective?: string;
  educationList?: CVEducationRecord[];
  employmentHistory?: CVEmploymentRecord[];
  skillsData?: CVSkillsData;
  projects?: CVProjectRecord[];
  internships?: CVInternshipRecord[];
  certifications?: CVCertificationRecord[];
  seminars?: CVSeminarRecord[];
  activities?: CVActivityRecord[];
  achievements?: CVAchievementRecord[];
  overseasInfo?: CVOverseasInfo;
  documents?: CVSupportingDocument[];

  // Legacy Fresher fallback support
  fresherDetails?: CVFresherDetails;

  // Final Delivery Files (PDF & Editable Word)
  deliveredPdfUrl?: string;
  deliveredWordUrl?: string;
  deliveredDocUrl?: string;
  deliveredAt?: string;
  deliveryMethod?: 'whatsapp' | 'email' | 'both';
  revisionCount?: number;
  revisionNotes?: string;

  whatsappSent?: boolean;
  createdAt: string;
  updatedAt: string;
}

export type CVTemplateFilter =
  | 'All'
  | 'Fresher'
  | 'Experienced'
  | 'Hospitality'
  | 'Skilled Worker'
  | 'Engineering'
  | 'IT'
  | 'Healthcare'
  | 'Office / Professional';

export interface CVTemplate {
  id: string;
  name: string;
  tagline: string;
  badge?: string;
  suitableCategories: string[];
  suitableExperience: string[];
  filterCategory: CVTemplateFilter;
  layoutStyle: 'classic-ats' | 'modern-accent' | 'compact-technical' | 'executive-split' | 'clean-minimal';
  themeColor: string; // hex or tailwind tone
  accentBg: string;
  borderTone: string;
  atsFriendly: boolean;
  overseasSuitable: boolean;
  features: string[];
  dummyCandidate: {
    name: string;
    targetRole: string;
    location: string;
    contactInfo: string;
    passportOrPass?: string;
    summary: string;
    skills: string[];
    workExperience: Array<{
      title: string;
      company: string;
      period: string;
      location: string;
      points: string[];
    }>;
    education: Array<{
      degree: string;
      institution: string;
      year: string;
    }>;
    certifications: string[];
    languages?: string[];
  };
}

export interface SiteSettings {
  businessName: string;
  tagline: string;
  phone: string;
  whatsappNumber: string;
  whatsappGroupUrl?: string;
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
  googleProfileUrl?: string;
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
  adminPassword?: string;
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
  // Jobs dynamic last updated timestamp (DD MMM YYYY, hh:mm AM/PM)
  jobsLastUpdatedAt?: string;
}
