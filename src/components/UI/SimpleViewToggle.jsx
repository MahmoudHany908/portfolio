import React from 'react';
import { Link } from 'react-router-dom';

export default function SimpleViewToggle() {
  return (
    <Link to="/quick" className="pixel-btn bg-[#d95763] hover:bg-[#f4b41b] transition-colors shadow-[8px_8px_0_rgba(0,0,0,0.5)] text-center text-sm md:text-2xl px-6 md:px-12 py-3 md:py-6 border-4 flex items-center justify-center text-white h-14 md:h-20 whitespace-nowrap">
      SKIP TO QUICK VIEW
    </Link>
  );
}
