import React, { useState } from 'react';
import { MessageSquare, Sparkles, X, CheckCircle2, AlertCircle, FileText, Loader2, Bot } from 'lucide-react';
import { parseWhatsAppVacancyMessage, WhatsAppVacancyExtractionResult } from '../utils/whatsappJobParser';

interface WhatsAppJobImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onExtract: (result: WhatsAppVacancyExtractionResult) => void;
  adminToken?: string | null;
}

export const WhatsAppJobImportModal: React.FC<WhatsAppJobImportModalProps> = ({
  isOpen,
  onClose,
  onExtract,
  adminToken,
}) => {
  const [whatsappText, setWhatsappText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorNotice, setErrorNotice] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleExtractClick = async () => {
    const trimmed = whatsappText.trim();
    if (!trimmed) {
      setErrorNotice('Please paste the WhatsApp vacancy text before clicking Extract Details.');
      return;
    }

    setIsLoading(true);
    setErrorNotice(null);

    try {
      // 1. First attempt extraction using Gemini API on server
      const token = adminToken || localStorage.getItem('arudhra_admin_token') || '';
      const response = await fetch('/api/jobs/extract-from-whatsapp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ text: trimmed }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success && data.data) {
          const result: WhatsAppVacancyExtractionResult = {
            ...data.data,
            source: data.source === 'gemini' ? 'gemini' : 'local_parser',
          };
          onExtract(result);
          onClose();
          return;
        }
      }

      // If server returned non-ok (e.g. Gemini key not configured or transient error), fallback gracefully to local parser
      console.warn('Gemini API extraction unavailable or returned error, utilizing smart local parser fallback');
      const fallbackResult = parseWhatsAppVacancyMessage(trimmed);
      fallbackResult.source = 'local_parser';

      if (fallbackResult.extractedFields.length === 0) {
        setErrorNotice('Could not identify any vacancy details from the pasted message. Please check the text or enter details manually.');
        return;
      }

      onExtract(fallbackResult);
      onClose();
    } catch (err: any) {
      console.warn('Network issue calling Gemini API extraction, falling back to local parser:', err);
      const fallbackResult = parseWhatsAppVacancyMessage(trimmed);
      fallbackResult.source = 'local_parser';

      if (fallbackResult.extractedFields.length === 0) {
        setErrorNotice('Could not identify any vacancy details from the pasted message. Please check the text or enter details manually.');
        return;
      }

      onExtract(fallbackResult);
      onClose();
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickPasteExample = (exampleNum: number) => {
    if (exampleNum === 1) {
      setWhatsappText(
`CNC Milling Setter / Operator
Salary: SGD 1,800 - 2,500 + OT
Pass: Work Permit
Location: Jurong / Tuas, Singapore
Experience: 1-2 Years
Qualification: ITI / Diploma / High School
Vacancies: 5
Job Description: CNC machine operation, blueprint reading and quality measurement.`
      );
    } else if (exampleNum === 2) {
      setWhatsappText(
`Required: Safety Coordinator
Singapore – Tuas
Salary SGD 2200-2800
WP
Experience 3 years
Qualification Diploma
Openings 2`
      );
    } else {
      setWhatsappText(
`CNC Operator required in Jurong.
Salary 1800 to 2500 SGD + OT.
Work Permit.
5 vacancies.
1-2 years experience.
ITI/Diploma preferred.`
      );
    }
  };

  return (
    <div
      id="whatsapp-import-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-950/70 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={() => {
        if (!isLoading) onClose();
      }}
    >
      <div
        id="whatsapp-import-modal-container"
        className="bg-white rounded-2xl border-2 border-emerald-600/30 shadow-2xl max-w-xl w-full overflow-hidden transition-all animate-in zoom-in-95 duration-150 flex flex-col max-h-[92vh]"
        onClick={e => e.stopPropagation()}
      >
        {/* Header / Title */}
        <div className="bg-gradient-to-r from-emerald-800 to-teal-900 text-white p-4 sm:p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center border border-emerald-400/30 shrink-0 text-emerald-300">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 id="whatsapp-import-modal-title" className="font-bold text-base text-white">
                  Import Vacancy from WhatsApp
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-400/20 text-emerald-200 border border-emerald-300/30 flex items-center gap-1">
                  <Bot className="w-3 h-3" />
                  <span>Gemini AI</span>
                </span>
              </div>
              <p className="text-xs text-emerald-100/90 mt-0.5">
                Paste message below to automatically populate the Singapore vacancy form.
              </p>
            </div>
          </div>
          <button
            type="button"
            id="close-whatsapp-import-modal-btn"
            onClick={onClose}
            disabled={isLoading}
            className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-emerald-100 hover:text-white transition-all cursor-pointer disabled:opacity-50"
            title="Cancel and close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4 text-xs">
          {/* Instruction */}
          <div id="whatsapp-import-instruction-banner" className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-3.5 flex items-start gap-2.5 text-emerald-900">
            <Sparkles className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-bold text-xs text-emerald-950">
                How it works
              </p>
              <p className="text-[11.5px] leading-relaxed text-emerald-800">
                Copy the complete vacancy message from WhatsApp and paste it below. The system will automatically identify and fill the vacancy details into the form for your review using the Gemini API.
              </p>
            </div>
          </div>

          {/* Large Textarea */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label htmlFor="whatsapp-vacancy-message-textarea" className="font-bold text-slate-800 text-xs flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-slate-600" />
                <span>Paste WhatsApp Vacancy Message Here</span>
              </label>
              <div className="flex items-center gap-1 text-[11px] text-slate-500">
                <span>Quick test:</span>
                <button
                  type="button"
                  onClick={() => handleQuickPasteExample(1)}
                  disabled={isLoading}
                  className="text-emerald-700 hover:underline font-semibold cursor-pointer"
                >
                  Ex 1
                </button>
                <span>•</span>
                <button
                  type="button"
                  onClick={() => handleQuickPasteExample(2)}
                  disabled={isLoading}
                  className="text-emerald-700 hover:underline font-semibold cursor-pointer"
                >
                  Ex 2
                </button>
                <span>•</span>
                <button
                  type="button"
                  onClick={() => handleQuickPasteExample(3)}
                  disabled={isLoading}
                  className="text-emerald-700 hover:underline font-semibold cursor-pointer"
                >
                  Ex 3
                </button>
              </div>
            </div>
            <textarea
              id="whatsapp-vacancy-message-textarea"
              rows={8}
              value={whatsappText}
              disabled={isLoading}
              onChange={e => {
                setWhatsappText(e.target.value);
                if (errorNotice) setErrorNotice(null);
              }}
              placeholder="Paste WhatsApp Vacancy Message Here...

Example:
CNC Milling Setter / Operator
Salary: SGD 1,800 - 2,500 + OT
Pass: Work Permit
Location: Jurong / Tuas, Singapore
Experience: 1-2 Years
Qualification: ITI / Diploma / High School
Vacancies: 5
Job Description: CNC machine operation and setup."
              className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-xs font-mono leading-relaxed text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 transition-all placeholder:text-slate-400 disabled:opacity-60"
            />
          </div>

          {errorNotice && (
            <div id="whatsapp-import-error-notice" className="p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-center gap-2 text-amber-800 animate-in fade-in">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
              <span className="text-xs font-medium">{errorNotice}</span>
            </div>
          )}

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-[11px] text-slate-600 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-slate-400 shrink-0" />
            <span>
              <strong>Note:</strong> You will be able to review and manually edit every field in the form before saving. Nothing will be published automatically.
            </span>
          </div>
        </div>

        {/* Modal Footer Buttons */}
        <div className="p-4 sm:p-5 bg-slate-100 border-t border-slate-200 flex items-center justify-end gap-3">
          <button
            type="button"
            id="cancel-whatsapp-import-btn"
            onClick={onClose}
            disabled={isLoading}
            className="px-4 py-2 text-slate-600 hover:bg-slate-200 rounded-xl font-semibold cursor-pointer text-xs transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="button"
            id="extract-whatsapp-details-btn"
            onClick={handleExtractClick}
            disabled={!whatsappText.trim() || isLoading}
            className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-xl shadow-md cursor-pointer text-xs transition-all flex items-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-emerald-200" />
                <span>Extracting with Gemini...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-emerald-200" />
                <span>Extract Details</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
