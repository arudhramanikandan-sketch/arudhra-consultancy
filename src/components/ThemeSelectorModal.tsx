import React from 'react';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import {
  Palette,
  Check,
  Sun,
  Moon,
  Sparkles,
  X,
  RotateCcw,
  Save,
  CheckCircle2
} from 'lucide-react';

interface ThemeSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const THEME_PRESETS = [
  {
    id: 'crimson',
    name: 'Singapore Crimson',
    subtitle: 'Classic Brand Official Theme',
    primaryColor: '#7f1d1d',
    accentColor: '#dc2626',
    previewBg: '#fef2f2',
    flagEmoji: '🇸🇬'
  },
  {
    id: 'navy',
    name: 'Sapphire Navy',
    subtitle: 'Corporate Maritime & Financial',
    primaryColor: '#1e3a8a',
    accentColor: '#2563eb',
    previewBg: '#eff6ff',
    flagEmoji: '🌊'
  },
  {
    id: 'emerald',
    name: 'Prestige Emerald',
    subtitle: 'Work Pass & Career Growth',
    primaryColor: '#064e3b',
    accentColor: '#059669',
    previewBg: '#ecfdf5',
    flagEmoji: '🌿'
  },
  {
    id: 'charcoal',
    name: 'Executive Charcoal',
    subtitle: 'Minimalist Modern Monochrome',
    primaryColor: '#0f172a',
    accentColor: '#475569',
    previewBg: '#f1f5f9',
    flagEmoji: '⚡'
  },
  {
    id: 'amber',
    name: 'Royal Amber & Gold',
    subtitle: 'Executive Warm Luxury',
    primaryColor: '#78350f',
    accentColor: '#d97706',
    previewBg: '#fffbeb',
    flagEmoji: '👑'
  }
] as const;

export const ThemeSelectorModal: React.FC<ThemeSelectorModalProps> = ({ isOpen, onClose }) => {
  const { themeColor, setThemeColor, isDarkMode, setIsDarkMode, toggleDarkMode, updateSettings, showToast } = useApp();
  const { isAdmin } = useAuth();
  const [savingDefault, setSavingDefault] = React.useState(false);

  if (!isOpen) return null;

  const handleSaveAsDefault = async () => {
    setSavingDefault(true);
    const res = await updateSettings({
      themeColor,
      themeMode: isDarkMode ? 'dark' : 'light'
    });
    setSavingDefault(false);
    if (res.success) {
      showToast('Theme saved as official default for all website visitors!', 'success');
    } else {
      showToast('Failed to save default theme', 'error');
    }
  };

  const handleResetToDefault = () => {
    setThemeColor('crimson');
    setIsDarkMode(false);
    showToast('Reset to default brand theme', 'info');
  };

  return (
    <div
      id="theme-selector-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/75 backdrop-blur-xs"
    >
      <div
        id="theme-selector-card"
        className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="bg-slate-900 text-white p-5 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-red-900/80 border border-red-500/30 flex items-center justify-center text-red-300">
              <Palette className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black tracking-tight text-white flex items-center gap-2">
                <span>Personalize Theme</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                  Instant
                </span>
              </h2>
              <p className="text-xs text-slate-400">Choose your preferred brand color and display mode</p>
            </div>
          </div>
          <button
            id="close-theme-modal-btn"
            type="button"
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
            <span className="sr-only">Close</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 space-y-6 overflow-y-auto max-h-[75vh]">
          {/* Light / Dark Mode Toggle */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2.5">
              Display Mode
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                id="theme-mode-light-btn"
                onClick={() => setIsDarkMode(false)}
                className={`p-3.5 rounded-xl border flex items-center gap-3 transition-all cursor-pointer ${
                  !isDarkMode
                    ? 'border-red-900 bg-red-50/60 ring-2 ring-red-900 shadow-xs'
                    : 'border-slate-200 bg-white hover:bg-slate-50'
                }`}
              >
                <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
                  <Sun className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <span className="block text-xs font-bold text-slate-900">Light Mode</span>
                  <span className="block text-[10px] text-slate-500">Clean & high-contrast</span>
                </div>
                {!isDarkMode && <Check className="w-4 h-4 text-red-900 ml-auto" />}
              </button>

              <button
                type="button"
                id="theme-mode-dark-btn"
                onClick={() => setIsDarkMode(true)}
                className={`p-3.5 rounded-xl border flex items-center gap-3 transition-all cursor-pointer ${
                  isDarkMode
                    ? 'border-red-900 bg-slate-900 text-white ring-2 ring-red-900 shadow-xs'
                    : 'border-slate-200 bg-white hover:bg-slate-50'
                }`}
              >
                <div className="w-8 h-8 rounded-lg bg-indigo-900 text-indigo-200 flex items-center justify-center shrink-0">
                  <Moon className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <span className="block text-xs font-bold text-slate-900">Dark Mode</span>
                  <span className="block text-[10px] text-slate-500">Sleek & eye-safe</span>
                </div>
                {isDarkMode && <Check className="w-4 h-4 text-red-400 ml-auto" />}
              </button>
            </div>
          </div>

          {/* Color Palette Choices */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2.5">
              Brand Accent Palette
            </label>
            <div className="space-y-2.5">
              {THEME_PRESETS.map(preset => {
                const isSelected = themeColor === preset.id;
                return (
                  <button
                    key={preset.id}
                    id={`theme-option-${preset.id}`}
                    type="button"
                    onClick={() => setThemeColor(preset.id as any)}
                    className={`w-full p-3.5 rounded-xl border flex items-center justify-between transition-all cursor-pointer ${
                      isSelected
                        ? 'border-red-900 bg-red-50/50 ring-2 ring-red-900 shadow-xs'
                        : 'border-slate-200 bg-white hover:bg-slate-50 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      {/* Swatch */}
                      <div className="flex items-center -space-x-1.5 shrink-0">
                        <span
                          className="w-7 h-7 rounded-full shadow-xs border-2 border-white ring-1 ring-slate-200"
                          style={{ backgroundColor: preset.primaryColor }}
                        />
                        <span
                          className="w-5 h-5 rounded-full shadow-xs border-2 border-white ring-1 ring-slate-200"
                          style={{ backgroundColor: preset.accentColor }}
                        />
                      </div>
                      <div className="text-left">
                        <div className="flex items-center gap-1.5">
                          <span className="text-sm font-bold text-slate-900">{preset.name}</span>
                          <span className="text-xs">{preset.flagEmoji}</span>
                        </div>
                        <span className="text-[11px] text-slate-500 block leading-tight">{preset.subtitle}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {isSelected ? (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-900 text-white flex items-center gap-1">
                          <Check className="w-3 h-3" />
                          <span>Active</span>
                        </span>
                      ) : (
                        <span className="text-[11px] font-semibold text-slate-400">Select</span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Mini Preview Box */}
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Live Preview Card</span>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                Applied Site-Wide
              </span>
            </div>
            <div className="p-3 bg-white rounded-lg border border-slate-200 shadow-2xs flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-lg bg-red-900 text-white font-black text-sm flex items-center justify-center">
                  A
                </span>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Arudhra Consultancy</h4>
                  <p className="text-[10px] text-slate-500">Singapore Overseas Placement</p>
                </div>
              </div>
              <button
                type="button"
                className="px-3 py-1.5 bg-red-900 text-white text-[11px] font-bold rounded-lg shadow-2xs"
              >
                Sample Action
              </button>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            id="reset-theme-btn"
            onClick={handleResetToDefault}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-200/70 rounded-lg transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset to Default</span>
          </button>

          <div className="flex items-center gap-2">
            {isAdmin && (
              <button
                type="button"
                id="save-theme-default-admin-btn"
                disabled={savingDefault}
                onClick={handleSaveAsDefault}
                className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold rounded-xl transition-all cursor-pointer shadow-xs disabled:opacity-50"
                title="Save this theme as official default for all website visitors"
              >
                <Save className="w-3.5 h-3.5 text-amber-400" />
                <span>{savingDefault ? 'Saving...' : 'Set as Site Default'}</span>
              </button>
            )}

            <button
              type="button"
              id="done-theme-btn"
              onClick={onClose}
              className="px-5 py-2 bg-red-900 hover:bg-red-800 text-white text-xs font-bold rounded-xl shadow-xs transition-all cursor-pointer"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
