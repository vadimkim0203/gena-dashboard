import { CustomData } from '@/lib/type';
import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

const customDataStore = new Map<string, CustomData[]>();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { data, name } = body;

    if (!Array.isArray(data)) {
      return NextResponse.json(
        { error: 'Data must be an array' },
        { status: 400 },
      );
    }

    const dataId = name || `custom_${uuidv4()}`;
    customDataStore.set(dataId, data);

    return NextResponse.json({
      success: true,
      endpoint: `/api/data/${dataId}`,
      id: dataId,
    });
  } catch {
    return NextResponse.json(
      { error: 'Failed to store data' },
      { status: 500 },
    );
  }
}
