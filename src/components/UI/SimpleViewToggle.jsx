import React from 'react';
import { Link } from 'react-router-dom';

export default function SimpleViewToggle() {
  return (
    <Link to="/simple" className="pixel-btn bg-retro-red hover:bg-retro-orange shadow-xl text-center text-xs md:text-lg px-4 py-2 md:px-8 md:py-4 border-2 md:border-4 animate-pulse hover:animate-none">
      SKIP TO QUICK VIEW
    </Link>
  );
}
