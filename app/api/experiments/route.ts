import { NextRequest, NextResponse } from 'next/server';
import {
  runParallelSecurityTests,
  runABTest,
  validateNewPatterns,
  ExperimentConfig
} from '@/lib/tiger-fork-experiments';

/**
 * POST /api/experiments
 * Run fork-based experiments
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, code, configs } = body;
    
    if (!type || !code) {
      return NextResponse.json(
        { error: 'Missing required fields: type, code' },
        { status: 400 }
      );
    }
    
    let result;
    
    switch (type) {
      case 'parallel':
        // Run parallel tests with multiple configurations
        if (!configs || !Array.isArray(configs)) {
          return NextResponse.json(
            { error: 'configs array required for parallel tests' },
            { status: 400 }
          );
        }
        result = await runParallelSecurityTests(code, configs);
        break;
        
      case 'ab_test':
        // A/B test two configurations
        if (!body.configA || !body.configB) {
          return NextResponse.json(
            { error: 'configA and configB required for A/B test' },
            { status: 400 }
          );
        }
        result = await runABTest(code, body.configA, body.configB);
        break;
        
      case 'validate_patterns':
        // Validate new patterns
        if (!body.testCode || !body.newPatterns) {
          return NextResponse.json(
            { error: 'testCode and newPatterns required' },
            { status: 400 }
          );
        }
        result = await validateNewPatterns(
          body.testCode,
          body.newPatterns,
          body.existingPatterns || []
        );
        break;
        
      default:
        return NextResponse.json(
          { error: `Unknown experiment type: ${type}` },
          { status: 400 }
        );
    }
    
    return NextResponse.json({
      success: true,
      type,
      result,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Experiment API error:', error);
    return NextResponse.json(
      { 
        error: 'Experiment failed',
        message: (error as Error).message 
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/experiments
 * Get experiment templates and examples
 */
export async function GET(request: NextRequest) {
  const templates = {
    configs: {
      strict: {
        name: 'Strict Security Rules',
        description: 'High sensitivity, catches everything including borderline cases',
        rulesSet: 'strict'
      },
      permissive: {
        name: 'Permissive Security Rules',
        description: 'High precision, fewer false positives',
        rulesSet: 'permissive'
      },
      balanced: {
        name: 'Balanced Security Rules',
        description: 'Good balance of detection and accuracy',
        rulesSet: 'custom',
        customRules: {
          patterns: [
            { type: 'SQL Injection', pattern: '/query.*=.*f"|SELECT.*\\+/i' },
            { type: 'XSS', pattern: '/<script|innerHTML.*=/i' },
            { type: 'Secrets', pattern: '/(password|secret|key)\\s*=\\s*["\'][a-zA-Z0-9]+["\\']/i' }
          ]
        }
      }
    },
    examples: {
      parallel_test: {
        type: 'parallel',
        code: 'username = input("Username: ")\\nquery = f"SELECT * FROM users WHERE username=\\'{username}\\'"',
        configs: ['strict', 'permissive', 'balanced']
      },
      ab_test: {
        type: 'ab_test',
        code: 'password = "admin123"\\neval(user_input)',
        configA: 'strict',
        configB: 'permissive'
      },
      validate_patterns: {
        type: 'validate_patterns',
        testCode: ['SELECT * FROM users', 'eval(x)', 'password="test"'],
        newPatterns: [{ type: 'Test', pattern: '/test/i' }]
      }
    },
    documentation: {
      parallel_test: 'Run multiple configurations in parallel using Tiger forks',
      ab_test: 'Compare two configurations head-to-head',
      validate_patterns: 'Test new security patterns before deploying'
    }
  };
  
  return NextResponse.json(templates);
}
