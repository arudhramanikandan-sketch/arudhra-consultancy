import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import { SubpageBackButton } from '../components/SubpageBackButton';
import {
  User,
  Phone,
  MessageSquare,
  Clock,
  CheckCircle2,
  AlertCircle,
  Briefcase,
  FileCheck,
  PlaneTakeoff,
  ArrowRight,
  ShieldCheck,
  ChevronRight,
  FileText,
  Upload,
  Trash2,
  Eye,
  Save,
  Globe,
  Star,
  MapPin,
  Calendar,
  GraduationCap
} from 'lucide-react';
import { Enquiry, EnquiryStatus, ApplicationStatus, DocumentType } from '../types';

export const CustomerPortalView: React.FC = () => {
  const { user, logout } = useAuth();
  const {
    enquiries,
    jobs,
    settings,
    setCurrentTab,
    setSelectedJob,
    setApplyModalJob,
    candidate,
    candidateLoading,
    updateCandidateProfile,
    uploadCandidateDocument,
    deleteCandidateDocument,
    removeJobInterested,
    showToast
  } = useApp();

  const [activeSubTab, setActiveSubTab] = useState<'applications' | 'interested' | 'profile' | 'documents'>('applications');

  // Candidate Profile Form State
  const [profileForm, setProfileForm] = useState({
    fullName: '',
    dateOfBirth: '',
    gender: 'male' as 'male' | 'female' | 'other',
    maritalStatus: 'single' as 'single' | 'married',
    nationality: 'Indian',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    passportNumber: '',
    passportIssueDate: '',
    passportExpiryDate: '',
    passportPlaceOfIssue: '',
    passportEcrStatus: 'ECNR',
    highestQualification: '10th / 12th',
    educationTrade: '',
    institutionName: '',
    yearOfPassing: '',
    totalExperienceYears: 0,
    singaporeExperienceYears: 0,
    gulfExperienceYears: 0,
    indiaExperienceYears: 0,
    currentEmployer: '',
    currentDesignation: '',
    pastSingaporeFin: '',
    trade: '',
    preferredTrade: '',
    expectedSalarySgd: '',
    noticePeriod: 'Immediate',
    skills: [] as string[],
    languages: [] as string[],
    skillsText: '',
    languagesText: ''
  });

  const [savingProfile, setSavingProfile] = useState(false);

  // Document Upload State
  const [uploadDocType, setUploadDocType] = useState<DocumentType>('resume');
  const [uploadDocName, setUploadDocName] = useState('');
  const [uploadingDoc, setUploadingDoc] = useState(false);

  // Populate profile form when candidate data loads
  useEffect(() => {
    if (candidate) {
      setProfileForm({
        fullName: candidate.fullName || user?.name || '',
        dateOfBirth: candidate.dateOfBirth || '',
        gender: candidate.gender || 'male',
        maritalStatus: candidate.maritalStatus || 'single',
        nationality: candidate.nationality || 'Indian',
        address: candidate.address || '',
        city: candidate.city || '',
        state: candidate.state || 'Tamil Nadu',
        postalCode: candidate.postalCode || '',
        passportNumber: candidate.passportNumber || '',
        passportIssueDate: candidate.passportIssueDate || '',
        passportExpiryDate: candidate.passportExpiryDate || '',
        passportPlaceOfIssue: candidate.passportPlaceOfIssue || '',
        passportEcrStatus: candidate.passportEcrStatus || 'ECNR',
        highestQualification: candidate.highestQualification || '10th / 12th',
        educationTrade: candidate.educationTrade || candidate.trade || '',
        institutionName: candidate.institutionName || '',
        yearOfPassing: candidate.yearOfPassing || '',
        totalExperienceYears: candidate.totalExperienceYears || 0,
        singaporeExperienceYears: candidate.singaporeExperienceYears || 0,
        gulfExperienceYears: candidate.gulfExperienceYears || 0,
        indiaExperienceYears: candidate.indiaExperienceYears || 0,
        currentEmployer: candidate.currentEmployer || '',
        currentDesignation: candidate.currentDesignation || '',
        pastSingaporeFin: candidate.pastSingaporeFin || '',
        trade: candidate.trade || '',
        preferredTrade: candidate.preferredTrade || candidate.trade || '',
        expectedSalarySgd: candidate.expectedSalarySgd ? String(candidate.expectedSalarySgd) : '',
        noticePeriod: candidate.noticePeriod || 'Immediate',
        skills: candidate.skills || [],
        languages: candidate.languages || ['Tamil', 'English'],
        skillsText: candidate.skills ? candidate.skills.join(', ') : '',
        languagesText: candidate.languages ? candidate.languages.join(', ') : 'Tamil, English'
      });
    } else if (user) {
      setProfileForm(prev => ({
        ...prev,
        fullName: user.name || prev.fullName
      }));
    }
  }, [candidate, user]);

  const handleSignOut = () => {
    logout();
    setCurrentTab('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showToast('Signed out successfully. Welcome back to Arudhra Consultancy.', 'info');
  };

  if (!user) {
    return null;
  }

  // Filter enquiries for logged in user mobile or candidate applications
  const userEnquiries = enquiries.filter(
    e => e.mobile.replace(/\D/g, '') === user.mobile.replace(/\D/g, '') ||
         (user.email && e.email && e.email.toLowerCase() === user.email.toLowerCase())
  );

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingProfile(true);

    const skillsArray = profileForm.skillsText
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);

    const languagesArray = profileForm.languagesText
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);

    await updateCandidateProfile({
      fullName: profileForm.fullName,
      dateOfBirth: profileForm.dateOfBirth,
      gender: profileForm.gender,
      maritalStatus: profileForm.maritalStatus,
      nationality: profileForm.nationality,
      address: profileForm.address,
      city: profileForm.city,
      state: profileForm.state,
      postalCode: profileForm.postalCode,
      passportNumber: profileForm.passportNumber,
      passportIssueDate: profileForm.passportIssueDate,
      passportExpiryDate: profileForm.passportExpiryDate,
      passportPlaceOfIssue: profileForm.passportPlaceOfIssue,
      passportEcrStatus: profileForm.passportEcrStatus,
      highestQualification: profileForm.highestQualification,
      educationTrade: profileForm.educationTrade,
      institutionName: profileForm.institutionName,
      yearOfPassing: profileForm.yearOfPassing,
      totalExperienceYears: Number(profileForm.totalExperienceYears) || 0,
      singaporeExperienceYears: Number(profileForm.singaporeExperienceYears) || 0,
      gulfExperienceYears: Number(profileForm.gulfExperienceYears) || 0,
      indiaExperienceYears: Number(profileForm.indiaExperienceYears) || 0,
      currentEmployer: profileForm.currentEmployer,
      currentDesignation: profileForm.currentDesignation,
      pastSingaporeFin: profileForm.pastSingaporeFin,
      trade: profileForm.trade || profileForm.educationTrade,
      preferredTrade: profileForm.preferredTrade,
      expectedSalarySgd: profileForm.expectedSalarySgd ? Number(profileForm.expectedSalarySgd) : undefined,
      noticePeriod: profileForm.noticePeriod,
      skills: skillsArray,
      languages: languagesArray
    });

    setSavingProfile(false);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      showToast('File size must be under 10MB', 'error');
      return;
    }

    setUploadingDoc(true);
    const reader = new FileReader();
    reader.onload = async () => {
      const base64Data = reader.result as string;
      const sizeStr = `${(file.size / (1024 * 1024)).toFixed(2)} MB`;
      const name = uploadDocName || file.name;

      await uploadCandidateDocument(uploadDocType, name, base64Data, sizeStr);
      setUploadingDoc(false);
      setUploadDocName('');
      e.target.value = '';
    };
    reader.onerror = () => {
      showToast('Failed to read file', 'error');
      setUploadingDoc(false);
    };
    reader.readAsDataURL(file);
  };

  const getStatusBadge = (status: EnquiryStatus | ApplicationStatus) => {
    switch (status) {
      case 'new':
      case 'submitted':
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">Submitted</span>;
      case 'contacted':
      case 'under_review':
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-purple-50 text-purple-700 border border-purple-200">Under Review</span>;
      case 'interested':
      case 'shortlisted':
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200">Shortlisted</span>;
      case 'documents_pending':
      case 'on_hold':
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-orange-50 text-orange-700 border border-orange-200">Docs Required</span>;
      case 'processing':
      case 'interview':
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-cyan-50 text-cyan-700 border border-cyan-200">Interview / MOM Processing</span>;
      case 'selected':
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">Selected / IPA Ready</span>;
      case 'rejected':
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200">Rejected</span>;
      case 'closed':
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-600 border border-slate-200">Closed</span>;
      default:
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-600">Pending</span>;
    }
  };

  const getStepProgressIndex = (status: EnquiryStatus | ApplicationStatus) => {
    switch (status) {
      case 'new':
      case 'submitted': return 1;
      case 'contacted':
      case 'under_review': return 2;
      case 'interested':
      case 'shortlisted':
      case 'documents_pending':
      case 'on_hold': return 3;
      case 'processing':
      case 'interview': return 4;
      case 'selected':
      case 'closed': return 5;
      default: return 1;
    }
  };

  const getWhatsAppUrl = (enq: Enquiry) => {
    const raw = settings.whatsappNumber.replace(/\D/g, '') || '919840123456';
    const text = encodeURIComponent(
      `Hello Arudhra Consultancy, I am checking the status of my application (Candidate ID: ${candidate?.candidateId || 'N/A'}, Enquiry ID: ${enq.id}) for ${enq.jobTitle || 'Singapore opening'}. My mobile is ${user.mobile}.`
    );
    return `https://wa.me/${raw}?text=${text}`;
  };

  return (
    <div id="customer-portal-view" className="py-8 sm:py-10 bg-slate-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
        {/* Subpage Back Key & Navigation */}
        <SubpageBackButton label="Back to Home" currentPageTitle="Candidate Portal" fallbackTab="home" />

        {/* User & Candidate Greeting Card */}
        <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-red-900 text-white flex items-center justify-center font-black text-2xl shadow-md">
              {profileForm.fullName ? profileForm.fullName.charAt(0).toUpperCase() : (user.name ? user.name.charAt(0).toUpperCase() : 'C')}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-white">
                  {profileForm.fullName || user.name || 'Overseas Candidate'}
                </h1>
                {candidate?.candidateId && (
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30">
                    ID: {candidate.candidateId}
                  </span>
                )}
                <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  {candidate?.applicationStatus ? candidate.applicationStatus.replace('_', ' ').toUpperCase() : 'REGISTERED'}
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
                <span className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{user.mobile}</span>
                </span>
                {user.email && (
                  <span className="flex items-center gap-1.5">
                    <span>• {user.email}</span>
                  </span>
                )}
                {profileForm.trade && (
                  <span className="text-amber-200">
                    • Trade: <strong>{profileForm.trade}</strong>
                  </span>
                )}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 self-end sm:self-center">
            <button
              id="portal-browse-jobs-btn"
              onClick={() => setCurrentTab('jobs')}
              className="px-4 py-2 bg-red-900 hover:bg-red-800 text-white text-xs font-bold rounded-xl transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>Browse Singapore Jobs</span>
            </button>
            <button
              id="portal-logout-btn"
              onClick={handleSignOut}
              className="px-3.5 py-2 bg-slate-800 hover:bg-rose-900/60 text-slate-300 hover:text-rose-200 text-xs font-semibold rounded-xl border border-slate-700 transition-colors cursor-pointer"
            >
              Sign Out
            </button>
          </div>
        </div>

        {/* Portal Sub-Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto">
          {[
            { id: 'applications', label: `My Applications (${userEnquiries.length})`, icon: Briefcase },
            { id: 'interested', label: `Interested Jobs (${candidate?.interestedJobs?.length || 0})`, icon: Star },
            { id: 'profile', label: 'My Candidate Profile', icon: User },
            { id: 'documents', label: `My Documents (${candidate?.documents?.length || 0})`, icon: FileText }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeSubTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveSubTab(tab.id as any)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-red-900 text-white shadow-sm'
                    : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200 hover:border-slate-300'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* SUBTAB 1: MY APPLICATIONS */}
        {activeSubTab === 'applications' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                Singapore Job Applications & Live Tracking
              </h2>
              <span className="text-xs text-slate-500">{userEnquiries.length} recorded</span>
            </div>

            {userEnquiries.length > 0 ? (
              <div className="space-y-5">
                {userEnquiries.map(enq => {
                  const stepIdx = getStepProgressIndex(enq.status);
                  const linkedJob = jobs.find(j => j.id === enq.jobId);

                  return (
                    <div
                      key={enq.id}
                      id={`user-enquiry-card-${enq.id}`}
                      className="bg-white rounded-3xl border border-slate-200 shadow-xs p-6 sm:p-7 space-y-6 hover:shadow-md transition-shadow"
                    >
                      {/* Header */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-[11px] font-mono text-slate-400">Enquiry #{enq.id}</span>
                            <span className="text-xs text-slate-400">•</span>
                            <span className="text-xs text-slate-500 flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              <span>{enq.createdAt}</span>
                            </span>
                          </div>
                          <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                            {enq.jobTitle || 'General Singapore Placement Enquiry'}
                          </h3>
                          {enq.candidateTrade && (
                            <p className="text-xs text-slate-600 mt-0.5">
                              Trade Specified: <strong>{enq.candidateTrade}</strong>
                            </p>
                          )}
                        </div>

                        <div className="flex items-center gap-2">
                          {getStatusBadge(enq.status)}
                        </div>
                      </div>

                      {/* Progress Bar (5 Steps) */}
                      <div className="py-2">
                        <div className="grid grid-cols-5 gap-2 text-center">
                          {[
                            { label: 'Submitted', num: 1 },
                            { label: 'Screening', num: 2 },
                            { label: 'Documents', num: 3 },
                            { label: 'Processing', num: 4 },
                            { label: 'Selected', num: 5 }
                          ].map((step, idx) => {
                            const isDone = step.num <= stepIdx;
                            const isCurrent = step.num === stepIdx;
                            return (
                              <div key={idx} className="space-y-1.5">
                                <div
                                  className={`h-2 rounded-full transition-all ${
                                    isDone
                                      ? isCurrent
                                        ? 'bg-red-900 shadow-xs'
                                        : 'bg-red-800'
                                      : 'bg-slate-200'
                                  }`}
                                />
                                <span className={`text-[10px] font-bold block ${isDone ? 'text-slate-900' : 'text-slate-400'}`}>
                                  {step.label}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Candidate & Job details */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100 text-xs">
                        <div>
                          <span className="text-slate-400 font-semibold block mb-1">Your Application Details</span>
                          <p className="text-slate-700"><strong>Name:</strong> {enq.customerName}</p>
                          <p className="text-slate-700"><strong>Phone:</strong> {enq.mobile}</p>
                          {enq.email && <p className="text-slate-700"><strong>Email:</strong> {enq.email}</p>}
                          {enq.candidateNotes && (
                            <p className="text-slate-600 mt-1 italic">“{enq.candidateNotes}”</p>
                          )}
                        </div>

                        <div>
                          <span className="text-slate-400 font-semibold block mb-1">Assigned Arudhra Consultant Info</span>
                          {enq.assignedAdmin ? (
                            <p className="text-slate-700">Officer: <strong>{enq.assignedAdmin}</strong></p>
                          ) : (
                            <p className="text-slate-500">Recruitment desk assigned: Chromepet Office</p>
                          )}
                          {enq.adminNotes && (
                            <div className="mt-2 p-2.5 bg-red-50 border border-red-200 rounded-xl text-red-950 font-medium">
                              <span className="font-bold block text-[11px] text-red-900">Officer Note:</span>
                              {enq.adminNotes}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Action Footers */}
                      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                        <div className="flex items-center gap-2">
                          {linkedJob && (
                            <button
                              type="button"
                              onClick={() => setSelectedJob(linkedJob)}
                              className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-xl transition-colors cursor-pointer"
                            >
                              View Job Terms & Salary
                            </button>
                          )}
                        </div>

                        <div className="flex items-center gap-2">
                          <a
                            id={`whatsapp-lead-btn-${enq.id}`}
                            href={getWhatsAppUrl(enq)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs transition-all cursor-pointer"
                          >
                            <MessageSquare className="w-4 h-4" />
                            <span>WhatsApp Consultant</span>
                          </a>
                          <a
                            href={`tel:${settings.phone.replace(/\s+/g, '')}`}
                            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-xl"
                          >
                            <Phone className="w-4 h-4 text-emerald-600" />
                            <span>Call Office</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-4">
                <div className="w-14 h-14 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400">
                  <Briefcase className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">No Applications Submitted Yet</h3>
                  <p className="text-xs text-slate-600 mt-1 max-w-md mx-auto">
                    Browse our Singapore openings and click "I'm Interested" or submit an enquiry to begin overseas placement.
                  </p>
                </div>
                <button
                  id="portal-empty-browse-btn"
                  onClick={() => setCurrentTab('jobs')}
                  className="px-6 py-2.5 bg-red-900 hover:bg-red-800 text-white text-xs font-bold rounded-xl transition-all cursor-pointer"
                >
                  Browse Singapore Jobs Now
                </button>
              </div>
            )}
          </div>
        )}

        {/* SUBTAB 2: INTERESTED JOBS */}
        {activeSubTab === 'interested' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-slate-900">Marked Interested Jobs</h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Positions you've saved. You can submit an enquiry or chat with our team anytime.
                </p>
              </div>
              <span className="text-xs text-slate-500">{candidate?.interestedJobs?.length || 0} bookmarked</span>
            </div>

            {candidate?.interestedJobs && candidate.interestedJobs.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {candidate.interestedJobs.map(ij => {
                  const job = jobs.find(j => j.id === ij.jobId);
                  return (
                    <div
                      key={ij.jobId}
                      className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between gap-4 hover:border-red-800/40 transition-colors"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-red-50 text-red-900 border border-red-200">
                            🇸🇬 Singapore
                          </span>
                          <span className="text-[10px] text-slate-400">Marked: {ij.markedAt?.slice(0, 10)}</span>
                        </div>
                        <h3 className="font-bold text-slate-900 text-sm leading-snug">{ij.jobTitle}</h3>
                        {job && (
                          <div className="text-xs space-y-1 text-slate-600">
                            <p className="font-bold text-red-900">{job.salary}</p>
                            <p>{job.location} • {job.jobType}</p>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center justify-between gap-2 pt-3 border-t border-slate-100">
                        <button
                          type="button"
                          onClick={() => removeJobInterested(ij.jobId)}
                          className="text-xs text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
                        >
                          Remove
                        </button>
                        <div className="flex items-center gap-2">
                          {job && (
                            <button
                              type="button"
                              onClick={() => setSelectedJob(job)}
                              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                            >
                              Details
                            </button>
                          )}
                          {job && (
                            <button
                              type="button"
                              onClick={() => setApplyModalJob(job)}
                              className="px-3.5 py-1.5 bg-red-900 hover:bg-red-800 text-white text-xs font-bold rounded-lg shadow-xs transition-colors cursor-pointer"
                            >
                              Apply / Enquiry
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="bg-white rounded-3xl p-10 text-center border border-slate-200 space-y-3">
                <Star className="w-10 h-10 text-slate-300 mx-auto" />
                <h3 className="font-bold text-slate-800 text-base">No Interested Jobs Bookmarked</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Browse our jobs and click "I'm Interested" to track vacancies here.
                </p>
                <button
                  onClick={() => setCurrentTab('jobs')}
                  className="px-5 py-2 bg-red-900 hover:bg-red-800 text-white text-xs font-bold rounded-xl transition-all cursor-pointer"
                >
                  Browse Jobs
                </button>
              </div>
            )}
          </div>
        )}

        {/* SUBTAB 3: CANDIDATE PROFILE FORM */}
        {activeSubTab === 'profile' && (
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                  Foreign Job Candidate Master Bio-Data
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Your profile details are automatically updated in our Admin Recruitment Portal for faster employer submission.
                </p>
              </div>
              <span className="text-xs font-mono text-slate-400">
                Candidate ID: <strong className="text-slate-800">{candidate?.candidateId || 'Auto-Assigned'}</strong>
              </span>
            </div>

            <form onSubmit={handleProfileSubmit} className="space-y-8">
              {/* SECTION 1: Personal Details */}
              <div className="space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-red-900 border-b border-slate-200 pb-1.5 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>1. Personal Information</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div>
                    <label className="block text-slate-600 font-semibold mb-1">Full Name (As per Passport) *</label>
                    <input
                      type="text"
                      required
                      value={profileForm.fullName}
                      onChange={e => setProfileForm({ ...profileForm, fullName: e.target.value })}
                      placeholder="e.g. Manikandan Shanmugam"
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-900 focus:bg-white text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-600 font-semibold mb-1">Date of Birth</label>
                    <input
                      type="date"
                      value={profileForm.dateOfBirth}
                      onChange={e => setProfileForm({ ...profileForm, dateOfBirth: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-900 focus:bg-white text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-600 font-semibold mb-1">Gender & Marital Status</label>
                    <div className="grid grid-cols-2 gap-2">
                      <select
                        value={profileForm.gender}
                        onChange={e => setProfileForm({ ...profileForm, gender: e.target.value as any })}
                        className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                      >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                      <select
                        value={profileForm.maritalStatus}
                        onChange={e => setProfileForm({ ...profileForm, maritalStatus: e.target.value as any })}
                        className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                      >
                        <option value="single">Single</option>
                        <option value="married">Married</option>
                      </select>
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-slate-600 font-semibold mb-1">Permanent Residential Address</label>
                    <input
                      type="text"
                      value={profileForm.address}
                      onChange={e => setProfileForm({ ...profileForm, address: e.target.value })}
                      placeholder="Door No, Street Name, Area / Village"
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-600 font-semibold mb-1">City / Town</label>
                    <input
                      type="text"
                      value={profileForm.city}
                      onChange={e => setProfileForm({ ...profileForm, city: e.target.value })}
                      placeholder="e.g. Chennai / Madurai"
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-600 font-semibold mb-1">State</label>
                    <input
                      type="text"
                      value={profileForm.state}
                      onChange={e => setProfileForm({ ...profileForm, state: e.target.value })}
                      placeholder="e.g. Tamil Nadu"
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-600 font-semibold mb-1">PIN / Postal Code</label>
                    <input
                      type="text"
                      value={profileForm.postalCode}
                      onChange={e => setProfileForm({ ...profileForm, postalCode: e.target.value })}
                      placeholder="e.g. 600044"
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-600 font-semibold mb-1">Nationality</label>
                    <input
                      type="text"
                      value={profileForm.nationality}
                      onChange={e => setProfileForm({ ...profileForm, nationality: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                    />
                  </div>
                </div>
              </div>

              {/* SECTION 2: Passport Information */}
              <div className="space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-red-900 border-b border-slate-200 pb-1.5 flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  <span>2. Passport & International Travel Details</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div>
                    <label className="block text-slate-600 font-semibold mb-1">Passport Number</label>
                    <input
                      type="text"
                      value={profileForm.passportNumber}
                      onChange={e => setProfileForm({ ...profileForm, passportNumber: e.target.value.toUpperCase() })}
                      placeholder="e.g. V1234567"
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl uppercase font-mono text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-600 font-semibold mb-1">ECR / ECNR Status</label>
                    <select
                      value={profileForm.passportEcrStatus}
                      onChange={e => setProfileForm({ ...profileForm, passportEcrStatus: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                    >
                      <option value="ECNR">ECNR (Emigration Check Not Required)</option>
                      <option value="ECR">ECR (Emigration Check Required)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-600 font-semibold mb-1">Place of Issue</label>
                    <input
                      type="text"
                      value={profileForm.passportPlaceOfIssue}
                      onChange={e => setProfileForm({ ...profileForm, passportPlaceOfIssue: e.target.value })}
                      placeholder="e.g. Chennai / Trichy"
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-600 font-semibold mb-1">Date of Issue</label>
                    <input
                      type="date"
                      value={profileForm.passportIssueDate}
                      onChange={e => setProfileForm({ ...profileForm, passportIssueDate: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-600 font-semibold mb-1">Date of Expiry</label>
                    <input
                      type="date"
                      value={profileForm.passportExpiryDate}
                      onChange={e => setProfileForm({ ...profileForm, passportExpiryDate: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-600 font-semibold mb-1">Past Singapore FIN (If Any)</label>
                    <input
                      type="text"
                      value={profileForm.pastSingaporeFin}
                      onChange={e => setProfileForm({ ...profileForm, pastSingaporeFin: e.target.value.toUpperCase() })}
                      placeholder="e.g. G1234567A"
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono text-xs"
                    />
                  </div>
                </div>
              </div>

              {/* SECTION 3: Education & Experience */}
              <div className="space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-red-900 border-b border-slate-200 pb-1.5 flex items-center gap-2">
                  <GraduationCap className="w-4 h-4" />
                  <span>3. Education & Work Experience</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
                  <div>
                    <label className="block text-slate-600 font-semibold mb-1">Highest Qualification</label>
                    <select
                      value={profileForm.highestQualification}
                      onChange={e => setProfileForm({ ...profileForm, highestQualification: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                    >
                      <option value="10th Standard">10th Standard / SSLC</option>
                      <option value="12th Standard">12th Standard / HSC</option>
                      <option value="ITI / NTC">ITI / NTC (Technical)</option>
                      <option value="Diploma">Diploma (Polytechnic)</option>
                      <option value="Bachelor Degree (B.E / B.Tech / B.Sc / B.Com)">Bachelor Degree (B.E / B.Tech / etc.)</option>
                      <option value="Master Degree">Master Degree</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-600 font-semibold mb-1">Trade / Specialization</label>
                    <input
                      type="text"
                      value={profileForm.educationTrade}
                      onChange={e => setProfileForm({ ...profileForm, educationTrade: e.target.value, trade: e.target.value })}
                      placeholder="e.g. Fitter / Welder / Electrician"
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-600 font-semibold mb-1">Institute / College</label>
                    <input
                      type="text"
                      value={profileForm.institutionName}
                      onChange={e => setProfileForm({ ...profileForm, institutionName: e.target.value })}
                      placeholder="Institute Name"
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-600 font-semibold mb-1">Passing Year</label>
                    <input
                      type="text"
                      value={profileForm.yearOfPassing}
                      onChange={e => setProfileForm({ ...profileForm, yearOfPassing: e.target.value })}
                      placeholder="e.g. 2018"
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                    />
                  </div>

                  {/* Experience Breakdown */}
                  <div>
                    <label className="block text-slate-600 font-semibold mb-1">Total Experience (Yrs)</label>
                    <input
                      type="number"
                      min="0"
                      step="0.5"
                      value={profileForm.totalExperienceYears}
                      onChange={e => setProfileForm({ ...profileForm, totalExperienceYears: Number(e.target.value) })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-600 font-semibold mb-1">🇸🇬 Singapore Exp (Yrs)</label>
                    <input
                      type="number"
                      min="0"
                      step="0.5"
                      value={profileForm.singaporeExperienceYears}
                      onChange={e => setProfileForm({ ...profileForm, singaporeExperienceYears: Number(e.target.value) })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-600 font-semibold mb-1">Gulf Exp (Yrs)</label>
                    <input
                      type="number"
                      min="0"
                      step="0.5"
                      value={profileForm.gulfExperienceYears}
                      onChange={e => setProfileForm({ ...profileForm, gulfExperienceYears: Number(e.target.value) })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-600 font-semibold mb-1">India Exp (Yrs)</label>
                    <input
                      type="number"
                      min="0"
                      step="0.5"
                      value={profileForm.indiaExperienceYears}
                      onChange={e => setProfileForm({ ...profileForm, indiaExperienceYears: Number(e.target.value) })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-slate-600 font-semibold mb-1">Current / Last Employer</label>
                    <input
                      type="text"
                      value={profileForm.currentEmployer}
                      onChange={e => setProfileForm({ ...profileForm, currentEmployer: e.target.value })}
                      placeholder="Company Name"
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-slate-600 font-semibold mb-1">Current / Last Designation</label>
                    <input
                      type="text"
                      value={profileForm.currentDesignation}
                      onChange={e => setProfileForm({ ...profileForm, currentDesignation: e.target.value })}
                      placeholder="e.g. CNC Operator / Rigger / Electrician"
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                    />
                  </div>
                </div>
              </div>

              {/* SECTION 4: Skills & Career Preferences */}
              <div className="space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-red-900 border-b border-slate-200 pb-1.5 flex items-center gap-2">
                  <Briefcase className="w-4 h-4" />
                  <span>4. Placement Preferences & Skills</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div>
                    <label className="block text-slate-600 font-semibold mb-1">Preferred Singapore Role</label>
                    <input
                      type="text"
                      value={profileForm.preferredTrade}
                      onChange={e => setProfileForm({ ...profileForm, preferredTrade: e.target.value })}
                      placeholder="e.g. CNC Machinist / General Worker"
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-600 font-semibold mb-1">Expected Salary (SGD / Month)</label>
                    <input
                      type="number"
                      value={profileForm.expectedSalarySgd}
                      onChange={e => setProfileForm({ ...profileForm, expectedSalarySgd: e.target.value })}
                      placeholder="e.g. 1800"
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-600 font-semibold mb-1">Notice Period / Readiness</label>
                    <input
                      type="text"
                      value={profileForm.noticePeriod}
                      onChange={e => setProfileForm({ ...profileForm, noticePeriod: e.target.value })}
                      placeholder="e.g. Immediate / 15 Days"
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-slate-600 font-semibold mb-1">Trade Skills (Comma-separated)</label>
                    <input
                      type="text"
                      value={profileForm.skillsText}
                      onChange={e => setProfileForm({ ...profileForm, skillsText: e.target.value })}
                      placeholder="e.g. ARC Welding, Blueprint Reading, Lathe Machine, Safety Compliance"
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-600 font-semibold mb-1">Languages Spoken</label>
                    <input
                      type="text"
                      value={profileForm.languagesText}
                      onChange={e => setProfileForm({ ...profileForm, languagesText: e.target.value })}
                      placeholder="e.g. Tamil, English, Hindi"
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                    />
                  </div>
                </div>
              </div>

              {/* Submit & Save */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
                <button
                  type="submit"
                  disabled={savingProfile}
                  className="px-6 py-3 bg-red-900 hover:bg-red-800 disabled:opacity-50 text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>{savingProfile ? 'Saving & Syncing...' : 'Save & Sync Candidate Profile'}</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* SUBTAB 4: DOCUMENTS UPLOADER */}
        {activeSubTab === 'documents' && (
          <div className="space-y-6">
            {/* Upload New Document Box */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
              <div className="border-b border-slate-100 pb-3">
                <h2 className="text-lg font-bold text-slate-900">Upload Foreign Job Documents</h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Attach your passport scan, resume, education, and experience certificates for Singapore visa and employer processing.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Document Category *</label>
                  <select
                    value={uploadDocType}
                    onChange={e => setUploadDocType(e.target.value as DocumentType)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                  >
                    <option value="resume">Resume / Bio-Data</option>
                    <option value="passport">Passport Scan (Front & Back)</option>
                    <option value="education">Educational Certificate</option>
                    <option value="experience">Experience Certificate / Relieving Letter</option>
                    <option value="trade_certificate">Trade Certificate / License</option>
                    <option value="photo">Passport Size Photograph (White Background)</option>
                    <option value="other">Other Document</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Custom File Title (Optional)</label>
                  <input
                    type="text"
                    value={uploadDocName}
                    onChange={e => setUploadDocName(e.target.value)}
                    placeholder="e.g. ITI Fitter Certificate 2022"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                  />
                </div>

                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Select File (PDF, DOC, JPG, PNG)</label>
                  <label className="flex items-center justify-center gap-2 p-2.5 bg-red-50 hover:bg-red-100 text-red-900 border border-red-200 rounded-xl font-bold cursor-pointer transition-colors text-xs">
                    <Upload className="w-4 h-4" />
                    <span>{uploadingDoc ? 'Uploading...' : 'Browse & Upload'}</span>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                      onChange={handleFileUpload}
                      disabled={uploadingDoc}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            </div>

            {/* List of Uploaded Documents */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-slate-900">Your Document Vault</h3>
                <span className="text-xs text-slate-500">{candidate?.documents?.length || 0} uploaded files</span>
              </div>

              {candidate?.documents && candidate.documents.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {candidate.documents.map(doc => (
                    <div
                      key={doc.id}
                      className="bg-white p-4.5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-3 truncate">
                        <div className="w-10 h-10 rounded-xl bg-red-100 text-red-900 flex items-center justify-center shrink-0">
                          <FileText className="w-5 h-5" />
                        </div>
                        <div className="truncate">
                          <h4 className="font-bold text-slate-900 text-xs truncate" title={doc.name}>
                            {doc.name}
                          </h4>
                          <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-0.5">
                            <span className="capitalize">{doc.type.replace('_', ' ')}</span>
                            {doc.fileSize && <span>• {doc.fileSize}</span>}
                            <span>• {doc.uploadedAt?.slice(0, 10)}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        {doc.fileData && (
                          <a
                            href={doc.fileData}
                            download={doc.name}
                            className="p-2 text-slate-600 hover:text-red-900 rounded-lg hover:bg-slate-100 transition-colors"
                            title="Download Document"
                          >
                            <Eye className="w-4 h-4" />
                          </a>
                        )}
                        <button
                          type="button"
                          onClick={() => deleteCandidateDocument(doc.id)}
                          className="p-2 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors cursor-pointer"
                          title="Delete Document"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-3xl p-8 text-center border border-slate-200 text-slate-500 space-y-2">
                  <FileText className="w-8 h-8 mx-auto text-slate-400" />
                  <p className="text-xs font-medium">No documents uploaded yet.</p>
                  <p className="text-[11px] text-slate-400">
                    Upload your passport copy and resume to fast-track employer shortlisting.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
