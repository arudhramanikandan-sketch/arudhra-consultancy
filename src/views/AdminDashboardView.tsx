import React, { useState } from 'react';
import { useAuth, BrevoStatusInfo } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import { Job, Enquiry, Advertisement, VideoItem, SiteSettings, EnquiryStatus, CandidateRecord, ApplicationStatus } from '../types';
import { CandidateAdminModal } from '../components/CandidateAdminModal';
import { CandidateProfilePdfModal } from '../components/CandidateProfilePdfModal';
import {
  Briefcase,
  Users,
  Image as ImageIcon,
  Youtube,
  Settings,
  Plus,
  Edit2,
  Trash2,
  Phone,
  MessageSquare,
  Search,
  CheckCircle2,
  Clock,
  Eye,
  EyeOff,
  Mail,
  Send,
  Key,
  LogOut,
  Save,
  Filter,
  Calendar,
  ExternalLink,
  Shield,
  FileText,
  Upload,
  Check,
  Building,
  Tag,
  User,
  Printer,
  Globe,
  Download,
  AlertCircle,
  Palette,
  Layers,
  Sparkles,
  RotateCcw,
  CheckSquare,
  ShieldCheck,
  KeyRound,
  QrCode,
  Sun,
  Moon,
  ArrowLeft
} from 'lucide-react';
import { LogoEditModal } from '../components/LogoEditModal';
import { Admin2faQRCode } from '../components/Admin2faQRCode';

export const AdminDashboardView: React.FC = () => {
  const { user, isAdmin, logout, resetAdmin2faEnrollment, getBrevoStatus, testBrevoEmail } = useAuth();
  const {
    jobs,
    enquiries,
    ads,
    videos,
    settings,
    saveJob,
    deleteJob,
    updateEnquiryStatus,
    deleteEnquiry,
    batchDeleteEnquiries,
    saveAd,
    deleteAd,
    saveVideo,
    deleteVideo,
    updateSettings,
    showToast,
    setCurrentTab,
    goBack,
    adminCandidates,
    refreshAdminCandidates,
    refreshEnquiries,
    updateCandidateAdminStatus,
    updateCandidateAdminRemarks,
    adminDeleteCandidate,
    purgeAllEnquiries,
    purgeAllOldData
  } = useApp();

  const [activeTab, setActiveTab] = useState<'overview' | 'candidates' | 'jobs' | 'enquiries' | 'ads' | 'videos' | 'branding' | 'settings'>('overview');

  // Candidate Management State
  const [selectedCandidate, setSelectedCandidate] = useState<CandidateRecord | null>(null);
  const [candidateModalOpen, setCandidateModalOpen] = useState(false);
  const [candidatePdfCandidate, setCandidatePdfCandidate] = useState<CandidateRecord | null>(null);
  const [candidatePdfOpen, setCandidatePdfOpen] = useState(false);
  const [candidateToDelete, setCandidateToDelete] = useState<CandidateRecord | null>(null);
  const [isDeletingCandidate, setIsDeletingCandidate] = useState(false);
  const [candidateSearch, setCandidateSearch] = useState('');
  const [candidateStatusFilter, setCandidateStatusFilter] = useState('all');
  const [candidateTradeFilter, setCandidateTradeFilter] = useState('all');

  // Job Modal State & Exclusive Live Options
  const [jobModalOpen, setJobModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<Partial<Job> | null>(null);
  const [jobToDelete, setJobToDelete] = useState<Job | null>(null);
  const [isDeletingJob, setIsDeletingJob] = useState(false);
  const [jobExclusiveLive, setJobExclusiveLive] = useState(false);
  const [jobClearOldLeads, setJobClearOldLeads] = useState(false);

  // Enquiry Update Modal State
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);
  const [enquiryStatusInput, setEnquiryStatusInput] = useState<EnquiryStatus>('new');
  const [enquiryNotesInput, setEnquiryNotesInput] = useState('');
  const [enquiryFollowUpInput, setEnquiryFollowUpInput] = useState('');
  const [enquirySearch, setEnquirySearch] = useState('');
  const [enquiryStatusFilter, setEnquiryStatusFilter] = useState('all');

  // Candidate Applications / Enquiry Selection & Deletion State
  const [selectedRecentEnquiryIds, setSelectedRecentEnquiryIds] = useState<string[]>([]);
  const [selectedPipelineEnquiryIds, setSelectedPipelineEnquiryIds] = useState<string[]>([]);
  const [enquiryDeleteTarget, setEnquiryDeleteTarget] = useState<{
    ids: string[];
    items: { id: string; name: string; jobTitle?: string; mobile?: string }[];
    isMultiple: boolean;
    source: 'overview' | 'pipeline';
  } | null>(null);
  const [isDeletingEnquiries, setIsDeletingEnquiries] = useState(false);

  // Ad Modal State & Exclusive Live
  const [adModalOpen, setAdModalOpen] = useState(false);
  const [editingAd, setEditingAd] = useState<Partial<Advertisement> | null>(null);
  const [adExclusiveLive, setAdExclusiveLive] = useState(true);

  // Video Modal State & Exclusive Live
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [editingVideo, setEditingVideo] = useState<Partial<VideoItem> | null>(null);
  const [videoExclusiveLive, setVideoExclusiveLive] = useState(true);

  // Global Purge / Cleanup Modal State
  const [purgeModalOpen, setPurgeModalOpen] = useState(false);
  const [purgeMode, setPurgeMode] = useState<'leads' | 'all'>('leads');
  const [isPurging, setIsPurging] = useState(false);
  const [purgeOptions, setPurgeOptions] = useState({
    jobs: true,
    leads: true,
    ads: true,
    videos: true
  });

  // Settings form local state
  const [settingsForm, setSettingsForm] = useState<SiteSettings>(settings);
  const [logoModalOpen, setLogoModalOpen] = useState(false);
  const [brandingPreviewBg, setBrandingPreviewBg] = useState<'light' | 'dark'>('light');
  const [resetQrData, setResetQrData] = useState<{ otpAuthUri?: string; secretKey?: string } | null>(null);
  const [isResetting2fa, setIsResetting2fa] = useState(false);

  const handleReset2faEnrollment = async () => {
    if (!window.confirm('Reset 2FA enrollment? The admin will be prompted to re-enroll their authenticator app (Google Authenticator / Microsoft Authenticator) with a new QR code on next login.')) {
      return;
    }
    setIsResetting2fa(true);
    try {
      const res = await resetAdmin2faEnrollment();
      if (res.success) {
        setResetQrData({ otpAuthUri: res.otpAuthUri, secretKey: res.secretKey });
        setSettingsForm(prev => ({ ...prev, admin2faEnrolled: false }));
        showToast('2FA enrollment reset! Please scan the new QR code below.', 'success');
      } else {
        showToast(res.message || 'Failed to reset 2FA enrollment', 'error');
      }
    } catch {
      showToast('Error resetting 2FA enrollment', 'error');
    } finally {
      setIsResetting2fa(false);
    }
  };

  // Brevo Email Integration State
  const [brevoStatus, setBrevoStatus] = useState<BrevoStatusInfo | null>(null);
  const [isCheckingBrevo, setIsCheckingBrevo] = useState(false);
  const [showBrevoApiKey, setShowBrevoApiKey] = useState(false);
  const [brevoTestEmail, setBrevoTestEmail] = useState('');
  const [isSendingBrevoTest, setIsSendingBrevoTest] = useState(false);
  const [brevoTestResult, setBrevoTestResult] = useState<{ success: boolean; message: string; error?: string } | null>(null);

  const loadBrevoStatus = async () => {
    setIsCheckingBrevo(true);
    try {
      const res = await getBrevoStatus();
      setBrevoStatus(res);
    } catch {
      // ignore
    } finally {
      setIsCheckingBrevo(false);
    }
  };

  const handleTestBrevoDispatch = async () => {
    const targetEmail = brevoTestEmail.trim();
    if (!targetEmail || !targetEmail.includes('@') || !targetEmail.includes('.')) {
      showToast('Please enter a valid recipient email address to send the test message.', 'error');
      return;
    }
    setIsSendingBrevoTest(true);
    setBrevoTestResult(null);
    try {
      const res = await testBrevoEmail(
        targetEmail,
        settingsForm.brevoApiKey,
        settingsForm.brevoSenderEmail,
        settingsForm.brevoSenderName
      );
      setBrevoTestResult(res);
      if (res.success) {
        showToast(res.message, 'success');
        await loadBrevoStatus();
      } else {
        showToast(res.message || 'Brevo test email delivery failed', 'error');
      }
    } catch (err: any) {
      setBrevoTestResult({ success: false, message: err.message || 'Network error during test' });
      showToast('Failed to dispatch Brevo test email', 'error');
    } finally {
      setIsSendingBrevoTest(false);
    }
  };

  // Sync settingsForm when settings change
  React.useEffect(() => {
    setSettingsForm(settings);
    if (!brevoTestEmail && settings.email) {
      setBrevoTestEmail(settings.email);
    }
  }, [settings]);

  // Ensure candidate directory and lead data are freshly synchronized on mount and tab change
  React.useEffect(() => {
    refreshAdminCandidates();
    refreshEnquiries();
    if (activeTab === 'settings') {
      loadBrevoStatus();
    }
  }, [activeTab, refreshAdminCandidates, refreshEnquiries]);

  const handleLogout = () => {
    logout();
    setCurrentTab('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showToast('Logged out of Admin Portal successfully.', 'info');
  };

  if (!user || !isAdmin) {
    return (
      <div className="py-20 bg-stone-900 min-h-screen">
        <div className="max-w-md mx-auto px-4 text-center space-y-6">
          <div className="w-16 h-16 rounded-3xl bg-red-950 text-red-400 flex items-center justify-center mx-auto shadow-md border border-red-800">
            <Shield className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-extrabold text-white tracking-tight">Admin Portal Restricted</h2>
            <p className="text-xs sm:text-sm text-stone-400">
              Please sign in with authorized Arudhra Consultancy administrative credentials to access job publishing, lead tracking, and website configuration.
            </p>
          </div>
          <button
            onClick={() => setCurrentTab('admin-login')}
            className="w-full py-3.5 bg-red-900 hover:bg-red-800 text-white font-bold rounded-2xl shadow-md transition-all cursor-pointer"
          >
            Admin Sign In
          </button>
        </div>
      </div>
    );
  }

  // --- JOB HANDLERS ---
  const handleOpenNewJob = () => {
    setJobExclusiveLive(Boolean(settings.autoReplaceOldJobs));
    setJobClearOldLeads(Boolean(settings.autoClearOldLeadsOnNewJob));
    setEditingJob({
      title: '',
      category: 'Manufacturing & Production',
      employer: '',
      location: 'Jurong / Tuas, Singapore',
      salary: 'SGD 1,800 - 2,500 + OT',
      jobType: 'Work Permit',
      experience: '1-2 Years',
      qualification: 'ITI / Diploma / High School',
      vacancyCount: 5,
      description: '',
      responsibilities: ['Execute daily assigned tasks in Singapore facility.', 'Ensure safety and quality compliance.'],
      requirements: ['Valid Indian passport with at least 18 months validity.', 'Relevant trade training or experience.'],
      benefits: ['Overtime (1.5x / 2.0x)', 'Accommodation provided or subsidized allowance', 'Medical insurance coverage as per MOM'],
      requiredDocuments: ['Valid Passport (Color Scan)', 'Updated Bio-data / Resume', 'Educational & Trade Certificates', 'Passport Size Photo (White Background)'],
      featured: true,
      latest: true,
      status: 'published'
    });
    setJobModalOpen(true);
  };

  const handleEditJob = (job: Job) => {
    setEditingJob({ ...job });
    setJobModalOpen(true);
  };

  const handleSaveJobSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingJob?.title || !editingJob?.salary) {
      showToast('Please fill in Job Title and Salary', 'error');
      return;
    }
    await saveJob(editingJob);
    setJobModalOpen(false);
    setEditingJob(null);
  };

  const handleDeleteJobClick = (job: Job) => {
    setJobToDelete(job);
  };

  const handleConfirmDeleteJob = async () => {
    if (!jobToDelete) return;
    setIsDeletingJob(true);
    try {
      const res = await deleteJob(jobToDelete.id);
      if (res.success) {
        setJobToDelete(null);
      }
    } finally {
      setIsDeletingJob(false);
    }
  };

  // --- ENQUIRY HANDLERS ---
  const handleOpenEnquiryModal = (enq: Enquiry) => {
    setSelectedEnquiry(enq);
    setEnquiryStatusInput(enq.status);
    setEnquiryNotesInput(enq.adminNotes || '');
    setEnquiryFollowUpInput(enq.followUpDate || '');
    setEnquiryModalOpen(true);
  };

  const handleSaveEnquiry = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEnquiry) return;
    await updateEnquiryStatus(selectedEnquiry.id, enquiryStatusInput, enquiryNotesInput, enquiryFollowUpInput);
    setEnquiryModalOpen(false);
    setSelectedEnquiry(null);
  };

  const getWhatsAppCandidateUrl = (enq: Enquiry) => {
    const raw = enq.mobile.replace(/\D/g, '');
    const text = encodeURIComponent(
      `Hello ${enq.customerName}, this is Arudhra Consultancy regarding your Singapore overseas recruitment enquiry (Ref: ${enq.id}) for ${enq.jobTitle || 'Singapore opening'}. When is a good time for a quick phone briefing?`
    );
    return `https://wa.me/91${raw.slice(-10)}?text=${text}`;
  };

  // Filtered Candidates
  const filteredCandidates = adminCandidates.filter(cand => {
    if (candidateStatusFilter !== 'all') {
      const normalizedCandStatus = (cand.applicationStatus || '').toLowerCase().replace(/\s+/g, '_');
      const normalizedFilter = candidateStatusFilter.toLowerCase().replace(/\s+/g, '_');
      if (normalizedCandStatus !== normalizedFilter) return false;
    }
    if (candidateTradeFilter !== 'all' && cand.trade !== candidateTradeFilter && cand.educationTrade !== candidateTradeFilter) return false;
    if (candidateSearch.trim()) {
      const q = candidateSearch.toLowerCase();
      return (
        (cand.fullName && cand.fullName.toLowerCase().includes(q)) ||
        (cand.candidateId && cand.candidateId.toLowerCase().includes(q)) ||
        (cand.mobile && cand.mobile.toLowerCase().includes(q)) ||
        (cand.email && cand.email.toLowerCase().includes(q)) ||
        (cand.passportNumber && cand.passportNumber.toLowerCase().includes(q)) ||
        (cand.trade && cand.trade.toLowerCase().includes(q)) ||
        (cand.educationTrade && cand.educationTrade.toLowerCase().includes(q)) ||
        (cand.city && cand.city.toLowerCase().includes(q))
      );
    }
    return true;
  });

  const handleOpenCandidateModal = (cand: CandidateRecord) => {
    setSelectedCandidate(cand);
    setCandidateModalOpen(true);
  };

  const handleOpenCandidatePdf = (cand: CandidateRecord) => {
    setCandidatePdfCandidate(cand);
    setCandidatePdfOpen(true);
  };

  const handleConfirmDeleteCandidate = async () => {
    if (!candidateToDelete) return;
    setIsDeletingCandidate(true);
    const res = await adminDeleteCandidate(candidateToDelete.id);
    setIsDeletingCandidate(false);
    if (res.success) {
      setCandidateToDelete(null);
      if (selectedCandidate?.id === candidateToDelete.id) {
        setSelectedCandidate(null);
        setCandidateModalOpen(false);
      }
    }
  };

  // Filtered Enquiries
  const filteredEnquiries = enquiries.filter(enq => {
    if (enquiryStatusFilter !== 'all' && enq.status !== enquiryStatusFilter) return false;
    if (enquirySearch.trim()) {
      const q = enquirySearch.toLowerCase();
      return (
        enq.customerName.toLowerCase().includes(q) ||
        enq.mobile.toLowerCase().includes(q) ||
        enq.jobTitle?.toLowerCase().includes(q) ||
        enq.candidateTrade?.toLowerCase().includes(q) ||
        enq.id.toLowerCase().includes(q)
      );
    }
    return true;
  });

  // Candidate Applications / Enquiry Selection & Batch Deletion Helpers
  const recentEnquiriesList = enquiries.slice(0, 10);

  const handleToggleSelectRecent = (id: string) => {
    setSelectedRecentEnquiryIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleToggleSelectAllRecent = () => {
    if (recentEnquiriesList.length === 0) return;
    const allSelected = recentEnquiriesList.every(e => selectedRecentEnquiryIds.includes(e.id));
    if (allSelected) {
      setSelectedRecentEnquiryIds([]);
    } else {
      setSelectedRecentEnquiryIds(recentEnquiriesList.map(e => e.id));
    }
  };

  const handleToggleSelectPipeline = (id: string) => {
    setSelectedPipelineEnquiryIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleToggleSelectAllPipeline = () => {
    if (filteredEnquiries.length === 0) return;
    const allSelected = filteredEnquiries.every(e => selectedPipelineEnquiryIds.includes(e.id));
    if (allSelected) {
      setSelectedPipelineEnquiryIds([]);
    } else {
      setSelectedPipelineEnquiryIds(filteredEnquiries.map(e => e.id));
    }
  };

  const handleTriggerSingleEnquiryDelete = (enq: Enquiry, source: 'overview' | 'pipeline') => {
    setEnquiryDeleteTarget({
      ids: [enq.id],
      items: [{ id: enq.id, name: enq.customerName, jobTitle: enq.jobTitle, mobile: enq.mobile }],
      isMultiple: false,
      source
    });
  };

  const handleTriggerBatchEnquiryDelete = (source: 'overview' | 'pipeline') => {
    const ids = source === 'overview' ? selectedRecentEnquiryIds : selectedPipelineEnquiryIds;
    if (ids.length === 0) return;

    const items = enquiries
      .filter(e => ids.includes(e.id))
      .map(e => ({ id: e.id, name: e.customerName, jobTitle: e.jobTitle, mobile: e.mobile }));

    setEnquiryDeleteTarget({
      ids,
      items,
      isMultiple: ids.length > 1,
      source
    });
  };

  const handleConfirmEnquiryDelete = async () => {
    if (!enquiryDeleteTarget || enquiryDeleteTarget.ids.length === 0) return;
    setIsDeletingEnquiries(true);

    try {
      if (enquiryDeleteTarget.ids.length === 1) {
        await deleteEnquiry(enquiryDeleteTarget.ids[0]);
      } else {
        await batchDeleteEnquiries(enquiryDeleteTarget.ids);
      }

      // Clear selections
      if (enquiryDeleteTarget.source === 'overview') {
        setSelectedRecentEnquiryIds(prev => prev.filter(id => !enquiryDeleteTarget.ids.includes(id)));
      } else {
        setSelectedPipelineEnquiryIds(prev => prev.filter(id => !enquiryDeleteTarget.ids.includes(id)));
      }

      setEnquiryDeleteTarget(null);
    } finally {
      setIsDeletingEnquiries(false);
    }
  };

  // --- AD BANNER HANDLERS ---
  const handleOpenNewAd = () => {
    setAdExclusiveLive(settings.autoReplaceOldFlyers !== false);
    setEditingAd({
      title: 'Singapore Urgent Recruitment Drive',
      subtitle: 'Immediate vacancy filling across manufacturing & engineering plants.',
      image: 'https://images.unsplash.com/photo-1508873696983-2df5293cb32f?auto=format&fit=crop&w=1200&q=80',
      linkUrl: '#jobs',
      order: ads.length + 1,
      status: 'active'
    });
    setAdModalOpen(true);
  };

  const handleSaveAdSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingAd?.title) return;
    const isNew = !editingAd.id;
    await saveAd(editingAd, {
      replaceExisting: isNew ? adExclusiveLive : false
    });
    setAdModalOpen(false);
    setEditingAd(null);
  };

  // --- VIDEO HANDLERS ---
  const handleOpenNewVideo = () => {
    setVideoExclusiveLive(settings.autoReplaceOldVideos !== false);
    setEditingVideo({
      title: 'Singapore Work Permit & S Pass Orientation',
      youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      description: 'Understanding salary, food, accommodation, and overtime in Singapore.',
      category: 'Orientation',
      order: videos.length + 1,
      status: 'active'
    });
    setVideoModalOpen(true);
  };

  const handleSaveVideoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingVideo?.title || !editingVideo?.youtubeUrl) return;
    const isNew = !editingVideo.id;
    await saveVideo(editingVideo, {
      replaceExisting: isNew ? videoExclusiveLive : false
    });
    setVideoModalOpen(false);
    setEditingVideo(null);
  };

  // --- PURGE / CLEANUP HANDLERS ---
  const handleOpenPurgeLeads = () => {
    setPurgeMode('leads');
    setPurgeModalOpen(true);
  };

  const handleOpenPurgeAll = () => {
    setPurgeMode('all');
    setPurgeOptions({
      jobs: true,
      leads: true,
      ads: true,
      videos: true
    });
    setPurgeModalOpen(true);
  };

  const handleConfirmPurge = async () => {
    setIsPurging(true);
    try {
      if (purgeMode === 'leads') {
        await purgeAllEnquiries();
      } else {
        await purgeAllOldData({
          jobs: purgeOptions.jobs,
          enquiries: purgeOptions.leads,
          ads: purgeOptions.ads,
          videos: purgeOptions.videos
        });
      }
      setPurgeModalOpen(false);
    } finally {
      setIsPurging(false);
    }
  };

  // --- SETTINGS / BRANDING HANDLER ---
  const handleSaveSettingsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateSettings(settingsForm);
    await loadBrevoStatus();
  };

  return (
    <div className="min-h-screen bg-slate-100/90 text-slate-900 pb-16">
      {/* Top Admin Header */}
      <div className="bg-stone-950 text-white border-b border-red-950/60 sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-red-900 flex items-center justify-center text-white font-black text-sm">
                A
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="font-extrabold text-sm sm:text-base tracking-tight text-white">
                    Arudhra Admin Management
                  </h1>
                </div>
                <p className="text-[11px] text-stone-400">
                  Signed in as <span className="text-stone-200 font-semibold">{user.name || 'Administrator'}</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <button
                type="button"
                id="admin-back-btn"
                onClick={() => goBack('home')}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-stone-900 hover:bg-stone-800 text-stone-200 hover:text-white rounded-lg text-xs font-semibold border border-stone-800 transition-colors cursor-pointer group"
                title="Go Back (or press Esc)"
              >
                <ArrowLeft className="w-3.5 h-3.5 text-red-400 group-hover:-translate-x-0.5 transition-transform" />
                <span>Back</span>
                <kbd className="hidden sm:inline-block px-1 py-0.2 text-[9px] font-mono bg-stone-950 text-stone-400 rounded border border-stone-800">
                  Esc
                </kbd>
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-red-950 hover:bg-red-900 text-red-300 rounded-lg text-xs font-semibold border border-red-800 transition-colors cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex space-x-1 sm:space-x-2 overflow-x-auto py-2 text-xs font-semibold border-t border-stone-900">
          {[
            { id: 'overview', label: 'Overview', icon: FileText },
            { id: 'candidates', label: `Candidates (${adminCandidates.length})`, icon: User },
            { id: 'jobs', label: `Singapore Jobs (${jobs.length})`, icon: Briefcase },
            { id: 'enquiries', label: `Candidate Leads (${enquiries.length})`, icon: Users },
            { id: 'branding', label: 'Brand & Logo', icon: Building },
            { id: 'ads', label: 'Flyers & Ads', icon: ImageIcon },
            { id: 'videos', label: 'Videos', icon: Youtube },
            { id: 'settings', label: 'Website Settings', icon: Settings }
          ].map(tab => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                id={`admin-tab-${tab.id}`}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg whitespace-nowrap transition-all cursor-pointer ${
                  active
                    ? 'bg-red-900 text-white font-bold shadow-xs'
                    : 'text-stone-400 hover:text-white hover:bg-stone-900'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        {/* 1. OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Quick Metrics */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
                <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase tracking-wider">
                  <span>Registered Candidates</span>
                  <User className="w-4 h-4 text-red-900" />
                </div>
                <div className="mt-2 text-2xl font-black text-slate-900">{adminCandidates.length}</div>
                <span className="text-[11px] text-slate-500">Foreign Job Candidates</span>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
                <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase tracking-wider">
                  <span>Live Jobs</span>
                  <Briefcase className="w-4 h-4 text-red-900" />
                </div>
                <div className="mt-2 text-2xl font-black text-slate-900">{jobs.filter(j => j.status === 'published').length}</div>
                <span className="text-[11px] text-slate-500">Active in Singapore</span>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
                <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase tracking-wider">
                  <span>Total Leads</span>
                  <Users className="w-4 h-4 text-blue-600" />
                </div>
                <div className="mt-2 text-2xl font-black text-slate-900">{enquiries.length}</div>
                <span className="text-[11px] text-slate-500">Candidate enquiries</span>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
                <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase tracking-wider">
                  <span>Selected / IPA</span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                </div>
                <div className="mt-2 text-2xl font-black text-emerald-800">
                  {adminCandidates.filter(c => c.applicationStatus?.toLowerCase() === 'selected').length}
                </div>
                <span className="text-[11px] text-slate-500">Ready for Singapore</span>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
              <div>
                <h3 className="text-base font-bold text-slate-900">Manage Arudhra Recruitment Website</h3>
                <p className="text-xs text-slate-500">
                  Post new Singapore vacancies, update candidate enquiry progress, or customize logo & brand details.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => setActiveTab('candidates')}
                  className="px-4 py-2.5 bg-red-900 hover:bg-red-800 text-white rounded-xl text-xs font-bold shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <User className="w-4 h-4" />
                  <span>Candidate Directory ({adminCandidates.length})</span>
                </button>
                <button
                  onClick={handleOpenNewJob}
                  className="px-4 py-2.5 bg-slate-900 hover:bg-black text-white rounded-xl text-xs font-bold shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Post Singapore Job</span>
                </button>
                <button
                  onClick={() => setActiveTab('enquiries')}
                  className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Users className="w-4 h-4 text-slate-600" />
                  <span>Review Leads</span>
                </button>
              </div>
            </div>

            {/* Recent Enquiries Table */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
              <div className="p-4 sm:p-5 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <h3 className="font-bold text-sm text-slate-900">Recent Candidate Applications</h3>
                  {selectedRecentEnquiryIds.length > 0 ? (
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-rose-600 animate-pulse"></span>
                      {selectedRecentEnquiryIds.length} Selected
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 text-slate-600 border border-slate-200">
                      {enquiries.length} Total
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  {selectedRecentEnquiryIds.length > 0 && (
                    <>
                      <button
                        type="button"
                        id="delete-selected-recent-applications-btn"
                        onClick={() => handleTriggerBatchEnquiryDelete('overview')}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold shadow-xs transition-all cursor-pointer"
                        title="Delete selected candidate applications"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete Selected ({selectedRecentEnquiryIds.length})</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setSelectedRecentEnquiryIds([])}
                        className="px-2.5 py-1.5 text-xs text-slate-600 hover:text-slate-900 font-semibold rounded-lg hover:bg-slate-100 cursor-pointer"
                      >
                        Clear
                      </button>
                    </>
                  )}
                  <button
                    onClick={() => setActiveTab('enquiries')}
                    className="text-xs font-bold text-red-900 hover:underline cursor-pointer"
                  >
                    View All ({enquiries.length}) →
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-500 uppercase font-semibold border-b border-slate-200">
                    <tr>
                      <th className="w-10 p-3.5 pl-4 sm:pl-5 text-center">
                        <input
                          type="checkbox"
                          id="select-all-recent-enquiries-checkbox"
                          checked={recentEnquiriesList.length > 0 && recentEnquiriesList.every(e => selectedRecentEnquiryIds.includes(e.id))}
                          onChange={handleToggleSelectAllRecent}
                          className="w-4 h-4 text-red-900 rounded border-slate-300 focus:ring-red-900 cursor-pointer"
                          title="Select all recent candidate applications"
                        />
                      </th>
                      <th className="p-3.5">Candidate</th>
                      <th className="p-3.5">Mobile</th>
                      <th className="p-3.5">Singapore Opening</th>
                      <th className="p-3.5">Status</th>
                      <th className="p-3.5">Applied Date</th>
                      <th className="p-3.5 pr-5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {recentEnquiriesList.map(enq => {
                      const isSelected = selectedRecentEnquiryIds.includes(enq.id);
                      return (
                        <tr key={enq.id} className={`transition-colors ${isSelected ? 'bg-rose-50/60' : 'hover:bg-slate-50/70'}`}>
                          <td className="w-10 p-3.5 pl-4 sm:pl-5 text-center">
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => handleToggleSelectRecent(enq.id)}
                              className="w-4 h-4 text-red-900 rounded border-slate-300 focus:ring-red-900 cursor-pointer"
                              title={`Select application ${enq.id}`}
                            />
                          </td>
                          <td className="p-3.5 font-bold text-slate-900">
                            <div>
                              <span>{enq.customerName}</span>
                              <span className="block text-[10px] font-mono text-slate-400 font-normal">{enq.id}</span>
                            </div>
                          </td>
                          <td className="p-3.5 text-slate-600 font-mono">{enq.mobile}</td>
                          <td className="p-3.5 text-slate-700 font-medium">{enq.jobTitle || 'General Singapore Enquiry'}</td>
                          <td className="p-3.5">
                            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-200 uppercase">
                              {enq.status}
                            </span>
                          </td>
                          <td className="p-3.5 text-slate-500">{enq.createdAt?.slice(0, 10) || enq.createdAt}</td>
                          <td className="p-3.5 pr-5 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                onClick={() => handleOpenEnquiryModal(enq)}
                                className="px-2.5 py-1 bg-red-50 text-red-900 font-bold rounded-lg hover:bg-red-100 transition-colors text-xs cursor-pointer"
                              >
                                Update
                              </button>
                              <button
                                onClick={() => handleTriggerSingleEnquiryDelete(enq, 'overview')}
                                className="p-1.5 text-slate-400 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                                title={`Delete Application ${enq.id}`}
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                    {recentEnquiriesList.length === 0 && (
                      <tr>
                        <td colSpan={7} className="p-8 text-center text-slate-400">
                          No recent candidate applications found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* CANDIDATES TAB */}
        {activeTab === 'candidates' && (
          <div className="space-y-6">
            {/* Top Control Header */}
            <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg sm:text-xl font-extrabold text-slate-900">
                    Foreign Job Candidates Master Directory
                  </h2>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-50 text-red-900 border border-red-200">
                    {filteredCandidates.length} Active Records
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Permanent candidate records automatically updated whenever a customer registers, submits profile bio-data, uploads passport/documents, or marks job interest.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={refreshAdminCandidates}
                  className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
                >
                  Refresh Data
                </button>
              </div>
            </div>

            {/* Candidate Search & Filter Toolbar */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
              <div className="relative flex-1 min-w-[240px]">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  value={candidateSearch}
                  onChange={e => setCandidateSearch(e.target.value)}
                  placeholder="Search candidate name, CAND-ID, mobile, passport, trade, city..."
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-red-900"
                />
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <select
                  value={candidateStatusFilter}
                  onChange={e => setCandidateStatusFilter(e.target.value)}
                  className="px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700"
                >
                  <option value="all">All Pipeline Stages</option>
                  <option value="submitted">Submitted (New)</option>
                  <option value="under_review">Under Review</option>
                  <option value="shortlisted">Shortlisted</option>
                  <option value="interview">Interview Scheduled</option>
                  <option value="selected">Selected / IPA Ready</option>
                  <option value="on_hold">On Hold / Docs Required</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
            </div>

            {/* Candidate Records Table */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-600 uppercase font-bold border-b border-slate-200">
                    <tr>
                      <th className="p-4 pl-6">Candidate ID</th>
                      <th className="p-4">Candidate Details</th>
                      <th className="p-4">Passport & Travel</th>
                      <th className="p-4">Trade & Experience</th>
                      <th className="p-4">Docs & Activity</th>
                      <th className="p-4">Recruitment Status</th>
                      <th className="p-4 pr-6 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredCandidates.length > 0 ? (
                      filteredCandidates.map(cand => (
                        <tr key={cand.id} className="hover:bg-slate-50/80 transition-colors">
                          {/* Candidate ID */}
                          <td className="p-4 pl-6">
                            <span className="font-mono font-bold text-red-900 bg-red-50 px-2 py-1 rounded-md border border-red-200">
                              {cand.candidateId}
                            </span>
                            <span className="block text-[10px] text-slate-400 mt-1">
                              {cand.updatedAt?.slice(0, 10) || cand.createdAt?.slice(0, 10)}
                            </span>
                          </td>

                          {/* Candidate Details */}
                          <td className="p-4">
                            <div className="font-bold text-slate-900 text-sm">
                              {cand.fullName || 'Overseas Candidate'}
                            </div>
                            <div className="flex items-center gap-1 text-slate-600 text-xs mt-0.5">
                              <Phone className="w-3 h-3 text-emerald-600" />
                              <span className="font-mono">{cand.mobile}</span>
                            </div>
                            {cand.city && (
                              <span className="text-[11px] text-slate-500 block">
                                {cand.city}, {cand.state || 'India'}
                              </span>
                            )}
                          </td>

                          {/* Passport Info */}
                          <td className="p-4">
                            {cand.passportNumber ? (
                              <div>
                                <span className="font-mono font-bold text-slate-900 text-xs">
                                  {cand.passportNumber}
                                </span>
                                <span className="block text-[10px] text-slate-500">
                                  {cand.passportEcrStatus || 'ECNR'} • Exp: {cand.passportExpiryDate || 'N/A'}
                                </span>
                              </div>
                            ) : (
                              <span className="text-slate-400 italic text-[11px]">Passport not submitted</span>
                            )}
                          </td>

                          {/* Trade & Experience */}
                          <td className="p-4">
                            <span className="font-bold text-slate-800 block">
                              {cand.trade || cand.educationTrade || 'General Worker'}
                            </span>
                            <span className="text-[11px] text-slate-500 block">
                              🇸🇬 SG: <strong className="text-red-900">{cand.singaporeExperienceYears || 0}y</strong> | Total: {cand.totalExperienceYears || 0}y
                            </span>
                          </td>

                          {/* Docs & Activity */}
                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-semibold text-[11px] flex items-center gap-1">
                                <FileText className="w-3 h-3 text-red-900" />
                                <span>{cand.documents?.length || 0} Docs</span>
                              </span>
                            </div>
                            <span className="text-[10px] text-slate-400 block mt-1">
                              {(cand.applications?.length || 0)} Enquiries • {(cand.interestedJobs?.length || 0)} Bookmarked
                            </span>
                          </td>

                          {/* Recruitment Status */}
                          <td className="p-4">
                            <span
                              className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                                cand.applicationStatus === 'selected'
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : cand.applicationStatus === 'shortlisted' || cand.applicationStatus === 'interview'
                                  ? 'bg-amber-100 text-amber-800'
                                  : cand.applicationStatus === 'under_review'
                                  ? 'bg-purple-100 text-purple-800'
                                  : 'bg-blue-100 text-blue-800'
                              }`}
                            >
                              {cand.applicationStatus ? cand.applicationStatus.replace('_', ' ') : 'SUBMITTED'}
                            </span>
                            {cand.adminRemarks && (
                              <p className="text-[10px] text-slate-500 max-w-[140px] truncate mt-0.5" title={cand.adminRemarks}>
                                {cand.adminRemarks}
                              </p>
                            )}
                          </td>

                          {/* Actions */}
                          <td className="p-4 pr-6 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                onClick={() => handleOpenCandidateModal(cand)}
                                className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-lg transition-colors cursor-pointer flex items-center gap-1 text-xs"
                                title="View Full Candidate Profile & Manage Status"
                              >
                                <Eye className="w-3.5 h-3.5 text-red-900" />
                                <span>Profile</span>
                              </button>
                              <button
                                onClick={() => handleOpenCandidatePdf(cand)}
                                className="px-2.5 py-1.5 bg-red-900 hover:bg-red-800 text-white font-bold rounded-lg transition-colors shadow-2xs cursor-pointer flex items-center gap-1 text-xs"
                                title="Generate PDF Dossier"
                              >
                                <Printer className="w-3.5 h-3.5" />
                                <span>PDF</span>
                              </button>
                              <button
                                onClick={() => setCandidateToDelete(cand)}
                                className="px-2.5 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 hover:text-rose-800 font-bold rounded-lg transition-colors border border-rose-200 shadow-2xs cursor-pointer flex items-center gap-1 text-xs"
                                title={`Delete Candidate ${cand.candidateId || cand.fullName}`}
                              >
                                <Trash2 className="w-3.5 h-3.5 text-rose-600" />
                                <span>Delete</span>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={7} className="p-12 text-center text-slate-400">
                          <User className="w-8 h-8 mx-auto mb-2 text-slate-300" />
                          <p className="text-sm font-semibold">No candidate records matched your filter criteria.</p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* 2. JOBS TAB */}
        {activeTab === 'jobs' && (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-base font-bold text-slate-900">Singapore Job Postings</h2>
                  {jobs.length === 1 && (
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold text-[10px] flex items-center gap-1">
                      <Check className="w-3 h-3 text-emerald-600" />
                      <span>1 Exclusive Live Job</span>
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Manage live vacancies. Adding a new job automatically deletes expired listings and resets candidate applications.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleOpenPurgeAll}
                  className="px-3 py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                  title="Purge all old data (jobs, leads, flyers, videos)"
                >
                  <Trash2 className="w-3.5 h-3.5 text-rose-600" />
                  <span>Cleanup Old Data</span>
                </button>
                <button
                  onClick={handleOpenNewJob}
                  className="px-4 py-2.5 bg-red-900 hover:bg-red-800 text-white rounded-xl text-xs font-bold shadow-md flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Singapore Vacancy</span>
                </button>
              </div>
            </div>

            {jobs.length > 1 && (
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 flex items-center justify-between gap-2 text-xs text-amber-900">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-700 shrink-0" />
                  <span>Notice: You currently have {jobs.length} jobs stored. When publishing a new vacancy with <strong>Exclusive Live Mode</strong>, old jobs will be automatically deleted so only the newest job remains active.</span>
                </div>
                <button
                  onClick={handleOpenPurgeAll}
                  className="px-2.5 py-1 bg-amber-200/70 hover:bg-amber-200 text-amber-950 font-bold rounded-lg text-[11px] shrink-0 cursor-pointer"
                >
                  Clean Now
                </button>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {jobs.map(job => (
                <div key={job.id} className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-xs mb-2">
                      <span className="px-2 py-0.5 rounded-full bg-red-50 text-red-900 font-bold border border-red-200 text-[10px]">
                        🇸🇬 {job.jobType}
                      </span>
                      <span className="text-slate-400 font-mono text-[11px]">Ref: {job.id}</span>
                    </div>
                    <h3 className="font-bold text-slate-900 text-sm">{job.title}</h3>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">{job.category}</p>

                    <div className="mt-3 p-2 bg-red-50/60 rounded-lg text-xs flex items-center justify-between border border-red-100">
                      <span className="text-red-950 font-semibold">Salary:</span>
                      <span className="font-bold text-red-900">{job.salary}</span>
                    </div>

                    <div className="mt-2 text-[11px] text-slate-600 space-y-1">
                      <p>• {job.location}</p>
                      <p>• {job.experience} | {job.qualification}</p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className={`text-[11px] font-bold ${job.status === 'published' ? 'text-emerald-600' : 'text-slate-400'}`}>
                      ● {job.status === 'published' ? 'Published' : 'Draft'}
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEditJob(job)}
                        className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                        title="Edit Job"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        id={`delete-job-btn-${job.id}`}
                        onClick={() => handleDeleteJobClick(job)}
                        className="p-2 text-rose-600 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer flex items-center gap-1 text-xs font-semibold"
                        title={`Delete ${job.title}`}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 3. ENQUIRIES / LEADS TAB */}
        {activeTab === 'enquiries' && (
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2.5">
                  <h2 className="text-base font-bold text-slate-900">Candidate Leads & Application Pipeline</h2>
                  {selectedPipelineEnquiryIds.length > 0 && (
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-rose-600 animate-pulse"></span>
                      {selectedPipelineEnquiryIds.length} Selected
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-500">Track candidate status from enquiry through MOM submission and IPA selection.</p>
              </div>

              <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                <button
                  type="button"
                  id="purge-all-leads-btn"
                  onClick={handleOpenPurgeLeads}
                  className="flex items-center gap-1.5 px-3 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-2xs"
                  title="Purge all old candidate applications"
                >
                  <Trash2 className="w-3.5 h-3.5 text-rose-600" />
                  <span>Purge All Leads ({enquiries.length})</span>
                </button>

                {selectedPipelineEnquiryIds.length > 0 && (
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      id="delete-selected-pipeline-applications-btn"
                      onClick={() => handleTriggerBatchEnquiryDelete('pipeline')}
                      className="flex items-center gap-1.5 px-3 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold shadow-xs transition-all cursor-pointer"
                      title="Delete selected candidate applications"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete Selected ({selectedPipelineEnquiryIds.length})</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedPipelineEnquiryIds([])}
                      className="px-2.5 py-1.5 text-xs text-slate-600 hover:text-slate-900 font-semibold rounded-lg hover:bg-slate-100 cursor-pointer"
                    >
                      Clear
                    </button>
                  </div>
                )}

                <div className="relative flex-1 sm:w-64">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={enquirySearch}
                    onChange={e => setEnquirySearch(e.target.value)}
                    placeholder="Search candidate name, mobile, trade..."
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:outline-hidden"
                  />
                </div>

                <select
                  value={enquiryStatusFilter}
                  onChange={e => setEnquiryStatusFilter(e.target.value)}
                  className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold"
                >
                  <option value="all">All Pipeline Stages</option>
                  <option value="new">New Enquiries</option>
                  <option value="contacted">Contacted</option>
                  <option value="interested">Interested / Screened</option>
                  <option value="documents_pending">Documents Pending</option>
                  <option value="processing">MOM Processing</option>
                  <option value="selected">Selected / IPA Ready</option>
                  <option value="closed">Closed / Ineligible</option>
                </select>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-500 uppercase font-semibold border-b border-slate-200">
                    <tr>
                      <th className="w-10 p-3.5 pl-4 sm:pl-5 text-center">
                        <input
                          type="checkbox"
                          id="select-all-pipeline-enquiries-checkbox"
                          checked={filteredEnquiries.length > 0 && filteredEnquiries.every(e => selectedPipelineEnquiryIds.includes(e.id))}
                          onChange={handleToggleSelectAllPipeline}
                          className="w-4 h-4 text-red-900 rounded border-slate-300 focus:ring-red-900 cursor-pointer"
                          title="Select all candidate applications in filter"
                        />
                      </th>
                      <th className="p-3.5">Lead ID</th>
                      <th className="p-3.5">Candidate</th>
                      <th className="p-3.5">Mobile</th>
                      <th className="p-3.5">Singapore Opening</th>
                      <th className="p-3.5">Trade / Exp</th>
                      <th className="p-3.5">Status</th>
                      <th className="p-3.5">Admin Notes</th>
                      <th className="p-3.5 pr-5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredEnquiries.map(enq => {
                      const isSelected = selectedPipelineEnquiryIds.includes(enq.id);
                      return (
                        <tr key={enq.id} className={`transition-colors ${isSelected ? 'bg-rose-50/60' : 'hover:bg-slate-50/70'}`}>
                          <td className="w-10 p-3.5 pl-4 sm:pl-5 text-center">
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => handleToggleSelectPipeline(enq.id)}
                              className="w-4 h-4 text-red-900 rounded border-slate-300 focus:ring-red-900 cursor-pointer"
                              title={`Select application ${enq.id}`}
                            />
                          </td>
                          <td className="p-3.5 font-mono text-slate-400">{enq.id}</td>
                          <td className="p-3.5 font-bold text-slate-900">{enq.customerName}</td>
                          <td className="p-3.5 text-slate-700 font-mono font-semibold">{enq.mobile}</td>
                          <td className="p-3.5 text-slate-800 font-medium">{enq.jobTitle || 'General Enquiry'}</td>
                          <td className="p-3.5 text-slate-600">
                            {enq.candidateTrade || '—'} {enq.candidateExperience ? `(${enq.candidateExperience})` : ''}
                          </td>
                          <td className="p-3.5">
                            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-red-50 text-red-900 border border-red-200 uppercase">
                              {enq.status}
                            </span>
                          </td>
                          <td className="p-3.5 text-slate-500 max-w-xs truncate">{enq.adminNotes || '—'}</td>
                          <td className="p-3.5 pr-5 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <a
                                href={`tel:${enq.mobile.replace(/\s+/g, '')}`}
                                className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg"
                                title="Call Candidate"
                              >
                                <Phone className="w-3.5 h-3.5" />
                              </a>
                              <a
                                href={getWhatsAppCandidateUrl(enq)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-1.5 bg-emerald-100 hover:bg-emerald-200 text-emerald-800 rounded-lg"
                                title="WhatsApp Message"
                              >
                                <MessageSquare className="w-3.5 h-3.5" />
                              </a>
                              <button
                                onClick={() => handleOpenEnquiryModal(enq)}
                                className="px-2.5 py-1 bg-red-900 hover:bg-red-800 text-white font-bold rounded-lg text-xs cursor-pointer"
                              >
                                Update
                              </button>
                              <button
                                onClick={() => handleTriggerSingleEnquiryDelete(enq, 'pipeline')}
                                className="p-1.5 text-slate-400 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                                title={`Delete Application ${enq.id}`}
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                    {filteredEnquiries.length === 0 && (
                      <tr>
                        <td colSpan={9} className="p-8 text-center text-slate-400">
                          No candidate leads found matching the filter.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* 4. BRANDING & LOGO TAB (ADMIN CONTROLLED BRANDING) */}
        {activeTab === 'branding' && (
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-5">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-bold text-slate-900">Admin Brand & Logo Management</h2>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-100 text-red-900">
                    Live Header Sync
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Upload or link a custom company logo, style the initial monogram emblem, and customize company typography.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setLogoModalOpen(true)}
                className="px-4 py-2.5 bg-red-50 hover:bg-red-100 text-red-900 border border-red-200 rounded-xl text-xs font-bold shadow-2xs flex items-center gap-2 cursor-pointer transition-all"
              >
                <Palette className="w-4 h-4 text-red-800" />
                <span>Open Visual Customizer Modal</span>
              </button>
            </div>

            {/* Live Interactive Preview Card */}
            <div className="p-5 bg-slate-50/80 border border-slate-200 rounded-2xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-red-900" />
                  <span>Real-Time Header Preview</span>
                </span>
                <div className="flex items-center gap-1 bg-white p-0.5 rounded-lg border border-slate-200 text-[11px] font-semibold">
                  <button
                    type="button"
                    onClick={() => setBrandingPreviewBg('light')}
                    className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                      brandingPreviewBg === 'light' ? 'bg-slate-900 text-white font-bold' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Light Navbar
                  </button>
                  <button
                    type="button"
                    onClick={() => setBrandingPreviewBg('dark')}
                    className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                      brandingPreviewBg === 'dark' ? 'bg-stone-900 text-white font-bold' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Dark Footer
                  </button>
                </div>
              </div>

              <div
                className={`p-4 sm:p-6 rounded-2xl border transition-all flex items-center justify-between ${
                  brandingPreviewBg === 'light'
                    ? 'bg-white border-slate-200 shadow-xs text-slate-900'
                    : 'bg-stone-950 border-stone-800 shadow-md text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  {settingsForm.logoDisplayMode === 'image_only' && settingsForm.logoUrl ? (
                    <img
                      src={settingsForm.logoUrl}
                      alt={settingsForm.businessName}
                      className="h-12 max-w-[190px] object-contain"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <>
                      {settingsForm.logoUrl && settingsForm.logoDisplayMode === 'image_text' ? (
                        <img
                          src={settingsForm.logoUrl}
                          alt={settingsForm.businessName}
                          className="h-11 w-11 rounded-xl object-cover shadow-xs border border-slate-200"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <div
                          style={{ backgroundColor: settingsForm.logoEmblemBg || '#7f1d1d' }}
                          className={`w-11 h-11 ${settingsForm.logoEmblemShape || 'rounded-xl'} flex items-center justify-center text-white shadow-md border border-white/10`}
                        >
                          <span className="font-extrabold text-xl tracking-wider text-white select-none">
                            {settingsForm.logoEmblemText || 'A'}
                          </span>
                        </div>
                      )}

                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className={`text-lg sm:text-xl font-black tracking-tight ${brandingPreviewBg === 'light' ? 'text-slate-900' : 'text-white'}`}>
                            {settingsForm.logoTitle || 'ARUDHRA'}{' '}
                            <span className={brandingPreviewBg === 'light' ? 'text-red-900 font-bold' : 'text-red-400 font-bold'}>
                              {settingsForm.logoSubtitle || 'CONSULTANCY'}
                            </span>
                          </span>
                        </div>
                        <p className={`text-[11px] font-medium truncate max-w-[220px] sm:max-w-xs ${brandingPreviewBg === 'light' ? 'text-slate-500' : 'text-stone-400'}`}>
                          {settingsForm.tagline || 'Singapore Overseas Recruitment & Placement Support'}
                        </p>
                      </div>
                    </>
                  )}
                </div>

                <div className="hidden sm:block text-right">
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm ${
                    brandingPreviewBg === 'light' ? 'bg-red-50 text-red-900 border border-red-200' : 'bg-red-950 text-red-300 border border-red-800'
                  }`}>
                    Live Preview
                  </span>
                </div>
              </div>
            </div>

            <form onSubmit={handleSaveSettingsSubmit} className="space-y-6">
              {/* 1. Logo Display Mode */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-red-900" />
                  <span>Logo Layout Style</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { id: 'emblem_text', title: 'Monogram + Title', desc: 'Stylized initial emblem with typography' },
                    { id: 'image_only', title: 'Custom Image Logo', desc: 'Display uploaded graphic logo image' },
                    { id: 'image_text', title: 'Image Icon + Title', desc: 'Square image avatar with brand title' }
                  ].map(opt => (
                    <button
                      type="button"
                      key={opt.id}
                      onClick={() => setSettingsForm({ ...settingsForm, logoDisplayMode: opt.id as any })}
                      className={`p-3.5 text-left rounded-xl border transition-all cursor-pointer ${
                        (settingsForm.logoDisplayMode || 'emblem_text') === opt.id
                          ? 'border-red-900 bg-red-50/70 shadow-xs ring-1 ring-red-900'
                          : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      <div className="font-bold text-xs text-slate-900 flex items-center justify-between">
                        <span>{opt.title}</span>
                        {(settingsForm.logoDisplayMode || 'emblem_text') === opt.id && <Check className="w-3.5 h-3.5 text-red-900" />}
                      </div>
                      <p className="text-[11px] text-slate-500 mt-1 leading-snug">{opt.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Emblem Monogram Styling */}
              {settingsForm.logoDisplayMode !== 'image_only' && (
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                  <h4 className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                    <Palette className="w-3.5 h-3.5 text-red-900" />
                    <span>Emblem Monogram Styling</span>
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Emblem Letter / Monogram
                      </label>
                      <input
                        type="text"
                        maxLength={3}
                        value={settingsForm.logoEmblemText || 'A'}
                        onChange={e => setSettingsForm({ ...settingsForm, logoEmblemText: e.target.value.toUpperCase() })}
                        placeholder="e.g. A or AC"
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-black text-center text-slate-900"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Corner Shape</label>
                      <select
                        value={settingsForm.logoEmblemShape || 'rounded-xl'}
                        onChange={e => setSettingsForm({ ...settingsForm, logoEmblemShape: e.target.value as any })}
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-800"
                      >
                        <option value="rounded-xl">Rounded Square (Default)</option>
                        <option value="rounded-2xl">Squircle</option>
                        <option value="rounded-full">Circle</option>
                        <option value="rounded-lg">Compact Rounded</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Background Color</label>
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          value={settingsForm.logoEmblemBg?.startsWith('#') ? settingsForm.logoEmblemBg : '#7f1d1d'}
                          onChange={e => setSettingsForm({ ...settingsForm, logoEmblemBg: e.target.value })}
                          className="w-8 h-8 rounded-lg cursor-pointer border border-slate-200 p-0.5"
                        />
                        <input
                          type="text"
                          value={settingsForm.logoEmblemBg || '#7f1d1d'}
                          onChange={e => setSettingsForm({ ...settingsForm, logoEmblemBg: e.target.value })}
                          placeholder="#7f1d1d"
                          className="w-full px-2 py-2 bg-white border border-slate-200 rounded-xl text-xs font-mono"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Swatches */}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1.5">Color Presets</label>
                    <div className="flex flex-wrap gap-2">
                      {[
                        { name: 'Arudhra Burgundy', value: '#7f1d1d' },
                        { name: 'Singapore Crimson', value: '#dc2626' },
                        { name: 'Deep Royal Navy', value: '#0f172a' },
                        { name: 'Maritime Blue', value: '#1e3a8a' },
                        { name: 'Emerald Green', value: '#047857' },
                        { name: 'Golden Amber', value: '#b45309' },
                        { name: 'Steel Slate', value: '#334155' }
                      ].map(c => (
                        <button
                          key={c.value}
                          type="button"
                          onClick={() => setSettingsForm({ ...settingsForm, logoEmblemBg: c.value })}
                          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-semibold border transition-all cursor-pointer ${
                            settingsForm.logoEmblemBg === c.value
                              ? 'bg-white shadow-xs border-slate-400 font-bold ring-1 ring-slate-400'
                              : 'bg-white/80 hover:bg-white border-slate-200 text-slate-700'
                          }`}
                        >
                          <span className="w-3 h-3 rounded-full shadow-xs" style={{ backgroundColor: c.value }} />
                          <span>{c.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* 3. Custom Logo Image File Upload & URL */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                <h4 className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <ImageIcon className="w-3.5 h-3.5 text-red-900" />
                  <span>Custom Logo Image File or URL</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Upload Logo Image from Device (PNG, JPG, SVG)
                    </label>
                    <label className="flex items-center justify-center gap-2 w-full p-2.5 bg-white border border-dashed border-slate-300 hover:border-red-900 rounded-xl text-xs font-semibold text-slate-700 cursor-pointer transition-colors">
                      <Upload className="w-4 h-4 text-red-900" />
                      <span>Choose File from Computer</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (!file) return;
                          const reader = new FileReader();
                          reader.onload = (event) => {
                            const dataUrl = event.target?.result as string;
                            if (dataUrl) {
                              setSettingsForm({
                                ...settingsForm,
                                logoUrl: dataUrl,
                                logoDisplayMode: settingsForm.logoDisplayMode === 'emblem_text' ? 'image_only' : settingsForm.logoDisplayMode
                              });
                            }
                          };
                          reader.readAsDataURL(file);
                        }}
                        className="hidden"
                      />
                    </label>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Or Paste Image Direct URL
                    </label>
                    <input
                      type="text"
                      value={settingsForm.logoUrl || ''}
                      onChange={e => setSettingsForm({ ...settingsForm, logoUrl: e.target.value })}
                      placeholder="https://your-domain.com/logo.png"
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs focus:outline-hidden"
                    />
                  </div>
                </div>

                {settingsForm.logoUrl && (
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" /> Image attached to branding profile
                    </span>
                    <button
                      type="button"
                      onClick={() => setSettingsForm({
                        ...settingsForm,
                        logoUrl: '',
                        logoDisplayMode: settingsForm.logoDisplayMode === 'image_only' ? 'emblem_text' : settingsForm.logoDisplayMode
                      })}
                      className="text-xs text-rose-600 hover:underline font-semibold cursor-pointer"
                    >
                      Remove Attached Image
                    </button>
                  </div>
                )}
              </div>

              {/* 4. Brand Typography & Titles */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Company Typography & Header Text
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Brand Main Title</label>
                    <input
                      type="text"
                      value={settingsForm.logoTitle || 'ARUDHRA'}
                      onChange={e => setSettingsForm({ ...settingsForm, logoTitle: e.target.value })}
                      placeholder="ARUDHRA"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:bg-white focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Brand Subtitle / Suffix</label>
                    <input
                      type="text"
                      value={settingsForm.logoSubtitle || 'CONSULTANCY'}
                      onChange={e => setSettingsForm({ ...settingsForm, logoSubtitle: e.target.value })}
                      placeholder="CONSULTANCY"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:bg-white focus:outline-hidden"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Website Tagline / Positioning</label>
                  <input
                    type="text"
                    value={settingsForm.tagline || 'Singapore Overseas Recruitment & Placement Support'}
                    onChange={e => setSettingsForm({ ...settingsForm, tagline: e.target.value })}
                    placeholder="Singapore Overseas Recruitment & Placement Support"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:outline-hidden"
                  />
                </div>
              </div>

              {/* 5. Website Theme & Brand Color Scheme */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-800 flex items-center gap-1.5 uppercase tracking-wider">
                    <Palette className="w-3.5 h-3.5 text-red-900" />
                    <span>Website Official Theme & Color Scheme</span>
                  </h4>
                  <span className="text-[10px] font-bold text-slate-500 bg-white px-2 py-0.5 rounded-full border border-slate-200">
                    Applies to all visitors
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
                  {[
                    { id: 'crimson', name: 'Singapore Crimson', primary: '#7f1d1d', accent: '#dc2626' },
                    { id: 'navy', name: 'Sapphire Navy', primary: '#1e3a8a', accent: '#2563eb' },
                    { id: 'emerald', name: 'Prestige Emerald', primary: '#064e3b', accent: '#059669' },
                    { id: 'charcoal', name: 'Executive Charcoal', primary: '#0f172a', accent: '#475569' },
                    { id: 'amber', name: 'Royal Amber & Gold', primary: '#78350f', accent: '#d97706' }
                  ].map(theme => {
                    const isSelected = (settingsForm.themeColor || 'crimson') === theme.id;
                    return (
                      <button
                        type="button"
                        key={theme.id}
                        onClick={() => setSettingsForm({ ...settingsForm, themeColor: theme.id as any })}
                        className={`p-3 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-between ${
                          isSelected
                            ? 'border-red-900 bg-white ring-2 ring-red-900 shadow-xs'
                            : 'border-slate-200 bg-white hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-center -space-x-1 mb-2">
                          <span className="w-6 h-6 rounded-full border-2 border-white shadow-xs" style={{ backgroundColor: theme.primary }} />
                          <span className="w-4 h-4 rounded-full border-2 border-white shadow-xs" style={{ backgroundColor: theme.accent }} />
                        </div>
                        <span className="text-xs font-bold text-slate-900 block leading-tight">{theme.name}</span>
                        {isSelected ? (
                          <span className="mt-1.5 px-2 py-0.5 rounded-full text-[9px] font-black bg-red-900 text-white">Selected</span>
                        ) : (
                          <span className="mt-1.5 text-[10px] text-slate-400">Choose</span>
                        )}
                      </button>
                    );
                  })}
                </div>

                <div className="pt-3 border-t border-slate-200">
                  <label className="block text-xs font-bold text-slate-700 mb-2">Default Display Mode for Visitors</label>
                  <div className="grid grid-cols-2 gap-3 max-w-sm">
                    <button
                      type="button"
                      onClick={() => setSettingsForm({ ...settingsForm, themeMode: 'light' })}
                      className={`p-2.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-all ${
                        (settingsForm.themeMode || 'light') === 'light'
                          ? 'border-red-900 bg-white ring-2 ring-red-900 text-slate-900 shadow-xs'
                          : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <Sun className="w-4 h-4 text-amber-500" />
                      <span>Light Mode</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setSettingsForm({ ...settingsForm, themeMode: 'dark' })}
                      className={`p-2.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-all ${
                        settingsForm.themeMode === 'dark'
                          ? 'border-red-900 bg-slate-900 ring-2 ring-red-900 text-white shadow-xs'
                          : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <Moon className="w-4 h-4 text-indigo-400" />
                      <span>Dark Mode</span>
                    </button>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setSettingsForm({
                      ...settingsForm,
                      logoDisplayMode: 'image_only',
                      logoUrl: '/arudhra-logo.png',
                      logoEmblemText: 'AC',
                      logoEmblemBg: '#7f1d1d',
                      logoEmblemShape: 'rounded-xl',
                      logoTitle: 'ARUDHRA',
                      logoSubtitle: 'CONSULTANCY',
                      tagline: 'Singapore Overseas Recruitment & Placement Support'
                    });
                  }}
                  className="flex items-center gap-1.5 text-xs text-slate-600 hover:text-slate-900 font-semibold px-3 py-2 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset to Arudhra Standard</span>
                </button>

                <button
                  type="submit"
                  className="px-6 py-3 bg-red-900 hover:bg-red-800 text-white text-xs font-bold rounded-xl shadow-md flex items-center gap-2 cursor-pointer transition-all"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Branding Changes</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* 5. ADS & FLYERS TAB */}
        {activeTab === 'ads' && (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
              <div>
                <h2 className="text-base font-bold text-slate-900">Promotional Flyers & Banners</h2>
                <p className="text-xs text-slate-500">Manage Singapore recruitment drive notices and urgent vacancy banners.</p>
              </div>
              <button
                onClick={handleOpenNewAd}
                className="px-4 py-2.5 bg-red-900 hover:bg-red-800 text-white rounded-xl text-xs font-bold shadow-md flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add Banner Flyer</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {ads.map(ad => (
                <div key={ad.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
                  <div className="h-40 bg-slate-100 relative">
                    <img src={ad.image} alt={ad.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                  <div className="p-4 space-y-2">
                    <h4 className="font-bold text-sm text-slate-900">{ad.title}</h4>
                    <p className="text-xs text-slate-500">{ad.subtitle}</p>
                    <div className="pt-2 flex items-center justify-between border-t border-slate-100">
                      <span className="text-xs text-emerald-600 font-bold">● {ad.status}</span>
                      <button
                        onClick={() => deleteAd(ad.id)}
                        className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 6. VIDEOS TAB */}
        {activeTab === 'videos' && (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
              <div>
                <h2 className="text-base font-bold text-slate-900">Informational Singapore Videos</h2>
                <p className="text-xs text-slate-500">Manage candidate guidance videos, trade demonstrations, and Singapore life briefings.</p>
              </div>
              <button
                onClick={handleOpenNewVideo}
                className="px-4 py-2.5 bg-red-900 hover:bg-red-800 text-white rounded-xl text-xs font-bold shadow-md flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add Video Link</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {videos.map(v => (
                <div key={v.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
                  <div className="p-4 space-y-2">
                    <div className="flex items-center gap-2 text-red-600 text-xs font-bold">
                      <Youtube className="w-4 h-4" />
                      <span>{v.category || 'Singapore Guidance'}</span>
                    </div>
                    <h4 className="font-bold text-sm text-slate-900">{v.title}</h4>
                    <p className="text-xs text-slate-500">{v.description}</p>
                    <div className="pt-2 flex items-center justify-between border-t border-slate-100">
                      <a
                        href={v.youtubeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-blue-600 font-semibold hover:underline flex items-center gap-1"
                      >
                        <span>Open on YouTube</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                      <button
                        onClick={() => deleteVideo(v.id)}
                        className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 7. SETTINGS TAB */}
        {activeTab === 'settings' && (
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-6">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Website & Office Information</h2>
              <p className="text-xs text-slate-500">
                Update phone numbers, WhatsApp lines, office location, Google Reviews links, and about page text.
              </p>
            </div>

            <form onSubmit={handleSaveSettingsSubmit} className="space-y-6">
              {/* Basic Business Info */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Business Name</label>
                  <input
                    type="text"
                    value={settingsForm.businessName}
                    onChange={e => setSettingsForm({ ...settingsForm, businessName: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number</label>
                  <input
                    type="text"
                    value={settingsForm.phone}
                    onChange={e => setSettingsForm({ ...settingsForm, phone: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">WhatsApp Number (with country code)</label>
                  <input
                    type="text"
                    value={settingsForm.whatsappNumber}
                    onChange={e => setSettingsForm({ ...settingsForm, whatsappNumber: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                  />
                </div>
              </div>

              {/* Email & Tagline */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Official Email</label>
                  <input
                    type="email"
                    value={settingsForm.email}
                    onChange={e => setSettingsForm({ ...settingsForm, email: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Tagline</label>
                  <input
                    type="text"
                    value={settingsForm.tagline}
                    onChange={e => setSettingsForm({ ...settingsForm, tagline: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                  />
                </div>
              </div>

              {/* Office Address */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Full Office Address</label>
                <textarea
                  rows={2}
                  value={settingsForm.officeAddress}
                  onChange={e => setSettingsForm({ ...settingsForm, officeAddress: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                />
              </div>

              {/* Google Reviews URL & Rating */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Google Reviews URL</label>
                  <input
                    type="text"
                    value={settingsForm.googleReviewsUrl || ''}
                    onChange={e => setSettingsForm({ ...settingsForm, googleReviewsUrl: e.target.value })}
                    placeholder="https://g.page/r/.../review"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Google Score</label>
                    <input
                      type="number"
                      step="0.1"
                      value={settingsForm.googleRating || 4.8}
                      onChange={e => setSettingsForm({ ...settingsForm, googleRating: parseFloat(e.target.value) })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Review Count</label>
                    <input
                      type="number"
                      value={settingsForm.totalReviewsCount || 140}
                      onChange={e => setSettingsForm({ ...settingsForm, totalReviewsCount: parseInt(e.target.value) })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                    />
                  </div>
                </div>
              </div>

              {/* Social Channels */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">YouTube Channel URL</label>
                  <input
                    type="text"
                    value={settingsForm.youtubeUrl || ''}
                    onChange={e => setSettingsForm({ ...settingsForm, youtubeUrl: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Facebook Page URL</label>
                  <input
                    type="text"
                    value={settingsForm.facebookUrl || ''}
                    onChange={e => setSettingsForm({ ...settingsForm, facebookUrl: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Instagram Page URL</label>
                  <input
                    type="text"
                    value={settingsForm.instagramUrl || ''}
                    onChange={e => setSettingsForm({ ...settingsForm, instagramUrl: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                  />
                </div>
              </div>

              {/* Brevo (Sendinblue) Email Service Integration Section */}
              <div id="admin-settings-brevo-section" className="pt-5 border-t border-slate-200">
                <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-xl bg-red-50 border border-red-200 flex items-center justify-center text-red-700 shrink-0 shadow-xs">
                        <Mail className="w-5 h-5 text-red-700" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="text-sm font-extrabold text-slate-900 tracking-tight">
                            Brevo (Sendinblue) Email Delivery Service
                          </h4>
                          {brevoStatus?.isConfigured ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 text-[10px] font-bold rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                              Active ({brevoStatus.source === 'database' ? 'Dashboard Settings' : 'Environment Variable'})
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 text-[10px] font-bold rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                              <AlertCircle className="w-3 h-3 text-amber-600" />
                              Preview OTP Mode (Key Not Configured)
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5">
                          Dispatches candidate 6-digit login OTPs and automated Singapore overseas job application confirmation emails using Brevo v3 REST API.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <a
                        href="https://app.brevo.com/settings/keys/api"
                        target="_blank"
                        rel="noreferrer"
                        className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg border border-slate-300 flex items-center gap-1.5 transition-colors cursor-pointer"
                        title="Open Brevo API Dashboard"
                      >
                        <Key className="w-3.5 h-3.5 text-slate-500" />
                        <span>Brevo Keys</span>
                        <ExternalLink className="w-3 h-3 text-slate-400" />
                      </a>
                      <button
                        type="button"
                        onClick={loadBrevoStatus}
                        disabled={isCheckingBrevo}
                        className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg border border-slate-300 flex items-center gap-1.5 transition-colors cursor-pointer"
                        title="Recheck Brevo connection status"
                      >
                        <RotateCcw className={`w-3.5 h-3.5 text-slate-500 ${isCheckingBrevo ? 'animate-spin' : ''}`} />
                        <span>Refresh</span>
                      </button>
                    </div>
                  </div>

                  {/* Form fields for Brevo credentials */}
                  <div className="grid grid-cols-1 gap-4">
                    {/* API Key Input */}
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="block text-xs font-bold text-slate-800">
                          Brevo v3 API Key <span className="text-red-600">*</span>
                        </label>
                        {brevoStatus?.maskedApiKey && (
                          <span className="text-[11px] text-slate-500 font-mono">
                            Current Active: {brevoStatus.maskedApiKey}
                          </span>
                        )}
                      </div>
                      <div className="relative">
                        <input
                          type={showBrevoApiKey ? 'text' : 'password'}
                          value={settingsForm.brevoApiKey || ''}
                          onChange={e => setSettingsForm({ ...settingsForm, brevoApiKey: e.target.value })}
                          placeholder="xkeysib-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx-xxxxxxxx"
                          className="w-full pl-3 pr-24 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-mono text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-800/20 focus:border-red-800"
                        />
                        <button
                          type="button"
                          onClick={() => setShowBrevoApiKey(!showBrevoApiKey)}
                          className="absolute right-2 top-1/2 -translate-y-1/2 px-2 py-1 text-slate-500 hover:text-slate-700 text-xs font-medium flex items-center gap-1 cursor-pointer bg-slate-200/60 rounded-md"
                        >
                          {showBrevoApiKey ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                          <span>{showBrevoApiKey ? 'Hide' : 'Show'}</span>
                        </button>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-1">
                        Obtained from <strong>Brevo Dashboard &gt; SMTP &amp; API &gt; API Keys</strong>. Saved securely in the database and takes immediate priority over environment variables.
                      </p>
                    </div>

                    {/* Sender Email & Name */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-800 mb-1">
                          Sender Email Address <span className="text-red-600">*</span>
                        </label>
                        <input
                          type="email"
                          value={settingsForm.brevoSenderEmail || ''}
                          onChange={e => setSettingsForm({ ...settingsForm, brevoSenderEmail: e.target.value })}
                          placeholder={settingsForm.email || 'info@arudhraconsultancy.com'}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-800/20 focus:border-red-800"
                        />
                        <p className="text-[11px] text-slate-500 mt-1">
                          Must be an authorized or verified sender domain/address inside Brevo &gt; Senders &amp; IP.
                        </p>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-800 mb-1">
                          Sender Display Name
                        </label>
                        <input
                          type="text"
                          value={settingsForm.brevoSenderName || ''}
                          onChange={e => setSettingsForm({ ...settingsForm, brevoSenderName: e.target.value })}
                          placeholder={settingsForm.businessName || 'ARUDHRA CONSULTANCY'}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-800/20 focus:border-red-800"
                        />
                        <p className="text-[11px] text-slate-500 mt-1">
                          The organization name candidates see in their inbox header (e.g. <em>ARUDHRA CONSULTANCY</em>).
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Real-Time Brevo Email Test Card */}
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <h5 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                          <Send className="w-3.5 h-3.5 text-red-700" />
                          <span>Test Brevo Connectivity &amp; Dispatch</span>
                        </h5>
                        <p className="text-[11px] text-slate-500 mt-0.5">
                          Send a live branded test email with a sample 6-digit OTP code to verify your Brevo credentials right now.
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <input
                          type="email"
                          value={brevoTestEmail}
                          onChange={e => setBrevoTestEmail(e.target.value)}
                          placeholder="recipient@example.com"
                          className="w-56 px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-red-800"
                        />
                        <button
                          type="button"
                          onClick={handleTestBrevoDispatch}
                          disabled={isSendingBrevoTest}
                          className="px-3.5 py-1.5 bg-red-900 hover:bg-red-800 active:scale-95 disabled:opacity-50 text-white rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shrink-0 shadow-xs"
                        >
                          <Send className={`w-3.5 h-3.5 ${isSendingBrevoTest ? 'animate-pulse' : ''}`} />
                          <span>{isSendingBrevoTest ? 'Sending...' : 'Send Test Email'}</span>
                        </button>
                      </div>
                    </div>

                    {brevoTestResult && (
                      <div className={`p-3 rounded-lg text-xs border ${
                        brevoTestResult.success
                          ? 'bg-emerald-50 text-emerald-900 border-emerald-200'
                          : 'bg-rose-50 text-rose-900 border-rose-200'
                      }`}>
                        <div className="flex items-start gap-2">
                          {brevoTestResult.success ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          ) : (
                            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                          )}
                          <div className="space-y-1">
                            <p className="font-semibold">{brevoTestResult.message}</p>
                            {!brevoTestResult.success && brevoTestResult.error && (
                              <p className="text-[11px] text-rose-700 font-mono">{brevoTestResult.error}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Feature Status Badges */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-1">
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                      <span className="font-bold text-slate-800 block text-xs">1. Candidate Login OTPs</span>
                      <p className="text-[11px] text-slate-500 mt-1">
                        Candidates can sign in or register with their email address and receive an instantaneous 6-digit verification code.
                      </p>
                    </div>

                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                      <span className="font-bold text-slate-800 block text-xs">2. Singapore Job Application Receipts</span>
                      <p className="text-[11px] text-slate-500 mt-1">
                        Candidates automatically receive a branded receipt email with Reference ID and placement next steps upon applying.
                      </p>
                    </div>

                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                      <span className="font-bold text-slate-800 block text-xs">3. Instant Preview Fallback</span>
                      <p className="text-[11px] text-slate-500 mt-1">
                        If Brevo is not yet configured, the system gracefully falls back to instant preview OTP codes so testing never fails.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Admin Login 2FA Password Security Section */}
              <div className="pt-5 border-t border-slate-200">
                <div className="bg-stone-900 text-white rounded-2xl p-5 border border-stone-800 shadow-md">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-800">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-red-950 border border-red-800 flex items-center justify-center text-red-400 shrink-0">
                        <ShieldCheck className="w-5 h-5 text-red-400" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white flex items-center gap-2">
                          Admin Authenticator 2FA Security (RFC 6238 TOTP)
                          <span className={`px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider rounded-full ${
                            settingsForm.admin2faEnrolled
                              ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                              : 'bg-amber-950 text-amber-300 border border-amber-800'
                          }`}>
                            {settingsForm.admin2faEnrolled ? 'Enrolled & Active' : 'Pending Enrollment'}
                          </span>
                        </h4>
                        <p className="text-xs text-stone-400 mt-0.5">
                          Protects the Admin Portal with strong password authentication and time-based 6-digit TOTP codes generated by Google Authenticator or Microsoft Authenticator.
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={handleReset2faEnrollment}
                      disabled={isResetting2fa}
                      className="px-3.5 py-2 bg-stone-800 hover:bg-stone-700 active:scale-95 disabled:opacity-50 text-stone-200 border border-stone-700 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer shrink-0"
                    >
                      <RotateCcw className={`w-3.5 h-3.5 text-red-400 ${isResetting2fa ? 'animate-spin' : ''}`} />
                      <span>{isResetting2fa ? 'Resetting...' : 'Reset 2FA Enrollment'}</span>
                    </button>
                  </div>

                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                    <div className="p-3 bg-stone-950/80 rounded-xl border border-stone-800 space-y-1">
                      <span className="text-stone-400 block text-[11px] uppercase tracking-wider font-semibold">Verification Standard</span>
                      <span className="text-white font-mono font-bold block">RFC 6238 TOTP (SHA-1)</span>
                      <span className="text-[11px] text-stone-400">30s time window with server drift tolerance</span>
                    </div>

                    <div className="p-3 bg-stone-950/80 rounded-xl border border-stone-800 space-y-1">
                      <span className="text-stone-400 block text-[11px] uppercase tracking-wider font-semibold">Bypass Restrictions</span>
                      <span className="text-emerald-400 font-bold block">Strict Authenticator Only</span>
                      <span className="text-[11px] text-stone-400">No email OTP, SMS, WhatsApp, or fixed PIN fallback</span>
                    </div>

                    <div className="p-3 bg-stone-950/80 rounded-xl border border-stone-800 space-y-1">
                      <span className="text-stone-400 block text-[11px] uppercase tracking-wider font-semibold">Enrollment Status</span>
                      <span className="text-white font-bold block">
                        {settingsForm.admin2faEnrolled ? 'Enrolled on Device' : 'QR Scan Required on Login'}
                      </span>
                      <span className="text-[11px] text-stone-400">
                        {settingsForm.admin2faEnrolledAt ? `Registered: ${new Date(settingsForm.admin2faEnrolledAt).toLocaleDateString()}` : 'QR Code shown only on first setup'}
                      </span>
                    </div>
                  </div>

                  {/* Re-enrollment QR Code display when actively reset */}
                  {resetQrData && (
                    <div className="mt-5 p-5 bg-stone-950 border border-amber-900/60 rounded-2xl space-y-3 animate-fadeIn">
                      <div className="flex items-center justify-between pb-2 border-b border-stone-800">
                        <div className="flex items-center gap-2">
                          <QrCode className="w-4 h-4 text-amber-400" />
                          <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                            New Authenticator Enrollment QR Code
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => setResetQrData(null)}
                          className="text-xs text-stone-400 hover:text-white underline cursor-pointer"
                        >
                          Dismiss Preview
                        </button>
                      </div>
                      <p className="text-xs text-stone-300">
                        Scan this QR code now using Google Authenticator or Microsoft Authenticator. This code will only be shown during initial setup.
                      </p>
                      <Admin2faQRCode
                        username="info@arudhraconsultancy.com"
                        otpAuthUri={resetQrData.otpAuthUri}
                        secretKey={resetQrData.secretKey}
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Exclusive Live Website & Auto-Cleanup Rules */}
              <div className="pt-5 border-t border-slate-200">
                <div className="bg-gradient-to-br from-slate-900 via-stone-900 to-red-950 text-white rounded-2xl p-6 border border-stone-800 shadow-md space-y-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-800/80">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-red-900/60 border border-red-700 flex items-center justify-center text-amber-300 shrink-0">
                        <Sparkles className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white flex items-center gap-2">
                          Exclusive Live Website & Auto-Cleanup Rules
                          <span className="px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider rounded-full bg-red-950 text-red-300 border border-red-800">
                            Automatic
                          </span>
                        </h4>
                        <p className="text-xs text-stone-300 mt-0.5">
                          When enabled, adding a new item automatically deletes expired entries so only the latest Singapore openings and flyers are live on the website.
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={handleOpenPurgeAll}
                      className="px-4 py-2 bg-rose-600/90 hover:bg-rose-600 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 shrink-0 shadow-sm cursor-pointer"
                      title="Open full purge dialog"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Purge Old Data Now</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    {/* Rule 1: Auto Replace Jobs */}
                    <div className="p-3.5 bg-stone-950/60 rounded-xl border border-stone-800 flex items-start justify-between gap-3">
                      <div>
                        <div className="font-bold text-white">Auto-Replace Old Jobs</div>
                        <p className="text-[11px] text-stone-400 mt-0.5">
                          When publishing a new job, automatically delete previous listings so only 1 job stays live.
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer select-none shrink-0 mt-1">
                        <input
                          type="checkbox"
                          checked={Boolean(settingsForm.autoReplaceOldJobs)}
                          onChange={e => setSettingsForm({ ...settingsForm, autoReplaceOldJobs: e.target.checked })}
                          className="sr-only peer"
                        />
                        <div className="w-9 h-5 bg-stone-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-red-700"></div>
                      </label>
                    </div>

                    {/* Rule 2: Auto Clear Leads on New Job */}
                    <div className="p-3.5 bg-stone-950/60 rounded-xl border border-stone-800 flex items-start justify-between gap-3">
                      <div>
                        <div className="font-bold text-white">Auto-Clear Old Candidate Leads</div>
                        <p className="text-[11px] text-stone-400 mt-0.5">
                          When a new job is created, purge previous candidate leads so incoming applications match only this vacancy.
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer select-none shrink-0 mt-1">
                        <input
                          type="checkbox"
                          checked={Boolean(settingsForm.autoClearOldLeadsOnNewJob)}
                          onChange={e => setSettingsForm({ ...settingsForm, autoClearOldLeadsOnNewJob: e.target.checked })}
                          className="sr-only peer"
                        />
                        <div className="w-9 h-5 bg-stone-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-red-700"></div>
                      </label>
                    </div>

                    {/* Rule 3: Auto Replace Flyers / Ads */}
                    <div className="p-3.5 bg-stone-950/60 rounded-xl border border-stone-800 flex items-start justify-between gap-3">
                      <div>
                        <div className="font-bold text-white">Auto-Replace Old Recruitment Flyers</div>
                        <p className="text-[11px] text-stone-400 mt-0.5">
                          When adding a promotional banner flyer, delete previous flyers to feature only the current drive.
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer select-none shrink-0 mt-1">
                        <input
                          type="checkbox"
                          checked={settingsForm.autoReplaceOldFlyers !== false}
                          onChange={e => setSettingsForm({ ...settingsForm, autoReplaceOldFlyers: e.target.checked })}
                          className="sr-only peer"
                        />
                        <div className="w-9 h-5 bg-stone-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-red-700"></div>
                      </label>
                    </div>

                    {/* Rule 4: Auto Replace Videos */}
                    <div className="p-3.5 bg-stone-950/60 rounded-xl border border-stone-800 flex items-start justify-between gap-3">
                      <div>
                        <div className="font-bold text-white">Auto-Replace Old YouTube Videos</div>
                        <p className="text-[11px] text-stone-400 mt-0.5">
                          When adding an informational briefing video, remove old videos so only the newest guidance plays.
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer select-none shrink-0 mt-1">
                        <input
                          type="checkbox"
                          checked={settingsForm.autoReplaceOldVideos !== false}
                          onChange={e => setSettingsForm({ ...settingsForm, autoReplaceOldVideos: e.target.checked })}
                          className="sr-only peer"
                        />
                        <div className="w-9 h-5 bg-stone-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-red-700"></div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-3 bg-red-900 hover:bg-red-800 text-white text-xs font-bold rounded-xl shadow-md flex items-center gap-2 cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Website Settings</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* MODAL: ADD / EDIT JOB */}
        {jobModalOpen && editingJob && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-stone-950/75 backdrop-blur-xs">
            <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[92vh] flex flex-col overflow-hidden shadow-2xl border border-slate-200">
              <div className="bg-stone-900 text-white p-5 flex items-center justify-between shrink-0">
                <h3 className="font-bold text-base text-white">
                  {editingJob.id ? `Edit Job: ${editingJob.title}` : 'Publish New Singapore Job'}
                </h3>
                <button onClick={() => setJobModalOpen(false)} className="text-stone-400 hover:text-white text-sm cursor-pointer">
                  ✕
                </button>
              </div>

              <form onSubmit={handleSaveJobSubmit} className="p-6 overflow-y-auto space-y-4 flex-1 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Job Title *</label>
                    <input
                      type="text"
                      required
                      value={editingJob.title || ''}
                      onChange={e => setEditingJob({ ...editingJob, title: e.target.value })}
                      placeholder="e.g. CNC Milling Setter / Operator"
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Sector / Category *</label>
                    <select
                      value={editingJob.category || 'Manufacturing & Production'}
                      onChange={e => setEditingJob({ ...editingJob, category: e.target.value as any })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold"
                    >
                      <option value="Manufacturing & Production">Manufacturing & Production</option>
                      <option value="Marine & Shipyard">Marine & Shipyard</option>
                      <option value="F&B & Hospitality">F&B & Hospitality</option>
                      <option value="Logistics & Warehouse">Logistics & Warehouse</option>
                      <option value="Construction & Civil">Construction & Civil</option>
                      <option value="Electrical & Maintenance">Electrical & Maintenance</option>
                      <option value="Automotive & Mechanical">Automotive & Mechanical</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Salary (in SGD) *</label>
                    <input
                      type="text"
                      required
                      value={editingJob.salary || ''}
                      onChange={e => setEditingJob({ ...editingJob, salary: e.target.value })}
                      placeholder="SGD 1,800 - 2,400 + OT"
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-red-900"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Job / Pass Type *</label>
                    <select
                      id="admin-job-modal-pass-type"
                      value={editingJob.jobType || 'Work Permit'}
                      onChange={e => setEditingJob({ ...editingJob, jobType: e.target.value as any })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold"
                    >
                      <option value="Work Permit">Work Permit</option>
                      <option value="NTS Work Permit">NTS Work Permit</option>
                      <option value="PCM">PCM (Process, Construction & Maintenance)</option>
                      <option value="Construction Permit">Construction Permit</option>
                      <option value="Marine Permit">Marine Permit</option>
                      <option value="S Pass">S Pass</option>
                      <option value="E Pass">E Pass</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Singapore Location *</label>
                    <input
                      type="text"
                      value={editingJob.location || ''}
                      onChange={e => setEditingJob({ ...editingJob, location: e.target.value })}
                      placeholder="e.g. Jurong Industrial Area, Singapore"
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Experience Required</label>
                    <input
                      type="text"
                      value={editingJob.experience || ''}
                      onChange={e => setEditingJob({ ...editingJob, experience: e.target.value })}
                      placeholder="e.g. 1-2 Years (India/Gulf/SG)"
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Qualification</label>
                    <input
                      type="text"
                      value={editingJob.qualification || ''}
                      onChange={e => setEditingJob({ ...editingJob, qualification: e.target.value })}
                      placeholder="e.g. ITI / Diploma / Any Degree"
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Vacancy Openings</label>
                    <input
                      type="number"
                      value={editingJob.vacancyCount || 5}
                      onChange={e => setEditingJob({ ...editingJob, vacancyCount: parseInt(e.target.value) })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Job Description</label>
                  <textarea
                    rows={3}
                    value={editingJob.description || ''}
                    onChange={e => setEditingJob({ ...editingJob, description: e.target.value })}
                    placeholder="Provide overview of the role, shift patterns, and factory environment..."
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                  />
                </div>

                <div className="flex flex-wrap items-center gap-6 pt-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editingJob.featured || false}
                      onChange={e => setEditingJob({ ...editingJob, featured: e.target.checked })}
                      className="rounded-sm text-red-900 focus:ring-red-900"
                    />
                    <span className="font-bold text-slate-800">Featured Job</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editingJob.latest || false}
                      onChange={e => setEditingJob({ ...editingJob, latest: e.target.checked })}
                      className="rounded-sm text-red-900 focus:ring-red-900"
                    />
                    <span className="font-bold text-slate-800">Latest Opening</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editingJob.status === 'published'}
                      onChange={e => setEditingJob({ ...editingJob, status: e.target.checked ? 'published' : 'draft' })}
                      className="rounded-sm text-red-900 focus:ring-red-900"
                    />
                    <span className="font-bold text-slate-800">Published Live</span>
                  </label>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                  {editingJob.id ? (
                    <button
                      type="button"
                      id="modal-delete-job-btn"
                      onClick={() => {
                        const targetJob = jobs.find(j => j.id === editingJob.id);
                        if (targetJob) {
                          setJobModalOpen(false);
                          setJobToDelete(targetJob);
                        }
                      }}
                      className="px-3 py-2 text-rose-600 hover:bg-rose-50 border border-rose-200 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
                      title="Delete this Singapore job vacancy"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete Vacancy</span>
                    </button>
                  ) : <div />}
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setJobModalOpen(false)}
                      className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-xl font-semibold cursor-pointer text-xs"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2 bg-red-900 hover:bg-red-800 text-white font-bold rounded-xl shadow-md cursor-pointer text-xs"
                    >
                      Save & Publish Job
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* MODAL: UPDATE LEAD / ENQUIRY */}
        {enquiryModalOpen && selectedEnquiry && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/75 backdrop-blur-xs">
            <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl border border-slate-200">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <h3 className="font-bold text-slate-900">Manage Candidate Lead #{selectedEnquiry.id}</h3>
                  <p className="text-xs text-slate-500">{selectedEnquiry.customerName} ({selectedEnquiry.mobile})</p>
                </div>
                <button onClick={() => setEnquiryModalOpen(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer">✕</button>
              </div>

              <form onSubmit={handleSaveEnquiry} className="space-y-4 text-xs">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Application Pipeline Stage</label>
                  <select
                    value={enquiryStatusInput}
                    onChange={e => setEnquiryStatusInput(e.target.value as any)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-800"
                  >
                    <option value="new">New Enquiry</option>
                    <option value="contacted">Consultant Contacted</option>
                    <option value="interested">Candidate Screened / Interested</option>
                    <option value="documents_pending">Documents Pending Submission</option>
                    <option value="processing">MOM Pass / Employer Submission</option>
                    <option value="selected">Selected / IPA Ready</option>
                    <option value="closed">Closed / Ineligible</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Follow-Up Date</label>
                  <input
                    type="date"
                    value={enquiryFollowUpInput}
                    onChange={e => setEnquiryFollowUpInput(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Internal Consultant Notes (Visible to Candidate in Portal)</label>
                  <textarea
                    rows={3}
                    value={enquiryNotesInput}
                    onChange={e => setEnquiryNotesInput(e.target.value)}
                    placeholder="e.g. Passport copy received. Scheduled for employer trade interview on Thursday..."
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>

                <div className="pt-2 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <a
                      href={`tel:${selectedEnquiry.mobile.replace(/\s+/g, '')}`}
                      className="p-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-800 flex items-center gap-1 font-bold"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>Call</span>
                    </a>
                    <a
                      href={getWhatsAppCandidateUrl(selectedEnquiry)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-emerald-100 hover:bg-emerald-200 rounded-lg text-emerald-800 flex items-center gap-1 font-bold"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>WhatsApp</span>
                    </a>
                  </div>

                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-red-900 hover:bg-red-800 text-white font-bold rounded-xl shadow-md cursor-pointer"
                  >
                    Save Status Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        {/* CANDIDATE DETAIL & REMARKS MODAL */}
        {candidateModalOpen && selectedCandidate && (
          <CandidateAdminModal
            candidate={selectedCandidate}
            onClose={() => {
              setSelectedCandidate(null);
              setCandidateModalOpen(false);
            }}
            onOpenPdf={(cand) => {
              setCandidatePdfCandidate(cand);
              setCandidatePdfOpen(true);
            }}
          />
        )}

        {/* CANDIDATE PDF DOSSIER GENERATOR MODAL */}
        <CandidateProfilePdfModal
          candidate={candidatePdfCandidate}
          isOpen={candidatePdfOpen}
          onClose={() => {
            setCandidatePdfOpen(false);
            setCandidatePdfCandidate(null);
          }}
        />

        {/* LOGO & BRANDING CUSTOMIZER MODAL */}
        <LogoEditModal
          isOpen={logoModalOpen}
          onClose={() => setLogoModalOpen(false)}
        />

        {/* JOB DELETE CONFIRMATION MODAL */}
        {jobToDelete && (
          <div id="delete-job-modal-overlay" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs">
            <div id="delete-job-modal" className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-slate-200 space-y-4 animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center shrink-0 border border-rose-200">
                  <Trash2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-slate-900">Delete Singapore Job Listing</h3>
                  <p className="text-xs text-slate-500">Permanent Vacancy Removal</p>
                </div>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2 text-xs">
                <div className="flex justify-between items-center py-1 border-b border-slate-200/60">
                  <span className="text-slate-500 font-medium">Job Reference:</span>
                  <span className="font-mono font-bold text-red-900 bg-red-50 px-2 py-0.5 rounded border border-red-200">
                    {jobToDelete.id}
                  </span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-slate-200/60">
                  <span className="text-slate-500 font-medium">Title:</span>
                  <span className="font-bold text-slate-900 truncate max-w-[200px]">{jobToDelete.title}</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-slate-200/60">
                  <span className="text-slate-500 font-medium">Salary (SGD):</span>
                  <span className="font-bold text-red-900">{jobToDelete.salary}</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-slate-200/60">
                  <span className="text-slate-500 font-medium">Category:</span>
                  <span className="text-slate-700">{jobToDelete.category}</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-slate-500 font-medium">Pass Type & Location:</span>
                  <span className="text-slate-700">{jobToDelete.jobType} • {jobToDelete.location}</span>
                </div>
              </div>

              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 flex items-start gap-2.5 text-[11px] text-amber-900">
                <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <p>
                  Warning: Deleting this Singapore job vacancy will permanently remove it from the public jobs page, candidate bookmarks, and application forms.
                </p>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  id="cancel-delete-job-btn"
                  onClick={() => setJobToDelete(null)}
                  disabled={isDeletingJob}
                  className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  id="confirm-delete-job-btn"
                  onClick={handleConfirmDeleteJob}
                  disabled={isDeletingJob}
                  className="px-4 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl text-xs transition-colors shadow-sm cursor-pointer flex items-center gap-1.5 disabled:opacity-50"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>{isDeletingJob ? 'Deleting Job...' : 'Yes, Delete Job'}</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* CANDIDATE DELETE CONFIRMATION MODAL */}
        {candidateToDelete && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs">
            <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-slate-200 space-y-4 animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center shrink-0 border border-rose-200">
                  <Trash2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-slate-900">Delete Candidate Record</h3>
                  <p className="text-xs text-slate-500">Permanent Master Directory Deletion</p>
                </div>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2 text-xs">
                <div className="flex justify-between items-center py-1 border-b border-slate-200/60">
                  <span className="text-slate-500 font-medium">Candidate ID:</span>
                  <span className="font-mono font-bold text-red-900 bg-red-50 px-2 py-0.5 rounded border border-red-200">
                    {candidateToDelete.candidateId || candidateToDelete.id}
                  </span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-slate-200/60">
                  <span className="text-slate-500 font-medium">Full Name:</span>
                  <span className="font-bold text-slate-900">{candidateToDelete.fullName || 'Overseas Candidate'}</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-slate-200/60">
                  <span className="text-slate-500 font-medium">Mobile:</span>
                  <span className="font-mono text-slate-700">{candidateToDelete.mobile}</span>
                </div>
                {candidateToDelete.passportNumber && (
                  <div className="flex justify-between items-center py-1 border-b border-slate-200/60">
                    <span className="text-slate-500 font-medium">Passport:</span>
                    <span className="font-mono text-slate-700">{candidateToDelete.passportNumber}</span>
                  </div>
                )}
                <div className="flex justify-between items-center py-1">
                  <span className="text-slate-500 font-medium">Associated Documents:</span>
                  <span className="font-bold text-slate-700">{candidateToDelete.documents?.length || 0} Files</span>
                </div>
              </div>

              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 flex items-start gap-2.5 text-[11px] text-amber-900">
                <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <p>
                  Warning: This action will permanently erase this candidate's profile, bio-data, trade records, uploaded passport/certificates, and associated records from the master database.
                </p>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setCandidateToDelete(null)}
                  disabled={isDeletingCandidate}
                  className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleConfirmDeleteCandidate}
                  disabled={isDeletingCandidate}
                  className="px-4 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl text-xs transition-colors shadow-sm cursor-pointer flex items-center gap-1.5 disabled:opacity-50"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>{isDeletingCandidate ? 'Deleting...' : 'Yes, Delete Candidate'}</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* CANDIDATE APPLICATION / ENQUIRY DELETE CONFIRMATION MODAL */}
        {enquiryDeleteTarget && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs">
            <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-slate-200 space-y-4 animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center shrink-0 border border-rose-200">
                  <Trash2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-slate-900">
                    {enquiryDeleteTarget.isMultiple
                      ? `Delete ${enquiryDeleteTarget.ids.length} Candidate Applications`
                      : 'Delete Candidate Application'}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {enquiryDeleteTarget.isMultiple
                      ? 'Multiple Application Records Deletion'
                      : 'Candidate Lead Record Deletion'}
                  </p>
                </div>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2 text-xs max-h-56 overflow-y-auto">
                <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                  Applications to be removed ({enquiryDeleteTarget.items.length}):
                </div>
                {enquiryDeleteTarget.items.map(item => (
                  <div key={item.id} className="p-2.5 bg-white rounded-xl border border-slate-200/80 flex items-center justify-between gap-2">
                    <div className="min-w-0 flex-1">
                      <div className="font-bold text-slate-900 truncate">{item.name}</div>
                      <div className="text-[11px] text-slate-500 truncate">
                        {item.jobTitle || 'General Opening'} {item.mobile ? `• ${item.mobile}` : ''}
                      </div>
                    </div>
                    <span className="shrink-0 font-mono text-[10px] font-bold text-red-900 bg-red-50 px-2 py-0.5 rounded border border-red-200">
                      {item.id}
                    </span>
                  </div>
                ))}
              </div>

              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 flex items-start gap-2.5 text-[11px] text-amber-900">
                <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <p>
                  Warning: Deleting {enquiryDeleteTarget.isMultiple ? 'these candidate applications' : 'this candidate application'} will permanently remove the application record and consultant notes from both the overview and pipeline tables.
                </p>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setEnquiryDeleteTarget(null)}
                  disabled={isDeletingEnquiries}
                  className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleConfirmEnquiryDelete}
                  disabled={isDeletingEnquiries}
                  className="px-4 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl text-xs transition-colors shadow-sm cursor-pointer flex items-center gap-1.5 disabled:opacity-50"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>
                    {isDeletingEnquiries
                      ? 'Deleting...'
                      : enquiryDeleteTarget.isMultiple
                      ? `Yes, Delete All ${enquiryDeleteTarget.ids.length}`
                      : 'Yes, Delete Application'}
                  </span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* MODAL: ADD / EDIT ADVERTISEMENT FLYER */}
        {adModalOpen && editingAd && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/75 backdrop-blur-xs">
            <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-200">
              <div className="bg-stone-900 text-white p-5 flex items-center justify-between">
                <h3 className="font-bold text-base text-white">
                  {editingAd.id ? 'Edit Recruitment Flyer' : 'Publish New Recruitment Flyer'}
                </h3>
                <button
                  type="button"
                  onClick={() => setAdModalOpen(false)}
                  className="text-stone-400 hover:text-white text-sm cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSaveAdSubmit} className="p-6 space-y-4 text-xs">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Flyer Headline *</label>
                  <input
                    type="text"
                    required
                    value={editingAd.title || ''}
                    onChange={e => setEditingAd({ ...editingAd, title: e.target.value })}
                    placeholder="e.g. Singapore Urgent Recruitment Drive"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Subtitle / Key Highlight</label>
                  <input
                    type="text"
                    value={editingAd.subtitle || ''}
                    onChange={e => setEditingAd({ ...editingAd, subtitle: e.target.value })}
                    placeholder="e.g. Immediate vacancy filling across manufacturing & engineering plants"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Image URL *</label>
                  <input
                    type="url"
                    required
                    value={editingAd.image || ''}
                    onChange={e => setEditingAd({ ...editingAd, image: e.target.value })}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Call-to-Action Link</label>
                    <input
                      type="text"
                      value={editingAd.linkUrl || '#jobs'}
                      onChange={e => setEditingAd({ ...editingAd, linkUrl: e.target.value })}
                      placeholder="#jobs or https://..."
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Display Order</label>
                    <input
                      type="number"
                      value={editingAd.order || 1}
                      onChange={e => setEditingAd({ ...editingAd, order: parseInt(e.target.value) || 1 })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Flyer Status</label>
                  <select
                    value={editingAd.status || 'active'}
                    onChange={e => setEditingAd({ ...editingAd, status: e.target.value as any })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold"
                  >
                    <option value="active">Active (Visible on Website)</option>
                    <option value="inactive">Inactive (Hidden)</option>
                  </select>
                </div>

                {/* Exclusive Live Flyer Mode */}
                {!editingAd.id && (
                  <div className="p-3.5 bg-red-50/70 border border-red-200 rounded-xl space-y-2">
                    <div className="flex items-center justify-between gap-3">
                      <span className="font-bold text-xs text-red-950 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-red-900" />
                        Exclusive Live Flyer Mode
                      </span>
                      <label className="relative inline-flex items-center cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={adExclusiveLive}
                          onChange={e => setAdExclusiveLive(e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-9 h-5 bg-stone-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-red-900"></div>
                      </label>
                    </div>
                    <p className="text-[11px] text-red-900/80">
                      {adExclusiveLive
                        ? 'Automatically delete all previous flyers so this flyer is the only active banner.'
                        : 'Keep existing flyers active alongside this new one.'}
                    </p>
                  </div>
                )}

                <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setAdModalOpen(false)}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-red-900 hover:bg-red-800 text-white font-bold rounded-xl text-xs shadow-md transition-colors cursor-pointer"
                  >
                    Save & Publish Flyer
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* MODAL: ADD / EDIT VIDEO */}
        {videoModalOpen && editingVideo && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/75 backdrop-blur-xs">
            <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-200">
              <div className="bg-stone-900 text-white p-5 flex items-center justify-between">
                <h3 className="font-bold text-base text-white">
                  {editingVideo.id ? 'Edit Briefing Video' : 'Publish New Briefing Video'}
                </h3>
                <button
                  type="button"
                  onClick={() => setVideoModalOpen(false)}
                  className="text-stone-400 hover:text-white text-sm cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSaveVideoSubmit} className="p-6 space-y-4 text-xs">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Video Title *</label>
                  <input
                    type="text"
                    required
                    value={editingVideo.title || ''}
                    onChange={e => setEditingVideo({ ...editingVideo, title: e.target.value })}
                    placeholder="e.g. Singapore Work Permit & S Pass Orientation"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">YouTube URL *</label>
                  <input
                    type="url"
                    required
                    value={editingVideo.youtubeUrl || ''}
                    onChange={e => setEditingVideo({ ...editingVideo, youtubeUrl: e.target.value })}
                    placeholder="https://www.youtube.com/watch?v=..."
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Description</label>
                  <textarea
                    rows={3}
                    value={editingVideo.description || ''}
                    onChange={e => setEditingVideo({ ...editingVideo, description: e.target.value })}
                    placeholder="Overview of the video contents..."
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Category</label>
                    <select
                      value={editingVideo.category || 'Orientation'}
                      onChange={e => setEditingVideo({ ...editingVideo, category: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold"
                    >
                      <option value="Orientation">Orientation</option>
                      <option value="Job Walkthrough">Job Walkthrough</option>
                      <option value="Candidate Success">Candidate Success</option>
                      <option value="Singapore Life">Singapore Life</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Display Order</label>
                    <input
                      type="number"
                      value={editingVideo.order || 1}
                      onChange={e => setEditingVideo({ ...editingVideo, order: parseInt(e.target.value) || 1 })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Video Status</label>
                  <select
                    value={editingVideo.status || 'active'}
                    onChange={e => setEditingVideo({ ...editingVideo, status: e.target.value as any })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold"
                  >
                    <option value="active">Active (Visible on Website)</option>
                    <option value="inactive">Inactive (Hidden)</option>
                  </select>
                </div>

                {/* Exclusive Live Video Mode */}
                {!editingVideo.id && (
                  <div className="p-3.5 bg-red-50/70 border border-red-200 rounded-xl space-y-2">
                    <div className="flex items-center justify-between gap-3">
                      <span className="font-bold text-xs text-red-950 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-red-900" />
                        Exclusive Live Video Mode
                      </span>
                      <label className="relative inline-flex items-center cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={videoExclusiveLive}
                          onChange={e => setVideoExclusiveLive(e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-9 h-5 bg-stone-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-red-900"></div>
                      </label>
                    </div>
                    <p className="text-[11px] text-red-900/80">
                      {videoExclusiveLive
                        ? 'Automatically delete all previous briefing videos so only this latest video is showcased.'
                        : 'Keep existing videos available in the video gallery.'}
                    </p>
                  </div>
                )}

                <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setVideoModalOpen(false)}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-red-900 hover:bg-red-800 text-white font-bold rounded-xl text-xs shadow-md transition-colors cursor-pointer"
                  >
                    Save & Publish Video
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* MODAL: PURGE / CLEANUP CONFIRMATION */}
        {purgeModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-xs">
            <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-slate-200 space-y-4 animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center shrink-0 border border-rose-200">
                  <Trash2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-slate-900">
                    {purgeMode === 'leads' ? 'Purge All Candidate Leads' : 'Clean & Purge Old Data'}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {purgeMode === 'leads'
                      ? 'Reset candidate applications and inquiries'
                      : 'Exclusive live website data synchronization'}
                  </p>
                </div>
              </div>

              {purgeMode === 'leads' ? (
                <div className="p-3.5 bg-rose-50 rounded-xl border border-rose-200 text-xs text-rose-900 space-y-2">
                  <p className="font-bold flex items-center gap-1.5">
                    <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                    Are you sure you want to delete all {enquiries.length} candidate leads?
                  </p>
                  <p className="text-[11px] text-rose-800 leading-relaxed">
                    This will permanently clear all candidate enquiries, contact numbers, and consultant follow-up logs from the portal. This action cannot be undone.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="p-3.5 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-950 space-y-1">
                    <p className="font-bold flex items-center gap-1.5">
                      <AlertCircle className="w-4 h-4 text-amber-700 shrink-0" />
                      Select old data categories to permanently purge:
                    </p>
                    <p className="text-[11px] text-amber-800">
                      Clean up the database so your website displays only current, fresh recruitment campaigns.
                    </p>
                  </div>

                  <div className="space-y-2 text-xs">
                    <label className="flex items-center justify-between p-2.5 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-200 cursor-pointer">
                      <span className="font-bold text-slate-800">All Singapore Jobs ({jobs.length})</span>
                      <input
                        type="checkbox"
                        checked={purgeOptions.jobs}
                        onChange={e => setPurgeOptions({ ...purgeOptions, jobs: e.target.checked })}
                        className="rounded-sm text-red-900 focus:ring-red-900"
                      />
                    </label>

                    <label className="flex items-center justify-between p-2.5 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-200 cursor-pointer">
                      <span className="font-bold text-slate-800">All Candidate Leads ({enquiries.length})</span>
                      <input
                        type="checkbox"
                        checked={purgeOptions.leads}
                        onChange={e => setPurgeOptions({ ...purgeOptions, leads: e.target.checked })}
                        className="rounded-sm text-red-900 focus:ring-red-900"
                      />
                    </label>

                    <label className="flex items-center justify-between p-2.5 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-200 cursor-pointer">
                      <span className="font-bold text-slate-800">All Flyers & Ads ({ads.length})</span>
                      <input
                        type="checkbox"
                        checked={purgeOptions.ads}
                        onChange={e => setPurgeOptions({ ...purgeOptions, ads: e.target.checked })}
                        className="rounded-sm text-red-900 focus:ring-red-900"
                      />
                    </label>

                    <label className="flex items-center justify-between p-2.5 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-200 cursor-pointer">
                      <span className="font-bold text-slate-800">All YouTube Videos ({videos.length})</span>
                      <input
                        type="checkbox"
                        checked={purgeOptions.videos}
                        onChange={e => setPurgeOptions({ ...purgeOptions, videos: e.target.checked })}
                        className="rounded-sm text-red-900 focus:ring-red-900"
                      />
                    </label>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setPurgeModalOpen(false)}
                  disabled={isPurging}
                  className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleConfirmPurge}
                  disabled={isPurging || (purgeMode === 'all' && !purgeOptions.jobs && !purgeOptions.leads && !purgeOptions.ads && !purgeOptions.videos)}
                  className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl text-xs transition-colors shadow-sm cursor-pointer flex items-center gap-1.5 disabled:opacity-50"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>
                    {isPurging
                      ? 'Purging Data...'
                      : purgeMode === 'leads'
                      ? 'Yes, Purge All Leads'
                      : 'Yes, Purge Selected Data'}
                  </span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
