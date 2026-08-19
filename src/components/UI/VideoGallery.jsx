import React, { useState } from 'react';

export default function VideoGallery({ singleVideo, videos }) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (singleVideo && (!videos || videos.length === 0)) {
    return (
      <div className="relative w-full aspect-video mb-6 pixel-border border-4 border-retro-gray shadow-lg">
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

  if (!videos || videos.length === 0) return null;

  return (
    <div className="flex flex-col gap-2 mb-6">
      {/* Main Video */}
      <div className="relative w-full aspect-video pixel-border border-4 border-retro-gray shadow-lg bg-black">
        <iframe 
          src={videos[activeIndex].url} 
          className="absolute inset-0 w-full h-full" 
          frameBorder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen" 
          allowFullScreen
        ></iframe>
      </div>
      
      {/* Video Selector Row */}
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-retro-gray scrollbar-track-retro-dark">
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
