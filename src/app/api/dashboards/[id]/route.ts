import { NextRequest, NextResponse } from 'next/server';
import { dashboards } from '@/lib/mockData';
import { deleteDashboard, updateDashboard } from '@/lib/mockStore';

function getIdFromRequest(request: NextRequest) {
  const url = new URL(request.url);
  const segments = url.pathname.split('/');
  return segments[segments.length - 1];
}

export async function GET(request: NextRequest) {
  const id = getIdFromRequest(request);
  const dashboard = dashboards.find((d) => d.id === id);

  if (!dashboard) {
    return NextResponse.json(
      { message: 'Dashboard not found' },
      { status: 404 },
    );
  }
  return NextResponse.json(dashboard);
}

export async function PUT(request: NextRequest) {
  try {
    const id = getIdFromRequest(request);
    const body = await request.json();
    const updated = updateDashboard(id, body);

    if (!updated) {
      return NextResponse.json(
        { message: 'Dashboard not found' },
        { status: 404 },
      );
    }

    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json(
      {
        message: 'Server error',
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
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
