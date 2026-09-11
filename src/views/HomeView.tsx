import React from 'react';
import { HeroSection } from '../components/HeroSection';
import { AdBannerSection } from '../components/AdBannerSection';
import { LatestJobsSection, FeaturedJobsSection } from '../components/FeaturedJobsSection';
import { WhyChooseSection } from '../components/WhyChooseSection';
import { ProcessSection } from '../components/ProcessSection';
import { VideosSection } from '../components/VideosSection';
import { GoogleReviewsSection } from '../components/GoogleReviewsSection';
import { LocationSection } from '../components/LocationSection';
import { useApp } from '../context/AppContext';
import { MessageSquare, Phone, Briefcase } from 'lucide-react';

interface HomeViewProps {
  onSearch: (keyword: string, category: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onSearch }) => {
  const { setCurrentTab, settings } = useApp();

  const getWhatsAppUrl = () => {
    const raw = settings.whatsappNumber.replace(/\D/g, '') || '917418845083';
    return `https://wa.me/${raw}?text=${encodeURIComponent('Hello Arudhra Consultancy, I would like to consult with a recruitment advisor for Singapore jobs.')}`;
  };

  return (
    <div id="home-view" className="space-y-0">
      {/* 1. Hero */}
      <HeroSection onSearch={onSearch} />

      {/* 2. Promotional Banners */}
      <AdBannerSection />

      {/* 3. Latest Singapore Jobs */}
      <LatestJobsSection />

      {/* 4. Featured Singapore Jobs */}
      <FeaturedJobsSection />

      {/* 5. Why Choose Arudhra Consultancy */}
      <WhyChooseSection />

      {/* 6. How the Recruitment Process Works */}
      <ProcessSection />

      {/* 7. YouTube Videos */}
      <VideosSection />

      {/* 8. Google Reviews & Trust */}
      <GoogleReviewsSection />

      {/* 9. Office Location & Map */}
      <LocationSection />

      {/* 10. Contact / Enquiry CTA Banner */}
      <section className="py-14 bg-gradient-to-r from-red-950 via-stone-900 to-red-950 text-white relative overflow-hidden border-t border-red-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-900/60 border border-red-700/50 text-red-200 text-xs font-bold">
            <span>🇸🇬 Ready to Work in Singapore?</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight max-w-2xl mx-auto">
            Take Your Next Step with Verified Singapore Opportunities
          </h2>

          <p className="text-sm text-stone-300 max-w-xl mx-auto leading-relaxed">
            Reach out to our Neelambur, Coimbatore recruitment office directly on WhatsApp or browse the full directory of open positions.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              id="cta-bottom-view-jobs"
              onClick={() => {
                setCurrentTab('jobs');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-6 py-3 bg-white text-stone-900 hover:bg-stone-100 text-xs sm:text-sm font-bold rounded-xl shadow-lg transition-all flex items-center gap-2 cursor-pointer"
            >
              <Briefcase className="w-4 h-4 text-red-900" />
              <span>Browse All Singapore Jobs</span>
            </button>

            <a
              id="cta-bottom-whatsapp"
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold rounded-xl shadow-lg transition-all flex items-center gap-2 cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp Consultation</span>
            </a>

            <a
              id="cta-bottom-call"
              href={`tel:${settings.phone.replace(/\s+/g, '')}`}
              className="px-6 py-3 bg-stone-900/90 hover:bg-stone-800 text-white text-xs sm:text-sm font-bold rounded-xl border border-stone-700 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Phone className="w-4 h-4 text-red-400" />
              <span>Call Us Now</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
