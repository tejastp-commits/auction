'use client';

import React from 'react';

interface FranchiseLogoProps {
  franchiseId: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const SIZE_MAP = {
  xs: 'w-4 h-4',
  sm: 'w-6 h-6',
  md: 'w-8 h-8',
  lg: 'w-12 h-12',
  xl: 'w-16 h-16',
};

export default function FranchiseLogo({
  franchiseId,
  size = 'md',
  className = '',
}: FranchiseLogoProps) {
  const fid = (franchiseId || '').toLowerCase().trim();
  const dimensionClass = SIZE_MAP[size] || SIZE_MAP.md;

  switch (fid) {
    // 1. CHENNAI SUPER KINGS (CSK) - Golden Lion & Crown Shield
    case 'csk':
      return (
        <svg
          viewBox="0 0 100 100"
          className={`${dimensionClass} shrink-0 inline-block ${className}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="Chennai Super Kings"
        >
          <defs>
            <linearGradient id="csk-gold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFF176" />
              <stop offset="45%" stopColor="#FDB913" />
              <stop offset="100%" stopColor="#F29900" />
            </linearGradient>
            <linearGradient id="csk-blue" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#004B87" />
              <stop offset="100%" stopColor="#001B3A" />
            </linearGradient>
          </defs>
          <path
            d="M50 5 L88 20 C88 58 72 82 50 95 C28 82 12 58 12 20 Z"
            fill="url(#csk-blue)"
            stroke="url(#csk-gold)"
            strokeWidth="3.5"
          />
          {/* Crown */}
          <path d="M35 24 L50 16 L65 24 L60 30 L40 30 Z" fill="url(#csk-gold)" />
          <circle cx="50" cy="14" r="2.5" fill="#FFF" />
          <circle cx="35" cy="22" r="2" fill="#FFF" />
          <circle cx="65" cy="22" r="2" fill="#FFF" />
          {/* Roaring Lion Head */}
          <path
            d="M36 34 C44 32 56 32 64 34 C68 40 70 48 66 56 C62 64 52 68 50 72 C48 68 38 64 34 56 C30 48 32 40 36 34 Z"
            fill="url(#csk-gold)"
          />
          {/* Mane Flames */}
          <path d="M28 42 Q32 36 38 38 Q32 44 30 52 Z" fill="#FFF" opacity="0.8" />
          <path d="M72 42 Q68 36 62 38 Q68 44 70 52 Z" fill="#FFF" opacity="0.8" />
          {/* Lion Eyes & Snout */}
          <circle cx="43" cy="46" r="2" fill="#001B3A" />
          <circle cx="57" cy="46" r="2" fill="#001B3A" />
          <polygon points="50,52 46,56 54,56" fill="#001B3A" />
          {/* Wordmark Banner */}
          <rect x="22" y="74" width="56" height="13" rx="3.5" fill="#FDB913" stroke="#FFF" strokeWidth="1" />
          <text x="50" y="84" textAnchor="middle" fontSize="9.5" fontWeight="900" fill="#001B3A" fontFamily="sans-serif">
            CSK
          </text>
        </svg>
      );

    // 2. MUMBAI INDIANS (MI) - Sudarshan Chakra Razor Swirl
    case 'mi':
      return (
        <svg
          viewBox="0 0 100 100"
          className={`${dimensionClass} shrink-0 inline-block ${className}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="Mumbai Indians"
        >
          <defs>
            <linearGradient id="mi-blue" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0077B6" />
              <stop offset="60%" stopColor="#004BA0" />
              <stop offset="100%" stopColor="#00296B" />
            </linearGradient>
            <linearGradient id="mi-gold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFE082" />
              <stop offset="60%" stopColor="#D1AB3E" />
              <stop offset="100%" stopColor="#B38600" />
            </linearGradient>
          </defs>
          <circle cx="50" cy="50" r="45" fill="url(#mi-blue)" stroke="url(#mi-gold)" strokeWidth="3.5" />
          {/* Chakra Blades */}
          <g transform="translate(50,50)">
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
              <path
                key={i}
                d="M0 -36 C8 -24 12 -12 0 0 C-4 -12 -6 -24 0 -36 Z"
                fill={i % 2 === 0 ? 'url(#mi-gold)' : '#FFFFFF'}
                transform={`rotate(${angle})`}
                opacity={i % 2 === 0 ? '1' : '0.85'}
              />
            ))}
            <circle cx="0" cy="0" r="16" fill="#00296B" stroke="url(#mi-gold)" strokeWidth="2.5" />
            <text x="0" y="5" textAnchor="middle" fontSize="13" fontWeight="900" fill="url(#mi-gold)" fontFamily="sans-serif">
              MI
            </text>
          </g>
        </svg>
      );

    // 3. ROYAL CHALLENGERS BENGALURU (RCB) - Rampant Lion & Crown Shield
    case 'rcb':
      return (
        <svg
          viewBox="0 0 100 100"
          className={`${dimensionClass} shrink-0 inline-block ${className}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="Royal Challengers Bengaluru"
        >
          <defs>
            <linearGradient id="rcb-red" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FF333A" />
              <stop offset="50%" stopColor="#EC1C24" />
              <stop offset="100%" stopColor="#8A0006" />
            </linearGradient>
            <linearGradient id="rcb-gold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFDF73" />
              <stop offset="50%" stopColor="#E5A823" />
              <stop offset="100%" stopColor="#B37D00" />
            </linearGradient>
          </defs>
          <path
            d="M50 4 L88 18 C88 56 74 80 50 96 C26 80 12 56 12 18 Z"
            fill="url(#rcb-red)"
            stroke="url(#rcb-gold)"
            strokeWidth="3.5"
          />
          {/* Inner Black Crest */}
          <path d="M50 12 L80 24 C80 54 68 74 50 86 C32 74 20 54 20 24 Z" fill="#000000" opacity="0.9" />
          {/* Royal Crown */}
          <path d="M36 26 L50 18 L64 26 L60 32 L40 32 Z" fill="url(#rcb-gold)" />
          <circle cx="50" cy="16" r="2.5" fill="#FFF" />
          <circle cx="36" cy="24" r="2" fill="#FFF" />
          <circle cx="64" cy="24" r="2" fill="#FFF" />
          {/* Rampant Lion Silhouette */}
          <path
            d="M50 36 C55 36 58 40 56 45 C62 43 65 48 62 53 C66 56 64 63 58 64 C56 68 53 71 49 71 C45 71 42 66 42 60 C37 60 36 54 40 50 C37 46 41 40 45 40 C46 37 48 36 50 36 Z"
            fill="url(#rcb-gold)"
          />
          {/* Wordmark Banner */}
          <rect x="22" y="72" width="56" height="13" rx="3" fill="url(#rcb-gold)" />
          <text x="50" y="82" textAnchor="middle" fontSize="9.5" fontWeight="900" fill="#000000" fontFamily="sans-serif">
            RCB
          </text>
        </svg>
      );

    // 4. KOLKATA KNIGHT RIDERS (KKR) - Corinthian Knight Helmet & Golden Flame
    case 'kkr':
      return (
        <svg
          viewBox="0 0 100 100"
          className={`${dimensionClass} shrink-0 inline-block ${className}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="Kolkata Knight Riders"
        >
          <defs>
            <linearGradient id="kkr-purple" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#582C83" />
              <stop offset="50%" stopColor="#3A225D" />
              <stop offset="100%" stopColor="#221138" />
            </linearGradient>
            <linearGradient id="kkr-gold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFE57F" />
              <stop offset="50%" stopColor="#D4AF37" />
              <stop offset="100%" stopColor="#997A15" />
            </linearGradient>
          </defs>
          <path
            d="M50 5 L88 20 C88 58 72 82 50 95 C28 82 12 58 12 20 Z"
            fill="url(#kkr-purple)"
            stroke="url(#kkr-gold)"
            strokeWidth="3.5"
          />
          {/* Helmet Crest Flame */}
          <path d="M50 14 C46 22 54 26 50 34 C58 26 54 18 50 14 Z" fill="url(#kkr-gold)" />
          {/* Knight Helmet */}
          <path
            d="M34 38 C34 30 66 30 66 38 C66 48 64 56 58 64 C54 68 46 68 42 64 C36 56 34 48 34 38 Z"
            fill="url(#kkr-gold)"
          />
          <path d="M40 44 L60 44 L56 50 L44 50 Z" fill="#221138" />
          <path d="M47 50 L53 50 L50 62 Z" fill="#221138" />
          {/* Wordmark Banner */}
          <rect x="22" y="73" width="56" height="13" rx="3" fill="#D4AF37" stroke="#FFF" strokeWidth="0.8" />
          <text x="50" y="83" textAnchor="middle" fontSize="9.5" fontWeight="900" fill="#221138" fontFamily="sans-serif">
            KKR
          </text>
        </svg>
      );

    // 5. RAJASTHAN ROYALS (RR) - Pink & Royal Navy Maharajah Shield
    case 'rr':
      return (
        <svg
          viewBox="0 0 100 100"
          className={`${dimensionClass} shrink-0 inline-block ${className}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="Rajasthan Royals"
        >
          <defs>
            <linearGradient id="rr-pink" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FF409F" />
              <stop offset="60%" stopColor="#EA1A85" />
              <stop offset="100%" stopColor="#A60055" />
            </linearGradient>
            <linearGradient id="rr-blue" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#003566" />
              <stop offset="100%" stopColor="#001D48" />
            </linearGradient>
          </defs>
          <path
            d="M50 5 L88 20 C88 58 72 82 50 95 C28 82 12 58 12 20 Z"
            fill="url(#rr-pink)"
            stroke="#FFFFFF"
            strokeWidth="3.5"
          />
          {/* Royal Crown */}
          <path d="M35 24 L50 16 L65 24 L60 30 L40 30 Z" fill="#FFD700" stroke="#FFF" strokeWidth="1" />
          <circle cx="50" cy="14" r="2" fill="#FFF" />
          {/* Royal Lions flanking shield */}
          <path d="M30 42 C26 48 30 58 36 60 C38 52 36 46 30 42 Z" fill="#FFD700" />
          <path d="M70 42 C74 48 70 58 64 60 C62 52 64 46 70 42 Z" fill="#FFD700" />
          {/* Center Navy Crest */}
          <circle cx="50" cy="50" r="16" fill="url(#rr-blue)" stroke="#FFD700" strokeWidth="2" />
          <text x="50" y="56" textAnchor="middle" fontSize="13" fontWeight="900" fill="#FFD700" fontFamily="sans-serif">
            RR
          </text>
          {/* Royals Banner */}
          <rect x="22" y="74" width="56" height="13" rx="3.5" fill="url(#rr-blue)" stroke="#FFD700" strokeWidth="1" />
          <text x="50" y="84" textAnchor="middle" fontSize="9" fontWeight="900" fill="#FFF" fontFamily="sans-serif">
            ROYALS
          </text>
        </svg>
      );

    // 6. SUNRISERS HYDERABAD (SRH) - Rising Eagle & Sunburst
    case 'srh':
      return (
        <svg
          viewBox="0 0 100 100"
          className={`${dimensionClass} shrink-0 inline-block ${className}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="Sunrisers Hyderabad"
        >
          <defs>
            <linearGradient id="srh-orange" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFA040" />
              <stop offset="50%" stopColor="#F26522" />
              <stop offset="100%" stopColor="#B33E00" />
            </linearGradient>
            <linearGradient id="srh-sun" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFEE55" />
              <stop offset="100%" stopColor="#FF7700" />
            </linearGradient>
          </defs>
          <path
            d="M50 6 L88 20 C88 58 72 82 50 95 C28 82 12 58 12 20 Z"
            fill="#111111"
            stroke="url(#srh-orange)"
            strokeWidth="3.5"
          />
          {/* Rising Sun Arc */}
          <circle cx="50" cy="46" r="22" fill="url(#srh-sun)" />
          {/* Sunburst Rays */}
          {[0, 30, 60, 90, 120, 150, 180].map((deg) => (
            <line
              key={deg}
              x1="50"
              y1="46"
              x2={50 + 26 * Math.cos((deg * Math.PI) / 180 - Math.PI)}
              y2={46 + 26 * Math.sin((deg * Math.PI) / 180 - Math.PI)}
              stroke="#FFF"
              strokeWidth="1.5"
              opacity="0.8"
            />
          ))}
          {/* Eagle Silhouette */}
          <path
            d="M50 36 C42 42 28 46 20 44 C26 50 36 54 44 52 L50 64 L56 52 C64 54 74 50 80 44 C72 46 58 42 50 36 Z"
            fill="#FFFFFF"
          />
          {/* Wordmark Banner */}
          <rect x="22" y="73" width="56" height="13" rx="3" fill="url(#srh-orange)" stroke="#FFF" strokeWidth="1" />
          <text x="50" y="83" textAnchor="middle" fontSize="9.5" fontWeight="900" fill="#000000" fontFamily="sans-serif">
            SRH
          </text>
        </svg>
      );

    // 7. GUJARAT TITANS (GT) - Titanium Lightning Spire
    case 'gt':
      return (
        <svg
          viewBox="0 0 100 100"
          className={`${dimensionClass} shrink-0 inline-block ${className}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="Gujarat Titans"
        >
          <defs>
            <linearGradient id="gt-navy" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2B3956" />
              <stop offset="60%" stopColor="#1B2133" />
              <stop offset="100%" stopColor="#0F131D" />
            </linearGradient>
            <linearGradient id="gt-gold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#E2C999" />
              <stop offset="60%" stopColor="#B08D57" />
              <stop offset="100%" stopColor="#876633" />
            </linearGradient>
          </defs>
          <polygon
            points="50,6 90,26 78,88 50,96 22,88 10,26"
            fill="url(#gt-navy)"
            stroke="url(#gt-gold)"
            strokeWidth="3.5"
          />
          {/* Lightning Bolt */}
          <polygon points="54,18 36,48 50,48 46,74 66,42 52,42" fill="url(#gt-gold)" stroke="#FFF" strokeWidth="1" />
          {/* Wordmark Banner */}
          <rect x="24" y="75" width="52" height="13" rx="3" fill="url(#gt-gold)" />
          <text x="50" y="85" textAnchor="middle" fontSize="9.5" fontWeight="900" fill="#0F131D" fontFamily="sans-serif">
            TITANS
          </text>
        </svg>
      );

    // 8. LUCKNOW SUPER GIANTS (LSG) - Winged Speed Crest
    case 'lsg':
      return (
        <svg
          viewBox="0 0 100 100"
          className={`${dimensionClass} shrink-0 inline-block ${className}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="Lucknow Super Giants"
        >
          <defs>
            <linearGradient id="lsg-cyan" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00A8E8" />
              <stop offset="100%" stopColor="#003B73" />
            </linearGradient>
            <linearGradient id="lsg-tri" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FF9933" />
              <stop offset="50%" stopColor="#FFFFFF" />
              <stop offset="100%" stopColor="#138808" />
            </linearGradient>
          </defs>
          <path
            d="M50 6 L88 20 C88 58 72 82 50 95 C28 82 12 58 12 20 Z"
            fill="url(#lsg-cyan)"
            stroke="url(#lsg-tri)"
            strokeWidth="3.5"
          />
          {/* Speed Wings */}
          <path d="M22 36 Q38 32 48 44 Q36 48 24 46 Z" fill="#FFF" opacity="0.9" />
          <path d="M78 36 Q62 32 52 44 Q64 48 76 46 Z" fill="#FFF" opacity="0.9" />
          <path d="M26 48 Q38 46 46 54 Q36 58 28 56 Z" fill="#FF9933" />
          <path d="M74 48 Q62 46 54 54 Q64 58 72 56 Z" fill="#138808" />
          {/* Bat / Ball Icon */}
          <circle cx="50" cy="50" r="7" fill="#E63946" stroke="#FFF" strokeWidth="1.5" />
          {/* Wordmark Banner */}
          <rect x="22" y="73" width="56" height="13" rx="3" fill="#FFFFFF" stroke="#003B73" strokeWidth="1" />
          <text x="50" y="83" textAnchor="middle" fontSize="9.5" fontWeight="900" fill="#003B73" fontFamily="sans-serif">
            LSG
          </text>
        </svg>
      );

    // 9. DELHI CAPITALS (DC) - Three Tigers & Parliament Dome Shield
    case 'dc':
      return (
        <svg
          viewBox="0 0 100 100"
          className={`${dimensionClass} shrink-0 inline-block ${className}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="Delhi Capitals"
        >
          <defs>
            <linearGradient id="dc-blue" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0078BC" />
              <stop offset="100%" stopColor="#003366" />
            </linearGradient>
            <linearGradient id="dc-red" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FF3344" />
              <stop offset="100%" stopColor="#EF1B23" />
            </linearGradient>
          </defs>
          <path
            d="M50 5 L88 20 C88 58 72 82 50 95 C28 82 12 58 12 20 Z"
            fill="url(#dc-blue)"
            stroke="url(#dc-red)"
            strokeWidth="3.5"
          />
          {/* Parliament Dome */}
          <path d="M42 28 C42 20 58 20 58 28 Z" fill="#FFF" />
          <rect x="40" y="28" width="20" height="3" fill="#FFF" />
          {/* Three Roaring Tigers Heraldry */}
          <circle cx="50" cy="44" r="8" fill="url(#dc-red)" stroke="#FFF" strokeWidth="1" />
          <circle cx="36" cy="50" r="7" fill="url(#dc-red)" stroke="#FFF" strokeWidth="1" />
          <circle cx="64" cy="50" r="7" fill="url(#dc-red)" stroke="#FFF" strokeWidth="1" />
          {/* Wordmark Banner */}
          <rect x="22" y="73" width="56" height="13" rx="3" fill="url(#dc-red)" stroke="#FFF" strokeWidth="1" />
          <text x="50" y="83" textAnchor="middle" fontSize="9.5" fontWeight="900" fill="#FFFFFF" fontFamily="sans-serif">
            DC
          </text>
        </svg>
      );

    // 10. PUNJAB KINGS (PBKS) - Red Shield with Golden Lion Rampart
    case 'pbks':
    case 'pk':
      return (
        <svg
          viewBox="0 0 100 100"
          className={`${dimensionClass} shrink-0 inline-block ${className}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="Punjab Kings"
        >
          <defs>
            <linearGradient id="pbks-red" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FF2A3B" />
              <stop offset="60%" stopColor="#DD1F2D" />
              <stop offset="100%" stopColor="#9E000D" />
            </linearGradient>
            <linearGradient id="pbks-gold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFF2A3" />
              <stop offset="50%" stopColor="#D4AF37" />
              <stop offset="100%" stopColor="#A37F15" />
            </linearGradient>
          </defs>
          <path
            d="M50 5 L88 20 C88 58 72 82 50 95 C28 82 12 58 12 20 Z"
            fill="url(#pbks-red)"
            stroke="url(#pbks-gold)"
            strokeWidth="3.5"
          />
          {/* Crown Pennants */}
          <path d="M38 24 L50 16 L62 24 L58 29 L42 29 Z" fill="url(#pbks-gold)" />
          {/* Roaring Lion */}
          <path
            d="M38 36 C44 32 56 32 62 36 C66 42 66 50 62 56 C58 62 52 66 50 68 C48 66 42 62 38 56 C34 50 34 42 38 36 Z"
            fill="url(#pbks-gold)"
          />
          {/* Wordmark Banner */}
          <rect x="20" y="73" width="60" height="13" rx="3" fill="#D4AF37" stroke="#FFF" strokeWidth="1" />
          <text x="50" y="83" textAnchor="middle" fontSize="9" fontWeight="900" fill="#9E000D" fontFamily="sans-serif">
            PUNJAB
          </text>
        </svg>
      );

    default:
      return (
        <span
          className={`inline-flex items-center justify-center rounded-full bg-slate-800 text-[10px] font-bold text-white uppercase ${dimensionClass} ${className}`}
        >
          {fid.substring(0, 3)}
        </span>
      );
  }
}
