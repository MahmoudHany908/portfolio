import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import VideoGallery from '../components/UI/VideoGallery';
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

const ProjectCard = ({ proj, idx, gradInfo }) => (
  <motion.div 
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay: idx * 0.1, type: "spring", bounce: 0.3 }}
    whileHover={{ scale: 1.02, x: 8 }}
    className="pixel-box bg-retro-dark border-[6px] border-retro-purple p-8 md:p-12 transition-all duration-300 hover:border-retro-light-blue hover:shadow-[14px_14px_0_rgba(86,156,235,0.4)] group"
  >
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-5">
      <div>
        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-3">
          <h4 className="font-pixel text-xl md:text-2xl text-retro-yellow group-hover:text-white transition-colors">{proj.title}</h4>
        </div>
        <div className="text-retro-light-blue text-base uppercase tracking-wider">{proj.role}</div>
      </div>
      <div className="flex flex-wrap gap-3 md:gap-4 items-center justify-start md:justify-end">
        {gradInfo && (
          <div className="group/badge flex items-center bg-retro-dark border-4 border-retro-yellow h-[48px] md:h-[56px] overflow-hidden transition-all duration-300 max-w-[80px] md:max-w-[96px] hover:max-w-[400px] hover:px-4 cursor-default shadow-[4px_4px_0_rgba(0,0,0,0.5)] shrink-0">
            <div className="flex items-center gap-2 shrink-0 px-2 h-full">
              {gradInfo.logos && gradInfo.logos.map((logo, i) => (
                <div key={i} className="w-8 h-8 md:w-10 md:h-10 bg-white rounded-sm p-1 flex items-center justify-center shadow-inner">
                  <img src={logo.src} alt={logo.alt} className="max-w-full max-h-full object-contain" />
                </div>
              ))}
            </div>
            <div className="flex flex-col justify-center ml-2 whitespace-nowrap opacity-0 group-hover/badge:opacity-100 transition-opacity duration-300 delay-75">
              <span className="font-pixel text-[8px] md:text-[10px] text-retro-yellow tracking-wider uppercase">{gradInfo.title || "Graduation Project"}</span>
              <span className="font-pixel text-xs md:text-sm text-white tracking-widest mt-1">{gradInfo.text}</span>
            </div>
          </div>
        )}
        
        {proj.client && proj.clientLogo && (
          <div className="group/badge flex items-center bg-retro-dark border-4 border-retro-green h-[48px] md:h-[56px] overflow-hidden transition-all duration-300 max-w-[48px] md:max-w-[56px] hover:max-w-[350px] hover:px-4 cursor-default shadow-[4px_4px_0_rgba(0,0,0,0.5)] shrink-0">
            <div className="w-[40px] h-[40px] md:w-[48px] md:h-[48px] shrink-0 bg-white rounded-sm p-1 flex items-center justify-center -ml-1">
              <img src={proj.clientLogo} alt={proj.client} className="max-w-full max-h-full object-contain" />
            </div>
            <div className="flex flex-col justify-center ml-3 whitespace-nowrap opacity-0 group-hover/badge:opacity-100 transition-opacity duration-300 delay-75">
              <span className="font-pixel text-[8px] md:text-[10px] text-retro-light-green tracking-wider uppercase">Commissioned By</span>
              <span className="font-pixel text-xs md:text-sm text-white tracking-widest mt-1">{proj.client}</span>
            </div>
          </div>
        )}

        {proj.githubLink && (
          <a href={proj.githubLink} target="_blank" rel="noreferrer" className="pixel-btn bg-retro-blue flex gap-2 items-center self-start px-4 py-2.5 md:px-6 md:py-3 text-sm md:text-lg shadow-[4px_4px_0_rgba(0,0,0,0.5)] h-[48px] md:h-[56px]">
            <GithubIcon /> REPOSITORY
          </a>
        )}
        {proj.itchLink && (
          <a href={proj.itchLink} target="_blank" rel="noreferrer" className="pixel-btn bg-retro-red flex gap-2 items-center self-start px-4 py-2.5 md:px-6 md:py-3 text-sm md:text-lg shadow-[4px_4px_0_rgba(0,0,0,0.5)] h-[48px] md:h-[56px]">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="6" y1="12" x2="10" y2="12"></line><line x1="8" y1="10" x2="8" y2="14"></line><line x1="15" y1="13" x2="15.01" y2="13"></line><line x1="18" y1="11" x2="18.01" y2="11"></line><path d="M17.32 5H6.68a4 4 0 0 0-3.978 3.59c-.006.052-.01.101-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 0 1 9.828 16h4.344a2 2 0 0 1 1.414.586L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.545-.604-6.584-.685-7.258-.007-.05-.011-.1-.017-.151A4 4 0 0 0 17.32 5z"></path></svg> PLAY
          </a>
        )}
      </div>
    </div>
    
    <div className="mb-8">
      <VideoGallery singleVideo={proj.video} videos={proj.videos} />
    </div>
    
    <p className="text-xl md:text-2xl text-slate-300 mb-8 leading-loose group-hover:text-white transition-colors">{proj.summary}</p>
    
    {proj.keyContributions && (
      <div className="mb-8">
        <h5 className="font-pixel text-base md:text-lg text-retro-yellow mb-5">Key Contributions</h5>
        <ul className="space-y-4">
          {proj.keyContributions.map((contrib, i) => (
            <li key={i} className="flex gap-5 text-slate-300 text-lg md:text-xl leading-loose group-hover:text-white transition-colors">
              <span className="text-retro-light-green shrink-0 mt-2">►</span>
              <span>{contrib}</span>
            </li>
          ))}
        </ul>
      </div>
    )}
    
    <div className="flex flex-wrap gap-3">
      {proj.tech.map(t => (
        <span key={t} className="bg-retro-gray px-3 py-1.5 text-xs md:text-sm border-2 border-white/20 text-white shadow-sm font-bold">{t}</span>
      ))}
    </div>
  </motion.div>
);

const InteractiveContact = ({ profile }) => {
  const [isHovered, setIsHovered] = React.useState(false);
  
  return (
    <div className="flex flex-col items-center justify-center relative py-20 min-h-[500px] w-full">
      <div 
        className="relative z-20 cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setIsHovered(!isHovered)}
      >
        <div className={`w-40 h-40 md:w-48 md:h-48 rounded-full border-8 ${isHovered ? 'border-retro-yellow shadow-[0_0_40px_rgba(244,180,27,0.6)]' : 'border-retro-light-blue shadow-[0_0_20px_rgba(86,156,235,0.5)]'} bg-retro-dark flex items-center justify-center overflow-hidden transition-all duration-300 transform ${isHovered ? 'scale-110' : 'scale-100'}`}>
          <svg width="128" height="128" viewBox="0 0 16 16" overflow="visible" className={`transform scale-[3] transition-transform duration-300 ${isHovered ? '-translate-y-2' : ''}`}>
             {/* Small Red Plume */}
            <rect x="7" y="0" width="2" height="1" fill="#d95763" />
            <rect x="8" y="1" width="3" height="2" fill="#d95763" />
            {/* Silver Helmet */}
            <rect x="5" y="2" width="6" height="2" fill="#a4a5a1" />
            <rect x="4" y="4" width="8" height="4" fill="#daddd8" />
            {/* Visor slit (T shape) */}
            <rect x="5" y="5" width="6" height="1" fill="#1a1c2c" />
            <rect x="7" y="6" width="2" height="2" fill="#1a1c2c" />
            <rect x="8" y="5" width="1" height="1" fill={isHovered ? "#f4b41b" : "#83eb72"} /> {/* Glowing Eye changes color */}
            {/* Silver Body Armor */}
            <rect x="5" y="8" width="6" height="4" fill="#a4a5a1" />
            {/* Belt & Trim */}
            <rect x="5" y="11" width="6" height="1" fill="#3b5dc9" />
            <rect x="7" y="10" width="2" height="2" fill="#f4b41b" />
            {/* Arms & Shoulders */}
            <rect x="3" y="8" width="2" height="3" fill="#a4a5a1" />
            <rect x="11" y="8" width="2" height="3" fill="#a4a5a1" />
            <rect x="2" y="10" width="1" height="2" fill="#1a1c2c" />
            <rect x="13" y="10" width="1" height="2" fill="#1a1c2c" />
            {/* Legs */}
            <rect x="5" y="12" width="2" height="3" fill="#a4a5a1" />
            <rect x="9" y="12" width="2" height="3" fill="#a4a5a1" />
            <rect x="5" y="15" width="2" height="1" fill="#1a1c2c" />
            <rect x="9" y="15" width="2" height="1" fill="#1a1c2c" />
          </svg>
        </div>
        <div className={`absolute -bottom-8 left-1/2 -translate-x-1/2 font-pixel text-lg whitespace-nowrap transition-colors duration-300 ${isHovered ? 'text-retro-yellow drop-shadow-[0_0_5px_rgba(244,180,27,0.8)]' : 'text-retro-light-blue'}`}>
          {isHovered ? "LET'S BUILD SOMETHING!" : "Virtual Mahmoud"}
        </div>
      </div>
      
      {/* Central Dialogue box when NOT hovered */}
      <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-[90%] max-w-lg border-2 border-retro-light-blue p-6 bg-retro-dark/90 backdrop-blur-sm transition-all duration-300 z-10 ${isHovered ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'}`}>
         <p className="text-retro-light-blue text-center text-lg md:text-xl leading-relaxed">
            Hey 👋 I'm Virtual Mahmoud. Hover or tap me to see my contact links!
         </p>
         <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-0 h-0 border-x-[12px] border-x-transparent border-t-[16px] border-t-retro-light-blue"></div>
      </div>

      {/* Floating Action Buttons */}
      <div className={`absolute inset-0 pointer-events-none flex items-center justify-center transition-all duration-500 z-30 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
        
        {/* Email */}
        <a href={`mailto:${profile.email}`} className={`absolute transition-all duration-500 delay-75 hover:scale-110 pointer-events-auto ${isHovered ? 'translate-y-[-160px] md:translate-y-[-180px]' : 'translate-y-0'} pixel-btn bg-retro-blue px-4 py-3 flex gap-2 items-center text-sm md:text-base`}>
          <MailIcon /> EMAIL
        </a>
        
        {/* LinkedIn */}
        <a href={profile.links.linkedin} target="_blank" rel="noreferrer" className={`absolute transition-all duration-500 delay-100 hover:scale-110 pointer-events-auto ${isHovered ? 'translate-x-[130px] translate-y-[-90px] md:translate-x-[180px] md:translate-y-[-100px]' : 'translate-x-0 translate-y-0'} pixel-btn bg-retro-blue px-4 py-3 flex gap-2 items-center text-sm md:text-base`}>
          <LinkedinIcon /> LINKEDIN
        </a>
        
        {/* GitHub */}
        <a href={profile.links.github} target="_blank" rel="noreferrer" className={`absolute transition-all duration-500 delay-150 hover:scale-110 pointer-events-auto ${isHovered ? 'translate-x-[-130px] translate-y-[-90px] md:translate-x-[-180px] md:translate-y-[-100px]' : 'translate-x-0 translate-y-0'} pixel-btn bg-retro-blue px-4 py-3 flex gap-2 items-center text-sm md:text-base`}>
          <GithubIcon /> GITHUB
        </a>
        
        {/* Itch */}
        <a href="https://itch.io/profile/nightfuryexe" target="_blank" rel="noreferrer" className={`absolute transition-all duration-500 delay-200 hover:scale-110 pointer-events-auto ${isHovered ? 'translate-x-[130px] translate-y-[90px] md:translate-x-[180px] md:translate-y-[100px]' : 'translate-x-0 translate-y-0'} pixel-btn bg-retro-blue px-4 py-3 flex gap-2 items-center text-sm md:text-base`}>
          <GamepadIcon /> ITCH.IO
        </a>
        
        {/* Resume */}
        <a href="/Mahmoud_Hany_CV.pdf" download className={`absolute transition-all duration-500 delay-300 hover:scale-110 pointer-events-auto ${isHovered ? 'translate-y-[160px] md:translate-y-[180px]' : 'translate-y-0'} pixel-btn bg-retro-yellow text-retro-dark hover:text-retro-dark px-5 py-3 flex gap-2 items-center font-bold text-sm md:text-base shadow-[0_0_15px_rgba(244,180,27,0.5)]`}>
          <DownloadIcon /> DOWNLOAD CV
        </a>
      </div>
      
    </div>
  )
}

export default function SimpleView() {
  const { profile, education, internships, nodes } = portfolioData;
  const projects = nodes.filter(n => n.type === 'project');

  const cyberSalvage = projects.find(n => n.id === 'proj2');
  const learningLens = projects.find(n => n.id === 'proj1');
  const normalProjects = projects.filter(n => n.id !== 'proj2' && n.id !== 'proj1');

  return (
    <div className="min-h-screen bg-retro-dark text-retro-text font-sans relative">
      <RetroParticles />
      
      {/* Sticky Navigation */}
      <nav className="sticky top-0 z-50 bg-retro-dark/95 backdrop-blur-md border-b-4 border-retro-gray shadow-[0_10px_30px_-10px_rgba(0,0,0,0.8)] py-3 px-4 md:px-8">
        <div className="max-w-screen-2xl mx-auto flex justify-between items-center w-full px-2 lg:px-8">
          <div className="flex gap-4 md:gap-8 overflow-x-auto no-scrollbar items-center">
            <a href="#about" className="font-pixel text-xs md:text-sm text-retro-light-blue hover:text-white transition-colors whitespace-nowrap flex items-center gap-2">
              <UserIcon /> ABOUT
            </a>
            <a href="#skills" className="font-pixel text-xs md:text-sm text-retro-light-blue hover:text-white transition-colors whitespace-nowrap flex items-center gap-2">
              <WrenchIcon /> SKILLS
            </a>
            <a href="#projects" className="font-pixel text-xs md:text-sm text-retro-light-blue hover:text-white transition-colors whitespace-nowrap flex items-center gap-2">
              <FolderIcon /> PROJECTS
            </a>
            <a href="#contact" className="font-pixel text-xs md:text-sm text-retro-light-blue hover:text-white transition-colors whitespace-nowrap flex items-center gap-2">
              <PhoneIcon /> CONTACT
            </a>
          </div>
          <Link to="/" className="pixel-btn bg-retro-red text-center shrink-0 hover:scale-105 transition-transform text-xs md:text-sm px-3 py-2 hidden md:block">
            RETURN TO MAP
          </Link>
        </div>
      </nav>

      <div className="px-6 md:px-12 lg:px-20 py-12 max-w-screen-2xl mx-auto w-full space-y-24 md:space-y-32 pb-32 relative z-10">
        
        <motion.header 
          initial="hidden" animate="visible" variants={fadeUpVariant}
          className="flex flex-col md:flex-row justify-between items-start md:items-start gap-8 border-b-6 border-retro-gray pb-12 pt-8"
        >
          <div className="flex flex-col md:flex-row items-start md:items-start gap-8 group w-full">
            <div className="relative shrink-0">
              <div className="absolute inset-0 bg-retro-yellow transform translate-x-3 translate-y-3 group-hover:translate-x-5 group-hover:translate-y-5 transition-transform duration-300"></div>
              <img 
                src="/profile.jpg" 
                alt="Mahmoud Hany" 
                className="relative w-36 h-36 md:w-56 md:h-56 object-cover pixel-border border-6 border-retro-dark shadow-xl z-10 filter grayscale group-hover:grayscale-0 transition-all duration-500"
              />
            </div>
            <div className="w-full mt-4 md:mt-0 flex-1 flex flex-col justify-between h-full min-h-[14rem]">
              <div className="flex flex-col md:flex-row justify-between items-start gap-5">
                <div>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-pixel text-retro-yellow mb-5 leading-tight group-hover:text-retro-light-green transition-colors">{profile.name}</h1>
                  <h2 className="text-xl md:text-2xl text-retro-light-blue font-pixel mb-6">{profile.role}</h2>
                </div>
                <Link to="/" className="pixel-btn bg-retro-red text-center shrink-0 hover:scale-105 transition-transform drop-shadow-[5px_5px_0_rgba(0,0,0,0.5)] md:hidden text-base px-5 py-3">
                  MAP
                </Link>
              </div>
              
              {/* Retro Big Contact Buttons */}
              <div className="w-full mt-auto pt-4">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 w-full">
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
                <a href="/Mahmoud_Hany_CV.pdf" download className="pixel-btn bg-retro-yellow text-retro-dark hover:bg-white transition-colors px-5 py-4 md:py-5 text-base md:text-lg shadow-md drop-shadow-[5px_5px_0_rgba(244,180,27,0.3)] w-full flex justify-center items-center gap-3 mt-5 font-bold tracking-widest">
                  <DownloadIcon /> DOWNLOAD CV
                </a>
              </div>
            </div>
          </div>
        </motion.header>

        <motion.section id="about" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUpVariant} className="scroll-mt-28">
          <h3 className="font-pixel text-2xl md:text-3xl text-retro-green mb-8 border-l-8 border-retro-green pl-5 py-2 bg-retro-dark/50 shadow-sm">About</h3>
          <p className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-4xl mb-12 hover:text-white transition-colors duration-300">
            {profile.summary}
          </p>
          
          <div className="grid md:grid-cols-2 gap-10">
            <motion.div whileHover={{ y: -6, scale: 1.02 }} className="pixel-box group transition-all duration-300 hover:border-retro-yellow hover:shadow-[10px_10px_0_rgba(244,180,27,0.3)] p-6">
              <h4 className="font-pixel text-base md:text-lg text-retro-yellow mb-6 group-hover:animate-pulse">Education</h4>
              {education.map(edu => (
                <div key={edu.id} className="mb-6 last:mb-0">
                  <div className="font-bold text-white text-lg md:text-xl mb-1">{edu.degree}</div>
                  <div className="text-retro-light-blue text-base">{edu.institution} • {edu.date}</div>
                </div>
              ))}
            </motion.div>
            <motion.div whileHover={{ y: -6, scale: 1.02 }} className="pixel-box group transition-all duration-300 hover:border-retro-light-green hover:shadow-[10px_10px_0_rgba(131,235,114,0.3)] p-6">
              <h4 className="font-pixel text-base md:text-lg text-retro-yellow mb-6 group-hover:animate-pulse">Experience</h4>
              {internships.map(int => (
                <div key={int.id} className="mb-6 last:mb-0">
                  <div className="font-bold text-white text-lg md:text-xl mb-1">{int.title}</div>
                  <div className="text-retro-light-green text-base mb-2">{int.institution} • {int.date}</div>
                  {int.description && <div className="text-slate-300 text-sm md:text-base leading-relaxed">{int.description}</div>}
                </div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        <motion.section id="skills" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUpVariant} className="scroll-mt-28">
          <h3 className="font-pixel text-2xl md:text-3xl text-retro-green mb-8 border-l-8 border-retro-green pl-5 py-2 bg-retro-dark/50 shadow-sm">Technical Arsenal</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {Object.entries(profile.skills).map(([category, items], idx) => (
              <motion.div 
                key={category} 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-retro-dark p-6 pixel-border border-4 border-retro-gray hover:border-retro-blue transition-colors"
              >
                <h4 className="text-retro-light-blue font-bold text-lg mb-5 uppercase tracking-widest">{category.replace('_', ' ')}</h4>
                <div className="flex flex-wrap gap-3">
                  {items.map(item => (
                    <span key={item} className="bg-retro-purple hover:bg-retro-yellow hover:text-retro-dark hover:-translate-y-1 transition-all duration-300 px-3 py-2 text-sm md:text-base border-2 border-retro-blue font-bold cursor-default shadow-sm">
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section id="grad-projects" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUpVariant} className="scroll-mt-28 mb-24">
          <h3 className="font-pixel text-2xl md:text-3xl text-retro-green mb-12 border-l-8 border-retro-green pl-5 py-2 bg-retro-dark/50 shadow-sm">Graduation Projects</h3>
          <div className="space-y-24">
            {cyberSalvage && (
              <ProjectCard 
                proj={cyberSalvage} 
                idx={0}
                gradInfo={{
                  title: "9-Month Program Graduation Project",
                  text: "Information Technology Institute (ITI)",
                  logos: [{ src: "/iti-logo.png", alt: "ITI" }]
                }}
              />
            )}
            {learningLens && (
              <ProjectCard 
                proj={learningLens} 
                idx={1}
                gradInfo={{
                  title: "Bachelor's Graduation Project",
                  text: "Ain Shams University & University of East London (UEL)",
                  logos: [
                    { src: "/ainshams-logo.png", alt: "Ain Shams" },
                    { src: "/uel-logo.png", alt: "UEL" }
                  ]
                }}
              />
            )}
          </div>
        </motion.section>

        <motion.section id="projects" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUpVariant} className="scroll-mt-28">
          <h3 className="font-pixel text-2xl md:text-3xl text-retro-green mb-12 border-l-8 border-retro-green pl-5 py-2 bg-retro-dark/50 shadow-sm">Projects</h3>
          <div className="space-y-24">
            {normalProjects.map((proj, idx) => (
              <ProjectCard key={proj.id} proj={proj} idx={idx} />
            ))}
          </div>
        </motion.section>

        <motion.section id="contact" 
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpVariant}
          className="pt-16 mt-32 scroll-mt-28"
        >
          <div className="flex flex-col gap-12 lg:gap-16 items-center">
            <h3 className="font-pixel text-3xl md:text-4xl text-retro-light-blue drop-shadow-[0_0_10px_rgba(86,156,235,0.6)] tracking-widest uppercase text-center">
              Let's Connect
            </h3>
            
            <InteractiveContact profile={profile} />
          </div>

          <div className="mt-32 pt-10 border-t-[4px] border-retro-light-green flex flex-col items-center justify-center pb-10 shadow-[0_-15px_30px_-15px_rgba(131,235,114,0.3)] gap-4">
            <p className="font-pixel text-retro-light-green text-lg md:text-xl drop-shadow-[0_0_12px_rgba(131,235,114,0.8)] leading-relaxed text-center px-4">
              “Why shouldn't people be able to teleport wherever they want?”
            </p>
            <p className="text-retro-light-blue text-sm md:text-base tracking-widest uppercase font-bold text-center">
              — Palmer Luckey, Founder of Oculus VR
            </p>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
