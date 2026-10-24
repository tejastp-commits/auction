'use client';

import React from 'react';

interface FranchiseLogoProps {
  franchiseId: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const SIZE_MAP = {
  xs: 'w-6 h-6',
  sm: 'w-8 h-8',
  md: 'w-11 h-11',
  lg: 'w-14 h-14',
  xl: 'w-20 h-20',
};

/**
 * 100% HAND-DRAWN DOODLE CRESTS FOR ALL 10 IPL FRANCHISES
 * 
 * Genuine sketchbook drawings with wavy outlines, sketch crosshatching,
 * hand-drawn mascot doodles (lions, cyclones, knights, eagles, tigers),
 * and handwritten marker typography.
 */
export default function FranchiseLogo({
  franchiseId,
  size = 'md',
  className = '',
}: FranchiseLogoProps) {
  const fid = (franchiseId || '').toLowerCase().trim();
  const dimensionClass = SIZE_MAP[size] || SIZE_MAP.md;

  switch (fid) {
    // 1. CHENNAI SUPER KINGS (CSK) - Hand-drawn roaring lion doodle & crown
    case 'csk':
      return (
        <svg
          viewBox="0 0 100 100"
          className={`${dimensionClass} shrink-0 inline-block drop-shadow-sm transition-transform duration-200 hover:rotate-2 ${className}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="CSK Hand-Drawn Doodle Crest"
        >
          {/* Wavy sketched shield */}
          <path
            d="M50 5 C 78 7, 88 20, 87 50 C 86 76, 72 92, 50 95 C 28 92, 14 76, 13 50 C 12 20, 22 7, 50 5 Z"
            fill="#FEF9C3"
            stroke="#2C2825"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          {/* Dashed inner doodle border */}
          <path
            d="M50 11 C 72 13, 80 23, 79 48 C 78 70, 66 84, 50 87 C 34 84, 22 70, 21 48 C 20 23, 28 13, 50 11 Z"
            stroke="#F59E0B"
            strokeWidth="1.5"
            strokeDasharray="3 3"
          />
          {/* Hand-drawn crown */}
          <path
            d="M37 22 L42 28 L50 16 L58 28 L63 22 L61 32 L39 32 Z"
            fill="#FDE047"
            stroke="#2C2825"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <circle cx="50" cy="14" r="2" fill="#E11D48" />
          {/* Cute hand-drawn roaring lion face/mane */}
          <path
            d="M32 40 C 26 34, 38 32, 42 36 C 46 32, 54 32, 58 36 C 62 32, 74 34, 68 40 C 74 46, 68 54, 64 54 C 60 58, 40 58, 36 54 C 32 54, 26 46, 32 40 Z"
            fill="#FED7AA"
            stroke="#2C2825"
            strokeWidth="2"
          />
          {/* Whiskers & roar mouth */}
          <line x1="28" y1="44" x2="36" y2="44" stroke="#2C2825" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="64" y1="44" x2="72" y2="44" stroke="#2C2825" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="43" cy="42" r="1.5" fill="#2C2825" />
          <circle cx="57" cy="42" r="1.5" fill="#2C2825" />
          <path d="M46 48 Q 50 52, 54 48" stroke="#2C2825" strokeWidth="1.8" strokeLinecap="round" fill="none" />
          {/* Bold Handwritten CSK */}
          <text
            x="50"
            y="74"
            textAnchor="middle"
            fontSize="26"
            fontWeight="900"
            fontFamily="Caveat, cursive"
            fill="#2C2825"
          >
            CSK
          </text>
          {/* Bottom little ribbon */}
          <path d="M30 80 Q 50 84, 70 80" stroke="#E11D48" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );

    // 2. MUMBAI INDIANS (MI) - Hand-drawn spinning cyclone & cricket ball
    case 'mi':
      return (
        <svg
          viewBox="0 0 100 100"
          className={`${dimensionClass} shrink-0 inline-block drop-shadow-sm transition-transform duration-200 hover:rotate-2 ${className}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="MI Hand-Drawn Doodle Crest"
        >
          {/* Wavy round crest */}
          <circle
            cx="50"
            cy="50"
            r="44"
            fill="#E0F2FE"
            stroke="#2C2825"
            strokeWidth="2.5"
          />
          <circle
            cx="50"
            cy="50"
            r="38"
            stroke="#0284C7"
            strokeWidth="1.5"
            strokeDasharray="4 3"
          />
          {/* Hand-drawn swirl vortex / cyclone */}
          <path
            d="M50 20 C 65 20, 72 32, 68 45 M78 50 C 78 65, 66 72, 53 68 M50 80 C 35 80, 28 68, 32 55 M22 50 C 22 35, 34 28, 47 32"
            stroke="#0284C7"
            strokeWidth="3"
            strokeLinecap="round"
          />
          {/* Center cricket ball */}
          <circle cx="50" cy="46" r="10" fill="#FDA4AF" stroke="#2C2825" strokeWidth="2" />
          <path d="M43 44 Q 50 49, 57 44" stroke="#FFFFFF" strokeWidth="1.5" strokeDasharray="1.5 1.5" />
          {/* Bold Handwritten MI */}
          <text
            x="50"
            y="76"
            textAnchor="middle"
            fontSize="30"
            fontWeight="900"
            fontFamily="Caveat, cursive"
            fill="#2C2825"
          >
            MI
          </text>
        </svg>
      );

    // 3. ROYAL CHALLENGERS BENGALURU (RCB) - Hand-drawn regal lion sketch & crown
    case 'rcb':
      return (
        <svg
          viewBox="0 0 100 100"
          className={`${dimensionClass} shrink-0 inline-block drop-shadow-sm transition-transform duration-200 hover:rotate-2 ${className}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="RCB Hand-Drawn Doodle Crest"
        >
          {/* Wavy shield */}
          <path
            d="M50 5 C 78 7, 88 20, 87 50 C 86 76, 72 92, 50 95 C 28 92, 14 76, 13 50 C 12 20, 22 7, 50 5 Z"
            fill="#FFE4E6"
            stroke="#2C2825"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          {/* Inner gold dashed border */}
          <path
            d="M50 11 C 72 13, 80 23, 79 48 C 78 70, 66 84, 50 87 C 34 84, 22 70, 21 48 C 20 23, 28 13, 50 11 Z"
            stroke="#E11D48"
            strokeWidth="1.5"
            strokeDasharray="3 3"
          />
          {/* Hand-drawn crown */}
          <path
            d="M38 20 L43 26 L50 15 L57 26 L62 20 L60 30 L40 30 Z"
            fill="#FEF08A"
            stroke="#2C2825"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          {/* Rampant lion sketch silhouette */}
          <path
            d="M44 32 C 40 34, 42 42, 46 44 L 43 52 L 48 54 L 49 46 C 54 46, 56 42, 54 34 Z"
            fill="#E11D48"
            stroke="#2C2825"
            strokeWidth="1.5"
          />
          {/* Extended paw with claws */}
          <line x1="42" y1="36" x2="36" y2="34" stroke="#2C2825" strokeWidth="2" strokeLinecap="round" />
          <line x1="36" y1="34" x2="34" y2="32" stroke="#2C2825" strokeWidth="1.5" />
          {/* Bold Handwritten RCB */}
          <text
            x="50"
            y="74"
            textAnchor="middle"
            fontSize="26"
            fontWeight="900"
            fontFamily="Caveat, cursive"
            fill="#2C2825"
          >
            RCB
          </text>
          {/* Hand-drawn star */}
          <polygon points="50,78 52,82 56,82 53,84.5 54,88 50,86 46,88 47,84.5 44,82 48,82" fill="#E11D48" />
        </svg>
      );

    // 4. KOLKATA KNIGHT RIDERS (KKR) - Hand-drawn knight helmet with plume
    case 'kkr':
      return (
        <svg
          viewBox="0 0 100 100"
          className={`${dimensionClass} shrink-0 inline-block drop-shadow-sm transition-transform duration-200 hover:rotate-2 ${className}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="KKR Hand-Drawn Doodle Crest"
        >
          {/* Wavy rounded shield */}
          <path
            d="M50 5 C 78 7, 88 20, 87 50 C 86 76, 72 92, 50 95 C 28 92, 14 76, 13 50 C 12 20, 22 7, 50 5 Z"
            fill="#F3E8FF"
            stroke="#2C2825"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          {/* Feathery wavy plume on top */}
          <path
            d="M50 10 C 45 4, 38 6, 42 16 C 36 12, 32 18, 44 22 C 38 24, 46 28, 50 26 C 54 28, 62 24, 56 22 C 68 18, 64 12, 58 16 C 62 6, 55 4, 50 10 Z"
            fill="#FDE047"
            stroke="#2C2825"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          {/* Hand-drawn knight visor helmet */}
          <path
            d="M36 28 C 36 24, 64 24, 64 28 L 62 48 C 62 56, 38 56, 38 48 Z"
            fill="#DDD6FE"
            stroke="#2C2825"
            strokeWidth="2.2"
            strokeLinejoin="round"
          />
          {/* Visor slit lines */}
          <line x1="42" y1="36" x2="58" y2="36" stroke="#2C2825" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="45" y1="42" x2="55" y2="42" stroke="#2C2825" strokeWidth="1.8" strokeLinecap="round" />
          {/* Bold Handwritten KKR */}
          <text
            x="50"
            y="75"
            textAnchor="middle"
            fontSize="26"
            fontWeight="900"
            fontFamily="Caveat, cursive"
            fill="#2C2825"
          >
            KKR
          </text>
        </svg>
      );

    // 5. RAJASTHAN ROYALS (RR) - Hand-drawn royal crown & crossed cricket bats
    case 'rr':
      return (
        <svg
          viewBox="0 0 100 100"
          className={`${dimensionClass} shrink-0 inline-block drop-shadow-sm transition-transform duration-200 hover:rotate-2 ${className}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="RR Hand-Drawn Doodle Crest"
        >
          {/* Wavy shield */}
          <path
            d="M50 5 C 78 7, 88 20, 87 50 C 86 76, 72 92, 50 95 C 28 92, 14 76, 13 50 C 12 20, 22 7, 50 5 Z"
            fill="#FCE7F3"
            stroke="#2C2825"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          {/* Crossed doodle cricket bats */}
          <g stroke="#2C2825" strokeWidth="2">
            <line x1="28" y1="24" x2="72" y2="60" strokeLinecap="round" />
            <line x1="72" y1="24" x2="28" y2="60" strokeLinecap="round" />
          </g>
          {/* Hand-drawn crown */}
          <path
            d="M34 22 L41 30 L50 18 L59 30 L66 22 L63 36 L37 36 Z"
            fill="#FEF08A"
            stroke="#2C2825"
            strokeWidth="2.2"
            strokeLinejoin="round"
          />
          <circle cx="50" cy="16" r="2.5" fill="#EC4899" />
          {/* Bold Handwritten RR */}
          <text
            x="50"
            y="75"
            textAnchor="middle"
            fontSize="32"
            fontWeight="900"
            fontFamily="Caveat, cursive"
            fill="#2C2825"
          >
            RR
          </text>
          {/* Little pink ribbon */}
          <path d="M34 81 Q 50 85, 66 81" stroke="#EC4899" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );

    // 6. SUNRISERS HYDERABAD (SRH) - Hand-drawn rising sun & raptor eagle wings
    case 'srh':
      return (
        <svg
          viewBox="0 0 100 100"
          className={`${dimensionClass} shrink-0 inline-block drop-shadow-sm transition-transform duration-200 hover:rotate-2 ${className}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="SRH Hand-Drawn Doodle Crest"
        >
          {/* Wavy round shield */}
          <path
            d="M50 5 C 78 7, 88 20, 87 50 C 86 76, 72 92, 50 95 C 28 92, 14 76, 13 50 C 12 20, 22 7, 50 5 Z"
            fill="#FFEDD5"
            stroke="#2C2825"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          {/* Rising sun with wavy radiant beams */}
          <path
            d="M32 40 C 32 28, 68 28, 68 40 Z"
            fill="#FDBA74"
            stroke="#2C2825"
            strokeWidth="2"
          />
          <line x1="50" y1="16" x2="50" y2="24" stroke="#F97316" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="36" y1="22" x2="42" y2="28" stroke="#F97316" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="64" y1="22" x2="58" y2="28" stroke="#F97316" strokeWidth="2.5" strokeLinecap="round" />
          {/* Raptor eagle wing silhouette doodle */}
          <path
            d="M26 36 Q 42 44, 50 38 Q 58 44, 74 36 Q 62 52, 50 48 Q 38 52, 26 36 Z"
            fill="#EA580C"
            stroke="#2C2825"
            strokeWidth="1.8"
          />
          {/* Bold Handwritten SRH */}
          <text
            x="50"
            y="74"
            textAnchor="middle"
            fontSize="26"
            fontWeight="900"
            fontFamily="Caveat, cursive"
            fill="#2C2825"
          >
            SRH
          </text>
        </svg>
      );

    // 7. GUJARAT TITANS (GT) - Hand-drawn lightning bolt & diamond chevron
    case 'gt':
      return (
        <svg
          viewBox="0 0 100 100"
          className={`${dimensionClass} shrink-0 inline-block drop-shadow-sm transition-transform duration-200 hover:rotate-2 ${className}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="GT Hand-Drawn Doodle Crest"
        >
          {/* Wavy diamond chevron */}
          <path
            d="M50 6 L 88 38 L 50 94 L 12 38 Z"
            fill="#CCFBF1"
            stroke="#2C2825"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          {/* Hand-drawn lightning bolt doodle */}
          <path
            d="M54 16 L 40 38 L 52 38 L 44 62 L 62 36 L 50 36 Z"
            fill="#FACC15"
            stroke="#2C2825"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          {/* Bold Handwritten GT */}
          <text
            x="50"
            y="78"
            textAnchor="middle"
            fontSize="30"
            fontWeight="900"
            fontFamily="Caveat, cursive"
            fill="#2C2825"
          >
            GT
          </text>
        </svg>
      );

    // 8. LUCKNOW SUPER GIANTS (LSG) - Hand-drawn eagle wings & cricket ball
    case 'lsg':
      return (
        <svg
          viewBox="0 0 100 100"
          className={`${dimensionClass} shrink-0 inline-block drop-shadow-sm transition-transform duration-200 hover:rotate-2 ${className}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="LSG Hand-Drawn Doodle Crest"
        >
          {/* Wavy shield */}
          <path
            d="M50 5 C 78 7, 88 20, 87 50 C 86 76, 72 92, 50 95 C 28 92, 14 76, 13 50 C 12 20, 22 7, 50 5 Z"
            fill="#E0F2FE"
            stroke="#2C2825"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          {/* Hand-drawn wings */}
          <path
            d="M24 28 C 36 28, 44 38, 50 42 C 56 38, 64 28, 76 28 C 68 44, 58 48, 50 46 C 42 48, 32 44, 24 28 Z"
            fill="#BAE6FD"
            stroke="#2C2825"
            strokeWidth="2"
          />
          {/* Center ball */}
          <circle cx="50" cy="38" r="7" fill="#F43F5E" stroke="#2C2825" strokeWidth="1.8" />
          {/* Bold Handwritten LSG */}
          <text
            x="50"
            y="74"
            textAnchor="middle"
            fontSize="26"
            fontWeight="900"
            fontFamily="Caveat, cursive"
            fill="#2C2825"
          >
            LSG
          </text>
        </svg>
      );

    // 9. DELHI CAPITALS (DC) - Hand-drawn tiger face & red ribbon
    case 'dc':
      return (
        <svg
          viewBox="0 0 100 100"
          className={`${dimensionClass} shrink-0 inline-block drop-shadow-sm transition-transform duration-200 hover:rotate-2 ${className}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="DC Hand-Drawn Doodle Crest"
        >
          {/* Wavy shield */}
          <path
            d="M50 5 C 78 7, 88 20, 87 50 C 86 76, 72 92, 50 95 C 28 92, 14 76, 13 50 C 12 20, 22 7, 50 5 Z"
            fill="#DBEAFE"
            stroke="#2C2825"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          {/* Hand-drawn tiger ears */}
          <circle cx="37" cy="26" r="6" fill="#FDBA74" stroke="#2C2825" strokeWidth="1.8" />
          <circle cx="63" cy="26" r="6" fill="#FDBA74" stroke="#2C2825" strokeWidth="1.8" />
          {/* Tiger head outline */}
          <circle cx="50" cy="36" r="16" fill="#FED7AA" stroke="#2C2825" strokeWidth="2" />
          {/* Tiger stripes */}
          <line x1="50" y1="22" x2="50" y2="28" stroke="#2C2825" strokeWidth="2" />
          <line x1="38" y1="36" x2="42" y2="36" stroke="#2C2825" strokeWidth="2" />
          <line x1="58" y1="36" x2="62" y2="36" stroke="#2C2825" strokeWidth="2" />
          {/* Eyes & nose */}
          <circle cx="45" cy="34" r="1.5" fill="#2C2825" />
          <circle cx="55" cy="34" r="1.5" fill="#2C2825" />
          <polygon points="50,38 48,41 52,41" fill="#E11D48" />
          {/* Bold Handwritten DC */}
          <text
            x="50"
            y="74"
            textAnchor="middle"
            fontSize="32"
            fontWeight="900"
            fontFamily="Caveat, cursive"
            fill="#2C2825"
          >
            DC
          </text>
        </svg>
      );

    // 10. PUNJAB KINGS (PBKS) - Hand-drawn lion shield & pennant
    case 'pbks':
    case 'pk':
      return (
        <svg
          viewBox="0 0 100 100"
          className={`${dimensionClass} shrink-0 inline-block drop-shadow-sm transition-transform duration-200 hover:rotate-2 ${className}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="PBKS Hand-Drawn Doodle Crest"
        >
          {/* Wavy shield */}
          <path
            d="M50 5 C 78 7, 88 20, 87 50 C 86 76, 72 92, 50 95 C 28 92, 14 76, 13 50 C 12 20, 22 7, 50 5 Z"
            fill="#FFE4E6"
            stroke="#2C2825"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          {/* Crown pennant on top */}
          <path
            d="M38 20 L44 26 L50 14 L56 26 L62 20 L60 30 L40 30 Z"
            fill="#FEF08A"
            stroke="#2C2825"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <circle cx="50" cy="12" r="2" fill="#E11D48" />
          {/* Hand-drawn lion profile doodle */}
          <path
            d="M40 36 C 40 32, 60 32, 60 36 C 60 46, 40 46, 40 36 Z"
            fill="#FDA4AF"
            stroke="#2C2825"
            strokeWidth="2"
          />
          <circle cx="46" cy="38" r="1.5" fill="#2C2825" />
          <circle cx="54" cy="38" r="1.5" fill="#2C2825" />
          {/* Bold Handwritten PBKS */}
          <text
            x="50"
            y="74"
            textAnchor="middle"
            fontSize="26"
            fontWeight="900"
            fontFamily="Caveat, cursive"
            fill="#2C2825"
          >
            PBKS
          </text>
        </svg>
      );

    default:
      return (
        <div
          className={`${dimensionClass} shrink-0 inline-flex items-center justify-center rounded-2xl bg-amber-100 border-2 border-[#2C2825] font-doodle font-black text-xs uppercase shadow-[2px_2px_0px_#2C2825] ${className}`}
        >
          {fid.slice(0, 3)}
        </div>
      );
  }
}
