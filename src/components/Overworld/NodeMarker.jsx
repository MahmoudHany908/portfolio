import React from 'react';
import useGameAudio from '../../hooks/useGameAudio';
import { LandmarkStart, LandmarkSkills, LandmarkProjects, LandmarkContact, LockIcon } from './PixelAssets';

const getLandmarkSVG = (id) => {
  switch (id) {
    case 'about': return LandmarkStart;
    case 'skills': return LandmarkSkills;
    case 'contact': return LandmarkContact;
    default: return LandmarkProjects; // projects use chest
  }
};

export default function NodeMarker({ node, x, y, isCompleted, isUnlocked, onSelect }) {
  const { playHover, playSelect } = useGameAudio();

  const getColors = () => {
    switch (node.type) {
      case 'start': return { bg: '#d95763', text: 'text-[#d95763]' };
      case 'skill': return { bg: '#f4b41b', text: 'text-[#f4b41b]' };
      case 'project': return { bg: '#569ceb', text: 'text-[#569ceb]' };
      case 'contact': return { bg: '#83eb72', text: 'text-[#83eb72]' };
      default: return { bg: '#ffffff', text: 'text-white' };
    }
  };

  const colors = getColors();
  const LandmarkSVG = getLandmarkSVG(node.id);

  const handlePointerEnter = () => {
    if (isUnlocked) playHover();
  };

  const handleClick = (e) => {
    e.stopPropagation();
    if (isUnlocked) {
      playSelect();
      onSelect(node);
    }
  };

  return (
    <div 
      className={`absolute flex flex-col items-center justify-center transition-all duration-300 z-30 ${isUnlocked ? 'cursor-pointer hover:scale-110 group' : 'cursor-not-allowed opacity-50 grayscale'}`}
      style={{ left: x, top: y, transform: 'translate(-50%, -50%)' }}
      onPointerEnter={handlePointerEnter}
      onClick={handleClick}
    >
      <div className="relative w-32 h-32 flex items-center justify-center pointer-events-auto">
        {/* Glowing Background Circle (Option B) */}
        <div 
          className="absolute inset-2 rounded-full opacity-80"
          style={{ 
            backgroundColor: colors.bg,
            boxShadow: `0 0 20px ${colors.bg}, inset 0 0 10px rgba(255,255,255,0.5)`
          }}
        />

        {/* Pixel Art Landmark Structure */}
        <img 
          src={LandmarkSVG} 
          className="w-full h-full relative z-10 drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)]" 
          style={{ imageRendering: 'pixelated' }} 
          alt={node.title} 
        />

        {/* Lock Overlay */}
        {!isUnlocked && (
          <img 
            src={LockIcon} 
            className="w-16 h-16 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 drop-shadow-xl" 
            style={{ imageRendering: 'pixelated' }} 
            alt="Locked" 
          />
        )}
      </div>

      {/* Label */}
      <div 
        className={`absolute -bottom-8 font-pixel text-sm whitespace-nowrap bg-retro-dark px-3 py-1 border-2 border-white transition-opacity duration-300 ${isUnlocked ? 'opacity-100' : 'opacity-0'} group-hover:opacity-100 pointer-events-none drop-shadow-md z-40`}
        style={{ color: colors.bg }}
      >
        {node.title}
      </div>
    </div>
  );
}
