import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { VERIFIED_PLAYERS, Player } from '@/data/players';
import { getCuratedAuctionPool } from '@/data/curated-pools';
import { IPL_FRANCHISES, Franchise, FRANCHISE_MAP } from '@/data/franchises';

// Pre-index curated sets for queue item metadata
const curatedSetLookup = new Map<string, { setGroup: string; setName: string }>();
try {
  getCuratedAuctionPool(300).forEach((item) => {
    curatedSetLookup.set(item.player.id, {
      setGroup: item.setGroup,
      setName: item.setName,
    });
  });
} catch {}
import { getNextMinimumBid, CRORE } from './currency';
import { evaluateSquad, rankAllSquads, TeamEvaluation } from './analytics';
import {
  persistRoomToSupabase,
  persistBidToSupabase,
  persistReportToSupabase,
} from './supabase';
import {
  AuctionRoomState,
  RoomConfiguration,
  RoomParticipant,
  AuctionPlayerItem,
  BidRecord,
  FranchiseSquadState,
  AuctionEvent,
  AuctionReportData,
} from './types';

function generateUUID(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

// Single Persistence Storage Path (Render disk /var/data or local project ./data)
const DATA_DIR =
  process.env.DATA_DIR ||
  (fs.existsSync('/var/data') ? '/var/data' : path.join(process.cwd(), 'data'));
const STATE_FILE = path.join(DATA_DIR, 'auction-state.json');

declare global {
  // eslint-disable-next-line no-var
  var __auctionRoomsByCode: Map<string, AuctionRoomState> | undefined;
  // eslint-disable-next-line no-var
  var __auctionReportsBySlug: Map<string, AuctionReportData> | undefined;
  // eslint-disable-next-line no-var
  var __auctionProcessedCommandIds: Set<string> | undefined;
}

// In-Memory Authoritative Store with global persistence across Next.js re-evaluations
const roomsByCode =
  globalThis.__auctionRoomsByCode ?? new Map<string, AuctionRoomState>();
globalThis.__auctionRoomsByCode = roomsByCode;

const reportsBySlug =
  globalThis.__auctionReportsBySlug ?? new Map<string, AuctionReportData>();
globalThis.__auctionReportsBySlug = reportsBySlug;

const processedCommandIds =
  globalThis.__auctionProcessedCommandIds ?? new Set<string>();
globalThis.__auctionProcessedCommandIds = processedCommandIds;

/**
 * Robust room lookup that checks memory first, then falls back to disk reload
 */
function findRoom(roomCode: string): AuctionRoomState | null {
  const code = (roomCode || '').trim().toUpperCase();
  if (!code) return null;
  let room = roomsByCode.get(code);
  if (!room) {
    loadStateFromDisk();
    room = roomsByCode.get(code);
  }
  return room || null;
}

/**
 * Saves in-memory state snapshot to disk for persistent single-instance durability
 */
function persistStateToDisk(): void {
  if (process.env.NODE_ENV === 'test') return;
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    const payload = {
      savedAt: new Date().toISOString(),
      rooms: Array.from(roomsByCode.entries()),
      reports: Array.from(reportsBySlug.entries()),
      processedCommandIds: Array.from(processedCommandIds),
    };
    const tmp = `${STATE_FILE}.tmp`;
    fs.writeFileSync(tmp, JSON.stringify(payload), 'utf8');
    fs.renameSync(tmp, STATE_FILE);
  } catch {
    // In serverless read-only contexts, disk persistence gracefully falls back
  }
}

/**
 * Loads stored state snapshot from disk on system boot
 */
function loadStateFromDisk(): void {
  if (process.env.NODE_ENV === 'test') return;
  try {
    if (fs.existsSync(STATE_FILE)) {
      const raw = fs.readFileSync(STATE_FILE, 'utf8');
      const data = JSON.parse(raw);
      if (Array.isArray(data.rooms)) {
        for (const [code, r] of data.rooms) {
          const existing = roomsByCode.get(code);
          if (!existing || (r.events && existing.events && r.events.length >= existing.events.length)) {
            roomsByCode.set(code, r);
          }
        }
      }
      if (Array.isArray(data.reports)) {
        for (const [slug, rep] of data.reports) {
          if (!reportsBySlug.has(slug)) {
            reportsBySlug.set(slug, rep);
          }
        }
      }
      if (Array.isArray(data.processedCommandIds)) {
        for (const cmd of data.processedCommandIds) {
          processedCommandIds.add(cmd);
        }
      }
    }
  } catch {
    // Graceful fallback if file is empty or corrupted
  }
}

loadStateFromDisk();

// Pre-seed a permanent verified sample report for instant demo inspection
function seedSampleReport() {
  const sampleSlug = 'sample-mega-auction-2024';
  const csk = FRANCHISE_MAP.get('csk')!;
  const mi = FRANCHISE_MAP.get('mi')!;
  const rcb = FRANCHISE_MAP.get('rcb')!;
  const kkr = FRANCHISE_MAP.get('kkr')!;

  const kohli = VERIFIED_PLAYERS.find((p) => p.id === 'vkohli-18')!;
  const bumrah = VERIFIED_PLAYERS.find((p) => p.id === 'jbumrah-93')!;
  const rohit = VERIFIED_PLAYERS.find((p) => p.id === 'rsharma-45')!;
  const surya = VERIFIED_PLAYERS.find((p) => p.id === 'syadav-63')!;
  const dhoni = VERIFIED_PLAYERS.find((p) => p.id === 'msdhoni-07')!;
  const jadeja = VERIFIED_PLAYERS.find((p) => p.id === 'rjadeja-08')!;
  const russell = VERIFIED_PLAYERS.find((p) => p.id === 'arussell-12')!;
  const starc = VERIFIED_PLAYERS.find((p) => p.id === 'mstarc-56')!;

  const sampleSquads: Record<string, FranchiseSquadState> = {};
  for (const f of IPL_FRANCHISES) {
    sampleSquads[f.id] = {
      franchiseId: f.id,
      franchise: f,
      startingPurse: 120 * CRORE,
      spentAmount: 0,
      remainingPurse: 120 * CRORE,
      players: [],
      overseasCount: 0,
    };
  }

  // Populate sample purchases
  sampleSquads['rcb'].players.push({ player: kohli, price: 21 * CRORE, boughtAt: new Date().toISOString() });
  sampleSquads['rcb'].spentAmount += 21 * CRORE;
  sampleSquads['rcb'].remainingPurse -= 21 * CRORE;

  sampleSquads['mi'].players.push(
    { player: rohit, price: 16 * CRORE, boughtAt: new Date().toISOString() },
    { player: bumrah, price: 18 * CRORE, boughtAt: new Date().toISOString() },
    { player: surya, price: 14 * CRORE, boughtAt: new Date().toISOString() }
  );
  sampleSquads['mi'].spentAmount += 48 * CRORE;
  sampleSquads['mi'].remainingPurse -= 48 * CRORE;

  sampleSquads['csk'].players.push(
    { player: dhoni, price: 12 * CRORE, boughtAt: new Date().toISOString() },
    { player: jadeja, price: 15 * CRORE, boughtAt: new Date().toISOString() }
  );
  sampleSquads['csk'].spentAmount += 27 * CRORE;
  sampleSquads['csk'].remainingPurse -= 27 * CRORE;

  sampleSquads['kkr'].players.push(
    { player: russell, price: 16 * CRORE, boughtAt: new Date().toISOString() },
    { player: starc, price: 24.75 * CRORE, boughtAt: new Date().toISOString() }
  );
  sampleSquads['kkr'].spentAmount += 40.75 * CRORE;
  sampleSquads['kkr'].remainingPurse -= 40.75 * CRORE;
  sampleSquads['kkr'].overseasCount = 2;

  const evals = IPL_FRANCHISES.map((f) =>
    evaluateSquad(f, sampleSquads[f.id].players.map((p) => ({ player: p.player, purchasePrice: p.price, boughtAt: p.boughtAt })), 120 * CRORE)
  );
  const ranked = rankAllSquads(evals);

  reportsBySlug.set(sampleSlug, {
    roomCode: 'SAMPLE',
    reportSlug: sampleSlug,
    createdAt: new Date().toISOString(),
    config: {
      startingPurse: 120 * CRORE,
      minSquadSize: 18,
      maxSquadSize: 25,
      maxOverseas: 8,
      bidTimerSeconds: 20,
    },
    rankings: ranked,
    allSquads: sampleSquads,
    allSoldPlayers: [
      { player: starc, franchiseId: 'kkr', franchiseName: 'Kolkata Knight Riders', price: 24.75 * CRORE },
      { player: kohli, franchiseId: 'rcb', franchiseName: 'Royal Challengers Bengaluru', price: 21 * CRORE },
      { player: bumrah, franchiseId: 'mi', franchiseName: 'Mumbai Indians', price: 18 * CRORE },
      { player: rohit, franchiseId: 'mi', franchiseName: 'Mumbai Indians', price: 16 * CRORE },
      { player: russell, franchiseId: 'kkr', franchiseName: 'Kolkata Knight Riders', price: 16 * CRORE },
      { player: jadeja, franchiseId: 'csk', franchiseName: 'Chennai Super Kings', price: 15 * CRORE },
      { player: surya, franchiseId: 'mi', franchiseName: 'Mumbai Indians', price: 14 * CRORE },
      { player: dhoni, franchiseId: 'csk', franchiseName: 'Chennai Super Kings', price: 12 * CRORE },
    ],
    unsoldPlayers: [],
    stats: {
      totalSpent: 136.75 * CRORE,
      totalPlayersSold: 8,
      highestBidPlayer: {
        player: starc,
        price: 24.75 * CRORE,
        franchiseId: 'kkr',
      },
      mostActiveFranchiseId: 'mi',
    },
  });
}

seedSampleReport();

const DEFAULT_CONFIG: RoomConfiguration = {
  startingPurse: 120 * CRORE,
  minSquadSize: 18,
  maxSquadSize: 25,
  maxOverseas: 8,
  bidTimerSeconds: 20,
  auctionPoolSize: 300,
};

function generateRoomCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

function generateReportSlug(roomCode: string): string {
  const rand = Math.random().toString(36).substring(2, 7);
  return `ipl-auction-${roomCode.toLowerCase()}-${rand}`;
}

export class AuctionStore {
  /**
   * Creates a new auction room
   */
  static createRoom(
    hostDisplayName: string,
    customConfig?: Partial<RoomConfiguration>
  ): { room: AuctionRoomState; hostToken: string } {
    // Capacity Enforcement (allows up to 50 concurrent active rooms by default)
    if (process.env.NODE_ENV !== 'test') {
      const maxActiveRooms = parseInt(process.env.MAX_CONCURRENT_ROOMS || '50', 10);
      const activeRooms = Array.from(roomsByCode.values()).filter(
        (r) => r.status === 'ACTIVE' || r.status === 'LOBBY'
      );
      if (activeRooms.length >= maxActiveRooms) {
        // Auto-purge abandoned lobbies older than 1 hour to free slots
        const oneHourAgo = Date.now() - 60 * 60 * 1000;
        let purged = false;
        for (const oldRoom of activeRooms) {
          if (oldRoom.status === 'LOBBY' && new Date(oldRoom.createdAt).getTime() < oneHourAgo) {
            roomsByCode.delete(oldRoom.roomCode);
            purged = true;
            break;
          }
        }

        if (!purged && activeRooms.length >= maxActiveRooms) {
          throw new Error(
            `Capacity limit reached: Maximum ${maxActiveRooms} concurrent auction houses are currently running. Please wait for an active auction to conclude or join an existing room.`
          );
        }
      }
    }

    let roomCode = generateRoomCode();
    while (roomsByCode.has(roomCode)) {
      roomCode = generateRoomCode();
    }

    const hostToken = `host_${Math.random().toString(36).substring(2)}_${Date.now()}`;
    const roomId = generateUUID();
    const config: RoomConfiguration = { ...DEFAULT_CONFIG, ...customConfig };

    // Initial squads for all 10 franchises
    const squads: Record<string, FranchiseSquadState> = {};
    for (const f of IPL_FRANCHISES) {
      squads[f.id] = {
        franchiseId: f.id,
        franchise: f,
        startingPurse: config.startingPurse,
        spentAmount: 0,
        remainingPurse: config.startingPurse,
        players: [],
        overseasCount: 0,
      };
    }

    // Initial player queue from curated 5-year analyzed sets (respects pool size: 150, 200, 300)
    const requestedPool =
      config.auctionPoolSize && config.auctionPoolSize > 0
        ? config.auctionPoolSize
        : 300;
    const curatedEntries = getCuratedAuctionPool(requestedPool);

    const queue: AuctionPlayerItem[] = curatedEntries.map((entry, idx) => ({
      id: generateUUID(),
      roomId,
      playerId: entry.player.id,
      player: entry.player,
      queuePosition: idx,
      status: 'PENDING',
      basePrice: entry.player.defaultBasePrice,
      finalPrice: null,
      winningFranchiseId: null,
      soldAt: null,
      setGroup: entry.setGroup,
      setName: entry.setName,
    }));

    const hostParticipant: RoomParticipant = {
      id: generateUUID(),
      roomId,
      sessionToken: hostToken,
      displayName: hostDisplayName || 'Auctioneer (Host)',
      franchiseId: null,
      role: 'HOST',
      isConnected: true,
      joinedAt: new Date().toISOString(),
    };

    const initialEvent: AuctionEvent = {
      id: generateUUID(),
      roomId,
      sequenceNumber: 1,
      eventType: 'ROOM_CREATED',
      payload: { roomCode, hostDisplayName, config },
      createdAt: new Date().toISOString(),
    };

    const room: AuctionRoomState = {
      id: roomId,
      roomCode,
      hostSessionToken: hostToken,
      status: 'LOBBY',
      config,
      participants: [hostParticipant],
      queue,
      currentPlayerIndex: 0,
      currentBidAmount: 0,
      currentBidFranchiseId: null,
      timerDeadlineAt: null,
      serverTime: Date.now(),
      squads,
      recentBids: [],
      events: [initialEvent],
      reportSlug: null,
      createdAt: new Date().toISOString(),
      completedAt: null,
    };

    roomsByCode.set(roomCode, room);
    persistStateToDisk();
    persistRoomToSupabase(room).catch((e) => console.error('Supabase room sync:', e));
    return { room, hostToken };
  }

  /**
   * Retrieves authoritative room state
   */
  static getRoom(roomCode: string): AuctionRoomState | null {
    const room = findRoom(roomCode);
    if (!room) return null;

    // Check if active auction timer has expired on server
    if (room.status === 'ACTIVE' && room.timerDeadlineAt && Date.now() >= room.timerDeadlineAt) {
      this.autoFinalizeCurrentPlayer(room);
    }

    // Attach fresh server timestamp
    return {
      ...room,
      serverTime: Date.now(),
    };
  }

  /**
   * Joins a room with a display name and session token
   */
  static joinRoom(
    roomCode: string,
    displayName: string,
    existingSessionToken?: string
  ): { room: AuctionRoomState; participant: RoomParticipant; sessionToken: string } {
    const code = (roomCode || '').trim().toUpperCase();
    const room = findRoom(code);
    if (!room) {
      throw new Error(`Room with code "${code}" does not exist.`);
    }

    let token = existingSessionToken;
    let participant: RoomParticipant | undefined;

    if (token) {
      participant = room.participants.find((p) => p.sessionToken === token);
    }

    if (participant) {
      participant.isConnected = true;
      participant.displayName = displayName || participant.displayName;
    } else {
      token = `usr_${Math.random().toString(36).substring(2)}_${Date.now()}`;
      const isHost = token === room.hostSessionToken;

      participant = {
        id: `p_${token}`,
        roomId: room.id,
        sessionToken: token,
        displayName: displayName || (isHost ? 'Host' : `Player ${room.participants.length + 1}`),
        franchiseId: null,
        role: isHost ? 'HOST' : 'OWNER',
        isConnected: true,
        joinedAt: new Date().toISOString(),
      };

      room.participants.push(participant);

      this.addEvent(room, 'PARTICIPANT_JOINED', {
        displayName: participant.displayName,
        role: participant.role,
      });
    }

    persistStateToDisk();
    persistRoomToSupabase(room).catch((e) => console.error('Supabase room sync:', e));

    return {
      room: { ...room, serverTime: Date.now() },
      participant,
      sessionToken: token!,
    };
  }

  /**
   * Selects an available IPL franchise for a participant
   */
  static selectFranchise(
    roomCode: string,
    sessionToken: string,
    franchiseId: string | null
  ): AuctionRoomState {
    const room = findRoom(roomCode);
    if (!room) throw new Error('Room not found');

    const participant = room.participants.find((p) => p.sessionToken === sessionToken);
    if (!participant) throw new Error('Participant not in room');

    if (franchiseId) {
      // Check if valid franchise
      if (!FRANCHISE_MAP.has(franchiseId)) {
        throw new Error(`Invalid franchise ID: ${franchiseId}`);
      }

      // Check if already claimed by someone else
      const existingOwner = room.participants.find(
        (p) => p.franchiseId === franchiseId && p.sessionToken !== sessionToken
      );
      if (existingOwner) {
        throw new Error(
          `Franchise ${FRANCHISE_MAP.get(franchiseId)?.name} is already claimed by ${existingOwner.displayName}`
        );
      }
    }

    participant.franchiseId = franchiseId;

    this.addEvent(room, 'FRANCHISE_SELECTED', {
      displayName: participant.displayName,
      franchiseId,
    });

    persistStateToDisk();
    persistRoomToSupabase(room).catch((e) => console.error('Supabase room sync:', e));

    return { ...room, serverTime: Date.now() };
  }

  /**
   * Starts the auction (Host only)
   */
  static startAuction(roomCode: string, sessionToken: string): AuctionRoomState {
    const room = findRoom(roomCode);
    if (!room) throw new Error('Room not found');

    if (room.hostSessionToken !== sessionToken) {
      throw new Error('Only the room host can start the auction.');
    }

    if (room.status !== 'LOBBY') {
      throw new Error(`Auction already started (status: ${room.status})`);
    }

    room.status = 'ACTIVE';
    room.currentPlayerIndex = 0;

    if (room.queue.length > 0) {
      room.queue[0].status = 'IN_AUCTION';
      room.currentBidAmount = 0;
      room.currentBidFranchiseId = null;
      room.timerDeadlineAt = Date.now() + room.config.bidTimerSeconds * 1000;
    }

    this.addEvent(room, 'AUCTION_STARTED', {
      firstPlayer: room.queue[0]?.player.canonicalName,
      timerSeconds: room.config.bidTimerSeconds,
    });

    persistStateToDisk();
    persistRoomToSupabase(room).catch((e) => console.error('Supabase room sync:', e));

    return { ...room, serverTime: Date.now() };
  }

  /**
   * Places a validated server-authoritative bid
   */
  static placeBid(
    roomCode: string,
    sessionToken: string,
    franchiseId: string,
    amount: number,
    commandId: string
  ): AuctionRoomState {
    const room = findRoom(roomCode);
    if (!room) throw new Error('Room not found');

    // 1. Check idempotency (scoped to room)
    const scopedCommandKey = `${roomCode.toUpperCase()}:${commandId}`;
    if (processedCommandIds.has(scopedCommandKey)) {
      return { ...room, serverTime: Date.now() };
    }

    // 2. Room must be ACTIVE
    if (room.status !== 'ACTIVE') {
      throw new Error(`Cannot bid when auction is in ${room.status} state.`);
    }

    // 3. Deadline check (with 500ms network tolerance)
    if (room.timerDeadlineAt && Date.now() > room.timerDeadlineAt + 500) {
      throw new Error('Bid rejected: Timer deadline has expired.');
    }

    // 4. Participant ownership check
    const participant = room.participants.find((p) => p.sessionToken === sessionToken);
    if (!participant) {
      throw new Error('Unauthorized: Participant not found.');
    }

    // Hosts can bid on behalf of an unclaimed franchise or participant must own the franchise
    const isHost = room.hostSessionToken === sessionToken;
    if (participant.franchiseId !== franchiseId && !isHost) {
      throw new Error(`Unauthorized: You do not manage franchise ${franchiseId}.`);
    }

    // 5. Current player check
    const currentPlayer = room.queue[room.currentPlayerIndex];
    if (!currentPlayer || currentPlayer.status !== 'IN_AUCTION') {
      throw new Error('No active player in the hot seat.');
    }

    // 6. Minimum valid bid check
    const minBid = getNextMinimumBid(room.currentBidAmount, currentPlayer.basePrice);
    if (amount < minBid) {
      throw new Error(
        `Bid amount (${amount}) is below the required minimum next bid (${minBid}).`
      );
    }

    // 7. Anti-self-bidding: Cannot raise when already holding the current highest bid
    if (room.currentBidAmount > 0 && room.currentBidFranchiseId === franchiseId) {
      throw new Error('Your franchise already holds the highest bid.');
    }

    // 8. Purse check
    const squad = room.squads[franchiseId];
    if (!squad) throw new Error('Invalid franchise squad.');

    if (amount > squad.remainingPurse) {
      throw new Error(
        `Insufficient purse: Franchise has ${squad.remainingPurse} remaining, bid requires ${amount}.`
      );
    }

    // 8. Overseas limit check
    if (currentPlayer.player.isOverseas && squad.overseasCount >= room.config.maxOverseas) {
      throw new Error(
        `Overseas limit reached: Max ${room.config.maxOverseas} overseas players allowed.`
      );
    }

    // 9. Max squad size check
    if (squad.players.length >= room.config.maxSquadSize) {
      throw new Error(
        `Squad size limit reached: Maximum ${room.config.maxSquadSize} players allowed.`
      );
    }

    // Bid accepted! Apply authoritative state updates:
    processedCommandIds.add(scopedCommandKey);
    room.currentBidAmount = amount;
    room.currentBidFranchiseId = franchiseId;

    // Timer Extension Rule:
    // Respects custom bid timer (5s, 10s, 20s, 30s, etc.) proportionally
    const timerSec = room.config.bidTimerSeconds || 20;
    const now = Date.now();
    const remainingTime = (room.timerDeadlineAt || now) - now;
    const thresholdMs = Math.min(10000, Math.floor((timerSec * 1000) / 2));
    const extensionMs = Math.min(
      timerSec * 1000,
      Math.max(5000, Math.floor(timerSec * 1000 * 0.75))
    );
    if (remainingTime < thresholdMs) {
      room.timerDeadlineAt = now + extensionMs;
    }

    const bidRecord: BidRecord = {
      id: generateUUID(),
      roomId: room.id,
      auctionPlayerId: currentPlayer.id,
      franchiseId,
      sessionToken,
      amount,
      commandId,
      createdAt: new Date().toISOString(),
    };

    room.recentBids.unshift(bidRecord);
    if (room.recentBids.length > 30) {
      room.recentBids.pop();
    }

    this.addEvent(room, 'BID_PLACED', {
      playerName: currentPlayer.player.canonicalName,
      franchiseId,
      amount,
      newDeadline: room.timerDeadlineAt,
    });

    persistStateToDisk();
    persistRoomToSupabase(room).catch((e) => console.error('Supabase room sync:', e));
    persistBidToSupabase(room.id, currentPlayer.id, bidRecord).catch((e) =>
      console.error('Supabase bid sync:', e)
    );

    return { ...room, serverTime: Date.now() };
  }

  /**
   * Finalizes the current player in auction (sells to highest bidder or marks unsold)
   */
  static finalizePlayer(
    roomCode: string,
    sessionToken: string,
    targetAuctionPlayerId?: string
  ): AuctionRoomState {
    const room = findRoom(roomCode);
    if (!room) throw new Error('Room not found');

    const isHost = room.hostSessionToken === sessionToken;
    if (!isHost) {
      throw new Error('Only the host can manually finalize or sell a player.');
    }

    const currentPlayer = room.queue[room.currentPlayerIndex];
    if (!currentPlayer || currentPlayer.status !== 'IN_AUCTION') {
      return { ...room, serverTime: Date.now() };
    }

    // TARGET GUARD: Prevent double-skip/double-finalize race conditions
    if (targetAuctionPlayerId && currentPlayer.id !== targetAuctionPlayerId) {
      return { ...room, serverTime: Date.now() };
    }

    this.autoFinalizeCurrentPlayer(room, true);
    return { ...room, serverTime: Date.now() };
  }

  /**
   * Internal auto-finalization triggered by timer expiration or host action
   */
  private static autoFinalizeCurrentPlayer(room: AuctionRoomState, force: boolean = false): void {
    if (room.status !== 'ACTIVE') return;

    const currentPlayer = room.queue[room.currentPlayerIndex];
    if (!currentPlayer || currentPlayer.status !== 'IN_AUCTION') return;

    // Safety guard against double-expiration race conditions:
    // If not explicitly forced by host, the active timer MUST have genuinely expired
    if (!force && room.timerDeadlineAt && Date.now() < room.timerDeadlineAt) {
      return;
    }

    if (room.currentBidAmount > 0 && room.currentBidFranchiseId) {
      // SOLD!
      const winningFranchiseId = room.currentBidFranchiseId;
      const finalPrice = room.currentBidAmount;

      currentPlayer.status = 'SOLD';
      currentPlayer.finalPrice = finalPrice;
      currentPlayer.winningFranchiseId = winningFranchiseId;
      currentPlayer.soldAt = new Date().toISOString();
      currentPlayer.lastUpdatedAt = new Date().toISOString();

      const squad = room.squads[winningFranchiseId];
      if (squad) {
        squad.spentAmount += finalPrice;
        squad.remainingPurse = Math.max(0, squad.startingPurse - squad.spentAmount);
        squad.players.push({
          player: currentPlayer.player,
          price: finalPrice,
          boughtAt: currentPlayer.soldAt,
        });
        if (currentPlayer.player.isOverseas) {
          squad.overseasCount += 1;
        }
      }

      this.addEvent(room, 'PLAYER_SOLD', {
        player: currentPlayer.player.canonicalName,
        franchiseId: winningFranchiseId,
        price: finalPrice,
      });
    } else {
      // UNSOLD!
      currentPlayer.status = 'UNSOLD';
      currentPlayer.lastUpdatedAt = new Date().toISOString();
      this.addEvent(room, 'PLAYER_UNSOLD', {
        player: currentPlayer.player.canonicalName,
      });
    }

    // Advance to next eligible player or finish auction
    room.currentBidAmount = 0;
    room.currentBidFranchiseId = null;

    this.advanceToNextEligiblePlayer(room);

    persistStateToDisk();
    persistRoomToSupabase(room).catch((e) => console.error('Supabase room sync:', e));
  }

  /**
   * Advances the auction hot seat to the next eligible PENDING player
   */
  private static advanceToNextEligiblePlayer(room: AuctionRoomState): void {
    let nextIdx = -1;
    // Search forward from current index + 1
    for (let i = room.currentPlayerIndex + 1; i < room.queue.length; i++) {
      if (room.queue[i].status === 'PENDING') {
        nextIdx = i;
        break;
      }
    }

    // Wrap around to search from start of queue if not found forward
    if (nextIdx === -1) {
      for (let i = 0; i < room.queue.length; i++) {
        if (room.queue[i].status === 'PENDING') {
          nextIdx = i;
          break;
        }
      }
    }

    if (nextIdx !== -1) {
      room.currentPlayerIndex = nextIdx;
      room.queue[nextIdx].status = 'IN_AUCTION';
      room.timerDeadlineAt = Date.now() + room.config.bidTimerSeconds * 1000;
    } else {
      // No more pending players in queue: AUCTION COMPLETED
      this.completeAuctionInternal(room);
    }
  }

  /**
   * Skips the current player as skipped (Host only, with optional auto-requeue)
   */
  static skipPlayer(
    roomCode: string,
    sessionToken: string,
    autoRequeue: boolean = false,
    targetAuctionPlayerId?: string
  ): AuctionRoomState {
    const room = findRoom(roomCode);
    if (!room) throw new Error('Room not found');

    if (room.hostSessionToken !== sessionToken) {
      throw new Error('Only the room host can skip a player.');
    }

    if (room.status !== 'ACTIVE') {
      throw new Error('Auction is not active.');
    }

    const currentPlayer = room.queue[room.currentPlayerIndex];
    if (!currentPlayer || currentPlayer.status !== 'IN_AUCTION') {
      return { ...room, serverTime: Date.now() };
    }

    // TARGET GUARD: If targetAuctionPlayerId is provided, prevent double-skipping next player
    if (targetAuctionPlayerId && currentPlayer.id !== targetAuctionPlayerId) {
      return { ...room, serverTime: Date.now() };
    }

    if (currentPlayer) {
      currentPlayer.status = 'SKIPPED';
      currentPlayer.skippedAt = new Date().toISOString();
      currentPlayer.skippedBy = sessionToken;
      currentPlayer.lastUpdatedAt = new Date().toISOString();

      if (autoRequeue) {
        const requeued: AuctionPlayerItem = {
          id: generateUUID(),
          roomId: room.id,
          playerId: currentPlayer.playerId,
          player: currentPlayer.player,
          queuePosition: room.queue.length,
          status: 'PENDING',
          basePrice: currentPlayer.basePrice,
          finalPrice: null,
          winningFranchiseId: null,
          soldAt: null,
          nominationRound: (currentPlayer.nominationRound || 1) + 1,
          lastUpdatedAt: new Date().toISOString(),
        };
        room.queue.push(requeued);
      }

      this.addEvent(room, 'PLAYER_UNSOLD', {
        player: currentPlayer.player.canonicalName,
        reason: 'Host skipped',
        autoRequeue,
      });
    }

    room.currentBidAmount = 0;
    room.currentBidFranchiseId = null;

    this.advanceToNextEligiblePlayer(room);

    persistStateToDisk();
    persistRoomToSupabase(room).catch((e) => console.error('Supabase room sync:', e));

    return { ...room, serverTime: Date.now() };
  }

  /**
   * Adds players from the master database to the auction queue
   */
  static addPlayersToQueue(
    roomCode: string,
    sessionToken: string,
    playerIds: string[]
  ): AuctionRoomState {
    const room = findRoom(roomCode);
    if (!room) throw new Error('Room not found');
    if (room.hostSessionToken !== sessionToken) {
      throw new Error('Only the room host can modify the auction queue.');
    }

    const added: string[] = [];
    for (const pid of playerIds) {
      if (room.queue.some((q) => q.playerId === pid)) continue;

      const player = VERIFIED_PLAYERS.find((p) => p.id === pid);
      if (!player) continue;

      const setInfo = curatedSetLookup.get(player.id);
      const item: AuctionPlayerItem = {
        id: generateUUID(),
        roomId: room.id,
        playerId: player.id,
        player,
        queuePosition: room.queue.length,
        status: 'PENDING',
        basePrice: player.defaultBasePrice,
        finalPrice: null,
        winningFranchiseId: null,
        soldAt: null,
        setGroup: setInfo?.setGroup,
        setName: setInfo?.setName,
        nominationRound: 1,
        lastUpdatedAt: new Date().toISOString(),
      };
      room.queue.push(item);
      added.push(player.canonicalName);
    }

    this.addEvent(room, 'PLAYERS_ADDED' as any, {
      count: added.length,
      players: added.slice(0, 5),
    });

    persistStateToDisk();
    persistRoomToSupabase(room).catch((e) => console.error('Supabase room sync:', e));
    return { ...room, serverTime: Date.now() };
  }

  /**
   * Removes selected player from auction queue without deleting master record
   */
  static removePlayerFromQueue(
    roomCode: string,
    sessionToken: string,
    auctionPlayerId: string
  ): AuctionRoomState {
    const room = findRoom(roomCode);
    if (!room) throw new Error('Room not found');
    if (room.hostSessionToken !== sessionToken) {
      throw new Error('Only the room host can remove players from the queue.');
    }

    const idx = room.queue.findIndex((q) => q.id === auctionPlayerId);
    if (idx === -1) throw new Error('Player not found in queue');

    const item = room.queue[idx];
    if (item.status === 'SOLD') {
      throw new Error('Cannot remove a sold player without performing an administrative reset.');
    }

    const wasCurrent = item.status === 'IN_AUCTION' || idx === room.currentPlayerIndex;
    room.queue.splice(idx, 1);

    room.queue.forEach((q, i) => {
      q.queuePosition = i;
    });

    if (wasCurrent && room.status === 'ACTIVE') {
      room.currentBidAmount = 0;
      room.currentBidFranchiseId = null;
      room.currentPlayerIndex = Math.max(0, idx - 1);
      this.advanceToNextEligiblePlayer(room);
    }

    this.addEvent(room, 'PLAYER_REMOVED' as any, {
      player: item.player.canonicalName,
    });

    persistStateToDisk();
    persistRoomToSupabase(room).catch((e) => console.error('Supabase room sync:', e));
    return { ...room, serverTime: Date.now() };
  }

  /**
   * Excludes a player from the auction entirely
   */
  static excludePlayer(
    roomCode: string,
    sessionToken: string,
    auctionPlayerId: string,
    reason?: string
  ): AuctionRoomState {
    const room = findRoom(roomCode);
    if (!room) throw new Error('Room not found');
    if (room.hostSessionToken !== sessionToken) {
      throw new Error('Only the room host can exclude players.');
    }

    const item = room.queue.find((q) => q.id === auctionPlayerId);
    if (!item) throw new Error('Player not found in queue');
    if (item.status === 'SOLD') {
      throw new Error('Cannot exclude a player who is already sold.');
    }

    const wasActive = item.status === 'IN_AUCTION';
    item.status = 'EXCLUDED';
    item.exclusionReason = reason || 'Excluded by auction organizer';
    item.lastUpdatedAt = new Date().toISOString();

    if (wasActive && room.status === 'ACTIVE') {
      room.currentBidAmount = 0;
      room.currentBidFranchiseId = null;
      this.advanceToNextEligiblePlayer(room);
    }

    this.addEvent(room, 'PLAYER_EXCLUDED' as any, {
      player: item.player.canonicalName,
      reason: item.exclusionReason,
    });

    persistStateToDisk();
    persistRoomToSupabase(room).catch((e) => console.error('Supabase room sync:', e));
    return { ...room, serverTime: Date.now() };
  }

  /**
   * Restores a skipped or excluded player back to the auction queue
   */
  static restorePlayer(
    roomCode: string,
    sessionToken: string,
    auctionPlayerId: string,
    insertPosition: 'NEXT' | 'END' = 'END'
  ): AuctionRoomState {
    const room = findRoom(roomCode);
    if (!room) throw new Error('Room not found');
    if (room.hostSessionToken !== sessionToken) {
      throw new Error('Only the room host can restore players.');
    }

    const idx = room.queue.findIndex((q) => q.id === auctionPlayerId);
    if (idx === -1) throw new Error('Player not found in queue');

    const item = room.queue[idx];
    item.status = 'PENDING';
    item.skippedAt = null;
    item.skippedBy = null;
    item.exclusionReason = null;
    item.lastUpdatedAt = new Date().toISOString();

    if (insertPosition === 'NEXT' && room.currentPlayerIndex + 1 < room.queue.length) {
      room.queue.splice(idx, 1);
      room.queue.splice(room.currentPlayerIndex + 1, 0, item);
    } else if (insertPosition === 'END') {
      room.queue.splice(idx, 1);
      room.queue.push(item);
    }

    room.queue.forEach((q, i) => {
      q.queuePosition = i;
    });

    this.addEvent(room, 'PLAYER_RESTORED' as any, {
      player: item.player.canonicalName,
      insertPosition,
    });

    persistStateToDisk();
    persistRoomToSupabase(room).catch((e) => console.error('Supabase room sync:', e));
    return { ...room, serverTime: Date.now() };
  }

  /**
   * Manually nominates a specific eligible player to the hot seat immediately
   */
  static nominatePlayer(
    roomCode: string,
    sessionToken: string,
    auctionPlayerId: string
  ): AuctionRoomState {
    const room = findRoom(roomCode);
    if (!room) throw new Error('Room not found');
    if (room.hostSessionToken !== sessionToken) {
      throw new Error('Only the room host can nominate players.');
    }

    const targetIdx = room.queue.findIndex((q) => q.id === auctionPlayerId);
    if (targetIdx === -1) throw new Error('Player not found in queue');

    const target = room.queue[targetIdx];
    if (target.status === 'SOLD') {
      throw new Error('Player has already been sold and cannot be re-nominated without administrative reset.');
    }

    const current = room.queue[room.currentPlayerIndex];
    if (current && current.id !== target.id && current.status === 'IN_AUCTION') {
      current.status = 'SKIPPED';
      current.skippedAt = new Date().toISOString();
      current.skippedBy = sessionToken;
      current.lastUpdatedAt = new Date().toISOString();
    }

    target.status = 'IN_AUCTION';
    target.nominationRound = (target.nominationRound || 1) + 1;
    target.skippedAt = null;
    target.skippedBy = null;
    target.exclusionReason = null;
    target.lastUpdatedAt = new Date().toISOString();

    room.currentPlayerIndex = targetIdx;
    room.currentBidAmount = 0;
    room.currentBidFranchiseId = null;
    room.timerDeadlineAt = Date.now() + room.config.bidTimerSeconds * 1000;

    if (room.status === 'LOBBY' || room.status === 'PAUSED') {
      room.status = 'ACTIVE';
    }

    this.addEvent(room, 'PLAYER_NOMINATED' as any, {
      player: target.player.canonicalName,
      round: target.nominationRound,
    });

    persistStateToDisk();
    persistRoomToSupabase(room).catch((e) => console.error('Supabase room sync:', e));
    return { ...room, serverTime: Date.now() };
  }

  /**
   * Reorders the queue according to an array of auction player IDs
   */
  static reorderQueue(
    roomCode: string,
    sessionToken: string,
    orderedAuctionPlayerIds: string[]
  ): AuctionRoomState {
    const room = findRoom(roomCode);
    if (!room) throw new Error('Room not found');
    if (room.hostSessionToken !== sessionToken) {
      throw new Error('Only the room host can reorder the queue.');
    }

    const idMap = new Map(room.queue.map((q) => [q.id, q]));
    const reordered: AuctionPlayerItem[] = [];

    for (const id of orderedAuctionPlayerIds) {
      const item = idMap.get(id);
      if (item) {
        reordered.push(item);
        idMap.delete(id);
      }
    }

    for (const remaining of Array.from(idMap.values())) {
      reordered.push(remaining);
    }

    reordered.forEach((q, i) => {
      q.queuePosition = i;
    });

    room.queue = reordered;

    this.addEvent(room, 'QUEUE_REORDERED' as any, {
      total: room.queue.length,
    });

    persistStateToDisk();
    persistRoomToSupabase(room).catch((e) => console.error('Supabase room sync:', e));
    return { ...room, serverTime: Date.now() };
  }

  /**
   * Administrative reset for an accidentally sold or marked unsold player
   */
  static adminResetPlayer(
    roomCode: string,
    sessionToken: string,
    auctionPlayerId: string
  ): AuctionRoomState {
    const room = findRoom(roomCode);
    if (!room) throw new Error('Room not found');
    if (room.hostSessionToken !== sessionToken) {
      throw new Error('Only the room host can execute an administrative reset.');
    }

    const item = room.queue.find((q) => q.id === auctionPlayerId);
    if (!item) throw new Error('Player not found in queue');

    if (item.status === 'SOLD' && item.winningFranchiseId && item.finalPrice) {
      const squad = room.squads[item.winningFranchiseId];
      if (squad) {
        squad.spentAmount = Math.max(0, squad.spentAmount - item.finalPrice);
        squad.remainingPurse = Math.min(squad.startingPurse, squad.remainingPurse + item.finalPrice);
        squad.players = squad.players.filter((p) => p.player.id !== item.player.id);
        if (item.player.isOverseas) {
          squad.overseasCount = Math.max(0, squad.overseasCount - 1);
        }
      }
    }

    item.status = 'PENDING';
    item.finalPrice = null;
    item.winningFranchiseId = null;
    item.soldAt = null;
    item.skippedAt = null;
    item.skippedBy = null;
    item.exclusionReason = null;
    item.lastUpdatedAt = new Date().toISOString();

    this.addEvent(room, 'PLAYER_SALE_RESET' as any, {
      player: item.player.canonicalName,
    });

    persistStateToDisk();
    persistRoomToSupabase(room).catch((e) => console.error('Supabase room sync:', e));
    return { ...room, serverTime: Date.now() };
  }

  /**
   * Imports a player pool (can replace pending or append)
   */
  static importCustomPool(
    roomCode: string,
    sessionToken: string,
    playerIds: string[],
    replacePending: boolean = false
  ): AuctionRoomState {
    const room = findRoom(roomCode);
    if (!room) throw new Error('Room not found');
    if (room.hostSessionToken !== sessionToken) {
      throw new Error('Only the room host can import player pools.');
    }

    if (replacePending) {
      const preserved = room.queue.filter(
        (q) => q.status === 'SOLD' || q.status === 'IN_AUCTION'
      );
      const existingPlayerIds = new Set(preserved.map((q) => q.playerId));

      const newItems: AuctionPlayerItem[] = [];
      for (const pid of playerIds) {
        if (existingPlayerIds.has(pid)) continue;
        const player = VERIFIED_PLAYERS.find((p) => p.id === pid);
        if (!player) continue;

        const setInfo = curatedSetLookup.get(player.id);
        newItems.push({
          id: generateUUID(),
          roomId: room.id,
          playerId: player.id,
          player,
          queuePosition: preserved.length + newItems.length,
          status: 'PENDING',
          basePrice: player.defaultBasePrice,
          finalPrice: null,
          winningFranchiseId: null,
          soldAt: null,
          setGroup: setInfo?.setGroup,
          setName: setInfo?.setName,
          nominationRound: 1,
          lastUpdatedAt: new Date().toISOString(),
        });
      }

      room.queue = [...preserved, ...newItems];
      room.queue.forEach((q, i) => {
        q.queuePosition = i;
      });
    } else {
      this.addPlayersToQueue(roomCode, sessionToken, playerIds);
    }

    persistStateToDisk();
    persistRoomToSupabase(room).catch((e) => console.error('Supabase room sync:', e));
    return { ...room, serverTime: Date.now() };
  }

  /**
   * Pauses / Resumes the auction timer (Host only)
   */
  static togglePause(roomCode: string, sessionToken: string): AuctionRoomState {
    const room = findRoom(roomCode);
    if (!room) throw new Error('Room not found');

    if (room.hostSessionToken !== sessionToken) {
      throw new Error('Only the room host can pause/resume the auction.');
    }

    if (room.status === 'ACTIVE') {
      room.status = 'PAUSED';
      this.addEvent(room, 'AUCTION_PAUSED', {});
    } else if (room.status === 'PAUSED') {
      room.status = 'ACTIVE';
      room.timerDeadlineAt = Date.now() + room.config.bidTimerSeconds * 1000;
      this.addEvent(room, 'AUCTION_RESUMED', { newDeadline: room.timerDeadlineAt });
    }

    persistStateToDisk();
    persistRoomToSupabase(room).catch((e) => console.error('Supabase room sync:', e));

    return { ...room, serverTime: Date.now() };
  }

  /**
   * Concludes the auction and freezes persistent analytics snapshot
   */
  static finishAuction(roomCode: string, sessionToken: string): AuctionRoomState {
    const room = findRoom(roomCode);
    if (!room) throw new Error('Room not found');

    if (room.hostSessionToken !== sessionToken) {
      throw new Error('Only the room host can conclude the auction.');
    }

    this.completeAuctionInternal(room);
    return { ...room, serverTime: Date.now() };
  }

  private static completeAuctionInternal(room: AuctionRoomState): void {
    room.status = 'COMPLETED';
    room.completedAt = new Date().toISOString();
    room.timerDeadlineAt = null;

    // Generate persistent analytical report snapshot
    const slug = generateReportSlug(room.roomCode);
    room.reportSlug = slug;

    // Evaluate all 10 squads
    const squadEvaluations: TeamEvaluation[] = IPL_FRANCHISES.map((franchise) => {
      const sq = room.squads[franchise.id];
      const items = (sq?.players || []).map((p) => ({
        player: p.player,
        purchasePrice: p.price,
        boughtAt: p.boughtAt,
      }));

      return evaluateSquad(
        franchise,
        items,
        room.config.startingPurse,
        room.config.minSquadSize,
        room.config.maxSquadSize,
        room.config.maxOverseas
      );
    });

    const ranked = rankAllSquads(squadEvaluations);

    // Sold players
    const allSoldPlayers: AuctionReportData['allSoldPlayers'] = [];
    for (const q of room.queue) {
      if (q.status === 'SOLD' && q.winningFranchiseId && q.finalPrice) {
        allSoldPlayers.push({
          player: q.player,
          franchiseId: q.winningFranchiseId,
          franchiseName: FRANCHISE_MAP.get(q.winningFranchiseId)?.name || q.winningFranchiseId,
          price: q.finalPrice,
        });
      }
    }

    const unsoldPlayers = room.queue.filter((q) => q.status === 'UNSOLD').map((q) => q.player);

    const totalSpent = allSoldPlayers.reduce((sum, item) => sum + item.price, 0);

    const highestBidPlayer = allSoldPlayers.slice().sort((a, b) => b.price - a.price)[0] || null;

    const reportData: AuctionReportData = {
      roomCode: room.roomCode,
      reportSlug: slug,
      createdAt: room.completedAt,
      config: room.config,
      rankings: ranked,
      allSquads: room.squads,
      allSoldPlayers,
      unsoldPlayers,
      stats: {
        totalSpent,
        totalPlayersSold: allSoldPlayers.length,
        highestBidPlayer: highestBidPlayer
          ? {
              player: highestBidPlayer.player,
              price: highestBidPlayer.price,
              franchiseId: highestBidPlayer.franchiseId,
            }
          : null,
        mostActiveFranchiseId: ranked[0]?.franchiseId || null,
      },
    };

    reportsBySlug.set(slug, reportData);

    this.addEvent(room, 'AUCTION_COMPLETED', {
      reportSlug: slug,
      totalSpent,
      totalSold: allSoldPlayers.length,
    });

    persistStateToDisk();
    persistRoomToSupabase(room).catch((e) => console.error('Supabase room sync:', e));
    persistReportToSupabase(reportData, room.id).catch((e) => console.error('Supabase report sync:', e));
  }

  /**
   * Retrieves a persistent completed auction report by slug
   */
  static getReport(slug: string): AuctionReportData | null {
    let rep = reportsBySlug.get(slug);
    if (!rep) {
      loadStateFromDisk();
      rep = reportsBySlug.get(slug);
    }
    return rep || null;
  }

  /**
   * Sets or caches an auction report
   */
  static setReport(slug: string, report: AuctionReportData): void {
    reportsBySlug.set(slug, report);
    persistStateToDisk();
  }

  /**
   * Returns all in-memory auction rooms for metrics and monitoring
   */
  static getAllRooms(): AuctionRoomState[] {
    return Array.from(roomsByCode.values());
  }

  static getRoomsCount(): number {
    return roomsByCode.size;
  }

  static getReportsCount(): number {
    return reportsBySlug.size;
  }

  static clearForTesting(): void {
    roomsByCode.clear();
    processedCommandIds.clear();
  }

  private static addEvent(
    room: AuctionRoomState,
    eventType: AuctionEvent['eventType'],
    payload: Record<string, any>
  ): void {
    const seq = room.events.length + 1;
    const event: AuctionEvent = {
      id: generateUUID(),
      roomId: room.id,
      sequenceNumber: seq,
      eventType,
      payload,
      createdAt: new Date().toISOString(),
    };
    room.events.push(event);
    if (room.events.length > 50) {
      room.events.shift(); // retain last 50 events to prevent memory bloat on free tier
    }
  }
}
