import React, { useState, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Monitor,
  Smartphone,
  RotateCcw,
  ArrowLeft,
  Sparkles,
  Crown,
  SlidersHorizontal,
  X
} from 'lucide-react';
import portfolioData from '../data/portfolioData.json';
import {
  PORTFOLIO_CAMP_HUBS,
  GAME_SPRITES,
  HUB_MONUMENT_SPRITES,
  hubOfNode
} from '../components/Overworld/GamePixelIcons';
import { shortGameName } from '../components/Overworld/CampHubMarker';
import { CategoryStageModal, StageClearCelebration } from '../components/Overworld/CategoryStageModal';
import StudioProjectModal from '../components/Overworld/StudioProjectModal';
import StudioHUD from '../components/Overworld/StudioHUD';
import StudioCampusMap from '../components/Overworld/StudioCampusMap';
import useGameAudio from '../hooks/useGameAudio';

export default function Preview() {
  const [viewportMode, setViewportMode] = useState(() =>
    window.innerWidth < 768 ? 'mobile' : 'desktop'
  );
  const [showDevMenu, setShowDevMenu] = useState(false);
  const [muted, setMuted] = useState(false);
  const [resetSignal, setResetSignal] = useState(0);

  const [openCategoryHub, setOpenCategoryHub] = useState(null);
  const [activeNode, setActiveNode] = useState(null);
  const [justClearedId, setJustClearedId] = useState(null);
  const [celebration, setCelebration] = useState(null);
  const [toastBanner, setToastBanner] = useState(null);
  const [burstMap, setBurstMap] = useState({});

  const burstCounter = useRef(0);
  const { playSelect, playUnlock, playVictory } = useGameAudio();

  const allIds = portfolioData.nodes.map((n) => n.id);
  const [discovered, setDiscovered] = useState(() => new Set());
  const [unlocked, setUnlocked] = useState(() => new Set(allIds));

  const isMobile = viewportMode === 'mobile';
  const isModalOpen = Boolean(activeNode || openCategoryHub || celebration);

  const triggerBurst = useCallback((id, variant = 'click') => {
    burstCounter.current += 1;
    const key = burstCounter.current;
    setBurstMap((prev) => ({ ...prev, [id]: { key, variant } }));
    setTimeout(() => {
      setBurstMap((prev) => {
        if (prev[id]?.key !== key) return prev;
        const next = { ...prev };
        delete next[id];
        return next;
      });
    }, 850);
  }, []);

  const flashBanner = useCallback((text) => {
    setToastBanner(text);
    setTimeout(() => {
      setToastBanner((curr) => (curr === text ? null : curr));
    }, 2200);
  }, []);

  const handleOpenHub = useCallback(
    (hub) => {
      if (!unlocked.has(hub.children[0].id)) return;
      if (!muted) playSelect();
      triggerBurst(hub.children[0].id, 'click');
      if (hub.isSingle) {
        setActiveNode(hub.node);
      } else {
        setOpenCategoryHub(hub);
      }
    },
    [muted, playSelect, triggerBurst, unlocked]
  );

  // 2-Tier Completion Rewards:
  // - Single Project in Category (1/3, 2/3): Non-blocking gold burst right on the card!
  // - Full Category (3/3, 2/2, 4/4) or 100% Clear: Full-screen Arcade Trophy Fanfare!
  const markNodeCleared = (node, keepCategoryOpen = true) => {
    if (!node || discovered.has(node.id)) return;

    const next = new Set(discovered).add(node.id);
    setDiscovered(next);
    triggerBurst(node.id, 'discover');

    const parentHub = hubOfNode(node.id);
    const total = parentHub ? parentHub.children.length : 1;
    const done = parentHub ? parentHub.children.filter((c) => next.has(c.id)).length : 1;
    const hubMastered = done === total;
    const studioMastered = next.size === allIds.length;

    if (studioMastered) {
      if (!muted) playVictory();
      setOpenCategoryHub(null);
      setCelebration({
        node,
        sprite: parentHub?.sprite || GAME_SPRITES[node.id],
        title: '100% PORTFOLIO COMPLETED!',
        hubTitle: 'All 6 Checkpoints',
        done: allIds.length,
        total: allIds.length,
        hubMastered: true,
        isFullStudio: true
      });
    } else if (hubMastered && parentHub && !parentHub.isSingle) {
      if (!muted) playVictory();
      setOpenCategoryHub(null);
      setCelebration({
        node,
        sprite: parentHub.sprite,
        title: `${parentHub.title} Completed!`,
        hubTitle: parentHub.title,
        done,
        total,
        hubMastered: true,
        isFullStudio: false
      });
    } else if (parentHub?.isSingle) {
      if (!muted) playUnlock();
      flashBanner(`★ ${parentHub.title.toUpperCase()} COMPLETED!`);
    } else {
      if (!muted) playUnlock();
      if (keepCategoryOpen) {
        setJustClearedId(node.id);
        setTimeout(() => {
          setJustClearedId((curr) => (curr === node.id ? null : curr));
        }, 1700);
      } else {
        flashBanner(`★ ${shortGameName(node).toUpperCase()} CLEARED!`);
      }
    }
  };

  const handleProjectClose = () => {
    const closingNode = activeNode;
    setActiveNode(null);
    if (closingNode) {
      markNodeCleared(closingNode, true);
    }
  };

  const handleNavigateSibling = (targetSibling) => {
    const leavingNode = activeNode;
    if (leavingNode && !discovered.has(leavingNode.id)) {
      markNodeCleared(leavingNode, false);
    }
    setActiveNode(targetSibling);
  };

  const masterAllDemo = () => {
    setUnlocked(new Set(allIds));
    setDiscovered(new Set(allIds));
    if (!muted) playVictory();
    PORTFOLIO_CAMP_HUBS.forEach((h) => triggerBurst(h.children[0].id, 'discover'));
    setCelebration({
      node: portfolioData.nodes.find((n) => n.id === 'proj_gm') || portfolioData.nodes[0],
      sprite: HUB_MONUMENT_SPRITES.hub_sims,
      title: '100% PORTFOLIO COMPLETED!',
      hubTitle: 'All 6 Checkpoints',
      done: allIds.length,
      total: allIds.length,
      hubMastered: true,
      isFullStudio: true
    });
  };

  return (
    <div className="fixed inset-0 w-screen h-[100dvh] bg-[#080b14] text-white flex flex-col overflow-hidden">
      {/* Single Clean Header — zero stacked bars! */}
      <StudioHUD
        discovered={discovered}
        totalNodes={allIds.length}
        muted={muted}
        setMuted={setMuted}
      />

      {/* Non-Blocking Top Toast Banner for Single Checkpoints */}
      <AnimatePresence>
        {toastBanner && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -14 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-[75] px-5 py-2 bg-[#facc15] text-black border-[3px] border-black font-pixel text-xs shadow-[5px_5px_0_#000] pointer-events-none whitespace-nowrap"
          >
            {toastBanner}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Open-Floor Viewport */}
      <main className="flex-1 relative overflow-hidden flex items-center justify-center bg-[#080b14]">
        <div
          className={
            isMobile
              ? 'w-[395px] max-w-full h-full border-x-4 border-slate-700 shadow-[0_0_60px_rgba(0,0,0,0.9)] overflow-hidden relative'
              : 'w-full h-full relative'
          }
        >
          <StudioCampusMap
            onOpenHub={handleOpenHub}
            discovered={discovered}
            unlocked={unlocked}
            isModalOpen={isModalOpen}
            isMobileLayout={isMobile}
            burstMap={burstMap}
            resetSignal={resetSignal}
          />
        </div>

        {/* Unobtrusive Corner Preview Pill (keeps the screen 100% clean!) */}
        <div className="fixed bottom-3 left-3 z-40 flex items-end gap-2">
          {!showDevMenu ? (
            <button
              onClick={() => setShowDevMenu(true)}
              className="px-3 py-1.5 bg-[#0f1629]/90 hover:bg-slate-800 border border-slate-600 text-slate-300 font-chakra text-xs flex items-center gap-1.5 cursor-pointer shadow-lg"
            >
              <SlidersHorizontal size={13} /> Preview Tools
            </button>
          ) : (
            <div className="bg-[#0f1629] border-2 border-slate-600 p-2.5 flex flex-wrap items-center gap-2 text-xs shadow-2xl">
              <Link
                to="/"
                className="px-2 py-1 bg-slate-800 hover:bg-slate-700 border border-slate-600 flex items-center gap-1 text-slate-200"
              >
                <ArrowLeft size={12} /> Live /
              </Link>

              <div className="flex border border-slate-600">
                <button
                  onClick={() => setViewportMode('desktop')}
                  className={`px-2 py-1 flex items-center gap-1 cursor-pointer ${
                    !isMobile ? 'bg-sky-400 text-black font-bold' : 'bg-slate-800 text-slate-300'
                  }`}
                >
                  <Monitor size={12} /> Desktop
                </button>
                <button
                  onClick={() => setViewportMode('mobile')}
                  className={`px-2 py-1 flex items-center gap-1 cursor-pointer ${
                    isMobile ? 'bg-sky-400 text-black font-bold' : 'bg-slate-800 text-slate-300'
                  }`}
                >
                  <Smartphone size={12} /> Mobile
                </button>
              </div>

              <button
                onClick={masterAllDemo}
                className="px-2.5 py-1 bg-amber-400 hover:bg-amber-300 text-black font-bold border border-black flex items-center gap-1 cursor-pointer"
              >
                <Crown size={12} /> Master All
              </button>

              <button
                onClick={() => {
                  const sampleHub = PORTFOLIO_CAMP_HUBS[2];
                  triggerBurst(sampleHub.children[0].id, 'discover');
                  setCelebration({
                    node: sampleHub.children[0],
                    sprite: sampleHub.sprite,
                    title: `${sampleHub.title} Completed!`,
                    hubTitle: sampleHub.title,
                    done: 3,
                    total: 3,
                    hubMastered: true,
                    isFullStudio: false
                  });
                }}
                className="px-2 py-1 bg-slate-800 hover:bg-slate-700 border border-amber-500/50 text-amber-300 flex items-center gap-1 cursor-pointer"
              >
                <Sparkles size={12} /> Test FX
              </button>

              <button
                onClick={() => {
                  setDiscovered(new Set());
                  setUnlocked(new Set(allIds));
                  setOpenCategoryHub(null);
                  setActiveNode(null);
                  setResetSignal((n) => n + 1);
                }}
                className="px-2 py-1 bg-slate-800 hover:bg-slate-700 border border-slate-600 flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw size={12} /> Reset
              </button>

              <button
                onClick={() => setShowDevMenu(false)}
                className="p-1 bg-slate-800 hover:bg-rose-600 border border-slate-600 cursor-pointer"
                title="Minimize"
              >
                <X size={13} />
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Spacious Category Stage-Select Screen */}
      {!activeNode && (
        <CategoryStageModal
          hub={openCategoryHub}
          discovered={discovered}
          justClearedId={justClearedId}
          onClose={() => setOpenCategoryHub(null)}
          onSelectProject={(proj) => setActiveNode(proj)}
        />
      )}

      {/* Unified Project & Checkpoint Showcase Modal */}
      <StudioProjectModal
        node={activeNode}
        discovered={discovered}
        onClose={handleProjectClose}
        onNavigateSibling={handleNavigateSibling}
      />

      {/* Full-Screen Arcade Trophy Screen for Category & 100% Mastery */}
      <StageClearCelebration
        celebration={celebration}
        onDismiss={() => setCelebration(null)}
      />
    </div>
  );
}
