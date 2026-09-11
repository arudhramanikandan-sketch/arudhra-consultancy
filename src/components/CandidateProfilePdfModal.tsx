import React from 'react';
import { CandidateRecord, SiteSettings } from '../types';
import { Printer, Download, X, Building, CheckCircle2, Shield, Phone, Mail, MapPin, Globe, FileText, User } from 'lucide-react';

interface CandidateProfilePdfModalProps {
  candidate: CandidateRecord | null;
  settings: SiteSettings;
  onClose: () => void;
}

export const CandidateProfilePdfModal: React.FC<CandidateProfilePdfModalProps> = ({
  candidate,
  settings,
  onClose
}) => {
  if (!candidate) return null;

  const handlePrint = () => {
    window.print();
  };

  const statusColors: Record<string, string> = {
    submitted: 'bg-blue-100 text-blue-800 border-blue-300',
    under_review: 'bg-purple-100 text-purple-800 border-purple-300',
    shortlisted: 'bg-amber-100 text-amber-800 border-amber-300',
    interview: 'bg-indigo-100 text-indigo-800 border-indigo-300',
    selected: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    rejected: 'bg-rose-100 text-rose-800 border-rose-300',
    on_hold: 'bg-stone-100 text-stone-800 border-stone-300'
  };

  return (
    <div
      id="candidate-pdf-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-xs overflow-y-auto"
    >
      <div
        id="candidate-pdf-container"
        className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-slate-300 overflow-hidden my-auto max-h-[94vh] flex flex-col"
      >
        {/* Modal Action Bar (Hidden on print) */}
        <div className="bg-slate-900 text-white p-4 px-6 flex items-center justify-between shrink-0 print:hidden border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-red-900 text-white flex items-center justify-center font-bold">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Official Candidate Master Dossier</h3>
              <p className="text-xs text-slate-300 font-mono">
                {candidate.candidateId} • {candidate.fullName || candidate.mobile}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              id="print-candidate-pdf-btn"
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-red-900 hover:bg-red-800 text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Save as PDF</span>
            </button>
            <button
              id="close-candidate-pdf-btn"
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Document Content */}
        <div
          id="candidate-printable-dossier"
          className="p-6 sm:p-10 overflow-y-auto flex-1 bg-white text-slate-900 space-y-6 print:p-0 print:space-y-4 print:text-black"
        >
          {/* Official Letterhead Header */}
          <div className="border-b-2 border-red-900 pb-5">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-lg bg-red-900 text-white flex items-center justify-center font-black text-lg">
                    AC
                  </div>
                  <div>
                    <h1 className="text-xl sm:text-2xl font-black text-red-900 tracking-tight uppercase">
                      {settings.siteName || 'ARUDHRA CONSULTANCY'}
                    </h1>
                    <p className="text-xs font-semibold text-slate-600 tracking-wider uppercase">
                      Singapore & Overseas Manpower Recruitment Specialists
                    </p>
                  </div>
                </div>
                <p className="text-[11px] text-slate-500 max-w-lg mt-1">
                  {settings.address || 'Chromepet, Chennai, Tamil Nadu, India'} • Phone: {settings.phone} • WhatsApp: {settings.whatsappNumber}
                </p>
              </div>

              {/* Candidate Quick Tag & Status */}
              <div className="text-right sm:border-l sm:border-slate-200 sm:pl-5 space-y-1">
                <span className="text-[11px] uppercase tracking-wider text-slate-500 font-bold block">
                  Candidate ID
                </span>
                <span className="text-lg font-black text-slate-900 font-mono block">
                  {candidate.candidateId}
                </span>
                <span
                  className={`inline-block px-2.5 py-0.5 rounded-md text-xs font-extrabold uppercase border ${
                    statusColors[candidate.applicationStatus] || 'bg-slate-100 text-slate-800'
                  }`}
                >
                  {candidate.applicationStatus.replace('_', ' ')}
                </span>
              </div>
            </div>
          </div>

          {/* Candidate Profile Summary Banner */}
          <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
            <div className="sm:col-span-2 space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Candidate Full Name</span>
              <h2 className="text-base font-black text-slate-900">{candidate.fullName || 'Candidate (Name Not Provided)'}</h2>
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-slate-600 pt-1">
                <span className="flex items-center gap-1 font-medium">
                  <Phone className="w-3 h-3 text-emerald-600" /> {candidate.mobile}
                </span>
                {candidate.email && (
                  <span className="flex items-center gap-1 font-medium">
                    <Mail className="w-3 h-3 text-red-700" /> {candidate.email}
                  </span>
                )}
                {candidate.city && (
                  <span className="flex items-center gap-1 font-medium">
                    <MapPin className="w-3 h-3 text-slate-500" /> {candidate.city}, {candidate.state}
                  </span>
                )}
              </div>
            </div>

            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Trade / Desired Role</span>
              <p className="font-bold text-slate-800 text-sm mt-0.5">
                {candidate.trade || candidate.preferredTrade || 'General Placement'}
              </p>
              <span className="text-[11px] text-slate-500">Exp: {candidate.totalExperienceYears ? `${candidate.totalExperienceYears} Yrs` : 'Not Specified'}</span>
            </div>

            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Expected Salary</span>
              <p className="font-bold text-emerald-800 text-sm mt-0.5">
                {candidate.expectedSalarySgd ? `SGD ${candidate.expectedSalarySgd} / mo` : 'Negotiable'}
              </p>
              <span className="text-[11px] text-slate-500">Notice: {candidate.noticePeriod || 'Immediate'}</span>
            </div>
          </div>

          {/* Section 1: Personal & Passport Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="border border-slate-200 rounded-xl p-4.5 space-y-3">
              <h3 className="text-xs font-black uppercase tracking-wider text-red-900 border-b border-slate-100 pb-2">
                1. Personal Information
              </h3>
              <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-xs">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-semibold">Date of Birth</span>
                  <span className="font-semibold text-slate-800">{candidate.dateOfBirth || '-'}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-semibold">Gender / Status</span>
                  <span className="font-semibold text-slate-800 capitalize">
                    {candidate.gender || '-'} {candidate.maritalStatus ? `• ${candidate.maritalStatus}` : ''}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-semibold">Nationality</span>
                  <span className="font-semibold text-slate-800">{candidate.nationality || 'Indian'}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-semibold">Postal Code / PIN</span>
                  <span className="font-semibold text-slate-800">{candidate.postalCode || '-'}</span>
                </div>
                <div className="col-span-2">
                  <span className="text-slate-400 block text-[10px] uppercase font-semibold">Permanent Address</span>
                  <span className="font-semibold text-slate-800">{candidate.address || '-'}</span>
                </div>
              </div>
            </div>

            {/* Passport Details */}
            <div className="border border-slate-200 rounded-xl p-4.5 space-y-3 bg-stone-50/50">
              <h3 className="text-xs font-black uppercase tracking-wider text-red-900 border-b border-slate-100 pb-2">
                2. Passport & Travel Readiness
              </h3>
              <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-xs">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-semibold">Passport Number</span>
                  <span className="font-mono font-bold text-slate-900">{candidate.passportNumber || 'Not Uploaded'}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-semibold">ECR / ECNR Status</span>
                  <span className="font-semibold text-slate-800">{candidate.passportEcrStatus || 'ECNR (Non-ECR)'}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-semibold">Date of Issue</span>
                  <span className="font-semibold text-slate-800">{candidate.passportIssueDate || '-'}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-semibold">Date of Expiry</span>
                  <span className="font-semibold text-slate-800">{candidate.passportExpiryDate || '-'}</span>
                </div>
                <div className="col-span-2">
                  <span className="text-slate-400 block text-[10px] uppercase font-semibold">Place of Issue</span>
                  <span className="font-semibold text-slate-800">{candidate.passportPlaceOfIssue || '-'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Education & Work Experience */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Education */}
            <div className="border border-slate-200 rounded-xl p-4.5 space-y-3">
              <h3 className="text-xs font-black uppercase tracking-wider text-red-900 border-b border-slate-100 pb-2">
                3. Education & Trade Qualifications
              </h3>
              <div className="space-y-2 text-xs">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-semibold">Highest Qualification</span>
                  <span className="font-bold text-slate-800">{candidate.highestQualification || '10th / 12th / ITI'}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-semibold">Trade / Specialization</span>
                  <span className="font-semibold text-slate-800">{candidate.educationTrade || candidate.trade || '-'}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-semibold">Institution / University</span>
                  <span className="font-semibold text-slate-800">{candidate.institutionName || '-'}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-semibold">Year of Passing</span>
                  <span className="font-semibold text-slate-800">{candidate.yearOfPassing || '-'}</span>
                </div>
              </div>
            </div>

            {/* Experience */}
            <div className="border border-slate-200 rounded-xl p-4.5 space-y-3">
              <h3 className="text-xs font-black uppercase tracking-wider text-red-900 border-b border-slate-100 pb-2">
                4. Overseas & Domestic Experience
              </h3>
              <div className="grid grid-cols-3 gap-2 text-center bg-slate-50 p-2.5 rounded-lg border border-slate-200 text-xs mb-2">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-500 block">Total</span>
                  <span className="font-black text-slate-900">{candidate.totalExperienceYears || '0'} Yrs</span>
                </div>
                <div className="border-x border-slate-200">
                  <span className="text-[10px] uppercase font-bold text-red-900 block">🇸🇬 Singapore</span>
                  <span className="font-black text-red-900">{candidate.singaporeExperienceYears || '0'} Yrs</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-500 block">Gulf / Other</span>
                  <span className="font-black text-slate-900">{candidate.gulfExperienceYears || '0'} Yrs</span>
                </div>
              </div>
              <div className="space-y-1 text-xs">
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">Previous Employer & Role</span>
                <p className="font-semibold text-slate-800">
                  {candidate.currentEmployer ? `${candidate.currentEmployer} (${candidate.currentDesignation || 'Technician'})` : 'Experience documented in profile'}
                </p>
                {candidate.pastSingaporeFin && (
                  <p className="text-[11px] text-slate-600 font-mono pt-1">
                    Previous Singapore FIN: <strong>{candidate.pastSingaporeFin}</strong>
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Section 3: Skills & Spoken Languages */}
          <div className="border border-slate-200 rounded-xl p-4.5 space-y-3">
            <h3 className="text-xs font-black uppercase tracking-wider text-red-900 border-b border-slate-100 pb-2">
              5. Technical Skills & Languages
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-semibold mb-1.5">Trade Skills & Competencies</span>
                <div className="flex flex-wrap gap-1.5">
                  {candidate.skills && candidate.skills.length > 0 ? (
                    candidate.skills.map((sk, i) => (
                      <span key={i} className="px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-800 font-medium text-[11px] border border-slate-200">
                        {sk}
                      </span>
                    ))
                  ) : (
                    <span className="text-slate-500 italic">None specified</span>
                  )}
                </div>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-semibold mb-1.5">Languages Known</span>
                <div className="flex flex-wrap gap-1.5">
                  {candidate.languages && candidate.languages.length > 0 ? (
                    candidate.languages.map((lg, i) => (
                      <span key={i} className="px-2.5 py-0.5 rounded-md bg-red-50 text-red-900 font-medium text-[11px] border border-red-200">
                        {lg}
                      </span>
                    ))
                  ) : (
                    <span className="text-slate-500 italic">Tamil, English</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Section 4: Verified Documents Checklist */}
          <div className="border border-slate-200 rounded-xl p-4.5 space-y-3">
            <h3 className="text-xs font-black uppercase tracking-wider text-red-900 border-b border-slate-100 pb-2 flex items-center justify-between">
              <span>6. Uploaded Documents & Verification Record</span>
              <span className="text-[11px] font-mono text-slate-500">Total Files: {candidate.documents?.length || 0}</span>
            </h3>
            {candidate.documents && candidate.documents.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {candidate.documents.map((doc, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                    <div className="flex items-center gap-2 truncate">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <div className="truncate">
                        <span className="font-bold text-slate-800 block truncate">{doc.name}</span>
                        <span className="text-[10px] text-slate-400 capitalize">{doc.type.replace('_', ' ')} • {doc.uploadedAt?.slice(0, 10)}</span>
                      </div>
                    </div>
                    {doc.fileSize && (
                      <span className="text-[10px] text-slate-500 font-mono shrink-0 ml-2">{doc.fileSize}</span>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-500 italic">No digital documents uploaded yet.</p>
            )}
          </div>

          {/* Section 5: Singapore Job Interest & Applications Log */}
          <div className="border border-slate-200 rounded-xl p-4.5 space-y-3">
            <h3 className="text-xs font-black uppercase tracking-wider text-red-900 border-b border-slate-100 pb-2">
              7. Job Applications & Activity Log
            </h3>
            <div className="space-y-2 text-xs">
              {candidate.applications && candidate.applications.length > 0 ? (
                candidate.applications.map((app, i) => (
                  <div key={i} className="flex items-center justify-between p-2 bg-slate-50 rounded-lg border border-slate-200">
                    <div>
                      <span className="font-bold text-slate-900 block">{app.jobTitle || 'General Singapore Application'}</span>
                      <span className="text-[10px] text-slate-500 font-mono">Ref: {app.id} • {app.createdAt}</span>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-slate-200 text-slate-800">
                      {app.status}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-xs text-slate-500 italic">No formal application enquiry logged.</p>
              )}
            </div>
          </div>

          {/* Section 6: Official Admin Remarks & Authorization */}
          <div className="border border-slate-200 rounded-xl p-4.5 space-y-3 bg-red-50/40">
            <h3 className="text-xs font-black uppercase tracking-wider text-red-900 border-b border-red-200/60 pb-2">
              8. Consultant Evaluation & Internal Remarks
            </h3>
            <div className="text-xs text-slate-700 min-h-[40px]">
              {candidate.adminRemarks ? (
                <p className="italic font-medium">“{candidate.adminRemarks}”</p>
              ) : (
                <p className="text-slate-400 italic">Candidate profile verified and queued for employer submission.</p>
              )}
            </div>

            {/* Signatures Row */}
            <div className="pt-8 grid grid-cols-2 gap-8 text-center text-xs text-slate-600 border-t border-red-200/60 mt-4">
              <div>
                <div className="border-b border-slate-400 pb-8 mb-1"></div>
                <span className="font-bold text-slate-900 block">Candidate Signature</span>
                <span className="text-[10px] text-slate-400">Declaration of document veracity</span>
              </div>
              <div>
                <div className="border-b border-slate-400 pb-8 mb-1"></div>
                <span className="font-bold text-slate-900 block">Arudhra Authorized Officer</span>
                <span className="text-[10px] text-slate-400">Recruitment & Visa Desk</span>
              </div>
            </div>
          </div>

          {/* Footer Note */}
          <div className="text-center text-[10px] text-slate-400 pt-2 border-t border-slate-200">
            Confidential Overseas Placement Document • Issued by Arudhra Consultancy • Chennai, India
          </div>
        </div>
      </div>
    </div>
  );
};
