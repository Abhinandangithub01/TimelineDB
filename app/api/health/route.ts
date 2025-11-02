import { NextRequest, NextResponse } from 'next/server';
import { testConnection, getMainPool } from '@/lib/database';

export async function GET(request: NextRequest) {
  const startTime = Date.now();
  
  const health = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
    services: {
      api: 'operational',
      database: 'unknown',
      tiger: 'unknown',
      openai: 'unknown',
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

  // Check AI providers
  const aiProviders = [];
  if (process.env.GROQ_API_KEY) aiProviders.push('groq');
  if (process.env.PERPLEXITY_API_KEY) aiProviders.push('perplexity');
  if (process.env.OPENAI_API_KEY) aiProviders.push('openai');
  
  health.services.openai = aiProviders.length > 0 
    ? aiProviders.join('+') 
    : 'mock';

  const responseTime = Date.now() - startTime;
  
  return NextResponse.json({
    ...health,
    responseTime: `${responseTime}ms`,
  });
}
