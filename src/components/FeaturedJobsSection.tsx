import React from 'react';
import { useApp } from '../context/AppContext';
import { JobCard } from './JobCard';
import { ArrowRight, Sparkles, Clock } from 'lucide-react';

export const LatestJobsSection: React.FC = () => {
  const { jobs, setCurrentTab } = useApp();

  const publishedJobs = jobs.filter(j => j.status === 'published');
  // Get latest jobs or top 6 recent jobs
  const latestJobs = publishedJobs.filter(j => j.latest).slice(0, 6);
  const displayJobs = latestJobs.length > 0 ? latestJobs : publishedJobs.slice(0, 6);

  if (displayJobs.length === 0) return null;

  return (
    <section className="py-12 sm:py-16 bg-slate-50/80 border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-red-900 text-xs font-extrabold uppercase tracking-wider mb-1">
              <Clock className="w-4 h-4" />
              <span>Fresh Singapore Openings</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Latest Singapore Jobs
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Recently received overseas vacancies with immediate employer interview slots.
            </p>
          </div>

          <button
            id="view-all-latest-jobs-btn"
            onClick={() => {
              setCurrentTab('jobs');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 text-xs font-bold text-red-900 hover:text-red-950 bg-red-50 hover:bg-red-100 border border-red-200 px-4 py-2 rounded-xl transition-all w-fit cursor-pointer"
          >
            <span>View All Singapore Jobs</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayJobs.map(job => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </div>
    </section>
  );
};

export const FeaturedJobsSection: React.FC = () => {
  const { jobs, setCurrentTab } = useApp();

  const publishedJobs = jobs.filter(j => j.status === 'published');
  const featuredJobs = publishedJobs.filter(j => j.featured).slice(0, 6);
  const displayJobs = featuredJobs.length > 0 ? featuredJobs : publishedJobs.slice(0, 6);

  if (displayJobs.length === 0) return null;

  return (
    <section className="py-12 sm:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-red-900 text-xs font-extrabold uppercase tracking-wider mb-1">
              <Sparkles className="w-4 h-4" />
              <span>Priority Openings</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Featured Singapore Vacancies
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              High-demand roles in CNC machining, marine welding, technical trades, and F&B.
            </p>
          </div>

          <button
            id="view-all-featured-jobs-btn"
            onClick={() => {
              setCurrentTab('jobs');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-800 hover:text-black bg-slate-100 hover:bg-slate-200 px-4 py-2 rounded-xl transition-all w-fit cursor-pointer"
          >
            <span>Explore All Positions</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayJobs.map(job => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </div>
    </section>
  );
};
