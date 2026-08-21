import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue } from 'framer-motion';
import NodeMarker from './NodeMarker';
import portfolioData from '../../data/portfolioData.json';
import { TerrainGrassTile, PathTile } from './PixelAssets';

// Procedural SVG grid for terrain using our pixel art grass tile
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
      <span className="font-pixel text-2xl tracking-widest drop-shadow-[2px_2px_0_rgba(0,0,0,1)]" style={{ color }}>{text}</span>
    </div>
    {/* Wooden poles supporting the sign */}
    <div className="absolute top-full flex gap-16 -mt-1 -z-10">
      <div className="w-3 h-10 bg-[#8b5a2b] border-x-2 border-black"></div>
      <div className="w-3 h-10 bg-[#8b5a2b] border-x-2 border-black"></div>
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
    <svg width="64" height="64" viewBox="0 0 16 16" overflow="visible"
         className={`drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)] ${isWalking ? 'animate-[bounce_0.3s_infinite]' : ''} ${isDrawing ? 'animate-[pulse_0.5s_ease-in-out_infinite]' : ''}`} 
         style={{ transform: flipX ? 'scaleX(-1)' : 'scaleX(1)', transformOrigin: 'center' }}>
      {/* Small Red Plume */}
      <rect x="7" y="0" width="2" height="1" fill="#d95763" />
      <rect x="8" y="1" width="3" height="2" fill="#d95763" />
      {/* Silver Helmet */}
      <rect x="5" y="2" width="6" height="2" fill="#a4a5a1" />
      <rect x="4" y="4" width="8" height="4" fill="#daddd8" />
      {/* Visor slit (T shape) */}
      <rect x="5" y="5" width="6" height="1" fill="#1a1c2c" />
      <rect x="7" y="6" width="2" height="2" fill="#1a1c2c" />
      <rect x="8" y="5" width="1" height="1" fill="#83eb72" /> {/* Glowing Eye */}
      {/* Silver Body Armor */}
      <rect x="5" y="8" width="6" height="4" fill="#a4a5a1" />
      {/* Blue Cape */}
      <rect x="3" y="8" width="2" height="5" fill="#569ceb" />
      {/* Arms/Shoulders */}
      <rect x="4" y="8" width="1" height="3" fill="#daddd8" />
      <rect x="11" y="8" width="1" height="3" fill="#daddd8" />
      
      {/* Weapon: Sword (idle) or nothing (drawing/shooting — bow is rendered separately) */}
      {!isDrawing && !isShooting && (
        <rect x="11" y="11" width="1" height="4" fill="#f4f4f4" />
      )}
      
      {/* Legs */}
      <rect x="6" y="12" width="2" height="3" fill="#1a1c2c" />
      <rect x="8" y="12" width="2" height="3" fill="#1a1c2c" />
    </svg>

    {/* Large Bow — rendered as a separate overlaid element so it's VISIBLE */}
    {isDrawing && (
      <svg 
        width="80" height="80" viewBox="0 0 40 40" overflow="visible"
        className="absolute -top-2 -right-10 animate-[pulse_0.3s_ease-in-out_infinite]"
        style={{ 
          transform: flipX ? 'scaleX(-1)' : 'scaleX(1)', 
          transformOrigin: 'center',
          filter: 'drop-shadow(0 0 6px rgba(244,180,27,0.8))'
        }}
      >
        {/* Bow body — curved wooden arc */}
        <path d="M 20 4 Q 32 20 20 36" stroke="#8b5a2b" strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d="M 20 4 Q 34 20 20 36" stroke="#a0692b" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        {/* Bow string — pulled back */}
        <path d="M 20 4 L 8 20 L 20 36" stroke="#ffffff" strokeWidth="1" fill="none" opacity="0.9" />
        {/* Arrow nocked on string */}
        <rect x="8" y="19" width="16" height="2" fill="#8b5a2b" />
        {/* Arrowhead */}
        <polygon points="24,17 30,20 24,23" fill="#a4a5a1" />
        {/* Fletching */}
        <rect x="4" y="17" width="4" height="2" fill="#d95763" />
        <rect x="4" y="21" width="4" height="2" fill="#d95763" />
        {/* Glow at draw point */}
        <circle cx="8" cy="20" r="3" fill="#f4b41b" opacity="0.4" />
      </svg>
    )}
  </div>
);

export default function MapCanvas({ onNodeSelect, onAimFire, discovered, unlocked, playerPos, isWalking, walkDuration, flipX, isMobileLayout, isDrawing, isShooting, shootingTarget, hitNodeId, aimMode, onCanvasTransform }) {
  const [scale, setScale] = useState(1);
  const dragY = useMotionValue(0);
  const CANVAS_WIDTH = isMobileLayout ? 900 : 1600;
  const CANVAS_HEIGHT = isMobileLayout ? 2200 : 900;

  // Reset drag offset when player moves so camera recenters perfectly
  useEffect(() => {
    dragY.set(0);
  }, [playerPos, dragY]);

  // Responsive scaling to fit canvas inside the window
  useEffect(() => {
    const handleResize = () => {
      const scaleX = window.innerWidth / CANVAS_WIDTH;
      const scaleY = window.innerHeight / CANVAS_HEIGHT;
      // In portrait, use a moderate zoom factor to show the character and upcoming checkpoints
      const finalScale = isMobileLayout 
        ? window.innerWidth / 700 
        : Math.min(Math.min(scaleX, scaleY) * 0.75, 1.5);
      setScale(finalScale);
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial calculation

    return () => window.removeEventListener('resize', handleResize);
  }, [CANVAS_WIDTH, CANVAS_HEIGHT, isMobileLayout]);

  // Aim Mode Drag State
  const [isAimDragging, setIsAimDragging] = useState(false);
  const [aimStart, setAimStart] = useState(null);
  const [aimTargetPreview, setAimTargetPreview] = useState(null);
  const [aimDragDelta, setAimDragDelta] = useState({ x: 0, y: 0 });

  const handleAimPointerDown = (e) => {
    if (isDrawing || isShooting || isWalking) return;
    e.stopPropagation(); // Prevent map pan
    e.preventDefault();
    setIsAimDragging(true);
    setAimStart({ x: e.clientX, y: e.clientY });
    setAimDragDelta({ x: 0, y: 0 });
  };

  const handleAimPointerMove = (e) => {
    if (!isAimDragging) return;
    
    // Scale distance so it feels consistent regardless of zoom
    const dx = (e.clientX - aimStart.x) / scale;
    const dy = (e.clientY - aimStart.y) / scale;
    setAimDragDelta({ x: dx, y: dy });

    // Reverse pull direction for Angry Birds style (pull left = shoot right)
    const power = 3.5;
    let targetX = playerPos.x - dx * power;
    let targetY = (playerPos.y - 40) - dy * power;
    
    // Auto-snap magnetic assist
    let snapped = false;
    for (const node of portfolioData.nodes) {
       const unlockedSet = unlocked || new Set(portfolioData.nodes.map(n => n.id));
       const isNodeUnlocked = unlockedSet.has(node.id);
       const isNodeDiscovered = discovered ? discovered.has(node.id) : false;
       
       if (isNodeUnlocked && !isNodeDiscovered) {
         const nx = isMobileLayout ? node.pX : node.x;
         const ny = isMobileLayout ? node.pY : node.y;
         const dist = Math.hypot(targetX - nx, targetY - ny);
         if (dist < 150) { // Snap radius
           targetX = nx;
           targetY = ny;
           snapped = true;
           break;
         }
       }
    }
    
    setAimTargetPreview({ x: targetX, y: targetY, snapped });
  };

  const handleAimPointerUp = (e) => {
    if (!isAimDragging) return;
    setIsAimDragging(false);
    
    // Minimum drag distance to count as a shot (e.g., 10px)
    if (aimTargetPreview && Math.hypot(aimDragDelta.x, aimDragDelta.y) > 10) {
      if (onAimFire) {
        onAimFire(aimTargetPreview.x, aimTargetPreview.y);
      }
    }
    setAimTargetPreview(null);
  };

  // Generate individual smooth cubic bezier path segments for the trail
  const trailSegments = [];
  for (let i = 1; i < portfolioData.nodes.length; i++) {
    const prev = portfolioData.nodes[i-1];
    const curr = portfolioData.nodes[i];
    
    const pX = isMobileLayout ? prev.pX : prev.x;
    const pY = isMobileLayout ? prev.pY : prev.y;
    const cX = isMobileLayout ? curr.pX : curr.x;
    const cY = isMobileLayout ? curr.pY : curr.y;
    
    const midX = (pX + cX) / 2;
    const path = `M ${pX} ${pY} C ${midX} ${pY}, ${midX} ${cY}, ${cX} ${cY}`;
    
    // A segment is active only if both connected nodes have been discovered
    const isActive = discovered.has(prev.id) && discovered.has(curr.id);
    trailSegments.push({ id: `trail-${curr.id}`, path, isActive });
  }

  // Camera Follow logic: mathematically position the canvas so playerPos sits at a specific screen coordinate
  const numericLeft = isMobileLayout && playerPos
    ? (window.innerWidth / 2) - (playerPos.x * scale)
    : (window.innerWidth / 2) - ((CANVAS_WIDTH / 2) * scale);

  const numericTop = isMobileLayout && playerPos
    ? (window.innerHeight * 0.35) - (playerPos.y * scale)
    : (window.innerHeight / 2) - ((CANVAS_HEIGHT / 2) * scale);

  // Report transform values to parent for AimOverlay coordinate conversion
  useEffect(() => {
    if (onCanvasTransform) {
      onCanvasTransform({ scale, left: numericLeft, top: numericTop });
    }
  }, [scale, numericLeft, numericTop, onCanvasTransform]);

  return (
    <div className="fixed inset-0 w-screen h-[100dvh] overflow-hidden bg-retro-dark relative">
      {/* Background that fills screen regardless of scale */}
      <TerrainBackground />

      {/* Full-screen invisible drag capture layer — only active while aiming */}
      {isAimDragging && (
        <div
          className="fixed inset-0 z-[100] cursor-crosshair"
          style={{ touchAction: 'none' }}
          onPointerMove={handleAimPointerMove}
          onPointerUp={handleAimPointerUp}
          onPointerCancel={() => { setIsAimDragging(false); setAimTargetPreview(null); }}
        />
      )}

      {/* Fixed Coordinate Canvas */}
      <motion.div 
        drag={isMobileLayout ? "y" : false}
        dragConstraints={{ top: -800, bottom: 800 }}
        dragElastic={0.2}
        animate={{ left: numericLeft, top: numericTop }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
        className="absolute cursor-grab active:cursor-grabbing" 
        style={{ 
          width: CANVAS_WIDTH, 
          height: CANVAS_HEIGHT, 
          originX: 0,
          originY: 0,
          scale: scale,
          y: dragY
        }}
      >
        {/* SKILLS ZONE */}
        <ZoneRegion x={isMobileLayout ? 450 : 225} y={isMobileLayout ? 600 : 325} rx={150} ry={150} color="#f4b41b" />
        <SectionBanner text="SKILLS" x={isMobileLayout ? 450 : 225} y={isMobileLayout ? 420 : 150} color="#f4b41b" />

        {/* PROJECTS ZONE */}
        <ZoneRegion x={isMobileLayout ? 450 : 875} y={isMobileLayout ? 1300 : 475} rx={isMobileLayout ? 250 : 350} ry={isMobileLayout ? 500 : 300} color="#569ceb" />
        <SectionBanner text="PROJECTS" x={isMobileLayout ? 450 : 870} y={isMobileLayout ? 780 : 120} color="#569ceb" />

        {/* CONTACT ZONE */}
        <ZoneRegion x={isMobileLayout ? 450 : 1450} y={isMobileLayout ? 2000 : 675} rx={150} ry={150} color="#83eb72" />
        <SectionBanner text="CONTACT" x={isMobileLayout ? 450 : 1450} y={isMobileLayout ? 1820 : 500} color="#83eb72" />

        {/* The Guided Trail */}
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
              className={`transition-all duration-1000 ${segment.isActive ? 'opacity-100 drop-shadow-[0_0_16px_rgba(244,180,27,1)] brightness-110' : 'opacity-80 grayscale brightness-50'}`}
            />
          ))}
        </svg>

        {portfolioData.nodes.map((node) => (
          <NodeMarker 
            key={node.id} 
            node={node} 
            x={isMobileLayout ? node.pX : node.x}
            y={isMobileLayout ? node.pY : node.y}
            isCompleted={discovered ? discovered.has(node.id) : false}
            isUnlocked={unlocked ? unlocked.has(node.id) : true}
            isHit={hitNodeId === node.id}
            isAimTarget={aimMode}
            onSelect={() => onNodeSelect(node)} 
          />
        ))}

        {/* Trajectory Arc (Active during aiming) */}
        {isAimDragging && aimTargetPreview && playerPos && (
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 45 }}>
            <defs>
              <linearGradient id="trajGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#f4b41b" stopOpacity="0.8" />
                <stop offset="100%" stopColor={aimTargetPreview.snapped ? "#83eb72" : "#d95763"} stopOpacity="0.8" />
              </linearGradient>
            </defs>
            {/* Dashed Arc */}
            <path 
              d={`M ${playerPos.x} ${playerPos.y - 40} Q ${playerPos.x + (aimTargetPreview.x - playerPos.x)/2} ${playerPos.y - 40 - Math.hypot(aimTargetPreview.x - playerPos.x, aimTargetPreview.y - playerPos.y)*0.15}, ${aimTargetPreview.x} ${aimTargetPreview.y}`}
              fill="none"
              stroke="url(#trajGrad)"
              strokeWidth="6"
              strokeDasharray="16 12"
              strokeLinecap="round"
              className="drop-shadow-[0_0_8px_rgba(244,180,27,0.8)]"
            />
            {/* Landing Marker */}
            <circle cx={aimTargetPreview.x} cy={aimTargetPreview.y} r={aimTargetPreview.snapped ? "24" : "16"} fill="none" stroke={aimTargetPreview.snapped ? "#83eb72" : "#d95763"} strokeWidth="4" className={aimTargetPreview.snapped ? "animate-ping" : ""} />
            <circle cx={aimTargetPreview.x} cy={aimTargetPreview.y} r="4" fill={aimTargetPreview.snapped ? "#83eb72" : "#d95763"} />
          </svg>
        )}

        {/* Arrow Projectile — large and visible with glowing trail */}
        <AnimatePresence>
          {isShooting && shootingTarget && playerPos && (
            <motion.div
              key="arrow-flight"
              initial={{ left: playerPos.x, top: playerPos.y - 40, opacity: 1 }}
              animate={{ left: shootingTarget.x, top: shootingTarget.y, opacity: 1 }}
              exit={{ opacity: 0, scale: 2 }}
              transition={{ duration: shootingTarget.duration || 0.7, ease: [0.2, 0, 0.4, 1] }}
              className="absolute z-50 pointer-events-none"
              style={{ x: '-50%', y: '-50%' }}
            >
              {/* Glowing trail behind arrow */}
              <div 
                className="absolute inset-0 rounded-full blur-lg"
                style={{
                  width: 120, height: 120,
                  marginLeft: -30, marginTop: -30,
                  background: 'radial-gradient(circle, rgba(244,180,27,0.6) 0%, rgba(217,87,99,0.3) 40%, transparent 70%)',
                }}
              />
              <svg 
                width="96" height="96" viewBox="0 0 48 48" 
                style={{ 
                  transform: `rotate(${Math.atan2(shootingTarget.y - (playerPos.y - 40), shootingTarget.x - playerPos.x) * 180 / Math.PI}deg)`,
                  filter: 'drop-shadow(0 0 8px rgba(244,180,27,0.8)) drop-shadow(0 0 16px rgba(217,87,99,0.5))',
                  imageRendering: 'pixelated'
                }}
              >
                {/* Shaft — brown wooden rod */}
                <rect x="4" y="22" width="28" height="4" fill="#8b5a2b" />
                <rect x="4" y="23" width="28" height="2" fill="#a0692b" />
                {/* Arrowhead — large silver triangle */}
                <polygon points="32,20 44,24 32,28" fill="#daddd8" />
                <polygon points="34,21 42,24 34,27" fill="#a4a5a1" />
                {/* Fletching — red feathers */}
                <rect x="2" y="19" width="6" height="3" fill="#d95763" />
                <rect x="2" y="26" width="6" height="3" fill="#d95763" />
                <rect x="0" y="21" width="4" height="6" fill="#b03a48" />
              </svg>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Player Character */}
        {playerPos && (
          <motion.div
            initial={false}
            animate={{ left: playerPos.x, top: playerPos.y }}
            transition={{ duration: walkDuration, ease: "linear" }}
            style={{ x: '-50%', y: '-100%' }}
            className="absolute z-40 pointer-events-none flex flex-col items-center justify-center"
          >
            {/* Speech Bubble */}
            {!isWalking && !isDrawing && !isShooting && playerPos.x !== -80 && playerPos.x !== 200 && (
              <motion.div 
                initial={{ opacity: 0, x: -10, scale: 0.8 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ type: 'spring', delay: 0.5, damping: 12 }}
                className="absolute -top-2 left-12 bg-white text-black font-pixel text-xs px-4 py-3 border-4 border-black whitespace-nowrap drop-shadow-xl z-50"
              >
                {(playerPos.x === 225 && playerPos.y === 675) || (playerPos.x === 450 && playerPos.y === 300) ? "Hire Mahmoud!" : "Still didn't hire him?"}
                {/* Arrow pointing left at the character's body */}
                <div className="absolute top-1/2 -left-3 -translate-y-1/2 w-0 h-0 border-t-[6px] border-b-[6px] border-r-[12px] border-t-transparent border-b-transparent border-r-black"></div>
                <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-0 h-0 border-t-[4px] border-b-[4px] border-r-[8px] border-t-transparent border-b-transparent border-r-white"></div>
              </motion.div>
            )}

            {isWalking && (
              <div className="absolute -bottom-2 w-10 h-3 bg-black/30 rounded-full blur-sm" />
            )}
            
            {/* Invisible Drag Handle for Aiming */}
            {!isWalking && !isShooting && (
              <div 
                className={`absolute w-32 h-32 bottom-0 mb-[-16px] rounded-full z-50 ${isAimDragging ? 'cursor-crosshair' : 'cursor-grab active:cursor-grabbing'}`}
                style={{ touchAction: 'none' }}
                onPointerDown={handleAimPointerDown}
              />
            )}

            <div className="pointer-events-none">
              <PixelKnight 
                isWalking={isWalking} 
                flipX={isAimDragging ? aimDragDelta.x > 0 : flipX} 
                isDrawing={isDrawing || isAimDragging} 
                isShooting={isShooting} 
              />
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
