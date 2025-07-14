import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const signupsData = [
      { label: 'North', value: 350 },
      { label: 'South', value: 420 },
      { label: 'East', value: 290 },
      { label: 'West', value: 510 }
    ];
    
    return NextResponse.json(signupsData);
  } catch (error) {
    console.error('Error generating signups data:', error);
    return NextResponse.json(
      { error: 'Failed to generate signups data' },
      { status: 500 }
    );
  }
}
