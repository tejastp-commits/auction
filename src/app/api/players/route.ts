import { NextRequest, NextResponse } from 'next/server';
import { VERIFIED_PLAYERS } from '@/data/players';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get('q')?.toLowerCase() || '';
    const role = searchParams.get('role');
    const isOverseas = searchParams.get('overseas');
    const bowlingType = searchParams.get('bowling');
    const status = searchParams.get('status')?.toUpperCase();
    const capped = searchParams.get('capped')?.toUpperCase();
    const franchise = searchParams.get('franchise')?.toLowerCase();
    const sortBy = searchParams.get('sortBy') || 'runs';

    let list = [...VERIFIED_PLAYERS];

    if (search) {
      list = list.filter(
        (p) =>
          p.canonicalName.toLowerCase().includes(search) ||
          p.nationality.toLowerCase().includes(search) ||
          p.secondaryRole?.toLowerCase().includes(search) ||
          p.profileSummary.toLowerCase().includes(search) ||
          p.stateAssociation?.toLowerCase().includes(search) ||
          p.currentAffiliation?.latestConfirmedFranchise?.toLowerCase().includes(search)
      );
    }

    if (role && role !== 'ALL') {
      list = list.filter((p) => p.primaryRole === role);
    }

    if (isOverseas !== null && isOverseas !== undefined && isOverseas !== '' && isOverseas !== 'ALL') {
      const boolVal = isOverseas === 'true';
      list = list.filter((p) => p.isOverseas === boolVal);
    }

    if (bowlingType && bowlingType !== 'ALL') {
      list = list.filter((p) => p.bowlingType === bowlingType);
    }

    if (capped && capped !== 'ALL') {
      list = list.filter((p) => (p.internationalStatus || 'UNCAPPED') === capped);
    }

    if (status && status !== 'ALL') {
      list = list.filter((p) => p.currentAffiliation?.latestAuctionStatus === status);
    }

    if (franchise && franchise !== 'ALL') {
      list = list.filter(
        (p) =>
          p.currentAffiliation?.latestConfirmedFranchiseId?.toLowerCase() === franchise ||
          p.currentAffiliation?.latestConfirmedFranchise?.toLowerCase().includes(franchise)
      );
    }

    if (sortBy === 'runs') {
      list.sort((a, b) => b.stats.runs - a.stats.runs);
    } else if (sortBy === 'wickets') {
      list.sort((a, b) => b.stats.wickets - a.stats.wickets);
    } else if (sortBy === 'strikeRate') {
      list.sort((a, b) => b.stats.strikeRate - a.stats.strikeRate);
    } else if (sortBy === 'age') {
      list.sort((a, b) => a.calculatedAge - b.calculatedAge);
    } else if (sortBy === 'basePrice') {
      list.sort((a, b) => b.defaultBasePrice - a.defaultBasePrice);
    } else if (sortBy === 'soldPrice') {
      list.sort((a, b) => {
        const pA = a.auctionHistory?.[0]?.finalSoldPrice || 0;
        const pB = b.auctionHistory?.[0]?.finalSoldPrice || 0;
        return pB - pA;
      });
    }

    return NextResponse.json({
      success: true,
      total: list.length,
      players: list,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || 'Failed to search players' },
      { status: 500 }
    );
  }
}
