import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import { Lock, User as UserIcon, X, RefreshCw, KeyRound, ArrowRight } from 'lucide-react';
import { Admin2faQRCode } from './Admin2faQRCode';

export const CustomerAuthModal: React.FC = () => {
  const { isAuthModalOpen, closeAuthModal, adminLogin, verifyAdmin2fa } = useAuth();
  const { showToast } = useApp();

  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: 'error' | 'info'; text: string } | null>(null);

  // Admin state & 2FA
  const [adminUsername, setAdminUsername] = useState('info@arudhraconsultancy.com');
  const [adminPassword, setAdminPassword] = useState('arudhra@2026');
  const [adminRequires2fa, setAdminRequires2fa] = useState(false);
  const [admin2faToken, setAdmin2faToken] = useState('');
  const [admin2faCode, setAdmin2faCode] = useState('');
  const [admin2faPin, setAdmin2faPin] = useState('829104');
  const [adminOtpAuthUri, setAdminOtpAuthUri] = useState('');

  if (!isAuthModalOpen) return null;

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
      if (res.configuredPin || (res as any).dynamicCode) {
        setAdmin2faPin(res.configuredPin || (res as any).dynamicCode || '829104');
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
            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-500/20 text-red-300 border border-red-500/30">
              Arudhra Consultancy Portal
            </span>
          </div>
          <h3 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <Lock className="w-5 h-5 text-amber-400" />
            <span>Admin Portal Login</span>
          </h3>
          <p className="text-sm text-slate-300 mt-1">
            Authorized management access for Singapore recruitment and job postings.
          </p>
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

          {adminRequires2fa ? (
            <form id="admin-2fa-modal-form" onSubmit={handleAdmin2faSubmit} className="space-y-4">
              <Admin2faQRCode
                passcode={admin2faPin}
                username={adminUsername}
                otpAuthUri={adminOtpAuthUri}
                onSelectPasscode={code => {
                  setAdmin2faCode(code);
                }}
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
                    id="admin-modal-2fa-code-input"
                    type="text"
                    maxLength={6}
                    value={admin2faCode}
                    onChange={e => setAdmin2faCode(e.target.value.replace(/\D/g, ''))}
                    placeholder="Enter 6-digit code or PIN"
                    autoFocus
                    required
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-mono text-center tracking-widest text-lg font-bold focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-slate-900/20 focus:border-slate-900 transition-all"
                  />
                </div>
              </div>

              <button
                id="submit-admin-2fa-btn"
                type="submit"
                disabled={loading || admin2faCode.length < 6}
                className="w-full py-3 px-4 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
              >
                {loading ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <span>Verify 2FA & Access Dashboard</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          ) : (
            <form id="admin-modal-login-form" onSubmit={handleAdminSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Admin User ID / Username <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <UserIcon className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                  <input
                    id="admin-modal-username-input"
                    type="text"
                    value={adminUsername}
                    onChange={e => setAdminUsername(e.target.value)}
                    placeholder="info@arudhraconsultancy.com or admin"
                    required
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 text-sm font-medium focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-slate-900/20 focus:border-slate-900 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Admin Password <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                  <input
                    id="admin-modal-password-input"
                    type="password"
                    value={adminPassword}
                    onChange={e => setAdminPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 text-sm font-medium focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-slate-900/20 focus:border-slate-900 transition-all"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  id="submit-admin-login-btn"
                  type="submit"
                  disabled={loading || !adminUsername.trim() || !adminPassword.trim()}
                  className="w-full py-3 px-4 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <span>Continue to 2FA Security</span>
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
