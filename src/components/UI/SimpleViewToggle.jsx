import React from 'react';
import { Link } from 'react-router-dom';

export default function SimpleViewToggle() {
  return (
    <Link to="/simple" className="pixel-btn bg-[#d95763] hover:bg-[#f4b41b] transition-colors shadow-xl text-center text-[10px] md:text-sm px-2 md:px-6 py-2 md:py-3 border-4 flex items-center justify-center text-white h-10 md:h-12 w-40 md:w-64">
      SKIP TO QUICK VIEW
    </Link>
  );
}
