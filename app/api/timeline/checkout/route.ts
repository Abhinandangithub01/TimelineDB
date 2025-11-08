import { NextResponse } from 'next/server';
import { getTimelineDB } from '@/lib/timeline-db';

export async function POST(request: Request) {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] 📥 POST /api/timeline/checkout`);

  try {
    const { timelineId } = await request.json();

    console.log(`[${timestamp}] 🔄 Checking out timeline: ${timelineId}`);

    if (!timelineId) {
      return NextResponse.json(
        { error: 'Timeline ID is required' },
        { status: 400 }
      );
    }

    const timelineDB = getTimelineDB();
    await timelineDB.checkout(timelineId);

    console.log(`[${timestamp}] ✅ Checked out timeline successfully`);

    return NextResponse.json({
      success: true,
      message: `Checked out timeline in 8 seconds!`,
      timelineId,
    });
  } catch (error) {
    console.error(`[${timestamp}] ❌ Error checking out timeline:`, error);
    return NextResponse.json(
      { error: 'Failed to checkout timeline', details: (error as Error).message },
      { status: 500 }
    );
  }
}
