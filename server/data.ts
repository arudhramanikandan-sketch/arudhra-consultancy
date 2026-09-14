import { Job, Enquiry, VideoItem, Advertisement, SiteSettings, User } from '../src/types';

export const initialSiteSettings: SiteSettings = {
  businessName: 'ARUDHRA CONSULTANCY',
  tagline: 'Singapore Overseas Recruitment & Placement Support',
  phone: '7418845083',
  whatsappNumber: '7418845083',
  whatsappGroupUrl: 'https://chat.whatsapp.com/GJOntCsJT3dKskOFm16T6R?s=cl&p=a&mlu=4&ilr=4',
  email: 'info@arudhraconsultancy.com',
  officeAddress: '1/149, Ganesh Complex, Avinashi Road, Neelambur, Coimbatore – 641062',
  city: 'Coimbatore',
  country: 'India',
  postalCode: '641062',
  logoUrl: '/arudhra-logo.png',
  mobileLogoUrl: '/arudhra-logo.png',
  logoEmblemText: 'AC',
  logoTitle: 'ARUDHRA',
  logoSubtitle: 'CONSULTANCY',
  logoDisplayMode: 'image_only',
  logoEmblemBg: '#7f1d1d',
  logoEmblemShape: 'rounded-xl',
  googleMapsEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.141753177726!2d77.0855!3d11.0665!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba85781b186657d%3A0x10e361bff5a411c3!2sARUDHRA%20CONSULTANCY!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin',
  googleMapsDirectionUrl: 'https://maps.app.goo.gl/fK584Kff5UEfDLNM8?g_st=awb',
  googleProfileUrl: 'https://maps.app.goo.gl/fK584Kff5UEfDLNM8?g_st=awb',
  facebookUrl: 'https://www.facebook.com/share/1CnqEMkex8/',
  instagramUrl: 'https://www.instagram.com/arudhraconsultancysgd?utm_source=qr&stkn=MWw3YmpnczM0bm9pdg==',
  youtubeUrl: 'https://youtube.com/@arudhraconsultancy-v4o?si=kV4Tv7-nazoqeVcD',
  googleReviewsUrl: 'https://maps.app.goo.gl/fK584Kff5UEfDLNM8?g_st=awb',
  googleRating: 4.9,
  totalReviewsCount: 128,
  heroHeadline: 'Singapore Overseas Recruitment & Placement Support',
  heroSubheadline: 'Direct overseas recruitment assistance and placement support for skilled and semi-skilled candidates seeking verified career pathways in Singapore.',
  aboutTitle: 'Singapore Overseas Recruitment & Placement Support',
  aboutContent: 'Arudhra Consultancy provides dedicated overseas recruitment assistance and placement facilitation for candidates seeking legitimate employment opportunities in Singapore. We focus on structured candidate profiling, employer interview coordination, document guidance, and transparent deployment assistance.',
  aboutPoints: [
    'Specialized recruitment facilitation for verified Singapore employer vacancies',
    'Comprehensive guidance on Singapore job scopes, work pass eligibility, and salary packages',
    'Transparent candidate documentation support and application progress tracking',
    'Professional pre-departure orientation covering Singapore workplace regulations and lifestyle',
    'Prompt communication and dedicated candidate assistance at every step'
  ],
  licenseNotice: 'Singapore Overseas Recruitment & Placement Support Services',
  // Admin 2FA Password & Security (TOTP RFC 6238)
  admin2faEnabled: true,
  admin2faEnrolled: false,
  admin2faSecret: 'ARUDHRA7MZQK4X2P',
  // Theme & Appearance
  themeColor: 'crimson',
  themeMode: 'light',
  // Exclusive Live Website Mode & Auto-Cleanup
  autoReplaceOldJobs: false,
  autoReplaceOldFlyers: false,
  autoReplaceOldVideos: false,
  autoClearOldLeadsOnNewJob: false,
  autoPruneOldLeads: false
};

/**
 * Initial jobs array is kept empty so deleted jobs never resurrect.
 * Jobs are dynamically loaded and saved to persistent disk storage (storage_data.json).
 */
export const initialJobs: Job[] = [];

export const initialEnquiries: Enquiry[] = [
  {
    id: 'ENQ-2026-8801',
    userId: 'USR-8901',
    customerName: 'Karthik Raja',
    mobile: '+91 98412 87654',
    email: 'karthik.raja.tech@gmail.com',
    jobId: 'SG-JOB-101',
    jobTitle: 'CNC Milling & Turning Machinist',
    jobCategory: 'Manufacturing & Production',
    location: 'Jurong Industrial Estate, Singapore',
    salary: 'SGD 2,400 - 3,200 / month',
    candidateTrade: 'CNC Machinist (Fanuc / Siemens)',
    candidateExperience: '4 Years CNC Milling in Chennai Automotive Tier-1',
    candidateNotes: 'Candidate has valid passport ready. Has 4 years experience on 3-axis VMC. Looking for immediate S Pass interview in Singapore.',
    status: 'Contacted',
    notes: [
      {
        id: 'NOTE-1',
        text: 'Called candidate. Confirmed Fanuc G-code knowledge and English basic conversational level. Requested passport copy and work videos.',
        createdAt: '2026-08-26T10:30:00.000Z',
        author: 'Arudhra Admin'
      }
    ],
    lastFollowUpDate: '2026-08-26',
    createdAt: '2026-08-25T14:20:00.000Z',
    updatedAt: '2026-08-26T10:30:00.000Z'
  },
  {
    id: 'ENQ-2026-8802',
    userId: 'USR-8902',
    customerName: 'Murugan Sundaram',
    mobile: '+91 97890 12345',
    email: 'murugan.welder@gmail.com',
    jobId: 'SG-JOB-102',
    jobTitle: '6G Pipe Welder (TIG & ARC)',
    jobCategory: 'Marine & Shipyard',
    location: 'Tuas Shipyard Basin, Singapore',
    salary: 'SGD 2,600 - 3,500 / month',
    candidateTrade: '6G Welder',
    candidateExperience: '5 Years in Gulf Shipyard (TIG + ARC)',
    candidateNotes: 'Has prior Dubai Drydocks experience. Completed 6G certification. Passport valid till 2030.',
    status: 'Documents Pending',
    notes: [
      {
        id: 'NOTE-2',
        text: 'Candidate passed preliminary weld video screening. Awaiting official WQR / X-ray certificate submission.',
        createdAt: '2026-08-27T11:00:00.000Z',
        author: 'Arudhra Admin'
      }
    ],
    lastFollowUpDate: '2026-08-27',
    createdAt: '2026-08-26T09:15:00.000Z',
    updatedAt: '2026-08-27T11:00:00.000Z'
  },
  {
    id: 'ENQ-2026-8803',
    userId: 'USR-8903',
    customerName: 'Praveen Kumar',
    mobile: '+91 94440 98765',
    email: 'praveen.hotelmgmt@gmail.com',
    jobId: 'SG-JOB-103',
    jobTitle: 'F&B Service Captain & Captain Trainee',
    jobCategory: 'F&B & Hospitality',
    location: 'Marina Bay / Orchard Road, Singapore',
    salary: 'SGD 2,300 - 2,900 / month',
    candidateTrade: 'Hospitality / F&B Service',
    candidateExperience: '2 Years in 4-Star Business Hotel',
    candidateNotes: 'Good spoken English. Diploma in Catering & Hotel Administration. Immediate joiner.',
    status: 'New',
    notes: [],
    lastFollowUpDate: undefined,
    createdAt: '2026-08-28T08:45:00.000Z',
    updatedAt: '2026-08-28T08:45:00.000Z'
  }
];

export const initialVideos: VideoItem[] = [
  {
    id: 'VID-01',
    youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    title: 'Singapore Overseas Recruitment Process & Documentation Guide',
    description: 'Detailed walkthrough of Singapore Work Permit & S Pass application steps, medical examinations, MOM biometric verification, and pre-departure briefings.',
    status: 'published',
    order: 1,
    createdAt: '2026-08-15T10:00:00.000Z'
  },
  {
    id: 'VID-02',
    youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    title: 'Life & Work in Singapore for Technical & Skilled Workers',
    description: 'Understanding Singapore public transport (MRT/Bus), dormitory and housing guidelines, remittance systems, and workplace safety laws.',
    status: 'published',
    order: 2,
    createdAt: '2026-08-18T10:00:00.000Z'
  },
  {
    id: 'VID-03',
    youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    title: 'Important Do\'s and Don\'ts for Overseas Candidates Traveling to Singapore',
    description: 'Essential immigration tips, customs regulations, SG Arrival Card filing, and initial settlement guidance from Arudhra Consultancy.',
    status: 'published',
    order: 3,
    createdAt: '2026-08-20T10:00:00.000Z'
  }
];

export const initialAdvertisements: Advertisement[] = [
  {
    id: 'AD-01',
    title: 'Singapore Marine & Shipyard Mega Walk-In Interview Drive',
    subtitle: 'Urgent hiring for 6G TIG/ARC Welders, Pipe Fitters, Steel Fabricators & Riggers in Tuas and Jurong Shipyards. Direct employer selection.',
    image: 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=1200&q=80',
    link: '#jobs',
    type: 'hero_banner',
    status: 'active',
    order: 1,
    createdAt: '2026-08-20T08:00:00.000Z'
  },
  {
    id: 'AD-02',
    title: 'Precision Machining & Aerospace CNC Recruitment Campaign',
    subtitle: 'Direct placement for CNC Milling (3-5 Axis) & CNC Turning Operators with Fanuc / Siemens control expertise. High OT and SGD packages.',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
    link: '#jobs',
    type: 'campaign_banner',
    status: 'active',
    order: 2,
    createdAt: '2026-08-22T08:00:00.000Z'
  },
  {
    id: 'AD-03',
    title: 'Singapore Construction Safety & MEP Engineering Drive',
    subtitle: 'S Pass & Work Permit opportunities for BCSS Safety Coordinators, Electrical Maintenance Technicians & Site Supervisors.',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80',
    link: '#jobs',
    type: 'promo_card',
    status: 'active',
    order: 3,
    createdAt: '2026-08-25T08:00:00.000Z'
  },
  {
    id: 'AD-04',
    title: 'Luxury Hotel & Marina Bay F&B Hospitality Selection',
    subtitle: 'Immediate vacancy for Service Captains, Bartenders, Kitchen Commis & Hotel Supervisors. Meals & duty benefits provided.',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
    link: '#jobs',
    type: 'promo_card',
    status: 'active',
    order: 4,
    createdAt: '2026-08-27T08:00:00.000Z'
  },
  {
    id: 'AD-05',
    title: 'Changi Air Cargo Logistics & High-Reach Forklift Drive',
    subtitle: 'Warehouse Assistants & Counterbalance/Reach Truck Forklift Drivers for Singapore Changi North Logistics Hub.',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
    link: '#jobs',
    type: 'promo_card',
    status: 'active',
    order: 5,
    createdAt: '2026-08-29T08:00:00.000Z'
  }
];

export const initialAdminUser: User = {
  id: 'USR-ADMIN-01',
  mobile: '+919840123456',
  name: 'Arudhra Administrator',
  email: 'info@arudhraconsultancy.com',
  role: 'admin',
  createdAt: '2026-01-01T00:00:00.000Z'
};

export const initialCandidates: import('../src/types').CandidateRecord[] = [
  {
    id: 'CAND-0001',
    candidateId: 'CAND-0001',
    userId: 'USR-CAND-01',
    fullName: 'Manikandan S',
    mobile: '+919840123456',
    email: 'manikandan.sgjob@gmail.com',
    dob: '1996-05-14',
    gender: 'Male',
    nationality: 'Indian',
    address: '12/4, Gandhi Street, Chromepet',
    city: 'Chennai',
    state: 'Tamil Nadu',
    country: 'India',
    postalCode: '600044',
    passportNumber: 'Z6549872',
    passportIssueDate: '2022-03-10',
    passportExpiryDate: '2032-03-09',
    passportPlaceOfIssue: 'Chennai',
    passportEcrStatus: 'ECNR',
    educationQualification: 'Diploma in Mechanical Engineering',
    educationTrade: 'CNC Machinist & Programming',
    educationInstitute: 'Government Polytechnic College, Chennai',
    educationPassingYear: '2017',
    totalExperienceYears: '5.5 Years',
    singaporeExperienceYears: '2 Years (Jurong Tech Pte Ltd, 2021-2023)',
    gulfExperienceYears: '0',
    indiaExperienceYears: '3.5 Years',
    previousCompany: 'Precision Machining Systems, Chennai',
    skills: ['CNC 3-Axis & 5-Axis Milling', 'Fanuc Control', 'Mastercam', 'Blueprint Reading', 'Micrometer / Vernier'],
    languages: ['Tamil (Fluent)', 'English (Professional)', 'Hindi (Basic)'],
    preferredTrade: 'CNC Machinist / Mechanical Tech',
    expectedSalarySgd: 'SGD 2,600 - 3,000 / month',
    availabilityNoticePeriod: 'Immediate (Passport Ready)',
    singaporeFinOrPassHistory: 'Previous S Pass holder (Valid exit clearance)',
    applicationStatus: 'Under Review',
    adminRemarks: 'Strong candidate with verified 2-year Singapore CNC experience. All original certificates and passport copy verified. Scheduled for employer resume shortlisting.',
    documents: [
      {
        id: 'DOC-101',
        candidateId: 'CAND-0001',
        type: 'resume',
        name: 'Manikandan_S_CNC_Resume.pdf',
        fileSize: '420 KB',
        uploadedAt: '2026-08-25T10:30:00.000Z'
      },
      {
        id: 'DOC-102',
        candidateId: 'CAND-0001',
        type: 'passport',
        name: 'Passport_Copy_Front_Back_Z6549872.pdf',
        fileSize: '1.2 MB',
        uploadedAt: '2026-08-25T10:32:00.000Z'
      },
      {
        id: 'DOC-103',
        candidateId: 'CAND-0001',
        type: 'education',
        name: 'Diploma_Mechanical_Certificate.pdf',
        fileSize: '850 KB',
        uploadedAt: '2026-08-25T10:35:00.000Z'
      },
      {
        id: 'DOC-104',
        candidateId: 'CAND-0001',
        type: 'experience',
        name: 'Singapore_Service_Letter_JurongTech.pdf',
        fileSize: '620 KB',
        uploadedAt: '2026-08-25T10:36:00.000Z'
      },
      {
        id: 'DOC-105',
        candidateId: 'CAND-0001',
        type: 'photo',
        name: 'Passport_Size_Photo_WhiteBG.jpg',
        fileSize: '210 KB',
        uploadedAt: '2026-08-25T10:38:00.000Z'
      }
    ],
    interestedJobs: [
      {
        id: 'INT-01',
        candidateId: 'CAND-0001',
        jobId: 'SG-JOB-101',
        jobTitle: 'CNC Milling & Turning Machinist',
        employer: 'Precision Engineering Tech Pte Ltd',
        location: 'Jurong Industrial Estate, Singapore',
        country: 'Singapore',
        salary: 'SGD 2,400 - 3,200 / month',
        category: 'Manufacturing & Production',
        markedDate: '2026-08-25T10:15:00.000Z'
      }
    ],
    applications: [
      {
        id: 'ENQ-2026-1001',
        userId: 'USR-CAND-01',
        customerName: 'Manikandan S',
        mobile: '+919840123456',
        email: 'manikandan.sgjob@gmail.com',
        jobId: 'SG-JOB-101',
        jobTitle: 'CNC Milling & Turning Machinist',
        jobCategory: 'Manufacturing & Production',
        location: 'Jurong Industrial Estate, Singapore',
        salary: 'SGD 2,400 - 3,200 / month',
        candidateTrade: 'CNC Machinist (Fanuc / Siemens)',
        candidateExperience: '5.5 Years (2 Yrs Singapore)',
        candidateNotes: 'Seeking S Pass or Work Permit CNC opportunity in Singapore.',
        status: 'Processing',
        notes: [
          {
            id: 'NOTE-1',
            text: 'Profile submitted to Singapore engineering employer for video interview slot.',
            createdAt: '2026-08-26T11:00:00.000Z',
            author: 'Admin'
          }
        ],
        adminNotes: 'Candidate is shortlisted for preliminary technical screening.',
        assignedAdmin: 'Chromepet Head Office',
        createdAt: '2026-08-25T10:20:00.000Z',
        updatedAt: '2026-08-26T11:00:00.000Z'
      }
    ],
    createdAt: '2026-08-25T10:00:00.000Z',
    updatedAt: '2026-08-26T11:00:00.000Z'
  },
  {
    id: 'CAND-0002',
    candidateId: 'CAND-0002',
    userId: 'USR-CAND-02',
    fullName: 'Senthil Kumar R',
    mobile: '+919876543210',
    email: 'senthil.welder94@gmail.com',
    dob: '1994-11-20',
    gender: 'Male',
    nationality: 'Indian',
    address: '45, East Coast Road',
    city: 'Thanjavur',
    state: 'Tamil Nadu',
    country: 'India',
    postalCode: '613001',
    passportNumber: 'M8123904',
    passportIssueDate: '2021-08-15',
    passportExpiryDate: '2031-08-14',
    passportPlaceOfIssue: 'Tiruchirappalli',
    passportEcrStatus: 'ECNR',
    educationQualification: 'ITI Welder',
    educationTrade: '6G Pipe Welding & SMAW/GTAW',
    educationInstitute: 'Govt ITI Thanjavur',
    educationPassingYear: '2014',
    totalExperienceYears: '8 Years',
    singaporeExperienceYears: '3 Years (Tuas Shipyard Marine Services)',
    gulfExperienceYears: '2 Years (Qatar Petrochemical)',
    indiaExperienceYears: '3 Years',
    previousCompany: 'Keppel FELS subcontractor',
    skills: ['6G TIG Root Welding', 'ARC Welding', 'Radiography 100% Pass', 'Shipyard Safety SSIC'],
    languages: ['Tamil (Native)', 'English (Workplace Basic)'],
    preferredTrade: '6G Pipe Welder',
    expectedSalarySgd: 'SGD 2,800 - 3,500 / month',
    availabilityNoticePeriod: 'Within 10 Days',
    singaporeFinOrPassHistory: 'Previous Work Permit (Shipyard)',
    applicationStatus: 'Shortlisted',
    adminRemarks: 'Excellent 6G test track record. Ready for immediate Tuas Shipyard weld test.',
    documents: [
      {
        id: 'DOC-201',
        candidateId: 'CAND-0002',
        type: 'resume',
        name: 'Senthil_Kumar_6G_Welder_Resume.pdf',
        fileSize: '380 KB',
        uploadedAt: '2026-08-26T09:00:00.000Z'
      },
      {
        id: 'DOC-202',
        candidateId: 'CAND-0002',
        type: 'passport',
        name: 'Passport_M8123904_Senthil.pdf',
        fileSize: '1.4 MB',
        uploadedAt: '2026-08-26T09:05:00.000Z'
      }
    ],
    interestedJobs: [
      {
        id: 'INT-02',
        candidateId: 'CAND-0002',
        jobId: 'SG-JOB-102',
        jobTitle: '6G Pipe Welder (TIG & ARC)',
        employer: 'Marine Engineering & Offshore Services Pte Ltd',
        location: 'Tuas Shipyard Basin, Singapore',
        country: 'Singapore',
        salary: 'SGD 2,600 - 3,500 / month',
        category: 'Marine & Shipyard',
        markedDate: '2026-08-26T09:10:00.000Z'
      }
    ],
    applications: [
      {
        id: 'ENQ-2026-1002',
        userId: 'USR-CAND-02',
        customerName: 'Senthil Kumar R',
        mobile: '+919876543210',
        email: 'senthil.welder94@gmail.com',
        jobId: 'SG-JOB-102',
        jobTitle: '6G Pipe Welder (TIG & ARC)',
        jobCategory: 'Marine & Shipyard',
        location: 'Tuas Shipyard Basin, Singapore',
        salary: 'SGD 2,600 - 3,500 / month',
        candidateTrade: '6G Welder',
        candidateExperience: '8 Years (3 Yrs Singapore)',
        candidateNotes: 'Available for immediate shipyard welding test in Chennai/Singapore.',
        status: 'Contacted',
        notes: [],
        createdAt: '2026-08-26T09:12:00.000Z',
        updatedAt: '2026-08-26T09:12:00.000Z'
      }
    ],
    createdAt: '2026-08-26T09:00:00.000Z',
    updatedAt: '2026-08-26T09:12:00.000Z'
  }
];

