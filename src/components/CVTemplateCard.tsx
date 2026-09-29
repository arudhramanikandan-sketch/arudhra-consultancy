import React from 'react';
import { CVTemplate } from '../types';
import { Eye, Check, Sparkles, FileText, CheckCircle2, ShieldCheck } from 'lucide-react';

interface CVTemplateCardProps {
  template: CVTemplate;
  isSelected: boolean;
  onSelect: (template: CVTemplate) => void;
  onPreview: (template: CVTemplate) => void;
}

export const CVTemplateCard: React.FC<CVTemplateCardProps> = ({
  template,
  isSelected,
  onSelect,
  onPreview
}) => {
  const { dummyCandidate } = template;

  return (
    <div
      className={`group rounded-2xl border-2 transition-all flex flex-col justify-between overflow-hidden bg-white shadow-xs hover:shadow-md ${
        isSelected
          ? 'border-red-900 ring-2 ring-red-900/30'
          : 'border-stone-200 hover:border-stone-400'
      }`}
    >
      {/* Top Visual Miniature CV Paper Mockup */}
      <div className="relative bg-stone-100 p-4 border-b border-stone-200 flex items-center justify-center overflow-hidden">
        {/* Badge Pill */}
        {template.badge && (
          <div className="absolute top-2.5 right-2.5 z-10">
            <span className="inline-flex items-center gap-1 bg-stone-900 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs">
              <Sparkles className="w-2.5 h-2.5 text-amber-400" />
              {template.badge}
            </span>
          </div>
        )}

        {/* Selected Floating Indicator */}
        {isSelected && (
          <div className="absolute top-2.5 left-2.5 z-10">
            <span className="inline-flex items-center gap-1 bg-red-900 text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-full shadow-xs animate-in fade-in">
              <Check className="w-3 h-3 stroke-[3]" />
              Selected Template
            </span>
          </div>
        )}

        {/* Realistic Mini A4 Paper Canvas */}
        <div
          onClick={() => onPreview(template)}
          className="w-full max-w-[280px] bg-white rounded-lg shadow-sm border border-stone-300 p-3.5 space-y-2 text-left cursor-pointer transform group-hover:scale-[1.02] transition-transform duration-200 relative select-none"
        >
          {/* Header styling according to template style */}
          {template.layoutStyle === 'modern-accent' ? (
            <div className="bg-stone-900 text-white p-2.5 rounded-md space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-[11px] tracking-wide text-white block truncate">
                  {dummyCandidate.name}
                </span>
                <span className="text-[8px] bg-red-800 text-white px-1.5 py-0.2 rounded font-semibold uppercase">
                  Modern
                </span>
              </div>
              <div className="text-[9px] text-red-200 font-medium truncate">
                {dummyCandidate.targetRole}
              </div>
              <div className="text-[7.5px] text-stone-300 truncate">
                {dummyCandidate.location} · {dummyCandidate.contactInfo.split('·')[0]}
              </div>
            </div>
          ) : template.layoutStyle === 'compact-technical' ? (
            <div className="border-b-2 border-stone-800 pb-1.5 space-y-0.5">
              <div className="flex items-baseline justify-between">
                <span className="font-extrabold text-[12px] text-stone-900 uppercase tracking-tight">
                  {dummyCandidate.name}
                </span>
                <span className="text-[8px] font-mono font-bold bg-stone-100 text-stone-800 px-1 border border-stone-300 rounded">
                  CoreTrade / MOM
                </span>
              </div>
              <div className="text-[9px] font-bold text-red-950 truncate">
                {dummyCandidate.targetRole}
              </div>
              <div className="text-[8px] text-stone-600 truncate">
                {dummyCandidate.passportOrPass || dummyCandidate.location}
              </div>
            </div>
          ) : template.layoutStyle === 'executive-split' ? (
            <div className="border-l-4 border-red-900 pl-2 py-0.5 space-y-0.5">
              <span className="font-extrabold text-[12px] text-stone-900 block leading-tight">
                {dummyCandidate.name}
              </span>
              <div className="text-[9px] font-bold text-stone-700 truncate">
                {dummyCandidate.targetRole}
              </div>
              <div className="text-[8px] text-stone-500 truncate">
                {dummyCandidate.location}
              </div>
            </div>
          ) : (
            /* Classic ATS */
            <div className="text-center border-b border-stone-300 pb-1.5 space-y-0.5">
              <span className="font-bold text-[12px] text-stone-900 uppercase tracking-wider block">
                {dummyCandidate.name}
              </span>
              <div className="text-[9px] font-semibold text-stone-700">
                {dummyCandidate.targetRole}
              </div>
              <div className="text-[7.5px] text-stone-500 truncate">
                {dummyCandidate.contactInfo}
              </div>
            </div>
          )}

          {/* Mini Summary Lines */}
          <div className="space-y-0.5 pt-0.5">
            <div className="h-1 bg-stone-300 rounded-full w-full"></div>
            <div className="h-1 bg-stone-200 rounded-full w-5/6"></div>
          </div>

          {/* Mini Skills Chips */}
          <div className="space-y-1 pt-1">
            <span className="text-[8px] font-bold uppercase tracking-wider text-stone-500 block">
              Core Competencies:
            </span>
            <div className="flex flex-wrap gap-1">
              {dummyCandidate.skills.slice(0, 3).map((s, idx) => (
                <span
                  key={idx}
                  className="text-[7.5px] bg-stone-100 text-stone-800 px-1.5 py-0.5 rounded border border-stone-200 truncate max-w-[120px]"
                >
                  {s}
                </span>
              ))}
              {dummyCandidate.skills.length > 3 && (
                <span className="text-[7.5px] text-stone-400 font-bold self-center">
                  +{dummyCandidate.skills.length - 3} more
                </span>
              )}
            </div>
          </div>

          {/* Mini Work Experience Section */}
          <div className="space-y-1 pt-1 border-t border-stone-100">
            <div className="flex items-center justify-between text-[8px] font-bold text-stone-800 uppercase">
              <span>Experience</span>
              <span className="text-[7px] text-stone-400">
                {dummyCandidate.workExperience[0]?.period || '3+ Yrs'}
              </span>
            </div>
            <div className="text-[8px] font-bold text-stone-900 truncate">
              {dummyCandidate.workExperience[0]?.title}
            </div>
            <div className="text-[7.5px] text-stone-500 truncate">
              {dummyCandidate.workExperience[0]?.company}
            </div>
            <div className="space-y-0.5 pl-1.5 border-l border-stone-200">
              <div className="h-1 bg-stone-200 rounded-full w-4/5"></div>
              <div className="h-1 bg-stone-200 rounded-full w-3/4"></div>
            </div>
          </div>

          {/* Hover Preview Overlay */}
          <div className="absolute inset-0 bg-stone-900/60 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-2 text-white">
            <span className="inline-flex items-center gap-1 bg-white text-stone-900 px-3 py-1.5 rounded-lg text-xs font-bold shadow-md">
              <Eye className="w-3.5 h-3.5 text-red-900" />
              Click to Preview Full CV
            </span>
          </div>
        </div>
      </div>

      {/* Card Info & Details */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-extrabold text-base text-stone-900 leading-snug">
              {template.name}
            </h3>
            {template.atsFriendly && (
              <span
                className="shrink-0 text-[10px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full flex items-center gap-1"
                title="Tested and optimized for Applicant Tracking Systems"
              >
                <ShieldCheck className="w-3 h-3 text-emerald-600" />
                ATS
              </span>
            )}
          </div>

          <p className="text-xs text-stone-600 leading-relaxed">
            {template.tagline}
          </p>

          {/* Suitable Categories */}
          <div className="pt-1 space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block">
              Recommended For:
            </span>
            <div className="flex flex-wrap gap-1">
              {template.suitableCategories.slice(0, 3).map((cat, i) => (
                <span
                  key={i}
                  className="text-[10px] bg-stone-100 text-stone-700 font-medium px-2 py-0.5 rounded-md border border-stone-200"
                >
                  {cat}
                </span>
              ))}
              {template.suitableCategories.length > 3 && (
                <span className="text-[10px] text-stone-500 self-center">
                  +{template.suitableCategories.length - 3} more
                </span>
              )}
            </div>
          </div>

          {/* Suitable Experience */}
          <div className="flex items-center gap-1.5 text-[11px] text-stone-500 pt-0.5">
            <span className="font-semibold text-stone-700">Experience:</span>
            <span>{template.suitableExperience.join(' · ')}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-3 border-t border-stone-100 flex items-center gap-2">
          <button
            type="button"
            onClick={() => onPreview(template)}
            className="flex-1 py-2 px-3 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-1.5"
          >
            <Eye className="w-3.5 h-3.5 text-stone-600" />
            <span>Preview</span>
          </button>

          <button
            type="button"
            onClick={() => onSelect(template)}
            className={`flex-1 py-2 px-3 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-xs ${
              isSelected
                ? 'bg-red-900 text-white shadow-red-900/20 ring-2 ring-red-900'
                : 'bg-stone-900 hover:bg-red-950 text-white'
            }`}
          >
            {isSelected ? (
              <>
                <Check className="w-3.5 h-3.5 stroke-[3]" />
                <span>Selected</span>
              </>
            ) : (
              <span>Select Template</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
