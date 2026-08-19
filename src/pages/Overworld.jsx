import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Smartphone } from 'lucide-react';
import MapCanvas from '../components/Overworld/MapCanvas';
import ModalOverlay from '../components/UI/ModalOverlay';
import GameHUD from '../components/UI/GameHUD';
import SimpleViewToggle from '../components/UI/SimpleViewToggle';
import portfolioData from '../data/portfolioData.json';
import useGameAudio from '../hooks/useGameAudio';

export default function Overworld() {
  const [activeNode, setActiveNode] = useState(null);
  const [discovered, setDiscovered] = useState(new Set());
  const [toastMessage, setToastMessage] = useState(null);
  const [showVictory, setShowVictory] = useState(false);
  const [muted, setMuted] = useState(false);
  const { playSpawn, playUnlock, playVictory } = useGameAudio();

  // Player & Layout State
  const [isMobileLayout, setIsMobileLayout] = useState(() => window.innerWidth < 768);
  const [isLandscapeMobile, setIsLandscapeMobile] = useState(() => window.innerWidth < 768 && window.innerWidth > window.innerHeight);
  
  const [playerPos, setPlayerPos] = useState(() => 
    window.innerWidth < 768 ? { x: 200, y: 300 } : { x: -80, y: 675 }
  );
  
  const [isWalking, setIsWalking] = useState(false);
  const [walkDuration, setWalkDuration] = useState(0);
  const [flipX, setFlipX] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const newIsMobile = window.innerWidth < 768;
      const newIsLandscape = newIsMobile && window.innerWidth > window.innerHeight;
      
      setIsLandscapeMobile(newIsLandscape);

      if (newIsMobile !== isMobileLayout) {
        setIsMobileLayout(newIsMobile);
        // Snap player pos to correct layout
        if (activeNode) {
          setPlayerPos({ x: newIsMobile ? activeNode.pX : activeNode.x, y: newIsMobile ? activeNode.pY : activeNode.y });
        } else if (playerPos.x === -80 || playerPos.x === 200 || playerPos.x === 250) {
          setPlayerPos(newIsMobile ? { x: 200, y: 300 } : { x: -80, y: 675 });
        }
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobileLayout, activeNode, playerPos]);

  const handleNodeSelect = (node) => {
    if (activeNode || isWalking) return; // Prevent clicking while walking or in modal

    const targetX = isMobileLayout ? node.pX : node.x;
    const targetY = isMobileLayout ? node.pY : node.y;

    const dist = Math.hypot(targetX - playerPos.x, targetY - playerPos.y);
    const duration = Math.max(0.6, dist / 400); // Calculate seconds based on distance

    setFlipX(targetX < playerPos.x);
    setIsWalking(true);
    setWalkDuration(duration);
    setPlayerPos({ x: targetX, y: targetY });

    if (!muted) playSpawn();

    setTimeout(() => {
      setIsWalking(false);
      setActiveNode(node);
    }, duration * 1000);
  };

  const handleModalClose = () => {
    const node = activeNode;
    setActiveNode(null);
    
    // Unlock achievement AFTER closing the modal
    if (node && !discovered.has(node.id)) {
      const newDiscovered = new Set(discovered).add(node.id);
      setDiscovered(newDiscovered);
      
      const isNowComplete = newDiscovered.size === portfolioData.nodes.length;
      
      if (isNowComplete) {
        if (!muted) playVictory();
        setShowVictory(true);
        setTimeout(() => setShowVictory(false), 6000);
      } else {
        setToastMessage(`Achievement Unlocked: Discovered ${node.title}`);
        if (!muted) playUnlock();
        setTimeout(() => setToastMessage(null), 3000);
      }
    }
  };

  return (
    <div className="w-full h-full bg-retro-dark relative overflow-hidden">
      <MapCanvas 
        onNodeSelect={handleNodeSelect} 
        discovered={discovered} 
        playerPos={playerPos}
        isWalking={isWalking}
        walkDuration={walkDuration}
        flipX={flipX}
        isMobileLayout={isMobileLayout}
      />
      
      {/* Victory Banner Overlay */}
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
                100% of Checkpoints Discovered!
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
      
      {toastMessage && (
        <div className="absolute bottom-40 left-1/2 -translate-x-1/2 bg-retro-yellow text-retro-dark font-pixel text-xs md:text-sm p-4 md:p-6 pixel-border z-50 animate-bounce shadow-2xl">
          {toastMessage}
        </div>
      )}
      
      <ModalOverlay 
        node={activeNode} 
        onClose={handleModalClose} 
      />

      {/* Mobile Landscape Lock Screen */}
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
