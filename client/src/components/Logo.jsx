import React from 'react';
import { Link } from 'react-router-dom';

const Logo = ({ className = "w-8 h-8", textClassName = "text-2xl", showText = true }) => {
  return (
    <Link to="/" className="flex items-center gap-3 group">
      <div className={`${className} relative flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-500`}>
        {/* Abstract Overlapping Pages / Swap Symbol */}
        <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          {/* Top-Left Diamond */}
          <path 
            d="M16 6 L26 16 L16 26 L6 16 Z" 
            stroke="currentColor" 
            strokeWidth="4" 
            strokeLinejoin="round" 
            className="text-brand-black"
          />
          {/* Bottom-Right Diamond */}
          <path 
            d="M24 14 L34 24 L24 34 L14 24 Z" 
            stroke="currentColor" 
            strokeWidth="4" 
            strokeLinejoin="round" 
            className="text-brand-blue"
          />
        </svg>
      </div>
      {showText && (
        <span className={`${textClassName} font-black text-brand-black tracking-tight`}>
          Book<span className="text-brand-blue">Swap</span>
        </span>
      )}
    </Link>
  );
};

export default Logo;
