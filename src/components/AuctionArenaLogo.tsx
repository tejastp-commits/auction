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
  md: 'w-10 h-10',
  lg: 'w-14 h-14',
  xl: 'w-18 h-18',
};

/**
 * SLEEK, MODERN, EYE-CATCHING IPL AUCTION ARENA TOURNAMENT EMBLEM
 * 
 * Features an architectural stadium colosseum shield, sculpted minimalist gavel,
 * orbital curved cricket seam, and warm pastel peach/coral & champagne accents.
 */
export default function AuctionArenaLogo({
  size = 'md',
  className = '',
  showWordmark = false,
}: AuctionArenaLogoProps) {
  const dimensionClass = SIZE_MAP[size] || SIZE_MAP.md;

  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg
        viewBox="0 0 100 100"
        className={`${dimensionClass} shrink-0 drop-shadow-sm transition-transform duration-200 hover:scale-105`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="IPL Auction Arena Official Emblem"
      >
        <defs>
          {/* Warm Pastel Peach & Coral Gradients */}
          <linearGradient id="arena-peach-bg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF7ED" />
            <stop offset="60%" stopColor="#FFEDD5" />
            <stop offset="100%" stopColor="#FED7AA" />
          </linearGradient>

          <linearGradient id="arena-coral-stroke" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FB923C" />
            <stop offset="50%" stopColor="#EA580C" />
            <stop offset="100%" stopColor="#C2410C" />
          </linearGradient>

          <linearGradient id="arena-gold-accent" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FEF08A" />
            <stop offset="50%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#D97706" />
          </linearGradient>
        </defs>

        {/* Outer Stadium Colosseum Shield */}
        <path
          d="M50 4 C 76 4, 92 16, 92 46 C 92 74, 74 94, 50 97 C 26 94, 8 74, 8 46 C 8 16, 24 4, 50 4 Z"
          fill="url(#arena-peach-bg)"
          stroke="url(#arena-coral-stroke)"
          strokeWidth="3"
        />

        {/* Inner Amphitheater Tier Ring */}
        <path
          d="M50 10 C 72 10, 85 20, 85 46 C 85 70, 70 87, 50 90 C 30 87, 15 70, 15 46 C 15 20, 28 10, 50 10 Z"
          stroke="url(#arena-coral-stroke)"
          strokeWidth="1"
          strokeOpacity="0.4"
          strokeDasharray="4 3"
        />

        {/* Sculpted Modern Gavel (Slanted 36deg) */}
        <g transform="rotate(36 50 48)">
          {/* Gavel Handle */}
          <rect x="48" y="18" width="4" height="38" rx="2" fill="url(#arena-coral-stroke)" />
          {/* Gavel Head */}
          <rect x="34" y="20" width="32" height="12" rx="3" fill="url(#arena-coral-stroke)" />
          <rect x="32" y="22" width="3" height="8" rx="1.5" fill="#FFFFFF" />
          <rect x="65" y="22" width="3" height="8" rx="1.5" fill="#FFFFFF" />
          <circle cx="50" cy="26" r="2.5" fill="url(#arena-gold-accent)" />
        </g>

        {/* Curved Cricket Ball Seam Orbit */}
        <path
          d="M24 66 C 32 38, 68 28, 78 44"
          stroke="url(#arena-gold-accent)"
          strokeWidth="2"
          strokeDasharray="3 2"
          strokeLinecap="round"
        />

        {/* Cricket Leather Ball with Seam */}
        <circle cx="58" cy="62" r="8" fill="#EA580C" stroke="#C2410C" strokeWidth="1.5" />
        <path
          d="M53 59 Q 58 63, 63 59"
          stroke="#FFFFFF"
          strokeWidth="1.2"
          strokeDasharray="1.5 1.5"
          fill="none"
        />

        {/* Three Championship Stars */}
        <g fill="url(#arena-gold-accent)">
          <circle cx="50" cy="13" r="2" />
          <circle cx="41" cy="17" r="1.5" />
          <circle cx="59" cy="17" r="1.5" />
        </g>

        {/* Ribbon / Plaque */}
        <path
          d="M28 80 L 50 85 L 72 80 L 70 89 L 50 94 L 30 89 Z"
          fill="url(#arena-coral-stroke)"
        />
        <text
          x="50"
          y="88.5"
          textAnchor="middle"
          fontSize="6.5"
          fontWeight="900"
          letterSpacing="1.5"
          fill="#FFFFFF"
          fontFamily="system-ui, -apple-system, sans-serif"
        >
          AUCTION
        </text>
      </svg>

      {showWordmark && (
        <div className="flex flex-col leading-none">
          <div className="flex items-center gap-1.5">
            <span className="font-black text-sm tracking-widest uppercase text-orange-950">
              IPL
            </span>
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-orange-200 text-orange-900 border border-orange-300">
              WAR ROOM 🏏
            </span>
          </div>
          <span className="font-black text-base tracking-tight text-orange-700">
            Auction Arena
          </span>
        </div>
      )}
    </div>
  );
}
