// Utility functions for dashboard components
import { SecurityFinding, SOC2Violation, AnalysisData } from './types';

/**
 * Download a file with the given content and filename
 */
export const downloadFile = (content: string, filename: string, type: string = 'text/plain'): void => {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

/**
 * Generate fixed code content for a security finding
 */
export const generateFixedCode = (finding: SecurityFinding): string => {
  return `# Fixed: ${finding.type}
# File: ${finding.file}
# Line: ${finding.line}

${finding.fix}`;
};

/**
 * Generate text report for export
 */
export const generateTextReport = (data: AnalysisData, securityFindings: SecurityFinding[], soc2Violations: SOC2Violation[], performanceScore: number): string => {
  let report = "FORTIFY SECURITY ANALYSIS REPORT\n";
  report += "Powered by Tiger Agentic Postgres\n\n";
  report += "Generated: " + new Date().toLocaleString() + "\n";
  report += "Analysis Time: " + (data.analysisTime || '10.0s') + "\n\n";
  report += "EXECUTIVE SUMMARY\n";
  report += "Security Issues Found: " + (data.security?.total || 0) + "\n";
  report += "Critical Vulnerabilities: " + (data.security?.critical || 0) + "\n";
  report += "SOC2 Readiness: " + (data.soc2?.readiness || 0) + "%\n";
  report += "Database Health Score: " + performanceScore + "/100\n\n";
  report += "SECURITY VULNERABILITIES\n";
  securityFindings.forEach((finding, index) => {
    report += (index + 1) + ". " + finding.type + " [" + finding.severity.toUpperCase() + "]\n";
    report += "   File: " + finding.file + ":" + finding.line + "\n";
    report += "   " + finding.description + "\n\n";
  });
  report += "\nSOC2 COMPLIANCE VIOLATIONS\n";
  soc2Violations.forEach((violation, index) => {
    report += (index + 1) + ". " + violation.title + "\n";
    report += "   " + violation.description + "\n\n";
  });
  return report;
};

/**
 * Generate CSV report for export
 */
export const generateCSV = (securityFindings: SecurityFinding[]): string => {
  let csv = 'Type,Severity,File,Line,OWASP,CWE,CVSS,Description\n';
  
  securityFindings.forEach((finding) => {
    csv += '"' + finding.type + '","' + finding.severity + '","' + finding.file + '",' + finding.line + ',"' + finding.owasp + '","' + finding.cwe + '",' + finding.cvss + ',"' + finding.description + '"\n';
  });
  
  return csv;
};

/**
 * Generate AI response based on question and findings
 */
export const generateAIResponse = (question: string, findings: SecurityFinding[]): string => {
  const lowerQ = question.toLowerCase();
  
  if (lowerQ.includes('sql injection')) {
    return "I can help you fix SQL injection vulnerabilities! Here's what you need to do:\n\n1. **Use Parameterized Queries**: Replace string formatting with parameterized queries\n2. **Example Fix**: \n   ```python\n   # Bad\n   query = f\"SELECT * FROM users WHERE id={user_id}\"\n   \n   # Good\n   query = \"SELECT * FROM users WHERE id=%s\"\n   cursor.execute(query, (user_id,))\n   ```\n3. **Test**: Always test with malicious input like `1' OR '1'='1`\n\nWould you like me to explain any specific finding in detail?";
  }
  
  if (lowerQ.includes('how many') || lowerQ.includes('count')) {
    return "Based on the analysis:\n- **Total Issues**: " + findings.length + "\n- **Critical**: " + findings.filter(f => f.severity === 'critical').length + "\n- **High**: " + findings.filter(f => f.severity === 'high').length + "\n- **Medium**: " + findings.filter(f => f.severity === 'medium').length + "\n\nI recommend fixing critical issues first. Would you like help with any specific vulnerability?";
  }
  
  if (lowerQ.includes('fix') || lowerQ.includes('how')) {
    return "I can guide you through fixing any vulnerability! Here's my approach:\n\n1. **Identify the Issue**: Understand what makes it vulnerable\n2. **Apply the Fix**: Use secure coding practices\n3. **Test**: Verify the fix works\n4. **Scan Again**: Confirm the vulnerability is gone\n\nWhich specific issue would you like help with? You can ask about:\n- SQL Injection fixes\n- XSS prevention\n- Command injection mitigation\n- Hardcoded credential removal";
  }
  
  return "I'm here to help with your security issues! I can:\n\n- Explain any vulnerability in detail\n- Guide you through fixes step-by-step\n- Answer questions about OWASP, CWE, or CVSS\n- Help prioritize which issues to fix first\n\nWhat would you like to know?";
};
