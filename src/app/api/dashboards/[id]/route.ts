import { NextRequest, NextResponse } from 'next/server';
import { Dashboard, dashboards } from '@/lib/mockData';
import { deleteDashboard } from '@/lib/mockStore';

const dashboardStore: Dashboard[] = [...dashboards];

function getIdFromRequest(request: NextRequest) {
  const url = new URL(request.url);
  const segments = url.pathname.split('/');
  return segments[segments.length - 1];
}

export async function GET(request: NextRequest) {
  const id = getIdFromRequest(request);
  const dashboard = dashboardStore.find((d) => d.id === id);

  if (!dashboard) {
    return NextResponse.json(
      { message: 'Dashboard not found' },
      { status: 404 },
    );
  }
  return NextResponse.json(dashboard);
}

export async function PUT(request: NextRequest) {
  const id = getIdFromRequest(request);
  const body = await request.json();

  const index = dashboardStore.findIndex((d) => d.id === id);
  if (index === -1) {
    return NextResponse.json(
      { message: 'Dashboard not found' },
      { status: 404 },
    );
  }

  dashboardStore[index] = { ...dashboardStore[index], ...body };
  return NextResponse.json(dashboardStore[index]);
}

export async function DELETE(request: NextRequest) {
  const id = getIdFromRequest(request);
  const success = deleteDashboard(id);

  if (!success) {
    return NextResponse.json(
      { message: 'Dashboard not found' },
      { status: 404 },
    );
  }

  return NextResponse.json({ message: 'Dashboard deleted' });
}
