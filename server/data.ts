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
  autoPruneOldLeads: false
};

export const initialJobs: Job[] = [
  {
    "id": "SG-JOB-201",
    "title": "Diesel Engine Mechanic & Maintenance Specialist (NTS WP)",
    "employer": "Heavy Machinery & Diesel Power Equipment Pte Ltd",
    "category": "Automotive & Mechanical",
    "location": "Tuas / Jurong Industrial Estate, Singapore",
    "salary": "SGD 2,500 - 3,000 / month (Basic + OT)",
    "qualification": "ITI Diesel Mechanic / Motor Vehicle Mechanic / Diploma in Mechanical",
    "experience": "3+ Years specializing in diesel engine repair and overhaul",
    "jobType": "NTS Work Permit",
    "vacancyCount": 6,
    "description": "Urgent requirement for experienced Diesel Engine Mechanics for a leading heavy equipment and industrial machinery engineering company. Specializing in diesel engine troubleshooting, periodic maintenance, full engine overhaul, fuel injector calibration, and hydraulic integration.",
    "responsibilities": [
      "Overhaul, dismantle, inspect, and rebuild multi-cylinder diesel engines (Cummins, Caterpillar, Perkins, Yanmar, Komatsu)",
      "Troubleshoot engine starting problems, fuel injection pump issues, turbocharger faults, and cooling systems",
      "Conduct routine preventive maintenance on heavy diesel machinery, generators, and earthmoving equipment",
      "Perform test runs and quality checks after major overhauls according to manufacturer specifications"
    ],
    "requirements": [
      "Proven experience as a Diesel Mechanic / Engine Specialist (minimum 3 years)",
      "ITI or Diploma in Diesel Mechanic, Automobile, or Mechanical Engineering",
      "Strong knowledge of diesel fuel injection systems, pistons, crankshafts, and turbochargers",
      "Valid passport with minimum 2 years validity"
    ],
    "benefits": [
      "Accommodation provided by company",
      "High monthly overtime potential (Total monthly earnings SGD 2,500 - 3,000)",
      "Medical insurance, workman injury compensation, and annual leave as per MOM regulations",
      "Company uniform and safety shoes provided"
    ],
    "requiredDocuments": [
      "Updated CV / Resume detailing diesel engine models handled",
      "ITI / Technical Qualification Certificates",
      "Experience Letters / Service Certificates",
      "Passport Color Scan (Front & Back)"
    ],
    "image": "https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=800&q=80",
    "status": "published",
    "featured": true,
    "latest": true,
    "postedDate": "2026-09-23",
    "deadline": "2026-11-30",
    "createdAt": "2026-09-23T04:16:32.885Z",
    "updatedAt": "2026-09-23T04:16:32.885Z"
  },
  {
    "id": "SG-JOB-202",
    "title": "Class 3 Driver cum General Worker (Gas Supplier)",
    "employer": "Woodlands Industrial Gas Supplies Pte Ltd",
    "category": "Logistics & Warehouse",
    "location": "Woodlands Industrial Park, Singapore",
    "salary": "SGD 1,800 + SGD 300 Lodging (Total SGD 2,100)",
    "qualification": "Secondary / 10th / 12th Pass with Valid Singapore Class 3 Driving License",
    "experience": "1+ Year driving 10-feet lorry in Singapore",
    "jobType": "S Pass",
    "vacancyCount": 4,
    "description": "Established gas supplier in Woodlands seeks fit and dedicated Class 3 Drivers cum General Workers. Responsible for safe transportation and physical delivery of industrial and medical gas cylinders using a 10-foot lorry, plus assisting in yard/warehouse operations when not on delivery rounds.",
    "responsibilities": [
      "Safely operate and drive company 10-feet lorry for islandwide gas cylinder deliveries",
      "Perform loading and unloading of gas cylinders onto/from vehicle with safety equipment",
      "Follow daily delivery schedules, secure cargo with straps, and collect signed delivery orders",
      "Assist in general yard maintenance, cylinder sorting, and general warehouse duties when not driving",
      "Follow all employer instructions and workplace safety guidelines for hazardous material transport"
    ],
    "requirements": [
      "Age 38 and below",
      "Must possess valid Singapore Class 3 driving license with clean record (10 feet lorry)",
      "Physically fit and strong (capable of manual cylinder handling; no overweight condition)",
      "Willing to assist in general company tasks when not driving",
      "Listen to employer instructions and follow workplace safety rules"
    ],
    "benefits": [
      "Basic Salary SGD 1,800 + Monthly Lodging Allowance SGD 300 (Total SGD 2,100)",
      "Working Hours: 7:00 AM - 7:00 PM (Work finish early can go back!)",
      "2 scheduled rest days per month",
      "Company vehicle and fuel card provided for delivery routes"
    ],
    "requiredDocuments": [
      "Valid Singapore Class 3 Driving License (Front & Back)",
      "Passport Copy (Minimum 18 months validity)",
      "Updated Resume with past driving experience",
      "Recent passport-size photograph"
    ],
    "image": "https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=800&q=80",
    "status": "published",
    "featured": true,
    "latest": true,
    "postedDate": "2026-09-23",
    "deadline": "2026-11-30",
    "createdAt": "2026-09-23T04:16:32.885Z",
    "updatedAt": "2026-09-23T04:16:32.885Z"
  },
  {
    "id": "SG-JOB-203",
    "title": "QC Welding Inspector (PCM / Oil & Gas)",
    "employer": "Petrochemical Process & Marine Engineering Services Pte Ltd",
    "category": "Marine & Shipyard",
    "location": "Jurong Island / Tuas PCM Sector, Singapore",
    "salary": "SGD 1,500 - 1,800 / month + OT (1.5x & 2.0x)",
    "qualification": "Diploma / Degree in Mechanical / Metallurgy with CSWIP 3.1 / AWS-CWI Certification",
    "experience": "4 - 5+ Years in Oil & Gas / Petrochemical Industry",
    "jobType": "PCM",
    "vacancyCount": 5,
    "description": "High-demand vacancy for qualified QC Welding Inspectors for major Process Construction & Maintenance (PCM) and Oil & Gas projects on Jurong Island and Tuas. Open to fresh-to-Singapore candidates with strong Gulf or Indian refinery/petrochemical inspection background.",
    "responsibilities": [
      "Perform visual and dimensional inspection of weld joints before, during, and after welding",
      "Verify compliance with ASME Sec IX, ASME B31.3, AWS D1.1, and client specifications",
      "Review Non-Destructive Testing (NDT) results (RT, UT, MPT, DPT) and verify welder qualifications",
      "Prepare and maintain Inspection & Test Plans (ITP), Non-Conformance Reports (NCR), and weld summary logs",
      "Interface with third-party inspection agencies and client quality representatives"
    ],
    "requirements": [
      "Minimum 4 to 5 years inspection experience in Oil & Gas, Refinery, or PCM sector",
      "Fresh to Singapore / Gulf experience or good Indian experience can apply",
      "Familiar with ASME & AWS standards and codes",
      "Documentation of Inspection reports, ITP & NCR etc.",
      "Relevant QC Inspector certifications (CSWIP 3.1 / AWS-CWI); Overseas experience is an advantage"
    ],
    "benefits": [
      "Accommodation provided by company",
      "Standard work hours 44 hrs/week",
      "Overtime pay at 1.5x (normal days) and 2.0x (Sundays & Public Holidays)",
      "Medical insurance, site transport, and MOM standard benefits"
    ],
    "requiredDocuments": [
      "CSWIP 3.1 / AWS-CWI Certificates & Renewal logs",
      "Diploma / Degree in Engineering Certificates",
      "Detailed CV with complete project list (Piping, Tanks, Pressure Vessels)",
      "Passport Copy (Front & Back)"
    ],
    "image": "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80",
    "status": "published",
    "featured": true,
    "latest": true,
    "postedDate": "2026-09-23",
    "deadline": "2026-11-30",
    "createdAt": "2026-09-23T04:16:32.885Z",
    "updatedAt": "2026-09-23T04:16:32.885Z"
  },
  {
    "id": "SG-JOB-204",
    "title": "Cold Room & Commercial Refrigerator Technician",
    "employer": "Polar Frost HVAC & Commercial Refrigeration Pte Ltd",
    "category": "Electrical & Maintenance",
    "location": "Islandwide Service (Base: Defu / Tai Seng), Singapore",
    "salary": "SGD 2,000 - 5,000+ / month (Basic + Housing + Comm + OT)",
    "qualification": "ITI / Diploma in RAC (Refrigeration & Air Conditioning) / Electrical",
    "experience": "2+ Years in Commercial Cold Rooms & Chillers",
    "jobType": "S Pass",
    "vacancyCount": 6,
    "description": "Lucrative S Pass opportunity for skilled Cold Room and Commercial Refrigeration Technicians. Servicing industrial cold storage facilities, supermarket chillers, walk-in freezers, and food processing plants. Outstanding commission structure and high earning capacity.",
    "responsibilities": [
      "Install, commission, troubleshoot, and repair walk-in cold rooms, freezers, and commercial reach-in chillers",
      "Diagnose compressor failures, refrigerant leaks (R404A, R134a, R410A), TXV valves, and defrost timers",
      "Program electronic temperature controllers (Dixell, Carel, Danfoss) and electrical control panels",
      "Attend emergency service calls and scheduled preventive maintenance across Singapore",
      "Complete digital service sheets and liaise with clients regarding system status"
    ],
    "requirements": [
      "Minimum 2 years hands-on experience in commercial refrigeration or industrial cold rooms",
      "Solid electrical wiring and refrigerant circuit troubleshooting skills",
      "Willingness to perform rotating on-call shifts (night dispatch call-out allowance provided)",
      "Driving licence is a huge advantage (dramatically increases commission and allowances)"
    ],
    "benefits": [
      "Starting salary: $1,500 + $300 housing + overtime (minimum monthly income: $2,000+)",
      "After 3-month probation: $1,800 + commission + overtime (Experienced employees earn $2,500–$5,000+/month)",
      "For night jobs: $60 call-out allowance provided for each dispatch",
      "Working Hours: 12 hours per day (Finish early if work completed early); 2 days off per month",
      "Driving Licence Perk: After obtaining license, salary increases by $500, company vehicle can be driven home, parking fees & petrol fully covered! With license, income reaches $3,500–$5,000+",
      "Commission: Without license technician gets 2/3 of commission (shared with driver); If driving self gets 100% of commission. Structure: $5k-$19,999: 3%; $20k-$29,999: 5%; $30k+: 10%"
    ],
    "requiredDocuments": [
      "Technical Certification in RAC / Refrigeration",
      "Resume with details of refrigeration equipment worked on",
      "Passport Copy (Color Scan)",
      "Driving license (if available)"
    ],
    "image": "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80",
    "status": "published",
    "featured": true,
    "latest": true,
    "postedDate": "2026-09-23",
    "deadline": "2026-11-30",
    "createdAt": "2026-09-23T04:16:32.885Z",
    "updatedAt": "2026-09-23T04:16:32.885Z"
  },
  {
    "id": "SG-JOB-205",
    "title": "Class 4 Driver (Commercial Laundry Factory)",
    "employer": "Industrial Linen & Commercial Laundry Services Pte Ltd",
    "category": "Logistics & Warehouse",
    "location": "Senoko / Jurong West, Singapore",
    "salary": "SGD 4,500 - 5,500+ / month ($40/trip, 3-5 trips/day)",
    "qualification": "Valid Singapore Class 4 Driving License (Minimum 2 years live license)",
    "experience": "2+ Years driving heavy vehicles in Singapore",
    "jobType": "NTS Work Permit",
    "vacancyCount": 8,
    "description": "High-earning Class 4 driving opportunity for a laundry factory distribution plant. $40 per trip, 3-5 trips per day (approx. 2.5-3 hours/trip). Existing workers consistently earn $5,000+. High volume of trips available year-round!",
    "responsibilities": [
      "Drive Class 4 heavy vehicles between laundry factory and commercial clients (hotels, hospitals, airline caterers)",
      "Perform loading and unloading of laundry roll-cages, linen bins, and textile bags",
      "Complete 3 to 5 trips per day (2.5 to 3 hours per trip)",
      "Ensure proper handling and cargo security of hotel and hospital textiles"
    ],
    "requirements": [
      "Must possess live Singapore Class 4 Driving License for minimum 2 years",
      "Physical stamina to handle loading and unloading of laundry containers",
      "Familiar with Singapore industrial areas and loading docks",
      "High motivation and willingness to maximize trips"
    ],
    "benefits": [
      "High trip rate: $40 per trip, 3-5 trips/day (earn up to $200+ daily)",
      "Existing workers regularly earn SGD 5,000+ per month",
      "Maximum 2 days off per month, with option to work on off-days for extra income",
      "Steady daily trip assignments with abundant job volume"
    ],
    "requiredDocuments": [
      "Valid Singapore Class 4 Driving License copy",
      "Passport Copy (Minimum 2 years validity)",
      "Singapore Traffic Police driving record printout (if available)",
      "Updated Resume"
    ],
    "image": "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=800&q=80",
    "status": "published",
    "featured": true,
    "latest": true,
    "postedDate": "2026-09-23",
    "deadline": "2026-11-30",
    "createdAt": "2026-09-23T04:16:32.885Z",
    "updatedAt": "2026-09-23T04:16:32.885Z"
  },
  {
    "id": "SG-JOB-206",
    "title": "Safety Coordinator (Urgent - WP Skilled)",
    "employer": "Prime Civil & Construction Engineering Pte Ltd",
    "category": "Construction & Civil",
    "location": "Central / North-East Construction Sites, Singapore",
    "salary": "Basic SGD 1,200 (8-5) + Allowance SGD 300 + OT",
    "qualification": "Advanced Certificate in WSH (Level B) / BCSS Certificate",
    "experience": "1+ Year Singapore Site Safety experience",
    "jobType": "Work Permit",
    "vacancyCount": 5,
    "description": "Very urgent requirement for skilled Safety Coordinators under Work Permit Skilled quota. Standard working hours 8:00 AM - 5:00 PM with stable overtime and accommodation provided by employer.",
    "responsibilities": [
      "Conduct daily site safety inspections, toolbox briefings, and check worker PPE",
      "Inspect perimeter fencing, scaffolding, work-at-height systems, and electrical installations",
      "Assist the WSHO in incident reports, risk assessments, and safe work procedures",
      "Administer permit-to-work (PTW) forms for hot work, lifting, and excavation"
    ],
    "requirements": [
      "Valid Level B / BCSS Safety Coordinator Certificate",
      "Minimum 1 year site safety coordination experience in Singapore",
      "Knowledge of Singapore MOM safety regulations and construction site practices",
      "Clear communication skills in English"
    ],
    "benefits": [
      "Basic Salary: SGD 1,200 (8:00 AM - 5:00 PM) + Fixed Monthly Allowance: SGD 300",
      "Overtime calculated based on basic rate",
      "Accommodation provided by company",
      "MOM medical insurance and safety equipment provided"
    ],
    "requiredDocuments": [
      "Advanced Certificate in WSH (Level B) / BCSS Cert",
      "Passport Copy",
      "Relevant Safety Training Credentials",
      "Resume with Singapore site references"
    ],
    "image": "https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=800&q=80",
    "status": "published",
    "featured": true,
    "latest": true,
    "postedDate": "2026-09-23",
    "deadline": "2026-11-30",
    "createdAt": "2026-09-23T04:16:32.885Z",
    "updatedAt": "2026-09-23T04:16:32.885Z"
  },
  {
    "id": "SG-JOB-207",
    "title": "Safety Coordinator (Ground Works Contractor)",
    "employer": "Earth Geo-Engineering & Ground Works Pte Ltd",
    "category": "Construction & Civil",
    "location": "West & North Infrastructure Projects, Singapore",
    "salary": "SGD 1,000 - 1,800+ / month (Tiered by Cert Age + Daily OT 1.5x)",
    "qualification": "Advanced Certificate in WSH (Level B) / New Cert Accepted",
    "experience": "Fresh to 3+ Years Experience",
    "jobType": "Work Permit",
    "vacancyCount": 6,
    "description": "Openings for Safety Coordinators with an established ground works and earthworks contractor. New coordinator cert is accepted! Tiered basic salary based on cert holding period, with guaranteed daily overtime of at least 2 hours.",
    "responsibilities": [
      "Enforce site safety compliance for earthmoving machinery, sheet piling, and deep trenching works",
      "Oversee soil stabilization safety, daily gas monitoring for deep shafts, and perimeter security",
      "Conduct daily toolbox talks and maintain safety logbooks for main contractor audits",
      "Supervise excavation safe entry, dewatering safety, and heavy vehicle ground movement"
    ],
    "requirements": [
      "New coordinator certificate is accepted!",
      "Cert less than 1 year: Basic $635 + Allowance $365 (Total $1,000)",
      "Cert 1-3 years: Basic $1,000",
      "Cert more than 3 years: Basic $1,000 - $1,200",
      "Willingness to work on ground works and deep excavation projects"
    ],
    "benefits": [
      "Overtime paid at 1.5x — Every day OT has at least 2 hours guaranteed!",
      "Substantial take-home earnings with consistent daily overtime",
      "MOM medical insurance, safety shoes, high-vis vest, and training support"
    ],
    "requiredDocuments": [
      "Advanced Certificate in WSH (Level B) / Safety Coordinator Certificate",
      "Passport Copy (Color Scan)",
      "Education & Past Employment Certificates",
      "Updated Resume"
    ],
    "image": "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80",
    "status": "published",
    "featured": false,
    "latest": true,
    "postedDate": "2026-09-23",
    "deadline": "2026-11-30",
    "createdAt": "2026-09-23T04:16:32.885Z",
    "updatedAt": "2026-09-23T04:16:32.885Z"
  },
  {
    "id": "SG-JOB-208",
    "title": "Safety Coordinator (Underground & Pipe Jacking Maincon)",
    "employer": "Trenchless Engineering & Pipe Jacking Main Contractor Pte Ltd",
    "category": "Construction & Civil",
    "location": "Deep Tunnel & Sewerage Network Sites, Singapore",
    "salary": "SGD 40 - 45 / day + OT (Daily 1.5x Overtime)",
    "qualification": "Advanced Certificate in WSH (Level B) taken on/before 2023",
    "experience": "3+ Years Singapore Safety Coordinator Experience",
    "jobType": "Work Permit",
    "vacancyCount": 4,
    "description": "Underground & Pipe Jacking Maincon requires experienced Safety Coordinators. Coordinator certificate must have more than 3 years experience (cert taken on or before 2023). Daily overtime available on every shift.",
    "responsibilities": [
      "Monitor confined space entry procedures, gas testing, and ventilation systems for pipe jacking shafts",
      "Supervise heavy hydraulic jacking operations, pipe delivery, and shaft hoisting safety",
      "Facilitate Risk Assessments (RA) and Safe Work Procedures (SWP) for underground environments",
      "Carry out daily safety briefings and liaise with PUB/LTA project safety supervisors"
    ],
    "requirements": [
      "Coordinator certificate must have more than 3 years experience (cert taken on/before 2023)",
      "Minimum 3 years verifiable Singapore site safety experience",
      "Knowledge of confined space safety and underground pipe jacking works",
      "Able to commit to daily overtime"
    ],
    "benefits": [
      "Daily Rate: SGD 40 - 45 per day",
      "Overtime paid at 1.5x — Every day OT is available!",
      "Total monthly earnings exceed SGD 1,800 - $2,300+ with consistent OT",
      "Work injury insurance and medical coverage as per Singapore regulations"
    ],
    "requiredDocuments": [
      "Level B WSH Certificate (Issued 2023 or earlier)",
      "Singapore Safety Pass / Construction Safety Orientation Record",
      "Passport Copy (Front & Back)",
      "CV highlighting underground / civil works experience"
    ],
    "image": "https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=800&q=80",
    "status": "published",
    "featured": false,
    "latest": true,
    "postedDate": "2026-09-23",
    "deadline": "2026-11-30",
    "createdAt": "2026-09-23T04:16:32.885Z",
    "updatedAt": "2026-09-23T04:16:32.885Z"
  },
  {
    "id": "SG-JOB-209",
    "title": "Lifting Supervisor (Underground & Pipe Jacking Maincon)",
    "employer": "Trenchless Engineering & Pipe Jacking Main Contractor Pte Ltd",
    "category": "Construction & Civil",
    "location": "Tunneling & Shaft Launching Sites, Singapore",
    "salary": "SGD 32 / day + OT (Daily 1.5x Overtime)",
    "qualification": "MOM Certified Lifting Supervisor Certificate taken on/before 2023",
    "experience": "3+ Years Lifting Supervisor Experience in Singapore",
    "jobType": "Work Permit",
    "vacancyCount": 5,
    "description": "Underground & Pipe Jacking Maincon requires certified Lifting Supervisors. More than 3 years lifting supervisor experience required, certificate taken on or before 2023. Daily overtime available.",
    "responsibilities": [
      "Plan, coordinate, and supervise all crane lifting operations, shaft lowerings, and heavy pipe installations",
      "Verify crane ground conditions, outrigger setup, rigging gear integrity, and load charts",
      "Coordinate with rigger and signalman teams using standard two-way radio and hand signals",
      "Ensure zero lifting incidents and strict adherence to Singapore MOM Approved Code of Practice on Safe Lifting"
    ],
    "requirements": [
      "More than 3 years lifting supervisor experience, cert taken on/before 2023",
      "MOM Accredited Lifting Supervisor Safety Course Certificate",
      "Thorough understanding of mobile crane and crawler crane load charts",
      "Strong leadership on site safety"
    ],
    "benefits": [
      "Daily Wage: SGD 32 / day",
      "Overtime paid at 1.5x — Every day OT is available!",
      "Monthly gross earnings approximately SGD 1,600 – $2,000+ with OT",
      "Comprehensive site insurance, medical coverage, and safety gear provided"
    ],
    "requiredDocuments": [
      "MOM Lifting Supervisor Certificate (Dated 2023 or earlier)",
      "Rigger & Signalman Certificates (if available)",
      "Passport Copy",
      "Detailed Resume with past crane lifting tonnage records"
    ],
    "image": "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80",
    "status": "published",
    "featured": false,
    "latest": true,
    "postedDate": "2026-09-23",
    "deadline": "2026-11-30",
    "createdAt": "2026-09-23T04:16:32.885Z",
    "updatedAt": "2026-09-23T04:16:32.885Z"
  },
  {
    "id": "SG-JOB-210",
    "title": "Registered Earthworks Supervisor - RES (Cable / Pipe Laying)",
    "employer": "Power & Utility Infrastructure Contractors Pte Ltd",
    "category": "Construction & Civil",
    "location": "Islandwide Cable / Pipe Laying & Road Reinstatement Works, Singapore",
    "salary": "SGD 1,300 - 1,600 / month (Fixed Pay)",
    "qualification": "BCA / SP Group Registered Earthworks Supervisor (RES) Certificate",
    "experience": "2+ Years Singapore RES Field Experience",
    "jobType": "Work Permit",
    "vacancyCount": 4,
    "description": "Cable / Pipe Laying & Road Reinstatement contractor requires certified Registered Earthworks Supervisors (RES). Must have valid RES cert and more than 2 years RES working experience in Singapore. Fixed monthly salary.",
    "responsibilities": [
      "Ensure all earthworks strictly adhere to SP PowerGrid, Singtel, and PUB underground service protection requirements",
      "Supervise trial trenching, pilot hole excavations, and non-destructive digging methods near live utility cables",
      "Submit mandatory notification of earthworks and attend pre-excavation site walkabouts with utility owners",
      "Monitor daily road reinstatement, backfilling compaction, and asphalt resurfacing to LTA specifications"
    ],
    "requirements": [
      "Must have RES cert (Registered Earthworks Supervisor)",
      "RES working experience in Singapore for more than 2 years",
      "Experience in cable / pipe laying and road reinstatement works",
      "Responsible and able to manage excavation crews independently"
    ],
    "benefits": [
      "Fixed salary: SGD 1,300 - 1,600 / month",
      "No fixed timing, fixed pay, no more OT claim",
      "Stable long-term employment with established government utility contractor",
      "MOM medical insurance, annual leave, and corporate safety equipment"
    ],
    "requiredDocuments": [
      "Valid Registered Earthworks Supervisor (RES) Certificate Copy",
      "Cable Detection Worker (CDW) cert (if any)",
      "Passport Copy (Color Scan)",
      "Resume with list of completed Singapore cable/pipe laying projects"
    ],
    "image": "https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=800&q=80",
    "status": "published",
    "featured": true,
    "latest": true,
    "postedDate": "2026-09-23",
    "deadline": "2026-11-30",
    "createdAt": "2026-09-23T04:16:32.885Z",
    "updatedAt": "2026-09-23T04:16:32.885Z"
  },
  {
    "id": "SG-JOB-211",
    "title": "BMS Supervisor (Building Management System)",
    "employer": "Smart Integrated Building Technologies Pte Ltd",
    "category": "Electrical & Maintenance",
    "location": "Commercial Towers & Data Centers, Singapore",
    "salary": "SGD 1,000 - 1,400 / month + OT 1.5x",
    "qualification": "Diploma / ITI in Electrical / Electronics / Instrumentation Engineering",
    "experience": "2+ Years Singapore BMS Supervising Experience",
    "jobType": "Work Permit",
    "vacancyCount": 4,
    "description": "Leading building automation contractor requires BMS Supervisors. Must have Singapore experience in BMS supervising. Age below 38.",
    "responsibilities": [
      "Supervise installation, cabling, termination, and commissioning of BMS controllers, DDC panels, sensors, and actuators",
      "Monitor HVAC chiller plant optimization, AHU variable speed drives, and energy management software",
      "Troubleshoot field bus communication networks (BACnet, Modbus, LonWorks)",
      "Coordinate site testing with M&E main contractors and lead field technicians during scheduled maintenance"
    ],
    "requirements": [
      "Must have Singapore experience in BMS supervising",
      "Age below 38",
      "Diploma or ITI in Electrical, Instrumentation, or Electronics Engineering",
      "Strong diagnostic skills in BMS wiring and controls"
    ],
    "benefits": [
      "Salary: SGD 1,000 - 1,400 per month (depends on experience)",
      "Overtime paid at 1.5x hourly rate",
      "Air-conditioned commercial building and data center environment",
      "Medical insurance, annual leave, and career advancement in smart building automation"
    ],
    "requiredDocuments": [
      "Diploma / Technical Certificates in Electrical / Instrumentation",
      "Passport Copy (Front & Back)",
      "Updated Resume highlighting BMS platforms handled",
      "Previous Singapore employment records"
    ],
    "image": "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80",
    "status": "published",
    "featured": false,
    "latest": true,
    "postedDate": "2026-09-23",
    "deadline": "2026-11-30",
    "createdAt": "2026-09-23T04:16:32.885Z",
    "updatedAt": "2026-09-23T04:16:32.885Z"
  },
  {
    "id": "SG-JOB-212",
    "title": "Mechanical Supervisor (Aircon & Mechanical Ventilation)",
    "employer": "Arctic Mechanical Engineering & ACMV Services Pte Ltd",
    "category": "Automotive & Mechanical",
    "location": "Industrial Facilities & Commercial Complexes, Singapore",
    "salary": "SGD 1,300 - 1,800 / month (Fixed Pay)",
    "qualification": "Diploma or Bachelor Degree in Mechanical Engineering",
    "experience": "2+ Years in ACMV & Mechanical Fan Maintenance",
    "jobType": "Work Permit",
    "vacancyCount": 4,
    "description": "Mechanical Supervisor requirement - Indian candidates only as per quota. Good in aircon and mechanical fan maintenance, good in paperwork. Need diploma or degree in mechanical engineering.",
    "responsibilities": [
      "Supervise maintenance, overhaul, and repairs of commercial air-conditioning, AHUs, FCUs, and mechanical ventilation fans",
      "Plan routine maintenance schedules, filter replacements, motor bearing greasing, and belt alignments",
      "Prepare professional maintenance reports, equipment service logs, and client paperwork",
      "Lead teams of technicians and ensure prompt resolution of mechanical equipment breakdowns"
    ],
    "requirements": [
      "Indian candidates only (MOM quota criteria)",
      "Good in aircon and mechanical fan maintenance",
      "Good in paperwork and technical documentation",
      "Need Diploma or Degree in Mechanical Engineering",
      "Strong communication and reporting skills"
    ],
    "benefits": [
      "Fixed pay: SGD 1,300 - 1,800 / month (fixed pay, no more OT claim)",
      "Established engineering company with reliable monthly salary disbursement",
      "Annual leave, public holiday entitlements, and company medical insurance",
      "Uniform, safety boots, and tools provided"
    ],
    "requiredDocuments": [
      "Degree or Diploma in Mechanical Engineering Certificate & Transcripts",
      "Passport Copy (Minimum 2 years validity)",
      "Updated Resume with detailed list of ACMV and fan maintenance projects",
      "Previous experience and relieving letters"
    ],
    "image": "https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=800&q=80",
    "status": "published",
    "featured": true,
    "latest": true,
    "postedDate": "2026-09-23",
    "deadline": "2026-11-30",
    "createdAt": "2026-09-23T04:16:32.885Z",
    "updatedAt": "2026-09-23T04:16:32.885Z"
  },
  {
    "id": "SG-JOB-213",
    "title": "Site Supervisor (Civil / Piling Engineering)",
    "employer": "Foundation Geotechnics & Civil Engineering Pte Ltd",
    "category": "Construction & Civil",
    "location": "Islandwide Civil & Bored Piling Project Sites, Singapore",
    "salary": "Basic SGD 520 + Allowance SGD 200 - 400 + Daily OT (Total $1,500+)",
    "qualification": "Diploma in Civil Engineering / Construction Supervisor Certification",
    "experience": "2+ Years in Civil Infrastructure / Bored Piling / RC Works",
    "jobType": "Work Permit",
    "vacancyCount": 5,
    "description": "Site Supervisor requirement with experience in Civil / Piling engineering. Basic $520 + Allowance $200 - $400 (depends on experience, negotiable). OT 1.5x, everyday OT have. Total after OT will be more than $1,500+.",
    "responsibilities": [
      "Supervise piling rig positioning, rebar cage lowering, tremie concrete pouring, and pile head hacking",
      "Ensure rebar fabrication, formwork alignment, and concrete cube sampling comply with BCA standards",
      "Monitor daily site manpower deployment, machinery productivity, and subcontractor progress",
      "Coordinate site deliveries and enforce workplace environmental safety regulations"
    ],
    "requirements": [
      "Experience in Civil / Piling engineering",
      "Understanding of structural drawings, reinforcement schedules, and level surveying",
      "Hardworking and able to supervise construction teams outdoors",
      "Willing to commit to daily overtime"
    ],
    "benefits": [
      "Basic $520 + Allowance $200 - $400 (depends on experience, negotiable)",
      "Overtime paid at 1.5x — Every day OT have!",
      "Total earnings after OT will be more than SGD 1,500+",
      "Accommodation assistance, medical insurance, and MOM compliance benefits"
    ],
    "requiredDocuments": [
      "Diploma or Technical Qualification in Civil Engineering",
      "Building Construction Supervisors Safety Course (BCSS) cert",
      "Passport Copy (Color Scan)",
      "Resume with piling and civil project history"
    ],
    "image": "https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=800&q=80",
    "status": "published",
    "featured": false,
    "latest": true,
    "postedDate": "2026-09-23",
    "deadline": "2026-11-30",
    "createdAt": "2026-09-23T04:16:32.885Z",
    "updatedAt": "2026-09-23T04:16:32.885Z"
  },
  {
    "id": "SG-JOB-214",
    "title": "Plumbing Supervisor / Foreman (P&S / M&E Maincon)",
    "employer": "Hydro-Tech Mechanical & Plumbing Engineering Pte Ltd",
    "category": "Construction & Civil",
    "location": "Commercial & Residential M&E Sites, Singapore",
    "salary": "SGD 30 - 40 / day + OT (Daily 1.5x Overtime)",
    "qualification": "Certificate / Diploma in Plumbing & Sanitary / Mechanical Engineering",
    "experience": "3+ Years Singapore Plumbing & Sanitary Supervising Experience",
    "jobType": "Work Permit",
    "vacancyCount": 5,
    "description": "P&S, M&E maincon requires Plumbing Supervisor / Foreman with relevant plumbing and sanitary supervising experience in Singapore. Salary $30-$40/day (depends on experience). OT 1.5x, everyday OT have.",
    "responsibilities": [
      "Supervise installation of domestic water supply pipes (copper, stainless steel, PPR) and sanitary discharge stacks (UPVC, cast iron)",
      "Conduct hydraulic pressure tests, gravity drainage smoke tests, and leakage inspections",
      "Read M&E schematic drawings and coordinate pipe routing with HVAC ducting and electrical cable trays",
      "Lead plumbers and pipefitters on daily site assignments and ensure quality workmanship"
    ],
    "requirements": [
      "Relevant plumbing and sanitary supervising experience in Singapore",
      "P&S, M&E maincon background preferred",
      "Able to read plumbing drawings and coordinate site installations",
      "Ready to work daily overtime"
    ],
    "benefits": [
      "Daily Wage: SGD 30 - 40 per day (depends on experience)",
      "Overtime paid at 1.5x — Every day OT have!",
      "Total monthly earnings approximately SGD 1,600 - $2,200+ with OT",
      "Work injury insurance, medical hospitalization, and safety equipment provided"
    ],
    "requiredDocuments": [
      "Plumbing trade certificates or BCA skill evaluation records",
      "Singapore BCSS or relevant safety credentials",
      "Passport Copy (Front & Back)",
      "Resume with completed P&S project track record"
    ],
    "image": "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80",
    "status": "published",
    "featured": false,
    "latest": true,
    "postedDate": "2026-09-23",
    "deadline": "2026-11-30",
    "createdAt": "2026-09-23T04:16:32.885Z",
    "updatedAt": "2026-09-23T04:16:32.885Z"
  },
  {
    "id": "SG-JOB-215",
    "title": "Lifting Supervisor (Construction / M&E)",
    "employer": "United Heavy Lift & Construction Services Pte Ltd",
    "category": "Construction & Civil",
    "location": "Central & North Construction Projects, Singapore",
    "salary": "SGD 28 - 35 / day + OT (Daily 1.5x Overtime)",
    "qualification": "MOM Accredited Lifting Supervisor Safety Certificate",
    "experience": "2+ Years in Lifting Supervision",
    "jobType": "Work Permit",
    "vacancyCount": 6,
    "description": "Lifting Supervisor requirement. Must have lifting supervisor certificate, age below 40. Salary $28-$35/day (depends on experience). OT 1.5x, everyday OT have.",
    "responsibilities": [
      "Formulate lifting plans, verify load weights, check rigging tackle, and inspect crane safety limit switches",
      "Direct crane operators, riggers, and signalmen during heavy precast, structural steel, and equipment lifts",
      "Establish exclusion zones and barricade lifting areas to prevent unauthorized worker entry",
      "Comply strictly with MOM Workplace Safety and Health regulations for lifting operations"
    ],
    "requirements": [
      "Must with lifting supervisor cert",
      "Age below 40",
      "Minimum 2 years experience in lifting operations on Singapore sites",
      "Good eye for safety, alert, and capable of decisive action on site"
    ],
    "benefits": [
      "Daily Rate: SGD 28 - 35 / day (depends on experience)",
      "Overtime paid at 1.5x — Every day OT have!",
      "Monthly earnings SGD 1,500 - $1,900+ including overtime",
      "Standard MOM medical insurance, leave entitlements, and safety gear"
    ],
    "requiredDocuments": [
      "MOM Lifting Supervisor Certificate",
      "CoreTrade / SEC(K) or BCSS (if any)",
      "Passport Copy (Color Scan)",
      "Resume detailing lifting experience"
    ],
    "image": "https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=800&q=80",
    "status": "published",
    "featured": false,
    "latest": true,
    "postedDate": "2026-09-23",
    "deadline": "2026-11-30",
    "createdAt": "2026-09-23T04:16:32.885Z",
    "updatedAt": "2026-09-23T04:16:32.885Z"
  },
  {
    "id": "SG-JOB-216",
    "title": "Scaffold Supervisor (Shopping Mall & Commercial)",
    "employer": "Apex Access & Modular Scaffolding Specialists Pte Ltd",
    "category": "Construction & Civil",
    "location": "Shopping Malls & Commercial Complexes, Singapore",
    "salary": "SGD 32 - 38 / day + OT (OT 1.5x | Sun 2x, No Deductions)",
    "qualification": "MOM Certified Metal Scaffold Supervisor Certificate",
    "experience": "2+ Years in Modular & Tubular Scaffolding Supervision",
    "jobType": "Work Permit",
    "vacancyCount": 5,
    "description": "Scaffold Supervisor requirement. Perform scaffolding job mostly in shopping mall. Need to have scaffold supervisor cert. Salary: $32- $38/day (depends on experience). OT 1.5x | Sunday 2x, no deduction!",
    "responsibilities": [
      "Supervise erection, modification, and dismantling of modular system scaffolding and mobile tower scaffolds",
      "Inspect scaffolding structures and issue green \"Safe For Use\" inspection tags prior to handover",
      "Enforce personal fall arrest systems (harnesses, double lanyards, lifelines) during high-level mall ceiling works",
      "Coordinate work access with mall management and interior fit-out contractors"
    ],
    "requirements": [
      "Need to have scaffold supervisor cert",
      "Perform scaffolding job mostly in shopping mall",
      "Experience in commercial or shopping mall scaffolding works",
      "Good teamwork and leadership abilities"
    ],
    "benefits": [
      "Salary: SGD 32 - 38 / day (depends on experience)",
      "OT 1.5x on normal days | Sunday 2.0x!",
      "No salary deductions",
      "Mostly shopping mall indoor work environment"
    ],
    "requiredDocuments": [
      "Metal Scaffold Supervisor Certificate Copy",
      "Metal Scaffold Erector Certificate",
      "Passport Copy (Front & Back)",
      "Resume with previous commercial / shopping mall scaffolding works"
    ],
    "image": "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80",
    "status": "published",
    "featured": false,
    "latest": true,
    "postedDate": "2026-09-23",
    "deadline": "2026-11-30",
    "createdAt": "2026-09-23T04:16:32.885Z",
    "updatedAt": "2026-09-23T04:16:32.885Z"
  },
  {
    "id": "SG-JOB-217",
    "title": "Safety Supervisor (BCSS Certified - Construction)",
    "employer": "Singa-Build General Contractors & Developers Pte Ltd",
    "category": "Construction & Civil",
    "location": "Active Building Construction Projects, Singapore",
    "salary": "SGD 26 - 30 / day + OT (Daily 1.5x Overtime)",
    "qualification": "BCSS (Building Construction Supervisors Safety Course) Certificate",
    "experience": "2+ Years Safety Supervisor Experience in Singapore",
    "jobType": "Work Permit",
    "vacancyCount": 5,
    "description": "Safety Supervisor requirement. With BCSS and safety supervisor working experience for more than 2 years. Can do all safety related submissions, paperwork and understand site safety. Age below 35 only. Salary $26-$30/day. OT 1.5x, everyday OT have. Monthly deduction $20 for dorm utilities.",
    "responsibilities": [
      "Carry out daily safety inspections across structural, architectural, and external facade works",
      "Assist in safety related documentation, permit-to-work registers, safety inductions, and MOM submissions",
      "Conduct pre-work briefing sessions and identify hazardous conditions on site",
      "Ensure strict compliance with personal protective equipment (PPE) and housekeeping rules"
    ],
    "requirements": [
      "With BCSS and safety supervisor working experience for more than 2 yrs",
      "Can do all safety related submissions, paperwork and understand site safety",
      "Age below 35 only",
      "Strong commitment to site safety enforcement"
    ],
    "benefits": [
      "Salary: SGD 26 - 30 / day",
      "Overtime paid at 1.5x — Everyday OT have!",
      "Monthly deduction only $20 for dorm utilities",
      "Average monthly take-home with overtime: SGD 1,400 - $1,750+"
    ],
    "requiredDocuments": [
      "BCSS (Building Construction Supervisors Safety) Certificate",
      "Passport Copy (Minimum 18 months validity)",
      "Educational Credentials",
      "Resume detailing site safety roles held"
    ],
    "image": "https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=800&q=80",
    "status": "published",
    "featured": false,
    "latest": true,
    "postedDate": "2026-09-23",
    "deadline": "2026-11-30",
    "createdAt": "2026-09-23T04:16:32.885Z",
    "updatedAt": "2026-09-23T04:16:32.885Z"
  },
  {
    "id": "SG-JOB-218",
    "title": "Safety Coordinator (Level B - Maincon M&E, P&S)",
    "employer": "Mega-Tech MEP Main Contractor Pte Ltd",
    "category": "Construction & Civil",
    "location": "Major Integrated Commercial Developments, Singapore",
    "salary": "SGD 1,400 - 1,800 / month (Fixed Pay)",
    "qualification": "Advanced Certificate in WSH (Level B) taken on/before 2024",
    "experience": "2+ Years Singapore Coordinator Experience",
    "jobType": "Work Permit",
    "vacancyCount": 4,
    "description": "Safety Coordinator requirement for Maincon M&E, P&S Company. Must have Level B coordinator certificate. Singapore coordinator working experience for more than 2 years (cert taken on or before 2024). Fixed salary $1,400 - $1,800 (depends on working experience). No fixed working timing, fixed pay, no more OT claim.",
    "responsibilities": [
      "Manage workplace safety and health for extensive mechanical, electrical, and plumbing installations",
      "Oversee pipe pressure testing safety, electrical energization protocols, and plant room safety",
      "Coordinate site safety committees, conduct weekly safety audits, and update risk registers",
      "Liaise directly with client project safety managers, consultants, and statutory inspectors"
    ],
    "requirements": [
      "Maincon M&E, P&S Company",
      "Must have Level B coordinator certificate",
      "Singapore coordinator working experience for more than 2 yrs (cert taken on/before 2024)",
      "Proactive, organized, and confident in handling safety documentation independently"
    ],
    "benefits": [
      "Fixed salary: SGD 1,400 - 1,800 / month (depends on working experience)",
      "No fixed working timing, fixed pay, no more OT claim",
      "Excellent exposure to complex multi-million dollar MEP integrated projects",
      "Full company medical insurance, annual leave, and professional career development"
    ],
    "requiredDocuments": [
      "Level B WSH Certificate (Dated 2024 or earlier)",
      "Singapore BCSS or relevant M&E safety records",
      "Passport Copy (Color Scan)",
      "Resume with comprehensive M&E project history"
    ],
    "image": "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80",
    "status": "published",
    "featured": true,
    "latest": true,
    "postedDate": "2026-09-23",
    "deadline": "2026-11-30",
    "createdAt": "2026-09-23T04:16:32.885Z",
    "updatedAt": "2026-09-23T04:16:32.885Z"
  },
  {
    "id": "SG-JOB-219",
    "title": "Class 4 Driver for Food Delivery (NTS-WP)",
    "employer": "Pacific Fresh Logistics & Food Distribution Pte Ltd",
    "category": "Logistics & Warehouse",
    "location": "Pasir Panjang Wholesale Centre / Jurong, Singapore",
    "salary": "SGD 3,500 / month",
    "qualification": "Valid Singapore Class 4 Driving License",
    "experience": "2+ Years Heavy Vehicle Driving in Singapore",
    "jobType": "NTS Work Permit",
    "vacancyCount": 8,
    "description": "NTS-WP Class 4 Driver for Food Delivery. Salary: $3,500. No Accommodation. Working 12 hours per day. Monthly 2 OFF days.",
    "responsibilities": [
      "Drive Class 4 heavy vehicles on scheduled islandwide fresh food delivery routes",
      "Transport food supplies safely between wholesale hubs, central kitchens, and distribution points",
      "Perform loading and unloading of food delivery containers, crates, and pallets",
      "Ensure on-time deliveries and verify delivery receipts with receiving outlets"
    ],
    "requirements": [
      "NTS-WP quota eligibility",
      "Valid Singapore Class 4 Driving License with clean record",
      "Physically fit to handle food logistics operations",
      "Able to commit to 12 hours working schedule per day"
    ],
    "benefits": [
      "High monthly salary: SGD 3,500 per month",
      "Working 12 hours per day",
      "Monthly 2 scheduled OFF days",
      "Stable long-term employment in essential food delivery logistics"
    ],
    "requiredDocuments": [
      "Valid Singapore Class 4 Driving License copy",
      "Passport Copy (Minimum 2 years validity)",
      "Singapore Traffic Police driving record printout (if available)",
      "Updated Resume"
    ],
    "image": "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=800&q=80",
    "status": "published",
    "featured": true,
    "latest": true,
    "postedDate": "2026-09-23",
    "deadline": "2026-11-30",
    "createdAt": "2026-09-23T04:16:32.885Z",
    "updatedAt": "2026-09-23T04:16:32.885Z"
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

