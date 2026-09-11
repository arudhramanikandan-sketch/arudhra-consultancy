import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import {
  Shield,
  Lock,
  User as UserIcon,
  ArrowRight,
  AlertTriangle,
  CheckCircle2,
  KeyRound,
  ChevronLeft,
  ShieldCheck,
  Smartphone
} from 'lucide-react';
import { Admin2faQRCode } from '../components/Admin2faQRCode';
import { SubpageBackButton } from '../components/SubpageBackButton';

export const AdminLoginView: React.FC = () => {
  const { user, isAdmin, token, adminLogin, verifyAdmin2fa } = useAuth();
  const { setCurrentTab, showToast } = useApp();

  const [step, setStep] = useState<'credentials' | '2fa'>('credentials');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [temp2faToken, setTemp2faToken] = useState('');
  const [isEnrollment, setIsEnrollment] = useState(false);
  const [otpAuthUri, setOtpAuthUri] = useState('');
  const [secretKey, setSecretKey] = useState('');
  const [twoFactorCode, setTwoFactorCode] = useState('');

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [infoMsg, setInfoMsg] = useState('');

  // If already logged in as Admin with an authenticated token, redirect to Dashboard
  if (user && isAdmin && token) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 bg-slate-50">
        <div className="w-full max-w-md mb-4">
          <SubpageBackButton label="Back to Home" currentPageTitle="Admin Login" fallbackTab="home" />
        </div>
        <div className="bg-white max-w-md w-full p-8 rounded-2xl border border-slate-200 shadow-sm text-center">
          <div className="w-16 h-16 bg-red-50 text-red-900 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Admin Session Active</h2>
          <p className="text-sm text-slate-600 mb-6">
            You are logged in as <span className="font-semibold text-slate-900">{user.name || 'Administrator'}</span>.
          </p>
          <button
            onClick={() => {
              setCurrentTab('admin');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="w-full py-3 bg-red-900 hover:bg-red-800 text-white rounded-xl text-sm font-bold shadow-md transition-all cursor-pointer"
          >
            Access Admin Management Panel
          </button>
        </div>
      </div>
    );
  }

  // Step 1: Submit Primary Admin Credentials
  const handleCredentialsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setInfoMsg('');

    if (!username.trim() || !password.trim()) {
      setErrorMsg('User ID and Password are compulsory for Admin Access.');
      return;
    }

    setLoading(true);
    const res = await adminLogin(username.trim(), password.trim());
    setLoading(false);

    if (res.requires2FA) {
      setTemp2faToken(res.temp2faToken || '');
      setIsEnrollment(Boolean(res.isEnrollment));
      setOtpAuthUri(res.otpAuthUri || '');
      setSecretKey(res.secretKey || '');
      setStep('2fa');
      setTwoFactorCode('');

      if (res.isEnrollment) {
        setInfoMsg('Step 1 verified: Initial 2FA setup required. Scan the QR code or enter manual key in Google Authenticator or Microsoft Authenticator.');
        showToast('Set Up Authenticator App (2FA)', 'info');
      } else {
        setInfoMsg('Step 1 verified: Enter the 6-digit TOTP code from your authenticator app.');
        showToast('Authenticator Code Required', 'info');
      }
    } else if (res.success) {
      showToast('Admin authentication verified successfully.', 'success');
      setCurrentTab('admin');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setErrorMsg(res.message || 'Invalid Admin credentials. Please check User ID and Password.');
    }
  };

  // Step 2: Submit 6-digit Authenticator Code
  const handle2faSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setInfoMsg('');

    const cleanCode = twoFactorCode.trim();
    if (!/^\d{6}$/.test(cleanCode)) {
      setErrorMsg('Please enter a valid 6-digit numeric TOTP code from your authenticator app.');
      return;
    }

    setLoading(true);
    const res = await verifyAdmin2fa(temp2faToken, cleanCode);
    setLoading(false);

    if (res.success) {
      showToast('Two-Factor Authentication verified. Welcome Administrator.', 'success');
      setCurrentTab('admin');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setErrorMsg(res.message || 'Invalid 6-digit authenticator code. Check your app and try again.');
    }
  };

  return (
    <div className="min-h-[85vh] bg-stone-900 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Ambient Accents */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-red-950/50 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-red-950/40 rounded-full blur-3xl pointer-events-none" />

      <div className={`w-full mx-auto relative z-10 transition-all duration-300 ${step === '2fa' && isEnrollment ? 'max-w-xl' : 'max-w-md'} space-y-4`}>
        {/* Subpage Back Key & Navigation */}
        <SubpageBackButton label="Back to Home" currentPageTitle="Admin Login" fallbackTab="home" variant="dark" />

        {/* Header Badge */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-red-950 border border-red-800 text-red-400 shadow-2xl mb-4">
            {step === 'credentials' ? (
              <Shield className="w-8 h-8 text-red-400" />
            ) : (
              <ShieldCheck className="w-8 h-8 text-emerald-400" />
            )}
          </div>
          <span className="inline-block px-3 py-1 bg-red-950/90 text-red-300 border border-red-800 text-[11px] font-bold uppercase tracking-widest rounded-full mb-3">
            {step === 'credentials' ? 'Internal Management' : isEnrollment ? 'Initial 2FA Enrollment' : 'Two-Factor Security Active'}
          </span>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            {step === 'credentials'
              ? 'Admin Portal Login'
              : isEnrollment
                ? 'Set Up Authenticator App'
                : 'Authenticator Verification'}
          </h1>
          <p className="text-sm text-stone-400 mt-2">
            {step === 'credentials'
              ? 'Restricted to authorized Arudhra Consultancy administrators. Registered ID and password required.'
              : isEnrollment
                ? 'Scan this QR code with Google Authenticator, Microsoft Authenticator, or Apple Passwords to enroll.'
                : 'Enter the 6-digit TOTP code generated by your authenticator app.'}
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-stone-950/90 backdrop-blur-xl rounded-2xl border border-stone-800 shadow-2xl p-6 sm:p-8">
          {errorMsg && (
            <div className="mb-6 p-3.5 bg-rose-950/50 border border-rose-800 text-rose-300 text-xs font-medium rounded-xl flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          {infoMsg && (
            <div className="mb-6 p-3.5 bg-emerald-950/50 border border-emerald-800 text-emerald-300 text-xs font-medium rounded-xl flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>{infoMsg}</span>
            </div>
          )}

          {step === 'credentials' ? (
            /* STEP 1: USERNAME & PASSWORD */
            <form onSubmit={handleCredentialsSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-stone-300 uppercase tracking-wider mb-2">
                  Admin User ID / Username <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-500">
                    <UserIcon className="w-4 h-4" />
                  </div>
                  <input
                    id="admin-login-username"
                    type="text"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    placeholder="e.g. info@arudhraconsultancy.com or admin"
                    required
                    autoFocus
                    className="w-full pl-10 pr-4 py-3 bg-stone-900 border border-stone-700 rounded-xl text-white text-sm font-medium focus:outline-hidden focus:ring-2 focus:ring-red-600 focus:border-red-600 transition-all placeholder:text-stone-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-300 uppercase tracking-wider mb-2">
                  Admin Password <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-500">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    id="admin-login-password"
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Enter administrator password"
                    required
                    className="w-full pl-10 pr-4 py-3 bg-stone-900 border border-stone-700 rounded-xl text-white text-sm font-medium focus:outline-hidden focus:ring-2 focus:ring-red-600 focus:border-red-600 transition-all placeholder:text-stone-600"
                  />
                </div>
              </div>

              <button
                id="admin-submit-login-btn"
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-red-800 hover:bg-red-700 disabled:opacity-50 text-white rounded-xl text-sm font-bold shadow-lg shadow-red-950 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {loading ? (
                  <span className="inline-block w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Continue to 2FA Security</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          ) : (
            /* STEP 2: TWO-FACTOR AUTHENTICATION (TOTP) */
            <form onSubmit={handle2faSubmit} className="space-y-5">
              <div className="p-3 bg-stone-900/90 border border-stone-800 rounded-xl flex items-center justify-between text-xs">
                <span className="text-stone-400">Admin Account:</span>
                <span className="font-mono text-stone-200 font-bold">{username}</span>
              </div>

              {/* During initial enrollment: Display QR code & manual setup secret */}
              {isEnrollment ? (
                <Admin2faQRCode
                  username={username}
                  otpAuthUri={otpAuthUri}
                  secretKey={secretKey}
                />
              ) : (
                /* Normal Login: NEVER show QR code or secret */
                <div className="p-4 bg-stone-900/90 border border-stone-800 rounded-xl space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-emerald-950 border border-emerald-800 flex items-center justify-center text-emerald-400 shrink-0">
                      <Smartphone className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">Authenticator App (2FA)</h4>
                      <p className="text-xs text-stone-400">Google Authenticator or Microsoft Authenticator</p>
                    </div>
                  </div>
                  <p className="text-xs text-stone-300 leading-relaxed pt-1">
                    Open your authenticator app on your phone and enter the <span className="text-emerald-400 font-semibold">6-digit time-based code</span> for Arudhra Admin.
                  </p>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-stone-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <KeyRound className="w-3.5 h-3.5 text-emerald-400" />
                  <span>6-Digit Authenticator Code (TOTP)</span>
                  <span className="text-red-400">*</span>
                </label>

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-500">
                    <KeyRound className="w-4 h-4 text-emerald-400" />
                  </div>
                  <input
                    id="admin-2fa-code-input"
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={6}
                    value={twoFactorCode}
                    onChange={e => {
                      const val = e.target.value.replace(/\D/g, '').slice(0, 6);
                      setTwoFactorCode(val);
                    }}
                    placeholder="000 000"
                    required
                    autoFocus
                    className="w-full pl-10 pr-4 py-3.5 bg-stone-900 border border-emerald-900/50 rounded-xl text-white text-2xl tracking-[0.3em] font-mono text-center focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all placeholder:text-stone-700 placeholder:tracking-widest"
                  />
                </div>
                <p className="text-[11px] text-stone-400 mt-2 text-center">
                  {isEnrollment
                    ? 'Scan the QR code above to link your authenticator app, then enter the 6-digit code shown in the app.'
                    : 'Enter the 6-digit code currently visible in your authenticator app. Code changes every 30 seconds.'}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  id="admin-verify-2fa-btn"
                  type="submit"
                  disabled={loading || twoFactorCode.length !== 6}
                  className="w-full py-3.5 bg-emerald-700 hover:bg-emerald-600 disabled:opacity-50 text-white rounded-xl text-sm font-bold shadow-lg shadow-emerald-950 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  {loading ? (
                    <span className="inline-block w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <ShieldCheck className="w-4 h-4" />
                      <span>{isEnrollment ? 'Enroll & Access Dashboard' : 'Verify & Access Dashboard'}</span>
                    </>
                  )}
                </button>

                <div className="flex items-center justify-between pt-1">
                  <button
                    type="button"
                    onClick={() => {
                      setStep('credentials');
                      setErrorMsg('');
                      setInfoMsg('');
                    }}
                    className="flex items-center gap-1 text-xs text-stone-400 hover:text-stone-200 transition-colors cursor-pointer"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                    <span>Back to password</span>
                  </button>

                  <span className="text-[11px] text-emerald-400/80 font-medium">
                    RFC 6238 TOTP Enforced
                  </span>
                </div>
              </div>
            </form>
          )}
        </div>

        {/* Security Disclaimers */}
        <div className="mt-8 text-center text-xs text-stone-500">
          <p>Authenticator-App-Based 2FA (RFC 6238) strictly protects Arudhra Consultancy administrative systems.</p>
          <p className="mt-1">Candidate access is separate and authenticated via WhatsApp OTP on Candidate Portal.</p>
        </div>
      </div>
    </div>
  );
};


