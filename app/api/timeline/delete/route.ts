import { NextResponse } from 'next/server';
import { getTimelineDB } from '@/lib/timeline-db';

export async function DELETE(request: Request) {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] 📥 DELETE /api/timeline/delete`);

  try {
    const { searchParams } = new URL(request.url);
    const timelineId = searchParams.get('timelineId');

    console.log(`[${timestamp}] 🗑️ Deleting timeline: ${timelineId}`);

    if (!timelineId) {
      return NextResponse.json(
        { error: 'Timeline ID is required' },
        { status: 400 }
      );
    }

    const timelineDB = getTimelineDB();
    await timelineDB.deleteTimeline(timelineId);

    console.log(`[${timestamp}] ✅ Timeline deleted successfully`);

    return NextResponse.json({
      success: true,
      message: 'Timeline deleted successfully',
    });
  } catch (error) {
    console.error(`[${timestamp}] ❌ Error deleting timeline:`, error);
    return NextResponse.json(
      { error: 'Failed to delete timeline', details: (error as Error).message },
      { status: 500 }
    );
  }
}
