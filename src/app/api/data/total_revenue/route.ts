import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const revenueData = { label: 'Total revenue', value: 75000 };
    return NextResponse.json(revenueData);
  } catch (error) {
    console.error('Error generating revenue data:', error);
    return NextResponse.json(
      {
        error: 'Failed to generate revenue data',
      },
      { status: 500 },
    );
  }
}
