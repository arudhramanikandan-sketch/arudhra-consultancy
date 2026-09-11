import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Search, Briefcase, ArrowRight, ShieldCheck, CheckCircle2, Award, UserCheck } from 'lucide-react';

interface HeroSectionProps {
  onSearch: (query: string, category: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onSearch }) => {
  const { settings, setCurrentTab } = useApp();
  const [keyword, setKeyword] = useState('');
  const [category, setCategory] = useState('All');

  const categories = [
    'All',
    'Manufacturing & Production',
    'Marine & Shipyard',
    'F&B & Hospitality',
    'Logistics & Warehouse',
    'Construction & Civil',
    'Electrical & Maintenance'
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(keyword, category);
    setCurrentTab('jobs');
  };

  const handleQuickCategory = (cat: string) => {
    setCategory(cat);
    onSearch(keyword, cat);
    setCurrentTab('jobs');
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-stone-950 via-stone-900 to-red-950 text-white pt-12 pb-20 lg:pt-20 lg:pb-28 border-b border-red-950/40">
      {/* Decorative background grid and ambient lighting */}
      <div className="absolute inset-0 bg-[radial-gradient(#3f1515_1px,transparent_1px)] [background-size:24px_24px] opacity-35 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-900/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          {/* Main Positioning Tag */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-950/80 border border-red-800 text-red-300 text-xs font-bold tracking-wide shadow-sm">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span>Singapore Overseas Recruitment & Placement Support</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
            {settings.heroHeadline || 'Singapore Overseas Recruitment & Placement Support'}
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-stone-300 font-normal leading-relaxed max-w-2xl mx-auto">
            {settings.heroSubheadline || 'Direct overseas recruitment assistance and placement support for skilled and semi-skilled candidates seeking verified career pathways in Singapore.'}
          </p>

          {/* Search Box */}
          <div className="pt-4">
            <form
              id="hero-search-form"
              onSubmit={handleSearchSubmit}
              className="bg-white p-2.5 sm:p-3 rounded-2xl shadow-2xl border border-stone-200 text-slate-900 flex flex-col sm:flex-row items-center gap-2.5 max-w-2xl mx-auto"
            >
              <div className="flex-1 w-full flex items-center gap-2 pl-2">
                <Search className="w-5 h-5 text-slate-400 shrink-0" />
                <input
                  id="hero-keyword-input"
                  type="text"
                  value={keyword}
                  onChange={e => setKeyword(e.target.value)}
                  placeholder="Job title, trade, or skill (e.g. CNC, Welder, F&B)..."
                  className="w-full text-sm text-slate-900 font-medium placeholder-slate-400 focus:outline-hidden py-2"
                />
              </div>

              <div className="w-full sm:w-auto border-t sm:border-t-0 sm:border-l border-slate-200 pt-2 sm:pt-0 sm:pl-3">
                <select
                  id="hero-category-select"
                  value={category}
                  onChange={e => setCategory(e.target.value)}
                  aria-label="Filter by job category"
                  className="w-full text-xs font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 py-2.5 px-3 rounded-xl border border-slate-200 focus:outline-hidden"
                >
                  {categories.map(c => (
                    <option key={c} value={c}>{c === 'All' ? 'All Singapore Sectors' : c}</option>
                  ))}
                </select>
              </div>

              <button
                id="hero-search-submit-btn"
                type="submit"
                className="w-full sm:w-auto px-6 py-3 bg-red-900 hover:bg-red-800 text-white text-sm font-bold rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 shrink-0 cursor-pointer"
              >
                <span>Search Jobs</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>

          {/* Quick Category Chips */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-2 text-xs">
            <span className="text-stone-400 font-medium">Popular Sectors:</span>
            {categories.slice(1, 6).map(cat => (
              <button
                key={cat}
                type="button"
                onClick={() => handleQuickCategory(cat)}
                className="px-3 py-1 bg-stone-900/90 hover:bg-stone-800 text-stone-300 hover:text-white rounded-lg border border-stone-800 transition-colors cursor-pointer"
              >
                {cat.split('&')[0]}
              </button>
            ))}
          </div>

          {/* Main Action CTAs */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-4">
            <button
              id="hero-cta-view-jobs"
              onClick={() => {
                setCurrentTab('jobs');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-8 py-3.5 bg-red-900 hover:bg-red-800 text-white text-sm sm:text-base font-bold rounded-xl shadow-lg hover:shadow-red-950/50 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Briefcase className="w-5 h-5" />
              <span>View Jobs</span>
            </button>

            <button
              id="hero-cta-contact-us"
              onClick={() => {
                setCurrentTab('contact');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-8 py-3.5 bg-stone-900 hover:bg-stone-800 text-stone-100 text-sm sm:text-base font-bold rounded-xl border border-stone-700 transition-all cursor-pointer"
            >
              <span>Contact Us</span>
            </button>
          </div>

          {/* Trust Value Points */}
          <div className="pt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-left border-t border-stone-800/90">
            <div className="p-3.5 rounded-xl bg-stone-900/60 border border-stone-800/80 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-white">Verified Employers</h4>
                <p className="text-[11px] text-stone-400 mt-0.5">Singapore registered companies and MOM compliant positions.</p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-stone-900/60 border border-stone-800/80 flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-white">Transparent Terms</h4>
                <p className="text-[11px] text-stone-400 mt-0.5">Clear salary details in SGD, working hours, and OT rules.</p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-stone-900/60 border border-stone-800/80 flex items-start gap-3">
              <UserCheck className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-white">Candidate Support</h4>
                <p className="text-[11px] text-stone-400 mt-0.5">Assistance with candidate documentation and pre-departure briefings.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
