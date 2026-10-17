import React, { useState } from 'react';

export default function VideoGallery({ singleVideo, videos, image }) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (singleVideo && (!videos || videos.length === 0)) {
    return (
      <div className="relative w-full aspect-video mb-6 pixel-border border-4 border-retro-gray shadow-lg overflow-hidden bg-black">
        <iframe 
          src={singleVideo} 
          className="absolute inset-0 w-full h-full bg-black" 
          frameBorder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen" 
          allowFullScreen
        ></iframe>
      </div>
    );
  }

  if (videos && videos.length > 0) {
    return (
      <div className="flex flex-col gap-2 mb-6">
        {/* Main Video */}
        <div className="relative w-full aspect-video pixel-border border-4 border-retro-gray shadow-lg bg-black overflow-hidden">
          <iframe 
            src={videos[activeIndex].url} 
            className="absolute inset-0 w-full h-full" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen" 
            allowFullScreen
          ></iframe>
        </div>
        
        {/* Video Selector Row */}
        <div className="flex justify-center gap-3 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-retro-gray scrollbar-track-retro-dark">
          {videos.map((vid, idx) => {
            let thumb = '';
            if (vid.url.includes('youtube.com/embed/')) {
              const id = vid.url.split('embed/')[1].split('?')[0];
              thumb = `https://img.youtube.com/vi/${id}/mqdefault.jpg`;
            }
            return (
              <button 
                key={idx}
                onMouseEnter={() => setActiveIndex(idx)}
                onClick={() => setActiveIndex(idx)}
                className={`relative shrink-0 w-32 h-20 pixel-border border-2 transition-all duration-200 group ${activeIndex === idx ? 'border-retro-yellow shadow-[0_0_15px_rgba(244,180,27,0.5)] scale-105 z-10' : 'border-retro-gray opacity-70 hover:opacity-100 hover:border-retro-light-blue hover:scale-105'}`}
              >
                {thumb ? (
                  <img src={thumb} alt={vid.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-slate-800 flex items-center justify-center font-pixel text-[10px] text-white p-2 text-center leading-tight">
                    {vid.title}
                  </div>
                )}
                {/* Play icon overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/20 transition-all">
                  <div className={`w-0 h-0 border-t-[8px] border-b-[8px] border-l-[12px] border-t-transparent border-b-transparent ${activeIndex === idx ? 'border-l-retro-yellow' : 'border-l-white drop-shadow-md'}`}></div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  if (image) {
    return (
      <div className="relative w-full aspect-video mb-6 pixel-border border-4 border-retro-gray shadow-lg overflow-hidden bg-black flex items-center justify-center">
        <img src={image} alt="Project visual" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
      </div>
    );
  }

  return (
    <div className="relative w-full aspect-video mb-6 pixel-border border-4 border-retro-gray/50 shadow-lg bg-black/60 flex flex-col items-center justify-center p-6 text-center group">
      <div className="w-12 h-12 mb-3 rounded-full border-2 border-retro-yellow/40 flex items-center justify-center text-retro-yellow animate-pulse">
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
      </div>
      <div className="font-pixel text-xs text-retro-yellow tracking-wider mb-1">
        FOOTAGE / SCREENSHOT PENDING
      </div>
      <div className="font-chakra text-xs text-slate-400">
        Gameplay preview coming soon
      </div>
    </div>
  );
}
