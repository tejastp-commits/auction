'use client';

import React from 'react';
import { Gavel, Users, ShieldCheck, Zap, ArrowRight, Trophy } from 'lucide-react';

export default function CricketWarRoomSection() {
  return (
    <section className="mb-14 sm:mb-20 relative">
      <div className="relative rounded-3xl p-6 sm:p-10 border border-[#FED7AA] bg-[#FFFBF8] shadow-lg text-[#1E1B18]">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 pb-6 border-b border-[#FED7AA]">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-orange-100 text-orange-900 border border-orange-200 mb-2">
              <Trophy className="w-3.5 h-3.5 text-orange-600" />
              <span>Multiplayer Tournament Arena</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-[#1E1B18]">
              The Cricket War Room
            </h2>

            <p className="mt-1.5 text-sm sm:text-base text-[#786C64] max-w-xl font-medium leading-relaxed">
              Command live franchise bidding with official paddles, curated 2026 squad rosters, and server-authoritative gavel timing.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-bold text-orange-900 bg-orange-50 px-3.5 py-2 rounded-xl border border-orange-200 self-start sm:self-auto">
            <span>⚡ Real-Time Multi-Device Sync</span>
          </div>
        </div>

        {/* 3 CLEAN, EYE-CATCHING PILLAR CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">
          
          {/* 1. STRATEGIC BIDDING PADDLE */}
          <div className="p-6 rounded-2xl bg-white border border-[#FED7AA] shadow-xs hover:border-orange-400 hover:shadow-md transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-orange-100 border border-orange-200 flex items-center justify-center text-orange-700 mb-4 shadow-xs">
                <Gavel className="w-6 h-6" />
              </div>

              <h3 className="text-lg font-black text-[#1E1B18] mb-1.5 tracking-tight">
                Official Bidding Paddle
              </h3>

              <p className="text-xs text-[#786C64] leading-relaxed mb-4">
                Official BCCI incremental bidding paddles with a direct Jump Bid blank to quote higher amounts like ₹10 Cr when pursuing your franchise anchor.
              </p>

              <div className="space-y-1.5 text-xs font-medium text-[#1E1B18]">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                  <span>Server-authoritative minimum raises</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                  <span>Strict anti-self-bidding server locks</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-3 border-t border-[#FED7AA] flex items-center justify-between text-xs font-bold text-orange-800">
              <span>Paddle Raise Logic</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>

          {/* 2. 5-YEAR CURATED POOL */}
          <div className="p-6 rounded-2xl bg-white border border-[#FED7AA] shadow-xs hover:border-orange-400 hover:shadow-md transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-amber-100 border border-amber-200 flex items-center justify-center text-amber-800 mb-4 shadow-xs">
                <Users className="w-6 h-6" />
              </div>

              <h3 className="text-lg font-black text-[#1E1B18] mb-1.5 tracking-tight">
                Curated 300-Player Pool
              </h3>

              <p className="text-xs text-[#786C64] leading-relaxed mb-4">
                Analyzed through 5 years of IPL & international T20 data including 2026 performance stats. Aligned perfectly with 4, 8, or 10 participating teams.
              </p>

              <div className="space-y-1.5 text-xs font-medium text-[#1E1B18]">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  <span>150, 200, or 300 player presets</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  <span>29 official sets from Marquee to Uncapped</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-3 border-t border-[#FED7AA] flex items-center justify-between text-xs font-bold text-amber-800">
              <span>Preset Roster Math</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>

          {/* 3. GAVEL HAMMER & ANTI-SNIPE TIMING */}
          <div className="p-6 rounded-2xl bg-white border border-[#FED7AA] shadow-xs hover:border-orange-400 hover:shadow-md transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-rose-100 border border-rose-200 flex items-center justify-center text-rose-700 mb-4 shadow-xs">
                <ShieldCheck className="w-6 h-6" />
              </div>

              <h3 className="text-lg font-black text-[#1E1B18] mb-1.5 tracking-tight">
                Live Gavel & Anti-Snipe
              </h3>

              <p className="text-xs text-[#786C64] leading-relaxed mb-4">
                Blitz 5-second or 15-second countdown timers. Any bid placed in the final seconds triggers an automatic time extension to ensure fair competition.
              </p>

              <div className="space-y-1.5 text-xs font-medium text-[#1E1B18]">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                  <span>Automated 3-count hammer strikes</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                  <span>Instant post-auction team dossiers</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-3 border-t border-[#FED7AA] flex items-center justify-between text-xs font-bold text-rose-800">
              <span>Auctioneer Engine</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
