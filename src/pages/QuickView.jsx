import React from 'react';
import Header from '../components/Header';
import portfolioData from '../data/portfolioData.json';
import { Gamepad2, Mail, Download, Phone, MapPin } from 'lucide-react';

const GithubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
);

const LinkedinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
);

const ProjectCard = ({ proj, customLogos }) => (
  <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-start group">
    {proj.video && (
      <div className="w-full lg:w-3/5 aspect-video bg-charcoal-900 border border-charcoal-800 transition-colors duration-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-amber-500/0 group-hover:bg-amber-500/5 transition-colors duration-700 pointer-events-none z-10"></div>
        <iframe src={proj.video} className="w-full h-full filter grayscale group-hover:grayscale-0 transition-all duration-700" allowFullScreen></iframe>
      </div>
    )}
    <div className="w-full lg:w-2/5 flex flex-col pt-2 lg:pt-8">
      <div className="flex items-center gap-4 flex-wrap mb-6">
        <h4 className="text-3xl md:text-5xl text-white tracking-tight">{proj.title}</h4>
      </div>
      
      <div className="flex items-center gap-4 mb-8">
        {customLogos && <div className="flex items-center gap-4">{customLogos}</div>}
        {proj.status && <span className="text-xs text-amber-500 font-display tracking-widest whitespace-nowrap uppercase border border-amber-500/30 px-3 py-1">{proj.status}</span>}
      </div>

      {proj.role && <p className="text-sm font-display tracking-widest text-amber-400 mb-6 uppercase">{proj.role}</p>}
      
      <p className="text-slate-400 text-lg leading-relaxed mb-10 font-sans">{proj.summary || 'In Development'}</p>
      
      {proj.keyContributions && (
        <div className="mb-12">
          <p className="text-xs font-display tracking-widest uppercase text-slate-500 mb-6">Key Contributions</p>
          <ul className="space-y-4">
            {proj.keyContributions.map((kc, i) => (
              <li key={i} className="text-sm text-slate-300 font-sans leading-relaxed border-l-2 border-charcoal-700 pl-6 py-1 group-hover:border-amber-500/50 transition-colors duration-500">{kc}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex flex-wrap gap-4 mb-16">
        {proj.tech.map(t => <span key={t} className="text-xs font-display tracking-widest text-slate-500 uppercase">{t}</span>)}
      </div>

      <div className="flex gap-8 mt-auto pt-8 border-t border-charcoal-800">
        {proj.itchLink && (
          <a href={proj.itchLink} target="_blank" rel="noreferrer" className="text-slate-500 hover:text-amber-500 transition-colors flex items-center gap-3">
            <Gamepad2 size={20} /> <span className="text-xs font-display tracking-widest uppercase">Play</span>
          </a>
        )}
        {proj.githubLink && (
          <a href={proj.githubLink} target="_blank" rel="noreferrer" className="text-slate-500 hover:text-amber-500 transition-colors flex items-center gap-3">
            <GithubIcon /> <span className="text-xs font-display tracking-widest uppercase">Source</span>
          </a>
        )}
      </div>
    </div>
  </div>
);

export default function QuickView() {
  const { profile, education, internships, nodes } = portfolioData;
  const projects = nodes.filter(n => n.type === 'project');

  const cyberSalvage = projects.find(n => n.id === 'proj2');
  const learningLens = projects.find(n => n.id === 'proj1');
  const normalProjects = projects.filter(n => n.id !== 'proj1' && n.id !== 'proj2');

  return (
    <div className="min-h-screen bg-charcoal-900 relative selection:bg-amber-500/30 selection:text-amber-200">
      <Header showBack={true} />
      
      <main className="w-full px-6 md:px-12 lg:px-24">
        
        {/* Establishing Shot (Hero) */}
        <section className="min-h-[90vh] flex flex-col justify-center pt-32 pb-40 relative">
          <div className="absolute top-0 right-12 md:right-24 w-px h-32 bg-gradient-to-b from-transparent to-amber-500/20"></div>
          
          <div className="max-w-5xl relative z-10">
            <h1 className="text-6xl md:text-8xl lg:text-[10rem] mb-8 text-white tracking-tighter leading-[0.9] font-light">
              {profile.name}
            </h1>
            <h2 className="text-lg md:text-xl text-amber-500 font-display tracking-[0.4em] uppercase mb-16 ml-1 md:ml-2">
              {profile.role}
            </h2>
            <p className="text-slate-400 text-xl md:text-2xl max-w-3xl leading-relaxed mb-24 font-sans font-light">
              {profile.summary}
            </p>
            
            {/* Contact Grid - Asymmetrical */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-4xl border-t border-charcoal-800 pt-16">
              <div className="space-y-8 text-sm font-display tracking-widest text-slate-500 uppercase">
                <div className="flex items-center gap-6"><Phone size={18} className="text-amber-500/70" /> {profile.phone}</div>
                <div className="flex items-center gap-6"><MapPin size={18} className="text-amber-500/70" /> {profile.location}</div>
              </div>

              <div className="grid grid-cols-2 gap-8">
                <a href={`mailto:${profile.email}`} className="flex flex-col gap-4 text-white hover:text-amber-500 transition-colors group">
                  <Mail size={20} className="text-slate-600 group-hover:text-amber-500 transition-colors" />
                  <span className="font-display tracking-widest uppercase text-xs">Email</span>
                </a>
                <a href={profile.links.linkedin} target="_blank" rel="noreferrer" className="flex flex-col gap-4 text-white hover:text-amber-500 transition-colors group">
                  <LinkedinIcon />
                  <span className="font-display tracking-widest uppercase text-xs">LinkedIn</span>
                </a>
                <a href={profile.links.github} target="_blank" rel="noreferrer" className="flex flex-col gap-4 text-white hover:text-amber-500 transition-colors group">
                  <GithubIcon />
                  <span className="font-display tracking-widest uppercase text-xs">GitHub</span>
                </a>
                <a href="/Mahmoud_Hany_CV.pdf" download className="flex flex-col gap-4 text-amber-500 hover:text-white transition-colors group">
                  <Download size={20} />
                  <span className="font-display tracking-widest uppercase text-xs">CV Resume</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Vast Empty Separator */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-charcoal-800 to-transparent my-32"></div>

        {/* Narrative Beats: Experience & Education */}
        <div className="flex flex-col gap-40 md:gap-64 py-32">
          
          <section className="md:w-2/3 md:ml-auto">
            <h3 className="text-xs font-display text-slate-500 tracking-[0.3em] uppercase mb-16 border-b border-charcoal-800 pb-6 flex items-center gap-4">
              <span className="w-2 h-2 bg-amber-500"></span> Education
            </h3>
            <div className="space-y-20">
              {education.map(edu => (
                <div key={edu.id} className="group">
                  <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-4 gap-4">
                    <h4 className="text-2xl md:text-3xl text-white font-light">{edu.degree}</h4>
                    <span className="text-sm font-display tracking-widest text-amber-500/70 uppercase">{edu.date}</span>
                  </div>
                  <p className="text-lg text-slate-400 font-sans mb-4">{edu.institution}</p>
                  {edu.gpa && <p className="text-sm font-display tracking-widest text-slate-500 uppercase">GPA: {edu.gpa}</p>}
                </div>
              ))}
            </div>
          </section>
          
          <section className="md:w-2/3 md:pr-24">
            <h3 className="text-xs font-display text-slate-500 tracking-[0.3em] uppercase mb-16 border-b border-charcoal-800 pb-6 flex items-center gap-4">
              <span className="w-2 h-2 bg-amber-500"></span> Experience
            </h3>
            <div className="space-y-20">
              {internships.map(int => (
                <div key={int.id} className="group">
                  <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-4 gap-4">
                    <h4 className="text-2xl md:text-3xl text-white font-light">{int.title}</h4>
                    <span className="text-sm font-display tracking-widest text-amber-500/70 uppercase">{int.date}</span>
                  </div>
                  <p className="text-lg text-slate-400 font-sans">{int.institution}</p>
                </div>
              ))}
            </div>
          </section>

        </div>

        {/* Vast Empty Separator */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-charcoal-800 to-transparent my-32"></div>

        {/* Monumental Architecture: Projects */}
        <div className="py-32">
          
          <section className="mb-64">
            <h3 className="text-xs font-display text-slate-500 tracking-[0.3em] uppercase mb-32 border-b border-charcoal-800 pb-6 text-center max-w-xs mx-auto">
              Graduation Projects
            </h3>
            <div className="flex flex-col space-y-48">
              {cyberSalvage && (
                <ProjectCard 
                  proj={cyberSalvage} 
                  customLogos={<img src="/iti-logo.png" alt="ITI" className="h-12 object-contain opacity-70 grayscale hover:grayscale-0 hover:opacity-100 transition-all" />} 
                />
              )}
              {learningLens && (
                <ProjectCard 
                  proj={learningLens} 
                  customLogos={
                    <>
                      <img src="/ainshams-logo.png" alt="Ain Shams" className="h-12 object-contain opacity-70 grayscale hover:grayscale-0 hover:opacity-100 transition-all" />
                      <img src="/uel-logo.png" alt="UEL" className="h-12 object-contain opacity-70 grayscale hover:grayscale-0 hover:opacity-100 transition-all" />
                    </>
                  } 
                />
              )}
            </div>
          </section>

          <section className="mb-32">
            <h3 className="text-xs font-display text-slate-500 tracking-[0.3em] uppercase mb-32 border-b border-charcoal-800 pb-6 text-center max-w-xs mx-auto">
              Notable Works
            </h3>
            <div className="flex flex-col space-y-48">
              {normalProjects.map(proj => (
                <ProjectCard key={proj.id} proj={proj} />
              ))}
            </div>
          </section>

        </div>

        {/* Technical Arsenal (Credits Style) */}
        <section className="py-40 border-t border-charcoal-800 relative">
          <h3 className="text-xs font-display text-slate-500 tracking-[0.3em] uppercase mb-32 text-center">Technical Arsenal</h3>
          <div className="flex flex-wrap justify-center gap-16 md:gap-32 max-w-6xl mx-auto">
            {Object.entries(profile.skills).map(([category, items]) => (
              <div key={category} className="max-w-[200px] text-center">
                <h4 className="text-white font-display text-xs mb-8 uppercase tracking-widest">{category.replace('_', ' ')}</h4>
                <div className="flex flex-col gap-3">
                  {items.map(item => (
                    <span key={item} className="text-slate-400 font-sans text-sm">{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

      </main>
    </div>
  );
}
