import { describe, it, expect } from 'vitest';
import {
  getCuratedAuctionPool,
  POOL_PRESETS,
  CURATED_SETS,
} from '../src/data/curated-pools';
import { getNextMinimumBid, getBidIncrement, CRORE, LAKH } from '../src/lib/currency';
import { AuctionStore } from '../src/lib/auction-store';

describe('Curated Player Pools & Official Incremental Bidding Suite', () => {
  describe('5-Year Performance Curated Pools & Sets', () => {
    it('provides the 3 authoritative presets aligned with team capacities', () => {
      expect(POOL_PRESETS.length).toBe(3);

      const mega = POOL_PRESETS.find((p) => p.playerCount === 300)!;
      expect(mega).toBeDefined();
      expect(mega.targetTeams).toContain('10 Teams');

      const champ = POOL_PRESETS.find((p) => p.playerCount === 200)!;
      expect(champ).toBeDefined();
      expect(champ.targetTeams).toContain('6–8 Teams');

      const blitz = POOL_PRESETS.find((p) => p.playerCount === 150)!;
      expect(blitz).toBeDefined();
      expect(blitz.targetTeams).toContain('4–5 Teams');
    });

    it('generates the 10-team mega pool with exactly 300 players and balanced role depth', () => {
      const pool300 = getCuratedAuctionPool(300);
      expect(pool300.length).toBe(300);

      // Verify all IDs are unique
      const uniqueIds = new Set(pool300.map((e) => e.player.id));
      expect(uniqueIds.size).toBe(300);

      // Check role representation
      const roles: Record<string, number> = {};
      let overseasCount = 0;
      pool300.forEach((e) => {
        roles[e.player.primaryRole] = (roles[e.player.primaryRole] || 0) + 1;
        if (e.player.isOverseas) overseasCount++;
      });

      expect(roles['BATTER']).toBeGreaterThanOrEqual(40);
      expect(roles['BOWLER']).toBeGreaterThanOrEqual(70);
      expect(roles['ALL_ROUNDER']).toBeGreaterThanOrEqual(60);
      expect(roles['WICKETKEEPER']).toBeGreaterThanOrEqual(25);
      expect(overseasCount).toBeGreaterThanOrEqual(80); // Plenty of overseas for all 10 teams

      // Check first set is Marquee 1
      expect(pool300[0].setName).toContain('Marquee');
      expect(pool300[0].player.canonicalName).toBe('Virat Kohli');
    });

    it('generates the 6–8 team championship pool with exactly 200 players', () => {
      const pool200 = getCuratedAuctionPool(200);
      expect(pool200.length).toBe(200);

      const uniqueIds = new Set(pool200.map((e) => e.player.id));
      expect(uniqueIds.size).toBe(200);
    });

    it('generates the 4–5 team blitz pool with exactly 150 players', () => {
      const pool150 = getCuratedAuctionPool(150);
      expect(pool150.length).toBe(150);

      const uniqueIds = new Set(pool150.map((e) => e.player.id));
      expect(uniqueIds.size).toBe(150);
    });
  });

  describe('Official IPL Bid Increments (+₹10L under 2 Cr, +₹25L over 2 Cr)', () => {
    const basePrice = 2 * CRORE;

    it('starts at base price for opening bid', () => {
      expect(getNextMinimumBid(0, basePrice)).toBe(2 * CRORE);
    });

    it('enforces +10 Lakhs increment when bid is under 2 Crores', () => {
      expect(getNextMinimumBid(50 * LAKH, basePrice)).toBe(60 * LAKH);
      expect(getNextMinimumBid(1 * CRORE, basePrice)).toBe(1.1 * CRORE);
      expect(getNextMinimumBid(1.5 * CRORE, basePrice)).toBe(1.6 * CRORE);
      expect(getNextMinimumBid(1.9 * CRORE, basePrice)).toBe(2.0 * CRORE);

      expect(getBidIncrement(50 * LAKH)).toBe(10 * LAKH);
      expect(getBidIncrement(1.8 * CRORE)).toBe(10 * LAKH);
    });

    it('enforces +25 Lakhs increment when bid is 2 Crores or higher', () => {
      expect(getNextMinimumBid(2 * CRORE, basePrice)).toBe(2.25 * CRORE);
      expect(getNextMinimumBid(2.25 * CRORE, basePrice)).toBe(2.5 * CRORE);
      expect(getNextMinimumBid(5 * CRORE, basePrice)).toBe(5.25 * CRORE);
      expect(getNextMinimumBid(10 * CRORE, basePrice)).toBe(10.25 * CRORE);
      expect(getNextMinimumBid(20 * CRORE, basePrice)).toBe(20.25 * CRORE);

      expect(getBidIncrement(2 * CRORE)).toBe(25 * LAKH);
      expect(getBidIncrement(15 * CRORE)).toBe(25 * LAKH);
    });
  });

  describe('Jump Bid / Higher Direct Amount Bidding', () => {
    it('accepts a direct jump bid (e.g. jumping from ₹2 Cr to ₹10 Cr)', () => {
      const { room, hostToken } = AuctionStore.createRoom('Auctioneer', {
        startingPurse: 120 * CRORE,
        auctionPoolSize: 150,
      });

      AuctionStore.startAuction(room.roomCode, hostToken);
      const participant = AuctionStore.joinRoom(room.roomCode, 'Owner 1');
      AuctionStore.selectFranchise(room.roomCode, participant.sessionToken, 'rcb');

      // Place opening bid (e.g. 2 Cr)
      AuctionStore.placeBid(
        room.roomCode,
        participant.sessionToken,
        'rcb',
        2 * CRORE,
        'cmd_open'
      );

      // Join rival bidder
      const participant2 = AuctionStore.joinRoom(room.roomCode, 'Owner 2');
      AuctionStore.selectFranchise(room.roomCode, participant2.sessionToken, 'csk');

      // Direct Jump Bid: CSK jumps straight to ₹10 Crores!
      const afterJump = AuctionStore.placeBid(
        room.roomCode,
        participant2.sessionToken,
        'csk',
        10 * CRORE,
        'cmd_jump_10cr'
      );

      expect(afterJump.currentBidAmount).toBe(10 * CRORE);
      expect(afterJump.currentBidFranchiseId).toBe('csk');

      // Next paddle raise after 10 Cr must be 10.25 Cr (+25L)
      const nextMin = getNextMinimumBid(afterJump.currentBidAmount, 2 * CRORE);
      expect(nextMin).toBe(10.25 * CRORE);
    });

    it('rejects a jump bid that exceeds the remaining purse', () => {
      const { room, hostToken } = AuctionStore.createRoom('Auctioneer', {
        startingPurse: 50 * CRORE,
      });

      AuctionStore.startAuction(room.roomCode, hostToken);
      const participant = AuctionStore.joinRoom(room.roomCode, 'Owner 1');
      AuctionStore.selectFranchise(room.roomCode, participant.sessionToken, 'mi');

      // Try to jump bid 60 Cr with a 50 Cr purse
      expect(() => {
        AuctionStore.placeBid(
          room.roomCode,
          participant.sessionToken,
          'mi',
          60 * CRORE,
          'cmd_too_high'
        );
      }).toThrow(/Insufficient purse/);
    });

    it('rejects a bid if the franchise already holds the highest bid (anti-self-bidding)', () => {
      const { room, hostToken } = AuctionStore.createRoom('Auctioneer', {
        startingPurse: 120 * CRORE,
      });

      AuctionStore.startAuction(room.roomCode, hostToken);
      const p1 = AuctionStore.joinRoom(room.roomCode, 'Owner 1');
      AuctionStore.selectFranchise(room.roomCode, p1.sessionToken, 'rcb');

      // First bid by RCB
      AuctionStore.placeBid(room.roomCode, p1.sessionToken, 'rcb', 2 * CRORE, 'b_rcb_1');

      // Attempt to bid again with RCB
      expect(() => {
        AuctionStore.placeBid(room.roomCode, p1.sessionToken, 'rcb', 2.25 * CRORE, 'b_rcb_2');
      }).toThrow(/already holds the highest bid/);
    });
  });

  describe('Single-Player Atomic Skip & Anti-Double-Skip Guards', () => {
    it('skips only the target active player and does NOT skip the subsequent player', () => {
      const { room, hostToken } = AuctionStore.createRoom('Auctioneer', {
        auctionPoolSize: 150,
      });

      AuctionStore.startAuction(room.roomCode, hostToken);
      const activeRoom = AuctionStore.getRoom(room.roomCode)!;

      const player1 = activeRoom.queue[activeRoom.currentPlayerIndex];
      const nextPendingIdx = activeRoom.queue.findIndex(
        (q, idx) => idx > activeRoom.currentPlayerIndex && q.status === 'PENDING'
      );
      const player2 = activeRoom.queue[nextPendingIdx];

      expect(player1.status).toBe('IN_AUCTION');
      expect(player2.status).toBe('PENDING');

      // Skip player 1 targeting player 1's ID
      const afterSkip1 = AuctionStore.skipPlayer(
        room.roomCode,
        hostToken,
        false,
        player1.id
      );

      // Verify player 1 is skipped
      const skippedPlayer1 = afterSkip1.queue.find((q) => q.id === player1.id)!;
      expect(skippedPlayer1.status).toBe('SKIPPED');

      // Verify player 2 is now in auction (NOT skipped)
      const currentInAuction = afterSkip1.queue[afterSkip1.currentPlayerIndex];
      expect(currentInAuction.id).toBe(player2.id);
      expect(currentInAuction.status).toBe('IN_AUCTION');

      // Now simulate a duplicate/stale skip request intended for player 1 arriving again
      const afterStaleSkip = AuctionStore.skipPlayer(
        room.roomCode,
        hostToken,
        false,
        player1.id // Target ID is player 1, but player 2 is now in hot seat
      );

      // Verify player 2 was NOT skipped!
      const stillActive = afterStaleSkip.queue[afterStaleSkip.currentPlayerIndex];
      expect(stillActive.id).toBe(player2.id);
      expect(stillActive.status).toBe('IN_AUCTION');
    });

    it('protects newly introduced player from timer auto-finalization when deadline is in the future', () => {
      const { room, hostToken } = AuctionStore.createRoom('Auctioneer', {
        bidTimerSeconds: 15,
        auctionPoolSize: 150,
      });

      AuctionStore.startAuction(room.roomCode, hostToken);
      const activeRoom = AuctionStore.getRoom(room.roomCode)!;

      // Timer deadline is in the future
      expect(activeRoom.timerDeadlineAt).toBeGreaterThan(Date.now());

      // Calling getRoom should NOT auto-finalize the player because deadline is in the future
      const roomCheck = AuctionStore.getRoom(room.roomCode)!;
      const current = roomCheck.queue[roomCheck.currentPlayerIndex];
      expect(current.status).toBe('IN_AUCTION');
    });
  });
});
