import { customDataStore } from '@/lib/dataStore';
import { NextRequest, NextResponse } from 'next/server';

interface Params {
  params: { id: string };
}

export async function GET(request: NextRequest, context: Params) {
  const { id } = context.params;
  if (customDataStore.has(id)) {
    return NextResponse.json(customDataStore.get(id));
  }

  return NextResponse.json([{ label: 'Sample', value: 100 }]);
}
