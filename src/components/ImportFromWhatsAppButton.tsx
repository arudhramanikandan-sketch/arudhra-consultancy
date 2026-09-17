import React from 'react';
import { MessageSquare, Sparkles, Bot } from 'lucide-react';

interface ImportFromWhatsAppButtonProps {
  onClick: () => void;
  className?: string;
  variant?: 'banner' | 'compact' | 'header';
}

/**
 * 'Import from WhatsApp' Button Component for the Singapore Vacancy Admin Form.
 * Allows administrators to trigger AI-powered vacancy parsing from raw WhatsApp messages.
 */
export const ImportFromWhatsAppButton: React.FC<ImportFromWhatsAppButtonProps> = ({
  onClick,
  className = '',
  variant = 'banner',
}) => {
  if (variant === 'compact') {
    return (
      <button
        type="button"
        id="import-from-whatsapp-compact-btn"
        onClick={onClick}
        className={`px-3.5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl shadow-xs cursor-pointer text-xs transition-all flex items-center gap-2 hover:shadow-md ${className}`}
        title="Import vacancy from WhatsApp text"
      >
        <MessageSquare className="w-4 h-4 text-emerald-200 shrink-0" />
        <span className="whitespace-nowrap">Import from WhatsApp</span>
        <span className="px-1.5 py-0.2 rounded bg-emerald-900/60 text-[10px] text-emerald-200 font-semibold border border-emerald-500/30">
          AI
        </span>
      </button>
    );
  }

  if (variant === 'header') {
    return (
      <button
        type="button"
        id="import-from-whatsapp-header-btn"
        onClick={onClick}
        className={`px-3 py-1.5 rounded-xl bg-emerald-800/90 hover:bg-emerald-700 text-emerald-100 hover:text-white text-xs font-bold transition-all border border-emerald-600/50 flex items-center gap-1.5 cursor-pointer shadow-xs ${className}`}
        title="Quick import vacancy details from WhatsApp message"
      >
        <MessageSquare className="w-3.5 h-3.5 text-emerald-300 shrink-0" />
        <span className="hidden sm:inline">Import from WhatsApp</span>
        <span className="sm:hidden">WhatsApp Import</span>
        <Sparkles className="w-3 h-3 text-amber-300" />
      </button>
    );
  }

  // Default 'banner' layout for the form top
  return (
    <div
      id="import-from-whatsapp-banner-container"
      className={`flex flex-wrap items-center justify-between gap-3 p-3.5 bg-gradient-to-r from-emerald-50 via-teal-50/60 to-slate-50 border border-emerald-200/90 rounded-xl shadow-xs ${className}`}
    >
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-lg bg-emerald-700 text-white flex items-center justify-center shrink-0 shadow-xs">
          <MessageSquare className="w-4 h-4" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-800 block text-xs">
              Have a vacancy message from WhatsApp?
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300">
              <Bot className="w-2.5 h-2.5" />
              <span>Gemini AI</span>
            </span>
          </div>
          <span className="text-[11px] text-slate-500 block mt-0.5">
            Paste WhatsApp text to instantly extract and auto-fill role, salary, pass type, and requirements.
          </span>
        </div>
      </div>
      <button
        type="button"
        id="import-from-whatsapp-btn"
        onClick={onClick}
        className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 active:scale-98 text-white font-bold rounded-xl shadow-xs cursor-pointer text-xs transition-all flex items-center gap-2 shrink-0 hover:shadow-md"
      >
        <MessageSquare className="w-4 h-4 text-emerald-200" />
        <span>Import from WhatsApp</span>
        <Sparkles className="w-3.5 h-3.5 text-amber-300" />
      </button>
    </div>
  );
};
