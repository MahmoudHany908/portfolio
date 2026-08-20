import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Gamepad2, Code, Box, Braces, Star, Wrench, Brain, GitBranch, Users } from 'lucide-react';
import VideoGallery from './VideoGallery';
import portfolioData from '../../data/portfolioData.json';

const GithubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
);

const UnityIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.923 11.23l6.54-3.832v7.665l-6.54-3.833zM11.077 11.23l-6.54-3.832v7.665l6.54-3.833zM12 12.827l-6.54 3.832 6.54 3.833 6.54-3.833-6.54-3.832zM12 1.5l-6.54 3.833 6.54 3.832 6.54-3.832L12 1.5z"/>
  </svg>
);

const getSkillIcon = (skillName) => {
  const s = skillName.toLowerCase();
  if (s.includes('unity')) return <UnityIcon />;
  if (s.includes('unreal')) return <div className="font-bold font-sans text-xs flex items-center justify-center rounded-full bg-white text-black w-4 h-4">U</div>;
  if (s.includes('git')) return <GithubIcon />;
  if (s.includes('c#') || s.includes('c++') || s.includes('gl') || s.includes('sfml')) return <Code size={16} />;
  if (s.includes('xr') || s.includes('ar ') || s.includes('meta')) return <Box size={16} />;
  if (s.includes('programming') || s.includes('structures') || s.includes('patterns')) return <Braces size={16} />;
  return <Star size={16} />;
};

const getCategoryIcon = (category) => {
  if (category.includes('Engine')) return <Gamepad2 size={20} className="text-retro-light-blue" />;
  if (category.includes('Tools')) return <Wrench size={20} className="text-retro-orange" />;
  if (category.includes('Core')) return <Brain size={20} className="text-retro-purple" />;
  if (category.includes('Version')) return <GitBranch size={20} className="text-retro-red" />;
  if (category.includes('Personal')) return <Users size={20} className="text-retro-green" />;
  return <Star size={20} />;
};

export default function ModalOverlay({ node, onClose }) {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <AnimatePresence>
      {node && (
        <>
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 z-40 pointer-events-auto"
            onClick={onClose}
          />
          
          {/* Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="absolute top-0 right-0 w-full md:w-[600px] h-full bg-retro-dark border-l-8 border-retro-gray p-8 z-50 overflow-y-auto pointer-events-auto shadow-2xl"
          >
            <button 
              onClick={onClose} 
              className="absolute top-6 right-6 text-retro-text hover:text-retro-red transition-colors"
            >
              <X size={28} />
            </button>
            
            <div className="pixel-box mb-8 mt-4 flex items-center gap-6">
              {node.type === 'about' && (
                <img 
                  src="/profile.jpg" 
                  alt="Profile" 
                  className="w-32 h-32 object-cover pixel-border border-2 border-retro-dark hidden sm:block shrink-0"
                />
              )}
              <div>
                <div className="flex items-center gap-3 mb-2 flex-wrap">
                  <h2 className="text-lg md:text-xl text-retro-yellow leading-loose m-0">{node.title}</h2>
                  {node.client && (
                    <span className="bg-retro-green/20 text-retro-light-green border border-retro-green px-2 py-0.5 text-[10px] font-pixel tracking-wider">
                      Client: {node.client}
                    </span>
                  )}
                </div>
                {node.role && <h3 className="text-xs text-retro-light-blue font-pixel leading-loose m-0">{node.role}</h3>}
              </div>
            </div>

            <div className="font-sans text-retro-text space-y-6 leading-relaxed">
              {node.type === 'about' && (
                <div className="space-y-4">
                  <p className="text-lg border-l-4 border-retro-blue pl-4 text-slate-300">
                    Passionate Game Developer dedicated to blending technical execution with narrative vision to craft immersive experiences. A collaborative problem-solver skilled in thoughtful level design and rapid prototyping, seeking to build high-quality game systems in a professional studio.
                  </p>
                </div>
              )}
              
              {node.type === 'skills' && (
                <div className="space-y-6 pl-4 border-l-4 border-retro-gray relative mt-8">
                  {Object.entries(portfolioData.profile.skills).map(([category, skills]) => (
                    <div key={category} className="relative">
                      {/* Tree Branch line */}
                      <div className="absolute -left-4 top-4 w-4 h-1 bg-retro-gray" />
                      
                      <div className="bg-retro-dark border-2 border-retro-gray p-4 shadow-xl">
                        <h3 className="font-pixel text-[12px] text-retro-yellow mb-4 flex items-center gap-3">
                           {getCategoryIcon(category)} {category}
                        </h3>
                        <div className="flex flex-wrap gap-3">
                          {skills.map(skill => (
                            <div key={skill} className="flex items-center gap-2 bg-retro-purple/20 border border-retro-purple/50 px-3 py-2 text-sm text-retro-text hover:bg-retro-purple/60 transition-colors shadow-sm">
                              <span className="text-retro-light-blue">{getSkillIcon(skill)}</span>
                              <span>{skill}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {node.type === 'contact' && (
                <div className="space-y-6">
                  <p className="text-retro-yellow mb-4">You have reached a save point! Want to connect?</p>
                  <div className="bg-retro-dark p-6 pixel-border flex flex-col gap-4 text-lg">
                    <p><span className="text-retro-green font-pixel text-xs block mb-1">EMAIL</span> mazroabuss4@gmail.com</p>
                    <p><span className="text-retro-green font-pixel text-xs block mb-1">PHONE</span> +20 101 9334 442</p>
                    <p><span className="text-retro-green font-pixel text-xs block mb-1">LOCATION</span> Saray El-Kobba, Cairo, Egypt</p>
                  </div>
                  <div className="flex gap-4 pt-4 border-t border-retro-gray/50">
                    <a href="https://www.linkedin.com/in/mahmoud-mazroa" target="_blank" rel="noreferrer" className="pixel-btn bg-retro-blue flex gap-2 items-center"><Users size={16} /> LINKEDIN</a>
                    <a href="https://github.com/MahmoudHany908" target="_blank" rel="noreferrer" className="pixel-btn bg-retro-blue flex gap-2 items-center"><GithubIcon /> GITHUB</a>
                  </div>
                </div>
              )}

              {node.summary && node.type !== 'about' && node.type !== 'contact' && node.type !== 'skills' && (
                <div className="space-y-6">
                  <VideoGallery singleVideo={node.video} videos={node.videos} />
                  <p className="text-lg border-l-4 border-retro-blue pl-4 text-slate-300">{node.summary}</p>
                  
                  {node.keyContributions && (
                    <div className="mt-6">
                      <h4 className="font-pixel text-[12px] text-retro-yellow mb-4">Key Contributions</h4>
                      <ul className="list-none space-y-2">
                        {node.keyContributions.map((contrib, i) => (
                          <li key={i} className="flex gap-3 text-slate-300 text-sm md:text-base leading-relaxed">
                            <span className="text-retro-light-green mt-1 shrink-0">►</span>
                            <span>{contrib}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
              
              {node.tech && (
                <div>
                  <h4 className="font-pixel text-[10px] text-retro-green mb-4 mt-8">TECH STACK</h4>
                  <div className="flex flex-wrap gap-2">
                    {node.tech.map(t => (
                      <span key={t} className="bg-retro-purple px-3 py-1 text-sm border border-retro-blue font-medium">{t}</span>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              {(node.githubLink || node.itchLink) && (
                <div className="flex gap-4 pt-8 mt-8 border-t border-retro-gray/50">
                  {node.githubLink && (
                    <a href={node.githubLink} target="_blank" rel="noreferrer" className="pixel-btn bg-retro-blue flex gap-2 items-center">
                      <GithubIcon /> REPOSITORY
                    </a>
                  )}
                  {node.itchLink && (
                    <a href={node.itchLink} target="_blank" rel="noreferrer" className="pixel-btn bg-retro-red flex gap-2 items-center">
                      <Gamepad2 size={16} /> PLAY DEMO
                    </a>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
