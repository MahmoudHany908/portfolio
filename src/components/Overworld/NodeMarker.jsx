import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useGameAudio from '../../hooks/useGameAudio';
import LandmarkBurst from './LandmarkBurst';
import { MasteredLandmarkOrnament, UnifiedCheckpointTag } from './CheckpointTagStyles';
import {
  LandmarkStart,
  LandmarkSkills,
  LandmarkProjects,
  LandmarkProjectsOpen,
  LandmarkNBE,
  LandmarkTrophy3,
  LandmarkContact,
  LockIcon
} from './PixelAssets';

const getLandmarkSVG = (id, isCompleted) => {
  switch (id) {
    case 'about':
      return LandmarkStart;
    case 'skills':
      return LandmarkSkills;
    case 'contact':
      return LandmarkContact;
    case 'proj2':
      return LandmarkNBE;
    case 'proj6':
      return LandmarkTrophy3;
    default:
      return isCompleted ? LandmarkProjectsOpen : LandmarkProjects;
  }
};

export default function NodeMarker({
  node,
  x,
  y,
  isCompleted,
  isUnlocked,
  isAimed = false,
  isHit = false,
  isCelebrated = false,
  showStartPrompt = false,
  fontSizes = { badgePx: 16, titlePx: 18 },
  onSelect
}) {
  const { playHover, playSelect } = useGameAudio();

  const getColors = () => {
    if (isCompleted) return { bg: '#f4b41b', text: '#f4b41b' };
    switch (node.type) {
      case 'about':
      case 'start':
        return { bg: '#d95763', text: '#d95763' };
      case 'skills':
      case 'skill':
        return { bg: '#f4b41b', text: '#f4b41b' };
      case 'contact':
        return { bg: '#83eb72', text: '#83eb72' };
      default:
        return { bg: '#569ceb', text: '#569ceb' };
    }
  };

  const colors = getColors();
  const LandmarkSVG = getLandmarkSVG(node.id, isCompleted);

  const shortTitle =
    node.type === 'about'
      ? 'About Me'
      : node.type === 'skills'
        ? 'Skills'
        : node.type === 'contact'
          ? 'Contact'
          : node.title;

  return (
    <div
      className={`absolute flex flex-col items-center justify-center z-30 ${
        isUnlocked ? 'cursor-pointer group' : 'cursor-not-allowed group'
      }`}
      style={{ left: x, top: y, transform: 'translate(-50%, -50%)' }}
      onPointerEnter={() => isUnlocked && playHover()}
      onClick={(e) => {
        e.stopPropagation();
        if (isUnlocked) {
          playSelect();
          onSelect(node);
        }
      }}
    >
      {/* Golden Vertical Light Pillar on First Completion */}
      <AnimatePresence>
        {isCelebrated && (
          <motion.div
            initial={{ scaleX: 0.2, opacity: 1 }}
            animate={{ scaleX: [0.3, 1.5, 0], opacity: [1, 0.9, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            className="absolute bottom-6 w-20 h-72 pointer-events-none z-50 origin-bottom"
            style={{
              background:
                'linear-gradient(0deg, #f4b41b 0%, rgba(254,240,138,0.92) 40%, transparent 100%)',
              filter: 'blur(3px)'
            }}
          />
        )}
      </AnimatePresence>

      {/* First-Time Visitor Cue on About Me — RPG Parchment Sign */}
      <AnimatePresence>
        {showStartPrompt && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.9 }}
            animate={{ opacity: 1, y: [0, -10, 0], scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{
              y: { duration: 1.05, repeat: Infinity, ease: 'easeInOut' },
              opacity: { duration: 0.2 }
            }}
            className="absolute bottom-full mb-2 z-40 pointer-events-none flex flex-col items-center"
          >
            <div
              className="border-[3px] px-5 py-2.5 font-pixel whitespace-nowrap tracking-wider flex items-center"
              style={{
                fontSize: `${Math.max(fontSizes.titlePx || 20, 20)}px`,
                background: 'linear-gradient(180deg, #fdf6e3 0%, #ebd9b4 100%)',
                borderColor: '#451a03',
                color: '#3b1d0a',
                boxShadow: '0 6px 0 rgba(0,0,0,0.7)'
              }}
            >
              START HERE
            </div>
            {/* Chunky Pixel Pointer Arrow */}
            <svg
              width="32"
              height="20"
              viewBox="0 0 16 10"
              style={{ imageRendering: 'pixelated' }}
              className="-mt-[2px] drop-shadow-[0_4px_0_rgba(0,0,0,0.75)]"
            >
              <polygon points="1,0 15,0 8,9" fill="#451a03" />
              <polygon points="3,0 13,0 8,7" fill="#ebd9b4" />
            </svg>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Whole Checkpoint Recoil + Tilt + Shake Wrapper (zero CSS transition-transform conflict!) */}
      <motion.div
        animate={
          isHit
            ? {
                x: [0, -10, 10, -7, 7, -3, 3, 0],
                rotate: [0, -5, 5, -3, 3, 0],
                scale: [1, 1.22, 0.92, 1.08, 1]
              }
            : { x: 0, rotate: 0, scale: 1 }
        }
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="flex flex-col items-center justify-center"
      >
        {/* Landmark Circle + Mastered Visual Ornament (Crown / Flag / Laurels / Stamp) */}
        <div className="relative w-24 h-24 md:w-32 md:h-32 flex items-center justify-center pointer-events-auto group-hover:scale-110 transition-transform duration-150">
          <MasteredLandmarkOrnament isCompleted={isCompleted} />

          {/* Glowing Background Circle — turns gleaming gold gradient when completed */}
          <div
            className={`absolute inset-2 rounded-full transition-all ${
              !isUnlocked ? 'grayscale opacity-40' : 'opacity-90'
            }`}
            style={
              isHit
                ? {
                    backgroundColor: '#ffffff',
                    boxShadow: '0 0 45px #ffffff, 0 0 70px #f4b41b'
                  }
                : isCompleted
                  ? {
                      background: 'radial-gradient(circle, #fef08a 0%, #f4b41b 65%, #ca8a04 100%)',
                      boxShadow: '0 0 32px #f4b41b, inset 0 0 14px rgba(255,255,255,0.8)'
                    }
                  : {
                      backgroundColor: colors.bg,
                      boxShadow: `0 0 20px ${colors.bg}, inset 0 0 10px rgba(255,255,255,0.5)`
                    }
            }
          />

          {/* Aiming Target Lock Reticle while Knight Draws Bow */}
          {isAimed && (
            <motion.div
              animate={{ rotate: 180, scale: [1.22, 1.05, 1.22] }}
              transition={{ duration: 0.7, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute inset-0 rounded-full border-[3px] border-dashed border-retro-red pointer-events-none z-30"
            />
          )}

          {/* Impact Shockwave + Sparks + HIT! Callout */}
          <AnimatePresence>
            {isHit && (
              <>
                <LandmarkBurst color="#f4b41b" variant="discover" />
                <motion.div
                  initial={{ scale: 0.5, opacity: 1 }}
                  animate={{ scale: 2.1, opacity: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.42, ease: 'easeOut' }}
                  className="absolute inset-2 rounded-full border-4 border-white pointer-events-none z-40"
                />
                <motion.div
                  initial={{ y: 0, scale: 0.6, opacity: 1 }}
                  animate={{ y: -42, scale: 1.15, opacity: 0 }}
                  transition={{ duration: 0.45, ease: 'easeOut' }}
                  className="absolute -top-6 px-3 py-0.5 bg-retro-red text-white border-2 border-black font-pixel text-xs shadow-[3px_3px_0_#000] pointer-events-none z-50"
                >
                  HIT!
                </motion.div>
              </>
            )}
            {isCelebrated && <LandmarkBurst color="#f4b41b" variant="discover" />}
          </AnimatePresence>

          {/* Pixel Art Landmark Structure */}
          <img
            src={LandmarkSVG}
            className={`w-full h-full relative z-10 drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)] transition-all ${
              !isUnlocked ? 'grayscale opacity-50' : ''
            }`}
            style={{ imageRendering: 'pixelated' }}
            alt={shortTitle}
          />

          {!isUnlocked && (
            <div className="absolute -bottom-2 -right-2 z-20 bg-retro-dark rounded-full p-2 border-2 border-white shadow-xl flex items-center justify-center">
              <img src={LockIcon} className="w-8 h-8" style={{ imageRendering: 'pixelated' }} alt="Locked" />
            </div>
          )}
        </div>

        {/* Unified Single Bottom Tag */}
        <UnifiedCheckpointTag
          title={shortTitle}
          accentColor={colors.text}
          doneCount={isCompleted ? 1 : 0}
          totalCount={1}
          isCategory={false}
          isClamped={false}
          isUnlocked={isUnlocked}
          fontSizes={fontSizes}
        />
      </motion.div>
    </div>
  );
}
