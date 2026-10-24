'use client';

import React from 'react';

interface AuctionArenaLogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showWordmark?: boolean;
}

const SIZE_MAP = {
  xs: 'w-5 h-5',
  sm: 'w-7 h-7',
  md: 'w-9 h-9',
  lg: 'w-12 h-12',
  xl: 'w-16 h-16',
};

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
        className={`${dimensionClass} shrink-0`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="IPL Auction Arena Emblem"
      >
        <defs>
          <linearGradient id="arena-gold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF2A3" />
            <stop offset="40%" stopColor="#E5A823" />
            <stop offset="70%" stopColor="#C98B12" />
            <stop offset="100%" stopColor="#8C5E06" />
          </linearGradient>
          <linearGradient id="arena-blue" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1E3A8A" />
            <stop offset="50%" stopColor="#0F172A" />
            <stop offset="100%" stopColor="#020617" />
          </linearGradient>
          <linearGradient id="arena-ruby" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#EF4444" />
            <stop offset="100%" stopColor="#991B1B" />
          </linearGradient>
          <radialGradient id="arena-glow" cx="50%" cy="45%" r="50%">
            <stop offset="0%" stopColor="#FBBF24" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Outer Hex-Shield / Stadium Arena Crest */}
        <path
          d="M50 3 L88 18 L84 72 L50 97 L16 72 L12 18 Z"
          fill="url(#arena-blue)"
          stroke="url(#arena-gold)"
          strokeWidth="3.5"
        />

        {/* Ambient Stadium Glow */}
        <circle cx="50" cy="50" r="32" fill="url(#arena-glow)" />

        {/* Concentric Stadium Arena Ring */}
        <ellipse
          cx="50"
          cy="52"
          rx="32"
          ry="18"
          stroke="url(#arena-gold)"
          strokeWidth="1.2"
          strokeDasharray="4 3"
          opacity="0.75"
        />

        {/* 3 Championship Stars */}
        <g fill="url(#arena-gold)">
          {/* Left Star */}
          <polygon points="32,20 34,25 39,25 35,28 37,33 32,30 27,33 29,28 25,25 30,25" />
          {/* Center Main Star */}
          <polygon points="50,13 52.5,19 59,19 54,23 56,29 50,25.5 44,29 46,23 41,19 47.5,19" />
          {/* Right Star */}
          <polygon points="68,20 70,25 75,25 71,28 73,33 68,30 63,33 65,28 61,25 66,25" />
        </g>

        {/* Crossed Cricket Bat & Auction Gavel */}
        {/* Cricket Bat (Slanted right) */}
        <g transform="rotate(32 50 52)">
          {/* Bat Handle */}
          <rect x="48" y="24" width="4" height="14" rx="2" fill="#FFFFFF" stroke="#0F172A" strokeWidth="0.8" />
          {/* Handle Grip Ribs */}
          <line x1="48" y1="28" x2="52" y2="28" stroke="#EF4444" strokeWidth="1" />
          <line x1="48" y1="32" x2="52" y2="32" stroke="#EF4444" strokeWidth="1" />
          {/* Bat Blade */}
          <path d="M46 38 L54 38 L53 74 L47 74 Z" fill="url(#arena-gold)" stroke="#5A3A00" strokeWidth="1" />
          <line x1="50" y1="38" x2="50" y2="72" stroke="#FFF" strokeWidth="0.8" opacity="0.6" />
        </g>

        {/* Golden Auctioneer Gavel (Slanted left) */}
        <g transform="rotate(-32 50 52)">
          {/* Gavel Handle */}
          <rect x="48.5" y="24" width="3" height="48" rx="1.5" fill="url(#arena-gold)" stroke="#5A3A00" strokeWidth="0.8" />
          {/* Gavel Hammer Head */}
          <rect x="36" y="28" width="28" height="12" rx="3" fill="url(#arena-gold)" stroke="#FFFFFF" strokeWidth="1.2" />
          {/* Metallic Striking Faces */}
          <rect x="34" y="29" width="3" height="10" rx="1" fill="#FFFFFF" />
          <rect x="63" y="29" width="3" height="10" rx="1" fill="#FFFFFF" />
          <circle cx="50" cy="34" r="2.5" fill="url(#arena-ruby)" />
        </g>

        {/* Center Cricket Leather Ball with Seam */}
        <circle cx="50" cy="56" r="8" fill="url(#arena-ruby)" stroke="url(#arena-gold)" strokeWidth="1.5" />
        {/* White Seam Stitches */}
        <path
          d="M45 53 Q50 56 55 53"
          stroke="#FFFFFF"
          strokeWidth="1.2"
          strokeDasharray="1.5 1.2"
          fill="none"
        />

        {/* Lower Arena Ribbon / Plaque */}
        <path
          d="M26 76 L50 82 L74 76 L72 87 L50 93 L28 87 Z"
          fill="url(#arena-gold)"
          stroke="#FFFFFF"
          strokeWidth="1"
        />
        <text
          x="50"
          y="87"
          textAnchor="middle"
          fontSize="7"
          fontWeight="900"
          letterSpacing="1.2"
          fill="#0F172A"
          fontFamily="system-ui, -apple-system, sans-serif"
        >
          AUCTION
        </text>
      </svg>

      {showWordmark && (
        <div className="flex flex-col leading-none">
          <div className="flex items-center gap-1">
            <span className="font-black text-sm tracking-widest uppercase opacity-90">IPL</span>
            <span className="font-mono text-[9px] font-bold px-1.5 py-0.5 rounded bg-amber-500/15 text-amber-500 border border-amber-500/30">
              WAR ROOM
            </span>
          </div>
          <span className="font-black text-base tracking-tight text-[var(--theme-accent)]">
            Auction Arena
          </span>
        </div>
      )}
    </div>
  );
}
