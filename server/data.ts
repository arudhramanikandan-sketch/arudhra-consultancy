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
  adminPassword: 'Menaka29040710*',
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
  autoPruneOldLeads: false,
  jobsLastUpdatedAt: '2026-10-21T05:04:04.617Z'
};

export const initialJobs: Job[] = [
  {
    "title": "Mclean Cleanroom Production Worker (E Pass - Male & Female)",
    "employer": "High-Tech Semiconductor & Mclean Components Pte Ltd",
    "category": "Manufacturing & Production",
    "location": "Singapore (Hi-Tech Industrial Park)",
    "salary": "SGD 2,800 / month (Sunday work SGD 100/day, Gross ~SGD 3,000)",
    "qualification": "B.Sc Computer Science / B.E in Electrical / Computer Engineering with RMI",
    "experience": "Fresh to Singapore welcome (No prior experience needed - Training provided)",
    "jobType": "E Pass",
    "vacancyCount": 6,
    "description": "Leading precision cleanroom manufacturing company is hiring Male and Female Mclean Production Workers under Employment Pass (E Pass). Fresh degree holders from Anna University and recognized institutions with RMI verification get fast approval.",
    "responsibilities": [
      "Perform precision electronic and mechanical component assembly inside controlled cleanroom environments",
      "Operate cleanroom production equipment and automated assembly jigs",
      "Conduct visual and microscope quality inspections of finished micro-components",
      "Adhere strictly to cleanroom gowning, ESD protection, and sterile handling protocols"
    ],
    "requirements": [
      "Degree: B.Sc Computer Science, B.E in All Electrical Majors, or Computer Engineering with RMI verification",
      "Candidates from Anna University B.E get easy approval",
      "Both Male and Female candidates can apply",
      "Age: Born in 2002 or after (Age ~24 and below)",
      "Fresh to Singapore: No past skill or experience required; comprehensive training provided by company",
      "Must speak good English",
      "Candidates currently in Singapore under tourist visa are also eligible to apply",
      "Working Schedule: Daily 12 hours standing cleanroom production work",
      "Rest Days: Weekly 1 day holiday; option to work 2 Sundays for extra SGD 100 each",
      "E Pass renewal guaranteed upon good performance"
    ],
    "benefits": [
      "High basic salary of SGD 2,800 / month",
      "Extra Sunday work earnings (SGD 100 per Sunday, up to 2 Sundays per month = SGD 3,000 gross)",
      "Full cleanroom technical training provided by company",
      "Guaranteed E Pass contract renewal upon performance",
      "Standard MOM employment pass medical insurance"
    ],
    "requiredDocuments": [
      "Valid Passport Copy (with current SG tourist visa if in Singapore)",
      "B.E / B.Sc Degree Certificate and Semester Marksheets",
      "RMI Verification Certificate",
      "Passport-size photo with white background"
    ],
    "status": "published",
    "featured": true,
    "latest": true,
    "postedDate": "2026-10-21",
    "id": "SG-JOB-461793",
    "createdAt": "2026-10-21T05:04:04.617Z",
    "updatedAt": "2026-10-21T05:04:04.617Z"
  },
  {
    "title": "Construction Site Coordinator (S Pass - Indian Candidates)",
    "employer": "Civil Building & Structural Engineering Pte Ltd",
    "category": "Construction & Civil",
    "location": "Singapore (Islandwide Project Sites)",
    "salary": "SGD 2,000 - 3,000+ / month (Based on Experience)",
    "qualification": "Diploma / Degree in Civil Engineering or Construction Management",
    "experience": "Must have relevant local Singapore working experience",
    "jobType": "S Pass",
    "vacancyCount": 2,
    "description": "Established civil engineering company is hiring Construction Site Coordinators under S Pass. Candidates must possess relevant Singapore site coordination experience with strong communication and instruction-following abilities.",
    "responsibilities": [
      "Coordinate site activities between sub-contractors, main contractor, and MEP consultants",
      "Track daily construction progress, material deliveries, and site manpower deployment",
      "Assist project engineers with site inspections, defect rectification, and progress documentation",
      "Ensure all construction trades adhere to approved architectural and structural drawings"
    ],
    "requirements": [
      "Nationality: Indian Nationality",
      "Pass: S Pass eligible",
      "Must have relevant local Singapore working experience",
      "Hardworking, disciplined, and strictly follow site instructions",
      "Salary: SGD 2,000 - 3,000+ / month (depends on experience)",
      "Working Hours: 5.5 days per week; Mon to Fri 9:00 AM - 6:00 PM, half day on Saturday",
      "Rest Days: 1.5 days per week (Saturday afternoon and Sunday)"
    ],
    "benefits": [
      "Attractive monthly remuneration: SGD 2,000 - 3,000+",
      "1.5 regular rest days per week",
      "Career growth into Assistant Project Manager / Engineer",
      "MOM S Pass medical and hospital insurance coverage"
    ],
    "requiredDocuments": [
      "Valid Passport Copy",
      "Engineering Diploma / Degree Certificate with Marksheets",
      "Past Singapore Employment Testimonials and FIN Records"
    ],
    "status": "published",
    "featured": true,
    "latest": true,
    "postedDate": "2026-10-21",
    "id": "SG-JOB-461618",
    "createdAt": "2026-10-21T05:04:04.616Z",
    "updatedAt": "2026-10-21T05:04:04.616Z"
  },
  {
    "title": "Hydraulic Excavator Operator / JCB Operator (Chinese Maincon - 5 Vacancies)",
    "employer": "Chinese A1 Main Contractor Pte Ltd",
    "category": "Construction & Civil",
    "location": "Singapore (Active Infrastructure & Civil Works)",
    "salary": "Basic SGD 1,150 (8am-7pm, 26 days) + 1.5x OT (Monthly Take-home SGD 1,800+)",
    "qualification": "BCA Hydraulic Excavator / JCB Operator Certificate",
    "experience": "Fresh candidates with JCB Certificate & Basic Experience Welcome",
    "jobType": "NTS Work Permit",
    "vacancyCount": 5,
    "description": "URGENT HIRING: Chinese Main Contractor urgently requires 5 Hydraulic Excavator Operators (JCB Operators) for civil earthworks and drainage projects. Fresh candidates holding JCB operator certificates can come within 7 days.",
    "responsibilities": [
      "Operate hydraulic excavators (JCB / crawler excavators) for trenching, earth digging, and backfilling",
      "Work alongside ground banksmen, signalmen, and pipe layers safely",
      "Perform daily pre-operational machine checks, oil greasing, and hydraulic leak inspections",
      "Adhere strictly to BCA site earthwork guidelines and underground service cable precautions"
    ],
    "requirements": [
      "Permit: NTS Work Permit under Chinese Main Contractor",
      "Must have valid JCB Operator / Hydraulic Excavator Certificate",
      "Basic experience required; fresh candidates holding valid certification welcome",
      "Basic Salary: SGD 1,150 / month (8:00 AM - 7:00 PM, 26 working days)",
      "Overtime (OT): Paid at 1.5x rate",
      "Monthly Take-Home: SGD 1,800+ / month",
      "Accommodation provided by company",
      "Urgent deployment: Candidate can arrive within 7 days"
    ],
    "benefits": [
      "Accommodation provided by Chinese Maincon",
      "Guaranteed monthly take-home SGD 1,800+",
      "Overtime pay at 1.5x standard rate",
      "Fast-track deployment within 7 days",
      "MOM work injury insurance and safety gear"
    ],
    "requiredDocuments": [
      "Valid Passport Copy",
      "BCA / Recognized JCB Excavator Operator Certificate",
      "Past Singapore FIN (if applicable)"
    ],
    "status": "published",
    "featured": true,
    "latest": true,
    "postedDate": "2026-10-21",
    "id": "SG-JOB-461368",
    "createdAt": "2026-10-21T05:04:04.613Z",
    "updatedAt": "2026-10-21T05:04:04.613Z"
  },
  {
    "title": "Structural Bin Welder (Big Bins Fabrication - 2 to 4 Hours Daily OT)",
    "employer": "Heavy Metal & Waste Equipment Fabrication Pte Ltd",
    "category": "Manufacturing & Production",
    "location": "Singapore (Industrial Workshop & Yard)",
    "salary": "Basic SGD 800 / month + Daily 2-4 Hours OT (Gross SGD 1,600 - 2,200)",
    "qualification": "MOM Welding Safety Certificate / 3G/4G SMAW/MIG Welder",
    "experience": "4 - 5 Years proven welding experience (Heavy bin welding)",
    "jobType": "Work Permit",
    "vacancyCount": 2,
    "description": "Heavy engineering workshop requires skilled Welders of Indian nationality for fabrication of new heavy-duty industrial waste bins, roll-on/roll-off (RORO) containers, and structural metal bins.",
    "responsibilities": [
      "Perform high-strength GMAW/MIG and SMAW/Arc welding on heavy steel plates for industrial bins",
      "Cut, bevel, align, and tack-weld structural steel frames and bin floor plates",
      "Inspect weld seams for penetration, grind welds smoothly, and prepare surfaces for priming",
      "Operate overhead gantry cranes and workshop fabrication machinery safely"
    ],
    "requirements": [
      "Nationality: Indian",
      "Age: 25 to 35 years old",
      "Basic Salary: SGD 800 / month",
      "Working Days: Monday to Friday and Saturday",
      "Working Hours: 7:30 AM to 4:30 PM (Daily about 3 hours OT available)",
      "Daily Overtime: 2 to 4 hours OT daily",
      "Rest Day: Sunday",
      "Housing: Provided by company",
      "Key Requirement: Must really know how to weld big bins; MOM safety certificate for welding required; 4-5 years experience accepted"
    ],
    "benefits": [
      "Company housing provided",
      "Extensive daily overtime (2 to 4 hours every single day)",
      "Sunday regular rest day",
      "MOM work injury and hospital insurance coverage"
    ],
    "requiredDocuments": [
      "Valid Passport Copy",
      "MOM Welding Safety Certificate / Trade Certification",
      "Photos / Videos of Past Welded Heavy Bins / Steel Works"
    ],
    "status": "published",
    "featured": true,
    "latest": true,
    "postedDate": "2026-10-21",
    "id": "SG-JOB-461213",
    "createdAt": "2026-10-21T05:04:04.612Z",
    "updatedAt": "2026-10-21T05:04:04.612Z"
  },
  {
    "title": "Scaffold Supervisor (Loyang Dormitory - Construction Permit)",
    "employer": "Access Scaffold & Engineering Pte Ltd",
    "category": "Construction & Civil",
    "location": "Loyang / Active Construction Projects",
    "salary": "Basic SGD 1,000 (Gross SGD 1,500 - 2,000 with Comms & OT)",
    "qualification": "Supervision of Metal Scaffold Erection Certificate (MOM / BCA)",
    "experience": "1 - 2 Years scaffolding supervisory experience in Singapore",
    "jobType": "Work Permit",
    "vacancyCount": 2,
    "description": "Professional scaffolding firm requires certified Scaffold Supervisors to oversee scaffold teams, inspect erection integrity, issue green/red safety tags, and ensure strict MOM WSH compliance.",
    "responsibilities": [
      "Supervise daily scaffolding erection, alteration, and dismantling operations",
      "Conduct thorough structural checks and sign off official scaffolding safety inspection tags",
      "Lead morning toolbox safety briefings and enforce mandatory 100% tie-off harness use",
      "Coordinate with site safety coordinators, main contractor engineers, and project managers"
    ],
    "requirements": [
      "Nationality: Myanmar, Indian, or Bangladeshi",
      "Age: 20 to 35 years old",
      "Basic Salary: SGD 1,000 / month (excluding commissions)",
      "Gross Earnings: Average SGD 1,500 - 2,000 after commissions and OT",
      "Working Hours: 8:00 AM to 5:00 PM",
      "Rest Day: 1 day off per week",
      "Housing: Company Dormitory provided at Loyang",
      "Overtime (OT): SGD 5.00 per hour",
      "Experience: 1 to 2 years scaffold supervisory experience"
    ],
    "benefits": [
      "Company dormitory provided at Loyang",
      "High earning potential up to SGD 2,000 gross",
      "1 day off per week",
      "MOM standard insurance and personal protective equipment"
    ],
    "requiredDocuments": [
      "Valid Passport Copy",
      "MOM / BCA Metal Scaffold Supervisor Certificate",
      "BCSS / WSH Safety Pass",
      "Past Singapore Construction Experience Record"
    ],
    "status": "published",
    "featured": true,
    "latest": true,
    "postedDate": "2026-10-21",
    "id": "SG-JOB-461113",
    "createdAt": "2026-10-21T05:04:04.611Z",
    "updatedAt": "2026-10-21T05:04:04.611Z"
  },
  {
    "title": "Scaffold Erector (Loyang Dormitory - Construction Permit)",
    "employer": "Access Scaffold & Engineering Pte Ltd",
    "category": "Construction & Civil",
    "location": "Loyang / Islandwide Construction Sites",
    "salary": "Basic SGD 750 (Gross SGD 1,300 - 1,400 with Comms & OT)",
    "qualification": "Metal Scaffolding Erector Certificate (BCA / MOM)",
    "experience": "1 - 2 Years scaffolding erection experience",
    "jobType": "Work Permit",
    "vacancyCount": 4,
    "description": "Certified scaffolding contractor is hiring Scaffold Erectors for ongoing civil building and infrastructure projects. Company dormitory provided at Loyang.",
    "responsibilities": [
      "Erect, modify, and dismantle tube-and-coupler, modular, and frame scaffoldings at construction sites",
      "Install working platforms, handrails, toe boards, and access ladders safely",
      "Inspect scaffolding components (pipes, couplers, clamps) for wear and structural integrity",
      "Work closely with Scaffold Supervisors to maintain zero-accident safety compliance"
    ],
    "requirements": [
      "Nationality: Myanmar or Indian",
      "Age: 20 to 35 years old",
      "Basic Salary: SGD 750 / month (excluding commissions)",
      "Gross Earnings: Average SGD 1,300 - 1,400 after commissions and OT",
      "Working Hours: 8:00 AM to 5:00 PM",
      "Rest Day: 1 day off per week",
      "Housing: Company Dormitory provided at Loyang",
      "Overtime (OT): SGD 5.00 per hour",
      "Experience: 1 to 2 years relevant scaffolding experience"
    ],
    "benefits": [
      "Loyang company dormitory accommodation provided",
      "1 rest day per week",
      "Overtime pay at SGD 5.00/hour plus project incentives",
      "MOM safety gear, harness, and medical coverage"
    ],
    "requiredDocuments": [
      "Valid Passport Copy",
      "BCA / MOM Metal Scaffold Erector Certificate",
      "Past Singapore FIN (if applicable)"
    ],
    "status": "published",
    "featured": false,
    "latest": true,
    "postedDate": "2026-10-21",
    "id": "SG-JOB-461037",
    "createdAt": "2026-10-21T05:04:04.610Z",
    "updatedAt": "2026-10-21T05:04:04.610Z"
  },
  {
    "title": "Tentage General Worker (Loyang Dormitory)",
    "employer": "Event Tentage & Structural Engineering Pte Ltd",
    "category": "Construction & Civil",
    "location": "Loyang / Islandwide Event & Construction Sites",
    "salary": "Basic SGD 750 (Gross SGD 1,300 - 1,400 with Comms & OT)",
    "qualification": "General Construction Work Permit",
    "experience": "1+ Years tentage / general construction experience",
    "jobType": "Work Permit",
    "vacancyCount": 3,
    "description": "Specialist structural tentage and event infrastructure contractor requires Tentage General Workers. Open to Myanmar, Indian, and Bangladeshi nationalities with Loyang dormitory accommodation.",
    "responsibilities": [
      "Assist in assembling, erecting, and dismantling event marquee tentages, canopies, and temporary structures",
      "Load, transport, and secure aluminum truss columns, canvas sheets, and ground anchors",
      "Support site installation teams with rigging, tie-downs, and ground leveling",
      "Maintain site safety and inspect equipment prior to erection and teardown"
    ],
    "requirements": [
      "Nationality: Myanmar, Indian, or Bangladeshi",
      "Age: 20 to 35 years old",
      "Basic Salary: SGD 750 / month (excluding commissions)",
      "Average Gross: SGD 1,300 - 1,400 after commissions and OT",
      "Working Hours: 8:00 AM to 5:00 PM",
      "Rest Day: 1 day off per week",
      "Housing: Company Dormitory provided at Loyang",
      "Overtime (OT): SGD 5.00 per hour",
      "Remarks: Minimum 1 year experience required"
    ],
    "benefits": [
      "Company dormitory accommodation provided at Loyang",
      "1 regular rest day per week",
      "Commission and daily overtime earnings",
      "MOM work injury and medical insurance"
    ],
    "requiredDocuments": [
      "Valid Passport Copy",
      "Construction Safety Orientation Pass (CSOC) if available",
      "Past Singapore Work Permit Records (if applicable)"
    ],
    "status": "published",
    "featured": false,
    "latest": true,
    "postedDate": "2026-10-21",
    "id": "SG-JOB-460994",
    "createdAt": "2026-10-21T05:04:04.609Z",
    "updatedAt": "2026-10-21T05:04:04.609Z"
  },
  {
    "title": "Dishwasher, Cleaner cum Kitchen Helper (E Pass)",
    "employer": "Premier F&B & Hospitality Services Pte Ltd",
    "category": "F&B & Hospitality",
    "location": "Singapore (Central / Islandwide Outlets)",
    "salary": "Basic SGD 1,100 + Food SGD 100 + Housing SGD 500 (Gross SGD 1,700 - 2,000+)",
    "qualification": "Recognized Bachelor Degree with RMI verification",
    "experience": "Fresh or experienced candidates welcome",
    "jobType": "E Pass",
    "vacancyCount": 2,
    "description": "Established F&B restaurant group is hiring Dishwashers, Cleaners cum Kitchen Helpers under Employment Pass (E Pass). Candidates must hold a recognized Bachelor Degree with RMI accreditation.",
    "responsibilities": [
      "Operate automated commercial dishwashers and sanitize dining ware, cutlery, and cookware",
      "Perform kitchen cleaning, deep sanitation, trash clearance, and surface degreasing",
      "Assist culinary chefs with vegetable washing, chopping, and ingredient preparation",
      "Adhere strictly to Singapore Food Agency (SFA) hygiene and kitchen cleanliness standards"
    ],
    "requirements": [
      "Educational qualification: Bachelor Degree with verified RMI",
      "Basic Salary: SGD 1,100 / month",
      "Food Allowance: SGD 100 / month",
      "Accommodation Allowance: SGD 500 / month",
      "Working Hours: 12 hours per day",
      "Overtime (OT): SGD 7.00 per hour",
      "Rest Days: 2 days off per month"
    ],
    "benefits": [
      "Accommodation allowance of SGD 500 provided",
      "Duty meal food allowance of SGD 100 provided",
      "Overtime pay at SGD 7.00/hour",
      "Standard MOM medical insurance coverage"
    ],
    "requiredDocuments": [
      "Valid Passport Copy",
      "Degree Certificate with Official Transcripts",
      "RMI Verification Document",
      "Passport Size Photograph"
    ],
    "status": "published",
    "featured": true,
    "latest": true,
    "postedDate": "2026-10-21",
    "id": "SG-JOB-460790",
    "createdAt": "2026-10-21T05:04:04.607Z",
    "updatedAt": "2026-10-21T05:04:04.607Z"
  }
];

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

