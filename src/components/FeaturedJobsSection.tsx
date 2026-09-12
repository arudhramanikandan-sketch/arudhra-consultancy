import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { JobCard } from './JobCard';
import { ArrowRight, Sparkles, Briefcase, Search, CheckCircle2, ShieldCheck } from 'lucide-react';
import { JobCategory } from '../types';

export const AllLiveJobsSection: React.FC = () => {
  const { jobs, loading, setCurrentTab } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const publishedJobs = useMemo(() => {
    return jobs.filter(j => j.status === 'published');
  }, [jobs]);

  const categories: { label: string; count: number }[] = useMemo(() => {
    const counts: Record<string, number> = { All: publishedJobs.length };
    publishedJobs.forEach(job => {
      counts[job.category] = (counts[job.category] || 0) + 1;
    });

    const list = [{ label: 'All', count: publishedJobs.length }];
    Object.keys(counts).forEach(cat => {
      if (cat !== 'All') {
        list.push({ label: cat, count: counts[cat] });
      }
    });
    return list;
  }, [publishedJobs]);

  const filteredJobs = useMemo(() => {
    return publishedJobs.filter(job => {
      if (selectedCategory !== 'All' && job.category.toLowerCase() !== selectedCategory.toLowerCase()) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const match =
          job.title.toLowerCase().includes(q) ||
          job.category.toLowerCase().includes(q) ||
          job.location.toLowerCase().includes(q) ||
          job.qualification.toLowerCase().includes(q) ||
          job.salary.toLowerCase().includes(q) ||
          (job.employer && job.employer.toLowerCase().includes(q));
        if (!match) return false;
      }
      return true;
    });
  }, [publishedJobs, selectedCategory, searchQuery]);

  return (
    <section id="live-singapore-jobs-section" className="py-14 sm:py-20 bg-slate-50/90 border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-100 text-red-900 border border-red-200 text-xs font-extrabold tracking-wide">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>{publishedJobs.length} Live Openings Active in Singapore</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              All Live Singapore Jobs
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Explore all active vacancies with verified Singapore employers. Transparent salary structures in SGD, MOM work passes, and complete placement guidance.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              id="home-view-all-jobs-top-btn"
              onClick={() => {
                setCurrentTab('jobs');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-red-900 hover:bg-red-800 text-white text-xs sm:text-sm font-bold rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer"
            >
              <span>View Full Directory & Filters</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Filter Controls: Search & Category Pills */}
        <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          {/* Quick Search */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
              <input
                id="live-jobs-search-input"
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search live jobs by title, trade, skill, or Singapore location..."
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-red-900/20 focus:border-red-900 transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-3 text-xs text-slate-400 hover:text-slate-600 font-bold"
                >
                  Clear
                </button>
              )}
            </div>

            <div className="text-xs font-bold text-slate-500 whitespace-nowrap">
              Showing <span className="text-red-900 font-extrabold">{filteredJobs.length}</span> of {publishedJobs.length} jobs
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 no-scrollbar text-xs">
            {categories.map(cat => {
              const isActive = selectedCategory.toLowerCase() === cat.label.toLowerCase();
              return (
                <button
                  key={cat.label}
                  type="button"
                  onClick={() => setSelectedCategory(cat.label)}
                  className={`px-3.5 py-2 rounded-xl font-bold transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
                    isActive
                      ? 'bg-red-900 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono font-extrabold ${
                      isActive ? 'bg-red-800 text-white' : 'bg-slate-200 text-slate-700'
                    }`}
                  >
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Jobs Grid */}
        {filteredJobs.length > 0 ? (
          <div id="all-live-jobs-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.map(job => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-10 text-center border border-slate-200 shadow-sm space-y-3">
            <div className="w-12 h-12 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto">
              <Briefcase className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">No jobs match your filter</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              No vacancies match "{searchQuery}" in {selectedCategory}. Try resetting your search or viewing all available Singapore positions.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="px-4 py-2 bg-red-900 text-white text-xs font-bold rounded-xl hover:bg-red-800 transition-colors cursor-pointer"
            >
              Reset Filters & Show All {publishedJobs.length} Jobs
            </button>
          </div>
        )}

        {/* Bottom Banner */}
        <div className="bg-gradient-to-r from-stone-900 via-red-950 to-stone-900 rounded-2xl p-6 text-white flex flex-col sm:flex-row items-center justify-between gap-4 border border-red-900/30">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-base font-bold flex items-center justify-center sm:justify-start gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <span>MOM-Compliant Recruitment Facilitation</span>
            </h4>
            <p className="text-xs text-stone-300">
              Need assistance selecting the right Singapore position matching your passport and trade qualifications?
            </p>
          </div>
          <button
            onClick={() => {
              setCurrentTab('contact');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="px-6 py-2.5 bg-white text-stone-950 hover:bg-stone-100 font-bold text-xs rounded-xl shadow-md transition-all whitespace-nowrap cursor-pointer"
          >
            Speak with Recruitment Advisor
          </button>
        </div>
      </div>
    </section>
  );
};

// Kept for backward compatibility
export const LatestJobsSection: React.FC = () => {
  return <AllLiveJobsSection />;
};

export const FeaturedJobsSection: React.FC = () => {
  return null;
};
