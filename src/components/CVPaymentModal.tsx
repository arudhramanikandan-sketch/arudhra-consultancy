import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import { CVOrder } from '../types';
import { cvOrderService } from '../services/cvOrderService';
import {
  X,
  ShieldCheck,
  CheckCircle,
  Copy,
  Check,
  QrCode,
  Smartphone,
  AlertCircle,
  Loader2
} from 'lucide-react';

interface CVPaymentModalProps {
  order: CVOrder;
  isOpen: boolean;
  onClose: () => void;
  onPaymentSuccess: (verifiedOrder: CVOrder) => void;
}

export const CVPaymentModal: React.FC<CVPaymentModalProps> = ({
  order,
  isOpen,
  onClose,
  onPaymentSuccess
}) => {
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [utrNumber, setUtrNumber] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const merchantUpiId = 'arudhramanikandan@okhdfcbank';
  const upiIntentUrl = `upi://pay?pa=${merchantUpiId}&pn=Arudhra+Consultancy&am=${order.amount}&cu=INR&tn=${encodeURIComponent('CV Order ' + order.id)}`;

  useEffect(() => {
    if (isOpen && order) {
      QRCode.toDataURL(upiIntentUrl, {
        width: 260,
        margin: 1.5,
        color: {
          dark: '#1e293b',
          light: '#ffffff'
        }
      })
        .then(url => setQrDataUrl(url))
        .catch(err => console.error('Failed to generate UPI QR code', err));
    }
  }, [isOpen, order, upiIntentUrl]);

  if (!isOpen) return null;

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(merchantUpiId);
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2000);
  };

  const handleVerifyUpiPayment = async () => {
    setIsVerifying(true);
    setErrorMessage(null);

    const ref = utrNumber.trim() || `UPI-${Date.now().toString().slice(-8)}`;
    const result = await cvOrderService.verifyPayment({
      orderId: order.id,
      paymentMethod: 'upi',
      utr: ref
    });

    setIsVerifying(false);
    if (result.success && result.order) {
      onPaymentSuccess(result.order);
    } else {
      setErrorMessage(result.message || 'Payment verification failed. Please try again.');
    }
  };

  return (
    <div
      id="cv-payment-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-xs overflow-y-auto animate-in fade-in"
      onClick={e => {
        if (e.target === e.currentTarget && !isVerifying) onClose();
      }}
    >
      <div
        id="cv-payment-modal-container"
        className="bg-white rounded-2xl shadow-2xl border border-stone-200 w-full max-w-lg overflow-hidden my-auto animate-in zoom-in-95 duration-200"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-stone-900 via-red-950 to-stone-900 text-white p-5 flex items-center justify-between border-b border-red-900/40">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[11px] font-bold uppercase tracking-wider text-red-200">
                Secure Checkout
              </span>
            </div>
            <h3 className="text-lg font-extrabold text-white">
              Complete Payment — ₹{order.amount}
            </h3>
          </div>

          <button
            id="close-cv-payment-modal-btn"
            onClick={onClose}
            disabled={isVerifying}
            className="p-1.5 rounded-lg text-stone-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer disabled:opacity-50"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Order Quick Summary Strip */}
        <div className="bg-stone-50 border-b border-stone-200 px-5 py-3 flex items-center justify-between text-xs text-stone-700">
          <div>
            <span className="text-stone-400 block text-[10px] uppercase font-semibold">Order ID</span>
            <span className="font-mono font-bold text-red-950">{order.id}</span>
          </div>
          <div className="text-right">
            <span className="text-stone-400 block text-[10px] uppercase font-semibold">Package</span>
            <span className="font-bold text-stone-900">{order.cvPackageName}</span>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="p-5 space-y-5">
          <div className="flex items-center justify-center gap-2 rounded-xl bg-emerald-50 border border-emerald-200 py-2.5 px-4 text-xs font-bold text-emerald-900">
            <QrCode className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Direct UPI / QR Code Payment (Google Pay, PhonePe, Paytm, BHIM)</span>
          </div>

          {errorMessage && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl flex items-start gap-2.5 text-xs text-red-800">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* UPI & QR SCAN */}
          <div className="space-y-4">
            <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 text-center space-y-3">
              <span className="text-xs font-bold text-stone-700 block">
                Scan QR with any UPI App to Pay ₹{order.amount}
              </span>

              <div className="flex justify-center">
                <div className="p-3 bg-white rounded-xl shadow-xs border border-stone-200 inline-block">
                  {qrDataUrl ? (
                    <img
                      src={qrDataUrl}
                      alt="UPI Payment QR Code"
                      className="w-44 h-44 object-contain mx-auto"
                    />
                  ) : (
                    <div className="w-44 h-44 flex items-center justify-center text-xs text-stone-400">
                      <Loader2 className="w-6 h-6 animate-spin text-red-900" />
                    </div>
                  )}
                </div>
              </div>

              {/* Mobile Intent Link */}
              <div className="pt-1">
                <a
                  href={upiIntentUrl}
                  className="inline-flex sm:hidden items-center justify-center gap-2 w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-all shadow-xs"
                >
                  <Smartphone className="w-4 h-4" />
                  <span>Pay via Installed UPI App (GPay / PhonePe)</span>
                </a>
              </div>

              {/* UPI ID copy */}
              <div className="flex items-center justify-between bg-white border border-stone-200 rounded-lg px-3 py-2 text-xs">
                <div className="text-left">
                  <span className="text-[10px] text-stone-400 block font-medium uppercase">Official Merchant UPI ID</span>
                  <span className="font-mono font-semibold text-stone-800">{merchantUpiId}</span>
                </div>
                <button
                  type="button"
                  onClick={handleCopyUpi}
                  className="p-1.5 text-stone-500 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 rounded-md transition-colors flex items-center gap-1 text-[11px] font-medium cursor-pointer"
                  title="Copy UPI ID"
                >
                  {copiedUpi ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700 font-bold">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* UTR Reference Input */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-stone-800 block">
                Enter UPI 12-digit UTR / Reference No. (Optional for auto-match):
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={utrNumber}
                  onChange={e => setUtrNumber(e.target.value)}
                  placeholder="e.g. 423891029384"
                  maxLength={16}
                  className="flex-1 px-3 py-2 bg-white border border-stone-300 rounded-xl text-xs text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-red-900"
                />
                <button
                  type="button"
                  onClick={handleVerifyUpiPayment}
                  disabled={isVerifying}
                  className="px-5 py-2.5 bg-red-900 hover:bg-red-800 text-white text-xs font-bold rounded-xl transition-all shadow-xs flex items-center gap-1.5 cursor-pointer disabled:opacity-60"
                >
                  {isVerifying ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Verifying...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span>Confirm Payment</span>
                    </>
                  )}
                </button>
              </div>
              <p className="text-[11px] text-stone-500">
                After sending ₹{order.amount} on UPI, click <strong>Confirm Payment</strong>. The backend verifies the transaction and immediately generates your WhatsApp submission token.
              </p>
            </div>
          </div>

          {/* Trust Footnote */}
          <div className="pt-2 border-t border-stone-100 flex items-center justify-center gap-4 text-[11px] text-stone-500">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>SSL Secured Checkout</span>
            </span>
            <span>·</span>
            <span>Official Arudhra Account</span>
            <span>·</span>
            <span>No Automated AI Bots</span>
          </div>
        </div>
      </div>
    </div>
  );
};
