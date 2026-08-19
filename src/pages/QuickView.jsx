import React from 'react';
import Header from '../components/Header';
import portfolioData from '../data/portfolioData.json';
import { Gamepad2, Mail, Linkedin, Github, Download, Phone, MapPin } from 'lucide-react';

const GithubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
);

export default function QuickView() {
  const { profile, education, internships, projects } = portfolioData;

  return (
    <div className="min-h-screen bg-charcoal-900 relative">
      <Header showBack={true} />
      
      <main className="max-w-5xl mx-auto px-6 py-24 space-y-24">
        {/* Profile Header & Contact */}
        <section className="border-b border-charcoal-700 pb-12 pt-8">
          <h1 className="text-5xl md:text-7xl mb-4 text-white">{profile.name}</h1>
          <h2 className="text-2xl text-amber-500 tracking-[0.2em] mb-6">{profile.role}</h2>
          <p className="text-slate-300 text-lg max-w-2xl leading-relaxed mb-8 lowercase font-sans">{profile.summary}</p>
          
          <div className="flex flex-wrap gap-x-8 gap-y-4 text-sm text-slate-400 font-display tracking-wider mb-10">
            <span className="flex items-center gap-2"><Phone size={16} /> {profile.phone}</span>
            <span className="flex items-center gap-2"><MapPin size={16} /> {profile.location}</span>
          </div>

          {/* Big Contact Buttons */}
          <div className="flex flex-wrap gap-4">
            <a href={`mailto:${profile.email}`} className="panel px-6 py-4 flex items-center gap-3 text-white hover:text-amber-500 hover:border-amber-500 transition-colors">
              <Mail size={24} />
              <span className="font-display tracking-widest uppercase text-sm">Email</span>
            </a>
            <a href={profile.links.linkedin} target="_blank" rel="noreferrer" className="panel px-6 py-4 flex items-center gap-3 text-white hover:text-amber-500 hover:border-amber-500 transition-colors">
              <Linkedin size={24} />
              <span className="font-display tracking-widest uppercase text-sm">LinkedIn</span>
            </a>
            <a href={profile.links.github} target="_blank" rel="noreferrer" className="panel px-6 py-4 flex items-center gap-3 text-white hover:text-amber-500 hover:border-amber-500 transition-colors">
              <Github size={24} />
              <span className="font-display tracking-widest uppercase text-sm">GitHub</span>
            </a>
            <a href="https://itch.io/profile/nightfuryexe" target="_blank" rel="noreferrer" className="panel px-6 py-4 flex items-center gap-3 text-white hover:text-amber-500 hover:border-amber-500 transition-colors">
              <Gamepad2 size={24} />
              <span className="font-display tracking-widest uppercase text-sm">Itch.io</span>
            </a>
            <a href="/Mahmoud_Hany_CV.pdf" download className="panel px-6 py-4 flex items-center gap-3 bg-amber-500 text-charcoal-900 border-amber-500 hover:bg-amber-400 hover:border-amber-400 transition-colors font-bold shadow-[0_0_15px_rgba(245,158,11,0.5)]">
              <Download size={24} />
              <span className="font-display tracking-widest uppercase text-sm">Download CV</span>
            </a>
          </div>
        </section>

        {/* Experience & Education */}
        <div className="grid md:grid-cols-2 gap-12">
          <section>
            <h3 className="text-2xl text-white mb-8 border-l-4 border-amber-500 pl-4">Education</h3>
            <div className="space-y-8">
              {education.map(edu => (
                <div key={edu.id} className="panel p-6">
                  <h4 className="text-lg text-amber-400 mb-1">{edu.degree}</h4>
                  <p className="text-white mb-2">{edu.institution}</p>
                  <div className="flex justify-between text-sm text-slate-500 font-display">
                    <span>{edu.date}</span>
                    {edu.gpa && <span>GPA: {edu.gpa}</span>}
                  </div>
                </div>
              ))}
            </div>
          </section>
          
          <section>
            <h3 className="text-2xl text-white mb-8 border-l-4 border-amber-500 pl-4">Experience</h3>
            <div className="space-y-8">
              {internships.map(int => (
                <div key={int.id} className="panel p-6">
                  <h4 className="text-lg text-amber-400 mb-1">{int.title}</h4>
                  <p className="text-white mb-2">{int.institution}</p>
                  <span className="text-sm text-slate-500 font-display">{int.date}</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Skills */}
        <section>
          <h3 className="text-2xl text-white mb-8 border-l-4 border-amber-500 pl-4">Technical Arsenal</h3>
          <div className="flex flex-wrap gap-2">
            {profile.skills.map(skill => (
              <span key={skill} className="badge">{skill}</span>
            ))}
          </div>
        </section>

        {/* Projects */}
        <section>
          <h3 className="text-2xl text-white mb-8 border-l-4 border-amber-500 pl-4">Projects</h3>
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map(proj => (
              <div key={proj.id} className="panel p-6 flex flex-col h-full">
                {proj.videoUrl && (
                  <div className="mb-6 aspect-video bg-charcoal-900 border border-charcoal-700">
                    <iframe src={proj.videoUrl} className="w-full h-full" allowFullScreen></iframe>
                  </div>
                )}
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-xl text-white">{proj.title}</h4>
                  <span className="text-xs text-amber-500 font-display tracking-widest">{proj.status}</span>
                </div>
                {proj.role && <p className="text-sm text-amber-400 mb-4">{proj.role}</p>}
                <p className="text-slate-300 flex-grow mb-6 lowercase font-sans">{proj.summary || 'In Development'}</p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {proj.tech.map(t => <span key={t} className="badge bg-charcoal-800">{t}</span>)}
                </div>

                <div className="flex gap-4 mt-auto pt-4 border-t border-charcoal-700">
                  {proj.itchLink && (
                    <a href={proj.itchLink} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-amber-500 transition-colors">
                      <Gamepad2 size={20} />
                    </a>
                  )}
                  {proj.githubLink && (
                    <a href={proj.githubLink} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-amber-500 transition-colors">
                      <GithubIcon />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Languages */}
        <section className="pb-24">
          <h3 className="text-2xl text-white mb-8 border-l-4 border-amber-500 pl-4">Languages</h3>
          <div className="flex flex-wrap gap-4">
            {profile.languages.map(lang => (
              <div key={lang} className="panel px-6 py-4 text-slate-300 font-display tracking-wide">{lang}</div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
