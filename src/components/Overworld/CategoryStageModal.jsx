import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trophy, Sparkles } from 'lucide-react';
import useGameAudio from '../../hooks/useGameAudio';
import { GAME_SPRITES, PROJECT_CARD_META } from './GamePixelIcons';
import { shortGameName } from './CampHubMarker';

/**
 * Non-blocking in-card confetti & +100 XP pop when an individual project is newly cleared!
 */
function CardClearBurst() {
  const colors = ['#facc15', '#ffffff', '#38bdf8', '#4ade80', '#fb923c', '#f472b6'];
  return (
    <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-30 overflow-visible">
      {Array.from({ length: 16 }).map((_, i) => {
        const angle = (i / 16) * Math.PI * 2;
        const dist = 85 + (i % 3) * 35;
        return (
          <motion.div
            key={i}
            initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
            animate={{
              x: Math.cos(angle) * dist,
              y: Math.sin(angle) * dist,
              scale: [0, 1.35, 0.6],
              opacity: [1, 1, 0],
              rotate: 160
            }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            className="absolute w-3.5 h-3.5 border border-black"
            style={{ backgroundColor: colors[i % colors.length] }}
          />
        );
      })}

      <motion.div
        initial={{ y: 12, scale: 0.5, opacity: 0 }}
        animate={{ y: -38, scale: [0.6, 1.15, 1], opacity: [0, 1, 1, 0] }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
        className="px-3.5 py-1.5 bg-black text-[#facc15] border-2 border-[#facc15] font-pixel text-xs shadow-[4px_4px_0_#000] whitespace-nowrap"
      >
        ★ STAGE CLEARED! +100 XP
      </motion.div>
    </div>
  );
}

/**
 * Spacious Retro Stage-Select Screen for Multi-Project Categories.
 * Every game gets a wide cartridge card with 1-line hook + tech/video badges.
 * Single clears burst into gold right on the card (zero modal interruption!).
 */
export function CategoryStageModal({
  hub,
  discovered,
  justClearedId,
  onSelectProject,
  onClose
}) {
  const { playHover, playSelect } = useGameAudio();

  useEffect(() => {
    if (!hub) return;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [hub, onClose]);

  if (!hub) return null;

  const total = hub.children.length;
  const done = hub.children.filter((c) => discovered.has(c.id)).length;
  const allComplete = done === total;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-xs"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 18 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 12 }}
          transition={{ type: 'spring', stiffness: 320, damping: 24 }}
          className="relative z-10 w-full max-w-5xl max-h-[90dvh] overflow-y-auto bg-[#0b0f1c] border-4 shadow-[14px_14px_0_rgba(0,0,0,0.95)] p-5 md:p-8"
          style={{ borderColor: allComplete ? '#facc15' : hub.accent }}
        >
          {/* Stage-Select Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-5 mb-6 border-b-4 border-slate-800">
            <div className="flex items-center gap-4">
              <div
                className="w-16 h-16 shrink-0 bg-[#141b30] border-[3px] p-2 flex items-center justify-center shadow-[4px_4px_0_#000]"
                style={{ borderColor: allComplete ? '#facc15' : hub.accent }}
              >
                <img
                  src={hub.sprite}
                  alt={hub.title}
                  className="w-full h-full"
                  style={{ imageRendering: 'pixelated' }}
                />
              </div>
              <div>
                <div
                  className="font-pixel text-[10px] md:text-xs uppercase tracking-widest mb-1.5"
                  style={{ color: allComplete ? '#facc15' : hub.accent }}
                >
                  {allComplete
                    ? '★ ALL STAGES CLEARED · ROOM GOLD! ★'
                    : `SELECT A PROJECT · ${done} OF ${total} CLEARED`}
                </div>
                <h2 className="font-pixel text-lg md:text-2xl text-white">{hub.title}</h2>
              </div>
            </div>

            <button
              onClick={onClose}
              className="px-4 py-2.5 bg-rose-600 hover:bg-rose-500 border-2 border-black font-pixel text-xs text-white flex items-center gap-2 shadow-[4px_4px_0_#000] cursor-pointer"
            >
              <X size={16} /> BACK TO STUDIO
            </button>
          </div>

          {/* Spacious Stage Cartridge Grid */}
          <div
            className={`grid gap-5 ${
              total === 2 ? 'md:grid-cols-2' : total === 3 ? 'lg:grid-cols-3 md:grid-cols-2' : 'md:grid-cols-2'
            }`}
          >
            {hub.children.map((proj, idx) => {
              const isCleared = discovered.has(proj.id);
              const isFreshClear = justClearedId === proj.id;
              const logo = GAME_SPRITES[proj.id];
              const meta = PROJECT_CARD_META[proj.id] || { hook: proj.summary, badges: [] };

              return (
                <motion.button
                  key={proj.id}
                  type="button"
                  initial={isFreshClear ? { scale: 0.92, rotate: -2 } : false}
                  animate={isFreshClear ? { scale: [0.92, 1.06, 1], rotate: [2, -1, 0] } : { scale: 1, rotate: 0 }}
                  whileHover={{ y: -5, scale: 1.015 }}
                  whileTap={{ scale: 0.985 }}
                  transition={{ type: 'spring', stiffness: 320, damping: 18 }}
                  onPointerEnter={() => playHover()}
                  onClick={() => {
                    playSelect();
                    onSelectProject(proj);
                  }}
                  className="relative text-left p-5 border-4 flex flex-col justify-between gap-4 cursor-pointer transition-colors shadow-[8px_8px_0_rgba(0,0,0,0.9)] group"
                  style={
                    isCleared
                      ? {
                          background: 'linear-gradient(145deg, #fef08a 0%, #facc15 55%, #eab308 100%)',
                          borderColor: '#000000',
                          boxShadow: '0 0 28px rgba(250,204,21,0.45), 8px 8px 0 #000'
                        }
                      : {
                          backgroundColor: '#131a2e',
                          borderColor: hub.accent
                        }
                  }
                >
                  {isFreshClear && <CardClearBurst />}

                  {/* Top Row: Stage Number + Status Ribbon */}
                  <div className="flex items-center justify-between gap-2 w-full">
                    <span
                      className="font-pixel text-[10px] px-2.5 py-1 border-2"
                      style={
                        isCleared
                          ? { backgroundColor: '#1a1305', color: '#facc15', borderColor: '#000' }
                          : { backgroundColor: '#090c16', color: hub.accent, borderColor: `${hub.accent}88` }
                      }
                    >
                      STAGE 0{idx + 1}
                    </span>

                    {isCleared ? (
                      <span className="font-pixel text-[10px] px-2.5 py-1 bg-emerald-900 text-emerald-200 border-2 border-black flex items-center gap-1">
                        <Trophy size={12} className="text-yellow-300" /> CLEARED ★
                      </span>
                    ) : (
                      <span className="font-pixel text-[10px] px-2 py-0.5 bg-white/10 text-amber-300 border border-amber-400/40">
                        NEW
                      </span>
                    )}
                  </div>

                  {/* Center Icon + Title + Role/Client */}
                  <div className="flex items-center gap-4">
                    <div
                      className="w-20 h-20 shrink-0 border-[3px] p-2.5 flex items-center justify-center shadow-[4px_4px_0_rgba(0,0,0,0.6)]"
                      style={
                        isCleared
                          ? { backgroundColor: '#1a1305', borderColor: '#000' }
                          : { backgroundColor: '#090c16', borderColor: 'rgba(255,255,255,0.25)' }
                      }
                    >
                      <img
                        src={logo}
                        alt={proj.title}
                        className="w-full h-full"
                        style={{ imageRendering: 'pixelated' }}
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3
                        className="font-pixel text-sm md:text-base leading-snug mb-1"
                        style={{ color: isCleared ? '#110d04' : '#ffffff' }}
                      >
                        {shortGameName(proj)}
                      </h3>
                      <p
                        className="font-chakra text-xs font-bold uppercase tracking-wide"
                        style={{ color: isCleared ? '#452c04' : hub.accent }}
                      >
                        {proj.client
                          ? `Client: ${proj.client}`
                          : proj.jam
                            ? proj.jam
                            : proj.role}
                      </p>
                    </div>
                  </div>

                  {/* 1-Line Gameplay / Engineering Hook */}
                  <p
                    className="font-chakra text-sm leading-relaxed"
                    style={{ color: isCleared ? '#1f1605' : '#cbd5e1' }}
                  >
                    {meta.hook}
                  </p>

                  {/* Tech & Media Signal Badges */}
                  {meta.badges.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {meta.badges.map((b) => (
                        <span
                          key={b}
                          className="font-chakra text-[11px] font-bold px-2 py-0.5 border"
                          style={
                            isCleared
                              ? {
                                  backgroundColor: 'rgba(26,19,5,0.14)',
                                  borderColor: '#1a1305',
                                  color: '#110d04'
                                }
                              : {
                                  backgroundColor: '#090d19',
                                  borderColor: 'rgba(148,163,184,0.35)',
                                  color: '#e2e8f0'
                                }
                          }
                        >
                          {b}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Bottom CTA Bar */}
                  <div
                    className="w-full py-2.5 px-4 border-2 text-center font-pixel text-xs transition-transform group-hover:translate-x-1"
                    style={
                      isCleared
                        ? { backgroundColor: '#1a1305', color: '#fde047', borderColor: '#000' }
                        : { backgroundColor: hub.accent, color: '#090c16', borderColor: '#000' }
                    }
                  >
                    {isCleared ? '★ REPLAY SHOWCASE →' : '▶ OPEN PROJECT →'}
                  </div>
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

/**
 * Tier-2 Full-Screen Arcade Celebration — reserved for mastering a full category or 100% of the studio!
 */
export function StageClearCelebration({ celebration, onDismiss }) {
  useEffect(() => {
    if (!celebration) return;
    const t = setTimeout(onDismiss, 2600);
    return () => clearTimeout(t);
  }, [celebration, onDismiss]);

  return (
    <AnimatePresence>
      {celebration && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onDismiss}
          className="fixed inset-0 z-[95] bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 cursor-pointer select-none overflow-hidden"
        >
          {/* Radial Confetti Pixel Particles */}
          {Array.from({ length: 28 }).map((_, i) => {
            const angle = (i / 28) * Math.PI * 2;
            const dist = 170 + (i % 4) * 70;
            const colors = ['#facc15', '#38bdf8', '#4ade80', '#f472b6', '#fb923c', '#ffffff'];
            return (
              <motion.div
                key={i}
                initial={{ x: 0, y: 0, scale: 0, opacity: 1, rotate: 0 }}
                animate={{
                  x: Math.cos(angle) * dist,
                  y: Math.sin(angle) * dist,
                  scale: [0, 1.4, 0.8],
                  opacity: [1, 1, 0],
                  rotate: 180
                }}
                transition={{ duration: 1.3, ease: 'easeOut' }}
                className="absolute w-4 h-4 border border-black"
                style={{ backgroundColor: colors[i % colors.length] }}
              />
            );
          })}

          {/* Arcade Trophy Banner Card */}
          <motion.div
            initial={{ scale: 0.4, rotate: -6, y: 40 }}
            animate={{ scale: 1, rotate: 0, y: 0 }}
            exit={{ scale: 0.85, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 320, damping: 18 }}
            className="relative bg-gradient-to-b from-[#fef08a] via-[#facc15] to-[#eab308] border-[6px] border-black shadow-[0_0_80px_rgba(250,204,21,0.85),12px_12px_0_#000] px-8 py-7 max-w-lg w-full text-center"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-black text-[#facc15] font-pixel text-[10px] mb-4">
              <Sparkles size={14} />{' '}
              {celebration.isFullStudio
                ? '100% STUDIO MASTERED!'
                : celebration.hubMastered
                  ? 'ROOM 100% CLEARED!'
                  : 'CHECKPOINT CLEARED! +100 XP'}
            </div>

            <motion.div
              animate={{ y: [0, -8, 0], rotate: [-3, 3, -3] }}
              transition={{ duration: 0.9, repeat: Infinity }}
              className="w-24 h-24 mx-auto mb-4 bg-[#111522] border-4 border-black p-3 shadow-[6px_6px_0_#000]"
            >
              <img
                src={celebration.sprite || GAME_SPRITES[celebration.node.id]}
                alt=""
                className="w-full h-full"
                style={{ imageRendering: 'pixelated' }}
              />
            </motion.div>

            <h2 className="font-pixel text-xl md:text-2xl text-black leading-snug mb-2">
              {celebration.title || shortGameName(celebration.node)}
            </h2>

            <p className="font-pixel text-xs text-amber-950 mb-4">
              {celebration.isFullStudio
                ? '★ ALL 6 STUDIO ROOMS POWERED GOLD! ★'
                : celebration.hubMastered
                  ? `★ ${celebration.hubTitle.toUpperCase()} TURNED GOLD! ★`
                  : `PROGRESS: ${celebration.done}/${celebration.total} CLEARED`}
            </p>

            {/* Live Filling Progress Bar */}
            <div className="w-full h-5 bg-black p-1 border-2 border-black">
              <motion.div
                initial={{ width: `${Math.max(0, ((celebration.done - 1) / celebration.total) * 100)}%` }}
                animate={{ width: `${(celebration.done / celebration.total) * 100}%` }}
                transition={{ duration: 0.65, delay: 0.15, ease: 'easeOut' }}
                className="h-full bg-[#4ade80]"
              />
            </div>

            <div className="mt-4 font-pixel text-[9px] text-black/75">[ CLICK ANYWHERE TO CONTINUE ]</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
