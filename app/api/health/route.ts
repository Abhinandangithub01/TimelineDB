import { NextRequest, NextResponse } from 'next/server';
import { testConnection, getMainPool } from '@/lib/database';

export async function GET(request: NextRequest) {
  console.log('========== TIMELINEDB HEALTH CHECK ==========');
  
  const startTime = Date.now();
  
  const health = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
    application: 'TimelineDB',
    services: {
      api: 'operational',
      database: 'unknown',
      tiger: 'unknown',
      timelines: 'operational',
    },
    version: '1.0.0',
  };

  // Check database connection
  try {
    if (process.env.TIGER_DATABASE_URL) {
      const pool = getMainPool();
      const dbConnected = await testConnection(pool);
      health.services.database = dbConnected ? 'operational' : 'degraded';
      health.services.tiger = dbConnected ? 'operational' : 'degraded';
    } else {
      health.services.database = 'mock';
      health.services.tiger = 'mock';
    }
  } catch (error) {
    health.services.database = 'error';
    health.services.tiger = 'error';
    console.error('Database health check failed:', error);
  }

  // TimelineDB doesn't need AI providers, but check if configured
  const aiConfigured = !!(process.env.GROQ_API_KEY || process.env.OPENAI_API_KEY);
  if (aiConfigured) {
    (health.services as any).ai = 'configured';
  }

  const responseTime = Date.now() - startTime;
  
  return NextResponse.json({
    ...health,
    responseTime: `${responseTime}ms`,
  });
}
