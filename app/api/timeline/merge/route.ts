import { NextResponse } from 'next/server';
import { getTimelineDB } from '@/lib/timeline-db';

export async function POST(request: Request) {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] 📥 POST /api/timeline/merge`);

  try {
    const { sourceTimelineId } = await request.json();

    console.log(`[${timestamp}] 🔀 Merging timeline: ${sourceTimelineId}`);

    if (!sourceTimelineId) {
      return NextResponse.json(
        { error: 'Source timeline ID is required' },
        { status: 400 }
      );
    }

    const timelineDB = getTimelineDB();
    await timelineDB.mergeTimeline(sourceTimelineId);

    console.log(`[${timestamp}] ✅ Timeline merged successfully`);

    return NextResponse.json({
      success: true,
      message: `Timeline merged successfully in 8 seconds!`,
    });
  } catch (error) {
    console.error(`[${timestamp}] ❌ Error merging timeline:`, error);
    return NextResponse.json(
      { error: 'Failed to merge timeline', details: (error as Error).message },
      { status: 500 }
    );
  }
}
