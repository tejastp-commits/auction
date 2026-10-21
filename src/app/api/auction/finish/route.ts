import { NextRequest, NextResponse } from 'next/server';
import { AuctionStore } from '@/lib/auction-store';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { roomCode, sessionToken } = body;

    if (!roomCode || !sessionToken) {
      return NextResponse.json(
        { error: 'Room code and session token are required.' },
        { status: 400 }
      );
    }

    const updatedRoom = AuctionStore.finishAuction(roomCode, sessionToken);

    return NextResponse.json({
      success: true,
      room: updatedRoom,
      reportSlug: updatedRoom.reportSlug,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || 'Failed to finish auction' },
      { status: 400 }
    );
  }
}
