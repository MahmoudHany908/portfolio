import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star } from 'lucide-react';
import MapCanvas from '../components/Overworld/MapCanvas';
import ModalOverlay from '../components/UI/ModalOverlay';
import GameHUD from '../components/UI/GameHUD';
import portfolioData from '../data/portfolioData.json';
import useGameAudio from '../hooks/useGameAudio';

export default function Overworld() {
  const [activeNode, setActiveNode] = useState(null);
  const [discovered, setDiscovered] = useState(new Set());
  const [toastMessage, setToastMessage] = useState(null);
  const [showVictory, setShowVictory] = useState(false);
  const [muted, setMuted] = useState(false);
  const { playSpawn, playUnlock, playVictory } = useGameAudio();

  // Player State
  const [playerPos, setPlayerPos] = useState({ x: -80, y: 675 }); // Start far left of the 'about' node
  const [isWalking, setIsWalking] = useState(false);
  const [walkDuration, setWalkDuration] = useState(0);
  const [flipX, setFlipX] = useState(false);

  const handleNodeSelect = (node) => {
    if (activeNode || isWalking) return; // Prevent clicking while walking or in modal

    const dist = Math.hypot(node.x - playerPos.x, node.y - playerPos.y);
    const duration = Math.max(0.6, dist / 400); // Calculate seconds based on distance

    setFlipX(node.x < playerPos.x);
    setIsWalking(true);
    setWalkDuration(duration);
    setPlayerPos({ x: node.x, y: node.y });

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
    </div>
  );
}
