import React from 'react';
import { ArrowLeft, Home, ChevronRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { AppTab } from '../types';

export interface SubpageBackButtonProps {
  label?: string;
  currentPageTitle?: string;
  fallbackTab?: AppTab;
  breadcrumbs?: { label: string; tab?: AppTab }[];
  className?: string;
  variant?: 'light' | 'dark';
}

export const SubpageBackButton: React.FC<SubpageBackButtonProps> = ({
  label = 'Back',
  currentPageTitle,
  fallbackTab = 'home',
  breadcrumbs,
  className = '',
  variant = 'light'
}) => {
  const { goBack, setCurrentTab, currentTab } = useApp();

  const isDark = variant === 'dark';

  return (
    <div
      id={`subpage-navigation-bar-${currentTab}`}
      className={`flex flex-wrap items-center justify-between gap-3 py-2 ${className}`}
    >
      {/* Back Key / Button */}
      <button
        type="button"
        id={`subpage-back-key-btn-${currentTab}`}
        onClick={() => goBack(fallbackTab)}
        className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-xs border cursor-pointer group active:scale-95 ${
          isDark
            ? 'bg-stone-900/95 text-stone-200 border-stone-700 hover:bg-stone-800 hover:text-white hover:border-stone-500'
            : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50 hover:text-slate-900 hover:border-slate-300'
        }`}
        title="Go Back (or press Esc / Alt+←)"
        aria-label="Back to previous page"
      >
        <ArrowLeft className="w-4 h-4 text-red-700 dark:text-red-400 group-hover:-translate-x-1 transition-transform" />
        <span>{label}</span>
        <kbd
          className={`hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono font-medium rounded border ${
            isDark
              ? 'bg-stone-950 text-stone-400 border-stone-800'
              : 'bg-slate-100 text-slate-500 border-slate-200'
          }`}
        >
          Esc
        </kbd>
      </button>

      {/* Breadcrumbs & Quick Home Link */}
      <nav aria-label="Breadcrumbs" className="flex items-center gap-1.5 text-xs">
        <button
          type="button"
          onClick={() => {
            setCurrentTab('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
            isDark
              ? 'text-stone-400 hover:text-stone-200 hover:bg-stone-900'
              : 'text-slate-500 hover:text-red-900 hover:bg-slate-100'
          }`}
          title="Go to Homepage"
        >
          <Home className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Home</span>
        </button>

        {breadcrumbs && breadcrumbs.length > 0 ? (
          breadcrumbs.map((crumb, idx) => (
            <React.Fragment key={idx}>
              <ChevronRight className={`w-3.5 h-3.5 ${isDark ? 'text-stone-600' : 'text-slate-300'}`} />
              {crumb.tab ? (
                <button
                  type="button"
                  onClick={() => {
                    crumb.tab && setCurrentTab(crumb.tab);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`font-semibold transition-colors cursor-pointer ${
                    isDark ? 'text-stone-300 hover:text-white' : 'text-slate-600 hover:text-red-900'
                  }`}
                >
                  {crumb.label}
                </button>
              ) : (
                <span className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{crumb.label}</span>
              )}
            </React.Fragment>
          ))
        ) : currentPageTitle ? (
          <>
            <ChevronRight className={`w-3.5 h-3.5 ${isDark ? 'text-stone-600' : 'text-slate-300'}`} />
            <span className={`font-bold truncate max-w-[200px] sm:max-w-xs ${isDark ? 'text-stone-200' : 'text-slate-900'}`}>
              {currentPageTitle}
            </span>
          </>
        ) : null}
      </nav>
    </div>
  );
};
