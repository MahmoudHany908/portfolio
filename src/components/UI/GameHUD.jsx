import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import SimpleViewToggle from './SimpleViewToggle';

export default function GameHUD({ discoveredCount, totalNodes, muted, setMuted }) {
  const percentage = (discoveredCount / totalNodes) * 100;
  const isComplete = discoveredCount === totalNodes;

  return (
    <>
      <div className="absolute top-0 left-0 right-0 w-full z-50 pointer-events-auto">
        <div className={`bg-retro-dark/95 flex flex-col justify-center items-center gap-2 md:gap-3 w-full shadow-2xl font-pixel border-b-4 md:border-b-8 ${isComplete ? 'border-retro-yellow shadow-[0_10px_30px_rgba(244,180,27,0.4)]' : 'border-retro-gray'} p-3 md:p-4 transition-all duration-700`}>
          <div className={`flex justify-between items-center font-bold w-full max-w-7xl px-4 md:px-8 ${isComplete ? 'text-retro-yellow animate-pulse' : 'text-retro-light-green'}`}>
            <span className="text-sm md:text-xl tracking-widest">{isComplete ? 'PORTFOLIO MASTERED!' : 'EXPLORATION PROGRESS'}</span>
            <span className="text-sm md:text-xl">{isComplete ? '100%' : `${Math.round(percentage)}%`}</span>
          </div>
          
          {/* Massive Progress Bar (Compacted vertically) */}
          <div className="w-full max-w-7xl h-6 md:h-8 bg-black border-2 md:border-4 border-retro-gray relative overflow-hidden shadow-inner">
            <div 
              className={`h-full transition-all duration-1000 ease-out ${isComplete ? 'bg-retro-yellow shadow-[0_0_20px_#f4b41b]' : 'bg-retro-light-green shadow-[0_0_15px_#83eb72]'}`} 
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* Bottom Control Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-16 md:h-20 bg-retro-dark border-t-4 border-slate-600 shadow-2xl flex items-center justify-between px-4 md:px-8 z-40 pointer-events-auto">
        <SimpleViewToggle />
        
        <Link to="/preview" className="pixel-btn bg-retro-yellow text-retro-dark hover:bg-white transition-colors text-[10px] md:text-sm px-4 py-2 border-4 mx-2">
          SEE PREVIEW
        </Link>
        
        <button 
          className="pixel-btn bg-[#569ceb] hover:bg-[#83eb72] transition-colors shadow-xl text-center text-[10px] md:text-lg px-2 md:px-8 py-2 md:py-4 border-4 flex items-center justify-center gap-2 text-white h-10 md:h-16 w-28 md:w-64"
          onClick={() => setMuted(!muted)}
        >
          {muted ? <VolumeX size={16} className="md:w-6 md:h-6" /> : <Volume2 size={16} className="md:w-6 md:h-6" />}
          <span>{muted ? "UNMUTE SFX" : "MUTE SFX"}</span>
        </button>
      </div>
    </>
  );
}
