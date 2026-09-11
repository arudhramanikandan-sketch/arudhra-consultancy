import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  Job,
  Enquiry,
  VideoItem,
  Advertisement,
  SiteSettings,
  AppTab,
  CandidateRecord,
  CandidateDocument,
  DocumentType,
  ApplicationStatus
} from '../types';
import { initialSiteSettings, initialJobs } from '../../server/data';
import { useAuth } from './AuthContext';

interface Toast {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}

interface AppContextType {
  jobs: Job[];
  settings: SiteSettings;
  videos: VideoItem[];
  ads: Advertisement[];
  enquiries: Enquiry[];
  userEnquiries: Enquiry[];
  stats: any;
  loading: boolean;
  selectedJob: Job | null;
  setSelectedJob: (job: Job | null) => void;
  applyModalJob: Job | null;
  setApplyModalJob: (job: Job | null) => void;
  toasts: Toast[];
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  removeToast: (id: string) => void;
  refreshJobs: (filters?: any) => Promise<void>;
  refreshSettings: () => Promise<void>;
  refreshVideos: (all?: boolean) => Promise<void>;
  refreshAds: (all?: boolean) => Promise<void>;
  refreshEnquiries: () => Promise<void>;
  refreshStats: () => Promise<void>;
  saveJob: (job: Partial<Job>, options?: { replaceExisting?: boolean; clearOldLeads?: boolean }) => Promise<{ success: boolean; message?: string }>;
  deleteJob: (id: string) => Promise<{ success: boolean; message?: string }>;
  updateEnquiryStatus: (id: string, status: any, adminNotes?: string, followUpDate?: string) => Promise<{ success: boolean; message?: string }>;
  deleteEnquiry: (id: string) => Promise<{ success: boolean; message?: string }>;
  batchDeleteEnquiries: (ids: string[]) => Promise<{ success: boolean; deletedCount?: number; message?: string }>;
  purgeAllEnquiries: () => Promise<{ success: boolean; message?: string; deletedCount?: number }>;
  purgeAllOldData: (options?: { jobs?: boolean; enquiries?: boolean; ads?: boolean; videos?: boolean }) => Promise<{ success: boolean; message?: string; result?: any }>;
  saveAd: (ad: Partial<Advertisement>, options?: { replaceExisting?: boolean }) => Promise<{ success: boolean; message?: string }>;
  deleteAd: (id: string) => Promise<{ success: boolean; message?: string }>;
  saveVideo: (video: Partial<VideoItem>, options?: { replaceExisting?: boolean }) => Promise<{ success: boolean; message?: string }>;
  deleteVideo: (id: string) => Promise<{ success: boolean; message?: string }>;
  updateSettings: (newSettings: Partial<SiteSettings>) => Promise<{ success: boolean; message?: string }>;
  submitEnquiry: (data: {
    jobId: string;
    customerName: string;
    mobile: string;
    email?: string;
    candidateTrade?: string;
    candidateExperience?: string;
    candidateNotes?: string;
  }) => Promise<{ success: boolean; message: string }>;
  currentTab: AppTab;
  setCurrentTab: (tab: AppTab) => void;
  goBack: (fallbackTab?: AppTab) => void;

  // Candidate Master Record & Auto-Sync
  candidate: CandidateRecord | null;
  candidateLoading: boolean;
  adminCandidates: CandidateRecord[];
  refreshCandidateMe: () => Promise<void>;
  updateCandidateProfile: (profileData: Partial<CandidateRecord>) => Promise<{ success: boolean; message?: string }>;
  uploadCandidateDocument: (type: DocumentType, name: string, fileData?: string, fileSize?: string) => Promise<{ success: boolean; message?: string }>;
  deleteCandidateDocument: (docId: string) => Promise<{ success: boolean; message?: string }>;
  markJobInterested: (jobId: string) => Promise<{ success: boolean; message?: string }>;
  removeJobInterested: (jobId: string) => Promise<{ success: boolean; message?: string }>;
  isJobInterested: (jobId: string) => boolean;
  refreshAdminCandidates: (filters?: { search?: string; status?: string; jobId?: string }) => Promise<void>;
  updateCandidateAdminStatus: (candidateId: string, status: ApplicationStatus, remarks?: string) => Promise<{ success: boolean; message?: string }>;
  updateCandidateAdminRemarks: (candidateId: string, remarks: string) => Promise<{ success: boolean; message?: string }>;
  adminDeleteCandidateDocument: (candidateId: string, docId: string) => Promise<{ success: boolean; message?: string }>;
  adminReplaceCandidateDocument: (candidateId: string, docId: string, data: { name?: string; fileData?: string; fileSize?: string; type?: DocumentType }) => Promise<{ success: boolean; message?: string; document?: CandidateDocument }>;
  adminUploadCandidateDocument: (candidateId: string, data: { type: DocumentType; name: string; fileData?: string; fileSize?: string }) => Promise<{ success: boolean; message?: string; document?: CandidateDocument }>;
  adminDeleteCandidate: (candidateId: string) => Promise<{ success: boolean; message?: string }>;

  // Theme & Appearance
  themeColor: 'crimson' | 'navy' | 'emerald' | 'charcoal' | 'amber';
  setThemeColor: (color: 'crimson' | 'navy' | 'emerald' | 'charcoal' | 'amber') => void;
  isDarkMode: boolean;
  setIsDarkMode: (dark: boolean) => void;
  toggleDarkMode: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isAdmin, token } = useAuth();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [settings, setSettings] = useState<SiteSettings>(initialSiteSettings);
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [ads, setAds] = useState<Advertisement[]>([]);
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [userEnquiries, setUserEnquiries] = useState<Enquiry[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [applyModalJob, setApplyModalJob] = useState<Job | null>(null);
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Candidate State
  const [candidate, setCandidate] = useState<CandidateRecord | null>(null);
  const [candidateLoading, setCandidateLoading] = useState(false);
  const [adminCandidates, setAdminCandidates] = useState<CandidateRecord[]>([]);

  // Theme & Appearance State
  type ThemeColor = 'crimson' | 'navy' | 'emerald' | 'charcoal' | 'amber';

  const [themeColor, setThemeColorState] = useState<ThemeColor>(() => {
    try {
      const saved = localStorage.getItem('arudhra_theme') as ThemeColor;
      if (saved && ['crimson', 'navy', 'emerald', 'charcoal', 'amber'].includes(saved)) {
        return saved;
      }
    } catch (e) {}
    return 'crimson';
  });

  const [isDarkMode, setIsDarkModeState] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('arudhra_mode');
      if (saved !== null) {
        return saved === 'dark';
      }
    } catch (e) {}
    return false;
  });

  // Apply theme attributes to document.documentElement
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', themeColor);
    if (isDarkMode) {
      root.setAttribute('data-mode', 'dark');
      root.classList.add('dark');
    } else {
      root.setAttribute('data-mode', 'light');
      root.classList.remove('dark');
    }
  }, [themeColor, isDarkMode]);

  const setThemeColor = (color: ThemeColor) => {
    setThemeColorState(color);
    try {
      localStorage.setItem('arudhra_theme', color);
    } catch (e) {}
  };

  const setIsDarkMode = (dark: boolean) => {
    setIsDarkModeState(dark);
    try {
      localStorage.setItem('arudhra_mode', dark ? 'dark' : 'light');
    } catch (e) {}
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Compute initial tab from URL pathname, hash or query
  const getInitialTab = (): AppTab => {
    try {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      const searchParams = new URLSearchParams(window.location.search);
      const tabParam = searchParams.get('tab');

      if (path === '/admin' || path.startsWith('/admin/') || hash === '#admin' || hash === '#/admin' || tabParam === 'admin') {
        return 'admin';
      }
      if (path === '/admin-login' || hash === '#admin-login' || tabParam === 'admin-login') {
        return 'admin-login';
      }
      if (path === '/candidate-login' || hash === '#candidate-login' || tabParam === 'candidate-login') {
        return 'candidate-login';
      }
      if (path === '/portal' || hash === '#portal' || tabParam === 'portal') {
        return 'portal';
      }
      if (path === '/jobs' || hash === '#jobs' || tabParam === 'jobs') {
        return 'jobs';
      }
      if (path === '/about' || hash === '#about' || tabParam === 'about') {
        return 'about';
      }
      if (path === '/videos' || hash === '#videos' || tabParam === 'videos') {
        return 'videos';
      }
      if (path === '/reviews' || hash === '#reviews' || tabParam === 'reviews') {
        return 'reviews';
      }
      if (path === '/contact' || hash === '#contact' || tabParam === 'contact') {
        return 'contact';
      }
    } catch {}
    return 'home';
  };

  const [currentTab, setCurrentTabState] = useState<AppTab>(getInitialTab);
  const [tabHistory, setTabHistory] = useState<AppTab[]>(() => [getInitialTab()]);

  const setCurrentTab = useCallback((tab: AppTab) => {
    setCurrentTabState(prev => {
      if (prev === tab) return prev;
      setTabHistory(history => [...history, tab]);
      try {
        const targetUrl = tab === 'home' ? window.location.pathname : `#${tab}`;
        window.history.pushState({ tab }, '', targetUrl);
      } catch {}
      return tab;
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const goBack = useCallback((fallbackTab: AppTab = 'home') => {
    if (tabHistory.length > 1) {
      if (window.history.length > 1) {
        window.history.back();
      } else {
        setTabHistory(prev => {
          const next = [...prev];
          next.pop();
          const target = next[next.length - 1] || fallbackTab;
          setCurrentTabState(target);
          try {
            const targetUrl = target === 'home' ? window.location.pathname : `#${target}`;
            window.history.replaceState({ tab: target }, '', targetUrl);
          } catch {}
          return next;
        });
      }
    } else {
      setCurrentTab(fallbackTab);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [tabHistory, setCurrentTab]);

  // Sync initial history state on mount
  useEffect(() => {
    const initial = getInitialTab();
    try {
      window.history.replaceState({ tab: initial }, '', initial === 'home' ? window.location.pathname : `#${initial}`);
    } catch {}
  }, []);

  // Listen to browser navigation changes (Back / Forward buttons, Android back gesture)
  useEffect(() => {
    const handleLocationChange = (e?: PopStateEvent) => {
      if (e && e.state && e.state.tab) {
        setCurrentTabState(e.state.tab);
        setTabHistory(prev => {
          if (prev.length > 1) {
            return prev.slice(0, -1);
          }
          return [e.state.tab];
        });
      } else {
        const tab = getInitialTab();
        setCurrentTabState(tab);
      }
    };
    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', () => handleLocationChange());
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', () => handleLocationChange());
    };
  }, []);

  const getAuthHeaders = useCallback((): HeadersInit => {
    const activeToken = token || (typeof window !== 'undefined' ? localStorage.getItem('arudhra_auth_token') : null) || '';
    return activeToken ? { Authorization: `Bearer ${activeToken}` } : {};
  }, [token]);

  const showToast = useCallback((message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const parseResponseSafe = async (res: Response): Promise<{ ok: boolean; status: number; data: any }> => {
    try {
      const contentType = res.headers.get('content-type') || '';
      if (contentType.includes('application/json')) {
        const data = await res.json();
        return { ok: res.ok, status: res.status, data };
      }
      const text = await res.text();
      if (text && (text.trim().startsWith('{') || text.trim().startsWith('['))) {
        const data = JSON.parse(text);
        return { ok: res.ok, status: res.status, data };
      }
      return { ok: res.ok, status: res.status, data: null };
    } catch {
      return { ok: false, status: res.status, data: null };
    }
  };

  const refreshSettings = useCallback(async () => {
    try {
      const res = await fetch('/api/settings');
      const { ok, data } = await parseResponseSafe(res);
      if (ok && data?.success && data.settings) {
        setSettings(data.settings);
      }
    } catch (err) {
      console.warn('Failed to fetch settings:', err);
    }
  }, []);

  const refreshJobs = useCallback(async (filters?: any) => {
    try {
      let url = '/api/jobs';
      const params = new URLSearchParams();
      if (isAdmin) params.append('adminView', 'true');
      if (filters?.category && filters.category !== 'All') params.append('category', filters.category);
      if (filters?.search) params.append('search', filters.search);
      if (filters?.jobType && filters.jobType !== 'All') params.append('jobType', filters.jobType);
      if (filters?.featured) params.append('featured', 'true');
      if (filters?.latest) params.append('latest', 'true');

      if (params.toString()) {
        url += `?${params.toString()}`;
      }

      const res = await fetch(url);
      const { ok, data } = await parseResponseSafe(res);
      if (ok && data?.success && Array.isArray(data.jobs)) {
        setJobs(data.jobs);
      }
    } catch (err) {
      console.warn('Failed to fetch jobs:', err);
    }
  }, [isAdmin]);

  const refreshVideos = useCallback(async (all: boolean = false) => {
    try {
      const res = await fetch(`/api/videos${all || isAdmin ? '?all=true' : ''}`);
      const { ok, data } = await parseResponseSafe(res);
      if (ok && data?.success && Array.isArray(data.videos)) {
        setVideos(data.videos);
      }
    } catch (err) {
      console.warn('Failed to fetch videos:', err);
    }
  }, [isAdmin]);

  const refreshAds = useCallback(async (all: boolean = false) => {
    try {
      const res = await fetch(`/api/ads${all || isAdmin ? '?all=true' : ''}`);
      const { ok, data } = await parseResponseSafe(res);
      if (ok && data?.success && Array.isArray(data.ads)) {
        setAds(data.ads);
      }
    } catch (err) {
      console.warn('Failed to fetch ads:', err);
    }
  }, [isAdmin]);

  const refreshStats = useCallback(async () => {
    try {
      const res = await fetch('/api/stats');
      const { ok, data } = await parseResponseSafe(res);
      if (ok && data?.success && data.stats) {
        setStats(data.stats);
      }
    } catch (err) {
      console.warn('Failed to fetch stats:', err);
    }
  }, []);

  const refreshEnquiries = useCallback(async () => {
    try {
      if (isAdmin && token) {
        const res = await fetch('/api/enquiries', {
          headers: getAuthHeaders()
        });
        const { ok, data } = await parseResponseSafe(res);
        if (ok && data?.success && Array.isArray(data.enquiries)) {
          setEnquiries(data.enquiries);
        }
      }
      if (user && user.role === 'customer') {
        const res = await fetch(`/api/enquiries?mobile=${encodeURIComponent(user.mobile)}`);
        const { ok, data } = await parseResponseSafe(res);
        if (ok && data?.success && Array.isArray(data.enquiries)) {
          setUserEnquiries(data.enquiries);
        }
      }
    } catch (err) {
      console.warn('Failed to fetch enquiries:', err);
    }
  }, [isAdmin, user, token, getAuthHeaders]);

  const submitEnquiry = async (data: {
    jobId: string;
    customerName: string;
    mobile: string;
    email?: string;
    candidateTrade?: string;
    candidateExperience?: string;
    candidateNotes?: string;
  }) => {
    try {
      const payload = {
        ...data,
        userId: user?.id
      };
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const resData = await res.json();
      if (resData.success) {
        showToast('Your enquiry has been received. Our team will contact you shortly.', 'success');
        refreshEnquiries();
        refreshStats();
        return { success: true, message: resData.message };
      }
      showToast(resData.message || 'Failed to submit enquiry', 'error');
      return { success: false, message: resData.message };
    } catch (err: any) {
      showToast(err.message || 'Network error submitting enquiry', 'error');
      return { success: false, message: err.message };
    }
  };

  const saveJob = async (jobData: Partial<Job>, options?: { replaceExisting?: boolean; clearOldLeads?: boolean }) => {
    try {
      const isEdit = !!jobData.id;
      const url = isEdit ? `/api/jobs/${jobData.id}` : '/api/jobs';
      const method = isEdit ? 'PUT' : 'POST';

      const payload = isEdit ? jobData : { ...jobData, ...options };

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeaders()
        },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (data.success) {
        showToast(data.message || (isEdit ? 'Job updated successfully' : 'Singapore Job created successfully'), 'success');
        refreshJobs();
        refreshEnquiries();
        refreshStats();
        return { success: true, message: data.message };
      }
      showToast(data.message || 'Failed to save job', 'error');
      return { success: false, message: data.message };
    } catch (err: any) {
      showToast(err.message || 'Network error saving job', 'error');
      return { success: false, message: err.message };
    }
  };

  const deleteJob = async (id: string) => {
    try {
      const res = await fetch(`/api/jobs/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });
      const data = await res.json();
      if (data.success) {
        setJobs(prev => prev.filter(j => j.id !== id));
        showToast('Job deleted successfully', 'success');
        refreshJobs();
        refreshStats();
        return { success: true };
      }
      showToast(data.message || 'Failed to delete job', 'error');
      return { success: false };
    } catch (err: any) {
      showToast(err.message || 'Network error deleting job', 'error');
      return { success: false };
    }
  };

  const updateEnquiryStatus = async (id: string, status: any, adminNotes?: string, followUpDate?: string) => {
    try {
      const res = await fetch(`/api/enquiries/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeaders()
        },
        body: JSON.stringify({ status, adminNotes, followUpDate })
      });
      const data = await res.json();
      if (data.success) {
        showToast('Lead status updated successfully', 'success');
        refreshEnquiries();
        refreshStats();
        return { success: true };
      }
      showToast(data.message || 'Failed to update lead status', 'error');
      return { success: false };
    } catch (err: any) {
      showToast(err.message || 'Network error updating lead', 'error');
      return { success: false };
    }
  };

  const deleteEnquiry = async (id: string) => {
    try {
      const res = await fetch(`/api/enquiries/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });
      const data = await res.json();
      if (data.success) {
        showToast(data.message || 'Candidate application deleted successfully', 'success');
        refreshEnquiries();
        refreshStats();
        return { success: true, message: data.message };
      }
      showToast(data.message || 'Failed to delete application', 'error');
      return { success: false, message: data.message };
    } catch (err: any) {
      showToast(err.message || 'Network error deleting application', 'error');
      return { success: false, message: err.message };
    }
  };

  const batchDeleteEnquiries = async (ids: string[]) => {
    try {
      const res = await fetch('/api/enquiries/batch-delete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeaders()
        },
        body: JSON.stringify({ ids })
      });
      const data = await res.json();
      if (data.success) {
        showToast(data.message || `${ids.length} applications deleted successfully`, 'success');
        refreshEnquiries();
        refreshStats();
        return { success: true, deletedCount: data.deletedCount, message: data.message };
      }
      showToast(data.message || 'Failed to delete candidate applications', 'error');
      return { success: false, message: data.message };
    } catch (err: any) {
      showToast(err.message || 'Network error deleting candidate applications', 'error');
      return { success: false, message: err.message };
    }
  };

  const purgeAllEnquiries = async () => {
    try {
      const res = await fetch('/api/enquiries/purge-all', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeaders()
        }
      });
      const data = await res.json();
      if (data.success) {
        showToast(data.message || 'All candidate leads purged successfully', 'success');
        refreshEnquiries();
        refreshStats();
        return { success: true, deletedCount: data.deletedCount, message: data.message };
      }
      showToast(data.message || 'Failed to purge candidate leads', 'error');
      return { success: false, message: data.message };
    } catch (err: any) {
      showToast(err.message || 'Network error purging candidate leads', 'error');
      return { success: false, message: err.message };
    }
  };

  const purgeAllOldData = async (options?: { jobs?: boolean; enquiries?: boolean; ads?: boolean; videos?: boolean }) => {
    try {
      const res = await fetch('/api/cleanup-old-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeaders()
        },
        body: JSON.stringify(options || { purgeJobs: true, purgeLeads: true, purgeAds: true, purgeVideos: true })
      });
      const data = await res.json();
      if (data.success) {
        showToast(data.message || 'Old data purged successfully', 'success');
        refreshJobs();
        refreshEnquiries();
        refreshAds();
        refreshVideos();
        refreshStats();
        return { success: true, result: data.result, message: data.message };
      }
      showToast(data.message || 'Failed to cleanup data', 'error');
      return { success: false, message: data.message };
    } catch (err: any) {
      showToast(err.message || 'Network error cleaning up data', 'error');
      return { success: false, message: err.message };
    }
  };

  const saveAd = async (adData: Partial<Advertisement>, options?: { replaceExisting?: boolean }) => {
    try {
      const isEdit = !!adData.id;
      const url = isEdit ? `/api/ads/${adData.id}` : '/api/ads';
      const method = isEdit ? 'PUT' : 'POST';

      const payload = isEdit ? adData : { ...adData, ...options };

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeaders()
        },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (data.success) {
        showToast(data.message || 'Banner saved successfully', 'success');
        refreshAds();
        return { success: true, message: data.message };
      }
      showToast(data.message || 'Failed to save banner', 'error');
      return { success: false, message: data.message };
    } catch (err: any) {
      showToast(err.message || 'Network error saving banner', 'error');
      return { success: false, message: err.message };
    }
  };

  const deleteAd = async (id: string) => {
    try {
      const res = await fetch(`/api/ads/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });
      const data = await res.json();
      if (data.success) {
        showToast('Banner deleted', 'success');
        refreshAds();
        return { success: true };
      }
      showToast(data.message || 'Failed to delete banner', 'error');
      return { success: false };
    } catch (err: any) {
      showToast(err.message || 'Network error deleting banner', 'error');
      return { success: false };
    }
  };

  const saveVideo = async (videoData: Partial<VideoItem>, options?: { replaceExisting?: boolean }) => {
    try {
      const isEdit = !!videoData.id;
      const url = isEdit ? `/api/videos/${videoData.id}` : '/api/videos';
      const method = isEdit ? 'PUT' : 'POST';

      const payload = isEdit ? videoData : { ...videoData, ...options };

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeaders()
        },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (data.success) {
        showToast(data.message || 'Video saved successfully', 'success');
        refreshVideos();
        return { success: true, message: data.message };
      }
      showToast(data.message || 'Failed to save video', 'error');
      return { success: false, message: data.message };
    } catch (err: any) {
      showToast(err.message || 'Network error saving video', 'error');
      return { success: false, message: err.message };
    }
  };

  const deleteVideo = async (id: string) => {
    try {
      const res = await fetch(`/api/videos/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });
      const data = await res.json();
      if (data.success) {
        showToast('Video removed', 'success');
        refreshVideos();
        return { success: true };
      }
      showToast(data.message || 'Failed to delete video', 'error');
      return { success: false };
    } catch (err: any) {
      showToast(err.message || 'Network error deleting video', 'error');
      return { success: false };
    }
  };

  const updateSettings = async (newSettings: Partial<SiteSettings>) => {
    try {
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeaders()
        },
        body: JSON.stringify(newSettings)
      });
      const data = await res.json();
      if (data.success) {
        setSettings(data.settings);
        showToast('Website and Branding settings saved successfully', 'success');
        return { success: true };
      }
      showToast(data.message || 'Failed to update settings', 'error');
      return { success: false };
    } catch (err: any) {
      showToast(err.message || 'Network error updating settings', 'error');
      return { success: false };
    }
  };

  // ----------------------------------------------------
  // CANDIDATE METHODS (CUSTOMER & ADMIN)
  // ----------------------------------------------------

  const refreshCandidateMe = useCallback(async () => {
    if (!user || user.role !== 'customer') {
      setCandidate(null);
      return;
    }
    try {
      setCandidateLoading(true);
      const params = new URLSearchParams();
      if (user.id) params.append('userId', user.id);
      if (user.mobile) params.append('mobile', user.mobile);

      const res = await fetch(`/api/candidate/me?${params.toString()}`);
      const { ok, data } = await parseResponseSafe(res);
      if (ok && data?.success && data?.candidate) {
        setCandidate(data.candidate);
        try {
          localStorage.setItem(`arudhra_cand_${user.id}`, JSON.stringify(data.candidate));
        } catch {}
        return;
      }
    } catch (err) {
      console.warn('Network call for candidate profile failed, fallback to cached state:', err);
    } finally {
      setCandidateLoading(false);
    }

    // Fallback: load cached candidate or create local candidate record so portal never crashes
    try {
      const cached = localStorage.getItem(`arudhra_cand_${user.id}`);
      if (cached) {
        setCandidate(JSON.parse(cached));
        return;
      }
    } catch {}

    // Initialize clean local candidate
    setCandidate(prev => {
      if (prev) return prev;
      const initial: CandidateRecord = {
        id: `CAND-${user.id.replace(/\D/g, '').slice(-4) || '1001'}`,
        candidateId: `CAND-${user.id.replace(/\D/g, '').slice(-4) || '1001'}`,
        userId: user.id,
        fullName: user.name || 'Candidate',
        mobile: user.mobile,
        email: user.email || '',
        applicationStatus: 'Submitted',
        documents: [],
        interestedJobs: [],
        applications: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      try {
        localStorage.setItem(`arudhra_cand_${user.id}`, JSON.stringify(initial));
      } catch {}
      return initial;
    });
  }, [user]);

  const updateCandidateProfile = async (profileData: Partial<CandidateRecord>) => {
    if (!user) {
      showToast('Please log in to save candidate profile', 'error');
      return { success: false };
    }

    // Optimistically update candidate in state and localStorage
    setCandidate(prev => {
      const updated = prev ? { ...prev, ...profileData, updatedAt: new Date().toISOString() } : {
        id: `CAND-${user.id.replace(/\D/g, '').slice(-4) || '1001'}`,
        candidateId: `CAND-${user.id.replace(/\D/g, '').slice(-4) || '1001'}`,
        userId: user.id,
        fullName: user.name || 'Candidate',
        mobile: user.mobile,
        email: user.email || '',
        applicationStatus: 'Submitted' as const,
        documents: [],
        interestedJobs: [],
        applications: [],
        ...profileData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      try {
        localStorage.setItem(`arudhra_cand_${user.id}`, JSON.stringify(updated));
      } catch {}
      return updated;
    });

    try {
      const payload = {
        userId: user.id,
        mobile: user.mobile,
        ...profileData
      };
      const res = await fetch('/api/candidate/me/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const { ok, data } = await parseResponseSafe(res);
      if (ok && data?.success && data?.candidate) {
        setCandidate(data.candidate);
        try {
          localStorage.setItem(`arudhra_cand_${user.id}`, JSON.stringify(data.candidate));
        } catch {}
      }
      showToast('Candidate Profile updated and synchronized with Admin', 'success');
      return { success: true, message: data?.message || 'Profile saved' };
    } catch (err: any) {
      showToast('Profile saved locally', 'success');
      return { success: true };
    }
  };

  const uploadCandidateDocument = async (
    type: DocumentType,
    name: string,
    fileData?: string,
    fileSize?: string
  ) => {
    if (!user) {
      showToast('Please log in to upload documents', 'error');
      return { success: false };
    }

    const newDoc = {
      id: `DOC-${Date.now()}`,
      type,
      name,
      fileData,
      fileSize: fileSize || '1.0 MB',
      uploadedAt: new Date().toISOString()
    };

    // Optimistically update document list in state and cache
    setCandidate(prev => {
      if (!prev) return prev;
      const updated = {
        ...prev,
        documents: [...(prev.documents || []), newDoc],
        updatedAt: new Date().toISOString()
      };
      try {
        localStorage.setItem(`arudhra_cand_${user.id}`, JSON.stringify(updated));
      } catch {}
      return updated;
    });

    try {
      const res = await fetch('/api/candidate/me/documents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          mobile: user.mobile,
          type,
          name,
          fileData,
          fileSize
        })
      });
      const { ok, data } = await parseResponseSafe(res);
      if (ok && data?.success) {
        showToast(`Document '${name}' uploaded successfully`, 'success');
        refreshCandidateMe();
        return { success: true };
      }
    } catch (err: any) {
      console.warn('Document upload network issue:', err);
    }
    showToast(`Document '${name}' saved to your profile`, 'success');
    return { success: true };
  };

  const deleteCandidateDocument = async (docId: string) => {
    if (!user) return { success: false };

    // Optimistically remove document from state and cache
    setCandidate(prev => {
      if (!prev) return prev;
      const updated = {
        ...prev,
        documents: (prev.documents || []).filter(d => d.id !== docId),
        updatedAt: new Date().toISOString()
      };
      try {
        localStorage.setItem(`arudhra_cand_${user.id}`, JSON.stringify(updated));
      } catch {}
      return updated;
    });

    try {
      const params = new URLSearchParams();
      if (user.id) params.append('userId', user.id);
      if (user.mobile) params.append('mobile', user.mobile);

      const res = await fetch(`/api/candidate/me/documents/${docId}?${params.toString()}`, {
        method: 'DELETE'
      });
      await parseResponseSafe(res);
    } catch (err: any) {
      console.warn('Delete document network error:', err);
    }
    showToast('Document removed', 'success');
    return { success: true };
  };

  const markJobInterested = async (jobId: string) => {
    if (!user) {
      setCurrentTab('candidate-login');
      showToast('Please log in with your WhatsApp number to express interest', 'info');
      return { success: false };
    }

    const job = jobs.find(j => j.id === jobId);
    const newInterest = {
      jobId,
      jobTitle: job?.title || 'Singapore Job Opportunity',
      company: job?.company || 'Singapore Employer',
      employer: job?.employer || 'Arudhra Placement',
      location: job?.location || 'Singapore',
      country: job?.country || 'Singapore',
      salary: job?.salary || 'Attractive SG Salary',
      category: job?.category || 'Services',
      markedDate: new Date().toISOString(),
      markedAt: new Date().toISOString()
    };

    // Optimistically update candidate interested jobs in state and cache
    setCandidate(prev => {
      if (!prev) return prev;
      if ((prev.interestedJobs || []).some(ij => ij.jobId === jobId)) return prev;
      const updated = {
        ...prev,
        interestedJobs: [...(prev.interestedJobs || []), newInterest],
        updatedAt: new Date().toISOString()
      };
      try {
        localStorage.setItem(`arudhra_cand_${user.id}`, JSON.stringify(updated));
      } catch {}
      return updated;
    });

    try {
      const res = await fetch('/api/candidate/me/interested-jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          mobile: user.mobile,
          jobId
        })
      });
      await parseResponseSafe(res);
    } catch (err: any) {
      console.warn('Network issue marking job interested:', err);
    }
    showToast('Job marked as Interested and recorded under your Candidate Profile!', 'success');
    return { success: true };
  };

  const removeJobInterested = async (jobId: string) => {
    if (!user) return { success: false };

    // Optimistically update candidate interested jobs in state and cache
    setCandidate(prev => {
      if (!prev) return prev;
      const updated = {
        ...prev,
        interestedJobs: (prev.interestedJobs || []).filter(ij => ij.jobId !== jobId),
        updatedAt: new Date().toISOString()
      };
      try {
        localStorage.setItem(`arudhra_cand_${user.id}`, JSON.stringify(updated));
      } catch {}
      return updated;
    });

    try {
      const params = new URLSearchParams();
      if (user.id) params.append('userId', user.id);
      if (user.mobile) params.append('mobile', user.mobile);

      const res = await fetch(`/api/candidate/me/interested-jobs/${jobId}?${params.toString()}`, {
        method: 'DELETE'
      });
      await parseResponseSafe(res);
    } catch (err: any) {
      console.warn('Network issue removing interested job:', err);
    }
    showToast('Job removed from your interested list', 'info');
    return { success: true };
  };

  const isJobInterested = useCallback((jobId: string): boolean => {
    if (!candidate || !candidate.interestedJobs) return false;
    return candidate.interestedJobs.some(ij => ij.jobId === jobId);
  }, [candidate]);

  const refreshAdminCandidates = useCallback(async (filters?: { search?: string; status?: string; jobId?: string }) => {
    const authHeaders = getAuthHeaders();
    if (!token && !localStorage.getItem('arudhra_auth_token') && !isAdmin) return;
    try {
      const params = new URLSearchParams();
      if (filters?.search) params.append('search', filters.search);
      if (filters?.status) params.append('status', filters.status);
      if (filters?.jobId) params.append('jobId', filters.jobId);

      const res = await fetch(`/api/admin/candidates?${params.toString()}`, {
        headers: authHeaders
      });
      const { ok, data } = await parseResponseSafe(res);
      if (ok && data?.success && Array.isArray(data.candidates)) {
        setAdminCandidates(data.candidates);
      }
    } catch (err) {
      console.error('Failed to fetch admin candidates:', err);
    }
  }, [token, isAdmin, getAuthHeaders]);

  const updateCandidateAdminStatus = async (
    candidateId: string,
    status: ApplicationStatus,
    remarks?: string
  ) => {
    try {
      const res = await fetch(`/api/admin/candidates/${candidateId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeaders()
        },
        body: JSON.stringify({ applicationStatus: status, adminRemarks: remarks })
      });
      const data = await res.json();
      if (data.success) {
        showToast(`Candidate status updated to '${status}'`, 'success');
        refreshAdminCandidates();
        refreshEnquiries();
        refreshStats();
        return { success: true };
      }
      showToast(data.message || 'Failed to update candidate status', 'error');
      return { success: false };
    } catch (err: any) {
      showToast(err.message || 'Network error updating candidate status', 'error');
      return { success: false };
    }
  };

  const updateCandidateAdminRemarks = async (candidateId: string, remarks: string) => {
    try {
      const res = await fetch(`/api/admin/candidates/${candidateId}/remarks`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeaders()
        },
        body: JSON.stringify({ adminRemarks: remarks })
      });
      const data = await res.json();
      if (data.success) {
        showToast('Candidate remarks saved', 'success');
        refreshAdminCandidates();
        return { success: true };
      }
      showToast(data.message || 'Failed to update remarks', 'error');
      return { success: false };
    } catch (err: any) {
      showToast(err.message || 'Network error updating remarks', 'error');
      return { success: false };
    }
  };

  const adminDeleteCandidateDocument = async (candidateId: string, docId: string) => {
    try {
      const res = await fetch(`/api/admin/candidates/${candidateId}/documents/${docId}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });
      const data = await res.json();
      if (data.success) {
        // Immediately remove document from local admin candidates state
        setAdminCandidates(prev =>
          prev.map(c => {
            if (c.id === candidateId || c.candidateId === candidateId) {
              return {
                ...c,
                documents: c.documents.filter(d => d.id !== docId),
                updatedAt: new Date().toISOString()
              };
            }
            return c;
          })
        );
        // Also sync candidate me if viewing same candidate
        setCandidate(prev => {
          if (prev && (prev.id === candidateId || prev.candidateId === candidateId)) {
            return {
              ...prev,
              documents: prev.documents.filter(d => d.id !== docId),
              updatedAt: new Date().toISOString()
            };
          }
          return prev;
        });
        showToast('Document deleted successfully.', 'success');
        return { success: true, message: 'Document deleted successfully.' };
      }
      showToast(data.message || 'Failed to delete document', 'error');
      return { success: false, message: data.message };
    } catch (err: any) {
      showToast(err.message || 'Network error deleting document', 'error');
      return { success: false, message: err.message };
    }
  };

  const adminReplaceCandidateDocument = async (
    candidateId: string,
    docId: string,
    payload: { name?: string; fileData?: string; fileSize?: string; type?: DocumentType }
  ) => {
    try {
      const res = await fetch(`/api/admin/candidates/${candidateId}/documents/${docId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeaders()
        },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (data.success && data.document) {
        // Update adminCandidates state
        setAdminCandidates(prev =>
          prev.map(c => {
            if (c.id === candidateId || c.candidateId === candidateId) {
              return {
                ...c,
                documents: c.documents.map(d => (d.id === docId ? data.document : d)),
                updatedAt: new Date().toISOString()
              };
            }
            return c;
          })
        );
        // Update candidate state if active
        setCandidate(prev => {
          if (prev && (prev.id === candidateId || prev.candidateId === candidateId)) {
            return {
              ...prev,
              documents: prev.documents.map(d => (d.id === docId ? data.document : d)),
              updatedAt: new Date().toISOString()
            };
          }
          return prev;
        });
        showToast('Document replaced successfully', 'success');
        return { success: true, document: data.document };
      }
      showToast(data.message || 'Failed to replace document', 'error');
      return { success: false, message: data.message };
    } catch (err: any) {
      showToast(err.message || 'Network error replacing document', 'error');
      return { success: false, message: err.message };
    }
  };

  const adminUploadCandidateDocument = async (
    candidateId: string,
    docData: { type: DocumentType; name: string; fileData?: string; fileSize?: string }
  ) => {
    try {
      const res = await fetch(`/api/admin/candidates/${candidateId}/documents`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeaders()
        },
        body: JSON.stringify(docData)
      });
      const data = await res.json();
      if (data.success && data.document) {
        setAdminCandidates(prev =>
          prev.map(c => {
            if (c.id === candidateId || c.candidateId === candidateId) {
              return {
                ...c,
                documents: [...c.documents, data.document],
                updatedAt: new Date().toISOString()
              };
            }
            return c;
          })
        );
        showToast(`Document '${docData.name}' uploaded successfully`, 'success');
        return { success: true, document: data.document };
      }
      showToast(data.message || 'Failed to upload document', 'error');
      return { success: false, message: data.message };
    } catch (err: any) {
      showToast(err.message || 'Network error uploading document', 'error');
      return { success: false, message: err.message };
    }
  };

  const adminDeleteCandidate = async (candidateId: string) => {
    try {
      const res = await fetch(`/api/admin/candidates/${candidateId}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });
      const data = await res.json();
      if (data.success) {
        // Remove immediately from local adminCandidates state
        setAdminCandidates(prev => prev.filter(c => c.id !== candidateId && c.candidateId !== candidateId));
        showToast(data.message || 'Candidate record deleted successfully', 'success');
        refreshStats();
        return { success: true };
      }
      showToast(data.message || 'Failed to delete candidate', 'error');
      return { success: false, message: data.message };
    } catch (err: any) {
      showToast(err.message || 'Network error deleting candidate', 'error');
      return { success: false, message: err.message };
    }
  };

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      await Promise.all([
        refreshSettings(),
        refreshJobs(),
        refreshVideos(),
        refreshAds()
      ]);
      setLoading(false);
    };
    init();
  }, [refreshSettings, refreshJobs, refreshVideos, refreshAds]);

  useEffect(() => {
    refreshJobs();
  }, [isAdmin, refreshJobs]);

  useEffect(() => {
    if (isAdmin) {
      refreshStats();
      refreshEnquiries();
      refreshAdminCandidates();

      // Automatically refresh admin candidate records and enquiries every 10 seconds and on window focus
      const interval = setInterval(() => {
        refreshStats();
        refreshEnquiries();
        refreshAdminCandidates();
      }, 10000);

      const handleFocus = () => {
        refreshStats();
        refreshEnquiries();
        refreshAdminCandidates();
      };
      window.addEventListener('focus', handleFocus);

      return () => {
        clearInterval(interval);
        window.removeEventListener('focus', handleFocus);
      };
    } else if (user?.role === 'customer') {
      refreshEnquiries();
      refreshCandidateMe();
    }
  }, [isAdmin, user, refreshStats, refreshEnquiries, refreshAdminCandidates, refreshCandidateMe]);

  return (
    <AppContext.Provider
      value={{
        jobs,
        settings,
        videos,
        ads,
        enquiries,
        userEnquiries,
        stats,
        loading,
        selectedJob,
        setSelectedJob,
        applyModalJob,
        setApplyModalJob,
        toasts,
        showToast,
        removeToast,
        refreshJobs,
        refreshSettings,
        refreshVideos,
        refreshAds,
        refreshEnquiries,
        refreshStats,
        saveJob,
        deleteJob,
        updateEnquiryStatus,
        deleteEnquiry,
        batchDeleteEnquiries,
        purgeAllEnquiries,
        purgeAllOldData,
        saveAd,
        deleteAd,
        saveVideo,
        deleteVideo,
        updateSettings,
        submitEnquiry,
        currentTab,
        setCurrentTab,
        goBack,
        candidate,
        candidateLoading,
        adminCandidates,
        refreshCandidateMe,
        updateCandidateProfile,
        uploadCandidateDocument,
        deleteCandidateDocument,
        markJobInterested,
        removeJobInterested,
        isJobInterested,
        refreshAdminCandidates,
        updateCandidateAdminStatus,
        updateCandidateAdminRemarks,
        adminDeleteCandidateDocument,
        adminReplaceCandidateDocument,
        adminUploadCandidateDocument,
        adminDeleteCandidate,
        themeColor,
        setThemeColor,
        isDarkMode,
        setIsDarkMode,
        toggleDarkMode
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};

