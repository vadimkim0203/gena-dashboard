import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const productPerformanceData = [
      { product: 'Product A', sales: 1500 },
      { product: 'Product B', sales: 2300 },
      { product: 'Product C', sales: 900 },
      { product: 'Product D', sales: 1200 },
      { product: 'Product E', sales: 3000 },
    ];

    return NextResponse.json(productPerformanceData);
  } catch (error) {
    console.error('Error generating product performance data:', error);
    return NextResponse.json(
      { error: 'Failed to generate product performance data' },
      { status: 500 },
    );
  }
}
