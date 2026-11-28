import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ChevronDown, Briefcase, GraduationCap, Menu, X } from 'lucide-react';
import VideoGallery from '../components/UI/VideoGallery';
import { HubIconSims, HubIconVR, HubIconJams, GAME_SPRITES } from '../components/Overworld/GamePixelIcons';
import portfolioData from '../data/portfolioData.json';

const GithubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
);
const LinkedinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
);

const MailIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
);
const GamepadIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="6" y1="12" x2="10" y2="12"></line><line x1="8" y1="10" x2="8" y2="14"></line><line x1="15" y1="13" x2="15.01" y2="13"></line><line x1="18" y1="11" x2="18.01" y2="11"></line><rect x="2" y="6" width="20" height="12" rx="2"></rect></svg>
);

const DownloadIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
);

const UserIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
);
const WrenchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
);
const FolderIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>
);
const PhoneIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
);

const TrophyIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>
);

const VimeoIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M23.977 6.416c-.105 2.338-1.739 5.543-4.894 9.609-3.268 4.247-6.026 6.37-8.29 6.37-1.409 0-2.578-1.294-3.553-3.881L5.322 11.4C4.603 8.816 3.834 7.522 3.01 7.522c-.179 0-.806.378-1.881 1.132L0 7.197c1.185-1.044 2.351-2.084 3.501-3.128C5.123 2.601 6.34 1.83 7.147 1.745c1.932-.178 3.123 1.134 3.555 3.937.523 3.393.888 5.508 1.094 6.353.626 2.87 1.304 4.307 2.032 4.307.558 0 1.238-.891 2.037-2.67.799-1.78 1.235-3.134 1.305-4.07.139-1.564-.452-2.345-1.777-2.345-.626 0-1.27.145-1.933.433 1.288-4.225 3.755-6.275 7.4-6.149 2.709.096 3.987 1.815 3.835 5.155z"/></svg>
);

const RetroParticles = () => {
  // Use a fixed array for rendering consistency without window.innerHeight dependencies during initial render
  const particles = Array.from({ length: 40 }).map((_, i) => ({
    id: i,
    left: `${Math.random() * 100}vw`,
    size: Math.random() > 0.8 ? 6 : 3,
    duration: Math.random() * 10 + 15,
    delay: Math.random() * 10,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-50">
      {particles.map(p => (
        <motion.div
          key={p.id}
          className="absolute bg-retro-light-blue pixel-border"
          style={{ width: p.size, height: p.size, left: p.left, bottom: -20 }}
          animate={{ y: ['0vh', '-120vh'], opacity: [0, 0.8, 0], rotate: [0, 180, 360] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "linear" }}
        />
      ))}
    </div>
  );
};

const fadeUpVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, type: 'spring', bounce: 0.4 } }
};

const sectionFocusVariant = {
  hidden: { opacity: 0.15, filter: 'blur(4px)', scale: 0.95 },
  visible: { opacity: 1, filter: 'blur(0px)', scale: 1, transition: { duration: 0.8, ease: "easeOut", staggerChildren: 0.3 } }
};

const AllGridPixelIcon = () => (
  <svg width="24" height="24" viewBox="0 0 12 12" style={{ shapeRendering: 'crispEdges', imageRendering: 'pixelated' }}>
    <rect x="1" y="1" width="4" height="4" fill="#38bdf8" />
    <rect x="7" y="1" width="4" height="4" fill="#c084fc" />
    <rect x="1" y="7" width="4" height="4" fill="#f4b41b" />
    <rect x="7" y="7" width="4" height="4" fill="#83eb72" />
  </svg>
);

const ProjectMetaBadges = ({ proj, gradInfo }) => {
  if (!gradInfo && !proj.client && !proj.jam) return null;
  return (
    <div className="w-full flex flex-col gap-3">
      {proj.client && (
        <div className="flex items-center gap-3.5 bg-retro-dark/90 border-l-4 border-retro-green p-3 shadow-sm">
          {proj.clientLogo && (
            <div className="w-10 h-10 shrink-0 bg-white/5 p-1 flex items-center justify-center border border-white/10">
              <img src={proj.clientLogo} alt={proj.client} className="w-full h-full object-contain" />
            </div>
          )}
          <div className="min-w-0">
            <div className="font-pixel text-[9px] text-retro-light-green tracking-[0.18em] mb-1 uppercase">Commissioned By</div>
            <div className="font-pixel text-xs md:text-sm text-white truncate">{proj.client}</div>
          </div>
        </div>
      )}

      {gradInfo && (
        <div className="flex items-center gap-3.5 bg-retro-dark/90 border-l-4 border-retro-yellow p-3 shadow-sm">
          {gradInfo.logos && (
            <div className="flex gap-1.5 shrink-0">
              {gradInfo.logos.map((logo, i) => (
                <div key={i} className="w-9 h-9 shrink-0 bg-white p-1 flex items-center justify-center border border-white/10">
                  <img src={logo.src} alt={logo.alt} className="w-full h-full object-contain" />
                </div>
              ))}
            </div>
          )}
          <div className="min-w-0">
            <div className="font-pixel text-[9px] text-retro-yellow tracking-[0.18em] mb-1 uppercase">{gradInfo.title || 'Graduation Project'}</div>
            <div className="font-chakra text-xs md:text-sm font-bold text-white leading-snug">{gradInfo.text}</div>
          </div>
        </div>
      )}

      {proj.jam && (
        <div className="flex items-center gap-3.5 bg-retro-dark/90 border-l-4 border-retro-yellow p-3 shadow-sm">
          <div className="min-w-0">
            <div className="font-pixel text-[9px] text-retro-yellow tracking-[0.18em] mb-1 uppercase flex items-center gap-2">
              <TrophyIcon /> {proj.jam}
            </div>
            {proj.award && (
              <div className="font-pixel text-xs text-retro-light-green leading-relaxed font-bold mt-1">
                ★ {proj.award}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const ProjectActionLinks = ({ proj }) => {
  if (!proj.githubLink && !proj.itchLink && !proj.jamLink) return null;
  return (
    <div className="flex flex-wrap gap-3">
      {proj.itchLink && (
        <a href={proj.itchLink} target="_blank" rel="noreferrer" className="pixel-btn bg-retro-red flex gap-2 items-center px-4 py-2.5 text-xs shadow-[4px_4px_0_rgba(0,0,0,0.5)]">
          <GamepadIcon /> PLAY
        </a>
      )}
      {proj.githubLink && (
        <a href={proj.githubLink} target="_blank" rel="noreferrer" className="pixel-btn bg-retro-blue flex gap-2 items-center px-4 py-2.5 text-xs shadow-[4px_4px_0_rgba(0,0,0,0.5)]">
          <GithubIcon /> REPO
        </a>
      )}
      {proj.jamLink && (
        <a href={proj.jamLink} target="_blank" rel="noreferrer" className="pixel-btn bg-retro-yellow text-retro-dark font-bold flex gap-2 items-center px-4 py-2.5 text-xs shadow-[4px_4px_0_rgba(0,0,0,0.5)]">
          <TrophyIcon /> JAM
        </a>
      )}
    </div>
  );
};

// Strictly Aligned Card: In 2-Per-Row (`compact`), Title Header sits at the very top with uniform min-height
// so adjacent cards' titles, video players, and bottom tech footers line up on the exact same horizontal row!
const ProjectCard = ({ proj, gradInfo, compact = false }) => {
  if (compact) {
    return (
      <div className="w-full h-full flex flex-col pixel-box bg-retro-dark border-[6px] border-retro-purple transition-colors duration-300 hover:border-retro-light-blue group overflow-hidden p-0">
        {/* Aligned Top Header Row (Matched height across both columns!) */}
        <div className="p-5 md:p-6 border-b-4 border-retro-purple bg-[#141726] lg:min-h-[118px] flex flex-col justify-between gap-2">
          <div className="flex items-start justify-between gap-3">
            <h4 className="font-pixel text-base md:text-lg text-retro-yellow group-hover:text-white transition-colors leading-snug m-0">
              {proj.title}
            </h4>
            {proj.date && (
              <span className="font-pixel text-[10px] text-slate-300 bg-black/60 border-2 border-retro-gray px-2.5 py-1 whitespace-nowrap shrink-0 leading-none">
                {proj.date}
              </span>
            )}
          </div>
          <div className="font-chakra text-retro-light-blue text-xs md:text-sm uppercase tracking-wider font-bold">
            {proj.role}
          </div>
        </div>

        {/* Aligned Media Frame */}
        <div className="w-full bg-black/50 border-b-4 border-retro-purple p-4 flex flex-col justify-center">
          <VideoGallery singleVideo={proj.video} videos={proj.videos} image={proj.image} />
        </div>

        {/* Body & Bottom-Pinned Footer */}
        <div className="flex-1 p-5 md:p-6 flex flex-col justify-between gap-5">
          <div className="space-y-4">
            <ProjectMetaBadges proj={proj} gradInfo={gradInfo} />
            <p className="font-chakra text-sm md:text-base text-slate-300 leading-relaxed m-0">
              {proj.summary}
            </p>
            {proj.keyContributions?.length > 0 && (
              <ul className="space-y-1.5 border-l-2 border-retro-yellow/40 pl-3.5 pt-1">
                {proj.keyContributions.map((kc, i) => (
                  <li key={i} className="font-chakra text-xs md:text-sm text-slate-300 leading-relaxed flex items-start gap-2">
                    <span className="text-retro-yellow shrink-0 mt-0.5">▸</span>
                    <span>{kc}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="pt-4 border-t-2 border-retro-gray/30 space-y-4 mt-auto">
            <div className="flex flex-wrap gap-2">
              {proj.tech.map((t) => (
                <span key={t} className="font-chakra bg-retro-gray px-2.5 py-1 text-xs border-2 border-white/20 text-white font-bold">
                  {t}
                </span>
              ))}
            </div>
            <ProjectActionLinks proj={proj} />
          </div>
        </div>
      </div>
    );
  }

  // Wide Horizontal Showcase Card (used in Arrow Carousel & Master-Detail Stage)
  return (
    <div className="w-full flex flex-col xl:flex-row pixel-box bg-retro-dark border-[6px] border-retro-purple transition-colors duration-300 hover:border-retro-light-blue group overflow-hidden p-0">
      <div className="w-full xl:w-[52%] shrink-0 bg-black/45 flex flex-col justify-center border-b-[6px] xl:border-b-0 xl:border-r-[6px] border-retro-purple p-4 md:p-6">
        <VideoGallery singleVideo={proj.video} videos={proj.videos} image={proj.image} />
        <div className="mt-3 flex justify-center">
          <ProjectActionLinks proj={proj} />
        </div>
      </div>

      <div className="flex-1 flex flex-col p-6 md:p-8 justify-between gap-5">
        <div className="flex flex-col gap-2 border-b-4 border-retro-gray/30 pb-4">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <h4 className="font-pixel text-lg lg:text-2xl text-retro-yellow leading-snug m-0">{proj.title}</h4>
            {proj.date && (
              <span className="font-pixel text-[10px] md:text-xs text-slate-300 bg-black/50 border-2 border-retro-gray px-2.5 py-1 whitespace-nowrap shrink-0 leading-none">
                {proj.date}
              </span>
            )}
          </div>
          <div className="font-chakra text-retro-light-blue text-xs md:text-sm uppercase tracking-widest font-bold">{proj.role}</div>
        </div>

        <div className="space-y-4 flex-1">
          <ProjectMetaBadges proj={proj} gradInfo={gradInfo} />
          <p className="font-chakra text-base text-slate-200 leading-relaxed m-0">
            {proj.summary}
          </p>
          {proj.keyContributions?.length > 0 && (
            <div className="pt-2 border-t border-retro-gray/30">
              <h5 className="font-pixel text-[10px] text-retro-yellow tracking-[0.2em] uppercase mb-2.5">Key Contributions</h5>
              <ul className="space-y-2 border-l-2 border-retro-yellow/40 pl-4">
                {proj.keyContributions.map((kc, i) => (
                  <li key={i} className="font-chakra text-sm sm:text-base text-slate-200 leading-relaxed flex items-start gap-2">
                    <span className="text-retro-yellow shrink-0 mt-0.5">▸</span>
                    <span>{kc}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-2 pt-4 border-t-2 border-retro-gray/30">
          {proj.tech.map((t) => (
            <span key={t} className="font-chakra bg-retro-gray px-2.5 py-1 text-xs border-2 border-white/20 text-white font-bold">
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default function SimpleView() {
  const { profile, education, internships, nodes } = portfolioData;
  const nodeById = Object.fromEntries(nodes.map(n => [n.id, n]));

  // Ordered by Flagship Impact ("Best Foot Forward") within each category matching Map order!
  const categoryGroups = [
    {
      id: 'clients',
      title: 'Clients',
      color: '#38bdf8',
      icon: HubIconSims,
      items: [nodeById.proj_gm, nodeById.proj2].filter(Boolean) // General Motors -> NBE (Cyber Salvage)
    },
    {
      id: 'vr',
      title: 'VR',
      color: '#c084fc',
      icon: HubIconVR,
      items: [nodeById.proj1, nodeById.proj4, nodeById.proj3].filter(Boolean) // The Learning Lens -> Subject Null -> VR Wave Shooter
    },
    {
      id: '2d',
      title: '2D',
      color: '#f4b41b',
      icon: HubIconJams,
      items: [nodeById.proj6, nodeById.proj5, nodeById.proj7, nodeById.proj8].filter(Boolean) // Two Bows Off Frame -> ESCCTRL -> Night Shift Taxi -> LoadNExplode
    }
  ];

  const allSortedByCat = categoryGroups.flatMap((g) => g.items);

  const [selectedCat, setSelectedCat] = useState('clients');
  const [carouselIdx, setCarouselIdx] = useState(0);
  const [trackOffset, setTrackOffset] = useState(0);
  const cartridgeViewportRef = useRef(null);
  const activeCartridgeRef = useRef(null);
  const touchGestureRef = useRef(null);

  const handleCarouselTouchStart = (e) => {
    const t = e.touches[0];
    if (!t) return;
    touchGestureRef.current = { x: t.clientX, y: t.clientY, canceled: false };
  };

  const handleCarouselTouchMove = (e) => {
    const g = touchGestureRef.current;
    const t = e.touches[0];
    if (!g || g.canceled || !t) return;
    const dx = Math.abs(t.clientX - g.x);
    const dy = Math.abs(t.clientY - g.y);
    // Cancel immediately if the user is scrolling vertically!
    if (dy > 16 && dy > dx * 0.55) {
      g.canceled = true;
    }
  };

  const handleCarouselTouchEnd = (e) => {
    const g = touchGestureRef.current;
    touchGestureRef.current = null;
    if (!g || g.canceled || activeItems.length <= 1) return;
    const t = e.changedTouches[0];
    if (!t) return;
    const deltaX = t.clientX - g.x;
    const deltaY = t.clientY - g.y;
    // Require a clear, deliberate horizontal-only swipe on the cartridge bar itself
    if (Math.abs(deltaX) > 55 && Math.abs(deltaY) < 24 && Math.abs(deltaX) > Math.abs(deltaY) * 2.5) {
      if (deltaX < 0) {
        setCarouselIdx((i) => (i + 1) % activeItems.length);
      } else {
        setCarouselIdx((i) => (i - 1 + activeItems.length) % activeItems.length);
      }
    }
  };

  const activeItems =
    selectedCat === 'all'
      ? allSortedByCat
      : categoryGroups.find((c) => c.id === selectedCat)?.items || [];

  const safeIdx = activeItems.length > 0 ? carouselIdx % activeItems.length : 0;
  const currentCarouselProj = activeItems[safeIdx] || activeItems[0];

  // Lock the selected golden cartridge DEAD-CENTER horizontally (even on 1/9, 9/9, or 1/2!)
  // so its downward pointer arrow always aligns right above the centered "1/9" counter!
  useEffect(() => {
    const updateTrackCenter = () => {
      if (!activeCartridgeRef.current || !cartridgeViewportRef.current) return;
      const viewportW = cartridgeViewportRef.current.clientWidth;
      const pill = activeCartridgeRef.current;
      const pillCenter = pill.offsetLeft + pill.offsetWidth / 2;
      setTrackOffset(Math.round(viewportW / 2 - pillCenter));
    };

    updateTrackCenter();
    const raf = requestAnimationFrame(updateTrackCenter);
    window.addEventListener('resize', updateTrackCenter);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', updateTrackCenter);
    };
  }, [safeIdx, selectedCat, activeItems.length]);

  const handleSelectCat = (catId) => {
    setSelectedCat(catId);
    setCarouselIdx(0);
  };

  // Scroll spy for active navbar highlighting
  const [activeSection, setActiveSection] = useState('about');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileAboutTab, setMobileAboutTab] = useState('experience');
  const [openMobileExpId, setOpenMobileExpId] = useState(() => internships?.[0]?.id || null);
  const navSections = ['about', 'skills', 'projects', 'contact'];
  const navItems = [
    { id: 'about', label: 'ABOUT', Icon: UserIcon },
    { id: 'skills', label: 'SKILLS', Icon: WrenchIcon },
    { id: 'projects', label: 'PROJECTS', Icon: FolderIcon },
    { id: 'contact', label: 'CONTACT', Icon: PhoneIcon }
  ];

  const handleMobileNavJump = (id) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const observers = [];
    navSections.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { rootMargin: '-30% 0px -60% 0px', threshold: 0 }
      );
      observer.observe(el);
      observers.push(observer);
    });
    return () => observers.forEach(o => o.disconnect());
  }, []);

  return (
    <div className="min-h-screen bg-retro-dark text-retro-text font-chakra relative">
      <RetroParticles />
      
      {/* Sticky Navigation */}
      <nav className="sticky top-0 z-50 bg-retro-dark/95 backdrop-blur-md border-b-4 border-retro-gray shadow-[0_10px_30px_-10px_rgba(0,0,0,0.8)] py-2.5 md:py-3 px-4 md:px-8">
        {/* ── DESKTOP NAVBAR (md and up — unchanged!) ── */}
        <div className="hidden md:flex max-w-screen-2xl mx-auto justify-between items-center w-full lg:px-8">
          <div className="flex items-center mr-6 shrink-0">
            <span className="font-pixel text-xl text-retro-yellow drop-shadow-[0_0_8px_rgba(244,180,27,0.6)] select-none">M</span>
            <span className="font-pixel text-[10px] text-retro-gray ml-1 tracking-widest hidden lg:inline">AZROA</span>
          </div>
          <div className="flex gap-6 items-center flex-1">
            {navItems.map(({ id, label, Icon }) => {
              const isActive = activeSection === id;
              return (
                <a
                  key={id}
                  href={`#${id}`}
                  className={`font-pixel text-sm whitespace-nowrap flex items-center gap-2 px-3 py-2 relative transition-all duration-300 hover:scale-105 ${
                    isActive
                      ? 'text-retro-yellow drop-shadow-[0_0_10px_rgba(244,180,27,0.6)]'
                      : 'text-retro-light-blue hover:text-white'
                  }`}
                >
                  {isActive && <span className="text-retro-yellow text-sm animate-pulse">▸</span>}
                  <Icon /> {label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-retro-yellow shadow-[0_0_8px_rgba(244,180,27,0.8)] rounded-full" />
                  )}
                </a>
              );
            })}
          </div>
          <Link to="/" className="pixel-btn bg-retro-red text-center shrink-0 hover:scale-105 transition-transform text-sm px-3 py-2 ml-2">
            RETURN TO MAP
          </Link>
        </div>

        {/* ── MOBILE BURGER TOP BAR (below md) ── */}
        <div className="flex md:hidden items-center justify-between w-full">
          {/* Brand + Active Section Readout */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((v) => !v)}
            className="flex items-center gap-2.5 text-left cursor-pointer"
          >
            <div className="flex items-center bg-[#121626] border-2 border-retro-gray px-2.5 py-1.5 shadow-[3px_3px_0_#000]">
              <span className="font-pixel text-base text-retro-yellow leading-none">M</span>
              <span className="font-pixel text-[9px] text-slate-300 ml-1 tracking-wider leading-none">AZROA</span>
            </div>
            <span className="font-pixel text-[10px] text-retro-yellow tracking-wider flex items-center gap-1">
              <span className="animate-pulse">▸</span>
              {activeSection.toUpperCase()}
            </span>
          </button>

          {/* Burger Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((v) => !v)}
            aria-label="Toggle navigation menu"
            className={`w-11 h-10 border-[3px] flex items-center justify-center transition-colors shadow-[4px_4px_0_#000] cursor-pointer active:translate-y-0.5 ${
              mobileMenuOpen
                ? 'bg-retro-yellow text-black border-white'
                : 'bg-[#182036] text-white border-white'
            }`}
          >
            {mobileMenuOpen ? <X size={22} strokeWidth={3} /> : <Menu size={22} strokeWidth={3} />}
          </button>
        </div>

        {/* ── MOBILE FULL-WIDTH ARCADE CURTAIN DROPDOWN ── */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setMobileMenuOpen(false)}
                className="fixed inset-0 top-[60px] bg-black/60 z-40 md:hidden"
              />
              <motion.div
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.18, ease: 'easeOut' }}
                className="absolute left-0 right-0 top-full bg-[#111526] border-b-4 border-retro-yellow p-4 shadow-[0_18px_40px_rgba(0,0,0,0.95)] z-50 md:hidden space-y-2.5"
              >
                {navItems.map(({ id, label, Icon }) => {
                  const isActive = activeSection === id;
                  return (
                    <button
                      key={id}
                      type="button"
                      onClick={() => handleMobileNavJump(id)}
                      className={`w-full px-4 py-3.5 border-2 font-pixel text-xs flex items-center justify-between transition-colors cursor-pointer ${
                        isActive
                          ? 'bg-[#231d0c] border-retro-yellow text-retro-yellow shadow-[4px_4px_0_#000]'
                          : 'bg-[#181f36] border-slate-600 text-white hover:border-white shadow-[4px_4px_0_#000]'
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        <Icon />
                        <span>{label}</span>
                      </span>
                      <span className="text-sm">{isActive ? '◂ ACTIVE' : '▸'}</span>
                    </button>
                  );
                })}

                <div className="pt-2 border-t-2 border-dashed border-slate-600">
                  <Link
                    to="/"
                    onClick={() => setMobileMenuOpen(false)}
                    className="pixel-btn bg-retro-red text-white w-full py-3.5 px-4 font-pixel text-xs flex items-center justify-center gap-2.5 border-2 border-white shadow-[4px_4px_0_#000]"
                  >
                    <GamepadIcon /> RETURN TO MAP
                  </Link>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </nav>

      <div className="w-full pb-32 relative z-10 overflow-x-hidden">
        
        <motion.header 
          initial="hidden" animate="visible" variants={fadeUpVariant}
          className="max-w-5xl mx-auto px-4 md:px-8 lg:px-12 pt-12 md:pt-16 flex flex-col md:flex-row justify-between items-center md:items-start gap-8 border-b-6 border-retro-gray pb-12"
        >
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8 group w-full">
            <div className="relative shrink-0 mx-auto md:mx-0">
              <div className="absolute inset-0 bg-retro-yellow transform translate-x-3 translate-y-3 group-hover:translate-x-5 group-hover:translate-y-5 transition-transform duration-300"></div>
              <img 
                src="/profile.jpg" 
                alt="Mahmoud Hany" 
                className="relative w-32 h-32 md:w-40 md:h-40 object-cover object-[50%_10%] scale-[1.05] pixel-border border-6 border-retro-dark shadow-xl z-10 md:filter md:grayscale md:group-hover:grayscale-0 transition-all duration-500"
              />
            </div>
            <div className="w-full mt-2 md:mt-0 flex-1 flex flex-col items-center md:items-start justify-between h-full min-h-[12rem]">
              <div className="w-full text-center md:text-left">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-pixel text-retro-yellow mb-3 md:mb-4 leading-snug md:leading-tight group-hover:text-retro-light-green transition-colors">
                  {profile.name}
                </h1>
                <h2 className="text-base sm:text-lg md:text-xl text-retro-light-blue font-pixel mb-2 md:mb-4">
                  {profile.role}
                </h2>
              </div>
              
              {/* Retro Action & Contact Buttons — cleanly aligned & full-width on mobile! */}
              <div className="w-full mt-auto pt-4 space-y-4 md:space-y-5">
                <Link
                  to="/"
                  className="pixel-btn bg-retro-red text-white hover:bg-white hover:text-retro-dark transition-colors px-5 py-3.5 text-sm shadow-md drop-shadow-[5px_5px_0_rgba(0,0,0,0.5)] w-full flex md:hidden justify-center items-center gap-2.5 font-bold tracking-widest"
                >
                  <GamepadIcon /> RETURN TO MAP
                </Link>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 w-full">
                  <a href={`mailto:${profile.email}`} className="pixel-btn bg-retro-blue text-white hover:bg-white hover:text-retro-dark transition-colors px-3 py-3 md:py-4 text-xs md:text-sm shadow-md flex justify-center items-center gap-2">
                    <MailIcon /> EMAIL
                  </a>
                  <a href={profile.links.linkedin} target="_blank" rel="noreferrer" className="pixel-btn bg-retro-blue text-white hover:bg-white hover:text-retro-dark transition-colors px-3 py-3 md:py-4 text-xs md:text-sm shadow-md flex justify-center items-center gap-2">
                    <LinkedinIcon /> LINKEDIN
                  </a>
                  <a href={profile.links.github} target="_blank" rel="noreferrer" className="pixel-btn bg-retro-blue text-white hover:bg-white hover:text-retro-dark transition-colors px-3 py-3 md:py-4 text-xs md:text-sm shadow-md flex justify-center items-center gap-2">
                    <GithubIcon /> GITHUB
                  </a>
                  <a href="https://itch.io/profile/nightfuryexe" target="_blank" rel="noreferrer" className="pixel-btn bg-retro-blue text-white hover:bg-white hover:text-retro-dark transition-colors px-3 py-3 md:py-4 text-xs md:text-sm shadow-md flex justify-center items-center gap-2">
                    <GamepadIcon /> ITCH.IO
                  </a>
                </div>
                <a href="/Mahmoud_Hany_CV.pdf" download className="pixel-btn bg-retro-yellow text-retro-dark hover:bg-white transition-colors px-5 py-4 md:py-5 text-sm sm:text-base md:text-lg shadow-md drop-shadow-[5px_5px_0_rgba(244,180,27,0.3)] w-full flex justify-center items-center gap-3 font-bold tracking-widest">
                  <DownloadIcon /> DOWNLOAD CV
                </a>
              </div>
            </div>
          </div>
        </motion.header>

        <motion.section id="about" initial="hidden" whileInView="visible" viewport={{ margin: "-25% 0px -25% 0px" }} variants={sectionFocusVariant} className="max-w-5xl mx-auto px-4 md:px-8 lg:px-12 pt-24 md:pt-32 scroll-mt-28">
          <h3 className="font-pixel text-3xl md:text-4xl text-retro-green mb-10 md:mb-12 text-center pb-4 border-b-4 border-retro-gray border-dashed">About</h3>
          <p className="font-chakra text-left md:text-center text-base md:text-lg border-l-4 md:border-l-0 border-retro-blue pl-4 md:pl-0 text-slate-200 md:text-slate-300 leading-relaxed max-w-3xl mx-auto mb-10 md:mb-12 hover:text-white transition-colors duration-300">
            {profile.summary}
          </p>

          {/* ── MOBILE / TABLET (< lg): TABS + GLOW BOX [▼] EXPANDABLE CARDS ── */}
          <div className="flex flex-col gap-6 lg:hidden">
            <div className="grid grid-cols-2 gap-3">
              {[
                { id: 'experience', label: 'EXPERIENCE', Icon: Briefcase, color: '#83eb72' },
                { id: 'education', label: 'EDUCATION', Icon: GraduationCap, color: '#f4b41b' }
              ].map(({ id, label, Icon, color }) => {
                const active = mobileAboutTab === id;
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setMobileAboutTab(id)}
                    className="h-[50px] px-3 border-[3px] flex items-center justify-center gap-2 cursor-pointer transition-colors"
                    style={{
                      backgroundColor: active ? '#1e2538' : '#131726',
                      borderColor: active ? '#f4b41b' : '#64748b',
                      boxShadow: active
                        ? '0 0 18px rgba(244,180,27,0.35), 4px 4px 0 #000'
                        : '4px 4px 0 #000'
                    }}
                  >
                    <Icon
                      size={16}
                      className="shrink-0"
                      style={{ color: active ? '#fef08a' : color }}
                    />
                    <span
                      className="font-pixel text-[10px] sm:text-xs leading-none"
                      style={{ color: active ? '#fef08a' : '#ffffff' }}
                    >
                      {label}
                    </span>
                  </button>
                );
              })}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={mobileAboutTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.18 }}
                className="flex flex-col gap-4"
              >
                {mobileAboutTab === 'experience'
                  ? internships.map((exp) => {
                      const expanded = openMobileExpId === exp.id;
                      return (
                        <div
                          key={exp.id}
                          onClick={() =>
                            setOpenMobileExpId((curr) => (curr === exp.id ? null : exp.id))
                          }
                          className={`bg-[#141829] border-2 transition-all cursor-pointer select-none overflow-hidden ${
                            expanded
                              ? 'border-retro-light-green shadow-[0_0_18px_rgba(131,235,114,0.16),5px_5px_0_rgba(0,0,0,0.6)]'
                              : 'border-retro-gray hover:border-retro-light-green shadow-[5px_5px_0_rgba(0,0,0,0.5)]'
                          }`}
                        >
                          <div className="p-5 flex flex-col gap-3">
                            <div className="flex items-start justify-between gap-3">
                              <div className="min-w-0 flex-1">
                                <div className="font-pixel text-sm sm:text-base text-white leading-relaxed">
                                  {exp.title}
                                </div>
                                <div className="font-chakra text-base sm:text-lg font-bold text-retro-light-green mt-1">
                                  {exp.institution}
                                </div>
                                <div className="mt-2">
                                  <span className="inline-block font-pixel text-[10px] sm:text-xs text-slate-300 bg-black/60 border border-retro-gray px-2.5 py-1 whitespace-nowrap">
                                    {exp.date}
                                  </span>
                                </div>
                              </div>

                              {/* Glowing Arcade Expand Square [▼] / [▲] */}
                              <div className="pt-0.5 shrink-0">
                                <motion.div
                                  animate={!expanded ? { y: [0, 2.5, 0] } : { y: 0 }}
                                  transition={{
                                    duration: 1.2,
                                    repeat: Infinity,
                                    ease: 'easeInOut'
                                  }}
                                  className="w-9 h-9 border-2 flex items-center justify-center shrink-0 transition-colors"
                                  style={
                                    expanded
                                      ? {
                                          backgroundColor: '#f4b41b',
                                          borderColor: '#ffffff',
                                          color: '#0f172a',
                                          boxShadow:
                                            '0 0 14px rgba(244,180,27,0.6), 3px 3px 0 #000'
                                        }
                                      : {
                                          backgroundColor: '#182438',
                                          borderColor: '#83eb72',
                                          color: '#83eb72',
                                          boxShadow:
                                            '0 0 14px rgba(131,235,114,0.55), 3px 3px 0 #000'
                                        }
                                  }
                                >
                                  <ChevronDown
                                    size={22}
                                    strokeWidth={3.5}
                                    className={`transition-transform duration-200 ${
                                      expanded ? 'rotate-180' : ''
                                    }`}
                                  />
                                </motion.div>
                              </div>
                            </div>

                            {expanded &&
                              (exp.bullets ? (
                                <ul className="space-y-2.5 border-l-2 border-retro-light-green/50 pl-3.5 pt-2 m-0 list-none">
                                  {exp.bullets.map((b, idx) => (
                                    <li
                                      key={idx}
                                      className="font-chakra text-left text-base text-slate-200 leading-relaxed flex items-start gap-2.5"
                                    >
                                      <span className="text-retro-light-green shrink-0 mt-1">
                                        ▸
                                      </span>
                                      <span>{b}</span>
                                    </li>
                                  ))}
                                </ul>
                              ) : exp.description ? (
                                <p className="font-chakra text-left text-base text-slate-200 leading-relaxed border-l-2 border-retro-light-green/50 pl-3.5 pt-2 m-0">
                                  {exp.description}
                                </p>
                              ) : null)}
                          </div>
                        </div>
                      );
                    })
                  : education.map((edu) => (
                      <div
                        key={edu.id}
                        className="bg-[#141829] border-2 border-retro-gray p-5 shadow-[5px_5px_0_rgba(0,0,0,0.5)] flex flex-col gap-2"
                      >
                        <div className="font-pixel text-sm sm:text-base text-white leading-relaxed">
                          {edu.degree}
                        </div>
                        <div className="font-chakra text-base sm:text-lg font-bold text-retro-light-blue">
                          {edu.institution}
                        </div>
                        <div className="font-pixel text-[10px] sm:text-xs text-slate-400 tracking-wider pt-1">
                          {edu.date}
                        </div>
                      </div>
                    ))}
              </motion.div>
            </AnimatePresence>
          </div>
          
          {/* ── DESKTOP (lg and up): SIDE-BY-SIDE EDUCATION & EXPERIENCE STACKS ── */}
          <div className="hidden lg:grid lg:grid-cols-2 gap-16 lg:gap-20">
            {/* Education Stack */}
            <div>
              <h4 className="font-pixel text-xl md:text-2xl text-retro-yellow mb-8 flex items-center gap-4"><span className="text-3xl">🎓</span> Education</h4>
              <div className="flex flex-col relative pt-4">
                {education.map((edu, i) => (
                  <motion.div 
                    key={edu.id} 
                    className={`pixel-box bg-retro-dark border-[6px] border-retro-gray p-4 md:p-8 relative z-${10 - i} ${i > 0 ? '-mt-2 md:-mt-8' : ''} transition-all duration-500 hover:z-20 hover:border-retro-yellow hover:translate-x-4 md:hover:translate-x-8 hover:-translate-y-2 hover:shadow-[16px_16px_0_rgba(244,180,27,0.4)] group`}
                  >
                    <div className="font-pixel text-base md:text-lg text-white mb-3 group-hover:text-retro-yellow transition-colors leading-relaxed">{edu.degree}</div>
                    <div className="text-retro-light-blue text-lg mb-2 font-bold">{edu.institution}</div>
                    <div className="text-slate-400 text-sm font-pixel tracking-widest">{edu.date}</div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Experience Stack */}
            <div>
              <h4 className="font-pixel text-xl md:text-2xl text-retro-light-green mb-8 flex items-center gap-4"><span className="text-3xl">⚔️</span> Experience</h4>
              <div className="flex flex-col relative pt-4">
                {internships.map((int, i) => (
                  <motion.div 
                    key={int.id} 
                    style={{ zIndex: 10 - i }}
                    className={`pixel-box bg-retro-dark border-[6px] border-retro-gray p-4 md:p-8 relative ${i > 0 ? '-mt-2 md:-mt-8' : ''} transition-all duration-500 hover:!z-30 hover:border-retro-light-green hover:translate-x-4 md:hover:translate-x-8 hover:-translate-y-2 hover:shadow-[16px_16px_0_rgba(131,235,114,0.4)] group`}
                  >
                    <div className="font-pixel text-lg md:text-xl text-white mb-3 group-hover:text-retro-light-green transition-colors">{int.title}</div>
                    <div className="text-retro-light-green text-lg mb-2 font-bold">{int.institution}</div>
                    <div className="text-slate-400 text-sm font-pixel tracking-widest mb-4">{int.date}</div>
                    {(int.bullets || int.description) && (
                      <div className="font-chakra text-slate-300 text-base leading-relaxed opacity-100 max-h-none mt-3 md:mt-0 md:opacity-0 md:max-h-0 md:group-hover:opacity-100 md:group-hover:max-h-96 md:group-hover:mt-4 transition-all duration-500 overflow-hidden">
                        {int.bullets ? (
                          <ul className="space-y-1.5 list-none p-0 m-0 text-sm leading-relaxed tracking-tight text-left">
                            {int.bullets.map((bullet, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <span className="text-retro-light-green shrink-0 select-none">•</span>
                                <span>{bullet}</span>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <div className="text-left text-sm leading-relaxed">{int.description}</div>
                        )}
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section id="skills" initial="hidden" whileInView="visible" viewport={{ margin: "-25% 0px -25% 0px" }} variants={sectionFocusVariant} className="max-w-5xl mx-auto px-4 md:px-8 lg:px-12 pt-32 scroll-mt-28">
          <h3 className="font-pixel text-2xl sm:text-3xl md:text-4xl text-retro-green mb-12 text-center pb-4 border-b-4 border-retro-gray border-dashed">Technical Arsenal</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {Object.entries(profile.skills).map(([category, items], idx) => (
              <motion.div 
                key={category} 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className={`bg-retro-dark p-6 pixel-border border-4 border-retro-gray hover:border-retro-blue transition-colors ${category === 'Personal Skills' ? 'md:col-span-2 text-center' : ''}`}
              >
                <h4 className="text-retro-light-blue font-bold text-lg mb-5 uppercase tracking-widest">{category.replace('_', ' ')}</h4>
                <div className={`flex flex-wrap gap-3 ${category === 'Personal Skills' ? 'justify-center' : ''}`}>
                  {items.map(item => (
                    <span key={item} className="font-chakra bg-retro-purple hover:bg-retro-yellow hover:text-retro-dark hover:-translate-y-1 transition-all duration-300 px-3 py-2 text-sm md:text-base border-2 border-retro-blue font-bold cursor-default shadow-sm">
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <div id="projects" className="scroll-mt-28 pt-32 max-w-7xl mx-auto px-3 md:px-6">
          <h3 className="font-pixel text-3xl md:text-4xl text-retro-green mb-10 text-center pb-4 border-b-4 border-retro-gray border-dashed">
            Projects
          </h3>

          {/* ── LOCKED-IN LEVEL CATEGORY BAR (2x2 Grid on Phones, Single Row on Tablet/Desktop!) ── */}
          <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center justify-center gap-3 md:gap-4 mb-8 max-w-md sm:max-w-none mx-auto">
            {[
              ...categoryGroups.map((cat) => ({
                id: cat.id,
                title: cat.title,
                color: cat.color,
                renderIcon: () => (
                  <img
                    src={cat.icon}
                    alt=""
                    className="w-6 h-6 shrink-0"
                    style={{ imageRendering: 'pixelated' }}
                  />
                )
              })),
              {
                id: 'all',
                title: 'All',
                color: '#f4f4f4',
                renderIcon: () => <AllGridPixelIcon />
              }
            ].map((tab) => {
              const active = selectedCat === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => handleSelectCat(tab.id)}
                  className="h-[52px] px-5 border-[3px] flex items-center justify-center gap-3 cursor-pointer transition-colors"
                  style={{
                    backgroundColor: active ? '#1e2538' : '#141826',
                    borderColor: active ? '#f4b41b' : '#ffffff',
                    boxShadow: active
                      ? '0 0 22px rgba(244,180,27,0.45), 5px 5px 0 #000'
                      : '5px 5px 0 #000'
                  }}
                >
                  {tab.renderIcon()}
                  <span
                    className="font-pixel text-sm md:text-base leading-none"
                    style={{ color: active ? '#fef08a' : tab.color }}
                  >
                    {tab.title}
                  </span>
                </button>
              );
            })}
          </div>

          {/* ── CENTER-LOCKED ARCADE CARTRIDGE CAROUSEL ── */}
          {currentCarouselProj && (
            <div className="space-y-5">
              {/* Single-Row Non-Wrapping Cartridge Dock: Pinned Left/Right Arrows + Auto-Centering Game Cartridges */}
              <div className="flex items-center gap-3 w-full">
                {/* Pinned Left Arrow Paddle */}
                <button
                  type="button"
                  onClick={() =>
                    setCarouselIdx((i) => (i - 1 + activeItems.length) % activeItems.length)
                  }
                  aria-label="Previous project"
                  className="shrink-0 w-12 md:w-14 h-[74px] bg-retro-blue hover:bg-retro-yellow hover:text-retro-dark text-white border-[3px] border-white hover:border-black flex items-center justify-center cursor-pointer transition-colors shadow-[5px_5px_0_#000]"
                >
                  <ChevronLeft size={28} strokeWidth={3} />
                </button>

                {/* Center-Locked Sliding Cartridge Viewport — active item ALWAYS glides to exact center + touch swipe! */}
                <div
                  ref={cartridgeViewportRef}
                  onTouchStart={handleCarouselTouchStart}
                  onTouchMove={handleCarouselTouchMove}
                  onTouchEnd={handleCarouselTouchEnd}
                  className="relative flex-1 min-w-0 overflow-hidden py-4 touch-pan-y"
                  style={{
                    maskImage:
                      'linear-gradient(90deg, transparent 0px, black 16px, black calc(100% - 16px), transparent 100%)',
                    WebkitMaskImage:
                      'linear-gradient(90deg, transparent 0px, black 16px, black calc(100% - 16px), transparent 100%)'
                  }}
                >
                  <motion.div
                    animate={{ x: trackOffset }}
                    transition={{ type: 'spring', stiffness: 320, damping: 30 }}
                    className="relative flex items-center gap-3.5 w-max"
                  >
                    {activeItems.map((item, i) => {
                      const isCurrent = i === safeIdx;
                      return (
                        <button
                          key={item.id}
                          ref={isCurrent ? activeCartridgeRef : null}
                          type="button"
                          onClick={() => setCarouselIdx(i)}
                          className={`relative shrink-0 h-[74px] max-w-[210px] sm:max-w-none px-3 sm:px-4 border-[3px] flex items-center gap-2.5 sm:gap-3.5 cursor-pointer transition-colors text-left ${
                            isCurrent ? 'scale-105 z-10' : 'hover:border-retro-light-blue opacity-75 hover:opacity-100'
                          }`}
                          style={
                            isCurrent
                              ? {
                                  background:
                                    'linear-gradient(180deg, #fef08a 0%, #f4b41b 60%, #eab308 100%)',
                                  borderColor: '#000000',
                                  boxShadow:
                                    '0 0 26px rgba(244,180,27,0.55), 5px 5px 0 #000'
                                }
                              : {
                                  backgroundColor: '#151a2c',
                                  borderColor: '#475569',
                                  boxShadow: '5px 5px 0 #000'
                                }
                          }
                        >
                          {/* Large 44x44 Pixel Icon Box */}
                          <div
                            className="w-11 h-11 shrink-0 border-2 p-1.5 flex items-center justify-center"
                            style={{
                              backgroundColor: '#0b0e17',
                              borderColor: isCurrent ? '#000000' : '#64748b'
                            }}
                          >
                            <img
                              src={GAME_SPRITES[item.id]}
                              alt=""
                              className="w-full h-full"
                              style={{ imageRendering: 'pixelated' }}
                            />
                          </div>

                          {/* Title Only — Wraps cleanly on narrow phones, single-line on desktop */}
                          <span
                            className="font-chakra text-sm sm:text-base md:text-lg font-bold leading-tight sm:leading-none sm:whitespace-nowrap line-clamp-2 pr-1"
                            style={{ color: isCurrent ? '#140e02' : '#ffffff' }}
                          >
                            {item.client || item.title}
                          </span>

                          {/* Active Downward Pointer Triangle (points dead-center onto 1/9 below!) */}
                          {isCurrent && (
                            <div className="absolute left-1/2 -translate-x-1/2 -bottom-[11px] w-0 h-0 border-l-[10px] border-r-[10px] border-t-[10px] border-l-transparent border-r-transparent border-t-[#eab308] drop-shadow-[0_2px_0_#000]" />
                          )}
                        </button>
                      );
                    })}
                  </motion.div>
                </div>

                {/* Pinned Right Arrow Paddle */}
                <button
                  type="button"
                  onClick={() => setCarouselIdx((i) => (i + 1) % activeItems.length)}
                  aria-label="Next project"
                  className="shrink-0 w-12 md:w-14 h-[74px] bg-retro-blue hover:bg-retro-yellow hover:text-retro-dark text-white border-[3px] border-white hover:border-black flex items-center justify-center cursor-pointer transition-colors shadow-[5px_5px_0_#000]"
                >
                  <ChevronRight size={28} strokeWidth={3} />
                </button>
              </div>

              {/* Centered Big "1/9" Counter + Centered Dots Indicator Directly Below It */}
              <div className="flex flex-col items-center justify-center gap-2.5 py-1">
                <span className="font-pixel text-lg md:text-2xl text-retro-yellow leading-none tracking-widest drop-shadow-[2px_2px_0_#000]">
                  {safeIdx + 1}/{activeItems.length}
                </span>

                <div className="flex items-center justify-center gap-2">
                  {activeItems.map((it, idx) => (
                    <button
                      key={it.id}
                      type="button"
                      onClick={() => setCarouselIdx(idx)}
                      className={`h-3 transition-all cursor-pointer border-2 border-black ${
                        idx === safeIdx
                          ? 'w-9 bg-retro-yellow shadow-[0_0_10px_rgba(244,180,27,0.6)]'
                          : 'w-3 bg-slate-600 hover:bg-slate-400'
                      }`}
                      aria-label={`Jump to ${it.title}`}
                    />
                  ))}
                </div>
              </div>

              {/* Active Project Showcase */}
              <div className="relative">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentCarouselProj.id}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -24 }}
                    transition={{ duration: 0.22 }}
                  >
                    <ProjectCard
                      proj={currentCarouselProj}
                      gradInfo={currentCarouselProj.gradInfo}
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          )}
        </div>

        <motion.section id="contact" 
          initial="hidden" whileInView="visible" viewport={{ margin: "-25% 0px -25% 0px" }} variants={sectionFocusVariant}
          className="max-w-5xl mx-auto px-4 md:px-8 lg:px-12 pt-32 mt-16 scroll-mt-28 flex flex-col items-center relative z-10 w-full"
        >
          <h3 className="font-pixel text-3xl md:text-4xl text-retro-green mb-12 text-center pb-4 border-b-4 border-retro-gray border-dashed w-full max-w-5xl">Contact</h3>
          {/* 1. Quote */}
          <motion.div 
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
            }}
            className="w-full border-t-[6px] border-retro-light-green flex flex-col items-center justify-center pt-16 pb-32 shadow-[0_-20px_40px_-10px_rgba(131,235,114,0.15)] gap-6"
          >
            <p className="font-pixel text-retro-light-green text-base sm:text-xl md:text-3xl drop-shadow-[0_0_15px_rgba(131,235,114,0.8)] leading-loose text-center px-4 max-w-4xl">
              “Why shouldn't people be able to teleport wherever they want?”
            </p>
            <p className="text-retro-light-blue text-sm sm:text-base md:text-lg tracking-widest uppercase font-bold text-center">
              — Palmer Luckey, Founder of Oculus VR
            </p>
          </motion.div>

          {/* 2. Teleport Bubble / Let's Connect */}
          <motion.div 
            variants={{
              hidden: { opacity: 0, scale: 0.5, filter: "blur(10px)" },
              visible: { opacity: 1, scale: 1, filter: "blur(0px)", transition: { type: "spring", bounce: 0.5, duration: 1, staggerChildren: 0.2, delayChildren: 0.4 } }
            }}
            className="w-full max-w-5xl border-[6px] md:border-[8px] border-retro-light-blue bg-retro-dark px-5 py-10 sm:p-10 md:p-12 lg:p-20 relative shadow-[0_0_50px_rgba(86,156,235,0.4)] overflow-hidden"
          >
            {/* Teleportation aesthetic layers */}
            <div className="absolute inset-0 bg-gradient-to-t from-retro-light-blue/20 to-transparent pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-full h-3 bg-retro-light-blue animate-pulse"></div>

            <div className="relative z-10 text-center mb-12 md:mb-16">
              <h3 className="font-pixel text-xl sm:text-3xl md:text-5xl text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.8)] tracking-wide md:tracking-widest leading-relaxed uppercase mb-5 md:mb-6 break-words">
                Teleport to Me
              </h3>
              <p className="text-retro-light-blue text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-bold">
                Always down to discuss new projects, building immersive XR experiences or games. Step into a portal below to connect!
              </p>
            </div>

            {/* 3. Teleport Pads */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-12 relative z-10 pt-10">
              
              <motion.a 
                href={`mailto:${profile.email}`}
                variants={{ hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0, transition: { type: "spring" } } }}
                whileHover={{ scale: 1.1, y: -10 }}
                className="flex flex-col items-center gap-6 group relative"
              >
                {/* Pad Base */}
                <div className="w-16 h-16 md:w-24 md:h-24 rounded-full border-4 md:border-[6px] border-retro-yellow bg-retro-dark flex items-center justify-center text-white group-hover:bg-retro-yellow group-hover:text-retro-dark transition-all duration-300 shadow-[0_0_30px_rgba(244,180,27,0.5)] group-hover:shadow-[0_0_50px_rgba(244,180,27,0.8)] relative overflow-hidden z-10">
                  <div className="absolute bottom-0 w-full h-full bg-gradient-to-t from-white/40 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                  <MailIcon />
                </div>
                {/* Beam */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-20 h-40 bg-gradient-to-t from-retro-yellow/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 -translate-y-full -z-10 blur-md pointer-events-none"></div>
                <div className="text-center">
                  <h4 className="font-pixel text-xl text-retro-yellow mb-2 tracking-wider">EMAIL</h4>
                  <p className="text-slate-300 font-bold">{profile.email}</p>
                </div>
              </motion.a>

              <motion.div 
                variants={{ hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0, transition: { type: "spring" } } }}
                whileHover={{ scale: 1.1, y: -10 }}
                className="flex flex-col items-center gap-6 group relative"
              >
                <div className="w-16 h-16 md:w-24 md:h-24 rounded-full border-4 md:border-[6px] border-retro-light-green bg-retro-dark flex items-center justify-center text-white group-hover:bg-retro-light-green group-hover:text-retro-dark transition-all duration-300 shadow-[0_0_30px_rgba(131,235,114,0.5)] group-hover:shadow-[0_0_50px_rgba(131,235,114,0.8)] relative overflow-hidden z-10">
                  <div className="absolute bottom-0 w-full h-full bg-gradient-to-t from-white/40 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                  <PhoneIcon />
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-20 h-40 bg-gradient-to-t from-retro-light-green/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 -translate-y-full -z-10 blur-md pointer-events-none"></div>
                <div className="text-center">
                  <h4 className="font-pixel text-xl text-retro-light-green mb-2 tracking-wider">PHONE</h4>
                  <p className="text-slate-300 font-bold">{profile.phone}</p>
                </div>
              </motion.div>

              <motion.div 
                variants={{ hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0, transition: { type: "spring" } } }}
                whileHover={{ scale: 1.1, y: -10 }}
                className="flex flex-col items-center gap-6 group relative"
              >
                <div className="w-16 h-16 md:w-24 md:h-24 rounded-full border-4 md:border-[6px] border-retro-red bg-retro-dark flex items-center justify-center text-white group-hover:bg-retro-red group-hover:text-white transition-all duration-300 shadow-[0_0_30px_rgba(217,87,99,0.5)] group-hover:shadow-[0_0_50px_rgba(217,87,99,0.8)] relative overflow-hidden z-10">
                  <div className="absolute bottom-0 w-full h-full bg-gradient-to-t from-white/40 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-20 h-40 bg-gradient-to-t from-retro-red/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 -translate-y-full -z-10 blur-md pointer-events-none"></div>
                <div className="text-center">
                  <h4 className="font-pixel text-xl text-retro-red mb-2 tracking-wider">BASE</h4>
                  <p className="text-slate-300 font-bold">{profile.location || "Earth"}</p>
                </div>
              </motion.div>

            </div>
          </motion.div>
        </motion.section>
      </div>
    </div>
  );
}
