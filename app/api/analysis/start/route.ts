import { NextRequest, NextResponse } from 'next/server';
import { createAnalysisSession, startAnalysis, getAnalysisSession } from '@/lib/analysis-service';
import { AnalysisRequestSchema, sanitizeInput } from '@/lib/validation';
import { z } from 'zod';

export async function POST(request: NextRequest) {
  try {
    // Parse and validate request body
    const body = await request.json();
    
    // Handle status check requests
    if (body.checkStatus && body.sessionId) {
      console.log('Status check for session:', body.sessionId);
      const session = getAnalysisSession(body.sessionId);
      
      if (!session) {
        console.error('Session not found:', body.sessionId);
        return NextResponse.json({
          status: 'not_found',
          message: 'Session not found'
        }, { status: 200 }); // Return 200 even if not found to avoid 404 errors
      }
      
      // Include error message if status is error
      const response: any = {
        sessionId: session.sessionId,
        status: session.status,
        progress: Math.round(session.progress),
        currentStage: session.currentStage,
        results: session.status === 'completed' ? session.results : null
      };
      
      // Add error field if session has error status
      if (session.status === 'error') {
        response.error = 'Analysis failed - check server logs for details';
        response.message = 'Please check environment variables are configured correctly';
      }
      
      return NextResponse.json(response);
    }
    
    // Validate with Zod schema
    const validationResult = AnalysisRequestSchema.safeParse(body);
    
    if (!validationResult.success) {
      return NextResponse.json(
        { 
          error: 'Validation failed', 
          details: validationResult.error.issues.map((e: any) => e.message).join(', ')
        },
        { status: 400 }
      );
    }

    const { code, githubUrl, options } = validationResult.data;

    // Sanitize input
    const codeContent = code 
      ? sanitizeInput(code) 
      : `Sample code from ${githubUrl}`;

    // Create new analysis session
    const session = createAnalysisSession();
    console.log('✅ Created session:', session.sessionId);

    // Start analysis (async) - don't await to return immediately
    startAnalysis(session.sessionId, codeContent).catch(error => {
      console.error('Analysis error for session', session.sessionId, ':', error);
    });

    // Return immediately
    console.log('✅ Returning session to client:', session.sessionId);
    return NextResponse.json({
      sessionId: session.sessionId,
      status: 'started',
      estimatedTime: 180000, // 3 minutes in ms
      message: 'Analysis started successfully',
      timestamp: new Date().toISOString()
    }, { status: 202 }); // 202 Accepted
    
  } catch (error) {
    console.error('Error starting analysis:', error);
    
    // Differentiate error types
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: 'Invalid JSON in request body' },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { 
        error: 'Internal server error',
        message: process.env.NODE_ENV === 'development' 
          ? (error as Error).message 
          : 'Failed to start analysis'
      },
      { status: 500 }
    );
  }
}

// Handle OPTIONS for CORS
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
