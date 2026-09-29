import React from 'react';
import { CVTemplate } from '../types';
import {
  X,
  Check,
  Sparkles,
  ShieldCheck,
  Briefcase,
  GraduationCap,
  Award,
  Globe,
  Phone,
  Mail,
  MapPin,
  FileText,
  AlertCircle
} from 'lucide-react';

interface CVTemplatePreviewModalProps {
  template: CVTemplate | null;
  isOpen: boolean;
  isSelected: boolean;
  onClose: () => void;
  onSelect: (template: CVTemplate) => void;
}

export const CVTemplatePreviewModal: React.FC<CVTemplatePreviewModalProps> = ({
  template,
  isOpen,
  isSelected,
  onClose,
  onSelect
}) => {
  if (!isOpen || !template) return null;

  const { dummyCandidate } = template;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-stone-50 rounded-2xl shadow-2xl border border-stone-200 w-full max-w-4xl max-h-[92vh] flex flex-col overflow-hidden">
        {/* Modal Top Header Bar */}
        <div className="bg-stone-900 text-white px-5 py-4 flex items-center justify-between border-b border-stone-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-red-900 text-white flex items-center justify-center font-extrabold text-sm shrink-0">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-base sm:text-lg text-white">
                  {template.name}
                </h3>
                {template.badge && (
                  <span className="bg-red-800 text-white text-[10px] font-bold uppercase px-2 py-0.5 rounded-full">
                    {template.badge}
                  </span>
                )}
              </div>
              <p className="text-xs text-stone-300">
                Visual template mockup with sample dummy candidate data
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                onSelect(template);
                onClose();
              }}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center gap-1.5 shadow-xs ${
                isSelected
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                  : 'bg-red-900 hover:bg-red-800 text-white'
              }`}
            >
              <Check className="w-4 h-4 stroke-[3]" />
              <span>{isSelected ? 'Currently Selected' : 'Select This Template'}</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-2 text-stone-400 hover:text-white hover:bg-stone-800 rounded-lg transition-colors cursor-pointer"
              title="Close Preview"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Informational Notice Banner */}
        <div className="bg-amber-50 border-b border-amber-200 px-5 py-2.5 flex items-center justify-between text-xs text-amber-900">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-amber-700 shrink-0" />
            <span>
              <strong>Note:</strong> This is a CV design template. After payment & WhatsApp submission, the <strong>Arudhra Consultancy team</strong> manually writes and formats your actual CV using this layout.
            </span>
          </div>
          <span className="hidden sm:inline-block font-mono text-[11px] text-amber-800 font-bold">
            Format: Word (.docx) & High-Res PDF
          </span>
        </div>

        {/* Modal Scrollable Body: A4 Paper Preview */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 bg-stone-200/60">
          <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-xl border border-stone-300 p-6 sm:p-10 space-y-6 text-stone-800 font-sans">
            {/* Template-Specific Header Layout */}
            {template.layoutStyle === 'modern-accent' ? (
              <div className="bg-stone-900 text-white p-6 rounded-xl space-y-3">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white uppercase">
                      {dummyCandidate.name}
                    </h1>
                    <div className="text-red-300 font-bold text-sm sm:text-base mt-0.5">
                      {dummyCandidate.targetRole}
                    </div>
                  </div>
                  <div className="text-right text-xs text-stone-300 space-y-0.5 font-medium">
                    <div>{dummyCandidate.location}</div>
                    <div>{dummyCandidate.contactInfo}</div>
                    {dummyCandidate.passportOrPass && (
                      <div className="text-amber-300 font-semibold">{dummyCandidate.passportOrPass}</div>
                    )}
                  </div>
                </div>
              </div>
            ) : template.layoutStyle === 'compact-technical' ? (
              <div className="border-b-2 border-stone-900 pb-4 space-y-2">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-stone-900 uppercase">
                    {dummyCandidate.name}
                  </h1>
                  <span className="font-mono text-xs font-bold bg-stone-100 text-stone-900 px-2.5 py-1 border border-stone-400 rounded-md">
                    OVERSEAS & SKILLED TRADESMAN
                  </span>
                </div>
                <div className="text-base font-bold text-red-950">
                  {dummyCandidate.targetRole}
                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-stone-600">
                  <span>📍 {dummyCandidate.location}</span>
                  <span>📞 {dummyCandidate.contactInfo}</span>
                  {dummyCandidate.passportOrPass && (
                    <span className="font-semibold text-stone-900">🛂 {dummyCandidate.passportOrPass}</span>
                  )}
                </div>
              </div>
            ) : template.layoutStyle === 'executive-split' ? (
              <div className="border-l-4 border-red-900 pl-4 py-2 space-y-2">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900">
                  {dummyCandidate.name}
                </h1>
                <div className="text-sm font-bold text-red-900 uppercase tracking-wide">
                  {dummyCandidate.targetRole}
                </div>
                <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-stone-600">
                  <span>{dummyCandidate.location}</span>
                  <span>·</span>
                  <span>{dummyCandidate.contactInfo}</span>
                </div>
                {dummyCandidate.passportOrPass && (
                  <div className="text-xs font-semibold text-stone-800">
                    {dummyCandidate.passportOrPass}
                  </div>
                )}
              </div>
            ) : (
              /* Classic ATS Single Column */
              <div className="text-center border-b border-stone-300 pb-5 space-y-2">
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-wider text-stone-900 uppercase">
                  {dummyCandidate.name}
                </h1>
                <div className="text-sm font-bold text-stone-700 tracking-wide">
                  {dummyCandidate.targetRole}
                </div>
                <div className="text-xs text-stone-600 flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
                  <span>{dummyCandidate.location}</span>
                  <span>|</span>
                  <span>{dummyCandidate.contactInfo}</span>
                </div>
                {dummyCandidate.passportOrPass && (
                  <div className="text-xs font-medium text-stone-700 italic">
                    {dummyCandidate.passportOrPass}
                  </div>
                )}
              </div>
            )}

            {/* Profile Summary */}
            <div className="space-y-2">
              <h2 className="text-xs font-extrabold uppercase tracking-wider text-stone-900 border-b border-stone-200 pb-1 flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5 text-red-900" />
                <span>Professional Profile Summary</span>
              </h2>
              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed text-justify">
                {dummyCandidate.summary}
              </p>
            </div>

            {/* Core Competencies & Skills */}
            <div className="space-y-2">
              <h2 className="text-xs font-extrabold uppercase tracking-wider text-stone-900 border-b border-stone-200 pb-1 flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-red-900" />
                <span>Core Competencies & Technical Skills</span>
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1">
                {dummyCandidate.skills.map((skill, i) => (
                  <div
                    key={i}
                    className="p-2 bg-stone-50 border border-stone-200 rounded-lg text-xs font-semibold text-stone-800 flex items-center gap-1.5"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-red-900 shrink-0"></span>
                    <span>{skill}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Work History */}
            <div className="space-y-4">
              <h2 className="text-xs font-extrabold uppercase tracking-wider text-stone-900 border-b border-stone-200 pb-1 flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5 text-red-900" />
                <span>Work Experience & Employment History</span>
              </h2>

              <div className="space-y-4">
                {dummyCandidate.workExperience.map((work, idx) => (
                  <div key={idx} className="space-y-1.5 text-xs">
                    <div className="flex flex-wrap items-baseline justify-between gap-1">
                      <span className="font-extrabold text-sm text-stone-900">
                        {work.title}
                      </span>
                      <span className="font-mono text-[11px] text-stone-500 font-semibold">
                        {work.period}
                      </span>
                    </div>
                    <div className="text-stone-600 font-medium">
                      {work.company} · {work.location}
                    </div>
                    <ul className="list-disc pl-4 space-y-1 text-stone-700 pt-1 leading-relaxed">
                      {work.points.map((pt, pIdx) => (
                        <li key={pIdx}>{pt}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div className="space-y-3">
              <h2 className="text-xs font-extrabold uppercase tracking-wider text-stone-900 border-b border-stone-200 pb-1 flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5 text-red-900" />
                <span>Education & Qualifications</span>
              </h2>

              <div className="space-y-2 text-xs">
                {dummyCandidate.education.map((edu, eIdx) => (
                  <div key={eIdx} className="flex flex-wrap items-baseline justify-between gap-1">
                    <div>
                      <span className="font-bold text-stone-900 block">{edu.degree}</span>
                      <span className="text-stone-600">{edu.institution}</span>
                    </div>
                    <span className="font-mono text-[11px] text-stone-500 font-semibold">{edu.year}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications & Licenses */}
            {dummyCandidate.certifications && dummyCandidate.certifications.length > 0 && (
              <div className="space-y-2">
                <h2 className="text-xs font-extrabold uppercase tracking-wider text-stone-900 border-b border-stone-200 pb-1 flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-red-900" />
                  <span>Certifications & Trade Licenses</span>
                </h2>
                <ul className="list-disc pl-4 space-y-1 text-xs text-stone-700">
                  {dummyCandidate.certifications.map((cert, cIdx) => (
                    <li key={cIdx} className="font-medium">{cert}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Languages */}
            {dummyCandidate.languages && dummyCandidate.languages.length > 0 && (
              <div className="space-y-2">
                <h2 className="text-xs font-extrabold uppercase tracking-wider text-stone-900 border-b border-stone-200 pb-1 flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-red-900" />
                  <span>Languages Known</span>
                </h2>
                <div className="flex flex-wrap gap-2 text-xs">
                  {dummyCandidate.languages.map((lang, lIdx) => (
                    <span
                      key={lIdx}
                      className="px-2.5 py-1 bg-stone-100 text-stone-700 font-medium rounded-md border border-stone-200"
                    >
                      {lang}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer Controls */}
        <div className="bg-white border-t border-stone-200 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-stone-500 text-center sm:text-left">
            <span>Template ID: <code className="font-mono font-bold text-stone-700">{template.id}</code></span>
            <span className="mx-2">·</span>
            <span>Category: <strong className="text-stone-800">{template.filterCategory}</strong></span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 sm:flex-none px-5 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold rounded-xl transition-colors cursor-pointer"
            >
              Close
            </button>

            <button
              type="button"
              onClick={() => {
                onSelect(template);
                onClose();
              }}
              className="flex-1 sm:flex-none px-6 py-2.5 bg-red-900 hover:bg-red-800 text-white text-xs font-bold rounded-xl transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              <Check className="w-4 h-4" />
              <span>Use This Template for My Order</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
