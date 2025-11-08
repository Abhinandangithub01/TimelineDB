import { NextResponse } from 'next/server';
import { getTimelineDB } from '@/lib/timeline-db';

export async function POST(request: Request) {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] 📥 POST /api/timeline/snapshot`);

  try {
    const { description } = await request.json();

    console.log(`[${timestamp}] 📸 Creating snapshot: ${description}`);

    if (!description) {
      return NextResponse.json(
        { error: 'Description is required' },
        { status: 400 }
      );
    }

    const timelineDB = getTimelineDB();
    const snapshot = await timelineDB.createSnapshot(description);

    console.log(`[${timestamp}] ✅ Snapshot created: ${snapshot.id}`);

    return NextResponse.json({
      success: true,
      snapshot,
      message: 'Snapshot created successfully!',
    });
  } catch (error) {
    console.error(`[${timestamp}] ❌ Error creating snapshot:`, error);
    return NextResponse.json(
      { error: 'Failed to create snapshot', details: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  const timestamp = new Date().toISOString();
  const { searchParams } = new URL(request.url);
  const timelineId = searchParams.get('timelineId');

  console.log(`[${timestamp}] 📥 GET /api/timeline/snapshot?timelineId=${timelineId}`);

  try {
    if (!timelineId) {
      return NextResponse.json(
        { error: 'Timeline ID is required' },
        { status: 400 }
      );
    }

    const timelineDB = getTimelineDB();
    const snapshots = await timelineDB.getHistory(timelineId);

    console.log(`[${timestamp}] ✅ Retrieved ${snapshots.length} snapshots`);

    return NextResponse.json({
      success: true,
      snapshots,
      count: snapshots.length,
    });
  } catch (error) {
    console.error(`[${timestamp}] ❌ Error retrieving snapshots:`, error);
    return NextResponse.json(
      { error: 'Failed to retrieve snapshots', details: (error as Error).message },
      { status: 500 }
    );
  }
}
