import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { KeyboardControls, Environment, ContactShadows } from '@react-three/drei';
import Player from './3D/Player';
import Exhibit from './3D/Exhibit';
import Joystick from './UI/Joystick';
import portfolioData from '../portfolioData.json';

const keyboardMap = [
  { name: 'forward', keys: ['ArrowUp', 'w', 'W'] },
  { name: 'backward', keys: ['ArrowDown', 's', 'S'] },
  { name: 'left', keys: ['ArrowLeft', 'a', 'A'] },
  { name: 'right', keys: ['ArrowRight', 'd', 'D'] },
];

export default function ExploreHub() {
  const [joystickVector, setJoystickVector] = useState({ x: 0, y: 0 });
  const [isLocked, setIsLocked] = useState(false);
  const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  useEffect(() => {
    const handleLockChange = () => {
      setIsLocked(document.pointerLockElement !== null);
    };
    document.addEventListener('pointerlockchange', handleLockChange);
    return () => document.removeEventListener('pointerlockchange', handleLockChange);
  }, []);

  return (
    <div className="w-full h-full bg-[#050505] relative">
      <Joystick 
        onMove={(v) => setJoystickVector(v)} 
        onEnd={() => setJoystickVector({ x: 0, y: 0 })} 
      />
      
      {/* Click to Play Overlay */}
      {!isLocked && !isTouch && (
        <div 
          id="play-button"
          className="absolute inset-0 z-40 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center text-white cursor-pointer transition-opacity duration-300"
          onClick={() => {
            const canvas = document.querySelector('canvas');
            if (canvas) canvas.requestPointerLock();
          }}
        >
          <h2 className="text-4xl font-bold tracking-widest mb-4">EXPLORE HUB</h2>
          <p className="text-slate-400 mb-8 max-w-md text-center">
            Navigate the 3D gallery to view projects and experience.
          </p>
          <div className="flex items-center gap-6 text-sm text-slate-300 font-mono bg-white/5 px-8 py-4 rounded-xl border border-white/10 shadow-2xl">
            <span className="flex items-center gap-2">
              <kbd className="px-2 py-1 bg-white/10 rounded">W A S D</kbd> Move
            </span>
            <span className="text-white/20">|</span>
            <span className="flex items-center gap-2">
              <span className="px-2 py-1 bg-white/10 rounded">MOUSE</span> Look
            </span>
          </div>
          <p className="mt-8 text-emerald-400 animate-pulse font-semibold">Click anywhere to start</p>
        </div>
      )}

      {/* Crosshair */}
      {(isLocked || isTouch) && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-white/50 rounded-full z-30 pointer-events-none" />
      )}

      <KeyboardControls map={keyboardMap}>
        <Canvas shadows camera={{ position: [0, 1.6, 5], fov: 75 }}>
          <color attach="background" args={['#111']} />
          <fog attach="fog" args={['#111', 10, 50]} />
          
          <ambientLight intensity={1.5} />
          <directionalLight position={[10, 10, 5]} intensity={2} />
          <Environment preset="city" />
          
          <Player joystickVector={joystickVector} isLocked={isLocked} isTouch={isTouch} />

          {/* Floor */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow position={[0, 0, 0]}>
            <planeGeometry args={[100, 100]} />
            <meshStandardMaterial color="#222" roughness={0.8} metalness={0.2} />
          </mesh>

          <ContactShadows position={[0, 0.01, 0]} scale={50} blur={2} opacity={0.4} far={10} />

          {/* Exhibits Layout */}
          <group position={[0, 0, -5]}>
            <pointLight position={[0, 5, 0]} intensity={2} distance={20} color="#34d399" />
            
            {/* Projects Wing */}
            <group position={[-6, 0, 0]} rotation={[0, Math.PI/6, 0]}>
              {portfolioData.projects.map((proj, i) => (
                <Exhibit 
                  key={proj.id} 
                  position={[0, 0, -i * 4.5]} 
                  data={proj} 
                  type="project"
                />
              ))}
            </group>

            {/* Education Wing */}
            <group position={[6, 0, 0]} rotation={[0, -Math.PI/6, 0]}>
              {portfolioData.education.map((edu, i) => (
                <Exhibit 
                  key={edu.id} 
                  position={[0, 0, -i * 4.5]} 
                  data={edu} 
                  type="education"
                />
              ))}
            </group>
          </group>

        </Canvas>
      </KeyboardControls>
    </div>
  );
}
