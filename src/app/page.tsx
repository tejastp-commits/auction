'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { IPL_FRANCHISES } from '@/data/franchises';
import FranchiseLogo from '@/components/FranchiseLogo';
import { POOL_PRESETS } from '@/data/curated-pools';
import { CRORE } from '@/lib/currency';
import Link from 'next/link';
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
  Sparkles,
  Trophy,
  Sliders,
  CheckCircle2,
  Flame,
} from 'lucide-react';

export default function LandingPage() {
  const router = useRouter();

  // Create Room state
  const [hostName, setHostName] = useState('');
  const [startingPurseCr, setStartingPurseCr] = useState<number>(120);
  const [timerSeconds, setTimerSeconds] = useState<number>(15);
  const [poolSize, setPoolSize] = useState<number>(300);
  const [showCustomPool, setShowCustomPool] = useState<boolean>(false);

  const [isCreating, setIsCreating] = useState(false);
  const [createError, setCreateError] = useState('');

  // Join Room state
  const [joinCode, setJoinCode] = useState('');
  const [joinName, setJoinName] = useState('');
  const [isJoining, setIsJoining] = useState(false);
  const [joinError, setJoinError] = useState('');

  // Active tab in hero console
  const [activeTab, setActiveTab] = useState<'create' | 'join'>('create');

  // Interactive Live War Room Preview State (Tactile Demo)
  const [demoBidCr, setDemoBidCr] = useState<number>(21.5);
  const [demoLeader, setDemoLeader] = useState<string>('RCB');
  const [demoTimer, setDemoTimer] = useState<number>(8);
  const [demoHistory, setDemoHistory] = useState<Array<{ team: string; amount: number; time: string }>>([
    { team: 'RCB', amount: 21.5, time: 'Just now' },
    { team: 'CSK', amount: 21.0, time: '4s ago' },
    { team: 'MI', amount: 20.5, time: '8s ago' },
  ]);

  const handleDemoBid = (teamName: string, increment: number) => {
    const nextBid = +(demoBidCr + increment).toFixed(2);
    setDemoBidCr(nextBid);
    setDemoLeader(teamName);
    setDemoTimer(12);
    setDemoHistory((prev) => [
      { team: teamName, amount: nextBid, time: 'Just now' },
      ...prev.slice(0, 2),
    ]);
  };

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
    <div className="flex-1 flex flex-col justify-between py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full transition-colors">
      {/* ========================================================
          HERO SECTION: DUAL-COLUMN BROADCAST COMMAND DECK
          ======================================================== */}
      <section className="relative mb-16 sm:mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          
          {/* LEFT: TITLE & LAUNCH CONSOLE */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Status Pills */}
            <div className="flex flex-wrap items-center gap-2.5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full theme-accent-badge text-xs font-bold tracking-wide shadow-sm">
                <span className="w-2 h-2 rounded-full theme-btn-primary animate-pulse" />
                <span>IPL 2026 OFFICIAL WAR ROOM SIMULATOR</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full theme-subtle-box text-xs font-medium border theme-border">
                <Flame className="w-3.5 h-3.5 theme-accent-text" />
                <span>Live Multiplayer War Rooms</span>
              </div>
            </div>

            {/* Headline */}
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.08]">
                Build Your Championship XI.{' '}
                <span className="block theme-accent-text">
                  Real-Time IPL Auction Arena.
                </span>
              </h1>
              <p className="mt-4 text-base sm:text-lg opacity-75 leading-relaxed max-w-2xl font-normal">
                Step up to the bidding table. Manage authentic ₹120 Cr franchise purses, hold up the paddle with official BCCI bid increments (+₹10L under ₹2 Cr, +₹25L over ₹2 Cr), and draft from 5-year performance-analyzed player sets tailored for 4 to 10 teams.
              </p>
            </div>

            {/* THE ARENA CONSOLE */}
            <div className="theme-card rounded-3xl p-6 sm:p-7 shadow-2xl relative border theme-border">
              {/* Tab Switcher */}
              <div className="flex rounded-2xl theme-subtle-box p-1.5 mb-6 border theme-border">
                <button
                  type="button"
                  onClick={() => setActiveTab('create')}
                  className={`flex-1 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-all cursor-pointer ${
                    activeTab === 'create'
                      ? 'theme-card font-black shadow-sm'
                      : 'opacity-60 hover:opacity-100'
                  }`}
                >
                  Create Auction Arena
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
                <form onSubmit={handleCreateRoom} className="space-y-5">
                  {createError && (
                    <div className="p-3.5 text-xs rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-500 font-medium">
                      {createError}
                    </div>
                  )}

                  {/* Host Name */}
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

                  {/* SETTING 1: BID TIMER (SLIDER + STEPPER) */}
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
                        <span className="text-[10px] font-medium px-2 py-0.5 rounded-lg theme-card border theme-border">
                          {timerSeconds <= 10 ? '⚡ Blitz' : timerSeconds <= 20 ? '⏱️ Standard' : '🧠 Strategic'}
                        </span>
                      </div>
                    </div>

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

                  {/* SETTING 2: STARTING PURSE (SLIDER + STEPPER) */}
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

                  {/* SETTING 3: CURATED PLAYER POOL PRESET (ALIGNED WITH TEAMS) */}
                  <div className="theme-subtle-box p-4 rounded-2xl border theme-border space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-xs font-bold opacity-90">
                        <Users className="w-4 h-4 theme-accent-text" />
                        <span>Curated Player Pool (Aligned with Teams)</span>
                      </div>
                      <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-lg theme-accent-badge">
                        {poolSize} Players
                      </span>
                    </div>

                    {/* 3 PRESET SELECTION CARDS */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
                      {POOL_PRESETS.map((preset) => {
                        const isSelected = poolSize === preset.playerCount;
                        return (
                          <button
                            key={preset.id}
                            type="button"
                            onClick={() => setPoolSize(preset.playerCount)}
                            className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                              isSelected
                                ? 'theme-card ring-2 ring-[var(--theme-accent)] shadow-md'
                                : 'theme-card border-transparent opacity-75 hover:opacity-100 hover:scale-[1.01]'
                            }`}
                          >
                            <div>
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-[11px] font-black uppercase tracking-wider theme-accent-text">
                                  {preset.targetTeams}
                                </span>
                                {isSelected && (
                                  <span className="w-2 h-2 rounded-full theme-btn-primary" />
                                )}
                              </div>
                              <div className="text-xs font-bold leading-snug">
                                {preset.playerCount} Players
                              </div>
                              <div className="text-[10px] opacity-65 mt-1 leading-tight line-clamp-2 font-medium">
                                {preset.tagline}
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    <div className="flex items-center justify-between pt-1 text-[11px] opacity-65">
                      <span>Curated by 5-year IPL & T20 performance</span>
                      <button
                        type="button"
                        onClick={() => setShowCustomPool(!showCustomPool)}
                        className="text-[11px] underline opacity-80 hover:opacity-100 cursor-pointer font-medium"
                      >
                        {showCustomPool ? 'Hide Custom Pool Slider' : 'Custom Pool Size?'}
                      </button>
                    </div>

                    {showCustomPool && (
                      <div className="pt-2 border-t theme-border space-y-2 animate-fade-in">
                        <input
                          type="range"
                          min={20}
                          max={622}
                          step={10}
                          value={poolSize}
                          onChange={(e) => setPoolSize(parseInt(e.target.value, 10))}
                          aria-label="Auction pool size"
                        />
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="opacity-50">Min 20</span>
                          <span className="font-mono font-bold">{poolSize} Players Selected</span>
                          <span className="opacity-50">Max 622</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* LAUNCH BUTTON */}
                  <button
                    type="submit"
                    disabled={isCreating}
                    className="w-full py-4 px-6 rounded-2xl font-bold theme-btn-primary shadow-lg hover:opacity-95 active:scale-[0.99] disabled:opacity-50 text-sm tracking-wide flex items-center justify-center gap-2.5 cursor-pointer transition-all"
                  >
                    <Gavel className="w-4 h-4" />
                    <span>{isCreating ? 'INITIALIZING ARENA...' : 'INITIALIZE AUCTION ARENA 🔨'}</span>
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </button>
                </form>
              ) : (
                <form onSubmit={handleJoinRoom} className="space-y-5">
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
                    className="w-full py-4 px-6 rounded-2xl font-bold theme-btn-primary shadow-lg hover:opacity-95 active:scale-[0.99] disabled:opacity-50 text-sm tracking-wide flex items-center justify-center gap-2 cursor-pointer transition-all"
                  >
                    <span>{isJoining ? 'JOINING ROOM...' : 'ENTER AUCTION ROOM →'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* RIGHT: INTERACTIVE LIVE WAR ROOM PREVIEW */}
          <div className="lg:col-span-5 space-y-4">
            <div className="theme-card rounded-3xl p-5 sm:p-6 border theme-border shadow-2xl relative overflow-hidden">
              {/* Broadcast header */}
              <div className="flex items-center justify-between pb-3.5 border-b theme-border">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
                  </span>
                  <span className="text-xs font-black uppercase tracking-wider">
                    WAR ROOM LOT #1
                  </span>
                  <span className="text-[10px] theme-subtle-box px-2 py-0.5 rounded font-mono border theme-border">
                    M1 • MARQUEE
                  </span>
                </div>

                {/* COUNTDOWN TIMER BADGE */}
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-red-500/10 border border-red-500/30 text-red-500 font-bold">
                  <Clock className="w-3.5 h-3.5 animate-pulse" />
                  <span className="font-mono font-black text-xs">
                    00:0{demoTimer}s
                  </span>
                </div>
              </div>

              {/* Active Player Card */}
              <div className="py-4">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm">🇮🇳</span>
                      <span className="text-[11px] font-bold uppercase tracking-wider theme-accent-badge px-2 py-0.5 rounded">
                        Top-Order Batter
                      </span>
                    </div>
                    <h3 className="text-2xl font-black tracking-tight">
                      Virat Kohli
                    </h3>
                    <p className="text-xs opacity-65 mt-0.5 font-medium">
                      Marquee Set 1 • Base Price ₹2.00 Cr
                    </p>
                  </div>

                  <div className="w-11 h-11 rounded-xl theme-accent-badge flex flex-col items-center justify-center text-center">
                    <Sparkles className="w-4 h-4 theme-accent-text" />
                    <span className="text-[9px] font-black uppercase">SET 1</span>
                  </div>
                </div>

                {/* Quick stats grid */}
                <div className="grid grid-cols-4 gap-2 mt-4 p-2.5 rounded-xl theme-subtle-box border theme-border text-center font-mono text-xs">
                  <div>
                    <span className="text-[10px] opacity-50 block font-sans">IPL RUNS</span>
                    <span className="font-bold">8,004</span>
                  </div>
                  <div>
                    <span className="text-[10px] opacity-50 block font-sans">STRIKE RATE</span>
                    <span className="font-bold theme-accent-text">131.97</span>
                  </div>
                  <div>
                    <span className="text-[10px] opacity-50 block font-sans">MATCHES</span>
                    <span className="font-bold">252</span>
                  </div>
                  <div>
                    <span className="text-[10px] opacity-50 block font-sans">50s / 100s</span>
                    <span className="font-bold">55 / 8</span>
                  </div>
                </div>
              </div>

              {/* Current Bid Deck */}
              <div className="p-4 rounded-2xl theme-subtle-box border theme-border space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold opacity-60 uppercase tracking-wider text-[10px]">
                    Current Highest Bid
                  </span>
                  <span className="text-emerald-500 font-bold flex items-center gap-1 text-[11px]">
                    <CheckCircle2 className="w-3 h-3" /> Live Bidding War
                  </span>
                </div>

                <div className="flex items-baseline justify-between">
                  <div className="text-3xl font-black font-mono tracking-tight theme-accent-text">
                    ₹{demoBidCr.toFixed(2)} <span className="text-base font-normal opacity-75 font-sans">Cr</span>
                  </div>
                  <div className="flex items-center gap-2 px-2.5 py-1 rounded-lg theme-card border theme-border">
                    <span className="w-2.5 h-2.5 rounded-full theme-btn-primary" />
                    <span className="font-black text-xs">{demoLeader}</span>
                    <span className="text-[10px] opacity-60">Lead</span>
                  </div>
                </div>
              </div>

              {/* Recent Bids Ticker */}
              <div className="mt-3.5 space-y-1.5">
                <span className="text-[10px] uppercase font-bold tracking-wider opacity-60 block px-1">
                  Live Bidding Stream
                </span>
                <div className="space-y-1 text-xs font-mono">
                  {demoHistory.map((h, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-2 rounded-lg theme-subtle-box border theme-border"
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-black theme-accent-text text-xs">{h.team}</span>
                        <span className="text-[11px] opacity-50">bid</span>
                        <span className="font-bold">₹{h.amount.toFixed(2)} Cr</span>
                      </div>
                      <span className="text-[10px] opacity-50">{h.time}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Interactive Demo Test Buttons */}
              <div className="mt-4 pt-3.5 border-t theme-border flex flex-col sm:flex-row items-center justify-between gap-2.5">
                <div className="text-[11px] opacity-75 font-medium">
                  Official Paddle (+₹0.25 Cr) & Jump Bid:
                </div>
                <div className="flex items-center gap-1.5 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={() => handleDemoBid('RCB', 0.25)}
                    className="flex-1 sm:flex-initial px-3 py-1.5 text-xs font-bold rounded-lg theme-btn-primary shadow-sm hover:opacity-90 transition-all cursor-pointer flex items-center justify-center gap-1"
                  >
                    <span>🔨</span>
                    <span>Paddle (+₹25L)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDemoBid('CSK', 2.0)}
                    className="flex-1 sm:flex-initial px-3 py-1.5 text-xs font-bold rounded-lg theme-card border theme-border hover:opacity-100 transition-all cursor-pointer flex items-center justify-center gap-1"
                  >
                    <span>⚡</span>
                    <span>Jump (+₹2 Cr)</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-3">
              <div className="theme-card p-3 rounded-2xl border theme-border text-center">
                <div className="text-xl font-black font-mono theme-accent-text">622</div>
                <div className="text-[10px] font-bold opacity-60 uppercase tracking-wider">
                  BCCI Players
                </div>
              </div>
              <div className="theme-card p-3 rounded-2xl border theme-border text-center">
                <div className="text-xl font-black font-mono text-emerald-500">&lt; 1s</div>
                <div className="text-[10px] font-bold opacity-60 uppercase tracking-wider">
                  Sync Engine
                </div>
              </div>
              <div className="theme-card p-3 rounded-2xl border theme-border text-center">
                <div className="text-xl font-black font-mono">10</div>
                <div className="text-[10px] font-bold opacity-60 uppercase tracking-wider">
                  Franchises
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          FRANCHISE WAR ROOM PAVILION (10 TEAMS)
          ======================================================== */}
      <section className="mb-16 sm:mb-20">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold theme-accent-text uppercase tracking-widest mb-1.5">
              <Trophy className="w-4 h-4" />
              <span>Official 10 Franchises</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
              Claim Your Franchise War Room Table
            </h2>
          </div>
          <p className="text-xs opacity-70 max-w-md">
            Each franchise features authentic colors, historical championship records, and dedicated purse allocations.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3.5">
          {IPL_FRANCHISES.map((team) => (
            <div
              key={team.id}
              className="p-4 rounded-2xl border theme-border theme-card theme-card-hover group cursor-default"
            >
              <div className="flex items-center justify-between mb-3">
                <div
                  className="w-10 h-10 rounded-xl p-1 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform bg-slate-900 border theme-border"
                >
                  <FranchiseLogo franchiseId={team.id} size="md" />
                </div>
                <span className="text-[10px] font-bold font-mono tracking-wider px-2 py-0.5 rounded theme-subtle-box border theme-border">
                  {team.shortName}
                </span>
              </div>

              <div className="space-y-1">
                <div className="text-xs sm:text-sm font-black truncate group-hover:opacity-80 transition-opacity">
                  {team.name}
                </div>
                <div className="flex items-center justify-between text-[11px] opacity-65">
                  <span>{team.city}</span>
                  <span className="font-semibold">
                    {team.titles > 0 ? `${team.titles}x Champ` : 'Contender'}
                  </span>
                </div>
              </div>

              <div className="mt-2.5 pt-2 border-t theme-border flex items-center gap-1">
                {team.titles > 0 ? (
                  Array.from({ length: team.titles }).map((_, i) => (
                    <span key={i} className="text-xs leading-none">⭐</span>
                  ))
                ) : (
                  <span className="text-[10px] opacity-40">Chasing 1st Trophy</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================
          HOW THE ARENA WORKS (3-STEP TACTICAL GUIDE)
          ======================================================== */}
      <section className="mb-16 sm:mb-20">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold theme-accent-text uppercase tracking-widest mb-1.5">
            <Sliders className="w-4 h-4" />
            <span>How It Works</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
            Built for Serious Cricket Competition
          </h2>
          <p className="mt-2 text-xs sm:text-sm opacity-70">
            Engineered to reproduce the exact pressure, rules, and mathematical rigor of an official mega-auction.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="theme-card theme-card-hover p-6 rounded-3xl border theme-border space-y-3">
            <div className="w-11 h-11 rounded-2xl theme-accent-badge flex items-center justify-center">
              <Sliders className="w-5 h-5 theme-accent-text" />
            </div>
            <div className="text-[11px] font-mono font-bold tracking-widest uppercase opacity-50">
              Step 01
            </div>
            <h3 className="text-base font-black">Curated Sets & Team Pools</h3>
            <p className="text-xs opacity-70 leading-relaxed">
              Choose 150, 200, or 300 cricketers curated across 5-year IPL performance. Structured into official broadcast sets (Marquee M1/M2, Capped Batters, All-Rounders, Keepers, Pacers, Spinners).
            </p>
          </div>

          <div className="theme-card theme-card-hover p-6 rounded-3xl border theme-border space-y-3">
            <div className="w-11 h-11 rounded-2xl theme-accent-badge flex items-center justify-center">
              <Gavel className="w-5 h-5 theme-accent-text" />
            </div>
            <div className="text-[11px] font-mono font-bold tracking-widest uppercase opacity-50">
              Step 02
            </div>
            <h3 className="text-base font-black">Official Incremental Bidding</h3>
            <p className="text-xs opacity-70 leading-relaxed">
              Hold up the paddle with authentic rules: +₹10L under ₹2 Cr, +₹25L over ₹2 Cr, plus instant direct Jump Bids when you want to secure your target marquee player.
            </p>
          </div>

          <div className="theme-card theme-card-hover p-6 rounded-3xl border theme-border space-y-3">
            <div className="w-11 h-11 rounded-2xl theme-accent-badge flex items-center justify-center">
              <BarChart3 className="w-5 h-5 theme-accent-text" />
            </div>
            <div className="text-[11px] font-mono font-bold tracking-widest uppercase opacity-50">
              Step 03
            </div>
            <h3 className="text-base font-black">Live Gavel & Squad Analytics</h3>
            <p className="text-xs opacity-70 leading-relaxed">
              Synchronized auctioneer countdown clocks, anti-snipe timer extensions, and instant squad math keeping track of your 8-overseas limits, purse balances, and starting XI dossiers.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================
          TRUST & INVARIANTS GRID
          ======================================================== */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl theme-subtle-box border theme-border space-y-1.5">
          <div className="w-8 h-8 rounded-lg theme-accent-badge flex items-center justify-center mb-2">
            <ShieldCheck className="w-4 h-4 theme-accent-text" />
          </div>
          <h4 className="text-xs font-bold">Server Authority</h4>
          <p className="text-[11px] opacity-65 leading-relaxed">
            Zero duplicate sales or desync. Strict server-side validation on every bid transaction.
          </p>
        </div>

        <div className="p-4 rounded-2xl theme-subtle-box border theme-border space-y-1.5">
          <div className="w-8 h-8 rounded-lg theme-accent-badge flex items-center justify-center mb-2">
            <Users className="w-4 h-4 theme-accent-text" />
          </div>
          <h4 className="text-xs font-bold">622 Official BCCI Players</h4>
          <p className="text-[11px] opacity-65 leading-relaxed">
            Verified official 2025 mega-auction registration database with historical IPL statistics.
          </p>
        </div>

        <div className="p-4 rounded-2xl theme-subtle-box border theme-border space-y-1.5">
          <div className="w-8 h-8 rounded-lg theme-accent-badge flex items-center justify-center mb-2">
            <Coins className="w-4 h-4 theme-accent-text" />
          </div>
          <h4 className="text-xs font-bold">Strict Roster Math</h4>
          <p className="text-[11px] opacity-65 leading-relaxed">
            Automatic tracking of remaining purse, minimum 18-player rosters, and 8-overseas limits.
          </p>
        </div>

        <div className="p-4 rounded-2xl theme-subtle-box border theme-border space-y-1.5">
          <div className="w-8 h-8 rounded-lg theme-accent-badge flex items-center justify-center mb-2">
            <BarChart3 className="w-4 h-4 theme-accent-text" />
          </div>
          <h4 className="text-xs font-bold">Permanent Shareable URLs</h4>
          <p className="text-[11px] opacity-65 leading-relaxed">
            Unique report link generated at auction end with detailed breakdown and franchise evaluations.
          </p>
        </div>
      </section>
    </div>
  );
}
