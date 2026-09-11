import React, { useState, useRef } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  Upload,
  Image as ImageIcon,
  Palette,
  Sparkles,
  Check,
  RotateCcw,
  Eye
} from 'lucide-react';

interface LogoEditModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LogoEditModal: React.FC<LogoEditModalProps> = ({ isOpen, onClose }) => {
  const { settings, updateSettings, showToast } = useApp();

  const [displayMode, setDisplayMode] = useState<'emblem_text' | 'image_only' | 'image_text'>(
    settings.logoDisplayMode || 'image_only'
  );
  const [logoUrl, setLogoUrl] = useState(settings.logoUrl || '/arudhra-logo.png');
  const [emblemText, setEmblemText] = useState(settings.logoEmblemText || 'AC');
  const [logoTitle, setLogoTitle] = useState(settings.logoTitle || settings.businessName || 'ARUDHRA');
  const [logoSubtitle, setLogoSubtitle] = useState(
    settings.logoSubtitle || settings.tagline || 'CONSULTANCY'
  );
  const [emblemBg, setEmblemBg] = useState(settings.logoEmblemBg || '#7f1d1d');
  const [emblemShape, setEmblemShape] = useState<'rounded-xl' | 'rounded-full' | 'rounded-2xl' | 'rounded-lg'>(
    settings.logoEmblemShape || 'rounded-2xl'
  );
  const [saving, setSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setLogoUrl(reader.result as string);
      if (displayMode === 'emblem_text') {
        setDisplayMode('image_text');
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const success = await updateSettings({
      logoDisplayMode: displayMode,
      logoUrl: logoUrl.trim(),
      logoEmblemText: emblemText.trim(),
      logoTitle: logoTitle.trim(),
      logoSubtitle: logoSubtitle.trim(),
      logoEmblemBg: emblemBg,
      logoEmblemShape: emblemShape
    });
    setSaving(false);
    if (success) {
      showToast('Logo and branding updated successfully!', 'success');
      onClose();
    } else {
      showToast('Failed to save branding updates.', 'error');
    }
  };

  const handleResetToDefault = () => {
    setDisplayMode('image_only');
    setLogoUrl('/arudhra-logo.png');
    setEmblemText('AC');
    setLogoTitle('ARUDHRA');
    setLogoSubtitle('CONSULTANCY');
    setEmblemBg('#7f1d1d');
    setEmblemShape('rounded-xl');
  };

  const bgPresetColors = [
    { name: 'Red-900 (Brand)', color: '#7f1d1d' },
    { name: 'Amber-600', color: '#d97706' },
    { name: 'Emerald-800', color: '#065f46' },
    { name: 'Blue-900', color: '#1e3a8a' },
    { name: 'Slate-900', color: '#0f172a' }
  ];

  return (
    <div
      id="logo-edit-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs overflow-y-auto"
    >
      <div
        id="logo-edit-card"
        className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-auto max-h-[92vh] flex flex-col"
      >
        {/* Header */}
        <div className="bg-slate-900 text-white p-4 px-6 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-red-900 flex items-center justify-center text-white">
              <Palette className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Brand Logo & Header Customizer</h3>
              <p className="text-[11px] text-slate-400">Configure logo display mode, icons, and typography</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSave} className="p-6 overflow-y-auto space-y-5 text-xs">
          {/* Live Preview Box */}
          <div className="space-y-1.5">
            <label className="font-bold text-slate-700 flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5 text-red-900" />
              <span>Live Header Logo Preview</span>
            </label>
            <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 flex items-center justify-center">
              <div className="flex items-center gap-2.5 bg-slate-900/90 p-2 rounded-xl">
                {displayMode === 'image_only' && logoUrl ? (
                  <img
                    src={logoUrl}
                    alt="Logo"
                    className="h-10 object-contain max-w-[180px]"
                  />
                ) : displayMode === 'image_text' && logoUrl ? (
                  <>
                    <img
                      src={logoUrl}
                      alt="Logo Emblem"
                      className={`w-10 h-10 object-cover ${emblemShape} border border-white/20`}
                    />
                    <div className="text-left">
                      <div className="text-sm font-black tracking-tight text-white font-mono leading-none">
                        {logoTitle || 'ARUDHRA'}
                      </div>
                      <div className="text-[9px] font-bold tracking-widest text-amber-300 mt-1 uppercase leading-none">
                        {logoSubtitle || 'CONSULTANCY • SINGAPORE'}
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div
                      style={{ backgroundColor: emblemBg }}
                      className={`w-10 h-10 ${emblemShape} flex items-center justify-center font-black text-white text-lg shadow-md border border-white/20 shrink-0`}
                    >
                      {emblemText || 'A'}
                    </div>
                    <div className="text-left">
                      <div className="text-sm font-black tracking-tight text-white font-mono leading-none">
                        {logoTitle || 'ARUDHRA'}
                      </div>
                      <div className="text-[9px] font-bold tracking-widest text-amber-300 mt-1 uppercase leading-none">
                        {logoSubtitle || 'CONSULTANCY • SINGAPORE'}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Display Mode Selection */}
          <div className="space-y-2">
            <label className="font-bold text-slate-700">Display Mode</label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'emblem_text', label: 'Emblem + Text' },
                { id: 'image_text', label: 'Image + Text' },
                { id: 'image_only', label: 'Full Logo Image' }
              ].map(mode => (
                <button
                  key={mode.id}
                  type="button"
                  onClick={() => setDisplayMode(mode.id as any)}
                  className={`p-2.5 rounded-xl border text-center font-semibold transition-all ${
                    displayMode === mode.id
                      ? 'bg-red-900 text-white border-red-900 shadow-xs'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {mode.label}
                </button>
              ))}
            </div>
          </div>

          {/* Image Upload if Image mode is selected */}
          {(displayMode === 'image_only' || displayMode === 'image_text') && (
            <div className="space-y-3 p-4 bg-slate-50 rounded-xl border border-slate-200">
              <label className="font-bold text-slate-800 flex items-center justify-between">
                <span>Upload Custom Logo File</span>
                <span className="text-[10px] text-slate-500 font-normal">PNG, JPG, SVG, WebP supported</span>
              </label>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageSelect}
                className="hidden"
                accept="image/png, image/jpeg, image/svg+xml, image/webp"
              />

              {/* Drag & Drop Upload Zone */}
              <div
                onClick={() => fileInputRef.current?.click()}
                onDragOver={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  const file = e.dataTransfer.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = () => {
                      setLogoUrl(reader.result as string);
                      if (displayMode === 'emblem_text') setDisplayMode('image_text');
                    };
                    reader.readAsDataURL(file);
                  }
                }}
                className="border-2 border-dashed border-slate-300 hover:border-red-800 bg-white hover:bg-red-50/20 p-5 rounded-xl text-center cursor-pointer transition-colors group"
              >
                <div className="w-10 h-10 mx-auto rounded-full bg-red-50 text-red-900 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                  <Upload className="w-5 h-5" />
                </div>
                <div className="font-bold text-slate-800 text-xs">
                  Click to Browse or Drag & Drop Logo Image
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5">Recommended size: 256x256 or 512x512 with transparent background</p>
              </div>

              {logoUrl && (
                <div className="flex items-center justify-between bg-white p-2.5 rounded-lg border border-slate-200">
                  <div className="flex items-center gap-2.5 overflow-hidden">
                    <img src={logoUrl} alt="Preview" className="w-8 h-8 object-contain rounded-md border border-slate-200 p-0.5" />
                    <span className="text-[11px] text-slate-600 truncate font-medium max-w-[200px]">Active Logo Image Loaded</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setLogoUrl('')}
                    className="text-xs text-rose-600 hover:text-rose-700 font-bold px-2 py-1 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              )}

              <div>
                <label className="text-[11px] text-slate-500 font-semibold block mb-1">Or paste public logo URL:</label>
                <input
                  type="text"
                  value={logoUrl}
                  onChange={e => setLogoUrl(e.target.value)}
                  placeholder="https://example.com/logo.png"
                  className="w-full p-2 bg-white border border-slate-200 rounded-lg text-xs"
                />
              </div>
            </div>
          )}

          {/* Emblem Configuration */}
          {displayMode === 'emblem_text' && (
            <div className="space-y-3 p-3.5 bg-slate-50 rounded-xl border border-slate-200">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Emblem Letter / Icon Text</label>
                <input
                  type="text"
                  maxLength={4}
                  value={emblemText}
                  onChange={e => setEmblemText(e.target.value)}
                  className="w-full p-2 bg-white border border-slate-200 rounded-lg text-xs font-bold"
                  placeholder="e.g. A or AC"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Emblem Background Color</label>
                <div className="flex items-center gap-2 flex-wrap mb-2">
                  {bgPresetColors.map(preset => (
                    <button
                      key={preset.color}
                      type="button"
                      onClick={() => setEmblemBg(preset.color)}
                      style={{ backgroundColor: preset.color }}
                      className={`w-7 h-7 rounded-lg border-2 transition-all ${
                        emblemBg === preset.color ? 'border-amber-400 scale-110 shadow-xs' : 'border-transparent'
                      }`}
                      title={preset.name}
                    />
                  ))}
                  <input
                    type="color"
                    value={emblemBg}
                    onChange={e => setEmblemBg(e.target.value)}
                    className="w-7 h-7 p-0 border border-slate-200 rounded-lg cursor-pointer"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Emblem Shape</label>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { id: 'rounded-2xl', label: 'Squircle' },
                    { id: 'rounded-xl', label: 'Rounded' },
                    { id: 'rounded-full', label: 'Circle' },
                    { id: 'rounded-lg', label: 'Square' }
                  ].map(shape => (
                    <button
                      key={shape.id}
                      type="button"
                      onClick={() => setEmblemShape(shape.id as any)}
                      className={`p-1.5 rounded-lg border text-center font-semibold text-[11px] ${
                        emblemShape === shape.id
                          ? 'bg-slate-900 text-white border-slate-900'
                          : 'bg-white text-slate-700 border-slate-200'
                      }`}
                    >
                      {shape.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Typography Settings */}
          {displayMode !== 'image_only' && (
            <div className="space-y-3">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Primary Brand Title</label>
                <input
                  type="text"
                  value={logoTitle}
                  onChange={e => setLogoTitle(e.target.value)}
                  className="w-full p-2 bg-white border border-slate-200 rounded-lg text-xs font-bold"
                  placeholder="e.g. ARUDHRA"
                />
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1">Tagline / Subtitle</label>
                <input
                  type="text"
                  value={logoSubtitle}
                  onChange={e => setLogoSubtitle(e.target.value)}
                  className="w-full p-2 bg-white border border-slate-200 rounded-lg text-xs"
                  placeholder="e.g. CONSULTANCY • SINGAPORE"
                />
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
            <button
              type="button"
              onClick={handleResetToDefault}
              className="inline-flex items-center gap-1 text-slate-500 hover:text-slate-800 text-[11px] font-semibold"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset Defaults</span>
            </button>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="px-4 py-2 bg-red-900 hover:bg-red-800 text-white font-bold rounded-xl shadow-xs disabled:opacity-50"
              >
                {saving ? 'Saving...' : 'Save Branding'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
