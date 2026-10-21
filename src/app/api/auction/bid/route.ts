import { NextRequest, NextResponse } from 'next/server';
import { AuctionStore } from '@/lib/auction-store';
import { forwardToRender } from '@/lib/forward-backend';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const forwarded = await forwardToRender(req, '/api/auction/bid');
    if (forwarded) return forwarded;

    const body = await req.json();
    const { roomCode, sessionToken, franchiseId, amount, commandId } = body;

    if (!roomCode || !sessionToken || !franchiseId || !amount || !commandId) {
      return NextResponse.json(
        {
          error:
            'Missing required bid parameters (roomCode, sessionToken, franchiseId, amount, commandId).',
        },
        { status: 400 }
      );
    }

    const updatedRoom = AuctionStore.placeBid(
      roomCode,
      sessionToken,
      franchiseId,
      Number(amount),
      String(commandId)
    );

    return NextResponse.json({
      success: true,
      room: updatedRoom,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || 'Bid rejected' },
      { status: 400 }
    );
  }
}
