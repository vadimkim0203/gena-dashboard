import { NextRequest, NextResponse } from 'next/server';
import { Chart, charts } from '@/lib/mockData';
import { deleteChart } from '@/lib/mockStore';

const chartStore: Chart[] = [...charts];

function getIdFromRequest(request: NextRequest) {
  const url = new URL(request.url);
  const segments = url.pathname.split('/');
  return segments[segments.length - 1];
}

export async function GET(request: NextRequest) {
  const id = getIdFromRequest(request);
  const chart = chartStore.find((c) => c.id === id);

  if (!chart) {
    return NextResponse.json({ message: 'Chart not found' }, { status: 404 });
  }
  return NextResponse.json(chart);
}

export async function PUT(request: NextRequest) {
  const id = getIdFromRequest(request);
  const body = await request.json();

  const index = chartStore.findIndex((c) => c.id === id);
  if (index === -1) {
    return NextResponse.json({ message: 'Chart not found' }, { status: 404 });
  }

  chartStore[index] = { ...chartStore[index], ...body };
  return NextResponse.json(chartStore[index]);
}

export async function DELETE(request: NextRequest) {
  const id = getIdFromRequest(request);

  const success = deleteChart(id);

  if (!success) {
    return NextResponse.json({ message: 'Chart not found' }, { status: 404 });
  }

  return NextResponse.json({ message: 'Chart deleted' });
}