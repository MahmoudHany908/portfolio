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

      <div className="px-4 md:px-8 py-16 max-w-6xl mx-auto space-y-32 md:space-y-48 pb-40 relative z-10">
        
        <motion.header 
          initial="hidden" animate="visible" variants={fadeUpVariant}
          className="flex flex-col md:flex-row justify-between items-start md:items-start gap-10 border-b-8 border-retro-gray pb-16 pt-8"
        >
          <div className="flex flex-col md:flex-row items-start md:items-start gap-10 group w-full">
            <div className="relative shrink-0">
              <div className="absolute inset-0 bg-retro-yellow transform translate-x-4 translate-y-4 group-hover:translate-x-6 group-hover:translate-y-6 transition-transform duration-300"></div>
              <img 
                src="/profile.jpg" 
                alt="Mahmoud Hany" 
                className="relative w-40 h-40 md:w-64 md:h-64 object-cover pixel-border border-8 border-retro-dark shadow-xl z-10 filter grayscale group-hover:grayscale-0 transition-all duration-500"
              />
            </div>
            <div className="w-full mt-6 md:mt-0 flex-1 flex flex-col justify-between h-full min-h-[16rem]">
              <div className="flex flex-col md:flex-row justify-between items-start gap-6">
                <div>
                  <h1 className="text-5xl md:text-6xl lg:text-7xl font-pixel text-retro-yellow mb-6 leading-tight group-hover:text-retro-light-green transition-colors">{profile.name}</h1>
                  <h2 className="text-2xl md:text-3xl text-retro-light-blue font-pixel mb-8">{profile.role}</h2>
                </div>
                <Link to="/" className="pixel-btn bg-retro-red text-center shrink-0 hover:scale-105 transition-transform drop-shadow-[6px_6px_0_rgba(0,0,0,0.5)] md:hidden text-lg px-6 py-4">
                  MAP
                </Link>
              </div>
              
              {/* Retro Big Contact Buttons */}
              <div className="w-full mt-auto pt-6">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 w-full">
                  <a href={`mailto:${profile.email}`} className="pixel-btn bg-retro-blue text-white hover:bg-white hover:text-retro-dark transition-colors px-3 py-4 md:py-5 text-sm md:text-base shadow-md flex justify-center items-center gap-3">
                    <MailIcon /> EMAIL
                  </a>
                  <a href={profile.links.linkedin} target="_blank" rel="noreferrer" className="pixel-btn bg-retro-blue text-white hover:bg-white hover:text-retro-dark transition-colors px-3 py-4 md:py-5 text-sm md:text-base shadow-md flex justify-center items-center gap-3">
                    <LinkedinIcon /> LINKEDIN
                  </a>
                  <a href={profile.links.github} target="_blank" rel="noreferrer" className="pixel-btn bg-retro-blue text-white hover:bg-white hover:text-retro-dark transition-colors px-3 py-4 md:py-5 text-sm md:text-base shadow-md flex justify-center items-center gap-3">
                    <GithubIcon /> GITHUB
                  </a>
                  <a href="https://itch.io/profile/nightfuryexe" target="_blank" rel="noreferrer" className="pixel-btn bg-retro-blue text-white hover:bg-white hover:text-retro-dark transition-colors px-3 py-4 md:py-5 text-sm md:text-base shadow-md flex justify-center items-center gap-3">
                    <GamepadIcon /> ITCH.IO
                  </a>
                </div>
                <a href="/Mahmoud_Hany_CV.pdf" download className="pixel-btn bg-retro-yellow text-retro-dark hover:bg-white transition-colors px-6 py-5 md:py-6 text-lg md:text-xl shadow-md drop-shadow-[6px_6px_0_rgba(244,180,27,0.3)] w-full flex justify-center items-center gap-4 mt-6 font-bold tracking-widest">
                  <DownloadIcon /> DOWNLOAD CV
                </a>
              </div>
            </div>
          </div>
        </motion.header>

        <motion.section id="about" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUpVariant} className="scroll-mt-32">
          <h3 className="font-pixel text-3xl md:text-4xl text-retro-green mb-10 border-l-8 border-retro-green pl-6 py-2 bg-retro-dark/50 shadow-sm">About</h3>
          <p className="text-xl md:text-2xl text-slate-300 leading-loose max-w-4xl mb-16 hover:text-white transition-colors duration-300">
            {profile.summary}
          </p>
          
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div whileHover={{ y: -8, scale: 1.02 }} className="pixel-box group transition-all duration-300 hover:border-retro-yellow hover:shadow-[12px_12px_0_rgba(244,180,27,0.3)] p-8">
              <h4 className="font-pixel text-lg md:text-xl text-retro-yellow mb-8 group-hover:animate-pulse">Education</h4>
              {education.map(edu => (
                <div key={edu.id} className="mb-8 last:mb-0">
                  <div className="font-bold text-white text-xl md:text-2xl mb-2">{edu.degree}</div>
                  <div className="text-retro-light-blue text-lg">{edu.institution} • {edu.date}</div>
                </div>
              ))}
            </motion.div>
            <motion.div whileHover={{ y: -8, scale: 1.02 }} className="pixel-box group transition-all duration-300 hover:border-retro-light-green hover:shadow-[12px_12px_0_rgba(131,235,114,0.3)] p-8">
              <h4 className="font-pixel text-lg md:text-xl text-retro-yellow mb-8 group-hover:animate-pulse">Experience</h4>
              {internships.map(int => (
                <div key={int.id} className="mb-8 last:mb-0">
                  <div className="font-bold text-white text-xl md:text-2xl mb-2">{int.title}</div>
                  <div className="text-retro-light-green text-lg">{int.institution} • {int.date}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        <motion.section id="skills" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUpVariant} className="scroll-mt-32">
          <h3 className="font-pixel text-3xl md:text-4xl text-retro-green mb-10 border-l-8 border-retro-green pl-6 py-2 bg-retro-dark/50 shadow-sm">Technical Arsenal</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {Object.entries(profile.skills).map(([category, items], idx) => (
              <motion.div 
                key={category} 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-retro-dark p-8 pixel-border border-4 border-retro-gray hover:border-retro-blue transition-colors"
              >
                <h4 className="text-retro-light-blue font-bold text-xl mb-6 uppercase tracking-widest">{category.replace('_', ' ')}</h4>
                <div className="flex flex-wrap gap-4">
                  {items.map(item => (
                    <span key={item} className="bg-retro-purple hover:bg-retro-yellow hover:text-retro-dark hover:-translate-y-2 transition-all duration-300 px-4 py-2 text-base md:text-lg border-2 border-retro-blue font-bold cursor-default shadow-md">
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section id="projects" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUpVariant} className="scroll-mt-32">
          <h3 className="font-pixel text-3xl md:text-4xl text-retro-green mb-10 border-l-8 border-retro-green pl-6 py-2 bg-retro-dark/50 shadow-sm">Projects</h3>
          <div className="space-y-16">
            {projects.map((proj, idx) => (
              <motion.div 
                key={proj.id} 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, type: "spring", bounce: 0.3 }}
                whileHover={{ scale: 1.02, x: 10 }}
                className="pixel-box bg-retro-dark border-8 border-retro-purple p-8 md:p-12 transition-all duration-300 hover:border-retro-light-blue hover:shadow-[16px_16px_0_rgba(86,156,235,0.4)] group"
              >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-6">
                  <div>
                    <h4 className="font-pixel text-2xl md:text-3xl text-retro-yellow mb-4 group-hover:text-white transition-colors">{proj.title}</h4>
                    <div className="text-retro-light-blue text-lg uppercase tracking-wider">{proj.role}</div>
                  </div>
                  {proj.githubLink && (
                    <a href={proj.githubLink} target="_blank" rel="noreferrer" className="flex gap-3 items-center text-slate-300 hover:text-retro-dark hover:bg-retro-light-blue bg-retro-blue px-6 py-4 border-4 border-retro-light-blue transition-all duration-300 font-bold drop-shadow-lg hover:drop-shadow-none hover:translate-y-1 text-lg">
                      <GithubIcon /> SOURCE CODE
                    </a>
                  )}
                </div>
                
                <div className="mb-8">
                  <VideoGallery singleVideo={proj.video} videos={proj.videos} />
                </div>
                
                <p className="text-xl text-slate-300 mb-10 leading-loose group-hover:text-white transition-colors">{proj.summary}</p>
                
                <div className="flex flex-wrap gap-4">
                  {proj.tech.map(t => (
                    <span key={t} className="bg-retro-gray px-4 py-2 text-sm md:text-base border-2 border-white/20 text-white shadow-md font-bold">{t}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section id="contact" 
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpVariant}
          className="border-t-8 border-retro-gray pt-16 mt-32 flex flex-col md:flex-row justify-between items-center gap-10 scroll-mt-32"
        >
          <div className="text-center md:text-left">
            <div className="text-3xl font-bold hover:text-retro-yellow transition-colors cursor-pointer mb-4">{profile.email}</div>
            <div className="text-retro-light-blue text-xl">{profile.phone}</div>
          </div>
          <div className="flex gap-10">
            <a href={profile.links.linkedin} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-retro-light-blue hover:scale-125 transition-all drop-shadow-xl transform">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
            </a>
            <a href={profile.links.github} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-retro-light-blue hover:scale-125 transition-all drop-shadow-xl transform">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
            </a>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
