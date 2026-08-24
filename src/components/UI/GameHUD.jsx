import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import SimpleViewToggle from './SimpleViewToggle';

export default function GameHUD({ discoveredCount, totalNodes, muted, setMuted }) {
  const percentage = (discoveredCount / totalNodes) * 100;
  const isComplete = discoveredCount === totalNodes;

  return (
    <>
      <div className="absolute top-0 left-0 right-0 w-full z-50 pointer-events-auto">
        <div className={`bg-retro-dark/95 flex flex-col justify-center items-center gap-1 md:gap-3 w-full shadow-2xl font-pixel border-b-2 md:border-b-8 ${isComplete ? 'border-retro-yellow shadow-[0_10px_30px_rgba(244,180,27,0.4)]' : 'border-retro-gray'} p-2 md:p-4 transition-all duration-700`}>
          <div className={`flex justify-between items-center font-bold w-full max-w-7xl px-2 md:px-8 ${isComplete ? 'text-retro-yellow animate-pulse' : 'text-retro-light-green'}`}>
            <span className="text-[10px] md:text-xl tracking-widest">{isComplete ? 'PORTFOLIO MASTERED!' : 'EXPLORATION PROGRESS'}</span>
            <span className="text-[10px] md:text-xl">{isComplete ? '100%' : `${Math.round(percentage)}%`}</span>
          </div>
          
          {/* Massive Progress Bar (Compacted vertically) */}
          <div className="w-full max-w-7xl h-4 md:h-8 bg-black border-2 md:border-4 border-retro-gray relative overflow-hidden shadow-inner">
            <div 
              className={`h-full transition-all duration-1000 ease-out ${isComplete ? 'bg-retro-yellow shadow-[0_0_20px_#f4b41b]' : 'bg-retro-light-green shadow-[0_0_15px_#83eb72]'}`} 
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* Centered Bottom Floating Controls */}
      <div className="absolute bottom-4 md:bottom-10 left-0 right-0 flex items-center justify-center gap-3 md:gap-8 z-40 pointer-events-auto px-2 md:px-4" style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}>
        <SimpleViewToggle />
        
        <button 
          className="pixel-btn bg-[#569ceb] hover:bg-[#83eb72] transition-colors shadow-[4px_4px_0_rgba(0,0,0,0.5)] md:shadow-[8px_8px_0_rgba(0,0,0,0.5)] text-center text-xs md:text-2xl px-3 md:px-12 py-2 md:py-6 border-2 md:border-4 flex items-center justify-center gap-2 md:gap-3 text-white h-10 md:h-20"
          onClick={() => setMuted(!muted)}
        >
          {muted ? <VolumeX size={24} className="w-4 h-4 md:w-8 md:h-8" /> : <Volume2 size={24} className="w-4 h-4 md:w-8 md:h-8" />}
          <span className="hidden sm:inline">{muted ? "UNMUTE SFX" : "MUTE SFX"}</span>
        </button>
      </div>
    </>
  );
}
