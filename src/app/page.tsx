'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { IPL_FRANCHISES } from '@/data/franchises';
import FranchiseLogo from '@/components/FranchiseLogo';
import AuctionArenaLogo from '@/components/AuctionArenaLogo';
import DoodleSection from '@/components/DoodleSection';
import DoodleFlag from '@/components/DoodleFlag';
import FranchiseRosterModal from '@/components/FranchiseRosterModal';
import { THEMES } from '@/components/ThemeCustomizer';
import { POOL_PRESETS, CURATED_SETS } from '@/data/curated-pools';
import { VERIFIED_PLAYERS, PlayerRole } from '@/data/players';
import { CRORE, formatRupees } from '@/lib/currency';
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
  Radio,
  Search,
  Filter,
  Layers,
  Building2,
  TrendingUp,
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

  // Right-side Tactical Intelligence Deck State
  const [scoutTab, setScoutTab] = useState<'players' | 'sets' | 'franchises'>('players');
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<'ALL' | PlayerRole>('ALL');

  // Interactive Hover State for "Built for Serious Cricket Competition" Steps
  const [hoveredStep, setHoveredStep] = useState<number>(1);

  // Hovered Franchise Table State
  const [hoveredTeam, setHoveredTeam] = useState<string | null>(null);
  // Selected Franchise for 2026 Roster Modal
  const [selectedFranchiseForRoster, setSelectedFranchiseForRoster] = useState<string | null>(null);

  // Memoized Search Filter for 622 BCCI Players
  const filteredPlayers = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return VERIFIED_PLAYERS.filter((player) => {
      const matchesQuery =
        !q ||
        player.canonicalName.toLowerCase().includes(q) ||
        player.nationality.toLowerCase().includes(q) ||
        player.primaryRole.toLowerCase().includes(q);
      const matchesRole = roleFilter === 'ALL' || player.primaryRole === roleFilter;
      return matchesQuery && matchesRole;
    }).slice(0, 30);
  }, [searchQuery, roleFilter]);

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
    <div className="flex-1 flex flex-col justify-between py-6 sm:py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full transition-colors relative overflow-hidden text-[#1E1B18]">
      
      {/* BACKGROUND WARM PEACH AMBIENT GLOWS */}
      <div className="absolute top-[-80px] left-1/2 -translate-x-1/2 w-[650px] h-[380px] bg-orange-500/10 blur-[130px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-[35%] right-[-100px] w-[500px] h-[500px] bg-amber-500/10 blur-[140px] rounded-full pointer-events-none -z-10" />

      {/* ========================================================
          HERO SECTION: DUAL-COLUMN BROADCAST COMMAND DECK
          ======================================================== */}
      <section className="relative mb-14 sm:mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* LEFT: COMMAND CONSOLE (ENLARGED & PROMINENT) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Status Pills */}
            <div className="flex flex-wrap items-center gap-2.5">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-100 text-orange-900 border border-orange-200 text-xs sm:text-sm font-black tracking-wide shadow-xs">
                <span className="w-2.5 h-2.5 rounded-full bg-orange-600 animate-ping" />
                <span>IPL 2026 WAR ROOM LIVE</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white text-xs sm:text-sm font-bold border border-[#FED7AA] shadow-xs">
                <Radio className="w-4 h-4 text-orange-600 animate-pulse" />
                <span>Live Multiplayer War Rooms</span>
              </div>
            </div>

            {/* Headline */}
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.05] text-[#1E1B18]">
                Command the Table.{' '}
                <span className="block text-orange-600">
                  IPL Auction Arena.
                </span>
              </h1>
              <p className="mt-3.5 text-base sm:text-lg text-[#786C64] leading-relaxed max-w-2xl font-medium">
                Live multiplayer franchise bidding war. ₹120 Cr purses, official BCCI increment paddles, and 5-year curated player pools.
              </p>
            </div>

            {/* THE ARENA CONSOLE (ENLARGED CONTROLS & SPACING) */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl relative border border-[#FED7AA]">
              {/* Tab Switcher */}
              <div className="flex rounded-2xl bg-[#FFF7ED] p-1.5 mb-6 border border-[#FED7AA]">
                <button
                  type="button"
                  onClick={() => setActiveTab('create')}
                  className={`flex-1 py-3 text-sm sm:text-base font-black rounded-xl transition-all cursor-pointer ${
                    activeTab === 'create'
                      ? 'theme-card font-black shadow-md'
                      : 'opacity-60 hover:opacity-100'
                  }`}
                >
                  Create War Room
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('join')}
                  className={`flex-1 py-3 text-sm sm:text-base font-black rounded-xl transition-all cursor-pointer ${
                    activeTab === 'join'
                      ? 'theme-card font-black shadow-md'
                      : 'opacity-60 hover:opacity-100'
                  }`}
                >
                  Join with Code
                </button>
              </div>

              {activeTab === 'create' ? (
                <form onSubmit={handleCreateRoom} className="space-y-5">
                  {createError && (
                    <div className="p-4 text-xs sm:text-sm rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-500 font-bold">
                      {createError}
                    </div>
                  )}

                  {/* 1. Host Name (Enlarged) */}
                  <div>
                    <label className="block text-sm font-black mb-2 opacity-95">
                      Auctioneer / Host Name
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        placeholder="e.g. Richard Madley"
                        value={hostName}
                        onChange={(e) => setHostName(e.target.value)}
                        className="w-full px-4.5 py-3.5 sm:py-4 rounded-2xl theme-subtle-box text-base sm:text-lg focus:outline-none focus:ring-2 focus:ring-[var(--theme-accent)] transition-all font-bold border theme-border"
                      />
                      <User className="w-5 h-5 opacity-40 absolute right-4 top-4 sm:top-4.5 pointer-events-none" />
                    </div>
                  </div>

                  {/* 2. BID TIMER (ENLARGED COUNTER & STEPPER) */}
                  <div className="theme-subtle-box p-4.5 sm:p-5 rounded-2xl border theme-border space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm font-black opacity-95">
                        <Clock className="w-5 h-5 theme-accent-text" />
                        <span>Bid Countdown Timer</span>
                      </div>
                      <span className="text-sm sm:text-base font-mono font-black px-3.5 py-1 rounded-xl theme-accent-badge border border-amber-500/20">
                        {timerSeconds}s {timerSeconds <= 10 ? '⚡ Blitz' : '⏱️ Standard'}
                      </span>
                    </div>

                    <input
                      type="range"
                      min={5}
                      max={60}
                      step={1}
                      value={timerSeconds}
                      onChange={(e) => setTimerSeconds(parseInt(e.target.value, 10))}
                      aria-label="Bid timer in seconds"
                      className="w-full h-2 rounded-lg cursor-pointer accent-[var(--theme-accent)]"
                    />

                    <div className="flex items-center justify-between text-xs sm:text-sm opacity-70 font-bold">
                      <span>5s (Blitz)</span>
                      <div className="flex items-center gap-2.5">
                        <button
                          type="button"
                          onClick={() => setTimerSeconds((prev) => Math.max(5, prev - 5))}
                          className="w-8 h-8 rounded-xl theme-card border theme-border font-black text-sm flex items-center justify-center hover:scale-105 active:scale-95 transition-all cursor-pointer"
                        >
                          -5
                        </button>
                        <span className="font-mono font-black text-sm sm:text-base px-2">
                          {timerSeconds} sec
                        </span>
                        <button
                          type="button"
                          onClick={() => setTimerSeconds((prev) => Math.min(60, prev + 5))}
                          className="w-8 h-8 rounded-xl theme-card border theme-border font-black text-sm flex items-center justify-center hover:scale-105 active:scale-95 transition-all cursor-pointer"
                        >
                          +5
                        </button>
                      </div>
                      <span>60s</span>
                    </div>
                  </div>

                  {/* 3. STARTING PURSE (ENLARGED COUNTER & CONTROLS) */}
                  <div className="theme-subtle-box p-4.5 sm:p-5 rounded-2xl border theme-border space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm font-black opacity-95">
                        <Coins className="w-5 h-5 theme-accent-text" />
                        <span>Franchise Starting Purse</span>
                      </div>
                      <span className="text-sm sm:text-base font-mono font-black px-3.5 py-1 rounded-xl theme-accent-badge border border-amber-500/20">
                        ₹{startingPurseCr} Crore
                      </span>
                    </div>

                    <input
                      type="range"
                      min={50}
                      max={250}
                      step={5}
                      value={startingPurseCr}
                      onChange={(e) => setStartingPurseCr(parseInt(e.target.value, 10))}
                      aria-label="Starting purse in Crores"
                      className="w-full h-2 rounded-lg cursor-pointer accent-[var(--theme-accent)]"
                    />

                    <div className="flex items-center justify-between text-xs sm:text-sm opacity-70 font-bold">
                      <span>₹50 Cr</span>
                      <div className="flex items-center gap-2.5">
                        <button
                          type="button"
                          onClick={() => setStartingPurseCr((prev) => Math.max(20, prev - 10))}
                          className="px-2.5 py-1 rounded-xl theme-card border theme-border font-black text-xs hover:scale-105 active:scale-95 transition-all cursor-pointer"
                        >
                          -10 Cr
                        </button>
                        <span className="font-mono font-black text-sm sm:text-base px-1">
                          ₹{startingPurseCr} Cr
                        </span>
                        <button
                          type="button"
                          onClick={() => setStartingPurseCr((prev) => Math.min(250, prev + 10))}
                          className="px-2.5 py-1 rounded-xl theme-card border theme-border font-black text-xs hover:scale-105 active:scale-95 transition-all cursor-pointer"
                        >
                          +10 Cr
                        </button>
                      </div>
                      <span>₹250 Cr</span>
                    </div>
                  </div>

                  {/* 4. POOL PRESETS (ENLARGED CARDS) */}
                  <div className="theme-subtle-box p-4.5 sm:p-5 rounded-2xl border theme-border space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm font-black opacity-95">
                        <Users className="w-5 h-5 theme-accent-text" />
                        <span>Curated Player Pool (Aligned with Teams)</span>
                      </div>
                      <span className="text-sm sm:text-base font-mono font-black px-3.5 py-1 rounded-xl theme-accent-badge border border-amber-500/20">
                        {poolSize} Players
                      </span>
                    </div>

                    {/* 3 PRESET SELECTION CARDS (ENLARGED) */}
                    <div className="grid grid-cols-3 gap-2.5 pt-1">
                      {POOL_PRESETS.map((preset) => {
                        const isSelected = poolSize === preset.playerCount;
                        return (
                          <button
                            key={preset.id}
                            type="button"
                            onClick={() => setPoolSize(preset.playerCount)}
                            className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                              isSelected
                                ? 'theme-card ring-2 ring-[var(--theme-accent)] shadow-xl scale-[1.02]'
                                : 'theme-card border-transparent opacity-70 hover:opacity-100 hover:scale-[1.01]'
                            }`}
                          >
                            <span className="text-xs font-black uppercase tracking-wider theme-accent-text">
                              {preset.targetTeams}
                            </span>
                            <div className="text-sm sm:text-base font-black my-1">
                              {preset.playerCount} Players
                            </div>
                            <span className="text-[10px] sm:text-[11px] opacity-65 font-medium leading-tight line-clamp-1">
                              {preset.playerCount === 300
                                ? '10 Teams Max'
                                : preset.playerCount === 200
                                ? '6–8 Teams'
                                : '4–5 Teams'}
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    <div className="flex items-center justify-between pt-1 text-xs opacity-75 font-medium">
                      <span>Curated by 5-yr IPL & T20 statistics</span>
                      <button
                        type="button"
                        onClick={() => setShowCustomPool(!showCustomPool)}
                        className="underline hover:opacity-100 cursor-pointer font-bold"
                      >
                        {showCustomPool ? 'Hide Custom Pool' : 'Custom Size?'}
                      </button>
                    </div>

                    {showCustomPool && (
                      <div className="pt-2.5 border-t theme-border space-y-2 animate-fade-in">
                        <input
                          type="range"
                          min={20}
                          max={622}
                          step={10}
                          value={poolSize}
                          onChange={(e) => setPoolSize(parseInt(e.target.value, 10))}
                          aria-label="Auction pool size"
                          className="w-full h-2 rounded-lg cursor-pointer accent-[var(--theme-accent)]"
                        />
                        <div className="flex items-center justify-between text-xs font-mono font-bold">
                          <span>20</span>
                          <span className="theme-accent-text">{poolSize} Players Selected</span>
                          <span>622</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* LAUNCH BUTTON (ENLARGED) */}
                  <button
                    type="submit"
                    disabled={isCreating}
                    className="w-full py-4.5 sm:py-5 px-8 rounded-2xl font-black theme-btn-primary shadow-2xl hover:opacity-95 active:scale-[0.99] disabled:opacity-50 text-base sm:text-lg tracking-wide flex items-center justify-center gap-3 cursor-pointer transition-all"
                  >
                    <Gavel className="w-5 h-5" />
                    <span>{isCreating ? 'INITIALIZING WAR ROOM...' : 'LAUNCH AUCTION WAR ROOM 🔨'}</span>
                    <ArrowRight className="w-5 h-5 ml-1" />
                  </button>
                </form>
              ) : (
                <form onSubmit={handleJoinRoom} className="space-y-5">
                  {joinError && (
                    <div className="p-4 text-xs sm:text-sm rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-500 font-bold">
                      {joinError}
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-black mb-2 opacity-95">
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
                        className="w-full px-4.5 py-4 rounded-2xl theme-subtle-box uppercase tracking-widest font-mono text-center font-black text-2xl focus:outline-none focus:ring-2 focus:ring-[var(--theme-accent)] transition-all border theme-border"
                      />
                      <KeyRound className="w-5 h-5 opacity-40 absolute right-4 top-4.5 pointer-events-none" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-black mb-2 opacity-95">
                      Your Manager Name
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        placeholder="e.g. CaptainCool99"
                        value={joinName}
                        onChange={(e) => setJoinName(e.target.value)}
                        className="w-full px-4.5 py-3.5 sm:py-4 rounded-2xl theme-subtle-box text-base sm:text-lg focus:outline-none focus:ring-2 focus:ring-[var(--theme-accent)] transition-all font-bold border theme-border"
                      />
                      <User className="w-5 h-5 opacity-40 absolute right-4 top-4 pointer-events-none" />
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl theme-accent-badge text-xs sm:text-sm opacity-90 leading-relaxed font-medium">
                    ⚡ Pick any open IPL franchise table to bid live with other managers in real-time.
                  </div>

                  <button
                    type="submit"
                    disabled={isJoining}
                    className="w-full py-4.5 sm:py-5 px-8 rounded-2xl font-black theme-btn-primary shadow-2xl hover:opacity-95 active:scale-[0.99] disabled:opacity-50 text-base sm:text-lg tracking-wide flex items-center justify-center gap-3 cursor-pointer transition-all"
                  >
                    <span>{isJoining ? 'JOINING ROOM...' : 'ENTER WAR ROOM TABLE →'}</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* RIGHT: TACTICAL WAR ROOM INTELLIGENCE & DATABASE SCOUT */}
          <div className="lg:col-span-5 space-y-4">
            <div className="theme-card rounded-[2.5rem] rounded-bl-[4rem] p-5 sm:p-6 border theme-border shadow-2xl relative overflow-hidden backdrop-blur-xl">
              
              {/* Header & Feature Tabs */}
              <div className="flex items-center justify-between pb-3.5 border-b theme-border">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl theme-accent-badge flex items-center justify-center">
                    <Sparkles className="w-4 h-4 theme-accent-text" />
                  </div>
                  <div>
                    <h3 className="text-sm font-black tracking-tight leading-none">
                      War Room Intelligence Deck
                    </h3>
                    <span className="text-[10px] opacity-60 font-medium">
                      Live Database & Strategy Explorer
                    </span>
                  </div>
                </div>

                {/* Live Database Pill */}
                <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-500 border border-emerald-500/30 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  622 PLAYERS
                </span>
              </div>

              {/* Deck Tabs */}
              <div className="flex rounded-xl theme-subtle-box p-1 my-3.5 border theme-border text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setScoutTab('players')}
                  className={`flex-1 py-1.5 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                    scoutTab === 'players' ? 'theme-card font-black shadow-sm' : 'opacity-65 hover:opacity-100'
                  }`}
                >
                  <Search className="w-3.5 h-3.5" />
                  <span>Scout Players</span>
                </button>
                <button
                  type="button"
                  onClick={() => setScoutTab('sets')}
                  className={`flex-1 py-1.5 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                    scoutTab === 'sets' ? 'theme-card font-black shadow-sm' : 'opacity-65 hover:opacity-100'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>29 Sets</span>
                </button>
                <button
                  type="button"
                  onClick={() => setScoutTab('franchises')}
                  className={`flex-1 py-1.5 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                    scoutTab === 'franchises' ? 'theme-card font-black shadow-sm' : 'opacity-65 hover:opacity-100'
                  }`}
                >
                  <Building2 className="w-3.5 h-3.5" />
                  <span>10 Teams</span>
                </button>
              </div>

              {/* TAB CONTENT 1: SCOUT PLAYERS (LIVE SEARCH) */}
              {scoutTab === 'players' && (
                <div className="space-y-3">
                  {/* Search Input */}
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search player, country, or role..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-9 pr-4 py-2 rounded-xl theme-subtle-box text-xs font-medium border theme-border focus:outline-none focus:ring-1 focus:ring-[var(--theme-accent)]"
                    />
                    <Search className="w-4 h-4 opacity-40 absolute left-3 top-2.5 pointer-events-none" />
                  </div>

                  {/* Role Filter Chips */}
                  <div className="flex flex-wrap items-center gap-1.5 text-[10px] font-bold">
                    {(['ALL', 'BATTER', 'ALL_ROUNDER', 'BOWLER', 'WICKETKEEPER'] as const).map((r) => (
                      <button
                        key={r}
                        type="button"
                        onClick={() => setRoleFilter(r)}
                        className={`px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
                          roleFilter === r
                            ? 'theme-accent-badge font-black border-transparent'
                            : 'theme-subtle-box opacity-65 hover:opacity-100 border-transparent'
                        }`}
                      >
                        {r === 'ALL'
                          ? 'All'
                          : r === 'ALL_ROUNDER'
                          ? 'All-Rounder'
                          : r.charAt(0) + r.slice(1).toLowerCase()}
                      </button>
                    ))}
                  </div>

                  {/* Scrollable Player List */}
                  <div className="max-h-[300px] overflow-y-auto space-y-2 pr-1 custom-scrollbar">
                    {filteredPlayers.length === 0 ? (
                      <div className="text-center py-8 text-xs opacity-50">
                        No players found matching "{searchQuery}"
                      </div>
                    ) : (
                      filteredPlayers.map((p) => (
                        <div
                          key={p.id}
                          className="p-2.5 rounded-xl theme-subtle-box border theme-border flex items-center justify-between hover:scale-[1.01] transition-transform"
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <DoodleFlag country={p.nationality} className="w-7 h-5 shrink-0" />
                            <div className="min-w-0">
                              <div className="font-extrabold text-xs truncate">
                                {p.canonicalName}
                              </div>
                              <div className="text-[10px] opacity-60 flex items-center gap-1.5 font-medium">
                                <span>{p.primaryRole.replace('_', ' ')}</span>
                                <span>•</span>
                                <span>{p.nationality}</span>
                                {p.stats?.strikeRate ? (
                                  <>
                                    <span>•</span>
                                    <span className="theme-accent-text font-bold">SR {p.stats.strikeRate}</span>
                                  </>
                                ) : null}
                              </div>
                            </div>
                          </div>

                          <div className="text-right shrink-0">
                            <div className="text-xs font-mono font-black theme-accent-text">
                              {formatRupees(p.defaultBasePrice)}
                            </div>
                            <span className="text-[9px] font-mono opacity-50 block uppercase">
                              Base Price
                            </span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}

              {/* TAB CONTENT 2: 29 BROADCAST SETS */}
              {scoutTab === 'sets' && (
                <div className="max-h-[360px] overflow-y-auto space-y-2 pr-1 custom-scrollbar">
                  {CURATED_SETS.slice(0, 10).map((s, idx) => (
                    <div
                      key={s.setId}
                      className="p-3 rounded-xl theme-subtle-box border theme-border space-y-1.5"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black theme-accent-text">
                          {s.setName}
                        </span>
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full theme-accent-badge">
                          {s.players.length} Players
                        </span>
                      </div>
                      <div className="text-[11px] opacity-75 font-medium truncate">
                        {s.players.slice(0, 4).map((pl) => pl.canonicalName).join(' • ')}...
                      </div>
                    </div>
                  ))}
                  <div className="text-center pt-2 text-xs opacity-60 font-medium">
                    Showing top 10 of 29 sets • 300 total curated players
                  </div>
                </div>
              )}

              {/* TAB CONTENT 3: 10 FRANCHISE TABLES */}
              {scoutTab === 'franchises' && (
                <div className="max-h-[360px] overflow-y-auto space-y-2 pr-1 custom-scrollbar">
                  {IPL_FRANCHISES.map((team) => (
                    <div
                      key={team.id}
                      className="p-2.5 rounded-xl theme-subtle-box border theme-border flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2.5">
                        <FranchiseLogo franchiseId={team.id} size="sm" />
                        <div>
                          <div className="font-extrabold text-xs">{team.name}</div>
                          <div className="text-[10px] opacity-60 font-medium">
                            {team.city} • {team.titles > 0 ? `${team.titles}x Champion` : 'Contender'}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-mono font-black">₹120 Cr</span>
                        <span className="text-[9px] opacity-50 block">Purse</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

            </div>

            {/* Quick Metrics Bar (Pill Capsules) */}
            <div className="grid grid-cols-3 gap-2.5">
              <div className="theme-card p-3 rounded-2xl border theme-border text-center">
                <div className="text-xl font-black font-mono theme-accent-text">622</div>
                <div className="text-[10px] font-bold opacity-60 uppercase tracking-wider">
                  BCCI Roster
                </div>
              </div>
              <div className="theme-card p-3 rounded-2xl border theme-border text-center">
                <div className="text-xl font-black font-mono text-emerald-500">29</div>
                <div className="text-[10px] font-bold opacity-60 uppercase tracking-wider">
                  Official Sets
                </div>
              </div>
              <div className="theme-card p-3 rounded-2xl border theme-border text-center">
                <div className="text-xl font-black font-mono">₹120–250 Cr</div>
                <div className="text-[10px] font-bold opacity-60 uppercase tracking-wider">
                  Custom Purses
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          HAND-DRAWN DOODLE CRICKET WAR ROOM & PASTEL STUDIO SECTION
          ======================================================== */}
      <DoodleSection />

      {/* ========================================================
          FRANCHISE WAR ROOM TABLE (10 REPLICATED TEAMS)
          ======================================================== */}
      <section className="mb-14 sm:mb-20">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold theme-accent-text uppercase tracking-widest mb-1">
              <Trophy className="w-3.5 h-3.5" />
              <span>Official 10 Franchises</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
              Claim Your Franchise War Room Table
            </h2>
          </div>
          <p className="text-xs opacity-70 max-w-sm font-medium">
            Authentic franchise emblems, starting purse tables, and championship pedigree.
          </p>
        </div>

        {/* 10 FRANCHISE PODIUM CARDS */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {IPL_FRANCHISES.map((team) => {
            const isHovered = hoveredTeam === team.id;
            return (
              <div
                key={team.id}
                onClick={() => setSelectedFranchiseForRoster(team.id)}
                onMouseEnter={() => setHoveredTeam(team.id)}
                onMouseLeave={() => setHoveredTeam(null)}
                className={`p-3.5 rounded-2xl border border-[#FED7AA] bg-white transition-all duration-200 cursor-pointer relative overflow-hidden group shadow-xs ${
                  isHovered ? 'scale-105 shadow-xl border-orange-500 ring-2 ring-orange-400/40 z-10' : 'hover:scale-[1.02]'
                }`}
                title={`Click to view ${team.name} 2026 Squad Roster`}
              >
                {/* Top: Emblem & Code */}
                <div className="flex items-center justify-between mb-2.5">
                  <div className="w-12 h-12 rounded-xl p-1 flex items-center justify-center shadow-xs bg-orange-50/50 border border-[#FED7AA] transition-transform group-hover:scale-110">
                    <FranchiseLogo franchiseId={team.id} size="lg" />
                  </div>
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-md bg-orange-100 text-orange-950 border border-orange-200">
                    {team.shortName}
                  </span>
                </div>

                {/* Team Info */}
                <div className="space-y-0.5">
                  <div className="text-xs sm:text-sm font-extrabold truncate text-[#1E1B18]">
                    {team.name}
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-[#786C64]">
                    <span>{team.city}</span>
                    <span className="font-bold text-[10px] text-orange-700">
                      {team.titles > 0 ? `${team.titles}x Champion` : 'Contender'}
                    </span>
                  </div>
                </div>

                {/* 2026 Roster Trigger & Purse */}
                <div className="mt-2.5 pt-2 border-t border-[#FED7AA] flex items-center justify-between text-xs">
                  <span className="text-orange-700 font-bold group-hover:underline text-[11px] flex items-center gap-0.5">
                    2026 Squad →
                  </span>
                  <span className="text-[10px] font-mono font-bold text-[#786C64]">
                    ₹120 Cr
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* 2026 FRANCHISE ROSTER MODAL */}
        <FranchiseRosterModal
          franchiseId={selectedFranchiseForRoster}
          onClose={() => setSelectedFranchiseForRoster(null)}
        />
      </section>

      {/* ========================================================
          BUILT FOR SERIOUS CRICKET COMPETITION (DYNAMIC BUBBLE ZOOM)
          ======================================================== */}
      <section className="mb-14 sm:mb-20">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold theme-accent-text uppercase tracking-widest mb-1">
            <Sliders className="w-3.5 h-3.5" />
            <span>Interactive War Room Engine</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
            Built for Serious Cricket Competition
          </h2>
          <p className="mt-1 text-xs opacity-70">
            Hover over any step below to zoom into its tactical mechanics.
          </p>
        </div>

        {/* 3 INTERACTIVE EXPANDING BUBBLE CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 items-stretch">
          
          {/* STEP 01 */}
          <div
            onMouseEnter={() => setHoveredStep(1)}
            className={`p-6 sm:p-7 rounded-[2.5rem] border theme-border transition-all duration-300 cursor-pointer flex flex-col justify-between ${
              hoveredStep === 1
                ? 'theme-card scale-[1.05] sm:scale-[1.08] shadow-2xl ring-2 ring-[var(--theme-accent)] z-20'
                : 'theme-subtle-box opacity-75 hover:opacity-100 hover:scale-[1.02]'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${
                  hoveredStep === 1 ? 'theme-btn-primary shadow-lg scale-110' : 'theme-accent-badge'
                }`}>
                  <Sliders className="w-6 h-6" />
                </div>
                <span className="text-xs font-mono font-black tracking-widest px-2.5 py-1 rounded-full theme-accent-badge">
                  STEP 01
                </span>
              </div>

              <h3 className="text-lg font-black mb-2">
                5-Year Curated Sets
              </h3>

              {/* Punchy, Short Copy */}
              <div className="space-y-2 text-xs opacity-85">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full theme-btn-primary" />
                  <span className="font-bold">150, 200, or 300 player presets</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full theme-btn-primary" />
                  <span>29 official broadcast sets (Marquee to Uncapped)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full theme-btn-primary" />
                  <span>Aligned perfectly with 4 to 10 teams</span>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t theme-border flex items-center justify-between text-[11px] font-bold theme-accent-text">
              <span>Preset Roster Math</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>

          {/* STEP 02 */}
          <div
            onMouseEnter={() => setHoveredStep(2)}
            className={`p-6 sm:p-7 rounded-[2.5rem] border theme-border transition-all duration-300 cursor-pointer flex flex-col justify-between ${
              hoveredStep === 2
                ? 'theme-card scale-[1.05] sm:scale-[1.08] shadow-2xl ring-2 ring-[var(--theme-accent)] z-20'
                : 'theme-subtle-box opacity-75 hover:opacity-100 hover:scale-[1.02]'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${
                  hoveredStep === 2 ? 'theme-btn-primary shadow-lg scale-110' : 'theme-accent-badge'
                }`}>
                  <Gavel className="w-6 h-6" />
                </div>
                <span className="text-xs font-mono font-black tracking-widest px-2.5 py-1 rounded-full theme-accent-badge">
                  STEP 02
                </span>
              </div>

              <h3 className="text-lg font-black mb-2">
                Official Bidding Paddle
              </h3>

              {/* Punchy, Short Copy */}
              <div className="space-y-2 text-xs opacity-85">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full theme-btn-primary" />
                  <span className="font-bold">Authentic bidding paddle & raises</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full theme-btn-primary" />
                  <span>Direct numerical Jump Bids (e.g. ₹10 Cr)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full theme-btn-primary" />
                  <span>Strict anti-self-bidding server locks</span>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t theme-border flex items-center justify-between text-[11px] font-bold theme-accent-text">
              <span>BCCI Bidding Rules</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>

          {/* STEP 03 */}
          <div
            onMouseEnter={() => setHoveredStep(3)}
            className={`p-6 sm:p-7 rounded-[2.5rem] border theme-border transition-all duration-300 cursor-pointer flex flex-col justify-between ${
              hoveredStep === 3
                ? 'theme-card scale-[1.05] sm:scale-[1.08] shadow-2xl ring-2 ring-[var(--theme-accent)] z-20'
                : 'theme-subtle-box opacity-75 hover:opacity-100 hover:scale-[1.02]'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${
                  hoveredStep === 3 ? 'theme-btn-primary shadow-lg scale-110' : 'theme-accent-badge'
                }`}>
                  <BarChart3 className="w-6 h-6" />
                </div>
                <span className="text-xs font-mono font-black tracking-widest px-2.5 py-1 rounded-full theme-accent-badge">
                  STEP 03
                </span>
              </div>

              <h3 className="text-lg font-black mb-2">
                Live Gavel & Dossier
              </h3>

              {/* Punchy, Short Copy */}
              <div className="space-y-2 text-xs opacity-85">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full theme-btn-primary" />
                  <span className="font-bold">Automated hammer strikes & anti-snipe</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full theme-btn-primary" />
                  <span>8-Overseas limit & purse validation</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full theme-btn-primary" />
                  <span>Shareable post-auction team report URL</span>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t theme-border flex items-center justify-between text-[11px] font-bold theme-accent-text">
              <span>Squad Analytics</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================
          TACTICAL SPECS (SHORT PUNCHY BADGES & INVARIANTS)
          ======================================================== */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-2xl theme-subtle-box border theme-border space-y-1">
          <div className="w-7 h-7 rounded-lg theme-accent-badge flex items-center justify-center mb-1">
            <ShieldCheck className="w-3.5 h-3.5 theme-accent-text" />
          </div>
          <h4 className="text-xs font-black">Server Authority</h4>
          <p className="text-[10px] opacity-60">Zero desync or race condition double-sales.</p>
        </div>

        <div className="p-3.5 rounded-2xl theme-subtle-box border theme-border space-y-1">
          <div className="w-7 h-7 rounded-lg theme-accent-badge flex items-center justify-center mb-1">
            <Users className="w-3.5 h-3.5 theme-accent-text" />
          </div>
          <h4 className="text-xs font-black">622 BCCI Database</h4>
          <p className="text-[10px] opacity-60">Verified registration list & career statistics.</p>
        </div>

        <div className="p-3.5 rounded-2xl theme-subtle-box border theme-border space-y-1">
          <div className="w-7 h-7 rounded-lg theme-accent-badge flex items-center justify-center mb-1">
            <Coins className="w-3.5 h-3.5 theme-accent-text" />
          </div>
          <h4 className="text-xs font-black">₹120–250 Cr Purses</h4>
          <p className="text-[10px] opacity-60">Automatic 18-min squad and 8-overseas locks.</p>
        </div>

        <div className="p-3.5 rounded-2xl theme-subtle-box border theme-border space-y-1">
          <div className="w-7 h-7 rounded-lg theme-accent-badge flex items-center justify-center mb-1">
            <BarChart3 className="w-3.5 h-3.5 theme-accent-text" />
          </div>
          <h4 className="text-xs font-black">Permanent Dossiers</h4>
          <p className="text-[10px] opacity-60">Instant shareable championship team grades.</p>
        </div>
      </section>

    </div>
  );
}
