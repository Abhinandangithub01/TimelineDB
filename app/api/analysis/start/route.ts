import { NextRequest, NextResponse } from 'next/server';
import { createAnalysisSession, startAnalysis, getAnalysisSession } from '@/lib/analysis-service';
import { AnalysisRequestSchema, sanitizeInput } from '@/lib/validation';
import { fetchGitHubRepository, isGitHubUrl } from '@/lib/github-fetcher';
import { z } from 'zod';

export async function POST(request: NextRequest) {
  // CRITICAL: Use multiple logging methods to ensure visibility
  const timestamp = new Date().toISOString();
  
  // Method 1: Standard console
  console.log(`[${timestamp}] ========================================`);
  console.log(`[${timestamp}] 🚀 POST /api/analysis/start called`);
  console.log(`[${timestamp}] ========================================`);
  
  // Method 2: Console error (higher priority)
  console.error(`[${timestamp}] ========================================`);
  console.error(`[${timestamp}] 🚀 POST /api/analysis/start called`);
  console.error(`[${timestamp}] ========================================`);
  
  // Method 3: Direct stdout/stderr
  process.stdout.write(`[${timestamp}] STDOUT: API called\n`);
  process.stderr.write(`[${timestamp}] STDERR: API called\n`);
  
  const log = (...args: any[]) => {
    const ts = new Date().toISOString();
    console.log(`[${ts}]`, ...args);
    console.error(`[${ts}]`, ...args);
  };
  
  try {
    // Parse and validate request body
    log('📥 Parsing request body...');
    const body = await request.json();
    log('✅ Request body parsed:', Object.keys(body));
    
    // Handle status check requests
    if (body.checkStatus && body.sessionId) {
      log('📊 Status check for session:', body.sessionId);
      const session = getAnalysisSession(body.sessionId);
      
      if (!session) {
        log('❌ Session not found:', body.sessionId);
        return NextResponse.json({
          status: 'not_found',
          message: 'Session not found'
        }, { status: 200 }); // Return 200 even if not found to avoid 404 errors
      }
      
      log('✅ Session found, status:', session.status);
      
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
        log('❌ Session has error status');
        response.error = 'Analysis failed - check server logs for details';
        response.message = 'Please check environment variables are configured correctly';
      }
      
      return NextResponse.json(response);
    }
    
    // Validate with Zod schema
    log('🔍 Validating request schema...');
    const validationResult = AnalysisRequestSchema.safeParse(body);
    
    if (!validationResult.success) {
      log('❌ Validation failed:', validationResult.error.issues);
      return NextResponse.json(
        { 
          error: 'Validation failed', 
          details: validationResult.error.issues.map((e: any) => e.message).join(', ')
        },
        { status: 400 }
      );
    }

    log('✅ Validation passed');
    const { code, githubUrl, options } = validationResult.data;

    // Handle GitHub URL or direct code
    let codeContent: string;
    
    if (githubUrl && isGitHubUrl(githubUrl)) {
      log('📦 GitHub URL detected, fetching repository...');
      try {
        codeContent = await fetchGitHubRepository(githubUrl);
        log('✅ GitHub repository fetched successfully');
      } catch (error) {
        log('❌ GitHub fetch failed:', (error as Error).message);
        return NextResponse.json(
          { 
            error: 'GitHub fetch failed', 
            details: (error as Error).message 
          },
          { status: 400 }
        );
      }
    } else if (code) {
      codeContent = sanitizeInput(code);
      log('📝 Using provided code');
    } else {
      log('❌ No code or GitHub URL provided');
      return NextResponse.json(
        { error: 'Either code or githubUrl must be provided' },
        { status: 400 }
      );
    }
    
    log('📝 Code content length:', codeContent.length);

    // Create new analysis session
    log('🆕 Creating analysis session...');
    const session = createAnalysisSession();
    log('✅ Created session:', session.sessionId);

    // Start analysis (async) - don't await to return immediately
    log('🚀 Starting analysis asynchronously...');
    startAnalysis(session.sessionId, codeContent).catch(error => {
      log('❌ Analysis error for session', session.sessionId, ':', error);
      log('Error stack:', error.stack);
    });

    // Return immediately
    log('✅ Returning session to client:', session.sessionId);
    return NextResponse.json({
      sessionId: session.sessionId,
      status: 'started',
      estimatedTime: 180000, // 3 minutes in ms
      message: 'Analysis started successfully',
      timestamp: new Date().toISOString()
    }, { status: 202 }); // 202 Accepted
    
  } catch (error) {
    log('❌❌❌ FATAL ERROR in POST handler ❌❌❌');
    log('Error:', error);
    log('Error type:', (error as any).constructor.name);
    log('Error message:', (error as Error).message);
    log('Error stack:', (error as Error).stack);
    
    // Differentiate error types
    if (error instanceof SyntaxError) {
      log('Error is SyntaxError');
      return NextResponse.json(
        { error: 'Invalid JSON in request body' },
        { status: 400 }
      );
    }
    
    log('Returning 500 error response');
    return NextResponse.json(
      { 
        error: 'Internal server error',
        message: (error as Error).message,
        stack: process.env.NODE_ENV === 'development' ? (error as Error).stack : undefined
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
