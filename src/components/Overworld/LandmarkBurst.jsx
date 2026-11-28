import React from 'react';
import { motion } from 'framer-motion';

// Precomputed lightweight radial trajectories for crisp pixel particles & sparkles
const PARTICLES = [
  { angle: -90, dist: 58, size: 7, color: '#f4b41b', type: 'sparkle', delay: 0 },
  { angle: -50, dist: 66, size: 6, color: '#ffffff', type: 'pixel', delay: 0.02 },
  { angle: -15, dist: 54, size: 8, color: '#83eb72', type: 'sparkle', delay: 0.04 },
  { angle: 25, dist: 60, size: 6, color: '#f4b41b', type: 'pixel', delay: 0.01 },
  { angle: 65, dist: 52, size: 5, color: '#569ceb', type: 'pixel', delay: 0.03 },
  { angle: 115, dist: 54, size: 6, color: '#f4b41b', type: 'pixel', delay: 0.02 },
  { angle: 155, dist: 62, size: 8, color: '#ffffff', type: 'sparkle', delay: 0.04 },
  { angle: -155, dist: 58, size: 6, color: '#83eb72', type: 'pixel', delay: 0.01 },
  { angle: -125, dist: 68, size: 7, color: '#f4b41b', type: 'sparkle', delay: 0.03 },
  { angle: -70, dist: 46, size: 5, color: '#d95763', type: 'pixel', delay: 0.05 },
  { angle: 10, dist: 44, size: 5, color: '#f4b41b', type: 'pixel', delay: 0.04 },
  { angle: -170, dist: 48, size: 5, color: '#569ceb', type: 'pixel', delay: 0.02 }
];

export default function LandmarkBurst({ color = '#f4b41b', variant = 'click' }) {
  const isDiscovery = variant === 'discover';
  const ringColor = isDiscovery ? '#f4b41b' : color;

  return (
    <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-50">
      {/* Expanding outer glow pulse */}
      <motion.div
        initial={{ scale: 0.35, opacity: 0.9 }}
        animate={{ scale: isDiscovery ? 2.35 : 1.85, opacity: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="absolute w-20 h-20 rounded-full"
        style={{
          border: `3px solid ${ringColor}`,
          boxShadow: `0 0 22px ${ringColor}, inset 0 0 12px ${ringColor}`
        }}
      />

      {/* Secondary crisp inner flash */}
      <motion.div
        initial={{ scale: 0.2, opacity: 0.85 }}
        animate={{ scale: 1.35, opacity: 0 }}
        transition={{ duration: 0.32, ease: 'easeOut' }}
        className="absolute w-14 h-14 rounded-full"
        style={{
          background: `radial-gradient(circle, #ffffff 0%, ${ringColor} 55%, transparent 75%)`
        }}
      />

      {/* Pixel particles & 4-point sparkles popping off the landmark */}
      {PARTICLES.map((p, idx) => {
        const rad = (p.angle * Math.PI) / 180;
        const mult = isDiscovery ? 1.25 : 0.9;
        const tx = Math.cos(rad) * p.dist * mult;
        const ty = Math.sin(rad) * p.dist * mult - 10;

        return (
          <motion.div
            key={idx}
            initial={{ x: 0, y: 0, scale: 0.4, opacity: 1, rotate: 0 }}
            animate={{
              x: tx,
              y: ty,
              scale: [0.6, 1.25, 0],
              opacity: [1, 1, 0],
              rotate: p.type === 'sparkle' ? 90 : 45
            }}
            transition={{
              duration: isDiscovery ? 0.62 : 0.48,
              delay: p.delay,
              ease: [0.16, 1, 0.3, 1]
            }}
            className="absolute"
          >
            {p.type === 'sparkle' ? (
              <svg width={p.size * 2} height={p.size * 2} viewBox="0 0 12 12" style={{ shapeRendering: 'crispEdges' }}>
                <rect x="5" y="0" width="2" height="12" fill={p.color} />
                <rect x="0" y="5" width="12" height="2" fill={p.color} />
                <rect x="4" y="4" width="4" height="4" fill="#ffffff" />
              </svg>
            ) : (
              <div
                style={{
                  width: p.size,
                  height: p.size,
                  backgroundColor: p.color,
                  boxShadow: `0 0 6px ${p.color}`,
                  imageRendering: 'pixelated'
                }}
              />
            )}
          </motion.div>
        );
      })}
    </div>
  );
}
