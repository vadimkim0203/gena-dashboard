import { charts } from '@/lib/mockData';
import {
  addChart,
  getEndpointForChartType,
} from '@/lib/mockStore';
import { NextRequest, NextResponse } from 'next/server';

const chartStore = charts;

export async function GET() {
  return NextResponse.json(chartStore);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const fallbackEndpoint = getEndpointForChartType(body.type);

    const newChart = {
      id: `chart-${Date.now()}`,
      dashboardId: body.dashboardId,
      type: body.type,
      title: body.title,
      dataEndpoint: body.dataEndpoint || fallbackEndpoint,
      order: body.order || Date.now(),
    };

    const createdChart = addChart(newChart);

    return NextResponse.json(createdChart, { status: 201 });
  } catch (error) {
    console.error('Error creating chart:', error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : 'Failed to create chart',
      },
      { status: 500 },
    );
  }
}
