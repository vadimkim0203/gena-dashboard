import { NextRequest, NextResponse } from 'next/server';
import { addDashboard, getDashboards } from '@/lib/mockStore';

export async function GET() {
  return NextResponse.json(getDashboards());
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
