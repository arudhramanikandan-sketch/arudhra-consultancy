import React from 'react';
import { useApp } from '../context/AppContext';
import { Youtube, ExternalLink } from 'lucide-react';
import { SubpageBackButton } from '../components/SubpageBackButton';

export const VideosView: React.FC = () => {
  const { videos, settings } = useApp();

  const publishedVideos = videos.filter(v => v.status === 'published' || !v.status);

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
    <div id="videos-view-page" className="py-8 sm:py-10 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Subpage Back Key & Navigation */}
        <SubpageBackButton label="Back to Home" currentPageTitle="Singapore Videos" fallbackTab="home" />

        {/* Banner */}
        <div className="bg-stone-900 text-white rounded-3xl p-8 sm:p-10 relative overflow-hidden shadow-xl border border-stone-800">
          <div className="relative z-10 max-w-2xl space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950 text-red-300 text-xs font-bold border border-red-800">
              <Youtube className="w-3.5 h-3.5" />
              <span>Singapore Orientation Channel</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Singapore Job & Orientation Videos
            </h1>
            <p className="text-xs sm:text-sm text-stone-300">
              Educational videos, Singapore Work Pass guidelines, living orientations, and interview readiness tips curated by Arudhra Consultancy.
            </p>
          </div>
        </div>

        {/* Videos Grid */}
        {publishedVideos.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {publishedVideos.map(video => (
              <div
                key={video.id}
                id={`video-item-${video.id}`}
                className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                {/* Embed player */}
                <div className="relative aspect-video w-full bg-stone-900">
                  <iframe
                    src={getEmbedUrl(video.youtubeUrl)}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full border-0"
                  />
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <h3 className="text-base font-bold text-slate-900 leading-snug">
                      {video.title}
                    </h3>
                    <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                      {video.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                    <span className="font-mono text-[11px]">Video Ref: {video.id}</span>
                    <a
                      href={video.youtubeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-red-900 hover:text-red-950 font-semibold flex items-center gap-1"
                    >
                      <span>Watch on YouTube</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 max-w-md mx-auto space-y-3">
            <Youtube className="w-10 h-10 text-red-900 mx-auto" />
            <h3 className="text-lg font-bold text-slate-900">No Videos Published Yet</h3>
            <p className="text-xs text-slate-600">
              New Singapore orientation videos will be posted soon by our recruitment desk.
            </p>
          </div>
        )}

        {/* YouTube Channel Banner */}
        {settings.youtubeUrl && (
          <div className="bg-gradient-to-r from-red-950 via-stone-900 to-red-950 text-white rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md border border-red-900/30">
            <div className="space-y-1 text-center sm:text-left">
              <h3 className="text-lg font-bold text-white">Subscribe to Arudhra Consultancy Channel</h3>
              <p className="text-xs text-red-200">Get notified about fresh Singapore walk-in interview notices and sector updates.</p>
            </div>
            <a
              id="subscribe-youtube-btn"
              href={settings.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2.5 bg-red-900 hover:bg-red-800 text-white text-xs font-bold rounded-xl shadow-md transition-all shrink-0 flex items-center gap-2 cursor-pointer"
            >
              <Youtube className="w-4 h-4" />
              <span>Visit Official Channel</span>
            </a>
          </div>
        )}
      </div>
    </div>
  );
};
