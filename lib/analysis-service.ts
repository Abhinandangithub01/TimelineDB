import { v4 as uuidv4 } from 'uuid';
import { performTigerAnalysis } from './tiger-analysis';

export interface AnalysisSession {
  sessionId: string;
  status: 'pending' | 'running' | 'completed' | 'error';
  progress: number;
  currentStage: number;
  startedAt: Date;
  completedAt?: Date;
  results?: AnalysisResults;
}

export interface AnalysisResults {
  security: SecurityResults;
  soc2: SOC2Results;
  iso27001?: any; // ISO 27001 compliance results
  rag: RAGResults;
  certifications: CertificationResults[];
  mcpInsights?: any; // Tiger MCP insights (schema, indexes, performance)
}

export interface SecurityResults {
  total: number;
  critical: number;
  high: number;
  medium: number;
  findings: SecurityFinding[];
}

export interface SecurityFinding {
  id: number;
  type: string;
  severity: string;
  file: string;
  line: number;
  owasp: string;
  cwe: string;
  cvss: number;
  description: string;
  code: string;
  fix: string;
  certTopics: string[];
}

export interface SOC2Results {
  readiness: number;
  passed: number;
  atRisk: number;
  failed: number;
  violations: SOC2Violation[];
}

export interface SOC2Violation {
  id: number;
  controlId: string;
  category: string;
  title: string;
  severity: string;
  description: string;
  impact: string;
  businessRisk: string;
  remediation: string;
  timeToFix: string;
}

export interface RAGResults {
  strategies: RAGStrategy[];
  winner: string;
  reason: string;
  phase?: string;
}

export interface RAGStrategy {
  name: string;
  accuracy: number;
  latency: number;
  precision: number;
  recall: number;
  winner?: boolean;
}

export interface CertificationResults {
  id: number;
  name: string;
  phase: number;
  duration: string;
  cost: number;
  coverage: number;
  topics: string[];
  priority: string;
}

// In-memory session storage (use global to persist across hot reloads)
const globalForSessions = global as typeof globalThis & {
  analysisSessions?: Map<string, AnalysisSession>;
};

if (!globalForSessions.analysisSessions) {
  globalForSessions.analysisSessions = new Map<string, AnalysisSession>();
}

const sessions = globalForSessions.analysisSessions;

// Create a new analysis session
export function createAnalysisSession(): AnalysisSession {
  const sessionId = uuidv4();
  const session: AnalysisSession = {
    sessionId,
    status: 'pending',
    progress: 0,
    currentStage: 1,
    startedAt: new Date(),
  };
  
  sessions.set(sessionId, session);
  console.log('✅ Session stored in Map. Total sessions:', sessions.size);
  return session;
}

// Get analysis session
export function getAnalysisSession(sessionId: string): AnalysisSession | undefined {
  const session = sessions.get(sessionId);
  if (!session) {
    console.log('❌ Session not found:', sessionId);
    console.log('📋 Available sessions:', Array.from(sessions.keys()));
  }
  return session;
}

// Start analysis with Tiger features
export async function startAnalysis(sessionId: string, code?: string): Promise<void> {
  const session = sessions.get(sessionId);
  if (!session) {
    throw new Error('Session not found');
  }

  session.status = 'running';
  session.progress = 0;

  // Try Tiger analysis if environment is configured
  const useTiger = Boolean(process.env.TIGER_DATABASE_URL || process.env.OPENAI_API_KEY);
  
  if (useTiger && code) {
    console.log('🐅 Using Tiger-powered analysis');
    
    // Update progress every second
    const interval = setInterval(() => {
      const currentSession = sessions.get(sessionId);
      if (currentSession && currentSession.status === 'running') {
        currentSession.progress = Math.min(100, currentSession.progress + 0.56);
        currentSession.currentStage = Math.min(4, Math.floor(currentSession.progress / 25) + 1);
        
        if (currentSession.progress >= 100) {
          clearInterval(interval);
        }
      } else {
        clearInterval(interval);
      }
    }, 1000);
    
    // Run Tiger analysis
    try {
      const results = await performTigerAnalysis(code, (stage, message) => {
        const currentSession = sessions.get(sessionId);
        if (currentSession) {
          currentSession.currentStage = stage;
          console.log(`Stage ${stage}: ${message}`);
        }
      });
      
      clearInterval(interval);
      session.status = 'completed';
      session.progress = 100;
      session.completedAt = new Date();
      session.results = results;
      
      console.log('✓ Tiger analysis complete');
    } catch (error) {
      console.error('Tiger analysis error:', error);
      clearInterval(interval);
      session.status = 'error';
      throw error;
    }
  } else {
    // No Tiger or AI configured - fail immediately
    session.status = 'error';
    throw new Error('No AI provider configured. Please add GROQ_API_KEY or PERPLEXITY_API_KEY to .env.local');
  }
}
