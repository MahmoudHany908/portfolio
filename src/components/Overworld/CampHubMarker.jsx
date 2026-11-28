import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useGameAudio from '../../hooks/useGameAudio';
import LandmarkBurst from './LandmarkBurst';
import { LockIcon } from './PixelAssets';
import { GAME_SPRITES } from './GamePixelIcons';

export const shortGameName = (node) => {
  if (!node) return '';
  const names = {
    proj_gm: 'GM VR Suite',
    proj2: 'Cyber Salvage',
    proj1: 'Learning Lens',
    proj4: 'Subject Null',
    proj3: 'VR Wave Shooter',
    proj6: 'Two Bows Off Frame',
    proj7: 'Night Shift Taxi',
    proj8: 'LoadNExplode',
    proj5: 'ESCCTRL',
    about: 'About Me',
    skills: 'Skills',
    contact: 'Contact & CV'
  };
  return names[node.id] || node.title;
};

/**
 * Clean, High-Clarity Station Marker on the Open Floor.
 * Zero clutter: one glowing floor pad, one crisp sprite, one big readable signplate,
 * and a clear `[ ENTER / E ] OPEN` prompt whenever the player walks near it!
 */
export function HubMarker({
  hub,
  x,
  y,
  discovered,
  unlocked,
  burstMap,
  isNearby,
  isNext,
  isMobileLayout,
  onActivate
}) {
  const { playHover, playSelect } = useGameAudio();
  const total = hub.children.length;
  const done = hub.children.filter((c) => discovered.has(c.id)).length;
  const complete = done === total;
  const isUnlocked = hub.children.some((c) => unlocked.has(c.id));
  const sprite = hub.isSingle ? GAME_SPRITES[hub.node.id] : hub.sprite;
  const burst = hub.children.map((c) => burstMap[c.id]).find(Boolean);
  const accent = hub.accent;

  return (
    <div
      className={`absolute flex flex-col items-center z-20 ${
        isUnlocked ? 'cursor-pointer group' : 'cursor-not-allowed'
      }`}
      style={{ left: x, top: y, transform: 'translate(-50%, -50%)' }}
      onPointerEnter={() => isUnlocked && playHover()}
      onClick={(e) => {
        e.stopPropagation();
        if (!isUnlocked) return;
        playSelect();
        onActivate(hub);
      }}
    >
      {/* Single Floating Prompt Slot — NEVER stacks multiple badges */}
      <div className="h-[36px] flex items-end justify-center mb-1">
        {isUnlocked && isNearby ? (
          <motion.div
            initial={{ scale: 0.85, y: 4 }}
            animate={{ scale: 1, y: [0, -5, 0] }}
            transition={{ y: { duration: 0.9, repeat: Infinity, ease: 'easeInOut' } }}
            className="px-3.5 py-1.5 bg-white text-[#090d16] border-[3px] border-black font-pixel text-[11px] shadow-[4px_4px_0_#000] whitespace-nowrap"
          >
            {isMobileLayout ? 'TAP TO OPEN ▶' : '[ ENTER / E ] OPEN'}
          </motion.div>
        ) : !complete && isNext && isUnlocked ? (
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut' }}
            className="px-3 py-1 bg-[#facc15] text-[#090d16] border-[3px] border-black font-pixel text-[10px] shadow-[4px_4px_0_#000] whitespace-nowrap"
          >
            ▼ {hub.step === '01' ? 'START HERE' : 'NEXT'}
          </motion.div>
        ) : null}
      </div>

      {/* Station Sprite + Subtle Floor Pad */}
      <motion.div
        key={burst ? `b-${burst.key}` : 'idle'}
        animate={burst ? { scale: [1, 1.22, 0.96, 1] } : { scale: 1 }}
        transition={{ duration: 0.32 }}
        className="relative w-28 h-28 flex items-center justify-center"
      >
        {/* Clean Glowing Floor Zone Pad */}
        <div
          className="absolute -bottom-1 w-32 h-9 rounded-full border-[3px] transition-all duration-200 pointer-events-none"
          style={
            complete
              ? {
                  backgroundColor: 'rgba(250,204,21,0.22)',
                  borderColor: '#facc15',
                  boxShadow: '0 0 26px rgba(250,204,21,0.55)'
                }
              : isNearby
                ? {
                    backgroundColor: `${accent}33`,
                    borderColor: '#ffffff',
                    boxShadow: `0 0 24px ${accent}`
                  }
                : {
                    backgroundColor: 'rgba(15,23,42,0.75)',
                    borderColor: `${accent}88`
                  }
          }
        />

        <img
          src={sprite}
          alt={hub.title}
          className={`w-24 h-24 relative z-10 transition-transform duration-200 ${
            isUnlocked
              ? isNearby
                ? '-translate-y-2 scale-110'
                : 'group-hover:-translate-y-1.5 group-hover:scale-105'
              : 'grayscale opacity-40'
          }`}
          style={{
            imageRendering: 'pixelated',
            filter: complete
              ? 'drop-shadow(0 0 14px rgba(250,204,21,0.85)) drop-shadow(0 6px 4px rgba(0,0,0,0.9))'
              : 'drop-shadow(0 6px 4px rgba(0,0,0,0.85))'
          }}
        />

        {!isUnlocked && (
          <div className="absolute bottom-0 right-0 z-20 bg-[#0b0e17] rounded-full p-1.5 border-2 border-slate-300">
            <img src={LockIcon} className="w-6 h-6" style={{ imageRendering: 'pixelated' }} alt="Locked" />
          </div>
        )}

        <AnimatePresence>
          {burst && <LandmarkBurst key={burst.key} color={complete ? '#facc15' : accent} variant={burst.variant} />}
        </AnimatePresence>
      </motion.div>

      {/* Big, Clean, Direct Station Signplate — Turns Solid Gold when Completed */}
      <motion.div
        key={complete ? 'plate-gold' : 'plate'}
        initial={complete ? { scale: 1.18 } : false}
        animate={{ scale: isNearby ? 1.05 : 1 }}
        transition={{ type: 'spring', stiffness: 320, damping: 18 }}
        className="mt-2.5 px-4 py-2.5 border-[3px] text-center whitespace-nowrap shadow-[6px_6px_0_rgba(0,0,0,0.9)] transition-colors"
        style={
          complete
            ? {
                background: 'linear-gradient(180deg, #fef08a 0%, #facc15 65%, #eab308 100%)',
                borderColor: '#000000'
              }
            : {
                backgroundColor: '#0d1324',
                borderColor: isNearby ? '#ffffff' : accent
              }
        }
      >
        <div className="flex items-center justify-center gap-2 mb-1">
          <span
            className="font-pixel text-[10px] px-1.5 py-0.5 border border-black font-bold"
            style={
              complete
                ? { backgroundColor: '#1a1305', color: '#facc15' }
                : { backgroundColor: accent, color: '#090d16' }
            }
          >
            {hub.step}
          </span>
          <span
            className="font-pixel text-[17px] tracking-wide"
            style={{
              color: complete ? '#110c02' : '#ffffff',
              textShadow: complete ? 'none' : '2px 2px 0 #000'
            }}
          >
            {hub.title}
          </span>
        </div>

        <div
          className="font-chakra text-xs font-bold tracking-wider uppercase"
          style={{ color: complete ? '#422c04' : '#cbd5e1' }}
        >
          {complete ? '★ COMPLETED' : hub.subtitle}
        </div>

        {!hub.isSingle && (
          <div className="mt-2 flex items-center gap-1.5">
            {hub.children.map((c) => {
              const d = discovered.has(c.id);
              return (
                <div
                  key={c.id}
                  className="h-2.5 flex-1 border border-black"
                  style={{
                    backgroundColor: d ? (complete ? '#1a1305' : '#facc15') : '#1e293b'
                  }}
                />
              );
            })}
          </div>
        )}
      </motion.div>
    </div>
  );
}
