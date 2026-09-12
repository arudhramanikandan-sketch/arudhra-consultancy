import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import { ShieldCheck, ArrowRight, CheckCircle2, User, Phone, Mail, RefreshCw, Briefcase, KeyRound, Send, Sparkles } from 'lucide-react';
import { SubpageBackButton } from '../components/SubpageBackButton';

export const CandidateLoginView: React.FC = () => {
  const { user, isCustomer, sendEmailOtp, verifyEmailOtp } = useAuth();
  const { setCurrentTab, showToast } = useApp();

  const [mobile, setMobile] = useState('');
  const [candidateName, setCandidateName] = useState('');
  const [candidateEmail, setCandidateEmail] = useState('');
  const [emailOtpCode, setEmailOtpCode] = useState('');
  const [emailOtpSent, setEmailOtpSent] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const [previewOtp, setPreviewOtp] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [infoMsg, setInfoMsg] = useState('');

  // Resend cooldown timer
  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setInterval(() => {
      setCooldown(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [cooldown]);

  // If candidate is already logged in, redirect to portal
  if (user && isCustomer) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 bg-slate-50">
        <div className="w-full max-w-md mb-4">
          <SubpageBackButton label="Back to Home" currentPageTitle="Candidate Account" fallbackTab="home" />
        </div>
        <div className="bg-white max-w-md w-full p-8 rounded-2xl border border-slate-200 shadow-sm text-center">
          <div className="w-16 h-16 bg-red-50 text-red-900 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Welcome, {user.name}!</h2>
          <p className="text-sm text-slate-600 mb-6">
            You are logged in with <span className="font-semibold text-slate-900">{user.email || user.mobile}</span>.
          </p>
          <div className="space-y-3">
            <button
              onClick={() => {
                setCurrentTab('portal');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-full py-3 bg-red-900 hover:bg-red-800 text-white rounded-xl text-sm font-bold shadow-md transition-all cursor-pointer"
            >
              Go to Candidate Dashboard
            </button>
            <button
              onClick={() => {
                setCurrentTab('jobs');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-sm font-semibold transition-all cursor-pointer"
            >
              Browse Singapore Jobs
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleSendEmailOtp = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setErrorMsg('');
    setInfoMsg('');

    if (!candidateName.trim()) {
      setErrorMsg('Please enter candidate name.');
      return;
    }

    const cleanEmail = candidateEmail.trim().toLowerCase();
    if (!cleanEmail || !cleanEmail.includes('@') || !cleanEmail.includes('.')) {
      setErrorMsg('Please enter a valid candidate email address.');
      return;
    }

    const cleanMobile = mobile.trim();
    const digitsOnly = cleanMobile.replace(/\D/g, '');
    if (digitsOnly.length < 8) {
      setErrorMsg('Please enter a valid WhatsApp mobile number (minimum 8 digits, compulsory).');
      return;
    }

    setLoading(true);
    const res = await sendEmailOtp(cleanEmail, candidateName.trim(), cleanMobile);
    setLoading(false);

    if (res.success) {
      setEmailOtpSent(true);
      setCooldown(res.cooldownSeconds || 60);
      setEmailOtpCode('');
      setPreviewOtp(null);
      setInfoMsg(res.message);
      showToast('Verification code dispatched to your email address.', 'info');
    } else {
      setErrorMsg(res.message || 'Failed to dispatch email OTP. Please check your email address and try again.');
    }
  };

  const handleVerifyEmailOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    const cleanCode = emailOtpCode.trim();
    if (!cleanCode || cleanCode.length < 6) {
      setErrorMsg('Please enter the 6-digit OTP received in your email.');
      return;
    }

    setLoading(true);
    const res = await verifyEmailOtp(candidateEmail.trim(), cleanCode, candidateName.trim(), mobile.trim());
    setLoading(false);

    if (res.success) {
      showToast('Email verified successfully! Welcome to Candidate Portal.', 'success');
      setCurrentTab('portal');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setErrorMsg(res.message || 'Verification failed. Please check the OTP code.');
    }
  };

  return (
    <div className="min-h-[85vh] bg-slate-50 flex flex-col justify-center py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full mx-auto space-y-4">
        {/* Subpage Back Key & Navigation */}
        <SubpageBackButton label="Back to Home" currentPageTitle="Candidate Login" fallbackTab="home" />

        {/* Header Branding */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-red-900 text-white shadow-lg mb-4">
            <span className="font-extrabold text-2xl tracking-wider">A</span>
          </div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-100 text-red-900 text-xs font-bold uppercase tracking-wider rounded-full mb-3 border border-red-200">
            <Mail className="w-3.5 h-3.5 text-red-700" />
            Candidate Portal Login (Email OTP)
          </span>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Candidate Login</h1>
          <p className="text-sm text-slate-600 mt-2">
            Secure login via Brevo Email OTP to track your Singapore overseas job applications, bio-data, and documents.
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xl p-8">
          {errorMsg && (
            <div className="mb-6 p-3.5 bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium rounded-xl flex items-start gap-2">
              <span className="font-bold">Error:</span>
              <span>{errorMsg}</span>
            </div>
          )}

          {infoMsg && (
            <div className="mb-6 p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium rounded-xl flex items-start gap-2">
              <span>{infoMsg}</span>
            </div>
          )}

          {!emailOtpSent ? (
            /* Step 1: Send Email OTP */
            <form onSubmit={handleSendEmailOtp} className="space-y-5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Candidate Name <span className="text-red-900">*</span>
                  </label>
                  <div className="relative">
                    <input
                      id="view-candidate-name-input"
                      type="text"
                      value={candidateName}
                      onChange={e => setCandidateName(e.target.value)}
                      placeholder="e.g. Manikandan S (as in passport)"
                      required
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm font-medium focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-red-900/20 focus:border-red-900 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Candidate Email Address <span className="text-red-900">*</span>
                  </label>
                  <div className="relative">
                    <input
                      id="view-candidate-email-input"
                      type="email"
                      value={candidateEmail}
                      onChange={e => setCandidateEmail(e.target.value)}
                      placeholder="e.g. candidate@gmail.com"
                      required
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm font-medium focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-red-900/20 focus:border-red-900 transition-all"
                    />
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1.5">
                    We will send a confidential 6-digit login verification code to this address via Brevo.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    WhatsApp Mobile Number <span className="text-red-900">*</span>
                  </label>
                  <div className="relative">
                    <input
                      id="view-candidate-mobile-input"
                      type="tel"
                      value={mobile}
                      onChange={e => setMobile(e.target.value)}
                      placeholder="+91 98401 23456"
                      required
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm font-medium focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-red-900/20 focus:border-red-900 transition-all"
                    />
                  </div>
                </div>

                <button
                  id="view-send-brevo-otp-btn"
                  type="submit"
                  disabled={loading || !candidateName.trim() || !candidateEmail.trim() || !mobile.trim()}
                  className="w-full py-3.5 bg-red-900 hover:bg-red-800 disabled:opacity-50 text-white rounded-xl text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  {loading ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send 6-Digit OTP via Brevo</span>
                    </>
                  )}
                </button>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-center gap-2 text-slate-500 text-xs">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Powered by Brevo Transactional Email Service. Valid for 5 minutes.</span>
                </div>
              </form>
            ) : (
              /* Step 2: Verify Brevo OTP */
              <form onSubmit={handleVerifyEmailOtp} className="space-y-5">
                <div className="bg-red-50/70 border border-red-200 rounded-xl p-3 text-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-slate-500 font-medium">OTP dispatched to:</div>
                      <div className="font-bold text-slate-900 truncate max-w-[220px]">{candidateEmail}</div>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setEmailOtpSent(false);
                        setEmailOtpCode('');
                        setErrorMsg('');
                      }}
                      className="text-xs font-semibold text-red-900 hover:underline cursor-pointer"
                    >
                      Change Email
                    </button>
                  </div>
                  <div className="pt-2 border-t border-red-100 flex items-center justify-between text-[11px] text-slate-600">
                    <span className="text-slate-500">Sender Email ID:</span>
                    <span className="font-mono font-bold text-red-900">info@arudhraconsultancy.com</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <KeyRound className="w-4 h-4 text-red-900" />
                    <span>Enter 6-Digit Email Verification Code</span>
                    <span className="text-red-900">*</span>
                  </label>
                  <input
                    id="view-email-otp-input"
                    type="text"
                    maxLength={6}
                    value={emailOtpCode}
                    onChange={e => setEmailOtpCode(e.target.value.replace(/\D/g, ''))}
                    placeholder="123456"
                    autoFocus
                    required
                    className="w-full text-center tracking-[8px] text-2xl font-mono font-extrabold py-3 bg-slate-50 border-2 border-red-900/30 rounded-xl text-slate-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-red-900 focus:border-red-900 transition-all"
                  />
                </div>

                <button
                  id="view-verify-brevo-otp-btn"
                  type="submit"
                  disabled={loading || emailOtpCode.length < 6}
                  className="w-full py-3.5 bg-red-900 hover:bg-red-800 disabled:opacity-50 text-white rounded-xl text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  {loading ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Verify & Enter Candidate Portal</span>
                    </>
                  )}
                </button>

                <div className="flex items-center justify-between text-xs pt-2">
                  <button
                    type="button"
                    disabled={cooldown > 0 || loading}
                    onClick={() => handleSendEmailOtp()}
                    className="text-slate-600 hover:text-red-900 disabled:opacity-50 font-semibold cursor-pointer"
                  >
                    {cooldown > 0 ? `Resend OTP in ${cooldown}s` : 'Resend Email OTP'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setEmailOtpSent(false);
                      setErrorMsg('');
                    }}
                    className="text-slate-500 hover:text-slate-800 cursor-pointer"
                  >
                    Back to Email Entry
                  </button>
                </div>
              </form>
            )}
        </div>

        {/* Informative Security Footer */}
        <div className="mt-8 text-center">
          <p className="text-xs text-slate-500">
            Arudhra Consultancy • Singapore Overseas Recruitment & Placement Support
          </p>
          <div className="mt-3 flex items-center justify-center gap-4 text-xs text-slate-400">
            <span>• 100% Verified Singapore Openings</span>
            <span>• Direct Consultant Follow-up</span>
          </div>
        </div>
      </div>
    </div>
  );
};
