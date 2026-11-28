import React from 'react';
import { motion } from 'framer-motion';

/**
 * Floating 16-bit Royal Gold Crown with Gems — perched above completed checkpoints!
 */
export function MasteredLandmarkOrnament({ isCompleted }) {
  if (!isCompleted) return null;

  return (
    <motion.div
      initial={{ scale: 0, y: 12 }}
      animate={{ scale: 1, y: [0, -5, 0] }}
      transition={{
        scale: { type: 'spring', stiffness: 360, damping: 16 },
        y: { duration: 1.8, repeat: Infinity, ease: 'easeInOut' }
      }}
      className="absolute -top-8 z-40 pointer-events-none flex items-center justify-center"
    >
      <svg
        width="52"
        height="36"
        viewBox="0 0 18 12"
        style={{
          imageRendering: 'pixelated',
          shapeRendering: 'crispEdges',
          filter: 'drop-shadow(0 3px 0 #000) drop-shadow(0 0 10px rgba(244,180,27,0.9))'
        }}
      >
        {/* Outer black outline */}
        <path
          d="M2,3 h2 v2 h2 v-2 h1 v-2 h4 v2 h1 v2 h2 v-2 h2 v8 h-14 z"
          fill="#0b0e17"
        />
        {/* Gold body */}
        <rect x="3" y="4" width="1" height="6" fill="#facc15" />
        <rect x="4" y="6" width="10" height="4" fill="#f4b41b" />
        <rect x="14" y="4" width="1" height="6" fill="#eab308" />
        {/* Center & side spires */}
        <rect x="7" y="4" width="4" height="2" fill="#fde08d" />
        <rect x="8" y="2" width="2" height="2" fill="#fef08a" />
        {/* Crown jewels */}
        <rect x="8" y="7" width="2" height="2" fill="#e11d48" />
        <rect x="5" y="7" width="1" height="2" fill="#38bdf8" />
        <rect x="12" y="7" width="1" height="2" fill="#38bdf8" />
        {/* Bottom rim highlight */}
        <rect x="3" y="9" width="12" height="1" fill="#ca8a04" />
      </svg>
    </motion.div>
  );
}

/**
 * Split Pill + Dark Gold-Trimmed Crown Plate:
 * - Unfinished: `[ VR | 0/3 ]` (two-tone split pill)
 * - Mastered:   `[ ★ | Clients ]` (dark obsidian + gold-trimmed plate paired with the Pixel Crown above)
 */
export function UnifiedCheckpointTag({
  title,
  accentColor = '#38bdf8',
  doneCount = 0,
  totalCount = 1,
  isCategory = false,
  isClamped = false,
  isUnlocked = true,
  fontSizes = { badgePx: 16, titlePx: 18 }
}) {
  const isCompleted = doneCount >= totalCount;
  const titlePx = fontSizes.titlePx || 18;
  const badgePx = fontSizes.badgePx || 16;

  if (!isUnlocked) {
    return (
      <div
        style={{ fontSize: `${titlePx}px` }}
        className="mt-1.5 font-pixel leading-none px-3.5 py-1.5 bg-[#161b29] text-slate-400 border-2 border-slate-600 whitespace-nowrap shadow-[4px_4px_0_rgba(0,0,0,0.85)] z-40"
      >
        {title}
      </div>
    );
  }

  if (isCompleted) {
    return (
      <div className="mt-1.5 flex items-center border-[3px] border-[#f4b41b] bg-[#141824] shadow-[0_0_18px_rgba(244,180,27,0.45),4px_4px_0_#000] whitespace-nowrap z-40 overflow-hidden">
        <span
          style={{ fontSize: `${badgePx}px` }}
          className="px-2.5 py-1.5 bg-[#f4b41b] text-[#140e02] font-pixel leading-none font-bold border-r-2 border-black"
        >
          ★
        </span>
        <span
          style={{ fontSize: `${titlePx}px` }}
          className="px-3.5 py-1.5 font-pixel leading-none text-[#fef08a]"
        >
          {title}
        </span>
      </div>
    );
  }

  return (
    <div
      className="mt-1.5 flex items-stretch border-2 bg-[#161b29] shadow-[4px_4px_0_rgba(0,0,0,0.9)] whitespace-nowrap z-40 overflow-hidden"
      style={{ borderColor: isClamped ? '#f4b41b' : '#ffffff' }}
    >
      <span
        style={{ fontSize: `${titlePx}px`, color: accentColor }}
        className="px-3.5 py-1.5 font-pixel leading-none flex items-center"
      >
        {title}
      </span>
      {isCategory && (
        <span
          style={{
            fontSize: `${badgePx}px`,
            backgroundColor: isClamped ? '#f4b41b' : accentColor,
            color: '#0b0e17'
          }}
          className="px-2.5 py-1.5 font-pixel leading-none font-bold border-l-2 border-black flex items-center"
        >
          {isClamped ? `📌${doneCount}/${totalCount}` : `${doneCount}/${totalCount}`}
        </span>
      )}
    </div>
  );
}
