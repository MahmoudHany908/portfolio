import React from 'react';
import { Link } from 'react-router-dom';
import { Volume2, VolumeX, FileDown, LayoutList } from 'lucide-react';

/**
 * Clean, Direct Single-Line Header — delivers Mahmoud's identity & value proposition immediately
 * like a clean modern portfolio, without cluttering the screen with extra buttons.
 */
export default function StudioHUD({
  discovered,
  totalNodes,
  muted,
  setMuted
}) {
  const count = discovered.size;
  const pct = Math.round((count / totalNodes) * 100);
  const allMastered = count === totalNodes;

  return (
    <header
      className={`shrink-0 bg-[#0b0f1d] border-b-2 px-4 md:px-7 py-2.5 flex flex-wrap items-center justify-between gap-3 z-30 ${
        allMastered ? 'border-[#facc15]' : 'border-slate-800'
      }`}
    >
      {/* Left: Direct Message — Who You Are & What You Build */}
      <div className="flex items-center gap-3 min-w-0">
        <img
          src="/profile.jpg"
          alt="Mahmoud Hany"
          className="w-10 h-10 object-cover object-[50%_10%] border-2 border-[#38bdf8] shrink-0"
        />
        <div className="min-w-0">
          <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-0.5">
            <h1 className="font-pixel text-xs md:text-sm text-white tracking-wide m-0">
              MAHMOUD HANY
            </h1>
            <span className="font-chakra text-xs md:text-sm font-bold text-[#38bdf8]">
              Unity &amp; XR Game Developer
            </span>
          </div>
          <p className="hidden sm:block font-chakra text-xs text-slate-400 truncate m-0">
            VR Training Simulations &amp; Gameplay Systems · General Motors · NBE · Meta Quest
          </p>
        </div>
      </div>

      {/* Right: Clean Progress + 1-Click CV + Simple Website Toggle + Sound */}
      <div className="flex items-center gap-2">
        <div className="hidden md:flex items-center gap-2 bg-[#070a14] border border-slate-700 px-3 py-1.5 mr-1">
          <span className="font-chakra text-xs font-bold text-slate-300">
            {count}/{totalNodes} Explored
          </span>
          <div className="w-20 h-2 bg-slate-800 overflow-hidden">
            <div
              className="h-full transition-all duration-500"
              style={{
                width: `${pct}%`,
                backgroundColor: allMastered ? '#facc15' : '#4ade80'
              }}
            />
          </div>
        </div>

        <a
          href="/Mahmoud_Hany_CV.pdf"
          target="_blank"
          rel="noreferrer"
          className="px-3 py-1.5 bg-[#facc15] hover:bg-yellow-300 text-black border-2 border-black font-pixel text-[10px] flex items-center gap-1.5 shadow-[3px_3px_0_#000]"
        >
          <FileDown size={14} /> CV
        </a>

        <Link
          to="/simple"
          className="px-3 py-1.5 bg-[#1e293b] hover:bg-[#334155] text-white border-2 border-slate-600 font-pixel text-[10px] flex items-center gap-1.5"
        >
          <LayoutList size={14} className="text-[#38bdf8]" />{' '}
          <span className="hidden sm:inline">SIMPLE VIEW</span>
        </Link>

        <button
          type="button"
          onClick={() => setMuted(!muted)}
          title={muted ? 'Unmute SFX' : 'Mute SFX'}
          className="p-1.5 bg-[#090d19] hover:bg-slate-800 text-slate-200 border-2 border-slate-700 cursor-pointer"
        >
          {muted ? (
            <VolumeX size={16} className="text-rose-400" />
          ) : (
            <Volume2 size={16} className="text-[#4ade80]" />
          )}
        </button>
      </div>
    </header>
  );
}
