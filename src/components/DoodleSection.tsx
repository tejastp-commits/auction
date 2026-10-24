'use client';

import React, { useState } from 'react';
import { THEMES } from './ThemeCustomizer';
import { ArrowRight, Sparkles, Check, Heart, Trophy, Gavel, Palette, ShieldAlert } from 'lucide-react';

export default function DoodleSection() {
  const [activeDoodleTab, setActiveDoodleTab] = useState<'rules' | 'purse' | 'pool' | 'hammer'>('rules');
  const [doodleApplied, setDoodleApplied] = useState(false);

  const applyDoodleTheme = (themeId: string = 'doodle') => {
    const theme = THEMES.find((t) => t.id === themeId) || THEMES[0];
    const root = document.documentElement;

    root.style.setProperty('--theme-bg', theme.bg);
    root.style.setProperty('--theme-surface', theme.surface);
    root.style.setProperty('--theme-subtle', theme.subtle);
    root.style.setProperty('--theme-subtle-border', theme.subtleBorder);
    root.style.setProperty('--theme-text', theme.text);
    root.style.setProperty('--theme-muted', theme.muted);
    root.style.setProperty('--theme-border', theme.border);
    root.style.setProperty('--theme-accent', theme.accent);
    root.style.setProperty('--theme-accent-hover', theme.accentHover);
    root.style.setProperty('--theme-accent-light', `${theme.accent}28`);
    root.style.setProperty('--theme-shadow', theme.shadow);
    root.setAttribute('data-theme', theme.id);

    localStorage.setItem('auction_theme_id', theme.id);
    localStorage.removeItem('auction_custom_accent');

    setDoodleApplied(true);
    setTimeout(() => setDoodleApplied(false), 2500);
  };

  return (
    <section className="mb-16 sm:mb-24 relative">
      {/* Background soft pastel doodle canvas */}
      <div className="relative rounded-[2.5rem] sm:rounded-[3rem] p-6 sm:p-10 border-2 border-dashed border-[var(--theme-border)] bg-gradient-to-br from-amber-50/50 via-purple-50/30 to-emerald-50/40 dark:from-slate-900/60 dark:via-purple-950/20 dark:to-emerald-950/20 shadow-xl overflow-hidden">
        
        {/* Floating playful doodle sketches in background */}
        <div className="absolute top-4 right-8 opacity-20 pointer-events-none hidden md:block">
          <svg width="120" height="120" viewBox="0 0 100 100" fill="none" stroke="currentColor">
            <path d="M20 50 Q 50 10, 80 50 T 20 50" strokeWidth="2" strokeDasharray="4 4" />
            <circle cx="50" cy="50" r="30" strokeWidth="1.5" />
            <path d="M50 20 L50 80 M20 50 L80 50" strokeWidth="1" />
          </svg>
        </div>

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b-2 border-dashed border-[var(--theme-border)]">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-black tracking-wider uppercase bg-amber-200/70 text-amber-950 border border-amber-400/50 shadow-sm mb-2.5">
              <span>✏️ Hand-Drawn Doodle Studio</span>
              <span className="w-1.5 h-1.5 rounded-full bg-amber-600 animate-ping" />
              <span>Pastel Edition</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight flex flex-wrap items-baseline gap-2">
              <span>The Doodle Cricket</span>
              <span className="font-doodle text-4xl sm:text-5xl lg:text-6xl text-indigo-600 dark:text-indigo-400 rotate-[-1.5deg] inline-block font-bold">
                War Room
              </span>
            </h2>

            <p className="mt-2 text-sm sm:text-base opacity-75 max-w-xl font-medium">
              Every bid, incremental paddle raise, and franchise roster math sketched out like your personal sketchbook notes in soothing pastel shades.
            </p>
          </div>

          {/* Quick 1-Click Pastel Theme Trigger */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={() => applyDoodleTheme('doodle')}
              className="px-4 py-2.5 rounded-2xl font-black text-xs sm:text-sm bg-[#FAF7F0] text-[#24201D] border-2 border-[#24201D] shadow-[3px_3px_0px_#24201D] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_#24201D] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none transition-all flex items-center gap-2 cursor-pointer"
            >
              <Palette className="w-4 h-4 text-indigo-600" />
              <span>{doodleApplied ? '✓ Doodle Mode Activated!' : 'Apply Pastel Doodle Theme'}</span>
            </button>

            <button
              type="button"
              onClick={() => applyDoodleTheme('pastel-lavender')}
              className="px-3.5 py-2.5 rounded-2xl font-bold text-xs bg-purple-100 text-purple-950 border border-purple-300 hover:scale-105 transition-all cursor-pointer"
            >
              🌸 Lavender
            </button>

            <button
              type="button"
              onClick={() => applyDoodleTheme('pastel-mint')}
              className="px-3.5 py-2.5 rounded-2xl font-bold text-xs bg-emerald-100 text-emerald-950 border border-emerald-300 hover:scale-105 transition-all cursor-pointer"
            >
              🍵 Mint
            </button>
          </div>
        </div>

        {/* 4 PASTEL HAND-DRAWN DOODLE CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          
          {/* 1. PASTEL BUTTER YELLOW: THE OFFICIAL BIDDING PADDLE */}
          <div className="relative p-6 rounded-[2rem] bg-[#FEF9C3] text-amber-950 border-2 border-[#CA8A04] shadow-[4px_5px_0px_#CA8A04] rotate-[-1deg] hover:rotate-0 hover:scale-[1.02] transition-all duration-200 flex flex-col justify-between group">
            {/* Paper Tape Effect */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-5 bg-amber-200/90 border-l border-r border-dashed border-amber-600/40 rotate-1 shadow-sm" />

            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="font-doodle text-xl font-bold text-amber-800">
                  #01 Official Paddle
                </span>
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-md bg-amber-300/80 border border-amber-500/50">
                  BCCI RULE
                </span>
              </div>

              {/* Hand-Drawn SVG Paddle Doodle */}
              <div className="w-20 h-20 mx-auto my-3 flex items-center justify-center">
                <svg viewBox="0 0 80 80" className="w-full h-full drop-shadow-sm" fill="none">
                  {/* Wooden handle */}
                  <path d="M37 42 C37 40, 43 40, 43 42 L42 74 C42 76, 38 76, 38 74 Z" fill="#FDE68A" stroke="#854D0E" strokeWidth="2" strokeLinecap="round" />
                  {/* Paddle Face */}
                  <circle cx="40" cy="28" r="22" fill="#FEF08A" stroke="#854D0E" strokeWidth="2.2" />
                  <circle cx="40" cy="28" r="18" stroke="#CA8A04" strokeWidth="1" strokeDasharray="3 3" />
                  <text x="40" y="25" textAnchor="middle" fontSize="9" fontWeight="900" fontFamily="Caveat, cursive" fill="#854D0E">
                    RAISE!
                  </text>
                  <text x="40" y="36" textAnchor="middle" fontSize="10" fontWeight="900" fontFamily="system-ui" fill="#854D0E">
                    +25L
                  </text>
                </svg>
              </div>

              <h3 className="font-black text-base sm:text-lg mb-1 tracking-tight text-amber-950">
                Official Increments
              </h3>

              <div className="space-y-1.5 text-xs text-amber-900/90 font-medium">
                <p>• ₹20L to ₹1 Cr: standard +5 Lakhs</p>
                <p>• ₹1 Cr to ₹2 Cr: official +10 Lakhs</p>
                <p>• Over ₹2 Cr: premium +25 Lakhs</p>
                <p className="font-doodle text-sm font-bold text-amber-900 mt-2">
                  "No arbitrary typing mistakes!"
                </p>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-dashed border-amber-600/30 flex items-center justify-between text-xs font-bold text-amber-900">
              <span>Jump Bid Blank</span>
              <span className="font-doodle text-base font-bold text-amber-800">₹10 Cr max 🔨</span>
            </div>
          </div>

          {/* 2. PASTEL MATCHA MINT: CURATED 300 ROSTER */}
          <div className="relative p-6 rounded-[2rem] bg-[#DCFCE7] text-emerald-950 border-2 border-[#16A34A] shadow-[4px_5px_0px_#16A34A] rotate-[1deg] hover:rotate-0 hover:scale-[1.02] transition-all duration-200 flex flex-col justify-between group">
            {/* Paper Tape Effect */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-5 bg-emerald-200/90 border-l border-r border-dashed border-emerald-600/40 -rotate-1 shadow-sm" />

            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="font-doodle text-xl font-bold text-emerald-800">
                  #02 Curated Math
                </span>
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-md bg-emerald-300/80 border border-emerald-500/50">
                  5-YR STATS
                </span>
              </div>

              {/* Hand-Drawn SVG Cricket Bat & Ball */}
              <div className="w-20 h-20 mx-auto my-3 flex items-center justify-center">
                <svg viewBox="0 0 80 80" className="w-full h-full drop-shadow-sm" fill="none">
                  {/* Slanted Bat */}
                  <g transform="rotate(-30 40 40)">
                    <rect x="38" y="10" width="4" height="18" rx="2" fill="#BBF7D0" stroke="#166534" strokeWidth="2" />
                    <line x1="38" y1="15" x2="42" y2="15" stroke="#166534" strokeWidth="1.2" />
                    <line x1="38" y1="20" x2="42" y2="20" stroke="#166534" strokeWidth="1.2" />
                    <path d="M35 28 L45 28 L44 70 L36 70 Z" fill="#86EFAC" stroke="#166534" strokeWidth="2" strokeLinejoin="round" />
                    <line x1="40" y1="32" x2="40" y2="66" stroke="#166534" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
                  </g>
                  {/* Bouncing Leather Ball */}
                  <path d="M15 55 Q 35 30, 62 25" stroke="#166534" strokeWidth="1.8" strokeDasharray="3 3" />
                  <circle cx="64" cy="24" r="7.5" fill="#FDA4AF" stroke="#9F1239" strokeWidth="2" />
                  <path d="M59 22 Q 64 25, 69 22" stroke="#FFFFFF" strokeWidth="1.2" strokeDasharray="1.5 1.5" />
                </svg>
              </div>

              <h3 className="font-black text-base sm:text-lg mb-1 tracking-tight text-emerald-950">
                150 to 300 Sets
              </h3>

              <div className="space-y-1.5 text-xs text-emerald-900/90 font-medium">
                <p>• 10 Teams: 25 × 10 = 250 (+ 50 buffer = 300)</p>
                <p>• 6–8 Teams: 200 premier players</p>
                <p>• 4–5 Teams: 150 compact players</p>
                <p className="font-doodle text-sm font-bold text-emerald-900 mt-2">
                  "Aligned with past 5-yr IPL performace"
                </p>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-dashed border-emerald-600/30 flex items-center justify-between text-xs font-bold text-emerald-900">
              <span>BCCI Master DB</span>
              <span className="font-doodle text-base font-bold text-emerald-800">622 total 🏏</span>
            </div>
          </div>

          {/* 3. PASTEL LAVENDER LILAC: WAR ROOM TABLE SEATS */}
          <div className="relative p-6 rounded-[2rem] bg-[#F3E8FF] text-purple-950 border-2 border-[#9333EA] shadow-[4px_5px_0px_#9333EA] rotate-[-1deg] hover:rotate-0 hover:scale-[1.02] transition-all duration-200 flex flex-col justify-between group">
            {/* Paper Tape Effect */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-5 bg-purple-200/90 border-l border-r border-dashed border-purple-600/40 rotate-1 shadow-sm" />

            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="font-doodle text-xl font-bold text-purple-800">
                  #03 Table Seats
                </span>
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-md bg-purple-300/80 border border-purple-500/50">
                  1-CLICK SEAT
                </span>
              </div>

              {/* Hand-Drawn SVG Trophy / Team Table */}
              <div className="w-20 h-20 mx-auto my-3 flex items-center justify-center">
                <svg viewBox="0 0 80 80" className="w-full h-full drop-shadow-sm" fill="none">
                  {/* Trophy cup */}
                  <path d="M26 18 C26 36, 35 46, 40 46 C45 46, 54 36, 54 18 Z" fill="#D8B4FE" stroke="#6B21A8" strokeWidth="2" strokeLinejoin="round" />
                  <path d="M26 24 C17 24, 17 36, 28 36" stroke="#6B21A8" strokeWidth="2" strokeLinecap="round" fill="none" />
                  <path d="M54 24 C63 24, 63 36, 52 36" stroke="#6B21A8" strokeWidth="2" strokeLinecap="round" fill="none" />
                  <path d="M37 46 L37 58 L43 58 L43 46" fill="#C084FC" stroke="#6B21A8" strokeWidth="2" />
                  <path d="M26 58 C32 56, 48 56, 54 58 L52 68 C46 70, 34 70, 28 68 Z" fill="#DDD6FE" stroke="#6B21A8" strokeWidth="2" />
                  {/* Star */}
                  <polygon points="40,24 42,28 46,28 43,31 44,35 40,32 36,35 37,31 34,28 38,28" fill="#FEF08A" stroke="#854D0E" strokeWidth="1" />
                </svg>
              </div>

              <h3 className="font-black text-base sm:text-lg mb-1 tracking-tight text-purple-950">
                10 Franchise Tables
              </h3>

              <div className="space-y-1.5 text-xs text-purple-900/90 font-medium">
                <p>• "SELECT TABLE SEAT 🏏" buttons</p>
                <p>• Prominent "VACATE TABLE SEAT ⇄"</p>
                <p>• Direct 1-click table re-assignment</p>
                <p className="font-doodle text-sm font-bold text-purple-900 mt-2">
                  "No confusing 'Claim Team' jargon"
                </p>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-dashed border-purple-600/30 flex items-center justify-between text-xs font-bold text-purple-900">
              <span>Franchise Purse</span>
              <span className="font-doodle text-base font-bold text-purple-800">₹120–250 Cr 💰</span>
            </div>
          </div>

          {/* 4. PASTEL PEACH BLUSH: GAVEL HAMMER & ANTI-SNIPE */}
          <div className="relative p-6 rounded-[2rem] bg-[#FFE4E6] text-rose-950 border-2 border-[#E11D48] shadow-[4px_5px_0px_#E11D48] rotate-[1deg] hover:rotate-0 hover:scale-[1.02] transition-all duration-200 flex flex-col justify-between group">
            {/* Paper Tape Effect */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-5 bg-rose-200/90 border-l border-r border-dashed border-rose-600/40 -rotate-1 shadow-sm" />

            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="font-doodle text-xl font-bold text-rose-800">
                  #04 Gavel Strike
                </span>
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-md bg-rose-300/80 border border-rose-500/50">
                  GOING ONCE...
                </span>
              </div>

              {/* Hand-Drawn SVG Auction Gavel */}
              <div className="w-20 h-20 mx-auto my-3 flex items-center justify-center">
                <svg viewBox="0 0 80 80" className="w-full h-full drop-shadow-sm" fill="none">
                  {/* BAM impact */}
                  <path d="M48 48 L56 42 M54 52 L64 50" stroke="#9F1239" strokeWidth="2" strokeLinecap="round" />
                  <text x="56" y="38" fontSize="11" fontWeight="900" fontFamily="Caveat, cursive" fill="#9F1239">SOLD!</text>
                  {/* Block */}
                  <path d="M22 62 C32 60, 48 60, 58 62 L56 70 C46 72, 34 72, 24 70 Z" fill="#FECDD3" stroke="#9F1239" strokeWidth="2" strokeLinejoin="round" />
                  {/* Hammer */}
                  <g transform="rotate(-26 38 38)">
                    <rect x="38" y="16" width="4" height="42" rx="2" fill="#FDE68A" stroke="#9F1239" strokeWidth="2" />
                    <rect x="25" y="20" width="30" height="12" rx="3" fill="#FDA4AF" stroke="#9F1239" strokeWidth="2" />
                    <rect x="23" y="22" width="3" height="8" rx="1.5" fill="#FFF" />
                    <rect x="54" y="22" width="3" height="8" rx="1.5" fill="#FFF" />
                  </g>
                </svg>
              </div>

              <h3 className="font-black text-base sm:text-lg mb-1 tracking-tight text-rose-950">
                Anti-Snipe Gavel
              </h3>

              <div className="space-y-1.5 text-xs text-rose-900/90 font-medium">
                <p>• Countdown: 5s blitz or 15s standard</p>
                <p>• Late bid adds +10s clock extension</p>
                <p>• Strict anti-self-bid server defense</p>
                <p className="font-doodle text-sm font-bold text-rose-900 mt-2">
                  "Only one player skips if unsold"
                </p>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-dashed border-rose-600/30 flex items-center justify-between text-xs font-bold text-rose-900">
              <span>Fair Play Server</span>
              <span className="font-doodle text-base font-bold text-rose-800">100% Verified 🔨</span>
            </div>
          </div>

        </div>

        {/* Bottom Chalkboard / Sketch Banner */}
        <div className="mt-10 p-5 rounded-2xl bg-white/70 dark:bg-black/30 border-2 border-dashed border-[var(--theme-border)] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🎨</span>
            <div>
              <p className="font-black text-sm">
                Prefer softer, hand-drawn pastel aesthetic?
              </p>
              <p className="text-xs opacity-75">
                Switch between Hand-Drawn Doodle, Pastel Lavender, Pastel Mint, or Midnight Stadium anytime from the top navigation bar.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => applyDoodleTheme('doodle')}
            className="px-5 py-2.5 rounded-xl font-black text-xs theme-btn-primary shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer whitespace-nowrap"
          >
            Switch to Pastel Doodle Mode ✏️
          </button>
        </div>

      </div>
    </section>
  );
}
