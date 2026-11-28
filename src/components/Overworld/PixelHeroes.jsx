import React from 'react';
import { motion } from 'framer-motion';

const heroPalette = {
  '.': 'transparent',
  'B': '#0d101a', // Crisp outline
  'W': '#ffffff',
  // Skin & Hair
  'F': '#f5cba7', // Warm skin
  'f': '#d99b72', // Skin shadow
  'H': '#241c2c', // Dark tousled hair
  'h': '#3d304a', // Hair highlight
  // Cyber-Dev Jacket & Visor
  'R': '#e11d48', // Crimson techwear jacket
  'r': '#9f1239', // Jacket shadow
  'C': '#22d3ee', // Glowing Cyan XR Visor
  'c': '#0891b2',
  'D': '#1e293b', // Dark pants/undershirt
  'd': '#334155',
  // Sky-Ranger Cloak, Gold & Blade
  'U': '#2563eb', // Royal cloak blue
  'u': '#1d4ed8',
  'Y': '#facc15', // Bright gold trim
  'y': '#ca8a04',
  'G': '#4ade80'  // Glowing rune emerald
};

function renderPixelGrid(rows, width = 76, height = 76) {
  const h = rows.length;
  const w = rows[0].length;
  const rects = [];
  for (let y = 0; y < h; y++) {
    let x = 0;
    while (x < w) {
      const ch = rows[y][x];
      const fill = heroPalette[ch];
      let run = 1;
      while (x + run < w && rows[y][x + run] === ch) run++;
      if (fill && fill !== 'transparent') {
        rects.push(<rect key={`${x}-${y}`} x={x} y={y} width={run} height={1} fill={fill} />);
      }
      x += run;
    }
  }
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${w} ${h}`}
      overflow="visible"
      style={{ imageRendering: 'pixelated', shapeRendering: 'crispEdges' }}
    >
      {rects}
    </svg>
  );
}

// 24x24 Expressive Cyber-XR Game Dev Hero (Tousled hair, glowing cyan XR visor, crimson tech jacket, scarf)
const CYBER_DEV_ROWS = [
  "........BBBBBB..........",
  "......BBHHHHHHBB........",
  ".....BHHhhHHhhHHB.......",
  "....BHHHHHHHHHHHHB......",
  "....BHBBBBBBBBBBHB......",
  "....BBCCCCCCCCCCBB......",
  "....BCWWCCCCCCWWCB......",
  "....BCCCCCCCCCCCCB......",
  ".....BBBBFFFFBBBB.......",
  "......BFFfFFfFFB........",
  "...BBBBFFFFFFFFBBBB.....",
  "..BRRRRBBBBBBBBRRRRB....",
  ".BRRRRRRYYYYYYRRRRRRB...",
  ".BRrRRRRDDDDDDRRRRrRB...",
  "..BBBRRRDDCCDDRRRBBB....",
  "....BRRRDDDDDDRRRB......",
  "...BffRRDDDDDDRRffB.....",
  "...BBBBBBBBBBBBBBBB.....",
  "......BDDDDDDDDB........",
  "......BDDD..DDDB........",
  "......BDDD..DDDB........",
  ".....BBWWB..BWWBB.......",
  ".....BRRRB..BRRRB.......",
  ".....BBBBB..BBBBB......."
];

// 24x24 Expressive Sky-Citadel Ranger (Windswept hair, crimson headband tails, royal gold-trimmed cloak, rune sword)
const SKY_RANGER_ROWS = [
  ".........BBBBBB.........",
  ".......BBHHHHHHBB.......",
  "......BHHhhHHHHHHB......",
  "..BBB.BHHHHHHHHHHB......",
  ".BRRRBBRRRRRRRRRRBB.....",
  "BRrR..BFFFFFFFFFFB..BB..",
  ".BB...BFFBFFFFBFFB.BYYB.",
  "......BFFFFFFFFFFB.BGGYB",
  ".......BBFFFFFFBB..BYYB.",
  ".....BBBBUUUUUUBBBB.BB..",
  "...BBUUUYYYYYYYYUUUBB...",
  "..BUUUUUUUDDDDUUUUUUUB..",
  "..BUuUUUUUDDDDUUUUUuUB..",
  ".BUUuUUUUBYYYYBUUUUuUUB.",
  ".BUuUUUUUBDDDDUBUUUUuUB.",
  ".BBUUUUUUBDDDDUBUUUUUBB.",
  "...BBUUUffDDDDffUUUBB...",
  ".....BBBBBDDDDBBBBB.....",
  ".......BDDDDDDDDB.......",
  ".......BDDD..DDDB.......",
  "......BYYYYB.BYYYYB.....",
  "......BUUUUB.BUUUUB.....",
  "......BBBBBB.BBBBBB.....",
  "........................"
];

// World 1 Hero: Cyber-XR Dev + Hovering Companion Drone ("BitBot") + Contextual Speech Bubble
export function CyberDevHero({ isWalking, flipX, speechText }) {
  return (
    <div className="relative flex items-center justify-center" style={{ width: 88, height: 88 }}>
      {/* Contextual Pixel Arrival Speech Bubble */}
      {speechText && !isWalking && (
        <motion.div
          key={speechText}
          initial={{ opacity: 0, y: 8, scale: 0.85 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ type: 'spring', stiffness: 360, damping: 20 }}
          className="absolute -top-11 left-1/2 -translate-x-1/2 px-2.5 py-1 bg-white text-[#0b0e17] border-[3px] border-black font-pixel text-[9px] whitespace-nowrap shadow-[4px_4px_0_rgba(0,0,0,0.85)] z-30 pointer-events-none"
        >
          {speechText}
          <span className="absolute left-1/2 -translate-x-1/2 -bottom-2 w-2.5 h-2.5 bg-white border-r-[3px] border-b-[3px] border-black rotate-45" />
        </motion.div>
      )}

      {/* Cyan holo-ring shadow under feet */}
      <div
        className="absolute bottom-1 w-14 h-4 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse, rgba(34,211,238,0.5) 0%, rgba(0,0,0,0.65) 65%, transparent 80%)'
        }}
      />

      {/* Hovering Pixel Companion Drone ("BitBot") */}
      <motion.div
        animate={{ y: [-6, 4, -6], x: flipX ? [28, 32, 28] : [-28, -32, -28] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1 z-20 pointer-events-none"
      >
        <svg width="26" height="26" viewBox="0 0 10 10" style={{ shapeRendering: 'crispEdges', filter: 'drop-shadow(0 0 6px #22d3ee)' }}>
          <rect x="4" y="0" width="2" height="2" fill="#facc15" />
          <rect x="2" y="2" width="6" height="5" fill="#0d101a" />
          <rect x="3" y="3" width="4" height="3" fill="#e2e8f0" />
          <rect x="4" y="4" width="2" height="1" fill="#22d3ee" />
          <rect x="1" y="4" width="1" height="2" fill="#22d3ee" />
          <rect x="8" y="4" width="1" height="2" fill="#22d3ee" />
        </svg>
      </motion.div>

      {/* Main Animated Hero */}
      <motion.div
        animate={isWalking ? { y: [0, -8, 0], rotate: [-4, 4, -4] } : { y: [0, -3, 0] }}
        transition={{ duration: isWalking ? 0.2 : 1.6, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          transform: flipX ? 'scaleX(-1)' : 'scaleX(1)',
          filter: 'drop-shadow(0 6px 6px rgba(0,0,0,0.8))'
        }}
        className="relative z-10"
      >
        {renderPixelGrid(CYBER_DEV_ROWS, 76, 76)}
      </motion.div>
    </div>
  );
}

// World 2 Hero: Windswept Sky-Ranger with Golden Starlight Trail
export function SkyRangerHero({ isWalking, flipX }) {
  return (
    <div className="relative flex items-center justify-center" style={{ width: 84, height: 84 }}>
      <div
        className="absolute bottom-1 w-14 h-4 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse, rgba(250,204,21,0.5) 0%, rgba(0,0,0,0.65) 65%, transparent 80%)'
        }}
      />

      {/* Orbiting Starlight Wisp Companion */}
      <motion.div
        animate={{ y: [-8, 3, -8], scale: [0.9, 1.2, 0.9] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-1 right-1 z-20 pointer-events-none"
      >
        <svg width="22" height="22" viewBox="0 0 10 10" style={{ shapeRendering: 'crispEdges', filter: 'drop-shadow(0 0 8px #facc15)' }}>
          <rect x="4" y="1" width="2" height="8" fill="#fef08a" />
          <rect x="1" y="4" width="8" height="2" fill="#fef08a" />
          <rect x="3" y="3" width="4" height="4" fill="#ffffff" />
        </svg>
      </motion.div>

      <motion.div
        animate={isWalking ? { y: [0, -12, 0] } : { y: [0, -4, 0] }}
        transition={{ duration: isWalking ? 0.28 : 1.8, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          transform: flipX ? 'scaleX(-1)' : 'scaleX(1)',
          filter: 'drop-shadow(0 6px 6px rgba(0,0,0,0.85))'
        }}
        className="relative z-10"
      >
        {renderPixelGrid(SKY_RANGER_ROWS, 76, 76)}
      </motion.div>
    </div>
  );
}
