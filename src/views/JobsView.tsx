import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { JobCard } from '../components/JobCard';
import { Search, Filter, Briefcase, RefreshCw, Sparkles, Clock, X, SlidersHorizontal } from 'lucide-react';
import { JobCategory, JobType } from '../types';
import { SubpageBackButton } from '../components/SubpageBackButton';

interface JobsViewProps {
  initialSearch?: string;
  initialCategory?: string;
}

export const JobsView: React.FC<JobsViewProps> = ({ initialSearch = '', initialCategory = 'All' }) => {
  const { jobs, refreshJobs } = useApp();
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Ensure latest persisted jobs are pulled immediately on mount
  useEffect(() => {
    refreshJobs();
  }, [refreshJobs]);

  const handleManualRefresh = async () => {
    setIsRefreshing(true);
    try {
      await refreshJobs();
    } finally {
      setTimeout(() => setIsRefreshing(false), 500);
    }
  };

  const [search, setSearch] = useState(initialSearch);
  const [category, setCategory] = useState<string>(initialCategory);
  const [jobType, setJobType] = useState<string>('All');
  const [experienceLevel, setExperienceLevel] = useState<string>('All');
  const [featuredOnly, setFeaturedOnly] = useState(false);
  const [latestOnly, setLatestOnly] = useState(false);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  useEffect(() => {
    if (initialSearch) setSearch(initialSearch);
    if (initialCategory) setCategory(initialCategory);
  }, [initialSearch, initialCategory]);

  const categories: JobCategory[] = [
    'All',
    'Manufacturing & Production',
    'Marine & Shipyard',
    'F&B & Hospitality',
    'Logistics & Warehouse',
    'Construction & Civil',
    'Electrical & Maintenance',
    'Automotive & Mechanical',
    'Healthcare & Nursing',
    'IT & Admin Support'
  ];

  const jobTypes = [
    'All',
    'Work Permit',
    'NTS Work Permit',
    'PCM',
    'Construction Permit',
    'Marine Permit',
    'S Pass',
    'E Pass'
  ];
  const experienceOptions = ['All', 'Fresh', '1-2 Years', '3+ Years'];

  // Filter jobs locally
  const filteredJobs = jobs.filter(job => {
    if (job.status !== 'published') return false;

    if (category !== 'All' && job.category.toLowerCase() !== category.toLowerCase()) {
      return false;
    }

    if (jobType !== 'All') {
      const selectedClean = jobType.toLowerCase().replace(/[\s\-_]/g, '');
      const jobClean = (job.jobType || '').toLowerCase().replace(/[\s\-_]/g, '');
      const isExactMatch = jobClean === selectedClean;
      const isSubstringMatch = jobClean.includes(selectedClean) || selectedClean.includes(jobClean);
      if (!isExactMatch && !isSubstringMatch) {
        return false;
      }
    }

    if (featuredOnly && !job.featured) return false;
    if (latestOnly && !job.latest) return false;

    if (search.trim()) {
      const q = search.toLowerCase().trim();
      const match =
        job.title.toLowerCase().includes(q) ||
        job.category.toLowerCase().includes(q) ||
        job.location.toLowerCase().includes(q) ||
        job.description.toLowerCase().includes(q) ||
        job.qualification.toLowerCase().includes(q) ||
        job.experience.toLowerCase().includes(q) ||
        (job.employer && job.employer.toLowerCase().includes(q));
      if (!match) return false;
    }

    if (experienceLevel !== 'All') {
      if (experienceLevel === 'Fresh' && !job.experience.toLowerCase().includes('fresh') && !job.experience.toLowerCase().includes('0-')) return false;
      if (experienceLevel === '1-2 Years' && !job.experience.includes('1') && !job.experience.includes('2')) return false;
      if (experienceLevel === '3+ Years' && !job.experience.includes('3') && !job.experience.includes('4') && !job.experience.includes('5')) return false;
    }

    return true;
  });

  const resetFilters = () => {
    setSearch('');
    setCategory('All');
    setJobType('All');
    setExperienceLevel('All');
    setFeaturedOnly(false);
    setLatestOnly(false);
  };

  const activeFiltersCount =
    (category !== 'All' ? 1 : 0) +
    (jobType !== 'All' ? 1 : 0) +
    (experienceLevel !== 'All' ? 1 : 0) +
    (featuredOnly ? 1 : 0) +
    (latestOnly ? 1 : 0) +
    (search.trim() ? 1 : 0);

  return (
    <div id="jobs-view-page" className="py-8 sm:py-10 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Subpage Back Key & Navigation */}
        <SubpageBackButton label="Back to Home" currentPageTitle="Singapore Jobs" fallbackTab="home" />

        {/* Header Title */}
        <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-10 relative overflow-hidden shadow-xl">
          <div className="relative z-10 max-w-2xl space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 text-xs font-bold border border-rose-500/30">
              <span>🇸🇬 Singapore Overseas Jobs Directory</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Singapore Job Opportunities
            </h1>
            <p className="text-xs sm:text-sm text-slate-300">
              Browse current Singapore openings with transparent salary terms in SGD, verified employer locations, and immediate application tracking.
            </p>
          </div>
        </div>

        {/* Search & Quick Controls Bar */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full md:max-w-md">
              <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
              <input
                id="jobs-search-input"
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search job title, skill, or Singapore location..."
                className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-medium text-slate-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500 transition-all"
              />
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch('')}
                  className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Badges & Mobile Filter Toggle */}
            <div className="flex items-center gap-2 w-full md:w-auto justify-between md:justify-end">
              <button
                id="toggle-mobile-filters-btn"
                type="button"
                onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
                className="md:hidden flex items-center gap-2 px-3.5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl"
              >
                <SlidersHorizontal className="w-4 h-4" />
                <span>Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}</span>
              </button>

              <div className="hidden sm:flex items-center gap-2">
                <button
                  id="filter-featured-btn"
                  type="button"
                  onClick={() => setFeaturedOnly(!featuredOnly)}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-all flex items-center gap-1.5 ${
                    featuredOnly
                      ? 'bg-amber-500 text-white border-amber-600 shadow-xs'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Featured Only</span>
                </button>

                <button
                  id="filter-latest-btn"
                  type="button"
                  onClick={() => setLatestOnly(!latestOnly)}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-all flex items-center gap-1.5 ${
                    latestOnly
                      ? 'bg-blue-600 text-white border-blue-700 shadow-xs'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <Clock className="w-3.5 h-3.5" />
                  <span>Latest Only</span>
                </button>

                <button
                  id="manual-refresh-jobs-btn"
                  type="button"
                  onClick={handleManualRefresh}
                  disabled={isRefreshing}
                  title="Sync with latest live database"
                  className="px-3 py-2 rounded-xl text-xs font-semibold border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 transition-all flex items-center gap-1.5"
                >
                  <RefreshCw className={`w-3.5 h-3.5 text-emerald-600 ${isRefreshing ? 'animate-spin' : ''}`} />
                  <span>{isRefreshing ? 'Syncing...' : 'Sync Live'}</span>
                </button>
              </div>

              {activeFiltersCount > 0 && (
                <button
                  id="reset-all-filters-btn"
                  type="button"
                  onClick={resetFilters}
                  className="text-xs font-semibold text-rose-600 hover:text-rose-700 hover:underline px-2"
                >
                  Reset ({activeFiltersCount})
                </button>
              )}
            </div>
          </div>

          {/* Desktop Filters Row */}
          <div className="hidden md:flex flex-wrap items-center gap-3 pt-3 border-t border-slate-100 text-xs">
            {/* Category Select */}
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-600 uppercase tracking-wider text-[10px]">Sector:</span>
              <select
                id="filter-category-select"
                value={category}
                onChange={e => setCategory(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 font-semibold text-slate-800 focus:outline-hidden"
              >
                {categories.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* Job Type Select */}
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-600 uppercase tracking-wider text-[10px]">Pass / Type:</span>
              <select
                id="filter-jobtype-select"
                value={jobType}
                onChange={e => setJobType(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 font-semibold text-slate-800 focus:outline-hidden"
              >
                {jobTypes.map(t => (
                  <option key={t} value={t}>{t === 'All' ? 'All Pass Types' : t}</option>
                ))}
              </select>
            </div>

            {/* Experience Select */}
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-600 uppercase tracking-wider text-[10px]">Experience:</span>
              <select
                id="filter-experience-select"
                value={experienceLevel}
                onChange={e => setExperienceLevel(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 font-semibold text-slate-800 focus:outline-hidden"
              >
                {experienceOptions.map(exp => (
                  <option key={exp} value={exp}>{exp}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Mobile Drawer Filter Content */}
          {mobileFilterOpen && (
            <div className="md:hidden pt-4 border-t border-slate-200 space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Sector / Category</label>
                <select
                  value={category}
                  onChange={e => setCategory(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-medium text-slate-800"
                >
                  {categories.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Pass Type</label>
                  <select
                    value={jobType}
                    onChange={e => setJobType(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-medium text-slate-800"
                  >
                    {jobTypes.map(t => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Experience</label>
                  <select
                    value={experienceLevel}
                    onChange={e => setExperienceLevel(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-medium text-slate-800"
                  >
                    {experienceOptions.map(exp => (
                      <option key={exp} value={exp}>{exp}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setFeaturedOnly(!featuredOnly)}
                  className={`flex-1 py-2 px-3 rounded-xl border text-xs font-semibold ${
                    featuredOnly ? 'bg-amber-500 text-white' : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  ★ Featured
                </button>
                <button
                  type="button"
                  onClick={() => setLatestOnly(!latestOnly)}
                  className={`flex-1 py-2 px-3 rounded-xl border text-xs font-semibold ${
                    latestOnly ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  Latest
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs text-slate-600 font-medium px-1">
          <span>Showing <strong>{filteredJobs.length}</strong> Singapore vacancies</span>
          {category !== 'All' && (
            <span className="bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full font-bold">
              {category}
            </span>
          )}
        </div>

        {/* Jobs Grid */}
        {filteredJobs.length > 0 ? (
          <div id="jobs-grid-container" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.map(job => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div id="jobs-empty-state" className="bg-white rounded-3xl p-12 text-center border border-slate-200 max-w-lg mx-auto space-y-4 shadow-sm">
            <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto">
              <Briefcase className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">No Singapore Jobs Found</h3>
              <p className="text-xs text-slate-600 mt-1">
                No vacancies matched your current search filters. Try clearing some criteria or search for broader keywords.
              </p>
            </div>
            <button
              id="empty-reset-filters-btn"
              type="button"
              onClick={resetFilters}
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-all"
            >
              Show All Available Jobs
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
