import React, { useEffect, useRef } from 'react';
import nipplejs from 'nipplejs';

export default function Joystick({ onMove, onEnd }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (!isTouch) return;

    const manager = nipplejs.create({
      zone: containerRef.current,
      mode: 'static',
      position: { left: '50%', top: '50%' },
      color: 'white',
      size: 100
    });

    manager.on('move', (e, data) => {
      onMove(data.vector);
    });

    manager.on('end', () => {
      if (onEnd) onEnd();
    });

    return () => manager.destroy();
  }, [onMove, onEnd]);

  return (
    <div 
      className="md:hidden absolute bottom-24 left-24 w-24 h-24 z-40 opacity-50" 
      ref={containerRef} 
    />
  );
}
