import React from 'react';
import { Job } from '../types';
import { useApp } from '../context/AppContext';
import {
  MapPin,
  Banknote,
  Briefcase,
  GraduationCap,
  Clock,
  Users,
  CheckCircle2,
  FileCheck,
  Phone,
  MessageSquare,
  X,
  Share2,
  Calendar,
  Printer,
  ArrowLeft
} from 'lucide-react';

interface JobDetailsModalProps {
  job: Job | null;
  onClose: () => void;
}

export const JobDetailsModal: React.FC<JobDetailsModalProps> = ({ job, onClose }) => {
  const { setApplyModalJob, settings, showToast } = useApp();

  if (!job) return null;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${job.title} - Singapore Jobs | Arudhra Consultancy`,
        text: `Check out this Singapore job opportunity: ${job.title} (${job.salary})`,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('Job link copied to clipboard!', 'info');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const getWhatsAppUrl = () => {
    const rawNum = settings.whatsappNumber.replace(/\D/g, '') || '919840123456';
    const text = encodeURIComponent(
      `Hello Arudhra Consultancy, I saw the Singapore opening for "${job.title}" (Ref: ${job.id}, Salary: ${job.salary}). Could you please share eligibility and document submission details?`
    );
    return `https://wa.me/${rawNum}?text=${text}`;
  };

  return (
    <div
      id="job-details-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/75 backdrop-blur-xs"
    >
      <div
        id="job-details-card"
        className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden max-h-[92vh] flex flex-col"
      >
        {/* PRINT-ONLY OFFICIAL LETTERHEAD BANNER */}
        <div className="hidden print:block p-6 pb-4 border-b-2 border-slate-900 bg-white">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-8 h-8 rounded-lg bg-red-900 text-white font-black text-base flex items-center justify-center">
                  A
                </span>
                <div>
                  <h1 className="text-lg font-black tracking-tight text-slate-950 uppercase leading-none">
                    {settings.businessName || 'ARUDHRA CONSULTANCY'}
                  </h1>
                  <p className="text-[10px] font-semibold tracking-wider text-red-900 uppercase mt-0.5">
                    {settings.tagline || 'Singapore Overseas Recruitment & Placement Support'}
                  </p>
                </div>
              </div>
              <p className="text-[10px] text-slate-600 mt-1.5 max-w-md leading-tight">
                {settings.officeAddress || '1/149, Ganesh Complex, Avinashi Road, Neelambur, Coimbatore – 641062, India'}
              </p>
            </div>
            <div className="text-right text-[10px] text-slate-700 shrink-0 space-y-0.5">
              <p className="font-mono font-bold text-slate-950 text-xs">Job Ref: {job.id}</p>
              <p>Phone: +91 {settings.phone}</p>
              <p>WhatsApp: +91 {settings.whatsappNumber}</p>
              <p>Email: {settings.email}</p>
              <p className="text-[9px] text-slate-500 pt-0.5">Printed: {new Date().toLocaleDateString('en-GB')}</p>
            </div>
          </div>
        </div>

        {/* Screen Header (Sticky Dark Header) */}
        <div className="bg-slate-900 text-white p-5 relative shrink-0 border-b border-slate-800 print:bg-white print:text-slate-900 print:p-6 print:pb-3 print:border-b print:border-slate-300">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-600 text-white flex items-center gap-1 print:bg-rose-100 print:text-rose-800 print:border print:border-rose-300">
                  <span>🇸🇬 Singapore</span>
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 print:bg-emerald-50 print:text-emerald-800 print:border-emerald-300">
                  {job.jobType}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-800 text-slate-300 border border-slate-700 print:bg-slate-100 print:text-slate-700 print:border-slate-300">
                  {job.category}
                </span>
                {job.featured && (
                  <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30 print:bg-amber-50 print:text-amber-800 print:border-amber-300">
                    ★ Featured
                  </span>
                )}
                {job.latest && (
                  <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-500/30 print:bg-blue-50 print:text-blue-800 print:border-blue-300">
                    Latest Opening
                  </span>
                )}
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white print:text-slate-950 tracking-tight leading-snug">
                {job.title}
              </h2>
              {job.employer && (
                <p className="text-xs text-slate-400 print:text-slate-600 mt-1 font-medium">Employer: {job.employer}</p>
              )}
            </div>

            {/* Header Interactive Tools (Hidden in Print) */}
            <div className="flex items-center gap-1.5 shrink-0 no-print">
              <button
                id="back-to-jobs-btn"
                type="button"
                onClick={onClose}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white rounded-lg text-xs font-bold border border-slate-700 transition-colors cursor-pointer group"
                title="Back to Jobs (Esc)"
              >
                <ArrowLeft className="w-3.5 h-3.5 text-red-400 group-hover:-translate-x-0.5 transition-transform" />
                <span>Back</span>
                <kbd className="hidden sm:inline-block px-1 py-0.2 text-[9px] font-mono bg-slate-900 text-slate-400 rounded border border-slate-700">
                  Esc
                </kbd>
              </button>
              <button
                id="print-job-btn"
                type="button"
                onClick={handlePrint}
                className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
                title="Print Job Posting"
              >
                <Printer className="w-4 h-4" />
                <span className="sr-only">Print Job Posting</span>
              </button>
              <button
                id="share-job-btn"
                type="button"
                onClick={handleShare}
                className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
                title="Share Job"
              >
                <Share2 className="w-4 h-4" />
                <span className="sr-only">Share Job</span>
              </button>
              <button
                id="close-job-modal-btn"
                type="button"
                onClick={onClose}
                className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
                title="Close"
              >
                <X className="w-5 h-5" />
                <span className="sr-only">Close</span>
              </button>
            </div>
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="p-5 sm:p-7 overflow-y-auto space-y-6 text-slate-800 flex-1 print:p-6 print:space-y-4 print:overflow-visible">
          {/* Key Metric Highlights Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs job-print-section print-avoid-break print:p-3">
            <div className="flex items-start gap-2.5">
              <Banknote className="w-5 h-5 text-emerald-600 shrink-0 print:w-4 print:h-4" />
              <div>
                <span className="text-slate-500 font-medium block text-[11px]">Monthly Salary</span>
                <span className="text-slate-900 font-bold text-sm text-emerald-700">{job.salary}</span>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <MapPin className="w-5 h-5 text-rose-600 shrink-0 print:w-4 print:h-4" />
              <div>
                <span className="text-slate-500 font-medium block text-[11px]">Singapore Location</span>
                <span className="text-slate-900 font-bold text-xs">{job.location}</span>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <Clock className="w-5 h-5 text-blue-600 shrink-0 print:w-4 print:h-4" />
              <div>
                <span className="text-slate-500 font-medium block text-[11px]">Experience</span>
                <span className="text-slate-900 font-semibold text-xs">{job.experience}</span>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <GraduationCap className="w-5 h-5 text-amber-600 shrink-0 print:w-4 print:h-4" />
              <div>
                <span className="text-slate-500 font-medium block text-[11px]">Qualification</span>
                <span className="text-slate-900 font-semibold text-xs">{job.qualification}</span>
              </div>
            </div>
          </div>

          {/* Job Poster / Image if available (Screen only, or scaled in print) */}
          {job.image && (
            <div className="rounded-xl overflow-hidden border border-slate-200 bg-slate-100 max-h-72 print:max-h-48 print-avoid-break">
              <img
                src={job.image}
                alt={job.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Job Description */}
          <div className="job-print-section print-avoid-break">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 mb-2 flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-emerald-600 print:hidden" />
              <span>Job Overview</span>
            </h3>
            <p className="text-slate-700 text-sm leading-relaxed whitespace-pre-line bg-slate-50/50 p-4 rounded-xl border border-slate-100 print:bg-white print:p-0 print:border-none">
              {job.description}
            </p>
          </div>

          {/* Responsibilities */}
          {job.responsibilities && job.responsibilities.length > 0 && (
            <div className="job-print-section print-avoid-break">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 mb-2.5">
                Key Responsibilities in Singapore
              </h3>
              <ul className="space-y-2 text-sm text-slate-700 print:space-y-1">
                {job.responsibilities.map((r, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5 print:w-3.5 print:h-3.5" />
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Requirements & Eligibility */}
          {job.requirements && job.requirements.length > 0 && (
            <div className="job-print-section print-avoid-break">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 mb-2.5">
                Eligibility & Candidate Requirements
              </h3>
              <ul className="space-y-2 text-sm text-slate-700 print:space-y-1">
                {job.requirements.map((req, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-800 mt-2 shrink-0" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Benefits & Overtime */}
          {job.benefits && job.benefits.length > 0 && (
            <div className="job-print-section print-avoid-break">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 mb-2.5">
                Singapore Benefits & Overtime Entitlements
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {job.benefits.map((b, i) => (
                  <div
                    key={i}
                    className="p-2.5 bg-emerald-50/80 border border-emerald-200/70 rounded-lg text-emerald-950 flex items-center gap-2 print:border-slate-300 print:bg-slate-50"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 print:w-3.5 print:h-3.5" />
                    <span>{b}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Required Documents for Singapore submission */}
          {job.requiredDocuments && job.requiredDocuments.length > 0 && (
            <div className="job-print-section print-avoid-break">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 mb-2.5 flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-slate-700 print:hidden" />
                <span>Required Documents for Application</span>
              </h3>
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5 text-xs text-slate-700 print:p-3 print:border-slate-300">
                {job.requiredDocuments.map((doc, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                    <span>{doc}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Vacancy count & posted info */}
          <div className="flex flex-wrap items-center justify-between text-xs text-slate-500 pt-3 border-t border-slate-200 job-print-section print-avoid-break">
            <span className="flex items-center gap-1.5">
              <Users className="w-4 h-4 text-slate-400 print:hidden" />
              <span>Vacancies: <strong>{job.vacancyCount || 'Multiple'} Positions</strong></span>
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-slate-400 print:hidden" />
              <span>Posted: {job.postedDate}</span>
            </span>
          </div>

          {/* PRINT-ONLY APPLICATION & VERIFICATION FOOTER */}
          <div className="hidden print:block pt-4 border-t-2 border-slate-900 text-xs text-slate-800 print-avoid-break">
            <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-300 space-y-2">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h4 className="font-bold text-slate-950 uppercase text-xs">How to Apply for this Singapore Opening:</h4>
                  <p className="text-[11px] text-slate-700 mt-0.5 leading-relaxed">
                    Submit your updated resume, educational certificates, and passport copy to Arudhra Consultancy via WhatsApp at <strong>+91 {settings.whatsappNumber}</strong> or email to <strong>{settings.email}</strong> referencing <strong>Job Ref: {job.id}</strong>.
                  </p>
                </div>
                <div className="text-right text-[10px] text-slate-600 shrink-0">
                  <p className="font-bold text-slate-900">Arudhra Placement Desk</p>
                  <p>Mon – Sat, 9:30 AM to 6:30 PM</p>
                </div>
              </div>
              <p className="text-[9.5px] text-slate-500 border-t border-slate-200 pt-1.5 italic">
                Notice: Arudhra Consultancy provides verified overseas placement and documentation guidance for Singapore employment. Verify all work pass requirements directly with authorized personnel.
              </p>
            </div>
          </div>
        </div>

        {/* Sticky Action Footer (Screen only) */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 shrink-0 flex flex-wrap items-center justify-between gap-3 no-print modal-actions-footer">
          <div className="flex items-center gap-2">
            <a
              id="job-detail-whatsapp-btn"
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl transition-all shadow-xs"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp Us</span>
            </a>
            <a
              id="job-detail-call-btn"
              href={`tel:${settings.phone.replace(/\s+/g, '')}`}
              className="inline-flex items-center gap-2 px-3.5 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-semibold rounded-xl transition-all"
            >
              <Phone className="w-4 h-4" />
              <span>Call Us</span>
            </a>
            <button
              id="job-detail-print-action-btn"
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-2.5 bg-white hover:bg-slate-100 text-slate-700 text-xs font-semibold rounded-xl transition-all border border-slate-300 cursor-pointer shadow-2xs"
              title="Print Job Posting"
            >
              <Printer className="w-4 h-4 text-slate-600" />
              <span>Print Job</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              id="job-detail-close-btn"
              type="button"
              onClick={onClose}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold text-slate-700 hover:text-slate-900 rounded-xl hover:bg-slate-200/60 transition-all cursor-pointer group border border-slate-300"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-red-700 group-hover:-translate-x-0.5 transition-transform" />
              <span>Back to Jobs</span>
              <kbd className="hidden sm:inline-block px-1 text-[9px] font-mono bg-slate-100 text-slate-500 rounded border border-slate-200">
                Esc
              </kbd>
            </button>
            <button
              id="job-detail-apply-btn"
              type="button"
              onClick={() => {
                onClose();
                setApplyModalJob(job);
              }}
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer"
            >
              I'm Interested / Apply Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
