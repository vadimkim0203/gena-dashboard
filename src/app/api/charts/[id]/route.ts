import { charts } from '@/lib/mockData';
import { NextRequest, NextResponse } from 'next/server';

let chartStore = [...charts];

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const { id } = await Promise.resolve(params);
  const chart = chartStore.find((c) => c.id === id);

  if (!chart) {
    return NextResponse.json({ message: 'Chart not found' }, { status: 404 });
  }
  return NextResponse.json(chart);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const { id } = await Promise.resolve(params);
  const body = await request.json();
  const index = chartStore.findIndex((c) => c.id === id);

  if (index === -1) {
    return NextResponse.json({ message: 'Chart not found' }, { status: 404 });
  }

  chartStore[index] = { ...chartStore[index], ...body };
  return NextResponse.json(chartStore[index]);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const { id } = await Promise.resolve(params);
  chartStore = chartStore.filter((c) => c.id !== id);
  return NextResponse.json({ message: 'Chart deleted' });
}
