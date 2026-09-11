import React from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, Compass, CheckCircle2, Building2, Briefcase, MessageSquare } from 'lucide-react';
import { SubpageBackButton } from '../components/SubpageBackButton';

export const AboutUsView: React.FC = () => {
  const { settings, setCurrentTab } = useApp();

  const getWhatsAppUrl = () => {
    const raw = settings.whatsappNumber.replace(/\D/g, '') || '916374509488';
    return `https://wa.me/${raw}?text=${encodeURIComponent('Hello Arudhra Consultancy, I would like to learn more about your Singapore recruitment services.')}`;
  };

  return (
    <div id="about-us-view" className="py-8 sm:py-10 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
        {/* Subpage Back Key & Navigation */}
        <SubpageBackButton label="Back to Home" currentPageTitle="About Us" fallbackTab="home" />

        {/* Banner */}
        <div className="bg-stone-900 text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-xl border border-stone-800">
          <div className="relative z-10 max-w-2xl space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-950 text-red-300 text-xs font-bold border border-red-800">
              🇸🇬 Singapore Overseas Recruitment Specialists
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              About Arudhra Consultancy
            </h1>
            <p className="text-sm sm:text-base text-stone-300">
              {settings.tagline || 'Singapore Overseas Recruitment & Placement Support'}
            </p>
          </div>
        </div>

        {/* Main Editorial */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xs p-8 sm:p-12 space-y-8">
          <div className="max-w-3xl space-y-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {settings.aboutTitle || 'Dedicated Exclusively to Singapore Career Pathways'}
            </h2>
            <p className="text-slate-700 text-sm sm:text-base leading-relaxed whitespace-pre-line">
              {settings.aboutContent}
            </p>
          </div>

          {/* Value points */}
          {settings.aboutPoints && settings.aboutPoints.length > 0 && (
            <div className="pt-4 border-t border-slate-100">
              <h3 className="text-base font-bold text-slate-900 mb-4">
                Core Principles of Our Singapore Operations
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {settings.aboutPoints.map((pt, i) => (
                  <div key={i} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-red-900 shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-slate-800 font-medium leading-snug">{pt}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 3 Pillars */}
          <div className="pt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-stone-900 text-white rounded-2xl space-y-2 border border-stone-800">
              <Compass className="w-6 h-6 text-red-400" />
              <h4 className="text-base font-bold text-white">Singapore Focus Only</h4>
              <p className="text-xs text-stone-300 leading-relaxed">
                We concentrate 100% of our recruitment networks, legal updates, and employer pipelines strictly in the Republic of Singapore.
              </p>
            </div>

            <div className="p-6 bg-stone-900 text-white rounded-2xl space-y-2 border border-stone-800">
              <Building2 className="w-6 h-6 text-red-400" />
              <h4 className="text-base font-bold text-white">Genuine Vacancies</h4>
              <p className="text-xs text-stone-300 leading-relaxed">
                Every listed role is directly verified with registered Singapore entities in manufacturing, marine, civil, and hospitality sectors.
              </p>
            </div>

            <div className="p-6 bg-stone-900 text-white rounded-2xl space-y-2 border border-stone-800">
              <ShieldCheck className="w-6 h-6 text-red-400" />
              <h4 className="text-base font-bold text-white">Transparent Service</h4>
              <p className="text-xs text-stone-300 leading-relaxed">
                No false salary numbers, hidden costs, or impossible guarantees. Candid feedback on trade eligibility and documentation.
              </p>
            </div>
          </div>

          {/* Compliance & Verification Statement */}
          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-2 text-xs text-slate-600">
            <h4 className="font-bold text-slate-900">Regulatory Advisory & Compliance</h4>
            <p>
              Arudhra Consultancy operates as an overseas recruitment facilitator and candidate support consultancy. Work Pass approvals (Work Permit / S Pass / E Pass) and in-principle approval (IPA) issuances are governed by the Ministry of Manpower (MOM), Singapore. We do not provide unauthorized or fake guarantees.
            </p>
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-slate-100">
            <button
              onClick={() => {
                setCurrentTab('jobs');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-6 py-3 bg-red-900 hover:bg-red-800 text-white text-xs sm:text-sm font-bold rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
            >
              <Briefcase className="w-4 h-4" />
              <span>Explore Singapore Vacancies</span>
            </button>

            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-stone-900 hover:bg-black text-white text-xs sm:text-sm font-bold rounded-xl transition-all flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              <span>Consult on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
