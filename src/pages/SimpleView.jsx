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

const sectionFocusVariant = {
  hidden: { opacity: 0.15, filter: 'blur(4px)', scale: 0.95 },
  visible: { opacity: 1, filter: 'blur(0px)', scale: 1, transition: { duration: 0.8, ease: "easeOut", staggerChildren: 0.3 } }
};

const ProjectCard = ({ proj, idx, gradInfo }) => (
  <motion.div 
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ duration: 0.8 }}
    className="w-full xl:h-[85vh] flex flex-col xl:flex-row pixel-box bg-retro-dark border-[6px] border-retro-purple group overflow-hidden shadow-2xl"
  >
    {/* Left Column: Media & Actions */}
    <div className="w-full xl:w-1/2 shrink-0 bg-black/40 flex flex-col justify-center border-b-[6px] xl:border-b-0 xl:border-r-[6px] border-retro-purple relative p-6 md:p-8 lg:p-12">
      <VideoGallery singleVideo={proj.video} videos={proj.videos} />
      
      <div className="flex flex-wrap gap-4 mt-8 justify-center">
        {proj.githubLink && (
          <a href={proj.githubLink} target="_blank" rel="noreferrer" className="pixel-btn bg-retro-blue flex gap-2 items-center px-6 py-4 text-sm md:text-base shadow-[4px_4px_0_rgba(0,0,0,0.5)]">
            <GithubIcon /> REPO
          </a>
        )}
        {proj.itchLink && (
          <a href={proj.itchLink} target="_blank" rel="noreferrer" className="pixel-btn bg-retro-red flex gap-2 items-center px-6 py-4 text-sm md:text-base shadow-[4px_4px_0_rgba(0,0,0,0.5)]">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="6" y1="12" x2="10" y2="12"></line><line x1="8" y1="10" x2="8" y2="14"></line><line x1="15" y1="13" x2="15.01" y2="13"></line><line x1="18" y1="11" x2="18.01" y2="11"></line><path d="M17.32 5H6.68a4 4 0 0 0-3.978 3.59c-.006.052-.01.101-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 0 1 9.828 16h4.344a2 2 0 0 1 1.414.586L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.545-.604-6.584-.685-7.258-.007-.05-.011-.1-.017-.151A4 4 0 0 0 17.32 5z"></path></svg> PLAY
          </a>
        )}
      </div>
    </div>

    {/* Right Column: Details & Tech */}
    <div className="flex-1 flex flex-col p-6 md:p-8 lg:p-12 overflow-y-auto no-scrollbar justify-between">
      <div>
        <div className="flex flex-col mb-6 gap-3 border-b-[4px] border-retro-gray/30 pb-4">
          <h4 className="font-pixel text-2xl md:text-3xl lg:text-4xl text-retro-yellow group-hover:text-white transition-colors leading-tight">{proj.title}</h4>
          <div className="text-retro-light-blue text-sm md:text-base uppercase tracking-widest font-bold">{proj.role}</div>
        </div>
        
        {gradInfo && (
          <div className="flex flex-col xl:flex-row items-start xl:items-center gap-6 bg-retro-dark/80 border-l-4 border-retro-yellow p-4 mb-8 shadow-lg">
            {gradInfo.logos && (
              <div className="flex flex-wrap gap-2 shrink-0">
                {gradInfo.logos.map((logo, i) => (
                  <div key={i} className="w-12 h-12 shrink-0 bg-white rounded p-1 flex items-center justify-center border border-white/10 shadow-sm">
                    <img src={logo.src} alt={logo.alt} className="w-full h-full object-contain" />
                  </div>
                ))}
              </div>
            )}
            <div className="flex-1">
              <h5 className="font-pixel text-[10px] text-retro-yellow tracking-[0.2em] mb-1 uppercase opacity-90">{gradInfo.title || "Graduation Project"}</h5>
              <h3 className="font-pixel text-sm md:text-base text-white tracking-wide leading-relaxed">{gradInfo.text}</h3>
            </div>
          </div>
        )}

        {proj.client && (
          <div className="flex flex-col xl:flex-row items-start xl:items-center gap-6 bg-retro-dark/80 border-l-4 border-retro-green p-4 mb-8 shadow-lg">
            {proj.clientLogo && (
              <div className="w-12 h-12 shrink-0 bg-white/5 rounded p-1 flex items-center justify-center border border-white/10">
                <img src={proj.clientLogo} alt={proj.client} className="w-full h-full object-contain drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]" />
              </div>
            )}
            <div className="flex-1">
              <h5 className="font-pixel text-[10px] text-retro-light-green tracking-[0.2em] mb-1 uppercase opacity-80">Commissioned By</h5>
              <h3 className="font-pixel text-sm md:text-base text-white tracking-widest">{proj.client}</h3>
            </div>
          </div>
        )}
        
        <p className="text-base md:text-lg text-slate-300 mb-8 leading-relaxed group-hover:text-white transition-colors">{proj.summary}</p>
        
        {proj.keyContributions && (
          <div className="mb-8">
            <h5 className="font-pixel text-sm md:text-base text-retro-yellow mb-4">Key Contributions</h5>
            <ul className="space-y-3">
              {proj.keyContributions.map((contrib, i) => (
                <li key={i} className="flex gap-4 text-slate-300 text-sm md:text-base leading-relaxed group-hover:text-white transition-colors">
                  <span className="text-retro-light-green shrink-0 mt-1 text-sm">►</span>
                  <span>{contrib}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      
      <div className="flex flex-wrap justify-start w-full gap-2 mt-4 pt-6 border-t-[4px] border-retro-gray/30 group/tech shrink-0">
        {proj.tech.map(t => (
          <span 
            key={t} 
            title={`Click or hover to learn how ${t} was utilized (data needed)`}
            className="bg-retro-gray px-3 py-1 text-xs md:text-sm border-2 border-white/20 text-white shadow-sm font-bold text-center transition-all duration-300 hover:-translate-y-1 hover:border-retro-yellow hover:text-retro-yellow hover:bg-retro-dark cursor-help"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  </motion.div>
);

export default function SimpleView() {
  const { profile, education, internships, nodes } = portfolioData;
  const projects = nodes.filter(n => n.type === 'project');

  const gradProjects = projects.filter(n => n.isGraduationProject);
  const normalProjects = projects.filter(n => !n.isGraduationProject);

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

      <div className="w-full pb-32 relative z-10 overflow-x-hidden">
        
        <motion.header 
          initial="hidden" animate="visible" variants={fadeUpVariant}
          className="max-w-5xl mx-auto px-4 md:px-8 lg:px-12 pt-16 flex flex-col md:flex-row justify-between items-start md:items-start gap-8 border-b-6 border-retro-gray pb-12"
        >
          <div className="flex flex-col md:flex-row items-start md:items-start gap-8 group w-full">
            <div className="relative shrink-0">
              <div className="absolute inset-0 bg-retro-yellow transform translate-x-3 translate-y-3 group-hover:translate-x-5 group-hover:translate-y-5 transition-transform duration-300"></div>
              <img 
                src="/profile.jpg" 
                alt="Mahmoud Hany" 
                className="relative w-28 h-28 md:w-40 md:h-40 object-cover object-[50%_10%] scale-[1.05] pixel-border border-6 border-retro-dark shadow-xl z-10 filter grayscale group-hover:grayscale-0 transition-all duration-500"
              />
            </div>
            <div className="w-full mt-4 md:mt-0 flex-1 flex flex-col justify-between h-full min-h-[12rem]">
              <div className="flex flex-col md:flex-row justify-between items-start gap-5">
                <div>
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-pixel text-retro-yellow mb-4 leading-tight group-hover:text-retro-light-green transition-colors">{profile.name}</h1>
                  <h2 className="text-lg md:text-xl text-retro-light-blue font-pixel mb-4">{profile.role}</h2>
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

        <motion.section id="about" initial="hidden" whileInView="visible" viewport={{ margin: "-25% 0px -25% 0px" }} variants={sectionFocusVariant} className="max-w-5xl mx-auto px-4 md:px-8 lg:px-12 pt-32 scroll-mt-28">
          <h3 className="font-pixel text-3xl md:text-4xl text-retro-green mb-12 text-center pb-4 border-b-4 border-retro-gray border-dashed">About</h3>
          <p className="text-base md:text-lg text-slate-300 leading-relaxed max-w-3xl mx-auto text-center mb-12 hover:text-white transition-colors duration-300">
            {profile.summary}
          </p>
          
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-20">
            {/* Education Stack */}
            <div>
              <h4 className="font-pixel text-xl md:text-2xl text-retro-yellow mb-8 flex items-center gap-4"><span className="text-3xl">🎓</span> Education</h4>
              <div className="flex flex-col relative pt-4">
                {education.map((edu, i) => (
                  <motion.div 
                    key={edu.id} 
                    className={`pixel-box bg-retro-dark border-[6px] border-retro-gray p-6 md:p-8 relative z-${10 - i} ${i > 0 ? '-mt-8' : ''} transition-all duration-500 hover:z-20 hover:border-retro-yellow hover:translate-x-8 hover:-translate-y-2 hover:shadow-[16px_16px_0_rgba(244,180,27,0.4)] group`}
                  >
                    <div className="font-pixel text-lg md:text-xl text-white mb-3 group-hover:text-retro-yellow transition-colors">{edu.degree}</div>
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
                    className={`pixel-box bg-retro-dark border-[6px] border-retro-gray p-6 md:p-8 relative z-${10 - i} ${i > 0 ? '-mt-8' : ''} transition-all duration-500 hover:z-20 hover:border-retro-light-green hover:translate-x-8 hover:-translate-y-2 hover:shadow-[16px_16px_0_rgba(131,235,114,0.4)] group`}
                  >
                    <div className="font-pixel text-lg md:text-xl text-white mb-3 group-hover:text-retro-light-green transition-colors">{int.title}</div>
                    <div className="text-retro-light-green text-lg mb-2 font-bold">{int.institution}</div>
                    <div className="text-slate-400 text-sm font-pixel tracking-widest mb-4">{int.date}</div>
                    {int.description && (
                      <div className="text-slate-300 text-base leading-relaxed opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-40 group-hover:mt-4 transition-all duration-500 overflow-hidden">
                        {int.description}
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section id="skills" initial="hidden" whileInView="visible" viewport={{ margin: "-25% 0px -25% 0px" }} variants={sectionFocusVariant} className="max-w-5xl mx-auto px-4 md:px-8 lg:px-12 pt-32 scroll-mt-28">
          <h3 className="font-pixel text-3xl md:text-4xl text-retro-green mb-12 text-center pb-4 border-b-4 border-retro-gray border-dashed">Technical Arsenal</h3>
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

        <motion.section id="grad-projects" initial="hidden" whileInView="visible" viewport={{ margin: "-25% 0px -25% 0px" }} variants={sectionFocusVariant} className="w-full pt-32 scroll-mt-28 bg-retro-dark">
          <h3 className="font-pixel text-3xl md:text-4xl text-retro-green mb-16 text-center pb-4 border-b-4 border-retro-gray border-dashed max-w-7xl mx-auto px-4">Graduation Projects</h3>
          <div className="max-w-7xl mx-auto px-4 flex flex-col gap-32">
            {gradProjects.map((proj, idx) => (
              <ProjectCard 
                key={proj.id}
                proj={proj} 
                idx={idx}
                gradInfo={proj.gradInfo}
              />
            ))}
          </div>
        </motion.section>

        <motion.section id="projects" initial="hidden" whileInView="visible" viewport={{ margin: "-25% 0px -25% 0px" }} variants={sectionFocusVariant} className="w-full pt-32 scroll-mt-28 bg-retro-dark">
          <h3 className="font-pixel text-3xl md:text-4xl text-retro-green mb-16 text-center pb-4 border-b-4 border-retro-gray border-dashed max-w-7xl mx-auto px-4">Projects</h3>
          <div className="max-w-7xl mx-auto px-4 flex flex-col gap-32">
            {normalProjects.map((proj, idx) => (
              <ProjectCard key={proj.id} proj={proj} idx={idx} />
            ))}
          </div>
        </motion.section>

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
            <p className="font-pixel text-retro-light-green text-xl md:text-3xl drop-shadow-[0_0_15px_rgba(131,235,114,0.8)] leading-loose text-center px-4 max-w-4xl">
              “Why shouldn't people be able to teleport wherever they want?”
            </p>
            <p className="text-retro-light-blue text-base md:text-lg tracking-widest uppercase font-bold text-center">
              — Palmer Luckey, Founder of Oculus VR
            </p>
          </motion.div>

          {/* 2. Teleport Bubble / Let's Connect */}
          <motion.div 
            variants={{
              hidden: { opacity: 0, scale: 0.5, filter: "blur(10px)" },
              visible: { opacity: 1, scale: 1, filter: "blur(0px)", transition: { type: "spring", bounce: 0.5, duration: 1, staggerChildren: 0.2, delayChildren: 0.4 } }
            }}
            className="w-full max-w-5xl border-[8px] border-retro-light-blue bg-retro-dark p-12 md:p-20 relative shadow-[0_0_50px_rgba(86,156,235,0.4)]"
          >
            {/* Teleportation aesthetic layers */}
            <div className="absolute inset-0 bg-gradient-to-t from-retro-light-blue/20 to-transparent pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-full h-3 bg-retro-light-blue animate-pulse"></div>

            <div className="relative z-10 text-center mb-16">
              <h3 className="font-pixel text-4xl md:text-5xl text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.8)] tracking-widest uppercase mb-6">
                Teleport to Me
              </h3>
              <p className="text-retro-light-blue text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-bold">
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
                <div className="w-24 h-24 rounded-full border-[6px] border-retro-yellow bg-retro-dark flex items-center justify-center text-white group-hover:bg-retro-yellow group-hover:text-retro-dark transition-all duration-300 shadow-[0_0_30px_rgba(244,180,27,0.5)] group-hover:shadow-[0_0_50px_rgba(244,180,27,0.8)] relative overflow-hidden z-10">
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
                <div className="w-24 h-24 rounded-full border-[6px] border-retro-light-green bg-retro-dark flex items-center justify-center text-white group-hover:bg-retro-light-green group-hover:text-retro-dark transition-all duration-300 shadow-[0_0_30px_rgba(131,235,114,0.5)] group-hover:shadow-[0_0_50px_rgba(131,235,114,0.8)] relative overflow-hidden z-10">
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
                <div className="w-24 h-24 rounded-full border-[6px] border-retro-red bg-retro-dark flex items-center justify-center text-white group-hover:bg-retro-red group-hover:text-white transition-all duration-300 shadow-[0_0_30px_rgba(217,87,99,0.5)] group-hover:shadow-[0_0_50px_rgba(217,87,99,0.8)] relative overflow-hidden z-10">
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
