import React from 'react';
import { motion } from 'framer-motion';
import portfolioData from '../portfolioData.json';

export default function QuickView({ onEnter3D }) {
  const { profile, education, skills, projects } = portfolioData;

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-slate-200 p-6 md:p-12 lg:p-24 selection:bg-emerald-500/30">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Sticky Sidebar Profile */}
        <motion.div 
          className="lg:col-span-4 lg:sticky lg:top-24 h-fit space-y-8"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-white mb-4">
              {profile.name}
            </h1>
            <h2 className="text-xl md:text-2xl font-medium text-emerald-400">{profile.role}</h2>
          </div>
          <p className="text-slate-400 leading-relaxed text-lg">{profile.about}</p>
          
          <button
            onClick={onEnter3D}
            className="group w-full flex items-center justify-between px-6 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl transition-all shadow-lg hover:shadow-emerald-500/10"
          >
            <span className="font-semibold tracking-wide">Enter 3D Space</span>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </button>
        </motion.div>

        {/* Content Area */}
        <motion.div 
          className="lg:col-span-8 space-y-24"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {/* Projects Bento Grid */}
          <section>
            <motion.h3 variants={item} className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-8">Selected Works</motion.h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {projects.map((proj, i) => (
                <motion.div 
                  variants={item}
                  key={proj.id} 
                  className={`bg-white/5 border border-white/5 rounded-3xl p-8 hover:bg-white/10 transition-colors ${i === 0 ? 'md:col-span-2' : ''}`}
                >
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="text-2xl font-bold text-white">{proj.title}</h4>
                    <span className="text-[10px] uppercase tracking-wider px-3 py-1 bg-white/5 rounded-full border border-white/10 text-slate-300">
                      {proj.type}
                    </span>
                  </div>
                  
                  {proj.videoUrl && (
                    <div className="mb-6 rounded-xl overflow-hidden border border-white/10 aspect-video shadow-lg">
                      <iframe 
                        src={proj.videoUrl} 
                        className="w-full h-full" 
                        frameBorder="0" 
                        allow="autoplay; fullscreen" 
                        allowFullScreen
                      />
                    </div>
                  )}

                  <p className="text-slate-400">{proj.description}</p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Education & Skills */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <section>
              <motion.h3 variants={item} className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-8">Experience / Education</motion.h3>
              <div className="space-y-6">
                {education.map((edu) => (
                  <motion.div variants={item} key={edu.id} className="relative pl-6 border-l border-white/10">
                    <div className="absolute w-2 h-2 bg-emerald-500 rounded-full -left-[5px] top-2 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                    <h4 className="text-lg font-bold text-white mb-1">{edu.degree}</h4>
                    <p className="text-slate-400 mb-2">{edu.institution}</p>
                    <span className="text-xs font-mono text-slate-500">{edu.date}</span>
                  </motion.div>
                ))}
              </div>
            </section>

            <section>
              <motion.h3 variants={item} className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-8">Technical Arsenal</motion.h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <motion.span 
                    variants={item}
                    key={skill} 
                    className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm font-medium text-slate-300 hover:text-white hover:border-emerald-500/50 transition-colors cursor-default"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </section>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
