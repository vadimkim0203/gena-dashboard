import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const totalVisitorsData = [
      { browser: 'Chrome', visitors: 1840 },
      { browser: 'Safari', visitors: 950 },
      { browser: 'Firefox', visitors: 582 },
      { browser: 'Edge', visitors: 370 },
      { browser: 'Opera', visitors: 280 },
      { browser: 'Other', visitors: 178 }
    ];

    return NextResponse.json(totalVisitorsData);
  } catch (error) {
    console.error('Error generating total visitors data:', error);
    return NextResponse.json(
      { error: 'Failed to generate total visitors data' },
      { status: 500 }
    );
  }
}