import { NextResponse } from 'next/server';
import { getTimelineDB } from '@/lib/timeline-db';

export async function POST() {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] 📥 POST /api/timeline/init`);

  try {
    console.log(`[${timestamp}] 🚀 Initializing TimelineDB schema...`);

    const timelineDB = getTimelineDB();
    await timelineDB.initialize();

    console.log(`[${timestamp}] ✅ TimelineDB initialized successfully`);

    return NextResponse.json({
      success: true,
      message: 'TimelineDB initialized successfully',
    });
  } catch (error) {
    console.error(`[${timestamp}] ❌ Error initializing TimelineDB:`, error);
    return NextResponse.json(
      { error: 'Failed to initialize TimelineDB', details: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function GET() {
  return POST();
}
