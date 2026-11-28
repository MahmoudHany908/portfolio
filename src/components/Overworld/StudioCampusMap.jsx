import React, { useState, useEffect, useRef } from 'react';
import {
  PORTFOLIO_CAMP_HUBS,
  FLOOR_BOUNDS,
  INTERACT_RADIUS,
  getStationPos,
  getSpawnPos
} from './GamePixelIcons';
import { HubMarker } from './CampHubMarker';
import { CyberDevHero } from './PixelHeroes';

/**
 * Minimal, Breathable Single-Screen Open-Floor Map with True 60fps Free WASD / Arrow Walking,
 * Click-to-Walk Anywhere, Proximity Highlighting, and Direct Step-by-Step Guidance (01 -> 06).
 */
export default function StudioCampusMap({
  onOpenHub,
  discovered,
  unlocked,
  isModalOpen,
  isMobileLayout,
  burstMap = {},
  resetSignal = 0
}) {
  const containerRef = useRef(null);
  const heroDomRef = useRef(null);
  const [scale, setScale] = useState(1);

  const bounds = isMobileLayout ? FLOOR_BOUNDS.mobile : FLOOR_BOUNDS.desktop;
  const CANVAS_WIDTH = bounds.width;
  const CANVAS_HEIGHT = bounds.height;

  // Mutable 60fps physics state (updates DOM transform directly so we don't re-render React 60x/sec!)
  const posRef = useRef(getSpawnPos(isMobileLayout));
  const keysRef = useRef(new Set());
  const autoTargetRef = useRef(null); // { x, y, openHubOnArrive }
  const nearbyIdRef = useRef('hub_about');

  // Lightweight React states that ONLY change on state transitions (idle<->walking, left<->right, nearby change)
  const [isWalking, setIsWalking] = useState(false);
  const [flipX, setFlipX] = useState(false);
  const [nearbyHubId, setNearbyHubId] = useState('hub_about');
  const [hasMovedOnce, setHasMovedOnce] = useState(false);

  const isWalkingStateRef = useRef(false);
  const flipXStateRef = useRef(false);
  const isModalOpenRef = useRef(isModalOpen);
  const onOpenHubRef = useRef(onOpenHub);

  useEffect(() => {
    isModalOpenRef.current = isModalOpen;
    if (isModalOpen) {
      keysRef.current.clear();
      autoTargetRef.current = null;
      if (isWalkingStateRef.current) {
        isWalkingStateRef.current = false;
        setIsWalking(false);
      }
    }
  }, [isModalOpen]);

  useEffect(() => {
    onOpenHubRef.current = onOpenHub;
  }, [onOpenHub]);

  // Reset position when switching Desktop <-> Mobile or pressing Reset
  useEffect(() => {
    const spawn = getSpawnPos(isMobileLayout);
    posRef.current = { ...spawn };
    autoTargetRef.current = null;
    if (heroDomRef.current) {
      heroDomRef.current.style.transform = `translate3d(${spawn.x}px, ${spawn.y}px, 0) translate(-50%, -55%)`;
    }
    nearbyIdRef.current = 'hub_about';
    setNearbyHubId('hub_about');
    setFlipX(false);
    flipXStateRef.current = false;
  }, [isMobileLayout, resetSignal]);

  // Responsive canvas scaling
  useEffect(() => {
    const update = () => {
      if (!containerRef.current) return;
      const r = containerRef.current.getBoundingClientRect();
      if (isMobileLayout) setScale(r.width / CANVAS_WIDTH);
      else setScale(Math.min(r.width / CANVAS_WIDTH, r.height / CANVAS_HEIGHT) * 0.97);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, [CANVAS_WIDTH, CANVAS_HEIGHT, isMobileLayout]);

  // Keyboard Listeners: Hold WASD / Arrow Keys for smooth 60fps walking; press Enter / E / Space to interact!
  useEffect(() => {
    const moveKeys = new Set(['w', 'a', 's', 'd', 'arrowup', 'arrowdown', 'arrowleft', 'arrowright']);

    const onKeyDown = (e) => {
      if (isModalOpenRef.current) return;
      const k = e.key.toLowerCase();

      if (moveKeys.has(k)) {
        e.preventDefault();
        keysRef.current.add(k);
        autoTargetRef.current = null; // Manual keyboard control immediately overrides click-walk
        setHasMovedOnce(true);
        return;
      }

      if (k === 'enter' || k === 'e' || k === ' ') {
        const activeHub = PORTFOLIO_CAMP_HUBS.find((h) => h.id === nearbyIdRef.current);
        if (activeHub) {
          e.preventDefault();
          onOpenHubRef.current(activeHub);
        }
      }
    };

    const onKeyUp = (e) => {
      keysRef.current.delete(e.key.toLowerCase());
    };

    const onBlur = () => {
      keysRef.current.clear();
    };

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    window.addEventListener('blur', onBlur);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
      window.removeEventListener('blur', onBlur);
    };
  }, []);

  // True 60fps Game Loop (WASD + Click-to-Walk + Proximity Detection + Mobile Smooth Camera)
  useEffect(() => {
    let rafId;
    let lastTime = performance.now();
    const SPEED = 470; // px per second

    const tick = (now) => {
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;

      let vx = 0;
      let vy = 0;

      if (!isModalOpenRef.current) {
        const keys = keysRef.current;
        if (keys.has('a') || keys.has('arrowleft')) vx -= 1;
        if (keys.has('d') || keys.has('arrowright')) vx += 1;
        if (keys.has('w') || keys.has('arrowup')) vy -= 1;
        if (keys.has('s') || keys.has('arrowdown')) vy += 1;

        if (vx !== 0 || vy !== 0) {
          const len = Math.hypot(vx, vy);
          vx = (vx / len) * SPEED;
          vy = (vy / len) * SPEED;
        } else if (autoTargetRef.current) {
          const target = autoTargetRef.current;
          const dx = target.x - posRef.current.x;
          const dy = target.y - posRef.current.y;
          const dist = Math.hypot(dx, dy);

          if (dist <= 12) {
            posRef.current.x = target.x;
            posRef.current.y = target.y;
            const hubToOpen = target.openHubOnArrive;
            autoTargetRef.current = null;
            if (hubToOpen) {
              onOpenHubRef.current(hubToOpen);
            }
          } else {
            vx = (dx / dist) * (SPEED * 1.15);
            vy = (dy / dist) * (SPEED * 1.15);
          }
        }
      }

      const moving = vx !== 0 || vy !== 0;
      if (moving) {
        posRef.current.x = Math.max(bounds.minX, Math.min(bounds.maxX, posRef.current.x + vx * dt));
        posRef.current.y = Math.max(bounds.minY, Math.min(bounds.maxY, posRef.current.y + vy * dt));

        if (heroDomRef.current) {
          heroDomRef.current.style.transform = `translate3d(${posRef.current.x}px, ${posRef.current.y}px, 0) translate(-50%, -55%)`;
        }

        if (Math.abs(vx) > 5) {
          const nextFlip = vx < 0;
          if (nextFlip !== flipXStateRef.current) {
            flipXStateRef.current = nextFlip;
            setFlipX(nextFlip);
          }
        }

        // Smooth camera follow on mobile vertical floor
        if (isMobileLayout && containerRef.current) {
          const c = containerRef.current;
          const heroScreenY = posRef.current.y * scale;
          const targetScroll = heroScreenY - c.clientHeight * 0.45;
          c.scrollTop += (targetScroll - c.scrollTop) * 0.12;
        }
      }

      if (moving !== isWalkingStateRef.current) {
        isWalkingStateRef.current = moving;
        setIsWalking(moving);
      }

      // Check nearest station within INTERACT_RADIUS
      let closestId = null;
      let closestDist = INTERACT_RADIUS;
      for (const hub of PORTFOLIO_CAMP_HUBS) {
        const sp = getStationPos(hub, isMobileLayout);
        const d = Math.hypot(sp.x - posRef.current.x, sp.y - posRef.current.y);
        if (d <= closestDist) {
          closestDist = d;
          closestId = hub.id;
        }
      }

      if (closestId !== nearbyIdRef.current) {
        nearbyIdRef.current = closestId;
        setNearbyHubId(closestId);
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [bounds, isMobileLayout, scale]);

  // Click a station -> if already right next to it, open immediately; otherwise walk smoothly to it & open!
  const handleStationClick = (hub) => {
    const sp = getStationPos(hub, isMobileLayout);
    const standOffset = isMobileLayout ? { x: sp.x - 115, y: sp.y + 10 } : { x: sp.x - 115, y: sp.y + 15 };
    const dist = Math.hypot(sp.x - posRef.current.x, sp.y - posRef.current.y);

    setHasMovedOnce(true);
    if (dist <= INTERACT_RADIUS) {
      onOpenHub(hub);
    } else {
      autoTargetRef.current = {
        x: Math.max(bounds.minX, standOffset.x),
        y: Math.min(bounds.maxY, standOffset.y),
        openHubOnArrive: hub
      };
    }
  };

  // Click anywhere on the open floor to walk there!
  const handleFloorClick = (e) => {
    if (isModalOpen) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = (e.clientX - rect.left) / scale;
    const clickY = (e.clientY - rect.top) / scale;
    setHasMovedOnce(true);
    autoTargetRef.current = {
      x: Math.max(bounds.minX, Math.min(bounds.maxX, clickX)),
      y: Math.max(bounds.minY, Math.min(bounds.maxY, clickY)),
      openHubOnArrive: null
    };
  };

  const isHubCleared = (idx) =>
    PORTFOLIO_CAMP_HUBS[idx].children.every((n) => discovered.has(n.id));

  const nextPendingHubId = PORTFOLIO_CAMP_HUBS.find((h) =>
    h.children.some((n) => !discovered.has(n.id))
  )?.id;

  // Clean sequential guide lines (01 -> 02 -> 03 -> 04 -> 05 -> 06)
  const guideSegments = [];
  for (let i = 1; i < PORTFOLIO_CAMP_HUBS.length; i++) {
    const a = getStationPos(PORTFOLIO_CAMP_HUBS[i - 1], isMobileLayout);
    const b = getStationPos(PORTFOLIO_CAMP_HUBS[i], isMobileLayout);
    const lit = isHubCleared(i - 1) && isHubCleared(i);

    let d;
    if (isMobileLayout || a.y === b.y) {
      d = `M ${a.x} ${a.y} L ${b.x} ${b.y}`;
    } else {
      // Smooth clean step between Row 1 (03 at right) and Row 2 (04 at left) along the middle lane (y = 460)
      const midY = 460;
      d = `M ${a.x} ${a.y + 70} L ${a.x} ${midY} L ${b.x} ${midY} L ${b.x} ${b.y - 70}`;
    }
    guideSegments.push({ id: `seg-${i}`, d, lit });
  }

  const initialSpawn = getSpawnPos(isMobileLayout);

  const content = (
    <div
      onClick={handleFloorClick}
      className="relative select-none overflow-hidden cursor-crosshair"
      style={{
        width: CANVAS_WIDTH,
        height: CANVAS_HEIGHT,
        backgroundColor: '#0d1322',
        backgroundImage:
          'radial-gradient(rgba(56,189,248,0.12) 1.5px, transparent 1.5px), linear-gradient(90deg, rgba(30,41,59,0.45) 1px, transparent 1px), linear-gradient(rgba(30,41,59,0.45) 1px, transparent 1px)',
        backgroundSize: '40px 40px, 80px 80px, 80px 80px',
        border: '4px solid #1e293b',
        boxShadow: '0 20px 60px rgba(0,0,0,0.85)',
        imageRendering: 'pixelated'
      }}
    >
      {/* Subtle Sequential Guide Trail (01 -> 02 -> 03 -> 04 -> 05 -> 06) */}
      <svg
        viewBox={`0 0 ${CANVAS_WIDTH} ${CANVAS_HEIGHT}`}
        className="absolute inset-0 w-full h-full pointer-events-none z-[2]"
        style={{ shapeRendering: 'crispEdges' }}
      >
        {guideSegments.map((seg) => (
          <path
            key={seg.id}
            d={seg.d}
            fill="none"
            stroke={seg.lit ? '#facc15' : '#334155'}
            strokeWidth={seg.lit ? '5' : '3'}
            strokeDasharray="12 12"
            opacity={seg.lit ? 0.9 : 0.65}
          />
        ))}
      </svg>

      {/* 6 Clean, Spacious Checkpoints */}
      {PORTFOLIO_CAMP_HUBS.map((hub) => {
        const sp = getStationPos(hub, isMobileLayout);
        return (
          <HubMarker
            key={hub.id}
            hub={hub}
            x={sp.x}
            y={sp.y}
            discovered={discovered}
            unlocked={unlocked}
            burstMap={burstMap}
            isNearby={nearbyHubId === hub.id}
            isNext={nextPendingHubId === hub.id}
            isMobileLayout={isMobileLayout}
            onActivate={handleStationClick}
          />
        );
      })}

      {/* 60fps Hardware-Accelerated Hero Container */}
      <div
        ref={heroDomRef}
        className="absolute top-0 left-0 z-30 pointer-events-none will-change-transform"
        style={{
          transform: `translate3d(${initialSpawn.x}px, ${initialSpawn.y}px, 0) translate(-50%, -55%)`
        }}
      >
        <CyberDevHero isWalking={isWalking} flipX={flipX} speechText={null} />
      </div>

      {/* Single Clean Controls Bar at Bottom of Floor */}
      <div
        className={`absolute bottom-4 left-1/2 -translate-x-1/2 z-20 px-4 py-2 bg-[#090d18]/92 border-2 border-slate-600 font-chakra text-xs md:text-sm text-slate-200 whitespace-nowrap pointer-events-none transition-opacity duration-500 ${
          hasMovedOnce ? 'opacity-65' : 'opacity-100'
        }`}
      >
        {isMobileLayout ? (
          <span>Tap any station (01–06) to walk &amp; open</span>
        ) : (
          <span>
            <strong className="text-[#facc15]">WASD / Arrows</strong> to walk freely &nbsp;·&nbsp;{' '}
            <strong className="text-[#38bdf8]">Enter / E</strong> at a station &nbsp;·&nbsp; or{' '}
            <strong className="text-white">Click any station</strong>
          </span>
        )}
      </div>
    </div>
  );

  if (isMobileLayout) {
    return (
      <div
        ref={containerRef}
        className="w-full h-full overflow-y-auto overflow-x-hidden relative bg-[#090d18]"
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        <div className="relative mx-auto" style={{ width: CANVAS_WIDTH * scale, height: CANVAS_HEIGHT * scale }}>
          <div className="absolute top-0 left-0 origin-top-left" style={{ transform: `scale(${scale})` }}>
            {content}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="w-full h-full overflow-hidden flex items-center justify-center bg-[#080b14]">
      <div style={{ transform: `scale(${scale})`, transformOrigin: 'center center' }}>{content}</div>
    </div>
  );
}
