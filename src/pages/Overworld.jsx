import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Smartphone, Sparkles } from 'lucide-react';
import MapCanvas from '../components/Overworld/MapCanvas';
import { LIVE_CATEGORIES, shortProjectLabel } from '../components/Overworld/RadialCategoryHub';
import { GAME_SPRITES } from '../components/Overworld/GamePixelIcons';
import ModalOverlay from '../components/UI/ModalOverlay';
import GameHUD from '../components/UI/GameHUD';
import TutorialOverlay from '../components/UI/TutorialOverlay';
import portfolioData from '../data/portfolioData.json';
import useGameAudio, { setGlobalAudioMuted, isGlobalAudioMuted } from '../hooks/useGameAudio';

/**
 * Fun Pixel Achievement Card + Confetti Burst shown at top-center after clearing a project or section!
 * Replaces the plain "CHECKPOINT REACHED!" box without blocking map interaction.
 */
function StageClearAchievement({ banner, onDismiss }) {
  useEffect(() => {
    if (!banner) return;
    const t = setTimeout(onDismiss, 3000);
    return () => clearTimeout(t);
  }, [banner, onDismiss]);

  return (
    <AnimatePresence>
      {banner && (
        <motion.div
          key={banner.id}
          initial={{ opacity: 0, y: -40, scale: 0.75 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -24, scale: 0.88 }}
          transition={{ type: 'spring', stiffness: 340, damping: 18 }}
          onClick={onDismiss}
          className="fixed top-20 md:top-28 left-1/2 -translate-x-1/2 z-[1000] cursor-pointer select-none"
        >
          {/* Bursting Pixel Confetti Squares */}
          {Array.from({ length: 18 }).map((_, i) => {
            const angle = (i / 18) * Math.PI * 2;
            const dist = 110 + (i % 3) * 45;
            const colors = ['#f4b41b', '#38bdf8', '#83eb72', '#d95763', '#c084fc', '#ffffff'];
            return (
              <motion.div
                key={i}
                initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
                animate={{
                  x: Math.cos(angle) * dist,
                  y: Math.sin(angle) * dist,
                  scale: [0, 1.35, 0.7],
                  opacity: [1, 1, 0],
                  rotate: 180
                }}
                transition={{ duration: 1.05, ease: 'easeOut' }}
                className="absolute left-1/2 top-1/2 w-3.5 h-3.5 border border-black pointer-events-none"
                style={{ backgroundColor: colors[i % colors.length] }}
              />
            );
          })}

          {/* Gleaming Gold Pixel Achievement Banner */}
          <div className="relative bg-gradient-to-b from-[#fef08a] via-[#f4b41b] to-[#eab308] border-4 border-black shadow-[0_0_50px_rgba(244,180,27,0.8),8px_8px_0_#000] px-5 py-3.5 flex items-center gap-4 min-w-[290px] max-w-[92vw]">
            <motion.div
              animate={{ y: [0, -6, 0], rotate: [-4, 4, -4] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              className="w-14 h-14 md:w-16 md:h-16 shrink-0 bg-[#161b29] border-[3px] border-black p-2 shadow-[4px_4px_0_#000] flex items-center justify-center"
            >
              <img
                src={banner.sprite}
                alt=""
                className="w-full h-full"
                style={{ imageRendering: 'pixelated' }}
              />
            </motion.div>

            <div className="min-w-0 flex-1">
              <div className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-black text-[#f4b41b] font-pixel text-[9px] mb-1">
                <Sparkles size={11} />
                {banner.categoryMastered ? `${banner.categoryTitle.toUpperCase()} MASTERED!` : 'STAGE CLEARED!'}
              </div>

              <div className="font-pixel text-sm md:text-base text-[#140e02] truncate">
                {banner.title}
              </div>

              {banner.total > 1 ? (
                <div className="mt-1.5 flex items-center gap-2">
                  <div className="flex-1 h-3 bg-black p-0.5 border border-black">
                    <motion.div
                      initial={{ width: `${Math.max(0, ((banner.done - 1) / banner.total) * 100)}%` }}
                      animate={{ width: `${(banner.done / banner.total) * 100}%` }}
                      transition={{ duration: 0.55, ease: 'easeOut' }}
                      className="h-full bg-[#83eb72]"
                    />
                  </div>
                  <span className="font-pixel text-[9px] text-[#140e02]">
                    {banner.done}/{banner.total}
                  </span>
                </div>
              ) : (
                <div className="font-pixel text-[9px] text-amber-950 mt-0.5">
                  ★ TURNED GOLD ON MAP!
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function Overworld() {
  const [activeNode, setActiveNode] = useState(null);
  const [discovered, setDiscovered] = useState(new Set());
  const [clearBanner, setClearBanner] = useState(null);
  const [showVictory, setShowVictory] = useState(false);
  const [muted, setMutedState] = useState(() => isGlobalAudioMuted());
  const { playSpawn, playUnlock, playVictory, playShoot, playHit } = useGameAudio();

  const setMuted = (nextVal) => {
    setMutedState((prev) => {
      const resolved = typeof nextVal === 'function' ? nextVal(prev) : Boolean(nextVal);
      setGlobalAudioMuted(resolved);
      return resolved;
    });
  };

  const unlocked = new Set(portfolioData.nodes.map((n) => n.id));
  const nodeById = Object.fromEntries(portfolioData.nodes.map((n) => [n.id, n]));
  const categories = LIVE_CATEGORIES(nodeById);

  const [isMobileLayout, setIsMobileLayout] = useState(() => window.innerWidth < 768);
  const [isLandscapeMobile, setIsLandscapeMobile] = useState(
    () => window.innerWidth < 768 && window.innerWidth > window.innerHeight
  );

  // Locked-in Crimson Armored Archer (cross removed) & 18px / 18px / 20px Typography
  const archerType = 'gandalf';
  const archerColor = 'red';
  const fontSizes = {
    badgePx: 18,   // Counter (0/3)
    projectPx: 18, // Orbiting project & client names
    titlePx: 20    // Main checkpoint labels (About Me, Skills, Clients, VR, 2D, Contact)
  };

  const INITIAL_DESKTOP_POS = { x: 460, y: 790 };
  const INITIAL_MOBILE_POS = { x: 450, y: 170 };

  const [playerPos, setPlayerPos] = useState(() =>
    window.innerWidth < 768 ? INITIAL_MOBILE_POS : INITIAL_DESKTOP_POS
  );

  const [isWalking, setIsWalking] = useState(false);
  const [walkDuration, setWalkDuration] = useState(0);
  const [flipX, setFlipX] = useState(() => window.innerWidth >= 768);

  // Shooting, Hub-Pinning & Impact State
  const [clampedHubId, setClampedHubId] = useState(null);
  const [lockedShotHubId, setLockedShotHubId] = useState(null);
  const [aimingNodeId, setAimingNodeId] = useState(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isShooting, setIsShooting] = useState(false);
  const [shootingTarget, setShootingTarget] = useState(null);
  const [hitNodeId, setHitNodeId] = useState(null);
  const [celebrateNodeId, setCelebrateNodeId] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      const newIsMobile = window.innerWidth < 768;
      const newIsLandscape = newIsMobile && window.innerWidth > window.innerHeight;
      setIsLandscapeMobile(newIsLandscape);

      if (newIsMobile !== isMobileLayout) {
        setIsMobileLayout(newIsMobile);
        setPlayerPos(newIsMobile ? INITIAL_MOBILE_POS : INITIAL_DESKTOP_POS);
        setFlipX(!newIsMobile);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobileLayout]);

  // Unified Bow Draw (660ms full 8-frame pull!) -> Arrow Flight -> Visible Target Impact Pause -> Sprint -> Open Modal!
  const fireArrowAtTarget = (node, aimCoords, standCoords, hubIdToHoldOpen = null) => {
    if (activeNode || isWalking || isDrawing || isShooting || hitNodeId) return;

    const targetX = aimCoords.x;
    const targetY = aimCoords.y;
    const destX = standCoords?.x ?? targetX;
    const destY = standCoords?.y ?? targetY;

    const dist = Math.hypot(targetX - playerPos.x, targetY - playerPos.y);
    const arrowFlightMs = Math.max(550, Math.min(dist * 0.75, 920));
    const impactHoldMs = 420; // Hold so player clearly sees the arrow strike, shockwave, and shake!
    const bowPullMs = 660; // Synced to all 3 archers' 8-frame bow-nock & pull animation!

    if (hubIdToHoldOpen) setLockedShotHubId(hubIdToHoldOpen);
    setAimingNodeId(node.id);
    setFlipX(targetX < playerPos.x);

    // Phase 1: DRAW BOW & LOCK TARGET RETICLE (660ms)
    setIsDrawing(true);
    setShootingTarget({ x: targetX, y: targetY, duration: arrowFlightMs / 1000 });

    setTimeout(() => {
      // Phase 2: RELEASE ARROW (plays archer's 3 release/twang frames!)
      setIsDrawing(false);
      setIsShooting(true);
      if (!muted) playShoot();

      setTimeout(() => {
        // Phase 3: ARROW HITS PROJECT / BUILDING (Shockwave + Sparks + Shake!)
        setIsShooting(false);
        setShootingTarget(null);
        setAimingNodeId(null);
        setHitNodeId(node.id);
        if (!muted) playHit();

        setTimeout(() => {
          // Phase 4: ARCHER RUNS IN (8-frame sprint cycle!) -> OPEN MODAL
          const dashDist = Math.hypot(destX - playerPos.x, destY - playerPos.y);
          const dashDuration = Math.max(0.35, Math.min(dashDist / 780, 0.95));
          setIsWalking(true);
          setWalkDuration(dashDuration);
          setPlayerPos({ x: destX, y: destY });
          if (!muted) playSpawn();

          setTimeout(() => {
            setIsWalking(false);
            setHitNodeId(null);
            setLockedShotHubId(null);
            setActiveNode(node);
          }, dashDuration * 1000);
        }, impactHoldMs);
      }, arrowFlightMs);
    }, bowPullMs);
  };

  const handleNodeSelect = (node) => {
    setClampedHubId(null);
    const targetX = isMobileLayout ? node.pX : node.x;
    const targetY = isMobileLayout ? node.pY : node.y;
    fireArrowAtTarget(node, { x: targetX, y: targetY }, { x: targetX, y: targetY }, null);
  };

  const handleCategoryProjectSelect = (proj, coords, categoryId) => {
    fireArrowAtTarget(
      proj,
      { x: coords.x, y: coords.y },
      { x: coords.hubX, y: coords.hubY },
      categoryId
    );
  };

  const handleModalClose = () => {
    const node = activeNode;
    setActiveNode(null);

    if (node && !discovered.has(node.id)) {
      const newDiscovered = new Set(discovered).add(node.id);
      setDiscovered(newDiscovered);

      setCelebrateNodeId(node.id);
      setTimeout(() => {
        setCelebrateNodeId((curr) => (curr === node.id ? null : curr));
      }, 1300);

      const parentCat = categories.find((c) => c.projects.some((p) => p.id === node.id));
      const total = parentCat ? parentCat.projects.length : 1;
      const done = parentCat ? parentCat.projects.filter((p) => newDiscovered.has(p.id)).length : 1;
      const categoryMastered = Boolean(parentCat && done === total);
      const isNowComplete = newDiscovered.size === portfolioData.nodes.length;

      if (isNowComplete) {
        if (!muted) playVictory();
        setShowVictory(true);
        setTimeout(() => setShowVictory(false), 6000);
      } else {
        if (!muted) {
          if (categoryMastered) playVictory();
          else playUnlock();
        }
        const readableTitle =
          node.type === 'about'
            ? 'About Me'
            : node.type === 'skills'
              ? 'Skills'
              : node.type === 'contact'
                ? 'Contact'
                : shortProjectLabel(node.id, node.title);

        setClearBanner({
          id: `${node.id}-${Date.now()}`,
          title: readableTitle,
          sprite: GAME_SPRITES[node.id],
          done,
          total,
          categoryTitle: parentCat ? parentCat.title : readableTitle,
          categoryMastered
        });
      }
    }
  };

  return (
    <div className="fixed inset-0 w-screen h-[100dvh] overflow-hidden bg-retro-dark select-none touch-none">
      <MapCanvas
        onNodeSelect={handleNodeSelect}
        onCategoryProjectSelect={handleCategoryProjectSelect}
        discovered={discovered}
        unlocked={unlocked}
        playerPos={playerPos}
        archerType={archerType}
        archerColor={archerColor}
        isWalking={isWalking}
        walkDuration={walkDuration}
        flipX={flipX}
        isMobileLayout={isMobileLayout}
        isDrawing={isDrawing}
        isShooting={isShooting}
        shootingTarget={shootingTarget}
        aimingNodeId={aimingNodeId}
        hitNodeId={hitNodeId}
        celebrateNodeId={celebrateNodeId}
        lockedShotHubId={lockedShotHubId}
        clampedHubId={clampedHubId}
        setClampedHubId={setClampedHubId}
        fontSizes={fontSizes}
        muted={muted}
      />

      {/* 100% Victory Banner Overlay */}
      <AnimatePresence>
        {showVictory && (
          <motion.div
            initial={{ scale: 0, y: -200, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 1.5, opacity: 0 }}
            transition={{ type: 'spring', damping: 10, stiffness: 100 }}
            className="absolute inset-0 z-50 flex items-center justify-center pointer-events-none"
          >
            <div className="bg-retro-dark border-8 border-retro-yellow p-8 md:p-16 pixel-border shadow-[0_0_100px_rgba(244,180,27,0.8)] flex flex-col items-center">
              <Star size={80} className="text-retro-yellow fill-retro-yellow mb-6 animate-[spin_3s_linear_infinite]" />
              <h1 className="font-pixel text-3xl md:text-6xl text-retro-yellow text-center leading-loose tracking-widest drop-shadow-[4px_4px_0_rgba(217,87,99,1)]">
                LEVEL COMPLETE
              </h1>
              <h2 className="font-pixel text-sm md:text-xl text-retro-text mt-6 text-center tracking-wider">
                100% of Checkpoints Mastered!
              </h2>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <GameHUD
        discoveredCount={discovered.size}
        totalNodes={portfolioData.nodes.length}
        muted={muted}
        setMuted={setMuted}
      />

      {/* Animated Gold Stage Clear Achievement Banner + Confetti */}
      <StageClearAchievement banner={clearBanner} onDismiss={() => setClearBanner(null)} />

      <ModalOverlay node={activeNode} onClose={handleModalClose} />

      <TutorialOverlay />

      {isLandscapeMobile && (
        <div className="fixed inset-0 z-[9999] bg-retro-dark flex flex-col items-center justify-center p-8 text-center pointer-events-auto">
          <Smartphone size={80} className="text-retro-yellow mb-8 animate-[pulse_2s_ease-in-out_infinite] -rotate-90" />
          <h2 className="text-2xl font-pixel mb-4 text-retro-yellow leading-loose tracking-widest">ROTATE DEVICE</h2>
          <p className="text-lg text-slate-300 max-w-sm leading-relaxed">
            Please rotate your phone to portrait mode to explore the map.
          </p>
        </div>
      )}
    </div>
  );
}
