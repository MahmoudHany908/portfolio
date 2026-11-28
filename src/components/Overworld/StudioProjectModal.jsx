import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Gamepad2,
  Code,
  Box,
  Braces,
  Star,
  Wrench,
  Brain,
  GitBranch,
  Users,
  Trophy,
  ArrowLeft,
  ArrowRight,
  FileDown,
  Briefcase,
  GraduationCap,
  Globe
} from 'lucide-react';
import VideoGallery from '../UI/VideoGallery';
import portfolioData from '../../data/portfolioData.json';
import useGameAudio from '../../hooks/useGameAudio';
import { GAME_SPRITES, hubOfNode } from './GamePixelIcons';
import { shortGameName } from './CampHubMarker';

const GithubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const VimeoIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.977 6.416c-.105 2.338-1.739 5.543-4.894 9.609-3.268 4.247-6.026 6.37-8.29 6.37-1.409 0-2.578-1.294-3.553-3.881L5.322 11.4C4.603 8.816 3.834 7.522 3.01 7.522c-.179 0-.806.378-1.881 1.132L0 7.197c1.185-1.044 2.351-2.084 3.501-3.128C5.123 2.601 6.34 1.83 7.147 1.745c1.932-.178 3.123 1.134 3.555 3.937.523 3.393.888 5.508 1.094 6.353.626 2.87 1.304 4.307 2.032 4.307.558 0 1.238-.891 2.037-2.67.799-1.78 1.235-3.134 1.305-4.07.139-1.564-.452-2.345-1.777-2.345-.626 0-1.27.145-1.933.433 1.288-4.225 3.755-6.275 7.4-6.149 2.709.096 3.987 1.815 3.835 5.155z" />
  </svg>
);

const getCategoryIcon = (category) => {
  if (category.includes('Language')) return <Code size={18} className="text-[#facc15]" />;
  if (category.includes('Engine')) return <Gamepad2 size={18} className="text-[#38bdf8]" />;
  if (category.includes('Tools')) return <Wrench size={18} className="text-[#fb923c]" />;
  if (category.includes('Core')) return <Braces size={18} className="text-[#c084fc]" />;
  if (category.includes('Design')) return <Brain size={18} className="text-[#facc15]" />;
  if (category.includes('Version')) return <GitBranch size={18} className="text-[#f87171]" />;
  if (category.includes('Personal')) return <Users size={18} className="text-[#4ade80]" />;
  return <Box size={18} className="text-[#38bdf8]" />;
};

/**
 * Unified 16-bit Arcade Showcase Modal for Single Checkpoints & Category Projects.
 * Matches CategoryStageModal visually (zero grey right-drawer clash!) and supports
 * seamless Prev / Next Stage flipping inside multi-project categories.
 */
export default function StudioProjectModal({
  node,
  discovered,
  onClose,
  onNavigateSibling
}) {
  const { playSelect } = useGameAudio();

  const parentHub = node ? hubOfNode(node.id) : null;
  const accent = parentHub?.accent || '#38bdf8';
  const siblings = parentHub && !parentHub.isSingle ? parentHub.children : [];
  const stageIdx = siblings.findIndex((s) => s.id === node?.id);
  const prevStage = stageIdx > 0 ? siblings[stageIdx - 1] : null;
  const nextStage = stageIdx >= 0 && stageIdx < siblings.length - 1 ? siblings[stageIdx + 1] : null;

  useEffect(() => {
    if (!node) return;
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight' && nextStage && onNavigateSibling) {
        playSelect();
        onNavigateSibling(nextStage);
      }
      if (e.key === 'ArrowLeft' && prevStage && onNavigateSibling) {
        playSelect();
        onNavigateSibling(prevStage);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [node, prevStage, nextStage, onClose, onNavigateSibling, playSelect]);

  if (!node) return null;

  const sprite = GAME_SPRITES[node.id];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[60] flex items-center justify-center p-3 sm:p-6 md:p-8">
        {/* Crisp Single Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/82 backdrop-blur-xs"
        />

        {/* Centered Arcade Showcase Frame */}
        <motion.div
          key={node.id}
          initial={{ opacity: 0, scale: 0.94, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ type: 'spring', stiffness: 330, damping: 25 }}
          className="relative z-10 w-full max-w-4xl max-h-[92dvh] flex flex-col bg-[#0b0f1c] border-4 shadow-[14px_14px_0_rgba(0,0,0,0.95)] overflow-hidden"
          style={{ borderColor: accent }}
        >
          {/* Sticky Arcade Top Header */}
          <div className="shrink-0 bg-[#12182b] border-b-4 border-slate-800 px-5 md:px-7 py-4 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4 min-w-0">
              {node.type === 'about' ? (
                <img
                  src="/profile.jpg"
                  alt="Mahmoud Hany"
                  className="w-16 h-16 md:w-20 md:h-20 object-cover object-[50%_10%] border-[3px] border-[#facc15] shadow-[4px_4px_0_#000] shrink-0"
                />
              ) : (
                <div
                  className="w-14 h-14 md:w-16 md:h-16 shrink-0 bg-[#090d19] border-[3px] p-2 flex items-center justify-center shadow-[4px_4px_0_#000]"
                  style={{ borderColor: accent }}
                >
                  <img src={sprite} alt="" className="w-full h-full" style={{ imageRendering: 'pixelated' }} />
                </div>
              )}

              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span
                    className="font-pixel text-[9px] md:text-[10px] px-2 py-0.5 border border-black text-black font-bold"
                    style={{ backgroundColor: accent }}
                  >
                    {parentHub && !parentHub.isSingle
                      ? `${parentHub.title.toUpperCase()} · STAGE 0${stageIdx + 1}/${siblings.length}`
                      : parentHub?.room || 'CHECKPOINT'}
                  </span>
                  {discovered?.has(node.id) && (
                    <span className="font-pixel text-[9px] px-2 py-0.5 bg-amber-400 text-black border border-black">
                      ★ CLEARED
                    </span>
                  )}
                </div>
                <h2 className="font-pixel text-base md:text-xl text-white leading-snug">
                  {node.type === 'about'
                    ? portfolioData.profile.name
                    : node.type === 'skills'
                      ? 'Technical Arsenal & Skills'
                      : node.type === 'contact'
                        ? 'Contact & Download CV'
                        : node.title}
                </h2>
                {node.role && (
                  <p className="font-pixel text-[10px] md:text-xs mt-1" style={{ color: accent }}>
                    {node.role}
                  </p>
                )}
              </div>
            </div>

            <button
              onClick={() => {
                playSelect();
                onClose();
              }}
              className="px-3.5 py-2 bg-rose-600 hover:bg-rose-500 border-2 border-black font-pixel text-[10px] md:text-xs text-white flex items-center gap-1.5 shadow-[4px_4px_0_#000] cursor-pointer shrink-0"
            >
              <X size={15} /> {siblings.length > 0 ? 'DONE / STAGES' : 'CLOSE'}
            </button>
          </div>

          {/* Scrollable Body */}
          <div className="flex-1 overflow-y-auto p-5 md:p-7 space-y-6 text-slate-200">
            {/* ── ABOUT ME + EXPERIENCE + EDUCATION ── */}
            {node.type === 'about' && (
              <div className="space-y-6">
                <p className="font-chakra text-base md:text-lg border-l-4 border-[#f87171] pl-4 text-slate-200 leading-relaxed">
                  {portfolioData.profile.summary}
                </p>

                {/* Studio & Industry Experience */}
                <div>
                  <h3 className="font-pixel text-xs text-[#facc15] mb-3 flex items-center gap-2">
                    <Briefcase size={16} /> INDUSTRY EXPERIENCE
                  </h3>
                  <div className="grid gap-3">
                    {portfolioData.internships.map((job) => (
                      <div
                        key={job.id}
                        className="bg-[#12192d] border-2 border-slate-700 p-4 shadow-[4px_4px_0_#000]"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                          <span className="font-pixel text-xs text-white">{job.title}</span>
                          <span className="font-chakra text-xs text-amber-300 font-bold">{job.date}</span>
                        </div>
                        <div className="font-chakra text-xs font-bold text-[#38bdf8] mb-2">{job.institution}</div>
                        {job.description && (
                          <p className="font-chakra text-sm text-slate-300 leading-relaxed">{job.description}</p>
                        )}
                        {job.bullets && (
                          <ul className="space-y-1.5 mt-1">
                            {job.bullets.map((b, idx) => (
                              <li key={idx} className="font-chakra text-sm text-slate-300 flex items-start gap-2">
                                <span className="text-[#facc15] mt-0.5">▸</span>
                                <span>{b}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Education & Languages */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-[#12192d] border-2 border-slate-700 p-4 shadow-[4px_4px_0_#000]">
                    <h4 className="font-pixel text-[11px] text-[#38bdf8] mb-3 flex items-center gap-2">
                      <GraduationCap size={16} /> EDUCATION
                    </h4>
                    <div className="space-y-3">
                      {portfolioData.education.map((ed) => (
                        <div key={ed.id} className="border-l-2 border-[#38bdf8] pl-3">
                          <div className="font-chakra text-sm font-bold text-white">{ed.degree}</div>
                          <div className="font-chakra text-xs text-slate-400">{ed.institution}</div>
                          <div className="font-chakra text-xs text-amber-300 mt-0.5">
                            {ed.date} {ed.gpa ? `· GPA ${ed.gpa}` : ''}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-[#12192d] border-2 border-slate-700 p-4 shadow-[4px_4px_0_#000] flex flex-col justify-between">
                    <div>
                      <h4 className="font-pixel text-[11px] text-[#4ade80] mb-3 flex items-center gap-2">
                        <Globe size={16} /> SPOKEN LANGUAGES
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {portfolioData.profile.languages.map((lang) => (
                          <span
                            key={lang}
                            className="font-chakra text-xs bg-[#090d19] border border-emerald-500/40 px-3 py-1.5 text-emerald-200 font-semibold"
                          >
                            {lang}
                          </span>
                        ))}
                      </div>
                    </div>

                    <a
                      href="/Mahmoud_Hany_CV.pdf"
                      target="_blank"
                      rel="noreferrer"
                      className="mt-4 py-2.5 px-4 bg-[#facc15] hover:bg-yellow-300 text-black border-2 border-black font-pixel text-xs flex items-center justify-center gap-2 shadow-[4px_4px_0_#000]"
                    >
                      <FileDown size={16} /> DOWNLOAD FULL CV (PDF)
                    </a>
                  </div>
                </div>
              </div>
            )}

            {/* ── TECHNICAL ARSENAL / SKILLS ── */}
            {node.type === 'skills' && (
              <div className="grid md:grid-cols-2 gap-4">
                {Object.entries(portfolioData.profile.skills).map(([category, skills]) => (
                  <div
                    key={category}
                    className="bg-[#12192d] border-2 border-slate-700 p-4 shadow-[4px_4px_0_#000]"
                  >
                    <h3 className="font-pixel text-[11px] text-[#facc15] mb-3 flex items-center gap-2">
                      {getCategoryIcon(category)} {category}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {skills.map((skill) => (
                        <span
                          key={skill}
                          className="font-chakra text-xs bg-[#090d19] border border-sky-400/35 px-3 py-1.5 text-white font-semibold"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* ── CONTACT & CV ── */}
            {node.type === 'contact' && (
              <div className="space-y-6">
                <div className="grid sm:grid-cols-3 gap-4">
                  <a
                    href={`mailto:${portfolioData.profile.email}`}
                    className="bg-[#12192d] hover:bg-[#19233f] border-2 border-emerald-400/60 p-4 shadow-[4px_4px_0_#000] block"
                  >
                    <span className="font-pixel text-[10px] text-[#4ade80] block mb-1.5">EMAIL</span>
                    <span className="font-chakra text-sm text-white break-all">{portfolioData.profile.email}</span>
                  </a>
                  <a
                    href={`tel:${portfolioData.profile.phone.replace(/\s+/g, '')}`}
                    className="bg-[#12192d] hover:bg-[#19233f] border-2 border-sky-400/60 p-4 shadow-[4px_4px_0_#000] block"
                  >
                    <span className="font-pixel text-[10px] text-[#38bdf8] block mb-1.5">PHONE / WHATSAPP</span>
                    <span className="font-chakra text-sm text-white">{portfolioData.profile.phone}</span>
                  </a>
                  <div className="bg-[#12192d] border-2 border-amber-400/60 p-4 shadow-[4px_4px_0_#000]">
                    <span className="font-pixel text-[10px] text-[#facc15] block mb-1.5">LOCATION</span>
                    <span className="font-chakra text-sm text-white font-semibold">{portfolioData.profile.location}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 pt-2">
                  <a
                    href="/Mahmoud_Hany_CV.pdf"
                    target="_blank"
                    rel="noreferrer"
                    className="px-5 py-3 bg-[#facc15] hover:bg-yellow-300 text-black border-2 border-black font-pixel text-xs flex items-center gap-2 shadow-[4px_4px_0_#000]"
                  >
                    <FileDown size={16} /> DOWNLOAD CV (PDF)
                  </a>
                  <a
                    href={portfolioData.profile.links.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="px-5 py-3 bg-[#2563eb] hover:bg-[#3b82f6] text-white border-2 border-black font-pixel text-xs flex items-center gap-2 shadow-[4px_4px_0_#000]"
                  >
                    <Users size={16} /> LINKEDIN
                  </a>
                  <a
                    href={portfolioData.profile.links.github}
                    target="_blank"
                    rel="noreferrer"
                    className="px-5 py-3 bg-[#1e293b] hover:bg-[#334155] text-white border-2 border-black font-pixel text-xs flex items-center gap-2 shadow-[4px_4px_0_#000]"
                  >
                    <GithubIcon /> GITHUB
                  </a>
                </div>
              </div>
            )}

            {/* ── PROJECT SHOWCASE ── */}
            {node.summary && node.type === 'project' && (
              <div className="space-y-6">
                <VideoGallery singleVideo={node.video} videos={node.videos} image={node.image} />

                {/* Client / Graduation / Jam Highlight Callouts */}
                {(node.client || node.gradInfo || node.jam) && (
                  <div className="grid sm:grid-cols-2 gap-3">
                    {node.client && (
                      <div className="flex items-center gap-3.5 bg-[#12192d] border-l-4 border-[#4ade80] p-3.5 shadow-[4px_4px_0_#000]">
                        {node.clientLogo && (
                          <div className="w-11 h-11 shrink-0 bg-white/10 p-1.5 flex items-center justify-center border border-white/15">
                            <img src={node.clientLogo} alt={node.client} className="w-full h-full object-contain" />
                          </div>
                        )}
                        <div>
                          <div className="font-pixel text-[9px] text-[#4ade80] uppercase mb-1">Commissioned By</div>
                          <div className="font-pixel text-xs text-white">{node.client}</div>
                        </div>
                      </div>
                    )}

                    {node.gradInfo && (
                      <div className="flex items-center gap-3.5 bg-[#12192d] border-l-4 border-[#facc15] p-3.5 shadow-[4px_4px_0_#000]">
                        {node.gradInfo.logos && (
                          <div className="flex gap-1.5 shrink-0">
                            {node.gradInfo.logos.map((logo, i) => (
                              <div key={i} className="w-10 h-10 bg-white p-1 flex items-center justify-center">
                                <img src={logo.src} alt={logo.alt} className="w-full h-full object-contain" />
                              </div>
                            ))}
                          </div>
                        )}
                        <div>
                          <div className="font-pixel text-[9px] text-[#facc15] uppercase mb-1">
                            {node.gradInfo.title}
                          </div>
                          <div className="font-chakra text-xs font-bold text-white">{node.gradInfo.text}</div>
                        </div>
                      </div>
                    )}

                    {node.jam && (
                      <div className="flex items-center gap-3.5 bg-[#12192d] border-l-4 border-[#fb923c] p-3.5 shadow-[4px_4px_0_#000] sm:col-span-2">
                        <Trophy size={22} className="text-[#facc15] shrink-0" />
                        <div>
                          <div className="font-pixel text-[10px] text-[#fb923c] uppercase">{node.jam}</div>
                          {node.award && (
                            <div className="font-pixel text-xs text-[#4ade80] mt-1">★ {node.award}</div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Summary */}
                <p className="font-chakra text-base md:text-lg border-l-4 pl-4 text-slate-200 leading-relaxed" style={{ borderColor: accent }}>
                  {node.summary}
                </p>

                {/* Key Contributions */}
                {node.keyContributions?.length > 0 && (
                  <div>
                    <h4 className="font-pixel text-[10px] text-[#facc15] uppercase tracking-widest mb-3">
                      Key Engineering &amp; Design Contributions
                    </h4>
                    <ul className="space-y-2.5 bg-[#12192d] border-2 border-slate-800 p-4">
                      {node.keyContributions.map((kc, i) => (
                        <li key={i} className="font-chakra text-sm md:text-base text-slate-200 leading-relaxed flex items-start gap-2.5">
                          <span className="text-[#facc15] shrink-0 mt-0.5">▸</span>
                          <span>{kc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Tech Stack */}
                {node.tech?.length > 0 && (
                  <div>
                    <h4 className="font-pixel text-[10px] text-[#4ade80] uppercase tracking-widest mb-2.5">
                      Tech Stack
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {node.tech.map((t) => (
                        <span
                          key={t}
                          className="font-chakra text-xs bg-[#090d19] border-2 border-slate-600 px-3 py-1 text-white font-bold"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* External Links */}
                {(node.githubLink || node.itchLink || node.jamLink || node.vimeoLinks) && (
                  <div className="flex flex-wrap gap-3 pt-4 border-t-2 border-slate-800">
                    {node.itchLink && (
                      <a
                        href={node.itchLink}
                        target="_blank"
                        rel="noreferrer"
                        className="px-4 py-2.5 bg-rose-600 hover:bg-rose-500 text-white border-2 border-black font-pixel text-xs flex items-center gap-2 shadow-[4px_4px_0_#000]"
                      >
                        <Gamepad2 size={16} /> PLAY ON ITCH.IO
                      </a>
                    )}
                    {node.githubLink && (
                      <a
                        href={node.githubLink}
                        target="_blank"
                        rel="noreferrer"
                        className="px-4 py-2.5 bg-sky-600 hover:bg-sky-500 text-white border-2 border-black font-pixel text-xs flex items-center gap-2 shadow-[4px_4px_0_#000]"
                      >
                        <GithubIcon /> GITHUB REPO
                      </a>
                    )}
                    {node.jamLink && (
                      <a
                        href={node.jamLink}
                        target="_blank"
                        rel="noreferrer"
                        className="px-4 py-2.5 bg-[#facc15] hover:bg-yellow-300 text-black border-2 border-black font-pixel text-xs flex items-center gap-2 shadow-[4px_4px_0_#000]"
                      >
                        <Trophy size={16} /> JAM SUBMISSION
                      </a>
                    )}
                    {node.vimeoLinks?.map((v, i) => (
                      <a
                        key={i}
                        href={v.url}
                        target="_blank"
                        rel="noreferrer"
                        className="px-4 py-2.5 bg-[#1ab7ea] hover:bg-sky-300 hover:text-black text-white border-2 border-black font-pixel text-xs flex items-center gap-2 shadow-[4px_4px_0_#000]"
                      >
                        <VimeoIcon /> {v.title}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Sticky Stage-Switcher Footer for Multi-Project Categories */}
          {siblings.length > 0 && (
            <div className="shrink-0 bg-[#12182b] border-t-4 border-slate-800 px-4 md:px-7 py-3 flex flex-wrap items-center justify-between gap-2">
              <button
                onClick={() => {
                  playSelect();
                  onClose();
                }}
                className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 border-2 border-slate-500 font-pixel text-[10px] text-white flex items-center gap-1.5 cursor-pointer"
              >
                <ArrowLeft size={14} /> ALL {siblings.length} STAGES
              </button>

              <div className="flex items-center gap-2">
                {prevStage && (
                  <button
                    onClick={() => {
                      playSelect();
                      onNavigateSibling(prevStage);
                    }}
                    className="px-3 py-2 bg-[#090d19] hover:bg-slate-800 border-2 border-slate-600 font-pixel text-[10px] text-slate-200 flex items-center gap-1.5 cursor-pointer"
                  >
                    <ArrowLeft size={13} /> {shortGameName(prevStage)}
                  </button>
                )}

                {nextStage ? (
                  <button
                    onClick={() => {
                      playSelect();
                      onNavigateSibling(nextStage);
                    }}
                    className="px-4 py-2 border-2 border-black font-pixel text-[10px] text-black font-bold flex items-center gap-1.5 shadow-[3px_3px_0_#000] cursor-pointer"
                    style={{ backgroundColor: accent }}
                  >
                    NEXT: {shortGameName(nextStage)} <ArrowRight size={13} />
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      playSelect();
                      onClose();
                    }}
                    className="px-4 py-2 bg-[#facc15] hover:bg-yellow-300 border-2 border-black font-pixel text-[10px] text-black font-bold flex items-center gap-1.5 shadow-[3px_3px_0_#000] cursor-pointer"
                  >
                    <Star size={13} /> FINISH STAGE
                  </button>
                )}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
