'use client';

import { useState, useMemo } from 'react';
import { AuctionRoomState, AuctionPlayerItem } from '@/lib/types';
import { VERIFIED_PLAYERS, Player, PlayerRole } from '@/data/players';
import { getCuratedAuctionPool, POOL_PRESETS } from '@/data/curated-pools';
import { FRANCHISE_MAP } from '@/data/franchises';
import { formatRupees, CRORE } from '@/lib/currency';

interface OrganizerPoolModalProps {
  isOpen: boolean;
  onClose: () => void;
  room: AuctionRoomState;
  sessionToken: string;
  isHost: boolean;
  onRoomUpdate: (updatedRoom: AuctionRoomState) => void;
}

export default function OrganizerPoolModal({
  isOpen,
  onClose,
  room,
  sessionToken,
  isHost,
  onRoomUpdate,
}: OrganizerPoolModalProps) {
  const [activeTab, setActiveTab] = useState<'queue' | 'catalog' | 'presets'>('queue');
  const [isLoading, setIsLoading] = useState(false);
  const [actionMessage, setActionMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Queue Tab state
  const [queueSearch, setQueueSearch] = useState('');
  const [queueStatusFilter, setQueueStatusFilter] = useState<string>('ALL');
  const [autoRequeueSkip, setAutoRequeueSkip] = useState(true);

  // Catalog Tab state
  const [catalogSearch, setCatalogSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('ALL');
  const [nationalityFilter, setNationalityFilter] = useState<'ALL' | 'INDIAN' | 'OVERSEAS'>('ALL');
  const [cappedFilter, setCappedFilter] = useState<'ALL' | 'CAPPED' | 'UNCAPPED'>('ALL');
  const [affiliationFilter, setAffiliationFilter] = useState<'ALL' | 'RETAINED' | 'SOLD' | 'UNSOLD'>('ALL');
  const [selectedPlayerIds, setSelectedPlayerIds] = useState<Set<string>>(new Set());

  // Import / Export state
  const [importJsonText, setImportJsonText] = useState('');
  const [importReplacePending, setImportReplacePending] = useState(false);

  // Set of player IDs already in current room's queue
  const queuePlayerIdMap = useMemo(() => {
    const map = new Map<string, number>();
    room.queue.forEach((item, idx) => {
      map.set(item.playerId, idx + 1);
    });
    return map;
  }, [room.queue]);

  // Filtered queue items
  const filteredQueue = useMemo(() => {
    return room.queue.filter((item) => {
      if (queueStatusFilter !== 'ALL' && item.status !== queueStatusFilter) return false;
      if (!queueSearch.trim()) return true;
      const q = queueSearch.toLowerCase();
      return (
        item.player.canonicalName.toLowerCase().includes(q) ||
        item.player.primaryRole.toLowerCase().includes(q) ||
        item.player.nationality.toLowerCase().includes(q)
      );
    });
  }, [room.queue, queueStatusFilter, queueSearch]);

  // Filtered master catalog
  const filteredCatalog = useMemo(() => {
    const q = catalogSearch.toLowerCase().trim();
    return VERIFIED_PLAYERS.filter((player) => {
      if (roleFilter !== 'ALL' && player.primaryRole !== roleFilter) return false;
      if (nationalityFilter === 'INDIAN' && player.isOverseas) return false;
      if (nationalityFilter === 'OVERSEAS' && !player.isOverseas) return false;
      if (cappedFilter === 'CAPPED' && player.internationalStatus !== 'CAPPED') return false;
      if (cappedFilter === 'UNCAPPED' && player.internationalStatus !== 'UNCAPPED') return false;

      if (affiliationFilter !== 'ALL') {
        const aff = player.currentAffiliation?.franchiseAffiliationStatus;
        if (affiliationFilter === 'RETAINED' && aff !== 'RETAINED') return false;
        if (affiliationFilter === 'SOLD' && aff !== 'PURCHASED_AT_AUCTION') return false;
        if (affiliationFilter === 'UNSOLD' && player.currentAffiliation?.latestAuctionStatus !== 'UNSOLD') return false;
      }

      if (q) {
        const matchesName = player.canonicalName.toLowerCase().includes(q);
        const matchesNationality = player.nationality.toLowerCase().includes(q);
        const matchesTeam =
          player.currentAffiliation?.latestConfirmedFranchise?.toLowerCase().includes(q);
        if (!matchesName && !matchesNationality && !matchesTeam) return false;
      }

      return true;
    });
  }, [catalogSearch, roleFilter, nationalityFilter, cappedFilter, affiliationFilter]);

  // Queue summary stats
  const queueStats = useMemo(() => {
    const total = room.queue.length;
    const pending = room.queue.filter((q) => q.status === 'PENDING').length;
    const inAuction = room.queue.filter((q) => q.status === 'IN_AUCTION').length;
    const sold = room.queue.filter((q) => q.status === 'SOLD').length;
    const unsold = room.queue.filter((q) => q.status === 'UNSOLD').length;
    const skipped = room.queue.filter((q) => q.status === 'SKIPPED').length;
    const excluded = room.queue.filter((q) => q.status === 'EXCLUDED').length;
    return { total, pending, inAuction, sold, unsold, skipped, excluded };
  }, [room.queue]);

  if (!isOpen) return null;

  // Generic backend pool call
  const callPoolApi = async (action: string, payload: Record<string, any>) => {
    setIsLoading(true);
    setActionMessage(null);
    try {
      const res = await fetch('/api/auction/pool', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          roomCode: room.roomCode,
          sessionToken,
          action,
          ...payload,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || `Failed to execute ${action}`);
      }

      if (data.room) {
        onRoomUpdate(data.room);
      }
      setActionMessage({ type: 'success', text: `Action "${action}" completed successfully.` });
      setTimeout(() => setActionMessage(null), 3500);
    } catch (err: any) {
      setActionMessage({ type: 'error', text: err.message || 'Operation failed' });
    } finally {
      setIsLoading(false);
    }
  };

  // Add selected catalog players
  const handleAddSelectedToQueue = () => {
    if (selectedPlayerIds.size === 0) return;
    const ids = Array.from(selectedPlayerIds);
    callPoolApi('ADD', { playerIds: ids });
    setSelectedPlayerIds(new Set());
  };

  // Curated Preset Packs
  const handleAddCuratedPack = (packType: string, replacePending: boolean = false) => {
    let ids: string[] = [];
    if (packType === 'MEGA_300') {
      ids = getCuratedAuctionPool(300).map((e) => e.player.id);
    } else if (packType === 'CHAMPIONSHIP_200') {
      ids = getCuratedAuctionPool(200).map((e) => e.player.id);
    } else if (packType === 'BLITZ_150') {
      ids = getCuratedAuctionPool(150).map((e) => e.player.id);
    } else if (packType === 'MARQUEE') {
      // Pant, Iyer, Starc, Cummins, Curran, Green, Morris, etc.
      ids = VERIFIED_PLAYERS.filter((p) =>
        ['rpant-17', 'shreyas-iyer-02', 'mstarc-56', 'pcummins-30', 'scurran-58', 'cgreen-42', 'klrahul-01', 'yvchahal-03', 'arshdeep-singh-04', 'jbuttler-05'].includes(p.id)
      ).map((p) => p.id);
    } else if (packType === 'RETAINED_2025') {
      ids = VERIFIED_PLAYERS.filter(
        (p) => p.currentAffiliation?.franchiseAffiliationStatus === 'RETAINED'
      ).map((p) => p.id);
    } else if (packType === 'TOP_BATTERS') {
      ids = VERIFIED_PLAYERS.filter(
        (p) => p.primaryRole === 'BATTER' && p.internationalStatus === 'CAPPED'
      )
        .slice(0, 30)
        .map((p) => p.id);
    } else if (packType === 'TOP_BOWLERS') {
      ids = VERIFIED_PLAYERS.filter(
        (p) => p.primaryRole === 'BOWLER' && p.internationalStatus === 'CAPPED'
      )
        .slice(0, 30)
        .map((p) => p.id);
    } else if (packType === 'TOP_ALLROUNDERS') {
      ids = VERIFIED_PLAYERS.filter((p) => p.primaryRole === 'ALL_ROUNDER')
        .slice(0, 30)
        .map((p) => p.id);
    }

    if (ids.length > 0) {
      if (replacePending) {
        callPoolApi('IMPORT', { playerIds: ids, replacePending: true });
      } else {
        callPoolApi('ADD', { playerIds: ids });
      }
    }
  };

  // Move player up/down in queue
  const handleMoveQueueItem = (currentIndex: number, direction: 'UP' | 'DOWN') => {
    const targetIndex = direction === 'UP' ? currentIndex - 1 : currentIndex + 1;
    if (targetIndex < 0 || targetIndex >= room.queue.length) return;

    // Disallow reordering active or already sold/unsold items
    if (currentIndex <= room.currentPlayerIndex || targetIndex <= room.currentPlayerIndex) {
      setActionMessage({
        type: 'error',
        text: 'Cannot reorder active or already completed auction items.',
      });
      return;
    }

    const reordered = [...room.queue];
    const temp = reordered[currentIndex];
    reordered[currentIndex] = reordered[targetIndex];
    reordered[targetIndex] = temp;

    callPoolApi('REORDER', {
      orderedAuctionPlayerIds: reordered.map((q) => q.id),
    });
  };

  // Export queue to JSON
  const handleExportJson = () => {
    const exportData = {
      roomCode: room.roomCode,
      exportedAt: new Date().toISOString(),
      totalPlayers: room.queue.length,
      queue: room.queue.map((item) => ({
        queuePosition: item.queuePosition,
        playerId: item.playerId,
        canonicalName: item.player.canonicalName,
        primaryRole: item.player.primaryRole,
        nationality: item.player.nationality,
        isOverseas: item.player.isOverseas,
        basePrice: item.basePrice,
        status: item.status,
        finalPrice: item.finalPrice,
        winningFranchiseId: item.winningFranchiseId,
      })),
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `auction_pool_${room.roomCode}_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Export queue to CSV
  const handleExportCsv = () => {
    const headers = [
      'QueuePosition',
      'PlayerId',
      'Name',
      'Role',
      'Nationality',
      'Overseas',
      'BasePriceINR',
      'Status',
      'WinningFranchise',
      'FinalPriceINR',
    ];

    const rows = room.queue.map((item) => [
      item.queuePosition + 1,
      item.playerId,
      `"${item.player.canonicalName.replace(/"/g, '""')}"`,
      item.player.primaryRole,
      item.player.nationality,
      item.player.isOverseas ? 'Yes' : 'No',
      item.basePrice,
      item.status,
      item.winningFranchiseId || '',
      item.finalPrice || '',
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `auction_pool_${room.roomCode}_${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Import custom pool
  const handleImportJson = () => {
    try {
      const parsed = JSON.parse(importJsonText);
      let playerIds: string[] = [];

      if (Array.isArray(parsed)) {
        playerIds = parsed.map((item) => (typeof item === 'string' ? item : item.playerId || item.id));
      } else if (parsed && Array.isArray(parsed.queue)) {
        playerIds = parsed.queue.map((item: any) => item.playerId || item.id);
      } else if (parsed && Array.isArray(parsed.playerIds)) {
        playerIds = parsed.playerIds;
      }

      if (playerIds.length === 0) {
        throw new Error('No valid player IDs found in imported JSON data.');
      }

      callPoolApi('IMPORT', {
        playerIds,
        replacePending: importReplacePending,
      });
      setImportJsonText('');
    } catch (err: any) {
      setActionMessage({ type: 'error', text: `Invalid JSON format: ${err.message}` });
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 animate-fade-in">
      <div className="ipl-card w-full max-w-6xl h-[92vh] flex flex-col rounded-2xl border border-amber-500/30 shadow-2xl overflow-hidden bg-slate-950">
        {/* MODAL HEADER */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-900/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-xl text-amber-400">
              🏏
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
                <span>Auction Pool & Queue Organizer</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 font-mono">
                  {room.roomCode}
                </span>
              </h2>
              <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-400 mt-0.5">
                <span>Total Pool: <strong className="text-white">{queueStats.total}</strong></span>
                <span>• Pending: <strong className="text-blue-400">{queueStats.pending}</strong></span>
                <span>• Sold: <strong className="text-emerald-400">{queueStats.sold}</strong></span>
                <span>• Unsold: <strong className="text-slate-400">{queueStats.unsold}</strong></span>
                <span>• Skipped: <strong className="text-purple-400">{queueStats.skipped}</strong></span>
                <span>• Excluded: <strong className="text-red-400">{queueStats.excluded}</strong></span>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center text-sm font-bold transition-all"
          >
            ✕
          </button>
        </div>

        {/* FEEDBACK BANNER */}
        {actionMessage && (
          <div
            className={`px-4 py-2 text-xs font-semibold flex items-center justify-between border-b ${
              actionMessage.type === 'success'
                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                : 'bg-red-500/10 text-red-400 border-red-500/30'
            }`}
          >
            <span>{actionMessage.text}</span>
            <button
              onClick={() => setActionMessage(null)}
              className="text-[10px] hover:underline"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* NAVIGATION TABS */}
        <div className="flex border-b border-slate-800 bg-slate-900/40 px-4">
          <button
            onClick={() => setActiveTab('queue')}
            className={`py-3 px-4 font-bold text-xs sm:text-sm border-b-2 flex items-center gap-2 transition-all ${
              activeTab === 'queue'
                ? 'border-amber-400 text-amber-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <span>Active Queue</span>
            <span className="px-2 py-0.5 rounded-full text-[10px] bg-slate-800 text-slate-300">
              {room.queue.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('catalog')}
            className={`py-3 px-4 font-bold text-xs sm:text-sm border-b-2 flex items-center gap-2 transition-all ${
              activeTab === 'catalog'
                ? 'border-amber-400 text-amber-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <span>Master Database (622 Players)</span>
            {selectedPlayerIds.size > 0 && (
              <span className="px-2 py-0.5 rounded-full text-[10px] bg-amber-500 text-slate-950 font-black">
                {selectedPlayerIds.size} Selected
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('presets')}
            className={`py-3 px-4 font-bold text-xs sm:text-sm border-b-2 flex items-center gap-2 transition-all ${
              activeTab === 'presets'
                ? 'border-amber-400 text-amber-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <span>Import / Export & Presets</span>
          </button>
        </div>

        {/* TAB 1: ACTIVE QUEUE */}
        {activeTab === 'queue' && (
          <div className="flex-1 flex flex-col p-4 overflow-hidden">
            {/* Filter controls */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-2 flex-1 min-w-[200px]">
                <input
                  type="text"
                  placeholder="Filter active queue by name, role, country..."
                  value={queueSearch}
                  onChange={(e) => setQueueSearch(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="flex items-center gap-1.5 overflow-x-auto text-xs">
                {['ALL', 'PENDING', 'IN_AUCTION', 'SOLD', 'UNSOLD', 'SKIPPED', 'EXCLUDED'].map(
                  (status) => (
                    <button
                      key={status}
                      onClick={() => setQueueStatusFilter(status)}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border transition-all ${
                        queueStatusFilter === status
                          ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                          : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      {status}
                    </button>
                  )
                )}
              </div>
            </div>

            {/* Queue Table */}
            <div className="flex-1 overflow-y-auto rounded-xl border border-slate-800 bg-slate-900/40">
              {filteredQueue.length === 0 ? (
                <div className="p-12 text-center text-slate-500 text-xs">
                  No players match the current queue filter.
                </div>
              ) : (
                <div className="divide-y divide-slate-800/80">
                  {filteredQueue.map((item, idx) => {
                    const originalIndex = room.queue.findIndex((q) => q.id === item.id);
                    const isCurrent = originalIndex === room.currentPlayerIndex;
                    const isPending = item.status === 'PENDING';
                    const isSold = item.status === 'SOLD';
                    const isSkippedOrExcluded = item.status === 'SKIPPED' || item.status === 'EXCLUDED';
                    const franchise = item.winningFranchiseId
                      ? FRANCHISE_MAP.get(item.winningFranchiseId)
                      : null;

                    return (
                      <div
                        key={item.id}
                        className={`p-3 sm:p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors ${
                          isCurrent
                            ? 'bg-amber-500/10 border-l-4 border-amber-400'
                            : 'hover:bg-slate-900/80'
                        }`}
                      >
                        {/* Player details */}
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-xs font-bold text-slate-500 w-8 shrink-0">
                            #{originalIndex + 1}
                          </span>

                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-bold text-white text-xs sm:text-sm">
                                {item.player.canonicalName}
                              </span>

                              <span className="px-1.5 py-0.5 rounded text-[9px] font-black uppercase tracking-wider bg-slate-800 text-slate-300 border border-slate-700">
                                {item.player.primaryRole}
                              </span>

                              {item.player.isOverseas && (
                                <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                                  ✈️ {item.player.nationality}
                                </span>
                              )}

                              {/* STATUS BADGE */}
                              <span
                                className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                                  item.status === 'IN_AUCTION'
                                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 animate-pulse'
                                    : item.status === 'SOLD'
                                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                                    : item.status === 'UNSOLD'
                                    ? 'bg-slate-800 text-slate-400 border border-slate-700'
                                    : item.status === 'SKIPPED'
                                    ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                                    : item.status === 'EXCLUDED'
                                    ? 'bg-red-500/20 text-red-300 border border-red-500/40'
                                    : 'bg-slate-800 text-slate-300'
                                }`}
                              >
                                {item.status}
                              </span>
                            </div>

                            <div className="text-[11px] text-slate-400 flex items-center gap-3">
                              <span>Base: <strong className="text-slate-300">{formatRupees(item.basePrice)}</strong></span>
                              {isSold && franchise && (
                                <span className="text-amber-400 font-bold flex items-center gap-1">
                                  <span>Sold to {franchise.shortName} for {formatRupees(item.finalPrice || 0)}</span>
                                </span>
                              )}
                              {item.exclusionReason && (
                                <span className="text-red-400 italic">
                                  Reason: {item.exclusionReason}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* ORGANIZER ACTIONS */}
                        {isHost && (
                          <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-center">
                            {/* Pending actions */}
                            {isPending && (
                              <>
                                <button
                                  disabled={isLoading}
                                  onClick={() => callPoolApi('NOMINATE', { auctionPlayerId: item.id })}
                                  className="py-1 px-2.5 rounded-lg text-[10px] font-black bg-amber-500 hover:bg-amber-400 text-slate-950 shadow transition-all"
                                  title="Nominate immediately to hot seat"
                                >
                                  Nominate Now 🔨
                                </button>

                                <button
                                  disabled={isLoading || originalIndex <= room.currentPlayerIndex + 1}
                                  onClick={() => handleMoveQueueItem(originalIndex, 'UP')}
                                  className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 disabled:opacity-30 text-[10px]"
                                  title="Move Up"
                                >
                                  ▲
                                </button>
                                <button
                                  disabled={isLoading || originalIndex >= room.queue.length - 1}
                                  onClick={() => handleMoveQueueItem(originalIndex, 'DOWN')}
                                  className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 disabled:opacity-30 text-[10px]"
                                  title="Move Down"
                                >
                                  ▼
                                </button>

                                <button
                                  disabled={isLoading}
                                  onClick={() => {
                                    const reason = prompt('Exclusion reason (optional):', 'Tactical organizer exclusion');
                                    if (reason !== null) {
                                      callPoolApi('EXCLUDE', { auctionPlayerId: item.id, reason });
                                    }
                                  }}
                                  className="py-1 px-2 rounded-lg text-[10px] font-bold text-red-400 hover:bg-red-500/10 border border-red-500/20"
                                >
                                  Exclude 🚫
                                </button>

                                <button
                                  disabled={isLoading}
                                  onClick={() => {
                                    if (confirm(`Remove ${item.player.canonicalName} from this auction queue? (Master record remains intact)`)) {
                                      callPoolApi('REMOVE', { auctionPlayerId: item.id });
                                    }
                                  }}
                                  className="py-1 px-2 rounded-lg text-[10px] font-bold text-slate-400 hover:bg-slate-800"
                                >
                                  ✕ Remove
                                </button>
                              </>
                            )}

                            {/* In auction skip/exclude */}
                            {item.status === 'IN_AUCTION' && (
                              <>
                                <button
                                  disabled={isLoading}
                                  onClick={() => callPoolApi('SKIP', { autoRequeue: autoRequeueSkip })}
                                  className="py-1 px-2.5 rounded-lg text-[10px] font-bold bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 border border-purple-500/40"
                                >
                                  Skip ⏭
                                </button>
                                <button
                                  disabled={isLoading}
                                  onClick={() => {
                                    const reason = prompt('Exclusion reason:');
                                    if (reason !== null) {
                                      callPoolApi('EXCLUDE', { auctionPlayerId: item.id, reason });
                                    }
                                  }}
                                  className="py-1 px-2 rounded-lg text-[10px] font-bold text-red-400 hover:bg-red-500/10 border border-red-500/20"
                                >
                                  Exclude 🚫
                                </button>
                              </>
                            )}

                            {/* Restore skipped or excluded */}
                            {isSkippedOrExcluded && (
                              <button
                                disabled={isLoading}
                                onClick={() => callPoolApi('RESTORE', { auctionPlayerId: item.id, insertPosition: 'END' })}
                                className="py-1 px-2.5 rounded-lg text-[10px] font-bold bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 border border-blue-500/40"
                              >
                                Restore to Queue ↺
                              </button>
                            )}

                            {/* Reset sold player */}
                            {isSold && (
                              <button
                                disabled={isLoading}
                                onClick={() => {
                                  if (confirm(`Reset sale for ${item.player.canonicalName}? This refunds ${formatRupees(item.finalPrice || 0)} to the purchasing franchise and restores the player to pending status.`)) {
                                    callPoolApi('RESET', { auctionPlayerId: item.id });
                                  }
                                }}
                                className="py-1 px-2.5 rounded-lg text-[10px] font-bold bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30"
                              >
                                Reset Sale ⚠️
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: MASTER CATALOG (622 PLAYERS) */}
        {activeTab === 'catalog' && (
          <div className="flex-1 flex flex-col p-4 overflow-hidden">
            {/* Filter controls */}
            <div className="space-y-3 mb-4">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <input
                  type="text"
                  placeholder="Search 622 players by name, nationality, or IPL franchise..."
                  value={catalogSearch}
                  onChange={(e) => setCatalogSearch(e.target.value)}
                  className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      const selectable = filteredCatalog
                        .filter((p) => !queuePlayerIdMap.has(p.id))
                        .map((p) => p.id);
                      setSelectedPlayerIds(new Set(selectable));
                    }}
                    className="py-2 px-3 rounded-xl bg-slate-900 border border-slate-700 hover:border-slate-600 text-xs text-slate-300 font-semibold"
                  >
                    Select All Visible
                  </button>
                  <button
                    onClick={() => setSelectedPlayerIds(new Set())}
                    className="py-2 px-3 rounded-xl bg-slate-900 border border-slate-700 hover:border-slate-600 text-xs text-slate-400"
                  >
                    Clear
                  </button>
                </div>
              </div>

              {/* Filter Pills */}
              <div className="flex flex-wrap items-center gap-2 text-xs">
                {/* Role */}
                <select
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                  className="bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1 text-[11px] text-white focus:outline-none"
                >
                  <option value="ALL">All Roles</option>
                  <option value="BATTER">Batters</option>
                  <option value="BOWLER">Bowlers</option>
                  <option value="ALL_ROUNDER">All-Rounders</option>
                  <option value="WICKETKEEPER">Wicketkeepers</option>
                </select>

                {/* Nationality */}
                <select
                  value={nationalityFilter}
                  onChange={(e) => setNationalityFilter(e.target.value as any)}
                  className="bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1 text-[11px] text-white focus:outline-none"
                >
                  <option value="ALL">All Nationalities</option>
                  <option value="INDIAN">Indian Players</option>
                  <option value="OVERSEAS">Overseas Players</option>
                </select>

                {/* Capped */}
                <select
                  value={cappedFilter}
                  onChange={(e) => setCappedFilter(e.target.value as any)}
                  className="bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1 text-[11px] text-white focus:outline-none"
                >
                  <option value="ALL">All Status</option>
                  <option value="CAPPED">Capped International</option>
                  <option value="UNCAPPED">Uncapped Domestic</option>
                </select>

                {/* 2025 Affiliation */}
                <select
                  value={affiliationFilter}
                  onChange={(e) => setAffiliationFilter(e.target.value as any)}
                  className="bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1 text-[11px] text-white focus:outline-none"
                >
                  <option value="ALL">All 2025 Status</option>
                  <option value="RETAINED">Retained in 2025</option>
                  <option value="SOLD">Sold in 2025 Auction</option>
                  <option value="UNSOLD">Unsold in 2025</option>
                </select>

                <span className="text-[11px] text-slate-500 ml-auto">
                  Showing {filteredCatalog.length} of {VERIFIED_PLAYERS.length} players
                </span>
              </div>
            </div>

            {/* Catalog List */}
            <div className="flex-1 overflow-y-auto rounded-xl border border-slate-800 bg-slate-900/40">
              <div className="divide-y divide-slate-800/80">
                {filteredCatalog.slice(0, 200).map((player) => {
                  const inQueuePos = queuePlayerIdMap.get(player.id);
                  const isSelected = selectedPlayerIds.has(player.id);

                  return (
                    <div
                      key={player.id}
                      className={`p-3 flex items-center justify-between gap-3 transition-colors ${
                        inQueuePos ? 'opacity-65 bg-slate-900/20' : 'hover:bg-slate-900/80'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          disabled={Boolean(inQueuePos)}
                          checked={isSelected}
                          onChange={(e) => {
                            const next = new Set(selectedPlayerIds);
                            if (e.target.checked) next.add(player.id);
                            else next.delete(player.id);
                            setSelectedPlayerIds(next);
                          }}
                          className="w-4 h-4 rounded border-slate-700 text-amber-500 focus:ring-0 disabled:opacity-30 cursor-pointer"
                        />

                        <div>
                          <div className="flex items-center gap-2 mb-0.5">
                            <span className="font-bold text-white text-xs sm:text-sm">
                              {player.canonicalName}
                            </span>
                            <span className="px-1.5 py-0.5 rounded text-[9px] font-black uppercase tracking-wider bg-slate-800 text-slate-300">
                              {player.primaryRole}
                            </span>
                            {player.isOverseas ? (
                              <span className="text-[10px] text-blue-400 font-semibold">
                                ✈️ {player.nationality}
                              </span>
                            ) : (
                              <span className="text-[10px] text-slate-400">🇮🇳 India</span>
                            )}
                            <span className="text-[10px] text-slate-500">
                              Age {player.calculatedAge}
                            </span>
                          </div>

                          <div className="text-[11px] text-slate-400 flex flex-wrap items-center gap-2">
                            <span>Base: <strong className="text-amber-400">{formatRupees(player.defaultBasePrice)}</strong></span>
                            <span>• Matches: {player.stats.matches}</span>
                            <span>• Runs: {player.stats.runs}</span>
                            <span>• Wickets: {player.stats.wickets}</span>
                            {player.currentAffiliation?.latestConfirmedFranchise && (
                              <span className="text-slate-300">
                                • {player.currentAffiliation.latestConfirmedFranchise} ({player.currentAffiliation.franchiseAffiliationStatus})
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="shrink-0">
                        {inQueuePos ? (
                          <span className="px-2 py-1 rounded-lg text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                            ✓ In Queue (#{inQueuePos})
                          </span>
                        ) : (
                          <button
                            disabled={isLoading}
                            onClick={() => callPoolApi('ADD', { playerIds: [player.id] })}
                            className="py-1 px-3 rounded-lg text-[11px] font-bold bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-slate-200 border border-slate-700 transition-all"
                          >
                            + Add to Queue
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* STICKY BULK ACTION BAR */}
            {selectedPlayerIds.size > 0 && (
              <div className="mt-4 p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between gap-4 animate-fade-in">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-amber-400">
                    {selectedPlayerIds.size} players selected
                  </span>
                  <span className="text-xs text-slate-400">
                    Ready to append to auction queue.
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSelectedPlayerIds(new Set())}
                    className="py-1.5 px-3 rounded-lg text-xs font-bold text-slate-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    disabled={isLoading}
                    onClick={handleAddSelectedToQueue}
                    className="py-2 px-5 rounded-xl font-black text-xs text-slate-950 bg-gradient-to-r from-amber-400 to-yellow-300 hover:from-amber-300 hover:to-yellow-200 shadow-lg shadow-amber-500/20 transition-all"
                  >
                    Add {selectedPlayerIds.size} Players to Queue 🎯
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: IMPORT / EXPORT & PRESETS */}
        {activeTab === 'presets' && (
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
            {/* Team Aligned Full Pool Presets */}
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-black text-amber-400">Official Team-Aligned Player Pools</h3>
                  <p className="text-xs text-slate-300">
                    Curated across past 5 seasons of IPL performance and organized into official broadcast sets.
                  </p>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-400/20 text-amber-300">
                  Recommended
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-700 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-black uppercase text-amber-400 tracking-wider">10 Teams</span>
                    <h4 className="text-xs font-black text-white mt-0.5">Mega Auction (300)</h4>
                    <p className="text-[11px] text-slate-400 mt-1">250 squad slots + 50 buffer. Full role depth across all 10 franchises.</p>
                  </div>
                  <button
                    disabled={isLoading}
                    onClick={() => handleAddCuratedPack('MEGA_300', true)}
                    className="mt-3 w-full py-1.5 px-3 rounded-lg text-xs font-bold bg-amber-500 text-slate-950 hover:bg-amber-400 cursor-pointer transition-all"
                  >
                    Load 300 Players
                  </button>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-700 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-black uppercase text-blue-400 tracking-wider">6–8 Teams</span>
                    <h4 className="text-xs font-black text-white mt-0.5">Championship (200)</h4>
                    <p className="text-[11px] text-slate-400 mt-1">High-density capped stars and top international match-winners.</p>
                  </div>
                  <button
                    disabled={isLoading}
                    onClick={() => handleAddCuratedPack('CHAMPIONSHIP_200', true)}
                    className="mt-3 w-full py-1.5 px-3 rounded-lg text-xs font-bold bg-blue-500 text-slate-950 hover:bg-blue-400 cursor-pointer transition-all"
                  >
                    Load 200 Players
                  </button>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-700 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-black uppercase text-emerald-400 tracking-wider">4–5 Teams</span>
                    <h4 className="text-xs font-black text-white mt-0.5">Blitz Pool (150)</h4>
                    <p className="text-[11px] text-slate-400 mt-1">Superstar concentration for 4–5 teams (100–125 squad slots + buffer).</p>
                  </div>
                  <button
                    disabled={isLoading}
                    onClick={() => handleAddCuratedPack('BLITZ_150', true)}
                    className="mt-3 w-full py-1.5 px-3 rounded-lg text-xs font-bold bg-emerald-500 text-slate-950 hover:bg-emerald-400 cursor-pointer transition-all"
                  >
                    Load 150 Players
                  </button>
                </div>
              </div>
            </div>

            {/* Curated Preset Packs */}
            <div>
              <h3 className="text-sm font-bold text-white mb-2">1-Click Curated Category Packs</h3>
              <p className="text-xs text-slate-400 mb-4">
                Instantly populate your auction pool with verified official candidate sets.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-amber-500/50 transition-all flex flex-col justify-between">
                  <div>
                    <h4 className="text-xs font-black text-amber-400 mb-1">⭐ 2025 Marquee Star Pack</h4>
                    <p className="text-[11px] text-slate-400 mb-3">
                      High-impact superstar marquee set: Rishabh Pant, Shreyas Iyer, Mitchell Starc, Pat Cummins, KL Rahul, Arshdeep Singh, and Jos Buttler.
                    </p>
                  </div>
                  <button
                    disabled={isLoading}
                    onClick={() => handleAddCuratedPack('MARQUEE')}
                    className="py-1.5 px-3 rounded-lg text-xs font-bold bg-amber-500 text-slate-950 hover:bg-amber-400"
                  >
                    Load Marquee Stars
                  </button>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-amber-500/50 transition-all flex flex-col justify-between">
                  <div>
                    <h4 className="text-xs font-black text-blue-400 mb-1">🔒 All 2025 Retained Players</h4>
                    <p className="text-[11px] text-slate-400 mb-3">
                      All 46 official franchise retentions announced on October 31, 2024 (Kohli, Rohit, Bumrah, Jadeja, Russell, Klaasen, etc.).
                    </p>
                  </div>
                  <button
                    disabled={isLoading}
                    onClick={() => handleAddCuratedPack('RETAINED_2025')}
                    className="py-1.5 px-3 rounded-lg text-xs font-bold bg-blue-500 text-slate-950 hover:bg-blue-400"
                  >
                    Load 46 Retained Players
                  </button>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-amber-500/50 transition-all flex flex-col justify-between">
                  <div>
                    <h4 className="text-xs font-black text-emerald-400 mb-1">🏏 Top 30 Capped Batters</h4>
                    <p className="text-[11px] text-slate-400 mb-3">
                      Elite international top-order and middle-order specialist batters with high historical strike rates.
                    </p>
                  </div>
                  <button
                    disabled={isLoading}
                    onClick={() => handleAddCuratedPack('TOP_BATTERS')}
                    className="py-1.5 px-3 rounded-lg text-xs font-bold bg-emerald-500 text-slate-950 hover:bg-emerald-400"
                  >
                    Load 30 Batters
                  </button>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-amber-500/50 transition-all flex flex-col justify-between">
                  <div>
                    <h4 className="text-xs font-black text-purple-400 mb-1">⚡ Top 30 Bowlers</h4>
                    <p className="text-[11px] text-slate-400 mb-3">
                      Premier fast bowlers and mystery spinners from official 2025 auction sets.
                    </p>
                  </div>
                  <button
                    disabled={isLoading}
                    onClick={() => handleAddCuratedPack('TOP_BOWLERS')}
                    className="py-1.5 px-3 rounded-lg text-xs font-bold bg-purple-500 text-slate-950 hover:bg-purple-400"
                  >
                    Load 30 Bowlers
                  </button>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-amber-500/50 transition-all flex flex-col justify-between">
                  <div>
                    <h4 className="text-xs font-black text-amber-300 mb-1">🔄 Top 30 All-Rounders</h4>
                    <p className="text-[11px] text-slate-400 mb-3">
                      Proven high-utility match-winners capable of scoring death runs and bowling 4 overs.
                    </p>
                  </div>
                  <button
                    disabled={isLoading}
                    onClick={() => handleAddCuratedPack('TOP_ALLROUNDERS')}
                    className="py-1.5 px-3 rounded-lg text-xs font-bold bg-amber-400 text-slate-950 hover:bg-amber-300"
                  >
                    Load 30 All-Rounders
                  </button>
                </div>
              </div>
            </div>

            {/* EXPORT SECTION */}
            <div className="pt-4 border-t border-slate-800">
              <h3 className="text-sm font-bold text-white mb-2">Export Current Auction Pool</h3>
              <p className="text-xs text-slate-400 mb-4">
                Export all current queue entries, prices, and status for external reporting or offline record-keeping.
              </p>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={handleExportJson}
                  className="py-2.5 px-4 rounded-xl border border-slate-700 bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-bold flex items-center gap-2 transition-all"
                >
                  <span>📦 Export as JSON</span>
                </button>

                <button
                  onClick={handleExportCsv}
                  className="py-2.5 px-4 rounded-xl border border-slate-700 bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-bold flex items-center gap-2 transition-all"
                >
                  <span>📊 Export as CSV Catalog</span>
                </button>
              </div>
            </div>

            {/* IMPORT SECTION */}
            <div className="pt-4 border-t border-slate-800">
              <h3 className="text-sm font-bold text-white mb-2">Import Custom Auction Pool</h3>
              <p className="text-xs text-slate-400 mb-3">
                Paste a JSON array of player IDs (e.g. <code className="text-amber-400 font-mono">["vkohli-18", "rpant-17", "mstarc-56"]</code>) or an exported pool payload.
              </p>

              <textarea
                rows={4}
                value={importJsonText}
                onChange={(e) => setImportJsonText(e.target.value)}
                placeholder='["rpant-17", "shreyas-iyer-02", "mstarc-56"]'
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs font-mono text-white placeholder-slate-600 focus:outline-none focus:border-amber-400 mb-3"
              />

              <div className="flex flex-wrap items-center justify-between gap-3">
                <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={importReplacePending}
                    onChange={(e) => setImportReplacePending(e.target.checked)}
                    className="w-4 h-4 rounded border-slate-700 text-amber-500 focus:ring-0"
                  />
                  <span>Replace un-started pending players (keep completed sold/unsold)</span>
                </label>

                <button
                  disabled={isLoading || !importJsonText.trim()}
                  onClick={handleImportJson}
                  className="py-2.5 px-5 rounded-xl font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs disabled:opacity-40 shadow transition-all"
                >
                  Import Custom Pool 📥
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
