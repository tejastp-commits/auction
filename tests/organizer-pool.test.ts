import { describe, it, expect, beforeEach } from 'vitest';
import { AuctionStore } from '../src/lib/auction-store';
import { VERIFIED_PLAYERS } from '../src/data/players';
import { CRORE } from '../src/lib/currency';

describe('Auction Pool & Organizer Management Suite', () => {
  let roomCode: string;
  let hostToken: string;

  beforeEach(() => {
    const created = AuctionStore.createRoom('Master Auctioneer', {
      startingPurse: 120 * CRORE,
      bidTimerSeconds: 15,
      minSquadSize: 18,
      maxSquadSize: 25,
      maxOverseas: 8,
    });
    roomCode = created.room.roomCode;
    hostToken = created.hostToken;
  });

  describe('Master Database Invariants', () => {
    it('contains at least 400 unique validated players', () => {
      expect(VERIFIED_PLAYERS.length).toBeGreaterThanOrEqual(400);
      const uniqueIds = new Set(VERIFIED_PLAYERS.map((p) => p.id));
      expect(uniqueIds.size).toBe(VERIFIED_PLAYERS.length);
    });

    it('all players have valid numeric stats without NaN or undefined', () => {
      for (const p of VERIFIED_PLAYERS) {
        expect(p.id).toBeDefined();
        expect(p.canonicalName).toBeTruthy();
        expect(typeof p.stats.runs).toBe('number');
        expect(isNaN(p.stats.runs)).toBe(false);
        expect(typeof p.stats.wickets).toBe('number');
        expect(isNaN(p.stats.wickets)).toBe(false);
        expect(typeof p.stats.strikeRate).toBe('number');
        expect(isNaN(p.stats.strikeRate)).toBe(false);
        expect(typeof p.stats.economyRate).toBe('number');
        expect(isNaN(p.stats.economyRate)).toBe(false);
      }
    });
  });

  describe('Queue Manipulation & Organizer Controls', () => {
    it('adds individual and bulk players to the auction queue', () => {
      const roomBefore = AuctionStore.getRoom(roomCode)!;
      const initialQueueLength = roomBefore.queue.length;

      // Find players not already in the default queue
      const existingIds = new Set(roomBefore.queue.map((q) => q.playerId));
      const candidates = VERIFIED_PLAYERS.filter((p) => !existingIds.has(p.id)).slice(0, 5);
      expect(candidates.length).toBe(5);

      const candidateIds = candidates.map((p) => p.id);
      const updatedRoom = AuctionStore.addPlayersToQueue(roomCode, hostToken, candidateIds);

      expect(updatedRoom.queue.length).toBe(initialQueueLength + 5);
      for (const id of candidateIds) {
        const item = updatedRoom.queue.find((q) => q.playerId === id);
        expect(item).toBeDefined();
        expect(item?.status).toBe('PENDING');
      }

      // Does not create duplicates if added again
      const dedupeRoom = AuctionStore.addPlayersToQueue(roomCode, hostToken, candidateIds);
      expect(dedupeRoom.queue.length).toBe(initialQueueLength + 5);
    });

    it('rejects unauthorized non-host queue additions', () => {
      const p = AuctionStore.joinRoom(roomCode, 'Imposter');
      expect(() => {
        AuctionStore.addPlayersToQueue(roomCode, p.participant.sessionToken, ['vkohli-18']);
      }).toThrow(/Only the room host/);
    });

    it('removes selected un-sold players from queue without mutating master catalog', () => {
      const room = AuctionStore.getRoom(roomCode)!;
      const initialMasterCount = VERIFIED_PLAYERS.length;
      const targetItem = room.queue[room.queue.length - 1]; // last pending player
      const targetPlayerId = targetItem.playerId;

      const updated = AuctionStore.removePlayerFromQueue(roomCode, hostToken, targetItem.id);
      expect(updated.queue.some((q) => q.id === targetItem.id)).toBe(false);

      // Verify master catalog is completely untouched
      expect(VERIFIED_PLAYERS.length).toBe(initialMasterCount);
      expect(VERIFIED_PLAYERS.some((p) => p.id === targetPlayerId)).toBe(true);
    });

    it('skips current player with and without auto-requeue', () => {
      AuctionStore.startAuction(roomCode, hostToken);
      const room = AuctionStore.getRoom(roomCode)!;
      const firstPlayerId = room.queue[0].playerId;
      const initialQueueLen = room.queue.length;

      // 1. Skip with auto-requeue = true
      const skippedWithRequeue = AuctionStore.skipPlayer(roomCode, hostToken, true);
      expect(skippedWithRequeue.queue[0].status).toBe('SKIPPED');
      // A cloned pending copy is appended at end of queue
      expect(skippedWithRequeue.queue.length).toBe(initialQueueLen + 1);
      const requeued = skippedWithRequeue.queue[skippedWithRequeue.queue.length - 1];
      expect(requeued.playerId).toBe(firstPlayerId);
      expect(requeued.status).toBe('PENDING');

      // The new active player should be the second player
      expect(skippedWithRequeue.currentPlayerIndex).toBe(1);
      expect(skippedWithRequeue.queue[1].status).toBe('IN_AUCTION');

      // 2. Skip next without auto-requeue
      const secondPlayerId = skippedWithRequeue.queue[1].playerId;
      const skippedWithoutRequeue = AuctionStore.skipPlayer(roomCode, hostToken, false);
      expect(skippedWithoutRequeue.queue[1].status).toBe('SKIPPED');
      // No extra item appended
      expect(skippedWithoutRequeue.queue.length).toBe(initialQueueLen + 1);
      expect(skippedWithoutRequeue.currentPlayerIndex).toBe(2);
    });

    it('excludes a player from current auction with reason and advances', () => {
      AuctionStore.startAuction(roomCode, hostToken);
      const room = AuctionStore.getRoom(roomCode)!;
      const activeItem = room.queue[room.currentPlayerIndex];

      const updated = AuctionStore.excludePlayer(
        roomCode,
        hostToken,
        activeItem.id,
        'Withdrawn due to national duty'
      );

      const excluded = updated.queue.find((q) => q.id === activeItem.id)!;
      expect(excluded.status).toBe('EXCLUDED');
      expect(excluded.exclusionReason).toBe('Withdrawn due to national duty');

      // Room advanced to next player
      expect(updated.currentPlayerIndex).toBe(1);
      expect(updated.queue[1].status).toBe('IN_AUCTION');
    });

    it('restores a skipped or excluded player to NEXT or END position', () => {
      AuctionStore.startAuction(roomCode, hostToken);
      let room = AuctionStore.getRoom(roomCode)!;
      const firstItem = room.queue[0];

      // Exclude first player
      room = AuctionStore.excludePlayer(roomCode, hostToken, firstItem.id, 'Injured');
      expect(room.queue[0].status).toBe('EXCLUDED');

      // Restore first player to END
      room = AuctionStore.restorePlayer(roomCode, hostToken, firstItem.id, 'END');
      const restored = room.queue[room.queue.length - 1];
      expect(restored.playerId).toBe(firstItem.playerId);
      expect(restored.status).toBe('PENDING');
      expect(restored.exclusionReason).toBeNull();
    });

    it('nominates an eligible player directly to the hot seat', () => {
      AuctionStore.startAuction(roomCode, hostToken);
      const room = AuctionStore.getRoom(roomCode)!;

      // Pick a pending player deeper in the queue (e.g. index 5)
      const targetItem = room.queue[5];
      expect(targetItem.status).toBe('PENDING');

      const updated = AuctionStore.nominatePlayer(roomCode, hostToken, targetItem.id);
      expect(updated.currentPlayerIndex).toBe(5);
      expect(updated.queue[5].status).toBe('IN_AUCTION');
      // Previous player was marked skipped
      expect(updated.queue[0].status).toBe('SKIPPED');
    });

    it('reorders the queue without affecting already processed players', () => {
      AuctionStore.startAuction(roomCode, hostToken);
      const room = AuctionStore.getRoom(roomCode)!;

      // Current player is at index 0 (IN_AUCTION)
      const pendingIds = room.queue.slice(1, 6).map((q) => q.id);
      const reversedPendingIds = [...pendingIds].reverse();

      const fullOrder = [
        room.queue[0].id,
        ...reversedPendingIds,
        ...room.queue.slice(6).map((q) => q.id),
      ];

      const updated = AuctionStore.reorderQueue(roomCode, hostToken, fullOrder);
      expect(updated.queue[1].id).toBe(reversedPendingIds[0]);
      expect(updated.queue[2].id).toBe(reversedPendingIds[1]);
    });
  });

  describe('Sold Player Invariants & Administrative Reset', () => {
    it('prevents a sold player from being sold again or excluded', () => {
      AuctionStore.selectFranchise(roomCode, hostToken, 'rcb');
      AuctionStore.startAuction(roomCode, hostToken);

      // Place bid and finalize sale
      AuctionStore.placeBid(roomCode, hostToken, 'rcb', 2 * CRORE, 'cmd_sold_1');
      const roomAfterSale = AuctionStore.finalizePlayer(roomCode, hostToken);

      const soldItem = roomAfterSale.queue[0];
      expect(soldItem.status).toBe('SOLD');
      expect(soldItem.finalPrice).toBe(2 * CRORE);
      expect(soldItem.winningFranchiseId).toBe('rcb');

      // Check RCB squad and purse
      const rcbSquad = roomAfterSale.squads['rcb'];
      expect(rcbSquad.players.length).toBe(1);
      expect(rcbSquad.remainingPurse).toBe(120 * CRORE - 2 * CRORE);

      // Attempting to exclude the sold player fails
      expect(() => {
        AuctionStore.excludePlayer(roomCode, hostToken, soldItem.id);
      }).toThrow(/already sold/);

      // Attempting to remove the sold player fails
      expect(() => {
        AuctionStore.removePlayerFromQueue(roomCode, hostToken, soldItem.id);
      }).toThrow(/Cannot remove a sold player/);

      // Attempting to nominate the sold player fails
      expect(() => {
        AuctionStore.nominatePlayer(roomCode, hostToken, soldItem.id);
      }).toThrow(/already been sold/);
    });

    it('performs administrative sale reset (refunds purse and removes from squad)', () => {
      AuctionStore.selectFranchise(roomCode, hostToken, 'csk');
      AuctionStore.startAuction(roomCode, hostToken);

      AuctionStore.placeBid(roomCode, hostToken, 'csk', 5 * CRORE, 'cmd_sold_2');
      let room = AuctionStore.finalizePlayer(roomCode, hostToken);

      const soldItem = room.queue[0];
      expect(soldItem.status).toBe('SOLD');
      expect(room.squads['csk'].remainingPurse).toBe(115 * CRORE);

      // Admin reset sale
      room = AuctionStore.adminResetPlayer(roomCode, hostToken, soldItem.id);

      const resetItem = room.queue.find((q) => q.id === soldItem.id)!;
      expect(resetItem.status).toBe('PENDING');
      expect(resetItem.finalPrice).toBeNull();
      expect(resetItem.winningFranchiseId).toBeNull();

      // Purse refunded to CSK
      expect(room.squads['csk'].remainingPurse).toBe(120 * CRORE);
      expect(room.squads['csk'].players.length).toBe(0);
    });

    it('imports custom pool with replacePending=true and append mode', () => {
      const room = AuctionStore.getRoom(roomCode)!;
      const initialLen = room.queue.length;

      // Custom pool with 3 explicit player IDs
      const customIds = ['rpant-17', 'shreyas-iyer-02', 'mstarc-56'];
      const updated = AuctionStore.importCustomPool(roomCode, hostToken, customIds, false);

      // Appended
      expect(updated.queue.length).toBeGreaterThanOrEqual(initialLen);

      // Replace pending mode
      const replaced = AuctionStore.importCustomPool(roomCode, hostToken, customIds, true);
      expect(replaced.queue.length).toBe(customIds.length);
      expect(replaced.queue.map((q) => q.playerId)).toEqual(customIds);
    });
  });
});
