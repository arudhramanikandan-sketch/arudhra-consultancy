import { CVTemplate, CVTemplateFilter } from '../types';

export const CV_TEMPLATE_FILTERS: CVTemplateFilter[] = [
  'All',
  'Fresher',
  'Experienced',
  'Hospitality',
  'Skilled Worker',
  'Engineering',
  'IT',
  'Healthcare',
  'Office / Professional'
];

export const CV_TEMPLATES: CVTemplate[] = [
  {
    id: 'basic-professional-cv',
    name: 'Basic Professional CV',
    tagline: 'Clean, ATS-compliant single column layout for immediate employer review.',
    badge: '100% ATS Compliant',
    suitableCategories: ['Office / Administration', 'Accounting / Finance', 'Sales / Marketing', 'Other'],
    suitableExperience: ['Fresher / No Experience', '1–2 Years', '3–5 Years', '5+ Years'],
    filterCategory: 'Office / Professional',
    layoutStyle: 'classic-ats',
    themeColor: 'stone',
    accentBg: 'bg-stone-900',
    borderTone: 'border-stone-300',
    atsFriendly: true,
    overseasSuitable: true,
    features: [
      'Universal ATS resume parser compliance',
      'Clear single-column typography & hairline dividers',
      'Chronological employment & skill categorization',
      'Suitable for corporate, banking & admin positions'
    ],
    dummyCandidate: {
      name: 'R. Rajesh Kumar',
      targetRole: 'Executive Assistant / Accounts Coordinator',
      location: 'Chennai, Tamil Nadu · Open to Overseas',
      contactInfo: '+91 98401 XXXXX · rajesh.kumar.sample@email.com',
      passportOrPass: 'Valid Passport (Exp 2032) · ECNR Status',
      summary:
        'Detail-oriented administrative and accounts professional with 3+ years experience supporting operations, vendor invoicing, document management, and client correspondence. Proficient in Tally ERP, MS Excel, and corporate communication.',
      skills: [
        'Tally ERP 9 / Prime',
        'Advanced MS Excel (VLOOKUP, Pivot)',
        'Vendor Invoicing & Reconciliation',
        'Office Documentation & Filing',
        'Client Communications',
        'Petty Cash Management'
      ],
      workExperience: [
        {
          title: 'Senior Operations & Accounts Assistant',
          company: 'Prestige Commercial Logistics Ltd',
          period: '2023 – Present',
          location: 'Chennai, India',
          points: [
            'Processed 250+ monthly vendor invoices and purchase orders with 99.8% reconciliation accuracy.',
            'Coordinated executive schedules, meeting minutes, and regulatory documentation.',
            'Prepared weekly cash flow reports and payroll summaries using Tally and Excel formulas.'
          ]
        },
        {
          title: 'Junior Administrative Officer',
          company: 'Delta Global Services',
          period: '2021 – 2023',
          location: 'Coimbatore, India',
          points: [
            'Handled inbound client queries, dispatch tracking, and statutory compliance documentation.',
            'Digitized physical archive records, improving record retrieval speed by 40%.'
          ]
        }
      ],
      education: [
        {
          degree: 'Bachelor of Commerce (B.Com)',
          institution: 'Madras University, Chennai',
          year: '2021 · First Class'
        }
      ],
      certifications: [
        'Certificate Course in Tally Prime & GST Filing (2022)',
        'Diploma in Computer Applications (DCA)'
      ],
      languages: ['English (Professional)', 'Tamil (Native)', 'Hindi (Conversational)']
    }
  },
  {
    id: 'modern-professional-cv',
    name: 'Modern Professional CV',
    tagline: 'Contemporary aesthetic with bold section header bars and infographic skill displays.',
    badge: 'Most Popular',
    suitableCategories: ['Sales / Marketing', 'Office / Administration', 'Accounting / Finance', 'Hospitality / Hotel'],
    suitableExperience: ['1–2 Years', '3–5 Years', '5+ Years'],
    filterCategory: 'Experienced',
    layoutStyle: 'modern-accent',
    themeColor: 'red',
    accentBg: 'bg-red-900',
    borderTone: 'border-red-200',
    atsFriendly: true,
    overseasSuitable: true,
    features: [
      'Bold crimson executive branding block',
      'Dual visual hierarchy with prominent KPI metrics',
      'Skill level indicators and capability highlights',
      'Preferred by corporate recruitment agencies'
    ],
    dummyCandidate: {
      name: 'K. Senthil Nathan',
      targetRole: 'Senior Business Development & Operations Executive',
      location: 'Madurai, Tamil Nadu · Ready for Singapore / Gulf Relocation',
      contactInfo: '+91 94432 XXXXX · senthil.bizdev.sample@email.com',
      passportOrPass: 'Valid Passport (Exp 2031) · Ready for immediate visa filing',
      summary:
        'Results-driven business executive with 5+ years track record in client acquisition, field sales, distributor management, and team leadership across retail and industrial supplies.',
      skills: [
        'B2B & B2C Sales Pipeline Management',
        'Key Account Relationship Management',
        'CRM Tools (Salesforce / Zoho)',
        'Contract Negotiation & Deal Closing',
        'Territory Expansion Strategy',
        'Team Mentorship & KPI Tracking'
      ],
      workExperience: [
        {
          title: 'Assistant Regional Sales Manager',
          company: 'Apex Industrial Solutions Pvt Ltd',
          period: '2022 – Present',
          location: 'Tamil Nadu & Kerala Region',
          points: [
            'Spearheaded 18-member field distribution team generating ₹4.2 Crore annual sales turnover.',
            'Expanded distributor network by 35 new commercial accounts across southern districts.',
            'Reduced payment collection lag by 22% through structured credit follow-up workflows.'
          ]
        },
        {
          title: 'Senior Field Sales Executive',
          company: 'Sun Packaging Systems',
          period: '2019 – 2022',
          location: 'Trichy, India',
          points: [
            'Consistently achieved 115%+ monthly target across industrial packaging supplies.',
            'Conducted live product demonstrations and corporate client presentations.'
          ]
        }
      ],
      education: [
        {
          degree: 'Master of Business Administration (Marketing & HR)',
          institution: 'Bharathidasan Institute of Management, Trichy',
          year: '2019'
        },
        {
          degree: 'B.Sc Computer Science',
          institution: 'St. Joseph’s College, Trichy',
          year: '2017'
        }
      ],
      certifications: [
        'Certified Sales Professional (CSP) – 2021',
        'HubSpot Inbound Sales & CRM Certified'
      ],
      languages: ['English (Fluent)', 'Tamil (Native)', 'Malayalam (Working Knowledge)']
    }
  },
  {
    id: 'fresher-cv',
    name: 'Fresher CV',
    tagline: 'Education-first structure tailored for new graduates and diploma holders entering the job market.',
    badge: 'Perfect for Fresh Graduates',
    suitableCategories: ['Mechanical Engineering', 'Electrical Engineering', 'Civil Engineering', 'Electronics / ECE', 'IT / Software', 'Office / Administration'],
    suitableExperience: ['Fresher / No Experience', '1–2 Years'],
    filterCategory: 'Fresher',
    layoutStyle: 'clean-minimal',
    themeColor: 'blue',
    accentBg: 'bg-blue-900',
    borderTone: 'border-blue-200',
    atsFriendly: true,
    overseasSuitable: true,
    features: [
      'Education and academic achievement prioritized at top',
      'Dedicated section for Final Year Capstone Project',
      'In-plant training & industrial internship highlights',
      'Fresh candidate profile emphasizing fast-learning agility'
    ],
    dummyCandidate: {
      name: 'V. Anandhakrishnan',
      targetRole: 'Graduate Trainee Engineer / Junior CAD Designer',
      location: 'Salem, Tamil Nadu · Open to Domestic & Singapore Trainee Roles',
      contactInfo: '+91 97890 XXXXX · anandhakrishnan.sample@email.com',
      passportOrPass: 'Passport: Active (ECNR) · No Police Record',
      summary:
        'Enthusiastic and motivated Diploma in Mechanical Engineering graduate with strong foundational knowledge in AutoCAD, SolidWorks, manufacturing processes, and quality inspection. Eager to contribute disciplined effort and quick technical learning to industrial engineering teams.',
      skills: [
        'AutoCAD 2D Drafting (Mechanical)',
        'SolidWorks 3D Modeling Basics',
        'Vernier Caliper & Micrometer Inspection',
        'Engineering Drawing Interpretation',
        'Workshop Safety & 5S Principles',
        'MS Word & Excel Documentation'
      ],
      workExperience: [
        {
          title: 'Graduate Mechanical Intern (3 Months)',
          company: 'LMW Machinery Works Ltd',
          period: 'Jan 2024 – Apr 2024',
          location: 'Coimbatore, India',
          points: [
            'Assisted quality control team in dimensional inspection of machined gears and shafts.',
            'Learned operation of CNC lathe stations and observed preventative maintenance protocols.',
            'Prepared daily batch inspection sheets adhering to ISO 9001:2015 quality standards.'
          ]
        }
      ],
      education: [
        {
          degree: 'Diploma in Mechanical Engineering (DME)',
          institution: 'Government Polytechnic College, Salem',
          year: '2024 · Aggregate 84.5% (Distinction)'
        },
        {
          degree: 'Secondary School Leaving Certificate (SSLC)',
          institution: 'Govt Higher Secondary School, Salem',
          year: '2021 · 88%'
        }
      ],
      certifications: [
        'AutoCAD Certified Professional (AutoDesk Authorized Center, 2024)',
        'Workshop Safety & Fire Hazard Training Certification'
      ],
      languages: ['English (Good Working)', 'Tamil (Native)']
    }
  },
  {
    id: 'experienced-professional-cv',
    name: 'Experienced Professional CV',
    tagline: 'Comprehensive multi-year career timeline emphasizing leadership, KPIs, and operational mastery.',
    badge: 'Senior & Executive Level',
    suitableCategories: ['Mechanical Engineering', 'Civil Engineering', 'Office / Administration', 'Sales / Marketing', 'Accounting / Finance'],
    suitableExperience: ['3–5 Years', '5+ Years'],
    filterCategory: 'Experienced',
    layoutStyle: 'executive-split',
    themeColor: 'amber',
    accentBg: 'bg-amber-900',
    borderTone: 'border-amber-300',
    atsFriendly: true,
    overseasSuitable: true,
    features: [
      'Executive summary emphasizing multi-year accomplishments',
      'Structured career progression with project milestones',
      'Budget oversight, team supervision & audit metrics',
      'Designed for Managers, Senior Technicians & Department Leads'
    ],
    dummyCandidate: {
      name: 'M. Sridhar Balaji',
      targetRole: 'Project Operations Manager / Senior Site Coordinator',
      location: 'Trichy, Tamil Nadu · Ex-Gulf Experience · Valid Passport',
      contactInfo: '+91 94861 XXXXX · sridhar.operations.sample@email.com',
      passportOrPass: 'Passport: Active (Exp 2030) · Ex-Dubai UAE Resident Visa Holder',
      summary:
        'Seasoned engineering operations manager with 8+ years of cross-border experience in plant maintenance, HVAC turnkey installations, and multi-disciplinary site coordination. Successfully managed multi-million dollar commercial projects with strict adherence to safety and budget targets.',
      skills: [
        'Cross-Functional Project Management (EPC)',
        'Vendor & Subcontractor Procurement',
        'OSHA / Singapore WSH Site Safety Compliance',
        'Budgetary Forecasting & Cost Control',
        'Preventive Maintenance Scheduling (CMMS)',
        'Client Stakeholder Presentations'
      ],
      workExperience: [
        {
          title: 'Senior Project Site Coordinator',
          company: 'Al-Futtaim Engineering & Technologies LLC',
          period: '2020 – 2024',
          location: 'Dubai, United Arab Emirates',
          points: [
            'Managed MEP installations for commercial high-rise projects valued at AED 14M.',
            'Supervised a multinational workforce of 45 technicians, welders, and subcontractors.',
            'Zero reportable lost-time incidents (LTI) over 28 consecutive project months.'
          ]
        },
        {
          title: 'Operations Engineer',
          company: 'Larsen & Toubro Construction',
          period: '2016 – 2020',
          location: 'Chennai & Bengaluru Sites',
          points: [
            'Coordinated equipment installation schedules and conducted daily toolbox meetings.',
            'Optimized spare parts inventory turnover, cutting maintenance downtime by 18%.'
          ]
        }
      ],
      education: [
        {
          degree: 'B.E. Mechanical Engineering',
          institution: 'Anna University, Guindy Campus, Chennai',
          year: '2016 · First Class'
        }
      ],
      certifications: [
        'Project Management Professional (PMP) Training',
        'NEBOSH International General Certificate (IGC) in Occupational Safety',
        'Singapore BCSS / CSOC equivalent Safety Coordinator'
      ],
      languages: ['English (Fluent)', 'Tamil (Native)', 'Hindi (Fluent)', 'Arabic (Basic)']
    }
  },
  {
    id: 'hospitality-hotel-chef-cv',
    name: 'Hospitality / Hotel / Chef CV',
    tagline: 'Specialized for culinary chefs, parotta masters, captains, stewards, and hotel managers.',
    badge: 'Singapore F&B & Gulf Ready',
    suitableCategories: ['Hospitality / Hotel', 'Chef / Cook / Parotta Master', 'Housekeeping', 'Waiter / Restaurant Staff'],
    suitableExperience: ['Fresher / No Experience', '1–2 Years', '3–5 Years', '5+ Years'],
    filterCategory: 'Hospitality',
    layoutStyle: 'modern-accent',
    themeColor: 'orange',
    accentBg: 'bg-orange-950',
    borderTone: 'border-orange-300',
    atsFriendly: true,
    overseasSuitable: true,
    features: [
      'Specialized cuisines & dish capability section (South/North Indian, Tandoor, Chinese)',
      'HACCP, Food Safety & Hygiene certification prominence',
      'High-volume banquet & fast-paced kitchen speed metrics',
      'Tailored for Singapore S Pass & Work Permit restaurant hiring'
    ],
    dummyCandidate: {
      name: 'P. Murugesan (Master Chef)',
      targetRole: 'Senior South Indian Chef & Parotta Specialist',
      location: 'Madurai, Tamil Nadu · Willing to relocate to Singapore / Malaysia',
      contactInfo: '+91 93601 XXXXX · murugesan.chef.sample@email.com',
      passportOrPass: 'Passport: Ready (Valid till 2033) · Non-Smoker · Clean Medical',
      summary:
        'Skilled Culinary Chef with 7+ years of authentic South Indian, Chettinad, and Tandoori cuisine experience. Specialized in high-speed, soft layered Malabar & Madurai Bun Parotta making, bulk biryani preparation, and traditional curries for 500+ covers daily.',
      skills: [
        'Authentic Malabar & Bun Parotta Expertise (High Speed)',
        'Traditional Chettinad & Dum Biryani Preparation',
        'Tandoor (Naan, Roti, Kebabs) & Chinese Starters',
        'Kitchen Food Costing & Raw Material Management',
        'Food Hygiene, HACCP & Safe Storage Procedures',
        'High-Pressure Kitchen Team Coordination'
      ],
      workExperience: [
        {
          title: 'Head Parotta Master & South Indian Section Lead',
          company: 'Anjappar Chettinad Grand Restaurant',
          period: '2021 – Present',
          location: 'Chennai, India',
          points: [
            'Produced 800+ fluffy layered parottas and fresh breads daily during peak lunch/dinner rushes.',
            'Standardized spice blends and curry bases, maintaining consistent taste and reducing food waste by 15%.',
            'Trained 6 assistant cooks in kitchen sanitary standards and speed plating.'
          ]
        },
        {
          title: 'Continental & Indian Line Cook',
          company: 'Hotel GRT Regency Grand',
          period: '2017 – 2021',
          location: 'Madurai, India',
          points: [
            'Handled live cooking counters for breakfast buffets and outdoor wedding banquets of up to 1,200 guests.',
            'Ensured 100% compliance with local food safety inspection norms.'
          ]
        }
      ],
      education: [
        {
          degree: 'Diploma in Food Production & Patisserie',
          institution: 'State Institute of Hotel Management & Catering, Trichy',
          year: '2017'
        },
        {
          degree: 'SSLC 10th Standard',
          institution: 'Govt High School, Madurai',
          year: '2015'
        }
      ],
      certifications: [
        'FSSAI Food Safety Supervisor Certification (Level 2)',
        'Basic Food Hygiene & Sanitation Certificate (MOM SFA Equivalent compliant)'
      ],
      languages: ['Tamil (Native)', 'English (Kitchen Communicative)', 'Malayalam (Conversational)']
    }
  },
  {
    id: 'driver-logistics-cv',
    name: 'Driver / Logistics CV',
    tagline: 'Built for Class 3, Class 4, Forklift, and Cold-Chain delivery professionals.',
    badge: 'Class 3 / Class 4 Driver Format',
    suitableCategories: ['Driver', 'Delivery / Logistics'],
    suitableExperience: ['1–2 Years', '3–5 Years', '5+ Years'],
    filterCategory: 'Skilled Worker',
    layoutStyle: 'compact-technical',
    themeColor: 'emerald',
    accentBg: 'bg-emerald-950',
    borderTone: 'border-emerald-300',
    atsFriendly: true,
    overseasSuitable: true,
    features: [
      'Prominent driving license badge (Indian Heavy / Singapore Class 3 & 4 conversion ready)',
      'Accident-free clean record track record declaration',
      'Cold-chain meat delivery, FMCG distribution & route optimization skills',
      'Vehicle preventive maintenance and loading/unloading capabilities'
    ],
    dummyCandidate: {
      name: 'S. Thirunavukkarasu',
      targetRole: 'Heavy Commercial Vehicle Driver / Delivery Specialist (Class 3/4)',
      location: 'Namakkal, Tamil Nadu · Ex-Singapore Experience · Clean License',
      contactInfo: '+91 96291 XXXXX · thiru.driver.sample@email.com',
      passportOrPass: 'Passport: Active (Exp 2032) · Indian Heavy Transport License (Valid 2028)',
      summary:
        'Reliable, safety-certified commercial transport driver with 6+ years driving heavy trucks, refrigerated food transport containers, and delivery vans. Impeccable zero-accident driving history, experienced with midnight routes, cold storage (raw poultry & FMCG), and vehicle routine checks.',
      skills: [
        'Heavy Vehicle Driving (6-Wheel / 10-Wheel Trucks)',
        'Indian Heavy Commercial Transport (Trans) License',
        'Refrigerated Cold Chain Delivery (12°C – 15°C Environments)',
        'GPS Navigation & Multi-Drop Route Scheduling',
        'Safe Cargo Loading & 25kg+ Regular Weight Handling',
        'Basic Engine, Oil & Tyre Preventive Maintenance'
      ],
      workExperience: [
        {
          title: 'Commercial Delivery Truck Driver (Cold Supply Chain)',
          company: 'Shanti Poultry & Frozen Foods Supply Ltd',
          period: '2021 – 2024',
          location: 'Coimbatore – Bangalore Route',
          points: [
            'Operated 14-ton refrigerated container trucks delivering perishable poultry supplies to 20+ distribution hubs daily.',
            'Maintained strict 4:00 AM dispatch schedules with 99.4% on-time delivery record.',
            'Zero traffic violations and zero accident claims throughout entire 3-year tenure.'
          ]
        },
        {
          title: 'Multi-Utility Transport Driver',
          company: 'Namakkal Bulk Transport Agency',
          period: '2018 – 2021',
          location: 'Tamil Nadu & Karnataka State Routes',
          points: [
            'Managed inter-city cargo hauls, conducted pre-trip brake and tyre inspections, and logged delivery manifest slips.'
          ]
        }
      ],
      education: [
        {
          degree: 'HSC (+2) Higher Secondary Education',
          institution: 'Govt Boys Higher Secondary School, Namakkal',
          year: '2017'
        }
      ],
      certifications: [
        'Commercial Heavy Transport Badge License #TN-28-2018-XXXX',
        'Defensive Driving & Highway Road Safety Certification',
        'Forklift Operator Basics Awareness Certificate'
      ],
      languages: ['Tamil (Native)', 'English (Basic Road & Delivery Terms)', 'Kannada (Working)']
    }
  },
  {
    id: 'technician-skilled-worker-cv',
    name: 'Technician / Skilled Worker CV',
    tagline: 'Customized for CoreTrade holders, CNC operators, welders, electricians, and mechanics.',
    badge: 'Singapore Work Permit & CoreTrade',
    suitableCategories: ['Technician / Mechanic', 'Welder', 'Electrician', 'Plumber', 'Construction'],
    suitableExperience: ['1–2 Years', '3–5 Years', '5+ Years'],
    filterCategory: 'Skilled Worker',
    layoutStyle: 'compact-technical',
    themeColor: 'cyan',
    accentBg: 'bg-cyan-950',
    borderTone: 'border-cyan-300',
    atsFriendly: true,
    overseasSuitable: true,
    features: [
      'Highlighted Technical Trade Licenses (CoreTrade, SEC(K), 3G/4G/6G Welding)',
      'Machinery & tools handled (FANUC, Mitsubishi CNC, Excavator, Forklift, Hook Lift)',
      'Singapore MOM work permit, PCM, NTS compliance structure',
      'Safety certifications (CSOC / BCSS / Work-At-Height)'
    ],
    dummyCandidate: {
      name: 'G. Karthikeyan',
      targetRole: 'CNC Lathe & Milling Operator / Tooling Technician',
      location: 'Coimbatore, Tamil Nadu · Ex-Singapore 1-Year U-Turn Eligible',
      contactInfo: '+91 95001 XXXXX · karthik.cnc.sample@email.com',
      passportOrPass: 'Passport: Active (Exp 2031) · CoreTrade Certified · Under 40 Years Old',
      summary:
        'Certified CNC Machinist and Toolmaker with 5+ years expertise programming, setting, and operating CNC Lathes, Vertical Milling Centers (VMC), and Manual Lathes using FANUC and Mitsubishi controllers. Skilled in reading complex geometric engineering drawings with tight tolerances (+/- 0.005mm).',
      skills: [
        'FANUC & Mitsubishi CNC Controller Programming',
        'Manual Lathe Turning & Milling Operations',
        'Precision Measurement: Vernier, Micrometer, Bore Gauge',
        'G-Code & M-Code Editing & Tool Offset Calibration',
        'Surface Grinding & Deburring Finished Components',
        'Machinery Maintenance & Hydraulic System Checks'
      ],
      workExperience: [
        {
          title: 'CNC Lathe & VMC Machine Operator',
          company: 'Precision Hi-Tech Components Singapore Pte Ltd',
          period: '2022 – 2024',
          location: 'Woodlands Industrial Park, Singapore',
          points: [
            'Operated twin-spindle CNC lathes with FANUC 0i-TD controllers for aerospace and oil & gas valve components.',
            'Achieved 0.005mm tolerance accuracy on titanium and stainless steel (SS316) parts.',
            'Conducted tool wear monitoring, insert changeovers, and completed First Article Inspection (FAI) reports.'
          ]
        },
        {
          title: 'Machinist / Tool & Die Technician',
          company: 'Apex Precision Engineering Works',
          period: '2019 – 2022',
          location: 'Coimbatore, India',
          points: [
            'Set up manual milling and radial drilling stations for automotive casting fixtures.',
            'Maintained 99.2% zero-defect production run across 10,000+ unit batches.'
          ]
        }
      ],
      education: [
        {
          degree: 'ITI Machinist (2 Years Full-Time Trade)',
          institution: 'Government Industrial Training Institute (ITI), Coimbatore',
          year: '2019 · NCVT Certified (86%)'
        }
      ],
      certifications: [
        'Singapore CoreTrade Machinist / Tradesman Registration',
        'Building Construction Supervisors Safety Course (BCSS / CSOC)',
        'Forklift Driving License (Singapore MOM Approved)'
      ],
      languages: ['English (Good Singapore Workplace English)', 'Tamil (Native)']
    }
  },
  {
    id: 'engineering-cv',
    name: 'Engineering CV',
    tagline: 'Technical documentation format for Mechanical, Civil, Electrical, and ECE Engineers.',
    badge: 'Singapore S Pass & Overseas Standard',
    suitableCategories: ['Mechanical Engineering', 'Civil Engineering', 'Electrical Engineering', 'Electronics / ECE'],
    suitableExperience: ['1–2 Years', '3–5 Years', '5+ Years'],
    filterCategory: 'Engineering',
    layoutStyle: 'executive-split',
    themeColor: 'indigo',
    accentBg: 'bg-indigo-950',
    borderTone: 'border-indigo-300',
    atsFriendly: true,
    overseasSuitable: true,
    features: [
      'CAD/BIM/Revit & Engineering software portfolio section',
      'Site execution, QA/QC documentation, and MOM S Pass salary eligibility alignment',
      'Structural / MEP calculation & code compliance highlights',
      'Formal academic credentials & university transcript summary'
    ],
    dummyCandidate: {
      name: 'Er. D. Vigneshwaran, B.E.',
      targetRole: 'Civil Site Engineer / M&E Building Project Coordinator',
      location: 'Tirunelveli, Tamil Nadu · Eligible for Singapore S Pass ($2000–$2500)',
      contactInfo: '+91 94420 XXXXX · vignesh.civil.sample@email.com',
      passportOrPass: 'Passport: Active (Exp 2033) · Degree Recognized by MOM Singapore',
      summary:
        'Civil and M&E Site Engineer with 4+ years of hands-on site coordination experience in commercial building construction, RC structural works, MEP coordination, and contractor supervision. Experienced with AutoCAD drafting, structural bar bending schedules (BBS), and daily site progress reporting.',
      skills: [
        'Civil Structural Construction & Site Supervision',
        'AutoCAD 2024 & Revit Architecture Basics',
        'M&E Conduit, Plumbing & Fire Protection Coordination',
        'Bar Bending Schedule (BBS) & Quantity Estimation',
        'Total Station & Level Instrument Surveying',
        'MOM Workplace Safety & Health (WSH) Protocols'
      ],
      workExperience: [
        {
          title: 'Resident Civil Site Engineer',
          company: 'TrueValue Infrastructure & Developers Ltd',
          period: '2022 – Present',
          location: 'Chennai & Madurai Projects',
          points: [
            'Supervised construction of 4-storey commercial office complex and basement car park (Built-up 65,000 sq.ft).',
            'Checked reinforcement, formwork, and concrete slump test cubes prior to 12 major slab casting sessions.',
            'Coordinated with M&E subcontractors to prevent pipe clash and electrical conduit rerouting.'
          ]
        },
        {
          title: 'Junior Site Engineer',
          company: 'Sunrise Civil Foundations',
          period: '2020 – 2022',
          location: 'Tirunelveli, India',
          points: [
            'Conducted daily site layout pegging using Total Station and Auto Level.',
            'Prepared daily labor utilization logs, material consumption records, and subcontractor bills.'
          ]
        }
      ],
      education: [
        {
          degree: 'Bachelor of Engineering in Civil Engineering (B.E. Civil)',
          institution: 'Government College of Engineering, Tirunelveli (Anna University)',
          year: '2020 · First Class with Distinction (CGPA: 8.6/10)'
        }
      ],
      certifications: [
        'AutoCAD Civil 2D/3D & Revit Structure (CADD Centre)',
        'Site Safety Supervisor Course & ISO 45001 Health & Safety Standard'
      ],
      languages: ['English (Fluent Professional)', 'Tamil (Native)']
    }
  },
  {
    id: 'it-software-cv',
    name: 'IT / Software CV',
    tagline: 'Modern tech format highlighting stack proficiencies, Git repositories, and cloud projects.',
    badge: 'Modern Tech Stack',
    suitableCategories: ['IT / Software', 'Electronics / ECE'],
    suitableExperience: ['Fresher / No Experience', '1–2 Years', '3–5 Years', '5+ Years'],
    filterCategory: 'IT',
    layoutStyle: 'modern-accent',
    themeColor: 'purple',
    accentBg: 'bg-purple-950',
    borderTone: 'border-purple-300',
    atsFriendly: true,
    overseasSuitable: true,
    features: [
      'Categorized tech stack tags: Frontend, Backend, Databases, Cloud & DevOps',
      'Live project GitHub & deployment link placeholders',
      'System design, API integration, and agile scrum participation',
      'Tech recruiter & automated applicant tracking system optimized'
    ],
    dummyCandidate: {
      name: 'A. Pravin Kumar',
      targetRole: 'Full Stack Web Developer (React / Node / TypeScript)',
      location: 'Bengaluru / Chennai, India · Remote & Overseas Hybrid Ready',
      contactInfo: '+91 99402 XXXXX · pravin.dev.sample@email.com · github.com/pravin-sample',
      passportOrPass: 'Passport: Active (Exp 2030) · B.Tech Information Technology',
      summary:
        'Software engineer with 3+ years experience building scalable web applications with React, TypeScript, Node.js, and PostgreSQL. Passionate about clean architecture, responsive UI/UX, REST API optimization, and CI/CD deployment pipelines.',
      skills: [
        'React.js 18, Next.js, Redux Toolkit, Tailwind CSS',
        'TypeScript, JavaScript (ES6+), HTML5/CSS3',
        'Node.js, Express.js, RESTful APIs, WebSockets',
        'PostgreSQL, MongoDB, Redis, Drizzle ORM',
        'Git, GitHub Actions, Docker basics, AWS EC2 / S3',
        'Jest Unit Testing, Postman API Testing'
      ],
      workExperience: [
        {
          title: 'Software Developer',
          company: 'CloudMatrix Technologies Pvt Ltd',
          period: '2023 – Present',
          location: 'Bengaluru, India',
          points: [
            'Architected client dashboard using React and Tailwind, improving web core vitals score from 68 to 94.',
            'Developed high-throughput Node.js microservices handling 40,000+ daily webhook events.',
            'Collaborated in 2-week Agile sprints with cross-functional product and QA teams.'
          ]
        },
        {
          title: 'Associate Frontend Developer',
          company: 'Innovatech Web Labs',
          period: '2021 – 2023',
          location: 'Chennai, India',
          points: [
            'Built 15+ mobile-responsive responsive client landing portals with seamless payment gateway checkouts.',
            'Reduced client-side bundle size by 32% via lazy loading and dynamic code-splitting.'
          ]
        }
      ],
      education: [
        {
          degree: 'B.Tech in Information Technology',
          institution: 'SSN College of Engineering, Chennai (Anna University)',
          year: '2021 · CGPA 8.7/10'
        }
      ],
      certifications: [
        'Meta Certified Frontend Developer (Coursera Professional)',
        'AWS Certified Cloud Practitioner (CLF-C02)'
      ],
      languages: ['English (Fluent)', 'Tamil (Native)']
    }
  },
  {
    id: 'healthcare-nursing-cv',
    name: 'Healthcare / Nursing CV',
    tagline: 'Structured for Registered Nurses, GNM, B.Sc Nursing, and hospital ward staff.',
    badge: 'SNB / Singapore & Gulf Exam Ready',
    suitableCategories: ['Healthcare / Nursing'],
    suitableExperience: ['Fresher / No Experience', '1–2 Years', '3–5 Years', '5+ Years'],
    filterCategory: 'Healthcare',
    layoutStyle: 'executive-split',
    themeColor: 'teal',
    accentBg: 'bg-teal-950',
    borderTone: 'border-teal-300',
    atsFriendly: true,
    overseasSuitable: true,
    features: [
      'Nursing registration council number & license verification format',
      'Clinical ward rotation breakdown (ICU, Post-Op, Pediatrics, Emergency)',
      'Basic Life Support (BLS) & Advanced Cardiac Life Support (ACLS) highlights',
      'Singapore Nursing Board (SNB) & Gulf Prometric exam compliance'
    ],
    dummyCandidate: {
      name: 'Nurse S. Josephine Mary, B.Sc (N)',
      targetRole: 'Registered Staff Nurse (ICU & Medical-Surgical Ward)',
      location: 'Kanyakumari, Tamil Nadu · SNB Exam Prepared · Valid Passport',
      contactInfo: '+91 94872 XXXXX · josephine.nurse.sample@email.com',
      passportOrPass: 'Passport: Active (Exp 2032) · Tamil Nadu Nurses Council Registered #129482',
      summary:
        'Compassionate, licensed Staff Nurse with 4+ years of inpatient hospital experience in Intensive Care Units (ICU) and general surgical wards. Proficient in IV cannulation, medication administration, ventilator monitoring, wound dressing, and rapid clinical patient assessments.',
      skills: [
        'Inpatient Critical Care & ICU Patient Monitoring',
        'Vital Signs, ECG Monitoring & Infusion Pumps',
        'IV Cannulation, Blood Sampling & Catheterization',
        'Infection Control Protocols & Bio-Medical Waste Disposal',
        'Doctor Assistance during Lumbar Puncture & Minor Surgeries',
        'Patient Charting & Electronic Medical Records (HIS)'
      ],
      workExperience: [
        {
          title: 'Senior Staff Nurse (ICU Ward)',
          company: 'Apollo Speciality Hospitals',
          period: '2022 – Present',
          location: 'Madurai, Tamil Nadu',
          points: [
            'Delivered dedicated 1:2 nurse-patient critical care in 24-bed Medical Intensive Care Unit.',
            'Administered emergency IV medications and assisted intubation procedures with zero medication errors.',
            'Conducted regular patient and family counseling regarding post-operative rehabilitation.'
          ]
        },
        {
          title: 'Staff Nurse (General Ward & OPD)',
          company: 'CSI Mission Hospital',
          period: '2020 – 2022',
          location: 'Nagercoil, India',
          points: [
            'Managed 30-bed surgical recovery ward, prepared shift handover logs, and monitored post-op vitals.'
          ]
        }
      ],
      education: [
        {
          degree: 'Bachelor of Science in Nursing (B.Sc Nursing - 4 Years)',
          institution: 'Christian College of Nursing, Kanyakumari (Dr. MGR Medical University)',
          year: '2020 · First Class (79.2%)'
        }
      ],
      certifications: [
        'Registered Nurse & Midwife (RN/RM) – Tamil Nadu Nurses and Midwives Council',
        'Basic Life Support (BLS) – American Heart Association (AHA) Valid 2026',
        'Advanced Cardiovascular Life Support (ACLS) – AHA Certified'
      ],
      languages: ['English (Fluent Medical Communication)', 'Tamil (Native)', 'Malayalam (Conversational)']
    }
  },
  {
    id: 'hospitality-hotel-cv',
    name: 'Hospitality / Hotel CV',
    tagline: 'Guest relations, front desk, housekeeping operations, banquet coordination, and F&B stewardship.',
    badge: 'Star Hotel & F&B Standard',
    suitableCategories: ['Hospitality / Hotel', 'Housekeeping', 'Waiter / Restaurant Staff'],
    suitableExperience: ['Fresher / No Experience', '1–2 Years', '3–5 Years', '5+ Years'],
    filterCategory: 'Hospitality',
    layoutStyle: 'modern-accent',
    themeColor: 'amber',
    accentBg: 'bg-amber-950',
    borderTone: 'border-amber-300',
    atsFriendly: true,
    overseasSuitable: true,
    features: [
      'Guest service excellence & customer satisfaction ratings',
      'Hotel PMS software (Opera / Fidelio) proficiency',
      'Housekeeping sanitation & banquet event management',
      'Singapore hotel & F&B service crew criteria compliant'
    ],
    dummyCandidate: {
      name: 'A. Jerome Anthony',
      targetRole: 'Hotel Front Office Supervisor / F&B Captain',
      location: 'Coimbatore, Tamil Nadu · Open to Singapore S Pass / Work Permit',
      contactInfo: '+91 97865 XXXXX · jerome.hospitality.sample@email.com',
      passportOrPass: 'Passport: Active (Exp 2033) · Hospitality Diploma · Clean Medical',
      summary:
        'Customer-focused Hospitality Professional with 4+ years of front office and dining room leadership in 4-star hotels. Adept at Opera PMS check-in/out, resolving guest escalations, banquet table setups, and team shift allocations.',
      skills: [
        'Front Office Operations & Opera PMS',
        'F&B Guest Service & Table Management',
        'Banquet & Corporate Event Coordination',
        'Housekeeping Quality Standards & Inspection',
        'Billing, POS Systems & Currency Exchange',
        'Multi-Lingual Professional Hospitality English'
      ],
      workExperience: [
        {
          title: 'Front Office Senior Associate',
          company: 'The Residency Towers Hotel',
          period: '2022 – Present',
          location: 'Coimbatore, India',
          points: [
            'Managed daily front desk arrival/departure for 135-room luxury business hotel with 94% guest satisfaction score.',
            'Handled VIP check-in routines, corporate billing reconciliations, and airport transport coordination.',
            'Trained 8 junior receptionists on concierge recommendations and service etiquette.'
          ]
        },
        {
          title: 'Food & Beverage Service Captain',
          company: 'Le Meridien Convention Centre',
          period: '2020 – 2022',
          location: 'Kochi, Kerala',
          points: [
            'Supervised 12 banquet service staff during high-profile weddings and international corporate summits.',
            'Ensured strict compliance with Food Safety & Hygiene regulations.'
          ]
        }
      ],
      education: [
        {
          degree: 'Diploma in Hotel Management & Catering Technology',
          institution: 'State Institute of Hotel Management, Trichy',
          year: '2020 · First Class (81%)'
        }
      ],
      certifications: [
        'Certified Hospitality Service Professional (CHSP)',
        'First Aid & Hotel Fire Evacuation Certification'
      ],
      languages: ['English (Fluent)', 'Tamil (Native)', 'Malayalam (Fluent)']
    }
  },
  {
    id: 'chef-cook-cv',
    name: 'Chef / Cook CV',
    tagline: 'Culinary arts, authentic Indian/continental cuisines, parotta craftsmanship, tandoor, and kitchen hygiene.',
    badge: 'Executive Chef & Master Cook',
    suitableCategories: ['Chef / Cook / Parotta Master', 'Hospitality / Hotel'],
    suitableExperience: ['1–2 Years', '3–5 Years', '5+ Years'],
    filterCategory: 'Hospitality',
    layoutStyle: 'modern-accent',
    themeColor: 'orange',
    accentBg: 'bg-orange-950',
    borderTone: 'border-orange-300',
    atsFriendly: true,
    overseasSuitable: true,
    features: [
      'High-speed Parotta making, South/North Indian & Tandoor mastery',
      'Food Safety, HACCP & Safe Storage Procedures',
      'Kitchen raw material cost control & wastage reduction',
      'Singapore restaurant work permit & S Pass compliance'
    ],
    dummyCandidate: {
      name: 'Chef M. Thangavel',
      targetRole: 'Executive South Indian & Parotta Master Chef',
      location: 'Virudhunagar, Tamil Nadu · Ready for Singapore Restaurant Placement',
      contactInfo: '+91 94892 XXXXX · thangavel.chef.sample@email.com',
      passportOrPass: 'Passport: Active (Exp 2034) · Food Handler Certificate (HACCP Level 2)',
      summary:
        'Dedicated Culinary Professional with 8+ years hands-on mastery in traditional Tamil Nadu, Malabar, Chettinad, and Tandoori cuisines. Renowned for soft-layered Madurai Bun Parotta, high-volume authentic dum biryani, and managing high-speed commercial restaurant kitchens.',
      skills: [
        'Authentic Bun & Malabar Parotta Making (250+ per hour)',
        'Dum Biryani (Seeraga Samba / Basmati) 100+ kg batches',
        'Tandoori Breads (Naan, Kulcha, Roti) & Kebabs',
        'Kitchen Inventory, Recipe Standardisation & Portion Control',
        'HACCP Food Safety & Kitchen Sanitation',
        'Kitchen Team Leadership (12 cooks & assistants)'
      ],
      workExperience: [
        {
          title: 'Master Chef & Kitchen In-Charge',
          company: 'Anjappar Authentic Chettinad Restaurant',
          period: '2021 – Present',
          location: 'Chennai, India',
          points: [
            'Directed the hot kitchen producing 600+ covers daily for dine-in, takeaway, and banquet catering.',
            'Maintained 100% adherence to regional spice recipes and freshness benchmarks.',
            'Trained 6 apprentice cooks in high-speed parotta kneading, flipping, and layered griddling.'
          ]
        },
        {
          title: 'Specialty Cook (Tandoor & Gravies)',
          company: 'Hotel Saravana Bhavan',
          period: '2017 – 2021',
          location: 'Madurai, India',
          points: [
            'Prepared traditional kurma, gravies, and tandoori items with zero customer quality complaints.',
            'Maintained spotless kitchen hygiene ratings during municipal food safety audits.'
          ]
        }
      ],
      education: [
        {
          degree: 'Secondary School Leaving Certificate (SSLC)',
          institution: 'Govt Higher Secondary School, Virudhunagar',
          year: '2016'
        },
        {
          degree: 'Craftsmanship Certificate in Indian Cookery',
          institution: 'Food Craft Institute, Thuvakkudi, Trichy',
          year: '2017'
        }
      ],
      certifications: [
        'FSSAI Food Safety Supervisor Certification',
        'HACCP Level 2 Food Hygiene Award'
      ],
      languages: ['English (Conversational Kitchen)', 'Tamil (Native)', 'Hindi (Basic)']
    }
  },
  {
    id: 'office-professional-cv',
    name: 'Office / Professional CV',
    tagline: 'Refined executive layout for Accounts, Finance, Human Resources, Administration, and Operations.',
    badge: 'Executive & Admin Standard',
    suitableCategories: ['Office / Administration', 'Accounting / Finance', 'Sales / Marketing'],
    suitableExperience: ['1–2 Years', '3–5 Years', '5+ Years'],
    filterCategory: 'Office / Professional',
    layoutStyle: 'executive-split',
    themeColor: 'stone',
    accentBg: 'bg-stone-950',
    borderTone: 'border-stone-300',
    atsFriendly: true,
    overseasSuitable: true,
    features: [
      'Professional corporate typography and high-density readability',
      'ERP systems (SAP / Tally Prime / Zoho) competency section',
      'Statutory compliance, payroll & document audit expertise',
      'Tailored for Singapore S Pass & regional office recruitment'
    ],
    dummyCandidate: {
      name: 'M. Kavitha Sundaram',
      targetRole: 'Senior Office Administrator / Accounts & HR Executive',
      location: 'Chennai, Tamil Nadu · Open to Overseas Relocation',
      contactInfo: '+91 98402 XXXXX · kavitha.admin.sample@email.com',
      passportOrPass: 'Valid Passport (Exp 2033) · ECNR Status · Clean Background',
      summary:
        'Systematic, resourceful Office Administrator and Accounts Specialist with 6+ years of experience streamlining administrative workflows, managing full-cycle payroll, filing GST returns on Tally Prime, and supervising office vendor contracts.',
      skills: [
        'Tally Prime & QuickBooks Accounting',
        'Statutory Compliance (EPF, ESI, GST & TDS Filing)',
        'Employee Onboarding & Attendance Management',
        'Advanced Excel (Pivots, XLOOKUP, Data Modeling)',
        'Vendor Contract Management & Procurement',
        'Corporate Correspondence & Executive Assistance'
      ],
      workExperience: [
        {
          title: 'Senior Office Administration & Accounts Officer',
          company: 'Sundaram Logistics & Trade International',
          period: '2021 – Present',
          location: 'Chennai, India',
          points: [
            'Administered monthly payroll processing for 85 employees with zero calculation discrepancies.',
            'Handled accounts payable/receivable reconciliations totaling ₹3.5 Crore annual turnover.',
            'Streamlined digital document storage, eliminating manual paper filing time by 45%.'
          ]
        },
        {
          title: 'Executive Assistant & Office Coordinator',
          company: 'Vanguard Industrial Automations',
          period: '2018 – 2021',
          location: 'Coimbatore, India',
          points: [
            'Coordinated board meeting itineraries, executive travel bookings, and internal client communications.',
            'Maintained petty cash accounts and negotiated 12% lower rates with utility vendors.'
          ]
        }
      ],
      education: [
        {
          degree: 'Bachelor of Commerce (B.Com) - Corporate Secretaryship',
          institution: 'Ethiraj College for Women, Chennai (Madras University)',
          year: '2018 · First Class (78%)'
        }
      ],
      certifications: [
        'Certified Tally Prime Professional',
        'Diploma in Human Resource Management (DHRM)'
      ],
      languages: ['English (Fluent Business)', 'Tamil (Native)', 'Hindi (Conversational)']
    }
  },
  {
    id: 'overseas-job-cv',
    name: 'Overseas Job CV',
    tagline: 'Engineered specifically for Singapore MOM Work Permit, S Pass, and Gulf international recruitment.',
    badge: 'Singapore MOM & Gulf Compliant',
    suitableCategories: [
      'Mechanical Engineering',
      'Electrical Engineering',
      'Civil Engineering',
      'Technician / Mechanic',
      'Welder',
      'Electrician',
      'Driver',
      'Construction',
      'Hospitality / Hotel',
      'Other'
    ],
    suitableExperience: ['1–2 Years', '3–5 Years', '5+ Years'],
    filterCategory: 'Experienced',
    layoutStyle: 'compact-technical',
    themeColor: 'red',
    accentBg: 'bg-red-950',
    borderTone: 'border-red-300',
    atsFriendly: true,
    overseasSuitable: true,
    features: [
      'MOM Singapore Work Permit / S Pass qualification checklist',
      'Passport number, expiry date, CoreTrade & safety pass alignment',
      'Singapore / Gulf experience duration breakdown prominently displayed',
      'International recruitment agency standard verification format'
    ],
    dummyCandidate: {
      name: 'K. Balasubramanian (Singapore Return)',
      targetRole: 'Mechanical Piping & Structural Supervisor / Lead Fitter',
      location: 'Tiruchirappalli, Tamil Nadu · Ex-Singapore (5 Years Sembcorp/Keppel)',
      contactInfo: '+91 94431 XXXXX · balasubramanian.overseas@email.com',
      passportOrPass: 'Passport: Active (Exp 2032) · FIN/Work Permit: Ex-Singapore · ECNR Status',
      summary:
        'Ex-Singapore Mechanical Piping Supervisor with 6+ years overseas experience in offshore marine shipyards, oil & gas process piping, and structural fabrication. Proven leader in supervising 30+ multinational fitters and welders under strict MOM Workplace Safety (WSH) standards.',
      skills: [
        'Piping Spool Fabrication & Isometric Drawing Reading',
        'ASME B31.3 Process Piping & Hydrostatic Pressure Testing',
        'Singapore MOM Workplace Safety (CSOC / BCSS Supervisor)',
        'Shipyard Marine Hull & Piping Erection (Keppel / Sembcorp)',
        'Structural Fit-Up, Tack Welding & Dimensional Quality Checks',
        'Multi-Lingual Workforce Communication (Tamil, English, Hindi, Malay)'
      ],
      workExperience: [
        {
          title: 'Mechanical Piping Supervisor',
          company: 'Sembcorp Marine Integrated Yard',
          period: '2020 – 2024',
          location: 'Tuas Boulevard Yard, Singapore',
          points: [
            'Supervised piping installation on FPSO offshore module conversion project adhering to ISO 9001 and MOM safety codes.',
            'Read complex P&ID drawings and coordinated pipe spool punch-list clearances with client inspectors.',
            'Maintained 1,200 consecutive work days with zero lost-time safety accidents.'
          ]
        },
        {
          title: 'Piping Fitter / Chargehand',
          company: 'Keppel FELS Shipyard',
          period: '2018 – 2020',
          location: 'Pioneer Sector, Singapore',
          points: [
            'Executed high-pressure hydraulic pipe fit-up, flange alignment, and cold bending.',
            'Conducted helium-nitrogen leak detection and hydrostatic pressure testing up to 350 bar.'
          ]
        },
        {
          title: 'Fabrication Technician',
          company: 'BHEL Ancillary Fabrication Units',
          period: '2016 – 2018',
          location: 'Trichy, India',
          points: [
            'Assembled heavy pressure vessel shells, boiler header connections, and structural support frames.'
          ]
        }
      ],
      education: [
        {
          degree: 'Diploma in Mechanical Engineering (DME - 3 Years)',
          institution: 'Seshasayee Institute of Technology, Trichy',
          year: '2016 · First Class (77%)'
        }
      ],
      certifications: [
        'Singapore CoreTrade Structural Steel Fitter / Piping Tradesman',
        'Building Construction Supervisors Safety Course (BCSS)',
        'Shipyard Safety Supervisors Course (SSSC) – Singapore Approved',
        'Work-At-Height (WAH) for Supervisors – Singapore MOM'
      ],
      languages: ['English (Fluent Singapore Workplace)', 'Tamil (Native)', 'Hindi (Fluent)', 'Malay (Conversational)']
    }
  }
];

export const getTemplateById = (id: string): CVTemplate | undefined => {
  // Support aliases for legacy template keys
  if (id === 'hospitality-hotel-chef-cv') {
    return CV_TEMPLATES.find(t => t.id === 'hospitality-hotel-cv') || CV_TEMPLATES.find(t => t.id === 'chef-cook-cv') || CV_TEMPLATES[0];
  }
  return CV_TEMPLATES.find(t => t.id === id) || CV_TEMPLATES[0];
};

export const getTemplatesByCategory = (category: string): CVTemplate[] => {
  return CV_TEMPLATES.filter(t => t.suitableCategories.some(c => c.toLowerCase() === category.toLowerCase()));
};
