import React, { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AimOverlay({ aimMode, onFire, scale, cameraOffset, playerPos, isMobileLayout }) {
  const [isDragging, setIsDragging] = useState(false);
  const [aimPos, setAimPos] = useState(null); // screen coords of cursor
  const padRef = useRef(null);
  const padCenter = useRef({ x: 0, y: 0 });

  const getPadCenter = useCallback(() => {
    if (padRef.current) {
      const rect = padRef.current.getBoundingClientRect();
      return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
    }
    return { x: window.innerWidth - 80, y: window.innerHeight - 140 };
  }, []);

  const handlePointerDown = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    padCenter.current = getPadCenter();
    setIsDragging(true);
    setAimPos({ x: e.clientX, y: e.clientY });
  }, [getPadCenter]);

  const handlePointerMove = useCallback((e) => {
    if (!isDragging) return;
    e.preventDefault();
    setAimPos({ x: e.clientX, y: e.clientY });
  }, [isDragging]);

  const handlePointerUp = useCallback((e) => {
    if (!isDragging) return;
    e.preventDefault();
    setIsDragging(false);

    const screenX = e.clientX;
    const screenY = e.clientY;

    // Convert screen coordinates to map canvas coordinates
    // cameraOffset = { left: parsedLeft, top: parsedTop } in px
    // The map canvas is positioned at (cameraOffset.left, cameraOffset.top) and scaled by `scale`
    // So: mapX = (screenX - cameraOffset.left) / scale
    //     mapY = (screenY - cameraOffset.top) / scale
    if (cameraOffset && scale) {
      const mapX = (screenX - cameraOffset.left) / scale;
      const mapY = (screenY - cameraOffset.top) / scale;
      onFire(mapX, mapY);
    }

    setAimPos(null);
  }, [isDragging, cameraOffset, scale, onFire]);

  // Calculate trajectory line points
  const center = padCenter.current;
  const trajectoryPoints = isDragging && aimPos ? (() => {
    const points = [];
    const steps = 20;
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const x = center.x + (aimPos.x - center.x) * t;
      // Add a slight parabolic arc: peaks at t=0.5
      const arcHeight = Math.hypot(aimPos.x - center.x, aimPos.y - center.y) * 0.15;
      const y = center.y + (aimPos.y - center.y) * t - arcHeight * Math.sin(Math.PI * t);
      points.push(`${x},${y}`);
    }
    return points.join(' ');
  })() : '';

  if (!aimMode) return null;

  return (
    <>
      {/* Full-screen invisible drag capture layer — only active while dragging */}
      {isDragging && (
        <div
          className="fixed inset-0 z-[60] cursor-crosshair"
          style={{ touchAction: 'none' }}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={() => { setIsDragging(false); setAimPos(null); }}
        >
          {/* Trajectory Arc Preview */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            <defs>
              <linearGradient id="trajectoryGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#f4b41b" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#d95763" stopOpacity="0.4" />
              </linearGradient>
            </defs>
            {/* Dotted arc line */}
            <polyline
              points={trajectoryPoints}
              fill="none"
              stroke="url(#trajectoryGradient)"
              strokeWidth="4"
              strokeDasharray="12 8"
              strokeLinecap="round"
              className="drop-shadow-[0_0_8px_rgba(244,180,27,0.6)]"
            />
            {/* Crosshair at aim point */}
            {aimPos && (
              <g>
                <circle cx={aimPos.x} cy={aimPos.y} r="20" fill="none" stroke="#f4b41b" strokeWidth="2" opacity="0.6" />
                <circle cx={aimPos.x} cy={aimPos.y} r="4" fill="#f4b41b" opacity="0.8" />
                <line x1={aimPos.x - 30} y1={aimPos.y} x2={aimPos.x + 30} y2={aimPos.y} stroke="#f4b41b" strokeWidth="1" opacity="0.4" />
                <line x1={aimPos.x} y1={aimPos.y - 30} x2={aimPos.x} y2={aimPos.y + 30} stroke="#f4b41b" strokeWidth="1" opacity="0.4" />
              </g>
            )}
          </svg>
        </div>
      )}

      {/* Draw Pad — fixed position button in bottom-right */}
      <motion.div
        ref={padRef}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0, opacity: 0 }}
        className={`fixed z-[55] cursor-grab active:cursor-grabbing select-none ${isMobileLayout ? 'bottom-24 right-4' : 'bottom-28 right-8'}`}
        style={{ touchAction: 'none' }}
        onPointerDown={handlePointerDown}
      >
        <div className={`relative flex items-center justify-center rounded-full border-4 transition-all duration-300 ${isDragging
          ? 'w-24 h-24 border-retro-yellow bg-retro-yellow/30 shadow-[0_0_30px_rgba(244,180,27,0.6)]'
          : 'w-20 h-20 border-white/60 bg-retro-dark/80 hover:border-retro-yellow hover:shadow-[0_0_20px_rgba(244,180,27,0.4)]'
          }`}
        >
          {/* Bow icon */}
          <svg width="40" height="40" viewBox="0 0 40 40" className={`transition-transform ${isDragging ? 'scale-110' : ''}`}>
            <path d="M 24 4 Q 36 20 24 36" stroke="#8b5a2b" strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M 24 4 L 24 36" stroke="#ffffff" strokeWidth="1" fill="none" opacity="0.7" />
            {!isDragging && (
              <>
                <rect x="10" y="19" width="14" height="2" fill="#8b5a2b" />
                <polygon points="24,17 30,20 24,23" fill="#a4a5a1" />
                <rect x="6" y="17" width="4" height="2" fill="#d95763" />
                <rect x="6" y="21" width="4" height="2" fill="#d95763" />
              </>
            )}
            {isDragging && (
              <>
                {/* String pulled back */}
                <path d="M 24 4 L 10 20 L 24 36" stroke="#ffffff" strokeWidth="1" fill="none" opacity="0.9" />
                <circle cx="10" cy="20" r="3" fill="#f4b41b" opacity="0.5" />
              </>
            )}
          </svg>

          {/* Pulsing ring when idle */}
          {!isDragging && (
            <div className="absolute inset-0 rounded-full border-2 border-retro-yellow/40 animate-ping" />
          )}
        </div>

        {/* Label */}
        {!isDragging && (
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 font-pixel text-[10px] text-retro-yellow whitespace-nowrap bg-retro-dark/80 px-2 py-1 border border-retro-yellow/40 tracking-widest">
            DRAG TO AIM
          </div>
        )}
      </motion.div>
    </>
  );
}
