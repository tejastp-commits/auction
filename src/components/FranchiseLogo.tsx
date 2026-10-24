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
    // 1. CHENNAI SUPER KINGS (CSK) - Bold CSK with Royal Lion & Crown
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
            <linearGradient id="csk-shield" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#005B9E" />
              <stop offset="60%" stopColor="#003D73" />
              <stop offset="100%" stopColor="#001B3A" />
            </linearGradient>
            <linearGradient id="csk-gold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFF780" />
              <stop offset="40%" stopColor="#FDB913" />
              <stop offset="100%" stopColor="#F28C00" />
            </linearGradient>
            <linearGradient id="csk-mane" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FF9E00" />
              <stop offset="100%" stopColor="#DD2C00" />
            </linearGradient>
          </defs>
          {/* Shield Outline */}
          <path
            d="M50 4 L88 18 C88 58 72 82 50 96 C28 82 12 58 12 18 Z"
            fill="url(#csk-shield)"
            stroke="url(#csk-gold)"
            strokeWidth="3.5"
          />
          {/* Top Royal Crown */}
          <g fill="url(#csk-gold)">
            <path d="M38 18 L50 10 L62 18 L58 24 L42 24 Z" />
            <circle cx="50" cy="8.5" r="2" fill="#FFFFFF" />
            <circle cx="38" cy="16.5" r="1.5" fill="#FFFFFF" />
            <circle cx="62" cy="16.5" r="1.5" fill="#FFFFFF" />
          </g>
          {/* Lion Roar Flame Accents */}
          <path d="M26 30 Q36 24 48 30 Q34 36 26 30 Z" fill="url(#csk-mane)" opacity="0.9" />
          <path d="M74 30 Q64 24 52 30 Q66 36 74 30 Z" fill="url(#csk-mane)" opacity="0.9" />
          {/* Center Bold CSK Text */}
          <text
            x="50"
            y="62"
            textAnchor="middle"
            fontSize="30"
            fontWeight="900"
            fontFamily="system-ui, -apple-system, sans-serif"
            letterSpacing="1.5"
            fill="url(#csk-gold)"
            stroke="#001B3A"
            strokeWidth="1.2"
          >
            CSK
          </text>
          {/* Yellow Banner Strip at Bottom */}
          <rect x="24" y="74" width="52" height="10" rx="3" fill="url(#csk-gold)" />
          <text x="50" y="82" textAnchor="middle" fontSize="6.5" fontWeight="900" fill="#001B3A" letterSpacing="1">
            SUPER KINGS
          </text>
        </svg>
      );

    // 2. MUMBAI INDIANS (MI) - Bold MI with Sudarshan Razor Chakra
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
              <stop offset="50%" stopColor="#004BA0" />
              <stop offset="100%" stopColor="#001F54" />
            </linearGradient>
            <linearGradient id="mi-gold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFF3B0" />
              <stop offset="50%" stopColor="#FFD700" />
              <stop offset="100%" stopColor="#B38600" />
            </linearGradient>
          </defs>
          {/* Blue Shield / Disc */}
          <circle cx="50" cy="50" r="46" fill="url(#mi-blue)" stroke="url(#mi-gold)" strokeWidth="3.5" />
          {/* Swirling Chakra Razor Blades */}
          <g transform="translate(50,50)">
            {[0, 60, 120, 180, 240, 300].map((angle, i) => (
              <path
                key={angle}
                d="M0 -44 C6 -34 12 -22 4 -10 C0 -20 -2 -34 0 -44 Z"
                fill={i % 2 === 0 ? 'url(#mi-gold)' : '#FFFFFF'}
                transform={`rotate(${angle})`}
                opacity="0.85"
              />
            ))}
          </g>
          {/* Center Dark Disc */}
          <circle cx="50" cy="50" r="28" fill="#001F54" stroke="url(#mi-gold)" strokeWidth="2" />
          {/* Center Bold MI */}
          <text
            x="50"
            y="61"
            textAnchor="middle"
            fontSize="34"
            fontWeight="900"
            fontFamily="system-ui, -apple-system, sans-serif"
            letterSpacing="2"
            fill="url(#mi-gold)"
            stroke="#001F54"
            strokeWidth="0.8"
          >
            MI
          </text>
          {/* Tricolor Ribbon at Bottom */}
          <path d="M30 84 Q50 79 70 84" stroke="#FF9933" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M32 87 Q50 82 68 87" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
          <path d="M34 90 Q50 85 66 90" stroke="#138808" strokeWidth="2.2" strokeLinecap="round" />
        </svg>
      );

    // 3. ROYAL CHALLENGERS BENGALURU (RCB) - Bold RCB with Crown & Crest
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
              <stop offset="0%" stopColor="#D90429" />
              <stop offset="60%" stopColor="#A0001E" />
              <stop offset="100%" stopColor="#4A000C" />
            </linearGradient>
            <linearGradient id="rcb-gold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFF176" />
              <stop offset="50%" stopColor="#E5A823" />
              <stop offset="100%" stopColor="#B37D00" />
            </linearGradient>
          </defs>
          {/* Shield Outline */}
          <path
            d="M50 4 L88 18 C88 56 74 80 50 96 C26 80 12 56 12 18 Z"
            fill="url(#rcb-red)"
            stroke="url(#rcb-gold)"
            strokeWidth="3.5"
          />
          {/* Inner Black Field */}
          <path d="M50 10 L82 22 C82 52 70 72 50 86 C30 72 18 52 18 22 Z" fill="#0A0A0A" />
          {/* Top Royal Crown */}
          <g fill="url(#rcb-gold)">
            <path d="M38 18 L50 11 L62 18 L58 23 L42 23 Z" />
            <circle cx="50" cy="9.5" r="2" fill="#FFFFFF" />
            <circle cx="38" cy="16.5" r="1.5" fill="#FFFFFF" />
            <circle cx="62" cy="16.5" r="1.5" fill="#FFFFFF" />
          </g>
          {/* Center Bold RCB */}
          <text
            x="50"
            y="58"
            textAnchor="middle"
            fontSize="28"
            fontWeight="900"
            fontFamily="system-ui, -apple-system, sans-serif"
            letterSpacing="1.5"
            fill="url(#rcb-gold)"
            stroke="#0A0A0A"
            strokeWidth="1"
          >
            RCB
          </text>
          {/* Lower Gold Ribbon */}
          <rect x="22" y="70" width="56" height="12" rx="3" fill="url(#rcb-gold)" />
          <text x="50" y="79" textAnchor="middle" fontSize="6.5" fontWeight="900" fill="#0A0A0A" letterSpacing="1">
            BENGALURU
          </text>
        </svg>
      );

    // 4. KOLKATA KNIGHT RIDERS (KKR) - Bold KKR with Golden Knight Helmet
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
              <stop offset="60%" stopColor="#37185B" />
              <stop offset="100%" stopColor="#1C0A33" />
            </linearGradient>
            <linearGradient id="kkr-gold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFF2A3" />
              <stop offset="45%" stopColor="#D4AF37" />
              <stop offset="100%" stopColor="#997A15" />
            </linearGradient>
          </defs>
          <path
            d="M50 4 L88 18 C88 58 72 82 50 96 C28 82 12 58 12 18 Z"
            fill="url(#kkr-purple)"
            stroke="url(#kkr-gold)"
            strokeWidth="3.5"
          />
          {/* Knight Helmet Silhouette on Top */}
          <g fill="url(#kkr-gold)">
            <path d="M46 10 C46 18 54 18 54 10 C50 14 50 14 46 10 Z" />
            <circle cx="50" cy="18" r="5" />
          </g>
          {/* Center Bold KKR */}
          <text
            x="50"
            y="58"
            textAnchor="middle"
            fontSize="28"
            fontWeight="900"
            fontFamily="system-ui, -apple-system, sans-serif"
            letterSpacing="1.5"
            fill="url(#kkr-gold)"
            stroke="#1C0A33"
            strokeWidth="1"
          >
            KKR
          </text>
          {/* Gold Banner */}
          <rect x="22" y="70" width="56" height="12" rx="3" fill="url(#kkr-gold)" />
          <text x="50" y="79" textAnchor="middle" fontSize="6.5" fontWeight="900" fill="#1C0A33" letterSpacing="1">
            KNIGHT RIDERS
          </text>
        </svg>
      );

    // 5. RAJASTHAN ROYALS (RR) - Bold RR with Pink & Royal Navy Crest
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
              <stop offset="50%" stopColor="#EA1A85" />
              <stop offset="100%" stopColor="#A60055" />
            </linearGradient>
            <linearGradient id="rr-gold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFF2A3" />
              <stop offset="50%" stopColor="#FFD700" />
              <stop offset="100%" stopColor="#B38600" />
            </linearGradient>
          </defs>
          <path
            d="M50 4 L88 18 C88 58 72 82 50 96 C28 82 12 58 12 18 Z"
            fill="url(#rr-pink)"
            stroke="#FFFFFF"
            strokeWidth="3.5"
          />
          {/* Maharajah Crown on Top */}
          <g fill="url(#rr-gold)">
            <path d="M37 18 L50 11 L63 18 L59 23 L41 23 Z" />
            <circle cx="50" cy="9.5" r="2" fill="#FFFFFF" />
          </g>
          {/* Center Navy Disc */}
          <circle cx="50" cy="50" r="28" fill="#001D48" stroke="url(#rr-gold)" strokeWidth="2.5" />
          {/* Center Bold RR */}
          <text
            x="50"
            y="61"
            textAnchor="middle"
            fontSize="34"
            fontWeight="900"
            fontFamily="system-ui, -apple-system, sans-serif"
            letterSpacing="2"
            fill="url(#rr-gold)"
          >
            RR
          </text>
          {/* Royals Banner */}
          <rect x="22" y="74" width="56" height="11" rx="3" fill="#001D48" stroke="url(#rr-gold)" strokeWidth="1" />
          <text x="50" y="82.5" textAnchor="middle" fontSize="7" fontWeight="900" fill="#FFFFFF" letterSpacing="1.2">
            ROYALS
          </text>
        </svg>
      );

    // 6. SUNRISERS HYDERABAD (SRH) - Bold SRH with Fiery Sunburst
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
            <linearGradient id="srh-fire" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFB300" />
              <stop offset="50%" stopColor="#FF6D00" />
              <stop offset="100%" stopColor="#DD2C00" />
            </linearGradient>
          </defs>
          <path
            d="M50 4 L88 18 C88 58 72 82 50 96 C28 82 12 58 12 18 Z"
            fill="#141414"
            stroke="url(#srh-fire)"
            strokeWidth="3.5"
          />
          {/* Sunburst Rays at top */}
          {[30, 60, 90, 120, 150].map((deg) => (
            <line
              key={deg}
              x1="50"
              y1="36"
              x2={50 + 22 * Math.cos((deg * Math.PI) / 180 - Math.PI)}
              y2={36 + 22 * Math.sin((deg * Math.PI) / 180 - Math.PI)}
              stroke="#FFF"
              strokeWidth="2"
              opacity="0.8"
            />
          ))}
          {/* Soaring Eagle Arc */}
          <path d="M26 28 Q50 38 74 28 Q50 32 26 28 Z" fill="#FFFFFF" />
          {/* Center Bold SRH */}
          <text
            x="50"
            y="60"
            textAnchor="middle"
            fontSize="28"
            fontWeight="900"
            fontFamily="system-ui, -apple-system, sans-serif"
            letterSpacing="1.5"
            fill="url(#srh-fire)"
            stroke="#141414"
            strokeWidth="1"
          >
            SRH
          </text>
          {/* Orange Banner */}
          <rect x="22" y="72" width="56" height="12" rx="3" fill="url(#srh-fire)" />
          <text x="50" y="81" textAnchor="middle" fontSize="6.5" fontWeight="900" fill="#000000" letterSpacing="1">
            SUNRISERS
          </text>
        </svg>
      );

    // 7. GUJARAT TITANS (GT) - Bold GT with Titanium Lightning Prism
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
              <stop offset="0%" stopColor="#253248" />
              <stop offset="50%" stopColor="#172033" />
              <stop offset="100%" stopColor="#0B0F19" />
            </linearGradient>
            <linearGradient id="gt-gold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F5DFB3" />
              <stop offset="50%" stopColor="#C8A668" />
              <stop offset="100%" stopColor="#8C682A" />
            </linearGradient>
          </defs>
          <polygon
            points="50,4 92,26 78,88 50,97 22,88 8,26"
            fill="url(#gt-navy)"
            stroke="url(#gt-gold)"
            strokeWidth="3.5"
          />
          {/* Electric Lightning Bolt Accent */}
          <polygon points="52,14 38,36 48,36 44,56 62,32 50,32" fill="url(#gt-gold)" opacity="0.8" />
          {/* Center Bold GT */}
          <text
            x="50"
            y="64"
            textAnchor="middle"
            fontSize="34"
            fontWeight="900"
            fontFamily="system-ui, -apple-system, sans-serif"
            letterSpacing="2"
            fill="url(#gt-gold)"
            stroke="#0B0F19"
            strokeWidth="1"
          >
            GT
          </text>
          {/* Gold Banner */}
          <rect x="22" y="74" width="56" height="12" rx="3" fill="url(#gt-gold)" />
          <text x="50" y="83" textAnchor="middle" fontSize="7" fontWeight="900" fill="#0B0F19" letterSpacing="1">
            TITANS
          </text>
        </svg>
      );

    // 8. LUCKNOW SUPER GIANTS (LSG) - Bold LSG with Tricolor Wings
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
            <linearGradient id="lsg-sky" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00A8E8" />
              <stop offset="50%" stopColor="#007EA7" />
              <stop offset="100%" stopColor="#003459" />
            </linearGradient>
          </defs>
          <path
            d="M50 4 L88 18 C88 58 72 82 50 96 C28 82 12 58 12 18 Z"
            fill="url(#lsg-sky)"
            stroke="#FFFFFF"
            strokeWidth="3.5"
          />
          {/* Tricolor Garuda Wing Accents */}
          <path d="M22 28 Q36 22 48 32 Q34 36 22 28 Z" fill="#FF9933" />
          <path d="M78 28 Q64 22 52 32 Q66 36 78 28 Z" fill="#FF9933" />
          <path d="M24 36 Q38 30 48 40 Q36 44 24 36 Z" fill="#FFFFFF" />
          <path d="M76 36 Q62 30 52 40 Q64 44 76 36 Z" fill="#138808" />
          {/* Center Bold LSG */}
          <text
            x="50"
            y="62"
            textAnchor="middle"
            fontSize="28"
            fontWeight="900"
            fontFamily="system-ui, -apple-system, sans-serif"
            letterSpacing="1.5"
            fill="#FFFFFF"
            stroke="#003459"
            strokeWidth="1.2"
          >
            LSG
          </text>
          {/* White Banner */}
          <rect x="22" y="73" width="56" height="12" rx="3" fill="#FFFFFF" stroke="#003459" strokeWidth="1" />
          <text x="50" y="82" textAnchor="middle" fontSize="6.5" fontWeight="900" fill="#003459" letterSpacing="1">
            SUPER GIANTS
          </text>
        </svg>
      );

    // 9. DELHI CAPITALS (DC) - Bold DC with Tigers & Parliament Dome
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
              <stop offset="50%" stopColor="#004D80" />
              <stop offset="100%" stopColor="#002244" />
            </linearGradient>
            <linearGradient id="dc-red" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FF3344" />
              <stop offset="100%" stopColor="#CC0011" />
            </linearGradient>
          </defs>
          <path
            d="M50 4 L88 18 C88 58 72 82 50 96 C28 82 12 58 12 18 Z"
            fill="url(#dc-blue)"
            stroke="url(#dc-red)"
            strokeWidth="3.5"
          />
          {/* Parliament Dome Silhouette */}
          <path d="M42 22 C42 14 58 14 58 22 Z" fill="#FFFFFF" opacity="0.8" />
          <rect x="40" y="22" width="20" height="2.5" fill="#FFFFFF" opacity="0.8" />
          {/* Center Bold DC */}
          <text
            x="50"
            y="58"
            textAnchor="middle"
            fontSize="34"
            fontWeight="900"
            fontFamily="system-ui, -apple-system, sans-serif"
            letterSpacing="2"
            fill="#FFFFFF"
            stroke="url(#dc-red)"
            strokeWidth="1.2"
          >
            DC
          </text>
          {/* Red Banner */}
          <rect x="22" y="71" width="56" height="12" rx="3" fill="url(#dc-red)" stroke="#FFFFFF" strokeWidth="0.8" />
          <text x="50" y="80" textAnchor="middle" fontSize="6.5" fontWeight="900" fill="#FFFFFF" letterSpacing="1">
            CAPITALS
          </text>
        </svg>
      );

    // 10. PUNJAB KINGS (PBKS) - Bold PBKS with Red Shield & Crown
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
              <stop offset="0%" stopColor="#E61C24" />
              <stop offset="50%" stopColor="#B30006" />
              <stop offset="100%" stopColor="#5E0003" />
            </linearGradient>
            <linearGradient id="pbks-gold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFF2A3" />
              <stop offset="50%" stopColor="#D4AF37" />
              <stop offset="100%" stopColor="#997A15" />
            </linearGradient>
          </defs>
          <path
            d="M50 4 L88 18 C88 58 72 82 50 96 C28 82 12 58 12 18 Z"
            fill="url(#pbks-red)"
            stroke="url(#pbks-gold)"
            strokeWidth="3.5"
          />
          {/* Crown Pennants atop shield */}
          <g fill="url(#pbks-gold)">
            <path d="M38 18 L50 11 L62 18 L58 23 L42 23 Z" />
            <circle cx="50" cy="9.5" r="2" fill="#FFFFFF" />
          </g>
          {/* Center Bold PBKS */}
          <text
            x="50"
            y="57"
            textAnchor="middle"
            fontSize="24"
            fontWeight="900"
            fontFamily="system-ui, -apple-system, sans-serif"
            letterSpacing="1.2"
            fill="url(#pbks-gold)"
            stroke="#5E0003"
            strokeWidth="1"
          >
            PBKS
          </text>
          {/* Gold Banner */}
          <rect x="22" y="70" width="56" height="12" rx="3" fill="url(#pbks-gold)" stroke="#FFFFFF" strokeWidth="0.8" />
          <text x="50" y="79" textAnchor="middle" fontSize="7" fontWeight="900" fill="#5E0003" letterSpacing="1">
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
