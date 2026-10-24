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

/**
 * IPL Auction Arena - Pleasing, Harmonious Luxury Emblem
 * 
 * Redesigned to remove harsh popping colors (no aggressive reds or loud neon yellows).
 * Features a soothing, balanced composition:
 * - Serene amphitheater stadium ellipse with delicate orbital cricket trajectory
 * - Minimalist, sculpted auctioneer gavel in soft champagne platinum
 * - Harmonious geometric balance with gentle curves, generous negative space, and pleasing warmth.
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
        className={`${dimensionClass} shrink-0 drop-shadow-sm transition-transform duration-300`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="IPL Auction Arena Emblem"
      >
        <defs>
          {/* Soothing, Pleasing Champagne Platinum & Cashmere Slate Gradients */}
          <linearGradient id="arena-lux-base" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1E232E" />
            <stop offset="50%" stopColor="#141821" />
            <stop offset="100%" stopColor="#0B0E14" />
          </linearGradient>

          {/* Gentle, Harmonious Champagne Satin Gradient (Soft, not loud or popping) */}
          <linearGradient id="arena-lux-gold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FAF4E8" />
            <stop offset="40%" stopColor="#E5D6BA" />
            <stop offset="75%" stopColor="#C4B18E" />
            <stop offset="100%" stopColor="#96815F" />
          </linearGradient>

          {/* Warm Frosted Rosewood Accent for subtle warmth (replaces harsh neon ruby) */}
          <linearGradient id="arena-lux-warmth" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E2A599" />
            <stop offset="60%" stopColor="#B87364" />
            <stop offset="100%" stopColor="#7E473C" />
          </linearGradient>

          {/* Soft Serene Radial Glow */}
          <radialGradient id="arena-lux-ambient" cx="50%" cy="46%" r="52%">
            <stop offset="0%" stopColor="#E5D6BA" stopOpacity="0.22" />
            <stop offset="60%" stopColor="#E5D6BA" stopOpacity="0.06" />
            <stop offset="100%" stopColor="#0B0E14" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Pleasing Shield / Stadium Colosseum Outer Ring */}
        <path
          d="M50 5 C75 5 91 18 91 46 C91 72 73 91 50 95 C27 91 9 72 9 46 C9 18 25 5 50 5 Z"
          fill="url(#arena-lux-base)"
          stroke="url(#arena-lux-gold)"
          strokeWidth="2.2"
        />

        {/* Ambient Warm Atmosphere */}
        <ellipse cx="50" cy="50" rx="38" ry="40" fill="url(#arena-lux-ambient)" />

        {/* Delicate Inner Stadium Tier Rings (Concentric amphitheater arcs) */}
        <ellipse
          cx="50"
          cy="48"
          rx="32"
          ry="32"
          stroke="url(#arena-lux-gold)"
          strokeWidth="0.8"
          strokeOpacity="0.45"
          strokeDasharray="4 3"
        />
        <circle
          cx="50"
          cy="48"
          r="26"
          stroke="url(#arena-lux-gold)"
          strokeWidth="0.5"
          strokeOpacity="0.25"
        />

        {/* Sweeping Cricket Ball Seam Orbit (Gentle diagonal trajectory) */}
        <path
          d="M24 70 C30 38 68 24 80 40"
          stroke="url(#arena-lux-gold)"
          strokeWidth="1.2"
          strokeDasharray="2.5 2"
          strokeOpacity="0.85"
        />

        {/* Sculpted, Pleasing Minimalist Gavel (Diagonal 40deg angle) */}
        <g transform="rotate(38 50 48)">
          {/* Gavel Handle with rounded finial */}
          <rect
            x="48"
            y="22"
            width="4"
            height="36"
            rx="2"
            fill="url(#arena-lux-gold)"
          />
          {/* Subtle handle grip wrap rings */}
          <line x1="48" y1="46" x2="52" y2="46" stroke="#0B0E14" strokeWidth="0.8" opacity="0.4" />
          <line x1="48" y1="50" x2="52" y2="50" stroke="#0B0E14" strokeWidth="0.8" opacity="0.4" />

          {/* Symmetrical, Sculpted Gavel Head */}
          <rect
            x="36"
            y="22"
            width="28"
            height="11"
            rx="3"
            fill="url(#arena-lux-gold)"
          />
          {/* Beveled Polished End Striking Caps */}
          <rect x="34.5" y="23" width="2" height="9" rx="1" fill="#FFFFFF" opacity="0.9" />
          <rect x="63.5" y="23" width="2" height="9" rx="1" fill="#FFFFFF" opacity="0.9" />

          {/* Central Medallion on Gavel Head */}
          <circle cx="50" cy="27.5" r="2.2" fill="#141821" />
          <circle cx="50" cy="27.5" r="1.2" fill="url(#arena-lux-gold)" />
        </g>

        {/* Cricket Leather Sphere - Soft Warm Terracotta/Rosewood (Not neon red) */}
        <circle
          cx="56"
          cy="60"
          r="7.5"
          fill="url(#arena-lux-warmth)"
          stroke="url(#arena-lux-gold)"
          strokeWidth="1"
        />
        {/* Soft White Curved Seam Stitching */}
        <path
          d="M51.5 57.5 C54 60 58 60 60.5 57.5"
          stroke="#FFFFFF"
          strokeWidth="0.9"
          strokeDasharray="1.2 1"
          fill="none"
          opacity="0.95"
        />

        {/* Three Serene Championship Stars (Minimalist & Delicate) */}
        <g fill="url(#arena-lux-gold)" opacity="0.9">
          <circle cx="50" cy="13" r="1.6" />
          <circle cx="43" cy="16" r="1.2" />
          <circle cx="57" cy="16" r="1.2" />
        </g>

        {/* Soft Bottom Arch Wordmark Plaque */}
        <path
          d="M32 82 C44 85 56 85 68 82"
          stroke="url(#arena-lux-gold)"
          strokeWidth="1"
          strokeOpacity="0.4"
        />
        <text
          x="50"
          y="87"
          textAnchor="middle"
          fontSize="5.5"
          fontWeight="800"
          letterSpacing="2.5"
          fill="url(#arena-lux-gold)"
          fontFamily="system-ui, -apple-system, sans-serif"
          opacity="0.9"
        >
          AUCTION
        </text>
      </svg>

      {showWordmark && (
        <div className="flex flex-col leading-none">
          <div className="flex items-center gap-1.5">
            <span className="font-extrabold text-xs tracking-widest uppercase opacity-85">IPL</span>
            <span className="font-mono text-[9px] font-bold px-1.5 py-0.5 rounded-md bg-[var(--theme-accent)]/15 text-[var(--theme-accent)] border border-[var(--theme-accent)]/25">
              WAR ROOM
            </span>
          </div>
          <span className="font-black text-sm tracking-tight text-[var(--theme-text)]">
            Auction Arena
          </span>
        </div>
      )}
    </div>
  );
}
