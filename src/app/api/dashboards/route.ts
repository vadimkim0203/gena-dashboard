import { NextRequest, NextResponse } from 'next/server';
import { addDashboard, getDashboards } from '@/lib/mockStore';

export async function GET() {
  try {
    const dashboards = getDashboards();
    return NextResponse.json(dashboards);
  } catch (error) {
    console.error('Error fetching dashboards:', error);
    return NextResponse.json(
      { error: 'Failed to fetch dashboards' },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  const newDashboard = {
    id: `dashboard-${Date.now()}`,
    name: body.name || 'New Dashboard',
    charts: [],
  };

  addDashboard(newDashboard);
  return NextResponse.json(newDashboard);
}
