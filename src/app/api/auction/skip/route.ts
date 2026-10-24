import { NextRequest, NextResponse } from 'next/server';
import { AuctionStore } from '@/lib/auction-store';
import { forwardToRender } from '@/lib/forward-backend';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const forwarded = await forwardToRender(req, '/api/auction/skip');
    if (forwarded) return forwarded;

    const body = await req.json();
    const { roomCode, sessionToken, autoRequeue, targetAuctionPlayerId, auctionPlayerId } = body;

    if (!roomCode || !sessionToken) {
      return NextResponse.json(
        { error: 'Room code and session token are required.' },
        { status: 400 }
      );
    }

    const targetId = targetAuctionPlayerId || auctionPlayerId;
    const updatedRoom = AuctionStore.skipPlayer(
      roomCode,
      sessionToken,
      Boolean(autoRequeue),
      targetId
    );

    return NextResponse.json({
      success: true,
      room: updatedRoom,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || 'Failed to skip player' },
      { status: 400 }
    );
  }
}
