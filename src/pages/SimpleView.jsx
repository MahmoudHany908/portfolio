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

export default function SimpleView() {
  const { profile, education, internships, nodes } = portfolioData;
  const projects = nodes.filter(n => n.type === 'project');

  return (
    <div className="min-h-screen bg-retro-dark text-retro-text font-sans relative">
      <RetroParticles />
      
      {/* Sticky Navigation */}
      <nav className="sticky top-0 z-50 bg-retro-dark/95 backdrop-blur-md border-b-4 border-retro-gray shadow-[0_10px_30px_-10px_rgba(0,0,0,0.8)] py-3 px-4 md:px-8">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex gap-4 md:gap-8 overflow-x-auto no-scrollbar items-center">
            <a href="#about" className="font-pixel text-xs md:text-sm text-retro-light-blue hover:text-white transition-colors whitespace-nowrap">ABOUT</a>
            <a href="#skills" className="font-pixel text-xs md:text-sm text-retro-light-blue hover:text-white transition-colors whitespace-nowrap">SKILLS</a>
            <a href="#projects" className="font-pixel text-xs md:text-sm text-retro-light-blue hover:text-white transition-colors whitespace-nowrap">PROJECTS</a>
            <a href="#contact" className="font-pixel text-xs md:text-sm text-retro-light-blue hover:text-white transition-colors whitespace-nowrap">CONTACT</a>
          </div>
          <Link to="/" className="pixel-btn bg-retro-red text-center shrink-0 hover:scale-105 transition-transform text-xs md:text-sm px-3 py-2 hidden md:block">
            RETURN TO MAP
          </Link>
        </div>
      </nav>

      <div className="px-4 md:px-8 py-8 max-w-6xl mx-auto space-y-12 md:space-y-16 pb-20 relative z-10">
        
        <motion.header 
          initial="hidden" animate="visible" variants={fadeUpVariant}
          className="flex flex-col md:flex-row justify-between items-start md:items-start gap-6 border-b-4 border-retro-gray pb-8 pt-8"
        >
          <div className="flex flex-col md:flex-row items-start md:items-start gap-6 group w-full">
            <div className="relative shrink-0">
              <div className="absolute inset-0 bg-retro-yellow transform translate-x-2 translate-y-2 group-hover:translate-x-4 group-hover:translate-y-4 transition-transform duration-300"></div>
              <img 
                src="/profile.jpg" 
                alt="Mahmoud Hany" 
                className="relative w-32 h-32 md:w-56 md:h-56 object-cover pixel-border border-4 border-retro-dark shadow-xl z-10 filter grayscale group-hover:grayscale-0 transition-all duration-500"
              />
            </div>
            <div className="w-full mt-4 md:mt-0 flex-1 flex flex-col justify-between h-full min-h-[14rem]">
              <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                <div>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-pixel text-retro-yellow mb-4 leading-tight group-hover:text-retro-light-green transition-colors">{profile.name}</h1>
                  <h2 className="text-xl text-retro-light-blue font-pixel mb-6">{profile.role}</h2>
                </div>
                <Link to="/" className="pixel-btn bg-retro-red text-center shrink-0 hover:scale-105 transition-transform drop-shadow-[4px_4px_0_rgba(0,0,0,0.5)] md:hidden">
                  MAP
                </Link>
              </div>
              
              {/* Retro Big Contact Buttons */}
              <div className="w-full mt-auto pt-4">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full">
                  <a href={`mailto:${profile.email}`} className="pixel-btn bg-retro-blue text-white hover:bg-white hover:text-retro-dark transition-colors px-2 py-3 md:py-4 text-xs md:text-sm shadow-md flex justify-center items-center gap-2">
                    <MailIcon /> EMAIL
                  </a>
                  <a href={profile.links.linkedin} target="_blank" rel="noreferrer" className="pixel-btn bg-retro-blue text-white hover:bg-white hover:text-retro-dark transition-colors px-2 py-3 md:py-4 text-xs md:text-sm shadow-md flex justify-center items-center gap-2">
                    <LinkedinIcon /> LINKEDIN
                  </a>
                  <a href={profile.links.github} target="_blank" rel="noreferrer" className="pixel-btn bg-retro-blue text-white hover:bg-white hover:text-retro-dark transition-colors px-2 py-3 md:py-4 text-xs md:text-sm shadow-md flex justify-center items-center gap-2">
                    <GithubIcon /> GITHUB
                  </a>
                  <a href="https://itch.io/profile/nightfuryexe" target="_blank" rel="noreferrer" className="pixel-btn bg-retro-blue text-white hover:bg-white hover:text-retro-dark transition-colors px-2 py-3 md:py-4 text-xs md:text-sm shadow-md flex justify-center items-center gap-2">
                    <GamepadIcon /> ITCH.IO
                  </a>
                </div>
                <a href="/Mahmoud_Hany_CV.pdf" download className="pixel-btn bg-retro-yellow text-retro-dark hover:bg-white transition-colors px-4 py-3 md:py-4 text-sm md:text-lg shadow-md drop-shadow-[4px_4px_0_rgba(244,180,27,0.3)] w-full flex justify-center items-center gap-3 mt-4 font-bold tracking-widest">
                  <DownloadIcon /> DOWNLOAD CV
                </a>
              </div>
            </div>
          </div>
        </motion.header>

        <motion.section id="about" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUpVariant} className="scroll-mt-24">
          <h3 className="font-pixel text-2xl text-retro-green mb-6 border-l-8 border-retro-green pl-4">About</h3>
          <p className="text-lg text-slate-300 leading-relaxed max-w-3xl mb-8 hover:text-white transition-colors duration-300">
            {profile.summary}
          </p>
          
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div whileHover={{ y: -5, scale: 1.02 }} className="pixel-box group transition-all duration-300 hover:border-retro-yellow hover:shadow-[8px_8px_0_rgba(244,180,27,0.3)]">
              <h4 className="font-pixel text-sm text-retro-yellow mb-4 group-hover:animate-pulse">Education</h4>
              {education.map(edu => (
                <div key={edu.id} className="mb-4">
                  <div className="font-bold text-white">{edu.degree}</div>
                  <div className="text-retro-light-blue text-sm">{edu.institution} • {edu.date}</div>
                </div>
              ))}
            </motion.div>
            <motion.div whileHover={{ y: -5, scale: 1.02 }} className="pixel-box group transition-all duration-300 hover:border-retro-light-green hover:shadow-[8px_8px_0_rgba(131,235,114,0.3)]">
              <h4 className="font-pixel text-sm text-retro-yellow mb-4 group-hover:animate-pulse">Experience</h4>
              {internships.map(int => (
                <div key={int.id} className="mb-4">
                  <div className="font-bold text-white">{int.title}</div>
                  <div className="text-retro-light-green text-sm">{int.institution} • {int.date}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        <motion.section id="skills" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUpVariant} className="scroll-mt-24">
          <h3 className="font-pixel text-2xl text-retro-green mb-6 border-l-8 border-retro-green pl-4">Technical Arsenal</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(profile.skills).map(([category, items], idx) => (
              <motion.div 
                key={category} 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="mb-4 bg-retro-dark p-4 pixel-border border-2 border-retro-gray hover:border-retro-blue transition-colors"
              >
                <h4 className="text-retro-light-blue font-bold mb-3 uppercase tracking-widest">{category.replace('_', ' ')}</h4>
                <div className="flex flex-wrap gap-3">
                  {items.map(item => (
                    <span key={item} className="bg-retro-purple hover:bg-retro-yellow hover:text-retro-dark hover:-translate-y-1 transition-all duration-300 px-3 py-1 text-sm border border-retro-blue font-bold cursor-default shadow-sm">
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section id="projects" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUpVariant} className="scroll-mt-24">
          <h3 className="font-pixel text-2xl text-retro-green mb-6 border-l-8 border-retro-green pl-4">Projects</h3>
          <div className="space-y-8">
            {projects.map((proj, idx) => (
              <motion.div 
                key={proj.id} 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, type: "spring", bounce: 0.3 }}
                whileHover={{ scale: 1.02, x: 10 }}
                className="pixel-box bg-retro-dark border-4 border-retro-purple p-6 transition-all duration-300 hover:border-retro-light-blue hover:shadow-[12px_12px_0_rgba(86,156,235,0.4)] group"
              >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
                  <div>
                    <h4 className="font-pixel text-xl text-retro-yellow mb-2 group-hover:text-white transition-colors">{proj.title}</h4>
                    <div className="text-retro-light-blue text-sm uppercase tracking-wider">{proj.role}</div>
                  </div>
                  {proj.githubLink && (
                    <a href={proj.githubLink} target="_blank" rel="noreferrer" className="flex gap-2 items-center text-slate-300 hover:text-retro-dark hover:bg-retro-light-blue bg-retro-blue px-4 py-2 border-2 border-retro-light-blue transition-all duration-300 font-bold drop-shadow-md hover:drop-shadow-none hover:translate-y-1">
                      <GithubIcon /> SOURCE CODE
                    </a>
                  )}
                </div>
                
                <VideoGallery singleVideo={proj.video} videos={proj.videos} />
                
                <p className="text-slate-300 mb-6 leading-relaxed group-hover:text-white transition-colors">{proj.summary}</p>
                
                <div className="flex flex-wrap gap-2">
                  {proj.tech.map(t => (
                    <span key={t} className="bg-retro-gray px-2 py-1 text-xs border border-white/20 text-white shadow-sm">{t}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section id="contact" 
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpVariant}
          className="border-t-4 border-retro-gray pt-8 flex flex-col md:flex-row justify-between items-center gap-6 scroll-mt-24"
        >
          <div className="text-center md:text-left">
            <div className="text-xl font-bold hover:text-retro-yellow transition-colors cursor-pointer">{profile.email}</div>
            <div className="text-retro-light-blue mt-1">{profile.phone}</div>
          </div>
          <div className="flex gap-6">
            <a href={profile.links.linkedin} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-retro-light-blue hover:scale-125 transition-all drop-shadow-lg">
              <LinkedinIcon />
            </a>
            <a href={profile.links.github} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-retro-light-blue hover:scale-125 transition-all drop-shadow-lg">
              <GithubIcon />
            </a>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
