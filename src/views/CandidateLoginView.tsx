import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import {
  User,
  Phone,
  Mail,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  RefreshCw
} from 'lucide-react';
import { SubpageBackButton } from '../components/SubpageBackButton';

export const CandidateLoginView: React.FC = () => {
  const { user, sendEmailOtp, verifyEmailOtp } = useAuth();
  const { setCurrentTab, showToast } = useApp();

  // Input states
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [mobile, setMobile] = useState('');
  const [otpCode, setOtpCode] = useState('');

  // Status & OTP states
  const [step, setStep] = useState<'input' | 'verify'>('input');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [cooldown, setCooldown] = useState(0);

  // If already logged in as candidate, redirect to candidate portal
  if (user && user.role === 'customer') {
    return (
      <div className="py-12 bg-slate-50 min-h-screen">
        <div className="max-w-xl mx-auto px-4 text-center">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">You are Logged In!</h2>
            <p className="text-slate-600 mb-6">
              Welcome, <span className="font-semibold text-slate-900">{user.name || user.email}</span>. Your candidate profile and job applications are ready.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                id="logged-in-view-portal-btn"
                onClick={() => {
                  setCurrentTab('portal');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-6 py-3 bg-red-900 hover:bg-red-800 text-white font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <User className="w-4 h-4" />
                <span>Open Candidate Portal</span>
              </button>
              <button
                id="logged-in-browse-jobs-btn"
                onClick={() => {
                  setCurrentTab('jobs');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold rounded-xl transition-all cursor-pointer"
              >
                <span>Browse Singapore Jobs</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Handle Email OTP Send
  const handleSendEmailOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    const cleanName = fullName.trim();
    if (!cleanName) {
      setErrorMsg('Please enter your full name');
      return;
    }
    const cleanMobile = mobile.trim();
    if (!cleanMobile || cleanMobile.replace(/\D/g, '').length < 8) {
      setErrorMsg('Please enter a valid mobile number with country code (e.g., +91 74188 45083)');
      return;
    }
    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail.includes('@') || !cleanEmail.includes('.')) {
      setErrorMsg('Please enter a valid email address');
      return;
    }

    setLoading(true);
    const res = await sendEmailOtp(cleanEmail, cleanName, cleanMobile);
    setLoading(false);

    if (res.success) {
      setStep('verify');
      setCooldown(res.cooldownSeconds || 60);
      showToast('Verification code sent to your email inbox / spam folder', 'success');
    } else {
      setErrorMsg(res.message || 'Unable to send email verification code.');
    }
  };

  // Handle Email OTP Verify
  const handleVerifyEmailOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    if (!otpCode.trim()) {
      setErrorMsg('Please enter the 6-digit email OTP');
      return;
    }

    setLoading(true);
    const res = await verifyEmailOtp(email.trim(), otpCode.trim(), fullName.trim(), mobile.trim());
    setLoading(false);

    if (res.success) {
      showToast('Email verified successfully! Welcome to Candidate Portal.', 'success');
      setCurrentTab('portal');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setErrorMsg(res.message || 'Invalid email OTP code.');
    }
  };

  return (
    <div className="py-8 md:py-12 bg-slate-50 min-h-screen">
      <div className="max-w-xl mx-auto px-4 sm:px-6">
        <div className="mb-6">
          <SubpageBackButton label="Back to Home" currentPageTitle="Candidate Login" fallbackTab="home" />
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          {/* Header */}
          <div className="bg-slate-900 text-white p-6 sm:p-8">
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-500/20 text-red-300 border border-red-500/30">
                Arudhra Singapore Careers
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight flex items-center gap-2.5 text-white">
              <User className="w-6 h-6 text-red-400" />
              <span>Candidate Portal Login</span>
            </h1>
            <p className="text-sm text-slate-300 mt-2">
              Sign in with your email address to track work permit status, access applied jobs, and manage your Singapore candidate profile.
            </p>
          </div>

          {/* Form Content */}
          <div className="p-6 sm:p-8">
            {errorMsg && (
              <div className="mb-6 p-4 rounded-xl text-xs font-semibold bg-rose-50 border border-rose-200 text-rose-700 flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-500 mt-0.5" />
                <span>{errorMsg}</span>
              </div>
            )}

            {step === 'verify' ? (
              /* OTP Verification Step */
              <form
                id="candidate-otp-verify-form"
                onSubmit={handleVerifyEmailOtp}
                className="space-y-5"
              >
                <div className="text-center pb-2">
                  <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center mx-auto mb-2">
                    <ShieldCheck className="w-6 h-6 text-red-900" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">Enter Verification Code</h3>
                  <p className="text-xs text-slate-500 mt-1">
                    We sent a 6-digit verification code to your email <span className="font-semibold text-slate-800">{email}</span>
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    6-Digit Verification Code
                  </label>
                  <input
                    id="candidate-otp-code-input"
                    type="text"
                    maxLength={6}
                    value={otpCode}
                    onChange={e => setOtpCode(e.target.value.replace(/\D/g, ''))}
                    placeholder="123456"
                    required
                    autoFocus
                    className="w-full text-center tracking-widest text-2xl font-bold font-mono py-3 px-4 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-red-900/20 focus:border-red-900"
                  />
                </div>

                <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
                  <button
                    type="button"
                    onClick={() => {
                      setStep('input');
                      setOtpCode('');
                    }}
                    className="text-slate-600 hover:text-slate-900 font-medium underline cursor-pointer"
                  >
                    Change Email Address
                  </button>

                  <span>{cooldown > 0 ? `Resend in ${cooldown}s` : 'Code received?'}</span>
                </div>

                <button
                  id="candidate-verify-otp-btn"
                  type="submit"
                  disabled={loading || otpCode.length < 4}
                  className="w-full py-3.5 bg-red-900 hover:bg-red-800 text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
                >
                  {loading ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <span>Verify & Enter Candidate Portal</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            ) : (
              /* Email OTP Form */
              <form id="candidate-email-otp-form" onSubmit={handleSendEmailOtp} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Your Full Name <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                    <input
                      id="candidate-email-name-input"
                      type="text"
                      value={fullName}
                      onChange={e => setFullName(e.target.value)}
                      placeholder="e.g. Manikandan Arudhra"
                      required
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 text-sm font-medium focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-red-900/20 focus:border-red-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Candidate Mobile Number <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                    <input
                      id="candidate-mobile-input"
                      type="tel"
                      value={mobile}
                      onChange={e => setMobile(e.target.value)}
                      placeholder="+91 74188 45083"
                      required
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 text-sm font-medium focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-red-900/20 focus:border-red-900"
                    />
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Enter with country code (e.g., +91 for India, +65 for Singapore, +94 for Sri Lanka).
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Email Address <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-red-900" />
                    <input
                      id="candidate-email-input"
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="candidate@example.com"
                      required
                      autoFocus
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 text-sm font-medium focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-red-900/20 focus:border-red-900"
                    />
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">
                    We will send a 6-digit secure login verification code to your email.
                  </p>
                </div>

                <div className="pt-2">
                  <button
                    id="candidate-send-email-otp-btn"
                    type="submit"
                    disabled={loading || !fullName.trim() || mobile.replace(/\D/g, '').length < 8 || !email.includes('@')}
                    className="w-full py-3.5 bg-red-900 hover:bg-red-800 text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {loading ? (
                      <RefreshCw className="w-4 h-4 animate-spin" />
                    ) : (
                      <>
                        <Mail className="w-4 h-4" />
                        <span>Send Email Verification Code</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}

            {/* Candidate Benefits Checklist */}
            <div className="mt-8 pt-6 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Track Application & Work Permit</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Upload Passport & Trade Certificates</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Save Singapore Job Wishlist</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Zero Hidden Fees & Ministry Compliant</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

