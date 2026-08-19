import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MousePointer2, Pointer } from 'lucide-react';

export default function TutorialOverlay() {
  const [isVisible, setIsVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsVisible(false)}
          className="fixed inset-0 z-[9999] bg-black/85 flex flex-col items-center justify-center p-8 cursor-pointer pointer-events-auto"
        >
          <div className="flex flex-col items-center text-center">
            {/* Animated Icon */}
            <motion.div
              animate={
                isMobile 
                  ? { y: [0, -20, 0], scale: [1, 0.9, 1] } // Tap motion for mobile
                  : { x: [0, 20, 0], y: [0, 20, 0] } // Diagonal cursor movement for PC
              }
              transition={{ 
                duration: 1.5, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="mb-8 text-retro-yellow"
            >
              {isMobile ? <Pointer size={100} className="-rotate-12" /> : <MousePointer2 size={100} />}
            </motion.div>

            <h1 className="font-pixel text-2xl md:text-5xl text-retro-yellow mb-8 leading-loose tracking-widest drop-shadow-[4px_4px_0_rgba(217,87,99,1)]">
              HOW TO PLAY
            </h1>
            
            <p className="font-pixel text-sm md:text-xl text-white mb-16 max-w-lg leading-relaxed tracking-wider">
              {isMobile 
                ? "Swipe up & down to look around. Tap the next checkpoint to move forward!" 
                : "Click the next checkpoint to explore my portfolio!"}
            </p>

            <p className="font-pixel text-xs md:text-lg text-slate-400 animate-[pulse_2s_ease-in-out_infinite] tracking-widest border-2 border-slate-400/30 px-6 py-4 pixel-border">
              {isMobile ? "[ TAP ANYWHERE TO START ]" : "[ CLICK ANYWHERE TO START ]"}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
