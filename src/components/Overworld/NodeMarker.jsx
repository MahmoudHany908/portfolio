import React, { useState } from 'react';
import { motion } from 'framer-motion';
import useGameAudio from '../../hooks/useGameAudio';
import { MapPin, Flame, Zap, Shield, Compass, Glasses, Laptop, Smartphone, PhoneCall } from 'lucide-react';

const iconMap = {
  house: MapPin, 
  campfire: Flame,
  crystal: Zap,
  dungeon: Shield,
  portal: Compass,
  vr: Glasses,
  pc: Laptop,
  mobile: Smartphone,
  telephone: PhoneCall
};

export default function NodeMarker({ node, onSelect, isCompleted }) {
  const [isHovered, setIsHovered] = useState(false);
  const { playHover, playSelect } = useGameAudio();

  const Icon = iconMap[node.icon] || MapPin;

  const handlePointerEnter = () => {
    setIsHovered(true);
    playHover();
  };

  const handlePointerLeave = () => {
    setIsHovered(false);
  };

  const handleClick = (e) => {
    e.stopPropagation();
    playSelect();
    onSelect();
  };

  const completedBgClass = {
    about: 'bg-retro-red',
    skills: 'bg-retro-yellow',
    project: 'bg-retro-light-blue',
    contact: 'bg-retro-light-green'
  }[node.type] || 'bg-retro-blue';

  const completedTextColor = {
    about: 'text-retro-red',
    skills: 'text-retro-yellow',
    project: 'text-retro-light-blue',
    contact: 'text-retro-light-green'
  }[node.type] || 'text-retro-blue';

  const glowShadowColor = {
    about: 'rgba(217,87,99,0.8)',
    skills: 'rgba(244,180,27,0.8)',
    project: 'rgba(86,156,235,0.8)',
    contact: 'rgba(131,235,114,0.8)'
  }[node.type] || 'rgba(255,255,255,0.4)';

  return (
    <div 
      className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10"
      style={{ left: node.x, top: node.y }}
    >
      <motion.div
        className="relative flex flex-col items-center justify-center cursor-pointer group"
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        onClick={handleClick}
        whileHover={{ scale: 1.15, y: -10 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Gamified node shape */}
        <motion.div 
          animate={isCompleted ? { y: [0, -8, 0] } : { y: 0 }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className={`p-4 transition-all duration-500 flex items-center justify-center
            ${isCompleted 
              ? `rounded-full pixel-border ${completedBgClass} text-white` 
              : `rounded-sm border-4 border-dashed border-retro-gray bg-retro-dark text-retro-gray opacity-80`}
            ${isHovered && !isCompleted ? `border-solid ${completedTextColor} border-current opacity-100 scale-110` : ''}
          `}
          style={isCompleted ? { boxShadow: `0 0 20px ${glowShadowColor}` } : {}}
        >
          <Icon size={isCompleted ? 32 : 24} className={isCompleted ? "drop-shadow-lg" : ""} />
        </motion.div>
        
        {/* Permanent Label that highlights on hover */}
        <div className={`absolute top-[130%] whitespace-nowrap font-pixel text-[10px] px-3 py-2 border-2 transition-all pointer-events-none ${
          isHovered 
            ? `text-retro-dark ${completedBgClass} border-current scale-110` 
            : isCompleted 
              ? 'text-white bg-retro-dark border-retro-gray'
              : 'text-retro-gray bg-retro-dark border-retro-gray'
        }`}>
          {node.title}
        </div>
      </motion.div>
    </div>
  );
}
