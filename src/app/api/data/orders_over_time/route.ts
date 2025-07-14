import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const ordersData = [
      { label: 'Jan', value: 420 },
      { label: 'Feb', value: 580 },
      { label: 'Mar', value: 650 },
      { label: 'Apr', value: 890 },
      { label: 'May', value: 1100 },
      { label: 'Jun', value: 1200 }
    ];

    return NextResponse.json(ordersData);
  } catch (error) {
    console.error('Error generating orders data:', error);
    return NextResponse.json(
      { error: 'Failed to generate orders data' },
      { status: 500 }
    );
  }
}