import { NextResponse } from 'next/server';

export async function GET() {
  const data = [
    { label: 'January', desktop: 186, mobile: 80 },
    { label: 'February', desktop: 305, mobile: 200 },
    { label: 'March', desktop: 237, mobile: 120 },
    { label: 'April', desktop: 73, mobile: 190 },
    { label: 'May', desktop: 209, mobile: 130 },
    { label: 'June', desktop: 214, mobile: 140 },
  ];

  return NextResponse.json(data);
}