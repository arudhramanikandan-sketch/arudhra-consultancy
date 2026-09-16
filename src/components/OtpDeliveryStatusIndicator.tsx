import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useAuth, OtpDeliveryStatusResult } from '../context/AuthContext';
import {
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Clock,
  Mail,
  Send,
  Info,
  KeyRound,
  Check
} from 'lucide-react';

interface OtpDeliveryStatusIndicatorProps {
  email: string;
  messageId?: string;
  onRetry?: () => void;
  canRetry?: boolean;
  cooldown?: number;
  previewOtp?: string;
  onUseCode?: (code: string) => void;
}

export const OtpDeliveryStatusIndicator: React.FC<OtpDeliveryStatusIndicatorProps> = ({
  email,
  messageId,
  onRetry,
  canRetry = false,
  cooldown = 0,
  previewOtp,
  onUseCode
}) => {
  const { checkEmailOtpDeliveryStatus } = useAuth();

  const [statusResult, setStatusResult] = useState<OtpDeliveryStatusResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [lastChecked, setLastChecked] = useState<Date | null>(null);
  const [pollCount, setPollCount] = useState(0);

  const pollTimerRef = useRef<NodeJS.Timeout | null>(null);
  const emailRef = useRef(email);
  const messageIdRef = useRef(messageId);

  emailRef.current = email;
  messageIdRef.current = messageId;

  const fetchStatus = useCallback(async (isAutoPoll = false) => {
    if (!emailRef.current) return;
    if (!isAutoPoll) {
      setLoading(true);
    }
    try {
      const result = await checkEmailOtpDeliveryStatus(emailRef.current, messageIdRef.current);
      setStatusResult(result);
      setLastChecked(new Date());
    } catch (err) {
      console.warn('Failed to query OTP delivery status:', err);
    } finally {
      if (!isAutoPoll) {
        setLoading(false);
      }
    }
  }, [checkEmailOtpDeliveryStatus]);

  // Initial check on mount or when email/messageId changes
  useEffect(() => {
    setPollCount(0);
    fetchStatus(false);
  }, [email, messageId, fetchStatus]);

  // Auto-polling when in_transit or deferred
  useEffect(() => {
    if (pollTimerRef.current) {
      clearInterval(pollTimerRef.current);
      pollTimerRef.current = null;
    }

    const currentStatus = statusResult?.status;
    const shouldPoll = currentStatus === 'in_transit' || currentStatus === 'deferred' || !statusResult;

    if (shouldPoll && pollCount < 7) {
      pollTimerRef.current = setTimeout(() => {
        setPollCount(prev => prev + 1);
        fetchStatus(true);
      }, 5000);
    }

    return () => {
      if (pollTimerRef.current) {
        clearTimeout(pollTimerRef.current);
      }
    };
  }, [statusResult, pollCount, fetchStatus]);

  const status = statusResult?.status || 'in_transit';

  // Format delivery time if available
  const formattedTime = statusResult?.timestamp
    ? new Date(statusResult.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    : lastChecked
    ? lastChecked.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    : null;

  // Determine visual style config based on status
  const getConfig = () => {
    switch (status) {
      case 'delivered':
        return {
          containerClass: 'bg-emerald-50/90 border-emerald-300 text-emerald-950',
          badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-300',
          icon: <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />,
          title: 'Delivered to Recipient Server',
          subtext: statusResult?.statusDescription || 'Your mail provider accepted the OTP message. Check your Inbox or Spam folder.',
          step: 3
        };
      case 'opened':
        return {
          containerClass: 'bg-indigo-50/90 border-indigo-300 text-indigo-950',
          badgeClass: 'bg-indigo-100 text-indigo-800 border-indigo-300',
          icon: <Mail className="w-5 h-5 text-indigo-600 shrink-0" />,
          title: 'Verification Email Opened',
          subtext: statusResult?.statusDescription || 'Your email client opened the message. Enter the 6-digit code below.',
          step: 3
        };
      case 'bounced':
        return {
          containerClass: 'bg-rose-50/90 border-rose-300 text-rose-950',
          badgeClass: 'bg-rose-100 text-rose-800 border-rose-300',
          icon: <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0" />,
          title: 'Delivery Bounced / Mailbox Issue',
          subtext: statusResult?.statusDescription || 'Your email provider could not deliver this message. Please check the address or retry.',
          step: 1
        };
      case 'deferred':
        return {
          containerClass: 'bg-amber-50/90 border-amber-300 text-amber-950',
          badgeClass: 'bg-amber-100 text-amber-800 border-amber-300',
          icon: <Clock className="w-5 h-5 text-amber-600 shrink-0" />,
          title: 'Delivery Deferred by Server',
          subtext: statusResult?.statusDescription || 'Your mail server temporarily delayed delivery (greylisting). In automatic retry queue.',
          step: 2
        };
      case 'direct':
        return {
          containerClass: 'bg-amber-50/90 border-amber-300 text-amber-950',
          badgeClass: 'bg-amber-100 text-amber-800 border-amber-300',
          icon: <KeyRound className="w-5 h-5 text-amber-700 shrink-0" />,
          title: 'Direct Instant Verification',
          subtext: statusResult?.statusDescription || 'Offline relay mode active. Use the instant on-screen code below.',
          step: 3
        };
      case 'in_transit':
      default:
        return {
          containerClass: 'bg-sky-50/90 border-sky-300 text-sky-950',
          badgeClass: 'bg-sky-100 text-sky-800 border-sky-300',
          icon: <Send className="w-5 h-5 text-sky-600 shrink-0" />,
          title: 'Dispatched • In Transit to Mailbox',
          subtext: statusResult?.statusDescription || 'Submitted to Brevo SMTP relay and routing to recipient mailbox. Usually 10–25s.',
          step: 2
        };
    }
  };

  const config = getConfig();

  return (
    <div
      id="otp-delivery-status-indicator"
      className={`rounded-xl border p-4 transition-all space-y-3.5 ${config.containerClass}`}
    >
      {/* Header bar */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          {config.icon}
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-xs sm:text-sm text-slate-900">
                {config.title}
              </span>
              <span
                id="otp-delivery-badge"
                className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border inline-flex items-center gap-1 ${config.badgeClass}`}
              >
                {status === 'in_transit' && (
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-ping inline-block" />
                )}
                {status === 'delivered' && (
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                )}
                {status === 'opened' && (
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 inline-block" />
                )}
                {status === 'bounced' && (
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 inline-block" />
                )}
                <span>{status === 'in_transit' ? 'In Transit' : status}</span>
              </span>
            </div>
            {formattedTime && (
              <p className="text-[10px] text-slate-500 mt-0.5">
                {status === 'delivered' ? 'Confirmed delivered at' : 'Last status check:'} {formattedTime}
              </p>
            )}
          </div>
        </div>

        {/* Refresh / Check Now button */}
        <button
          id="otp-status-refresh-btn"
          type="button"
          onClick={() => fetchStatus(false)}
          disabled={loading}
          title="Query latest delivery status from Brevo relay"
          className="p-1.5 rounded-lg bg-white/80 hover:bg-white text-slate-700 hover:text-slate-900 border border-slate-300 shadow-2xs text-xs font-semibold flex items-center gap-1 cursor-pointer transition-all disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-red-900' : ''}`} />
          <span className="hidden sm:inline text-[11px]">{loading ? 'Checking...' : 'Refresh Status'}</span>
        </button>
      </div>

      {/* 3-Step Visual Delivery Pipeline */}
      <div className="bg-white/90 border border-slate-200 rounded-lg p-2.5 px-3">
        <div className="grid grid-cols-3 gap-2 text-center text-[10px]">
          {/* Step 1: Dispatched */}
          <div className="flex flex-col items-center">
            <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold mb-1 ${
              config.step >= 1 ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-600'
            }`}>
              <Check className="w-3 h-3" />
            </div>
            <span className="font-semibold text-slate-800">1. Dispatched</span>
            <span className="text-[9px] text-slate-500">Brevo Relay</span>
          </div>

          {/* Step 2: Handshake */}
          <div className="flex flex-col items-center">
            <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold mb-1 ${
              config.step >= 2 ? (config.step === 2 && status === 'in_transit' ? 'bg-sky-600 text-white animate-pulse' : 'bg-emerald-600 text-white') : 'bg-slate-200 text-slate-600'
            }`}>
              {config.step > 2 ? <Check className="w-3 h-3" /> : '2'}
            </div>
            <span className="font-semibold text-slate-800">2. Mail Handshake</span>
            <span className="text-[9px] text-slate-500">Routing to MX</span>
          </div>

          {/* Step 3: Delivered */}
          <div className="flex flex-col items-center">
            <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold mb-1 ${
              config.step >= 3 ? 'bg-emerald-600 text-white' : (status === 'bounced' ? 'bg-rose-600 text-white' : 'bg-slate-200 text-slate-600')
            }`}>
              {config.step >= 3 ? <Check className="w-3 h-3" /> : (status === 'bounced' ? '✕' : '3')}
            </div>
            <span className="font-semibold text-slate-800">3. Delivered</span>
            <span className="text-[9px] text-slate-500">Mailbox Ready</span>
          </div>
        </div>
      </div>

      {/* Description & Action Advice */}
      <div className="text-xs space-y-1.5">
        <p className="text-slate-700 leading-relaxed">
          {config.subtext}
        </p>

        {/* Deliverability Guidance */}
        {status === 'delivered' && (
          <div className="p-2.5 bg-emerald-100/60 border border-emerald-200 rounded-lg text-emerald-950 text-[11px] flex items-start gap-2">
            <Info className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Next Step:</span> Check your <strong>Inbox</strong>. If not visible right away, please look in your <strong>Spam / Junk</strong> folder or search for <code>info@arudhraconsultancy.com</code>.
            </div>
          </div>
        )}

        {status === 'bounced' && (
          <div className="p-2.5 bg-rose-100/70 border border-rose-200 rounded-lg text-rose-950 text-[11px] space-y-2">
            <div className="flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-700 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">Delivery Alert:</span> {statusResult?.reason || 'The mail server rejected the message.'}
              </div>
            </div>
            {onRetry && (
              <button
                type="button"
                onClick={onRetry}
                className="w-full py-2 bg-rose-700 hover:bg-rose-800 text-white font-bold rounded-lg transition-all cursor-pointer text-xs"
              >
                Change Email / Try Again
              </button>
            )}
          </div>
        )}

        {status === 'in_transit' && (
          <div className="flex items-center justify-between text-[11px] text-slate-600 pt-1">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-sky-500 animate-ping" />
              <span>Checking delivery status every 5 seconds...</span>
            </span>
            {cooldown > 0 && (
              <span className="font-semibold text-slate-700">Resend in {cooldown}s</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
