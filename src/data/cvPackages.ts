import { CVPackageInfo, CVExperienceLevel } from '../types';

export const CV_JOB_CATEGORIES = [
  'Hospitality / Hotel',
  'Chef / Cook / Parotta Master',
  'Housekeeping',
  'Waiter / Restaurant Staff',
  'Driver',
  'Delivery / Logistics',
  'Construction',
  'Electrician',
  'Plumber',
  'Welder',
  'Technician / Mechanic',
  'Mechanical Engineering',
  'Electrical Engineering',
  'Civil Engineering',
  'Electronics / ECE',
  'IT / Software',
  'Healthcare / Nursing',
  'Accounting / Finance',
  'Sales / Marketing',
  'Office / Administration',
  'Other'
] as const;

export const CV_EXPERIENCE_LEVELS: CVExperienceLevel[] = [
  'Fresher / No Experience',
  '1–2 Years',
  '3–5 Years',
  '5+ Years'
];

export const CV_PACKAGES: CVPackageInfo[] = [
  {
    id: 'basic',
    name: 'Basic CV',
    price: 99,
    description: 'Clean, structured resume formatting for entry-level applicants and immediate job submissions.',
    features: [
      'Professional formatting',
      'High-resolution PDF file',
      'Editable Word file (.docx)',
      'Clean single-column layout',
      'MOM & Employer friendly typography'
    ],
    revisions: 'Final delivery',
    deliveryTime: 'Within 24–48 hours',
    recommendedFor: 'Freshers & immediate trade submissions'
  },
  {
    id: 'professional',
    name: 'Professional CV',
    price: 199,
    badge: 'Popular',
    description: 'Job-profile-focused resume highlighting your industry skills, core duties, and employment history.',
    features: [
      'Professional formatting',
      'Job-profile-focused structure',
      'High-resolution PDF file',
      'Editable Word file (.docx)',
      '1 Revision included',
      'Technical skills & machinery highlights'
    ],
    revisions: '1 revision included',
    deliveryTime: 'Within 24–48 hours',
    recommendedFor: 'Technicians, hospitality & skilled workers'
  },
  {
    id: 'modern',
    name: 'Modern CV',
    price: 249,
    description: 'Contemporary, polished executive design with modern layout aesthetics that capture attention immediately.',
    features: [
      'Modern professional design',
      'High-resolution PDF file',
      'Editable Word file (.docx)',
      '1 Revision included',
      'Infographic skill rating visualizers',
      'Clean section hierarchy & typography'
    ],
    revisions: '1 revision included',
    deliveryTime: 'Within 24–48 hours',
    recommendedFor: 'Engineers, supervisors & office staff'
  },
  {
    id: 'overseas',
    name: 'Overseas Job CV',
    price: 299,
    badge: 'Best for Singapore & Gulf',
    popular: true,
    description: 'Specially formatted for international recruitment agencies and employers with visa/permit criteria.',
    features: [
      'Overseas-job-oriented professional format',
      'Singapore & Gulf employer compliant',
      'Passport & CoreTrade/License sections',
      'High-resolution PDF file',
      'Editable Word file (.docx)',
      '1 Revision included',
      'Free guidance on document readiness'
    ],
    revisions: '1 revision included',
    deliveryTime: 'Within 24 hours (Priority)',
    recommendedFor: 'Singapore NTS, PCM, S Pass, Gulf candidates'
  },
  {
    id: 'cv_cover_letter',
    name: 'CV + Cover Letter',
    price: 399,
    badge: 'Complete Package',
    description: 'All-inclusive career bundle featuring a tailored professional CV and a persuasive application cover letter.',
    features: [
      'Professional CV tailored to your trade',
      'Custom targeted Cover Letter',
      'High-resolution PDF files',
      'Editable Word files (.docx)',
      '1 Revision included',
      'Interview preparation tips & checklist'
    ],
    revisions: '1 revision included',
    deliveryTime: 'Within 24–36 hours',
    recommendedFor: 'Supervisors, managers & competitive roles'
  }
];
