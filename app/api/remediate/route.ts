import { NextRequest, NextResponse } from 'next/server';
import {
  autoRemediateWithValidation,
  applyValidatedFixes,
  generateRemediationReport,
  Vulnerability
} from '@/lib/tiger-auto-remediation';

/**
 * POST /api/remediate
 * Auto-remediate vulnerabilities with fork validation
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { code, vulnerabilities, applyFixes = false } = body;
    
    if (!code || !vulnerabilities) {
      return NextResponse.json(
        { error: 'Code and vulnerabilities are required' },
        { status: 400 }
      );
    }
    
    console.log(`🔧 Auto-remediating ${vulnerabilities.length} vulnerabilities...`);
    
    // Generate and validate fixes
    const remediations = await autoRemediateWithValidation(code, vulnerabilities);
    
    // Optionally apply fixes
    let result: any = {
      remediations,
      report: generateRemediationReport(remediations)
    };
    
    if (applyFixes) {
      const applied = applyValidatedFixes(code, remediations);
      result.fixedCode = applied.fixedCode;
      result.appliedCount = applied.appliedCount;
      result.skippedCount = applied.skippedCount;
    }
    
    return NextResponse.json({
      success: true,
      result,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Auto-remediation API error:', error);
    return NextResponse.json(
      { 
        error: 'Auto-remediation failed',
        message: (error as Error).message 
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/remediate
 * Get information about auto-remediation capabilities
 */
export async function GET(request: NextRequest) {
  const info = {
    capabilities: {
      supportedVulnerabilities: [
        {
          type: 'SQL Injection',
          confidence: 0.95,
          fixType: 'Parameterized queries'
        },
        {
          type: 'Hardcoded Secret',
          confidence: 0.98,
          fixType: 'Environment variables'
        },
        {
          type: 'Code Injection (eval)',
          confidence: 0.92,
          fixType: 'Remove eval, use safe alternatives'
        },
        {
          type: 'Command Injection',
          confidence: 0.93,
          fixType: 'subprocess with argument list'
        },
        {
          type: 'XSS',
          confidence: 0.90,
          fixType: 'Input sanitization and output encoding'
        }
      ],
      validationProcess: [
        '1. Generate fix using AI + pattern matching',
        '2. Create Tiger fork for testing',
        '3. Apply fix to fork',
        '4. Run security scan on fixed code',
        '5. Verify vulnerability removed',
        '6. Check for new issues',
        '7. Validate functionality',
        '8. Measure performance impact',
        '9. Cleanup fork',
        '10. Return recommendation'
      ],
      recommendations: {
        apply: 'High confidence (>80%), validated, safe to auto-apply',
        review: 'Medium confidence or minor issues, needs human review',
        skip: 'Low confidence or validation failed, skip this fix'
      }
    },
    usage: {
      generateAndValidate: {
        endpoint: 'POST /api/remediate',
        body: {
          code: 'string',
          vulnerabilities: 'array',
          applyFixes: false
        },
        returns: 'Remediation results with recommendations'
      },
      applyFixes: {
        endpoint: 'POST /api/remediate',
        body: {
          code: 'string',
          vulnerabilities: 'array',
          applyFixes: true
        },
        returns: 'Fixed code with applied changes'
      }
    },
    examples: {
      sqlInjection: {
        before: 'query = f"SELECT * FROM users WHERE name=\'{user}\'"',
        after: 'query = "SELECT * FROM users WHERE name=%s"\ncursor.execute(query, (user,))',
        validated: true,
        recommendation: 'apply'
      },
      hardcodedSecret: {
        before: 'password = "admin123"',
        after: 'password = os.getenv("PASSWORD")',
        validated: true,
        recommendation: 'apply'
      }
    }
  };
  
  return NextResponse.json(info);
}
