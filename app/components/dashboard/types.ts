// Type definitions for dashboard components

export interface SecurityFinding {
  type: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  file: string;
  line: number;
  code: string;
  fix: string;
  description: string;
  owasp: string;
  cwe: string;
  cvss: number;
}

export interface SOC2Violation {
  title: string;
  severity?: 'critical' | 'high' | 'medium' | 'low';
  controlId: string;
  category: string;
  description: string;
  impact: string;
  businessRisk: string;
  remediation: string;
  timeToFix: string;
}

export interface ISO27001Data {
  readiness: number;
  passed: number;
  failed: number;
}

export interface AnalysisData {
  analysisTime?: string;
  security?: {
    total: number;
    critical: number;
    high: number;
    medium: number;
    findings: SecurityFinding[];
  };
  soc2?: {
    readiness: number;
    passed: number;
    failed: number;
    violations: SOC2Violation[];
  };
  iso27001?: ISO27001Data;
  mcpInsights?: {
    performance?: {
      overallScore: number;
    };
  };
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export type TabType = 'overview' | 'security' | 'soc2' | 'iso' | 'performance';
