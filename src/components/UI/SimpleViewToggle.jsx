import React from 'react';
import { Link } from 'react-router-dom';

export default function SimpleViewToggle() {
  return (
    <Link to="/simple" className="pixel-btn bg-retro-red hover:bg-retro-orange shadow-xl text-center text-lg px-8 py-4 border-4 animate-pulse hover:animate-none">
      SKIP TO SIMPLE VIEW
    </Link>
  );
}
