import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import SimpleViewToggle from './SimpleViewToggle';

export default function GameHUD({ discoveredCount, totalNodes, muted, setMuted }) {
  const percentage = (discoveredCount / totalNodes) * 100;
  const isComplete = discoveredCount === totalNodes;

  return (
    <>
      <div className="absolute top-0 left-0 right-0 w-full z-50 pointer-events-auto">
        <div className={`bg-retro-dark/95 flex flex-col justify-center items-center gap-4 w-full shadow-2xl font-pixel border-b-8 ${isComplete ? 'border-retro-yellow shadow-[0_10px_50px_rgba(244,180,27,0.5)]' : 'border-retro-gray'} p-6 transition-all duration-700`}>
          <div className={`flex justify-between items-center font-bold w-full max-w-7xl px-4 md:px-8 ${isComplete ? 'text-retro-yellow animate-pulse' : 'text-retro-light-green'}`}>
            <span className="text-xl md:text-3xl tracking-widest">{isComplete ? 'PORTFOLIO MASTERED!' : 'EXPLORATION PROGRESS'}</span>
            <span className="text-xl md:text-3xl">{isComplete ? '100%' : `${Math.round(percentage)}%`}</span>
          </div>
          
          {/* Massive Progress Bar */}
          <div className="w-full max-w-7xl h-10 md:h-12 bg-black border-4 border-retro-gray relative overflow-hidden shadow-inner">
            <div 
              className={`h-full transition-all duration-1000 ease-out ${isComplete ? 'bg-retro-yellow shadow-[0_0_30px_#f4b41b]' : 'bg-retro-light-green shadow-[0_0_20px_#83eb72]'}`} 
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-4 pointer-events-auto">
        <SimpleViewToggle />
        
        <button 
          className="pixel-btn flex items-center gap-2 shadow-xl mt-2 text-sm"
          onClick={() => setMuted(!muted)}
        >
          {muted ? <VolumeX size={20} /> : <Volume2 size={20} />}
          {muted ? "UNMUTE SFX" : "MUTE SFX"}
        </button>
      </div>
    </>
  );
}
