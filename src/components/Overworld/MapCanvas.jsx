import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star } from 'lucide-react';
import NodeMarker from './NodeMarker';
import portfolioData from '../../data/portfolioData.json';

// Procedural SVG grid for terrain
const TerrainBackground = () => (
  <div className="absolute inset-0 w-full h-full pointer-events-none opacity-30" style={{
    backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v40H0V0zm40 40h40v40H40V40z' fill='%2383eb72' fill-opacity='0.1' fill-rule='evenodd'/%3E%3Cpath d='M40 0h40v40H40V0zM0 40h40v40H0V40z' fill='%2333984b' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
    backgroundSize: '80px 80px'
  }} />
);

const MapRegion = ({ x, y, width, height, title, zoneColor, isCircular, isGlowing, blobShape }) => {
  const shapeClass = isCircular ? 'rounded-full' : '';
  const customRadius = blobShape && !isCircular ? { borderRadius: blobShape } : {};
  const shadowClass = isGlowing 
    ? `0 0 80px ${zoneColor}, inset 0 0 60px ${zoneColor}, 16px 16px 0px rgba(0,0,0,0.25)` 
    : '16px 16px 0px rgba(0,0,0,0.25)';

  return (
    <div 
      className={`absolute pointer-events-none flex flex-col items-center justify-center ${shapeClass}`}
      style={{ 
        left: x, top: y, width, height,
        border: `8px solid ${zoneColor}`,
        boxShadow: shadowClass,
        transition: 'all 1s ease-in-out',
        ...customRadius
      }}
    >
      <div className={`absolute inset-0 overflow-hidden ${shapeClass}`} style={{ ...customRadius }}>
        <div className="absolute inset-0" style={{ backgroundColor: `${zoneColor}20` }} />
        {/* Blueprint Grid Overlay */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `linear-gradient(${zoneColor} 2px, transparent 2px), linear-gradient(90deg, ${zoneColor} 2px, transparent 2px)`,
            backgroundSize: '48px 48px'
          }}
        />
        {/* Big floating watermark text */}
        <div 
          className="absolute inset-0 flex items-center justify-center font-pixel text-7xl opacity-[0.08]"
          style={{ color: zoneColor }}
        >
          {title}
        </div>
      </div>

      {/* Retro Tab Header */}
      <div 
        className={`absolute px-6 py-3 font-pixel text-2xl tracking-widest text-retro-dark shadow-[8px_8px_0px_rgba(0,0,0,0.25)] ${isGlowing ? 'animate-pulse' : ''}`}
        style={{ 
          backgroundColor: zoneColor,
          top: '-32px',
          left: '50%',
          transform: 'translateX(-50%)'
        }}
      >
        {title}
      </div>
    </div>
  );
};

const PixelKnight = ({ isWalking, flipX }) => (
  <svg width="64" height="64" viewBox="0 0 16 16" 
       className={`drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)] ${isWalking ? 'animate-[bounce_0.3s_infinite]' : ''}`} 
       style={{ transform: flipX ? 'scaleX(-1)' : 'scaleX(1)', transformOrigin: 'center' }}>
    {/* Helmet */}
    <rect x="5" y="2" width="6" height="1" fill="#f4f4f4" />
    <rect x="4" y="3" width="8" height="4" fill="#d95763" />
    {/* Visor */}
    <rect x="5" y="4" width="6" height="2" fill="#1a1c2c" />
    <rect x="9" y="4" width="1" height="1" fill="#83eb72" /> {/* Glowing Eye */}
    {/* Body */}
    <rect x="5" y="7" width="6" height="5" fill="#5d7275" />
    {/* Backpack/Cape */}
    <rect x="3" y="7" width="2" height="6" fill="#f4b41b" />
    {/* Arms */}
    <rect x="4" y="7" width="1" height="4" fill="#f4f4f4" />
    <rect x="11" y="7" width="1" height="4" fill="#f4f4f4" />
    {/* Legs */}
    <rect x="6" y="12" width="2" height="3" fill="#1a1c2c" />
    <rect x="8" y="12" width="2" height="3" fill="#1a1c2c" />
  </svg>
);

export default function MapCanvas({ onNodeSelect, discovered, playerPos, isWalking, walkDuration, flipX, isMobileLayout }) {
  const [scale, setScale] = useState(1);
  const CANVAS_WIDTH = isMobileLayout ? 900 : 1600;
  const CANVAS_HEIGHT = isMobileLayout ? 2200 : 900;

  // Responsive scaling to fit canvas inside the window
  useEffect(() => {
    const handleResize = () => {
      const scaleX = window.innerWidth / CANVAS_WIDTH;
      const scaleY = window.innerHeight / CANVAS_HEIGHT;
      // In portrait, use a tighter padding factor (0.85) to maximize space. Landscape stays 0.75.
      const finalScale = isMobileLayout 
        ? Math.min(scaleX, scaleY) * 0.9 
        : Math.min(Math.min(scaleX, scaleY) * 0.75, 1.5);
      setScale(finalScale);
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial calculation

    return () => window.removeEventListener('resize', handleResize);
  }, [CANVAS_WIDTH, CANVAS_HEIGHT, isMobileLayout]);

  // Generate a smooth cubic bezier path for the trail
  const generateCurvedPath = (nodes) => {
    if (nodes.length === 0) return '';
    let path = `M ${isMobileLayout ? nodes[0].pX : nodes[0].x} ${isMobileLayout ? nodes[0].pY : nodes[0].y} `;
    for (let i = 1; i < nodes.length; i++) {
      const prev = nodes[i-1];
      const curr = nodes[i];
      const pX = isMobileLayout ? prev.pX : prev.x;
      const pY = isMobileLayout ? prev.pY : prev.y;
      const cX = isMobileLayout ? curr.pX : curr.x;
      const cY = isMobileLayout ? curr.pY : curr.y;
      
      const midX = (pX + cX) / 2;
      path += `C ${midX} ${pY}, ${midX} ${cY}, ${cX} ${cY} `;
    }
    return path;
  };

  const trailPath = generateCurvedPath(portfolioData.nodes);

  return (
    <div className="w-screen h-screen overflow-hidden bg-retro-green relative flex items-center justify-center">
      {/* Background that fills screen regardless of scale */}
      <TerrainBackground />

      {/* Fixed Coordinate Canvas */}
      <div 
        className="relative transition-all duration-700" 
        style={{ 
          width: CANVAS_WIDTH, 
          height: CANVAS_HEIGHT, 
          transform: `scale(${scale})`, 
          transformOrigin: 'center center' 
        }}
      >
        {/* Phase Regions */}
        {isMobileLayout ? (
          <>
            <MapRegion x={300} y={150} width={300} height={300} title="START" zoneColor="#d95763" isCircular={true} isGlowing={discovered ? !discovered.has('about') : true} />
            <MapRegion x={300} y={450} width={300} height={300} title="SKILLS" zoneColor="#f4b41b" isCircular={true} />
            <MapRegion x={150} y={750} width={600} height={1100} title="PROJECTS" zoneColor="#569ceb" blobShape="50% 50% 50% 50% / 40% 40% 40% 40%" />
            <MapRegion x={300} y={1850} width={300} height={300} title="CONTACT" zoneColor="#83eb72" isCircular={true} />
          </>
        ) : (
          <>
            <MapRegion x={100} y={560} width={250} height={250} title="START" zoneColor="#d95763" isCircular={true} isGlowing={discovered ? !discovered.has('about') : true} />
            <MapRegion x={100} y={200} width={320} height={320} title="SKILLS" zoneColor="#f4b41b" blobShape="43% 57% 41% 59% / 54% 41% 59% 46%" />
            <MapRegion x={460} y={100} width={820} height={700} title="PROJECTS" zoneColor="#569ceb" blobShape="62% 38% 51% 49% / 40% 58% 42% 60%" />
            <MapRegion x={1320} y={560} width={230} height={230} title="CONTACT" zoneColor="#83eb72" blobShape="40% 60% 70% 30% / 40% 50% 60% 50%" />
          </>
        )}

        {/* The Guided Trail */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 5 }}>
          <path 
            d={trailPath} 
            fill="none" 
            stroke="#f4b41b" 
            strokeWidth="4" 
            strokeDasharray="12 12" 
            strokeLinecap="round"
            strokeLinejoin="round"
            className="opacity-60 drop-shadow-md animate-[dash_2s_linear_infinite]"
          />
        </svg>

        {portfolioData.nodes.map((node) => (
          <NodeMarker 
            key={node.id} 
            node={node} 
            x={isMobileLayout ? node.pX : node.x}
            y={isMobileLayout ? node.pY : node.y}
            isCompleted={discovered ? discovered.has(node.id) : false}
            onSelect={() => onNodeSelect(node)} 
          />
        ))}

        {/* Player Character */}
        {playerPos && (
          <motion.div
            animate={{ left: playerPos.x, top: playerPos.y }}
            transition={{ duration: walkDuration, ease: "linear" }}
            className="absolute z-40 pointer-events-none flex flex-col items-center justify-center transform -translate-x-1/2 -translate-y-[80%]"
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

            {/* Spotlight & Steel Stand */}
            {!isWalking && (playerPos.x === -80 || playerPos.x === 200) && (
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-24 h-8 pointer-events-none z-[-1]">
                
                {/* Spotlight Cone starting near his head */}
                <div 
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-48 pointer-events-none opacity-40 animate-pulse"
                  style={{
                    background: 'linear-gradient(to bottom, rgba(244, 244, 244, 0.9) 0%, rgba(244, 244, 244, 0.2) 85%, rgba(244, 244, 244, 0) 100%)',
                    clipPath: 'polygon(45% 0, 55% 0, 100% 100%, 0% 100%)',
                  }}
                />

                {/* Steel Platform */}
                {/* Floor Shadow */}
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-32 h-6 bg-black opacity-50 blur-md rounded-[100%] z-[-2]" />
                {/* Base / Thickness */}
                <div className="absolute bottom-0 left-0 right-0 h-6 bg-slate-600 rounded-[100%] border-b-2 border-l-2 border-r-2 border-slate-800" />
                {/* Top Surface */}
                <div className="absolute top-0 left-0 right-0 h-6 bg-slate-400 rounded-[100%] border-2 border-slate-200 shadow-[inset_0_-2px_8px_rgba(0,0,0,0.5)] flex items-center justify-center">
                  {/* Metal details */}
                  <div className="w-14 h-2 border border-slate-500 rounded-[100%] opacity-60" />
                </div>
              </div>
            )}

            {isWalking && (
              <div className="absolute -bottom-2 w-10 h-3 bg-black/30 rounded-full blur-sm" />
            )}
            <PixelKnight isWalking={isWalking} flipX={flipX} />
          </motion.div>
        )}
      </div>
    </div>
  );
}
