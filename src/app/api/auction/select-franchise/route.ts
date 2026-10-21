import { NextRequest, NextResponse } from 'next/server';
import { AuctionStore } from '@/lib/auction-store';
import { forwardToRender } from '@/lib/forward-backend';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const forwarded = await forwardToRender(req, '/api/auction/select-franchise');
    if (forwarded) return forwarded;

    const body = await req.json();
    const { roomCode, sessionToken, franchiseId } = body;

    if (!roomCode || !sessionToken) {
      return NextResponse.json(
        { error: 'Room code and session token are required.' },
        { status: 400 }
      );
    }

    const updatedRoom = AuctionStore.selectFranchise(
      roomCode,
      sessionToken,
      franchiseId || null
    );

    return NextResponse.json({
      success: true,
      room: updatedRoom,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || 'Failed to select franchise' },
      { status: 400 }
    );
  }
}
