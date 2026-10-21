'use client';

import { useState, useEffect, useRef, useTransition } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { IPL_FRANCHISES, FRANCHISE_MAP, Franchise } from '@/data/franchises';
import { formatRupees, getNextMinimumBid, getQuickBidOptions, CRORE } from '@/lib/currency';
import { AuctionRoomState, RoomParticipant, AuctionPlayerItem } from '@/lib/types';
import confetti from 'canvas-confetti';
import Link from 'next/link';
import OrganizerPoolModal from './OrganizerPoolModal';

export default function AuctionRoomPage() {
  const params = useParams();
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
      const res = document.execCommand('copy');
      document.body.removeChild(textarea);
      return res;
    } catch (e) {
      return false;
    }
  };

  const handleCopyInvite = async () => {
    const url = typeof window !== 'undefined' ? window.location.href : '';
    const success = await copyToClipboard(url);
    if (success) {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const handleCopyCode = async () => {
    if (!roomCode) return;
    const success = await copyToClipboard(roomCode);
    if (success) {
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2500);
    }
  };

  const handleShareWhatsApp = () => {
    const url = typeof window !== 'undefined' ? window.location.href : '';
    const text = encodeURIComponent(
      `🏏 Join my IPL Auction Arena!\nRoom Code: ${roomCode}\nTap link to pick your franchise & bid live: ${url}`
    );
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  // Join room helper
  const joinUser = async (name: string) => {
    setIsJoiningUser(true);
    setJoinModalError('');
    try {
      const res = await fetch('/api/auction/join', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          roomCode,
          displayName: name || 'CricketFan',
          sessionToken: sessionToken || undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to join room');
      }
      if (data.sessionToken) {
        setSessionToken(data.sessionToken);
        setDisplayName(name);
        localStorage.setItem(`auction_token_${roomCode}`, data.sessionToken);
        localStorage.setItem(`auction_name_${roomCode}`, name);
        if (data.room) setRoom(data.room);
      }
    } catch (e: any) {
      setJoinModalError(e.message || 'Could not join room');
      console.error(e);
    } finally {
      setIsJoiningUser(false);
    }
  };

  // Local Countdown Timer calculation derived from server deadline
  useEffect(() => {
    if (!room || room.status !== 'ACTIVE' || !room.timerDeadlineAt) {
      setTimeLeft(null);
      return;
    }

    const updateTimer = () => {
      const effectiveNow = Date.now() + serverOffset;
      const msRemaining = room.timerDeadlineAt! - effectiveNow;
      const seconds = Math.max(0, Math.ceil(msRemaining / 1000));
      setTimeLeft(seconds);

      // Trigger automatic finalization if timer hits 0
      if (seconds === 0 && room.status === 'ACTIVE') {
        autoFinalize();
      }
    };

    updateTimer();
    const timerInterval = setInterval(updateTimer, 250);
    return () => clearInterval(timerInterval);
  }, [room?.timerDeadlineAt, room?.status, serverOffset]);

  // Trigger celebration confetti when auction completes
  useEffect(() => {
    if (room?.status === 'COMPLETED' && !confettiTriggered.current) {
      confettiTriggered.current = true;
      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
        });
      } catch (e) {}
    }
  }, [room?.status]);

  const autoFinalize = async () => {
    try {
      await fetch('/api/auction/finalize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ roomCode, sessionToken }),
      });
    } catch (e) {}
  };

  // User participant and franchise info
  const currentParticipant = room?.participants.find((p) => p.sessionToken === sessionToken);
  const isHost = room?.hostSessionToken === sessionToken;
  const userFranchiseId = currentParticipant?.franchiseId;
  const userFranchise = userFranchiseId ? FRANCHISE_MAP.get(userFranchiseId) : null;
  const userSquad = userFranchiseId && room ? room.squads[userFranchiseId] : null;

  const currentPlayerItem: AuctionPlayerItem | undefined =
    room && room.queue ? room.queue[room.currentPlayerIndex] : undefined;

  const currentBid = room?.currentBidAmount || 0;
  const basePrice = currentPlayerItem?.basePrice || 20000000;
  const minNextBid = getNextMinimumBid(currentBid, basePrice);
  const remainingPurse = userSquad?.remainingPurse || 0;

  const quickBidOptions = userFranchiseId
    ? getQuickBidOptions(currentBid, basePrice, remainingPurse)
    : [];


  const handleSelectFranchise = async (franchiseId: string | null) => {
    try {
      setError('');
      const res = await fetch('/api/auction/select-franchise', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ roomCode, sessionToken, franchiseId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setRoom(data.room);
    } catch (err: any) {
      setError(err.message || 'Failed to select franchise');
    }
  };

  const handleStartAuction = async () => {
    try {
      setError('');
      const res = await fetch('/api/auction/start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ roomCode, sessionToken }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setRoom(data.room);
    } catch (err: any) {
      setError(err.message || 'Failed to start auction');
    }
  };

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
    const cr = parseFloat(customBidAmountCr);
    if (isNaN(cr) || cr <= 0) {
      setBidError('Please enter a valid bid amount in Crores.');
      return;
    }
    handlePlaceBid(Math.round(cr * CRORE));
  };

  const handleFinalize = async () => {
    try {
      const res = await fetch('/api/auction/finalize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ roomCode, sessionToken }),
      });
      const data = await res.json();
      if (res.ok && data.room) setRoom(data.room);
    } catch (e) {}
  };

  const handleSkip = async () => {
    try {
      const res = await fetch('/api/auction/skip', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ roomCode, sessionToken }),
      });
      const data = await res.json();
      if (res.ok && data.room) setRoom(data.room);
    } catch (e) {}
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
      <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
        <div className="max-w-md w-full ipl-card p-6 sm:p-8 rounded-2xl border border-amber-500/40 shadow-2xl shadow-amber-500/10 text-center animate-fade-in">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-3xl mx-auto mb-4 shadow-lg shadow-amber-500/30">
            🏏
          </div>
          <h2 className="text-xl font-black text-white mb-1">Join IPL Auction Room</h2>
          <p className="text-xs text-amber-400 font-mono tracking-wider font-bold mb-4">
            ROOM CODE: {roomCode}
          </p>
          <p className="text-xs text-slate-400 mb-6">
            Enter your manager name to join the live room, claim your franchise, and compete in the bidding war.
          </p>

          {joinModalError && (
            <div className="mb-4 p-3 text-xs rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 font-medium text-left">
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
              <label className="block text-left text-xs font-semibold text-slate-300 mb-1.5">
                Your Manager Name
              </label>
              <input
                type="text"
                required
                autoFocus
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="e.g. Rohan Sharma"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400 placeholder:text-slate-600"
              />
            </div>

            <button
              type="submit"
              disabled={isJoiningUser}
              className="w-full py-3 rounded-xl font-black text-slate-950 bg-gradient-to-r from-amber-400 to-yellow-300 hover:from-amber-300 hover:to-yellow-200 shadow-lg shadow-amber-500/25 text-xs tracking-wider transition-all disabled:opacity-50"
            >
              {isJoiningUser ? 'JOINING ROOM...' : 'ENTER AUCTION ARENA 🎯'}
            </button>
          </form>
        </div>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center py-20">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-400 font-semibold text-sm">Entering Auction Arena {roomCode}...</p>
        </div>
      </div>
    );
  }

  if (error || !room) {
    return (
      <div className="flex-1 flex items-center justify-center py-20 px-4">
        <div className="max-w-md w-full ipl-card p-8 rounded-2xl text-center border border-red-500/30">
          <div className="text-3xl mb-3">⚠️</div>
          <h2 className="text-lg font-bold text-white mb-2">Room Unavailable</h2>
          <p className="text-sm text-slate-400 mb-6">{error || 'Room not found or expired.'}</p>
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => window.location.reload()}
              className="py-2.5 px-5 rounded-xl font-bold bg-amber-500 text-slate-950 text-xs tracking-wide hover:bg-amber-400 transition-all shadow-md"
            >
              🔄 Retry Connection
            </button>
            <Link
              href="/"
              className="py-2.5 px-5 rounded-xl font-bold bg-slate-800 border border-slate-700 text-slate-300 hover:text-white text-xs tracking-wide transition-all"
            >
              ← Return to Arena Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // 1. LOBBY VIEW
  // -------------------------------------------------------------
  if (room.status === 'LOBBY') {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
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
        <div className="ipl-card p-6 rounded-2xl mb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold mb-2">
              <span>Auction Room Lobby</span>
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-ping" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white">
              Room Code:{' '}
              <span className="font-mono text-amber-400 tracking-wider ml-1">{room.roomCode}</span>
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Select your franchise and get ready. The host will start bidding once owners are assembled.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={handleCopyCode}
              className="py-2.5 px-3.5 rounded-xl border border-slate-700 bg-slate-900/90 hover:bg-slate-800 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm"
            >
              <span>{copiedCode ? '✅ Code Copied!' : '📋 Copy Code'}</span>
            </button>

            <button
              onClick={handleCopyInvite}
              className="py-2.5 px-4 rounded-xl border border-slate-700 bg-slate-900/90 hover:bg-slate-800 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm"
            >
              <span>{copiedLink ? '✅ Link Copied!' : '🔗 Copy Invite Link'}</span>
            </button>

            <button
              onClick={handleShareWhatsApp}
              className="py-2.5 px-3.5 rounded-xl bg-emerald-600/20 border border-emerald-500/30 hover:bg-emerald-600/30 text-emerald-400 text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm"
              title="Share on WhatsApp"
            >
              <span>💬 WhatsApp</span>
            </button>

            {isHost && (
              <>
                <button
                  onClick={() => setIsPoolModalOpen(true)}
                  className="py-2.5 px-4 rounded-xl font-bold text-amber-300 border border-amber-500/40 bg-amber-500/10 hover:bg-amber-500/20 text-xs tracking-wide transition-all flex items-center gap-1.5"
                >
                  <span>⚙️ Auction Pool ({room.queue?.length || 0})</span>
                </button>
                <button
                  onClick={handleStartAuction}
                  className="py-2.5 px-6 rounded-xl font-black text-slate-950 bg-gradient-to-r from-amber-400 to-yellow-300 hover:from-amber-300 hover:to-yellow-200 shadow-lg shadow-amber-500/25 text-xs tracking-wide transition-all ml-1"
                >
                  START AUCTION 🔨
                </button>
              </>
            )}
          </div>
        </div>

        {/* INVITE FRIENDS HERO BANNER */}
        <div className="mb-8 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-slate-950/40 border border-amber-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-lg shadow-amber-500/5">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300 flex items-center justify-center text-2xl shrink-0">
              👥
            </div>
            <div>
              <div className="text-sm font-bold text-white flex items-center gap-2">
                <span>Invite Friends to Claim Franchises</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 font-extrabold uppercase">
                  Multiplayer
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Share room code <span className="font-mono font-bold text-amber-400">{room.roomCode}</span> with other players to take the helm of CSK, MI, RCB and more!
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={handleCopyCode}
              className="flex-1 sm:flex-none py-2 px-3 rounded-xl border border-slate-700 bg-slate-900 hover:bg-slate-800 text-xs font-semibold text-slate-200 transition-all flex items-center justify-center gap-1.5"
            >
              <span>{copiedCode ? '✅ Copied' : `📋 ${room.roomCode}`}</span>
            </button>
            <button
              onClick={handleCopyInvite}
              className="flex-1 sm:flex-none py-2 px-3.5 rounded-xl border border-amber-500/40 bg-amber-500/10 hover:bg-amber-500/20 text-xs font-semibold text-amber-300 transition-all flex items-center justify-center gap-1.5"
            >
              <span>{copiedLink ? '✅ Link Copied' : '🔗 Copy Invite Link'}</span>
            </button>
            <button
              onClick={handleShareWhatsApp}
              className="py-2 px-3 rounded-xl bg-emerald-600/20 border border-emerald-500/30 hover:bg-emerald-600/30 text-emerald-400 text-xs font-semibold transition-all flex items-center justify-center gap-1.5"
            >
              <span>💬 Share</span>
            </button>
          </div>
        </div>

        {/* FRANCHISE SELECTION GRID */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span>Franchise Ownership</span>
              <span className="text-xs font-medium text-slate-400">
                ({room.participants.filter((p) => p.franchiseId).length}/10 Claimed)
              </span>
            </h2>
            <div className="text-xs text-slate-400">
              Each franchise starts with {formatRupees(room.config.startingPurse)}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {IPL_FRANCHISES.map((franchise) => {
              const owner = room.participants.find((p) => p.franchiseId === franchise.id);
              const isUserOwned = userFranchiseId === franchise.id;

              return (
                <div
                  key={franchise.id}
                  className={`ipl-card p-4 rounded-xl border transition-all flex flex-col justify-between ${
                    isUserOwned
                      ? 'border-amber-400 shadow-lg shadow-amber-500/20 ring-1 ring-amber-400'
                      : owner
                      ? 'border-slate-800 opacity-80'
                      : 'border-slate-800/80 hover:border-slate-700'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg shadow-md"
                        style={{
                          backgroundColor: franchise.primaryColor,
                          color: franchise.secondaryColor,
                        }}
                      >
                        {franchise.logo}
                      </div>
                      <span className="text-xs font-black text-slate-400">{franchise.shortName}</span>
                    </div>

                    <h3 className="text-sm font-bold text-white mb-1">{franchise.name}</h3>
                    <p className="text-[11px] text-slate-400 mb-4">
                      {franchise.titles} {franchise.titles === 1 ? 'Championship' : 'Championships'}
                    </p>
                  </div>

                  <div>
                    {owner ? (
                      <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-center">
                        <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-bold">
                          {isUserOwned ? 'You Control This Team' : 'Managed By'}
                        </span>
                        <span className="text-xs font-semibold text-amber-400 truncate block">
                          {owner.displayName}
                        </span>
                        {isUserOwned && (
                          <button
                            onClick={() => handleSelectFranchise(null)}
                            className="mt-1 text-[10px] text-red-400 hover:underline block mx-auto"
                          >
                            Release Team
                          </button>
                        )}
                      </div>
                    ) : (
                      <button
                        onClick={() => handleSelectFranchise(franchise.id)}
                        className="w-full py-2 px-3 rounded-lg text-xs font-bold border border-slate-700 bg-slate-900 hover:bg-amber-500 hover:text-slate-950 hover:border-amber-500 transition-all text-slate-300"
                      >
                        Claim Team 🏏
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
          <div className="ipl-card p-5 rounded-xl border border-slate-800">
            <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
              <span>Connected Participants</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
                {room.participants.length}
              </span>
            </h3>

            <div className="space-y-2">
              {room.participants.map((p) => {
                const team = p.franchiseId ? FRANCHISE_MAP.get(p.franchiseId) : null;
                const isMe = p.sessionToken === sessionToken;

                return (
                  <div
                    key={p.id}
                    className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800 flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400" />
                      <span className="font-semibold text-white">
                        {p.displayName} {isMe && '(You)'}
                      </span>
                      {p.role === 'HOST' && (
                        <span className="px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400 font-bold text-[9px] border border-amber-500/30">
                          HOST
                        </span>
                      )}
                    </div>

                    <div className="text-slate-400">
                      {team ? (
                        <span className="font-semibold text-slate-300 flex items-center gap-1">
                          <span>{team.logo}</span>
                          <span>{team.shortName}</span>
                        </span>
                      ) : (
                        <span className="text-slate-500 italic">Spectating</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="ipl-card p-5 rounded-xl border border-slate-800">
            <h3 className="text-sm font-bold text-white mb-3">Room Auction Configuration</h3>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800">
                <span className="text-slate-500 block text-[10px] uppercase font-bold">Starting Purse</span>
                <span className="text-amber-400 font-extrabold text-sm">{formatRupees(room.config.startingPurse)}</span>
              </div>
              <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800">
                <span className="text-slate-500 block text-[10px] uppercase font-bold">Bid Clock</span>
                <span className="text-white font-extrabold text-sm">{room.config.bidTimerSeconds} Seconds</span>
              </div>
              <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800">
                <span className="text-slate-500 block text-[10px] uppercase font-bold">Auction Pool</span>
                <span className="text-white font-extrabold text-sm">{room.queue ? room.queue.length : 200} Players</span>
              </div>
              <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800">
                <span className="text-slate-500 block text-[10px] uppercase font-bold">Overseas Quota</span>
                <span className="text-white font-extrabold text-sm">Max {room.config.maxOverseas} Players</span>
              </div>
              <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800">
                <span className="text-slate-500 block text-[10px] uppercase font-bold">Squad Bounds</span>
                <span className="text-white font-extrabold text-sm">{room.config.minSquadSize} - {room.config.maxSquadSize} Players</span>
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
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="ipl-card p-8 sm:p-12 rounded-3xl border border-amber-500/40 ipl-card-glow mb-8">
          <div className="text-5xl mb-4">🏆</div>
          <h1 className="text-3xl sm:text-5xl font-black text-white mb-3">
            AUCTION CONCLUDED!
          </h1>
          <p className="text-slate-300 max-w-lg mx-auto text-sm sm:text-base mb-8">
            All players have been processed. Squad rosters, financial books, and the 100-point analytical team evaluations have been permanently preserved.
          </p>

          {room.reportSlug && (
            <Link
              href={`/reports/${room.reportSlug}`}
              className="inline-flex items-center gap-2 py-4 px-8 rounded-2xl font-black text-slate-950 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 hover:from-amber-300 hover:to-yellow-200 transition-all text-sm tracking-wide shadow-xl shadow-amber-500/30 hover:scale-105"
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full flex-1 flex flex-col justify-between">
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
      <div className="ipl-card p-4 rounded-2xl mb-6 flex flex-wrap items-center justify-between gap-4 border border-slate-800">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs font-black px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700 text-amber-400">
            ROOM: {room.roomCode}
          </span>

          <button
            onClick={handleCopyInvite}
            className="text-[11px] font-semibold text-slate-300 hover:text-white px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700 hover:border-slate-600 transition-all flex items-center gap-1"
            title="Copy invite link to share with friends"
          >
            <span>{copiedLink ? '✅ Link Copied' : '🔗 Invite'}</span>
          </button>

          <div
            className={`px-3 py-1 rounded-full text-xs font-extrabold flex items-center gap-1.5 ${
              room.status === 'ACTIVE'
                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full ${
                room.status === 'ACTIVE' ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'
              }`}
            />
            <span>{room.status}</span>
          </div>

          <span className="text-xs text-slate-400 font-semibold hidden sm:inline">
            Player {room.currentPlayerIndex + 1} of {room.queue.length}
          </span>
        </div>

        {/* TIMER DISPLAY */}
        <div className="flex items-center gap-4">
          <div
            className={`px-4 py-1.5 rounded-xl border font-mono font-black text-lg flex items-center gap-2 ${
              timeLeft !== null && timeLeft <= 5
                ? 'bg-red-500/20 border-red-500 text-red-400 pulse-timer'
                : timeLeft !== null && timeLeft <= 10
                ? 'bg-amber-500/20 border-amber-500 text-amber-400'
                : 'bg-slate-900 border-slate-700 text-white'
            }`}
          >
            <span className="text-xs font-sans text-slate-400 uppercase font-bold">CLOCK</span>
            <span>{timeLeft !== null ? `${timeLeft}s` : '--'}</span>
          </div>

          {/* HOST CONTROLS */}
          {isHost && (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsPoolModalOpen(true)}
                className="py-1.5 px-3 rounded-lg text-xs font-bold border border-amber-500/40 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 flex items-center gap-1.5"
                title="Manage Auction Pool & Queue"
              >
                <span>⚙️ Pool ({room.queue?.length || 0})</span>
              </button>
              <button
                onClick={handleTogglePause}
                className="py-1.5 px-3 rounded-lg text-xs font-bold border border-slate-700 bg-slate-900 hover:bg-slate-800 text-slate-300"
              >
                {room.status === 'PAUSED' ? '▶ Resume' : '⏸ Pause'}
              </button>
              <button
                onClick={handleSkip}
                className="py-1.5 px-3 rounded-lg text-xs font-bold border border-slate-700 bg-slate-900 hover:bg-slate-800 text-slate-300"
              >
                Skip ⏭
              </button>
              <button
                onClick={handleFinalize}
                className="py-1.5 px-3 rounded-lg text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 shadow"
              >
                Sell Now 🔨
              </button>
              <button
                onClick={handleFinishAuction}
                className="py-1.5 px-2.5 rounded-lg text-[11px] font-bold text-red-400 hover:bg-red-500/10"
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
            <div className="ipl-card p-6 sm:p-8 rounded-2xl border border-slate-800 relative overflow-hidden">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2.5 py-0.5 rounded-md text-[10px] font-extrabold uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/30">
                      {currentPlayerItem.player.primaryRole}
                    </span>
                    {currentPlayerItem.player.isOverseas && (
                      <span className="px-2.5 py-0.5 rounded-md text-[10px] font-extrabold uppercase tracking-wider bg-blue-500/10 text-blue-400 border border-blue-500/30">
                        ✈️ Overseas ({currentPlayerItem.player.nationality})
                      </span>
                    )}
                    <span className="text-xs text-slate-400 font-medium">
                      Age {currentPlayerItem.player.calculatedAge}
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-4xl font-black text-white">
                    {currentPlayerItem.player.canonicalName}
                  </h2>
                  <p className="text-xs text-slate-400 mt-1 max-w-xl">
                    {currentPlayerItem.player.profileSummary}
                  </p>
                </div>

                <div className="text-right sm:text-right shrink-0">
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
                    Base Price
                  </span>
                  <span className="text-lg sm:text-2xl font-black text-amber-400">
                    {formatRupees(currentPlayerItem.basePrice)}
                  </span>
                </div>
              </div>

              {/* STATS MATRIX */}
              <div className="py-6 border-b border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80">
                  <span className="text-[10px] font-bold text-slate-500 uppercase block">Matches</span>
                  <span className="text-base font-extrabold text-white">
                    {currentPlayerItem.player.stats.matches}
                  </span>
                  <span className="text-[10px] text-slate-400 block">
                    {currentPlayerItem.player.stats.seasonRange}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80">
                  <span className="text-[10px] font-bold text-slate-500 uppercase block">Runs / Avg</span>
                  <span className="text-base font-extrabold text-white">
                    {currentPlayerItem.player.stats.runs}{' '}
                    <span className="text-xs font-normal text-slate-400">
                      ({currentPlayerItem.player.stats.battingAverage || '-'})
                    </span>
                  </span>
                  <span className="text-[10px] text-slate-400 block">
                    SR: {currentPlayerItem.player.stats.strikeRate || '-'}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80">
                  <span className="text-[10px] font-bold text-slate-500 uppercase block">Wickets / Eco</span>
                  <span className="text-base font-extrabold text-white">
                    {currentPlayerItem.player.stats.wickets}{' '}
                    <span className="text-xs font-normal text-slate-400">
                      ({currentPlayerItem.player.stats.economyRate || '-'})
                    </span>
                  </span>
                  <span className="text-[10px] text-slate-400 block">
                    Best: {currentPlayerItem.player.stats.bestBowling || '-'}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80">
                  <span className="text-[10px] font-bold text-slate-500 uppercase block">Playing Style</span>
                  <span className="text-xs font-bold text-slate-200 block truncate">
                    {currentPlayerItem.player.battingStyle}
                  </span>
                  <span className="text-[10px] text-slate-400 block truncate">
                    {currentPlayerItem.player.bowlingStyle}
                  </span>
                </div>
              </div>

              {/* LIVE BIDDING ARENA */}
              <div className="pt-6">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-6 rounded-2xl bg-slate-900/90 border border-slate-700/80 mb-6">
                  <div>
                    <span className="text-xs uppercase font-extrabold tracking-widest text-slate-400 block mb-1">
                      CURRENT HIGHEST BID
                    </span>
                    <div className="text-3xl sm:text-5xl font-black text-amber-400 tracking-tight">
                      {currentBid > 0 ? formatRupees(currentBid) : 'Opening Bid Pending'}
                    </div>
                  </div>

                  <div className="text-center sm:text-right">
                    <span className="text-xs uppercase font-extrabold tracking-widest text-slate-400 block mb-1">
                      LEADING FRANCHISE
                    </span>
                    {leadingFranchise ? (
                      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl border border-slate-700 bg-slate-950 font-bold text-white text-sm">
                        <span>{leadingFranchise.logo}</span>
                        <span>{leadingFranchise.name}</span>
                      </div>
                    ) : (
                      <span className="text-sm font-semibold text-slate-500 italic">No bids placed yet</span>
                    )}
                  </div>
                </div>

                {bidError && (
                  <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-semibold">
                    {bidError}
                  </div>
                )}

                {/* BID CONTROLS */}
                {userFranchise ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span>
                        Bidding as:{' '}
                        <strong className="text-amber-400">
                          {userFranchise.name} ({userFranchise.shortName})
                        </strong>
                      </span>
                      <span>
                        Purse Remaining:{' '}
                        <strong className="text-emerald-400">{formatRupees(remainingPurse)}</strong>
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {quickBidOptions.map((amount) => (
                        <button
                          key={amount}
                          onClick={() => handlePlaceBid(amount)}
                          disabled={amount > remainingPurse || room.status !== 'ACTIVE'}
                          className="py-3 px-3 rounded-xl font-black text-xs text-slate-950 bg-gradient-to-r from-amber-400 to-yellow-300 hover:from-amber-300 hover:to-yellow-200 disabled:opacity-30 disabled:cursor-not-allowed shadow-md transition-all"
                        >
                          BID {formatRupees(amount)}
                        </button>
                      ))}
                    </div>

                    {/* CUSTOM BID INPUT */}
                    <form onSubmit={handleCustomBid} className="flex gap-2 pt-2">
                      <input
                        type="number"
                        step="0.05"
                        placeholder={`Custom Raise in Cr (Min ${minNextBid / CRORE} Cr)`}
                        value={customBidAmountCr}
                        onChange={(e) => setCustomBidAmountCr(e.target.value)}
                        className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-amber-400"
                      />
                      <button
                        type="submit"
                        disabled={room.status !== 'ACTIVE'}
                        className="py-2.5 px-5 rounded-xl font-bold bg-slate-800 hover:bg-slate-700 text-white border border-slate-600 text-xs transition-all disabled:opacity-40"
                      >
                        Place Bid
                      </button>
                    </form>
                  </div>
                ) : (
                  <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-center">
                    <p className="text-xs text-slate-400">
                      You are currently in spectator mode. To bid, select an available franchise.
                    </p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="ipl-card p-12 rounded-2xl text-center text-slate-400">
              No active player. Waiting for round advance.
            </div>
          )}

          {/* RECENT BIDS FEED */}
          <div className="ipl-card p-5 rounded-2xl border border-slate-800">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-3">
              Live Bidding Stream
            </h3>

            {room.recentBids.length > 0 ? (
              <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                {room.recentBids.slice(0, 8).map((bid) => {
                  const f = FRANCHISE_MAP.get(bid.franchiseId);
                  return (
                    <div
                      key={bid.id}
                      className="p-2 rounded-lg bg-slate-900/60 border border-slate-800/80 flex items-center justify-between text-xs"
                    >
                      <div className="flex items-center gap-2">
                        <span>{f?.logo}</span>
                        <span className="font-bold text-white">{f?.name || bid.franchiseId}</span>
                      </div>
                      <span className="font-mono font-extrabold text-amber-400">
                        {formatRupees(bid.amount)}
                      </span>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-xs text-slate-500 italic">No bids recorded yet for this player.</p>
            )}
          </div>

          {/* UPCOMING PLAYERS ON DECK */}
          <div className="ipl-card p-5 rounded-2xl border border-slate-800">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                <span>Upcoming On Deck</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-mono">
                  {room.queue.filter((q) => q.status === 'PENDING').length} Queued
                </span>
              </h3>

              {isHost && (
                <button
                  onClick={() => setIsPoolModalOpen(true)}
                  className="text-[11px] font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1 transition-all"
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
                      className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/80 flex items-center justify-between gap-2"
                    >
                      <div className="overflow-hidden">
                        <span className="text-xs font-bold text-white block truncate">
                          {item.player.canonicalName}
                        </span>
                        <div className="flex items-center gap-1.5 text-[10px] text-slate-400 mt-0.5">
                          <span className="uppercase text-amber-400 font-semibold">{item.player.primaryRole}</span>
                          {item.player.isOverseas && <span>• ✈️</span>}
                          <span>• {formatRupees(item.basePrice)}</span>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono text-slate-500 font-bold shrink-0">
                        #{room.currentPlayerIndex + 2 + i}
                      </span>
                    </div>
                  ))}
              </div>
            ) : (
              <p className="text-xs text-slate-500 italic">No more players in queue. Organizer can add more from master database.</p>
            )}
          </div>
        </div>

        {/* RIGHT SIDEBAR: FRANCHISES PURSE & ROSTER STANDINGS (4 COLS) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="ipl-card p-5 rounded-2xl border border-slate-800">
            <h3 className="text-sm font-bold text-white mb-3 flex items-center justify-between">
              <span>Franchise Purses</span>
              <span className="text-[11px] font-semibold text-slate-400">10 Teams</span>
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
                        ? 'border-amber-400 bg-amber-500/5 ring-1 ring-amber-400/50'
                        : isMine
                        ? 'border-blue-500/50 bg-blue-500/5'
                        : 'border-slate-800/80 bg-slate-900/40'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm">{f.logo}</span>
                        <span className="text-xs font-bold text-white">
                          {f.shortName} {isMine && '(You)'}
                        </span>
                        {isLeading && (
                          <span className="text-[9px] px-1 rounded bg-amber-400 text-slate-950 font-black">
                            HIGH BID
                          </span>
                        )}
                      </div>
                      <span className="text-xs font-extrabold text-emerald-400 font-mono">
                        {formatRupees(sq?.remainingPurse || room.config.startingPurse)}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-[10px] text-slate-400">
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
