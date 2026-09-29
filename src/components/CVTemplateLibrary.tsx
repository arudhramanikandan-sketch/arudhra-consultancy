import React, { useState, useMemo } from 'react';
import { CVTemplate, CVTemplateFilter } from '../types';
import { CV_TEMPLATES, CV_TEMPLATE_FILTERS } from '../data/cvTemplates';
import { CVTemplateCard } from './CVTemplateCard';
import { CVTemplatePreviewModal } from './CVTemplatePreviewModal';
import {
  Layers,
  Search,
  CheckCircle2,
  Filter,
  Sparkles,
  ArrowRight,
  Info
} from 'lucide-react';

interface CVTemplateLibraryProps {
  selectedTemplateId: string;
  onSelectTemplate: (template: CVTemplate) => void;
  showSectionHeader?: boolean;
}

export const CVTemplateLibrary: React.FC<CVTemplateLibraryProps> = ({
  selectedTemplateId,
  onSelectTemplate,
  showSectionHeader = true
}) => {
  const [activeFilter, setActiveFilter] = useState<CVTemplateFilter>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [previewTemplate, setPreviewTemplate] = useState<CVTemplate | null>(null);

  // Filter templates based on category & search query
  const filteredTemplates = useMemo(() => {
    return CV_TEMPLATES.filter(tmpl => {
      // Category Filter
      const matchesCategory =
        activeFilter === 'All' || tmpl.filterCategory === activeFilter;

      // Search Query
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        tmpl.name.toLowerCase().includes(q) ||
        tmpl.tagline.toLowerCase().includes(q) ||
        tmpl.suitableCategories.some(c => c.toLowerCase().includes(q)) ||
        tmpl.suitableExperience.some(e => e.toLowerCase().includes(q)) ||
        tmpl.features.some(f => f.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [activeFilter, searchQuery]);

  const selectedTemplate = useMemo(() => {
    return CV_TEMPLATES.find(t => t.id === selectedTemplateId) || CV_TEMPLATES[0];
  }, [selectedTemplateId]);

  return (
    <div className="space-y-6">
      {/* Optional Header */}
      {showSectionHeader && (
        <div className="border-b border-stone-100 pb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-red-900 uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Professional CV Design Library</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-stone-900">
              Choose Your CV Template Design
            </h2>
            <p className="text-xs text-stone-500 mt-1 max-w-2xl">
              Select any design below. Our recruitment documentation specialists will format your CV following this exact layout after you submit your details on WhatsApp.
            </p>
          </div>

          {/* Current Selection Indicator */}
          {selectedTemplate && (
            <div className="bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2 flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0"></span>
              <div className="text-xs">
                <span className="text-stone-400 block text-[10px] uppercase font-bold">Selected Design</span>
                <span className="font-extrabold text-stone-900">{selectedTemplate.name}</span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Filter Category Pills & Search */}
      <div className="space-y-3">
        {/* Search input + Filter label */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Filter Pills Scroll Container */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-thin">
            {CV_TEMPLATE_FILTERS.map(filter => {
              const isActive = activeFilter === filter;
              return (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActiveFilter(filter)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? 'bg-red-950 text-white shadow-xs'
                      : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                  }`}
                >
                  {filter}
                </button>
              );
            })}
          </div>

          {/* Quick Search */}
          <div className="relative min-w-[220px]">
            <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search template designs..."
              className="w-full pl-8 pr-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-red-900"
            />
          </div>
        </div>

        {/* Status text */}
        <div className="flex items-center justify-between text-xs text-stone-500">
          <span>Showing <strong>{filteredTemplates.length}</strong> of {CV_TEMPLATES.length} templates</span>
          {activeFilter !== 'All' && (
            <button
              type="button"
              onClick={() => setActiveFilter('All')}
              className="text-red-900 hover:underline font-semibold"
            >
              Reset to All
            </button>
          )}
        </div>
      </div>

      {/* Templates Grid */}
      {filteredTemplates.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredTemplates.map(template => (
            <CVTemplateCard
              key={template.id}
              template={template}
              isSelected={selectedTemplateId === template.id}
              onSelect={onSelectTemplate}
              onPreview={tmpl => setPreviewTemplate(tmpl)}
            />
          ))}
        </div>
      ) : (
        <div className="bg-stone-50 rounded-2xl border border-stone-200 p-8 text-center space-y-3">
          <Info className="w-8 h-8 text-stone-400 mx-auto" />
          <h3 className="font-bold text-sm text-stone-800">
            No templates match "{searchQuery}"
          </h3>
          <p className="text-xs text-stone-500">
            Try adjusting your search terms or select "All" from the filter bar above.
          </p>
          <button
            type="button"
            onClick={() => {
              setActiveFilter('All');
              setSearchQuery('');
            }}
            className="px-4 py-2 bg-stone-900 text-white text-xs font-bold rounded-xl"
          >
            Show All 10 Templates
          </button>
        </div>
      )}

      {/* Interactive Modal Preview */}
      <CVTemplatePreviewModal
        template={previewTemplate}
        isOpen={Boolean(previewTemplate)}
        isSelected={previewTemplate ? selectedTemplateId === previewTemplate.id : false}
        onClose={() => setPreviewTemplate(null)}
        onSelect={tmpl => {
          onSelectTemplate(tmpl);
          setPreviewTemplate(null);
        }}
      />
    </div>
  );
};
