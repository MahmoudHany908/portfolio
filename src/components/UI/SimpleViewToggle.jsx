import React from 'react';
import { Link } from 'react-router-dom';

export default function SimpleViewToggle() {
  return (
    <Link to="/quick" className="pixel-btn bg-[#d95763] hover:bg-[#f4b41b] transition-colors shadow-[4px_4px_0_rgba(0,0,0,0.5)] md:shadow-[8px_8px_0_rgba(0,0,0,0.5)] text-center text-xs md:text-2xl px-3 md:px-12 py-2 md:py-6 border-2 md:border-4 flex items-center justify-center text-white h-10 md:h-20 whitespace-nowrap">
      <span className="hidden sm:inline">SKIP TO QUICK VIEW</span>
      <span className="sm:hidden">QUICK VIEW</span>
    </Link>
  );
}
