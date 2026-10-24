'use client';

import React from 'react';
import { Gavel, Users, ShieldCheck, Zap, ArrowRight, Trophy, Flame } from 'lucide-react';

export default function CricketWarRoomSection() {
  return (
    <section className="mb-14 sm:mb-20 relative">
      {/* Background Soft Pastel Container */}
      <div className="relative rounded-3xl p-6 sm:p-10 border border-[#FED7AA] bg-[#FFFBF8] shadow-lg text-[#1E1B18] overflow-hidden">
        
        {/* Subtle Hand-Drawn Background Cricket Doodles */}
        <div className="absolute top-4 right-8 opacity-15 pointer-events-none hidden md:block">
          <svg width="120" height="120" viewBox="0 0 100 100" fill="none" stroke="#EA580C">
            <path d="M20 50 Q 50 15, 80 50 T 20 50" strokeWidth="2" strokeDasharray="4 4" />
            <circle cx="50" cy="50" r="28" strokeWidth="1.5" />
            <line x1="50" y1="22" x2="50" y2="78" strokeWidth="1.2" />
            <line x1="22" y1="50" x2="78" y2="50" strokeWidth="1.2" />
          </svg>
        </div>

        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 pb-6 border-b border-[#FED7AA]">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-orange-100 text-orange-900 border border-orange-200 mb-2.5">
              <Trophy className="w-3.5 h-3.5 text-orange-600" />
              <span>IPL Tournament Playbook</span>
              <span className="w-1.5 h-1.5 rounded-full bg-orange-600 animate-ping" />
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight flex flex-wrap items-baseline gap-2">
              <span>The</span>
              <span className="text-orange-600 rotate-[-1deg] inline-block font-black relative">
                Cricket War Room
                {/* Hand-drawn sketch wavy underline */}
                <svg className="w-full h-2.5 absolute -bottom-1.5 left-0" viewBox="0 0 100 12" preserveAspectRatio="none" fill="none">
                  <path d="M0 6 Q 25 12, 50 6 T 100 6" stroke="#EA580C" strokeWidth="3" strokeLinecap="round" />
                  <path d="M5 8 Q 30 14, 55 8 T 95 8" stroke="#FDBA74" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="3 3" />
                </svg>
              </span>
            </h2>

            <p className="mt-3 text-sm sm:text-base text-[#786C64] max-w-2xl font-medium">
              Essential bidding rules, squad composition quotas, and real-time engine mechanics for competitive multiplayer auctions.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-3 py-1.5 rounded-xl bg-orange-50 border border-orange-200 text-orange-950 flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-orange-600" />
              <span>Official BCCI Engine Slabs</span>
            </span>
          </div>
        </div>

        {/* 4 TACTILE PASTEL WAR ROOM CARDS WITH PAPER TAPE STRIPS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          
          {/* CARD 1: PASTEL BUTTER YELLOW - OFFICIAL BIDDING PADDLES */}
          <div className="relative p-6 rounded-3xl bg-[#FEF9C3] text-amber-950 border-2 border-[#EAB308] shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between group">
            {/* Paper Tape Strip on Top */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-5 bg-[#FDE68A] border-l border-r border-dashed border-amber-600/40 rotate-1 shadow-xs pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono font-black uppercase px-2 py-0.5 rounded-md bg-amber-200 text-amber-900 border border-amber-400">
                  01 / INCREMENTS
                </span>
                <span className="text-xs font-bold text-amber-800">
                  SLAB RULES
                </span>
              </div>

              {/* Hand-Drawn SVG Paddle with Etched Sketch Lines */}
              <div className="w-20 h-20 mx-auto my-3 flex items-center justify-center">
                <svg viewBox="0 0 80 80" className="w-full h-full drop-shadow-xs" fill="none">
                  {/* Paddle Handle */}
                  <path d="M37 42 C37 40, 43 40, 43 42 L42 74 C42 76, 38 76, 38 74 Z" fill="#FDE68A" stroke="#854D0E" strokeWidth="2" strokeLinecap="round" />
                  {/* Paddle Round Face */}
                  <circle cx="40" cy="28" r="22" fill="#FEF08A" stroke="#854D0E" strokeWidth="2.2" />
                  {/* Inner Etched Dashed Line */}
                  <circle cx="40" cy="28" r="18" stroke="#CA8A04" strokeWidth="1" strokeDasharray="3 3" />
                  {/* Hand-Drawn Etch Markings */}
                  <line x1="28" y1="20" x2="36" y2="20" stroke="#854D0E" strokeWidth="1.2" strokeLinecap="round" />
                  <line x1="44" y1="20" x2="52" y2="20" stroke="#854D0E" strokeWidth="1.2" strokeLinecap="round" />
                  <text x="40" y="27" textAnchor="middle" fontSize="8" fontWeight="900" fontFamily="system-ui, sans-serif" fill="#854D0E" letterSpacing="0.5">
                    RAISE
                  </text>
                  <text x="40" y="37" textAnchor="middle" fontSize="10" fontWeight="900" fontFamily="system-ui, sans-serif" fill="#854D0E">
                    +25L
                  </text>
                </svg>
              </div>

              <h3 className="font-extrabold text-base sm:text-lg mb-2 tracking-tight text-amber-950">
                Official Bidding Slabs
              </h3>

              <div className="space-y-1.5 text-xs text-amber-900/95 font-medium">
                <div className="flex items-start gap-1.5">
                  <span className="font-bold text-amber-800">•</span>
                  <span><strong>₹20L – ₹1 Cr:</strong> +5 Lakhs per paddle tap</span>
                </div>
                <div className="flex items-start gap-1.5">
                  <span className="font-bold text-amber-800">•</span>
                  <span><strong>₹1 Cr – ₹2 Cr:</strong> +10 Lakhs per paddle tap</span>
                </div>
                <div className="flex items-start gap-1.5">
                  <span className="font-bold text-amber-800">•</span>
                  <span><strong>Above ₹2 Cr:</strong> +25 Lakhs per paddle tap</span>
                </div>
                <div className="flex items-start gap-1.5">
                  <span className="font-bold text-amber-800">•</span>
                  <span><strong>Jump Bids:</strong> Directly type any valid amount to leapfrog competition</span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-dashed border-amber-600/30 flex items-center justify-between text-xs font-bold text-amber-900">
              <span>Automatic Paddle Calc</span>
              <span className="text-amber-800">Zero Error 🔨</span>
            </div>
          </div>

          {/* CARD 2: PASTEL MATCHA MINT - SQUAD QUOTAS & PURSE GUARD */}
          <div className="relative p-6 rounded-3xl bg-[#DCFCE7] text-emerald-950 border-2 border-[#16A34A] shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between group">
            {/* Paper Tape Strip on Top */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-5 bg-[#BBF7D0] border-l border-r border-dashed border-emerald-600/40 -rotate-1 shadow-xs pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono font-black uppercase px-2 py-0.5 rounded-md bg-emerald-200 text-emerald-900 border border-emerald-400">
                  02 / SQUAD ROSTER
                </span>
                <span className="text-xs font-bold text-emerald-800">
                  QUOTA LIMITS
                </span>
              </div>

              {/* Hand-Drawn SVG Cricket Bat & Leather Ball with Etched Seam */}
              <div className="w-20 h-20 mx-auto my-3 flex items-center justify-center">
                <svg viewBox="0 0 80 80" className="w-full h-full drop-shadow-xs" fill="none">
                  {/* Slanted Bat */}
                  <g transform="rotate(-30 40 40)">
                    <rect x="38" y="10" width="4" height="18" rx="2" fill="#BBF7D0" stroke="#166534" strokeWidth="2" />
                    <line x1="38" y1="15" x2="42" y2="15" stroke="#166534" strokeWidth="1.2" />
                    <line x1="38" y1="20" x2="42" y2="20" stroke="#166534" strokeWidth="1.2" />
                    <path d="M35 28 L45 28 L44 70 L36 70 Z" fill="#86EFAC" stroke="#166534" strokeWidth="2" strokeLinejoin="round" />
                    <line x1="40" y1="32" x2="40" y2="66" stroke="#166534" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
                  </g>
                  {/* Bouncing Leather Ball with Etched Curved Seam */}
                  <path d="M15 55 Q 35 30, 62 25" stroke="#166534" strokeWidth="1.8" strokeDasharray="3 3" />
                  <circle cx="64" cy="24" r="7.5" fill="#FDA4AF" stroke="#9F1239" strokeWidth="2" />
                  <path d="M59 22 Q 64 25, 69 22" stroke="#FFFFFF" strokeWidth="1.2" strokeDasharray="1.5 1.5" />
                </svg>
              </div>

              <h3 className="font-extrabold text-base sm:text-lg mb-2 tracking-tight text-emerald-950">
                Squad Quotas & Limits
              </h3>

              <div className="space-y-1.5 text-xs text-emerald-900/95 font-medium">
                <div className="flex items-start gap-1.5">
                  <span className="font-bold text-emerald-800">•</span>
                  <span><strong>Squad Size:</strong> Min 18 to Max 25 players</span>
                </div>
                <div className="flex items-start gap-1.5">
                  <span className="font-bold text-emerald-800">•</span>
                  <span><strong>Overseas Cap:</strong> Maximum 8 international players</span>
                </div>
                <div className="flex items-start gap-1.5">
                  <span className="font-bold text-emerald-800">•</span>
                  <span><strong>Purse Reserve Guard:</strong> System ensures you retain enough base purse to reach 18</span>
                </div>
                <div className="flex items-start gap-1.5">
                  <span className="font-bold text-emerald-800">•</span>
                  <span><strong>Role Composition:</strong> Balanced Batters, Bowlers, All-Rounders, WK</span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-dashed border-emerald-600/30 flex items-center justify-between text-xs font-bold text-emerald-900">
              <span>Budget Enforcement</span>
              <span className="text-emerald-800">18–25 Squad 🏏</span>
            </div>
          </div>

          {/* CARD 3: PASTEL LAVENDER LILAC - 10 FRANCHISE TABLES */}
          <div className="relative p-6 rounded-3xl bg-[#F3E8FF] text-purple-950 border-2 border-[#9333EA] shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between group">
            {/* Paper Tape Strip on Top */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-5 bg-[#E9D5FF] border-l border-r border-dashed border-purple-600/40 rotate-1 shadow-xs pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono font-black uppercase px-2 py-0.5 rounded-md bg-purple-200 text-purple-900 border border-purple-400">
                  03 / WAR ROOM SYNC
                </span>
                <span className="text-xs font-bold text-purple-800">
                  10 FRANCHISES
                </span>
              </div>

              {/* Hand-Drawn SVG Trophy / Team Table with Etched Lines */}
              <div className="w-20 h-20 mx-auto my-3 flex items-center justify-center">
                <svg viewBox="0 0 80 80" className="w-full h-full drop-shadow-xs" fill="none">
                  {/* Trophy Cup */}
                  <path d="M26 18 C26 36, 35 46, 40 46 C45 46, 54 36, 54 18 Z" fill="#D8B4FE" stroke="#6B21A8" strokeWidth="2" strokeLinejoin="round" />
                  <path d="M26 24 C17 24, 17 36, 28 36" stroke="#6B21A8" strokeWidth="2" strokeLinecap="round" fill="none" />
                  <path d="M54 24 C63 24, 63 36, 52 36" stroke="#6B21A8" strokeWidth="2" strokeLinecap="round" fill="none" />
                  <path d="M37 46 L37 58 L43 58 L43 46" fill="#C084FC" stroke="#6B21A8" strokeWidth="2" />
                  <path d="M26 58 C32 56, 48 56, 54 58 L52 68 C46 70, 34 70, 28 68 Z" fill="#DDD6FE" stroke="#6B21A8" strokeWidth="2" />
                  {/* Etched Star */}
                  <polygon points="40,24 42,28 46,28 43,31 44,35 40,32 36,35 37,31 34,28 38,28" fill="#FEF08A" stroke="#854D0E" strokeWidth="1" />
                </svg>
              </div>

              <h3 className="font-extrabold text-base sm:text-lg mb-2 tracking-tight text-purple-950">
                10 Franchise War Rooms
              </h3>

              <div className="space-y-1.5 text-xs text-purple-900/95 font-medium">
                <div className="flex items-start gap-1.5">
                  <span className="font-bold text-purple-800">•</span>
                  <span><strong>1-Click Desk Claim:</strong> Take the owner seat for CSK, MI, RCB, and more</span>
                </div>
                <div className="flex items-start gap-1.5">
                  <span className="font-bold text-purple-800">•</span>
                  <span><strong>Instant Vacate & Switch:</strong> Change tables or spectate freely in the lobby</span>
                </div>
                <div className="flex items-start gap-1.5">
                  <span className="font-bold text-purple-800">•</span>
                  <span><strong>Sub-Second Table Sync:</strong> Live purse updates across all connected devices</span>
                </div>
                <div className="flex items-start gap-1.5">
                  <span className="font-bold text-purple-800">•</span>
                  <span><strong>Host Controls:</strong> Pause, resume, and nominate players on the fly</span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-dashed border-purple-600/30 flex items-center justify-between text-xs font-bold text-purple-900">
              <span>Multi-Device Sync</span>
              <span className="text-purple-800">10 Tables Live 🌐</span>
            </div>
          </div>

          {/* CARD 4: PASTEL PEACH SORBET - BLITZ TIMER & 3-COUNT HAMMER */}
          <div className="relative p-6 rounded-3xl bg-[#FFEDD5] text-orange-950 border-2 border-[#EA580C] shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between group">
            {/* Paper Tape Strip on Top */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-5 bg-[#FED7AA] border-l border-r border-dashed border-orange-600/40 -rotate-1 shadow-xs pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono font-black uppercase px-2 py-0.5 rounded-md bg-orange-200 text-orange-900 border border-orange-400">
                  04 / HAMMER & TIMER
                </span>
                <span className="text-xs font-bold text-orange-800">
                  LIVE AUCTIONEER
                </span>
              </div>

              {/* Hand-Drawn SVG Auctioneer Gavel & Sound Waves with Etched Lines */}
              <div className="w-20 h-20 mx-auto my-3 flex items-center justify-center">
                <svg viewBox="0 0 80 80" className="w-full h-full drop-shadow-xs" fill="none">
                  {/* Slanted Gavel Handle */}
                  <g transform="rotate(-25 40 40)">
                    <rect x="38" y="16" width="4" height="42" rx="2" fill="#FED7AA" stroke="#9A3412" strokeWidth="2" />
                    {/* Head */}
                    <rect x="26" y="18" width="28" height="12" rx="2.5" fill="#FB923C" stroke="#9A3412" strokeWidth="2" />
                    <line x1="30" y1="18" x2="30" y2="30" stroke="#9A3412" strokeWidth="1" strokeDasharray="2 2" />
                    <line x1="50" y1="18" x2="50" y2="30" stroke="#9A3412" strokeWidth="1" strokeDasharray="2 2" />
                  </g>
                  {/* Soundwaves / Hammer Impact */}
                  <path d="M52 50 C 58 48, 64 54, 60 62" stroke="#EA580C" strokeWidth="2" strokeLinecap="round" />
                  <path d="M58 44 C 68 40, 74 52, 68 64" stroke="#EA580C" strokeWidth="1.5" strokeDasharray="2 2" strokeLinecap="round" />
                  {/* Soundwave Stars */}
                  <circle cx="62" cy="42" r="1.5" fill="#EA580C" />
                  <circle cx="70" cy="56" r="1.5" fill="#EA580C" />
                </svg>
              </div>

              <h3 className="font-extrabold text-base sm:text-lg mb-2 tracking-tight text-orange-950">
                Blitz Timer & Hammer
              </h3>

              <div className="space-y-1.5 text-xs text-orange-900/95 font-medium">
                <div className="flex items-start gap-1.5">
                  <span className="font-bold text-orange-800">•</span>
                  <span><strong>Blitz 5s / 15s Timers:</strong> Rapid bidding pace with countdown audio</span>
                </div>
                <div className="flex items-start gap-1.5">
                  <span className="font-bold text-orange-800">•</span>
                  <span><strong>Anti-Snipe Clock Extension:</strong> Final-second bids trigger automatic time extensions</span>
                </div>
                <div className="flex items-start gap-1.5">
                  <span className="font-bold text-orange-800">•</span>
                  <span><strong>3-Count Hammer Call:</strong> "Going Once... Going Twice... SOLD!"</span>
                </div>
                <div className="flex items-start gap-1.5">
                  <span className="font-bold text-orange-800">•</span>
                  <span><strong>Post-Auction Reports:</strong> Persistent shareable URLs with complete squad rosters</span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-dashed border-orange-600/30 flex items-center justify-between text-xs font-bold text-orange-900">
              <span>Anti-Snipe Guard</span>
              <span className="text-orange-800">Going, Gone! ⚡</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
