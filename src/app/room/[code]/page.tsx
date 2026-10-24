'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { IPL_FRANCHISES, FRANCHISE_MAP } from '@/data/franchises';
import FranchiseLogo from '@/components/FranchiseLogo';
import { CRORE, formatRupees } from '@/lib/currency';
import { AuctionRoomState, AuctionPlayerItem } from '@/lib/types';
import OrganizerPoolModal from './OrganizerPoolModal';
import {
  Gavel,
  Clock,
  Coins,
  Users,
  ShieldCheck,
  Zap,
  BarChart3,
  ArrowRight,
  Sparkles,
  Trophy,
  Sliders,
  CheckCircle2,
  Flame,
  Radio,
  Share2,
  Copy,
  Check,
  Play,
  Pause,
  SkipForward,
  Settings,
  RefreshCw,
  LogOut,
  RotateCcw,
} from 'lucide-react';

export default function RoomPage({ params }: { params: { code: string } }) {
  const router = useRouter();
  const roomCode = (params.code as string)?.toUpperCase();

  const [room, setRoom] = useState<AuctionRoomState | null>(null);
  const [sessionToken, setSessionToken] = useState<string>('');
  const [displayName, setDisplayName] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [bidError, setBidError] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [customBidAmountCr, setCustomBidAmountCr] = useState<string>('');
  const [isPoolModalOpen, setIsPoolModalOpen] = useState(false);
  const [isSkipping, setIsSkipping] = useState(false);

  // Join modal state
  const [isJoiningUser, setIsJoiningUser] = useState(false);
  const [joinModalError, setJoinModalError] = useState('');

  // Clock offset & countdown
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [serverOffset, setServerOffset] = useState<number>(0);
  const confettiTriggered = useRef(false);

  // Poll interval & room synchronization
  useEffect(() => {
    if (!roomCode || roomCode === 'UNDEFINED') return;

    // Load local identity
    const savedToken = localStorage.getItem(`auction_token_${roomCode}`) || '';
    const savedName = localStorage.getItem(`auction_name_${roomCode}`) || '';
    setSessionToken(savedToken);
    setDisplayName(savedName);

    let isMounted = true;
    let failCount = 0;

    async function syncRoom() {
      try {
        const res = await fetch(`/api/auction/${roomCode}`);
        const data = await res.json();
        if (!res.ok) {
          // If room was just created, allow 3 retries before showing error
          if (!room && failCount < 3) {
            failCount++;
            return;
          }
          throw new Error(data.error || 'Failed to fetch room');
        }

        if (isMounted) {
          failCount = 0;
          const now = Date.now();
          const serverTime = data.room.serverTime || now;
          setServerOffset(serverTime - now);
          setRoom(data.room);
          setError('');

          // Auto-join if user has no session token in this room yet
          if (!savedToken && savedName) {
            joinUser(savedName);
          }
        }
      } catch (err: any) {
        if (isMounted) {
          // Only show error screen if room has never loaded
          if (!room) {
            setError(err.message || 'Error connecting to room');
          }
        }
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    syncRoom();
    // 1-second authoritative polling
    const interval = setInterval(syncRoom, 1000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [roomCode]);

  // Robust clipboard copy with fallback
  const copyToClipboard = async (text: string): Promise<boolean> => {
    if (typeof navigator !== 'undefined' && navigator.clipboard && navigator.clipboard.writeText) {
      try {
        await navigator.clipboard.writeText(text);
        return true;
      } catch (e) {
        // Fallback below
      }
    }
    try {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      const success = document.execCommand('copy');
      document.body.removeChild(textarea);
      return success;
    } catch (e) {
      return false;
    }
  };

  const handleCopyInvite = async () => {
    const url = typeof window !== 'undefined' ? window.location.href : '';
    const ok = await copyToClipboard(url);
    if (ok) {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const handleCopyCode = async () => {
    const ok = await copyToClipboard(roomCode);
    if (ok) {
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2500);
    }
  };

  const handleShareWhatsApp = () => {
    const url = typeof window !== 'undefined' ? window.location.href : '';
    const text = encodeURIComponent(
      `🏏 Join my IPL Auction Arena!\nRoom Code: ${roomCode}\nTap link to pick your franchise & bid live: ${url}`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  // Local authoritative timer countdown loop
  useEffect(() => {
    if (!room || room.status !== 'ACTIVE' || !room.timerDeadlineAt) {
      setTimeLeft(null);
      return;
    }

    const updateTimer = () => {
      const estimatedServerNow = Date.now() + serverOffset;
      const msLeft = (room.timerDeadlineAt as number) - estimatedServerNow;
      const seconds = Math.max(0, Math.ceil(msLeft / 1000));
      setTimeLeft(seconds);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 250);

    return () => clearInterval(interval);
  }, [room?.status, room?.timerDeadlineAt, serverOffset]);

  // Trigger celebration effects on player sale
  useEffect(() => {
    if (!room || !room.events || room.events.length === 0) return;
    const latest = room.events[0];
    if (latest && latest.eventType === 'PLAYER_SOLD') {
      if (!confettiTriggered.current) {
        confettiTriggered.current = true;
        setTimeout(() => {
          confettiTriggered.current = false;
        }, 4000);
      }
    }
  }, [room?.events]);

  // Join Room User
  const joinUser = async (name: string) => {
    setIsJoiningUser(true);
    setJoinModalError('');
    try {
      const res = await fetch('/api/auction/join', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          roomCode,
          displayName: name,
          sessionToken,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to join');

      setSessionToken(data.sessionToken);
      setDisplayName(data.participant.displayName);
      localStorage.setItem(`auction_token_${roomCode}`, data.sessionToken);
      localStorage.setItem(`auction_name_${roomCode}`, data.participant.displayName);
      setRoom(data.room);
    } catch (err: any) {
      setJoinModalError(err.message || 'Error joining room');
    } finally {
      setIsJoiningUser(false);
    }
  };

  // Franchise Selection / Table Takeover
  const handleSelectFranchise = async (franchiseId: string | null) => {
    try {
      const res = await fetch('/api/auction/select-franchise', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          roomCode,
          sessionToken,
          franchiseId,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Could not select franchise');
      setRoom(data.room);
      setBidError('');
    } catch (err: any) {
      alert(err.message || 'Error selecting franchise');
    }
  };

  // Host Action: Start Auction
  const handleStartAuction = async () => {
    try {
      const res = await fetch('/api/auction/start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ roomCode, sessionToken }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to start');
      setRoom(data.room);
    } catch (err: any) {
      alert(err.message || 'Error starting auction');
    }
  };

  // Bid Action: Paddle Raise & Jump Bids
  const handlePlaceBid = async (amount: number) => {
    if (!userFranchiseId) {
      setBidError('Please select a franchise first to place bids.');
      return;
    }

    setBidError('');
    const commandId = `cmd_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

    try {
      const res = await fetch('/api/auction/bid', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          roomCode,
          sessionToken,
          franchiseId: userFranchiseId,
          amount,
          commandId,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Bid rejected');
      setRoom(data.room);
      setCustomBidAmountCr('');
    } catch (err: any) {
      setBidError(err.message || 'Bid rejected');
    }
  };

  const handleCustomBid = (e: React.FormEvent) => {
    e.preventDefault();
    if (isHoldingHighBid) {
      setBidError('Your franchise already holds the current highest bid.');
      return;
    }
    const cr = parseFloat(customBidAmountCr);
    if (isNaN(cr) || cr <= 0) {
      setBidError('Please enter a valid bid amount in Crores (e.g. 10 or 10.5).');
      return;
    }
    const targetAmount = Math.round(cr * CRORE);
    if (targetAmount < minNextBid) {
      setBidError(
        `Jump bid must be at least ${formatRupees(minNextBid)} (the required minimum next bid).`
      );
      return;
    }
    if (targetAmount > remainingPurse) {
      setBidError(
        `Jump bid of ${formatRupees(targetAmount)} exceeds your remaining purse of ${formatRupees(remainingPurse)}.`
      );
      return;
    }
    handlePlaceBid(targetAmount);
  };

  const handleSkip = async () => {
    if (isSkipping || !currentPlayerItem) return;
    setIsSkipping(true);
    try {
      const res = await fetch('/api/auction/skip', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          roomCode,
          sessionToken,
          targetAuctionPlayerId: currentPlayerItem.id,
        }),
      });
      const data = await res.json();
      if (res.ok && data.room) setRoom(data.room);
    } catch (e) {
    } finally {
      setIsSkipping(false);
    }
  };

  const handleTogglePause = async () => {
    try {
      const res = await fetch('/api/auction/pause', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ roomCode, sessionToken }),
      });
      const data = await res.json();
      if (res.ok && data.room) setRoom(data.room);
    } catch (e) {}
  };

  const handleFinishAuction = async () => {
    if (!confirm('Are you sure you want to conclude the auction and generate reports?')) return;
    try {
      const res = await fetch('/api/auction/finish', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ roomCode, sessionToken }),
      });
      const data = await res.json();
      if (res.ok && data.room) {
        setRoom(data.room);
        if (data.reportSlug) {
          router.push(`/reports/${data.reportSlug}`);
        }
      }
    } catch (e) {}
  };

  const renderJoinModal = () => {
    if (sessionToken) return null;
    return (
      <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
        <div className="max-w-md w-full theme-card p-6 sm:p-8 rounded-3xl border theme-border shadow-2xl text-center animate-fade-in">
          <div className="w-14 h-14 rounded-2xl theme-accent-badge flex items-center justify-center text-3xl mx-auto mb-4 shadow-lg">
            🏏
          </div>
          <h2 className="text-xl font-black mb-1">Join IPL Auction War Room</h2>
          <p className="text-xs font-mono tracking-wider font-black mb-4 theme-accent-text">
            ROOM CODE: {roomCode}
          </p>
          <p className="text-xs opacity-75 mb-6">
            Enter your manager name to join the live room, claim your franchise, and compete in the bidding war.
          </p>

          {joinModalError && (
            <div className="mb-4 p-3 text-xs rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-500 font-bold text-left">
              {joinModalError}
            </div>
          )}

          <form
            onSubmit={(e) => {
              e.preventDefault();
              const name = displayName.trim() || 'CricketFan';
              joinUser(name);
            }}
            className="space-y-4"
          >
            <div>
              <label className="block text-left text-xs font-bold mb-1.5 opacity-90">
                Your Manager Name
              </label>
              <input
                type="text"
                required
                autoFocus
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="e.g. CaptainCool99"
                className="w-full theme-subtle-box border theme-border rounded-xl px-4 py-3 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[var(--theme-accent)] transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={isJoiningUser}
              className="w-full py-3.5 rounded-xl font-black theme-btn-primary shadow-xl text-xs tracking-wider transition-all disabled:opacity-50 cursor-pointer"
            >
              {isJoiningUser ? 'JOINING ROOM...' : 'ENTER AUCTION WAR ROOM 🎯'}
            </button>
          </form>
        </div>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center py-24 theme-bg text-[var(--theme-text)]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[var(--theme-accent)] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="font-bold text-sm opacity-80">Entering War Room {roomCode}...</p>
        </div>
      </div>
    );
  }

  if (error || !room) {
    return (
      <div className="flex-1 flex items-center justify-center py-24 px-4 theme-bg text-[var(--theme-text)]">
        <div className="max-w-md w-full theme-card p-8 rounded-3xl text-center border theme-border shadow-2xl">
          <div className="text-3xl mb-3">⚠️</div>
          <h2 className="text-lg font-black mb-2">Room Unavailable</h2>
          <p className="text-xs opacity-75 mb-6">{error || 'Room not found or expired.'}</p>
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => window.location.reload()}
              className="py-2.5 px-5 rounded-xl font-bold theme-btn-primary text-xs tracking-wide shadow-md cursor-pointer"
            >
              🔄 Retry Connection
            </button>
            <Link
              href="/"
              className="py-2.5 px-5 rounded-xl font-bold theme-subtle-box border theme-border text-xs tracking-wide transition-all"
            >
              ← Return Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const isHost = room.hostSessionToken === sessionToken;
  const currentParticipant = room.participants.find((p) => p.sessionToken === sessionToken);
  const userFranchiseId = currentParticipant?.franchiseId || null;
  const userFranchise = userFranchiseId ? FRANCHISE_MAP.get(userFranchiseId) : null;
  const userSquad = userFranchiseId ? room.squads[userFranchiseId] : null;

  const currentPlayerItem: AuctionPlayerItem | undefined = room.queue[room.currentPlayerIndex];
  const currentBid = room.currentBidAmount || 0;
  const isHoldingHighBid = Boolean(
    userFranchiseId && room.currentBidFranchiseId === userFranchiseId
  );

  const minNextBid = currentPlayerItem
    ? currentBid <= 0
      ? currentPlayerItem.basePrice
      : currentBid < 2 * CRORE
      ? currentBid + 1000000 // +10L
      : currentBid + 2500000 // +25L
    : 0;

  const remainingPurse = userSquad ? userSquad.remainingPurse : room.config.startingPurse;

  // -------------------------------------------------------------
  // 1. LOBBY VIEW (PRE-AUCTION SEAT PICKING)
  // -------------------------------------------------------------
  if (room.status === 'LOBBY') {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full theme-bg text-[var(--theme-text)] transition-colors">
        {renderJoinModal()}
        <OrganizerPoolModal
          isOpen={isPoolModalOpen}
          onClose={() => setIsPoolModalOpen(false)}
          room={room}
          sessionToken={sessionToken}
          isHost={isHost}
          onRoomUpdate={(updated) => setRoom(updated)}
        />

        {/* LOBBY HEADER */}
        <div className="theme-card p-6 sm:p-7 rounded-3xl mb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border theme-border shadow-xl">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full theme-accent-badge text-xs font-bold mb-2.5">
              <span>WAR ROOM LOBBY</span>
              <span className="w-2 h-2 rounded-full theme-btn-primary animate-ping" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              Room Code:{' '}
              <span className="font-mono theme-accent-text tracking-wider ml-1">{room.roomCode}</span>
            </h1>
            <p className="text-xs opacity-75 mt-1 font-medium">
              Select your franchise table. The host will launch bidding once managers are seated.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={handleCopyCode}
              className="py-2.5 px-3.5 rounded-xl border theme-border theme-subtle-box hover:opacity-100 text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
            >
              <span>{copiedCode ? '✅ Code Copied!' : '📋 Copy Code'}</span>
            </button>

            <button
              onClick={handleCopyInvite}
              className="py-2.5 px-4 rounded-xl border theme-border theme-subtle-box hover:opacity-100 text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
            >
              <span>{copiedLink ? '✅ Link Copied!' : '🔗 Copy Invite Link'}</span>
            </button>

            <button
              onClick={handleShareWhatsApp}
              className="py-2.5 px-3.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 hover:bg-emerald-500/25 text-emerald-500 text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
              title="Share on WhatsApp"
            >
              <span>💬 WhatsApp</span>
            </button>

            {isHost && (
              <>
                <button
                  onClick={() => setIsPoolModalOpen(true)}
                  className="py-2.5 px-4 rounded-xl font-bold theme-accent-badge text-xs tracking-wide transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <span>⚙️ Auction Pool ({room.queue?.length || 0})</span>
                </button>
                <button
                  onClick={handleStartAuction}
                  className="py-2.5 px-6 rounded-xl font-black theme-btn-primary shadow-xl text-xs tracking-wide transition-all ml-1 cursor-pointer"
                >
                  START AUCTION 🔨
                </button>
              </>
            )}
          </div>
        </div>

        {/* INVITE FRIENDS HERO BANNER */}
        <div className="mb-8 p-4 sm:p-5 rounded-2xl theme-subtle-box border theme-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-md">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl theme-accent-badge flex items-center justify-center text-2xl shrink-0">
              👥
            </div>
            <div>
              <div className="text-sm font-black flex items-center gap-2">
                <span>Assemble Your Rival Franchise Managers</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full theme-accent-badge font-extrabold uppercase">
                  Multiplayer
                </span>
              </div>
              <p className="text-xs opacity-70 mt-0.5 font-medium">
                Share room code <span className="font-mono font-bold theme-accent-text">{room.roomCode}</span> so friends can join and take table seats for CSK, MI, RCB and more!
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={handleCopyCode}
              className="flex-1 sm:flex-none py-2 px-3 rounded-xl border theme-border theme-card text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>{copiedCode ? '✅ Copied' : `📋 ${room.roomCode}`}</span>
            </button>
            <button
              onClick={handleCopyInvite}
              className="flex-1 sm:flex-none py-2 px-3.5 rounded-xl border theme-border theme-accent-badge text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>{copiedLink ? '✅ Link Copied' : '🔗 Copy Link'}</span>
            </button>
            <button
              onClick={handleShareWhatsApp}
              className="py-2 px-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 hover:bg-emerald-500/25 text-emerald-500 text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>💬 Share</span>
            </button>
          </div>
        </div>

        {/* ACTIVE FRANCHISE SEAT BANNER (EASY 1-CLICK SWITCHING) */}
        {userFranchise && (
          <div className="mb-6 p-4 sm:p-5 rounded-2xl theme-subtle-box border border-[var(--theme-accent)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-lg animate-fade-in">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl p-1 flex items-center justify-center shadow-xs bg-white border theme-border shrink-0">
                <FranchiseLogo franchiseId={userFranchise.id} size="lg" />
              </div>
              <div>
                <span className="text-[11px] font-bold opacity-60 uppercase tracking-wider block">
                  Your Active Franchise Table
                </span>
                <span className="text-base sm:text-lg font-black theme-accent-text flex items-center gap-2">
                  <span>{userFranchise.name}</span>
                  <span className="text-xs font-mono px-2 py-0.5 rounded-md theme-card border theme-border font-bold">
                    {formatRupees(room.config.startingPurse)} Purse
                  </span>
                </span>
              </div>
            </div>

            <button
              onClick={() => handleSelectFranchise(null)}
              className="w-full sm:w-auto py-2.5 px-5 rounded-xl border border-rose-500/40 bg-rose-500/15 hover:bg-rose-500/25 text-rose-500 text-xs font-black transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>SWITCH / VACATE TABLE SEAT</span>
            </button>
          </div>
        )}

        {/* FRANCHISE SELECTION GRID */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-black flex items-center gap-2">
              <span>Franchise Table Seats</span>
              <span className="text-xs font-medium opacity-65">
                ({room.participants.filter((p) => p.franchiseId).length}/10 Seated)
              </span>
            </h2>
            <div className="text-xs opacity-75 font-medium">
              Each franchise allocated {formatRupees(room.config.startingPurse)}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
            {IPL_FRANCHISES.map((franchise) => {
              const owner = room.participants.find((p) => p.franchiseId === franchise.id);
              const isUserOwned = userFranchiseId === franchise.id;

              return (
                <div
                  key={franchise.id}
                  className={`theme-card p-4 rounded-2xl border transition-all flex flex-col justify-between ${
                    isUserOwned
                      ? 'border-[var(--theme-accent)] ring-2 ring-[var(--theme-accent)] shadow-xl'
                      : owner
                      ? 'theme-border opacity-85'
                      : 'theme-border hover:border-[var(--theme-accent)]/50 hover:scale-[1.02]'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-12 h-11 rounded-xl p-0.5 flex items-center justify-center shadow-xs bg-white border theme-border">
                        <FranchiseLogo franchiseId={franchise.id} size="lg" />
                      </div>
                      <span className="text-xs font-black font-mono tracking-wider px-2 py-0.5 rounded-md theme-subtle-box border theme-border">
                        {franchise.shortName}
                      </span>
                    </div>

                    <h3 className="text-sm font-black mb-1 truncate">{franchise.name}</h3>
                    <p className="text-[11px] opacity-70 mb-4 font-medium">
                      {franchise.titles} {franchise.titles === 1 ? 'Championship' : 'Championships'}
                    </p>
                  </div>

                  <div>
                    {owner ? (
                      <div className="p-2.5 rounded-xl theme-subtle-box border theme-border text-center">
                        <span className="text-[10px] opacity-60 uppercase tracking-wider block font-bold">
                          {isUserOwned ? 'You Control This Table' : 'Managed By'}
                        </span>
                        <span className="text-xs font-black theme-accent-text truncate block mt-0.5">
                          {owner.displayName} {isUserOwned && '(You)'}
                        </span>
                        {isUserOwned && (
                          <div className="mt-2.5 pt-2 border-t theme-border space-y-1">
                            <button
                              onClick={() => handleSelectFranchise(null)}
                              className="w-full py-2 px-3 rounded-lg border border-rose-500/40 bg-rose-500/15 hover:bg-rose-500/25 text-rose-500 font-black text-xs transition-all flex items-center justify-center gap-1 cursor-pointer"
                            >
                              <span>VACATE TABLE SEAT ⇄</span>
                            </button>
                            <span className="text-[9px] opacity-65 block text-center font-medium leading-tight">
                              Release to pick another franchise
                            </span>
                          </div>
                        )}
                      </div>
                    ) : (
                      <button
                        onClick={() => handleSelectFranchise(franchise.id)}
                        className="w-full py-2.5 px-3 rounded-xl text-xs font-black theme-btn-primary shadow hover:opacity-95 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-1.5"
                      >
                        <span>SELECT TABLE SEAT 🏏</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* CONNECTED PARTICIPANTS & SETTINGS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="theme-card p-6 rounded-3xl border theme-border shadow-md">
            <h3 className="text-sm font-black mb-3.5 flex items-center gap-2">
              <span>Connected Managers</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full theme-accent-badge font-mono">
                {room.participants.length} Active
              </span>
            </h3>

            <div className="space-y-2">
              {room.participants.map((p) => {
                const team = p.franchiseId ? FRANCHISE_MAP.get(p.franchiseId) : null;
                const isMe = p.sessionToken === sessionToken;

                return (
                  <div
                    key={p.id}
                    className="p-3 rounded-xl theme-subtle-box border theme-border flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      <span className="font-bold">
                        {p.displayName} {isMe && '(You)'}
                      </span>
                      {p.role === 'HOST' && (
                        <span className="px-2 py-0.5 rounded-md theme-accent-badge font-black text-[9px]">
                          AUCTIONEER
                        </span>
                      )}
                    </div>

                    <div>
                      {team ? (
                        <span className="font-bold flex items-center gap-1.5">
                          <FranchiseLogo franchiseId={team.id} size="xs" />
                          <span>{team.name}</span>
                        </span>
                      ) : (
                        <span className="opacity-50 italic">Choosing Table...</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="theme-card p-6 rounded-3xl border theme-border shadow-md">
            <h3 className="text-sm font-black mb-3.5">War Room Parameters</h3>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-xl theme-subtle-box border theme-border">
                <span className="opacity-60 block text-[10px] uppercase font-bold">Starting Purse</span>
                <span className="theme-accent-text font-black text-sm">{formatRupees(room.config.startingPurse)}</span>
              </div>
              <div className="p-3.5 rounded-xl theme-subtle-box border theme-border">
                <span className="opacity-60 block text-[10px] uppercase font-bold">Bid Clock</span>
                <span className="font-black text-sm">{room.config.bidTimerSeconds} Seconds</span>
              </div>
              <div className="p-3.5 rounded-xl theme-subtle-box border theme-border">
                <span className="opacity-60 block text-[10px] uppercase font-bold">Auction Pool</span>
                <span className="font-black text-sm">{room.queue ? room.queue.length : 300} Players</span>
              </div>
              <div className="p-3.5 rounded-xl theme-subtle-box border theme-border">
                <span className="opacity-60 block text-[10px] uppercase font-bold">Overseas Quota</span>
                <span className="font-black text-sm">Max {room.config.maxOverseas} Players</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // 2. COMPLETED AUCTION VIEW
  // -------------------------------------------------------------
  if (room.status === 'COMPLETED') {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center theme-bg text-[var(--theme-text)] min-h-screen">
        <div className="theme-card p-8 sm:p-12 rounded-3xl border theme-border shadow-2xl mb-8">
          <div className="text-5xl mb-4">🏆</div>
          <h1 className="text-3xl sm:text-5xl font-black mb-3">
            AUCTION CONCLUDED!
          </h1>
          <p className="opacity-75 max-w-lg mx-auto text-sm sm:text-base mb-8">
            All players have been processed. Squad rosters, financial books, and analytical franchise evaluations have been permanently preserved.
          </p>

          {room.reportSlug && (
            <Link
              href={`/reports/${room.reportSlug}`}
              className="inline-flex items-center gap-2 py-4 px-8 rounded-2xl font-black theme-btn-primary shadow-xl hover:scale-105 transition-all text-sm tracking-wide"
            >
              <span>VIEW PERMANENT INTELLIGENCE REPORT →</span>
            </Link>
          )}
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // 3. LIVE AUCTION ROOM VIEW (ACTIVE or PAUSED)
  // -------------------------------------------------------------
  const leadingFranchise = room.currentBidFranchiseId
    ? FRANCHISE_MAP.get(room.currentBidFranchiseId)
    : null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full flex-1 flex flex-col justify-between theme-bg text-[var(--theme-text)] transition-colors">
      {renderJoinModal()}
      <OrganizerPoolModal
        isOpen={isPoolModalOpen}
        onClose={() => setIsPoolModalOpen(false)}
        room={room}
        sessionToken={sessionToken}
        isHost={isHost}
        onRoomUpdate={(updated) => setRoom(updated)}
      />

      {/* HEADER / STATUS BAR */}
      <div className="theme-card p-4 rounded-2xl mb-6 flex flex-wrap items-center justify-between gap-4 border theme-border shadow-md">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs font-black px-2.5 py-1 rounded-lg theme-subtle-box border theme-border theme-accent-text">
            ROOM: {room.roomCode}
          </span>

          <button
            onClick={handleCopyInvite}
            className="text-[11px] font-bold px-2.5 py-1 rounded-lg theme-subtle-box border theme-border hover:opacity-100 transition-all flex items-center gap-1 cursor-pointer"
            title="Copy invite link to share with friends"
          >
            <span>{copiedLink ? '✅ Link Copied' : '🔗 Invite'}</span>
          </button>

          <div
            className={`px-3 py-1 rounded-full text-xs font-extrabold flex items-center gap-1.5 ${
              room.status === 'ACTIVE'
                ? 'bg-emerald-500/15 text-emerald-500 border border-emerald-500/30'
                : 'bg-amber-500/15 text-amber-500 border border-amber-500/30'
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full ${
                room.status === 'ACTIVE' ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'
              }`}
            />
            <span>{room.status}</span>
          </div>

          <span className="text-xs opacity-70 font-bold hidden sm:inline">
            Player {room.currentPlayerIndex + 1} of {room.queue.length}
          </span>
        </div>

        {/* TIMER DISPLAY */}
        <div className="flex items-center gap-4">
          <div
            className={`px-4 py-1.5 rounded-xl border font-mono font-black text-lg flex items-center gap-2 ${
              timeLeft !== null && timeLeft <= 5
                ? 'bg-rose-500/20 border-rose-500 text-rose-500 pulse-timer'
                : timeLeft !== null && timeLeft <= 10
                ? 'bg-amber-500/20 border-amber-500 text-amber-500'
                : 'theme-subtle-box border theme-border'
            }`}
          >
            <span className="text-xs font-sans opacity-60 uppercase font-bold">CLOCK</span>
            <span>{timeLeft !== null ? `${timeLeft}s` : '--'}</span>
          </div>

          {/* HOST CONTROLS */}
          {isHost && (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsPoolModalOpen(true)}
                className="py-1.5 px-3 rounded-lg text-xs font-bold border theme-border theme-accent-badge flex items-center gap-1.5 cursor-pointer"
                title="Manage Auction Pool & Queue"
              >
                <span>⚙️ Pool ({room.queue?.length || 0})</span>
              </button>
              <button
                onClick={handleTogglePause}
                className="py-1.5 px-3 rounded-lg text-xs font-bold border theme-border theme-subtle-box cursor-pointer"
              >
                {room.status === 'PAUSED' ? '▶ Resume' : '⏸ Pause'}
              </button>
              <button
                onClick={handleSkip}
                disabled={isSkipping}
                className="py-1.5 px-3 rounded-lg text-xs font-bold border theme-border theme-subtle-box disabled:opacity-50 cursor-pointer"
                title="Skip to next player"
              >
                {isSkipping ? 'Skipping...' : 'Skip Player ⏭'}
              </button>
              <button
                onClick={handleFinishAuction}
                className="py-1.5 px-2.5 rounded-lg text-[11px] font-bold text-rose-500 hover:bg-rose-500/10 cursor-pointer"
              >
                End Auction
              </button>
            </div>
          )}
        </div>
      </div>

      {/* MAIN ARENA GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT / CENTER: ACTIVE PLAYER & BID CONSOLE (8 COLS) */}
        <div className="lg:col-span-8 space-y-6">
          {currentPlayerItem ? (
            <div className="theme-card p-6 sm:p-8 rounded-3xl border theme-border shadow-xl relative overflow-hidden">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b theme-border">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider theme-accent-badge">
                      {currentPlayerItem.player.primaryRole}
                    </span>
                    {currentPlayerItem.setName && (
                      <span className="px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-purple-500/15 text-purple-400 border border-purple-500/30">
                        🏏 {currentPlayerItem.setName}
                      </span>
                    )}
                    {currentPlayerItem.player.isOverseas && (
                      <span className="px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-blue-500/15 text-blue-400 border border-blue-500/30">
                        ✈️ Overseas ({currentPlayerItem.player.nationality})
                      </span>
                    )}
                    <span className="text-xs opacity-65 font-bold">
                      Age {currentPlayerItem.player.calculatedAge}
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-4xl font-black tracking-tight">
                    {currentPlayerItem.player.canonicalName}
                  </h2>
                  <p className="text-xs opacity-70 mt-1 max-w-xl font-medium">
                    {currentPlayerItem.player.profileSummary}
                  </p>
                </div>

                <div className="text-right sm:text-right shrink-0">
                  <span className="text-[10px] uppercase font-bold opacity-60 tracking-wider block">
                    Base Price
                  </span>
                  <span className="text-lg sm:text-2xl font-black theme-accent-text">
                    {formatRupees(currentPlayerItem.basePrice)}
                  </span>
                </div>
              </div>

              {/* STATS MATRIX */}
              <div className="py-6 border-b theme-border grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 rounded-xl theme-subtle-box border theme-border">
                  <span className="text-[10px] font-bold opacity-60 uppercase block">Matches</span>
                  <span className="text-base font-black">
                    {currentPlayerItem.player.stats.matches}
                  </span>
                  <span className="text-[10px] opacity-60 block">
                    {currentPlayerItem.player.stats.seasonRange}
                  </span>
                </div>

                <div className="p-3 rounded-xl theme-subtle-box border theme-border">
                  <span className="text-[10px] font-bold opacity-60 uppercase block">Runs / Avg</span>
                  <span className="text-base font-black">
                    {currentPlayerItem.player.stats.runs}{' '}
                    <span className="text-xs font-normal opacity-60">
                      ({currentPlayerItem.player.stats.battingAverage || '-'})
                    </span>
                  </span>
                  <span className="text-[10px] opacity-60 block">
                    SR: {currentPlayerItem.player.stats.strikeRate || '-'}
                  </span>
                </div>

                <div className="p-3 rounded-xl theme-subtle-box border theme-border">
                  <span className="text-[10px] font-bold opacity-60 uppercase block">Wickets / Eco</span>
                  <span className="text-base font-black">
                    {currentPlayerItem.player.stats.wickets}{' '}
                    <span className="text-xs font-normal opacity-60">
                      ({currentPlayerItem.player.stats.economyRate || '-'})
                    </span>
                  </span>
                  <span className="text-[10px] opacity-60 block">
                    Best: {currentPlayerItem.player.stats.bestBowling || '-'}
                  </span>
                </div>

                <div className="p-3 rounded-xl theme-subtle-box border theme-border">
                  <span className="text-[10px] font-bold opacity-60 uppercase block">Playing Style</span>
                  <span className="text-xs font-black block truncate">
                    {currentPlayerItem.player.battingStyle}
                  </span>
                  <span className="text-[10px] opacity-60 block truncate">
                    {currentPlayerItem.player.bowlingStyle}
                  </span>
                </div>
              </div>

              {/* LIVE BIDDING ARENA */}
              <div className="pt-6">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-6 rounded-2xl theme-subtle-box border theme-border mb-6">
                  <div>
                    <span className="text-xs uppercase font-black tracking-widest opacity-60 block mb-1">
                      CURRENT HIGHEST BID
                    </span>
                    <div className="text-3xl sm:text-5xl font-black theme-accent-text tracking-tight">
                      {currentBid > 0 ? formatRupees(currentBid) : 'Opening Bid Pending'}
                    </div>
                  </div>

                  <div className="text-center sm:text-right">
                    <span className="text-xs uppercase font-black tracking-widest opacity-60 block mb-1">
                      LEADING FRANCHISE
                    </span>
                    {leadingFranchise ? (
                      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl border theme-border theme-card font-black text-sm shadow-sm">
                        <FranchiseLogo franchiseId={leadingFranchise.id} size="sm" />
                        <span>{leadingFranchise.name}</span>
                      </div>
                    ) : (
                      <span className="text-sm font-semibold opacity-50 italic">No bids placed yet</span>
                    )}
                  </div>
                </div>

                {bidError && (
                  <div className="mb-4 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-500 text-xs font-bold">
                    {bidError}
                  </div>
                )}

                {/* BID CONTROLS */}
                {userFranchise ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-xs font-bold opacity-80">
                      <span>
                        Bidding as:{' '}
                        <strong className="theme-accent-text">
                          {userFranchise.name} ({userFranchise.shortName})
                        </strong>
                      </span>
                      <span>
                        Purse Remaining:{' '}
                        <strong className="text-emerald-500 font-mono">
                          {formatRupees(remainingPurse)}
                        </strong>
                      </span>
                    </div>

                    {/* OFFICIAL IPL PADDLE (SINGLE PRIMARY BID BUTTON) */}
                    <div>
                      {isHoldingHighBid ? (
                        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center animate-fade-in">
                          <div className="text-emerald-500 font-black text-sm sm:text-base flex items-center justify-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                            <span>
                              {userFranchise.shortName} Holds Current Highest Bid ({formatRupees(currentBid)})
                            </span>
                          </div>
                          <p className="text-[11px] opacity-70 mt-1 font-medium">
                            Awaiting rival paddles or auctioneer countdown gavel.
                          </p>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handlePlaceBid(minNextBid)}
                          disabled={minNextBid > remainingPurse || room.status !== 'ACTIVE'}
                          className="w-full py-4.5 px-6 rounded-2xl font-black theme-btn-primary shadow-2xl disabled:opacity-30 disabled:cursor-not-allowed active:scale-[0.99] transition-all flex flex-col items-center justify-center gap-0.5 cursor-pointer"
                        >
                          <div className="flex items-center gap-2 text-base sm:text-lg">
                            <span>🔨</span>
                            <span>
                              {currentBid <= 0 ? 'OPEN BID' : 'RAISE PADDLE'} • {formatRupees(minNextBid)}
                            </span>
                          </div>
                          <span className="text-[11px] font-bold opacity-80">
                            {currentBid <= 0 ? 'Opening Base Price' : 'Raise Next Minimum Increment'}
                          </span>
                        </button>
                      )}
                    </div>

                    {/* CUSTOM JUMP BID / HIGHER AMOUNT BLANK */}
                    <div className="pt-3 border-t theme-border space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-[11px] font-bold flex items-center gap-1.5 opacity-90">
                          <span className="theme-accent-text">⚡</span>
                          <span>Jump Bid to Higher Number</span>
                        </label>
                        <span className="text-[10px] font-mono opacity-60">
                          Min: {(minNextBid / CRORE).toFixed(2)} Cr
                        </span>
                      </div>

                      <form onSubmit={handleCustomBid} className="flex gap-2">
                        <div className="relative flex-1">
                          <span className="absolute left-3.5 top-2.5 text-xs font-bold theme-accent-text">
                            ₹
                          </span>
                          <input
                            type="number"
                            step="0.05"
                            placeholder="e.g. 10.00"
                            value={customBidAmountCr}
                            onChange={(e) => setCustomBidAmountCr(e.target.value)}
                            className="w-full pl-8 pr-12 py-2.5 rounded-xl theme-subtle-box border theme-border text-xs font-bold font-mono focus:outline-none focus:ring-1 focus:ring-[var(--theme-accent)] transition-colors"
                          />
                          <span className="absolute right-3.5 top-2.5 text-xs font-bold opacity-50">
                            Cr
                          </span>
                        </div>
                        <button
                          type="submit"
                          disabled={room.status !== 'ACTIVE' || !customBidAmountCr || isHoldingHighBid}
                          className="py-2.5 px-5 rounded-xl font-black theme-card border theme-border theme-accent-text text-xs transition-all disabled:opacity-40 flex items-center gap-1.5 cursor-pointer shrink-0 shadow-sm"
                        >
                          <span>Jump Bid</span>
                          {customBidAmountCr && !isNaN(parseFloat(customBidAmountCr)) && (
                            <span className="font-mono">
                              ₹{parseFloat(customBidAmountCr).toFixed(2)} Cr
                            </span>
                          )}
                        </button>
                      </form>
                      <p className="text-[10px] opacity-60 font-medium">
                        Want to bid ₹10 Cr or jump directly for your marquee target? Enter any higher Crores amount above.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 rounded-xl theme-subtle-box border theme-border text-center">
                    <p className="text-xs opacity-75">
                      You are currently in spectator mode. To bid, select an available franchise table seat.
                    </p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="theme-card p-12 rounded-3xl text-center opacity-70 border theme-border">
              No active player in the hot seat. Waiting for round advance.
            </div>
          )}

          {/* RECENT BIDS FEED */}
          <div className="theme-card p-5 rounded-2xl border theme-border shadow-sm">
            <h3 className="text-xs font-black uppercase tracking-wider opacity-60 mb-3">
              Live Bidding Stream
            </h3>

            {room.recentBids.length > 0 ? (
              <div className="space-y-2 max-h-40 overflow-y-auto pr-1 custom-scrollbar">
                {room.recentBids.slice(0, 8).map((bid) => {
                  const f = FRANCHISE_MAP.get(bid.franchiseId);
                  return (
                    <div
                      key={bid.id}
                      className="p-2.5 rounded-xl theme-subtle-box border theme-border flex items-center justify-between text-xs"
                    >
                      <div className="flex items-center gap-2">
                        <FranchiseLogo franchiseId={bid.franchiseId} size="xs" />
                        <span className="font-black">{f?.name || bid.franchiseId}</span>
                      </div>
                      <span className="font-mono font-black theme-accent-text">
                        {formatRupees(bid.amount)}
                      </span>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-xs opacity-50 italic">No bids recorded yet for this player.</p>
            )}
          </div>

          {/* UPCOMING PLAYERS ON DECK */}
          <div className="theme-card p-5 rounded-2xl border theme-border shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-black uppercase tracking-wider opacity-60 flex items-center gap-2">
                <span>Upcoming On Deck</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full theme-subtle-box border theme-border font-mono font-bold">
                  {room.queue.filter((q) => q.status === 'PENDING').length} Queued
                </span>
              </h3>

              {isHost && (
                <button
                  onClick={() => setIsPoolModalOpen(true)}
                  className="text-[11px] font-black theme-accent-text hover:underline flex items-center gap-1 transition-all cursor-pointer"
                >
                  <span>Manage Queue ⚙️</span>
                </button>
              )}
            </div>

            {room.queue.filter((_, idx) => idx > room.currentPlayerIndex && room.queue[idx].status === 'PENDING').length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                {room.queue
                  .filter((_, idx) => idx > room.currentPlayerIndex && room.queue[idx].status === 'PENDING')
                  .slice(0, 6)
                  .map((item, i) => (
                    <div
                      key={item.id}
                      className="p-2.5 rounded-xl theme-subtle-box border theme-border flex items-center justify-between gap-2"
                    >
                      <div className="overflow-hidden">
                        <span className="text-xs font-black block truncate">
                          {item.player.canonicalName}
                        </span>
                        <div className="flex items-center gap-1.5 text-[10px] opacity-65 mt-0.5 font-medium">
                          <span className="uppercase theme-accent-text font-bold">{item.player.primaryRole}</span>
                          {item.player.isOverseas && <span>• ✈️</span>}
                          <span>• {formatRupees(item.basePrice)}</span>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono opacity-50 font-black shrink-0">
                        #{room.currentPlayerIndex + 2 + i}
                      </span>
                    </div>
                  ))}
              </div>
            ) : (
              <p className="text-xs opacity-50 italic">No more players in queue. Organizer can add more from master database.</p>
            )}
          </div>
        </div>

        {/* RIGHT SIDEBAR: FRANCHISES PURSE & ROSTER STANDINGS (4 COLS) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="theme-card p-5 rounded-3xl border theme-border shadow-md">
            <h3 className="text-sm font-black mb-3 flex items-center justify-between">
              <span>Franchise Purses</span>
              <span className="text-[11px] font-bold opacity-60">10 Teams</span>
            </h3>

            <div className="space-y-2.5">
              {IPL_FRANCHISES.map((f) => {
                const sq = room.squads[f.id];
                const isLeading = room.currentBidFranchiseId === f.id;
                const isMine = userFranchiseId === f.id;

                return (
                  <div
                    key={f.id}
                    className={`p-2.5 rounded-xl border transition-all ${
                      isLeading
                        ? 'border-[var(--theme-accent)] theme-accent-badge ring-1 ring-[var(--theme-accent)]'
                        : isMine
                        ? 'border-blue-500/50 theme-subtle-box'
                        : 'theme-border theme-subtle-box opacity-80'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <FranchiseLogo franchiseId={f.id} size="xs" />
                        <span className="text-xs font-black">
                          {f.shortName} {isMine && '(You)'}
                        </span>
                        {isLeading && (
                          <span className="text-[9px] px-1.5 py-0.5 rounded font-black theme-btn-primary">
                            HIGH BID
                          </span>
                        )}
                      </div>
                      <span className="text-xs font-black text-emerald-500 font-mono">
                        {formatRupees(sq?.remainingPurse || room.config.startingPurse)}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-[10px] opacity-65 font-medium">
                      <span>Squad: {sq?.players.length || 0} players</span>
                      <span>Overseas: {sq?.overseasCount || 0}/8</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
