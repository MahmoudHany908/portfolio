import { useCallback, useRef } from 'react';

export default function useGameAudio() {
  const audioCtx = useRef(null);
  
  const playTone = useCallback((freq, type, duration, vol = 0.1) => {
    // Only init audio context on user interaction
    if (!audioCtx.current) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      audioCtx.current = new AudioContext();
    }
    const ctx = audioCtx.current;
    if (ctx.state === 'suspended') ctx.resume();

    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    
    gainNode.gain.setValueAtTime(vol, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);
    
    osc.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    osc.start();
    osc.stop(ctx.currentTime + duration);
  }, []);

  const playHover = useCallback(() => playTone(440, 'square', 0.1, 0.02), [playTone]);
  const playSelect = useCallback(() => playTone(880, 'square', 0.15, 0.05), [playTone]);
  const playSpawn = useCallback(() => {
    playTone(200, 'sawtooth', 0.1, 0.05);
    setTimeout(() => playTone(400, 'square', 0.1, 0.05), 100);
    setTimeout(() => playTone(800, 'square', 0.2, 0.05), 200);
  }, [playTone]);

  const playShoot = useCallback(() => {
    playTone(600, 'triangle', 0.1, 0.05); // Twang
  }, [playTone]);

  const playHit = useCallback(() => {
    playTone(150, 'square', 0.1, 0.08); // Impact pop
  }, [playTone]);

  const playUnlock = useCallback(() => {
    playTone(523.25, 'square', 0.1, 0.05); // C5
    setTimeout(() => playTone(659.25, 'square', 0.1, 0.05), 100); // E5
    setTimeout(() => playTone(783.99, 'square', 0.4, 0.05), 200); // G5
  }, [playTone]);

  const playVictory = useCallback(() => {
    playTone(523.25, 'square', 0.1, 0.05); // C5
    setTimeout(() => playTone(659.25, 'square', 0.1, 0.05), 150); // E5
    setTimeout(() => playTone(783.99, 'square', 0.1, 0.05), 300); // G5
    setTimeout(() => playTone(1046.50, 'square', 0.6, 0.05), 450); // C6
  }, [playTone]);

  return { playHover,    playSelect,
    playSpawn,
    playShoot,
    playHit,
    playUnlock,
    playVictory
  };
}
