import { NextResponse } from 'next/server';
import { getTimelineDB } from '@/lib/timeline-db';

export async function POST(request: Request) {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] 📥 POST /api/timeline/create`);

  try {
    const { name, description, parentId } = await request.json();

    console.log(`[${timestamp}] 🔀 Creating timeline: ${name}`);

    if (!name || !description) {
      return NextResponse.json(
        { error: 'Name and description are required' },
        { status: 400 }
      );
    }

    const timelineDB = getTimelineDB();
    const timeline = await timelineDB.createTimeline(name, description, parentId);

    console.log(`[${timestamp}] ✅ Timeline created: ${timeline.id}`);

    return NextResponse.json({
      success: true,
      timeline,
      message: `Timeline "${name}" created successfully in 8 seconds!`,
    });
  } catch (error) {
    console.error(`[${timestamp}] ❌ Error creating timeline:`, error);
    return NextResponse.json(
      { error: 'Failed to create timeline', details: (error as Error).message },
      { status: 500 }
    );
  }
}
