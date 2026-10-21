import { describe, it, expect, beforeEach } from 'vitest';
import { AuctionStore } from '../src/lib/auction-store';
import { CRORE } from '../src/lib/currency';

describe('Custom Auction Settings & Room Invitation Flow', () => {
  describe('Custom Bid Timer Settings (5s, 10s, 30s)', () => {
    it('creates room with 5-second blitz timer and honors proportional extension', () => {
      const { room, hostToken } = AuctionStore.createRoom('Blitz Host', {
        bidTimerSeconds: 5,
        startingPurse: 150 * CRORE,
        auctionPoolSize: 150,
      });

      expect(room.config.bidTimerSeconds).toBe(5);
      expect(room.config.startingPurse).toBe(150 * CRORE);
      expect(room.queue.length).toBe(150);

      // Start auction
      AuctionStore.startAuction(room.roomCode, hostToken);
      const started = AuctionStore.getRoom(room.roomCode)!;
      expect(started.status).toBe('ACTIVE');

      // Place bid
      const participant = AuctionStore.joinRoom(room.roomCode, 'Bidder 1');
      AuctionStore.selectFranchise(room.roomCode, participant.sessionToken, 'csk');

      const afterBid = AuctionStore.placeBid(
        room.roomCode,
        participant.sessionToken,
        'csk',
        started.queue[0].basePrice,
        'cmd_blitz_1'
      );

      // Verify timer does not inflate to 15s when timer is set to 5s
      const now = Date.now();
      const remainingMs = afterBid.timerDeadlineAt! - now;
      expect(remainingMs).toBeLessThanOrEqual(6000);
    });

    it('creates room with 10-second fast timer', () => {
      const { room } = AuctionStore.createRoom('Fast Host', {
        bidTimerSeconds: 10,
      });
      expect(room.config.bidTimerSeconds).toBe(10);
    });

    it('creates room with 30-second strategic timer', () => {
      const { room } = AuctionStore.createRoom('Strategic Host', {
        bidTimerSeconds: 30,
      });
      expect(room.config.bidTimerSeconds).toBe(30);
    });
  });

  describe('Custom Auction Size (150 to 200 players)', () => {
    it('creates an auction room with exactly 150 players in queue', () => {
      const { room } = AuctionStore.createRoom('Host 150', {
        auctionPoolSize: 150,
      });
      expect(room.queue.length).toBe(150);
      expect(room.queue[0].queuePosition).toBe(0);
      expect(room.queue[149].queuePosition).toBe(149);
    });

    it('creates an auction room with exactly 200 players in queue', () => {
      const { room } = AuctionStore.createRoom('Host 200', {
        auctionPoolSize: 200,
      });
      expect(room.queue.length).toBe(200);
      expect(room.queue[199].queuePosition).toBe(199);
    });
  });

  describe('Custom Starting Purse (₹150 Cr, ₹200 Cr)', () => {
    it('initializes all franchise squad ledgers with ₹150 Crore', () => {
      const { room } = AuctionStore.createRoom('High Roller Host', {
        startingPurse: 150 * CRORE,
      });
      expect(room.config.startingPurse).toBe(150 * CRORE);
      for (const squad of Object.values(room.squads)) {
        expect(squad.startingPurse).toBe(150 * CRORE);
        expect(squad.remainingPurse).toBe(150 * CRORE);
        expect(squad.spentAmount).toBe(0);
      }
    });

    it('initializes all franchise squad ledgers with ₹200 Crore', () => {
      const { room } = AuctionStore.createRoom('Mega Purse Host', {
        startingPurse: 200 * CRORE,
      });
      expect(room.config.startingPurse).toBe(200 * CRORE);
      expect(room.squads['mi'].remainingPurse).toBe(200 * CRORE);
      expect(room.squads['rcb'].remainingPurse).toBe(200 * CRORE);
    });
  });

  describe('Multiplayer Joining & Room Availability', () => {
    it('allows a newly created room to be fetched and joined immediately by friends', () => {
      const { room } = AuctionStore.createRoom('Organizer Host', {
        bidTimerSeconds: 15,
        startingPurse: 120 * CRORE,
        auctionPoolSize: 100,
      });

      // Verify immediate room lookup (same as GET /api/auction/[code])
      const retrieved = AuctionStore.getRoom(room.roomCode);
      expect(retrieved).not.toBeNull();
      expect(retrieved?.roomCode).toBe(room.roomCode);

      // Friend joins using room code
      const friendJoin = AuctionStore.joinRoom(room.roomCode, 'Invited Friend');
      expect(friendJoin.participant.displayName).toBe('Invited Friend');
      expect(friendJoin.sessionToken).toBeDefined();

      // Friend claims franchise
      const updatedRoom = AuctionStore.selectFranchise(
        room.roomCode,
        friendJoin.sessionToken,
        'rcb'
      );

      const rcbOwner = updatedRoom.participants.find((p) => p.franchiseId === 'rcb');
      expect(rcbOwner?.displayName).toBe('Invited Friend');
    });
  });
});
