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
    className="absolute pointer-events-none z-[2] rounded-[40%] blur-3xl opacity-20"
    style={{
      left: x,
      top: y,
      width: rx * 2,
      height: ry * 2,
      transform: 'translate(-50%, -50%)',
      backgroundColor: color,
    }}
  />
);

const PixelKnight = ({ isWalking, flipX }) => (
  <svg width="64" height="64" viewBox="0 0 16 16" overflow="visible"
       className={`drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)] ${isWalking ? 'animate-[bounce_0.3s_infinite]' : ''}`} 
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
    {/* Sword */}
    <rect x="11" y="11" width="1" height="4" fill="#f4f4f4" />
    {/* Legs */}
    <rect x="6" y="12" width="2" height="3" fill="#1a1c2c" />
    <rect x="8" y="12" width="2" height="3" fill="#1a1c2c" />
  </svg>
);

export default function MapCanvas({ onNodeSelect, discovered, unlocked, playerPos, isWalking, walkDuration, flipX, isMobileLayout }) {
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
  const targetLeft = isMobileLayout && playerPos
    ? `calc(50% - ${playerPos.x * scale}px)`
    : `calc(50% - ${(CANVAS_WIDTH / 2) * scale}px)`;

  // On mobile, put the player at 35% height from the top of the screen to reveal the path below!
  const targetTop = isMobileLayout && playerPos
    ? `calc(35% - ${playerPos.y * scale}px)`
    : `calc(50% - ${(CANVAS_HEIGHT / 2) * scale}px)`;

  return (
    <div className="fixed inset-0 w-screen h-[100dvh] overflow-hidden bg-retro-dark relative">
      {/* Background that fills screen regardless of scale */}
      <TerrainBackground />

      {/* Fixed Coordinate Canvas */}
      <motion.div 
        drag={isMobileLayout ? "y" : false}
        dragConstraints={{ top: -800, bottom: 800 }}
        dragElastic={0.2}
        animate={{ left: targetLeft, top: targetTop }}
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
            onSelect={() => onNodeSelect(node)} 
          />
        ))}

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
            {!isWalking && playerPos.x !== -80 && playerPos.x !== 200 && (
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
            <PixelKnight isWalking={isWalking} flipX={flipX} />
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
