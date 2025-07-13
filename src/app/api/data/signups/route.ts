import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json([
    { label: 'North America', value: 120 },
    { label: 'Europe', value: 90 },
    { label: 'Asia', value: 180 },
  ]);
}