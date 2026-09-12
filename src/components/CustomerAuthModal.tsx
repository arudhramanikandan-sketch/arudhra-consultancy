import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import { Phone, ShieldCheck, ArrowRight, Lock, User as UserIcon, X, RefreshCw, Briefcase, Mail, KeyRound, ChevronLeft, QrCode, CheckCircle2, Send, Sparkles } from 'lucide-react';
import { Admin2faQRCode } from './Admin2faQRCode';

export const CustomerAuthModal: React.FC = () => {
  const { isAuthModalOpen, closeAuthModal, sendEmailOtp, verifyEmailOtp, candidateLogin, adminLogin, verifyAdmin2fa } = useAuth();
  const { showToast } = useApp();

  const [mode, setMode] = useState<'customer' | 'admin'>('customer');

  // Customer state
  const [mobile, setMobile] = useState('');
  const [candidateName, setCandidateName] = useState('');
  const [candidateEmail, setCandidateEmail] = useState('');
  const [emailOtpCode, setEmailOtpCode] = useState('');
  const [emailOtpSent, setEmailOtpSent] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const [previewOtp, setPreviewOtp] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: 'error' | 'info'; text: string } | null>(null);

  // Cooldown countdown
  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setInterval(() => {
      setCooldown(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [cooldown]);

  // Admin state & 2FA
  const [adminUsername, setAdminUsername] = useState('info@arudhraconsultancy.com');
  const [adminPassword, setAdminPassword] = useState('arudhra@2026');
  const [adminRequires2fa, setAdminRequires2fa] = useState(false);
  const [admin2faToken, setAdmin2faToken] = useState('');
  const [admin2faCode, setAdmin2faCode] = useState('');
  const [admin2faPin, setAdmin2faPin] = useState('829104');
  const [adminOtpAuthUri, setAdminOtpAuthUri] = useState('');

  if (!isAuthModalOpen) return null;

  const handleSendEmailOtp = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setStatusMsg(null);

    if (!candidateName.trim()) {
      const msg = 'Please enter candidate name';
      setStatusMsg({ type: 'error', text: msg });
      showToast(msg, 'error');
      return;
    }

    const cleanEmail = candidateEmail.trim().toLowerCase();
    if (!cleanEmail || !cleanEmail.includes('@') || !cleanEmail.includes('.')) {
      const msg = 'Please enter a valid email address (e.g. candidate@example.com)';
      setStatusMsg({ type: 'error', text: msg });
      showToast(msg, 'error');
      return;
    }

    const cleanMobile = mobile.trim();
    const digitsOnly = cleanMobile.replace(/\D/g, '');
    if (digitsOnly.length < 8) {
      const msg = 'Please enter a valid WhatsApp mobile number (minimum 8 digits, compulsory)';
      setStatusMsg({ type: 'error', text: msg });
      showToast(msg, 'error');
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
      const note = res.message || 'OTP verification code has been dispatched to your email address.';
      setStatusMsg({ type: 'info', text: note });
      showToast('Verification code dispatched to your email address.', 'info');
    } else {
      setStatusMsg({ type: 'error', text: res.message || 'Failed to dispatch email OTP. Please check your email address and try again.' });
      showToast(res.message || 'Email dispatch issue', 'error');
    }
  };

  const handleVerifyEmailOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMsg(null);

    const cleanCode = emailOtpCode.trim();
    if (!cleanCode || cleanCode.length < 6) {
      const msg = 'Please enter the complete 6-digit OTP code received in your email';
      setStatusMsg({ type: 'error', text: msg });
      showToast(msg, 'error');
      return;
    }

    setLoading(true);
    const res = await verifyEmailOtp(candidateEmail.trim(), cleanCode, candidateName.trim(), mobile.trim());
    setLoading(false);

    if (res.success) {
      showToast('Email verified successfully! Welcome to Candidate Portal.', 'success');
      setStatusMsg(null);
      closeAuthModal();
    } else {
      setStatusMsg({ type: 'error', text: res.message || 'Verification failed. Please check the OTP.' });
      showToast(res.message, 'error');
    }
  };

  const handleAdminSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMsg(null);
    setLoading(true);
    const res = await adminLogin(adminUsername, adminPassword);
    setLoading(false);
    if (res.requires2FA) {
      setAdminRequires2fa(true);
      setAdmin2faToken(res.temp2faToken || '');
      setAdmin2faCode('');
      if (res.configuredPin || res.dynamicCode) {
        setAdmin2faPin(res.configuredPin || res.dynamicCode || '829104');
      }
      if (res.otpAuthUri) {
        setAdminOtpAuthUri(res.otpAuthUri);
      }
      setStatusMsg({ type: 'info', text: 'Step 1 verified: Scan the QR code or enter your 6-digit Admin 2FA PIN.' });
      showToast('2FA Security Check: Scan QR code or enter PIN', 'info');
    } else if (res.success) {
      showToast('Welcome back, Administrator', 'success');
      setStatusMsg(null);
      closeAuthModal();
    } else {
      setStatusMsg({ type: 'error', text: res.message || 'Invalid admin credentials' });
      showToast(res.message, 'error');
    }
  };

  const handleAdmin2faSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMsg(null);
    if (!admin2faCode.trim()) {
      setStatusMsg({ type: 'error', text: 'Please enter your 2FA passcode' });
      return;
    }
    setLoading(true);
    const res = await verifyAdmin2fa(admin2faToken, admin2faCode.trim());
    setLoading(false);
    if (res.success) {
      showToast('Admin 2FA verified successfully', 'success');
      setAdminRequires2fa(false);
      setStatusMsg(null);
      closeAuthModal();
    } else {
      setStatusMsg({ type: 'error', text: res.message || 'Invalid 2FA passcode' });
      showToast(res.message, 'error');
    }
  };

  return (
    <div id="auth-modal-overlay" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
      <div
        id="auth-modal-card"
        className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden"
      >
        {/* Header */}
        <div className="bg-slate-900 text-white p-6 relative">
          <button
            id="close-auth-modal-btn"
            onClick={closeAuthModal}
            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-500/20 text-rose-300 border border-rose-500/30">
              🇸🇬 Singapore Overseas Jobs
            </span>
          </div>
          <h3 className="text-xl font-bold text-white tracking-tight">
            {mode === 'customer' ? 'Candidate Portal Login' : 'Admin Portal Login'}
          </h3>
          <p className="text-sm text-slate-300 mt-1">
            {mode === 'customer'
              ? 'Secure Email OTP login to view openings and track Singapore recruitment applications.'
              : 'Authorized Arudhra Consultancy management access.'}
          </p>

          {/* Mode Switcher Tabs */}
          <div className="flex gap-2 mt-4 p-1 bg-slate-800 rounded-xl">
            <button
              id="switch-customer-mode-btn"
              type="button"
              onClick={() => {
                setMode('customer');
                setStatusMsg(null);
              }}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                mode === 'customer'
                  ? 'bg-red-900 text-white shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Briefcase className="w-3.5 h-3.5" />
              Candidate Portal
            </button>
            <button
              id="switch-admin-mode-btn"
              type="button"
              onClick={() => {
                setMode('admin');
                setStatusMsg(null);
              }}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                mode === 'admin'
                  ? 'bg-slate-700 text-white shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Admin Access
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-6">
          {statusMsg && (
            <div
              className={`mb-4 p-3 rounded-xl text-xs font-medium border flex items-start gap-2 ${
                statusMsg.type === 'error'
                  ? 'bg-rose-50 border-rose-200 text-rose-700'
                  : 'bg-emerald-50 border-emerald-200 text-emerald-800'
              }`}
            >
              <span>{statusMsg.text}</span>
            </div>
          )}

          {mode === 'customer' ? (
            <div className="space-y-4">
              {!emailOtpSent ? (
                /* Step 1: Request Email OTP */
                <form id="customer-email-otp-send-form" onSubmit={handleSendEmailOtp} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Candidate Name <span className="text-red-900">*</span>
                      </label>
                      <div className="relative">
                        <UserIcon className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                        <input
                          id="candidate-otp-name-input"
                          type="text"
                          value={candidateName}
                          onChange={e => setCandidateName(e.target.value)}
                          placeholder="e.g. Manikandan S"
                          required
                          className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 text-sm font-medium focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-red-900/20 focus:border-red-900 transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Candidate Email Address <span className="text-red-900">*</span>
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                        <input
                          id="candidate-email-otp-input"
                          type="email"
                          value={candidateEmail}
                          onChange={e => setCandidateEmail(e.target.value)}
                          placeholder="your.email@example.com"
                          required
                          className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 text-sm font-medium focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-red-900/20 focus:border-red-900 transition-all"
                        />
                      </div>
                      <p className="text-[11px] text-slate-500 mt-1">
                        We will send a confidential 6-digit verification code to this email via Brevo.
                      </p>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        WhatsApp Mobile Number <span className="text-red-900">*</span>
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                        <input
                          id="candidate-otp-mobile-input"
                          type="tel"
                          value={mobile}
                          onChange={e => setMobile(e.target.value)}
                          placeholder="+91 98401 23456"
                          required
                          className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 text-sm font-medium focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-red-900/20 focus:border-red-900 transition-all"
                        />
                      </div>
                    </div>

                    <div className="pt-2 space-y-2">
                      <button
                        id="send-brevo-otp-btn"
                        type="submit"
                        disabled={loading || !candidateName.trim() || !candidateEmail.trim() || !mobile.trim()}
                        className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-red-900 hover:bg-red-800 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all disabled:opacity-50 cursor-pointer"
                      >
                        {loading ? (
                          <RefreshCw className="w-4 h-4 animate-spin" />
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            <span>Send Email OTP via Brevo</span>
                          </>
                        )}
                      </button>
                    </div>

                    <div className="bg-slate-50 rounded-xl p-3 border border-slate-200 text-xs text-slate-600 flex items-start gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>
                        Secure passwordless login powered by Brevo Transactional Email. Code is valid for 5 minutes.
                      </span>
                    </div>
                  </form>
                ) : (
                  /* Step 2: Enter Email OTP */
                  <form id="customer-email-otp-verify-form" onSubmit={handleVerifyEmailOtp} className="space-y-4">
                    <div className="bg-red-50/70 border border-red-200 rounded-xl p-3 text-xs space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-slate-500 font-medium">OTP Code sent to:</div>
                          <div className="font-bold text-slate-900 truncate max-w-[200px]">{candidateEmail}</div>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            setEmailOtpSent(false);
                            setEmailOtpCode('');
                            setStatusMsg(null);
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
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 flex items-center gap-1.5">
                        <KeyRound className="w-3.5 h-3.5 text-red-900" />
                        <span>Enter 6-Digit Email Verification Code</span>
                        <span className="text-red-900">*</span>
                      </label>
                      <input
                        id="email-otp-code-input"
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

                    <div className="pt-2 space-y-2">
                      <button
                        id="verify-brevo-otp-btn"
                        type="submit"
                        disabled={loading || emailOtpCode.length < 6}
                        className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-red-900 hover:bg-red-800 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all disabled:opacity-50 cursor-pointer"
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

                      <div className="flex items-center justify-between text-xs pt-1">
                        <button
                          type="button"
                          disabled={cooldown > 0 || loading}
                          onClick={() => handleSendEmailOtp()}
                          className="text-slate-600 hover:text-red-900 disabled:opacity-50 font-medium cursor-pointer"
                        >
                          {cooldown > 0 ? `Resend OTP in ${cooldown}s` : 'Resend Email OTP'}
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setEmailOtpSent(false);
                            setStatusMsg(null);
                          }}
                          className="text-slate-500 hover:text-slate-800 cursor-pointer"
                        >
                          Back to Details
                        </button>
                      </div>
                    </div>
                  </form>
                )}
            </div>
          ) : adminRequires2fa ? (
            <form id="admin-2fa-modal-form" onSubmit={handleAdmin2faSubmit} className="space-y-4">
              {/* FRONT QR CODE DISPLAY */}
              <Admin2faQRCode
                passcode={admin2faPin}
                username={adminUsername}
                otpAuthUri={adminOtpAuthUri}
                onSelectPasscode={code => {
                  setAdmin2faCode(code);
                  showToast('PIN auto-filled!', 'info');
                }}
                compact={true}
              />

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 flex items-center gap-1">
                  <KeyRound className="w-3.5 h-3.5 text-slate-500" />
                  <span>6-Digit 2FA Security Passcode</span>
                  <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <KeyRound className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                  <input
                    id="admin-modal-2fa-input"
                    type="password"
                    maxLength={12}
                    value={admin2faCode}
                    onChange={e => setAdmin2faCode(e.target.value)}
                    placeholder="••••••"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 text-base font-mono tracking-widest text-center focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all"
                    autoFocus
                    required
                  />
                </div>
              </div>

              <div className="pt-2 space-y-2">
                <button
                  id="submit-admin-2fa-btn"
                  type="submit"
                  disabled={loading || !admin2faCode.trim()}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all disabled:opacity-50 cursor-pointer"
                >
                  {loading ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <ShieldCheck className="w-4 h-4" />
                      <span>Verify 2FA & Access Dashboard</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setAdminRequires2fa(false);
                    setStatusMsg(null);
                  }}
                  className="w-full text-xs text-slate-500 hover:text-slate-800 flex items-center justify-center gap-1 py-1 cursor-pointer"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>Back to Credentials</span>
                </button>
              </div>
            </form>
          ) : (
            <form id="admin-login-form" onSubmit={handleAdminSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Admin Username / Email
                </label>
                <div className="relative">
                  <UserIcon className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                  <input
                    id="admin-username-input"
                    type="text"
                    value={adminUsername}
                    onChange={e => setAdminUsername(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 text-sm font-medium focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Password <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                  <input
                    id="admin-password-input"
                    type="password"
                    value={adminPassword}
                    onChange={e => setAdminPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 text-sm font-medium focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-slate-800 focus:border-transparent transition-all"
                    required
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  id="submit-admin-login-btn"
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-slate-900 hover:bg-black text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all disabled:opacity-50 cursor-pointer"
                >
                  {loading ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <Lock className="w-4 h-4" />
                      <span>Access Admin Dashboard</span>
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
