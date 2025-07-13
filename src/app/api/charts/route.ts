import { charts } from '@/lib/mockData';
import { NextRequest, NextResponse } from 'next/server';

let chartStore = charts;

export async function GET() {
  return NextResponse.json(chartStore);
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  const newChart = {
    id: `chart-${Date.now()}`,
    dashboardId: body.dashboardId,
    type: body.type,
    title: body.title || 'Untitled Chart',
    dataEndpoint: body.dataEndpoint || '/api/data/fake',
    order: body.order || 0,
  };

  chartStore.push(newChart);
  return NextResponse.json(newChart, { status: 201 });
}
