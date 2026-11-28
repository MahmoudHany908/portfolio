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
        
        {/* Video Selector Row — centers when fitting, scrolls full edge-to-edge when overflowing on mobile! */}
        <div className="w-full overflow-x-auto py-2 scrollbar-thin scrollbar-thumb-retro-gray scrollbar-track-retro-dark touch-pan-x">
          <div className="flex items-center gap-3 w-max mx-auto px-2">
            {videos.map((vid, idx) => {
              let thumb = vid.thumbnail || '';
              if (!thumb && vid.url.includes('youtube.com/embed/')) {
                const id = vid.url.split('embed/')[1].split('?')[0];
                thumb = `https://img.youtube.com/vi/${id}/mqdefault.jpg`;
              }
              return (
                <button 
                  key={idx}
                  type="button"
                  onMouseEnter={() => setActiveIndex(idx)}
                  onClick={(e) => {
                    setActiveIndex(idx);
                    e.currentTarget.scrollIntoView({
                      behavior: 'smooth',
                      block: 'nearest',
                      inline: 'center'
                    });
                  }}
                  className={`relative shrink-0 w-36 h-20 pixel-border border-2 transition-all duration-200 group ${activeIndex === idx ? 'border-retro-yellow shadow-[0_0_15px_rgba(244,180,27,0.5)] scale-105 z-10' : 'border-retro-gray opacity-70 hover:opacity-100 hover:border-retro-light-blue hover:scale-105'}`}
                >
                  {thumb ? (
                    <img src={thumb} alt={vid.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-slate-800 flex items-center justify-center font-pixel text-[10px] text-white p-2 text-center leading-tight">
                      {vid.title}
                    </div>
                  )}
                  {/* Title badge */}
                  <div className="absolute inset-x-0 bottom-0 bg-black/85 py-0.5 px-1 font-pixel text-[9px] text-retro-yellow text-center truncate pointer-events-none">
                    {vid.title}
                  </div>
                  {/* Play icon overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/10 transition-all pointer-events-none">
                    <div className={`w-0 h-0 border-t-[6px] border-b-[6px] border-l-[10px] border-t-transparent border-b-transparent ${activeIndex === idx ? 'border-l-retro-yellow' : 'border-l-white drop-shadow-md'}`}></div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  if (image) {
    return (
      <div className="relative w-full aspect-video mb-6 pixel-border border-4 border-retro-gray shadow-lg overflow-hidden bg-retro-dark flex items-center justify-center">
        {/* Subtle blurred ambient backdrop to fill letterbox cleanly */}
        <div 
          className="absolute inset-0 bg-center bg-cover filter blur-lg opacity-35 scale-110 pointer-events-none"
          style={{ backgroundImage: `url(${image})` }}
        />
        <img 
          src={image} 
          alt="Project visual" 
          className="relative z-10 w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-500 drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]" 
        />
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
