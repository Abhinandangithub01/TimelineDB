import { NextResponse } from 'next/server';
import { getTimelineDB } from '@/lib/timeline-db';

export async function GET() {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] 📥 GET /api/timeline/list`);

  try {
    const timelineDB = getTimelineDB();
    const timelines = await timelineDB.listTimelines();

    console.log(`[${timestamp}] ✅ Retrieved ${timelines.length} timelines`);

    return NextResponse.json({
      success: true,
      timelines,
      count: timelines.length,
    });
  } catch (error) {
    console.error(`[${timestamp}] ❌ Error listing timelines:`, error);
    return NextResponse.json(
      { error: 'Failed to list timelines', details: (error as Error).message },
      { status: 500 }
    );
  }
}
