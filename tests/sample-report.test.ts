import { describe, it, expect } from 'vitest';
import { AuctionStore } from '../src/lib/auction-store';
import { CRORE } from '../src/lib/currency';
import { IPL_FRANCHISES } from '../src/data/franchises';

describe('Sample Completed Auction Generator', () => {
  it('simulates a complete multiplayer auction and generates persistent report slug', () => {
    // 1. Create room
    const { room, hostToken } = AuctionStore.createRoom('Harsha Bhogle (Host)', {
      startingPurse: 120 * CRORE,
      bidTimerSeconds: 20,
    });
    const code = room.roomCode;

    // 2. Join 4 franchise owners
    const cskUser = AuctionStore.joinRoom(code, 'Suresh (CSK Boss)');
    AuctionStore.selectFranchise(code, cskUser.sessionToken, 'csk');

    const miUser = AuctionStore.joinRoom(code, 'Anant (MI Dugout)');
    AuctionStore.selectFranchise(code, miUser.sessionToken, 'mi');

    const rcbUser = AuctionStore.joinRoom(code, 'Vijay (RCB Fanclub)');
    AuctionStore.selectFranchise(code, rcbUser.sessionToken, 'rcb');

    const kkrUser = AuctionStore.joinRoom(code, 'Shahrukh (KKR King)');
    AuctionStore.selectFranchise(code, kkrUser.sessionToken, 'kkr');

    // 3. Start auction
    AuctionStore.startAuction(code, hostToken);

    // Player 1 (Virat Kohli) -> Bidding war between RCB and CSK
    AuctionStore.placeBid(code, rcbUser.sessionToken, 'rcb', 2 * CRORE, 'b1');
    AuctionStore.placeBid(code, cskUser.sessionToken, 'csk', 5 * CRORE, 'b2');
    AuctionStore.placeBid(code, rcbUser.sessionToken, 'rcb', 12 * CRORE, 'b3');
    AuctionStore.placeBid(code, cskUser.sessionToken, 'csk', 18 * CRORE, 'b4');
    AuctionStore.placeBid(code, rcbUser.sessionToken, 'rcb', 21 * CRORE, 'b5');
    // Finalize Virat Kohli to RCB
    AuctionStore.finalizePlayer(code, hostToken);

    // Player 2 (Rohit Sharma) -> MI bids 16 Cr
    AuctionStore.placeBid(code, miUser.sessionToken, 'mi', 2 * CRORE, 'b6');
    AuctionStore.placeBid(code, kkrUser.sessionToken, 'kkr', 8 * CRORE, 'b7');
    AuctionStore.placeBid(code, miUser.sessionToken, 'mi', 16 * CRORE, 'b8');
    // Finalize Rohit to MI
    AuctionStore.finalizePlayer(code, hostToken);

    // Player 3 (Suryakumar Yadav) -> KKR and MI
    AuctionStore.placeBid(code, kkrUser.sessionToken, 'kkr', 10 * CRORE, 'b9');
    AuctionStore.placeBid(code, miUser.sessionToken, 'mi', 14 * CRORE, 'b10');
    AuctionStore.finalizePlayer(code, hostToken);

    // Player 4 (Shubman Gill) -> CSK wins for 12 Cr
    AuctionStore.placeBid(code, cskUser.sessionToken, 'csk', 12 * CRORE, 'b11');
    AuctionStore.finalizePlayer(code, hostToken);

    // Conclude auction
    const completedRoom = AuctionStore.finishAuction(code, hostToken);
    expect(completedRoom.status).toBe('COMPLETED');
    expect(completedRoom.reportSlug).toBeTruthy();

    const report = AuctionStore.getReport(completedRoom.reportSlug!);
    expect(report).toBeTruthy();
    expect(report?.stats.totalPlayersSold).toBe(4);
    expect(report?.stats.totalSpent).toBe((21 + 16 + 14 + 12) * CRORE);
    expect(report?.rankings.length).toBe(10);

    console.log('\n=========================================');
    console.log('✅ SAMPLE AUCTION REPORT CREATED');
    console.log(`Room Code: ${code}`);
    console.log(`Persistent Report Slug: ${completedRoom.reportSlug}`);
    console.log(`URL Route: /reports/${completedRoom.reportSlug}`);
    console.log('=========================================\n');
  });
});
