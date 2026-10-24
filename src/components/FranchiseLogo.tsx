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
  md: 'w-10 h-10',
  lg: 'w-14 h-14',
  xl: 'w-20 h-20',
};

/**
 * MODERN, ATHLETIC, EYE-CATCHING CRESTS FOR ALL 10 IPL FRANCHISES
 * 
 * Clean architectural geometry, bold sports typography, and authentic team palettes.
 * Designed for big-stage broadcast presentation (no childish scribbles or vague shapes).
 */
export default function FranchiseLogo({
  franchiseId,
  size = 'md',
  className = '',
}: FranchiseLogoProps) {
  const fid = (franchiseId || '').toLowerCase().trim();
  const dimensionClass = SIZE_MAP[size] || SIZE_MAP.md;

  switch (fid) {
    // 1. CHENNAI SUPER KINGS (CSK) - Sovereign Gold & Midnight Navy
    case 'csk':
      return (
        <svg
          viewBox="0 0 100 100"
          className={`${dimensionClass} shrink-0 inline-block drop-shadow-sm transition-transform duration-200 hover:scale-105 ${className}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="CSK Official Crest"
        >
          <defs>
            <linearGradient id="csk-shield-bg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0B1A30" />
              <stop offset="100%" stopColor="#040A14" />
            </linearGradient>
            <linearGradient id="csk-gold-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFF275" />
              <stop offset="50%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#D97706" />
            </linearGradient>
          </defs>
          <path
            d="M50 4 L88 17 C88 60 72 84 50 97 C28 84 12 60 12 17 Z"
            fill="url(#csk-shield-bg)"
            stroke="url(#csk-gold-grad)"
            strokeWidth="3"
          />
          {/* Inner hairline */}
          <path
            d="M50 10 L82 21 C82 56 68 76 50 88 C32 76 18 56 18 21 Z"
            stroke="url(#csk-gold-grad)"
            strokeWidth="1"
            strokeOpacity="0.4"
          />
          {/* Crown */}
          <path d="M38 20 L50 12 L62 20 L58 26 L42 26 Z" fill="url(#csk-gold-grad)" />
          <circle cx="50" cy="10" r="2" fill="#FFFFFF" />
          {/* Fierce Lion Mane Arcs */}
          <path d="M26 36 Q 38 28, 50 34 Q 36 40, 26 36 Z" fill="url(#csk-gold-grad)" />
          <path d="M74 36 Q 62 28, 50 34 Q 64 40, 74 36 Z" fill="url(#csk-gold-grad)" />
          {/* Bold Athletic Monogram */}
          <text
            x="50"
            y="65"
            textAnchor="middle"
            fontSize="26"
            fontWeight="900"
            fontFamily="system-ui, -apple-system, sans-serif"
            letterSpacing="2"
            fill="url(#csk-gold-grad)"
          >
            CSK
          </text>
          {/* Ribbon */}
          <rect x="25" y="74" width="50" height="9" rx="2.5" fill="url(#csk-gold-grad)" />
          <text
            x="50"
            y="81"
            textAnchor="middle"
            fontSize="5.5"
            fontWeight="900"
            letterSpacing="1.2"
            fill="#0B1A30"
            fontFamily="system-ui, -apple-system, sans-serif"
          >
            SUPER KINGS
          </text>
        </svg>
      );

    // 2. MUMBAI INDIANS (MI) - Deep Sapphire & Razor Titanium Vortex
    case 'mi':
      return (
        <svg
          viewBox="0 0 100 100"
          className={`${dimensionClass} shrink-0 inline-block drop-shadow-sm transition-transform duration-200 hover:scale-105 ${className}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="MI Official Crest"
        >
          <defs>
            <linearGradient id="mi-blue-bg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0B2545" />
              <stop offset="100%" stopColor="#001428" />
            </linearGradient>
            <linearGradient id="mi-gold-acc" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFE066" />
              <stop offset="50%" stopColor="#D4AF37" />
              <stop offset="100%" stopColor="#997A15" />
            </linearGradient>
          </defs>
          <circle cx="50" cy="50" r="46" fill="url(#mi-blue-bg)" stroke="url(#mi-gold-acc)" strokeWidth="3" />
          <circle cx="50" cy="50" r="40" stroke="url(#mi-gold-acc)" strokeWidth="1" strokeOpacity="0.4" />
          {/* Razor Vortex Fins */}
          <path d="M50 14 L55 30 L45 30 Z" fill="url(#mi-gold-acc)" />
          <path d="M86 50 L70 55 L70 45 Z" fill="url(#mi-gold-acc)" />
          <path d="M50 86 L45 70 L55 70 Z" fill="url(#mi-gold-acc)" />
          <path d="M14 50 L30 45 L30 55 Z" fill="url(#mi-gold-acc)" />
          {/* Bold Athletic MI */}
          <text
            x="50"
            y="61"
            textAnchor="middle"
            fontSize="34"
            fontWeight="900"
            fontFamily="system-ui, -apple-system, sans-serif"
            letterSpacing="2"
            fill="#FFFFFF"
          >
            MI
          </text>
          <rect x="26" y="71" width="48" height="8" rx="2" fill="url(#mi-gold-acc)" />
          <text
            x="50"
            y="77.5"
            textAnchor="middle"
            fontSize="5.5"
            fontWeight="900"
            letterSpacing="1.2"
            fill="#001428"
            fontFamily="system-ui, -apple-system, sans-serif"
          >
            MUMBAI
          </text>
        </svg>
      );

    // 3. ROYAL CHALLENGERS BENGALURU (RCB) - Carmine Ruby & Champagne Gold
    case 'rcb':
      return (
        <svg
          viewBox="0 0 100 100"
          className={`${dimensionClass} shrink-0 inline-block drop-shadow-sm transition-transform duration-200 hover:scale-105 ${className}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="RCB Official Crest"
        >
          <defs>
            <linearGradient id="rcb-ruby-bg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#5E000B" />
              <stop offset="50%" stopColor="#300005" />
              <stop offset="100%" stopColor="#100002" />
            </linearGradient>
            <linearGradient id="rcb-gold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFF2A3" />
              <stop offset="50%" stopColor="#E5A823" />
              <stop offset="100%" stopColor="#9C6B00" />
            </linearGradient>
          </defs>
          <path
            d="M50 4 L88 17 C88 60 72 84 50 97 C28 84 12 60 12 17 Z"
            fill="url(#rcb-ruby-bg)"
            stroke="url(#rcb-gold)"
            strokeWidth="3"
          />
          {/* Crown */}
          <path d="M38 18 L50 11 L62 18 L58 24 L42 24 Z" fill="url(#rcb-gold)" />
          <circle cx="50" cy="9.5" r="1.8" fill="#FFFFFF" />
          {/* Rampant Lion Emblem */}
          <path
            d="M44 28 C 41 30, 42 36, 46 38 L 44 45 L 48 46 L 49 40 C 53 40, 55 36, 53 30 Z"
            fill="url(#rcb-gold)"
          />
          {/* Bold Athletic Monogram */}
          <text
            x="50"
            y="66"
            textAnchor="middle"
            fontSize="26"
            fontWeight="900"
            fontFamily="system-ui, -apple-system, sans-serif"
            letterSpacing="2"
            fill="url(#rcb-gold)"
          >
            RCB
          </text>
          <rect x="24" y="74" width="52" height="9" rx="2.5" fill="url(#rcb-gold)" />
          <text
            x="50"
            y="81"
            textAnchor="middle"
            fontSize="5.5"
            fontWeight="900"
            letterSpacing="1.2"
            fill="#300005"
            fontFamily="system-ui, -apple-system, sans-serif"
          >
            BENGALURU
          </text>
        </svg>
      );

    // 4. KOLKATA KNIGHT RIDERS (KKR) - Imperial Royal Purple & Gold
    case 'kkr':
      return (
        <svg
          viewBox="0 0 100 100"
          className={`${dimensionClass} shrink-0 inline-block drop-shadow-sm transition-transform duration-200 hover:scale-105 ${className}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="KKR Official Crest"
        >
          <defs>
            <linearGradient id="kkr-purple-bg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2E1065" />
              <stop offset="60%" stopColor="#1B063D" />
              <stop offset="100%" stopColor="#0B011A" />
            </linearGradient>
            <linearGradient id="kkr-gold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFF2A3" />
              <stop offset="50%" stopColor="#E5A823" />
              <stop offset="100%" stopColor="#9C6B00" />
            </linearGradient>
          </defs>
          <path
            d="M50 4 L88 17 C88 60 72 84 50 97 C28 84 12 60 12 17 Z"
            fill="url(#kkr-purple-bg)"
            stroke="url(#kkr-gold)"
            strokeWidth="3"
          />
          {/* Knight Plume */}
          <path d="M50 11 C 46 6, 38 8, 43 18 C 36 14, 32 20, 44 24 C 54 24, 62 18, 50 11 Z" fill="url(#kkr-gold)" />
          {/* Visor */}
          <path d="M38 28 L62 28 L60 42 L40 42 Z" fill="#FFFFFF" fillOpacity="0.15" stroke="url(#kkr-gold)" strokeWidth="1.5" />
          <line x1="42" y1="35" x2="58" y2="35" stroke="url(#kkr-gold)" strokeWidth="2" />
          {/* Bold Athletic Monogram */}
          <text
            x="50"
            y="65"
            textAnchor="middle"
            fontSize="26"
            fontWeight="900"
            fontFamily="system-ui, -apple-system, sans-serif"
            letterSpacing="2"
            fill="url(#kkr-gold)"
          >
            KKR
          </text>
          <rect x="24" y="74" width="52" height="9" rx="2.5" fill="url(#kkr-gold)" />
          <text
            x="50"
            y="81"
            textAnchor="middle"
            fontSize="5.5"
            fontWeight="900"
            letterSpacing="1.2"
            fill="#1B063D"
            fontFamily="system-ui, -apple-system, sans-serif"
          >
            KNIGHT RIDERS
          </text>
        </svg>
      );

    // 5. RAJASTHAN ROYALS (RR) - Velvet Rose & Aristocratic Royal Navy
    case 'rr':
      return (
        <svg
          viewBox="0 0 100 100"
          className={`${dimensionClass} shrink-0 inline-block drop-shadow-sm transition-transform duration-200 hover:scale-105 ${className}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="RR Official Crest"
        >
          <defs>
            <linearGradient id="rr-pink-bg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#BE185D" />
              <stop offset="50%" stopColor="#831843" />
              <stop offset="100%" stopColor="#3B071E" />
            </linearGradient>
            <linearGradient id="rr-gold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFF2A3" />
              <stop offset="50%" stopColor="#F5C042" />
              <stop offset="100%" stopColor="#C98B14" />
            </linearGradient>
          </defs>
          <path
            d="M50 4 L88 17 C88 60 72 84 50 97 C28 84 12 60 12 17 Z"
            fill="url(#rr-pink-bg)"
            stroke="url(#rr-gold)"
            strokeWidth="3"
          />
          {/* Royal Crown */}
          <path d="M34 22 L42 29 L50 17 L58 29 L66 22 L63 35 L37 35 Z" fill="url(#rr-gold)" />
          <circle cx="50" cy="15" r="2" fill="#FFFFFF" />
          {/* Bold Athletic RR */}
          <text
            x="50"
            y="65"
            textAnchor="middle"
            fontSize="30"
            fontWeight="900"
            fontFamily="system-ui, -apple-system, sans-serif"
            letterSpacing="3"
            fill="#FFFFFF"
          >
            RR
          </text>
          <rect x="25" y="74" width="50" height="9" rx="2.5" fill="url(#rr-gold)" />
          <text
            x="50"
            y="81"
            textAnchor="middle"
            fontSize="5.5"
            fontWeight="900"
            letterSpacing="1.2"
            fill="#3B071E"
            fontFamily="system-ui, -apple-system, sans-serif"
          >
            ROYALS
          </text>
        </svg>
      );

    // 6. SUNRISERS HYDERABAD (SRH) - Terracotta Flame & Obsidian
    case 'srh':
      return (
        <svg
          viewBox="0 0 100 100"
          className={`${dimensionClass} shrink-0 inline-block drop-shadow-sm transition-transform duration-200 hover:scale-105 ${className}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="SRH Official Crest"
        >
          <defs>
            <linearGradient id="srh-fire-bg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#C2410C" />
              <stop offset="50%" stopColor="#7C2D12" />
              <stop offset="100%" stopColor="#2A0B02" />
            </linearGradient>
            <linearGradient id="srh-gold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FEF08A" />
              <stop offset="50%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#B45309" />
            </linearGradient>
          </defs>
          <path
            d="M50 4 L88 17 C88 60 72 84 50 97 C28 84 12 60 12 17 Z"
            fill="url(#srh-fire-bg)"
            stroke="url(#srh-gold)"
            strokeWidth="3"
          />
          {/* Raptor Wing Silhouettes */}
          <path d="M26 30 Q 42 38, 50 32 Q 58 38, 74 30 Q 62 44, 50 40 Q 38 44, 26 30 Z" fill="url(#srh-gold)" />
          {/* Bold Athletic SRH */}
          <text
            x="50"
            y="65"
            textAnchor="middle"
            fontSize="26"
            fontWeight="900"
            fontFamily="system-ui, -apple-system, sans-serif"
            letterSpacing="2"
            fill="#FFFFFF"
          >
            SRH
          </text>
          <rect x="24" y="74" width="52" height="9" rx="2.5" fill="url(#srh-gold)" />
          <text
            x="50"
            y="81"
            textAnchor="middle"
            fontSize="5.5"
            fontWeight="900"
            letterSpacing="1.2"
            fill="#2A0B02"
            fontFamily="system-ui, -apple-system, sans-serif"
          >
            SUNRISERS
          </text>
        </svg>
      );

    // 7. GUJARAT TITANS (GT) - Titanium Navy & Razor Chevron
    case 'gt':
      return (
        <svg
          viewBox="0 0 100 100"
          className={`${dimensionClass} shrink-0 inline-block drop-shadow-sm transition-transform duration-200 hover:scale-105 ${className}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="GT Official Crest"
        >
          <defs>
            <linearGradient id="gt-navy-bg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#111827" />
              <stop offset="60%" stopColor="#0B1320" />
              <stop offset="100%" stopColor="#030712" />
            </linearGradient>
            <linearGradient id="gt-gold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#E2E8F0" />
              <stop offset="50%" stopColor="#CBD5E1" />
              <stop offset="100%" stopColor="#64748B" />
            </linearGradient>
            <linearGradient id="gt-teal" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2DD4BF" />
              <stop offset="100%" stopColor="#0F766E" />
            </linearGradient>
          </defs>
          <path d="M50 5 L88 36 L50 95 L12 36 Z" fill="url(#gt-navy-bg)" stroke="url(#gt-teal)" strokeWidth="3" />
          {/* Chevron Apex */}
          <path d="M50 16 L68 36 L50 32 L32 36 Z" fill="url(#gt-teal)" />
          {/* Bold Athletic GT */}
          <text
            x="50"
            y="65"
            textAnchor="middle"
            fontSize="30"
            fontWeight="900"
            fontFamily="system-ui, -apple-system, sans-serif"
            letterSpacing="2"
            fill="#FFFFFF"
          >
            GT
          </text>
          <rect x="26" y="74" width="48" height="8" rx="2" fill="url(#gt-teal)" />
          <text
            x="50"
            y="80"
            textAnchor="middle"
            fontSize="5.5"
            fontWeight="900"
            letterSpacing="1.2"
            fill="#030712"
            fontFamily="system-ui, -apple-system, sans-serif"
          >
            TITANS
          </text>
        </svg>
      );

    // 8. LUCKNOW SUPER GIANTS (LSG) - Celestial Cyan & Midnight Navy
    case 'lsg':
      return (
        <svg
          viewBox="0 0 100 100"
          className={`${dimensionClass} shrink-0 inline-block drop-shadow-sm transition-transform duration-200 hover:scale-105 ${className}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="LSG Official Crest"
        >
          <defs>
            <linearGradient id="lsg-navy-bg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0369A1" />
              <stop offset="60%" stopColor="#075985" />
              <stop offset="100%" stopColor="#082F49" />
            </linearGradient>
            <linearGradient id="lsg-cyan" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38BDF8" />
              <stop offset="100%" stopColor="#0284C7" />
            </linearGradient>
          </defs>
          <path
            d="M50 4 L88 17 C88 60 72 84 50 97 C28 84 12 60 12 17 Z"
            fill="url(#lsg-navy-bg)"
            stroke="url(#lsg-cyan)"
            strokeWidth="3"
          />
          {/* Wings */}
          <path d="M26 28 C 36 28, 44 36, 50 40 C 56 36, 64 28, 74 28 C 66 40, 56 44, 50 42 C 44 44, 34 40, 26 28 Z" fill="url(#lsg-cyan)" />
          {/* Bold Athletic LSG */}
          <text
            x="50"
            y="65"
            textAnchor="middle"
            fontSize="26"
            fontWeight="900"
            fontFamily="system-ui, -apple-system, sans-serif"
            letterSpacing="2"
            fill="#FFFFFF"
          >
            LSG
          </text>
          <rect x="24" y="74" width="52" height="9" rx="2.5" fill="url(#lsg-cyan)" />
          <text
            x="50"
            y="81"
            textAnchor="middle"
            fontSize="5.5"
            fontWeight="900"
            letterSpacing="1.2"
            fill="#082F49"
            fontFamily="system-ui, -apple-system, sans-serif"
          >
            SUPER GIANTS
          </text>
        </svg>
      );

    // 9. DELHI CAPITALS (DC) - Imperial Blue & Venetian Red
    case 'dc':
      return (
        <svg
          viewBox="0 0 100 100"
          className={`${dimensionClass} shrink-0 inline-block drop-shadow-sm transition-transform duration-200 hover:scale-105 ${className}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="DC Official Crest"
        >
          <defs>
            <linearGradient id="dc-blue-bg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1E3A8A" />
              <stop offset="60%" stopColor="#172554" />
              <stop offset="100%" stopColor="#0B132B" />
            </linearGradient>
            <linearGradient id="dc-red" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#EF4444" />
              <stop offset="100%" stopColor="#B91C1C" />
            </linearGradient>
          </defs>
          <path
            d="M50 4 L88 17 C88 60 72 84 50 97 C28 84 12 60 12 17 Z"
            fill="url(#dc-blue-bg)"
            stroke="url(#dc-red)"
            strokeWidth="3"
          />
          {/* Triple Tiger Apex */}
          <polygon points="50,15 44,24 56,24" fill="url(#dc-red)" />
          <polygon points="36,20 32,27 42,27" fill="url(#dc-red)" />
          <polygon points="64,20 58,27 68,27" fill="url(#dc-red)" />
          {/* Bold Athletic DC */}
          <text
            x="50"
            y="65"
            textAnchor="middle"
            fontSize="30"
            fontWeight="900"
            fontFamily="system-ui, -apple-system, sans-serif"
            letterSpacing="2"
            fill="#FFFFFF"
          >
            DC
          </text>
          <rect x="25" y="74" width="50" height="9" rx="2.5" fill="url(#dc-red)" />
          <text
            x="50"
            y="81"
            textAnchor="middle"
            fontSize="5.5"
            fontWeight="900"
            letterSpacing="1.2"
            fill="#FFFFFF"
            fontFamily="system-ui, -apple-system, sans-serif"
          >
            CAPITALS
          </text>
        </svg>
      );

    // 10. PUNJAB KINGS (PBKS) - Bordeaux Scarlet & Warm Brushed Gold
    case 'pbks':
    case 'pk':
      return (
        <svg
          viewBox="0 0 100 100"
          className={`${dimensionClass} shrink-0 inline-block drop-shadow-sm transition-transform duration-200 hover:scale-105 ${className}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="PBKS Official Crest"
        >
          <defs>
            <linearGradient id="pbks-red-bg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#991B1B" />
              <stop offset="50%" stopColor="#7F1D1D" />
              <stop offset="100%" stopColor="#450A0A" />
            </linearGradient>
            <linearGradient id="pbks-gold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FEF08A" />
              <stop offset="50%" stopColor="#EAB308" />
              <stop offset="100%" stopColor="#A16207" />
            </linearGradient>
          </defs>
          <path
            d="M50 4 L88 17 C88 60 72 84 50 97 C28 84 12 60 12 17 Z"
            fill="url(#pbks-red-bg)"
            stroke="url(#pbks-gold)"
            strokeWidth="3"
          />
          {/* Crown Pennants */}
          <path d="M38 18 L50 11 L62 18 L58 24 L42 24 Z" fill="url(#pbks-gold)" />
          <circle cx="50" cy="9.5" r="1.8" fill="#FFFFFF" />
          {/* Bold Athletic PBKS */}
          <text
            x="50"
            y="65"
            textAnchor="middle"
            fontSize="24"
            fontWeight="900"
            fontFamily="system-ui, -apple-system, sans-serif"
            letterSpacing="2"
            fill="url(#pbks-gold)"
          >
            PBKS
          </text>
          <rect x="25" y="74" width="50" height="9" rx="2.5" fill="url(#pbks-gold)" />
          <text
            x="50"
            y="81"
            textAnchor="middle"
            fontSize="5.5"
            fontWeight="900"
            letterSpacing="1.2"
            fill="#450A0A"
            fontFamily="system-ui, -apple-system, sans-serif"
          >
            PUNJAB
          </text>
        </svg>
      );

    default:
      return (
        <div
          className={`${dimensionClass} shrink-0 inline-flex items-center justify-center rounded-xl bg-orange-100 border border-orange-300 font-black text-xs uppercase text-orange-900 ${className}`}
        >
          {fid.slice(0, 3)}
        </div>
      );
  }
}
