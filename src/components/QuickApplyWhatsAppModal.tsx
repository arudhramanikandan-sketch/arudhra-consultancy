import React, { useState } from 'react';
import { Job } from '../types';
import { useApp } from '../context/AppContext';
import { X, MessageSquare, ArrowRight, User, GraduationCap, Phone, CheckCircle2 } from 'lucide-react';

interface QuickApplyWhatsAppModalProps {
  job: Job | null;
  isOpen: boolean;
  onClose: () => void;
}

export const QuickApplyWhatsAppModal: React.FC<QuickApplyWhatsAppModalProps> = ({
  job,
  isOpen,
  onClose
}) => {
  const { settings, submitEnquiry } = useApp();

  const [candidateName, setCandidateName] = useState('');
  const [education, setEducation] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen || !job) return null;

  const handleClose = () => {
    setCandidateName('');
    setEducation('');
    setMobileNumber('');
    setErrorMsg('');
    setIsSuccess(false);
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedName = candidateName.trim();
    const trimmedEdu = education.trim();
    const trimmedPhone = mobileNumber.trim();

    if (!trimmedName) {
      setErrorMsg('Please enter your candidate name.');
      return;
    }
    if (!trimmedEdu) {
      setErrorMsg('Please enter your education or trade qualification.');
      return;
    }
    if (!trimmedPhone) {
      setErrorMsg('Please enter your mobile phone number.');
      return;
    }

    setErrorMsg('');

    // Pre-record in internal backend lead database
    try {
      await submitEnquiry({
        jobId: job.id,
        customerName: trimmedName,
        mobile: trimmedPhone,
        candidateTrade: trimmedEdu,
        candidateNotes: `Quick WhatsApp application for ${job.title} (${job.location})`
      });
    } catch {
      // Non-blocking: continue opening WhatsApp even if offline/local
    }

    // Clean destination WhatsApp business phone number
    const destinationNumber = settings.whatsappNumber.replace(/\D/g, '') || '917418845083';

    // Construct the requested WhatsApp pre-filled message
    const message = 
`Hello Arudhra Consultancy,

I would like to apply for the Singapore job opening:
📌 Position: ${job.title}
📍 Location: ${job.location}
💰 Salary: ${job.salary}
🆔 Job Ref: ${job.id}

My Application Details:
👤 Candidate Name: ${trimmedName}
🎓 Education / Qualification: ${trimmedEdu}
📱 Mobile Number: ${trimmedPhone}

Please guide me with the Singapore visa process, documents required, and next steps. Thank you!`;

    const whatsappUrl = `https://wa.me/${destinationNumber}?text=${encodeURIComponent(message)}`;

    setIsSuccess(true);

    // Open WhatsApp in a new tab/app
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      id="quick-apply-whatsapp-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-fadeIn"
    >
      <div
        id="quick-apply-whatsapp-modal-card"
        className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-red-950 via-slate-900 to-red-950 text-white p-5 relative">
          <button
            id="close-quick-apply-modal-btn"
            type="button"
            onClick={handleClose}
            className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              🇸🇬 Apply via WhatsApp
            </span>
            <span className="text-[11px] text-slate-400 font-mono">Ref: {job.id}</span>
          </div>

          <h3 className="text-lg font-bold text-white tracking-tight leading-snug">
            {job.title}
          </h3>
          <p className="text-xs text-slate-300 mt-1">
            {job.location} • <strong className="text-emerald-400">{job.salary}</strong>
          </p>
        </div>

        {/* Content */}
        <div className="p-6">
          {isSuccess ? (
            <div className="text-center py-4 space-y-4">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto ring-8 ring-emerald-50">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-slate-900">WhatsApp Chat Launched!</h4>
                <p className="text-xs text-slate-600 mt-1.5 max-w-xs mx-auto">
                  Your application details for <strong>{job.title}</strong> have been pre-filled in WhatsApp. Send the message to chat with our Singapore placement advisor directly.
                </p>
              </div>

              <div className="pt-2 flex flex-col gap-2">
                <button
                  type="button"
                  onClick={handleClose}
                  className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl transition-all cursor-pointer"
                >
                  Close Window
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <p className="text-xs text-slate-600 leading-relaxed">
                Provide your basic candidate information below. Clicking <strong>Apply on WhatsApp</strong> will launch WhatsApp with your pre-filled details ready to send.
              </p>

              {errorMsg && (
                <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">
                  {errorMsg}
                </div>
              )}

              {/* Candidate Name */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Candidate Name <span className="text-red-600">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                  <input
                    id="quick-apply-candidate-name"
                    type="text"
                    required
                    value={candidateName}
                    onChange={e => setCandidateName(e.target.value)}
                    placeholder="e.g. Ramesh Kumar"
                    className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all font-medium"
                  />
                </div>
              </div>

              {/* Education / Qualification */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Education / Qualification <span className="text-red-600">*</span>
                </label>
                <div className="relative">
                  <GraduationCap className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                  <input
                    id="quick-apply-education"
                    type="text"
                    required
                    value={education}
                    onChange={e => setEducation(e.target.value)}
                    placeholder="e.g. ITI Fitter / Diploma Mechanical / 12th Pass"
                    className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all font-medium"
                  />
                </div>
              </div>

              {/* Mobile Number */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Mobile Number <span className="text-red-600">*</span>
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                  <input
                    id="quick-apply-mobile-number"
                    type="tel"
                    required
                    value={mobileNumber}
                    onChange={e => setMobileNumber(e.target.value)}
                    placeholder="e.g. +91 98401 23456"
                    className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all font-medium"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={handleClose}
                  className="flex-1 py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  id="submit-quick-apply-whatsapp-btn"
                  type="submit"
                  className="flex-2 flex items-center justify-center gap-2 py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Apply on WhatsApp</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
