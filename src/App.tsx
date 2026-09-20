import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ToastContainer } from './components/ToastContainer';
import { CustomerAuthModal } from './components/CustomerAuthModal';
import { ApplyModal } from './components/ApplyModal';
import { JobDetailsModal } from './components/JobDetailsModal';

import { HomeView } from './views/HomeView';
import { JobsView } from './views/JobsView';
import { AboutUsView } from './views/AboutUsView';
import { VideosView } from './views/VideosView';
import { ContactView } from './views/ContactView';
import { CustomerPortalView } from './views/CustomerPortalView';
import { CandidateLoginView } from './views/CandidateLoginView';
import { AdminLoginView } from './views/AdminLoginView';
import { AdminDashboardView } from './views/AdminDashboardView';
import { TravelESimView } from './views/TravelESimView';
import { GoogleReviewsSection } from './components/GoogleReviewsSection';
import { SubpageBackButton } from './components/SubpageBackButton';

import { MessageSquare } from 'lucide-react';

const MainAppContent: React.FC = () => {
  const {
    currentTab,
    setCurrentTab,
    goBack,
    jobs,
    selectedJob,
    setSelectedJob,
    applyModalJob,
    setApplyModalJob,
    settings
  } = useApp();
  const { user, isAdmin } = useAuth();
  const [jobSearchQuery, setJobSearchQuery] = useState('');
  const [jobCategoryQuery, setJobCategoryQuery] = useState('All');

  // Auto-open job details when URL contains ?job=<jobId>
  React.useEffect(() => {
    try {
      const searchParams = new URLSearchParams(window.location.search);
      const jobId = searchParams.get('job');
      if (jobId && jobs.length > 0 && !selectedJob) {
        const found = jobs.find(j => j.id.toLowerCase() === jobId.toLowerCase());
        if (found) {
          setSelectedJob(found);
        }
      }
    } catch {}
  }, [jobs, selectedJob, setSelectedJob]);

  // Global Back Key Handler across entire application
  React.useEffect(() => {
    const handleGlobalBackKey = (e: KeyboardEvent) => {
      const activeEl = document.activeElement as HTMLElement | null;
      const isInputFocused =
        activeEl &&
        (activeEl.tagName === 'INPUT' ||
          activeEl.tagName === 'TEXTAREA' ||
          activeEl.tagName === 'SELECT' ||
          activeEl.isContentEditable);

      // 1. ESCAPE KEY
      if (e.key === 'Escape') {
        if (selectedJob) {
          setSelectedJob(null);
          e.preventDefault();
          return;
        }
        if (applyModalJob) {
          setApplyModalJob(null);
          e.preventDefault();
          return;
        }
        if (currentTab !== 'home') {
          goBack();
          e.preventDefault();
          return;
        }
      }

      // 2. ALT + LEFT ARROW (Browser back shortcut)
      if (e.altKey && e.key === 'ArrowLeft') {
        if (selectedJob) {
          setSelectedJob(null);
          e.preventDefault();
          return;
        }
        if (applyModalJob) {
          setApplyModalJob(null);
          e.preventDefault();
          return;
        }
        if (currentTab !== 'home') {
          goBack();
          e.preventDefault();
          return;
        }
      }

      // 3. BACKSPACE KEY (outside form fields)
      if (e.key === 'Backspace' && !isInputFocused) {
        if (selectedJob) {
          setSelectedJob(null);
          e.preventDefault();
          return;
        }
        if (applyModalJob) {
          setApplyModalJob(null);
          e.preventDefault();
          return;
        }
        if (currentTab !== 'home') {
          goBack();
          e.preventDefault();
          return;
        }
      }
    };

    window.addEventListener('keydown', handleGlobalBackKey);
    return () => window.removeEventListener('keydown', handleGlobalBackKey);
  }, [currentTab, goBack, selectedJob, setSelectedJob, applyModalJob, setApplyModalJob]);

  const handleHeroSearch = (keyword: string, category: string) => {
    setJobSearchQuery(keyword);
    setJobCategoryQuery(category);
    setCurrentTab('jobs');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getWhatsAppFloatingUrl = () => {
    const raw = settings.whatsappNumber.replace(/\D/g, '') || '7418845083';
    return `https://wa.me/91${raw.slice(-10)}?text=${encodeURIComponent('Hello Arudhra Consultancy, I would like to enquire about Singapore overseas recruitment and placement support.')}`;
  };

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden flex flex-col bg-white text-slate-900 font-sans antialiased selection:bg-red-900 selection:text-white">
      {/* Global Navigation Header */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-full overflow-x-hidden">
        {currentTab === 'home' && <HomeView onSearch={handleHeroSearch} />}
        {currentTab === 'jobs' && (
          <JobsView initialSearch={jobSearchQuery} initialCategory={jobCategoryQuery} />
        )}
        {currentTab === 'about' && <AboutUsView />}
        {currentTab === 'videos' && <VideosView />}
        {currentTab === 'esim' && <TravelESimView />}
        {currentTab === 'reviews' && (
          <div className="py-8 bg-slate-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
              <SubpageBackButton label="Back to Home" currentPageTitle="Candidate & Google Reviews" fallbackTab="home" />
            </div>
            <GoogleReviewsSection />
          </div>
        )}
        {currentTab === 'contact' && <ContactView />}
        {(currentTab === 'candidate-login' || currentTab === 'register') && <CandidateLoginView />}
        {currentTab === 'portal' && (user ? <CustomerPortalView /> : <CandidateLoginView />)}
        {currentTab === 'admin-login' && <AdminLoginView />}
        {currentTab === 'admin' && (isAdmin ? <AdminDashboardView /> : <AdminLoginView />)}
      </main>

      {/* Global Modals & Notifications */}
      <CustomerAuthModal />
      <ApplyModal />
      <JobDetailsModal job={selectedJob} onClose={() => setSelectedJob(null)} />
      <ToastContainer />

      {/* Floating WhatsApp Action Button */}
      <aside
        aria-label="Contact Arudhra Consultancy on WhatsApp"
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2 group"
      >
        {/* Descriptive Tooltip / Small Label */}
        <div
          id="floating-whatsapp-tooltip"
          role="tooltip"
          className="pointer-events-none opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0 bg-slate-900 text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow-lg border border-slate-700/60 flex items-center gap-1.5 whitespace-nowrap"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>Support</span>
        </div>

        <a
          id="floating-whatsapp-btn"
          href={getWhatsAppFloatingUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="relative flex items-center justify-center w-14 h-14 bg-red-900 hover:bg-red-800 text-white rounded-full shadow-2xl hover:scale-105 transition-all duration-300 border-2 border-white focus:outline-hidden focus:ring-2 focus:ring-red-600 focus:ring-offset-2"
          aria-label="Chat with Support on WhatsApp"
          title="Chat with Support on WhatsApp"
        >
          <MessageSquare className="w-7 h-7" />
          <span className="sr-only">Chat with Support on WhatsApp</span>
        </a>
      </aside>

      {/* Global Footer */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <MainAppContent />
      </AppProvider>
    </AuthProvider>
  );
}
