import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Advertisement } from '../types';
import {
  Sparkles,
  ArrowRight,
  Maximize2,
  X,
  MessageSquare,
  Briefcase,
  Share2,
  Calendar,
  Layers,
  ChevronRight,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';

export const AdBannerSection: React.FC = () => {
  const { ads, setCurrentTab, settings } = useApp();
  const [selectedFlyer, setSelectedFlyer] = useState<Advertisement | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [lightboxZoom, setLightboxZoom] = useState<boolean>(false);

  const activeAds = ads.filter(a => a.status === 'active').sort((a, b) => a.order - b.order);

  if (activeAds.length === 0) return null;

  // Filter ads if category selected
  const filteredAds = activeAds.filter(ad => {
    if (filterCategory === 'all') return true;
    const title = ad.title.toLowerCase();
    const sub = (ad.subtitle || '').toLowerCase();
    if (filterCategory === 'marine') return title.includes('marine') || title.includes('shipyard') || sub.includes('welder');
    if (filterCategory === 'cnc') return title.includes('cnc') || title.includes('machin') || sub.includes('aerospace');
    if (filterCategory === 'construction') return title.includes('construction') || title.includes('safety') || sub.includes('electrical');
    if (filterCategory === 'hospitality') return title.includes('hotel') || title.includes('hospitality') || title.includes('f&b');
    if (filterCategory === 'logistics') return title.includes('logistics') || title.includes('warehouse') || title.includes('forklift');
    return true;
  });

  const getWhatsAppFlyerUrl = (flyer: Advertisement) => {
    const rawNumber = settings.whatsappNumber.replace(/\D/g, '') || '916374509488';
    const msg = `Hello Arudhra Overseas Consultancy, I saw the promotional flyer for "${flyer.title}" on your website. I want to check eligibility, required documents, and apply for this recruitment drive.`;
    return `https://wa.me/${rawNumber}?text=${encodeURIComponent(msg)}`;
  };

  const getCategoryBadge = (ad: Advertisement) => {
    const title = ad.title.toLowerCase();
    if (title.includes('marine') || title.includes('shipyard')) return { text: 'Shipyard & Marine Drive', bg: 'bg-cyan-900/80 text-cyan-200 border-cyan-700/60' };
    if (title.includes('cnc') || title.includes('machin')) return { text: 'Precision CNC & Aerospace', bg: 'bg-amber-900/80 text-amber-200 border-amber-700/60' };
    if (title.includes('safety') || title.includes('construction')) return { text: 'Construction & MEP Tech', bg: 'bg-orange-900/80 text-orange-200 border-orange-700/60' };
    if (title.includes('hotel') || title.includes('hospitality')) return { text: 'Luxury Hotel & F&B', bg: 'bg-purple-900/80 text-purple-200 border-purple-700/60' };
    if (title.includes('logistics') || title.includes('forklift')) return { text: 'Changi Logistics & Cargo', bg: 'bg-emerald-900/80 text-emerald-200 border-emerald-700/60' };
    return { text: 'Special Recruitment Drive', bg: 'bg-red-900/80 text-red-200 border-red-700/60' };
  };

  return (
    <section id="promotional-flyers-section" className="py-12 bg-slate-900 text-white border-y border-slate-800 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-900/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative space-y-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800 pb-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-900/50 border border-red-700/60 text-red-300 text-xs font-bold tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Singapore Walk-In Drives & Announcements</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Promotional Flyers & Recruitment Banners
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Explore active overseas recruitment campaigns, urgent walk-in drives, and employer hiring posters for Singapore Work Permits and S Passes.
            </p>
          </div>

          {/* Quick Filter Buttons */}
          <div className="flex flex-wrap items-center gap-2 pt-2 md:pt-0">
            {[
              { id: 'all', label: 'All Drives' },
              { id: 'marine', label: 'Shipyard' },
              { id: 'cnc', label: 'CNC Tech' },
              { id: 'construction', label: 'Construction' },
              { id: 'hospitality', label: 'Hospitality' },
              { id: 'logistics', label: 'Logistics' }
            ].map(cat => (
              <button
                key={cat.id}
                onClick={() => setFilterCategory(cat.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  filterCategory === cat.id
                    ? 'bg-red-800 text-white shadow-md border border-red-600'
                    : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700/70'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Megabanner (First Active Ad if wide) */}
        {activeAds[0] && filterCategory === 'all' && (
          <div
            id="featured-mega-flyer"
            className="group relative rounded-3xl overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl transition-all duration-300 hover:border-red-800/60"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch">
              {/* Flyer Image Container */}
              <div
                onClick={() => setSelectedFlyer(activeAds[0])}
                className="lg:col-span-7 relative min-h-[260px] sm:min-h-[320px] lg:min-h-[380px] overflow-hidden bg-slate-900 cursor-pointer"
              >
                <img
                  src={activeAds[0].image}
                  alt={activeAds[0].title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-slate-950" />

                {/* Hover overlay indicator */}
                <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-slate-950/80 text-white backdrop-blur-md border border-white/20 shadow-lg">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Featured Recruitment Drive</span>
                </div>

                <div className="absolute bottom-4 right-4 bg-slate-950/80 hover:bg-slate-900 text-white p-2.5 rounded-xl border border-white/20 backdrop-blur-md shadow-lg transition-transform group-hover:scale-110 flex items-center gap-1.5 text-xs font-bold">
                  <Maximize2 className="w-4 h-4 text-amber-400" />
                  <span className="hidden sm:inline">Enlarge Poster</span>
                </div>
              </div>

              {/* Flyer Details & Actions */}
              <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6 bg-slate-950">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-extrabold border ${getCategoryBadge(activeAds[0]).bg}`}>
                      {getCategoryBadge(activeAds[0]).text}
                    </span>
                    <span className="text-slate-400 text-xs font-medium flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-500" />
                      <span>Direct Placement</span>
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-black text-white leading-tight tracking-tight">
                    {activeAds[0].title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {activeAds[0].subtitle}
                  </p>

                  <div className="space-y-2 pt-2 border-t border-slate-800 text-xs text-slate-300">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Singapore Ministry of Manpower (MOM) verified vacancies</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Face-to-face / Video Interview screening available</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <a
                    href={getWhatsAppFlyerUrl(activeAds[0])}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 min-w-[160px] px-5 py-3 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>WhatsApp Inquiry</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => {
                      setCurrentTab('jobs');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="px-5 py-3 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-xl border border-slate-700 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Briefcase className="w-4 h-4 text-amber-400" />
                    <span>View Jobs</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedFlyer(activeAds[0])}
                    className="p-3 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white rounded-xl border border-slate-800 transition-all cursor-pointer"
                    title="View Full Resolution Poster"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* All Promotional Flyers & Banners Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm sm:text-base font-extrabold text-slate-200 flex items-center gap-2">
              <Layers className="w-4 h-4 text-red-500" />
              <span>All Active Promotional Flyers ({filteredAds.length})</span>
            </h3>
            <span className="text-xs text-slate-400">Click any flyer to expand high-res poster</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAds.map((ad, idx) => {
              const badge = getCategoryBadge(ad);
              return (
                <div
                  key={ad.id}
                  id={`promo-flyer-card-${ad.id}`}
                  className="group bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden shadow-xl hover:border-slate-700 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
                >
                  {/* Visual Flyer Banner Image */}
                  <div
                    onClick={() => setSelectedFlyer(ad)}
                    className="relative aspect-16/9 sm:aspect-4/3 w-full bg-slate-900 overflow-hidden cursor-pointer"
                  >
                    <img
                      src={ad.image}
                      alt={ad.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

                    <div className="absolute top-3 left-3">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold border backdrop-blur-md ${badge.bg}`}>
                        {badge.text}
                      </span>
                    </div>

                    <div className="absolute bottom-3 right-3 bg-slate-950/80 hover:bg-slate-900 text-white p-2 rounded-xl border border-white/20 backdrop-blur-md shadow-md transition-transform group-hover:scale-110">
                      <Maximize2 className="w-3.5 h-3.5 text-amber-400" />
                    </div>
                  </div>

                  {/* Flyer Info */}
                  <div className="p-5 space-y-3 flex-1 flex flex-col justify-between bg-slate-950">
                    <div className="space-y-2">
                      <h4 className="font-extrabold text-sm sm:text-base text-white line-clamp-2 leading-snug group-hover:text-red-300 transition-colors">
                        {ad.title}
                      </h4>
                      {ad.subtitle && (
                        <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">
                          {ad.subtitle}
                        </p>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
                      <a
                        href={getWhatsAppFlyerUrl(ad)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-2 px-3 bg-emerald-700/30 hover:bg-emerald-600 text-emerald-300 hover:text-white border border-emerald-600/40 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                        title="Enquire on WhatsApp for this flyer"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>Enquire Drive</span>
                      </a>

                      <button
                        type="button"
                        onClick={() => setSelectedFlyer(ad)}
                        className="py-2 px-3 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white rounded-xl text-xs font-bold border border-slate-700 transition-all flex items-center gap-1 cursor-pointer"
                      >
                        <span>View Flyer</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* LIGHTBOX MODAL FOR HIGH-RES FLYER VIEW */}
      {selectedFlyer && (
        <div
          id="flyer-lightbox-modal"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/90 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setSelectedFlyer(null)}
        >
          <div
            className="relative w-full max-w-4xl bg-slate-900 border border-slate-700 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-150"
            onClick={e => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 sm:p-5 border-b border-slate-800 bg-slate-950 text-white">
              <div className="space-y-0.5 pr-4">
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${getCategoryBadge(selectedFlyer).bg}`}>
                    {getCategoryBadge(selectedFlyer).text}
                  </span>
                  <span className="text-slate-400 text-xs">Arudhra Official Singapore Recruitment Drive</span>
                </div>
                <h3 className="font-extrabold text-sm sm:text-lg text-white leading-tight">
                  {selectedFlyer.title}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setLightboxZoom(!lightboxZoom)}
                  className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl transition-colors cursor-pointer text-xs font-bold flex items-center gap-1"
                  title="Toggle Zoom"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedFlyer(null)}
                  className="p-2 bg-slate-800 hover:bg-rose-900/60 text-slate-300 hover:text-white rounded-xl transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body - High Res Poster Image */}
            <div className="flex-1 overflow-y-auto bg-black p-2 sm:p-4 flex items-center justify-center min-h-[300px]">
              <img
                src={selectedFlyer.image}
                alt={selectedFlyer.title}
                referrerPolicy="no-referrer"
                className={`max-w-full rounded-xl object-contain transition-all duration-300 shadow-2xl ${
                  lightboxZoom ? 'scale-125 cursor-zoom-out' : 'max-h-[60vh] cursor-zoom-in'
                }`}
                onClick={() => setLightboxZoom(!lightboxZoom)}
              />
            </div>

            {/* Modal Footer / Action Bar */}
            <div className="p-4 sm:p-5 border-t border-slate-800 bg-slate-950 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-slate-300 max-w-lg">
                <p className="font-bold text-white mb-0.5">Campaign Highlights:</p>
                <p className="line-clamp-2">{selectedFlyer.subtitle || 'Direct employer selection with fast-track Singapore Ministry of Manpower (MOM) pass filing.'}</p>
              </div>

              <div className="flex flex-wrap items-center justify-end gap-3 w-full sm:w-auto">
                <a
                  href={getWhatsAppFlyerUrl(selectedFlyer)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-initial px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Inquire via WhatsApp</span>
                </a>

                <button
                  type="button"
                  onClick={() => {
                    setSelectedFlyer(null);
                    setCurrentTab('jobs');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="flex-1 sm:flex-initial px-5 py-2.5 bg-red-900 hover:bg-red-800 text-white text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Briefcase className="w-4 h-4" />
                  <span>Browse Jobs</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
