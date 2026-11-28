import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export const ARCHER_MODELS = [
  { id: 'gandalf', label: '1. Armored Archer' },
  { id: 'hero', label: '2. Hooded Ranger' },
  { id: 'custom', label: '3. Cyber-Arcane (Custom)' }
];

export const ARCHER_COLORS = [
  { id: 'red',    hex: '#dc2626', label: 'Crimson', heroFilter: 'hue-rotate(195deg) saturate(1.5)' },
  { id: 'blue',   hex: '#2563eb', label: 'Cobalt',  heroFilter: 'hue-rotate(55deg) saturate(1.35)' },
  { id: 'green',  hex: '#16a34a', label: 'Emerald', heroFilter: 'none' },
  { id: 'yellow', hex: '#eab308', label: 'Gold',    heroFilter: 'hue-rotate(255deg) saturate(1.6) brightness(1.1)' },
  { id: 'purple', hex: '#9333ea', label: 'Violet',  heroFilter: 'hue-rotate(115deg) saturate(1.4)' },
  { id: 'black',  hex: '#1e293b', label: 'Shadow',  heroFilter: 'saturate(0.25) brightness(0.75) contrast(1.25)' },
  { id: 'brown',  hex: '#92400e', label: 'Leather', heroFilter: 'hue-rotate(225deg) saturate(1.15) brightness(0.95)' },
  { id: 'steel',  hex: '#94a3b8', label: 'Classic', heroFilter: 'saturate(0.5) brightness(1.15)' }
];

const CUSTOM_THEMES = {
  red:    { cape: '#e11d48', capeDark: '#9f1239', trim: '#facc15', energy: '#38bdf8', armor: '#cbd5e1' },
  blue:   { cape: '#2563eb', capeDark: '#1e3a8a', trim: '#38bdf8', energy: '#facc15', armor: '#e2e8f0' },
  green:  { cape: '#16a34a', capeDark: '#14532d', trim: '#facc15', energy: '#86efac', armor: '#cbd5e1' },
  yellow: { cape: '#eab308', capeDark: '#854d0e', trim: '#ffffff', energy: '#fef08a', armor: '#f1f5f9' },
  purple: { cape: '#9333ea', capeDark: '#581c87', trim: '#f472b6', energy: '#22d3ee', armor: '#cbd5e1' },
  black:  { cape: '#1e293b', capeDark: '#0f172a', trim: '#38bdf8', energy: '#f43f5e', armor: '#64748b' },
  brown:  { cape: '#b45309', capeDark: '#78350f', trim: '#fde047', energy: '#38bdf8', armor: '#d6d3d1' },
  steel:  { cape: '#475569', capeDark: '#1e293b', trim: '#facc15', energy: '#38bdf8', armor: '#f8fafc' }
};

// Preload all PNG sprite sheets once so state transitions have 0ms flicker
let preloaded = false;
function preloadArcherSheets() {
  if (preloaded || typeof window === 'undefined') return;
  preloaded = true;
  const urls = [
    ...ARCHER_COLORS.map((c) => `/archers/gandalf/${c.id}.png?v=2`),
    '/archers/gandalf/arrow.png',
    '/archers/hero/idle_run.png',
    '/archers/hero/attack.png'
  ];
  urls.forEach((u) => {
    const img = new Image();
    img.src = u;
  });
}

/**
 * 1. GANDALFHARDCORE ARCHER (704x320 sheet = 11 cols x 5 rows of 64x64 frames)
 * - Row 0 (col 0..4):  5-frame Idle
 * - Row 1 (col 0..7):  8-frame Bow Nock & Full Draw
 * - Row 1 (col 8..10): 3-frame Twang Release & Follow-through
 * - Row 2 (col 0..7):  8-frame Run Cycle
 * Measured character center inside 64x64 cell: x = 25.5px, feet y = 63px.
 */
function GandalfSpriteArcher({ colorId = 'red', state, flipX }) {
  const [frameIdx, setFrameIdx] = useState(0);

  useEffect(() => {
    setFrameIdx(0);
    let intervalMs = 150;
    let count = 5;
    let loop = true;

    if (state === 'draw') {
      intervalMs = 80;
      count = 8; // col 0..7 -> holds full draw at col 7
      loop = false;
    } else if (state === 'shoot') {
      intervalMs = 95;
      count = 3; // col 8..10 -> release snap & follow-through
      loop = false;
    } else if (state === 'walk') {
      intervalMs = 72;
      count = 8; // Row 2 col 0..7
      loop = true;
    }

    const id = setInterval(() => {
      setFrameIdx((prev) => {
        if (prev + 1 < count) return prev + 1;
        return loop ? 0 : count - 1;
      });
    }, intervalMs);

    return () => clearInterval(id);
  }, [state]);

  let row = 0;
  let col = frameIdx;
  if (state === 'draw') {
    row = 1;
    col = Math.min(frameIdx, 7);
  } else if (state === 'shoot') {
    row = 1;
    col = 8 + Math.min(frameIdx, 2);
  } else if (state === 'walk') {
    row = 2;
    col = frameIdx % 8;
  } else {
    row = 0;
    col = frameIdx % 5;
  }

  const validColor = ARCHER_COLORS.some((c) => c.id === colorId) ? colorId : 'red';
  const SCALE = 2.15;

  return (
    <div className="relative pointer-events-none" style={{ width: 120, height: 110 }}>
      {/* Position 64x64 native frame so x=25.5 aligns with 60px center and y=63 aligns with bottom 110px */}
      <div
        style={{
          position: 'absolute',
          left: 60 - 25.5,
          top: 110 - 63,
          width: 64,
          height: 64,
          backgroundImage: `url("/archers/gandalf/${validColor}.png?v=2")`,
          backgroundSize: '704px 320px',
          backgroundPosition: `-${col * 64}px -${row * 64}px`,
          backgroundRepeat: 'no-repeat',
          imageRendering: 'pixelated',
          transformOrigin: '25.5px 63px',
          transform: `scale(${flipX ? -SCALE : SCALE}, ${SCALE})`,
          filter: 'drop-shadow(0 3px 3px rgba(0,0,0,0.65))'
        }}
      />
    </div>
  );
}

/**
 * 2. ARCHERHERO HOODED RANGER (64x64 cells)
 * - idle_run.png (512x128 = 8x2):
 *   - Row 0 (col 0..1): 2-frame Cloak Idle
 *   - Row 1 (col 0..7): 8-frame Flowing Cloak Sprint
 * - attack.png (512x256 = 8x4):
 *   - Row 0 (col 0..7): 8-frame Raise Bow -> Quiver Reach -> Full Cyan Arrow Draw
 *   - Row 1 (col 0..2): 3-frame Snap Release & Follow-Through
 * Measured character center inside 64x64 cell: x = 35.5px, feet y = 52px.
 */
function HeroRangerSpriteArcher({ colorId = 'green', state, flipX }) {
  const [frameIdx, setFrameIdx] = useState(0);

  useEffect(() => {
    setFrameIdx(0);
    let intervalMs = 340;
    let count = 2;
    let loop = true;

    if (state === 'draw') {
      intervalMs = 80;
      count = 8; // Row 0 col 0..7
      loop = false;
    } else if (state === 'shoot') {
      intervalMs = 95;
      count = 3; // Row 1 col 0..2
      loop = false;
    } else if (state === 'walk') {
      intervalMs = 68;
      count = 8; // Row 1 col 0..7
      loop = true;
    }

    const id = setInterval(() => {
      setFrameIdx((prev) => {
        if (prev + 1 < count) return prev + 1;
        return loop ? 0 : count - 1;
      });
    }, intervalMs);

    return () => clearInterval(id);
  }, [state]);

  const isAttack = state === 'draw' || state === 'shoot';
  const sheetUrl = isAttack ? '/archers/hero/attack.png' : '/archers/hero/idle_run.png';
  const sheetSize = isAttack ? '512px 256px' : '512px 128px';

  let row = 0;
  let col = 0;
  if (state === 'draw') {
    row = 0;
    col = Math.min(frameIdx, 7);
  } else if (state === 'shoot') {
    row = 1;
    col = Math.min(frameIdx, 2);
  } else if (state === 'walk') {
    row = 1;
    col = frameIdx % 8;
  } else {
    row = 0;
    col = frameIdx % 2;
  }

  const colorObj = ARCHER_COLORS.find((c) => c.id === colorId) || ARCHER_COLORS[2];
  const colorFilter = colorObj.heroFilter === 'none' ? '' : `${colorObj.heroFilter} `;
  const SCALE = 2.35;

  return (
    <div className="relative pointer-events-none" style={{ width: 120, height: 110 }}>
      <div
        style={{
          position: 'absolute',
          left: 60 - 35.5,
          top: 110 - 52,
          width: 64,
          height: 64,
          backgroundImage: `url("${sheetUrl}")`,
          backgroundSize: sheetSize,
          backgroundPosition: `-${col * 64}px -${row * 64}px`,
          backgroundRepeat: 'no-repeat',
          imageRendering: 'pixelated',
          transformOrigin: '35.5px 52px',
          transform: `scale(${flipX ? -SCALE : SCALE}, ${SCALE})`,
          filter: `${colorFilter}drop-shadow(0 3px 3px rgba(0,0,0,0.7))`
        }}
      />
    </div>
  );
}

/**
 * 3. CUSTOM GENERATED PIXEL ARCHER ("Cyber-Arcane Ranger")
 * True frame-by-frame 36x36 integer pixel sprite engine:
 * - 6-frame Idle (breathing torso, billowing hooded cape tail, visor glint)
 * - 8-frame Sprint (full 8-phase stride legs, leaning torso, streaming cape wave, boot dust)
 * - 8-frame Bow Pull (raises golden recurve bow, reaches to quiver, nocks energy arrow, bends bow limbs & pulls string back!)
 * - 3-frame Arrow Release (bow limbs snap forward, string vibrates, recoil pose!)
 */
function CustomArcaneArcher({ colorId = 'red', state, flipX }) {
  const [frame, setFrame] = useState(0);
  const theme = CUSTOM_THEMES[colorId] || CUSTOM_THEMES.red;

  useEffect(() => {
    setFrame(0);
    let intervalMs = 150;
    let count = 6;
    let loop = true;

    if (state === 'draw') {
      intervalMs = 80;
      count = 8;
      loop = false;
    } else if (state === 'shoot') {
      intervalMs = 95;
      count = 3;
      loop = false;
    } else if (state === 'walk') {
      intervalMs = 68;
      count = 8;
      loop = true;
    }

    const id = setInterval(() => {
      setFrame((prev) => {
        if (prev + 1 < count) return prev + 1;
        return loop ? 0 : count - 1;
      });
    }, intervalMs);

    return () => clearInterval(id);
  }, [state]);

  // Frame-driven pixel offsets (100% integer coordinates on a 40x36 pixel canvas!)
  const isRun = state === 'walk';
  const isDraw = state === 'draw';
  const isShoot = state === 'shoot';

  // Vertical bob
  const bobY = isRun
    ? [0, -1, -2, -1, 0, -1, -2, -1][frame % 8]
    : state === 'idle'
      ? [0, 0, -1, -1, 0, 0][frame % 6]
      : 0;

  const leanX = isRun ? 2 : 0;

  // 8-phase run leg keyframes: [leftFootX, leftFootY, rightFootX, rightFootY]
  const runLegs = [
    [13, 33, 22, 31],
    [11, 31, 24, 32],
    [13, 30, 23, 34],
    [16, 32, 20, 34],
    [21, 33, 14, 31],
    [24, 31, 11, 32],
    [22, 30, 13, 34],
    [18, 32, 16, 34]
  ];
  const [lx, ly, rx, ry] = isRun ? runLegs[frame % 8] : isDraw || isShoot ? [14, 34, 21, 34] : [15, 34, 20, 34];

  // Flowing cape tail wave keyframes
  const capeLift = isRun ? [3, 4, 5, 4, 3, 4, 5, 4][frame % 8] : [0, 1, 1, 2, 1, 0][frame % 6];

  // Bow & String Pull Physics (frames 0..7 during 'draw', frames 0..2 during 'shoot')
  // pullAmount: how many pixels the bowstring is pulled back & limbs flex inward (0..6)
  let pull = 0;
  let showNockedArrow = false;
  let reachingQuiver = false;
  let stringVibrate = false;

  if (isDraw) {
    if (frame <= 1) {
      reachingQuiver = true;
      pull = 0;
    } else if (frame === 2) {
      showNockedArrow = true;
      pull = 1;
    } else {
      showNockedArrow = true;
      pull = Math.min(6, frame - 1); // pulls back 2 -> 3 -> 4 -> 5 -> 6 px!
    }
  } else if (isShoot) {
    pull = frame === 0 ? -1 : 0;
    stringVibrate = frame <= 1;
  }

  const bowBaseX = isDraw || isShoot ? 27 : isRun ? 25 : 24;
  const bowTopX = bowBaseX - Math.floor(Math.max(0, pull) * 0.5);
  const stringMidX = bowBaseX - 3 - Math.max(0, pull);

  return (
    <div
      className="relative pointer-events-none flex items-end justify-center"
      style={{
        width: 112,
        height: 104,
        transform: flipX ? 'scaleX(-1)' : 'scaleX(1)',
        filter: 'drop-shadow(0 4px 4px rgba(0,0,0,0.75))'
      }}
    >
      <svg
        width="112"
        height="101"
        viewBox="0 0 40 36"
        overflow="visible"
        style={{ imageRendering: 'pixelated', shapeRendering: 'crispEdges' }}
      >
        {/* Running Boot Dust Puffs */}
        {isRun && frame % 2 === 0 && (
          <>
            <rect x="6" y="33" width="3" height="2" fill="#e2e8f0" opacity="0.75" />
            <rect x="3" y="31" width="2" height="2" fill="#cbd5e1" opacity="0.55" />
          </>
        )}

        {/* Quiver & Feathered Arrows on Back */}
        <rect x={12 + leanX} y={13 + bobY} width="4" height="9" fill="#78350f" stroke="#090d16" strokeWidth="1" />
        <rect x={11 + leanX} y={11 + bobY} width="2" height="3" fill={theme.energy} />
        <rect x={13 + leanX} y={10 + bobY} width="2" height="3" fill={theme.trim} />

        {/* Flowing Multi-Pixel Cape (flutters in idle, streams horizontally during sprint!) */}
        <rect x={10 - capeLift + leanX} y={16 + bobY} width={6 + capeLift} height="5" fill={theme.capeDark} />
        <rect x={8 - capeLift + leanX} y={19 + bobY - Math.floor(capeLift / 2)} width={8 + capeLift} height="6" fill={theme.cape} />
        <rect x={7 - capeLift + leanX} y={24 + bobY - capeLift} width={7 + Math.floor(capeLift / 2)} height="5" fill={theme.cape} />
        <rect x={9 - capeLift + leanX} y={28 + bobY - capeLift} width="5" height="2" fill={theme.trim} />

        {/* Back Leg & Boot */}
        <rect x={lx} y={26 + bobY} width="3" height={Math.max(3, ly - (26 + bobY))} fill="#1e293b" />
        <rect x={lx - 1} y={ly} width="5" height="2" fill="#0f172a" />
        <rect x={lx} y={ly - 1} width="3" height="1" fill={theme.trim} />

        {/* Front Leg & Boot */}
        <rect x={rx} y={26 + bobY} width="3" height={Math.max(3, ry - (26 + bobY))} fill="#334155" />
        <rect x={rx - 1} y={ry} width="5" height="2" fill="#090d16" />
        <rect x={rx} y={ry - 1} width="4" height="1" fill={theme.cape} />

        {/* Armored Tunic & Chestplate */}
        <rect x={14 + leanX} y={16 + bobY} width="9" height="10" fill="#1e293b" stroke="#090d16" strokeWidth="1" />
        <rect x={15 + leanX} y={17 + bobY} width="7" height="5" fill={theme.armor} />
        <rect x={14 + leanX} y={23 + bobY} width="9" height="2" fill={theme.trim} />
        {/* Shoulder Pauldron */}
        <rect x={13 + leanX} y={15 + bobY} width="5" height="4" fill={theme.cape} stroke="#090d16" strokeWidth="1" />

        {/* Hooded Ranger Head + Glowing Cyber-Arcane Visor */}
        <rect x={14 + leanX} y={6 + bobY} width="10" height="9" fill={theme.cape} stroke="#090d16" strokeWidth="1" />
        <rect x={15 + leanX} y={5 + bobY} width="7" height="2" fill={theme.cape} />
        {/* Face shadow & glowing visor eyes */}
        <rect x={17 + leanX} y={8 + bobY} width="6" height="6" fill="#0f172a" />
        <rect x={18 + leanX} y={10 + bobY} width="5" height="2" fill={theme.energy} />
        <rect x={21 + leanX} y={10 + bobY} width="2" height="1" fill="#ffffff" />

        {/* ── ARTICULATED GOLDEN-TRIMMED RECURVE BOW ── */}
        {isDraw || isShoot ? (
          <>
            {/* Bow Front Extended Arm */}
            <rect x={21 + leanX} y={17 + bobY} width={bowBaseX - (20 + leanX)} height="3" fill={theme.armor} />

            {/* Bowstring (bends into deep V when pulled!) */}
            <line
              x1={bowTopX}
              y1={9 + bobY}
              x2={stringMidX}
              y2={18 + bobY}
              stroke="#ffffff"
              strokeWidth="1"
              opacity="0.95"
            />
            <line
              x1={stringMidX}
              y1={18 + bobY}
              x2={bowTopX}
              y2={27 + bobY}
              stroke="#ffffff"
              strokeWidth="1"
              opacity="0.95"
            />

            {/* String Twang Vibration Pixels right on Release */}
            {stringVibrate && (
              <>
                <rect x={bowTopX - 1} y={13 + bobY} width="1" height="2" fill={theme.energy} />
                <rect x={bowTopX + 1} y={21 + bobY} width="1" height="2" fill={theme.energy} />
              </>
            )}

            {/* Recurve Bow Limbs (flex backward as pull increases!) */}
            <rect x={bowTopX} y={8 + bobY} width="2" height="3" fill={theme.trim} />
            <rect x={bowBaseX - Math.floor(pull * 0.3)} y={11 + bobY} width="2" height="4" fill="#92400e" />
            <rect x={bowBaseX + 1} y={15 + bobY} width="2" height="6" fill={theme.trim} />
            <rect x={bowBaseX - Math.floor(pull * 0.3)} y={21 + bobY} width="2" height="4" fill="#92400e" />
            <rect x={bowTopX} y={25 + bobY} width="2" height="3" fill={theme.trim} />

            {/* Nocked Charged Energy Arrow */}
            {showNockedArrow && (
              <>
                {/* Fletching */}
                <rect x={stringMidX - 1} y={16 + bobY} width="3" height="1" fill={theme.cape} />
                <rect x={stringMidX - 1} y={19 + bobY} width="3" height="1" fill={theme.cape} />
                {/* Shaft */}
                <rect x={stringMidX} y={17 + bobY} width={32 - stringMidX} height="2" fill="#fde047" />
                {/* Glowing Charged Arrowhead */}
                <rect x="32" y={16 + bobY} width="3" height="4" fill={theme.energy} />
                <rect x="35" y={17 + bobY} width="2" height="2" fill="#ffffff" />
                {pull >= 4 && (
                  <>
                    <rect x="33" y={14 + bobY} width="2" height="1" fill="#fef08a" />
                    <rect x="33" y={21 + bobY} width="2" height="1" fill="#fef08a" />
                  </>
                )}
              </>
            )}

            {/* Drawing Right Arm & Hand (reaches quiver -> pulls string -> recoils on release) */}
            {reachingQuiver ? (
              <rect x={14 + leanX} y={13 + bobY} width="4" height="5" fill={theme.armor} />
            ) : (
              <rect
                x={isShoot ? 13 : stringMidX - 1}
                y={17 + bobY}
                width="4"
                height="3"
                fill="#f5cba7"
                stroke="#090d16"
                strokeWidth="0.6"
              />
            )}
          </>
        ) : (
          /* Idle / Running Carried Recurve Bow */
          <>
            <rect x={21 + leanX} y={18 + bobY} width="4" height="3" fill={theme.armor} />
            <rect x={bowBaseX} y={12 + bobY} width="2" height="3" fill={theme.trim} />
            <rect x={bowBaseX + 2} y={15 + bobY} width="2" height="8" fill="#92400e" />
            <rect x={bowBaseX} y={23 + bobY} width="2" height="3" fill={theme.trim} />
            <rect x={bowBaseX} y={14 + bobY} width="1" height="10" fill="#e2e8f0" opacity="0.7" />
          </>
        )}
      </svg>
    </div>
  );
}

export default function AnimatedArcher({
  archerType = 'gandalf', // 'gandalf' | 'hero' | 'custom'
  archerColor = 'red',
  isWalking = false,
  isDrawing = false,
  isShooting = false,
  flipX = false
}) {
  useEffect(() => {
    preloadArcherSheets();
  }, []);

  const state = isDrawing ? 'draw' : isShooting ? 'shoot' : isWalking ? 'walk' : 'idle';

  return (
    <div className="relative flex flex-col items-center justify-end pointer-events-none select-none">
      {/* Crisp Ground Shadow under Boots */}
      <motion.div
        animate={isWalking ? { scaleX: [0.85, 1.15, 0.85] } : { scaleX: 1 }}
        transition={{ duration: 0.32, repeat: Infinity }}
        className="absolute bottom-0.5 w-11 h-3 bg-black/45 rounded-full blur-[1px]"
      />

      {archerType === 'gandalf' && (
        <GandalfSpriteArcher colorId={archerColor} state={state} flipX={flipX} />
      )}
      {archerType === 'hero' && (
        <HeroRangerSpriteArcher colorId={archerColor} state={state} flipX={flipX} />
      )}
      {archerType === 'custom' && (
        <CustomArcaneArcher colorId={archerColor} state={state} flipX={flipX} />
      )}
    </div>
  );
}
