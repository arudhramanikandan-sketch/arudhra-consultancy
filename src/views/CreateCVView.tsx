import React, { useState, useEffect, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import {
  CV_JOB_CATEGORIES,
  CV_EXPERIENCE_LEVELS,
  CV_PACKAGES
} from '../data/cvPackages';
import {
  CV_TEMPLATES,
  CV_TEMPLATE_FILTERS,
  getTemplateById
} from '../data/cvTemplates';
import {
  CVPackageInfo,
  CVExperienceLevel,
  CVPackageType,
  CVOrder,
  CVTemplate,
  CVTemplateFilter,
  CVEmploymentRecord,
  CVFresherDetails,
  CVPersonalDetails,
  CVEducationRecord,
  CVSkillsData,
  CVProjectRecord,
  CVInternshipRecord,
  CVCertificationRecord,
  CVSeminarRecord,
  CVActivityRecord,
  CVAchievementRecord,
  CVOverseasInfo,
  CVSupportingDocument
} from '../types';
import { cvOrderService } from '../services/cvOrderService';
import { CVPaymentModal } from '../components/CVPaymentModal';
import { CVTemplateCard } from '../components/CVTemplateCard';
import { CVTemplatePreviewModal } from '../components/CVTemplatePreviewModal';
import { CVTemplateLibrary } from '../components/CVTemplateLibrary';
import { CVProfileDetailsForm } from '../components/CVProfileDetailsForm';
import { sortEmploymentChronological } from '../utils/cvDateUtils';
import { SubpageBackButton } from '../components/SubpageBackButton';
import {
  FileText,
  CheckCircle2,
  Clock,
  Send,
  MessageSquare,
  Shield,
  HelpCircle,
  Copy,
  Check,
  ChevronRight,
  ExternalLink,
  Sparkles,
  ArrowRight,
  UserCheck,
  Search,
  AlertCircle,
  Briefcase,
  Layers,
  Award,
  Eye,
  Filter,
  GraduationCap
} from 'lucide-react';

export const CreateCVView: React.FC = () => {
  const { settings, showToast, setCurrentTab } = useApp();
  const { user } = useAuth();

  // Wizard State
  const [selectedCategory, setSelectedCategory] = useState<string>('Hospitality / Hotel');
  const [customCategory, setCustomCategory] = useState<string>('');
  const [selectedExperience, setSelectedExperience] = useState<CVExperienceLevel>('1–2 Years');
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>('hospitality-hotel-chef-cv');
  const [userHasManuallyPickedTemplate, setUserHasManuallyPickedTemplate] = useState<boolean>(false);
  const [selectedPackageId, setSelectedPackageId] = useState<CVPackageType>('overseas');

  // Customer Contact & Personal Details State
  const [fullName, setFullName] = useState<string>(user?.name || '');
  const [mobileNumber, setMobileNumber] = useState<string>(user?.mobile || '');
  const [emailAddress, setEmailAddress] = useState<string>(user?.email || '');
  const [notes, setNotes] = useState<string>('');

  const [personalDetails, setPersonalDetails] = useState<CVPersonalDetails>({
    fullName: user?.name || '',
    mobile: user?.mobile || '',
    email: user?.email || '',
    fatherName: '',
    dob: '',
    gender: '',
    maritalStatus: '',
    nationality: 'Indian',
    currentCity: '',
    country: 'India',
    communicationAddress: ''
  });

  const handleUpdatePersonalDetails = (field: keyof CVPersonalDetails, value: string) => {
    setPersonalDetails(prev => ({ ...prev, [field]: value }));
    if (field === 'fullName') setFullName(value);
    if (field === 'mobile') setMobileNumber(value);
    if (field === 'email') setEmailAddress(value);
  };

  // Career Objective / Professional Summary
  const [careerObjective, setCareerObjective] = useState<string>('');

  // Education Records (+ Add Qualification)
  const createEmptyEducation = (): CVEducationRecord => ({
    id: `edu-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    qualificationLevel: 'Diploma',
    courseDegree: '',
    specialization: '',
    schoolCollege: '',
    boardUniversity: '',
    location: '',
    yearJoining: '',
    yearPassing: '',
    percentageCgpa: '',
    notes: ''
  });

  const [educationList, setEducationList] = useState<CVEducationRecord[]>([
    createEmptyEducation()
  ]);

  const handleAddEducation = () => {
    setEducationList(prev => [...prev, createEmptyEducation()]);
    showToast('New qualification record added.', 'info');
  };

  const handleRemoveEducation = (index: number) => {
    if (educationList.length <= 1) return;
    setEducationList(prev => prev.filter((_, i) => i !== index));
  };

  const handleUpdateEducation = (index: number, field: keyof CVEducationRecord, value: string) => {
    setEducationList(prev =>
      prev.map((edu, i) => (i === index ? { ...edu, [field]: value } : edu))
    );
  };

  // Dynamic Work Experience State (for Experienced Candidates)
  const createEmptyEmployment = (): CVEmploymentRecord => ({
    id: `emp-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    companyName: '',
    jobTitle: '',
    location: '',
    startDate: '',
    endDate: '',
    isCurrentlyWorking: false,
    responsibilities: '',
    keySkills: '',
    achievements: ''
  });

  const [employmentRecords, setEmploymentRecords] = useState<CVEmploymentRecord[]>([
    createEmptyEmployment()
  ]);

  const handleAddEmploymentRecord = () => {
    setEmploymentRecords(prev => [...prev, createEmptyEmployment()]);
    showToast('New employment record added. Please fill in your company details.', 'info');
  };

  const handleRemoveEmploymentRecord = (index: number) => {
    if (employmentRecords.length <= 1) return;
    setEmploymentRecords(prev => prev.filter((_, i) => i !== index));
    showToast('Employment record removed.', 'info');
  };

  const handleUpdateEmploymentRecord = (
    index: number,
    field: keyof CVEmploymentRecord,
    value: any
  ) => {
    setEmploymentRecords(prev =>
      prev.map((rec, i) => {
        if (i !== index) return rec;
        const updated = { ...rec, [field]: value };
        if (field === 'isCurrentlyWorking' && value === true) {
          updated.endDate = '';
        }
        return updated;
      })
    );
  };

  // Academic Profile State (for Fresher Candidates)
  const [fresherDetails, setFresherDetails] = useState<CVFresherDetails>({
    qualification: 'Diploma / Polytechnic',
    courseDegree: '',
    institution: '',
    yearOfPassing: '',
    internship: '',
    academicProject: '',
    skills: '',
    certifications: ''
  });

  const handleUpdateFresherDetails = (field: keyof CVFresherDetails, value: string) => {
    setFresherDetails(prev => ({ ...prev, [field]: value }));
  };

  // Skills & Languages Data
  const [skillsData, setSkillsData] = useState<CVSkillsData>({
    technicalSkills: ['Trade Skills', 'Safety Compliance'],
    softwareTools: [],
    professionalSkills: ['Workplace Safety', 'Teamwork'],
    languagesKnown: [
      { name: 'English', proficiency: 'Fluent' },
      { name: 'Tamil', proficiency: 'Native' }
    ],
    otherSkills: []
  });

  // Projects
  const createEmptyProject = (): CVProjectRecord => ({
    id: `proj-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    title: '',
    description: '',
    role: '',
    toolsUsed: '',
    duration: '',
    outcome: ''
  });
  const [projects, setProjects] = useState<CVProjectRecord[]>([]);

  const handleAddProject = () => {
    setProjects(prev => [...prev, createEmptyProject()]);
  };
  const handleRemoveProject = (index: number) => {
    setProjects(prev => prev.filter((_, i) => i !== index));
  };
  const handleUpdateProject = (index: number, field: keyof CVProjectRecord, value: string) => {
    setProjects(prev => prev.map((p, i) => (i === index ? { ...p, [field]: value } : p)));
  };

  // Internships
  const createEmptyInternship = (): CVInternshipRecord => ({
    id: `int-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    company: '',
    position: '',
    startDate: '',
    endDate: '',
    responsibilities: '',
    skillsLearned: ''
  });
  const [internships, setInternships] = useState<CVInternshipRecord[]>([]);

  const handleAddInternship = () => {
    setInternships(prev => [...prev, createEmptyInternship()]);
  };
  const handleRemoveInternship = (index: number) => {
    setInternships(prev => prev.filter((_, i) => i !== index));
  };
  const handleUpdateInternship = (index: number, field: keyof CVInternshipRecord, value: string) => {
    setInternships(prev => prev.map((int, i) => (i === index ? { ...int, [field]: value } : int)));
  };

  // Certifications
  const createEmptyCertification = (): CVCertificationRecord => ({
    id: `cert-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    name: '',
    issuingOrganization: '',
    yearDate: '',
    certificateId: '',
    description: ''
  });
  const [certifications, setCertifications] = useState<CVCertificationRecord[]>([]);

  const handleAddCertification = () => {
    setCertifications(prev => [...prev, createEmptyCertification()]);
  };
  const handleRemoveCertification = (index: number) => {
    setCertifications(prev => prev.filter((_, i) => i !== index));
  };
  const handleUpdateCertification = (index: number, field: keyof CVCertificationRecord, value: string) => {
    setCertifications(prev => prev.map((c, i) => (i === index ? { ...c, [field]: value } : c)));
  };

  // Seminars
  const createEmptySeminar = (): CVSeminarRecord => ({
    id: `sem-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    title: '',
    organization: '',
    dateYear: '',
    description: ''
  });
  const [seminars, setSeminars] = useState<CVSeminarRecord[]>([]);

  const handleAddSeminar = () => {
    setSeminars(prev => [...prev, createEmptySeminar()]);
  };
  const handleRemoveSeminar = (index: number) => {
    setSeminars(prev => prev.filter((_, i) => i !== index));
  };
  const handleUpdateSeminar = (index: number, field: keyof CVSeminarRecord, value: string) => {
    setSeminars(prev => prev.map((s, i) => (i === index ? { ...s, [field]: value } : s)));
  };

  // Activities & Achievements
  const createEmptyActivity = (): CVActivityRecord => ({
    id: `act-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    category: 'Sports',
    title: '',
    description: ''
  });
  const [activities, setActivities] = useState<CVActivityRecord[]>([]);

  const handleAddActivity = () => {
    setActivities(prev => [...prev, createEmptyActivity()]);
  };
  const handleRemoveActivity = (index: number) => {
    setActivities(prev => prev.filter((_, i) => i !== index));
  };
  const handleUpdateActivity = (index: number, field: keyof CVActivityRecord, value: any) => {
    setActivities(prev => prev.map((a, i) => (i === index ? { ...a, [field]: value } : a)));
  };

  const createEmptyAchievement = (): CVAchievementRecord => ({
    id: `ach-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    title: '',
    description: '',
    dateYear: ''
  });
  const [achievements, setAchievements] = useState<CVAchievementRecord[]>([]);

  const handleAddAchievement = () => {
    setAchievements(prev => [...prev, createEmptyAchievement()]);
  };
  const handleRemoveAchievement = (index: number) => {
    setAchievements(prev => prev.filter((_, i) => i !== index));
  };
  const handleUpdateAchievement = (index: number, field: keyof CVAchievementRecord, value: string) => {
    setAchievements(prev => prev.map((a, i) => (i === index ? { ...a, [field]: value } : a)));
  };

  // Overseas Info
  const [overseasInfo, setOverseasInfo] = useState<CVOverseasInfo>({
    preferredPosition: '',
    preferredCountry: 'Singapore',
    passportAvailable: 'Yes',
    noticePeriod: 'Immediate'
  });
  const handleUpdateOverseasInfo = (field: keyof CVOverseasInfo, value: string) => {
    setOverseasInfo(prev => ({ ...prev, [field]: value }));
  };

  // Supporting Documents
  const [sendDocsViaWhatsApp, setSendDocsViaWhatsApp] = useState<boolean>(true);
  const [uploadedDocuments, setUploadedDocuments] = useState<CVSupportingDocument[]>([]);
  const handleAddDocument = (doc: CVSupportingDocument) => {
    setUploadedDocuments(prev => [...prev, doc]);
  };
  const handleRemoveDocument = (id: string) => {
    setUploadedDocuments(prev => prev.filter(d => d.id !== id));
  };

  // Payment & Order Confirmation State
  const [activeOrder, setActiveOrder] = useState<CVOrder | null>(null);
  const [confirmedOrder, setConfirmedOrder] = useState<CVOrder | null>(null);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isInitiating, setIsInitiating] = useState(false);
  const [copiedOrderId, setCopiedOrderId] = useState(false);

  // View Mode: 'create' (Order wizard) | 'templates' (Browse library) | 'track' (Order status)
  const [viewMode, setViewMode] = useState<'create' | 'templates' | 'track'>('create');
  const [previewTemplate, setPreviewTemplate] = useState<CVTemplate | null>(null);

  // Template filter within step 3
  const [templateFilter, setTemplateFilter] = useState<CVTemplateFilter>('All');
  const [templateSearch, setTemplateSearch] = useState<string>('');

  // Order Tracking Tab State
  const [trackQuery, setTrackQuery] = useState<string>('');
  const [trackedOrders, setTrackedOrders] = useState<any[] | null>(null);
  const [isTracking, setIsTracking] = useState(false);
  const [trackError, setTrackError] = useState<string | null>(null);

  // Auto-recommend a template when category or experience changes if user hasn't explicitly locked one
  useEffect(() => {
    if (userHasManuallyPickedTemplate) return;

    const cat = selectedCategory.toLowerCase();
    if (cat.includes('hospital') || cat.includes('chef') || cat.includes('cook') || cat.includes('housekeeping') || cat.includes('waiter')) {
      setSelectedTemplateId('hospitality-hotel-chef-cv');
    } else if (cat.includes('driver') || cat.includes('delivery') || cat.includes('logistics')) {
      setSelectedTemplateId('driver-logistics-cv');
    } else if (cat.includes('technician') || cat.includes('mechanic') || cat.includes('welder') || cat.includes('electrician') || cat.includes('plumber') || cat.includes('construction')) {
      setSelectedTemplateId('technician-skilled-worker-cv');
    } else if (cat.includes('civil') || cat.includes('mechanical') || cat.includes('electrical engineering') || cat.includes('ece') || cat.includes('electronics')) {
      setSelectedTemplateId('engineering-cv');
    } else if (cat.includes('it / software') || cat.includes('software')) {
      setSelectedTemplateId('it-software-cv');
    } else if (cat.includes('health') || cat.includes('nurs')) {
      setSelectedTemplateId('healthcare-nursing-cv');
    } else if (selectedExperience === 'Fresher / No Experience') {
      setSelectedTemplateId('fresher-cv');
    } else if (selectedExperience === '5+ Years') {
      setSelectedTemplateId('experienced-professional-cv');
    } else {
      setSelectedTemplateId('modern-professional-cv');
    }
  }, [selectedCategory, selectedExperience, userHasManuallyPickedTemplate]);

  // Sync user info if available
  useEffect(() => {
    if (user) {
      if (!fullName) setFullName(user.name);
      if (!mobileNumber) setMobileNumber(user.mobile);
      if (!emailAddress && user.email) setEmailAddress(user.email);
    }
  }, [user]);

  const selectedPkg: CVPackageInfo =
    CV_PACKAGES.find(p => p.id === selectedPackageId) || CV_PACKAGES[3];

  const selectedTemplate: CVTemplate =
    CV_TEMPLATES.find(t => t.id === selectedTemplateId) || CV_TEMPLATES[0];

  // Templates filtered in step 3
  const filteredStepTemplates = useMemo(() => {
    return CV_TEMPLATES.filter(tmpl => {
      const matchesFilter = templateFilter === 'All' || tmpl.filterCategory === templateFilter;
      const q = templateSearch.toLowerCase().trim();
      const matchesSearch =
        !q ||
        tmpl.name.toLowerCase().includes(q) ||
        tmpl.tagline.toLowerCase().includes(q) ||
        tmpl.suitableCategories.some(c => c.toLowerCase().includes(q)) ||
        tmpl.suitableExperience.some(e => e.toLowerCase().includes(q));

      return matchesFilter && matchesSearch;
    });
  }, [templateFilter, templateSearch]);

  const handleSelectTemplate = (template: CVTemplate) => {
    setSelectedTemplateId(template.id);
    setUserHasManuallyPickedTemplate(true);
    showToast(`Template "${template.name}" selected for your CV order.`, 'success');
  };

  const handleInitiateOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName.trim()) {
      showToast('Please enter your full name', 'error');
      return;
    }
    if (!mobileNumber.trim() || mobileNumber.replace(/\D/g, '').length < 8) {
      showToast('Please enter a valid mobile number', 'error');
      return;
    }
    if (selectedCategory === 'Other' && !customCategory.trim()) {
      showToast('Please specify your custom job category', 'error');
      return;
    }

    const isFresher = selectedExperience === 'Fresher / No Experience';

    // Validate Fresher Profile or Experienced Work History
    if (isFresher) {
      if (!fresherDetails.courseDegree.trim()) {
        showToast('Please enter your Course / Degree in the Fresher Profile section', 'error');
        return;
      }
      if (!fresherDetails.institution.trim()) {
        showToast('Please enter your Institution / College name in the Fresher Profile section', 'error');
        return;
      }
      if (!fresherDetails.yearOfPassing.trim()) {
        showToast('Please enter your Year of Passing in the Fresher Profile section', 'error');
        return;
      }
      if (!fresherDetails.skills.trim()) {
        showToast('Please enter your Technical / Practical Skills in the Fresher Profile section', 'error');
        return;
      }
    } else {
      if (employmentRecords.length === 0) {
        showToast('Please add at least one employment record', 'error');
        return;
      }
      for (let i = 0; i < employmentRecords.length; i++) {
        const rec = employmentRecords[i];
        if (!rec.companyName.trim()) {
          showToast(`Please enter the Company Name for Employment #${i + 1}`, 'error');
          return;
        }
        if (!rec.jobTitle.trim()) {
          showToast(`Please enter the Job Title / Designation for Employment #${i + 1}`, 'error');
          return;
        }
        if (!rec.location.trim()) {
          showToast(`Please enter the Company Location for Employment #${i + 1}`, 'error');
          return;
        }
        if (!rec.startDate.trim()) {
          showToast(`Please enter the Employment Start Date for Employment #${i + 1}`, 'error');
          return;
        }
        if (!rec.isCurrentlyWorking && (!rec.endDate || !rec.endDate.trim())) {
          showToast(`Please enter the Employment End Date (or check 'Currently Working') for Employment #${i + 1}`, 'error');
          return;
        }
        if (!rec.responsibilities.trim()) {
          showToast(`Please enter Main Job Responsibilities for Employment #${i + 1}`, 'error');
          return;
        }
        if (!rec.keySkills.trim()) {
          showToast(`Please enter Key Skills Used for Employment #${i + 1}`, 'error');
          return;
        }
      }
    }

    setIsInitiating(true);

    const finalCategory =
      selectedCategory === 'Other' ? customCategory.trim() : selectedCategory;

    const res = await cvOrderService.initiateOrder({
      customerName: (personalDetails.fullName || fullName).trim(),
      mobile: (personalDetails.mobile || mobileNumber).trim(),
      email: (personalDetails.email || emailAddress).trim(),
      jobCategory: finalCategory,
      customCategory: selectedCategory === 'Other' ? customCategory.trim() : undefined,
      experienceLevel: selectedExperience,
      cvType: selectedPkg.id,
      cvPackageName: selectedPkg.name,
      selectedTemplateId: selectedTemplate.id,
      selectedTemplateName: selectedTemplate.name,
      amount: selectedPkg.price,
      notes: notes.trim(),
      personalDetails: {
        ...personalDetails,
        fullName: (personalDetails.fullName || fullName).trim(),
        mobile: (personalDetails.mobile || mobileNumber).trim(),
        email: (personalDetails.email || emailAddress).trim()
      },
      careerObjective: careerObjective.trim() || undefined,
      educationList: educationList.filter(e => e.courseDegree.trim() || e.schoolCollege.trim()),
      employmentHistory: !isFresher ? employmentRecords.filter(e => e.companyName.trim() || e.jobTitle.trim()) : undefined,
      skillsData,
      projects: projects.filter(p => p.title.trim()),
      internships: internships.filter(i => i.company.trim() || i.position.trim()),
      certifications: certifications.filter(c => c.name.trim()),
      seminars: seminars.filter(s => s.title.trim()),
      activities: activities.filter(a => a.title.trim()),
      achievements: achievements.filter(a => a.title.trim()),
      overseasInfo,
      documents: uploadedDocuments,
      fresherDetails: isFresher ? fresherDetails : undefined
    });

    setIsInitiating(false);

    if (res.success && res.order) {
      setActiveOrder(res.order);
      setIsPaymentModalOpen(true);
    } else {
      showToast(res.message || 'Failed to initialize CV order. Please try again.', 'error');
    }
  };

  const handlePaymentSuccess = (verifiedOrder: CVOrder) => {
    setIsPaymentModalOpen(false);
    setConfirmedOrder(verifiedOrder);
    showToast(`Payment of ₹${verifiedOrder.amount} confirmed! Order #${verifiedOrder.id} is active.`, 'success');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCopyOrderId = (orderId: string) => {
    navigator.clipboard.writeText(orderId);
    setCopiedOrderId(true);
    setTimeout(() => setCopiedOrderId(false), 2000);
    showToast('Order ID copied to clipboard', 'info');
  };

  const getWhatsAppSubmitUrl = (order: CVOrder) => {
    const rawNumber = settings.whatsappNumber.replace(/\D/g, '') || '917418845083';

    let profileSummary = '';
    if (order.fresherDetails) {
      profileSummary =
        `🎓 *Fresher Profile:* ${order.fresherDetails.qualification} - ${order.fresherDetails.courseDegree}\n` +
        `🏫 *Institution:* ${order.fresherDetails.institution} (${order.fresherDetails.yearOfPassing})\n` +
        `🛠️ *Key Skills:* ${order.fresherDetails.skills}\n`;
    } else if (order.employmentHistory && order.employmentHistory.length > 0) {
      const topJob = order.employmentHistory[0];
      profileSummary =
        `🏢 *Recent Employer:* ${topJob.jobTitle} at ${topJob.companyName} (${topJob.location})\n` +
        `💼 *Total Employment Records Submitted:* ${order.employmentHistory.length} record(s)\n`;
    }

    const message =
      `*NEW CV PREPARATION ORDER*\n\n` +
      `Hello Arudhra Consultancy Team,\n` +
      `I have placed and completed payment for my professional CV preparation.\n\n` +
      `📄 *Order ID:* ${order.id}\n` +
      `👤 *Full Name:* ${order.customerName}\n` +
      `📱 *Mobile:* ${order.mobile}\n` +
      `💼 *Job Category:* ${order.jobCategory}\n` +
      `⏱️ *Experience:* ${order.experienceLevel}\n` +
      `🎨 *Design Template:* ${order.selectedTemplateName || selectedTemplate.name}\n` +
      `📦 *Package:* ${order.cvPackageName} (₹${order.amount})\n` +
      `💳 *Payment Ref:* ${order.paymentId || 'UPI Verified'}\n` +
      (profileSummary ? `\n${profileSummary}\n` : '\n') +
      `I have submitted my detailed employment/academic records through the website and am sending my additional certificates/documents here for manual CV drafting by your team.`;

    return `https://wa.me/${rawNumber}?text=${encodeURIComponent(message)}`;
  };

  const handleTrackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackQuery.trim()) {
      setTrackError('Please enter your Order ID or phone number.');
      return;
    }

    setIsTracking(true);
    setTrackError(null);

    const res = await cvOrderService.trackOrder(trackQuery.trim());
    setIsTracking(false);

    if (res.success && res.orders && res.orders.length > 0) {
      setTrackedOrders(res.orders);
    } else {
      setTrackedOrders([]);
      setTrackError(res.message || `No CV orders found for "${trackQuery.trim()}".`);
    }
  };

  return (
    <div className="bg-stone-50 min-h-screen pb-20">
      {/* Top Banner Navigation */}
      <div className="bg-stone-900 border-b border-red-950/40 text-white py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <SubpageBackButton label="Back to Home" currentPageTitle="Create Your Professional CV" fallbackTab="home" />

          {/* Toggle View Mode */}
          <div className="flex items-center gap-1 bg-stone-800 p-1 rounded-xl border border-stone-700 text-xs font-semibold">
            <button
              id="cv-nav-create-tab-btn"
              onClick={() => {
                setViewMode('create');
                setConfirmedOrder(null);
              }}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                viewMode === 'create'
                  ? 'bg-red-900 text-white shadow-xs'
                  : 'text-stone-300 hover:text-white'
              }`}
            >
              Order New CV
            </button>
            <button
              id="cv-nav-templates-tab-btn"
              onClick={() => setViewMode('templates')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
                viewMode === 'templates'
                  ? 'bg-red-900 text-white shadow-xs'
                  : 'text-stone-300 hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Template Library (10)</span>
            </button>
            <button
              id="cv-nav-track-tab-btn"
              onClick={() => setViewMode('track')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
                viewMode === 'track'
                  ? 'bg-red-900 text-white shadow-xs'
                  : 'text-stone-300 hover:text-white'
              }`}
            >
              <Search className="w-3.5 h-3.5" />
              <span>Track Order</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* VIEW 1: STANDALONE TEMPLATES LIBRARY */}
        {viewMode === 'templates' ? (
          <div className="space-y-8 animate-in fade-in">
            <div className="bg-white rounded-2xl shadow-xs border border-stone-200 p-6 sm:p-8 space-y-6">
              <CVTemplateLibrary
                selectedTemplateId={selectedTemplateId}
                onSelectTemplate={tmpl => {
                  handleSelectTemplate(tmpl);
                  setViewMode('create');
                  showToast(`Template "${tmpl.name}" selected! Continue filling your order details below.`, 'info');
                }}
              />
            </div>
          </div>
        ) : viewMode === 'track' ? (
          /* VIEW 2: ORDER TRACKER */
          <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in">
            <div className="bg-white rounded-2xl shadow-xs border border-stone-200 p-6 sm:p-8 space-y-6">
              <div className="text-center space-y-2">
                <span className="text-xs font-bold text-red-900 uppercase tracking-wider block">
                  Candidate Order Lookup
                </span>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900">
                  Track Your CV Order Status
                </h1>
                <p className="text-stone-600 text-sm max-w-lg mx-auto">
                  Enter your unique CV Order ID (e.g. <code>AC-CV-2026-XXXXX</code>) or the mobile number used during ordering.
                </p>
              </div>

              <form onSubmit={handleTrackSubmit} className="flex flex-col sm:flex-row gap-3 pt-2">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    id="track-order-query-input"
                    value={trackQuery}
                    onChange={e => setTrackQuery(e.target.value)}
                    placeholder="Enter Order ID or 10-digit mobile..."
                    className="w-full pl-10 pr-4 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-red-900"
                  />
                </div>
                <button
                  type="submit"
                  id="submit-track-order-btn"
                  disabled={isTracking}
                  className="px-6 py-2.5 bg-red-900 hover:bg-red-800 text-white text-sm font-bold rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                >
                  {isTracking ? 'Searching...' : 'Track Order'}
                </button>
              </form>

              {trackError && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3 text-xs text-red-800">
                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block">No Record Found</span>
                    <span>{trackError}</span>
                  </div>
                </div>
              )}

              {trackedOrders && trackedOrders.length > 0 && (
                <div className="space-y-4 pt-4 border-t border-stone-100">
                  <h3 className="font-bold text-sm text-stone-900">
                    Found {trackedOrders.length} Order(s):
                  </h3>

                  {trackedOrders.map(order => (
                    <div
                      key={order.id}
                      className="bg-stone-50 border border-stone-200 rounded-xl p-5 space-y-4 text-xs"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-200 pb-3">
                        <div>
                          <span className="text-[10px] text-stone-500 uppercase font-bold block">Order ID</span>
                          <span className="font-mono text-sm font-extrabold text-red-950">{order.id}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-[10px] text-stone-500 uppercase font-bold block">Status</span>
                          <span className="inline-block px-2.5 py-1 rounded-md text-[11px] font-bold uppercase bg-stone-200 text-stone-800">
                            {order.orderStatus.replace('_', ' ')}
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-stone-700">
                        <div>
                          <span className="text-stone-400 block text-[10px]">Candidate</span>
                          <span className="font-semibold">{order.customerName}</span>
                        </div>
                        <div>
                          <span className="text-stone-400 block text-[10px]">Job Category</span>
                          <span className="font-semibold">{order.jobCategory}</span>
                        </div>
                        <div>
                          <span className="text-stone-400 block text-[10px]">Package</span>
                          <span className="font-semibold">{order.cvPackageName} (₹{order.amount})</span>
                        </div>
                        <div>
                          <span className="text-stone-400 block text-[10px]">CV Template</span>
                          <span className="font-semibold text-red-950">{order.selectedTemplateName || 'Standard Professional'}</span>
                        </div>
                      </div>

                      {/* Progress Stages */}
                      <div className="pt-2">
                        <span className="text-stone-500 block text-[10px] uppercase font-bold mb-2">Preparation Stages:</span>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          <div className={`p-2 rounded-lg border text-center ${order.paymentStatus === 'paid' ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-stone-100 border-stone-200 text-stone-400'}`}>
                            <span className="font-bold block text-[11px]">1. Payment Confirmed</span>
                            <span className="text-[10px]">Received</span>
                          </div>
                          <div className={`p-2 rounded-lg border text-center ${['paid', 'in_preparation', 'under_review', 'completed'].includes(order.orderStatus) ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-stone-100 border-stone-200 text-stone-400'}`}>
                            <span className="font-bold block text-[11px]">2. Profile Review</span>
                            <span className="text-[10px]">By Expert</span>
                          </div>
                          <div className={`p-2 rounded-lg border text-center ${['in_preparation', 'under_review', 'completed'].includes(order.orderStatus) ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-stone-100 border-stone-200 text-stone-400'}`}>
                            <span className="font-bold block text-[11px]">3. Drafting CV</span>
                            <span className="text-[10px]">Word + PDF</span>
                          </div>
                          <div className={`p-2 rounded-lg border text-center ${order.orderStatus === 'completed' ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-stone-100 border-stone-200 text-stone-400'}`}>
                            <span className="font-bold block text-[11px]">4. Delivered</span>
                            <span className="text-[10px]">WhatsApp/Email</span>
                          </div>
                        </div>
                      </div>

                      {/* Action */}
                      <div className="pt-2 flex justify-end">
                        <a
                          href={getWhatsAppSubmitUrl(order as CVOrder)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold flex items-center gap-1.5 transition-colors"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>Chat on WhatsApp regarding Order</span>
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : confirmedOrder ? (
          /* VIEW 3: POST-PAYMENT SUCCESS SCREEN */
          <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in">
            {/* Success Card */}
            <div className="bg-white rounded-2xl shadow-md border border-emerald-200 p-6 sm:p-10 space-y-8 text-center">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-2">
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block">
                  Payment Verified & Confirmed
                </span>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900">
                  Your CV Order Has Been Successfully Placed!
                </h1>
                <p className="text-stone-600 text-sm max-w-lg mx-auto">
                  Thank you, <strong>{confirmedOrder.customerName}</strong>. Our expert recruitment documentation team is ready to prepare your custom CV manually.
                </p>
              </div>

              {/* Order ID Highlight Box */}
              <div className="bg-stone-50 border-2 border-dashed border-stone-300 rounded-2xl p-5 max-w-md mx-auto space-y-3">
                <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block">
                  Your Unique CV Order ID
                </span>
                <div className="flex items-center justify-center gap-2">
                  <span className="font-mono text-2xl sm:text-3xl font-extrabold text-red-950 tracking-wide">
                    {confirmedOrder.id}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleCopyOrderId(confirmedOrder.id)}
                    className="p-2 text-stone-600 hover:text-stone-900 bg-white hover:bg-stone-200 border border-stone-300 rounded-lg transition-colors cursor-pointer"
                    title="Copy Order ID"
                  >
                    {copiedOrderId ? (
                      <Check className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-stone-500">
                  <span>Package: <strong>{confirmedOrder.cvPackageName}</strong></span>
                  <span>·</span>
                  <span>Template: <strong>{confirmedOrder.selectedTemplateName || selectedTemplate.name}</strong></span>
                  <span>·</span>
                  <span>Paid: <strong>₹{confirmedOrder.amount}</strong></span>
                </div>

                {/* Captured Profile Summary */}
                {confirmedOrder.employmentHistory && confirmedOrder.employmentHistory.length > 0 && (
                  <div className="mt-3 bg-white border border-stone-200 rounded-xl p-3 text-xs text-stone-700 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-red-900 shrink-0" />
                      <span>
                        <strong>{confirmedOrder.employmentHistory.length} Employment Record(s)</strong> attached to Order ID
                      </span>
                    </div>
                    <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      ✓ Saved Securely
                    </span>
                  </div>
                )}
                {confirmedOrder.fresherDetails && (
                  <div className="mt-3 bg-white border border-stone-200 rounded-xl p-3 text-xs text-stone-700 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <GraduationCap className="w-4 h-4 text-red-900 shrink-0" />
                      <span>
                        Fresher Profile: <strong>{confirmedOrder.fresherDetails.courseDegree}</strong> ({confirmedOrder.fresherDetails.yearOfPassing})
                      </span>
                    </div>
                    <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      ✓ Saved Securely
                    </span>
                  </div>
                )}
              </div>

              {/* CRITICAL NEXT STEP: WhatsApp Details Submission */}
              <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-6 sm:p-8 space-y-5 text-left">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-emerald-950">
                      Step 5: Send Your Details on WhatsApp
                    </h3>
                    <p className="text-xs text-emerald-800">
                      Click the button below to message the Arudhra Consultancy team. Your Order ID and chosen template design are automatically included.
                    </p>
                  </div>
                </div>

                <div className="pt-2">
                  <a
                    id="cv-order-whatsapp-submit-btn"
                    href={getWhatsAppSubmitUrl(confirmedOrder)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-4 px-6 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm sm:text-base rounded-xl shadow-lg transition-all flex items-center justify-center gap-3 cursor-pointer"
                  >
                    <MessageSquare className="w-5 h-5" />
                    <span>Send Your Details on WhatsApp</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>

                {/* What to Send Checklist */}
                <div className="bg-white border border-emerald-200 rounded-xl p-4 space-y-2 text-xs text-stone-700">
                  <span className="font-bold text-stone-900 block text-xs">
                    What to send via WhatsApp:
                  </span>
                  <ul className="space-y-1.5 list-disc pl-4 text-stone-600">
                    <li>Your educational background (10th/12th/ITI/Diploma/Degree)</li>
                    <li>Past job details (company name, role, total years, skills or machinery handled)</li>
                    <li>Passport copy, Driving License, or CoreTrade/Welding certificates (for Overseas CV)</li>
                    <li>Any existing biodata / rough draft if you have one</li>
                    <li>A clear photo (optional, for modern CV layout)</li>
                  </ul>
                  <p className="pt-2 text-[11px] text-stone-500 italic">
                    Our team will prepare your CV manually within 24–48 hours using your selected template and send the draft to you for approval.
                  </p>
                </div>
              </div>

              {/* Secondary Actions */}
              <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setViewMode('track');
                    setTrackQuery(confirmedOrder.id);
                  }}
                  className="px-5 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold rounded-xl transition-colors cursor-pointer"
                >
                  Track This Order
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setConfirmedOrder(null);
                    setViewMode('create');
                  }}
                  className="px-5 py-2.5 bg-white border border-stone-300 hover:bg-stone-50 text-stone-700 text-xs font-semibold rounded-xl transition-colors cursor-pointer"
                >
                  Create Another CV
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* VIEW 4: MAIN CREATE YOUR CV SERVICE WIZARD */
          <div className="space-y-12">
            {/* Header Section */}
            <div className="text-center space-y-3 max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 border border-red-200 text-red-900 text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5 text-red-800" />
                <span>Professional Manual CV Preparation</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
                Create Your Professional CV
              </h1>
              <p className="text-base sm:text-lg text-stone-600 font-medium">
                Get a professionally prepared CV tailored to your job profile and experience.
              </p>
              <p className="text-xs text-stone-500 max-w-xl mx-auto">
                Each CV is manually drafted by Arudhra Consultancy recruitment specialists to highlight your trade skills, MOM criteria, and overseas recruiter standards.
              </p>
            </div>

            {/* 6-Step Process Flow Indicator */}
            <div className="bg-white rounded-2xl shadow-xs border border-stone-200 p-6 sm:p-8">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-400 block mb-4 text-center">
                How It Works — Step-by-Step
              </span>

              <div className="grid grid-cols-2 md:grid-cols-6 gap-3 text-center">
                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 flex flex-col items-center">
                  <span className="w-6 h-6 rounded-full bg-red-900 text-white text-xs font-bold flex items-center justify-center mb-1.5">1</span>
                  <span className="font-bold text-xs text-stone-900">Select Category</span>
                  <span className="text-[10px] text-stone-500 mt-0.5">Your core trade/field</span>
                </div>
                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 flex flex-col items-center">
                  <span className="w-6 h-6 rounded-full bg-red-900 text-white text-xs font-bold flex items-center justify-center mb-1.5">2</span>
                  <span className="font-bold text-xs text-stone-900">Select Experience</span>
                  <span className="text-[10px] text-stone-500 mt-0.5">Years in industry</span>
                </div>
                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 flex flex-col items-center">
                  <span className="w-6 h-6 rounded-full bg-red-900 text-white text-xs font-bold flex items-center justify-center mb-1.5">3</span>
                  <span className="font-bold text-xs text-stone-900">Pick CV Template</span>
                  <span className="text-[10px] text-stone-500 mt-0.5">10 visual layouts</span>
                </div>
                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 flex flex-col items-center">
                  <span className="w-6 h-6 rounded-full bg-red-900 text-white text-xs font-bold flex items-center justify-center mb-1.5">4</span>
                  <span className="font-bold text-xs text-stone-900">Select Package</span>
                  <span className="text-[10px] text-stone-500 mt-0.5">From ₹99 to ₹399</span>
                </div>
                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 flex flex-col items-center">
                  <span className="w-6 h-6 rounded-full bg-red-900 text-white text-xs font-bold flex items-center justify-center mb-1.5">5</span>
                  <span className="font-bold text-xs text-stone-900">Pay & WhatsApp</span>
                  <span className="text-[10px] text-stone-500 mt-0.5">Send documents</span>
                </div>
                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 flex flex-col items-center">
                  <span className="w-6 h-6 rounded-full bg-emerald-600 text-white text-xs font-bold flex items-center justify-center mb-1.5">6</span>
                  <span className="font-bold text-xs text-stone-900">Receive Final CV</span>
                  <span className="text-[10px] text-stone-500 mt-0.5">Word & PDF format</span>
                </div>
              </div>
            </div>

            <form onSubmit={handleInitiateOrder} className="space-y-12">
              {/* STEP 1: JOB CATEGORY */}
              <div className="bg-white rounded-2xl shadow-xs border border-stone-200 p-6 sm:p-8 space-y-6">
                <div className="border-b border-stone-100 pb-4">
                  <div className="flex items-center gap-2 text-xs font-bold text-red-900 uppercase tracking-wider mb-1">
                    <span>Step 1 of 5</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-stone-900">
                    Select Your Job Category
                  </h2>
                  <p className="text-xs text-stone-500 mt-1">
                    Choose the industry or job role that matches your skills.
                  </p>
                </div>

                {/* Category Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2.5">
                  {CV_JOB_CATEGORIES.map(category => {
                    const isSelected = selectedCategory === category;
                    return (
                      <button
                        key={category}
                        type="button"
                        onClick={() => setSelectedCategory(category)}
                        className={`p-3 rounded-xl border text-left text-xs font-semibold transition-all cursor-pointer flex flex-col justify-between min-h-[56px] ${
                          isSelected
                            ? 'bg-red-950 text-white border-red-900 shadow-sm'
                            : 'bg-stone-50 hover:bg-stone-100 text-stone-800 border-stone-200'
                        }`}
                      >
                        <span className="leading-snug">{category}</span>
                        {isSelected && (
                          <span className="text-[10px] font-bold text-red-300 mt-1 flex items-center gap-1">
                            <Check className="w-3 h-3" /> Selected
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Custom Category Input if "Other" is selected */}
                {selectedCategory === 'Other' && (
                  <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-xl space-y-2 animate-in fade-in">
                    <label className="text-xs font-bold text-amber-950 block">
                      Please enter your specific job trade or title:
                    </label>
                    <input
                      type="text"
                      required
                      value={customCategory}
                      onChange={e => setCustomCategory(e.target.value)}
                      placeholder="e.g. Scaffolder, CNC Programmer, Solar Panel Installer..."
                      className="w-full px-3.5 py-2.5 bg-white border border-amber-300 rounded-xl text-xs text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-red-900"
                    />
                  </div>
                )}
              </div>

              {/* STEP 2: EXPERIENCE LEVEL */}
              <div className="bg-white rounded-2xl shadow-xs border border-stone-200 p-6 sm:p-8 space-y-6">
                <div className="border-b border-stone-100 pb-4">
                  <div className="flex items-center gap-2 text-xs font-bold text-red-900 uppercase tracking-wider mb-1">
                    <span>Step 2 of 5</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-stone-900">
                    Select Your Experience Level
                  </h2>
                  <p className="text-xs text-stone-500 mt-1">
                    This ensures the CV layout emphasizes either training & qualifications or employment achievements.
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {CV_EXPERIENCE_LEVELS.map(exp => {
                    const isSelected = selectedExperience === exp;
                    return (
                      <button
                        key={exp}
                        type="button"
                        onClick={() => setSelectedExperience(exp)}
                        className={`p-4 rounded-xl border text-center transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-stone-900 text-white border-stone-900 shadow-md ring-2 ring-red-900'
                            : 'bg-stone-50 hover:bg-stone-100 text-stone-800 border-stone-200'
                        }`}
                      >
                        <Clock className={`w-5 h-5 mx-auto mb-2 ${isSelected ? 'text-red-400' : 'text-stone-400'}`} />
                        <span className="font-bold text-sm block">{exp}</span>
                        <span className={`text-[10px] mt-1 block ${isSelected ? 'text-stone-300' : 'text-stone-500'}`}>
                          {exp === 'Fresher / No Experience' ? 'Education focused' : 'Experience focused'}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* STEP 3: CV TEMPLATE LIBRARY (NEW FEATURE) */}
              <div className="bg-white rounded-2xl shadow-xs border border-stone-200 p-6 sm:p-8 space-y-6">
                <div className="border-b border-stone-100 pb-4 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-bold text-red-900 uppercase tracking-wider mb-1">
                      <span>Step 3 of 5</span>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-extrabold text-stone-900">
                      Select Your CV Template Design
                    </h2>
                    <p className="text-xs text-stone-500 mt-1">
                      Pick the visual design for your CV. After payment, our team manually formats your details into this layout.
                    </p>
                  </div>

                  {/* Active Selected Template Badge */}
                  <div className="bg-stone-50 border border-stone-200 rounded-xl px-4 py-2 flex items-center gap-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0"></span>
                    <div className="text-xs">
                      <span className="text-stone-400 block text-[10px] uppercase font-bold">Selected Design</span>
                      <span className="font-extrabold text-stone-900">{selectedTemplate.name}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setPreviewTemplate(selectedTemplate)}
                      className="px-2.5 py-1 bg-stone-200 hover:bg-stone-300 text-stone-800 rounded-lg text-[11px] font-bold transition-colors cursor-pointer"
                    >
                      Preview Full
                    </button>
                  </div>
                </div>

                {/* Filter Pills & Search Bar */}
                <div className="space-y-3">
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                    {/* Category Filter Pills */}
                    <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-thin">
                      {CV_TEMPLATE_FILTERS.map(filter => {
                        const isActive = templateFilter === filter;
                        return (
                          <button
                            key={filter}
                            type="button"
                            onClick={() => setTemplateFilter(filter)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                              isActive
                                ? 'bg-red-950 text-white shadow-xs'
                                : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                            }`}
                          >
                            {filter}
                          </button>
                        );
                      })}
                    </div>

                    {/* Search Field */}
                    <div className="relative min-w-[200px]">
                      <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-2.5" />
                      <input
                        type="text"
                        value={templateSearch}
                        onChange={e => setTemplateSearch(e.target.value)}
                        placeholder="Search templates..."
                        className="w-full pl-8 pr-3 py-1.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-red-900"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-stone-500">
                    <span>Showing <strong>{filteredStepTemplates.length}</strong> of {CV_TEMPLATES.length} templates</span>
                    {templateFilter !== 'All' && (
                      <button
                        type="button"
                        onClick={() => setTemplateFilter('All')}
                        className="text-red-900 hover:underline font-semibold"
                      >
                        Reset to All
                      </button>
                    )}
                  </div>
                </div>

                {/* Visual Template Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {filteredStepTemplates.map(tmpl => (
                    <CVTemplateCard
                      key={tmpl.id}
                      template={tmpl}
                      isSelected={selectedTemplateId === tmpl.id}
                      onSelect={handleSelectTemplate}
                      onPreview={t => setPreviewTemplate(t)}
                    />
                  ))}
                </div>
              </div>

              {/* STEP 4: CV TYPE & PACKAGES */}
              <div className="bg-white rounded-2xl shadow-xs border border-stone-200 p-6 sm:p-8 space-y-6">
                <div className="border-b border-stone-100 pb-4 flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-bold text-red-900 uppercase tracking-wider mb-1">
                      <span>Step 4 of 5</span>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-extrabold text-stone-900">
                      Select Your CV Type & Package
                    </h2>
                    <p className="text-xs text-stone-500 mt-1">
                      Transparent pricing with zero hidden fees. Includes editable Word and high-resolution PDF.
                    </p>
                  </div>
                  <div className="text-xs text-stone-500">
                    Selected Package: <strong className="text-red-950 font-bold">{selectedPkg.name} (₹{selectedPkg.price})</strong>
                  </div>
                </div>

                {/* Packages Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                  {CV_PACKAGES.map(pkg => {
                    const isSelected = selectedPackageId === pkg.id;
                    return (
                      <div
                        key={pkg.id}
                        onClick={() => setSelectedPackageId(pkg.id)}
                        className={`rounded-2xl border-2 p-5 flex flex-col justify-between transition-all cursor-pointer relative ${
                          isSelected
                            ? 'bg-red-950 text-white border-red-700 shadow-xl ring-2 ring-red-600 scale-[1.02]'
                            : 'bg-stone-50 hover:bg-white text-stone-800 border-stone-200 shadow-xs'
                        }`}
                      >
                        {/* Package Badge */}
                        {pkg.badge && (
                          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                            <span className="bg-red-600 text-white text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full shadow-xs tracking-wider">
                              {pkg.badge}
                            </span>
                          </div>
                        )}

                        <div className="space-y-4">
                          <div className="border-b pb-3 border-stone-200/40">
                            <h3 className={`text-base font-extrabold ${isSelected ? 'text-white' : 'text-stone-900'}`}>
                              {pkg.name}
                            </h3>
                            <div className="mt-2 flex items-baseline gap-1">
                              <span className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                                ₹{pkg.price}
                              </span>
                              <span className={`text-[11px] ${isSelected ? 'text-red-200' : 'text-stone-500'}`}>
                                all inclusive
                              </span>
                            </div>
                            <p className={`text-[11px] mt-1 leading-snug ${isSelected ? 'text-stone-200' : 'text-stone-600'}`}>
                              {pkg.description}
                            </p>
                          </div>

                          {/* Features List */}
                          <div className="space-y-2 text-xs">
                            <span className={`text-[10px] font-bold uppercase tracking-wider block ${isSelected ? 'text-red-200' : 'text-stone-400'}`}>
                              Includes:
                            </span>
                            <ul className="space-y-1.5">
                              {pkg.features.map((feature, i) => (
                                <li key={i} className="flex items-start gap-1.5 leading-snug">
                                  <Check className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${isSelected ? 'text-emerald-300' : 'text-emerald-600'}`} />
                                  <span className={isSelected ? 'text-stone-100' : 'text-stone-700'}>{feature}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        <div className="pt-4 mt-4 border-t border-stone-200/30">
                          <div className={`w-full py-2 text-center text-xs font-bold rounded-xl transition-colors ${
                            isSelected
                              ? 'bg-white text-stone-950 font-extrabold'
                              : 'bg-stone-200 text-stone-800'
                          }`}>
                            {isSelected ? '✓ Selected Plan' : 'Select Plan'}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Honest Disclaimer */}
                <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 flex items-start gap-3 text-xs text-stone-600">
                  <Shield className="w-4 h-4 text-stone-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-stone-800 block">Notice & Service Terms:</span>
                    <span>
                      Arudhra Consultancy provides professional resume drafting and formatting services. This service does not claim, promise, or guarantee job placement or employment. Final hiring decisions rest exclusively with prospective employers and Singapore MOM work pass issuance.
                    </span>
                  </div>
                </div>
              </div>

              {/* STEP 5: CUSTOMER DETAILS & REVIEW */}
              <div className="bg-white rounded-2xl shadow-xs border border-stone-200 p-6 sm:p-8 space-y-6">
                <div className="border-b border-stone-100 pb-4">
                  <div className="flex items-center gap-2 text-xs font-bold text-red-900 uppercase tracking-wider mb-1">
                    <span>Step 5 of 5</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-stone-900">
                    Customer Information & Confirmation
                  </h2>
                  <p className="text-xs text-stone-500 mt-1">
                    Please provide your contact information so we can assign your CV Order ID and connect on WhatsApp.
                  </p>
                </div>

                {/* Order Summary Strip */}
                <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div>
                    <span className="text-stone-400 block text-[10px] uppercase font-bold">Category</span>
                    <span className="font-bold text-stone-900">
                      {selectedCategory === 'Other' && customCategory ? customCategory : selectedCategory}
                    </span>
                  </div>
                  <div>
                    <span className="text-stone-400 block text-[10px] uppercase font-bold">Experience</span>
                    <span className="font-bold text-stone-900">{selectedExperience}</span>
                  </div>
                  <div>
                    <span className="text-stone-400 block text-[10px] uppercase font-bold">CV Template</span>
                    <span className="font-bold text-red-950 flex items-center gap-1">
                      {selectedTemplate.name}
                      <button
                        type="button"
                        onClick={() => setPreviewTemplate(selectedTemplate)}
                        className="text-stone-500 hover:text-red-900 underline text-[10px] ml-1"
                      >
                        (preview)
                      </button>
                    </span>
                  </div>
                  <div>
                    <span className="text-stone-400 block text-[10px] uppercase font-bold">Selected Package</span>
                    <span className="font-bold text-stone-900">{selectedPkg.name}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-stone-400 block text-[10px] uppercase font-bold">Total Amount</span>
                    <span className="text-base font-extrabold text-red-950 font-mono">₹{selectedPkg.price}</span>
                  </div>
                </div>

                {/* Form Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-stone-800 block mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      id="cv-customer-name-input"
                      value={fullName}
                      onChange={e => setFullName(e.target.value)}
                      placeholder="Enter your name as in passport/ID"
                      className="w-full px-3.5 py-2.5 bg-white border border-stone-300 rounded-xl text-xs text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-red-900"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-stone-800 block mb-1">
                      WhatsApp Mobile Number *
                    </label>
                    <input
                      type="tel"
                      required
                      id="cv-customer-mobile-input"
                      value={mobileNumber}
                      onChange={e => setMobileNumber(e.target.value)}
                      placeholder="e.g. 9840123456"
                      className="w-full px-3.5 py-2.5 bg-white border border-stone-300 rounded-xl text-xs text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-red-900"
                    />
                    <span className="text-[10px] text-stone-400 mt-1 block">
                      We will contact you and send your CV draft to this WhatsApp number.
                    </span>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-stone-800 block mb-1">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      id="cv-customer-email-input"
                      value={emailAddress}
                      onChange={e => setEmailAddress(e.target.value)}
                      placeholder="name@example.com"
                      className="w-full px-3.5 py-2.5 bg-white border border-stone-300 rounded-xl text-xs text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-red-900"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-stone-800 block mb-1">
                      Target Country / Specific Requirements (Optional)
                    </label>
                    <input
                      type="text"
                      id="cv-customer-notes-input"
                      value={notes}
                      onChange={e => setNotes(e.target.value)}
                      placeholder="e.g. Singapore Work Permit, Gulf PCM, India Local..."
                      className="w-full px-3.5 py-2.5 bg-white border border-stone-300 rounded-xl text-xs text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-red-900"
                    />
                  </div>
                </div>

                {/* DYNAMIC CANDIDATE PROFILE DETAILS & WORK EXPERIENCE */}
                <CVProfileDetailsForm
                  experienceLevel={selectedExperience}
                  personalDetails={{
                    ...personalDetails,
                    fullName: fullName || personalDetails.fullName,
                    mobile: mobileNumber || personalDetails.mobile,
                    email: emailAddress || personalDetails.email
                  }}
                  onUpdatePersonalDetails={handleUpdatePersonalDetails}
                  careerObjective={careerObjective}
                  onChangeCareerObjective={setCareerObjective}
                  educationList={educationList}
                  onAddEducation={handleAddEducation}
                  onRemoveEducation={handleRemoveEducation}
                  onUpdateEducation={handleUpdateEducation}
                  employmentRecords={employmentRecords}
                  onAddEmploymentRecord={handleAddEmploymentRecord}
                  onRemoveEmploymentRecord={handleRemoveEmploymentRecord}
                  onUpdateEmploymentRecord={handleUpdateEmploymentRecord}
                  skillsData={skillsData}
                  onUpdateSkillsData={setSkillsData}
                  projects={projects}
                  onAddProject={handleAddProject}
                  onRemoveProject={handleRemoveProject}
                  onUpdateProject={handleUpdateProject}
                  internships={internships}
                  onAddInternship={handleAddInternship}
                  onRemoveInternship={handleRemoveInternship}
                  onUpdateInternship={handleUpdateInternship}
                  certifications={certifications}
                  onAddCertification={handleAddCertification}
                  onRemoveCertification={handleRemoveCertification}
                  onUpdateCertification={handleUpdateCertification}
                  seminars={seminars}
                  onAddSeminar={handleAddSeminar}
                  onRemoveSeminar={handleRemoveSeminar}
                  onUpdateSeminar={handleUpdateSeminar}
                  activities={activities}
                  onAddActivity={handleAddActivity}
                  onRemoveActivity={handleRemoveActivity}
                  onUpdateActivity={handleUpdateActivity}
                  achievements={achievements}
                  onAddAchievement={handleAddAchievement}
                  onRemoveAchievement={handleRemoveAchievement}
                  onUpdateAchievement={handleUpdateAchievement}
                  overseasInfo={overseasInfo}
                  onUpdateOverseasInfo={handleUpdateOverseasInfo}
                  sendDocsViaWhatsApp={sendDocsViaWhatsApp}
                  onToggleSendDocsViaWhatsApp={setSendDocsViaWhatsApp}
                  uploadedDocuments={uploadedDocuments}
                  onAddDocument={handleAddDocument}
                  onRemoveDocument={handleRemoveDocument}
                  fresherDetails={fresherDetails}
                  onUpdateFresherDetails={handleUpdateFresherDetails}
                />

                {/* STEP 11 REVIEW DETAILS BEFORE PAYMENT */}
                <div className="bg-stone-50 border-2 border-stone-200 rounded-2xl p-5 space-y-3">
                  <div className="flex items-center justify-between border-b border-stone-200 pb-2.5">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      <h4 className="font-extrabold text-stone-900 text-sm">
                        Review Your CV Order Summary
                      </h4>
                    </div>
                    <span className="text-xs font-bold text-red-950 font-mono bg-white px-2.5 py-1 rounded-lg border border-stone-200">
                      Total: ₹{selectedPkg.price}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                    <div>
                      <span className="text-stone-400 block text-[10px] uppercase font-bold">Candidate</span>
                      <span className="font-bold text-stone-900">{fullName || 'Not provided'}</span>
                    </div>
                    <div>
                      <span className="text-stone-400 block text-[10px] uppercase font-bold">Target Trade</span>
                      <span className="font-bold text-stone-900">{selectedCategory === 'Other' && customCategory ? customCategory : selectedCategory}</span>
                    </div>
                    <div>
                      <span className="text-stone-400 block text-[10px] uppercase font-bold">Experience Level</span>
                      <span className="font-bold text-stone-900">{selectedExperience}</span>
                    </div>
                    <div>
                      <span className="text-stone-400 block text-[10px] uppercase font-bold">Design Layout</span>
                      <span className="font-bold text-red-950">{selectedTemplate.name}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-stone-200 text-stone-600 text-xs">
                    <span className="bg-white border border-stone-200 px-2.5 py-1 rounded-md">
                      🎓 <strong>{educationList.length}</strong> Qualification(s)
                    </span>
                    {selectedExperience !== 'Fresher / No Experience' && (
                      <span className="bg-white border border-stone-200 px-2.5 py-1 rounded-md">
                        🏢 <strong>{employmentRecords.length}</strong> Employment Record(s)
                      </span>
                    )}
                    {skillsData.languagesKnown?.length > 0 && (
                      <span className="bg-white border border-stone-200 px-2.5 py-1 rounded-md">
                        🌐 <strong>{skillsData.languagesKnown.length}</strong> Language(s)
                      </span>
                    )}
                    {overseasInfo.preferredCountry && (
                      <span className="bg-white border border-stone-200 px-2.5 py-1 rounded-md">
                        ✈️ Target: <strong>{overseasInfo.preferredCountry}</strong>
                      </span>
                    )}
                    {sendDocsViaWhatsApp ? (
                      <span className="bg-emerald-50 border border-emerald-200 text-emerald-800 font-semibold px-2.5 py-1 rounded-md">
                        ✓ Documents via WhatsApp
                      </span>
                    ) : uploadedDocuments.length > 0 ? (
                      <span className="bg-emerald-50 border border-emerald-200 text-emerald-800 font-semibold px-2.5 py-1 rounded-md">
                        ✓ {uploadedDocuments.length} File(s) Uploaded
                      </span>
                    ) : null}
                  </div>
                </div>

                {/* Submit Action */}
                <div className="pt-4 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-xs text-stone-500">
                    After payment, you will receive your unique Order ID and send your documents on WhatsApp.
                  </div>

                  <button
                    type="submit"
                    id="cv-submit-pay-now-btn"
                    disabled={isInitiating}
                    className="w-full sm:w-auto px-8 py-3.5 bg-red-900 hover:bg-red-800 text-white font-extrabold text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                  >
                    <span>Pay Now — ₹{selectedPkg.price}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}
      </div>

      {/* Full Interactive Template Preview Modal */}
      <CVTemplatePreviewModal
        template={previewTemplate}
        isOpen={Boolean(previewTemplate)}
        isSelected={previewTemplate ? selectedTemplateId === previewTemplate.id : false}
        onClose={() => setPreviewTemplate(null)}
        onSelect={tmpl => {
          handleSelectTemplate(tmpl);
          setPreviewTemplate(null);
        }}
      />

      {/* Payment Checkout Modal */}
      {activeOrder && (
        <CVPaymentModal
          order={activeOrder}
          isOpen={isPaymentModalOpen}
          onClose={() => setIsPaymentModalOpen(false)}
          onPaymentSuccess={handlePaymentSuccess}
        />
      )}
    </div>
  );
};
