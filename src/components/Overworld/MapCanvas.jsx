import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, animate } from 'framer-motion';
import NodeMarker from './NodeMarker';
import RadialCategoryHub, { LIVE_CATEGORIES } from './RadialCategoryHub';
import AnimatedArcher from './AnimatedArchers';
import portfolioData from '../../data/portfolioData.json';
import { TerrainGrassTile, PathTile } from './PixelAssets';

const TerrainBackground = () => (
  <div
    className="absolute inset-0 w-full h-full pointer-events-none"
    style={{
      backgroundImage: `url("${TerrainGrassTile}")`,
      backgroundSize: '64px 64px',
      imageRendering: 'pixelated'
    }}
  />
);

const SectionBanner = ({ text, x, y, color = '#569ceb' }) => (
  <div
    className="absolute pointer-events-none flex flex-col items-center justify-center z-20 opacity-90"
    style={{ left: x, top: y, transform: 'translate(-50%, -50%)' }}
  >
    <div className="bg-retro-dark border-4 border-white px-8 py-3 shadow-[8px_8px_0_rgba(0,0,0,0.5)] flex items-center justify-center">
      <span
        className="font-pixel text-2xl tracking-widest drop-shadow-[2px_2px_0_rgba(0,0,0,1)]"
        style={{ color }}
      >
        {text}
      </span>
    </div>
    <div className="absolute top-full flex gap-16 -mt-1 -z-10">
      <div className="w-3 h-10 bg-[#8b5a2b] border-x-2 border-black" />
      <div className="w-3 h-10 bg-[#8b5a2b] border-x-2 border-black" />
    </div>
  </div>
);

const ZoneRegion = ({ x, y, rx, ry, color }) => (
  <div
    className="absolute pointer-events-none z-[2]"
    style={{
      left: x,
      top: y,
      width: rx * 2,
      height: ry * 2,
      transform: 'translate(-50%, -50%)',
      background: `radial-gradient(ellipse, ${color} 0%, transparent 70%)`,
      opacity: 0.45,
      mixBlendMode: 'screen'
    }}
  />
);

const PixelKnight = ({ isWalking, flipX, isDrawing, isShooting }) => (
  <div className="relative" style={{ width: 64, height: 64 }}>
    <svg
      width="64"
      height="64"
      viewBox="0 0 16 16"
      overflow="visible"
      className={`drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)] ${
        isWalking ? 'animate-[bounce_0.3s_infinite]' : ''
      } ${isDrawing ? 'animate-[pulse_0.5s_ease-in-out_infinite]' : ''}`}
      style={{ transform: flipX ? 'scaleX(-1)' : 'scaleX(1)', transformOrigin: 'center' }}
    >
      <rect x="7" y="0" width="2" height="1" fill="#d95763" />
      <rect x="8" y="1" width="3" height="2" fill="#d95763" />
      <rect x="5" y="2" width="6" height="2" fill="#a4a5a1" />
      <rect x="4" y="4" width="8" height="4" fill="#daddd8" />
      <rect x="5" y="5" width="6" height="1" fill="#1a1c2c" />
      <rect x="7" y="6" width="2" height="2" fill="#1a1c2c" />
      <rect x="8" y="5" width="1" height="1" fill="#83eb72" />
      <rect x="5" y="8" width="6" height="4" fill="#a4a5a1" />
      <rect x="3" y="8" width="2" height="5" fill="#569ceb" />
      <rect x="4" y="8" width="1" height="3" fill="#daddd8" />
      <rect x="11" y="8" width="1" height="3" fill="#daddd8" />
      {!isDrawing && !isShooting && <rect x="11" y="11" width="1" height="4" fill="#f4f4f4" />}
      <rect x="6" y="12" width="2" height="3" fill="#1a1c2c" />
      <rect x="8" y="12" width="2" height="3" fill="#1a1c2c" />
    </svg>

    {isDrawing && (
      <svg
        width="80"
        height="80"
        viewBox="0 0 40 40"
        overflow="visible"
        className="absolute -top-2 -right-10 animate-[pulse_0.3s_ease-in-out_infinite]"
        style={{
          transform: flipX ? 'scaleX(-1)' : 'scaleX(1)',
          transformOrigin: 'center',
          filter: 'drop-shadow(0 0 6px rgba(244,180,27,0.8))'
        }}
      >
        <path d="M 20 4 Q 32 20 20 36" stroke="#8b5a2b" strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d="M 20 4 Q 34 20 20 36" stroke="#a0692b" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <path d="M 20 4 L 8 20 L 20 36" stroke="#ffffff" strokeWidth="1" fill="none" opacity="0.9" />
        <rect x="8" y="19" width="16" height="2" fill="#8b5a2b" />
        <polygon points="24,17 30,20 24,23" fill="#a4a5a1" />
        <rect x="4" y="17" width="4" height="2" fill="#d95763" />
        <rect x="4" y="21" width="4" height="2" fill="#d95763" />
        <circle cx="8" cy="20" r="3" fill="#f4b41b" opacity="0.4" />
      </svg>
    )}
  </div>
);

export default function MapCanvas({
  onNodeSelect,
  onCategoryProjectSelect,
  discovered,
  unlocked,
  playerPos,
  archerType = 'gandalf',
  archerColor = 'red',
  isWalking,
  walkDuration,
  flipX,
  isMobileLayout,
  isDrawing,
  isShooting,
  shootingTarget,
  aimingNodeId,
  hitNodeId,
  celebrateNodeId,
  lockedShotHubId,
  clampedHubId,
  setClampedHubId,
  fontSizes,
  muted,
  onCanvasTransform
}) {
  const [scale, setScale] = useState(1);
  const dragY = useMotionValue(0);
  const [isPanned, setIsPanned] = useState(false);

  const CANVAS_WIDTH = isMobileLayout ? 900 : 1800;
  const CANVAS_HEIGHT = isMobileLayout ? 3010 : 900;

  const nodeById = Object.fromEntries(portfolioData.nodes.map((n) => [n.id, n]));
  const categories = LIVE_CATEGORIES(nodeById);

  const spawnPoint = isMobileLayout ? { x: 450, y: 170 } : { x: 460, y: 790 };
  const isAtSpawn =
    playerPos &&
    ((playerPos.x === 460 && playerPos.y === 790) ||
      (playerPos.x === 450 && playerPos.y === 170));

  const aboutNode = { ...nodeById.about, x: 160, y: 680, pX: 450, pY: 420 };
  const skillsNode = { ...nodeById.skills, x: 220, y: 320, pX: 450, pY: 740 };
  const contactNode = { ...nodeById.contact, x: 1650, y: 690, pX: 450, pY: 2720 };

  useEffect(() => {
    return dragY.on('change', (latest) => {
      const panned = Math.abs(latest) > 220;
      setIsPanned((prev) => (prev !== panned ? panned : prev));
    });
  }, [dragY]);

  useEffect(() => {
    dragY.set(0);
    setIsPanned(false);
  }, [playerPos, dragY]);

  useEffect(() => {
    const handleResize = () => {
      const scaleX = window.innerWidth / CANVAS_WIDTH;
      const scaleY = window.innerHeight / CANVAS_HEIGHT;
      const finalScale = isMobileLayout
        ? window.innerWidth / 700
        : Math.min(Math.min(scaleX, scaleY) * 0.75, 1.5);
      setScale(finalScale);
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, [CANVAS_WIDTH, CANVAS_HEIGHT, isMobileLayout]);

  // Smooth 6-stop path (About -> Skills -> Clients -> VR -> 2D -> Contact)
  const stops = [
    {
      id: 'about',
      x: aboutNode.x,
      y: aboutNode.y,
      pX: aboutNode.pX,
      pY: aboutNode.pY,
      done: discovered.has('about')
    },
    {
      id: 'skills',
      x: skillsNode.x,
      y: skillsNode.y,
      pX: skillsNode.pX,
      pY: skillsNode.pY,
      done: discovered.has('skills')
    },
    ...categories.map((c) => ({
      id: c.id,
      x: c.x,
      y: c.y,
      pX: c.pX,
      pY: c.pY,
      done: c.projects.every((p) => discovered.has(p.id))
    })),
    {
      id: 'contact',
      x: contactNode.x,
      y: contactNode.y,
      pX: contactNode.pX,
      pY: contactNode.pY,
      done: discovered.has('contact')
    }
  ];

  const trailSegments = [];
  for (let i = 1; i < stops.length; i++) {
    const prev = stops[i - 1];
    const curr = stops[i];
    const pX = isMobileLayout ? prev.pX : prev.x;
    const pY = isMobileLayout ? prev.pY : prev.y;
    const cX = isMobileLayout ? curr.pX : curr.x;
    const cY = isMobileLayout ? curr.pY : curr.y;
    const midX = (pX + cX) / 2;
    const path = `M ${pX} ${pY} C ${midX} ${pY}, ${midX} ${cY}, ${cX} ${cY}`;
    trailSegments.push({ id: `trail-${curr.id}`, path, isActive: prev.done && curr.done });
  }

  const numericLeft =
    isMobileLayout && playerPos
      ? window.innerWidth / 2 - playerPos.x * scale
      : window.innerWidth / 2 - (CANVAS_WIDTH / 2) * scale;

  const numericTop =
    isMobileLayout && playerPos
      ? window.innerHeight * 0.35 - playerPos.y * scale
      : window.innerHeight / 2 - (CANVAS_HEIGHT / 2) * scale;

  const buffer = 130;
  const firstNodeY = spawnPoint.y;
  const lastNodeY = contactNode.pY;
  const dragConstraints =
    isMobileLayout && playerPos
      ? {
          top: window.innerHeight * 0.35 - buffer - lastNodeY * scale - numericTop,
          bottom: window.innerHeight * 0.35 + buffer - firstNodeY * scale - numericTop
        }
      : undefined;

  const handleRecenter = () => {
    animate(dragY, 0, { type: 'spring', damping: 25, stiffness: 300 });
  };

  useEffect(() => {
    if (onCanvasTransform) {
      onCanvasTransform({ scale, left: numericLeft, top: numericTop });
    }
  }, [scale, numericLeft, numericTop, onCanvasTransform]);

  return (
    <div
      className="fixed inset-0 w-screen h-[100dvh] overflow-hidden bg-retro-dark relative"
      onClick={() => {
        if (!lockedShotHubId && setClampedHubId) setClampedHubId(null);
      }}
    >
      <TerrainBackground />

      <motion.div
        drag={isMobileLayout && !isWalking && !isDrawing && !isShooting ? 'y' : false}
        dragConstraints={dragConstraints}
        dragElastic={isMobileLayout ? 0.08 : false}
        dragTransition={{ bounceStiffness: 450, bounceDamping: 30, power: 0.15, timeConstant: 200 }}
        animate={{ left: numericLeft, top: numericTop }}
        transition={{ duration: 1.2, ease: 'easeInOut' }}
        className="absolute cursor-grab active:cursor-grabbing"
        style={{
          width: CANVAS_WIDTH,
          height: CANVAS_HEIGHT,
          originX: 0,
          originY: 0,
          scale,
          y: dragY
        }}
      >
        {/* Subtle Stone Spawn Pad where the Archer begins in open grass */}
        <div
          className="absolute pointer-events-none z-[6] flex items-center justify-center"
          style={{
            left: spawnPoint.x,
            top: spawnPoint.y,
            transform: 'translate(-50%, -50%)'
          }}
        >
          <svg
            width="84"
            height="36"
            viewBox="0 0 42 18"
            style={{ imageRendering: 'pixelated' }}
            className="opacity-85 drop-shadow-[0_3px_0_rgba(0,0,0,0.45)]"
          >
            <ellipse cx="21" cy="9" rx="20" ry="8" fill="#1a1c2c" />
            <ellipse cx="21" cy="8.5" rx="18" ry="6.5" fill="#4b5563" />
            <ellipse cx="21" cy="8" rx="14" ry="4.5" fill="#6b7280" />
            <rect x="13" y="6" width="4" height="2" fill="#9ca3af" />
            <rect x="24" y="8" width="5" height="2" fill="#9ca3af" />
            <rect x="18" y="10" width="4" height="1.5" fill="#374151" />
          </svg>
        </div>

        {/* SKILLS ZONE */}
        <ZoneRegion x={isMobileLayout ? 450 : 220} y={isMobileLayout ? 740 : 320} rx={140} ry={140} color="#f4b41b" />
        <SectionBanner text="SKILLS" x={isMobileLayout ? 450 : 220} y={isMobileLayout ? 600 : 120} color="#f4b41b" />

        {/* PROJECTS ZONE */}
        <ZoneRegion
          x={isMobileLayout ? 450 : 1010}
          y={isMobileLayout ? 1700 : 415}
          rx={isMobileLayout ? 270 : 570}
          ry={isMobileLayout ? 780 : 260}
          color="#569ceb"
        />
        <SectionBanner text="PROJECTS" x={isMobileLayout ? 450 : 1010} y={isMobileLayout ? 940 : 75} color="#569ceb" />

        {/* CONTACT ZONE */}
        <ZoneRegion x={isMobileLayout ? 450 : 1650} y={isMobileLayout ? 2720 : 700} rx={140} ry={140} color="#83eb72" />
        <SectionBanner text="CONTACT" x={isMobileLayout ? 450 : 1650} y={isMobileLayout ? 2570 : 855} color="#83eb72" />

        {/* Guided Dirt Trail */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 5 }}>
          <defs>
            <pattern id="dirtPattern" patternUnits="userSpaceOnUse" width="32" height="32">
              <image href={PathTile} x="0" y="0" width="32" height="32" style={{ imageRendering: 'pixelated' }} />
            </pattern>
          </defs>

          {trailSegments.map((segment) => (
            <path
              key={segment.id}
              d={segment.path}
              fill="none"
              stroke="url(#dirtPattern)"
              strokeWidth="24"
              strokeDasharray="32 32"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`transition-all duration-1000 ${
                segment.isActive
                  ? 'opacity-100 drop-shadow-[0_0_16px_rgba(244,180,27,1)] brightness-110'
                  : 'opacity-80 grayscale brightness-50'
              }`}
            />
          ))}
        </svg>

        {/* Single Buildings: About Me, Skills, Contact */}
        {[aboutNode, skillsNode, contactNode].map((node) => (
          <NodeMarker
            key={node.id}
            node={node}
            x={isMobileLayout ? node.pX : node.x}
            y={isMobileLayout ? node.pY : node.y}
            isCompleted={discovered ? discovered.has(node.id) : false}
            isUnlocked={unlocked ? unlocked.has(node.id) : true}
            isAimed={aimingNodeId === node.id}
            isHit={hitNodeId === node.id}
            isCelebrated={celebrateNodeId === node.id}
            showStartPrompt={
              node.id === 'about' &&
              (!discovered || discovered.size === 0) &&
              !aimingNodeId &&
              !hitNodeId
            }
            fontSizes={fontSizes}
            onSelect={() => onNodeSelect(node)}
          />
        ))}

        {/* 3 Radial Category Hubs: Clients · VR · 2D */}
        {categories.map((cat) => (
          <RadialCategoryHub
            key={cat.id}
            category={cat}
            x={isMobileLayout ? cat.pX : cat.x}
            y={isMobileLayout ? cat.pY : cat.y}
            discovered={discovered}
            unlocked={unlocked}
            aimingNodeId={aimingNodeId}
            hitNodeId={hitNodeId}
            celebrateNodeId={celebrateNodeId}
            lockedShotHubId={lockedShotHubId}
            clampedHubId={clampedHubId}
            setClampedHubId={setClampedHubId}
            fontSizes={fontSizes}
            isMobileLayout={isMobileLayout}
            muted={muted}
            onSelectProject={onCategoryProjectSelect}
          />
        ))}

        {/* Arrow Projectile — synced to archer bow hand height */}
        <AnimatePresence>
          {isShooting && shootingTarget && playerPos && (
            <motion.div
              key="arrow-flight"
              initial={{
                left: playerPos.x + (flipX ? -28 : 28),
                top: playerPos.y - 46,
                opacity: 1
              }}
              animate={{ left: shootingTarget.x, top: shootingTarget.y, opacity: 1 }}
              exit={{ opacity: 0, scale: 2 }}
              transition={{ duration: shootingTarget.duration || 0.7, ease: [0.2, 0, 0.4, 1] }}
              className="absolute z-50 pointer-events-none"
              style={{ x: '-50%', y: '-50%' }}
            >
              <div
                className="absolute inset-0 rounded-full blur-lg"
                style={{
                  width: 110,
                  height: 110,
                  marginLeft: -25,
                  marginTop: -25,
                  background:
                    archerType === 'hero'
                      ? 'radial-gradient(circle, rgba(56,189,248,0.65) 0%, rgba(74,222,128,0.3) 45%, transparent 70%)'
                      : 'radial-gradient(circle, rgba(244,180,27,0.65) 0%, rgba(217,87,99,0.3) 45%, transparent 70%)'
                }}
              />
              {archerType === 'gandalf' ? (
                <img
                  src="/archers/gandalf/arrow.png"
                  alt=""
                  style={{
                    width: 90,
                    height: 15,
                    imageRendering: 'pixelated',
                    transform: `rotate(${
                      (Math.atan2(
                        shootingTarget.y - (playerPos.y - 46),
                        shootingTarget.x - (playerPos.x + (flipX ? -28 : 28))
                      ) *
                        180) /
                      Math.PI
                    }deg)`,
                    filter: 'drop-shadow(0 0 8px rgba(244,180,27,0.95))'
                  }}
                />
              ) : (
                <svg
                  width="92"
                  height="92"
                  viewBox="0 0 48 48"
                  style={{
                    transform: `rotate(${
                      (Math.atan2(
                        shootingTarget.y - (playerPos.y - 46),
                        shootingTarget.x - (playerPos.x + (flipX ? -28 : 28))
                      ) *
                        180) /
                      Math.PI
                    }deg)`,
                    filter:
                      archerType === 'hero'
                        ? 'drop-shadow(0 0 10px rgba(56,189,248,0.95))'
                        : 'drop-shadow(0 0 10px rgba(250,204,21,0.95))',
                    imageRendering: 'pixelated'
                  }}
                >
                  <rect
                    x="4"
                    y="22"
                    width="28"
                    height="4"
                    fill={archerType === 'hero' ? '#38bdf8' : '#fde047'}
                  />
                  <polygon
                    points="32,19 45,24 32,29"
                    fill={archerType === 'hero' ? '#e0f2fe' : '#38bdf8'}
                  />
                  <rect
                    x="2"
                    y="19"
                    width="6"
                    height="3"
                    fill={archerType === 'hero' ? '#4ade80' : '#e11d48'}
                  />
                  <rect
                    x="2"
                    y="26"
                    width="6"
                    height="3"
                    fill={archerType === 'hero' ? '#4ade80' : '#e11d48'}
                  />
                </svg>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Animated Player Archer */}
        {playerPos && (
          <motion.div
            initial={false}
            animate={{ left: playerPos.x, top: playerPos.y }}
            transition={{ duration: walkDuration, ease: 'linear' }}
            style={{ x: '-50%', y: '-100%' }}
            className="absolute z-40 pointer-events-none flex flex-col items-center justify-center"
          >
            {!isWalking && !isDrawing && !isShooting && !isAtSpawn && (
              <motion.div
                initial={{ opacity: 0, x: -10, scale: 0.8 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ type: 'spring', delay: 0.5, damping: 12 }}
                className="absolute -top-2 left-20 bg-white text-black font-pixel text-xs px-4 py-3 border-4 border-black whitespace-nowrap drop-shadow-xl z-50"
              >
                {(playerPos.x === aboutNode.x && playerPos.y === aboutNode.y) ||
                (playerPos.x === aboutNode.pX && playerPos.y === aboutNode.pY)
                  ? 'Hire Mahmoud!'
                  : "Still didn't hire him?"}
                <div className="absolute top-1/2 -left-3 -translate-y-1/2 w-0 h-0 border-t-[6px] border-b-[6px] border-r-[12px] border-t-transparent border-b-transparent border-r-black" />
                <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-0 h-0 border-t-[4px] border-b-[4px] border-r-[8px] border-t-transparent border-b-transparent border-r-white" />
              </motion.div>
            )}

            <AnimatedArcher
              archerType={archerType}
              archerColor={archerColor}
              isWalking={isWalking}
              isDrawing={isDrawing}
              isShooting={isShooting}
              flipX={flipX}
            />
          </motion.div>
        )}
      </motion.div>

      <AnimatePresence>
        {isMobileLayout && isPanned && !isWalking && !isDrawing && !isShooting && (
          <motion.button
            initial={{ opacity: 0, y: 15, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.85 }}
            whileTap={{ scale: 0.92 }}
            onClick={handleRecenter}
            className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 bg-retro-dark/95 border-2 border-retro-yellow text-retro-yellow px-4 py-2 font-pixel text-[11px] flex items-center gap-2 shadow-[4px_4px_0_rgba(0,0,0,0.8)] cursor-pointer active:translate-y-1 tracking-wider"
          >
            <span>🎯</span> RECENTER
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
