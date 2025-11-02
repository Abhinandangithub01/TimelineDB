/**
 * ISO 27001 Compliance Checking
 * Maps security vulnerabilities to ISO 27001 controls
 */

export interface ISO27001Results {
  readiness: number;
  passed: number;
  atRisk: number;
  failed: number;
  violations: ISO27001Violation[];
}

export interface ISO27001Violation {
  id: number;
  controlId: string;
  category: string;
  title: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  description: string;
  impact: string;
  businessRisk: string;
  remediation: string;
  timeToFix: string;
}

/**
 * Check ISO 27001 compliance using Groq AI
 */
export async function checkISO27001WithGroq(code: string, vulnerabilities: any[]): Promise<ISO27001Results> {
  const { analyzeCodeWithGroq } = await import('./groq-client');
  
  try {
    const prompt = `Analyze this code for ISO 27001:2022 compliance violations.

Code:
\`\`\`
${code.slice(0, 4000)}
\`\`\`

Found Vulnerabilities:
${JSON.stringify(vulnerabilities.slice(0, 5), null, 2)}

Map these to ISO 27001 controls and assess compliance:
- A.5: Information Security Policies
- A.6: Organization of Information Security
- A.7: Human Resource Security
- A.8: Asset Management
- A.9: Access Control
- A.10: Cryptography
- A.11: Physical and Environmental Security
- A.12: Operations Security
- A.13: Communications Security
- A.14: System Acquisition, Development and Maintenance
- A.15: Supplier Relationships
- A.16: Information Security Incident Management
- A.17: Information Security Aspects of Business Continuity
- A.18: Compliance

Return JSON:
{
  "readiness": <0-100>,
  "violations": [
    {
      "controlId": "A.9.1",
      "category": "Access Control",
      "title": "...",
      "severity": "critical|high|medium",
      "description": "...",
      "impact": "...",
      "businessRisk": "...",
      "remediation": "...",
      "timeToFix": "..."
    }
  ]
}`;

    const groqResults = await analyzeCodeWithGroq(code);
    
    // Parse Groq response for ISO violations
    const violations: ISO27001Violation[] = vulnerabilities.map((vuln, index) => ({
      id: index + 1,
      controlId: mapVulnToISOControl(vuln.type),
      category: getISOCategory(vuln.type),
      title: `${vuln.type} - ISO 27001 Non-Compliance`,
      severity: vuln.severity,
      description: vuln.description,
      impact: getISOImpact(vuln.severity),
      businessRisk: getISOBusinessRisk(vuln.severity),
      remediation: vuln.fix || 'Review and remediate according to ISO 27001 guidelines',
      timeToFix: estimateTimeToFix(vuln.severity)
    }));

    // Calculate readiness score
    const totalControls = 114; // ISO 27001:2022 has 114 controls
    const failed = violations.filter(v => v.severity === 'critical').length;
    const atRisk = violations.filter(v => v.severity === 'high').length;
    const passed = Math.max(0, 20 - failed - atRisk); // Estimate passed controls
    const readiness = Math.round(((totalControls - failed * 3 - atRisk * 2) / totalControls) * 100);

    return {
      readiness: Math.max(0, Math.min(100, readiness)),
      passed,
      atRisk,
      failed,
      violations: violations.slice(0, 10) // Top 10 violations
    };
  } catch (error) {
    console.error('ISO 27001 check error:', error);
    throw error;
  }
}

/**
 * Map vulnerability type to ISO 27001 control
 */
function mapVulnToISOControl(vulnType: string): string {
  const mapping: Record<string, string> = {
    'SQL Injection': 'A.14.2.5',
    'XSS': 'A.14.2.1',
    'Command Injection': 'A.14.2.5',
    'Hardcoded Credentials': 'A.9.3.1',
    'Weak Cryptography': 'A.10.1.1',
    'Path Traversal': 'A.12.1.3',
    'Insecure Deserialization': 'A.14.2.8',
    'Authentication Bypass': 'A.9.2.1',
    'Authorization Issues': 'A.9.4.1',
    'Code Injection': 'A.14.2.1',
    'CSRF': 'A.14.1.2',
    'SSRF': 'A.13.1.3',
    'XXE': 'A.14.2.4'
  };
  return mapping[vulnType] || 'A.12.6.1'; // Default to operations security
}

/**
 * Get ISO 27001 category for vulnerability
 */
function getISOCategory(vulnType: string): string {
  const categoryMapping: Record<string, string> = {
    'SQL Injection': 'A.14 - System Acquisition, Development and Maintenance',
    'XSS': 'A.14 - System Acquisition, Development and Maintenance',
    'Command Injection': 'A.14 - System Acquisition, Development and Maintenance',
    'Hardcoded Credentials': 'A.9 - Access Control',
    'Weak Cryptography': 'A.10 - Cryptography',
    'Path Traversal': 'A.12 - Operations Security',
    'Insecure Deserialization': 'A.14 - System Acquisition, Development and Maintenance',
    'Authentication Bypass': 'A.9 - Access Control',
    'Authorization Issues': 'A.9 - Access Control',
    'Code Injection': 'A.14 - System Acquisition, Development and Maintenance',
    'CSRF': 'A.14 - System Acquisition, Development and Maintenance',
    'SSRF': 'A.13 - Communications Security',
    'XXE': 'A.14 - System Acquisition, Development and Maintenance'
  };
  return categoryMapping[vulnType] || 'A.12 - Operations Security';
}

/**
 * Get ISO 27001 impact description
 */
function getISOImpact(severity: string): string {
  const impacts: Record<string, string> = {
    'critical': 'Will cause ISO 27001 audit failure and certification rejection',
    'high': 'Significant non-conformity that must be addressed before certification',
    'medium': 'Minor non-conformity that should be addressed',
    'low': 'Observation that should be improved'
  };
  return impacts[severity] || 'May affect ISO 27001 certification';
}

/**
 * Get ISO 27001 business risk
 */
function getISOBusinessRisk(severity: string): string {
  const risks: Record<string, string> = {
    'critical': 'Cannot obtain ISO 27001 certification. May lose enterprise customers.',
    'high': 'Delayed certification. Increased audit costs.',
    'medium': 'Additional remediation work required.',
    'low': 'Minor improvements recommended.'
  };
  return risks[severity] || 'May affect business operations';
}

/**
 * Estimate time to fix
 */
function estimateTimeToFix(severity: string): string {
  const times: Record<string, string> = {
    'critical': '1-2 days',
    'high': '3-5 days',
    'medium': '1 week',
    'low': '2 weeks'
  };
  return times[severity] || '1 week';
}
