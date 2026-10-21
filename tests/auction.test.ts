import { describe, it, expect, beforeEach } from 'vitest';
import { AuctionStore } from '../src/lib/auction-store';
import { formatRupees, getNextMinimumBid, CRORE, LAKH } from '../src/lib/currency';
import { evaluateSquad, rankAllSquads } from '../src/lib/analytics';
import { IPL_FRANCHISES, FRANCHISE_MAP } from '../src/data/franchises';
import { VERIFIED_PLAYERS } from '../src/data/players';

describe('IPL Auction Arena — Engine & Rules Test Suite', () => {
  let roomCode: string;
  let hostToken: string;

  beforeEach(() => {
    const created = AuctionStore.createRoom('Master Auctioneer', {
      startingPurse: 120 * CRORE,
      bidTimerSeconds: 20,
      minSquadSize: 18,
      maxSquadSize: 25,
      maxOverseas: 8,
    });
    roomCode = created.room.roomCode;
    hostToken = created.hostToken;
  });

  describe('Currency & Bid Increment Calculations', () => {
    it('formats integer rupees accurately into Crores and Lakhs', () => {
      expect(formatRupees(120 * CRORE)).toBe('₹120 Cr');
      expect(formatRupees(20000000)).toBe('₹2 Cr');
      expect(formatRupees(22500000)).toBe('₹2.25 Cr');
      expect(formatRupees(5000000)).toBe('₹50 L');
      expect(formatRupees(0)).toBe('₹0');
    });

    it('calculates the correct standard IPL bid increment bands', () => {
      const basePrice = 2 * CRORE;

      // Opening bid
      expect(getNextMinimumBid(0, basePrice)).toBe(2 * CRORE);

      // Below 1 Cr: +20 Lakhs
      expect(getNextMinimumBid(80 * LAKH, basePrice)).toBe(1 * CRORE);

      // 1 Cr to 5 Cr: +25 Lakhs
      expect(getNextMinimumBid(2 * CRORE, basePrice)).toBe(2.25 * CRORE);
      expect(getNextMinimumBid(4.75 * CRORE, basePrice)).toBe(5 * CRORE);

      // 5 Cr to 10 Cr: +50 Lakhs
      expect(getNextMinimumBid(5 * CRORE, basePrice)).toBe(5.5 * CRORE);
      expect(getNextMinimumBid(9.5 * CRORE, basePrice)).toBe(10 * CRORE);

      // Above 10 Cr: +1 Crore
      expect(getNextMinimumBid(10 * CRORE, basePrice)).toBe(11 * CRORE);
      expect(getNextMinimumBid(24 * CRORE, basePrice)).toBe(25 * CRORE);
    });
  });

  describe('Multiplayer Room & Franchise Ownership', () => {
    it('allows participants to join and enforces one owner per franchise', () => {
      const p1 = AuctionStore.joinRoom(roomCode, 'Alice');
      const p2 = AuctionStore.joinRoom(roomCode, 'Bob');

      // Alice claims CSK
      const roomAfterAlice = AuctionStore.selectFranchise(roomCode, p1.sessionToken, 'csk');
      expect(roomAfterAlice.participants.find((p) => p.franchiseId === 'csk')?.displayName).toBe('Alice');

      // Bob attempts to claim CSK (should fail)
      expect(() => {
        AuctionStore.selectFranchise(roomCode, p2.sessionToken, 'csk');
      }).toThrow(/already claimed/);

      // Bob claims MI successfully
      const roomAfterBob = AuctionStore.selectFranchise(roomCode, p2.sessionToken, 'mi');
      expect(roomAfterBob.participants.find((p) => p.franchiseId === 'mi')?.displayName).toBe('Bob');
    });
  });

  describe('Authoritative Bidding & Invariant Enforcement', () => {
    it('validates bids, extends timer, and updates leading franchise', () => {
      const p1 = AuctionStore.joinRoom(roomCode, 'Alice');
      AuctionStore.selectFranchise(roomCode, p1.sessionToken, 'csk');

      // Start auction
      AuctionStore.startAuction(roomCode, hostToken);

      const room = AuctionStore.getRoom(roomCode)!;
      expect(room.status).toBe('ACTIVE');
      expect(room.queue[0].status).toBe('IN_AUCTION');

      // Place opening bid (Base Price: 2 Cr)
      const updated = AuctionStore.placeBid(
        roomCode,
        p1.sessionToken,
        'csk',
        2 * CRORE,
        'cmd_bid_01'
      );

      expect(updated.currentBidAmount).toBe(2 * CRORE);
      expect(updated.currentBidFranchiseId).toBe('csk');
      expect(updated.recentBids.length).toBe(1);
    });

    it('rejects bids below the minimum increment', () => {
      const p1 = AuctionStore.joinRoom(roomCode, 'Alice');
      AuctionStore.selectFranchise(roomCode, p1.sessionToken, 'csk');
      AuctionStore.startAuction(roomCode, hostToken);

      // Open at 2 Cr
      AuctionStore.placeBid(roomCode, p1.sessionToken, 'csk', 2 * CRORE, 'cmd_1');

      // Attempt to bid 2.10 Cr when next minimum is 2.25 Cr
      expect(() => {
        AuctionStore.placeBid(roomCode, p1.sessionToken, 'csk', 2.1 * CRORE, 'cmd_2');
      }).toThrow(/below the required minimum next bid/);
    });

    it('rejects bids that exceed franchise remaining purse', () => {
      const p1 = AuctionStore.joinRoom(roomCode, 'Alice');
      AuctionStore.selectFranchise(roomCode, p1.sessionToken, 'csk');
      AuctionStore.startAuction(roomCode, hostToken);

      // Attempt to bid 130 Cr with 120 Cr starting purse
      expect(() => {
        AuctionStore.placeBid(roomCode, p1.sessionToken, 'csk', 130 * CRORE, 'cmd_overspend');
      }).toThrow(/Insufficient purse/);
    });

    it('enforces command idempotency (duplicate commands are ignored)', () => {
      const p1 = AuctionStore.joinRoom(roomCode, 'Alice');
      AuctionStore.selectFranchise(roomCode, p1.sessionToken, 'csk');
      AuctionStore.startAuction(roomCode, hostToken);

      // Bid with command ID
      const r1 = AuctionStore.placeBid(roomCode, p1.sessionToken, 'csk', 2 * CRORE, 'cmd_unique_100');
      expect(r1.recentBids.length).toBe(1);

      // Retry exact same command ID
      const r2 = AuctionStore.placeBid(roomCode, p1.sessionToken, 'csk', 2 * CRORE, 'cmd_unique_100');
      expect(r2.recentBids.length).toBe(1); // Not duplicated
    });

    it('rejects attempts to bid for another user franchise', () => {
      const p1 = AuctionStore.joinRoom(roomCode, 'Alice');
      const p2 = AuctionStore.joinRoom(roomCode, 'Bob');
      AuctionStore.selectFranchise(roomCode, p1.sessionToken, 'csk');
      AuctionStore.selectFranchise(roomCode, p2.sessionToken, 'mi');
      AuctionStore.startAuction(roomCode, hostToken);

      // Bob tries to bid on behalf of CSK
      expect(() => {
        AuctionStore.placeBid(roomCode, p2.sessionToken, 'csk', 2 * CRORE, 'cmd_hijack');
      }).toThrow(/Unauthorized/);
    });
  });

  describe('Sale Finalization & Squad Accounting', () => {
    it('finalizes player sale, deducts purse, and advances to next player', () => {
      const p1 = AuctionStore.joinRoom(roomCode, 'Alice');
      AuctionStore.selectFranchise(roomCode, p1.sessionToken, 'csk');
      AuctionStore.startAuction(roomCode, hostToken);

      const firstPlayerName = AuctionStore.getRoom(roomCode)!.queue[0].player.canonicalName;

      // Alice bids 2 Cr
      AuctionStore.placeBid(roomCode, p1.sessionToken, 'csk', 2 * CRORE, 'cmd_sale_1');

      // Finalize sale
      const roomAfterSale = AuctionStore.finalizePlayer(roomCode, hostToken);

      const cskSquad = roomAfterSale.squads['csk'];
      expect(cskSquad.spentAmount).toBe(2 * CRORE);
      expect(cskSquad.remainingPurse).toBe(118 * CRORE);
      expect(cskSquad.players.length).toBe(1);
      expect(cskSquad.players[0].player.canonicalName).toBe(firstPlayerName);

      // Player in queue should be marked SOLD
      expect(roomAfterSale.queue[0].status).toBe('SOLD');
      expect(roomAfterSale.queue[0].winningFranchiseId).toBe('csk');
      expect(roomAfterSale.queue[0].finalPrice).toBe(2 * CRORE);

      // Advanced to next player in queue
      expect(roomAfterSale.currentPlayerIndex).toBe(1);
      expect(roomAfterSale.queue[1].status).toBe('IN_AUCTION');
    });

    it('marks player UNSOLD when no bids are placed', () => {
      AuctionStore.startAuction(roomCode, hostToken);

      // No bids, finalize immediately
      const room = AuctionStore.finalizePlayer(roomCode, hostToken);
      expect(room.queue[0].status).toBe('UNSOLD');
      expect(room.currentPlayerIndex).toBe(1);
    });
  });

  describe('Squad Evaluation & 100-Point Analytics Engine', () => {
    it('computes transparent multi-dimensional scores for squads', () => {
      const csk = FRANCHISE_MAP.get('csk')!;
      const kohli = VERIFIED_PLAYERS.find((p) => p.id === 'vkohli-18')!;
      const bumrah = VERIFIED_PLAYERS.find((p) => p.id === 'jbumrah-93')!;
      const dhoni = VERIFIED_PLAYERS.find((p) => p.id === 'msdhoni-07')!;
      const pandya = VERIFIED_PLAYERS.find((p) => p.id === 'hpandya-33')!;

      const squadItems = [
        { player: kohli, purchasePrice: 15 * CRORE, boughtAt: new Date().toISOString() },
        { player: bumrah, purchasePrice: 16 * CRORE, boughtAt: new Date().toISOString() },
        { player: dhoni, purchasePrice: 10 * CRORE, boughtAt: new Date().toISOString() },
        { player: pandya, purchasePrice: 14 * CRORE, boughtAt: new Date().toISOString() },
      ];

      const evalResult = evaluateSquad(csk, squadItems, 120 * CRORE);

      expect(evalResult.totalScore).toBeGreaterThan(40);
      expect(evalResult.dimensionScores.battingQuality).toBeGreaterThan(0);
      expect(evalResult.dimensionScores.bowlingQuality).toBeGreaterThan(0);
      expect(evalResult.topAcquisitions.length).toBe(3);
      expect(evalResult.keyStrengths.length).toBeGreaterThan(0);
      expect(evalResult.recommendedXI.length).toBe(4);
    });

    it('ranks all participating squads consistently', () => {
      const allEvaluations = IPL_FRANCHISES.map((f, i) =>
        evaluateSquad(f, [], 120 * CRORE)
      );
      const ranked = rankAllSquads(allEvaluations);
      expect(ranked.length).toBe(10);
      expect(ranked[0].rank).toBe(1);
      expect(ranked[9].rank).toBe(10);
    });
  });
});
