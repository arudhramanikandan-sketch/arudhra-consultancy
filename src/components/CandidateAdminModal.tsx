import React, { useState, useRef } from 'react';
import { CandidateRecord, ApplicationStatus, CandidateDocument, DocumentType } from '../types';
import { useApp } from '../context/AppContext';
import {
  X,
  User,
  Phone,
  Mail,
  MapPin,
  Calendar,
  FileText,
  Briefcase,
  CheckCircle2,
  AlertCircle,
  Clock,
  Printer,
  Save,
  Download,
  ExternalLink,
  Shield,
  Eye,
  Globe,
  Trash2,
  Upload,
  Plus
} from 'lucide-react';

interface CandidateAdminModalProps {
  candidate: CandidateRecord | null;
  onClose: () => void;
  onOpenPdf: (cand: CandidateRecord) => void;
}

export const formatCandidateDocCategory = (type: string): string => {
  switch (type) {
    case 'resume':
      return 'Resume';
    case 'passport':
      return 'Passport Copy';
    case 'education':
      return 'Educational Certificates';
    case 'experience':
      return 'Experience Certificates';
    case 'photo':
      return 'Passport Photo';
    case 'trade_certificate':
    case 'other':
    default:
      return 'Other Supporting Documents';
  }
};

export const CandidateAdminModal: React.FC<CandidateAdminModalProps> = ({
  candidate,
  onClose,
  onOpenPdf
}) => {
  const {
    adminCandidates,
    updateCandidateAdminStatus,
    updateCandidateAdminRemarks,
    adminDeleteCandidateDocument,
    adminReplaceCandidateDocument,
    adminUploadCandidateDocument,
    adminDeleteCandidate,
    showToast
  } = useApp();

  const [activeTab, setActiveTab] = useState<'profile' | 'documents' | 'jobs' | 'admin'>('profile');
  const [selectedStatus, setSelectedStatus] = useState<ApplicationStatus>(candidate?.applicationStatus || 'submitted');
  const [remarksInput, setRemarksInput] = useState(candidate?.adminRemarks || '');
  const [saving, setSaving] = useState(false);

  // Candidate full deletion state
  const [deleteCandidateConfirmOpen, setDeleteCandidateConfirmOpen] = useState(false);
  const [isDeletingCandidate, setIsDeletingCandidate] = useState(false);

  // Document action states
  const [viewingDoc, setViewingDoc] = useState<CandidateDocument | null>(null);
  const [deleteConfirmDoc, setDeleteConfirmDoc] = useState<CandidateDocument | null>(null);
  const [isDeletingDoc, setIsDeletingDoc] = useState(false);
  const [replacingDoc, setReplacingDoc] = useState<CandidateDocument | null>(null);
  const [isReplacingDoc, setIsReplacingDoc] = useState(false);
  const replaceFileInputRef = useRef<HTMLInputElement>(null);

  // Upload new doc modal for Admin
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [newDocCategory, setNewDocCategory] = useState<DocumentType>('resume');
  const [newDocName, setNewDocName] = useState('');
  const [newDocFileData, setNewDocFileData] = useState<string>('');
  const [newDocFileSize, setNewDocFileSize] = useState<string>('');
  const [isUploadingNewDoc, setIsUploadingNewDoc] = useState(false);
  const newFileInputRef = useRef<HTMLInputElement>(null);

  if (!candidate) return null;

  // Retrieve the latest synchronized candidate record from admin state
  const activeCandidate = adminCandidates.find(
    c => c.id === candidate.id || c.candidateId === candidate.candidateId
  ) || candidate;

  const handleSaveStatus = async () => {
    setSaving(true);
    const res = await updateCandidateAdminStatus(activeCandidate.id, selectedStatus, remarksInput);
    setSaving(false);
  };

  const handleConfirmDelete = async () => {
    if (!deleteConfirmDoc) return;
    setIsDeletingDoc(true);
    const res = await adminDeleteCandidateDocument(activeCandidate.id, deleteConfirmDoc.id);
    setIsDeletingDoc(false);
    if (res.success) {
      setDeleteConfirmDoc(null);
    }
  };

  const triggerReplace = (doc: CandidateDocument) => {
    setReplacingDoc(doc);
    if (replaceFileInputRef.current) {
      replaceFileInputRef.current.value = '';
      replaceFileInputRef.current.click();
    }
  };

  const handleFileReplaced = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !replacingDoc) return;

    setIsReplacingDoc(true);
    const reader = new FileReader();
    reader.onload = async () => {
      const fileData = reader.result as string;
      const fileSize = file.size > 1024 * 1024
        ? `${(file.size / (1024 * 1024)).toFixed(1)} MB`
        : `${Math.round(file.size / 1024)} KB`;

      await adminReplaceCandidateDocument(activeCandidate.id, replacingDoc.id, {
        name: file.name,
        fileData,
        fileSize,
        type: replacingDoc.type
      });
      setIsReplacingDoc(false);
      setReplacingDoc(null);
    };
    reader.onerror = () => {
      showToast('Failed to read replacement file', 'error');
      setIsReplacingDoc(false);
      setReplacingDoc(null);
    };
    reader.readAsDataURL(file);
  };

  const handleDeleteCandidateConfirm = async () => {
    setIsDeletingCandidate(true);
    const res = await adminDeleteCandidate(activeCandidate.id);
    setIsDeletingCandidate(false);
    if (res.success) {
      setDeleteCandidateConfirmOpen(false);
      onClose();
    }
  };

  const handleNewFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!newDocName) {
      setNewDocName(file.name);
    }
    const fileSize = file.size > 1024 * 1024
      ? `${(file.size / (1024 * 1024)).toFixed(1)} MB`
      : `${Math.round(file.size / 1024)} KB`;
    setNewDocFileSize(fileSize);

    const reader = new FileReader();
    reader.onload = () => {
      setNewDocFileData(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleUploadNewDocSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDocName) {
      showToast('Document name is required', 'error');
      return;
    }
    setIsUploadingNewDoc(true);
    const res = await adminUploadCandidateDocument(activeCandidate.id, {
      type: newDocCategory,
      name: newDocName,
      fileData: newDocFileData,
      fileSize: newDocFileSize || '1.0 MB'
    });
    setIsUploadingNewDoc(false);
    if (res.success) {
      setIsUploadModalOpen(false);
      setNewDocName('');
      setNewDocFileData('');
      setNewDocFileSize('');
    }
  };

  const statusOptions: { value: ApplicationStatus; label: string; color: string }[] = [
    { value: 'submitted', label: 'Submitted (New)', color: 'bg-blue-100 text-blue-800' },
    { value: 'under_review', label: 'Under Review', color: 'bg-purple-100 text-purple-800' },
    { value: 'shortlisted', label: 'Shortlisted', color: 'bg-amber-100 text-amber-800' },
    { value: 'interview', label: 'Interview Scheduled', color: 'bg-indigo-100 text-indigo-800' },
    { value: 'selected', label: 'Selected / IPA Ready', color: 'bg-emerald-100 text-emerald-800' },
    { value: 'rejected', label: 'Rejected', color: 'bg-rose-100 text-rose-800' },
    { value: 'on_hold', label: 'On Hold / Documents Pending', color: 'bg-stone-100 text-stone-800' }
  ];

  return (
    <div
      id="candidate-admin-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/80 backdrop-blur-xs overflow-y-auto"
    >
      {/* Hidden file input for Replace action */}
      <input
        type="file"
        ref={replaceFileInputRef}
        onChange={handleFileReplaced}
        className="hidden"
        accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
      />

      <div
        id="candidate-admin-card"
        className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-auto max-h-[92vh] flex flex-col"
      >
        {/* Top Header */}
        <div className="bg-slate-900 text-white p-5 px-6 shrink-0 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-red-900 text-white flex items-center justify-center font-black text-xl shadow-md">
              {activeCandidate.fullName ? activeCandidate.fullName.charAt(0).toUpperCase() : 'C'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-extrabold text-white">
                  {activeCandidate.fullName || 'Candidate'}
                </h2>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-slate-800 text-amber-300 border border-slate-700">
                  {activeCandidate.candidateId}
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-1">
                <span className="flex items-center gap-1">
                  <Phone className="w-3 h-3 text-emerald-400" /> {activeCandidate.mobile}
                </span>
                {activeCandidate.email && (
                  <span className="flex items-center gap-1">
                    <Mail className="w-3 h-3 text-slate-400" /> {activeCandidate.email}
                  </span>
                )}
                {activeCandidate.city && (
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-slate-400" /> {activeCandidate.city}, {activeCandidate.state}
                  </span>
                )}
              </p>
            </div>
          </div>

          {/* Top Actions */}
          <div className="flex items-center gap-2 self-end sm:self-center">
            <button
              id="admin-open-pdf-btn"
              onClick={() => onOpenPdf(activeCandidate)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-red-900 hover:bg-red-800 text-white text-xs font-bold rounded-xl transition-all shadow-xs cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Generate Profile PDF</span>
            </button>
            <button
              id="admin-delete-candidate-btn"
              onClick={() => setDeleteCandidateConfirmOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-2 bg-rose-950/40 hover:bg-rose-900 text-rose-300 hover:text-white text-xs font-bold rounded-xl border border-rose-800/80 transition-all cursor-pointer"
              title="Permanently Delete Candidate Record"
            >
              <Trash2 className="w-4 h-4 text-rose-400" />
              <span className="hidden sm:inline">Delete Record</span>
            </button>
            <button
              id="admin-close-cand-modal-btn"
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-slate-100 border-b border-slate-200 px-6 flex items-center gap-2 overflow-x-auto shrink-0">
          {[
            { id: 'profile', label: 'Full Bio-Data & Passport', icon: User },
            { id: 'documents', label: `Documents (${activeCandidate.documents?.length || 0})`, icon: FileText },
            { id: 'jobs', label: `Applications & Interest (${(activeCandidate.applications?.length || 0) + (activeCandidate.interestedJobs?.length || 0)})`, icon: Briefcase },
            { id: 'admin', label: 'Status & Admin Remarks', icon: Shield }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-3 px-3.5 text-xs font-bold border-b-2 flex items-center gap-1.5 whitespace-nowrap transition-colors cursor-pointer ${
                  isActive
                    ? 'border-red-900 text-red-900 bg-white shadow-xs rounded-t-lg'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6 text-slate-800">
          {/* TAB 1: PROFILE */}
          {activeTab === 'profile' && (
            <div className="space-y-6">
              {/* Personal & Passport Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Personal Info */}
                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200 pb-2 flex items-center gap-1.5">
                    <User className="w-4 h-4 text-red-900" />
                    <span>Personal Information</span>
                  </h3>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="text-slate-400 block text-[11px]">Full Name</span>
                      <span className="font-bold text-slate-900">{activeCandidate.fullName || '-'}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[11px]">Date of Birth</span>
                      <span className="font-semibold text-slate-900">{activeCandidate.dateOfBirth || '-'}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[11px]">Gender</span>
                      <span className="font-semibold text-slate-900 capitalize">{activeCandidate.gender || '-'}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[11px]">Marital Status</span>
                      <span className="font-semibold text-slate-900 capitalize">{activeCandidate.maritalStatus || '-'}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[11px]">Nationality</span>
                      <span className="font-semibold text-slate-900">{activeCandidate.nationality || 'Indian'}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[11px]">City & State</span>
                      <span className="font-semibold text-slate-900">
                        {activeCandidate.city ? `${activeCandidate.city}, ${activeCandidate.state || ''}` : '-'}
                      </span>
                    </div>
                    <div className="col-span-2">
                      <span className="text-slate-400 block text-[11px]">Residential Address</span>
                      <span className="font-semibold text-slate-900">{activeCandidate.address || '-'}</span>
                    </div>
                  </div>
                </div>

                {/* Passport Info */}
                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200 pb-2 flex items-center gap-1.5">
                    <Globe className="w-4 h-4 text-red-900" />
                    <span>Passport & Travel Verification</span>
                  </h3>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="text-slate-400 block text-[11px]">Passport Number</span>
                      <span className="font-mono font-bold text-red-900 text-sm">{activeCandidate.passportNumber || 'Not Uploaded'}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[11px]">ECR / ECNR Status</span>
                      <span className="font-semibold text-slate-900">{activeCandidate.passportEcrStatus || 'ECNR (Non-ECR)'}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[11px]">Date of Issue</span>
                      <span className="font-semibold text-slate-900">{activeCandidate.passportIssueDate || '-'}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[11px]">Date of Expiry</span>
                      <span className="font-semibold text-slate-900">{activeCandidate.passportExpiryDate || '-'}</span>
                    </div>
                    <div className="col-span-2">
                      <span className="text-slate-400 block text-[11px]">Place of Issue</span>
                      <span className="font-semibold text-slate-900">{activeCandidate.passportPlaceOfIssue || '-'}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Education & Experience Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Education */}
                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200 pb-2">
                    Education & Qualification
                  </h3>
                  <div className="space-y-2 text-xs">
                    <div>
                      <span className="text-slate-400 block text-[11px]">Highest Qualification</span>
                      <span className="font-bold text-slate-900">{activeCandidate.highestQualification || '10th / 12th / ITI'}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[11px]">Trade / Branch</span>
                      <span className="font-semibold text-slate-900">{activeCandidate.educationTrade || activeCandidate.trade || '-'}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[11px]">Institution</span>
                      <span className="font-semibold text-slate-900">{activeCandidate.institutionName || '-'}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[11px]">Passing Year</span>
                      <span className="font-semibold text-slate-900">{activeCandidate.yearOfPassing || '-'}</span>
                    </div>
                  </div>
                </div>

                {/* Experience */}
                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200 pb-2">
                    Experience Breakdown
                  </h3>
                  <div className="grid grid-cols-3 gap-2 text-center bg-white p-3 rounded-xl border border-slate-200 text-xs">
                    <div>
                      <span className="text-[10px] text-slate-400 block">Total</span>
                      <span className="font-extrabold text-slate-900 text-sm">{activeCandidate.totalExperienceYears || '0'} Yrs</span>
                    </div>
                    <div className="border-x border-slate-200">
                      <span className="text-[10px] text-red-900 font-bold block">🇸🇬 Singapore</span>
                      <span className="font-extrabold text-red-900 text-sm">{activeCandidate.singaporeExperienceYears || '0'} Yrs</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block">Gulf / Other</span>
                      <span className="font-extrabold text-slate-900 text-sm">{activeCandidate.gulfExperienceYears || '0'} Yrs</span>
                    </div>
                  </div>
                  <div className="text-xs space-y-1">
                    <span className="text-slate-400 block text-[11px]">Employer & Role</span>
                    <span className="font-semibold text-slate-900">
                      {activeCandidate.currentEmployer ? `${activeCandidate.currentEmployer} (${activeCandidate.currentDesignation || 'Worker'})` : '-'}
                    </span>
                    {activeCandidate.pastSingaporeFin && (
                      <p className="text-[11px] font-mono text-slate-600">Past Singapore FIN: {activeCandidate.pastSingaporeFin}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Skills & Preferences */}
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3 text-xs">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200 pb-2">
                  Skills, Languages & Placement Preferences
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <span className="text-slate-400 block text-[11px] mb-1">Skills</span>
                    <div className="flex flex-wrap gap-1">
                      {activeCandidate.skills && activeCandidate.skills.length > 0 ? (
                        activeCandidate.skills.map((sk, i) => (
                          <span key={i} className="px-2 py-0.5 rounded bg-white border border-slate-200 font-medium">
                            {sk}
                          </span>
                        ))
                      ) : (
                        <span className="text-slate-400 italic">None listed</span>
                      )}
                    </div>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px] mb-1">Languages</span>
                    <div className="flex flex-wrap gap-1">
                      {activeCandidate.languages && activeCandidate.languages.length > 0 ? (
                        activeCandidate.languages.map((lg, i) => (
                          <span key={i} className="px-2 py-0.5 rounded bg-red-50 text-red-900 border border-red-200 font-medium">
                            {lg}
                          </span>
                        ))
                      ) : (
                        <span className="text-slate-400 italic">Tamil, English</span>
                      )}
                    </div>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Placement Preferences</span>
                    <p className="font-bold text-slate-900">
                      Expected Salary: <span className="text-emerald-700">{activeCandidate.expectedSalarySgd ? `SGD ${activeCandidate.expectedSalarySgd}` : 'Negotiable'}</span>
                    </p>
                    <p className="text-slate-600 text-[11px]">Notice / Readiness: {activeCandidate.noticePeriod || 'Immediate'}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: DOCUMENTS */}
          {activeTab === 'documents' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Candidate Documents</h3>
                  <p className="text-xs text-slate-500">
                    Manage candidate verification documents across standard categories (Resume, Passport, Education, Experience, Photos).
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-500 font-mono bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200">
                    {activeCandidate.documents?.length || 0} files on record
                  </span>
                  <button
                    type="button"
                    id="admin-add-doc-btn"
                    onClick={() => setIsUploadModalOpen(true)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-all shadow-2xs cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Upload Document</span>
                  </button>
                </div>
              </div>

              {activeCandidate.documents && activeCandidate.documents.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {activeCandidate.documents.map((doc, idx) => (
                    <div
                      key={doc.id || idx}
                      id={`cand-doc-card-${doc.id}`}
                      className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col justify-between gap-3 shadow-2xs hover:border-slate-300 transition-colors"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-xl bg-red-100 text-red-900 flex items-center justify-center font-bold shrink-0">
                          <FileText className="w-5 h-5" />
                        </div>
                        <div className="truncate flex-1">
                          <h4 className="font-bold text-slate-900 text-xs truncate" title={doc.name}>
                            {doc.name}
                          </h4>
                          <span className="inline-block px-2 py-0.5 rounded text-[10px] font-semibold bg-red-50 text-red-900 border border-red-200 mt-1">
                            {formatCandidateDocCategory(doc.type)}
                          </span>
                          <span className="text-[10px] text-slate-400 block mt-0.5">
                            Uploaded: {doc.uploadedAt?.slice(0, 10)} {doc.fileSize ? `• ${doc.fileSize}` : ''}
                          </span>
                        </div>
                      </div>

                      {/* View, Replace, Delete Action Buttons */}
                      <div className="flex items-center justify-end gap-1.5 pt-2 border-t border-slate-200">
                        {/* View Button */}
                        <button
                          type="button"
                          id={`view-doc-btn-${doc.id}`}
                          onClick={() => setViewingDoc(doc)}
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                          title="View Document"
                        >
                          <Eye className="w-3.5 h-3.5 text-slate-600" />
                          <span>View</span>
                        </button>

                        {/* Replace Button */}
                        <button
                          type="button"
                          id={`replace-doc-btn-${doc.id}`}
                          onClick={() => triggerReplace(doc)}
                          disabled={isReplacingDoc}
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-semibold rounded-lg transition-colors cursor-pointer disabled:opacity-50"
                          title="Replace Document with new file"
                        >
                          <Upload className="w-3.5 h-3.5 text-slate-600" />
                          <span>Replace</span>
                        </button>

                        {/* Delete Button */}
                        <button
                          type="button"
                          id={`delete-doc-btn-${doc.id}`}
                          onClick={() => setDeleteConfirmDoc(doc)}
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                          title="Delete Document"
                        >
                          <Trash2 className="w-3.5 h-3.5 text-rose-600" />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-10 text-center bg-slate-50 rounded-2xl border border-slate-200 text-slate-500 space-y-2">
                  <FileText className="w-8 h-8 mx-auto text-slate-400" />
                  <p className="text-xs font-medium">No candidate documents uploaded yet.</p>
                  <button
                    type="button"
                    onClick={() => setIsUploadModalOpen(true)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-red-900 hover:bg-red-800 text-white text-xs font-bold rounded-xl transition-all shadow-2xs cursor-pointer mt-2"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload First Document</span>
                  </button>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: JOBS & APPLICATIONS */}
          {activeTab === 'jobs' && (
            <div className="space-y-6">
              {/* Applications History */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                  <Briefcase className="w-4 h-4 text-red-900" />
                  <span>Enquiries & Application Records ({activeCandidate.applications?.length || 0})</span>
                </h3>
                {activeCandidate.applications && activeCandidate.applications.length > 0 ? (
                  <div className="space-y-2.5">
                    {activeCandidate.applications.map((app, i) => (
                      <div key={i} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between gap-4 text-xs">
                        <div>
                          <span className="font-bold text-slate-900 block text-sm">{app.jobTitle || 'General Singapore Placement'}</span>
                          <span className="text-[11px] text-slate-500 font-mono">
                            Enquiry ID: {app.id} • Submitted: {app.createdAt}
                          </span>
                          {app.candidateTrade && (
                            <p className="text-slate-600 text-[11px] mt-0.5">Trade: <strong>{app.candidateTrade}</strong></p>
                          )}
                        </div>
                        <div className="text-right">
                          <span className="px-2.5 py-1 rounded-full text-[11px] font-bold uppercase bg-slate-200 text-slate-800">
                            {app.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-slate-500 italic p-4 bg-slate-50 rounded-xl border border-slate-200">
                    No formal job enquiries submitted.
                  </p>
                )}
              </div>

              {/* Interested Jobs */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                  <Eye className="w-4 h-4 text-red-900" />
                  <span>Marked Interested Jobs ({activeCandidate.interestedJobs?.length || 0})</span>
                </h3>
                {activeCandidate.interestedJobs && activeCandidate.interestedJobs.length > 0 ? (
                  <div className="space-y-2">
                    {activeCandidate.interestedJobs.map((ij, idx) => (
                      <div key={idx} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between gap-3 text-xs">
                        <div>
                          <span className="font-bold text-slate-900 block">{ij.jobTitle}</span>
                          <span className="text-[11px] text-slate-500">Ref: {ij.jobId} • Marked on {ij.markedAt?.slice(0, 10)}</span>
                        </div>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800">
                          ★ Interested
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-slate-500 italic p-4 bg-slate-50 rounded-xl border border-slate-200">
                    Candidate has not bookmarked any jobs as interested yet.
                  </p>
                )}
              </div>
            </div>
          )}

          {/* TAB 4: STATUS & ADMIN REMARKS */}
          {activeTab === 'admin' && (
            <div className="space-y-6">
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Recruitment Pipeline Status
                  </label>
                  <p className="text-xs text-slate-500 mb-3">
                    Updating this status automatically synchronizes to the Candidate Portal so the candidate can track their Singapore placement progress in real-time.
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {statusOptions.map(opt => {
                      const isSelected = selectedStatus === opt.value;
                      return (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => setSelectedStatus(opt.value)}
                          className={`p-3 rounded-xl border text-xs font-bold text-left transition-all cursor-pointer ${
                            isSelected
                              ? 'border-red-900 bg-red-50 text-red-950 shadow-xs ring-2 ring-red-900/20'
                              : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                          }`}
                        >
                          <span className="block">{opt.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Internal Consultant Remarks / Processing Notes
                  </label>
                  <textarea
                    rows={4}
                    value={remarksInput}
                    onChange={e => setRemarksInput(e.target.value)}
                    placeholder="Enter internal verification remarks, client interview schedule, MOM pass status, document requirements, or follow-up notes..."
                    className="w-full p-3 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-red-900"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={handleSaveStatus}
                    disabled={saving}
                    className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-red-900 hover:bg-red-800 disabled:opacity-50 text-white text-xs font-bold rounded-xl shadow-xs transition-all cursor-pointer"
                  >
                    <Save className="w-4 h-4" />
                    <span>{saving ? 'Saving & Syncing...' : 'Save & Sync Candidate Status'}</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 px-6 bg-slate-50 border-t border-slate-200 shrink-0 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            Candidate ID: <strong className="text-slate-800">{activeCandidate.candidateId}</strong> • Updated: {activeCandidate.updatedAt?.slice(0, 10)}
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-semibold rounded-xl transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>

      {/* CONFIRMATION DIALOG: DELETE CANDIDATE DOCUMENT */}
      {deleteConfirmDoc && (
        <div
          id="delete-doc-confirm-dialog-overlay"
          className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs"
        >
          <div
            id="delete-doc-confirm-dialog"
            className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden"
          >
            <div className="bg-rose-50 border-b border-rose-100 p-5 flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center shrink-0">
                <Trash2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-slate-900">Delete Candidate Document</h3>
                <p className="text-xs text-rose-900 mt-0.5 font-medium">
                  Are you sure you want to delete this document?
                </p>
              </div>
            </div>

            <div className="p-5 space-y-3.5 text-xs">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2.5">
                <div className="flex items-start justify-between gap-2">
                  <span className="text-slate-500 font-medium">Document Name:</span>
                  <span className="font-bold text-slate-900 text-right break-all max-w-[220px]">
                    {deleteConfirmDoc.name}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-200/80">
                  <span className="text-slate-500 font-medium">Document Category:</span>
                  <span className="font-bold text-red-900 bg-red-50 px-2 py-0.5 rounded border border-red-200">
                    {formatCandidateDocCategory(deleteConfirmDoc.type)}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-200/80">
                  <span className="text-slate-500 font-medium">Candidate Name:</span>
                  <span className="font-bold text-slate-900">
                    {activeCandidate.fullName || 'Candidate'} ({activeCandidate.candidateId || activeCandidate.id})
                  </span>
                </div>
              </div>

              <p className="text-[11px] text-slate-500 leading-relaxed">
                This will permanently delete this document record and stored file from storage. All other candidate profile details, applications, and documents will remain untouched.
              </p>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-end gap-2.5">
              <button
                type="button"
                id="cancel-delete-doc-btn"
                disabled={isDeletingDoc}
                onClick={() => setDeleteConfirmDoc(null)}
                className="px-4 py-2 bg-white hover:bg-slate-100 text-slate-700 font-bold rounded-xl border border-slate-300 text-xs transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                id="confirm-delete-doc-btn"
                disabled={isDeletingDoc}
                onClick={handleConfirmDelete}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl text-xs shadow-xs transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>{isDeletingDoc ? 'Deleting...' : 'Delete'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DOCUMENT PREVIEW MODAL */}
      {viewingDoc && (
        <div
          id="view-candidate-doc-modal-overlay"
          className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs"
        >
          <div
            id="view-candidate-doc-modal"
            className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]"
          >
            <div className="bg-slate-900 text-white p-4 px-5 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2.5">
                <FileText className="w-5 h-5 text-amber-400" />
                <div>
                  <h3 className="text-sm font-bold text-white truncate max-w-md">{viewingDoc.name}</h3>
                  <span className="text-[11px] text-slate-300">
                    {formatCandidateDocCategory(viewingDoc.type)} • {viewingDoc.fileSize || 'Standard Document'}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setViewingDoc(null)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 overflow-y-auto flex-1 bg-slate-50 flex items-center justify-center min-h-[280px]">
              {viewingDoc.fileData?.startsWith('data:image') ? (
                <img
                  src={viewingDoc.fileData}
                  alt={viewingDoc.name}
                  className="max-h-[55vh] max-w-full rounded-xl object-contain border border-slate-200 shadow-xs"
                />
              ) : viewingDoc.fileData?.startsWith('data:application/pdf') ? (
                <iframe
                  src={viewingDoc.fileData}
                  title={viewingDoc.name}
                  className="w-full h-[55vh] rounded-xl border border-slate-200"
                />
              ) : (
                <div className="text-center p-6 bg-white rounded-2xl border border-slate-200 shadow-2xs max-w-md space-y-3">
                  <div className="w-16 h-16 rounded-2xl bg-red-50 text-red-900 flex items-center justify-center mx-auto">
                    <FileText className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">{viewingDoc.name}</h4>
                    <p className="text-xs text-slate-500 mt-1">
                      Category: <strong>{formatCandidateDocCategory(viewingDoc.type)}</strong>
                    </p>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Uploaded: {viewingDoc.uploadedAt?.slice(0, 10)} {viewingDoc.fileSize ? `• ${viewingDoc.fileSize}` : ''}
                    </p>
                    <p className="text-[11px] text-slate-500 mt-2">
                      Candidate: {activeCandidate.fullName} ({activeCandidate.candidateId || activeCandidate.id})
                    </p>
                  </div>
                  {viewingDoc.fileData && (
                    <a
                      href={viewingDoc.fileData}
                      download={viewingDoc.name}
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-red-900 hover:bg-red-800 text-white font-bold rounded-xl text-xs transition-colors cursor-pointer shadow-xs mt-2"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download Document File</span>
                    </a>
                  )}
                </div>
              )}
            </div>

            <div className="p-4 bg-white border-t border-slate-200 flex items-center justify-between shrink-0">
              <span className="text-xs text-slate-500">
                Doc ID: <strong className="text-slate-800 font-mono">{viewingDoc.id}</strong>
              </span>
              <div className="flex items-center gap-2">
                {viewingDoc.fileData && (
                  <a
                    href={viewingDoc.fileData}
                    download={viewingDoc.name}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-red-900 hover:bg-red-800 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download</span>
                  </a>
                )}
                <button
                  onClick={() => setViewingDoc(null)}
                  className="px-4 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* UPLOAD DOCUMENT MODAL (ADMIN) */}
      {isUploadModalOpen && (
        <div
          id="upload-cand-doc-modal-overlay"
          className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs"
        >
          <div
            id="upload-cand-doc-modal"
            className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden"
          >
            <div className="bg-slate-900 text-white p-4 px-5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Upload className="w-4 h-4 text-amber-400" />
                <h3 className="text-sm font-bold text-white">Upload Candidate Document</h3>
              </div>
              <button
                onClick={() => setIsUploadModalOpen(false)}
                className="p-1 text-slate-400 hover:text-white rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleUploadNewDocSubmit} className="p-5 space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Document Category</label>
                <select
                  value={newDocCategory}
                  onChange={e => setNewDocCategory(e.target.value as DocumentType)}
                  className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-900"
                >
                  <option value="resume">Resume / Bio-Data</option>
                  <option value="passport">Passport Copy</option>
                  <option value="education">Educational Certificates</option>
                  <option value="experience">Experience Certificates</option>
                  <option value="photo">Passport Photo</option>
                  <option value="other">Other Supporting Documents</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Document Title / File Name</label>
                <input
                  type="text"
                  value={newDocName}
                  onChange={e => setNewDocName(e.target.value)}
                  placeholder="e.g. Passport_Copy_Front_Back.pdf"
                  required
                  className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-900"
                >
                </input>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Select File</label>
                <input
                  type="file"
                  ref={newFileInputRef}
                  onChange={handleNewFileSelected}
                  className="w-full p-2 border border-slate-200 rounded-xl text-xs"
                  accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                />
                {newDocFileSize && (
                  <p className="text-[11px] text-slate-500 mt-1">File size: {newDocFileSize}</p>
                )}
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsUploadModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUploadingNewDoc}
                  className="px-4 py-2 bg-red-900 hover:bg-red-800 text-white font-bold rounded-xl shadow-xs disabled:opacity-50"
                >
                  {isUploadingNewDoc ? 'Uploading...' : 'Save Document'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CANDIDATE MASTER RECORD DELETE CONFIRMATION MODAL */}
      {deleteCandidateConfirmOpen && (
        <div
          id="delete-cand-record-modal-overlay"
          className="fixed inset-0 z-70 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-xs"
        >
          <div
            id="delete-cand-record-modal"
            className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 p-6 space-y-4 animate-in fade-in zoom-in-95 duration-150"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center shrink-0 border border-rose-200">
                <Trash2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-base text-slate-900">Delete Candidate Record</h3>
                <p className="text-xs text-slate-500">Permanent Master Directory Removal</p>
              </div>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2 text-xs">
              <div className="flex justify-between items-center py-1 border-b border-slate-200/60">
                <span className="text-slate-500 font-medium">Candidate ID:</span>
                <span className="font-mono font-bold text-red-900 bg-red-50 px-2 py-0.5 rounded border border-red-200">
                  {activeCandidate.candidateId || activeCandidate.id}
                </span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-slate-200/60">
                <span className="text-slate-500 font-medium">Full Name:</span>
                <span className="font-bold text-slate-900">{activeCandidate.fullName || 'Overseas Candidate'}</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-slate-200/60">
                <span className="text-slate-500 font-medium">Mobile:</span>
                <span className="font-mono text-slate-700">{activeCandidate.mobile}</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-slate-500 font-medium">Attached Documents:</span>
                <span className="font-bold text-slate-700">{activeCandidate.documents?.length || 0} Files</span>
              </div>
            </div>

            <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 flex items-start gap-2.5 text-[11px] text-amber-900">
              <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <p>
                Warning: This action will permanently erase all bio-data, trade background, uploaded files, and job applications linked to this candidate.
              </p>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setDeleteCandidateConfirmOpen(false)}
                disabled={isDeletingCandidate}
                className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteCandidateConfirm}
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
    </div>
  );
};

