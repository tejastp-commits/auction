import { NextRequest, NextResponse } from 'next/server';
import { AuctionStore } from '@/lib/auction-store';
import { forwardToRender } from '@/lib/forward-backend';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const forwarded = await forwardToRender(req, '/api/auction/join');
    if (forwarded) return forwarded;

    const body = await req.json();
    const { roomCode, displayName, sessionToken } = body;

    if (!roomCode) {
      return NextResponse.json(
        { error: 'Room code is required.' },
        { status: 400 }
      );
    }

    const result = AuctionStore.joinRoom(roomCode, displayName, sessionToken);

    return NextResponse.json({
      success: true,
      ...result,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || 'Failed to join room' },
      { status: 400 }
    );
  }
}
