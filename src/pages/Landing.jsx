import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import portfolioData from '../data/portfolioData.json';

export default function Landing() {
  const { name, role } = portfolioData.profile;

  return (
    <div className="min-h-screen bg-charcoal-900 flex flex-col relative overflow-hidden">
      <Header showBack={false} />
      
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center z-10">
        <h1 className="text-6xl md:text-8xl mb-2 text-white">{name}</h1>
        <h2 className="text-xl md:text-2xl text-amber-500 mb-12 tracking-[0.2em]">{role}</h2>
        
        <div className="flex flex-col sm:flex-row gap-6 w-full max-w-md">
          <Link to="/hub" className="btn-amber flex-1">
            Explore Hub
          </Link>
          <Link to="/profile" className="btn-ghost flex-1">
            Quick View
          </Link>
        </div>
      </div>
      
      {/* Background decoration */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-900/40 via-charcoal-900 to-charcoal-900"></div>
    </div>
  );
}
