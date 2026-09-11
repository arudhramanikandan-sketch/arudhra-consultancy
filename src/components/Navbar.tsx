import React, { useState, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import {
  Briefcase,
  Phone,
  MessageSquare,
  User,
  Shield,
  Menu,
  X,
  LogOut,
  ChevronRight,
  Lock,
  Edit2,
  Palette,
  Upload,
  Camera,
  Sparkles,
  Facebook,
  Instagram,
  Sun,
  Moon,
  ArrowLeft
} from 'lucide-react';
import { LogoEditModal } from './LogoEditModal';
import { ThemeSelectorModal } from './ThemeSelectorModal';

export const Navbar: React.FC = () => {
  const { user, isAdmin, isCustomer, logout } = useAuth();
  const { settings, updateSettings, showToast, currentTab, setCurrentTab, goBack, themeColor, isDarkMode } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [logoEditOpen, setLogoEditOpen] = useState(false);
  const [themeModalOpen, setThemeModalOpen] = useState(false);
  const [isHoveringLogo, setIsHoveringLogo] = useState(false);
  const directLogoInputRef = useRef<HTMLInputElement>(null);

  const handleDirectLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async () => {
      const dataUrl = reader.result as string;
      const success = await updateSettings({
        logoUrl: dataUrl,
        logoDisplayMode: 'image_text'
      });
      if (success) {
        showToast('Company logo uploaded successfully!', 'success');
      }
    };
    reader.onerror = () => {
      showToast('Failed to process uploaded image', 'error');
    };
    reader.readAsDataURL(file);
  };

  const handleLogout = () => {
    logout();
    setCurrentTab('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showToast('Signed out successfully. Welcome back to Arudhra Consultancy.', 'info');
  };

  const getWhatsAppUrl = () => {
    const raw = settings.whatsappNumber.replace(/\D/g, '') || '7418845083';
    return `https://wa.me/91${raw.slice(-10)}?text=${encodeURIComponent('Hello Arudhra Consultancy, I want to enquire about Singapore overseas recruitment & placement support.')}`;
  };

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'jobs', label: 'Singapore Jobs' },
    { id: 'videos', label: 'Videos' },
    { id: 'about', label: 'About Us' },
    { id: 'reviews', label: 'Google Reviews' },
    { id: 'contact', label: 'Contact' }
  ];

  const handleNavClick = (tabId: string) => {
    setCurrentTab(tabId as any);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-xs">
      {/* Top Notification / Contact Strip */}
      <div className="bg-stone-950 text-white text-[11px] py-1.5 px-4 sm:px-8 border-b border-red-950/40">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 font-medium text-stone-300">
            <span className="inline-block w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="tracking-wide">Singapore Overseas Recruitment & Placement Support</span>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 text-xs font-semibold">
            {isAdmin && (
              <button
                type="button"
                onClick={() => setLogoEditOpen(true)}
                className="text-red-400 hover:text-white transition-colors flex items-center gap-1 cursor-pointer font-bold mr-1"
                title="Admin: Edit Brand Logo & Typography"
              >
                <Palette className="w-3 h-3" />
                <span>Admin Logo Control</span>
              </button>
            )}
            <a
              id="top-bar-phone"
              href={`tel:${settings.phone.replace(/\s+/g, '')}`}
              className="flex items-center gap-1.5 text-stone-300 hover:text-white transition-colors"
            >
              <Phone className="w-3 h-3 text-red-400" />
              <span>{settings.phone}</span>
            </a>
            <a
              id="top-bar-whatsapp"
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 text-stone-300 hover:text-emerald-400 transition-colors"
            >
              <MessageSquare className="w-3 h-3 text-emerald-400" />
              <span>WhatsApp</span>
            </a>
            {settings.facebookUrl && (
              <a
                id="top-bar-facebook"
                href={settings.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:flex items-center gap-1.5 text-stone-300 hover:text-blue-400 transition-colors"
                title="Follow us on Facebook"
              >
                <Facebook className="w-3 h-3 text-blue-400" />
                <span>Facebook</span>
              </a>
            )}
            {settings.instagramUrl && (
              <a
                id="top-bar-instagram"
                href={settings.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:flex items-center gap-1.5 text-stone-300 hover:text-pink-400 transition-colors"
                title="Follow us on Instagram"
              >
                <Instagram className="w-3 h-3 text-pink-400" />
                <span>Instagram</span>
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Hidden Direct Logo File Input */}
          <input
            id="direct-logo-file-input"
            type="file"
            ref={directLogoInputRef}
            onChange={handleDirectLogoUpload}
            accept="image/png, image/jpeg, image/svg+xml, image/webp"
            className="hidden"
          />

          {/* Logo & Brand Identity (Admin Controlled & Upload Ready) */}
          <div className="flex items-center gap-3">
            <button
              id="brand-logo-btn"
              onClick={() => handleNavClick('home')}
              onMouseEnter={() => setIsHoveringLogo(true)}
              onMouseLeave={() => setIsHoveringLogo(false)}
              className="flex items-center gap-3 text-left group focus:outline-hidden cursor-pointer"
            >
              <div
                id="brand-logo-emblem-box"
                className={`w-12 h-12 ${settings.logoEmblemShape || 'rounded-xl'} flex items-center justify-center bg-white shadow-xs group-hover:shadow-md group-hover:scale-105 transition-all duration-200 border border-slate-200 shrink-0 relative overflow-hidden`}
              >
                {settings.logoUrl || '/arudhra-logo.png' ? (
                  <img
                    id="brand-uploaded-logo-img"
                    src={settings.logoUrl || '/arudhra-logo.png'}
                    alt={settings.businessName || 'Arudhra Consultancy Logo'}
                    className="w-full h-full object-contain p-1 select-none pointer-events-auto transition-transform duration-200"
                    referrerPolicy="no-referrer"
                    loading="eager"
                    decoding="sync"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = '/arudhra-logo.png';
                    }}
                  />
                ) : (
                  /* Professional Brand Insignia on White Background */
                  <div className="flex flex-col items-center justify-center text-center select-none w-full h-full p-1 bg-white">
                    <div className="font-serif font-black text-lg tracking-wider text-red-900 leading-none">
                      {settings.logoEmblemText || 'AC'}
                    </div>
                    <span className="text-[8px] font-extrabold tracking-widest text-slate-500 uppercase leading-none mt-0.5">
                      SG
                    </span>
                  </div>
                )}

                {/* Subtle shine highlight */}
                <span className="absolute inset-0 bg-gradient-to-tr from-transparent via-slate-100/40 to-transparent pointer-events-none" />

                {/* Hover Upload / Edit Quick Overlay */}
                {isAdmin && (
                  <div
                    id="admin-logo-upload-overlay"
                    onClick={(e) => {
                      e.stopPropagation();
                      directLogoInputRef.current?.click();
                    }}
                    title="Click to Upload Company Logo"
                    className="absolute inset-0 bg-slate-950/85 text-white flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer backdrop-blur-2xs"
                  >
                    <Upload className="w-4 h-4 text-amber-300 animate-bounce" />
                    <span className="text-[8px] font-extrabold tracking-tight uppercase mt-0.5 text-white">Upload</span>
                  </div>
                )}
              </div>

              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-lg sm:text-xl font-black text-slate-900 tracking-tight leading-tight">
                    {settings.logoTitle || 'ARUDHRA'}{' '}
                    <span className="text-red-900 font-bold">{settings.logoSubtitle || 'CONSULTANCY'}</span>
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 font-medium truncate max-w-[210px] sm:max-w-xs">
                  {settings.tagline || 'Singapore Overseas Recruitment & Placement Support'}
                </p>
              </div>
            </button>

            {/* Quick Subpage Back Button for easy return from any subpage */}
            {currentTab !== 'home' && (
              <button
                type="button"
                id="navbar-subpage-back-btn"
                onClick={() => goBack('home')}
                className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 text-xs font-bold text-slate-700 hover:text-red-900 bg-slate-100/90 hover:bg-red-50 border border-slate-200/80 rounded-xl transition-all cursor-pointer group shadow-2xs"
                title="Go Back to Previous View (Esc or Backspace)"
              >
                <ArrowLeft className="w-3.5 h-3.5 text-red-700 group-hover:-translate-x-0.5 transition-transform" />
                <span className="hidden xs:inline font-semibold">Back</span>
                <kbd className="hidden sm:inline-block px-1 py-0.2 text-[9px] font-mono bg-white text-slate-500 rounded border border-slate-200">
                  Esc
                </kbd>
              </button>
            )}

            {/* Direct 1-Click Upload Button for Admins */}
            {isAdmin && (
              <button
                type="button"
                id="admin-direct-logo-upload-btn"
                onClick={() => directLogoInputRef.current?.click()}
                title="Upload custom logo image (PNG/JPG/SVG)"
                className="hidden md:flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-bold text-slate-600 hover:text-red-900 bg-slate-100 hover:bg-red-50 rounded-lg border border-slate-200 transition-colors cursor-pointer"
              >
                <Upload className="w-3 h-3 text-red-900" />
                <span>Upload Logo</span>
              </button>
            )}
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map(link => {
              const active = currentTab === link.id;
              return (
                <button
                  key={link.id}
                  id={`nav-link-${link.id}`}
                  onClick={() => handleNavClick(link.id)}
                  className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
                    active
                      ? 'text-red-900 bg-red-50 font-bold border-b-2 border-red-900'
                      : 'text-slate-700 hover:text-red-900 hover:bg-slate-50'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action Controls */}
          <div className="hidden sm:flex items-center gap-3">


            {/* Auth Buttons */}
            {user ? (
              <div className="flex items-center gap-2">
                {isAdmin ? (
                  <button
                    id="admin-dashboard-nav-btn"
                    onClick={() => handleNavClick('admin')}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      currentTab === 'admin'
                        ? 'bg-stone-900 text-white shadow-md'
                        : 'bg-red-900 text-white hover:bg-red-800'
                    }`}
                  >
                    <Shield className="w-3.5 h-3.5 text-amber-400" />
                    <span>Admin Dashboard</span>
                  </button>
                ) : (
                  <button
                    id="customer-portal-nav-btn"
                    onClick={() => handleNavClick('portal')}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      currentTab === 'portal'
                        ? 'bg-red-900 text-white shadow-md'
                        : 'bg-red-900 text-white hover:bg-red-800'
                    }`}
                  >
                    <User className="w-3.5 h-3.5" />
                    <span>My Applications</span>
                  </button>
                )}
              </div>
            ) : (
              <button
                id="open-candidate-login-btn"
                onClick={() => handleNavClick('candidate-login')}
                className="flex items-center gap-2 px-4 py-2 bg-red-900 hover:bg-red-800 text-white text-xs font-bold rounded-lg shadow-sm hover:shadow-md transition-all cursor-pointer"
              >
                <User className="w-3.5 h-3.5 text-white/90" />
                <span>Candidate Login</span>
              </button>
            )}
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:text-slate-950 hover:bg-slate-100 focus:outline-hidden"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div id="mobile-menu-drawer" className="lg:hidden border-t border-slate-200 bg-white p-4 space-y-3 shadow-xl">
          <div className="space-y-1">
            {navLinks.map(link => {
              const active = currentTab === link.id;
              return (
                <button
                  key={link.id}
                  id={`mobile-nav-${link.id}`}
                  onClick={() => handleNavClick(link.id)}
                  className={`w-full flex items-center justify-between px-4 py-2.5 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
                    active
                      ? 'bg-red-50 text-red-900 font-bold border-l-4 border-red-900'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <span>{link.label}</span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-100 space-y-2">
            {user ? (
              <>
                {isAdmin ? (
                  <button
                    id="mobile-admin-btn"
                    onClick={() => handleNavClick('admin')}
                    className="w-full flex items-center justify-center gap-2 py-3 bg-stone-900 text-white rounded-lg text-xs font-bold shadow-xs cursor-pointer"
                  >
                    <Shield className="w-4 h-4 text-amber-400" />
                    <span>Admin Dashboard</span>
                  </button>
                ) : (
                  <button
                    id="mobile-portal-btn"
                    onClick={() => handleNavClick('portal')}
                    className="w-full flex items-center justify-center gap-2 py-3 bg-red-900 text-white rounded-lg text-xs font-bold shadow-xs cursor-pointer"
                  >
                    <User className="w-4 h-4" />
                    <span>My Applications & Enquiries</span>
                  </button>
                )}

                <button
                  id="mobile-logout-btn"
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2.5 text-red-900 hover:bg-red-50 rounded-lg text-xs font-semibold cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <div className="space-y-2">
                <button
                  id="mobile-candidate-login-btn"
                  onClick={() => handleNavClick('candidate-login')}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-red-900 hover:bg-red-800 text-white rounded-lg text-xs font-bold shadow-md cursor-pointer"
                >
                  <User className="w-4 h-4" />
                  <span>Candidate Mobile Login (OTP)</span>
                </button>
              </div>
            )}

            <div className="grid grid-cols-2 gap-2 pt-2">
              <a
                id="mobile-drawer-call"
                href={`tel:${settings.phone.replace(/\s+/g, '')}`}
                className="flex items-center justify-center gap-1.5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-semibold"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Us</span>
              </a>
              <a
                id="mobile-drawer-whatsapp"
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 py-2.5 bg-red-900 text-white rounded-lg text-xs font-semibold"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {settings.facebookUrl && (
                <a
                  id="mobile-drawer-facebook"
                  href={settings.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 py-2.5 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 rounded-lg text-xs font-bold transition-colors"
                >
                  <Facebook className="w-3.5 h-3.5" />
                  <span>Facebook</span>
                </a>
              )}
              {settings.instagramUrl && (
                <a
                  id="mobile-drawer-instagram"
                  href={settings.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 py-2.5 bg-pink-50 hover:bg-pink-100 text-pink-700 border border-pink-200 rounded-lg text-xs font-bold transition-colors"
                >
                  <Instagram className="w-3.5 h-3.5" />
                  <span>Instagram</span>
                </a>
              )}
            </div>

            {/* Mobile Theme Switcher Button */}
            <div className="pt-1">
              <button
                id="mobile-drawer-theme-btn"
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setThemeModalOpen(true);
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-bold transition-colors cursor-pointer border border-slate-200"
              >
                <Palette className="w-4 h-4 text-red-900" />
                <span>Change Theme & Dark/Light Mode</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Admin Logo & Brand Customizer Modal */}
      <LogoEditModal
        isOpen={logoEditOpen}
        onClose={() => setLogoEditOpen(false)}
      />

      {/* Theme & Appearance Selector Modal */}
      <ThemeSelectorModal
        isOpen={themeModalOpen}
        onClose={() => setThemeModalOpen(false)}
      />
    </header>
  );
};
