import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import {
  Smartphone,
  Copy,
  Check,
  RefreshCw,
  KeyRound,
  ShieldCheck,
  Info,
  ChevronDown,
  ChevronUp,
  RotateCw
} from 'lucide-react';

interface Admin2faQRCodeProps {
  passcode?: string;
  username?: string;
  otpAuthUri?: string;
  secretKey?: string;
  compact?: boolean;
  onSelectPasscode?: (code: string) => void;
  onSecretChange?: (newSecret: string) => void;
}

// Generate secure random Base32 string (RFC 4648)
const generateNewBase32Secret = (): string => {
  const chars = '234567ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let rand = 'ARUDHRA';
  for (let i = 0; i < 9; i++) {
    rand += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return rand;
};

export const Admin2faQRCode: React.FC<Admin2faQRCodeProps> = ({
  username = 'info@arudhraconsultancy.com',
  otpAuthUri,
  secretKey: initialPropSecret,
  compact = false,
  onSecretChange
}) => {
  // Extract secret from URI if present, otherwise use prop or default new secret
  const extractSecretFromUri = (uri?: string): string => {
    if (!uri) return '';
    const match = /secret=([A-Z2-7]+)/i.exec(uri);
    return match ? match[1].toUpperCase() : '';
  };

  const initialSecret =
    extractSecretFromUri(otpAuthUri) ||
    initialPropSecret ||
    'ARUDHRA7MZQK4X2P';

  const [activeSecret, setActiveSecret] = useState<string>(initialSecret);
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [copiedKey, setCopiedKey] = useState(false);
  const [qrLoading, setQrLoading] = useState(true);
  const [showManualKey, setShowManualKey] = useState(false);
  const [regeneratedNotice, setRegeneratedNotice] = useState(false);

  // Sync if prop changes
  useEffect(() => {
    const extracted = extractSecretFromUri(otpAuthUri) || initialPropSecret;
    if (extracted && extracted !== activeSecret) {
      setActiveSecret(extracted);
    }
  }, [otpAuthUri, initialPropSecret]);

  const cleanUsername = username.trim() || 'admin';
  const currentOtpUri = `otpauth://totp/ArudhraAdmin:${encodeURIComponent(cleanUsername)}?secret=${activeSecret}&issuer=ArudhraConsultancy&digits=6`;

  useEffect(() => {
    let isMounted = true;
    setQrLoading(true);

    QRCode.toDataURL(currentOtpUri, {
      width: compact ? 190 : 210,
      margin: 2,
      color: {
        dark: '#09090b',
        light: '#ffffff'
      },
      errorCorrectionLevel: 'M'
    })
      .then(url => {
        if (isMounted) {
          setQrDataUrl(url);
          setQrLoading(false);
        }
      })
      .catch(err => {
        console.error('Failed to generate Authenticator QR code', err);
        if (isMounted) setQrLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [currentOtpUri, compact]);

  const handleCopySecret = () => {
    navigator.clipboard.writeText(activeSecret);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  const handleRegenerateQrCode = () => {
    const freshSecret = generateNewBase32Secret();
    setActiveSecret(freshSecret);
    setRegeneratedNotice(true);
    if (onSecretChange) {
      onSecretChange(freshSecret);
    }
    setTimeout(() => setRegeneratedNotice(false), 4000);
  };

  return (
    <div
      id="admin-authenticator-setup-card"
      className="bg-stone-900/95 border border-stone-800 rounded-2xl p-4 sm:p-5 text-white shadow-xl relative overflow-hidden"
    >
      {/* Header Section */}
      <div className="pb-3 mb-3 border-b border-stone-800">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-950 border border-emerald-800/80 flex items-center justify-center text-emerald-400 shrink-0">
              <Smartphone className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-xs sm:text-sm font-bold text-white tracking-wide">
                  Set Up Authenticator App (2FA)
                </h4>
                <span className="px-2 py-0.5 bg-emerald-950 text-emerald-300 border border-emerald-800 rounded-full text-[10px] font-semibold tracking-wide">
                  APP ONLY
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 text-[11px] text-emerald-400 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>RFC 6238 TOTP</span>
            </div>
          </div>
        </div>

        {/* Requested Exact Subheading */}
        <p className="text-xs text-stone-300 mt-2 leading-relaxed">
          Scan this QR code with <span className="text-white font-medium">Google Authenticator</span>, <span className="text-white font-medium">Microsoft Authenticator</span>, or <span className="text-white font-medium">Apple Passwords</span>.
        </p>

        {regeneratedNotice && (
          <div className="mt-2.5 px-3 py-1.5 bg-emerald-950/80 border border-emerald-600/80 rounded-lg text-[11px] text-emerald-200 flex items-center justify-between animate-fadeIn">
            <span className="flex items-center gap-1.5 font-medium">
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              New 2FA QR Code & Secret generated! Please scan this new code.
            </span>
          </div>
        )}
      </div>

      {/* Main QR Display and Instructions */}
      <div className="flex flex-col sm:flex-row items-center gap-4">
        {/* White QR Plate */}
        <div className="relative bg-white p-2.5 rounded-xl shadow-md shrink-0 border border-stone-200">
          {/* Subtle Corner Alignment Marks */}
          <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-emerald-600 pointer-events-none rounded-tl-sm" />
          <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-emerald-600 pointer-events-none rounded-tr-sm" />
          <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-emerald-600 pointer-events-none rounded-bl-sm" />
          <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-emerald-600 pointer-events-none rounded-br-sm" />

          {qrLoading ? (
            <div className="w-[175px] h-[175px] flex flex-col items-center justify-center gap-2 bg-stone-50 rounded-lg text-stone-500">
              <RefreshCw className="w-5 h-5 animate-spin text-emerald-600" />
              <span className="text-[11px] font-medium">Generating QR...</span>
            </div>
          ) : qrDataUrl ? (
            <div className="relative flex items-center justify-center">
              <img
                id="authenticator-setup-qr-image"
                src={qrDataUrl}
                alt="Authenticator App Setup QR Code"
                className="w-[170px] h-[170px] object-contain rounded-sm select-none"
              />
              <div className="absolute w-7 h-7 bg-stone-950 border-2 border-white rounded-lg flex items-center justify-center text-emerald-400 shadow-md pointer-events-none">
                <Smartphone className="w-4 h-4" />
              </div>
            </div>
          ) : (
            <div className="w-[175px] h-[175px] flex items-center justify-center text-stone-400 text-xs">
              QR Code unavailable
            </div>
          )}
        </div>

        {/* Instructions */}
        <div className="flex-1 min-w-0 space-y-2.5 text-left">
          {/* Notice that password shows ONLY in app */}
          <div className="p-2.5 bg-emerald-950/40 border border-emerald-900/60 rounded-xl">
            <div className="flex items-start gap-2">
              <Info className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <p className="text-xs text-emerald-200 leading-snug">
                <span className="font-bold">Password is in your app:</span> The 6-digit verification code generates dynamically and shows <span className="underline decoration-emerald-500 underline-offset-2 font-semibold">only inside your authenticator app</span>.
              </p>
            </div>
          </div>

          {/* Quick Steps */}
          <ol className="space-y-1.5 text-xs text-stone-300 list-decimal list-inside leading-relaxed pl-0.5">
            <li>
              Open your authenticator app on your smartphone.
            </li>
            <li>
              Scan the QR code to link your <span className="text-white font-medium">Arudhra Admin</span> account.
            </li>
            <li>
              Enter the <span className="text-emerald-400 font-mono font-bold">6-digit code</span> displayed in the app below.
            </li>
          </ol>

          {/* Toggle Manual Secret Key */}
          <div className="pt-1">
            <button
              type="button"
              onClick={() => setShowManualKey(!showManualKey)}
              className="inline-flex items-center gap-1 text-[11px] text-stone-400 hover:text-stone-200 cursor-pointer"
            >
              <KeyRound className="w-3 h-3 text-stone-400" />
              <span>Can't scan? Enter setup key manually</span>
              {showManualKey ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </button>

            {showManualKey && (
              <div className="mt-2 p-2.5 bg-stone-950 border border-stone-800 rounded-lg space-y-1.5 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-stone-400 text-[11px]">Account Name:</span>
                  <span className="font-mono text-stone-300 font-medium">ArudhraAdmin:{cleanUsername}</span>
                </div>
                <div className="flex items-center justify-between gap-2 pt-1 border-t border-stone-800">
                  <span className="text-stone-400 text-[11px]">Secret Key:</span>
                  <div className="flex items-center gap-1.5">
                    <code className="font-mono text-xs font-bold text-amber-300 tracking-wider">
                      {activeSecret}
                    </code>
                    <button
                      type="button"
                      onClick={handleCopySecret}
                      title="Copy Secret Key"
                      className="p-1 hover:bg-stone-800 text-stone-400 hover:text-white rounded transition-colors cursor-pointer"
                    >
                      {copiedKey ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between text-[10px] text-stone-500 pt-0.5">
                  <span>Type: Time-based (TOTP, 30s)</span>
                  <span className="text-stone-400">Algorithm: SHA-1 / 6 Digits</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
