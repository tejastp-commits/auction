import { NextRequest, NextResponse } from 'next/server';
import { AuctionStore } from '@/lib/auction-store';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const roomCode = searchParams.get('roomCode')?.toUpperCase();
    if (!roomCode) {
      return NextResponse.json({ error: 'roomCode is required' }, { status: 400 });
    }

    const room = AuctionStore.getRoom(roomCode);
    if (!room) {
      return NextResponse.json({ error: 'Room not found' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      roomCode: room.roomCode,
      total: room.queue.length,
      queue: room.queue,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Failed to fetch pool' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      roomCode,
      sessionToken,
      action,
      playerIds,
      auctionPlayerId,
      orderedAuctionPlayerIds,
      reason,
      insertPosition,
      autoRequeue,
      replacePending,
    } = body || {};

    if (!roomCode || !sessionToken || !action) {
      return NextResponse.json(
        { error: 'roomCode, sessionToken, and action are required' },
        { status: 400 }
      );
    }

    let updatedRoom;
    switch (action.toUpperCase()) {
      case 'ADD':
        if (!Array.isArray(playerIds) || playerIds.length === 0) {
          return NextResponse.json({ error: 'playerIds array is required' }, { status: 400 });
        }
        updatedRoom = AuctionStore.addPlayersToQueue(roomCode, sessionToken, playerIds);
        break;

      case 'REMOVE':
        if (!auctionPlayerId) {
          return NextResponse.json({ error: 'auctionPlayerId is required' }, { status: 400 });
        }
        updatedRoom = AuctionStore.removePlayerFromQueue(roomCode, sessionToken, auctionPlayerId);
        break;

      case 'SKIP':
        updatedRoom = AuctionStore.skipPlayer(roomCode, sessionToken, Boolean(autoRequeue));
        break;

      case 'EXCLUDE':
        if (!auctionPlayerId) {
          return NextResponse.json({ error: 'auctionPlayerId is required' }, { status: 400 });
        }
        updatedRoom = AuctionStore.excludePlayer(roomCode, sessionToken, auctionPlayerId, reason);
        break;

      case 'RESTORE':
        if (!auctionPlayerId) {
          return NextResponse.json({ error: 'auctionPlayerId is required' }, { status: 400 });
        }
        updatedRoom = AuctionStore.restorePlayer(
          roomCode,
          sessionToken,
          auctionPlayerId,
          insertPosition || 'END'
        );
        break;

      case 'NOMINATE':
        if (!auctionPlayerId) {
          return NextResponse.json({ error: 'auctionPlayerId is required' }, { status: 400 });
        }
        updatedRoom = AuctionStore.nominatePlayer(roomCode, sessionToken, auctionPlayerId);
        break;

      case 'REORDER':
        if (!Array.isArray(orderedAuctionPlayerIds)) {
          return NextResponse.json(
            { error: 'orderedAuctionPlayerIds array is required' },
            { status: 400 }
          );
        }
        updatedRoom = AuctionStore.reorderQueue(roomCode, sessionToken, orderedAuctionPlayerIds);
        break;

      case 'RESET':
        if (!auctionPlayerId) {
          return NextResponse.json({ error: 'auctionPlayerId is required' }, { status: 400 });
        }
        updatedRoom = AuctionStore.adminResetPlayer(roomCode, sessionToken, auctionPlayerId);
        break;

      case 'IMPORT':
        if (!Array.isArray(playerIds) || playerIds.length === 0) {
          return NextResponse.json({ error: 'playerIds array is required' }, { status: 400 });
        }
        updatedRoom = AuctionStore.importCustomPool(
          roomCode,
          sessionToken,
          playerIds,
          Boolean(replacePending)
        );
        break;

      default:
        return NextResponse.json({ error: `Unknown pool action: ${action}` }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      room: updatedRoom,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || 'Failed to execute pool action' },
      { status: 400 }
    );
  }
}
