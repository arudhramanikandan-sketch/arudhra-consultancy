import React from 'react';
import { useApp } from '../context/AppContext';
import { Globe, Wifi, Smartphone, ExternalLink, Zap, ShieldCheck } from 'lucide-react';

export const TravelESimSection: React.FC = () => {
  const { setCurrentTab } = useApp();
  const destinations = [
    { name: 'Singapore', flag: '🇸🇬' },
    { name: 'Malaysia', flag: '🇲🇾' },
    { name: 'Thailand', flag: '🇹🇭' },
    { name: 'Worldwide', flag: '🌍' },
  ];

  return (
    <section id="travel-esim-section" className="py-12 sm:py-16 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-stone-950 via-stone-900 to-red-950 text-white border border-stone-800 shadow-xl p-6 sm:p-10 lg:p-12">
          {/* Subtle Ambient Background Highlights */}
          <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 rounded-full bg-red-600/10 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/3 -mb-10 w-80 h-80 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-4 sm:space-y-5">
              {/* Category Badge & Partner Credit */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-900/60 border border-red-700/60 text-red-200 text-xs font-bold tracking-wide">
                  <Wifi className="w-3.5 h-3.5 text-red-400" />
                  <span>Travel eSIM</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-800/80 border border-stone-700 text-stone-300 text-xs font-medium">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Powered by Happy Journey Holidays</span>
                </span>
              </div>

              {/* Main Headline & Tagline */}
              <div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight">
                  Stay Connected Wherever You Go
                </h2>
                <p className="mt-2 text-sm sm:text-base text-stone-300 leading-relaxed max-w-xl">
                  Get high-speed prepaid digital eSIM data for your overseas journey. Activate instantly without swapping physical SIM cards or paying high roaming charges.
                </p>
              </div>

              {/* Destination Pills: Singapore/Malaysia/Thailand/Worldwide */}
              <div className="space-y-2">
                <div className="text-xs font-bold uppercase tracking-wider text-stone-400 flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-red-400" />
                  <span>Coverage: Singapore / Malaysia / Thailand / Worldwide</span>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  {destinations.map(d => (
                    <span
                      key={d.name}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-900/90 border border-stone-700/80 text-xs font-semibold text-white shadow-2xs"
                    >
                      <span className="text-sm">{d.flag}</span>
                      <span>{d.name}</span>
                    </span>
                  ))}
                  <span className="text-[11px] text-stone-400 font-medium self-center pl-1">
                    & 200+ countries
                  </span>
                </div>
              </div>

              {/* Quick Feature Perks */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1 text-xs text-stone-300 font-medium">
                <div className="flex items-center gap-2">
                  <Zap className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>Instant 100% digital QR code installation</span>
                </div>
                <div className="flex items-center gap-2">
                  <Smartphone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>Keep your original WhatsApp & phone number active</span>
                </div>
              </div>
            </div>

            {/* Right Call-To-Action Box Column */}
            <div className="lg:col-span-5">
              <div className="bg-stone-900/95 border border-stone-700/80 rounded-2xl p-6 sm:p-7 space-y-4 shadow-lg text-center lg:text-left">
                <div className="space-y-1">
                  <div className="text-xs font-bold text-red-400 uppercase tracking-wider">
                    Official Travel Partner
                  </div>
                  <h3 className="text-lg font-bold text-white">
                    Get Your eSIM Plan Online
                  </h3>
                  <p className="text-xs text-stone-400 leading-relaxed">
                    Browse affordable overseas data packages powered by Happy Journey Holidays via Airalo.
                  </p>
                </div>

                {/* Direct External Link Button */}
                <div className="pt-1 space-y-2">
                  <a
                    id="travel-esim-cta-btn"
                    href="https://discover.airalo.com/happyjourneyholidays/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-red-900 hover:bg-red-800 text-white text-sm font-bold rounded-xl shadow-lg hover:shadow-red-950/60 transition-all cursor-pointer group"
                    title="Get Travel eSIM powered by Happy Journey Holidays"
                  >
                    <span>Get Travel eSIM</span>
                    <ExternalLink className="w-4 h-4 text-red-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>

                  <button
                    type="button"
                    id="travel-esim-view-details-btn"
                    onClick={() => {
                      setCurrentTab('esim');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-stone-800/80 hover:bg-stone-800 text-stone-300 hover:text-white text-xs font-semibold rounded-xl border border-stone-700 transition-colors cursor-pointer"
                  >
                    <span>View eSIM Plans & Setup Guide</span>
                  </button>
                </div>

                <div className="pt-2 border-t border-stone-800 flex items-center justify-center lg:justify-start gap-2 text-[11px] text-stone-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>Powered by Happy Journey Holidays</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
