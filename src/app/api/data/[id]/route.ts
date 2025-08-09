import { customDataStore } from '@/lib/dataStore';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const id = params.id;

  if (customDataStore.has(id)) {
    return NextResponse.json(customDataStore.get(id));
  }

  return NextResponse.json([{ label: 'Sample', value: 100 }]);
}
