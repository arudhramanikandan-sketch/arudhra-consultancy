import React from 'react';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import {
  Phone,
  Mail,
  MapPin,
  MessageSquare,
  Facebook,
  Instagram,
  Youtube,
  Star,
  ExternalLink,
  Shield,
  Briefcase,
  ChevronRight,
  User,
  Lock
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { settings, setCurrentTab } = useApp();
  const { user, isAdmin } = useAuth();

  const getWhatsAppUrl = () => {
    const raw = settings.whatsappNumber.replace(/\D/g, '') || '7418845083';
    return `https://wa.me/91${raw.slice(-10)}?text=${encodeURIComponent('Hello Arudhra Consultancy, I want to enquire about Singapore overseas recruitment & placement support.')}`;
  };

  return (
    <footer className="bg-stone-950 text-stone-300 pt-16 pb-12 border-t border-red-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1: Company Profile */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img
                src={settings.logoUrl || '/arudhra-logo.png'}
                alt={settings.businessName || 'Arudhra Consultancy'}
                className="h-10 max-w-[150px] object-contain"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = '/arudhra-logo.png';
                }}
              />
              <div>
                <h4 className="text-lg font-extrabold text-white tracking-tight">
                  {settings.logoTitle || 'ARUDHRA'}{' '}
                  <span className="text-red-400 font-bold">{settings.logoSubtitle || 'CONSULTANCY'}</span>
                </h4>
                <span className="text-[10px] uppercase tracking-wider text-red-300 font-bold bg-red-950/80 px-2 py-0.5 rounded-sm border border-red-800/40 block mt-0.5">
                  Recruitment & Placement Support
                </span>
              </div>
            </div>
            <p className="text-xs text-stone-400 leading-relaxed">
              Arudhra Consultancy specializes in overseas recruitment guidance, candidate documentation facilitation, and placement support for Singapore employment opportunities.
            </p>

            {/* Social Media Links */}
            <div className="pt-2">
              <span className="text-xs font-semibold text-stone-400 block mb-2">Connect With Us:</span>
              <div className="flex items-center gap-2.5">
                {settings.whatsappNumber && (
                  <a
                    id="footer-social-wa"
                    href={getWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-lg bg-stone-900 hover:bg-emerald-700 text-stone-300 hover:text-white flex items-center justify-center transition-colors border border-stone-800"
                    title="WhatsApp"
                  >
                    <MessageSquare className="w-4 h-4" />
                  </a>
                )}
                {settings.facebookUrl && (
                  <a
                    id="footer-social-fb"
                    href={settings.facebookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-lg bg-stone-900 hover:bg-blue-600 text-stone-300 hover:text-white flex items-center justify-center transition-colors border border-stone-800"
                    title="Facebook"
                  >
                    <Facebook className="w-4 h-4" />
                  </a>
                )}
                {settings.instagramUrl && (
                  <a
                    id="footer-social-ig"
                    href={settings.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-lg bg-stone-900 hover:bg-pink-600 text-stone-300 hover:text-white flex items-center justify-center transition-colors border border-stone-800"
                    title="Instagram"
                  >
                    <Instagram className="w-4 h-4" />
                  </a>
                )}
                {settings.youtubeUrl && (
                  <a
                    id="footer-social-yt"
                    href={settings.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-lg bg-stone-900 hover:bg-red-700 text-stone-300 hover:text-white flex items-center justify-center transition-colors border border-stone-800"
                    title="YouTube Channel"
                  >
                    <Youtube className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h5 className="text-sm font-bold uppercase tracking-wider text-white mb-4 border-b border-stone-800 pb-2">
              Explore
            </h5>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li>
                <button
                  id="footer-link-home"
                  onClick={() => {
                    setCurrentTab('home');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-red-300 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-stone-600" />
                  <span>Home</span>
                </button>
              </li>
              <li>
                <button
                  id="footer-link-jobs"
                  onClick={() => {
                    setCurrentTab('jobs');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-red-300 transition-colors flex items-center gap-1.5 font-semibold text-stone-300 cursor-pointer"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-stone-600" />
                  <span>Singapore Job Openings</span>
                </button>
              </li>
              <li>
                <button
                  id="footer-link-about"
                  onClick={() => {
                    setCurrentTab('about');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-red-300 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-stone-600" />
                  <span>About Arudhra Consultancy</span>
                </button>
              </li>
              <li>
                <button
                  id="footer-link-videos"
                  onClick={() => {
                    setCurrentTab('videos');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-red-300 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-stone-600" />
                  <span>Informative Videos</span>
                </button>
              </li>
              <li>
                <button
                  id="footer-link-reviews"
                  onClick={() => {
                    setCurrentTab('reviews');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-red-300 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-stone-600" />
                  <span>Google Reviews & Feedback</span>
                </button>
              </li>
              <li>
                <button
                  id="footer-link-contact"
                  onClick={() => {
                    setCurrentTab('contact');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-red-300 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-stone-600" />
                  <span>Contact Office</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Singapore Sector Specializations */}
          <div>
            <h5 className="text-sm font-bold uppercase tracking-wider text-white mb-4 border-b border-stone-800 pb-2">
              Singapore Job Sectors
            </h5>
            <ul className="space-y-2 text-xs text-stone-400">
              <li className="flex items-center gap-2">
                <Briefcase className="w-3.5 h-3.5 text-red-400 shrink-0" />
                <span>Manufacturing & CNC Machining</span>
              </li>
              <li className="flex items-center gap-2">
                <Briefcase className="w-3.5 h-3.5 text-red-400 shrink-0" />
                <span>Marine & Shipyard Welding</span>
              </li>
              <li className="flex items-center gap-2">
                <Briefcase className="w-3.5 h-3.5 text-red-400 shrink-0" />
                <span>Construction & Civil Engineering</span>
              </li>
              <li className="flex items-center gap-2">
                <Briefcase className="w-3.5 h-3.5 text-red-400 shrink-0" />
                <span>F&B & Hospitality Service</span>
              </li>
              <li className="flex items-center gap-2">
                <Briefcase className="w-3.5 h-3.5 text-red-400 shrink-0" />
                <span>Logistics & Warehouse Operations</span>
              </li>
              <li className="flex items-center gap-2">
                <Briefcase className="w-3.5 h-3.5 text-red-400 shrink-0" />
                <span>Electrical & Plant Maintenance</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Office Location */}
          <div className="space-y-3">
            <h5 className="text-sm font-bold uppercase tracking-wider text-white mb-4 border-b border-stone-800 pb-2">
              Office & Location
            </h5>
            <div className="space-y-2.5 text-xs text-stone-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <span className="leading-snug">{settings.officeAddress}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-red-400 shrink-0" />
                <a href={`tel:${settings.phone.replace(/\s+/g, '')}`} className="hover:text-white transition-colors">
                  {settings.phone}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <MessageSquare className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline">
                  WhatsApp: +91 {settings.whatsappNumber}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-red-400 shrink-0" />
                <a href={`mailto:${settings.email}`} className="hover:text-white transition-colors">
                  {settings.email}
                </a>
              </div>
            </div>

            {/* Google Reviews Badge */}
            {settings.googleReviewsUrl && (
              <a
                id="footer-google-review-badge"
                href={settings.googleReviewsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 p-3 rounded-xl bg-stone-900 border border-stone-800 hover:border-red-900/60 flex items-center justify-between transition-colors group block"
              >
                <div>
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-amber-400" />
                    ))}
                    <span className="text-xs font-bold text-white ml-1.5">{settings.googleRating || '4.8'}/5</span>
                  </div>
                  <span className="text-[10px] text-stone-400">Verified Google Business Reviews</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-stone-500 group-hover:text-white transition-colors" />
              </a>
            )}
          </div>
        </div>

        {/* Disclaimer & Transparency Statement */}
        <div className="mt-12 pt-8 border-t border-stone-900 text-[11px] text-stone-400 space-y-2 text-center sm:text-left">
          <p>
            <strong>Important Notice:</strong> Arudhra Consultancy provides professional overseas job guidance and recruitment facilitation exclusively for Singapore. Candidate selection and Work Permit / S Pass issuance are subject to Singapore Ministry of Manpower (MOM) criteria and hiring employer approval. Arudhra Consultancy does not make false promises or unsupported placement guarantees.
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="mt-6 pt-6 border-t border-stone-900 flex flex-wrap items-center justify-between gap-4 text-xs text-stone-400">
          <p>© {new Date().getFullYear()} {settings.businessName}. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <button
              id="footer-candidate-login-btn"
              onClick={() => {
                setCurrentTab('candidate-login');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-stone-400 hover:text-stone-200 flex items-center gap-1 cursor-pointer"
            >
              <User className="w-3 h-3 text-stone-500" />
              <span>Candidate Login</span>
            </button>
            <button
              id="footer-admin-login-btn"
              onClick={() => {
                setCurrentTab('admin-login');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-stone-400 hover:text-stone-200 flex items-center gap-1 cursor-pointer"
            >
              <Lock className="w-3 h-3 text-stone-500" />
              <span>Admin Login</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
