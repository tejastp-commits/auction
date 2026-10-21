import { VERIFIED_PLAYERS, Player } from '@/data/players';
import { IPL_FRANCHISES, Franchise, FRANCHISE_MAP } from '@/data/franchises';
import { getNextMinimumBid, CRORE } from './currency';
import { evaluateSquad, rankAllSquads, TeamEvaluation } from './analytics';
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

// In-Memory Authoritative Store with durable state transitions
const roomsByCode = new Map<string, AuctionRoomState>();
const reportsBySlug = new Map<string, AuctionReportData>();
const processedCommandIds = new Set<string>();

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
    let roomCode = generateRoomCode();
    while (roomsByCode.has(roomCode)) {
      roomCode = generateRoomCode();
    }

    const hostToken = `host_${Math.random().toString(36).substring(2)}_${Date.now()}`;
    const roomId = `room_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
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

    // Initial player queue from verified players
    const queue: AuctionPlayerItem[] = VERIFIED_PLAYERS.map((player, idx) => ({
      id: `ap_${player.id}_${roomId}`,
      roomId,
      playerId: player.id,
      player,
      queuePosition: idx,
      status: 'PENDING',
      basePrice: player.defaultBasePrice,
      finalPrice: null,
      winningFranchiseId: null,
      soldAt: null,
    }));

    const hostParticipant: RoomParticipant = {
      id: `p_${hostToken}`,
      roomId,
      sessionToken: hostToken,
      displayName: hostDisplayName || 'Auctioneer (Host)',
      franchiseId: null,
      role: 'HOST',
      isConnected: true,
      joinedAt: new Date().toISOString(),
    };

    const initialEvent: AuctionEvent = {
      id: `ev_${Date.now()}_1`,
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
    return { room, hostToken };
  }

  /**
   * Retrieves authoritative room state
   */
  static getRoom(roomCode: string): AuctionRoomState | null {
    const room = roomsByCode.get(roomCode.toUpperCase());
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
    const code = roomCode.toUpperCase();
    const room = roomsByCode.get(code);
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
    const room = roomsByCode.get(roomCode.toUpperCase());
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

    return { ...room, serverTime: Date.now() };
  }

  /**
   * Starts the auction (Host only)
   */
  static startAuction(roomCode: string, sessionToken: string): AuctionRoomState {
    const room = roomsByCode.get(roomCode.toUpperCase());
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
    const room = roomsByCode.get(roomCode.toUpperCase());
    if (!room) throw new Error('Room not found');

    // 1. Check idempotency
    if (processedCommandIds.has(commandId)) {
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

    // 7. Purse check
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
    processedCommandIds.add(commandId);
    room.currentBidAmount = amount;
    room.currentBidFranchiseId = franchiseId;

    // Timer Extension Rule:
    // If less than 10 seconds remain, extend clock by 15 seconds to give competing bidders a fair window
    const now = Date.now();
    const remainingTime = (room.timerDeadlineAt || now) - now;
    if (remainingTime < 10000) {
      room.timerDeadlineAt = now + 15000;
    }

    const bidRecord: BidRecord = {
      id: `bid_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
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

    return { ...room, serverTime: Date.now() };
  }

  /**
   * Finalizes the current player in auction (sells to highest bidder or marks unsold)
   */
  static finalizePlayer(roomCode: string, sessionToken: string): AuctionRoomState {
    const room = roomsByCode.get(roomCode.toUpperCase());
    if (!room) throw new Error('Room not found');

    const isHost = room.hostSessionToken === sessionToken;
    if (!isHost) {
      throw new Error('Only the host can manually finalize or sell a player.');
    }

    this.autoFinalizeCurrentPlayer(room);
    return { ...room, serverTime: Date.now() };
  }

  /**
   * Internal auto-finalization triggered by timer expiration or host action
   */
  private static autoFinalizeCurrentPlayer(room: AuctionRoomState): void {
    if (room.status !== 'ACTIVE') return;

    const currentPlayer = room.queue[room.currentPlayerIndex];
    if (!currentPlayer || currentPlayer.status !== 'IN_AUCTION') return;

    if (room.currentBidAmount > 0 && room.currentBidFranchiseId) {
      // SOLD!
      const winningFranchiseId = room.currentBidFranchiseId;
      const finalPrice = room.currentBidAmount;

      currentPlayer.status = 'SOLD';
      currentPlayer.finalPrice = finalPrice;
      currentPlayer.winningFranchiseId = winningFranchiseId;
      currentPlayer.soldAt = new Date().toISOString();

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
      this.addEvent(room, 'PLAYER_UNSOLD', {
        player: currentPlayer.player.canonicalName,
      });
    }

    // Advance to next player or finish auction
    room.currentBidAmount = 0;
    room.currentBidFranchiseId = null;

    if (room.currentPlayerIndex + 1 < room.queue.length) {
      room.currentPlayerIndex += 1;
      const nextPlayer = room.queue[room.currentPlayerIndex];
      nextPlayer.status = 'IN_AUCTION';
      room.timerDeadlineAt = Date.now() + room.config.bidTimerSeconds * 1000;
    } else {
      // All players in queue processed: AUCTION COMPLETED
      this.completeAuctionInternal(room);
    }
  }

  /**
   * Skips the current player as unsold (Host only)
   */
  static skipPlayer(roomCode: string, sessionToken: string): AuctionRoomState {
    const room = roomsByCode.get(roomCode.toUpperCase());
    if (!room) throw new Error('Room not found');

    if (room.hostSessionToken !== sessionToken) {
      throw new Error('Only the room host can skip a player.');
    }

    if (room.status !== 'ACTIVE') {
      throw new Error('Auction is not active.');
    }

    const currentPlayer = room.queue[room.currentPlayerIndex];
    if (currentPlayer) {
      currentPlayer.status = 'UNSOLD';
      this.addEvent(room, 'PLAYER_UNSOLD', {
        player: currentPlayer.player.canonicalName,
        reason: 'Host skipped',
      });
    }

    room.currentBidAmount = 0;
    room.currentBidFranchiseId = null;

    if (room.currentPlayerIndex + 1 < room.queue.length) {
      room.currentPlayerIndex += 1;
      room.queue[room.currentPlayerIndex].status = 'IN_AUCTION';
      room.timerDeadlineAt = Date.now() + room.config.bidTimerSeconds * 1000;
    } else {
      this.completeAuctionInternal(room);
    }

    return { ...room, serverTime: Date.now() };
  }

  /**
   * Pauses / Resumes the auction timer (Host only)
   */
  static togglePause(roomCode: string, sessionToken: string): AuctionRoomState {
    const room = roomsByCode.get(roomCode.toUpperCase());
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

    return { ...room, serverTime: Date.now() };
  }

  /**
   * Concludes the auction and freezes persistent analytics snapshot
   */
  static finishAuction(roomCode: string, sessionToken: string): AuctionRoomState {
    const room = roomsByCode.get(roomCode.toUpperCase());
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
  }

  /**
   * Retrieves a persistent completed auction report by slug
   */
  static getReport(slug: string): AuctionReportData | null {
    return reportsBySlug.get(slug) || null;
  }

  private static addEvent(
    room: AuctionRoomState,
    eventType: AuctionEvent['eventType'],
    payload: Record<string, any>
  ): void {
    const seq = room.events.length + 1;
    const event: AuctionEvent = {
      id: `ev_${Date.now()}_${seq}`,
      roomId: room.id,
      sequenceNumber: seq,
      eventType,
      payload,
      createdAt: new Date().toISOString(),
    };
    room.events.push(event);
  }
}
