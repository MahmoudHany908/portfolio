import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { GAME_SPRITES } from './GamePixelIcons';
import { shortProjectLabel } from './RadialCategoryHub';

/**
 * Mobile Category Hub Stage-Select Bottom Tray (Clients · VR · 2D)
 */
export function MobileStageTray({ category, hubCoords, discovered, onSelectProject, onClose }) {
  return (
    <AnimatePresence>
      {category && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/45 z-[60] pointer-events-auto"
          />
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 340, damping: 28 }}
            className="fixed bottom-0 left-0 right-0 z-[65] bg-[#121626] border-t-4 border-white p-4 pb-6 shadow-[0_-12px_40px_rgba(0,0,0,0.9)] pointer-events-auto"
            style={{ paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 20px)' }}
          >
            <div className="w-12 h-1.5 bg-slate-500 mx-auto mb-3 rounded-full" />
            <div className="flex items-center justify-between mb-3 pb-2.5 border-b-2 border-slate-700">
              <div className="flex items-center gap-3">
                <img
                  src={category.sprite}
                  alt=""
                  className="w-9 h-9"
                  style={{ imageRendering: 'pixelated' }}
                />
                <div>
                  <div
                    className="font-pixel text-sm leading-tight"
                    style={{ color: category.color }}
                  >
                    {category.title}
                  </div>
                  <div className="font-chakra text-xs text-slate-400 font-bold">
                    Tap a project to shoot & inspect
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="p-2 border-2 border-slate-600 text-slate-300 hover:text-white cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <div className="flex flex-col gap-2.5 max-h-[48dvh] overflow-y-auto">
              {category.projects.map((proj) => {
                const isDone = discovered.has(proj.id);
                return (
                  <button
                    key={proj.id}
                    type="button"
                    onClick={() => {
                      onClose();
                      onSelectProject(
                        proj,
                        {
                          x: hubCoords.x,
                          y: hubCoords.y,
                          hubX: hubCoords.x,
                          hubY: hubCoords.y
                        },
                        category.id
                      );
                    }}
                    className={`w-full p-3 border-[3px] flex items-center justify-between gap-3 text-left transition-transform active:scale-[0.98] cursor-pointer ${
                      isDone
                        ? 'bg-[#231d0c] border-[#f4b41b] shadow-[4px_4px_0_#000]'
                        : 'bg-[#1a2036] border-slate-500 hover:border-white shadow-[4px_4px_0_#000]'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-12 h-12 shrink-0 bg-[#0b0e17] border-2 border-black p-1.5 flex items-center justify-center">
                        <img
                          src={GAME_SPRITES[proj.id]}
                          alt=""
                          className="w-full h-full"
                          style={{ imageRendering: 'pixelated' }}
                        />
                      </div>
                      <div className="min-w-0">
                        <div className="font-pixel text-xs text-white leading-snug truncate">
                          {isDone ? '★ ' : ''}
                          {shortProjectLabel(proj.id, proj.title)}
                        </div>
                        <div className="font-chakra text-xs text-slate-300 font-bold truncate mt-0.5">
                          {proj.date || proj.role}
                        </div>
                      </div>
                    </div>

                    <span
                      className={`shrink-0 px-2.5 py-1.5 font-pixel text-[9px] border-2 border-black ${
                        isDone ? 'bg-[#f4b41b] text-black' : 'bg-retro-red text-white'
                      }`}
                    >
                      {isDone ? 'VIEW' : 'SHOOT ▶'}
                    </span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
