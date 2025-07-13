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
  try {
    const { id } = await Promise.resolve(params);
    const data = await request.json();

    const dashboard = updateDashboard(id, data);
    if (!dashboard) {
      return NextResponse.json(
        { error: 'Failed to update dashboard' },
        { status: 500 },
      );
    }

    return NextResponse.json(dashboard);
  } catch (error) {
    console.error('Error updating dashboard:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const { id } = await Promise.resolve(params);
  deleteDashboard(id);
  return NextResponse.json({ message: 'Deleted' });
}
