import React from 'react';
import { useApp } from '../context/AppContext';
import { Youtube, Play, ArrowRight } from 'lucide-react';

export const VideosSection: React.FC = () => {
  const { videos, setCurrentTab } = useApp();

  const publishedVideos = videos.filter(v => v.status === 'published');
  if (publishedVideos.length === 0) return null;

  const getEmbedUrl = (url: string) => {
    try {
      if (url.includes('embed/')) return url;
      const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
      if (match && match[1]) {
        return `https://www.youtube.com/embed/${match[1]}`;
      }
      return 'https://www.youtube.com/embed/dQw4w9WgXcQ';
    } catch {
      return 'https://www.youtube.com/embed/dQw4w9WgXcQ';
    }
  };

  return (
    <section className="py-16 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 text-rose-600 text-xs font-extrabold uppercase tracking-wider mb-1">
              <Youtube className="w-4 h-4" />
              <span>Singapore Orientation & Guidance</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Informative Videos
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Watch step-by-step guides on Singapore visa types, work culture, living costs, and documentation.
            </p>
          </div>

          <button
            id="view-all-videos-btn"
            onClick={() => {
              setCurrentTab('videos');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 text-xs font-bold text-rose-700 hover:text-rose-800 bg-rose-50 hover:bg-rose-100 px-4 py-2 rounded-xl transition-all w-fit"
          >
            <span>View All Videos</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {publishedVideos.slice(0, 3).map(video => (
            <div
              key={video.id}
              id={`video-card-${video.id}`}
              className="bg-slate-50 rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col"
            >
              {/* Responsive Iframe */}
              <div className="relative aspect-video w-full bg-slate-900">
                <iframe
                  src={getEmbedUrl(video.youtubeUrl)}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full border-0"
                />
              </div>

              {/* Title & Description */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-2">
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 line-clamp-2 leading-snug">
                    {video.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-1.5 line-clamp-2 leading-relaxed">
                    {video.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
