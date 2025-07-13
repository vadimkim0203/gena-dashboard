import { charts } from '@/lib/mockData';
import {
  addChart,
  deleteChart,
  getDashboardById,
  updateDashboard,
} from '@/lib/mockStore';
import { NextRequest, NextResponse } from 'next/server';

let chartStore = charts;

export async function GET() {
  return NextResponse.json(chartStore);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Create new chart with unique ID
    const newChart = {
      id: `chart-${Date.now()}`,
      dashboardId: body.dashboardId,
      type: body.type,
      title: body.title,
      dataEndpoint: body.dataEndpoint || '/api/data/default',
      order: body.order || Date.now(),
    };

    const createdChart = addChart(newChart);

    return NextResponse.json(createdChart, { status: 201 });
  } catch (error) {
    console.error('Error creating chart:', error);
    return NextResponse.json(
      { error: 'Failed to create chart' },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = await Promise.resolve(params);
    const success = deleteChart(id);

    if (!success) {
      return NextResponse.json({ error: 'Chart not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Chart deleted' });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete chart' },
      { status: 500 },
    );
  }
}
