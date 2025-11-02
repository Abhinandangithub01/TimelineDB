import { NextRequest, NextResponse } from 'next/server';
import { runMultiAgentAnalysis } from '@/lib/tiger-multi-agent';

/**
 * POST /api/multi-agent
 * Run multi-agent collaborative analysis
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { code } = body;
    
    if (!code) {
      return NextResponse.json(
        { error: 'Code is required' },
        { status: 400 }
      );
    }
    
    console.log('🤖 Starting multi-agent analysis...');
    const result = await runMultiAgentAnalysis(code);
    
    return NextResponse.json({
      success: true,
      result,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Multi-agent API error:', error);
    return NextResponse.json(
      { 
        error: 'Multi-agent analysis failed',
        message: (error as Error).message 
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/multi-agent
 * Get information about available agents
 */
export async function GET(request: NextRequest) {
  const agentInfo = {
    agents: [
      {
        name: 'SecurityAgent',
        role: 'Deep vulnerability analysis',
        capabilities: [
          'Injection attack detection',
          'Authentication/Authorization issues',
          'Cryptographic weaknesses',
          'Input validation problems',
          'Security misconfigurations'
        ],
        confidence: 0.92
      },
      {
        name: 'ComplianceAgent',
        role: 'SOC2 & ISO 27001 compliance checking',
        capabilities: [
          'Encryption requirements (CC6.6, A.10)',
          'Access controls (CC6.1, A.9)',
          'Logging/monitoring (CC7.2, A.12.4)',
          'Data protection (P3.2, A.8)',
          'Incident response (CC7.3, A.16)'
        ],
        confidence: 0.88
      },
      {
        name: 'PerformanceAgent',
        role: 'Code performance analysis',
        capabilities: [
          'N+1 query detection',
          'Nested loop optimization',
          'Blocking operation identification',
          'Inefficient patterns',
          'Performance bottlenecks'
        ],
        confidence: 0.85
      },
      {
        name: 'RemediationAgent',
        role: 'Fix generation and validation',
        capabilities: [
          'Automatic fix generation',
          'Before/after examples',
          'Priority assignment',
          'Validation on forks',
          'One-click remediation'
        ],
        confidence: 0.90
      }
    ],
    execution: {
      mode: 'parallel',
      forks: 4,
      averageTime: '8-12 seconds',
      speedup: '4x faster than sequential'
    },
    benefits: [
      'Specialized analysis by domain experts',
      'Parallel execution on separate forks',
      'Comprehensive coverage',
      'Synthesized recommendations',
      'High confidence scores'
    ]
  };
  
  return NextResponse.json(agentInfo);
}
