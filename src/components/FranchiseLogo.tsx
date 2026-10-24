'use client';

import React from 'react';

interface FranchiseLogoProps {
  franchiseId: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const SIZE_MAP = {
  xs: 'w-6 h-5',
  sm: 'w-8 h-6.5',
  md: 'w-10 h-8',
  lg: 'w-14 h-11',
  xl: 'w-20 h-16',
};

/**
 * DOODLED BOLD FRANCHISE MONOGRAM LOGOS
 * 
 * User requirement: "change the logos into doodled ones just the name like csk in bold
 * letters no fluff and in doodles design like bold and designed like lines in between the logo
 * like its drawn by hand"
 * 
 * - Bold typographic acronyms (CSK, MI, RCB, KKR, RR, SRH, GT, LSG, DC, PBKS)
 * - NO fluff (no animals, no extraneous crests)
 * - Hand-drawn etched sketch lines inside and across the letters (hatching, dashes, offset strokes)
 * - Hand-drawn organic sketch underline
 * - Vibrant authentic team palettes
 */
export default function FranchiseLogo({
  franchiseId,
  size = 'md',
  className = '',
}: FranchiseLogoProps) {
  const fid = (franchiseId || '').toLowerCase().trim();
  const dimensionClass = SIZE_MAP[size] || SIZE_MAP.md;

  // Render helper for bold doodled letters with interior hand-drawn sketch lines
  const renderDoodleLogo = (
    text: string,
    primaryColor: string,
    secondaryColor: string,
    accentLineColor: string,
    fontSize: number = 36,
    letterSpacing: number = 2
  ) => {
    const clipId = `doodle-clip-${fid}`;

    return (
      <svg
        viewBox="0 0 100 80"
        className={`${dimensionClass} shrink-0 inline-block drop-shadow-xs transition-transform duration-200 hover:scale-105 ${className}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label={`${text} Hand-Drawn Doodle Monogram`}
      >
        <defs>
          {/* Clip path defining the bold letter shapes */}
          <clipPath id={clipId}>
            <text
              x="50"
              y="48"
              textAnchor="middle"
              fontFamily="'Plus Jakarta Sans', system-ui, -apple-system, sans-serif"
              fontWeight="900"
              fontSize={fontSize}
              letterSpacing={letterSpacing}
            >
              {text}
            </text>
          </clipPath>
        </defs>

        {/* Hand-drawn letter shadow for depth */}
        <text
          x="52"
          y="50"
          textAnchor="middle"
          fontFamily="'Plus Jakarta Sans', system-ui, -apple-system, sans-serif"
          fontWeight="900"
          fontSize={fontSize}
          letterSpacing={letterSpacing}
          fill={secondaryColor}
          opacity="0.35"
        >
          {text}
        </text>

        {/* CLIPPED INTERIOR: Solid fill + hand-drawn etched lines across letters */}
        <g clipPath={`url(#${clipId})`}>
          {/* Primary background fill */}
          <rect width="100" height="80" fill={primaryColor} />

          {/* Hand-drawn etched horizontal sketch lines inside letters */}
          <line x1="5" y1="18" x2="95" y2="18" stroke={secondaryColor} strokeWidth="2" strokeDasharray="4 2" strokeLinecap="round" />
          <line x1="5" y1="26" x2="95" y2="26" stroke={secondaryColor} strokeWidth="2.5" strokeLinecap="round" />
          <line x1="5" y1="34" x2="95" y2="34" stroke={secondaryColor} strokeWidth="2" strokeDasharray="5 3" strokeLinecap="round" />
          <line x1="5" y1="42" x2="95" y2="42" stroke={secondaryColor} strokeWidth="2.5" strokeLinecap="round" />
          <line x1="5" y1="50" x2="95" y2="50" stroke={secondaryColor} strokeWidth="2" strokeDasharray="3 2" strokeLinecap="round" />

          {/* Diagonal hand-drawn pencil hatch highlights */}
          <path
            d="M10 10 L25 55 M24 10 L39 55 M38 10 L53 55 M52 10 L67 55 M66 10 L81 55 M80 10 L95 55"
            stroke={accentLineColor}
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeDasharray="4 3"
            opacity="0.75"
          />
        </g>

        {/* Outer hand-drawn contour outline */}
        <text
          x="50"
          y="48"
          textAnchor="middle"
          fontFamily="'Plus Jakarta Sans', system-ui, -apple-system, sans-serif"
          fontWeight="900"
          fontSize={fontSize}
          letterSpacing={letterSpacing}
          fill="none"
          stroke={secondaryColor}
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {text}
        </text>

        {/* Secondary inner hand-drawn fine line for sketchy organic feel */}
        <text
          x="49.5"
          y="47.5"
          textAnchor="middle"
          fontFamily="'Plus Jakarta Sans', system-ui, -apple-system, sans-serif"
          fontWeight="900"
          fontSize={fontSize}
          letterSpacing={letterSpacing}
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="0.8"
          strokeDasharray="4 4"
          opacity="0.7"
        >
          {text}
        </text>

        {/* Hand-Drawn Wavy Sketch Underlines */}
        <path
          d="M14 62 C 32 66, 68 59, 86 63"
          stroke={primaryColor}
          strokeWidth="4"
          strokeLinecap="round"
        />
        <path
          d="M18 66 C 36 70, 64 64, 82 68"
          stroke={secondaryColor}
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="5 3"
        />
        <circle cx="89" cy="64" r="2" fill={secondaryColor} />
      </svg>
    );
  };

  switch (fid) {
    // 1. CHENNAI SUPER KINGS (CSK) - Canary Gold with Deep Navy etched lines
    case 'csk':
      return renderDoodleLogo('CSK', '#FACC15', '#1E3A8A', '#FEF08A', 36, 2);

    // 2. MUMBAI INDIANS (MI) - Cobalt Blue with Vibrant Gold etched lines
    case 'mi':
      return renderDoodleLogo('MI', '#0284C7', '#F59E0B', '#38BDF8', 42, 3);

    // 3. ROYAL CHALLENGERS BENGALURU (RCB) - Crimson Red with Gold & Charcoal etched lines
    case 'rcb':
      return renderDoodleLogo('RCB', '#DC2626', '#1E1B18', '#FACC15', 35, 1.5);

    // 4. KOLKATA KNIGHT RIDERS (KKR) - Regal Purple with Sovereign Gold etched lines
    case 'kkr':
      return renderDoodleLogo('KKR', '#9333EA', '#FACC15', '#C084FC', 35, 2);

    // 5. RAJASTHAN ROYALS (RR) - Royal Pink with Midnight Navy etched lines
    case 'rr':
      return renderDoodleLogo('RR', '#EC4899', '#1E3A8A', '#FBCFE8', 42, 3);

    // 6. SUNRISERS HYDERABAD (SRH) - Fiery Orange with Obsidian Black etched lines
    case 'srh':
      return renderDoodleLogo('SRH', '#EA580C', '#18181B', '#FDBA74', 35, 2);

    // 7. GUJARAT TITANS (GT) - Deep Navy with Bright Teal etched lines
    case 'gt':
      return renderDoodleLogo('GT', '#0F172A', '#0D9488', '#FACC15', 42, 3);

    // 8. LUCKNOW SUPER GIANTS (LSG) - Sky Blue with Saffron Orange etched lines
    case 'lsg':
      return renderDoodleLogo('LSG', '#0284C7', '#EA580C', '#BAE6FD', 35, 2);

    // 9. DELHI CAPITALS (DC) - Capitals Royal Blue with Crimson Red etched lines
    case 'dc':
      return renderDoodleLogo('DC', '#2563EB', '#DC2626', '#93C5FD', 42, 3);

    // 10. PUNJAB KINGS (PBKS) - Bright Crimson with Golden Yellow etched lines
    case 'pbks':
      return renderDoodleLogo('PBKS', '#E11D48', '#F59E0B', '#FDA4AF', 30, 1.5);

    // Generic / Fallback
    default: {
      const initials = fid.substring(0, 3).toUpperCase() || 'IPL';
      return renderDoodleLogo(initials, '#EA580C', '#1E1B18', '#FED7AA', 36, 2);
    }
  }
}
