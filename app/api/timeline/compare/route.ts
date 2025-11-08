import { NextResponse } from 'next/server';
import { getTimelineDB } from '@/lib/timeline-db';

export async function POST(request: Request) {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] 📥 POST /api/timeline/compare`);

  try {
    const { timeline1, timeline2 } = await request.json();

    console.log(`[${timestamp}] 🔍 Comparing: ${timeline1} vs ${timeline2}`);

    if (!timeline1 || !timeline2) {
      return NextResponse.json(
        { error: 'Both timeline IDs are required' },
        { status: 400 }
      );
    }

    const timelineDB = getTimelineDB();
    const comparison = await timelineDB.compareTimelines(timeline1, timeline2);

    console.log(`[${timestamp}] ✅ Comparison complete`);

    return NextResponse.json({
      success: true,
      comparison,
    });
  } catch (error) {
    console.error(`[${timestamp}] ❌ Error comparing timelines:`, error);
    return NextResponse.json(
      { error: 'Failed to compare timelines', details: (error as Error).message },
      { status: 500 }
    );
  }
}
