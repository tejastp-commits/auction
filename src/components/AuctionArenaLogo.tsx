'use client';

import React from 'react';

interface AuctionArenaLogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showWordmark?: boolean;
}

const SIZE_MAP = {
  xs: 'w-6 h-6',
  sm: 'w-8 h-8',
  md: 'w-11 h-11',
  lg: 'w-14 h-14',
  xl: 'w-20 h-20',
};

/**
 * 100% HAND-DRAWN DOODLE LOGO FOR IPL AUCTION ARENA
 * Complete with wavy sketched outlines, crosshatching, doodle cricket bat,
 * doodle auction gavel with impact sparks, and handwritten marker typography.
 */
export default function AuctionArenaLogo({
  size = 'md',
  className = '',
  showWordmark = false,
}: AuctionArenaLogoProps) {
  const dimensionClass = SIZE_MAP[size] || SIZE_MAP.md;

  return (
    <div className={`inline-flex items-center gap-2.5 font-doodle ${className}`}>
      <svg
        viewBox="0 0 100 100"
        className={`${dimensionClass} shrink-0 drop-shadow-sm transition-transform duration-300 hover:rotate-3`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="IPL Auction Arena Hand-Drawn Doodle Emblem"
      >
        {/* Hand-Drawn Wavy Oval/Stadium Crest with Doodle Hatching */}
        <path
          d="M50 5 C 76 4, 93 17, 92 48 C 91 76, 74 94, 50 95 C 24 94, 7 75, 8 48 C 9 17, 26 6, 50 5 Z"
          fill="#FFF1F5"
          stroke="#2C2825"
          strokeWidth="2.8"
          strokeLinejoin="round"
        />

        {/* Hand-drawn inner dashed doodle ring */}
        <path
          d="M50 11 C 72 10, 86 21, 85 48 C 84 72, 70 88, 50 89 C 30 88, 15 72, 16 48 C 17 21, 30 11, 50 11 Z"
          stroke="#F472B6"
          strokeWidth="1.8"
          strokeDasharray="4 3"
          strokeLinecap="round"
        />

        {/* Doodle Stadium Crosshatching in the corner */}
        <path d="M18 32 L26 24 M22 40 L30 32 M20 48 L28 40" stroke="#F472B6" strokeWidth="1.2" opacity="0.6" />
        <path d="M82 32 L74 24 M78 40 L70 32 M80 48 L72 40" stroke="#F472B6" strokeWidth="1.2" opacity="0.6" />

        {/* Hand-Drawn Doodle Cricket Bat (Slanted right) */}
        <g transform="rotate(32 50 48)">
          {/* Bat Handle with doodle grip lines */}
          <rect x="48" y="16" width="4" height="18" rx="2" fill="#FEF08A" stroke="#2C2825" strokeWidth="2" />
          <line x1="48" y1="21" x2="52" y2="21" stroke="#2C2825" strokeWidth="1.2" />
          <line x1="48" y1="26" x2="52" y2="26" stroke="#2C2825" strokeWidth="1.2" />
          <line x1="48" y1="31" x2="52" y2="31" stroke="#2C2825" strokeWidth="1.2" />

          {/* Bat Blade */}
          <path
            d="M45 34 C 45 32, 55 32, 55 34 L54 74 C 54 77, 44 77, 44 74 Z"
            fill="#FED7AA"
            stroke="#2C2825"
            strokeWidth="2.2"
            strokeLinejoin="round"
          />
          {/* Wood grain doodle lines */}
          <path d="M49 38 L49 70" stroke="#2C2825" strokeWidth="1" strokeDasharray="3 3" opacity="0.5" />
        </g>

        {/* Hand-Drawn Doodle Auctioneer Gavel (Slanted left) */}
        <g transform="rotate(-32 50 48)">
          {/* Gavel Handle */}
          <rect x="48" y="18" width="4" height="42" rx="2" fill="#FEF08A" stroke="#2C2825" strokeWidth="2" />
          
          {/* Gavel Hammer Head */}
          <path
            d="M34 22 C 34 20, 66 20, 66 22 L65 35 C 65 37, 35 37, 35 35 Z"
            fill="#FECDD3"
            stroke="#2C2825"
            strokeWidth="2.2"
            strokeLinejoin="round"
          />
          {/* Gavel End Caps */}
          <rect x="31" y="24" width="4" height="9" rx="1.5" fill="#FFFFFF" stroke="#2C2825" strokeWidth="1.8" />
          <rect x="65" y="24" width="4" height="9" rx="1.5" fill="#FFFFFF" stroke="#2C2825" strokeWidth="1.8" />
          {/* Center heart / star on gavel */}
          <circle cx="50" cy="28.5" r="2.5" fill="#E11D48" />
        </g>

        {/* Impact Action Stars from Hammer Strike */}
        <path d="M45 42 L42 37 M55 42 L58 37 M49 38 L49 33" stroke="#E11D48" strokeWidth="2" strokeLinecap="round" />

        {/* Doodle Cricket Leather Ball with Seam */}
        <circle cx="50" cy="62" r="8" fill="#FDA4AF" stroke="#2C2825" strokeWidth="2.2" />
        <path
          d="M44 60 Q 50 64, 56 60"
          stroke="#FFFFFF"
          strokeWidth="1.5"
          strokeDasharray="1.5 1.5"
          fill="none"
        />

        {/* Three Sketched Hand-Drawn Stars at the Top */}
        <g fill="#FACC15" stroke="#2C2825" strokeWidth="1.2">
          {/* Center Star */}
          <polygon points="50,11 52,15 57,15 53,18 55,23 50,20 45,23 47,18 43,15 48,15" />
          {/* Left Star */}
          <polygon points="34,16 35.5,19 39,19 36,21.5 37.5,25 34,23 30.5,25 32,21.5 29,19 32.5,19" />
          {/* Right Star */}
          <polygon points="66,16 67.5,19 71,19 68,21.5 69.5,25 66,23 62.5,25 64,21.5 61,19 64.5,19" />
        </g>

        {/* Lower Hand-Drawn Plaque / Banner */}
        <path
          d="M26 78 C 38 82, 62 82, 74 78 L 71 88 C 60 92, 40 92, 29 88 Z"
          fill="#FEF08A"
          stroke="#2C2825"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <text
          x="50"
          y="87"
          textAnchor="middle"
          fontSize="9.5"
          fontWeight="900"
          fontFamily="Caveat, cursive"
          fill="#2C2825"
          letterSpacing="0.8"
        >
          AUCTION
        </text>
      </svg>

      {showWordmark && (
        <div className="flex flex-col leading-none">
          <div className="flex items-center gap-1.5">
            <span className="font-doodle text-xl font-bold tracking-wider text-[#2C2825]">
              IPL
            </span>
            <span className="font-doodle text-xs font-black px-2 py-0.5 rounded-lg bg-pink-100 text-pink-700 border border-pink-300 rotate-2">
              WAR ROOM 🏏
            </span>
          </div>
          <span className="font-doodle text-2xl font-bold tracking-tight text-[var(--theme-accent)]">
            Auction Arena
          </span>
        </div>
      )}
    </div>
  );
}
