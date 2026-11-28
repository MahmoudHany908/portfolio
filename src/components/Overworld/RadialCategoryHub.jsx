import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useGameAudio from '../../hooks/useGameAudio';
import LandmarkBurst from './LandmarkBurst';
import { MasteredLandmarkOrnament, UnifiedCheckpointTag } from './CheckpointTagStyles';
import { LockIcon } from './PixelAssets';
import { GAME_SPRITES, HubIconSims, HubIconVR, HubIconJams } from './GamePixelIcons';

export const LIVE_CATEGORIES = (nodeById) => [
  {
    id: 'cat_clients',
    title: 'Clients',
    color: '#38bdf8',
    sprite: HubIconSims,
    x: 620,
    y: 410,
    pX: 450,
    pY: 1180,
    projects: [nodeById.proj_gm, nodeById.proj2].filter(Boolean)
  },
  {
    id: 'cat_vr',
    title: 'VR',
    color: '#c084fc',
    sprite: HubIconVR,
    x: 1010,
    y: 450,
    pX: 450,
    pY: 1700,
    projects: [nodeById.proj3, nodeById.proj4, nodeById.proj1].filter(Boolean)
  },
  {
    id: 'cat_2d',
    title: '2D',
    color: '#f4b41b',
    sprite: HubIconJams,
    x: 1400,
    y: 390,
    pX: 450,
    pY: 2220,
    projects: [nodeById.proj6, nodeById.proj7, nodeById.proj8, nodeById.proj5].filter(Boolean)
  }
];

export const shortProjectLabel = (id, fallback) => {
  const map = {
    proj_gm: 'General Motors',
    proj2: 'National Bank of Egypt',
    proj1: 'Learning Lens',
    proj4: 'Subject Null',
    proj3: 'VR Wave Shooter',
    proj6: 'Two Bows',
    proj7: 'Night Shift Taxi',
    proj8: 'LoadNExplode',
    proj5: 'ESCCTRL'
  };
  return map[id] || fallback;
};

/**
 * Clean 360° Circle Geometry — mathematically spaced so NO two titles or hub badges EVER touch!
 */
export function getCircleOffset(index, total, isMobile = false, projectPx = 18) {
  const extraRadius = Math.max(0, projectPx - 12) * 6;
  const radius = (isMobile ? 164 : 188) + extraRadius;
  let deg;

  if (total === 2) {
    deg = index === 0 ? -148 : -32;
  } else if (total === 3) {
    const angles = [-90, 28, 152];
    deg = angles[index];
  } else {
    deg = -135 + (360 / total) * index;
  }

  const rad = (deg * Math.PI) / 180;
  const dx = Math.cos(rad) * radius;
  const dy = Math.sin(rad) * radius;
  const labelAbove = dy < -15;
  return { dx, dy, labelAbove, radius };
}

export default function RadialCategoryHub({
  category,
  x,
  y,
  discovered,
  unlocked,
  aimingNodeId,
  hitNodeId,
  celebrateNodeId,
  lockedShotHubId,
  clampedHubId,
  setClampedHubId,
  fontSizes = { badgePx: 16, projectPx: 16, titlePx: 18 },
  isMobileLayout,
  muted,
  onSelectProject
}) {
  const { playHover, playSelect } = useGameAudio();
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredProjId, setHoveredProjId] = useState(null);

  const isClamped = clampedHubId === category.id;
  const isLockedForShot = lockedShotHubId === category.id;
  // Stays open on hover, when click-pinned, OR while an arrow is aiming/flying/hitting a project inside!
  const isOpen = isHovered || isClamped || isLockedForShot;

  const total = category.projects.length;
  const doneCount = category.projects.filter((p) => discovered.has(p.id)).length;
  const allCompleted = doneCount === total;
  const isUnlocked = category.projects.some((p) => unlocked.has(p.id));
  const isAnyChildHit = category.projects.some((p) => hitNodeId === p.id);
  const isAnyChildCelebrated = category.projects.some((p) => celebrateNodeId === p.id);

  const hubColor = allCompleted ? '#f4b41b' : category.color;
  const activeRadius = getCircleOffset(0, total, isMobileLayout, fontSizes.projectPx).radius;
  const bridgeSize = activeRadius * 2 + 150;

  return (
    <div
      className={`absolute flex items-center justify-center ${isOpen ? 'z-45' : 'z-30'}`}
      style={{ left: x, top: y, transform: 'translate(-50%, -50%)' }}
      onPointerEnter={() => {
        if (!isMobileLayout && isUnlocked) {
          setIsHovered(true);
          if (!muted) playHover();
        }
      }}
      onPointerLeave={() => {
        if (!isMobileLayout) {
          setIsHovered(false);
          setHoveredProjId(null);
        }
      }}
    >
      {/* Generous Invisible Hover-Bridge Disc while Open so moving cursor to satellites never drops hover */}
      {isOpen && (
        <div
          className="absolute rounded-full pointer-events-auto"
          style={{ width: bridgeSize, height: bridgeSize }}
          onClick={(e) => {
            e.stopPropagation();
            if (isClamped && !isLockedForShot) setClampedHubId(null);
          }}
        />
      )}

      {/* Golden Vertical Light Pillar when Mastering the Category */}
      <AnimatePresence>
        {isAnyChildCelebrated && allCompleted && (
          <motion.div
            initial={{ scaleX: 0.2, opacity: 1 }}
            animate={{ scaleX: [0.3, 1.5, 0], opacity: [1, 0.9, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.95, ease: 'easeOut' }}
            className="absolute bottom-6 w-24 h-80 pointer-events-none z-50 origin-bottom"
            style={{
              background:
                'linear-gradient(0deg, #f4b41b 0%, rgba(254,240,138,0.92) 40%, transparent 100%)',
              filter: 'blur(3px)'
            }}
          />
        )}
      </AnimatePresence>

      {/* ── 360° ORBIT RING & ENERGY SPOKES ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.svg
            key="orbit-ring"
            initial={{ opacity: 0, scale: 0.55 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{ type: 'spring', stiffness: 320, damping: 22 }}
            width="560"
            height="560"
            viewBox="-280 -280 560 560"
            className="absolute pointer-events-none z-10 overflow-visible"
          >
            <circle
              cx="0"
              cy="0"
              r={activeRadius}
              fill="rgba(14, 19, 32, 0.42)"
              stroke={isClamped ? '#f4b41b' : hubColor}
              strokeWidth="3"
              strokeDasharray="10 8"
              opacity="0.88"
            />

            {category.projects.map((proj, idx) => {
              const { dx, dy } = getCircleOffset(idx, total, isMobileLayout, fontSizes.projectPx);
              const isProjHovered = hoveredProjId === proj.id;
              const isProjHit = hitNodeId === proj.id;
              const isProjAimed = aimingNodeId === proj.id;
              const isProjDone = discovered.has(proj.id);

              return (
                <line
                  key={`spoke-${proj.id}`}
                  x1="0"
                  y1="0"
                  x2={dx}
                  y2={dy}
                  stroke={
                    isProjHit
                      ? '#ffffff'
                      : isProjHovered || isProjAimed
                        ? '#f4b41b'
                        : isProjDone
                          ? '#f4b41b'
                          : hubColor
                  }
                  strokeWidth={isProjHit ? '6' : isProjHovered || isProjAimed ? '4' : '2.5'}
                  strokeDasharray={isProjHit ? undefined : '6 6'}
                  opacity={isProjHovered || isProjHit || isProjAimed ? 1 : 0.65}
                />
              );
            })}
          </motion.svg>
        )}
      </AnimatePresence>

      {/* ── SATELLITE PROJECT ICONS IN 360° CIRCLE ── */}
      <AnimatePresence>
        {isOpen &&
          category.projects.map((proj, idx) => {
            const { dx, dy, labelAbove } = getCircleOffset(idx, total, isMobileLayout, fontSizes.projectPx);
            const isDone = discovered.has(proj.id);
            const isProjHovered = hoveredProjId === proj.id;
            const isThisAimed = aimingNodeId === proj.id;
            const isThisHit = hitNodeId === proj.id;
            const isThisCelebrated = celebrateNodeId === proj.id;
            const sprite = GAME_SPRITES[proj.id];

            const isNbe = proj.id === 'proj2';
            const titlePill = (
              <div
                style={{ fontSize: `${fontSizes.projectPx}px` }}
                className={`${
                  labelAbove ? 'mb-2' : 'mt-2'
                } px-3.5 py-1.5 border-2 font-pixel leading-snug text-center whitespace-nowrap shadow-[4px_4px_0_rgba(0,0,0,0.9)] transition-transform duration-150 ${
                  isProjHovered || isThisAimed
                    ? 'bg-retro-yellow text-retro-dark border-black scale-110 z-50 font-bold'
                    : isDone
                      ? 'bg-[#f4b41b] text-[#140e02] border-black font-bold'
                      : 'bg-retro-dark text-white border-white'
                }`}
              >
                {isNbe ? (
                  <span className="flex flex-col items-center leading-tight">
                    <span>{isDone ? '★ National Bank' : 'National Bank'}</span>
                    <span>of Egypt</span>
                  </span>
                ) : isDone ? (
                  `★ ${shortProjectLabel(proj.id, proj.title)}`
                ) : (
                  shortProjectLabel(proj.id, proj.title)
                )}
              </div>
            );

            return (
              <motion.button
                key={proj.id}
                type="button"
                initial={{ x: 0, y: 0, scale: 0, opacity: 0 }}
                animate={{
                  x: isThisHit ? [dx - 9, dx + 9, dx - 5, dx + 5, dx] : dx,
                  y: dy,
                  scale: isThisHit ? [1, 1.42, 0.92, 1.2] : isProjHovered || isThisAimed ? 1.26 : 1,
                  opacity: 1
                }}
                exit={{ x: 0, y: 0, scale: 0, opacity: 0 }}
                transition={
                  isThisHit
                    ? { duration: 0.36, ease: 'easeOut' }
                    : {
                        type: 'spring',
                        stiffness: 340,
                        damping: 20,
                        delay: idx * 0.035
                      }
                }
                onPointerEnter={() => {
                  setHoveredProjId(proj.id);
                  if (!muted) playHover();
                }}
                onPointerLeave={() => {
                  setHoveredProjId((curr) => (curr === proj.id ? null : curr));
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  if (!muted) playSelect();
                  onSelectProject(
                    proj,
                    { x: x + dx, y: y + dy, hubX: x, hubY: y },
                    category.id
                  );
                }}
                className="absolute z-40 flex flex-col items-center justify-center cursor-pointer pointer-events-auto focus:outline-none"
              >
                {labelAbove && titlePill}

                {/* Satellite Medallion Circle */}
                <div
                  className="relative w-20 h-20 md:w-22 md:h-22 rounded-full flex items-center justify-center border-[3px] transition-all duration-150"
                  style={
                    isThisHit
                      ? {
                          backgroundColor: '#ffffff',
                          borderColor: '#f4b41b',
                          boxShadow: '0 0 42px #ffffff, 0 0 70px #f4b41b'
                        }
                      : isDone
                        ? {
                            background: 'linear-gradient(145deg, #fef08a 0%, #f4b41b 55%, #b45309 100%)',
                            borderColor: '#000000',
                            boxShadow: isProjHovered
                              ? '0 0 34px #f4b41b, 0 0 14px #ffffff'
                              : '0 0 22px rgba(244,180,27,0.8), 0 4px 0 #000'
                          }
                        : {
                            backgroundColor: '#161b29',
                            borderColor: isProjHovered || isThisAimed ? '#ffffff' : hubColor,
                            boxShadow:
                              isProjHovered || isThisAimed
                                ? `0 0 32px ${hubColor}, 0 0 12px #ffffff, inset 0 0 14px ${hubColor}`
                                : `0 0 16px ${hubColor}88`
                          }
                  }
                >
                  {/* Aiming Target Lock Reticle while Knight Draws Bow */}
                  {isThisAimed && (
                    <motion.div
                      animate={{ rotate: 180, scale: [1.28, 1.08, 1.28] }}
                      transition={{ duration: 0.7, repeat: Infinity, ease: 'easeInOut' }}
                      className="absolute -inset-2.5 rounded-full border-[3px] border-dashed border-retro-red pointer-events-none"
                    />
                  )}

                  {/* Hover Pulse Halo */}
                  {isProjHovered && !isThisAimed && (
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0.9 }}
                      animate={{ scale: 1.3, opacity: 0 }}
                      transition={{ duration: 0.85, repeat: Infinity, ease: 'easeOut' }}
                      className="absolute inset-0 rounded-full border-2 pointer-events-none"
                      style={{ borderColor: isDone ? '#fef08a' : '#ffffff' }}
                    />
                  )}

                  {/* Impact Shockwave + Sparks + HIT! Callout */}
                  <AnimatePresence>
                    {isThisHit && (
                      <>
                        <LandmarkBurst color="#f4b41b" variant="discover" />
                        <motion.div
                          initial={{ scale: 0.6, opacity: 1 }}
                          animate={{ scale: 2.2, opacity: 0 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.42, ease: 'easeOut' }}
                          className="absolute inset-0 rounded-full border-4 border-white pointer-events-none"
                        />
                        <motion.div
                          initial={{ y: 0, scale: 0.6, opacity: 1 }}
                          animate={{ y: -38, scale: 1.15, opacity: 0 }}
                          transition={{ duration: 0.45, ease: 'easeOut' }}
                          className="absolute -top-6 px-2.5 py-0.5 bg-retro-red text-white border-2 border-black font-pixel text-[10px] shadow-[3px_3px_0_#000] pointer-events-none z-50"
                        >
                          HIT!
                        </motion.div>
                      </>
                    )}
                    {isThisCelebrated && <LandmarkBurst color="#f4b41b" variant="discover" />}
                  </AnimatePresence>

                  {/* Dark inner frame on gold medallion so colorful game pixel art pops cleanly */}
                  <div
                    className={`w-14 h-14 flex items-center justify-center rounded-full ${
                      isDone ? 'bg-[#151926] border-2 border-black' : ''
                    }`}
                  >
                    <img
                      src={sprite}
                      alt={proj.title}
                      className="w-12 h-12 relative z-10"
                      style={{
                        imageRendering: 'pixelated',
                        filter: isProjHovered
                          ? 'drop-shadow(0 0 8px rgba(255,255,255,0.85))'
                          : 'drop-shadow(0 3px 3px rgba(0,0,0,0.85))'
                      }}
                    />
                  </div>

                  {/* Twinkling Pixel Star Crest on Completed Medallion (replaces plain checkmark!) */}
                  {isDone && (
                    <motion.div
                      animate={{ scale: [1, 1.2, 1], rotate: [-8, 8, -8] }}
                      transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                      className="absolute -top-2 -right-1 z-20 bg-black text-[#f4b41b] px-1.5 py-0.5 border-2 border-[#f4b41b] font-pixel text-[10px] leading-none shadow-[2px_2px_0_#000]"
                    >
                      ★
                    </motion.div>
                  )}
                </div>

                {!labelAbove && titlePill}
              </motion.button>
            );
          })}
      </AnimatePresence>

      {/* ── CENTER CATEGORY HUB BUILDING (Hover to Bloom, Click to Pin!) ── */}
      <motion.div
        animate={
          isAnyChildHit
            ? {
                x: [0, -10, 10, -7, 7, -3, 3, 0],
                rotate: [0, -5, 5, -3, 3, 0],
                scale: [1, 1.2, 0.93, 1.07, 1]
              }
            : { x: 0, rotate: 0, scale: 1 }
        }
        transition={{ duration: 0.4, ease: 'easeOut' }}
        onClick={(e) => {
          e.stopPropagation();
          if (!isUnlocked) return;
          if (!muted) playSelect();
          setClampedHubId(isClamped ? null : category.id);
        }}
        className={`relative z-30 flex flex-col items-center justify-center ${
          isUnlocked ? 'cursor-pointer group' : 'cursor-not-allowed'
        }`}
      >
        {/* Center Category Landmark Circle + Mastered Visual Ornament (Crown / Flag / Laurels / Stamp) */}
        <div
          className={`relative w-24 h-24 md:w-32 md:h-32 flex items-center justify-center transition-transform duration-150 ${
            isOpen ? 'scale-105' : 'group-hover:scale-110'
          }`}
        >
          <MasteredLandmarkOrnament isCompleted={allCompleted} />

          <div
            className={`absolute inset-2 rounded-full transition-all ${
              !isUnlocked ? 'grayscale opacity-40' : 'opacity-90'
            }`}
            style={
              allCompleted
                ? {
                    background: 'radial-gradient(circle, #fef08a 0%, #f4b41b 65%, #ca8a04 100%)',
                    boxShadow: '0 0 36px #f4b41b, inset 0 0 16px rgba(255,255,255,0.8)'
                  }
                : {
                    backgroundColor: hubColor,
                    boxShadow: isOpen
                      ? `0 0 32px ${hubColor}, inset 0 0 14px rgba(255,255,255,0.7)`
                      : `0 0 20px ${hubColor}, inset 0 0 10px rgba(255,255,255,0.5)`
                  }
            }
          />

          {/* Pinned Orbiting Dashed Ring */}
          {isClamped && (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 rounded-full border-[3px] border-dashed border-retro-yellow pointer-events-none"
            />
          )}

          <img
            src={category.sprite}
            alt={category.title}
            className={`w-20 h-20 md:w-24 md:h-24 relative z-10 drop-shadow-[0_4px_4px_rgba(0,0,0,0.65)] ${
              !isUnlocked ? 'grayscale opacity-50' : ''
            }`}
            style={{ imageRendering: 'pixelated' }}
          />

          {!isUnlocked && (
            <div className="absolute -bottom-2 -right-2 z-20 bg-retro-dark rounded-full p-2 border-2 border-white shadow-xl">
              <img src={LockIcon} className="w-7 h-7" style={{ imageRendering: 'pixelated' }} alt="Locked" />
            </div>
          )}
        </div>

        {/* Single Combined Split-Pill Tag */}
        <UnifiedCheckpointTag
          title={category.title}
          accentColor={category.color}
          doneCount={doneCount}
          totalCount={total}
          isCategory={true}
          isClamped={isClamped}
          isUnlocked={isUnlocked}
          fontSizes={fontSizes}
        />
      </motion.div>
    </div>
  );
}
