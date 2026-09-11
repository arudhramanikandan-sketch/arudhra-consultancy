import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import { Briefcase, User, Phone, Mail, FileText, CheckCircle2, X, MessageSquare, ArrowRight, ShieldCheck, ArrowLeft } from 'lucide-react';

export const ApplyModal: React.FC = () => {
  const { applyModalJob, setApplyModalJob, submitEnquiry, markJobInterested, settings } = useApp();
  const { user, openAuthModal } = useAuth();

  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [trade, setTrade] = useState('');
  const [experience, setExperience] = useState('');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setMobile(user.mobile || '');
      setEmail(user.email || '');
    }
  }, [user]);

  useEffect(() => {
    if (applyModalJob) {
      setSubmitted(false);
    }
  }, [applyModalJob]);

  if (!applyModalJob) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !mobile) return;

    setSubmitting(true);
    const res = await submitEnquiry({
      jobId: applyModalJob.id,
      customerName: name,
      mobile,
      email,
      candidateTrade: trade || applyModalJob.category,
      candidateExperience: experience,
      candidateNotes: notes
    });

    if (user) {
      try {
        await markJobInterested(applyModalJob.id, applyModalJob.title);
      } catch (err) {
        // silent
      }
    }

    setSubmitting(false);

    if (res.success) {
      setSubmitted(true);
    }
  };

  const getWhatsAppEnquiryUrl = () => {
    const rawNum = settings.whatsappNumber.replace(/\D/g, '') || '919840123456';
    const text = encodeURIComponent(
      `Hello Arudhra Consultancy, I am interested in applying for the Singapore job: "${applyModalJob.title}" (Job Ref: ${applyModalJob.id}). My name is ${name || 'Candidate'} (Ph: ${mobile || ''}). Please guide me on next steps.`
    );
    return `https://wa.me/${rawNum}?text=${text}`;
  };

  return (
    <div id="apply-modal-overlay" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
      <div
        id="apply-modal-card"
        className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden max-h-[90vh] flex flex-col"
      >
        {/* Header */}
        <div className="bg-slate-900 text-white p-5 relative shrink-0">
          <div className="flex items-center justify-between gap-2 mb-2">
            <button
              type="button"
              id="apply-modal-back-btn"
              onClick={() => setApplyModalJob(null)}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-700 transition-colors cursor-pointer group"
              title="Back to Job (Esc)"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-red-400 group-hover:-translate-x-0.5 transition-transform" />
              <span>Back</span>
              <kbd className="hidden sm:inline-block px-1 text-[9px] font-mono bg-slate-950 text-slate-400 rounded border border-slate-700">
                Esc
              </kbd>
            </button>
            <button
              id="close-apply-modal-btn"
              type="button"
              onClick={() => setApplyModalJob(null)}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
              title="Close Modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              🇸🇬 Singapore Overseas Recruitment
            </span>
            <span className="text-xs text-slate-400 font-mono">Ref: {applyModalJob.id}</span>
          </div>
          <h3 className="text-lg font-bold text-white tracking-tight">{applyModalJob.title}</h3>
          <p className="text-xs text-slate-300 mt-0.5">
            {applyModalJob.location} • <strong className="text-emerald-400">{applyModalJob.salary}</strong>
          </p>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1">
          {submitted ? (
            <div id="enquiry-success-view" className="text-center py-6 space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto ring-8 ring-emerald-50">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-slate-900">Enquiry Received!</h4>
                <p className="text-sm text-slate-600 mt-2 max-w-sm mx-auto leading-relaxed">
                  Your enquiry for <strong>{applyModalJob.title}</strong> has been registered with Arudhra Consultancy.
                </p>
                <div className="mt-3 p-3 bg-emerald-50 text-emerald-800 text-xs font-medium rounded-xl border border-emerald-200 inline-block">
                  “Our recruitment team will review your profile and contact you shortly.”
                </div>
              </div>

              {/* Instant WhatsApp action */}
              <div className="pt-4 border-t border-slate-100 space-y-2">
                <p className="text-xs text-slate-500">Want immediate consultation on Singapore processing?</p>
                <a
                  id="whatsapp-direct-chat-btn"
                  href={getWhatsAppEnquiryUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-xl transition-all shadow-xs"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Chat on WhatsApp Directly</span>
                </a>
              </div>

              <div className="pt-2">
                <button
                  id="close-success-btn"
                  type="button"
                  onClick={() => setApplyModalJob(null)}
                  className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-sm transition-all"
                >
                  Done & Close
                </button>
              </div>
            </div>
          ) : (
            <form id="submit-interest-form" onSubmit={handleSubmit} className="space-y-4">
              {!user && (
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-900 flex items-center justify-between">
                  <span>Already registered? Login with OTP for 1-click apply.</span>
                  <button
                    type="button"
                    onClick={() => {
                      setApplyModalJob(null);
                      openAuthModal();
                    }}
                    className="font-bold underline text-amber-950 ml-2"
                  >
                    Candidate Login
                  </button>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Full Name <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                    <input
                      id="enquiry-name-input"
                      type="text"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      placeholder="e.g. Anand Kumar"
                      className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Mobile Number <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                    <input
                      id="enquiry-mobile-input"
                      type="tel"
                      value={mobile}
                      onChange={e => setMobile(e.target.value)}
                      placeholder="+91 98401 23456"
                      className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Email Address <span className="text-slate-400 font-normal">(Optional)</span>
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                    <input
                      id="enquiry-email-input"
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="name@gmail.com"
                      className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Trade / Skill
                  </label>
                  <div className="relative">
                    <Briefcase className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                    <input
                      id="enquiry-trade-input"
                      type="text"
                      value={trade}
                      onChange={e => setTrade(e.target.value)}
                      placeholder={applyModalJob.category}
                      className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Years of Experience & Background
                </label>
                <input
                  id="enquiry-experience-input"
                  type="text"
                  value={experience}
                  onChange={e => setExperience(e.target.value)}
                  placeholder="e.g. 3 years in Chennai + ITI Welder / Valid Passport ready"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Candidate Notes / Questions
                </label>
                <textarea
                  id="enquiry-notes-input"
                  rows={2}
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  placeholder="Any specific questions about salary, shift hours, or passport validity..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500 resize-none"
                />
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-[11px] text-slate-600 flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  By clicking submit, you authorize Arudhra Consultancy to contact you regarding this Singapore vacancy. No automated payments are collected.
                </span>
              </div>

              <div className="pt-2">
                <button
                  id="confirm-submit-interest-btn"
                  type="submit"
                  disabled={submitting}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all disabled:opacity-50"
                >
                  {submitting ? (
                    <span>Submitting Enquiry...</span>
                  ) : (
                    <>
                      <span>Submit Interest for Singapore Job</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
