import React from 'react';
import { useApp } from '../context/AppContext';
import { CV_PACKAGES } from '../data/cvPackages';
import {
  FileText,
  CheckCircle,
  Clock,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Check,
  Send
} from 'lucide-react';

export const CVServiceSection: React.FC = () => {
  const { setCurrentTab } = useApp();

  return (
    <section className="py-14 sm:py-16 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-stone-100 pb-8">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 border border-red-200 text-red-900 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5 text-red-800" />
              <span>Professional Document Service</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
              Create Your Professional CV
            </h2>
            <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
              Get a professionally prepared CV tailored to your job profile and experience. Every CV is manually prepared by Arudhra Consultancy recruitment specialists for Singapore, Gulf, and Indian employer standards.
            </p>
          </div>

          <div>
            <button
              id="home-cv-section-cta-btn"
              onClick={() => {
                setCurrentTab('cv');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-6 py-3.5 bg-red-900 hover:bg-red-800 text-white text-xs sm:text-sm font-bold rounded-xl shadow-lg transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>Order Your CV Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 6-Step Visual Process */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
          <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200 text-center">
            <span className="w-6 h-6 rounded-full bg-red-900 text-white text-xs font-bold flex items-center justify-center mx-auto mb-2">1</span>
            <span className="font-bold text-xs text-stone-900 block">Select Category</span>
            <span className="text-[10px] text-stone-500">20+ trades</span>
          </div>
          <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200 text-center">
            <span className="w-6 h-6 rounded-full bg-red-900 text-white text-xs font-bold flex items-center justify-center mx-auto mb-2">2</span>
            <span className="font-bold text-xs text-stone-900 block">Select Experience</span>
            <span className="text-[10px] text-stone-500">Fresher to 5+ yrs</span>
          </div>
          <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200 text-center">
            <span className="w-6 h-6 rounded-full bg-red-900 text-white text-xs font-bold flex items-center justify-center mx-auto mb-2">3</span>
            <span className="font-bold text-xs text-stone-900 block">Pick CV Template</span>
            <span className="text-[10px] text-stone-500">10 visual layouts</span>
          </div>
          <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200 text-center">
            <span className="w-6 h-6 rounded-full bg-red-900 text-white text-xs font-bold flex items-center justify-center mx-auto mb-2">4</span>
            <span className="font-bold text-xs text-stone-900 block">Select Package</span>
            <span className="text-[10px] text-stone-500">₹99 to ₹399</span>
          </div>
          <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200 text-center">
            <span className="w-6 h-6 rounded-full bg-red-900 text-white text-xs font-bold flex items-center justify-center mx-auto mb-2">5</span>
            <span className="font-bold text-xs text-stone-900 block">Pay & WhatsApp</span>
            <span className="text-[10px] text-stone-500">With Order ID</span>
          </div>
          <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200 text-center">
            <span className="w-6 h-6 rounded-full bg-emerald-600 text-white text-xs font-bold flex items-center justify-center mx-auto mb-2">6</span>
            <span className="font-bold text-xs text-stone-900 block">Receive Final CV</span>
            <span className="text-[10px] text-stone-500">Word + PDF file</span>
          </div>
        </div>

        {/* Highlight 3 Popular Packages Preview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {CV_PACKAGES.slice(0, 3).map(pkg => (
            <div
              key={pkg.id}
              onClick={() => {
                setCurrentTab('cv');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="p-5 bg-stone-50 hover:bg-stone-100/80 border border-stone-200 rounded-2xl flex flex-col justify-between transition-all cursor-pointer group hover:shadow-sm"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-base text-stone-900 group-hover:text-red-950 transition-colors">
                    {pkg.name}
                  </h3>
                  <span className="font-mono font-extrabold text-lg text-red-900">
                    ₹{pkg.price}
                  </span>
                </div>
                <p className="text-xs text-stone-600 leading-snug">
                  {pkg.description}
                </p>
                <ul className="space-y-1.5 text-xs text-stone-700 pt-2 border-t border-stone-200/50">
                  {pkg.features.slice(0, 3).map((f, i) => (
                    <li key={i} className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 mt-4 border-t border-stone-200 flex items-center justify-between text-xs font-bold text-red-900">
                <span>View Full Package</span>
                <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>

        {/* Trust Footnote */}
        <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-600">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              <strong>100% Human-Prepared:</strong> No generic AI resume generators. Prepared manually by our experienced overseas documentation team.
            </span>
          </div>
          <button
            onClick={() => {
              setCurrentTab('cv');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-red-900 hover:underline font-bold shrink-0 cursor-pointer"
          >
            Create Your CV Now →
          </button>
        </div>
      </div>
    </section>
  );
};
