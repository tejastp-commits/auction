'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { IPL_FRANCHISES } from '@/data/franchises';
import { CRORE } from '@/lib/currency';
import {
  Gavel,
  Clock,
  Coins,
  Users,
  ShieldCheck,
  Zap,
  BarChart3,
  ArrowRight,
  Minus,
  Plus,
  KeyRound,
  User,
} from 'lucide-react';

export default function LandingPage() {
  const router = useRouter();

  // Create Room state
  const [hostName, setHostName] = useState('');
  const [startingPurseCr, setStartingPurseCr] = useState<number>(120);
  const [timerSeconds, setTimerSeconds] = useState<number>(15);
  const [poolSize, setPoolSize] = useState<number>(200);

  const [isCreating, setIsCreating] = useState(false);
  const [createError, setCreateError] = useState('');

  // Join Room state
  const [joinCode, setJoinCode] = useState('');
  const [joinName, setJoinName] = useState('');
  const [isJoining, setIsJoining] = useState(false);
  const [joinError, setJoinError] = useState('');

  // Active tab in hero console
  const [activeTab, setActiveTab] = useState<'create' | 'join'>('create');

  const handleCreateRoom = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreateError('');

    if (startingPurseCr < 20) {
      setCreateError('Starting purse must be at least ₹20 Crore.');
      return;
    }
    if (timerSeconds < 5) {
      setCreateError('Bid timer must be at least 5 seconds.');
      return;
    }
    if (poolSize < 10) {
      setCreateError('Auction pool must contain at least 10 players.');
      return;
    }

    setIsCreating(true);

    try {
      const res = await fetch('/api/auction/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          hostDisplayName: hostName.trim() || 'Auctioneer',
          config: {
            startingPurse: Math.round(startingPurseCr * CRORE),
            bidTimerSeconds: timerSeconds,
            auctionPoolSize: poolSize,
            minSquadSize: 18,
            maxSquadSize: 25,
            maxOverseas: 8,
          },
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to create room');

      localStorage.setItem(`auction_token_${data.roomCode}`, data.hostToken);
      localStorage.setItem(`auction_name_${data.roomCode}`, hostName.trim() || 'Auctioneer');

      router.push(`/room/${data.roomCode}`);
    } catch (err: any) {
      setCreateError(err.message || 'Error creating room');
    } finally {
      setIsCreating(false);
    }
  };

  const handleJoinRoom = async (e: React.FormEvent) => {
    e.preventDefault();
    setJoinError('');
    const code = joinCode.trim().toUpperCase();
    if (!code) {
      setJoinError('Please enter your 6-character room code');
      return;
    }

    setIsJoining(true);
    try {
      const res = await fetch(`/api/auction/${code}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Room not found');

      if (joinName.trim()) {
        localStorage.setItem(`auction_name_${code}`, joinName.trim());
      }

      router.push(`/room/${code}`);
    } catch (err: any) {
      setJoinError(err.message || 'Room does not exist');
    } finally {
      setIsJoining(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-between py-6 sm:py-10 px-4 sm:px-6 max-w-5xl mx-auto w-full transition-colors">
      {/* ========================================================
          HERO HEADER
          ======================================================== */}
      <section className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full theme-accent-badge text-xs font-semibold mb-4 shadow-sm">
          <span className="w-2 h-2 rounded-full theme-btn-primary animate-pulse" />
          <span>Live Multiplayer Cricket Auction</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-[1.15]">
          Build your dream IPL squad{' '}
          <span className="theme-accent-text">
            with friends.
          </span>
        </h1>

        <p className="mt-3.5 text-sm sm:text-base opacity-75 leading-relaxed max-w-xl mx-auto">
          Create a private auction room, pick your favorite franchises, and enjoy real-time bidding with official BCCI 2025 player stats.
        </p>
      </section>

      {/* ========================================================
          MAIN ACTION CONSOLE (DYNAMIC THEMED, CLEAN, ACCESSIBLE)
          ======================================================== */}
      <div className="max-w-xl w-full mx-auto theme-card rounded-3xl p-6 sm:p-8 shadow-2xl mb-12">
        {/* TAB SWITCHER */}
        <div className="flex rounded-2xl theme-subtle-box p-1.5 mb-7 border theme-border">
          <button
            type="button"
            onClick={() => setActiveTab('create')}
            className={`flex-1 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-all cursor-pointer ${
              activeTab === 'create'
                ? 'theme-card font-black shadow-sm'
                : 'opacity-60 hover:opacity-100'
            }`}
          >
            Create Auction Room
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('join')}
            className={`flex-1 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-all cursor-pointer ${
              activeTab === 'join'
                ? 'theme-card font-black shadow-sm'
                : 'opacity-60 hover:opacity-100'
            }`}
          >
            Join with Room Code
          </button>
        </div>

        {activeTab === 'create' ? (
          <form onSubmit={handleCreateRoom} className="space-y-6">
            {createError && (
              <div className="p-3.5 text-xs rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-500 font-medium">
                {createError}
              </div>
            )}

            {/* HOST NAME */}
            <div>
              <label className="block text-xs font-bold mb-1.5 opacity-90">
                Host / Auctioneer Display Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder="e.g. Richard Madley"
                  value={hostName}
                  onChange={(e) => setHostName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl theme-subtle-box text-sm focus:outline-none focus:ring-2 focus:ring-[var(--theme-accent)] transition-all font-medium"
                />
                <User className="w-4 h-4 opacity-40 absolute right-3.5 top-3 pointer-events-none" />
              </div>
            </div>

            {/* SETTING 1: BID TIMER (SMOOTH SLIDER + STEPPER + DIRECT INPUT) */}
            <div className="theme-subtle-box p-4 rounded-2xl border theme-border space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs font-bold opacity-90">
                  <Clock className="w-4 h-4 theme-accent-text" />
                  <span>Bid Clock Timer</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-lg theme-accent-badge">
                    {timerSeconds} seconds
                  </span>
                  <span className="text-[10px] font-medium px-2 py-0.5 rounded-lg theme-subtle-box border">
                    {timerSeconds <= 10 ? '⚡ Blitz' : timerSeconds <= 20 ? '⏱️ Standard' : '🧠 Strategic'}
                  </span>
                </div>
              </div>

              {/* Slider */}
              <div className="pt-1">
                <input
                  type="range"
                  min={5}
                  max={60}
                  step={1}
                  value={timerSeconds}
                  onChange={(e) => setTimerSeconds(parseInt(e.target.value, 10))}
                  aria-label="Bid timer in seconds"
                />
              </div>

              {/* Stepper & Quick Adjustment */}
              <div className="flex items-center justify-between pt-1">
                <span className="text-[11px] opacity-50">Min 5s</span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setTimerSeconds((prev) => Math.max(5, prev - 5))}
                    className="p-1 rounded-lg theme-card border theme-border opacity-80 hover:opacity-100 transition-all cursor-pointer"
                    title="Decrease by 5s"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <input
                    type="number"
                    min={5}
                    max={120}
                    value={timerSeconds}
                    onChange={(e) => {
                      const val = parseInt(e.target.value, 10);
                      if (!isNaN(val)) setTimerSeconds(val);
                    }}
                    className="w-14 text-center py-1 text-xs font-mono font-bold theme-card border theme-border rounded-lg focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setTimerSeconds((prev) => Math.min(120, prev + 5))}
                    className="p-1 rounded-lg theme-card border theme-border opacity-80 hover:opacity-100 transition-all cursor-pointer"
                    title="Increase by 5s"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
                <span className="text-[11px] opacity-50">Max 120s</span>
              </div>
            </div>

            {/* SETTING 2: STARTING PURSE (SMOOTH SLIDER + STEPPER) */}
            <div className="theme-subtle-box p-4 rounded-2xl border theme-border space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs font-bold opacity-90">
                  <Coins className="w-4 h-4 theme-accent-text" />
                  <span>Franchise Starting Purse</span>
                </div>
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-lg theme-accent-badge">
                  ₹{startingPurseCr} Crore
                </span>
              </div>

              {/* Slider */}
              <div className="pt-1">
                <input
                  type="range"
                  min={50}
                  max={250}
                  step={5}
                  value={startingPurseCr}
                  onChange={(e) => setStartingPurseCr(parseInt(e.target.value, 10))}
                  aria-label="Starting purse in Crores"
                />
              </div>

              {/* Stepper */}
              <div className="flex items-center justify-between pt-1">
                <span className="text-[11px] opacity-50">₹50 Cr</span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setStartingPurseCr((prev) => Math.max(20, prev - 10))}
                    className="p-1 rounded-lg theme-card border theme-border opacity-80 hover:opacity-100 transition-all cursor-pointer"
                    title="Decrease by ₹10 Cr"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <div className="flex items-center">
                    <span className="text-xs font-bold opacity-60 mr-1">₹</span>
                    <input
                      type="number"
                      min={20}
                      max={500}
                      value={startingPurseCr}
                      onChange={(e) => {
                        const val = parseInt(e.target.value, 10);
                        if (!isNaN(val)) setStartingPurseCr(val);
                      }}
                      className="w-16 text-center py-1 text-xs font-mono font-bold theme-card border theme-border rounded-lg focus:outline-none"
                    />
                    <span className="text-xs font-bold opacity-60 ml-1">Cr</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setStartingPurseCr((prev) => Math.min(500, prev + 10))}
                    className="p-1 rounded-lg theme-card border theme-border opacity-80 hover:opacity-100 transition-all cursor-pointer"
                    title="Increase by ₹10 Cr"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
                <span className="text-[11px] opacity-50">₹250 Cr</span>
              </div>
            </div>

            {/* SETTING 3: AUCTION POOL SIZE (SMOOTH SLIDER + STEPPER) */}
            <div className="theme-subtle-box p-4 rounded-2xl border theme-border space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs font-bold opacity-90">
                  <Users className="w-4 h-4 theme-accent-text" />
                  <span>Auction Pool Size (Players)</span>
                </div>
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-lg theme-accent-badge">
                  {poolSize} Players
                </span>
              </div>

              {/* Slider */}
              <div className="pt-1">
                <input
                  type="range"
                  min={20}
                  max={622}
                  step={10}
                  value={poolSize}
                  onChange={(e) => setPoolSize(parseInt(e.target.value, 10))}
                  aria-label="Auction pool size"
                />
              </div>

              {/* Stepper */}
              <div className="flex items-center justify-between pt-1">
                <span className="text-[11px] opacity-50">20</span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setPoolSize((prev) => Math.max(10, prev - 25))}
                    className="p-1 rounded-lg theme-card border theme-border opacity-80 hover:opacity-100 transition-all cursor-pointer"
                    title="Decrease by 25 players"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <input
                    type="number"
                    min={10}
                    max={622}
                    value={poolSize}
                    onChange={(e) => {
                      const val = parseInt(e.target.value, 10);
                      if (!isNaN(val)) setPoolSize(val);
                    }}
                    className="w-16 text-center py-1 text-xs font-mono font-bold theme-card border theme-border rounded-lg focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setPoolSize((prev) => Math.min(622, prev + 25))}
                    className="p-1 rounded-lg theme-card border theme-border opacity-80 hover:opacity-100 transition-all cursor-pointer"
                    title="Increase by 25 players"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
                <span className="text-[11px] opacity-50">622 (Full BCCI)</span>
              </div>
            </div>

            {/* LAUNCH BUTTON */}
            <button
              type="submit"
              disabled={isCreating}
              className="w-full py-3.5 px-6 rounded-2xl font-bold theme-btn-primary shadow-md active:scale-[0.99] disabled:opacity-50 text-sm tracking-wide flex items-center justify-center gap-2 cursor-pointer transition-all"
            >
              <Gavel className="w-4 h-4" />
              <span>{isCreating ? 'Creating Arena...' : 'Create Auction Arena'}</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>
          </form>
        ) : (
          <form onSubmit={handleJoinRoom} className="space-y-6">
            {joinError && (
              <div className="p-3.5 text-xs rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-500 font-medium">
                {joinError}
              </div>
            )}

            <div>
              <label className="block text-xs font-bold mb-1.5 opacity-90">
                6-Digit Room Code
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  maxLength={6}
                  placeholder="e.g. ABC123"
                  value={joinCode}
                  onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
                  className="w-full px-4 py-3 rounded-xl theme-subtle-box uppercase tracking-widest font-mono text-center font-bold text-xl focus:outline-none focus:ring-2 focus:ring-[var(--theme-accent)] transition-all"
                />
                <KeyRound className="w-4 h-4 opacity-40 absolute right-3.5 top-4 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold mb-1.5 opacity-90">
                Your Manager Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder="e.g. CaptainCool99"
                  value={joinName}
                  onChange={(e) => setJoinName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl theme-subtle-box text-sm focus:outline-none focus:ring-2 focus:ring-[var(--theme-accent)] transition-all font-medium"
                />
                <User className="w-4 h-4 opacity-40 absolute right-3.5 top-3 pointer-events-none" />
              </div>
            </div>

            <div className="p-3.5 rounded-xl theme-accent-badge text-xs opacity-90 leading-relaxed">
              Entering will let you choose any available IPL franchise and bid live with other players in real-time.
            </div>

            <button
              type="submit"
              disabled={isJoining}
              className="w-full py-3.5 px-6 rounded-2xl font-bold theme-btn-primary shadow-md active:scale-[0.99] disabled:opacity-50 text-sm tracking-wide flex items-center justify-center gap-2 cursor-pointer transition-all"
            >
              <span>{isJoining ? 'Joining Room...' : 'Enter Auction Room'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}
      </div>

      {/* ========================================================
          COMPACT FRANCHISE CHIPS (EASY & ACCESSIBLE)
          ======================================================== */}
      <section className="text-center mb-10">
        <p className="text-xs font-bold uppercase tracking-wider opacity-60 mb-4">
          Choose from all 10 Official Franchises
        </p>
        <div className="flex flex-wrap items-center justify-center gap-2 max-w-3xl mx-auto">
          {IPL_FRANCHISES.map((team) => (
            <div
              key={team.id}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border theme-border theme-subtle-box text-xs font-bold shadow-sm transition-transform hover:scale-105"
            >
              <span>{team.logo}</span>
              <span>{team.shortName}</span>
              {team.titles > 0 && (
                <span className="text-[10px] opacity-75 font-normal">
                  ({team.titles}★)
                </span>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================
          3 CLEAN FEATURE PILLS (NO CLUTTER)
          ======================================================== */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto w-full mb-6">
        <div className="theme-card theme-card-hover p-4 sm:p-5 rounded-2xl border theme-border flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl theme-accent-badge flex items-center justify-center shrink-0">
            <Zap className="w-4 h-4 theme-accent-text" />
          </div>
          <div>
            <h3 className="text-xs font-bold mb-0.5">Authoritative Timer</h3>
            <p className="text-[11px] opacity-70 leading-relaxed">
              Synchronized countdowns with auto-extension on late bids so no bid is ever missed.
            </p>
          </div>
        </div>

        <div className="theme-card theme-card-hover p-4 sm:p-5 rounded-2xl border theme-border flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl theme-accent-badge flex items-center justify-center shrink-0">
            <ShieldCheck className="w-4 h-4 theme-accent-text" />
          </div>
          <div>
            <h3 className="text-xs font-bold mb-0.5">622 BCCI Players</h3>
            <p className="text-[11px] opacity-70 leading-relaxed">
              Complete official 2025 mega-auction catalog with authentic base prices and IPL statistics.
            </p>
          </div>
        </div>

        <div className="theme-card theme-card-hover p-4 sm:p-5 rounded-2xl border theme-border flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl theme-accent-badge flex items-center justify-center shrink-0">
            <BarChart3 className="w-4 h-4 theme-accent-text" />
          </div>
          <div>
            <h3 className="text-xs font-bold mb-0.5">Squad Intel Dossier</h3>
            <p className="text-[11px] opacity-70 leading-relaxed">
              Instant 100-point post-auction evaluation rating team balance, depth, and playing XI.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
