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
  jobsLastUpdatedAt: '2026-09-29T05:56:00.000Z'
};

export const initialJobs: Job[] = [
  {
    "id": "SG-JOB-301",
    "title": "Rigger and Signalman (Chinese A1 Maincon)",
    "employer": "Chinese A1 Maincon - Construction & Infrastructure",
    "category": "Construction & Civil",
    "location": "Singapore (Islandwide Projects)",
    "salary": "SGD 25 - 27 / day + Overtime (Gross SGD 1,800 - 2,500+)",
    "qualification": "Rigger & Signalman Certificate (BCA / MOM / Shipyard / PCM)",
    "experience": "1 - 5 Years (Fresh Construction Rigger also accepted)",
    "jobType": "Work Permit",
    "vacancyCount": 2,
    "description": "Chinese A1 Main Contractor urgently requires 2 Rigger & Signalman for active civil and infrastructure construction sites. Candidates from Shipyard or PCM background, fresh construction riggers, and experienced candidates up to age 50+ are welcome to apply. Only Indian candidates.",
    "responsibilities": [
      "Perform rigging, slinging, and signaling operations safely in accordance with MOM WSH regulations",
      "Direct mobile crane, crawler crane, and tower crane operators using standard hand signals and walkie-talkie",
      "Inspect all lifting gears, wire ropes, shackles, and webbing slings before lifting commences",
      "Assist site engineers, lifting supervisors, and safety coordinators with daily lifting plans"
    ],
    "requirements": [
      "Indian candidates only",
      "Valid Rigger & Signalman Certificate (Shipyard / PCM / Construction)",
      "1 - 2 Years experience: SGD 25 - 26 / day (8:00 AM - 5:00 PM) + Overtime",
      "4 - 5 Years experience: SGD 27 / day (8:00 AM - 5:00 PM) + Overtime",
      "Daily 2 to 3 hours overtime available",
      "Fresh construction riggers or candidates aged 50+ accepted"
    ],
    "benefits": [
      "Daily 2 to 3 hours overtime pay",
      "Long-term employment with Chinese A1 Maincon",
      "Standard MOM medical insurance and safety gear provided"
    ],
    "requiredDocuments": [
      "Valid Passport Copy",
      "Rigger & Signalman Certificate",
      "Past Singapore Work Experience / FIN (if applicable)"
    ],
    "status": "published",
    "featured": true,
    "latest": true,
    "postedDate": "2026-10-08",
    "createdAt": "2026-10-08T05:22:18.408Z",
    "updatedAt": "2026-10-08T05:22:18.409Z"
  },
  {
    "id": "SG-JOB-302",
    "title": "Class 4 Lorry Driver (Medical Supplies Company)",
    "employer": "Medical Supplies Distribution Pte Ltd",
    "category": "Logistics & Warehouse",
    "location": "Penjuru, Singapore",
    "salary": "SGD 2,800 / month + 1.5x OT",
    "qualification": "Valid Singapore Class 4 Driving License",
    "experience": "1+ Years Class 4 Driving & Delivery Experience",
    "jobType": "NTS Work Permit",
    "vacancyCount": 2,
    "description": "Established Medical Supplies Company located in Penjuru is hiring Class 4 Lorry Drivers. Responsible for islandwide deliveries to hospitals, clinics, and medical centers, along with warehouse support.",
    "responsibilities": [
      "Drive company Class 4 lorry to deliver medical consumables, supplies, and hospital equipment across Singapore",
      "Verify delivery orders, obtain signed delivery notes, and report delivery completion",
      "Assist in warehouse operations including receiving, sorting, loading, and unloading goods",
      "Inspect company lorry daily for roadworthiness and cleanliness"
    ],
    "requirements": [
      "Valid Singapore Class 4 driving license",
      "Able to speak and understand basic English",
      "Willing to accept warehouse work and physical cargo handling",
      "Working schedule: Mon - Sat with 7:00 AM report time",
      "Overtime at 1.5x after 44-hour workweek; Rest days on Sundays & Public Holidays"
    ],
    "benefits": [
      "Fixed monthly salary SGD 2,800 + 1.5x Overtime",
      "Rest days on Sundays and Public Holidays",
      "Full MOM medical and hospitalization coverage"
    ],
    "requiredDocuments": [
      "Passport Copy",
      "Valid Singapore Class 4 Driving License (both sides)",
      "Resume with past driving experience"
    ],
    "status": "published",
    "featured": true,
    "latest": true,
    "postedDate": "2026-10-08",
    "createdAt": "2026-10-08T05:22:18.409Z",
    "updatedAt": "2026-10-08T05:22:18.409Z"
  },
  {
    "id": "SG-JOB-303",
    "title": "Welder cum Class 3 Driver (Pipefitting Company)",
    "employer": "Woodlands Pipefitting & Engineering Works",
    "category": "Manufacturing & Production",
    "location": "Woodlands, Singapore",
    "salary": "SGD 1,800 Basic + SGD 400 Accommodation (Total SGD 2,200) + 1.5x OT",
    "qualification": "GTAW / TIG Welder Certification & Class 3 License",
    "experience": "2+ Years GTAW / TIG Pipe Welding Experience",
    "jobType": "S Pass",
    "vacancyCount": 1,
    "description": "Local pipefitting engineering company in Woodlands is looking for a skilled Welder cum Class 3 Driver. Must possess hands-on GTAW / TIG welding proficiency, blueprint reading capability, and a valid Class 3 driving license.",
    "responsibilities": [
      "Perform GTAW / TIG pipe welding on industrial piping and structural fittings",
      "Read and interpret piping isometric blueprints and welding symbols",
      "Drive company Class 3 vehicle to transport welding materials, tools, and colleagues to job sites",
      "Observe all safety procedures and maintain high welding quality standards"
    ],
    "requirements": [
      "Demonstrated GTAW / TIG pipe welding experience",
      "Valid Singapore Class 3 driving license",
      "Ability to read and execute fabrication from blueprints",
      "Work at Height (WAH) certification preferred",
      "Working hours: Mon - Fri 8:00 AM - 5:00 PM, Sat 8:00 AM - 1:00 PM; OT at 1.5x"
    ],
    "benefits": [
      "Basic salary SGD 1,800 + Accommodation allowance SGD 400 = Total SGD 2,200",
      "Overtime paid at 1.5x rate",
      "S Pass quota sponsorship with MOM compliance"
    ],
    "requiredDocuments": [
      "Passport Copy",
      "Singapore Class 3 Driving License",
      "Welder qualification test records / certifications",
      "Work at Height certificate (if available)"
    ],
    "status": "published",
    "featured": true,
    "latest": true,
    "postedDate": "2026-10-08",
    "createdAt": "2026-10-08T05:22:18.409Z",
    "updatedAt": "2026-10-08T05:22:18.409Z"
  },
  {
    "id": "SG-JOB-304",
    "title": "Sales Designer (Cabinetry & Wall Panels)",
    "employer": "Custom Cabinetry & Architectural Wall Panels Studio",
    "category": "Retail & Customer Service",
    "location": "Toa Payoh, Singapore",
    "salary": "SGD 3,500 Basic + Attractive High Commission Scheme",
    "qualification": "Diploma / Degree in Interior Design, Sales, or Architecture",
    "experience": "2+ Years in Cabinetry, Wall Panels, or Interior Fit-out Sales",
    "jobType": "S Pass",
    "vacancyCount": 2,
    "description": "Growing design-led cabinetry and wall panel specialist in Toa Payoh is hiring an energetic Sales Designer. Excellent career advancement with high commission earning potential in a collaborative environment.",
    "responsibilities": [
      "Advise residential and commercial clients on bespoke cabinetry and wall panel solutions",
      "Prepare customized design proposals, material specifications, and formal project quotations",
      "Follow up with prospective leads and manage customer accounts from inquiry to handover",
      "Work closely with production and installation teams to ensure smooth site delivery"
    ],
    "requirements": [
      "Well-versed in cabinetry hardware, joinery, laminates, and wall panel systems",
      "Prior sales or interior-related client advisory experience preferred",
      "Good communication and presentation skills (English and basic Chinese required for client consultation)",
      "Self-motivated, proactive, and target-driven mindset"
    ],
    "benefits": [
      "Competitive basic salary: SGD 3,500 / month",
      "Transport claims provided",
      "Attractive high commission scheme with strong earning potential ($5,000 - $8,000+ gross)",
      "Fast-track career advancement in a growing design-led company"
    ],
    "requiredDocuments": [
      "Updated CV with sales track record",
      "Interior portfolio or past cabinetry project samples",
      "Passport Copy"
    ],
    "status": "published",
    "featured": true,
    "latest": true,
    "postedDate": "2026-10-08",
    "createdAt": "2026-10-08T05:22:18.409Z",
    "updatedAt": "2026-10-08T05:22:18.409Z"
  },
  {
    "id": "SG-JOB-305",
    "title": "Lorry Driver & Warehouse Assistant (Pet Supplies)",
    "employer": "Pet Supplies Retail & Distribution Pte Ltd",
    "category": "Logistics & Warehouse",
    "location": "Clementi, Singapore",
    "salary": "SGD 2,300 / month + Accommodation & Transport Provided",
    "qualification": "Valid Singapore Class 4 Driving License",
    "experience": "1+ Years Delivery Driving & Warehouse Experience",
    "jobType": "NTS Work Permit",
    "vacancyCount": 2,
    "description": "Popular Pet Supplies Retail Shop in Clementi is hiring a Lorry Driver for daily pet supplies delivery and warehouse operations. Company provides accommodation and transport just 10 minutes to the workplace.",
    "responsibilities": [
      "Drive a manual 14-foot lorry or delivery van safely",
      "Check and load up pet food, cages, and supplies orders according to delivery invoices",
      "Fulfill all customer and retail outlet deliveries punctually within working hours",
      "Carry out warehouse receiving, stocking, and inventory duties"
    ],
    "requirements": [
      "Holds valid Singapore Class 4 license (or manual 14ft lorry experience)",
      "Able to speak and read English",
      "Capable of handling heavy loads up to 20kg",
      "Animal lover (not afraid of cats and dogs)",
      "Non-smoker preferred",
      "Working hours: Mon - Fri 9:30 AM - 6:30 PM, Sat 9:30 AM - 5:30 PM (Break 1.5h, 44h/week total)",
      "Rest days: Sundays & Public Holidays"
    ],
    "benefits": [
      "Monthly salary: SGD 2,300",
      "Accommodation and transport provided (only 10 mins to workplace)",
      "Predictable working hours with Sundays and Public Holidays off"
    ],
    "requiredDocuments": [
      "Passport Copy",
      "Singapore Class 4 License",
      "Work Experience Resume"
    ],
    "status": "published",
    "featured": true,
    "latest": true,
    "postedDate": "2026-10-08",
    "createdAt": "2026-10-08T05:22:18.409Z",
    "updatedAt": "2026-10-08T05:22:18.409Z"
  },
  {
    "id": "SG-JOB-306",
    "title": "Production / Checker Worker (Chemical Plant)",
    "employer": "Industrial Chemical Manufacturing Pte Ltd",
    "category": "Manufacturing & Production",
    "location": "Tuas, Singapore",
    "salary": "SGD 2,000 / month + 1.5x OT",
    "qualification": "Secondary / Diploma / Chemistry Background Preferred",
    "experience": "1+ Years Factory Production / Chemical Plant Experience",
    "jobType": "NTS Work Permit",
    "vacancyCount": 4,
    "description": "Leading Chemical Production Company in Tuas is hiring Production Workers and Quality Checkers. Candidates with chemistry lab experience or industrial manufacturing background are preferred.",
    "responsibilities": [
      "Operate chemical packaging, filling, and blending equipment safely",
      "Perform line quality checks, label verification, and container sealing checks",
      "Record manufacturing batch numbers, production counts, and quality logs",
      "Adhere strictly to chemical safety guidelines and maintain workstation cleanliness"
    ],
    "requirements": [
      "Monthly salary: SGD 2,000",
      "Probation period: 6 months (evaluated on performance and attitude)",
      "Working hours: Mon - Fri 8:15 AM - 10:00 PM, Sat 8:15 AM - 5:30 PM",
      "Breaks: Morning tea (10:00-10:15am), Lunch (12:00-12:45pm), Afternoon tea (3:00-3:15pm), Dinner (5:30-6:00pm)",
      "Rest day: Sunday; Overtime: 1.5x",
      "Preferred with chemistry lab background or industrial chemical experience"
    ],
    "benefits": [
      "7 days annual leave after probation period",
      "14 days paid medical sick leave",
      "Full PPE, protective gear, and chemical safety equipment provided"
    ],
    "requiredDocuments": [
      "Passport Copy",
      "Educational certificates",
      "Relevant chemical factory or lab work experience certificates"
    ],
    "status": "published",
    "featured": true,
    "latest": true,
    "postedDate": "2026-10-08",
    "createdAt": "2026-10-08T05:22:18.409Z",
    "updatedAt": "2026-10-08T05:22:18.409Z"
  },
  {
    "id": "SG-JOB-307",
    "title": "Health Attendant (HA - Nursing Home)",
    "employer": "Licensed Singapore Nursing Home & Elder Care Facility",
    "category": "Healthcare & Nursing",
    "location": "Singapore (Elder Care Nursing Home)",
    "salary": "SGD 1,050 Basic + 3 Free Meals/Day + Air-Con Dorm Provided",
    "qualification": "10th / 12th / Any Degree (No Local Certificate Required)",
    "experience": "Freshers Welcome (Prior Nursing / Care-Home Experience Preferred)",
    "jobType": "Work Permit",
    "vacancyCount": 10,
    "description": "Major Singapore Nursing Home is hiring 10 Health Attendants (HA) for resident care and ward maintenance. Employer provides comprehensive free orientation, hands-on training, air-conditioned accommodation, and 3 meals daily. Male candidates preferred.",
    "responsibilities": [
      "Clean and maintain resident wards, toilets, and common living areas in the nursing home",
      "Assist elderly residents with daily personal care: bathing, hygiene, feeding, and mobility support",
      "Assist nursing staff during routine resident checks and wheelchair transfers",
      "Provide compassionate, patient, and respectful assistance to senior citizens"
    ],
    "requirements": [
      "Male candidates preferred, physically strong and tall (10 vacancies)",
      "No Singapore experience required; employer provides free training",
      "Willing to do cleaning work and basic elderly care; follow nursing instructions",
      "Accept shared air-conditioned dormitory accommodation (approx. 10 persons per room)",
      "Good physical health with no infectious diseases; eligible for MOM work pass"
    ],
    "benefits": [
      "Basic salary: SGD 1,050 per month",
      "No housing deduction: Air-conditioned staff dorm provided free",
      "3 full nutritious meals per day provided by employer",
      "Free professional orientation and healthcare job training before commencement"
    ],
    "requiredDocuments": [
      "Passport Copy",
      "Educational certificates",
      "Medical fitness certificate"
    ],
    "status": "published",
    "featured": true,
    "latest": true,
    "postedDate": "2026-10-08",
    "createdAt": "2026-10-08T05:22:18.409Z",
    "updatedAt": "2026-10-08T05:22:18.409Z"
  },
  {
    "id": "SG-JOB-308",
    "title": "Civil & Structural Engineer (PE / BCA Recognized)",
    "employer": "Singapore Civil & Structural Construction Contractor",
    "category": "Construction & Civil",
    "location": "Singapore (Active Construction Sites)",
    "salary": "Fixed SGD 2,500 - 3,500 / month",
    "qualification": "Recognized Degree in Civil/Structural Engineering by PE Board / BCA",
    "experience": "3 - 5 Years in Civil & Structural Construction Works",
    "jobType": "Work Permit",
    "vacancyCount": 2,
    "description": "Prominent Construction Company is hiring Civil & Structural Engineers for ongoing building and infrastructure projects in Singapore. Must hold a degree recognized by Singapore PE Board / BCA.",
    "responsibilities": [
      "Supervise daily civil, structural, foundation, and reinforced concrete works on site",
      "Interpret structural engineering blueprints, shop drawings, and bar bending schedules",
      "Coordinate with consultants, resident technical officers (RTO), and subcontractors",
      "Ensure construction quality and strict compliance with MOM safety regulations"
    ],
    "requirements": [
      "Recognized degree in Civil / Structural Engineering by P.E. Board / BCA",
      "Minimum 3 to 5 years verified working experience in Civil & Structural works",
      "Fixed salary: SGD 2,500 - 3,500 / month",
      "Working hours follow project site operations"
    ],
    "benefits": [
      "Competitive fixed monthly salary: SGD 2,500 - 3,500",
      "Long-term career advancement with established builder",
      "Standard MOM medical and insurance benefits"
    ],
    "requiredDocuments": [
      "Civil Engineering Degree Certificate recognized by PEB/BCA",
      "Official academic transcripts",
      "Updated resume with structural project details",
      "Passport Copy"
    ],
    "status": "published",
    "featured": true,
    "latest": true,
    "postedDate": "2026-10-08",
    "createdAt": "2026-10-08T05:22:18.409Z",
    "updatedAt": "2026-10-08T05:22:18.409Z"
  },
  {
    "id": "SG-JOB-309",
    "title": "Site Civil Engineer (S Pass / WP-Skilled)",
    "employer": "Singapore Building Construction Pte Ltd",
    "category": "Construction & Civil",
    "location": "Singapore (Commercial & Residential Projects)",
    "salary": "SGD 2,800 - 3,800 / month",
    "qualification": "Recognized Degree in Civil/Structural Engineering by PE Board / BCA",
    "experience": "3 - 5 Years Site Civil Engineering Experience",
    "jobType": "S Pass",
    "vacancyCount": 2,
    "description": "Established Singapore construction company is seeking qualified Site Civil Engineers under S Pass / WP-Skilled category. Strong background in project execution, quality assurance, and site supervision required.",
    "responsibilities": [
      "Oversee day-to-day site operations, rebar inspections, and concrete pour schedules",
      "Liaise with clients, architects, and structural consultants for technical clarifications",
      "Manage site subcontractors, verify work progress, and implement safety protocols",
      "Prepare site daily logs, variation records, and inspection documentation"
    ],
    "requirements": [
      "Recognized degree in Civil / Structural Engineering by P.E. Board / BCA",
      "Minimum 3 to 5 years working experience in Civil & Structural works",
      "Strong coordination and problem-solving skills on active construction sites",
      "Working hours follow project site operational schedule"
    ],
    "benefits": [
      "Salary package: SGD 2,800 - 3,800 / month based on experience",
      "S Pass MOM quota sponsorship",
      "Site allowance and medical coverage"
    ],
    "requiredDocuments": [
      "PEB / BCA recognized Engineering Degree",
      "Comprehensive CV listing all past construction projects",
      "Passport Copy"
    ],
    "status": "published",
    "featured": true,
    "latest": true,
    "postedDate": "2026-10-08",
    "createdAt": "2026-10-08T05:22:18.409Z",
    "updatedAt": "2026-10-08T05:22:18.409Z"
  },
  {
    "id": "SG-JOB-310",
    "title": "Heavy Machinery Mechanic (Hook Lift, Excavator, Forklift)",
    "employer": "Heavy Equipment Maintenance Workshop",
    "category": "Automotive & Mechanical",
    "location": "Clementi / Jurong, Singapore",
    "salary": "Basic SGD 1,200 | Gross SGD 2,200 - 2,300 / month + Sunday OT",
    "qualification": "ITI / Diploma in Mechanical / Automobile Engineering",
    "experience": "3 - 5 Years Heavy Equipment Maintenance Experience",
    "jobType": "S Pass",
    "vacancyCount": 2,
    "description": "Heavy machinery service workshop is hiring Mechanics specializing in hook lift trucks, excavators, forklifts, and industrial machinery. Open to candidates with 3 to 5 years experience from any country.",
    "responsibilities": [
      "Troubleshoot, service, and overhaul diesel engines, hydraulic cylinders, and pumps",
      "Repair hook lift trucks, crawler excavators, diesel/electric forklifts, and plant machinery",
      "Perform preventive maintenance inspections, oil changes, and mechanical part replacements",
      "Conduct on-site emergency repairs and workshop overhaul work"
    ],
    "requirements": [
      "Must have proven experience fixing Hook lift trucks, excavators, and forklifts",
      "Minimum 3 to 5 years experience (experience from any country accepted)",
      "Age below 40 years",
      "Working days: Mon - Fri 8:00 AM - 5:00 PM, Sat 8:00 AM - 12:00 PM",
      "Rest day: Sunday (Sunday OT available if desired)"
    ],
    "benefits": [
      "Basic salary: SGD 1,200 | Gross salary: SGD 2,200 - 2,300 / month",
      "Company housing provided",
      "Sunday overtime available for extra earnings"
    ],
    "requiredDocuments": [
      "Passport Copy",
      "Trade experience certificates / proof of mechanic work",
      "Photos / videos of past machinery repair work (if available)"
    ],
    "status": "published",
    "featured": true,
    "latest": true,
    "postedDate": "2026-10-08",
    "createdAt": "2026-10-08T05:22:18.409Z",
    "updatedAt": "2026-10-08T05:22:18.409Z"
  },
  {
    "id": "SG-JOB-311",
    "title": "Factory Production & Packing Operator (12-Hour Shift)",
    "employer": "Precision Packaging & Industrial Products Pte Ltd",
    "category": "Manufacturing & Production",
    "location": "Singapore (Industrial Park)",
    "salary": "SGD 1,800 - 2,200 Gross / month (Fixed OT $5 - $10/hr)",
    "qualification": "Secondary / 10th / 12th / ITI",
    "experience": "1+ Years Factory / Packaging / Assembly Line Experience",
    "jobType": "Work Permit",
    "vacancyCount": 6,
    "description": "Manufacturing facility is hiring Production & Packing Operators for high-volume automated lines. 12-hour rotating shifts with fixed overtime pay.",
    "responsibilities": [
      "Operate production line packing, visual sorting, and boxing machines",
      "Perform inline quality inspection and separate defective goods",
      "Stack finished goods onto pallets and label cartons accurately",
      "Comply with industrial safety and hygiene regulations"
    ],
    "requirements": [
      "12 hours per shift: Day Shift 8:30 AM – 8:30 PM & Night Shift 8:30 PM – 8:30 AM",
      "Shift rotation every 2 weeks",
      "Overtime: Fixed OT pay SGD 5 - 10 / hour (discussed in interview)",
      "Physically fit, cooperative attitude, and punctual"
    ],
    "benefits": [
      "Gross salary SGD 1,800 - 2,200 / month",
      "Shift allowances and overtime earnings",
      "Uniform and safety gear provided"
    ],
    "requiredDocuments": [
      "Passport Copy",
      "Educational certificates",
      "Updated resume"
    ],
    "status": "published",
    "featured": true,
    "latest": true,
    "postedDate": "2026-10-08",
    "createdAt": "2026-10-08T05:22:18.409Z",
    "updatedAt": "2026-10-08T05:22:18.409Z"
  },
  {
    "id": "SG-JOB-312",
    "title": "Western Cuisine Chef (Swiss Restaurant Chain)",
    "employer": "Popular Swiss Market-Style Restaurant Chain",
    "category": "F&B & Hospitality",
    "location": "Singapore (Islandwide Mall Locations)",
    "salary": "Basic SGD 2,500 - 2,700 | Gross SGD 4,000++ / month",
    "qualification": "Culinary Certificate / Hotel Management / Western Cooking Experience",
    "experience": "2+ Years Preparing Western Cuisine",
    "jobType": "NTS Work Permit",
    "vacancyCount": 3,
    "description": "Famous Swiss market-style restaurant chain in Singapore is hiring Western Cuisine Chefs. Prepare, cook, and present a variety of Western dishes according to recipes, take customer orders, and assist front desk selling.",
    "responsibilities": [
      "Prepare, cook, and present Western dishes in a popular market-style live kitchen",
      "Take customer orders, serve guests, and assist with front desk selling",
      "Maintain kitchen hygiene, ingredient quality, and food safety standards",
      "Follow ad-hoc tasks assigned by head chef and supervisor"
    ],
    "requirements": [
      "Male or Female, under 40 years old, good spoken English",
      "Relevant experience preparing Western cuisine, neat and presentable",
      "A video demonstrating entire Western food cooking is required",
      "Working hours: 5 days / 44 hours per week (3 rotating shifts between 7:00 AM and 12:00 AM, 1-hour meal break)",
      "OT over 30 hours+ per month"
    ],
    "benefits": [
      "Basic salary: SGD 2,500 – 2,700 (based on experience)",
      "Counter incentive SGD 100 - 300 after probation (depending on counters handled)",
      "Gross salary around SGD 4,000++ per month",
      "Easy food access in shopping mall"
    ],
    "requiredDocuments": [
      "Video demonstrating complete Western food cooking (mandatory)",
      "Passport Copy",
      "Culinary resume and photos of prepared dishes"
    ],
    "status": "published",
    "featured": true,
    "latest": true,
    "postedDate": "2026-10-08",
    "createdAt": "2026-10-08T05:22:18.409Z",
    "updatedAt": "2026-10-08T05:22:18.409Z"
  },
  {
    "id": "SG-JOB-313",
    "title": "Supermarket Food Preparation Worker (Meat / Fish)",
    "employer": "Multinational Listed Supermarket Chain",
    "category": "Retail & Customer Service",
    "location": "Singapore (Islandwide Supermarkets)",
    "salary": "SGD 2,000 / month",
    "qualification": "Secondary School / Butchery / Seafood Handling Experience",
    "experience": "1+ Years Meat & Fish Preparation in Supermarkets",
    "jobType": "NTS Work Permit",
    "vacancyCount": 5,
    "description": "Large Multinational Listed Supermarket Chain is hiring Food Preparation Workers for meat, fish, and fresh food counters across Singapore retail stores.",
    "responsibilities": [
      "Handle, slice, cut, and pack fresh meat, fish, and seafood products",
      "Assist with display counter setup, replenishment, and customer sales",
      "Maintain strict food sanitation, chilling temperatures, and cleanliness",
      "Execute all duties arranged by store management"
    ],
    "requirements": [
      "Male or Female under 45 years old, speaks English",
      "Relevant supermarket experience in handling meat and fish cutting",
      "Video of cutting meat required for application review",
      "Working hours: 12 hours/day, 4 days off per month (shifts follow company arrangement)"
    ],
    "benefits": [
      "Monthly salary: SGD 2,000",
      "Reputable employment with listed multinational supermarket chain",
      "Uniform and equipment provided"
    ],
    "requiredDocuments": [
      "Video demonstrating meat cutting technique (mandatory)",
      "Passport Copy",
      "Resume"
    ],
    "status": "published",
    "featured": true,
    "latest": true,
    "postedDate": "2026-10-08",
    "createdAt": "2026-10-08T05:22:18.409Z",
    "updatedAt": "2026-10-08T05:22:18.409Z"
  },
  {
    "id": "SG-JOB-314",
    "title": "Safety Coordinator (LTA / MRT Project - Indian Candidates)",
    "employer": "Chinese Main Contractor - LTA MRT Project",
    "category": "Construction & Civil",
    "location": "Singapore (LTA Project Site)",
    "salary": "Basic SGD 1,100 - 1,200 | Expected Gross: SGD 1,700 - 2,000++ / month",
    "qualification": "WSH Coordinator Certificate / BCSS / Level B",
    "experience": "1 - 2 Years as Safety Coordinator (LTA / MRT Experience Advantage)",
    "jobType": "Work Permit",
    "vacancyCount": 2,
    "description": "Chinese Main Contractor on major LTA MRT project needs Indian Safety Coordinators. Lots of overtime available with high monthly gross earnings.",
    "responsibilities": [
      "Conduct daily site safety inspections and enforce MOM & LTA safety guidelines",
      "Prepare WSH documentation, risk assessments, and tool box meeting reports",
      "Coordinate high-risk site works, lifting operations, and traffic marshaling",
      "Liaise with site engineers and client safety auditors"
    ],
    "requirements": [
      "Indian candidates only",
      "Experienced Safety Coordinator (1 - 2 years experience)",
      "LTA / MRT / civil infrastructure experience a strong advantage",
      "Good WSH knowledge & safety documentation skills",
      "Relevant safety certificates required; good communication and site coordination",
      "5.5 days per week; Lots of overtime"
    ],
    "benefits": [
      "Basic: SGD 1,100 - 1,200",
      "Abundant overtime opportunities",
      "Expected monthly gross: SGD 1,700 – 2,000++"
    ],
    "requiredDocuments": [
      "Passport Copy",
      "Safety Coordinator Certificates (WSH Level B / BCSS)",
      "Proof of past Singapore experience / FIN"
    ],
    "status": "published",
    "featured": true,
    "latest": true,
    "postedDate": "2026-10-08",
    "createdAt": "2026-10-08T05:22:18.409Z",
    "updatedAt": "2026-10-08T05:22:18.409Z"
  },
  {
    "id": "SG-JOB-315",
    "title": "QA Engineer (Precision Engineering / Manufacturing)",
    "employer": "Precision Engineering & Metal Stamping Manufacturer",
    "category": "Manufacturing & Production",
    "location": "Singapore (Industrial Area)",
    "salary": "SGD 2,200 - 2,400 / month (Based on Experience)",
    "qualification": "Degree in Mechanical / Manufacturing / Precision / Quality Engineering",
    "experience": "3 - 5 Years Manufacturing QA Experience",
    "jobType": "S Pass",
    "vacancyCount": 2,
    "description": "Precision manufacturing company is hiring QA Engineers with 3 to 5 years experience in precision engineering, metal stamping, spring manufacturing, sheet metal, or machining.",
    "responsibilities": [
      "Conduct First Article (FA) inspection, in-process quality control, and final product audits",
      "Perform precision measurements using CMM, optical comparators, and height gauges",
      "Investigate quality non-conformances, perform root cause analysis, and draft 8D reports",
      "Maintain quality records in accordance with ISO quality standards"
    ],
    "requirements": [
      "Degree in Mechanical, Manufacturing, Precision Engineering, Quality Engineering or equivalent",
      "3 - 5 years manufacturing QA experience (preferably precision engineering, metal stamping, spring manufacturing, sheet metal or machining)",
      "Working hours: Mon - Fri 8:30 AM - 8:30 PM, Sat 8:30 AM - 5:30 PM"
    ],
    "benefits": [
      "Monthly salary: SGD 2,200 - 2,400 (depends on experience)",
      "S Pass sponsorship with MOM regulations compliance",
      "Annual leave, medical insurance, and career growth"
    ],
    "requiredDocuments": [
      "Degree Certificate & Marksheets",
      "Detailed resume showing QA measurement experience",
      "Passport Copy"
    ],
    "status": "published",
    "featured": true,
    "latest": true,
    "postedDate": "2026-10-08",
    "createdAt": "2026-10-08T05:22:18.409Z",
    "updatedAt": "2026-10-08T05:22:18.409Z"
  },
  {
    "id": "SG-JOB-316",
    "title": "Class 4 Truck Driver (Indian Candidates Only)",
    "employer": "Heavy Truck Haulage & Logistics Pte Ltd",
    "category": "Logistics & Warehouse",
    "location": "Singapore (Islandwide Routes)",
    "salary": "Basic SGD 1,600 + Mobile SGD 15 + OT ($12.59/hr) | Gross SGD 3,000+",
    "qualification": "Valid Singapore Class 4 Driving License",
    "experience": "1+ Years Truck Driving Experience",
    "jobType": "Work Permit",
    "vacancyCount": 3,
    "description": "Heavy transport company is hiring Class 4 Truck Drivers for islandwide delivery operations. Drivers can earn around SGD 3,000 or more per month with steady overtime.",
    "responsibilities": [
      "Drive Class 4 heavy trucks to transport cargo, materials, and equipment across Singapore",
      "Conduct vehicle daily pre-trip inspections and secure loads safely",
      "Ensure timely deliveries and report delivery receipts to dispatch"
    ],
    "requirements": [
      "Indian candidates only",
      "Valid Singapore Class 4 driving license",
      "At least 1 year of truck driving experience",
      "5.5-day work week; Overtime: SGD 12.59 / hour"
    ],
    "benefits": [
      "Basic salary: SGD 1,600",
      "Mobile allowance: SGD 15",
      "Drivers can earn around SGD 3,000 or more per month with overtime"
    ],
    "requiredDocuments": [
      "Singapore Class 4 License",
      "Passport Copy",
      "Past FIN / Driving record"
    ],
    "status": "published",
    "featured": true,
    "latest": true,
    "postedDate": "2026-10-08",
    "createdAt": "2026-10-08T05:22:18.409Z",
    "updatedAt": "2026-10-08T05:22:18.409Z"
  },
  {
    "id": "SG-JOB-317",
    "title": "Prime Mover / Crane Lorry Driver (Indian Candidates Only)",
    "employer": "Heavy Lifting & Container Transport Logistics",
    "category": "Logistics & Warehouse",
    "location": "Singapore (Port & Construction Sites)",
    "salary": "Basic SGD 1,600 + Allowance SGD 680 + OT ($12.59/hr) | Gross SGD 3,000+",
    "qualification": "Valid Singapore Class 4 License",
    "experience": "1+ Years Prime Mover / Crane Lorry Driving Experience",
    "jobType": "Work Permit",
    "vacancyCount": 3,
    "description": "Heavy logistics company is hiring Prime Mover and Crane Lorry Drivers. Indian candidates only. High earnings exceeding SGD 3,000 per month.",
    "responsibilities": [
      "Operate prime movers hauling container trailers or crane lorries delivering heavy cargo",
      "Safely secure cargo and operate lorry cranes (if certified)",
      "Coordinate with port marshals and site delivery supervisors"
    ],
    "requirements": [
      "Indian candidates only",
      "Valid Singapore Class 4 driving license",
      "At least 1 year of prime mover / crane lorry driving experience",
      "5.5-day work week; Overtime: SGD 12.59 / hour"
    ],
    "benefits": [
      "Basic salary: SGD 1,600",
      "Fixed allowance: SGD 680",
      "Overtime rate: SGD 12.59/hour (Drivers earn more than SGD 3,000 per month)"
    ],
    "requiredDocuments": [
      "Singapore Class 4 Driving License",
      "Lorry crane operator certificate (if applicable)",
      "Passport Copy"
    ],
    "status": "published",
    "featured": true,
    "latest": true,
    "postedDate": "2026-10-08",
    "createdAt": "2026-10-08T05:22:18.409Z",
    "updatedAt": "2026-10-08T05:22:18.409Z"
  },
  {
    "id": "SG-JOB-318",
    "title": "Electrician & Aircon Technician (Indian Candidates Only)",
    "employer": "M&E Engineering & ACMV Maintenance Pte Ltd",
    "category": "Electrical & Maintenance",
    "location": "Singapore (CBD Offices & Commercial Buildings)",
    "salary": "SGD 26 - 30 / day + 1.5x OT (Monthly Gross SGD 1,800 - 2,400+)",
    "qualification": "BCA CoreTrade / SEC(K) / Electrical ITI / ACMV Technician",
    "experience": "2+ Years Electrical / Aircon Maintenance Experience in Singapore",
    "jobType": "Work Permit",
    "vacancyCount": 6,
    "description": "Leading M&E Engineering company is hiring Electricians and Air-con Technicians for CBD office buildings and commercial sites. Indian candidates only.",
    "responsibilities": [
      "Electrician: Run electrical wire, install or extend power cables, install sockets, DB boxes, switches, and lighting",
      "Conduit & Piping: Conduit piping, GI trunking, tray installation, wiring pulling",
      "Aircon Technician: Attend to ACMV breakdown service, routine aircon servicing, filter cleaning, and electrician support team in CBD offices"
    ],
    "requirements": [
      "Indian candidates only",
      "Must have 2 to 3+ years electrical / aircon experience in Singapore",
      "Young age below 35 preferred",
      "Pay options: Electrician (piping/trunking): SGD 26 - 30/day; Electrician (cable/sockets): SGD 21 - 30/day; Aircon/Electrical tech: SGD 28/day (OT 1.5x, monthly ~52 hrs OT); Air-con tech (CBD ACMV): SGD 26 - 28/day (OT 1.5x)"
    ],
    "benefits": [
      "Overtime at 1.5x rate (lots of monthly OT)",
      "Central Singapore and CBD office work environments",
      "Safety gear, medical coverage, and work pass sponsorship"
    ],
    "requiredDocuments": [
      "Passport Copy",
      "BCA CoreTrade / SEC(K) / Trade certificate",
      "Past Singapore FIN records"
    ],
    "status": "published",
    "featured": true,
    "latest": true,
    "postedDate": "2026-10-08",
    "createdAt": "2026-10-08T05:22:18.409Z",
    "updatedAt": "2026-10-08T05:22:18.409Z"
  },
  {
    "id": "SG-JOB-319",
    "title": "Class 3 Driver cum General Worker (BCA Certified)",
    "employer": "Main Contractor Engineering & Services",
    "category": "Logistics & Warehouse",
    "location": "Singapore (Project Sites)",
    "salary": "Basic SGD 1,200 + SGD 400 OT (Gross SGD 1,600 - 1,900+)",
    "qualification": "Valid Singapore Class 3 License & BCA Skill Certificate",
    "experience": "1+ Years Driving & Site General Work",
    "jobType": "Work Permit",
    "vacancyCount": 2,
    "description": "Main contractor requires Class 3 Driver cum General Worker with BCA certification. Driving workers to job sites, moving chairs, tables, and performing all general site duties.",
    "responsibilities": [
      "Drive company Class 3 vehicle to transport workers to and from sites daily",
      "Help to move chairs, tables, materials, and equipment",
      "Perform general site work, housekeeping, and loading/unloading"
    ],
    "requirements": [
      "Valid Singapore Class 3 driving license",
      "BCA skill certificate required",
      "Salary: SGD 1,200 basic + SGD 400 OT (OT can be higher)",
      "Working hours: 8:00 AM - 5:00 PM daily",
      "Off days: 1 day per week (scheduled on weekdays)",
      "Off day work paid at 1.5x OT"
    ],
    "benefits": [
      "Overtime paid at 1.5x",
      "Stable main contractor employment",
      "Regular day hours 8:00 AM - 5:00 PM"
    ],
    "requiredDocuments": [
      "Singapore Class 3 License",
      "BCA Skill Certificate",
      "Passport Copy"
    ],
    "status": "published",
    "featured": true,
    "latest": true,
    "postedDate": "2026-10-08",
    "createdAt": "2026-10-08T05:22:18.409Z",
    "updatedAt": "2026-10-08T05:22:18.409Z"
  },
  {
    "id": "SG-JOB-320",
    "title": "Dishwasher, Cleaner cum Kitchen Helper (E Pass)",
    "employer": "Central F&B Dining Establishment",
    "category": "F&B & Hospitality",
    "location": "Singapore (Central Restaurant)",
    "salary": "Basic SGD 1,100 + Food SGD 100 + Accommodation SGD 500 (Total SGD 1,700) + $7/hr OT",
    "qualification": "Any Degree with RMI (Degree Qualification)",
    "experience": "F&B Kitchen Support / Cleaning / Dishwashing",
    "jobType": "E Pass",
    "vacancyCount": 2,
    "description": "F&B dining establishment in Singapore is hiring Dishwasher, Cleaner cum Kitchen Helper under E Pass. Candidate must hold any degree with RMI.",
    "responsibilities": [
      "Operate commercial dishwasher, clean kitchen utensils, crockery, and cookware",
      "Maintain kitchen hygiene, mop floors, clean workstations, and handle waste disposal",
      "Assist kitchen chefs with ingredient preparation and basic kitchen duties"
    ],
    "requirements": [
      "Any Degree with RMI qualification",
      "Working hours: 12 hours per day",
      "Monthly 2 days off",
      "Overtime rate: SGD 7.00 per hour",
      "Diligent, hygienic, and willing to handle kitchen cleaning duties"
    ],
    "benefits": [
      "Basic salary: SGD 1,100",
      "Food allowance: SGD 100",
      "Accommodation allowance: SGD 500",
      "Total guaranteed pay: SGD 1,700 + $7/hr OT"
    ],
    "requiredDocuments": [
      "Degree Certificate with RMI transcripts",
      "Passport Copy",
      "Resume"
    ],
    "status": "published",
    "featured": true,
    "latest": true,
    "postedDate": "2026-10-08",
    "createdAt": "2026-10-08T05:22:18.409Z",
    "updatedAt": "2026-10-08T05:22:18.409Z"
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

