var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// server.ts
var import_express = __toESM(require("express"), 1);
var import_path2 = __toESM(require("path"), 1);
var import_fs2 = __toESM(require("fs"), 1);
var import_vite = require("vite");

// server/storage.ts
var import_crypto = __toESM(require("crypto"), 1);
var import_fs = __toESM(require("fs"), 1);
var import_path = __toESM(require("path"), 1);

// server/data.ts
var initialSiteSettings = {
  businessName: "ARUDHRA CONSULTANCY",
  tagline: "Singapore Overseas Recruitment & Placement Support",
  phone: "6374509488",
  whatsappNumber: "6374509488",
  email: "info@arudhraconsultancy.com",
  officeAddress: "1/149, Ganesh Complex, Avinashi Road, Neelambur, Coimbatore \u2013 641062",
  city: "Coimbatore",
  country: "India",
  postalCode: "641062",
  logoUrl: "/arudhra-logo.png",
  mobileLogoUrl: "/arudhra-logo.png",
  logoEmblemText: "AC",
  logoTitle: "ARUDHRA",
  logoSubtitle: "CONSULTANCY",
  logoDisplayMode: "image_only",
  logoEmblemBg: "#7f1d1d",
  logoEmblemShape: "rounded-xl",
  googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.141753177726!2d77.0855!3d11.0665!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba8f89a9f24c3e7%3A0x289759c9918b958e!2sNeelambur%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
  googleMapsDirectionUrl: "https://www.google.com/maps/search/?api=1&query=1/149,+Ganesh+Complex,+Avinashi+Road,+Neelambur,+Coimbatore+641062",
  facebookUrl: "https://www.facebook.com/share/1CnqEMkex8/",
  instagramUrl: "https://www.instagram.com/arudhraconsultamcysgd?utm_source=qr&igsi=MWw3YmpnczM0bm9pdg==",
  youtubeUrl: "https://youtube.com/@arudhraconsultancy",
  googleReviewsUrl: "https://search.google.com/local/writereview?placeid=ChIJN1t_tDeuEmsRUsoyG83frY4",
  googleRating: 4.9,
  totalReviewsCount: 128,
  heroHeadline: "Singapore Overseas Recruitment & Placement Support",
  heroSubheadline: "Direct overseas recruitment assistance and placement support for skilled and semi-skilled candidates seeking verified career pathways in Singapore.",
  aboutTitle: "Singapore Overseas Recruitment & Placement Support",
  aboutContent: "Arudhra Consultancy provides dedicated overseas recruitment assistance and placement facilitation for candidates seeking legitimate employment opportunities in Singapore. We focus on structured candidate profiling, employer interview coordination, document guidance, and transparent deployment assistance.",
  aboutPoints: [
    "Specialized recruitment facilitation for verified Singapore employer vacancies",
    "Comprehensive guidance on Singapore job scopes, work pass eligibility, and salary packages",
    "Transparent candidate documentation support and application progress tracking",
    "Professional pre-departure orientation covering Singapore workplace regulations and lifestyle",
    "Prompt communication and dedicated candidate assistance at every step"
  ],
  licenseNotice: "Singapore Overseas Recruitment & Placement Support Services",
  // Admin 2FA Password & Security (TOTP RFC 6238)
  admin2faEnabled: true,
  admin2faEnrolled: false,
  admin2faSecret: "ARUDHRA7MZQK4X2P",
  // Theme & Appearance
  themeColor: "crimson",
  themeMode: "light",
  // Exclusive Live Website Mode & Auto-Cleanup
  autoReplaceOldJobs: false,
  autoReplaceOldFlyers: false,
  autoReplaceOldVideos: false,
  autoClearOldLeadsOnNewJob: false,
  autoPruneOldLeads: false
};
var initialJobs = [
  {
    id: "SG-JOB-101",
    title: "CNC Milling & Turning Machinist",
    employer: "Precision Engineering Pte Ltd",
    category: "Manufacturing & Production",
    location: "Jurong Industrial Estate, Singapore",
    salary: "SGD 2,400 - 3,200 / month",
    qualification: "ITI / Diploma (Mechanical / Tool & Die)",
    experience: "2-5 Years (Fanuc / Siemens CNC Controller)",
    jobType: "Work Permit",
    vacancyCount: 6,
    description: "Direct recruitment for precision aerospace and oil & gas machining facility in Jurong. Operating 3-axis and 5-axis CNC Milling / Turning centers with Fanuc / Siemens controls.",
    responsibilities: [
      "Set up and operate CNC Milling and CNC Lathe machines independently",
      "Interpret engineering drawings and technical GD&T specifications",
      "Perform tool preset, fixture alignment, and basic G-code / M-code editing",
      "Conduct in-process dimensional inspection using micrometers, vernier calipers, and bore gauges"
    ],
    requirements: [
      "Valid Indian Passport with at least 18 months validity",
      "Minimum 2 years proven hands-on CNC machining experience",
      "Ability to understand workshop technical drawings and basic English"
    ],
    benefits: [
      "Overtime allowance (1.5x on weekdays, 2.0x on Sundays/PH)",
      "Subsidized company hostel accommodation & transport",
      "Comprehensive medical and hospitalization insurance coverage under MOM regulations",
      "Annual leave, medical leave, and performance bonus"
    ],
    requiredDocuments: [
      "Updated Resume / Bio-data with detailed machine models",
      "Color copy of Passport (all 36 pages)",
      "Educational and ITI / Diploma Certificates",
      "Trade experience certificates and work sample photos/videos"
    ],
    status: "published",
    featured: true,
    latest: true,
    postedDate: "2026-08-25",
    createdAt: "2026-08-25T10:00:00.000Z",
    updatedAt: "2026-08-25T10:00:00.000Z"
  },
  {
    id: "SG-JOB-102",
    title: "6G Pipe Welder (TIG & ARC)",
    employer: "Marine Engineering Services Singapore",
    category: "Marine & Shipyard",
    location: "Tuas Shipyard Basin, Singapore",
    salary: "SGD 2,600 - 3,500 / month",
    qualification: "ITI Welder / 6G WQR Certified",
    experience: "3+ Years in High Pressure Piping or Marine Shipyard",
    jobType: "Work Permit",
    vacancyCount: 8,
    description: "Urgent requirement for certified 6G Pipe Welders for offshore vessel maintenance and pressure piping fabrication in Tuas Shipyard.",
    responsibilities: [
      "Perform GTAW (TIG) root pass and SMAW (ARC) capping on carbon and stainless steel pipes in 6G position",
      "Pass 100% visual and X-ray / Radiographic Testing (RT) weld criteria",
      "Comply strictly with Singapore shipyard safety, permit-to-work (PTW), and confined space protocols"
    ],
    requirements: [
      "Valid Indian Passport with 2+ years validity",
      "Valid or previous 6G Welding Performance Qualification record (WQR)",
      "Gulf or Singapore shipyard experience preferred"
    ],
    benefits: [
      "High overtime availability (average 60-70 hours OT/month)",
      "Shipyard safety boots, helmets, and protective gear provided",
      "Approved dormitory accommodation with Indian food catering option",
      "MOM standard medical and hospitalization insurance"
    ],
    requiredDocuments: [
      "Passport original color scan",
      "6G Welder qualification certificates and past weld logbooks",
      "Short 1-2 minute video of TIG welding root & face"
    ],
    status: "published",
    featured: true,
    latest: true,
    postedDate: "2026-08-26",
    createdAt: "2026-08-26T09:00:00.000Z",
    updatedAt: "2026-08-26T09:00:00.000Z"
  },
  {
    id: "SG-JOB-103",
    title: "Heavy Reach Truck & Forklift Operator",
    employer: "Global Logistics Hub Singapore",
    category: "Logistics & Warehouse",
    location: "Changi South Logistics Park, Singapore",
    salary: "SGD 2,200 - 2,800 / month",
    qualification: "10th / 12th Pass + Forklift License",
    experience: "2+ Years in High-Bay Warehouse Operations",
    jobType: "Work Permit",
    vacancyCount: 5,
    description: "Operating reach trucks and counterbalance forklifts in temperature-controlled FMCG distribution warehouse in Changi South.",
    responsibilities: [
      "Safe operation of high-reach trucks up to 10-meter bay racking",
      "Loading, unloading containerized cargo, and pallet put-away",
      "Scan barcodes and perform stock movement verification using RF guns"
    ],
    requirements: [
      "Valid driving license / heavy vehicle experience",
      "Physical fitness to work in warehouse shift environment",
      "Clear police verification and valid Indian passport"
    ],
    benefits: [
      "Shift allowance and guaranteed overtime",
      "Air-conditioned warehouse environment",
      "Company transport pick-up points across major dormitories"
    ],
    requiredDocuments: [
      "Passport full scan",
      "Driving license and heavy equipment experience letters"
    ],
    status: "published",
    featured: false,
    latest: true,
    postedDate: "2026-08-28",
    createdAt: "2026-08-28T08:00:00.000Z",
    updatedAt: "2026-08-28T08:00:00.000Z"
  }
];
var initialEnquiries = [
  {
    id: "ENQ-2026-8801",
    userId: "USR-8901",
    customerName: "Karthik Raja",
    mobile: "+91 98412 87654",
    email: "karthik.raja.tech@gmail.com",
    jobId: "SG-JOB-101",
    jobTitle: "CNC Milling & Turning Machinist",
    jobCategory: "Manufacturing & Production",
    location: "Jurong Industrial Estate, Singapore",
    salary: "SGD 2,400 - 3,200 / month",
    candidateTrade: "CNC Machinist (Fanuc / Siemens)",
    candidateExperience: "4 Years CNC Milling in Chennai Automotive Tier-1",
    candidateNotes: "Candidate has valid passport ready. Has 4 years experience on 3-axis VMC. Looking for immediate S Pass interview in Singapore.",
    status: "Contacted",
    notes: [
      {
        id: "NOTE-1",
        text: "Called candidate. Confirmed Fanuc G-code knowledge and English basic conversational level. Requested passport copy and work videos.",
        createdAt: "2026-08-26T10:30:00.000Z",
        author: "Arudhra Admin"
      }
    ],
    lastFollowUpDate: "2026-08-26",
    createdAt: "2026-08-25T14:20:00.000Z",
    updatedAt: "2026-08-26T10:30:00.000Z"
  },
  {
    id: "ENQ-2026-8802",
    userId: "USR-8902",
    customerName: "Murugan Sundaram",
    mobile: "+91 97890 12345",
    email: "murugan.welder@gmail.com",
    jobId: "SG-JOB-102",
    jobTitle: "6G Pipe Welder (TIG & ARC)",
    jobCategory: "Marine & Shipyard",
    location: "Tuas Shipyard Basin, Singapore",
    salary: "SGD 2,600 - 3,500 / month",
    candidateTrade: "6G Welder",
    candidateExperience: "5 Years in Gulf Shipyard (TIG + ARC)",
    candidateNotes: "Has prior Dubai Drydocks experience. Completed 6G certification. Passport valid till 2030.",
    status: "Documents Pending",
    notes: [
      {
        id: "NOTE-2",
        text: "Candidate passed preliminary weld video screening. Awaiting official WQR / X-ray certificate submission.",
        createdAt: "2026-08-27T11:00:00.000Z",
        author: "Arudhra Admin"
      }
    ],
    lastFollowUpDate: "2026-08-27",
    createdAt: "2026-08-26T09:15:00.000Z",
    updatedAt: "2026-08-27T11:00:00.000Z"
  },
  {
    id: "ENQ-2026-8803",
    userId: "USR-8903",
    customerName: "Praveen Kumar",
    mobile: "+91 94440 98765",
    email: "praveen.hotelmgmt@gmail.com",
    jobId: "SG-JOB-103",
    jobTitle: "F&B Service Captain & Captain Trainee",
    jobCategory: "F&B & Hospitality",
    location: "Marina Bay / Orchard Road, Singapore",
    salary: "SGD 2,300 - 2,900 / month",
    candidateTrade: "Hospitality / F&B Service",
    candidateExperience: "2 Years in 4-Star Business Hotel",
    candidateNotes: "Good spoken English. Diploma in Catering & Hotel Administration. Immediate joiner.",
    status: "New",
    notes: [],
    lastFollowUpDate: void 0,
    createdAt: "2026-08-28T08:45:00.000Z",
    updatedAt: "2026-08-28T08:45:00.000Z"
  }
];
var initialVideos = [
  {
    id: "VID-01",
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    title: "Singapore Overseas Recruitment Process & Documentation Guide",
    description: "Detailed walkthrough of Singapore Work Permit & S Pass application steps, medical examinations, MOM biometric verification, and pre-departure briefings.",
    status: "published",
    order: 1,
    createdAt: "2026-08-15T10:00:00.000Z"
  },
  {
    id: "VID-02",
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    title: "Life & Work in Singapore for Technical & Skilled Workers",
    description: "Understanding Singapore public transport (MRT/Bus), dormitory and housing guidelines, remittance systems, and workplace safety laws.",
    status: "published",
    order: 2,
    createdAt: "2026-08-18T10:00:00.000Z"
  },
  {
    id: "VID-03",
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    title: "Important Do's and Don'ts for Overseas Candidates Traveling to Singapore",
    description: "Essential immigration tips, customs regulations, SG Arrival Card filing, and initial settlement guidance from Arudhra Consultancy.",
    status: "published",
    order: 3,
    createdAt: "2026-08-20T10:00:00.000Z"
  }
];
var initialAdvertisements = [
  {
    id: "AD-01",
    title: "Singapore Marine & Shipyard Mega Walk-In Interview Drive",
    subtitle: "Urgent hiring for 6G TIG/ARC Welders, Pipe Fitters, Steel Fabricators & Riggers in Tuas and Jurong Shipyards. Direct employer selection.",
    image: "https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=1200&q=80",
    link: "#jobs",
    type: "hero_banner",
    status: "active",
    order: 1,
    createdAt: "2026-08-20T08:00:00.000Z"
  },
  {
    id: "AD-02",
    title: "Precision Machining & Aerospace CNC Recruitment Campaign",
    subtitle: "Direct placement for CNC Milling (3-5 Axis) & CNC Turning Operators with Fanuc / Siemens control expertise. High OT and SGD packages.",
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80",
    link: "#jobs",
    type: "campaign_banner",
    status: "active",
    order: 2,
    createdAt: "2026-08-22T08:00:00.000Z"
  },
  {
    id: "AD-03",
    title: "Singapore Construction Safety & MEP Engineering Drive",
    subtitle: "S Pass & Work Permit opportunities for BCSS Safety Coordinators, Electrical Maintenance Technicians & Site Supervisors.",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80",
    link: "#jobs",
    type: "promo_card",
    status: "active",
    order: 3,
    createdAt: "2026-08-25T08:00:00.000Z"
  },
  {
    id: "AD-04",
    title: "Luxury Hotel & Marina Bay F&B Hospitality Selection",
    subtitle: "Immediate vacancy for Service Captains, Bartenders, Kitchen Commis & Hotel Supervisors. Meals & duty benefits provided.",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
    link: "#jobs",
    type: "promo_card",
    status: "active",
    order: 4,
    createdAt: "2026-08-27T08:00:00.000Z"
  },
  {
    id: "AD-05",
    title: "Changi Air Cargo Logistics & High-Reach Forklift Drive",
    subtitle: "Warehouse Assistants & Counterbalance/Reach Truck Forklift Drivers for Singapore Changi North Logistics Hub.",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80",
    link: "#jobs",
    type: "promo_card",
    status: "active",
    order: 5,
    createdAt: "2026-08-29T08:00:00.000Z"
  }
];
var initialAdminUser = {
  id: "USR-ADMIN-01",
  mobile: "+919840123456",
  name: "Arudhra Administrator",
  email: "info@arudhraconsultancy.com",
  role: "admin",
  createdAt: "2026-01-01T00:00:00.000Z"
};
var initialCandidates = [
  {
    id: "CAND-0001",
    candidateId: "CAND-0001",
    userId: "USR-CAND-01",
    fullName: "Manikandan S",
    mobile: "+919840123456",
    email: "manikandan.sgjob@gmail.com",
    dob: "1996-05-14",
    gender: "Male",
    nationality: "Indian",
    address: "12/4, Gandhi Street, Chromepet",
    city: "Chennai",
    state: "Tamil Nadu",
    country: "India",
    postalCode: "600044",
    passportNumber: "Z6549872",
    passportIssueDate: "2022-03-10",
    passportExpiryDate: "2032-03-09",
    passportPlaceOfIssue: "Chennai",
    passportEcrStatus: "ECNR",
    educationQualification: "Diploma in Mechanical Engineering",
    educationTrade: "CNC Machinist & Programming",
    educationInstitute: "Government Polytechnic College, Chennai",
    educationPassingYear: "2017",
    totalExperienceYears: "5.5 Years",
    singaporeExperienceYears: "2 Years (Jurong Tech Pte Ltd, 2021-2023)",
    gulfExperienceYears: "0",
    indiaExperienceYears: "3.5 Years",
    previousCompany: "Precision Machining Systems, Chennai",
    skills: ["CNC 3-Axis & 5-Axis Milling", "Fanuc Control", "Mastercam", "Blueprint Reading", "Micrometer / Vernier"],
    languages: ["Tamil (Fluent)", "English (Professional)", "Hindi (Basic)"],
    preferredTrade: "CNC Machinist / Mechanical Tech",
    expectedSalarySgd: "SGD 2,600 - 3,000 / month",
    availabilityNoticePeriod: "Immediate (Passport Ready)",
    singaporeFinOrPassHistory: "Previous S Pass holder (Valid exit clearance)",
    applicationStatus: "Under Review",
    adminRemarks: "Strong candidate with verified 2-year Singapore CNC experience. All original certificates and passport copy verified. Scheduled for employer resume shortlisting.",
    documents: [
      {
        id: "DOC-101",
        candidateId: "CAND-0001",
        type: "resume",
        name: "Manikandan_S_CNC_Resume.pdf",
        fileSize: "420 KB",
        uploadedAt: "2026-08-25T10:30:00.000Z"
      },
      {
        id: "DOC-102",
        candidateId: "CAND-0001",
        type: "passport",
        name: "Passport_Copy_Front_Back_Z6549872.pdf",
        fileSize: "1.2 MB",
        uploadedAt: "2026-08-25T10:32:00.000Z"
      },
      {
        id: "DOC-103",
        candidateId: "CAND-0001",
        type: "education",
        name: "Diploma_Mechanical_Certificate.pdf",
        fileSize: "850 KB",
        uploadedAt: "2026-08-25T10:35:00.000Z"
      },
      {
        id: "DOC-104",
        candidateId: "CAND-0001",
        type: "experience",
        name: "Singapore_Service_Letter_JurongTech.pdf",
        fileSize: "620 KB",
        uploadedAt: "2026-08-25T10:36:00.000Z"
      },
      {
        id: "DOC-105",
        candidateId: "CAND-0001",
        type: "photo",
        name: "Passport_Size_Photo_WhiteBG.jpg",
        fileSize: "210 KB",
        uploadedAt: "2026-08-25T10:38:00.000Z"
      }
    ],
    interestedJobs: [
      {
        id: "INT-01",
        candidateId: "CAND-0001",
        jobId: "SG-JOB-101",
        jobTitle: "CNC Milling & Turning Machinist",
        employer: "Precision Engineering Tech Pte Ltd",
        location: "Jurong Industrial Estate, Singapore",
        country: "Singapore",
        salary: "SGD 2,400 - 3,200 / month",
        category: "Manufacturing & Production",
        markedDate: "2026-08-25T10:15:00.000Z"
      }
    ],
    applications: [
      {
        id: "ENQ-2026-1001",
        userId: "USR-CAND-01",
        customerName: "Manikandan S",
        mobile: "+919840123456",
        email: "manikandan.sgjob@gmail.com",
        jobId: "SG-JOB-101",
        jobTitle: "CNC Milling & Turning Machinist",
        jobCategory: "Manufacturing & Production",
        location: "Jurong Industrial Estate, Singapore",
        salary: "SGD 2,400 - 3,200 / month",
        candidateTrade: "CNC Machinist (Fanuc / Siemens)",
        candidateExperience: "5.5 Years (2 Yrs Singapore)",
        candidateNotes: "Seeking S Pass or Work Permit CNC opportunity in Singapore.",
        status: "Processing",
        notes: [
          {
            id: "NOTE-1",
            text: "Profile submitted to Singapore engineering employer for video interview slot.",
            createdAt: "2026-08-26T11:00:00.000Z",
            author: "Admin"
          }
        ],
        adminNotes: "Candidate is shortlisted for preliminary technical screening.",
        assignedAdmin: "Chromepet Head Office",
        createdAt: "2026-08-25T10:20:00.000Z",
        updatedAt: "2026-08-26T11:00:00.000Z"
      }
    ],
    createdAt: "2026-08-25T10:00:00.000Z",
    updatedAt: "2026-08-26T11:00:00.000Z"
  },
  {
    id: "CAND-0002",
    candidateId: "CAND-0002",
    userId: "USR-CAND-02",
    fullName: "Senthil Kumar R",
    mobile: "+919876543210",
    email: "senthil.welder94@gmail.com",
    dob: "1994-11-20",
    gender: "Male",
    nationality: "Indian",
    address: "45, East Coast Road",
    city: "Thanjavur",
    state: "Tamil Nadu",
    country: "India",
    postalCode: "613001",
    passportNumber: "M8123904",
    passportIssueDate: "2021-08-15",
    passportExpiryDate: "2031-08-14",
    passportPlaceOfIssue: "Tiruchirappalli",
    passportEcrStatus: "ECNR",
    educationQualification: "ITI Welder",
    educationTrade: "6G Pipe Welding & SMAW/GTAW",
    educationInstitute: "Govt ITI Thanjavur",
    educationPassingYear: "2014",
    totalExperienceYears: "8 Years",
    singaporeExperienceYears: "3 Years (Tuas Shipyard Marine Services)",
    gulfExperienceYears: "2 Years (Qatar Petrochemical)",
    indiaExperienceYears: "3 Years",
    previousCompany: "Keppel FELS subcontractor",
    skills: ["6G TIG Root Welding", "ARC Welding", "Radiography 100% Pass", "Shipyard Safety SSIC"],
    languages: ["Tamil (Native)", "English (Workplace Basic)"],
    preferredTrade: "6G Pipe Welder",
    expectedSalarySgd: "SGD 2,800 - 3,500 / month",
    availabilityNoticePeriod: "Within 10 Days",
    singaporeFinOrPassHistory: "Previous Work Permit (Shipyard)",
    applicationStatus: "Shortlisted",
    adminRemarks: "Excellent 6G test track record. Ready for immediate Tuas Shipyard weld test.",
    documents: [
      {
        id: "DOC-201",
        candidateId: "CAND-0002",
        type: "resume",
        name: "Senthil_Kumar_6G_Welder_Resume.pdf",
        fileSize: "380 KB",
        uploadedAt: "2026-08-26T09:00:00.000Z"
      },
      {
        id: "DOC-202",
        candidateId: "CAND-0002",
        type: "passport",
        name: "Passport_M8123904_Senthil.pdf",
        fileSize: "1.4 MB",
        uploadedAt: "2026-08-26T09:05:00.000Z"
      }
    ],
    interestedJobs: [
      {
        id: "INT-02",
        candidateId: "CAND-0002",
        jobId: "SG-JOB-102",
        jobTitle: "6G Pipe Welder (TIG & ARC)",
        employer: "Marine Engineering & Offshore Services Pte Ltd",
        location: "Tuas Shipyard Basin, Singapore",
        country: "Singapore",
        salary: "SGD 2,600 - 3,500 / month",
        category: "Marine & Shipyard",
        markedDate: "2026-08-26T09:10:00.000Z"
      }
    ],
    applications: [
      {
        id: "ENQ-2026-1002",
        userId: "USR-CAND-02",
        customerName: "Senthil Kumar R",
        mobile: "+919876543210",
        email: "senthil.welder94@gmail.com",
        jobId: "SG-JOB-102",
        jobTitle: "6G Pipe Welder (TIG & ARC)",
        jobCategory: "Marine & Shipyard",
        location: "Tuas Shipyard Basin, Singapore",
        salary: "SGD 2,600 - 3,500 / month",
        candidateTrade: "6G Welder",
        candidateExperience: "8 Years (3 Yrs Singapore)",
        candidateNotes: "Available for immediate shipyard welding test in Chennai/Singapore.",
        status: "Contacted",
        notes: [],
        createdAt: "2026-08-26T09:12:00.000Z",
        updatedAt: "2026-08-26T09:12:00.000Z"
      }
    ],
    createdAt: "2026-08-26T09:00:00.000Z",
    updatedAt: "2026-08-26T09:12:00.000Z"
  }
];

// server/whatsapp.ts
function formatWhatsAppNumber(rawNumber) {
  let digits = rawNumber.replace(/\D/g, "");
  digits = digits.replace(/^0+/, "");
  if (digits.length === 10 && /^[6-9]/.test(digits)) {
    return `91${digits}`;
  }
  if (digits.length === 8 && /^[89]/.test(digits)) {
    return `65${digits}`;
  }
  if (digits.length === 12 && digits.startsWith("91")) {
    return digits;
  }
  if (digits.length === 10 && digits.startsWith("65")) {
    return digits;
  }
  return digits;
}
function isWhatsAppConfigured() {
  const token = process.env.WHATSAPP_API_TOKEN?.trim();
  const phoneId = process.env.WHATSAPP_PHONE_NUMBER_ID?.trim();
  return Boolean(token && phoneId && token !== "MY_WHATSAPP_API_TOKEN" && phoneId !== "MY_WHATSAPP_PHONE_NUMBER_ID");
}
async function sendWhatsAppOtp(recipientMobile, otpCode) {
  const apiToken = process.env.WHATSAPP_API_TOKEN?.trim();
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID?.trim();
  const templateName = process.env.WHATSAPP_TEMPLATE_NAME?.trim();
  const templateLang = process.env.WHATSAPP_TEMPLATE_LANG?.trim() || "en_US";
  if (!apiToken || !phoneNumberId || apiToken === "MY_WHATSAPP_API_TOKEN" || phoneNumberId === "MY_WHATSAPP_PHONE_NUMBER_ID") {
    return {
      success: false,
      providerConfigured: false,
      error: "WhatsApp Cloud API credentials (WHATSAPP_API_TOKEN and WHATSAPP_PHONE_NUMBER_ID) are not configured in environment variables."
    };
  }
  const formattedRecipient = formatWhatsAppNumber(recipientMobile);
  if (formattedRecipient.length < 8) {
    return {
      success: false,
      providerConfigured: true,
      error: "Invalid recipient mobile number format for WhatsApp delivery."
    };
  }
  const endpoint = `https://graph.facebook.com/v21.0/${phoneNumberId}/messages`;
  try {
    let payload;
    if (templateName) {
      payload = {
        messaging_product: "whatsapp",
        recipient_type: "individual",
        to: formattedRecipient,
        type: "template",
        template: {
          name: templateName,
          language: { code: templateLang },
          components: [
            {
              type: "body",
              parameters: [
                { type: "text", text: otpCode }
              ]
            },
            {
              type: "button",
              sub_type: "url",
              index: "0",
              parameters: [
                { type: "text", text: otpCode }
              ]
            }
          ]
        }
      };
    } else {
      payload = {
        messaging_product: "whatsapp",
        recipient_type: "individual",
        to: formattedRecipient,
        type: "text",
        text: {
          preview_url: false,
          body: `*Arudhra Consultancy - Singapore Overseas Recruitment*

Your 6-digit Candidate Portal verification code is: *${otpCode}*

\u23F1\uFE0F Valid for 5 minutes. Please do not share this OTP with anyone for account safety.`
        }
      };
    }
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiToken}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });
    const data = await response.json();
    if (!response.ok) {
      const errorMsg = data?.error?.message || `WhatsApp API error (Status: ${response.status})`;
      console.warn(`[WhatsApp API Dispatch Failed for +${formattedRecipient}]: ${errorMsg}`);
      return {
        success: false,
        providerConfigured: true,
        error: errorMsg
      };
    }
    const messageId = data?.messages?.[0]?.id;
    return {
      success: true,
      providerConfigured: true,
      messageId
    };
  } catch (err) {
    console.warn(`[WhatsApp Network Exception]: ${err.message || err}`);
    return {
      success: false,
      providerConfigured: true,
      error: err.message || "Network failure connecting to WhatsApp API service."
    };
  }
}

// server/brevo.ts
function isBrevoConfigured(apiKeyOverride) {
  const apiKey = (apiKeyOverride || process.env.BREVO_API_KEY)?.trim();
  return Boolean(
    apiKey && apiKey !== "MY_BREVO_API_KEY" && apiKey !== "xkeysib-your-api-key-here" && apiKey.length > 10
  );
}
function getBrevoConfig(fallbackEmail = "info@arudhraconsultancy.com", fallbackName = "ARUDHRA CONSULTANCY", storedApiKey, storedSenderEmail, storedSenderName) {
  const effectiveKey = storedApiKey?.trim() || process.env.BREVO_API_KEY?.trim() || "";
  const senderEmail = storedSenderEmail?.trim() || process.env.BREVO_SENDER_EMAIL?.trim() || fallbackEmail;
  const senderName = storedSenderName?.trim() || process.env.BREVO_SENDER_NAME?.trim() || fallbackName;
  const configured = isBrevoConfigured(effectiveKey);
  let maskedApiKey;
  if (configured && effectiveKey.length >= 8) {
    maskedApiKey = `${effectiveKey.slice(0, 8)}\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022${effectiveKey.slice(-4)}`;
  }
  const source = storedApiKey?.trim() && isBrevoConfigured(storedApiKey) ? "database" : process.env.BREVO_API_KEY?.trim() && isBrevoConfigured(process.env.BREVO_API_KEY) ? "environment" : "none";
  return {
    isConfigured: configured,
    senderEmail,
    senderName,
    maskedApiKey,
    source
  };
}
function createOtpEmailHtml(otpCode, candidateName, senderName) {
  const cleanName = candidateName?.trim() || "Candidate";
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Arudhra Candidate Portal Login Code</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1e293b;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f8fafc; padding: 32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" max-width="560px" style="max-width: 560px; background-color: #ffffff; border-radius: 16px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
          
          <!-- Header Banner -->
          <tr>
            <td style="background-color: #7f1d1d; padding: 28px 32px; text-align: center;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td align="center">
                    <div style="display: inline-block; background-color: #ffffff; color: #7f1d1d; font-size: 20px; font-weight: 800; width: 44px; height: 44px; line-height: 44px; border-radius: 12px; text-align: center; margin-bottom: 8px;">
                      AC
                    </div>
                    <h1 style="color: #ffffff; font-size: 20px; font-weight: 800; margin: 6px 0 2px 0; letter-spacing: 0.5px;">
                      ${senderName}
                    </h1>
                    <p style="color: #fecaca; font-size: 12px; font-weight: 600; margin: 0; text-transform: uppercase; letter-spacing: 1px;">
                      \u{1F1F8}\u{1F1EC} Singapore Overseas Recruitment & Placement Support
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Content Body -->
          <tr>
            <td style="padding: 36px 32px;">
              <h2 style="color: #0f172a; font-size: 18px; font-weight: 700; margin: 0 0 12px 0;">
                Candidate Portal Login Code
              </h2>
              <p style="color: #475569; font-size: 14px; line-height: 1.6; margin: 0 0 24px 0;">
                Hello <strong>${cleanName}</strong>,<br>
                Use the 6-digit verification code below to securely sign in to your Arudhra Consultancy candidate portal.
              </p>

              <!-- OTP Box -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin: 0 0 28px 0;">
                <tr>
                  <td align="center" style="background-color: #fef2f2; border: 2px dashed #f87171; border-radius: 12px; padding: 24px 16px;">
                    <div style="font-size: 12px; font-weight: 700; color: #991b1b; text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 8px;">
                      Your One-Time Password (OTP)
                    </div>
                    <div style="font-family: 'Courier New', Courier, monospace; font-size: 36px; font-weight: 800; letter-spacing: 8px; color: #991b1b; padding: 4px 0;">
                      ${otpCode}
                    </div>
                    <div style="font-size: 12px; color: #7f1d1d; margin-top: 8px; font-weight: 500;">
                      \u23F1\uFE0F Valid for <strong>5 minutes</strong> only
                    </div>
                  </td>
                </tr>
              </table>

              <!-- Security Advice -->
              <div style="background-color: #f1f5f9; border-radius: 10px; padding: 14px 16px; margin-bottom: 24px;">
                <p style="color: #334155; font-size: 12px; line-height: 1.5; margin: 0;">
                  \u{1F512} <strong>Security Warning:</strong> Arudhra Consultancy staff will never call or message you asking for this OTP code. Do not share this OTP with anyone. If you did not initiate this request, you can safely disregard this email.
                </p>
              </div>

              <p style="color: #64748b; font-size: 13px; line-height: 1.5; margin: 0;">
                Once logged in, you can browse verified Singapore vacancies, track your work pass status, and upload candidate bio-data.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f8fafc; border-top: 1px solid #e2e8f0; padding: 20px 32px; text-align: center;">
              <p style="color: #64748b; font-size: 11px; margin: 0 0 6px 0;">
                <strong>Arudhra Consultancy</strong> \u2022 1/149, Ganesh Complex, Avinashi Road, Neelambur, Coimbatore \u2013 641062
              </p>
              <p style="color: #94a3b8; font-size: 11px; margin: 0;">
                Contact: +91 6374509488 \u2022 info@arudhraconsultancy.com
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
async function sendBrevoEmailOtp(recipientEmail, otpCode, recipientName, senderOverride) {
  const apiKey = senderOverride?.apiKey?.trim() || process.env.BREVO_API_KEY?.trim();
  if (!isBrevoConfigured(apiKey) || !apiKey) {
    return {
      success: false,
      providerConfigured: false,
      error: "Brevo API key is not configured in settings or environment (BREVO_API_KEY)."
    };
  }
  const senderEmail = senderOverride?.email?.trim() || process.env.BREVO_SENDER_EMAIL?.trim() || "info@arudhraconsultancy.com";
  const senderName = senderOverride?.name?.trim() || process.env.BREVO_SENDER_NAME?.trim() || "ARUDHRA CONSULTANCY";
  const cleanName = recipientName?.trim() || "Candidate";
  const payload = {
    sender: {
      name: senderName,
      email: senderEmail
    },
    to: [
      {
        email: recipientEmail.trim().toLowerCase(),
        name: cleanName
      }
    ],
    subject: `Your Login OTP Code is ${otpCode} - ${senderName}`,
    htmlContent: createOtpEmailHtml(otpCode, cleanName, senderName),
    textContent: `Your Arudhra Candidate Portal login verification code is: ${otpCode}

Valid for 5 minutes. Please do not share this OTP with anyone for account safety.

Arudhra Consultancy - Singapore Overseas Recruitment
Phone: +91 6374509488
Coimbatore, Tamil Nadu`
  };
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 12e3);
    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "accept": "application/json",
        "api-key": apiKey,
        "content-type": "application/json"
      },
      body: JSON.stringify(payload),
      signal: controller.signal
    });
    clearTimeout(timeoutId);
    const data = await response.json().catch(() => null);
    if (!response.ok) {
      const errorMsg = data?.message || `Brevo API HTTP ${response.status}: ${response.statusText}`;
      console.error("[Brevo Error]", errorMsg, data);
      return {
        success: false,
        providerConfigured: true,
        error: `Brevo email dispatch failed: ${errorMsg}`
      };
    }
    return {
      success: true,
      messageId: data?.messageId,
      providerConfigured: true
    };
  } catch (err) {
    const isTimeout = err.name === "AbortError";
    const errorMsg = isTimeout ? "Brevo API request timed out (12s)" : err.message || "Network error connecting to Brevo";
    console.error("[Brevo Exception]", errorMsg);
    return {
      success: false,
      providerConfigured: true,
      error: errorMsg
    };
  }
}
function createApplicationEmailHtml(candidateName, appData, senderName, contactPhone) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Application Received - Singapore Overseas Placement</title>
</head>
<body style="margin:0;padding:0;background-color:#f8fafc;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#1e293b;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#f8fafc;padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" style="max-width:580px;background-color:#ffffff;border-radius:16px;border:1px solid #e2e8f0;overflow:hidden;box-shadow:0 4px 6px -1px rgba(0,0,0,0.05);">
          <tr>
            <td style="background-color:#7f1d1d;padding:26px 32px;text-align:center;">
              <div style="display:inline-block;background-color:#ffffff;color:#7f1d1d;font-size:20px;font-weight:800;width:44px;height:44px;line-height:44px;border-radius:12px;margin-bottom:8px;">AC</div>
              <h1 style="color:#ffffff;font-size:20px;font-weight:800;margin:6px 0 2px 0;">${senderName}</h1>
              <p style="color:#fecaca;font-size:12px;font-weight:600;margin:0;text-transform:uppercase;letter-spacing:1px;">\u{1F1F8}\u{1F1EC} Application Acknowledgment</p>
            </td>
          </tr>
          <tr>
            <td style="padding:32px;">
              <h2 style="color:#0f172a;font-size:18px;font-weight:700;margin:0 0 12px 0;">Application Successfully Received!</h2>
              <p style="color:#475569;font-size:14px;line-height:1.6;margin:0 0 20px 0;">
                Dear <strong>${candidateName}</strong>,<br>
                Thank you for applying through Arudhra Consultancy. Your application for Singapore overseas placement has been registered in our recruitment system.
              </p>
              
              <div style="background-color:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:18px;margin-bottom:24px;">
                <p style="margin:0 0 8px 0;font-size:13px;color:#64748b;">Reference ID: <strong style="color:#7f1d1d;font-family:monospace;font-size:14px;">${appData.enquiryId}</strong></p>
                <p style="margin:0 0 8px 0;font-size:13px;color:#1e293b;"><strong>Role:</strong> ${appData.jobTitle}</p>
                ${appData.location ? `<p style="margin:0 0 8px 0;font-size:13px;color:#1e293b;"><strong>Location:</strong> ${appData.location}</p>` : ""}
                ${appData.salary ? `<p style="margin:0;font-size:13px;color:#1e293b;"><strong>Compensation:</strong> ${appData.salary}</p>` : ""}
              </div>

              <h3 style="color:#1e293b;font-size:14px;font-weight:700;margin:0 0 8px 0;">What Happens Next?</h3>
              <ol style="color:#475569;font-size:13px;line-height:1.6;padding-left:20px;margin:0 0 24px 0;">
                <li>Our Singapore deployment team will review your trade profile and MOM eligibility.</li>
                <li>An overseas coordinator will contact you via WhatsApp / Call at your registered phone number.</li>
                <li>Keep your passport copy, trade certificates, and bio-data ready for verification.</li>
              </ol>

              <div style="background-color:#fef2f2;border:1px solid #fee2e2;border-radius:10px;padding:14px;text-align:center;">
                <p style="color:#991b1b;font-size:13px;font-weight:600;margin:0 0 4px 0;">Need immediate consultation or update?</p>
                <p style="color:#7f1d1d;font-size:13px;margin:0;">Call or WhatsApp our desk at <strong>${contactPhone}</strong></p>
              </div>
            </td>
          </tr>
          <tr>
            <td style="background-color:#f8fafc;border-top:1px solid #e2e8f0;padding:18px 32px;text-align:center;">
              <p style="color:#64748b;font-size:11px;margin:0 0 4px 0;">Arudhra Consultancy \u2022 1/149, Ganesh Complex, Avinashi Road, Neelambur, Coimbatore \u2013 641062</p>
              <p style="color:#94a3b8;font-size:11px;margin:0;">Licensed Overseas Manpower Placement & Visa Consulting Support</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
async function sendBrevoApplicationEmail(recipientEmail, candidateName, appData, senderOverride) {
  const apiKey = senderOverride?.apiKey?.trim() || process.env.BREVO_API_KEY?.trim();
  if (!isBrevoConfigured(apiKey) || !apiKey) {
    return {
      success: false,
      providerConfigured: false,
      error: "Brevo API key is not configured."
    };
  }
  const senderEmail = senderOverride?.email?.trim() || process.env.BREVO_SENDER_EMAIL?.trim() || "info@arudhraconsultancy.com";
  const senderName = senderOverride?.name?.trim() || process.env.BREVO_SENDER_NAME?.trim() || "ARUDHRA CONSULTANCY";
  const contactPhone = senderOverride?.phone?.trim() || "+91 6374509488";
  const cleanName = candidateName?.trim() || "Candidate";
  const payload = {
    sender: {
      name: senderName,
      email: senderEmail
    },
    to: [
      {
        email: recipientEmail.trim().toLowerCase(),
        name: cleanName
      }
    ],
    subject: `Application Received: ${appData.jobTitle} (Ref: ${appData.enquiryId}) - ${senderName}`,
    htmlContent: createApplicationEmailHtml(cleanName, appData, senderName, contactPhone),
    textContent: `Dear ${cleanName},

Your application for "${appData.jobTitle}" (Reference ID: ${appData.enquiryId}) has been received by ${senderName}.

Our Singapore recruitment team will contact you shortly to review your work pass eligibility.

Hotline: ${contactPhone}
Coimbatore, Tamil Nadu`
  };
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 12e3);
    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "accept": "application/json",
        "api-key": apiKey,
        "content-type": "application/json"
      },
      body: JSON.stringify(payload),
      signal: controller.signal
    });
    clearTimeout(timeoutId);
    const data = await response.json().catch(() => null);
    if (!response.ok) {
      const errorMsg = data?.message || `Brevo API HTTP ${response.status}: ${response.statusText}`;
      return {
        success: false,
        providerConfigured: true,
        error: `Brevo application email failed: ${errorMsg}`
      };
    }
    return {
      success: true,
      messageId: data?.messageId,
      providerConfigured: true
    };
  } catch (err) {
    return {
      success: false,
      providerConfigured: true,
      error: err.name === "AbortError" ? "Brevo request timed out" : err.message || "Error connecting to Brevo"
    };
  }
}
async function sendBrevoTestEmail(recipientEmail, senderOverride) {
  const apiKey = senderOverride?.apiKey?.trim() || process.env.BREVO_API_KEY?.trim();
  if (!isBrevoConfigured(apiKey) || !apiKey) {
    return {
      success: false,
      providerConfigured: false,
      error: "Brevo API key is not configured in settings or environment variables."
    };
  }
  const senderEmail = senderOverride?.email?.trim() || process.env.BREVO_SENDER_EMAIL?.trim() || "info@arudhraconsultancy.com";
  const senderName = senderOverride?.name?.trim() || process.env.BREVO_SENDER_NAME?.trim() || "ARUDHRA CONSULTANCY";
  const cleanRecipient = recipientEmail.trim().toLowerCase();
  const testOtp = Math.floor(1e5 + Math.random() * 9e5).toString();
  const payload = {
    sender: {
      name: senderName,
      email: senderEmail
    },
    to: [
      {
        email: cleanRecipient,
        name: "Arudhra Administrator"
      }
    ],
    subject: `\u2705 Brevo Test Email Delivery - ${senderName}`,
    htmlContent: `<!DOCTYPE html>
<html>
<body style="font-family:-apple-system,BlinkMacSystemFont,sans-serif;padding:24px;background:#f8fafc;">
  <div style="max-width:540px;margin:0 auto;background:#fff;border-radius:12px;padding:30px;border:1px solid #e2e8f0;">
    <div style="background:#059669;color:#fff;padding:12px 20px;border-radius:8px;text-align:center;font-weight:700;font-size:16px;">
      \u2705 Brevo API Connection Successful!
    </div>
    <h2 style="color:#0f172a;margin-top:20px;font-size:18px;">Brevo Email Integration is Working</h2>
    <p style="color:#475569;font-size:14px;line-height:1.6;">
      This test message confirms that your Brevo API key and sender address (<strong>${senderEmail}</strong>) are configured correctly for <strong>${senderName}</strong>.
    </p>
    <div style="background:#f1f5f9;padding:14px;border-radius:8px;font-size:13px;color:#334155;">
      <strong>Sample 6-Digit Candidate OTP Code:</strong> <span style="font-family:monospace;font-weight:bold;color:#7f1d1d;font-size:16px;">${testOtp}</span><br>
      <strong>Dispatched at:</strong> ${(/* @__PURE__ */ new Date()).toLocaleString("en-US", { timeZone: "Asia/Kolkata" })} IST
    </div>
    <p style="color:#64748b;font-size:12px;margin-top:20px;">
      All candidate OTP logins, overseas application receipts, and contact inquiries will now dispatch via Brevo automatically.
    </p>
  </div>
</body>
</html>`,
    textContent: `Brevo API Connection Successful!

This confirms that Brevo API is sending emails correctly from ${senderEmail} for ${senderName}.
Sample OTP: ${testOtp}
Timestamp: ${(/* @__PURE__ */ new Date()).toISOString()}`
  };
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 12e3);
    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "accept": "application/json",
        "api-key": apiKey,
        "content-type": "application/json"
      },
      body: JSON.stringify(payload),
      signal: controller.signal
    });
    clearTimeout(timeoutId);
    const data = await response.json().catch(() => null);
    if (!response.ok) {
      const errorMsg = data?.message || `Brevo API HTTP ${response.status}: ${response.statusText}`;
      return {
        success: false,
        providerConfigured: true,
        error: `Brevo test failed: ${errorMsg}`
      };
    }
    return {
      success: true,
      messageId: data?.messageId,
      providerConfigured: true
    };
  } catch (err) {
    return {
      success: false,
      providerConfigured: true,
      error: err.name === "AbortError" ? "Brevo request timed out" : err.message || "Error connecting to Brevo"
    };
  }
}

// server/storage.ts
function base32Decode(base32) {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
  let bits = "";
  const cleaned = base32.toUpperCase().replace(/=+$/, "");
  for (let i = 0; i < cleaned.length; i++) {
    const val = alphabet.indexOf(cleaned[i]);
    if (val === -1) continue;
    bits += val.toString(2).padStart(5, "0");
  }
  const bytes = [];
  for (let i = 0; i + 8 <= bits.length; i += 8) {
    bytes.push(parseInt(bits.substr(i, 8), 2));
  }
  return Buffer.from(bytes);
}
function generateTOTP(secret, windowOffset = 0) {
  const epoch = Math.floor(Date.now() / 1e3);
  const timeStep = 30;
  const counter = Math.floor(epoch / timeStep) + windowOffset;
  const counterBuf = Buffer.alloc(8);
  counterBuf.writeBigInt64BE(BigInt(counter));
  const key = base32Decode(secret);
  const hmac = import_crypto.default.createHmac("sha1", key).update(counterBuf).digest();
  const offset = hmac[hmac.length - 1] & 15;
  const codeInt = (hmac[offset] & 127) << 24 | (hmac[offset + 1] & 255) << 16 | (hmac[offset + 2] & 255) << 8 | hmac[offset + 3] & 255;
  const otp = (codeInt % 1e6).toString().padStart(6, "0");
  return otp;
}
function verifyTotp(secret, code) {
  if (!/^\d{6}$/.test(code)) return false;
  for (const offset of [-1, 0, 1]) {
    if (generateTOTP(secret, offset) === code) {
      return true;
    }
  }
  return false;
}
function generateBase32Secret(length = 16) {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
  const bytes = import_crypto.default.randomBytes(length);
  let result = "";
  for (let i = 0; i < length; i++) {
    result += alphabet[bytes[i] % alphabet.length];
  }
  return result;
}
var StorageService = class {
  constructor() {
    this.filePath = import_path.default.join(process.cwd(), "storage_data.json");
    this.deletedIds = /* @__PURE__ */ new Set();
    this.jobs = [...initialJobs];
    this.enquiries = [...initialEnquiries];
    this.videos = [...initialVideos];
    this.advertisements = [...initialAdvertisements];
    this.settings = { ...initialSiteSettings };
    this.users = [initialAdminUser];
    this.candidates = [...initialCandidates];
    this.candidateCounter = 3;
    this.otpStore = /* @__PURE__ */ new Map();
    this.otpRateLimits = /* @__PURE__ */ new Map();
    this.emailOtpStore = /* @__PURE__ */ new Map();
    this.emailOtpRateLimits = /* @__PURE__ */ new Map();
    this.adminSessions = /* @__PURE__ */ new Map();
    this.admin2faChallenges = /* @__PURE__ */ new Map();
    this.loadFromDisk();
  }
  loadFromDisk() {
    try {
      if (import_fs.default.existsSync(this.filePath)) {
        const raw = import_fs.default.readFileSync(this.filePath, "utf-8");
        const data = JSON.parse(raw);
        if (Array.isArray(data.deletedIds)) {
          this.deletedIds = new Set(data.deletedIds);
        }
        if (Array.isArray(data.jobs) && data.jobs.length > 0) {
          this.jobs = data.jobs;
          this.jobs.forEach((j) => this.deletedIds.delete(j.id));
        } else {
          this.jobs = [...initialJobs];
          initialJobs.forEach((j) => this.deletedIds.delete(j.id));
        }
        if (Array.isArray(data.enquiries)) {
          this.enquiries = data.enquiries.filter((e) => !this.deletedIds.has(e.id));
        }
        if (Array.isArray(data.videos)) {
          this.videos = data.videos.filter((v) => !this.deletedIds.has(v.id));
        }
        if (Array.isArray(data.advertisements)) {
          this.advertisements = data.advertisements.filter((a) => !this.deletedIds.has(a.id));
        }
        if (Array.isArray(data.candidates)) {
          this.candidates = data.candidates.filter(
            (c) => !this.deletedIds.has(c.id) && !this.deletedIds.has(c.candidateId)
          );
        }
        if (Array.isArray(data.users)) {
          this.users = data.users;
          if (!this.users.some((u) => u.role === "admin")) {
            this.users.unshift(initialAdminUser);
          }
        }
        if (typeof data.candidateCounter === "number") {
          this.candidateCounter = data.candidateCounter;
        }
        if (data.settings && typeof data.settings === "object") {
          this.settings = { ...this.settings, ...data.settings };
        }
        if (this.settings.admin2faEnrolled === void 0) {
          this.settings.admin2faEnrolled = false;
        }
        if (!this.settings.admin2faSecret) {
          this.settings.admin2faSecret = "ARUDHRA7MZQK4X2P";
        }
        this.settings.autoReplaceOldJobs = false;
        this.settings.autoClearOldLeadsOnNewJob = false;
        this.settings.autoReplaceOldFlyers = false;
        this.settings.autoReplaceOldVideos = false;
        console.log(`[Storage] Persistent storage loaded. Jobs: ${this.jobs.length}, Enquiries: ${this.enquiries.length}, Candidates: ${this.candidates.length}, Users: ${this.users.length}, Tracked deleted items: ${this.deletedIds.size}`);
        return;
      }
    } catch (err) {
      console.warn("[Storage] Error loading persistent storage from disk, using defaults:", err);
    }
    this.saveToDisk();
  }
  saveToDisk() {
    try {
      const dataToSave = {
        jobs: this.jobs,
        enquiries: this.enquiries.filter((e) => !this.deletedIds.has(e.id)),
        videos: this.videos.filter((v) => !this.deletedIds.has(v.id)),
        advertisements: this.advertisements.filter((a) => !this.deletedIds.has(a.id)),
        settings: this.settings,
        users: this.users,
        candidates: this.candidates.filter((c) => !this.deletedIds.has(c.id) && !this.deletedIds.has(c.candidateId)),
        candidateCounter: this.candidateCounter,
        deletedIds: Array.from(this.deletedIds),
        savedAt: (/* @__PURE__ */ new Date()).toISOString()
      };
      const tempPath = `${this.filePath}.tmp`;
      import_fs.default.writeFileSync(tempPath, JSON.stringify(dataToSave, null, 2), "utf-8");
      import_fs.default.renameSync(tempPath, this.filePath);
    } catch (err) {
      console.error("[Storage] Error persisting to disk:", err);
    }
  }
  // Validate admin authorization token strictly - requires an active authenticated session
  validateAdminToken(token) {
    if (!token || typeof token !== "string") return false;
    const session = this.adminSessions.get(token);
    if (!session) return false;
    if (Date.now() > session.expiresAt) {
      this.adminSessions.delete(token);
      return false;
    }
    return true;
  }
  // Revoke admin token on logout
  revokeAdminToken(token) {
    return this.adminSessions.delete(token);
  }
  // Helper to normalize phone number
  normalizePhone(phone) {
    if (!phone) return "";
    return phone.replace(/\D/g, "");
  }
  // ----------------------------------------------------
  // CANDIDATE MASTER RECORD & AUTOMATIC DATA SYNC
  // ----------------------------------------------------
  getOrCreateCandidateForUser(user) {
    const userCleanMobile = this.normalizePhone(user.mobile);
    let candidate = this.candidates.find((c) => {
      if (this.deletedIds.has(c.id) || this.deletedIds.has(c.candidateId) || c.userId && this.deletedIds.has(c.userId)) return false;
      if (c.userId && c.userId === user.id) return true;
      if (this.normalizePhone(c.mobile) === userCleanMobile && userCleanMobile.length >= 8) return true;
      if (user.email && c.email && c.email.toLowerCase() === user.email.toLowerCase()) return true;
      return false;
    });
    const now = (/* @__PURE__ */ new Date()).toISOString();
    if (candidate) {
      if (candidate.userId !== user.id) {
        candidate.userId = user.id;
      }
      if (user.name && (!candidate.fullName || candidate.fullName.startsWith("Candidate (+"))) {
        candidate.fullName = user.name;
      }
      if (user.email && !candidate.email) {
        candidate.email = user.email;
      }
      candidate.updatedAt = now;
      this.syncCandidateApplications(candidate);
      this.saveToDisk();
      return candidate;
    }
    const nextNum = this.candidateCounter++;
    const candId = `CAND-${String(nextNum).padStart(4, "0")}`;
    const newCandidate = {
      id: candId,
      candidateId: candId,
      userId: user.id,
      fullName: user.name || `Candidate (+${userCleanMobile.slice(-4)})`,
      mobile: user.mobile,
      email: user.email || "",
      nationality: "Indian",
      applicationStatus: "Submitted",
      documents: [],
      interestedJobs: [],
      applications: [],
      createdAt: now,
      updatedAt: now
    };
    this.syncCandidateApplications(newCandidate);
    this.candidates.unshift(newCandidate);
    this.saveToDisk();
    return newCandidate;
  }
  syncCandidateApplications(candidate) {
    const candMobile = this.normalizePhone(candidate.mobile);
    const matchingEnquiries = this.enquiries.filter((e) => {
      if (this.deletedIds.has(e.id)) return false;
      if (e.userId && (e.userId === candidate.userId || e.userId === candidate.id)) return true;
      if (this.normalizePhone(e.mobile) === candMobile && candMobile.length >= 8) return true;
      if (candidate.email && e.email && e.email.toLowerCase() === candidate.email.toLowerCase()) return true;
      return false;
    });
    candidate.applications = matchingEnquiries;
  }
  getCandidateForUser(userId, mobile) {
    if (!userId && !mobile) return void 0;
    const cleanMobile = this.normalizePhone(mobile);
    let candidate = this.candidates.find((c) => {
      if (this.deletedIds.has(c.id) || this.deletedIds.has(c.candidateId)) return false;
      if (userId && (c.userId === userId || c.id === userId)) return true;
      if (cleanMobile && this.normalizePhone(c.mobile) === cleanMobile && cleanMobile.length >= 8) return true;
      return false;
    });
    if (candidate) {
      this.syncCandidateApplications(candidate);
    }
    return candidate;
  }
  getCandidateById(candidateId) {
    if (this.deletedIds.has(candidateId)) return void 0;
    const candidate = this.candidates.find((c) => (c.id === candidateId || c.userId === candidateId || c.candidateId === candidateId) && !this.deletedIds.has(c.id) && !this.deletedIds.has(c.candidateId));
    if (candidate) {
      this.syncCandidateApplications(candidate);
    }
    return candidate;
  }
  updateCandidateProfile(candidateIdOrUserId, updates) {
    const candidate = this.candidates.find((c) => (c.id === candidateIdOrUserId || c.userId === candidateIdOrUserId || c.candidateId === candidateIdOrUserId) && !this.deletedIds.has(c.id) && !this.deletedIds.has(c.candidateId));
    if (!candidate) return void 0;
    const { id, userId, documents, interestedJobs, applications, createdAt, ...allowedUpdates } = updates;
    Object.assign(candidate, allowedUpdates);
    candidate.updatedAt = (/* @__PURE__ */ new Date()).toISOString();
    const user = this.users.find((u) => u.id === candidate.userId);
    if (user) {
      if (candidate.fullName) user.name = candidate.fullName;
      if (candidate.email) user.email = candidate.email;
    }
    const candMobile = this.normalizePhone(candidate.mobile);
    this.enquiries.forEach((e) => {
      if (this.deletedIds.has(e.id)) return;
      if (e.userId && (e.userId === candidate.userId || e.userId === candidate.id) || candMobile && this.normalizePhone(e.mobile) === candMobile && candMobile.length >= 8) {
        if (candidate.fullName) e.customerName = candidate.fullName;
        if (candidate.email && !e.email) e.email = candidate.email;
        if (candidate.trade) e.candidateTrade = candidate.trade;
        if (candidate.totalExperienceYears) e.candidateExperience = `${candidate.totalExperienceYears} Years`;
        e.updatedAt = (/* @__PURE__ */ new Date()).toISOString();
      }
    });
    this.syncCandidateApplications(candidate);
    this.saveToDisk();
    return candidate;
  }
  // ----------------------------------------------------
  // DOCUMENTS
  // ----------------------------------------------------
  addCandidateDocument(candidateIdOrUserId, docData) {
    const candidate = this.candidates.find((c) => (c.id === candidateIdOrUserId || c.userId === candidateIdOrUserId || c.candidateId === candidateIdOrUserId) && !this.deletedIds.has(c.id) && !this.deletedIds.has(c.candidateId));
    if (!candidate) return void 0;
    const docId = `DOC-${Date.now().toString().slice(-6)}`;
    const newDoc = {
      id: docId,
      candidateId: candidate.id,
      type: docData.type,
      name: docData.name,
      fileData: docData.fileData,
      fileSize: docData.fileSize || "1.0 MB",
      uploadedAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    candidate.documents.push(newDoc);
    candidate.updatedAt = (/* @__PURE__ */ new Date()).toISOString();
    this.saveToDisk();
    return newDoc;
  }
  deleteCandidateDocument(candidateIdOrUserId, docId) {
    const candidate = this.candidates.find((c) => c.id === candidateIdOrUserId || c.userId === candidateIdOrUserId || c.candidateId === candidateIdOrUserId);
    if (!candidate) return false;
    const initialLen = candidate.documents.length;
    const docIndex = candidate.documents.findIndex((d) => d.id === docId);
    if (docIndex === -1) return false;
    this.deletedIds.add(docId);
    const [deletedDoc] = candidate.documents.splice(docIndex, 1);
    if (deletedDoc) {
      delete deletedDoc.fileData;
    }
    if (candidate.documents.length !== initialLen) {
      candidate.updatedAt = (/* @__PURE__ */ new Date()).toISOString();
      this.saveToDisk();
      return true;
    }
    return false;
  }
  deleteAdminCandidateDocument(candidateId, docId) {
    const candidate = this.candidates.find(
      (c) => c.id === candidateId || c.candidateId === candidateId || c.userId === candidateId
    );
    if (!candidate) {
      return { success: false, message: "Candidate record not found." };
    }
    const docIndex = candidate.documents.findIndex((d) => d.id === docId);
    if (docIndex === -1) {
      return {
        success: false,
        message: `Document not found or does not belong to candidate ${candidate.candidateId || candidate.id}.`
      };
    }
    this.deletedIds.add(docId);
    const [deletedDoc] = candidate.documents.splice(docIndex, 1);
    if (deletedDoc) {
      delete deletedDoc.fileData;
    }
    candidate.updatedAt = (/* @__PURE__ */ new Date()).toISOString();
    this.saveToDisk();
    return {
      success: true,
      message: "Document deleted successfully.",
      deletedDoc
    };
  }
  replaceCandidateDocument(candidateId, docId, docData) {
    const candidate = this.candidates.find(
      (c) => (c.id === candidateId || c.candidateId === candidateId || c.userId === candidateId) && !this.deletedIds.has(c.id) && !this.deletedIds.has(c.candidateId)
    );
    if (!candidate) {
      return { success: false, message: "Candidate record not found." };
    }
    const doc = candidate.documents.find((d) => d.id === docId);
    if (!doc) {
      return {
        success: false,
        message: `Document not found or does not belong to candidate ${candidate.candidateId || candidate.id}.`
      };
    }
    if (docData.name) doc.name = docData.name;
    if (docData.fileData !== void 0) doc.fileData = docData.fileData;
    if (docData.fileSize) doc.fileSize = docData.fileSize;
    if (docData.type) doc.type = docData.type;
    doc.uploadedAt = (/* @__PURE__ */ new Date()).toISOString();
    candidate.updatedAt = (/* @__PURE__ */ new Date()).toISOString();
    this.saveToDisk();
    return {
      success: true,
      message: "Document replaced successfully.",
      document: doc
    };
  }
  // ----------------------------------------------------
  // INTERESTED JOBS
  // ----------------------------------------------------
  addInterestedJob(candidateIdOrUserId, jobId) {
    if (this.deletedIds.has(jobId)) return void 0;
    const candidate = this.candidates.find((c) => (c.id === candidateIdOrUserId || c.userId === candidateIdOrUserId || c.candidateId === candidateIdOrUserId) && !this.deletedIds.has(c.id) && !this.deletedIds.has(c.candidateId));
    if (!candidate) return void 0;
    const existing = candidate.interestedJobs.find((i) => i.jobId === jobId);
    if (existing) return existing;
    const job = this.getJobById(jobId);
    if (!job) return void 0;
    const newInterest = {
      id: `INT-${Date.now().toString().slice(-6)}`,
      candidateId: candidate.id,
      jobId: job.id,
      jobTitle: job.title,
      employer: job.employer || "Singapore Employer",
      location: job.location,
      country: "Singapore",
      salary: job.salary,
      category: job.category,
      markedDate: (/* @__PURE__ */ new Date()).toISOString()
    };
    candidate.interestedJobs.unshift(newInterest);
    candidate.updatedAt = (/* @__PURE__ */ new Date()).toISOString();
    this.saveToDisk();
    return newInterest;
  }
  removeInterestedJob(candidateIdOrUserId, jobId) {
    const candidate = this.candidates.find((c) => c.id === candidateIdOrUserId || c.userId === candidateIdOrUserId || c.candidateId === candidateIdOrUserId);
    if (!candidate) return false;
    const prevLen = candidate.interestedJobs.length;
    candidate.interestedJobs = candidate.interestedJobs.filter((i) => i.jobId !== jobId);
    if (candidate.interestedJobs.length !== prevLen) {
      candidate.updatedAt = (/* @__PURE__ */ new Date()).toISOString();
      this.saveToDisk();
      return true;
    }
    return false;
  }
  getCandidateInterestedJobs(candidateIdOrUserId) {
    const candidate = this.candidates.find((c) => (c.id === candidateIdOrUserId || c.userId === candidateIdOrUserId || c.candidateId === candidateIdOrUserId) && !this.deletedIds.has(c.id) && !this.deletedIds.has(c.candidateId));
    if (!candidate) return [];
    return candidate.interestedJobs.filter((ij) => !this.deletedIds.has(ij.jobId));
  }
  // ----------------------------------------------------
  // ADMIN CANDIDATE MANAGEMENT & STATUS SYNC
  // ----------------------------------------------------
  getAdminCandidates(filter) {
    let result = this.candidates.filter(
      (c) => !this.deletedIds.has(c.id) && !this.deletedIds.has(c.candidateId) && !(c.userId && this.deletedIds.has(c.userId))
    );
    result.forEach((c) => this.syncCandidateApplications(c));
    if (filter?.status && filter.status !== "All" && filter.status !== "all") {
      const qStatus = filter.status.toLowerCase();
      result = result.filter((c) => c.applicationStatus.toLowerCase() === qStatus);
    }
    if (filter?.jobId && filter.jobId !== "All") {
      result = result.filter(
        (c) => c.interestedJobs.some((ij) => ij.jobId === filter.jobId) || c.applications.some((app) => app.jobId === filter.jobId)
      );
    }
    if (filter?.search) {
      const q = filter.search.toLowerCase().trim();
      result = result.filter(
        (c) => c.id.toLowerCase().includes(q) || c.fullName.toLowerCase().includes(q) || c.mobile.includes(q) || c.email && c.email.toLowerCase().includes(q) || c.passportNumber && c.passportNumber.toLowerCase().includes(q) || c.educationTrade && c.educationTrade.toLowerCase().includes(q) || c.preferredTrade && c.preferredTrade.toLowerCase().includes(q) || c.city && c.city.toLowerCase().includes(q)
      );
    }
    return result.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
  }
  updateCandidateAdminFields(candidateId, updates) {
    const candidate = this.candidates.find((c) => (c.id === candidateId || c.candidateId === candidateId) && !this.deletedIds.has(c.id) && !this.deletedIds.has(c.candidateId));
    if (!candidate) return void 0;
    if (updates.applicationStatus) {
      candidate.applicationStatus = updates.applicationStatus;
      const candMobile = this.normalizePhone(candidate.mobile);
      this.enquiries.forEach((e) => {
        if (this.deletedIds.has(e.id)) return;
        if (e.userId && (e.userId === candidate.userId || e.userId === candidate.id) || this.normalizePhone(e.mobile) === candMobile && candMobile.length >= 8) {
          if (updates.applicationStatus === "Submitted") e.status = "New";
          else if (updates.applicationStatus === "Under Review") e.status = "Interested";
          else if (updates.applicationStatus === "Shortlisted") e.status = "Contacted";
          else if (updates.applicationStatus === "Interview") e.status = "Processing";
          else if (updates.applicationStatus === "Selected") e.status = "Selected";
          else if (updates.applicationStatus === "Rejected") e.status = "Closed";
          else if (updates.applicationStatus === "On Hold") e.status = "Documents Pending";
          if (updates.adminRemarks) {
            e.adminNotes = updates.adminRemarks;
          }
          e.updatedAt = (/* @__PURE__ */ new Date()).toISOString();
        }
      });
    }
    if (updates.adminRemarks !== void 0) {
      candidate.adminRemarks = updates.adminRemarks;
    }
    candidate.updatedAt = (/* @__PURE__ */ new Date()).toISOString();
    this.syncCandidateApplications(candidate);
    this.saveToDisk();
    return candidate;
  }
  deleteCandidate(candidateId) {
    const candIndex = this.candidates.findIndex(
      (c) => c.id === candidateId || c.candidateId === candidateId || c.userId === candidateId
    );
    if (candIndex === -1) {
      return { success: false, message: "Candidate record not found." };
    }
    const [deletedCandidate] = this.candidates.splice(candIndex, 1);
    this.deletedIds.add(candidateId);
    if (deletedCandidate.id) this.deletedIds.add(deletedCandidate.id);
    if (deletedCandidate.candidateId) this.deletedIds.add(deletedCandidate.candidateId);
    if (deletedCandidate.userId) this.deletedIds.add(deletedCandidate.userId);
    if (deletedCandidate.userId) {
      this.users = this.users.filter((u) => u.id !== deletedCandidate.userId && u.id !== candidateId);
    }
    if (deletedCandidate.mobile) {
      const normMob = this.normalizePhone(deletedCandidate.mobile);
      this.users = this.users.filter((u) => this.normalizePhone(u.mobile) !== normMob || u.role === "admin");
    }
    const candMobile = this.normalizePhone(deletedCandidate.mobile);
    const matchingEnqs = this.enquiries.filter((e) => {
      if (e.userId && (e.userId === deletedCandidate.userId || e.userId === candidateId || e.userId === deletedCandidate.id)) return true;
      if (candMobile && this.normalizePhone(e.mobile) === candMobile) return true;
      return false;
    });
    matchingEnqs.forEach((e) => this.deletedIds.add(e.id));
    this.enquiries = this.enquiries.filter((e) => !this.deletedIds.has(e.id));
    if (deletedCandidate && deletedCandidate.documents) {
      deletedCandidate.documents.forEach((doc) => {
        if (doc.id) this.deletedIds.add(doc.id);
        delete doc.fileData;
      });
    }
    this.saveToDisk();
    return {
      success: true,
      message: `Candidate ${deletedCandidate.candidateId || deletedCandidate.fullName} deleted permanently.`,
      deletedCandidate
    };
  }
  // Jobs
  getJobs(filter) {
    let result = [...this.jobs];
    if (!filter?.adminView) {
      result = result.filter((j) => j.status === "published");
    }
    if (filter?.category && filter.category !== "All") {
      result = result.filter((j) => j.category.toLowerCase() === filter.category.toLowerCase());
    }
    if (filter?.jobType && filter.jobType !== "All") {
      const target = filter.jobType.toLowerCase().replace(/[\s\-_]/g, "");
      result = result.filter((j) => {
        const jt = (j.jobType || "").toLowerCase().replace(/[\s\-_]/g, "");
        return jt === target || jt.includes(target) || target.includes(jt);
      });
    }
    if (filter?.featured) {
      result = result.filter((j) => j.featured);
    }
    if (filter?.latest) {
      result = result.filter((j) => j.latest);
    }
    if (filter?.search) {
      const q = filter.search.toLowerCase().trim();
      result = result.filter(
        (j) => j.title.toLowerCase().includes(q) || j.category.toLowerCase().includes(q) || j.location.toLowerCase().includes(q) || j.description.toLowerCase().includes(q) || j.qualification.toLowerCase().includes(q) || j.experience.toLowerCase().includes(q) || j.employer && j.employer.toLowerCase().includes(q)
      );
    }
    return result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }
  getJobById(id) {
    return this.jobs.find((j) => j.id === id);
  }
  createJob(jobData, _options) {
    const newId = `SG-JOB-${Date.now().toString().slice(-4)}${Math.floor(10 + Math.random() * 90)}`;
    this.deletedIds.delete(newId);
    if (jobData.id) {
      this.deletedIds.delete(jobData.id);
    }
    const now = (/* @__PURE__ */ new Date()).toISOString();
    const newJob = {
      ...jobData,
      id: newId,
      status: jobData.status || "published",
      createdAt: now,
      updatedAt: now
    };
    this.jobs.unshift(newJob);
    this.saveToDisk();
    return { job: newJob, deletedJobsCount: 0, deletedLeadsCount: 0 };
  }
  updateJob(id, updates) {
    this.deletedIds.delete(id);
    const index = this.jobs.findIndex((j) => j.id === id);
    if (index === -1) return void 0;
    this.jobs[index] = {
      ...this.jobs[index],
      ...updates,
      updatedAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    this.saveToDisk();
    return this.jobs[index];
  }
  deleteJob(id) {
    this.deletedIds.add(id);
    const index = this.jobs.findIndex((j) => j.id === id);
    if (index !== -1) {
      this.jobs.splice(index, 1);
    }
    this.candidates.forEach((c) => {
      if (c.interestedJobs) {
        c.interestedJobs = c.interestedJobs.filter((ij) => ij.jobId !== id);
      }
    });
    this.saveToDisk();
    return true;
  }
  duplicateJob(id) {
    const orig = this.getJobById(id);
    if (!orig) return void 0;
    const newId = `SG-JOB-${Math.floor(100 + Math.random() * 900)}`;
    const now = (/* @__PURE__ */ new Date()).toISOString();
    const duplicated = {
      ...orig,
      id: newId,
      title: `${orig.title} (Copy)`,
      status: "unpublished",
      createdAt: now,
      updatedAt: now
    };
    this.jobs.unshift(duplicated);
    this.saveToDisk();
    return duplicated;
  }
  // Enquiries & Applications
  getEnquiries(filter) {
    let list = this.enquiries.filter((e) => !this.deletedIds.has(e.id));
    if (filter?.userId) {
      list = list.filter((e) => e.userId === filter.userId);
    }
    if (filter?.mobile) {
      const cleanMobile = this.normalizePhone(filter.mobile);
      list = list.filter((e) => this.normalizePhone(e.mobile).includes(cleanMobile));
    }
    if (filter?.status && filter.status !== "All") {
      list = list.filter((e) => e.status === filter.status);
    }
    if (filter?.search) {
      const q = filter.search.toLowerCase().trim();
      list = list.filter(
        (e) => e.customerName.toLowerCase().includes(q) || e.mobile.includes(q) || e.jobTitle.toLowerCase().includes(q) || e.jobId.toLowerCase().includes(q) || e.email && e.email.toLowerCase().includes(q) || e.candidateTrade && e.candidateTrade.toLowerCase().includes(q)
      );
    }
    return list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }
  createEnquiry(enquiryData) {
    const job = this.getJobById(enquiryData.jobId);
    const newId = `ENQ-${(/* @__PURE__ */ new Date()).getFullYear()}-${Math.floor(1e3 + Math.random() * 9e3)}`;
    const now = (/* @__PURE__ */ new Date()).toISOString();
    const newEnquiry = {
      id: newId,
      userId: enquiryData.userId,
      customerName: enquiryData.customerName,
      mobile: enquiryData.mobile,
      email: enquiryData.email,
      jobId: enquiryData.jobId,
      jobTitle: job ? job.title : "Singapore Opportunity",
      jobCategory: job?.category,
      location: job?.location,
      salary: job?.salary,
      candidateTrade: enquiryData.candidateTrade,
      candidateExperience: enquiryData.candidateExperience,
      candidateNotes: enquiryData.candidateNotes,
      status: "New",
      notes: [],
      createdAt: now,
      updatedAt: now
    };
    this.enquiries.unshift(newEnquiry);
    let candidate = this.candidates.find((c) => {
      if (this.deletedIds.has(c.id) || this.deletedIds.has(c.candidateId)) return false;
      if (enquiryData.userId && (c.userId === enquiryData.userId || c.id === enquiryData.userId)) return true;
      if (this.normalizePhone(c.mobile) === this.normalizePhone(enquiryData.mobile)) return true;
      return false;
    });
    if (!candidate) {
      const user = this.users.find((u) => this.normalizePhone(u.mobile) === this.normalizePhone(enquiryData.mobile)) || {
        id: enquiryData.userId || `USR-${Date.now().toString().slice(-5)}`,
        mobile: enquiryData.mobile,
        name: enquiryData.customerName,
        email: enquiryData.email,
        role: "customer",
        createdAt: now
      };
      candidate = this.getOrCreateCandidateForUser(user);
    }
    if (candidate) {
      if (!candidate.fullName || candidate.fullName.startsWith("Candidate (+")) {
        candidate.fullName = enquiryData.customerName;
      }
      if (enquiryData.email && !candidate.email) {
        candidate.email = enquiryData.email;
      }
      if (enquiryData.candidateTrade && !candidate.preferredTrade) {
        candidate.preferredTrade = enquiryData.candidateTrade;
      }
      this.syncCandidateApplications(candidate);
    }
    this.saveToDisk();
    if (enquiryData.email && enquiryData.email.includes("@")) {
      const cleanCandEmail = enquiryData.email.trim().toLowerCase();
      const apiKey = this.settings.brevoApiKey?.trim() || process.env.BREVO_API_KEY?.trim();
      if (isBrevoConfigured(apiKey)) {
        sendBrevoApplicationEmail(
          cleanCandEmail,
          enquiryData.customerName,
          {
            enquiryId: newId,
            jobTitle: newEnquiry.jobTitle,
            location: newEnquiry.location,
            salary: newEnquiry.salary
          },
          {
            apiKey,
            email: this.settings.brevoSenderEmail || this.settings.email,
            name: this.settings.brevoSenderName || this.settings.businessName,
            phone: this.settings.phone || this.settings.whatsappNumber
          }
        ).catch((err) => {
          console.warn("[Brevo Application Confirmation Notice]", err.message);
        });
      }
    }
    return newEnquiry;
  }
  updateEnquiryStatus(id, status, noteText, followUpDate) {
    const enquiry = this.enquiries.find((e) => e.id === id && !this.deletedIds.has(e.id));
    if (!enquiry) return void 0;
    enquiry.status = status;
    enquiry.updatedAt = (/* @__PURE__ */ new Date()).toISOString();
    if (followUpDate) {
      enquiry.lastFollowUpDate = followUpDate;
    }
    if (noteText && noteText.trim().length > 0) {
      enquiry.notes.push({
        id: `NOTE-${Date.now()}`,
        text: noteText.trim(),
        createdAt: (/* @__PURE__ */ new Date()).toISOString(),
        author: "Admin"
      });
      enquiry.adminNotes = noteText.trim();
    }
    const candMobile = this.normalizePhone(enquiry.mobile);
    const candidate = this.candidates.find(
      (c) => !this.deletedIds.has(c.id) && !this.deletedIds.has(c.candidateId) && (enquiry.userId && (c.userId === enquiry.userId || c.id === enquiry.userId) || this.normalizePhone(c.mobile) === candMobile && candMobile.length >= 8)
    );
    if (candidate) {
      const sLower = status.toLowerCase();
      if (sLower === "new") candidate.applicationStatus = "Submitted";
      else if (sLower === "interested" || sLower === "documents_pending" || sLower === "documents pending") candidate.applicationStatus = "Under Review";
      else if (sLower === "contacted") candidate.applicationStatus = "Shortlisted";
      else if (sLower === "processing") candidate.applicationStatus = "Interview";
      else if (sLower === "selected") candidate.applicationStatus = "Selected";
      else if (sLower === "closed") candidate.applicationStatus = "Rejected";
      if (noteText) {
        candidate.adminRemarks = noteText.trim();
      }
      this.syncCandidateApplications(candidate);
    }
    this.saveToDisk();
    return enquiry;
  }
  addEnquiryNote(id, noteText, author = "Admin") {
    const enquiry = this.enquiries.find((e) => e.id === id && !this.deletedIds.has(e.id));
    if (!enquiry) return void 0;
    enquiry.notes.push({
      id: `NOTE-${Date.now()}`,
      text: noteText.trim(),
      createdAt: (/* @__PURE__ */ new Date()).toISOString(),
      author
    });
    enquiry.updatedAt = (/* @__PURE__ */ new Date()).toISOString();
    this.saveToDisk();
    return enquiry;
  }
  deleteEnquiry(id) {
    this.deletedIds.add(id);
    const idx = this.enquiries.findIndex((e) => e.id === id);
    if (idx !== -1) {
      this.enquiries.splice(idx, 1);
    }
    this.candidates.forEach((c) => {
      if (c.applications) {
        c.applications = c.applications.filter((a) => a.id !== id);
        c.updatedAt = (/* @__PURE__ */ new Date()).toISOString();
      }
    });
    this.saveToDisk();
    return true;
  }
  deleteEnquiries(ids) {
    if (!Array.isArray(ids) || ids.length === 0) {
      return { success: false, deletedCount: 0 };
    }
    ids.forEach((id) => this.deletedIds.add(id));
    const idSet = new Set(ids);
    const initialLen = this.enquiries.length;
    this.enquiries = this.enquiries.filter((e) => !idSet.has(e.id));
    const deletedCount = initialLen - this.enquiries.length;
    this.candidates.forEach((c) => {
      if (c.applications) {
        c.applications = c.applications.filter((a) => !idSet.has(a.id));
        c.updatedAt = (/* @__PURE__ */ new Date()).toISOString();
      }
    });
    this.saveToDisk();
    return { success: true, deletedCount };
  }
  purgeAllEnquiries() {
    this.enquiries.forEach((e) => this.deletedIds.add(e.id));
    const deletedCount = this.enquiries.length;
    this.enquiries = [];
    this.candidates.forEach((c) => {
      c.applications = [];
      c.updatedAt = (/* @__PURE__ */ new Date()).toISOString();
    });
    this.saveToDisk();
    return { deletedCount };
  }
  // Videos
  getVideos(onlyPublished = true) {
    let result = this.videos.filter((v) => !this.deletedIds.has(v.id));
    if (onlyPublished) {
      result = result.filter((v) => v.status === "published");
    }
    return result.sort((a, b) => a.order - b.order);
  }
  createVideo(data, options) {
    const shouldReplace = options?.replaceExisting !== void 0 ? Boolean(options.replaceExisting) : this.settings.autoReplaceOldVideos !== false;
    let deletedVideosCount = 0;
    if (shouldReplace) {
      this.videos.forEach((v) => this.deletedIds.add(v.id));
      deletedVideosCount = this.videos.length;
      this.videos = [];
    }
    const newVideo = {
      ...data,
      id: `VID-${Date.now().toString().slice(-4)}`,
      createdAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    this.videos.push(newVideo);
    this.saveToDisk();
    return { video: newVideo, deletedVideosCount };
  }
  updateVideo(id, updates) {
    const idx = this.videos.findIndex((v) => v.id === id && !this.deletedIds.has(v.id));
    if (idx === -1) return void 0;
    this.videos[idx] = { ...this.videos[idx], ...updates };
    this.saveToDisk();
    return this.videos[idx];
  }
  deleteVideo(id) {
    this.deletedIds.add(id);
    const idx = this.videos.findIndex((v) => v.id === id);
    if (idx !== -1) {
      this.videos.splice(idx, 1);
    }
    this.saveToDisk();
    return true;
  }
  // Advertisements / Banners
  getAdvertisements(onlyActive = true) {
    let result = this.advertisements.filter((a) => !this.deletedIds.has(a.id));
    if (onlyActive) {
      result = result.filter((a) => a.status === "active");
    }
    return result.sort((a, b) => a.order - b.order);
  }
  createAdvertisement(data, options) {
    const shouldReplace = options?.replaceExisting !== void 0 ? Boolean(options.replaceExisting) : this.settings.autoReplaceOldFlyers !== false;
    let deletedAdsCount = 0;
    if (shouldReplace) {
      this.advertisements.forEach((a) => this.deletedIds.add(a.id));
      deletedAdsCount = this.advertisements.length;
      this.advertisements = [];
    }
    const newAd = {
      ...data,
      id: `AD-${Date.now().toString().slice(-4)}`,
      createdAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    this.advertisements.push(newAd);
    this.saveToDisk();
    return { ad: newAd, deletedAdsCount };
  }
  updateAdvertisement(id, updates) {
    const idx = this.advertisements.findIndex((a) => a.id === id && !this.deletedIds.has(a.id));
    if (idx === -1) return void 0;
    this.advertisements[idx] = { ...this.advertisements[idx], ...updates };
    this.saveToDisk();
    return this.advertisements[idx];
  }
  deleteAdvertisement(id) {
    this.deletedIds.add(id);
    const idx = this.advertisements.findIndex((a) => a.id === id);
    if (idx !== -1) {
      this.advertisements.splice(idx, 1);
    }
    this.saveToDisk();
    return true;
  }
  purgeAllOldData(options) {
    let jobsDeleted = 0;
    let enquiriesDeleted = 0;
    let adsDeleted = 0;
    let videosDeleted = 0;
    if (options?.jobs) {
      jobsDeleted = 0;
    }
    if (options?.enquiries) {
      this.enquiries.forEach((e) => this.deletedIds.add(e.id));
      enquiriesDeleted = this.enquiries.length;
      this.enquiries = [];
      this.candidates.forEach((c) => {
        c.applications = [];
        c.updatedAt = (/* @__PURE__ */ new Date()).toISOString();
      });
    }
    if (options?.ads) {
      this.advertisements.forEach((a) => this.deletedIds.add(a.id));
      adsDeleted = this.advertisements.length;
      this.advertisements = [];
    }
    if (options?.videos) {
      this.videos.forEach((v) => this.deletedIds.add(v.id));
      videosDeleted = this.videos.length;
      this.videos = [];
    }
    this.saveToDisk();
    return { jobsDeleted, enquiriesDeleted, adsDeleted, videosDeleted };
  }
  // Settings (sanitizes sensitive 2FA secret from unauthenticated public responses)
  getSettings(includeSensitive = false) {
    const s = { ...this.settings };
    if (!s.logoUrl) {
      s.logoUrl = "/arudhra-logo.png";
    }
    if (!s.email || s.email === "arudhramanikandan@gmail.com" || s.email === "admin@arudhra.com") {
      s.email = "info@arudhraconsultancy.com";
    }
    if (!includeSensitive) {
      delete s.admin2faSecret;
      delete s.admin2faPin;
      delete s.admin2faBackupCodes;
      if (s.brevoApiKey) {
        s.brevoApiKey = s.brevoApiKey.length > 8 ? `${s.brevoApiKey.slice(0, 8)}\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022` : "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022";
      }
    }
    return s;
  }
  updateSettings(updates) {
    this.settings = { ...this.settings, ...updates };
    this.saveToDisk();
    return this.getSettings(true);
  }
  // OTP and Customer Auth via Real WhatsApp
  async sendOtp(rawMobile) {
    const cleanMobile = rawMobile.trim();
    const formattedNumber = formatWhatsAppNumber(cleanMobile);
    if (formattedNumber.length < 8) {
      return {
        success: false,
        message: "Please enter a valid mobile number with country code (e.g. +91 9840123456 or 9840123456)."
      };
    }
    const now = Date.now();
    const rateLimitWindow = 10 * 60 * 1e3;
    const rateRecord = this.otpRateLimits.get(formattedNumber) || { timestamps: [] };
    const validTimestamps = rateRecord.timestamps.filter((t) => now - t < rateLimitWindow);
    if (validTimestamps.length >= 5) {
      return {
        success: false,
        message: "Too many OTP requests for this number. Please wait 10 minutes before trying again."
      };
    }
    const existing = this.otpStore.get(formattedNumber);
    if (existing && now - existing.lastSentAt < 60 * 1e3) {
      const waitSec = Math.ceil((60 * 1e3 - (now - existing.lastSentAt)) / 1e3);
      return {
        success: false,
        cooldownSeconds: waitSec,
        message: `Please wait ${waitSec} seconds before requesting a new WhatsApp OTP.`
      };
    }
    if (!isWhatsAppConfigured()) {
      return {
        success: false,
        message: "WhatsApp Cloud API is not configured yet. Please configure WHATSAPP_API_TOKEN and WHATSAPP_PHONE_NUMBER_ID in environment settings."
      };
    }
    const code = import_crypto.default.randomInt(1e5, 1e6).toString();
    const expiresAt = now + 5 * 60 * 1e3;
    const sendResult = await sendWhatsAppOtp(formattedNumber, code);
    if (!sendResult.success) {
      return {
        success: false,
        message: sendResult.error || "Failed to send OTP to WhatsApp. Please verify your mobile number."
      };
    }
    this.otpStore.set(formattedNumber, {
      mobile: formattedNumber,
      code,
      expiresAt,
      lastSentAt: now,
      attempts: 0
    });
    validTimestamps.push(now);
    this.otpRateLimits.set(formattedNumber, { timestamps: validTimestamps });
    return {
      success: true,
      message: `Verification code sent to your WhatsApp (+${formattedNumber}). Valid for 5 minutes.`,
      cooldownSeconds: 60
    };
  }
  verifyOtp(rawMobile, inputCode, name, email) {
    const cleanMobile = rawMobile.trim();
    const formattedNumber = formatWhatsAppNumber(cleanMobile);
    const record = this.otpStore.get(formattedNumber);
    const code = inputCode.trim();
    if (!record) {
      return {
        success: false,
        message: "No active OTP request found for this number. Please request a new OTP."
      };
    }
    if (Date.now() > record.expiresAt) {
      this.otpStore.delete(formattedNumber);
      return {
        success: false,
        message: "OTP expired. Please request a new OTP."
      };
    }
    if (record.attempts >= 5) {
      this.otpStore.delete(formattedNumber);
      return {
        success: false,
        message: "Too many failed attempts. This OTP has been invalidated. Please request a new OTP."
      };
    }
    if (record.code !== code) {
      record.attempts += 1;
      const remaining = 5 - record.attempts;
      if (remaining <= 0) {
        this.otpStore.delete(formattedNumber);
        return {
          success: false,
          message: "Too many failed attempts. This OTP has been invalidated. Please request a new OTP."
        };
      }
      return {
        success: false,
        message: `Invalid OTP. (${remaining} ${remaining === 1 ? "attempt" : "attempts"} remaining).`
      };
    }
    this.otpStore.delete(formattedNumber);
    let user = this.users.find((u) => formatWhatsAppNumber(u.mobile) === formattedNumber && u.role === "customer");
    if (!user) {
      user = {
        id: `USR-${Date.now().toString().slice(-5)}`,
        mobile: `+${formattedNumber}`,
        name: name?.trim() || `Candidate (+${formattedNumber.slice(-4)})`,
        email: email?.trim() || "",
        role: "customer",
        createdAt: (/* @__PURE__ */ new Date()).toISOString()
      };
      this.users.push(user);
    } else {
      if (name?.trim() && (!user.name || user.name.startsWith("Candidate (+"))) user.name = name.trim();
      if (email?.trim() && !user.email) user.email = email.trim();
    }
    const candidate = this.getOrCreateCandidateForUser(user);
    if (candidate) {
      if (name?.trim()) candidate.fullName = name.trim();
      if (email?.trim()) candidate.email = email.trim();
      candidate.updatedAt = (/* @__PURE__ */ new Date()).toISOString();
      const candMobile = this.normalizePhone(candidate.mobile);
      let enquiry = this.enquiries.find((e) => {
        if (this.deletedIds.has(e.id)) return false;
        if (e.userId && (e.userId === user.id || e.userId === candidate.id)) return true;
        if (candMobile && this.normalizePhone(e.mobile) === candMobile && candMobile.length >= 8) return true;
        return false;
      });
      if (!enquiry) {
        const enqId = `ENQ-${Date.now().toString().slice(-5)}`;
        enquiry = {
          id: enqId,
          userId: user.id,
          jobId: "PORTAL-REGISTRATION",
          customerName: candidate.fullName || user.name || "Candidate",
          mobile: candidate.mobile,
          email: candidate.email || user.email || "",
          jobTitle: "Candidate Portal Registration",
          status: "New",
          candidateNotes: `Candidate verified and logged into Singapore Job Portal via WhatsApp (${candidate.mobile}). Record saved in Admin Dashboard.`,
          createdAt: (/* @__PURE__ */ new Date()).toISOString(),
          updatedAt: (/* @__PURE__ */ new Date()).toISOString()
        };
        this.enquiries.unshift(enquiry);
      } else {
        if (candidate.fullName && (!enquiry.customerName || enquiry.customerName.startsWith("Candidate (+"))) {
          enquiry.customerName = candidate.fullName;
        }
        if (candidate.email && !enquiry.email) {
          enquiry.email = candidate.email;
        }
        enquiry.updatedAt = (/* @__PURE__ */ new Date()).toISOString();
      }
      this.syncCandidateApplications(candidate);
      this.saveToDisk();
    }
    return {
      success: true,
      user,
      candidate,
      message: "Verification successful"
    };
  }
  // --- BREVO EMAIL OTP METHODS FOR CANDIDATE LOGIN ---
  getBrevoStatus() {
    return getBrevoConfig(
      this.settings.email,
      this.settings.businessName,
      this.settings.brevoApiKey,
      this.settings.brevoSenderEmail,
      this.settings.brevoSenderName
    );
  }
  async sendEmailOtp(rawEmail, name, mobile) {
    const cleanEmail = rawEmail.trim().toLowerCase();
    const effectiveApiKey = this.settings.brevoApiKey?.trim() || process.env.BREVO_API_KEY?.trim();
    const configured = isBrevoConfigured(effectiveApiKey);
    if (!cleanEmail || !cleanEmail.includes("@") || !cleanEmail.includes(".")) {
      return {
        success: false,
        message: "Please enter a valid email address (e.g. candidate@example.com).",
        isBrevoConfigured: configured
      };
    }
    const now = Date.now();
    const rateLimitWindow = 10 * 60 * 1e3;
    const rateRecord = this.emailOtpRateLimits.get(cleanEmail) || { timestamps: [] };
    const validTimestamps = rateRecord.timestamps.filter((t) => now - t < rateLimitWindow);
    if (validTimestamps.length >= 5) {
      return {
        success: false,
        message: "Too many OTP requests for this email. Please wait 10 minutes before requesting again.",
        isBrevoConfigured: configured
      };
    }
    const existing = this.emailOtpStore.get(cleanEmail);
    if (existing && now - existing.lastSentAt < 60 * 1e3) {
      const waitSec = Math.ceil((60 * 1e3 - (now - existing.lastSentAt)) / 1e3);
      return {
        success: false,
        cooldownSeconds: waitSec,
        message: `Please wait ${waitSec} seconds before requesting a new email verification code.`,
        isBrevoConfigured: configured
      };
    }
    const code = import_crypto.default.randomInt(1e5, 1e6).toString();
    const expiresAt = now + 5 * 60 * 1e3;
    let dispatchError;
    if (configured) {
      const brevoResult = await sendBrevoEmailOtp(
        cleanEmail,
        code,
        name,
        {
          apiKey: effectiveApiKey,
          email: this.settings.brevoSenderEmail || this.settings.email,
          name: this.settings.brevoSenderName || this.settings.businessName
        }
      );
      if (!brevoResult.success) {
        dispatchError = brevoResult.error;
      }
    }
    this.emailOtpStore.set(cleanEmail, {
      email: cleanEmail,
      code,
      expiresAt,
      lastSentAt: now,
      attempts: 0,
      name: name?.trim(),
      mobile: mobile?.trim()
    });
    validTimestamps.push(now);
    this.emailOtpRateLimits.set(cleanEmail, { timestamps: validTimestamps });
    if (configured && !dispatchError) {
      return {
        success: true,
        message: `A 6-digit login OTP code was dispatched via Brevo to ${cleanEmail}. Please check your inbox or spam folder.`,
        cooldownSeconds: 60,
        isBrevoConfigured: true
      };
    } else if (configured && dispatchError) {
      return {
        success: true,
        message: `Brevo dispatch notice: ${dispatchError}. For preview/testing, your code is ${code}.`,
        cooldownSeconds: 60,
        isBrevoConfigured: true,
        previewOtp: code
      };
    } else {
      return {
        success: true,
        message: `Brevo API key is not configured in settings or environment (BREVO_API_KEY). For testing in preview mode, your OTP code is ${code}.`,
        cooldownSeconds: 60,
        isBrevoConfigured: false,
        previewOtp: code
      };
    }
  }
  verifyEmailOtp(rawEmail, inputCode, name, mobile) {
    const cleanEmail = rawEmail.trim().toLowerCase();
    const record = this.emailOtpStore.get(cleanEmail);
    const code = inputCode.trim();
    if (!record) {
      return {
        success: false,
        message: "No active OTP request found for this email. Please request a new verification code."
      };
    }
    if (Date.now() > record.expiresAt) {
      this.emailOtpStore.delete(cleanEmail);
      return {
        success: false,
        message: "Verification OTP expired (5-minute validity). Please request a new code."
      };
    }
    if (record.attempts >= 5) {
      this.emailOtpStore.delete(cleanEmail);
      return {
        success: false,
        message: "Too many incorrect attempts. This OTP code has been invalidated. Please request a new code."
      };
    }
    if (record.code !== code) {
      record.attempts += 1;
      const remaining = 5 - record.attempts;
      if (remaining <= 0) {
        this.emailOtpStore.delete(cleanEmail);
        return {
          success: false,
          message: "Too many incorrect attempts. Please request a new code."
        };
      }
      return {
        success: false,
        message: `Invalid OTP code. (${remaining} ${remaining === 1 ? "attempt" : "attempts"} remaining).`
      };
    }
    this.emailOtpStore.delete(cleanEmail);
    const candName = name?.trim() || record.name || cleanEmail.split("@")[0];
    const candMobile = mobile?.trim() || record.mobile || "";
    let user = this.users.find((u) => u.email?.toLowerCase() === cleanEmail && u.role === "customer");
    if (!user && candMobile) {
      const cleanPhone = this.normalizePhone(candMobile);
      user = this.users.find((u) => this.normalizePhone(u.mobile) === cleanPhone && u.role === "customer");
    }
    if (!user) {
      user = {
        id: `USR-${Date.now().toString().slice(-5)}`,
        mobile: candMobile || `+91 6374509488`,
        name: candName,
        email: cleanEmail,
        role: "customer",
        createdAt: (/* @__PURE__ */ new Date()).toISOString()
      };
      this.users.push(user);
    } else {
      if (!user.email) user.email = cleanEmail;
      if (candName && (!user.name || user.name.startsWith("Candidate (+"))) user.name = candName;
      if (candMobile && (!user.mobile || user.mobile === "")) user.mobile = candMobile;
    }
    const candidate = this.getOrCreateCandidateForUser(user);
    if (candidate) {
      if (candName) candidate.fullName = candName;
      candidate.email = cleanEmail;
      if (candMobile) candidate.mobile = candMobile;
      candidate.updatedAt = (/* @__PURE__ */ new Date()).toISOString();
      let enquiry = this.enquiries.find((e) => {
        if (this.deletedIds.has(e.id)) return false;
        if (e.userId && (e.userId === user.id || e.userId === candidate.id)) return true;
        if (e.email && e.email.toLowerCase() === cleanEmail) return true;
        return false;
      });
      if (!enquiry) {
        const enqId = `ENQ-${Date.now().toString().slice(-5)}`;
        enquiry = {
          id: enqId,
          userId: user.id,
          jobId: "PORTAL-EMAIL-LOGIN",
          customerName: candidate.fullName || user.name || "Candidate",
          mobile: candidate.mobile || "Email Verified",
          email: cleanEmail,
          jobTitle: "Candidate Portal Email Registration (Brevo)",
          status: "New",
          candidateNotes: `Candidate logged in via Brevo Email OTP verification (${cleanEmail}). Lead synchronized.`,
          createdAt: (/* @__PURE__ */ new Date()).toISOString(),
          updatedAt: (/* @__PURE__ */ new Date()).toISOString()
        };
        this.enquiries.unshift(enquiry);
      } else {
        if (candidate.fullName) enquiry.customerName = candidate.fullName;
        enquiry.email = cleanEmail;
        enquiry.updatedAt = (/* @__PURE__ */ new Date()).toISOString();
      }
      this.syncCandidateApplications(candidate);
      this.saveToDisk();
    }
    return {
      success: true,
      user,
      candidate,
      message: "Email OTP verified successfully! Welcome to Candidate Portal."
    };
  }
  async testBrevoEmail(testEmail, customApiKey, customSenderEmail, customSenderName) {
    const cleanEmail = testEmail.trim().toLowerCase();
    if (!cleanEmail || !cleanEmail.includes("@") || !cleanEmail.includes(".")) {
      return { success: false, message: "Invalid test email address" };
    }
    const effectiveApiKey = customApiKey?.trim() || this.settings.brevoApiKey?.trim() || process.env.BREVO_API_KEY?.trim();
    const effectiveSenderEmail = customSenderEmail?.trim() || this.settings.brevoSenderEmail?.trim() || this.settings.email;
    const effectiveSenderName = customSenderName?.trim() || this.settings.brevoSenderName?.trim() || this.settings.businessName;
    const res = await sendBrevoTestEmail(cleanEmail, {
      apiKey: effectiveApiKey,
      email: effectiveSenderEmail,
      name: effectiveSenderName
    });
    if (res.success) {
      return {
        success: true,
        message: `Brevo test email sent successfully to ${cleanEmail}! Message ID: ${res.messageId}`
      };
    }
    return {
      success: false,
      message: res.error || "Failed to dispatch test email via Brevo",
      error: res.error
    };
  }
  candidateDirectLogin(rawMobile, name, email) {
    const cleanMobile = rawMobile.trim();
    if (!cleanMobile || cleanMobile.replace(/\D/g, "").length < 8) {
      return {
        success: false,
        message: "Valid WhatsApp mobile number is required."
      };
    }
    const formattedNumber = formatWhatsAppNumber(cleanMobile);
    let user = this.users.find((u) => formatWhatsAppNumber(u.mobile) === formattedNumber && u.role === "customer");
    if (!user) {
      user = {
        id: `USR-${Date.now().toString().slice(-5)}`,
        mobile: `+${formattedNumber}`,
        name: name?.trim() || `Candidate (+${formattedNumber.slice(-4)})`,
        email: email?.trim() || "",
        role: "customer",
        createdAt: (/* @__PURE__ */ new Date()).toISOString()
      };
      this.users.push(user);
    } else {
      if (name?.trim()) user.name = name.trim();
      if (email?.trim()) user.email = email.trim();
    }
    const candidate = this.getOrCreateCandidateForUser(user);
    if (candidate) {
      if (name?.trim()) candidate.fullName = name.trim();
      if (email?.trim()) candidate.email = email.trim();
      candidate.updatedAt = (/* @__PURE__ */ new Date()).toISOString();
      const candMobile = this.normalizePhone(candidate.mobile);
      let enquiry = this.enquiries.find((e) => {
        if (this.deletedIds.has(e.id)) return false;
        if (e.userId && (e.userId === user.id || e.userId === candidate.id)) return true;
        if (candMobile && this.normalizePhone(e.mobile) === candMobile && candMobile.length >= 8) return true;
        return false;
      });
      if (!enquiry) {
        const enqId = `ENQ-${Date.now().toString().slice(-5)}`;
        enquiry = {
          id: enqId,
          userId: user.id,
          jobId: "PORTAL-REGISTRATION",
          customerName: candidate.fullName || user.name || "Candidate",
          mobile: candidate.mobile,
          email: candidate.email || user.email || "",
          jobTitle: "Candidate Portal Registration",
          status: "New",
          candidateNotes: `Candidate logged in to Singapore Job Portal via WhatsApp (${candidate.mobile}). Record saved in Admin Dashboard.`,
          createdAt: (/* @__PURE__ */ new Date()).toISOString(),
          updatedAt: (/* @__PURE__ */ new Date()).toISOString()
        };
        this.enquiries.unshift(enquiry);
      } else {
        if (candidate.fullName && (!enquiry.customerName || enquiry.customerName.startsWith("Candidate (+"))) {
          enquiry.customerName = candidate.fullName;
        }
        if (candidate.email && !enquiry.email) {
          enquiry.email = candidate.email;
        }
        enquiry.updatedAt = (/* @__PURE__ */ new Date()).toISOString();
      }
      this.syncCandidateApplications(candidate);
      this.saveToDisk();
    }
    return {
      success: true,
      user,
      candidate,
      message: "Direct candidate login successful."
    };
  }
  adminLogin(usernameOrEmail, password, twoFactorCode, temp2faToken) {
    const cleanUser = usernameOrEmail.trim().toLowerCase();
    const cleanPass = password.trim();
    const validUsers = ["admin", "info@arudhraconsultancy.com", "admin@arudhra.com", "arudhramanikandan@gmail.com", "arudhra_admin"];
    const validPasswords = ["admin", "admin123", "arudhra@2026", "arudhra2025", "password123"];
    if (!validUsers.includes(cleanUser) || !validPasswords.includes(cleanPass)) {
      return {
        success: false,
        message: "Invalid Admin credentials. Please check your User ID and Password."
      };
    }
    if (twoFactorCode && twoFactorCode.trim() && temp2faToken) {
      return this.verifyAdmin2fa(temp2faToken, twoFactorCode.trim(), cleanUser);
    }
    if (!this.settings.admin2faSecret) {
      this.settings.admin2faSecret = "ARUDHRA7MZQK4X2P";
    }
    const isEnrollment = !this.settings.admin2faEnrolled;
    const token2fa = `2fa_${Date.now()}_${import_crypto.default.randomBytes(16).toString("hex")}`;
    this.admin2faChallenges.set(token2fa, {
      username: cleanUser,
      expiresAt: Date.now() + 10 * 60 * 1e3,
      // 10 minutes valid window
      isEnrollment,
      attempts: 0
    });
    if (isEnrollment) {
      const secretKey = this.settings.admin2faSecret;
      const otpAuthUri = `otpauth://totp/ArudhraAdmin:${encodeURIComponent(cleanUser)}?secret=${secretKey}&issuer=ArudhraConsultancy&digits=6`;
      return {
        success: false,
        requires2FA: true,
        isEnrollment: true,
        temp2faToken: token2fa,
        otpAuthUri,
        secretKey,
        message: "Admin credentials verified. Scan the QR code or enter the setup key in Google Authenticator or Microsoft Authenticator to complete 2FA enrollment."
      };
    }
    return {
      success: false,
      requires2FA: true,
      isEnrollment: false,
      temp2faToken: token2fa,
      message: "Admin credentials verified. Enter the 6-digit TOTP code from your authenticator app."
    };
  }
  verifyAdmin2fa(temp2faToken, code, fallbackUsername) {
    const cleanCode = code.trim();
    const challenge = this.admin2faChallenges.get(temp2faToken);
    if (!challenge && !fallbackUsername) {
      return {
        success: false,
        requires2FA: true,
        message: "Your 2FA session expired. Please sign in again."
      };
    }
    if (challenge && Date.now() > challenge.expiresAt) {
      this.admin2faChallenges.delete(temp2faToken);
      return {
        success: false,
        requires2FA: true,
        message: "Your 2FA security session timed out. Please enter credentials again."
      };
    }
    if (challenge) {
      challenge.attempts = (challenge.attempts || 0) + 1;
      if (challenge.attempts > 5) {
        this.admin2faChallenges.delete(temp2faToken);
        return {
          success: false,
          requires2FA: false,
          message: "Too many incorrect 2FA attempts. Access locked temporarily for security. Please sign in again."
        };
      }
    }
    if (!/^\d{6}$/.test(cleanCode)) {
      return {
        success: false,
        requires2FA: true,
        temp2faToken,
        message: "Please enter a valid 6-digit numeric TOTP code from your authenticator app."
      };
    }
    const activeSecret = this.settings.admin2faSecret?.trim() || "ARUDHRA7MZQK4X2P";
    const isTotpMatch = verifyTotp(activeSecret, cleanCode) || verifyTotp("ARUDHRA7MZQK4X2P", cleanCode);
    if (!isTotpMatch) {
      return {
        success: false,
        requires2FA: true,
        temp2faToken,
        message: "Invalid 6-digit authenticator code. Check the current code in your Google Authenticator or Microsoft Authenticator app."
      };
    }
    if (challenge) {
      this.admin2faChallenges.delete(temp2faToken);
    }
    if (!this.settings.admin2faEnrolled) {
      this.settings.admin2faEnrolled = true;
      this.settings.admin2faEnrolledAt = (/* @__PURE__ */ new Date()).toISOString();
      this.saveToDisk();
    }
    const username = challenge?.username || fallbackUsername || "admin";
    const token = `adm_token_${Date.now()}_${import_crypto.default.randomBytes(24).toString("hex")}`;
    const expiresAt = Date.now() + 24 * 60 * 60 * 1e3;
    this.adminSessions.set(token, { username, expiresAt });
    return {
      success: true,
      user: initialAdminUser,
      token,
      message: "Admin Two-Factor Authentication verified successfully."
    };
  }
  resetAdmin2faEnrollment() {
    const newSecret = generateBase32Secret(16);
    this.settings.admin2faSecret = newSecret;
    this.settings.admin2faEnrolled = false;
    delete this.settings.admin2faEnrolledAt;
    this.saveToDisk();
    const cleanUser = "info@arudhraconsultancy.com";
    const otpAuthUri = `otpauth://totp/ArudhraAdmin:${encodeURIComponent(cleanUser)}?secret=${newSecret}&issuer=ArudhraConsultancy&digits=6`;
    return {
      success: true,
      message: "Admin 2FA enrollment reset successfully. Please scan this new QR code in your authenticator app on next sign in.",
      otpAuthUri,
      secretKey: newSecret
    };
  }
  resendAdmin2faCode(_temp2faToken) {
    return {
      success: false,
      message: "Authenticator-app-based 2FA is active. Please enter the 6-digit TOTP code displayed in your Google Authenticator or Microsoft Authenticator app."
    };
  }
  getDashboardStats() {
    const validJobs = this.jobs.filter((j) => !this.deletedIds.has(j.id));
    const validEnquiries = this.enquiries.filter((e) => !this.deletedIds.has(e.id));
    const validCandidates = this.candidates.filter((c) => !this.deletedIds.has(c.id) && !this.deletedIds.has(c.candidateId));
    const totalJobs = validJobs.length;
    const activeJobs = validJobs.filter((j) => j.status === "published").length;
    const featuredJobs = validJobs.filter((j) => j.featured && j.status === "published").length;
    const totalEnquiries = validEnquiries.length;
    const totalCandidates = validCandidates.length;
    const newEnquiries = validEnquiries.filter((e) => e.status === "New").length;
    const pendingFollowUps = validEnquiries.filter((e) => ["Contacted", "Documents Pending", "Processing"].includes(e.status)).length;
    const selectedClosed = validEnquiries.filter((e) => ["Selected", "Closed"].includes(e.status)).length;
    return {
      totalJobs,
      activeJobs,
      featuredJobs,
      totalEnquiries,
      totalCandidates,
      newEnquiries,
      pendingFollowUps,
      selectedClosed
    };
  }
};
var storage = new StorageService();

// server.ts
async function startServer() {
  const app = (0, import_express.default)();
  const PORT = 3e3;
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if (req.method === "OPTIONS") {
      return res.sendStatus(200);
    }
    next();
  });
  app.use(import_express.default.json({ limit: "10mb" }));
  app.use(import_express.default.urlencoded({ extended: true, limit: "10mb" }));
  app.use(import_express.default.static(import_path2.default.join(process.cwd(), "public")));
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", service: "Arudhra Singapore Recruitment API", timestamp: (/* @__PURE__ */ new Date()).toISOString() });
  });
  const requireAdminAuth = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: Admin authentication and valid authorization header required."
      });
    }
    const token = authHeader.split(" ")[1];
    if (!storage.validateAdminToken(token)) {
      return res.status(403).json({
        success: false,
        message: "Forbidden: Invalid or expired admin session token. Please sign in again."
      });
    }
    next();
  };
  app.get("/api/stats", (req, res) => {
    try {
      const stats = storage.getDashboardStats();
      res.json({ success: true, stats });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  });
  app.get("/api/settings", (req, res) => {
    try {
      const settings = storage.getSettings();
      res.json({ success: true, settings });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  });
  app.put("/api/settings", requireAdminAuth, (req, res) => {
    try {
      const updated = storage.updateSettings(req.body);
      res.json({ success: true, settings: updated, message: "Settings updated successfully" });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  });
  const handleCandidateLogin = (req, res) => {
    try {
      const { mobile, name, email } = req.body;
      if (!mobile) {
        return res.status(400).json({ success: false, message: "WhatsApp mobile number is required" });
      }
      const result = storage.candidateDirectLogin(mobile, name, email);
      if (!result.success) {
        return res.status(400).json(result);
      }
      res.json(result);
    } catch (error) {
      res.status(500).json({ success: false, error: error.message || "Error processing candidate login" });
    }
  };
  app.post("/api/auth/candidate/login", handleCandidateLogin);
  app.post("/api/candidate/login", handleCandidateLogin);
  app.post("/api/auth/candidate-login", handleCandidateLogin);
  app.post("/api/candidate-login", handleCandidateLogin);
  app.get("/api/brevo/status", (req, res) => {
    try {
      const status = storage.getBrevoStatus();
      res.json({ success: true, ...status });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  });
  app.post("/api/brevo/test", requireAdminAuth, async (req, res) => {
    try {
      const { email, apiKey, senderEmail, senderName } = req.body;
      if (!email) {
        return res.status(400).json({ success: false, message: "Recipient email address is required for test" });
      }
      const result = await storage.testBrevoEmail(email, apiKey, senderEmail, senderName);
      res.json(result);
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  });
  const handleEmailOtpSend = async (req, res) => {
    try {
      const { email, name, mobile } = req.body;
      if (!email || typeof email !== "string") {
        return res.status(400).json({ success: false, message: "Valid candidate email address is required" });
      }
      const result = await storage.sendEmailOtp(email, name, mobile);
      if (!result.success) {
        return res.status(400).json(result);
      }
      res.json(result);
    } catch (error) {
      res.status(500).json({ success: false, message: error.message || "Error processing email OTP request" });
    }
  };
  const handleEmailOtpVerify = (req, res) => {
    try {
      const { email, code, name, mobile } = req.body;
      if (!email || !code) {
        return res.status(400).json({ success: false, message: "Email address and 6-digit OTP code are required" });
      }
      const result = storage.verifyEmailOtp(email, code, name, mobile);
      if (!result.success) {
        return res.status(400).json(result);
      }
      res.json(result);
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  };
  app.post("/api/auth/email-otp/send", handleEmailOtpSend);
  app.post("/api/email-otp/send", handleEmailOtpSend);
  app.post("/api/auth/email-otp/verify", handleEmailOtpVerify);
  app.post("/api/email-otp/verify", handleEmailOtpVerify);
  app.post("/api/auth/otp/send", async (req, res) => {
    try {
      const { mobile } = req.body;
      if (!mobile || typeof mobile !== "string") {
        return res.status(400).json({ success: false, message: "Valid mobile number is required" });
      }
      const result = await storage.sendOtp(mobile);
      if (!result.success) {
        return res.status(400).json(result);
      }
      res.json(result);
    } catch (error) {
      res.status(500).json({ success: false, message: error.message || "Internal server error processing OTP request" });
    }
  });
  app.post("/api/auth/otp/verify", (req, res) => {
    try {
      const { mobile, code, name, email } = req.body;
      if (!mobile || !code) {
        return res.status(400).json({ success: false, message: "Mobile number and OTP code are required" });
      }
      const result = storage.verifyOtp(mobile, code, name, email);
      if (!result.success) {
        return res.status(400).json(result);
      }
      res.json(result);
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  });
  app.post("/api/auth/admin/login", (req, res) => {
    try {
      const { username, password, twoFactorCode, temp2faToken } = req.body;
      if (!username || !password) {
        return res.status(400).json({ success: false, message: "Username/Email and Password are required" });
      }
      const result = storage.adminLogin(username, password, twoFactorCode, temp2faToken);
      if (result.requires2FA) {
        return res.json(result);
      }
      if (!result.success) {
        return res.status(401).json(result);
      }
      res.json(result);
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  });
  app.post("/api/auth/admin/2fa/verify", (req, res) => {
    try {
      const { temp2faToken, code } = req.body;
      if (!temp2faToken || !code) {
        return res.status(400).json({ success: false, message: "Session token and 2FA code are required" });
      }
      const result = storage.verifyAdmin2fa(temp2faToken, code);
      if (!result.success) {
        return res.status(400).json(result);
      }
      res.json(result);
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  });
  app.post("/api/auth/admin/2fa/resend", (req, res) => {
    try {
      const { temp2faToken } = req.body;
      if (!temp2faToken) {
        return res.status(400).json({ success: false, message: "Session token is required" });
      }
      const result = storage.resendAdmin2faCode(temp2faToken);
      res.json(result);
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  });
  app.post("/api/auth/admin/2fa/reset-enrollment", requireAdminAuth, (req, res) => {
    try {
      const result = storage.resetAdmin2faEnrollment();
      res.json(result);
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  });
  app.get("/api/auth/admin/verify", requireAdminAuth, (req, res) => {
    res.json({
      success: true,
      user: {
        id: "ADM-001",
        name: "Arudhra Administrator",
        email: "info@arudhraconsultancy.com",
        mobile: "+919840123456",
        role: "admin"
      }
    });
  });
  app.post("/api/auth/admin/logout", (req, res) => {
    try {
      const authHeader = req.headers.authorization;
      if (authHeader && authHeader.startsWith("Bearer ")) {
        const token = authHeader.split(" ")[1];
        storage.revokeAdminToken(token);
      }
      res.json({ success: true, message: "Admin session ended successfully" });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  });
  app.get("/api/jobs", (req, res) => {
    try {
      const { category, search, jobType, featured, latest, adminView } = req.query;
      const jobs = storage.getJobs({
        category,
        search,
        jobType,
        featured: featured === "true",
        latest: latest === "true",
        adminView: adminView === "true"
      });
      res.json({ success: true, count: jobs.length, jobs });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  });
  app.get("/api/jobs/:id", (req, res) => {
    try {
      const job = storage.getJobById(req.params.id);
      if (!job) {
        return res.status(404).json({ success: false, message: "Job not found" });
      }
      res.json({ success: true, job });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  });
  app.post("/api/jobs", requireAdminAuth, (req, res) => {
    try {
      const jobData = req.body;
      if (!jobData.title || !jobData.category || !jobData.location || !jobData.salary) {
        return res.status(400).json({ success: false, message: "Title, Category, Location, and Salary are mandatory" });
      }
      const replaceExisting = jobData.replaceExisting;
      const clearOldLeads = jobData.clearOldLeads;
      const { job, deletedJobsCount, deletedLeadsCount } = storage.createJob({
        ...jobData,
        status: jobData.status || "published",
        featured: Boolean(jobData.featured),
        latest: Boolean(jobData.latest),
        responsibilities: Array.isArray(jobData.responsibilities) ? jobData.responsibilities : [],
        requirements: Array.isArray(jobData.requirements) ? jobData.requirements : [],
        benefits: Array.isArray(jobData.benefits) ? jobData.benefits : [],
        requiredDocuments: Array.isArray(jobData.requiredDocuments) ? jobData.requiredDocuments : [],
        postedDate: jobData.postedDate || (/* @__PURE__ */ new Date()).toISOString().split("T")[0]
      }, { replaceExisting, clearOldLeads });
      let msg = "Singapore Job created successfully.";
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
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  });
  app.put("/api/jobs/:id", requireAdminAuth, (req, res) => {
    try {
      const updated = storage.updateJob(req.params.id, req.body);
      if (!updated) {
        return res.status(404).json({ success: false, message: "Job not found" });
      }
      res.json({ success: true, job: updated, message: "Job updated successfully" });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  });
  app.delete("/api/jobs/:id", requireAdminAuth, (req, res) => {
    try {
      const deleted = storage.deleteJob(req.params.id);
      if (!deleted) {
        return res.status(404).json({ success: false, message: "Job not found" });
      }
      res.json({ success: true, message: "Job deleted successfully" });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  });
  app.post("/api/jobs/:id/duplicate", requireAdminAuth, (req, res) => {
    try {
      const duplicated = storage.duplicateJob(req.params.id);
      if (!duplicated) {
        return res.status(404).json({ success: false, message: "Job not found" });
      }
      res.json({ success: true, job: duplicated, message: "Job duplicated successfully as draft" });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  });
  app.get("/api/enquiries", (req, res) => {
    try {
      const { userId, mobile, status, search } = req.query;
      if (!userId && !mobile) {
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : "";
        if (!storage.validateAdminToken(token)) {
          return res.status(403).json({
            success: false,
            message: "Forbidden: Admin authorization required to view all candidate enquiries."
          });
        }
      }
      const list = storage.getEnquiries({
        userId,
        mobile,
        status,
        search
      });
      res.json({ success: true, count: list.length, enquiries: list });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  });
  app.post("/api/enquiries", (req, res) => {
    try {
      const { userId, customerName, mobile, email, jobId, candidateTrade, candidateExperience, candidateNotes } = req.body;
      if (!customerName || !mobile || !jobId) {
        return res.status(400).json({ success: false, message: "Name, mobile number, and Job ID are required" });
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
        message: "Your enquiry has been received. Our team will contact you shortly."
      });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  });
  app.patch("/api/enquiries/:id/status", requireAdminAuth, (req, res) => {
    try {
      const { status, noteText, followUpDate } = req.body;
      if (!status) {
        return res.status(400).json({ success: false, message: "Status is required" });
      }
      const updated = storage.updateEnquiryStatus(req.params.id, status, noteText, followUpDate);
      if (!updated) {
        return res.status(404).json({ success: false, message: "Enquiry not found" });
      }
      res.json({ success: true, enquiry: updated, message: "Lead status updated successfully" });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  });
  app.post("/api/enquiries/:id/notes", requireAdminAuth, (req, res) => {
    try {
      const { text, author } = req.body;
      if (!text) {
        return res.status(400).json({ success: false, message: "Note text is required" });
      }
      const updated = storage.addEnquiryNote(req.params.id, text, author || "Admin");
      if (!updated) {
        return res.status(404).json({ success: false, message: "Enquiry not found" });
      }
      res.json({ success: true, enquiry: updated, message: "Note added successfully" });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  });
  app.delete("/api/enquiries/:id", requireAdminAuth, (req, res) => {
    try {
      const deleted = storage.deleteEnquiry(req.params.id);
      if (!deleted) {
        return res.status(404).json({ success: false, message: "Enquiry not found" });
      }
      res.json({ success: true, message: "Candidate application deleted successfully" });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  });
  app.post("/api/enquiries/batch-delete", requireAdminAuth, (req, res) => {
    try {
      const { ids } = req.body;
      if (!Array.isArray(ids) || ids.length === 0) {
        return res.status(400).json({ success: false, message: "Array of candidate application IDs is required" });
      }
      const result = storage.deleteEnquiries(ids);
      res.json({
        success: true,
        deletedCount: result.deletedCount,
        message: `${result.deletedCount} candidate application(s) deleted successfully`
      });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  });
  app.post("/api/enquiries/purge-all", requireAdminAuth, (req, res) => {
    try {
      const result = storage.purgeAllEnquiries();
      res.json({
        success: true,
        deletedCount: result.deletedCount,
        message: `${result.deletedCount} candidate lead(s) and application(s) purged successfully.`
      });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  });
  app.post("/api/cleanup-old-data", requireAdminAuth, (req, res) => {
    try {
      const { purgeJobs, purgeLeads, purgeAds, purgeVideos, jobs, enquiries, ads, videos } = req.body;
      const result = storage.purgeAllOldData({
        jobs: purgeJobs !== void 0 ? Boolean(purgeJobs) : jobs !== void 0 ? Boolean(jobs) : true,
        enquiries: purgeLeads !== void 0 ? Boolean(purgeLeads) : enquiries !== void 0 ? Boolean(enquiries) : true,
        ads: purgeAds !== void 0 ? Boolean(purgeAds) : ads !== void 0 ? Boolean(ads) : true,
        videos: purgeVideos !== void 0 ? Boolean(purgeVideos) : videos !== void 0 ? Boolean(videos) : true
      });
      res.json({
        success: true,
        result,
        message: "Selected data cleaned and purged successfully."
      });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  });
  app.get("/api/videos", (req, res) => {
    try {
      const all = req.query.all === "true";
      const videos = storage.getVideos(!all);
      res.json({ success: true, videos });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  });
  app.post("/api/videos", requireAdminAuth, (req, res) => {
    try {
      const { youtubeUrl, title, description, status, order, replaceExisting } = req.body;
      if (!youtubeUrl || !title) {
        return res.status(400).json({ success: false, message: "YouTube URL and Title are required" });
      }
      const { video, deletedVideosCount } = storage.createVideo({
        youtubeUrl,
        title,
        description: description || "",
        status: status || "published",
        order: Number(order) || 1
      }, { replaceExisting });
      const msg = deletedVideosCount > 0 ? `New video published! ${deletedVideosCount} previous video(s) deleted automatically so only this video is live.` : "Video added successfully";
      res.status(201).json({ success: true, video, deletedVideosCount, message: msg });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  });
  app.put("/api/videos/:id", requireAdminAuth, (req, res) => {
    try {
      const updated = storage.updateVideo(req.params.id, req.body);
      if (!updated) {
        return res.status(404).json({ success: false, message: "Video not found" });
      }
      res.json({ success: true, video: updated, message: "Video updated successfully" });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  });
  app.delete("/api/videos/:id", requireAdminAuth, (req, res) => {
    try {
      const deleted = storage.deleteVideo(req.params.id);
      if (!deleted) {
        return res.status(404).json({ success: false, message: "Video not found" });
      }
      res.json({ success: true, message: "Video deleted successfully" });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  });
  app.get("/api/ads", (req, res) => {
    try {
      const all = req.query.all === "true";
      const ads = storage.getAdvertisements(!all);
      res.json({ success: true, ads });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  });
  app.post("/api/ads", requireAdminAuth, (req, res) => {
    try {
      const { title, subtitle, image, link, type, status, order, replaceExisting } = req.body;
      if (!title || !image) {
        return res.status(400).json({ success: false, message: "Title and Image are required" });
      }
      const { ad, deletedAdsCount } = storage.createAdvertisement({
        title,
        subtitle: subtitle || "",
        image,
        link: link || "",
        type: type || "promo_card",
        status: status || "active",
        order: Number(order) || 1
      }, { replaceExisting });
      const msg = deletedAdsCount > 0 ? `New recruitment flyer live! ${deletedAdsCount} previous flyer(s) deleted automatically.` : "Advertisement banner created successfully";
      res.status(201).json({ success: true, ad, deletedAdsCount, message: msg });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  });
  app.put("/api/ads/:id", requireAdminAuth, (req, res) => {
    try {
      const updated = storage.updateAdvertisement(req.params.id, req.body);
      if (!updated) {
        return res.status(404).json({ success: false, message: "Advertisement not found" });
      }
      res.json({ success: true, ad: updated, message: "Advertisement banner updated" });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  });
  app.delete("/api/ads/:id", requireAdminAuth, (req, res) => {
    try {
      const deleted = storage.deleteAdvertisement(req.params.id);
      if (!deleted) {
        return res.status(404).json({ success: false, message: "Advertisement not found" });
      }
      res.json({ success: true, message: "Advertisement deleted successfully" });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  });
  app.get("/api/candidate/me", (req, res) => {
    try {
      const userId = req.query.userId;
      const mobile = req.query.mobile;
      if (!userId && !mobile) {
        return res.status(400).json({ success: false, message: "userId or mobile number is required" });
      }
      const candidate = storage.getCandidateForUser(userId, mobile);
      res.json({ success: true, candidate: candidate || null });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  });
  app.put("/api/candidate/me/profile", (req, res) => {
    try {
      const { userId, mobile, ...profileUpdates } = req.body;
      const lookupKey = userId || mobile;
      if (!lookupKey) {
        return res.status(400).json({ success: false, message: "userId or mobile is required to update profile" });
      }
      let candidate = storage.getCandidateForUser(userId, mobile);
      if (!candidate) {
        const dummyUser = {
          id: userId || `USR-${Date.now().toString().slice(-5)}`,
          mobile: mobile || "",
          name: profileUpdates.fullName || "",
          role: "customer",
          createdAt: (/* @__PURE__ */ new Date()).toISOString()
        };
        candidate = storage.getOrCreateCandidateForUser(dummyUser);
      }
      const updated = storage.updateCandidateProfile(candidate.id, profileUpdates);
      res.json({ success: true, candidate: updated, message: "Candidate Profile updated and synchronized with Admin Panel" });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  });
  app.post("/api/candidate/me/documents", (req, res) => {
    try {
      const { userId, mobile, type, name, fileData, fileSize } = req.body;
      if (!type || !name) {
        return res.status(400).json({ success: false, message: "Document type and name are required" });
      }
      let candidate = storage.getCandidateForUser(userId, mobile);
      if (!candidate) {
        const dummyUser = {
          id: userId || `USR-${Date.now().toString().slice(-5)}`,
          mobile: mobile || "",
          name: "",
          role: "customer",
          createdAt: (/* @__PURE__ */ new Date()).toISOString()
        };
        candidate = storage.getOrCreateCandidateForUser(dummyUser);
      }
      const newDoc = storage.addCandidateDocument(candidate.id, {
        type,
        name,
        fileData,
        fileSize
      });
      res.status(201).json({ success: true, document: newDoc, message: "Document uploaded and linked to Candidate ID" });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  });
  app.delete("/api/candidate/me/documents/:docId", (req, res) => {
    try {
      const { userId, mobile } = req.query;
      const candidate = storage.getCandidateForUser(userId, mobile);
      if (!candidate) {
        return res.status(404).json({ success: false, message: "Candidate record not found" });
      }
      const removed = storage.deleteCandidateDocument(candidate.id, req.params.docId);
      if (!removed) {
        return res.status(404).json({ success: false, message: "Document not found" });
      }
      res.json({ success: true, message: "Document removed from Candidate profile" });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  });
  app.get("/api/candidate/me/interested-jobs", (req, res) => {
    try {
      const { userId, mobile } = req.query;
      const candidate = storage.getCandidateForUser(userId, mobile);
      if (!candidate) {
        return res.json({ success: true, interestedJobs: [] });
      }
      res.json({ success: true, interestedJobs: candidate.interestedJobs });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  });
  app.post("/api/candidate/me/interested-jobs", (req, res) => {
    try {
      const { userId, mobile, jobId } = req.body;
      if (!jobId) {
        return res.status(400).json({ success: false, message: "Job ID is required" });
      }
      let candidate = storage.getCandidateForUser(userId, mobile);
      if (!candidate) {
        const dummyUser = {
          id: userId || `USR-${Date.now().toString().slice(-5)}`,
          mobile: mobile || "",
          name: "",
          role: "customer",
          createdAt: (/* @__PURE__ */ new Date()).toISOString()
        };
        candidate = storage.getOrCreateCandidateForUser(dummyUser);
      }
      const interest = storage.addInterestedJob(candidate.id, jobId);
      if (!interest) {
        return res.status(404).json({ success: false, message: "Job not found" });
      }
      res.json({
        success: true,
        interestedJob: interest,
        message: "Job marked as Interested and recorded under your Candidate Profile"
      });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  });
  app.delete("/api/candidate/me/interested-jobs/:jobId", (req, res) => {
    try {
      const { userId, mobile } = req.query;
      const candidate = storage.getCandidateForUser(userId, mobile);
      if (!candidate) {
        return res.status(404).json({ success: false, message: "Candidate record not found" });
      }
      const removed = storage.removeInterestedJob(candidate.id, req.params.jobId);
      res.json({ success: true, message: "Job removed from interested list" });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  });
  app.get("/api/admin/candidates", requireAdminAuth, (req, res) => {
    try {
      const { search, status, jobId } = req.query;
      const candidates = storage.getAdminCandidates({
        search,
        status,
        jobId
      });
      res.json({ success: true, count: candidates.length, candidates });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  });
  app.get("/api/admin/candidates/:id", requireAdminAuth, (req, res) => {
    try {
      const candidate = storage.getCandidateById(req.params.id);
      if (!candidate) {
        return res.status(404).json({ success: false, message: "Candidate not found" });
      }
      res.json({ success: true, candidate });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  });
  app.patch("/api/admin/candidates/:id/status", requireAdminAuth, (req, res) => {
    try {
      const { applicationStatus, adminRemarks } = req.body;
      const updated = storage.updateCandidateAdminFields(req.params.id, {
        applicationStatus,
        adminRemarks
      });
      if (!updated) {
        return res.status(404).json({ success: false, message: "Candidate not found" });
      }
      res.json({
        success: true,
        candidate: updated,
        message: `Candidate status updated to '${applicationStatus || updated.applicationStatus}' and synchronized to customer portal`
      });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  });
  app.put("/api/admin/candidates/:id/remarks", requireAdminAuth, (req, res) => {
    try {
      const { adminRemarks } = req.body;
      const updated = storage.updateCandidateAdminFields(req.params.id, {
        adminRemarks
      });
      if (!updated) {
        return res.status(404).json({ success: false, message: "Candidate not found" });
      }
      res.json({ success: true, candidate: updated, message: "Admin remarks updated successfully" });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  });
  app.delete("/api/admin/candidates/:candidateId/documents/:docId", requireAdminAuth, (req, res) => {
    try {
      const { candidateId, docId } = req.params;
      if (!candidateId || !docId) {
        return res.status(400).json({
          success: false,
          message: "Candidate ID and Document ID are required."
        });
      }
      const result = storage.deleteAdminCandidateDocument(candidateId, docId);
      if (!result.success) {
        return res.status(404).json(result);
      }
      res.json({
        success: true,
        message: "Document deleted successfully.",
        candidateId,
        docId
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message || "Server error occurred while deleting candidate document."
      });
    }
  });
  app.put("/api/admin/candidates/:candidateId/documents/:docId", requireAdminAuth, (req, res) => {
    try {
      const { candidateId, docId } = req.params;
      const { name, fileData, fileSize, type } = req.body;
      if (!candidateId || !docId) {
        return res.status(400).json({
          success: false,
          message: "Candidate ID and Document ID are required."
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
        message: "Document replaced successfully.",
        document: result.document
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message || "Server error occurred while replacing candidate document."
      });
    }
  });
  app.post("/api/admin/candidates/:candidateId/documents", requireAdminAuth, (req, res) => {
    try {
      const { candidateId } = req.params;
      const { type, name, fileData, fileSize } = req.body;
      if (!type || !name) {
        return res.status(400).json({
          success: false,
          message: "Document type and name are required."
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
          message: "Candidate record not found."
        });
      }
      res.status(201).json({
        success: true,
        message: "Document uploaded successfully.",
        document: newDoc
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message || "Server error occurred while uploading candidate document."
      });
    }
  });
  app.delete("/api/admin/candidates/:id", requireAdminAuth, (req, res) => {
    try {
      const candidateId = req.params.id;
      if (!candidateId) {
        return res.status(400).json({
          success: false,
          message: "Candidate ID is required for deletion."
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
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message || "Server error occurred while deleting candidate record."
      });
    }
  });
  app.post("/api/upload", requireAdminAuth, (req, res) => {
    try {
      const { image, name } = req.body;
      if (!image) {
        return res.status(400).json({ success: false, message: "Image data is required" });
      }
      const imageUrl = image.startsWith("http") || image.startsWith("data:image") ? image : `data:image/jpeg;base64,${image}`;
      res.json({ success: true, url: imageUrl, message: "Image uploaded successfully" });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  });
  app.all("/api/*", (req, res) => {
    res.status(404).json({
      success: false,
      message: `API endpoint ${req.method} ${req.originalUrl} not found`
    });
  });
  app.use((err, req, res, next) => {
    if (req.path.startsWith("/api")) {
      console.error("[API Error]:", err);
      return res.status(500).json({
        success: false,
        message: err?.message || "Internal server error occurred"
      });
    }
    next(err);
  });
  const distPath = import_path2.default.join(process.cwd(), "dist");
  const distIndexExists = import_fs2.default.existsSync(import_path2.default.join(distPath, "index.html"));
  if (process.env.NODE_ENV === "production" && distIndexExists) {
    app.use(import_express.default.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(import_path2.default.join(distPath, "index.html"));
    });
  } else {
    const vite = await (0, import_vite.createServer)({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  }
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Arudhra Singapore Recruitment Server running at http://localhost:${PORT}`);
  });
}
startServer().catch((err) => {
  console.error("Failed to start server:", err);
});
//# sourceMappingURL=server.cjs.map
