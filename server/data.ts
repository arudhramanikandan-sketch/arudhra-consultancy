import { Job, Enquiry, VideoItem, Advertisement, SiteSettings, User } from '../src/types';

export const initialSiteSettings: SiteSettings = {
  businessName: 'ARUDHRA CONSULTANCY',
  tagline: 'Singapore Overseas Recruitment & Placement Support',
  phone: '7418845083',
  whatsappNumber: '7418845083',
  whatsappGroupUrl: 'https://chat.whatsapp.com/GJOntCsJT3dKskOFm16T6R?s=cl&p=a&mlu=4&ilr=4',
  email: 'info@arudhraconsultancy.com',
  officeAddress: '1/149, Ganesh Complex, Avinashi Road, Neelambur, Coimbatore – 641062',
  registeredAddress: '1/6-2, Varuna Bhagavan Kovil Street, Neelambur, Coimbatore - 641 062, Tamilnadu, India.',
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
  jobsLastUpdatedAt: '2026-10-23T04:29:49.767Z'
};

export const initialJobs: Job[] = [
  {
    "title": "Class 3 Driver - Fresh Produce & Vegetables Company",
    "employer": "Fresh Produce Wholesale & Cold Logistics Pte Ltd",
    "category": "Logistics & Warehouse",
    "location": "Singapore (Pasir Panjang Wholesale Centre & Islandwide Outlets)",
    "salary": "SGD 1,600 / month + Accommodation Provided (6:00 AM - 6:00 PM)",
    "qualification": "Singapore Class 3 Driving License + BCA Certificate",
    "experience": "Singapore delivery driving experience",
    "jobType": "Work Permit (Skilled)",
    "vacancyCount": 2,
    "description": "Wholesale fresh vegetable company is hiring Class 3 Drivers. Accommodation provided by company. Candidate must possess valid Class 3 driving license and BCA certification.",
    "responsibilities": [
      "Drive delivery truck to distribute fresh vegetables and produce to supermarkets, wet markets, and restaurants",
      "Load, unload, and verify vegetable baskets against delivery invoices",
      "Conduct daily vehicle inspections and ensure timely morning deliveries"
    ],
    "requirements": [
      "Must have BCA certification and valid Singapore Class 3 driving license",
      "Salary: SGD 1,600 per month",
      "Accommodation: Provided by company",
      "Working Hours: 6:00 AM to 6:00 PM | Rest Days: 2 days per month",
      "Must be hardworking, responsible, and follow company work schedules"
    ],
    "benefits": [
      "Company accommodation provided",
      "Stable wholesale food distribution industry",
      "MOM standard medical coverage"
    ],
    "requiredDocuments": [
      "Valid Passport Copy",
      "Singapore Class 3 License",
      "BCA Certificate"
    ],
    "status": "published",
    "featured": true,
    "latest": true,
    "postedDate": "2026-10-23",
    "id": "SG-JOB-976751",
    "createdAt": "2026-10-23T04:29:49.767Z",
    "updatedAt": "2026-10-23T04:29:49.767Z"
  },
  {
    "title": "Furniture Carpenter - Custom Joinery & Interior Fitting",
    "employer": "Custom Woodworking & Interior Carpentry Pte Ltd",
    "category": "Manufacturing & Production",
    "location": "Singapore (Carpentry Workshop & Site Installation)",
    "salary": "Salary negotiable depending on experience (Discussed in Interview)",
    "qualification": "Carpentry / Woodworking Trade Skills",
    "experience": "Solid furniture making and laminate cabinet fabrication experience",
    "jobType": "Work Permit",
    "vacancyCount": 2,
    "description": "Chinese interior carpentry firm is hiring skilled Furniture Carpenters for custom cabinetry, wardrobes, and high-end joinery work. Salary depends on craftsmanship and experience.",
    "responsibilities": [
      "Fabricate custom wooden furniture, cabinets, display counters, and feature walls",
      "Operate woodworking machinery: table saws, edge-banders, routers, and planers",
      "Apply decorative laminates, veneers, and install precision hardware hinges and tracks",
      "Conduct on-site furniture installation and touch-up defects"
    ],
    "requirements": [
      "Good practical experience in furniture making and custom carpentry",
      "Salary: Negotiable based on craftsmanship and experience level",
      "Chinese company environment; apply by interview with bio-data"
    ],
    "benefits": [
      "Competitive compensation matching craftsmanship level",
      "MOM medical and hospital insurance"
    ],
    "requiredDocuments": [
      "Bio-data / Resume with photos of past carpentry work",
      "Passport Copy"
    ],
    "status": "published",
    "featured": false,
    "latest": true,
    "postedDate": "2026-10-23",
    "id": "SG-JOB-976459",
    "createdAt": "2026-10-23T04:29:49.764Z",
    "updatedAt": "2026-10-23T04:29:49.764Z"
  },
  {
    "title": "Ceiling & Partition Worker (Drywall & False Ceiling - Daily SGD 27 + OT)",
    "employer": "Interior Architectural & Ceiling Specialist Pte Ltd",
    "category": "Construction & Civil",
    "location": "Singapore (Commercial Buildings & Residential Projects)",
    "salary": "Daily Wage: SGD 27 (8:00 AM - 5:00 PM) + Overtime (OT)",
    "qualification": "False Ceiling & Drywall Partition Installation Skills",
    "experience": "Suspended ceiling grid and gypsum drywall partition experience",
    "jobType": "Work Permit",
    "vacancyCount": 3,
    "description": "Specialist interior contractor is hiring Ceiling and Partition Workers for gypsum drywall and metal ceiling installations. Apply by interview.",
    "responsibilities": [
      "Install metal channel framing, acoustic ceiling grids, and plasterboard panels",
      "Cut, tape, compound, and sand drywall partition joints to a smooth finish",
      "Follow architectural interior drawings and height safety regulations"
    ],
    "requirements": [
      "Working Hours: 8:00 AM to 5:00 PM",
      "Salary: SGD 27 per day + Overtime (OT)",
      "Chinese company environment; apply by interview with bio-data",
      "Experience in false ceiling or drywall partitions required"
    ],
    "benefits": [
      "Daily rate plus extensive overtime earnings",
      "MOM compliant medical insurance"
    ],
    "requiredDocuments": [
      "Bio-data / Resume",
      "Passport Copy",
      "Ceiling Trade Experience Proof"
    ],
    "status": "published",
    "featured": false,
    "latest": true,
    "postedDate": "2026-10-23",
    "id": "SG-JOB-976066",
    "createdAt": "2026-10-23T04:29:49.760Z",
    "updatedAt": "2026-10-23T04:29:49.760Z"
  },
  {
    "title": "Class 3 Driver cum General Worker (Free Quota - Chinese Company)",
    "employer": "Commercial Building Maintenance & Logistics Pte Ltd",
    "category": "Logistics & Warehouse",
    "location": "Singapore (Islandwide Driving & Maintenance Sites)",
    "salary": "SGD 1,400 / month (8:00 AM - 7:00 PM)",
    "qualification": "Valid Singapore Class 3 Driving License",
    "experience": "Driving and general site maintenance experience",
    "jobType": "Work Permit",
    "vacancyCount": 2,
    "description": "Chinese company with available work permit quota is hiring Class 3 Drivers cum General Workers. Apply by interview with bio-data.",
    "responsibilities": [
      "Drive company vehicle to convey site materials, tools, and maintenance personnel",
      "Participate in general site work and loading/unloading tasks",
      "Keep delivery logs and maintain company van"
    ],
    "requirements": [
      "Valid Singapore Class 3 driving license",
      "Working Hours: 8:00 AM to 7:00 PM",
      "Salary: SGD 1,400 per month",
      "Company has immediate available quota; apply by interview"
    ],
    "benefits": [
      "Immediate quota availability for fast work pass processing",
      "MOM medical coverage"
    ],
    "requiredDocuments": [
      "Bio-data / Resume",
      "Passport Copy",
      "Singapore Class 3 License"
    ],
    "status": "published",
    "featured": false,
    "latest": true,
    "postedDate": "2026-10-23",
    "id": "SG-JOB-975799",
    "createdAt": "2026-10-23T04:29:49.757Z",
    "updatedAt": "2026-10-23T04:29:49.757Z"
  },
  {
    "title": "Safety Coordinator - Fresh / Junior Level (Chinese Company)",
    "employer": "Chinese Building Construction & Civil Contractor",
    "category": "Safety & Security",
    "location": "Singapore (Active Project Sites)",
    "salary": "SGD 1,300 / month (8:00 AM - 7:00 PM)",
    "qualification": "Workplace Safety & Health Coordinator Certificate (WSS / WSH Level B)",
    "experience": "Fresh certified safety coordinators welcome",
    "jobType": "Work Permit",
    "vacancyCount": 2,
    "description": "Chinese construction company is hiring new / junior Safety Coordinators. Training and site mentoring provided. Apply by interview.",
    "responsibilities": [
      "Assist safety officers in conducting site safety audits and monitoring daily toolbox meetings",
      "Check worker safety harnesses, helmet chinstraps, and permit-to-work compliances",
      "Maintain site safety registers and emergency response equipment"
    ],
    "requirements": [
      "Working Hours: 8:00 AM to 7:00 PM",
      "Salary: SGD 1,300 per month",
      "WSH coordinator qualification; fresh safety coordinators welcome",
      "Apply by interview (arrange bio-data)"
    ],
    "benefits": [
      "Practical career stepping stone in Singapore safety management",
      "MOM insurance coverage"
    ],
    "requiredDocuments": [
      "Bio-data / Resume",
      "Passport Copy",
      "Safety Coordinator Certificate"
    ],
    "status": "published",
    "featured": false,
    "latest": true,
    "postedDate": "2026-10-23",
    "id": "SG-JOB-975370",
    "createdAt": "2026-10-23T04:29:49.753Z",
    "updatedAt": "2026-10-23T04:29:49.753Z"
  },
  {
    "title": "U-Turn General Worker - Plumbing at Construction Sites",
    "employer": "Building Sanitary & Plumbing Engineering Pte Ltd",
    "category": "Construction & Civil",
    "location": "Singapore (Construction Project Sites)",
    "salary": "SGD 23 - 28 per day (8:00 AM - 5:00 PM, Depending on Experience)",
    "qualification": "Past Singapore Construction Plumbing Experience (U-Turn Workers)",
    "experience": "U-Turn worker with past Singapore plumbing experience",
    "jobType": "Work Permit",
    "vacancyCount": 4,
    "description": "Chinese plumbing contractor is hiring U-Turn General Workers with past Singapore plumbing experience for ongoing construction projects. Apply by interview.",
    "responsibilities": [
      "Install sanitary pipes, drainage stacks, and water supply reticulation at construction sites",
      "Joint, glue, and clamp PVC and cast-iron drainage pipes according to project drawings",
      "Perform hydrostatic pressure testing and assist plumbing site supervisors"
    ],
    "requirements": [
      "U-Turn candidates with past Singapore construction work experience",
      "Working Hours: 8:00 AM to 5:00 PM",
      "Salary: SGD 23 to 28 per day (depending on experience)",
      "Chinese company environment; apply by interview"
    ],
    "benefits": [
      "Fast deployment for eligible U-Turn candidates",
      "Overtime earnings",
      "MOM insurance"
    ],
    "requiredDocuments": [
      "Bio-data / Resume",
      "Passport Copy",
      "Previous Singapore FIN Record"
    ],
    "status": "published",
    "featured": false,
    "latest": true,
    "postedDate": "2026-10-23",
    "id": "SG-JOB-975184",
    "createdAt": "2026-10-23T04:29:49.751Z",
    "updatedAt": "2026-10-23T04:29:49.751Z"
  },
  {
    "title": "Electrical Worker - HDB Project Work (Daily SGD 28 + OT)",
    "employer": "HDB Residential Electrical Contractor",
    "category": "Engineering & Technical",
    "location": "Singapore (Active HDB Residential Estates)",
    "salary": "Daily Wage: SGD 28 (8:00 AM - 5:00 PM) + Overtime (OT)",
    "qualification": "Electrical Installation Trade Skills",
    "experience": "HDB residential electrical cabling experience",
    "jobType": "Work Permit",
    "vacancyCount": 3,
    "description": "Chinese electrical company doing HDB project work seeks Electrical Workers. Apply by interview with bio-data.",
    "responsibilities": [
      "Run electrical wiring, conduit piping, and casing in HDB flats and corridors",
      "Install light fittings, ceiling fans, switches, and distribution boxes",
      "Assist in electrical testing and defect rectification during HDB handover"
    ],
    "requirements": [
      "Working Hours: 8:00 AM to 5:00 PM",
      "Daily Salary: SGD 28 per day + Overtime (OT)",
      "Company specializes in HDB residential project work",
      "Apply by interview (arrange bio-data)"
    ],
    "benefits": [
      "Daily rate plus high overtime earning potential",
      "MOM medical and injury insurance"
    ],
    "requiredDocuments": [
      "Bio-data / Resume",
      "Passport Copy",
      "Electrical Experience Records"
    ],
    "status": "published",
    "featured": false,
    "latest": true,
    "postedDate": "2026-10-23",
    "id": "SG-JOB-974895",
    "createdAt": "2026-10-23T04:29:49.748Z",
    "updatedAt": "2026-10-23T04:29:49.748Z"
  },
  {
    "title": "CoreTrade Class 3 Driver cum Worker (Chinese Company)",
    "employer": "General Construction & Building Services Pte Ltd",
    "category": "Construction & Civil",
    "location": "Singapore (Islandwide Construction Sites)",
    "salary": "SGD 1,600 / month (9:00 AM - 8:00 PM)",
    "qualification": "BCA CoreTrade Certificate + Singapore Class 3 Driving License",
    "experience": "Construction site work & driving experience in Singapore",
    "jobType": "Work Permit",
    "vacancyCount": 2,
    "description": "Chinese construction company is hiring CoreTrade Class 3 Drivers cum Workers. Age below 38 years old. Apply by interview with bio-data.",
    "responsibilities": [
      "Drive company transport to convey workers and construction supplies to project sites",
      "Perform general construction CoreTrade tasks when at site locations",
      "Assist site supervisors with daily operations and material staging"
    ],
    "requirements": [
      "Working Hours: 9:00 AM to 8:00 PM",
      "Salary: SGD 1,600 / month",
      "Mandatory: Must possess valid BCA CoreTrade certificate and Singapore Class 3 license",
      "Age Requirement: Below 38 years old",
      "Chinese company environment; apply by interview"
    ],
    "benefits": [
      "Stable monthly salary",
      "Direct interview arrangement",
      "MOM medical insurance"
    ],
    "requiredDocuments": [
      "Bio-data / Resume",
      "Passport Copy",
      "BCA CoreTrade Certificate",
      "Class 3 License"
    ],
    "status": "published",
    "featured": false,
    "latest": true,
    "postedDate": "2026-10-23",
    "id": "SG-JOB-974641",
    "createdAt": "2026-10-23T04:29:49.746Z",
    "updatedAt": "2026-10-23T04:29:49.746Z"
  },
  {
    "title": "Class 4 Driver - 14ft Lorry (M&E Construction WP)",
    "employer": "M&E Building Construction Engineering Pte Ltd",
    "category": "Logistics & Warehouse",
    "location": "Singapore (Islandwide Delivery Routes)",
    "salary": "Fixed Salary: SGD 2,500 / month (12 Hours/day, 6 Days)",
    "qualification": "Valid Singapore Class 4 Driving License",
    "experience": "Familiar with driving 14ft lorries and Singapore road network",
    "jobType": "Work Permit (Skilled)",
    "vacancyCount": 2,
    "description": "M&E construction company is hiring Class 4 Drivers familiar with driving 14ft lorries for site deliveries across Singapore.",
    "responsibilities": [
      "Drive 14ft company lorry to deliver MEP equipment, pipes, and electrical materials to project sites",
      "Ensure proper strapping, securing, and loading/unloading of delicate equipment",
      "Perform daily pre-operational vehicle inspections and keep vehicle in top condition"
    ],
    "requirements": [
      "Must possess valid Singapore Class 4 driving license",
      "Familiar with operating 14ft lorries and islandwide routes",
      "Fixed Salary: SGD 2,500 per month",
      "Working Schedule: 12 hours per day (6 days work week)"
    ],
    "benefits": [
      "Fixed reliable salary of SGD 2,500/month",
      "MOM standard health and accident coverage"
    ],
    "requiredDocuments": [
      "Valid Passport Copy",
      "Singapore Class 4 Driving License",
      "Singapore FIN Records"
    ],
    "status": "published",
    "featured": false,
    "latest": true,
    "postedDate": "2026-10-23",
    "id": "SG-JOB-974367",
    "createdAt": "2026-10-23T04:29:49.743Z",
    "updatedAt": "2026-10-23T04:29:49.743Z"
  },
  {
    "title": "Diesel Vehicle & Heavy Truck Repairer (Large Recycling Company - NTS-WP)",
    "employer": "Large Environmental & Recycling Services Corporation",
    "category": "Engineering & Technical",
    "location": "Singapore (Heavy Vehicle Fleet Depot & Workshop)",
    "salary": "Salary SGD 1,500 + Accommodation SGD 500 (Total SGD 2,000)",
    "qualification": "Diesel Automotive Mechanic Trade Certificate",
    "experience": "Engine overhaul, diesel injection, truck electrical repairs",
    "jobType": "NTS Work Permit",
    "vacancyCount": 2,
    "description": "Major recycling service company is hiring Diesel Vehicle Repairers under NTS-WP to maintain heavy recycling trucks, diesel engines, and vehicle electrical systems.",
    "responsibilities": [
      "Diagnose, overhaul, and repair heavy commercial truck diesel engines, transmissions, and braking systems",
      "Troubleshoot 24V vehicle electrical wiring, starters, alternators, and electronic sensors",
      "Perform regular preventive maintenance oil changes, hydraulic pump checks, and vehicle safety inspections",
      "Assist in other general depot maintenance tasks when scheduled repair work is complete"
    ],
    "requirements": [
      "Mainly responsible for repair of diesel truck engines, electrical systems, and chassis mechanics",
      "Salary: SGD 1,500 / month + Accommodation allowance: SGD 500 / month (Total SGD 2,000)",
      "Working Hours: 12 hours per day; 2 days off per month",
      "Must follow company arrangement and assist in other tasks when required"
    ],
    "benefits": [
      "SGD 500 housing allowance",
      "Fleet maintenance stability with large corporation",
      "MOM medical insurance"
    ],
    "requiredDocuments": [
      "Valid Passport Copy",
      "Automotive Mechanic Certificates",
      "Work Experience Records"
    ],
    "status": "published",
    "featured": false,
    "latest": true,
    "postedDate": "2026-10-23",
    "id": "SG-JOB-974036",
    "createdAt": "2026-10-23T04:29:49.740Z",
    "updatedAt": "2026-10-23T04:29:49.740Z"
  },
  {
    "title": "Site Electrician Supervisor cum Driver (Valid Class 3 License)",
    "employer": "Electrical & Power Engineering Solutions Pte Ltd",
    "category": "Engineering & Technical",
    "location": "Singapore (Multiple Commercial & Residential Sites)",
    "salary": "Basic SGD 1,600 - 1,700 / month + 1.5x OT (Mon-Sat 8am-5pm)",
    "qualification": "Diploma / Trade Certificate in Electrical Engineering + Valid Class 3",
    "experience": "Minimum 2-3 years Singapore relevant electrical supervisory experience",
    "jobType": "Work Permit (Skilled)",
    "vacancyCount": 1,
    "description": "Electrical contractor requires Site Electrician Supervisor cum Driver with valid Singapore Class 3 driving license to lead project sites and coordinate manpower.",
    "responsibilities": [
      "Lead and supervise team of electricians and assistants across daily installation works",
      "Drive company transport to dispatch materials and personnel to project locations",
      "Conduct quality audits and ensure work strictly meets Singapore CP5 wiring standards"
    ],
    "requirements": [
      "Minimum 2 to 3 years Singapore relevant electrical supervisory experience",
      "Must possess valid Singapore Class 3 driving license",
      "Basic Salary: SGD 1,600 - 1,700 per month",
      "Working Hours: Monday to Saturday, 8:00 AM to 5:00 PM | Overtime: 1.5x"
    ],
    "benefits": [
      "Attractive basic salary plus overtime",
      "Company vehicle provided for site supervision",
      "MOM insurance"
    ],
    "requiredDocuments": [
      "Passport Copy",
      "Singapore Class 3 Driving License",
      "Electrical Supervisory Qualifications"
    ],
    "status": "published",
    "featured": true,
    "latest": true,
    "postedDate": "2026-10-23",
    "id": "SG-JOB-973760",
    "createdAt": "2026-10-23T04:29:49.737Z",
    "updatedAt": "2026-10-23T04:29:49.737Z"
  },
  {
    "title": "Assistant Electrician (Electrical Engineering Co - 2 Openings)",
    "employer": "Electrical & Power Engineering Solutions Pte Ltd",
    "category": "Engineering & Technical",
    "location": "Singapore (Active Building Sites)",
    "salary": "Basic SGD 850 - 1,000 / month + 1.5x OT (Mon-Sat 8am-5pm)",
    "qualification": "Basic Electrical Trade Background",
    "experience": "Minimum 2 years Singapore relevant electrical assistance experience",
    "jobType": "Work Permit (Skilled)",
    "vacancyCount": 2,
    "description": "Hiring 2 Assistant Electricians to support senior electricians in building electrical cabling and conduit work.",
    "responsibilities": [
      "Assist in cable pulling, laying conduit pipes, and mounting distribution boxes",
      "Cut, strip, and terminate wires under the supervision of senior electricians",
      "Maintain site housekeeping and tool inventory"
    ],
    "requirements": [
      "Minimum 2 years Singapore relevant electrical experience",
      "Basic Salary: SGD 850 - 1,000 per month",
      "Working Hours: Monday to Saturday, 8:00 AM to 5:00 PM | Overtime: 1.5x"
    ],
    "benefits": [
      "Overtime earnings at 1.5x",
      "On-the-job trade skill upgrade",
      "MOM medical coverage"
    ],
    "requiredDocuments": [
      "Valid Passport Copy",
      "Past Singapore Work Permit Records"
    ],
    "status": "published",
    "featured": false,
    "latest": true,
    "postedDate": "2026-10-23",
    "id": "SG-JOB-973523",
    "createdAt": "2026-10-23T04:29:49.735Z",
    "updatedAt": "2026-10-23T04:29:49.735Z"
  },
  {
    "title": "Electrician - Residential & Commercial (Electrical Company - 2 Openings)",
    "employer": "Electrical & Power Engineering Solutions Pte Ltd",
    "category": "Engineering & Technical",
    "location": "Singapore (Residential & Commercial Project Sites)",
    "salary": "Basic SGD 1,400 - 1,600 / month + 1.5x OT (Mon-Sat 8am-5pm)",
    "qualification": "BCA CoreTrade / Trade Certificate in Electrical Installation",
    "experience": "Minimum 3-4 years Singapore residential/commercial electrical experience",
    "jobType": "Work Permit (Skilled)",
    "vacancyCount": 2,
    "description": "Hiring 2 skilled Electricians capable of working independently on Singapore residential and commercial power installations.",
    "responsibilities": [
      "Install electrical conduit pipes, cable trays, wire trunking, and distribution boards (DB)",
      "Wire lighting points, power sockets, switchgears, and single/three-phase circuits",
      "Perform electrical testing, insulation resistance checks, and fault troubleshooting"
    ],
    "requirements": [
      "Minimum 3 to 4 years Singapore electrical experience",
      "Able to read electrical single-line diagrams and work independently",
      "Basic Salary: SGD 1,400 - 1,600 per month",
      "Working Hours: Monday to Saturday, 8:00 AM to 5:00 PM | Overtime: 1.5x"
    ],
    "benefits": [
      "1.5x overtime earnings",
      "CoreTrade project stability",
      "Standard MOM insurance"
    ],
    "requiredDocuments": [
      "Valid Passport Copy",
      "Electrical Trade Certificate / BCA CoreTrade",
      "Singapore FIN Records"
    ],
    "status": "published",
    "featured": false,
    "latest": true,
    "postedDate": "2026-10-23",
    "id": "SG-JOB-973270",
    "createdAt": "2026-10-23T04:29:49.732Z",
    "updatedAt": "2026-10-23T04:29:49.732Z"
  },
  {
    "title": "Class 3 Driver cum General Worker (Construction-Electrical Co)",
    "employer": "Electrical & Power Engineering Solutions Pte Ltd",
    "category": "Construction & Civil",
    "location": "Singapore (Islandwide Commercial & Residential Sites)",
    "salary": "Basic SGD 1,300 - 1,400 / month + 1.5x OT (Mon-Sat 8am-5pm)",
    "qualification": "Valid Singapore Class 3 Driving License",
    "experience": "Minimum 2-3 years Singapore driving and site worker experience",
    "jobType": "Work Permit (Skilled)",
    "vacancyCount": 2,
    "description": "Electrical engineering contractor is hiring Class 3 Drivers cum General Workers. Responsible for ferrying electrician teams, materials, and assisting in site works.",
    "responsibilities": [
      "Drive company van / pickup truck to transport electrical tools, cables, and technicians between sites",
      "Assist electrician teams with cable pulling, trunking installation, and general site duties",
      "Maintain vehicle cleanliness and inspect regular maintenance schedules"
    ],
    "requirements": [
      "Minimum 2 to 3 years Singapore driving experience required",
      "Must possess valid Singapore Class 3 driving license",
      "Basic Salary: SGD 1,300 - 1,400 per month",
      "Working Hours: Monday to Saturday, 8:00 AM to 5:00 PM | Overtime: 1.5x"
    ],
    "benefits": [
      "Overtime pay at 1.5x rate",
      "Company vehicle provided during work hours",
      "MOM medical and work injury insurance"
    ],
    "requiredDocuments": [
      "Valid Passport Copy",
      "Singapore Class 3 Driving License",
      "Past FIN Records"
    ],
    "status": "published",
    "featured": false,
    "latest": true,
    "postedDate": "2026-10-23",
    "id": "SG-JOB-973019",
    "createdAt": "2026-10-23T04:29:49.730Z",
    "updatedAt": "2026-10-23T04:29:49.730Z"
  },
  {
    "title": "Cold Room & Commercial Refrigerator Technician (S Pass - Bedok)",
    "employer": "Commercial Chiller & Cold Room Engineering Services",
    "category": "Engineering & Technical",
    "location": "Bedok, Singapore",
    "salary": "Basic SGD 1,500 - 1,800 + Comm + Night Call-Out (Monthly SGD 2,500 - 5,000+)",
    "qualification": "Diploma / Technical Certificate in Refrigeration & Air Conditioning",
    "experience": "Commercial cold room and refrigeration repair experience",
    "jobType": "S Pass",
    "vacancyCount": 2,
    "description": "Established refrigeration engineering firm in Bedok is hiring Cold Room and Commercial Refrigerator Technicians under S Pass. High commission structure with top technicians earning SGD 5,000+.",
    "responsibilities": [
      "Perform servicing, troubleshooting, and overhaul of commercial walk-in cold rooms, freezers, and supermarket display chillers",
      "Diagnose compressor failures, refrigerant leaks, expansion valve issues, and electrical defrost controls",
      "Attend to emergency cold room breakdown dispatches and restore refrigeration temperatures swiftly",
      "Provide technical guidance to commercial F&B and cold storage clients"
    ],
    "requirements": [
      "Starting Basic: SGD 1,500 + OT (minimum monthly income SGD 2,000+)",
      "After 3-month probation: Basic increases to SGD 1,800 + Commission + Overtime",
      "Experienced technicians earn SGD 2,500 - SGD 5,000+ per month",
      "Night Dispatch Allowance: SGD 60 call-out allowance for each night job dispatch",
      "Accommodation Allowance: SGD 300 / month",
      "Working Hours: 12 hours per day (finish early if tasks completed early); 2 days off per month",
      "Driving License Benefit: After obtaining SG driving license, salary increases by SGD 500; company vehicle can be driven home with petrol and parking fully covered",
      "Commission: Without license, 2/3 share with driver; with license, 100% of commission ($5k-$20k: 3%, $20k-$30k: 5%, $30k+: 10%)",
      "Location: Bedok"
    ],
    "benefits": [
      "High earning ceiling: SGD 3,500 to SGD 5,000+ monthly with driving license",
      "Company vehicle provided to drive home with full petrol and parking covered",
      "SGD 60 per call-out night dispatch allowance",
      "SGD 300 monthly accommodation allowance"
    ],
    "requiredDocuments": [
      "Valid Passport Copy",
      "Refrigeration Technical Diploma / Trade Certificate",
      "Driving license details (if available)"
    ],
    "status": "published",
    "featured": true,
    "latest": true,
    "postedDate": "2026-10-23",
    "id": "SG-JOB-972819",
    "createdAt": "2026-10-23T04:29:49.728Z",
    "updatedAt": "2026-10-23T04:29:49.728Z"
  },
  {
    "title": "Class 4 Lorry Crane Driver (NTS-WP - Gross SGD 3,800+)",
    "employer": "Heavy Logistics & Structural Transportation Pte Ltd",
    "category": "Logistics & Warehouse",
    "location": "Singapore (Islandwide Delivery & Workshop)",
    "salary": "Basic SGD 2,800 + OT (Monthly Gross SGD 3,800+)",
    "qualification": "Singapore Class 4 Driving License + Lorry Crane Operator License (5+ Yrs)",
    "experience": "More than 5 years lorry crane driving experience",
    "jobType": "NTS Work Permit",
    "vacancyCount": 2,
    "description": "Heavy transportation contractor is hiring Class 4 Lorry Crane Drivers under NTS-WP. Drivers with more than 5 years crane experience can earn over SGD 3,800 monthly.",
    "responsibilities": [
      "Drive and operate Class 4 lorry cranes to transport and lift heavy construction equipment and structural components",
      "Conduct pre-trip vehicle checks, outrigger setup, and secure all cargo with chains and straps",
      "Assist in workshop premises cleaning during evening overtime (5:00 PM - 7:00 PM)",
      "Adhere strictly to Singapore traffic laws and LTA vehicle height restrictions"
    ],
    "requirements": [
      "Basic Salary: SGD 2,800 / month; with OT monthly take-home reaches SGD 3,800+",
      "Working Hours: Monday to Saturday, 8:00 AM to 5:00 PM",
      "Overtime: 5:00 PM to 7:00 PM (workshop premises cleaning and logistics)",
      "Must possess valid Singapore Class 4 driving license and Lorry Crane Operator License for > 5 years",
      "Driver pays SGD 300 to company for accommodation arrangement"
    ],
    "benefits": [
      "High monthly earnings exceeding SGD 3,800 with overtime",
      "Well-maintained modern fleet of lorry cranes",
      "Standard MOM medical insurance"
    ],
    "requiredDocuments": [
      "Valid Passport Copy",
      "Singapore Class 4 Driving License",
      "Lorry Crane Operator Certificate"
    ],
    "status": "published",
    "featured": true,
    "latest": true,
    "postedDate": "2026-10-23",
    "id": "SG-JOB-972527",
    "createdAt": "2026-10-23T04:29:49.725Z",
    "updatedAt": "2026-10-23T04:29:49.725Z"
  },
  {
    "title": "Nurse Aide (NA) - Healthcare Nursing Home (Meals & Dorm Provided)",
    "employer": "Accredited Healthcare & Eldercare Nursing Home Group",
    "category": "Healthcare & Nursing",
    "location": "Singapore (Central / North Eldercare Facilities)",
    "salary": "Basic SGD 1,200 / month + 3 Free Meals/Day + Air-Conditioned Dormitory",
    "qualification": "Secondary / Higher Secondary; Prior nursing/care-home experience preferred",
    "experience": "No Singapore experience needed; Training provided by employer",
    "jobType": "Work Permit",
    "vacancyCount": 4,
    "description": "Premier residential eldercare facility is hiring Nurse Aides (NA). Male candidates preferred (strong physical build). No past Singapore experience required; comprehensive training provided.",
    "responsibilities": [
      "Clean and maintain patient wards, toilets, showers, and nursing home common areas",
      "Assist elderly residents with daily living activities: personal hygiene, diaper changes, and mobility",
      "Assist in feeding residents and monitor daily water and nutritional intake",
      "Support nursing staff with resident escorting and rehabilitation exercises"
    ],
    "requirements": [
      "Prefer male candidates with good physical strength",
      "No past Singapore experience required",
      "Good physical health with no infectious diseases",
      "Willing to perform cleaning duties and direct patient care",
      "Basic Salary: SGD 1,200 per month",
      "Meals: 3 free meals per day provided by employer",
      "Accommodation: Air-conditioned staff dormitory (approx. 10 persons per room)",
      "Free orientation and job training before commencement"
    ],
    "benefits": [
      "Free 3 meals per day provided by employer",
      "Free air-conditioned dormitory accommodation provided",
      "Full training and orientation before starting work",
      "MOM medical insurance and hospitalization coverage"
    ],
    "requiredDocuments": [
      "Updated Bio-data / Resume",
      "Valid Passport Copy",
      "Medical Fitness Declaration"
    ],
    "status": "published",
    "featured": true,
    "latest": true,
    "postedDate": "2026-10-23",
    "id": "SG-JOB-972081",
    "createdAt": "2026-10-23T04:29:49.720Z",
    "updatedAt": "2026-10-23T04:29:49.720Z"
  },
  {
    "title": "NDT Engineer RT - Level 2 Aerospace Radiographic Testing",
    "employer": "Aerospace Component Inspection & NDT Laboratory",
    "category": "Engineering & Technical",
    "location": "Singapore (Aerospace Aviation Park)",
    "salary": "SGD 3,500 - 4,200 / month (Based on Aerospace Experience)",
    "qualification": "NDT RT (Radiographic Testing) Level 2 Certification",
    "experience": "Strictly Aerospace industry experience required (Oil & Gas not suitable)",
    "jobType": "S Pass",
    "vacancyCount": 2,
    "description": "Specialized aerospace inspection laboratory requires NDT RT Engineers holding Level 2 certification. Candidates must have genuine aerospace manufacturing background. Please note: Candidates with only Oil & Gas background are strictly not suitable.",
    "responsibilities": [
      "Set up and conduct radiographic testing (X-ray and gamma ray) on critical aero-engine and airframe components",
      "Evaluate and interpret radiographic films and digital radiographs in accordance with aerospace client specifications",
      "Prepare comprehensive technical NDT inspection reports and sign off quality certificates",
      "Maintain strict radiation safety protocols and calibration of exposure equipment"
    ],
    "requirements": [
      "Must possess valid NDT RT Level 2 certification",
      "Must have verified aerospace industry experience",
      "Important Notice: Candidates with only Oil & Gas industry experience are not suitable"
    ],
    "benefits": [
      "High-tier aerospace remuneration package",
      "Career advancement into NDT Level 3 / Quality Lead",
      "MOM S Pass medical and hospital benefits"
    ],
    "requiredDocuments": [
      "Valid NDT RT Level 2 Certificate",
      "Aerospace Work Experience Testimonials",
      "Degree / Diploma Certificates and Passport Copy"
    ],
    "status": "published",
    "featured": true,
    "latest": true,
    "postedDate": "2026-10-23",
    "id": "SG-JOB-971565",
    "createdAt": "2026-10-23T04:29:49.715Z",
    "updatedAt": "2026-10-23T04:29:49.715Z"
  },
  {
    "title": "Hydraulic Excavator Operator / JCB Operator - 5 Nos (Chinese Maincon)",
    "employer": "Chinese A1 Civil & Infrastructure Main Contractor",
    "category": "Construction & Civil",
    "location": "Singapore (Active Infrastructure & Civil Works)",
    "salary": "Basic SGD 1,150 (8am-7pm, 26 days) + 1.5x OT (Monthly Take-Home SGD 1,800+)",
    "qualification": "BCA / Recognized JCB Excavator Operator Certificate",
    "experience": "Fresh candidates for Singapore with JCB certificate & basic experience welcome",
    "jobType": "NTS Work Permit",
    "vacancyCount": 5,
    "description": "Chinese Main Contractor urgently hiring 5 Hydraulic Excavator / JCB Operators. Fresh candidates for Singapore holding valid JCB operator certificates can deploy within 7 days.",
    "responsibilities": [
      "Operate hydraulic excavators and JCB backhoes for trenching, foundation digging, and earth backfilling",
      "Perform daily machine greasing, engine oil checks, and hydraulic leak inspections",
      "Work safely with ground signalmen and strictly observe buried cable safety rules"
    ],
    "requirements": [
      "Must have JCB Operator / Hydraulic Excavator Certificate",
      "Basic experience required; fresh candidates to Singapore welcome",
      "Basic Salary: SGD 1,150 / month (8:00 AM - 7:00 PM, 26 days/month)",
      "Overtime: 1.5x rate | Monthly take-home: SGD 1,800+",
      "Accommodation provided by employer",
      "Urgent deployment: Candidate can arrive within 7 days"
    ],
    "benefits": [
      "Guaranteed take-home of SGD 1,800+ per month",
      "Accommodation provided by Chinese Main Contractor",
      "Fast-track deployment within 7 days",
      "MOM work injury and hospital insurance"
    ],
    "requiredDocuments": [
      "Valid Passport Copy",
      "JCB / Hydraulic Excavator Operator Certificate",
      "Passport size photo"
    ],
    "status": "published",
    "featured": true,
    "latest": true,
    "postedDate": "2026-10-23",
    "id": "SG-JOB-971013",
    "createdAt": "2026-10-23T04:29:49.710Z",
    "updatedAt": "2026-10-23T04:29:49.710Z"
  },
  {
    "title": "CNC Milling Programmer cum Machinist - CAD/CAM Fusion 360 (NTS-WP)",
    "employer": "Precision Engineering & Aerospace Machining Pte Ltd",
    "category": "Manufacturing & Production",
    "location": "Singapore (Precision Industrial Estate)",
    "salary": "Basic SGD 1,400 - 1,800 + SGD 250 Housing + SGD 10/day Night Shift + High OT (5 Days)",
    "qualification": "Minimum Nitec in Precision Engineering / Aerospace Machining",
    "experience": "3 to 5 years experience; Singapore CNC experience required",
    "jobType": "NTS Work Permit",
    "vacancyCount": 2,
    "description": "Aerospace precision engineering facility is hiring CNC Milling Programmers cum Machinists under NTS-WP. High overtime available on a 5-day work week.",
    "responsibilities": [
      "Perform CAD/CAM programming using AutoCAD and Autodesk Fusion 360 for 3-axis and 5-axis CNC milling machines",
      "Set up fixtures, load cutting tools, and machine tight-tolerance precision aerospace components",
      "Perform in-process dimension inspections using micrometers, vernier calipers, and height gauges",
      "Optimize CNC machining feeds, speeds, and tool paths to ensure high surface finish"
    ],
    "requirements": [
      "3 to 5 years CNC milling programming and machining experience",
      "Singapore experience required",
      "Proficient in CAD/CAM programming using AutoCAD / Fusion 360",
      "Minimum Nitec in Precision Engineering / Aerospace",
      "Basic Salary: SGD 1,400 - 1,800 / month (depending on experience)",
      "Housing Allowance: SGD 250 / month",
      "Night shift required with SGD 10 / day shift allowance",
      "Schedule: Monday to Friday, 7:00 AM to 4:30 PM (5-day week)",
      "Overtime: 1.5x rate with heavy overtime available"
    ],
    "benefits": [
      "5-day work week with abundant overtime earnings",
      "SGD 250 monthly housing allowance",
      "SGD 10 daily night shift allowance",
      "High-tech aerospace precision manufacturing environment"
    ],
    "requiredDocuments": [
      "Valid Passport Copy",
      "Nitec / Diploma in Precision Engineering",
      "Past Singapore CNC Machining FIN records"
    ],
    "status": "published",
    "featured": true,
    "latest": true,
    "postedDate": "2026-10-23",
    "id": "SG-JOB-970712",
    "createdAt": "2026-10-23T04:29:49.707Z",
    "updatedAt": "2026-10-23T04:29:49.707Z"
  },
  {
    "title": "Heavy Container Welder - Garbage Truck Containers (NTS-WP)",
    "employer": "Waste Management Equipment & Vehicle Fabrication Pte Ltd",
    "category": "Manufacturing & Production",
    "location": "Singapore (Industrial Yard & Workshop)",
    "salary": "Salary SGD 1,300 + Housing Allowance SGD 500 (Total SGD 1,800)",
    "qualification": "Heavy Container Welding (MIG / Arc / Structural Steel)",
    "experience": "Heavy container steel welding; 3-minute welding skill video required",
    "jobType": "NTS Work Permit",
    "vacancyCount": 2,
    "description": "Vehicle fabrication company is hiring Welders under NTS-WP for welding heavy steel garbage truck containers. Candidate must speak English and submit a 3-minute video showing welding skills.",
    "responsibilities": [
      "Weld, fabricate, and assemble heavy-duty steel garbage truck containers, compactors, and bins",
      "Cut, fit, and weld thick structural steel plates using MIG / SMAW processes",
      "Grind welds smoothly and prepare container surfaces for structural durability",
      "Support other general workshop duties when welding tasks are completed"
    ],
    "requirements": [
      "Must know how to weld heavy garbage truck steel containers",
      "Must provide a 3-minute video demonstrating practical welding skills",
      "Language: Must be able to speak basic English",
      "Salary: SGD 1,300 / month + Accommodation allowance: SGD 500 / month (Total SGD 1,800)",
      "Working Hours: 12 hours per day (flexible task completion)",
      "Rest Days: 2 days off per month",
      "Willing to handle other workshop tasks assigned by management"
    ],
    "benefits": [
      "SGD 500 accommodation allowance provided",
      "Steady employment in essential waste management manufacturing",
      "MOM medical insurance coverage"
    ],
    "requiredDocuments": [
      "Valid Passport Copy",
      "3-Minute Practical Welding Video Clip",
      "Past Welding Certifications / Test Records"
    ],
    "status": "published",
    "featured": false,
    "latest": true,
    "postedDate": "2026-10-23",
    "id": "SG-JOB-970431",
    "createdAt": "2026-10-23T04:29:49.704Z",
    "updatedAt": "2026-10-23T04:29:49.704Z"
  },
  {
    "title": "Ammonia Refrigeration Technician (NTS-WP)",
    "employer": "Industrial Cold Storage & Ammonia Plant Engineering",
    "category": "Engineering & Technical",
    "location": "Singapore (Industrial Cold Chain Logistics Hub)",
    "salary": "Salary SGD 1,900 + Housing Allowance SGD 500 (Total SGD 2,400)",
    "qualification": "Relevant Technical Qualifications in Ammonia / Industrial Refrigeration",
    "experience": "Experience operating and maintaining industrial ammonia refrigeration systems",
    "jobType": "NTS Work Permit",
    "vacancyCount": 2,
    "description": "Large-scale cold storage facility requires qualified Ammonia Technicians under NTS Work Permit. Strong technical background in industrial ammonia (NH3) chiller plants required.",
    "responsibilities": [
      "Operate, monitor, and maintain high-capacity industrial ammonia refrigeration compressors, condensers, and evaporators",
      "Perform daily system leak checks, pressure and temperature logging, and oil draining on NH3 systems",
      "Execute preventive maintenance and emergency repair of refrigeration valves, pumps, and cooling coils",
      "Adhere strictly to Singapore SCDF and MOM ammonia hazardous chemical safety procedures"
    ],
    "requirements": [
      "Relevant mechanical / refrigeration educational qualifications",
      "Proven experience in ammonia refrigeration systems",
      "Salary: SGD 1,900 / month",
      "Accommodation Allowance: SGD 500 / month (Total guaranteed: SGD 2,400)",
      "Working Hours: 12 hours per day",
      "Rest Days: 2 days off per month (First 3 months); 4 days off per month after 3-month confirmation"
    ],
    "benefits": [
      "SGD 500 housing allowance provided",
      "Rest days increase to 4 days/month upon confirmation",
      "Specialized industrial chemical plant exposure",
      "MOM work injury and hospitalization insurance"
    ],
    "requiredDocuments": [
      "Valid Passport Copy",
      "Refrigeration / Mechanical Engineering Trade Certificate",
      "Ammonia Safety Handling records (if available)"
    ],
    "status": "published",
    "featured": true,
    "latest": true,
    "postedDate": "2026-10-23",
    "id": "SG-JOB-969842",
    "createdAt": "2026-10-23T04:29:49.698Z",
    "updatedAt": "2026-10-23T04:29:49.698Z"
  },
  {
    "title": "NDT RT Radiographic Testing Technician - Aerospace (S Pass)",
    "employer": "Specialized Surface Coating & Aerospace Plating Facility",
    "category": "Engineering & Technical",
    "location": "Woodlands, Singapore",
    "salary": "Basic SGD 3,400 - 3,780 + OT (Gross Salary Reference: SGD 3,500 - 3,900+)",
    "qualification": "NDT RT (Radiographic Testing) Level 2 Certification",
    "experience": "4 - 5 Years NDT RT experience in Aerospace industrial manufacturing",
    "jobType": "S Pass",
    "vacancyCount": 2,
    "description": "Plating and surface coating facility in Woodlands is hiring NDT RT Technicians under S Pass. Candidates must hold NDT RT Level 2 certification with 4-5 years aerospace industry experience.",
    "responsibilities": [
      "Perform X-ray and Gamma-ray radiographic non-destructive testing (RT) on precision aerospace parts and plated components",
      "Interpret, evaluate, and report radiographic films/digital images according to international aerospace standards (ASTM/ASME/NAS410)",
      "Ensure strict radiation safety protection protocols and maintenance of darkroom/digital processing equipment",
      "Collaborate with quality assurance engineers to certify defect-free components"
    ],
    "requirements": [
      "Must possess valid NDT RT (Radiographic Testing) Level 2 certification",
      "Must have 4 to 5 years aerospace industrial experience",
      "Working Hours: Mon - Fri 8:00 AM to 5:00 PM, Sat 8:00 AM to 12:00 PM",
      "Sunday & Public Holidays: OFF",
      "Overtime Rate: SGD 11.80 per hour",
      "Accommodation: Candidate side (allowance factored into basic)",
      "Basic Salary: SGD 3,400 - 3,780 | Gross: SGD 3,500 - 3,900+",
      "Location: Woodlands"
    ],
    "benefits": [
      "Attractive high S Pass monthly salary: SGD 3,500 - 3,900+",
      "Sunday and Public Holidays regular rest days",
      "Generous overtime rate at SGD 11.80/hour",
      "MOM S Pass medical and hospital insurance"
    ],
    "requiredDocuments": [
      "Valid NDT RT Level 2 Certificate",
      "Aerospace Employment Testimonials (4-5 years)",
      "Educational Degree / Diploma Certificates",
      "Passport Copy"
    ],
    "status": "published",
    "featured": true,
    "latest": true,
    "postedDate": "2026-10-23",
    "id": "SG-JOB-969591",
    "createdAt": "2026-10-23T04:29:49.695Z",
    "updatedAt": "2026-10-23T04:29:49.695Z"
  },
  {
    "title": "M&E Supervisor - Mechanical & Electrical (New Build Projects)",
    "employer": "Integrated Mechanical & Electrical Engineering Pte Ltd",
    "category": "Engineering & Technical",
    "location": "Singapore (New Build Construction Projects)",
    "salary": "Basic SGD 1,200 - 1,300 + SGD 100 CoreTrade (Monthly Earn SGD 2,600 - 3,000)",
    "qualification": "Diploma in Electrical / Mechanical Engineering preferred; Valid CoreTrade",
    "experience": "3 - 5 Years M&E supervisory experience in new build projects (Not maintenance)",
    "jobType": "Work Permit (Skilled)",
    "vacancyCount": 2,
    "description": "Major M&E contractor is hiring experienced M&E Supervisors for new build construction projects. Strong electrical and mechanical coordination skills required. High earning potential up to SGD 3,000.",
    "responsibilities": [
      "Supervise on-site electrical, ACMV, fire protection, and sanitary plumbing installations in new building developments",
      "Coordinate MEP services with civil structural works and architectural finishes",
      "Conduct site inspections, resolve technical clashes, and manage sub-contractor trade teams",
      "Ensure all installations strictly comply with PUB, EMA, SCDF, and BCA standards"
    ],
    "requirements": [
      "Strong technical competency in electrical and mechanical building services",
      "Diploma in Engineering preferred",
      "At least 3 to 5 years experience as M&E Supervisor in new build projects (strictly not maintenance work)",
      "Basic Salary: SGD 1,200 - 1,300 / month + SGD 100/month if holding valid CoreTrade",
      "Schedule: 5.5 days per week | Overtime: 1.5x and 2.0x",
      "Monthly Gross Take-Home: SGD 2,600 - 3,000"
    ],
    "benefits": [
      "High monthly earnings: SGD 2,600 - 3,000 with overtime",
      "SGD 100 monthly CoreTrade allowance",
      "Long-term career on major Singapore new building developments",
      "MOM hospital and surgical insurance"
    ],
    "requiredDocuments": [
      "Updated Resume detailing new-build M&E project history",
      "Engineering Diploma Certificate",
      "Valid BCA CoreTrade Certificate",
      "Passport Copy and Singapore FIN records"
    ],
    "status": "published",
    "featured": true,
    "latest": true,
    "postedDate": "2026-10-23",
    "id": "SG-JOB-968969",
    "createdAt": "2026-10-23T04:29:49.689Z",
    "updatedAt": "2026-10-23T04:29:49.689Z"
  },
  {
    "title": "General Worker - Construction Plumbing (Daily SGD 24 - 26)",
    "employer": "Building Sanitary & Plumbing Engineering Pte Ltd",
    "category": "Construction & Civil",
    "location": "Singapore (Active Construction Sites)",
    "salary": "SGD 24 - 26 per day (8:00 AM - 5:00 PM, Depending on Experience)",
    "qualification": "Plumbing & Construction Experience (Singh candidates welcome)",
    "experience": "Basic plumbing and site pipelaying experience",
    "jobType": "Work Permit",
    "vacancyCount": 3,
    "description": "Chinese plumbing contractor requires General Workers for sanitary and water pipe installation at construction sites. Singh candidates are welcome to apply. Apply by interview.",
    "responsibilities": [
      "Assist plumbers with PVC, copper, and HDPE pipe cutting, threading, and jointing",
      "Carry sanitary fixtures, pipes, and plumbing materials to installation locations",
      "Trench, lay underground pipes, and backfill pipe trenches safely",
      "Keep work areas clean and adhere to site safety instructions"
    ],
    "requirements": [
      "Working Hours: 8:00 AM to 5:00 PM",
      "Daily Wage: SGD 24 to 26 per day depending on experience",
      "Company specializes in construction plumbing work",
      "Singh candidates welcome to apply",
      "Apply by interview with bio-data"
    ],
    "benefits": [
      "Daily wage system with overtime opportunities",
      "Hands-on training in commercial plumbing systems",
      "MOM compliant medical insurance"
    ],
    "requiredDocuments": [
      "Bio-data / Resume",
      "Valid Passport Copy",
      "Past Construction Safety Pass (if available)"
    ],
    "status": "published",
    "featured": false,
    "latest": true,
    "postedDate": "2026-10-23",
    "id": "SG-JOB-968668",
    "createdAt": "2026-10-23T04:29:49.686Z",
    "updatedAt": "2026-10-23T04:29:49.686Z"
  },
  {
    "title": "General Worker - Motor Pump Repair & Maintenance",
    "employer": "Industrial Motor & Pump Engineering Services Pte Ltd",
    "category": "Engineering & Technical",
    "location": "Singapore (Industrial Workshop & Field Service)",
    "salary": "SGD 1,000 / month (8:00 AM - 7:00 PM)",
    "qualification": "Basic Electrical & Mechanical Technical Knowledge",
    "experience": "Basic mechanical/electrical workshop background",
    "jobType": "Work Permit",
    "vacancyCount": 3,
    "description": "Chinese engineering company specializing in motor pump repair and maintenance seeks General Workers with basic electrical and mechanical knowledge. Bio-data arrangement and interview.",
    "responsibilities": [
      "Assist senior technicians in dismantling, cleaning, and repairing industrial electric motors and water pumps",
      "Perform basic electrical wiring, motor rewinding assistance, and mechanical parts replacement",
      "Clean workshop equipment, organize tools, and pack repaired pump units for delivery",
      "Support field service teams during on-site pump maintenance"
    ],
    "requirements": [
      "Must possess basic electrical and mechanical knowledge",
      "Working Hours: 8:00 AM to 7:00 PM",
      "Salary: SGD 1,000 / month",
      "Chinese company environment; apply by interview (arrange bio-data)",
      "Hardworking, willing to learn motor and pump servicing"
    ],
    "benefits": [
      "On-the-job training in industrial motor and pump overhaul",
      "Direct interview with employer",
      "MOM medical insurance coverage"
    ],
    "requiredDocuments": [
      "Updated Bio-data / Resume",
      "Passport Copy",
      "Educational / ITI / Technical certificates"
    ],
    "status": "published",
    "featured": false,
    "latest": true,
    "postedDate": "2026-10-23",
    "id": "SG-JOB-968378",
    "createdAt": "2026-10-23T04:29:49.683Z",
    "updatedAt": "2026-10-23T04:29:49.683Z"
  },
  {
    "title": "Lifting Supervisor (Construction Rigging & Crane Operations)",
    "employer": "Access Heavy Machinery & Construction Pte Ltd",
    "category": "Construction & Civil",
    "location": "Singapore (Active Infrastructure Project Sites)",
    "salary": "Basic SGD 520 + Allowance SGD 300 = SGD 820 (Gross ~SGD 1,100 - 1,300+ with OT)",
    "qualification": "MOM / BCA Lifting Supervisors Safety Course Certificate",
    "experience": "Lifting supervision and crane coordination experience",
    "jobType": "Work Permit",
    "vacancyCount": 2,
    "description": "Construction engineering firm is hiring certified Lifting Supervisors to plan, coordinate, and supervise all mobile and tower crane lifting operations on-site.",
    "responsibilities": [
      "Plan lifting operations, inspect lifting gears (webbing slings, shackles, wire ropes), and sign lifting permits",
      "Coordinate closely with crane operators, rigger men, and signal men during all lifting activities",
      "Enforce site safety barricades and exclusion zones around crane lifting radiuses",
      "Ensure full compliance with Singapore MOM Workplace Safety and Health (Operations of Cranes) Regulations"
    ],
    "requirements": [
      "Working Hours: 6 days per week (8:00 AM to 5:00 PM)",
      "Basic SGD 520 + Fixed Allowance SGD 300 = SGD 820 (higher subject to experience)",
      "Overtime: Follows MOM law (1.5x on normal days, 2.0x on Sundays/PH)",
      "Gross Take-Home: Around SGD 1,100 - 1,300+ with OT",
      "Mandatory: Valid MOM Lifting Supervisor Safety Course Certificate"
    ],
    "benefits": [
      "Steady overtime opportunities",
      "MOM standard medical and hospitalization insurance",
      "Long-term employment on high-profile infrastructure projects"
    ],
    "requiredDocuments": [
      "Valid Passport Copy",
      "MOM Lifting Supervisor Safety Course Certificate",
      "Past Singapore Work Permit Records"
    ],
    "status": "published",
    "featured": false,
    "latest": true,
    "postedDate": "2026-10-23",
    "id": "SG-JOB-968138",
    "createdAt": "2026-10-23T04:29:49.681Z",
    "updatedAt": "2026-10-23T04:29:49.681Z"
  },
  {
    "title": "Structural Welder - Flux Core Arc MIG & Gas Welding (Min 4 Yrs SG Exp)",
    "employer": "Structural Steel & Heavy Fabrication Pte Ltd",
    "category": "Manufacturing & Production",
    "location": "Singapore (Fabrication Workshop & Construction Sites)",
    "salary": "Basic SGD 520 + Allowance SGD 260 = SGD 780 (Gross ~SGD 1,100 - 1,300 with OT)",
    "qualification": "Welding Trade Certificate / MOM Welding Safety Certification",
    "experience": "Minimum 4 years Singapore structural welding experience",
    "jobType": "Work Permit",
    "vacancyCount": 3,
    "description": "Hiring Welders with minimum 4 years Singapore experience. Knowledge of Flux Core Arc Welding (FCAW/MIG) and gas welding preferred; training provided if willing to learn.",
    "responsibilities": [
      "Perform structural steel welding, flux core arc welding (MIG), and gas cutting/welding",
      "Fit, clamp, and tack-weld structural steel beams, columns, and metal plates",
      "Grind, clean, and inspect weld joints to meet engineering quality standards",
      "Operate welding equipment safely adhering to MOM hot work safety protocols"
    ],
    "requirements": [
      "Schedule: 6 days per week (8:00 AM to 5:00 PM)",
      "Minimum 4 years working experience in Singapore as a Welder",
      "Basic SGD 520 + Allowance SGD 260 = Total SGD 780 basic (can be higher subject to experience)",
      "Gross Earnings: Around SGD 1,100 - 1,300 after OT",
      "Flux core arc welding (MIG) / gas welding knowledge preferred; company willing to train willing candidates",
      "Overtime follows MOM law: 1.5x and 2.0x"
    ],
    "benefits": [
      "Training provided in advanced flux-core MIG gas welding techniques",
      "Reliable overtime hours",
      "MOM medical insurance and safety protective equipment"
    ],
    "requiredDocuments": [
      "Valid Passport Copy",
      "MOM Welding Safety / 3G/4G Trade Certificates",
      "Past Singapore FIN and employment records"
    ],
    "status": "published",
    "featured": false,
    "latest": true,
    "postedDate": "2026-10-23",
    "id": "SG-JOB-967840",
    "createdAt": "2026-10-23T04:29:49.679Z",
    "updatedAt": "2026-10-23T04:29:49.679Z"
  },
  {
    "title": "Construction Site Supervisor (6 Days, 8 AM - 5 PM)",
    "employer": "Building & Infrastructure Engineering Contractor",
    "category": "Construction & Civil",
    "location": "Singapore (Islandwide Project Sites)",
    "salary": "Basic SGD 520 + Allowance SGD 400 (Gross ~SGD 1,700 with OT)",
    "qualification": "BCSS / Building Construction Supervisor Safety Course",
    "experience": "Construction supervisory experience in Singapore",
    "jobType": "Work Permit",
    "vacancyCount": 2,
    "description": "Established construction company is hiring Site Supervisors. Follows MOM Law with 1.5x and 2.0x overtime rates. Basic plus fixed allowance with average take-home around SGD 1,700.",
    "responsibilities": [
      "Supervise daily on-site construction works and coordinate sub-contractor activities",
      "Ensure work execution aligns strictly with approved construction drawings and specifications",
      "Monitor daily worker attendance, site safety practices, and material inventory",
      "Report daily site progress to Project Engineers and Resident Technical Officers"
    ],
    "requirements": [
      "Schedule: 6 days per week (8:00 AM to 5:00 PM)",
      "Overtime: Follows MOM Law (1.5x regular OT, 2.0x Sunday/PH)",
      "Basic Salary: SGD 520 + Fixed Allowance SGD 400 (subject to experience)",
      "Gross Take-Home: Around SGD 1,700+- after overtime",
      "Valid Building Construction Safety Supervisors certificate (BCSS)"
    ],
    "benefits": [
      "Consistent daily overtime earnings",
      "MOM compliant employment terms and medical coverage",
      "Opportunity for salary progression based on project performance"
    ],
    "requiredDocuments": [
      "Valid Passport Copy",
      "BCSS Certificate / Diploma in Civil or Construction",
      "Past Singapore Work Permit Records"
    ],
    "status": "published",
    "featured": false,
    "latest": true,
    "postedDate": "2026-10-23",
    "id": "SG-JOB-967761",
    "createdAt": "2026-10-23T04:29:49.677Z",
    "updatedAt": "2026-10-23T04:29:49.677Z"
  },
  {
    "title": "Safety Coordinator (WSH Construction Site Safety)",
    "employer": "Chinese Construction & Civil Engineering Pte Ltd",
    "category": "Safety & Security",
    "location": "Singapore (Active Construction Project Sites)",
    "salary": "SGD 1,300 / month (8:00 AM - 7:00 PM)",
    "qualification": "Advanced Certificate in Workplace Safety and Health (WSH Level B / WSS)",
    "experience": "Safety coordination experience in construction projects",
    "jobType": "Work Permit",
    "vacancyCount": 2,
    "description": "Reputable Chinese construction company requires qualified Safety Coordinators to assist WSHO with daily site safety implementation, risk assessments, and tool-box briefings.",
    "responsibilities": [
      "Conduct daily site safety inspections to identify hazards and enforce MOM WSH regulations",
      "Lead morning tool-box safety talks and ensure all workers wear mandatory PPE",
      "Assist the WSHO in preparing risk assessments and safety method statements (SWP)",
      "Coordinate safety induction for new workers and monitor high-risk work activities"
    ],
    "requirements": [
      "Working Hours: 8:00 AM to 7:00 PM",
      "Salary: SGD 1,300 / month",
      "Apply by Interview (Bio data / CV arrangement needed)",
      "Holding recognized WSH Coordinator qualifications",
      "Chinese company environment; good communication skills"
    ],
    "benefits": [
      "Direct interview arrangement with employer management",
      "Exposure to major Singapore civil construction projects",
      "Standard MOM medical and accident insurance coverage"
    ],
    "requiredDocuments": [
      "Updated Bio-data / Resume",
      "WSH Safety Coordinator Certificate",
      "Valid Passport Copy and FIN details"
    ],
    "status": "published",
    "featured": false,
    "latest": true,
    "postedDate": "2026-10-23",
    "id": "SG-JOB-967512",
    "createdAt": "2026-10-23T04:29:49.675Z",
    "updatedAt": "2026-10-23T04:29:49.675Z"
  },
  {
    "title": "Pump Technician (Engineering Services - CoreTrade Required)",
    "employer": "Industrial Pumping & Engineering Services Pte Ltd",
    "category": "Engineering & Technical",
    "location": "Ang Mo Kio, Singapore",
    "salary": "Basic SGD 1,300 - 1,500 (Gross SGD 1,600 - 1,900 with OT)",
    "qualification": "BCA CoreTrade / Trade Certificate in Mechanical / Pumping",
    "experience": "Must have valid BCA CoreTrade & pumping mechanical experience",
    "jobType": "Work Permit",
    "vacancyCount": 2,
    "description": "Leading engineering services company specializing in industrial pumping systems is hiring Pump Technicians. Accommodation provided by company.",
    "responsibilities": [
      "Perform installation, troubleshooting, overhaul, and testing of water pumps, submersible pumps, and booster systems",
      "Execute mechanical alignment, seal replacements, impeller repairs, and motor coupling checks",
      "Conduct regular preventive maintenance servicing at commercial and industrial sites across Singapore",
      "Respond to emergency pump breakdown calls and ensure smooth fluid handling operations"
    ],
    "requirements": [
      "Basic Salary: SGD 1,300 - 1,500 per month (Gross: SGD 1,600 - 1,900)",
      "Working Hours: Monday to Saturday, 9:00 AM to 6:00 PM",
      "Off Day: Sunday",
      "Overtime: 1.5x on normal days, 2.0x on Sundays and Public Holidays",
      "Accommodation: Provided by employer",
      "Mandatory: Must possess valid Singapore BCA CoreTrade certificate",
      "Location: Ang Mo Kio"
    ],
    "benefits": [
      "Company accommodation provided",
      "Overtime pay at 1.5x / 2.0x rates",
      "CoreTrade allowances and steady project pipeline",
      "MOM standard medical and accident insurance"
    ],
    "requiredDocuments": [
      "Passport Copy",
      "BCA CoreTrade Certificate in Mechanical / Pump Works",
      "Past Singapore FIN and employment records"
    ],
    "status": "published",
    "featured": true,
    "latest": true,
    "postedDate": "2026-10-23",
    "id": "SG-JOB-967459",
    "createdAt": "2026-10-23T04:29:49.674Z",
    "updatedAt": "2026-10-23T04:29:49.674Z"
  },
  {
    "title": "AutoCAD Drafter - 2D, 3D, BIM & MicroStation (Top MainCon)",
    "employer": "Top A1 Civil & Structural Main Contractor",
    "category": "Engineering & Technical",
    "location": "Singapore (Head Office & Construction Project Sites)",
    "salary": "Salary based on experience (Discussed during Interview)",
    "qualification": "Diploma / Degree in Civil / Mechanical / Architectural Drafting",
    "experience": "Singapore drafting experience required; relevant drafting track record",
    "jobType": "WP-Skilled / S Pass",
    "vacancyCount": 2,
    "description": "Premier Top Main Contractor in Singapore is urgently hiring skilled AutoCAD Drafters with 2D, 3D, BIM, and MicroStation expertise for ongoing infrastructure and civil building projects.",
    "responsibilities": [
      "Prepare detailed 2D and 3D architectural, structural, and civil engineering drawings using AutoCAD and MicroStation",
      "Coordinate with BIM modelers, project engineers, and architects to update shop drawings and as-built submissions",
      "Incorporate site design modifications, RFIs, and clash detection corrections into working drawings",
      "Ensure all drafting documentation complies strictly with Singapore BCA and LTA drawing standards"
    ],
    "requirements": [
      "Must be proficient in AutoCAD and MicroStation software (2D, 3D, BIM knowledge)",
      "Singapore local drafting experience is required",
      "Relevant drafting experience in construction/civil engineering is an advantage",
      "Eligible for Work Permit (Skilled) or S Pass based on qualifications"
    ],
    "benefits": [
      "Competitive salary package commensurate with experience",
      "Opportunity to work with a prestigious Top A1 Main Contractor",
      "Comprehensive MOM work injury and medical coverage",
      "Career progression into Senior Drafter / BIM Coordinator"
    ],
    "requiredDocuments": [
      "Updated Resume with drafting portfolio sample",
      "Drafting / Engineering Diploma or Degree certificates",
      "Valid Passport Copy and past Singapore FIN details"
    ],
    "status": "published",
    "featured": true,
    "latest": true,
    "postedDate": "2026-10-23",
    "id": "SG-JOB-967085",
    "createdAt": "2026-10-23T04:29:49.670Z",
    "updatedAt": "2026-10-23T04:29:49.670Z"
  },
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

