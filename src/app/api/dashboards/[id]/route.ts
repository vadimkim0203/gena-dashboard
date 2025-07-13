import { dashboards } from '@/lib/mockData';
import {
  deleteDashboard,
  getDashboardById,
  updateDashboard,
} from '@/lib/mockStore';
import { NextRequest, NextResponse } from 'next/server';

let dashboardStore = [...dashboards];

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const { id } = await Promise.resolve(params);
  const dashboard = getDashboardById(id);

  if (!dashboard) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  return NextResponse.json(dashboard);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const { id } = await Promise.resolve(params);
  const body = await request.json();

  const dashboard = updateDashboard(id, body);
  if (!dashboard) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  return NextResponse.json(dashboard);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const { id } = await Promise.resolve(params);
  deleteDashboard(id);
  return NextResponse.json({ message: 'Deleted' });
}
