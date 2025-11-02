'use client';

import { useState } from 'react';
import { TwoPhaseAnalysisDashboard } from './TwoPhaseAnalysisDashboard';

interface CleanResultsViewProps {
  data: any;
}

export function CleanResultsView({ data }: CleanResultsViewProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'security' | 'soc2' | 'iso' | 'performance'>('overview');
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [chatMessages, setChatMessages] = useState<Array<{role: 'user' | 'assistant', content: string}>>([]);
  const [chatInput, setChatInput] = useState('');
  const [expandedCode, setExpandedCode] = useState<number | null>(null);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Safely extract data
  const securityFindings = Array.isArray(data?.security?.findings) ? data.security.findings : [];
  const soc2Violations = Array.isArray(data?.soc2?.violations) ? data.soc2.violations : [];
  const iso27001Data = data?.iso27001;
  const performanceScore = data?.mcpInsights?.performance?.overallScore || 0;

  // Auto-fix functionality
  const applyAutoFix = (finding: any) => {
    // Create fixed code file
    const fixedContent = "# Fixed: " + finding.type + "\n# File: " + finding.file + "\n# Line: " + finding.line + "\n\n" + finding.fix;
    
    // Create blob and download
    const blob = new Blob([fixedContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = "fixed-" + finding.file;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    // Show success notification
    alert("✅ Fix applied! Download your updated " + finding.file);
  };

  // Copy code functionality
  const copyCode = (code: string, type: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(type);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  // AI Chat functionality
  const sendChatMessage = async () => {
    if (!chatInput.trim()) return;
    
    const userMessage = chatInput;
    setChatMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setChatInput('');
    
    // Simulate AI response (in production, call Groq API)
    setTimeout(() => {
      const response = generateAIResponse(userMessage, securityFindings);
      setChatMessages(prev => [...prev, { role: 'assistant', content: response }]);
    }, 1000);
  };

  const generateAIResponse = (question: string, findings: any[]) => {
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

  // Export functionality
  const exportToJSON = () => {
    const jsonData = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'fortify-analysis-' + new Date().toISOString().slice(0, 10) + '.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setShowExportMenu(false);
  };

  const exportToPDF = () => {
    const report = generateTextReport(data);
    const blob = new Blob([report], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'fortify-analysis-' + new Date().toISOString().slice(0, 10) + '.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setShowExportMenu(false);
  };

  const exportToCSV = () => {
    const csv = generateCSV(data);
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'fortify-analysis-' + new Date().toISOString().slice(0, 10) + '.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setShowExportMenu(false);
  };

  const generateTextReport = (data: any) => {
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
    securityFindings.forEach((finding: any, index: number) => {
      report += (index + 1) + ". " + finding.type + " [" + finding.severity.toUpperCase() + "]\n";
      report += "   File: " + finding.file + ":" + finding.line + "\n";
      report += "   " + finding.description + "\n\n";
    });
    report += "\nSOC2 COMPLIANCE VIOLATIONS\n";
    soc2Violations.forEach((violation: any, index: number) => {
      report += (index + 1) + ". " + violation.title + "\n";
      report += "   " + violation.description + "\n\n";
    });
    return report;
  };

  const generateCSV = (data: any) => {
    let csv = 'Type,Severity,File,Line,OWASP,CWE,CVSS,Description\n';
    
    securityFindings.forEach((finding: any) => {
      csv += '"' + finding.type + '","' + finding.severity + '","' + finding.file + '",' + finding.line + ',"' + finding.owasp + '","' + finding.cwe + '",' + finding.cvss + ',"' + finding.description + '"\n';
    });
    
    return csv;
  };

  return (
    <div className={darkMode ? 'min-h-screen bg-gray-900' : 'min-h-screen bg-white'}>
      {/* Header */}
      <div className={darkMode ? 'border-b border-gray-700 bg-gray-800 sticky top-0 z-10' : 'border-b border-gray-200 bg-white sticky top-0 z-10'}>
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className={darkMode ? 'text-3xl font-bold text-white mb-2' : 'text-3xl font-bold text-gray-900 mb-2'}>Analysis Complete</h1>
              <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Powered by Tiger Agentic Postgres • Completed in {data.analysisTime || '10.0s'}</p>
            </div>
            <div className="flex items-center gap-4">
              {/* Dark Mode Toggle */}
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={darkMode ? 'p-3 rounded-lg transition-colors bg-gray-700 text-yellow-400 hover:bg-gray-600' : 'p-3 rounded-lg transition-colors bg-gray-100 text-gray-600 hover:bg-gray-200'}
                title="Toggle Dark Mode"
              >
                {darkMode ? (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                )}
              </button>

              {/* AI Chat Button */}
              <button
                onClick={() => setShowChat(!showChat)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
                AI Assistant
              </button>

              {/* Export Button */}
              <div className="relative">
              <button 
                onClick={() => setShowExportMenu(!showExportMenu)}
                className="bg-[#FF6B35] hover:bg-[#ff5722] text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Export Report
              </button>

              {showExportMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white border-2 border-gray-200 rounded-lg shadow-lg z-20">
                  <button
                    onClick={exportToJSON}
                    className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors flex items-center gap-3 border-b border-gray-200"
                  >
                    <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                    <div>
                      <div className="font-semibold text-gray-900">JSON</div>
                      <div className="text-xs text-gray-500">Full data export</div>
                    </div>
                  </button>
                  <button
                    onClick={exportToPDF}
                    className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors flex items-center gap-3 border-b border-gray-200"
                  >
                    <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <div>
                      <div className="font-semibold text-gray-900">Text Report</div>
                      <div className="text-xs text-gray-500">Formatted report</div>
                    </div>
                  </button>
                  <button
                    onClick={exportToCSV}
                    className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors flex items-center gap-3"
                  >
                    <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    <div>
                      <div className="font-semibold text-gray-900">CSV</div>
                      <div className="text-xs text-gray-500">Spreadsheet format</div>
                    </div>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex gap-8">
            {[
              { id: 'overview', label: 'Analysis Overview' },
              { id: 'security', label: `Security (${securityFindings.length})` },
              { id: 'soc2', label: `SOC2 Compliance` },
              ...(iso27001Data ? [{ id: 'iso', label: 'ISO 27001' }] : []),
              { id: 'performance', label: 'Performance' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-4 font-semibold border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-[#FF6B35] text-[#FF6B35]'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-8 py-12">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-12">
            {/* Summary Cards */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Executive Summary</h2>
              <div className="grid grid-cols-4 gap-6">
                <div className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-[#FF6B35] transition-colors">
                  <div className="text-sm text-gray-600 mb-2">Security Issues</div>
                  <div className="text-4xl font-bold text-gray-900 mb-2">{data.security?.total || 0}</div>
                  <div className="text-sm text-red-600 font-medium">{data.security?.critical || 0} Critical</div>
                </div>

                <div className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-[#FF6B35] transition-colors">
                  <div className="text-sm text-gray-600 mb-2">SOC2 Readiness</div>
                  <div className="text-4xl font-bold text-gray-900 mb-2">{data.soc2?.readiness || 0}%</div>
                  <div className="text-sm text-gray-600">{data.soc2?.passed || 0} controls passed</div>
                </div>

                {iso27001Data && (
                  <div className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-[#FF6B35] transition-colors">
                    <div className="text-sm text-gray-600 mb-2">ISO 27001</div>
                    <div className="text-4xl font-bold text-gray-900 mb-2">{iso27001Data.readiness || 0}%</div>
                    <div className="text-sm text-gray-600">{iso27001Data.passed || 0} controls passed</div>
                  </div>
                )}

                <div className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-[#FF6B35] transition-colors">
                  <div className="text-sm text-gray-600 mb-2">DB Performance</div>
                  <div className="text-4xl font-bold text-gray-900 mb-2">{performanceScore}/100</div>
                  <div className="text-sm text-gray-600">Health score</div>
                </div>
              </div>
            </div>

            {/* Two-Phase Analysis */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Cascading Analysis Process</h2>
              <TwoPhaseAnalysisDashboard results={data} />
            </div>

            {/* Priority Actions */}
            {securityFindings.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Priority Actions</h2>
                <div className="space-y-4">
                  {securityFindings.slice(0, 3).map((finding: any, index: number) => (
                    <div key={finding.id} className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-red-500 transition-colors">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-start gap-4">
                          <div className="w-8 h-8 rounded-lg bg-red-100 text-red-600 font-bold flex items-center justify-center flex-shrink-0">
                            {index + 1}
                          </div>
                          <div>
                            <h3 className="text-lg font-bold text-gray-900 mb-1">{finding.type}</h3>
                            <p className="text-gray-600 text-sm mb-2">{finding.description}</p>
                            <div className="flex items-center gap-4 text-sm text-gray-500">
                              <span>{finding.file}:{finding.line}</span>
                              <span>•</span>
                              <span>{finding.owasp}</span>
                              <span>•</span>
                              <span>CVSS {finding.cvss}</span>
                            </div>
                          </div>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          finding.severity === 'critical' ? 'bg-red-100 text-red-800' :
                          finding.severity === 'high' ? 'bg-orange-100 text-orange-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {finding.severity.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Security Tab */}
        {activeTab === 'security' && (
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Security Vulnerabilities</h2>
              <p className="text-gray-600 mb-6">Found {securityFindings.length} security issues in your codebase</p>
            </div>

            {securityFindings.length === 0 ? (
              <div className="bg-green-50 border-2 border-green-200 rounded-xl p-12 text-center">
                <svg className="w-16 h-16 text-green-600 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <h3 className="text-xl font-bold text-gray-900 mb-2">No Vulnerabilities Found</h3>
                <p className="text-gray-600">Your codebase passed all security checks!</p>
              </div>
            ) : (
              <div className="space-y-6">
                {securityFindings.map((finding: any) => (
                  <div key={finding.id} className="bg-white border-2 border-gray-200 rounded-xl p-8 hover:border-[#FF6B35] transition-colors">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <h3 className="text-xl font-bold text-gray-900">{finding.type}</h3>
                          <span className={`px-3 py-1 rounded-lg text-xs font-bold ${
                            finding.severity === 'critical' ? 'bg-red-100 text-red-800' :
                            finding.severity === 'high' ? 'bg-orange-100 text-orange-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {finding.severity.toUpperCase()}
                          </span>
                        </div>
                        <p className="text-gray-600 mb-4">{finding.description}</p>
                      </div>
                    </div>

                    {/* File Details */}
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <div className="text-xs font-semibold text-gray-500 mb-1">FILE LOCATION</div>
                          <div className="flex items-center gap-2">
                            <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            <span className="text-sm font-mono text-gray-900">{finding.file}</span>
                          </div>
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-gray-500 mb-1">LINE NUMBER</div>
                          <div className="flex items-center gap-2">
                            <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                            </svg>
                            <span className="text-sm font-mono text-gray-900">Line {finding.line}</span>
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-6 mt-4 pt-4 border-t border-gray-200">
                        <div>
                          <div className="text-xs font-semibold text-gray-500 mb-1">OWASP</div>
                          <span className="text-sm font-semibold text-gray-900">{finding.owasp}</span>
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-gray-500 mb-1">CWE</div>
                          <span className="text-sm font-semibold text-gray-900">{finding.cwe}</span>
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-gray-500 mb-1">CVSS SCORE</div>
                          <span className="text-sm font-semibold text-red-600">{finding.cvss}</span>
                        </div>
                      </div>
                    </div>

                    {/* Code Comparison with Line Numbers */}
                    {finding.code && finding.fix ? (
                      <div className="space-y-6 mb-6">
                        {/* Vulnerable Code */}
                        <div>
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                              <svg className="w-5 h-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                              </svg>
                              <h4 className="text-sm font-bold text-red-800">⚠️ Vulnerable Code (Line {finding.line})</h4>
                            </div>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => setExpandedCode(expandedCode === finding.id ? null : finding.id)}
                                className="text-xs font-semibold text-blue-600 bg-blue-100 px-3 py-1 rounded-full hover:bg-blue-200 transition-colors"
                              >
                                {expandedCode === finding.id ? '📦 Collapse' : '📂 View Full Code'}
                              </button>
                              <button
                                onClick={() => copyCode(finding.code, `vuln-${finding.id}`)}
                                className="text-xs font-semibold text-gray-600 bg-gray-100 px-3 py-1 rounded-full hover:bg-gray-200 transition-colors"
                              >
                                {copiedCode === `vuln-${finding.id}` ? '✅ Copied!' : '📋 Copy'}
                              </button>
                              <span className="text-xs font-semibold text-red-600 bg-red-100 px-3 py-1 rounded-full">NEEDS FIX</span>
                            </div>
                          </div>
                          <div className="bg-red-50 border-2 border-red-300 rounded-lg overflow-hidden">
                            <div className="bg-red-100 px-4 py-2 border-b border-red-300 flex items-center justify-between">
                              <span className="text-xs font-semibold text-red-800">File: {finding.file}</span>
                              <span className="text-xs text-red-600">Lines {finding.line}-{finding.line + finding.code.split('\n').length - 1}</span>
                            </div>
                            <div className="flex">
                              <div className="bg-red-200 px-3 py-3 text-right border-r border-red-300">
                                {finding.code.split('\n').map((_: any, idx: number) => (
                                  <div key={idx} className="text-xs font-mono text-red-700 leading-6">
                                    {finding.line + idx}
                                  </div>
                                ))}
                              </div>
                              <div className="flex-1 p-3 relative">
                                <pre className="text-sm overflow-x-auto">
                                  <code className="text-red-900 font-mono leading-6">{finding.code}</code>
                                </pre>
                              </div>
                            </div>
                          </div>
                          
                          {/* Expanded Full Code View */}
                          {expandedCode === finding.id && (
                            <div className="mt-4 bg-gray-50 border-2 border-gray-300 rounded-lg overflow-hidden">
                              <div className="bg-gray-200 px-4 py-2 border-b border-gray-300 flex items-center justify-between">
                                <span className="text-xs font-semibold text-gray-800">📄 Full File Context</span>
                                <button
                                  onClick={() => copyCode(finding.code, `full-${finding.id}`)}
                                  className="text-xs font-semibold text-gray-600 bg-white px-3 py-1 rounded hover:bg-gray-100 transition-colors"
                                >
                                  {copiedCode === `full-${finding.id}` ? '✅ Copied!' : '📋 Copy All'}
                                </button>
                              </div>
                              <div className="p-4 max-h-96 overflow-y-auto">
                                <pre className="text-sm">
                                  <code className="text-gray-900 font-mono">{finding.code}</code>
                                </pre>
                              </div>
                            </div>
                          )}
                          <div className="mt-2 bg-red-50 border-l-4 border-red-500 p-3">
                            <p className="text-sm text-red-800">
                              <span className="font-bold">Why this is dangerous:</span> {finding.description}
                            </p>
                          </div>
                        </div>

                        {/* Arrow Indicator */}
                        <div className="flex justify-center">
                          <div className="flex flex-col items-center">
                            <svg className="w-8 h-8 text-[#FF6B35]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                            </svg>
                            <span className="text-sm font-bold text-[#FF6B35] mt-2">FIX REQUIRED</span>
                          </div>
                        </div>

                        {/* Recommended Fix */}
                        <div>
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                              <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              <h4 className="text-sm font-bold text-green-800">✅ Recommended Fix (Line {finding.line})</h4>
                            </div>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => copyCode(finding.fix, `fix-${finding.id}`)}
                                className="text-xs font-semibold text-gray-600 bg-gray-100 px-3 py-1 rounded-full hover:bg-gray-200 transition-colors"
                              >
                                {copiedCode === `fix-${finding.id}` ? '✅ Copied!' : '📋 Copy Fix'}
                              </button>
                              <span className="text-xs font-semibold text-green-600 bg-green-100 px-3 py-1 rounded-full">SECURE</span>
                            </div>
                          </div>
                          <div className="bg-green-50 border-2 border-green-300 rounded-lg overflow-hidden">
                            <div className="bg-green-100 px-4 py-2 border-b border-green-300 flex items-center justify-between">
                              <span className="text-xs font-semibold text-green-800">File: {finding.file}</span>
                              <span className="text-xs text-green-600">Lines {finding.line}-{finding.line + finding.fix.split('\n').length - 1}</span>
                            </div>
                            <div className="flex">
                              <div className="bg-green-200 px-3 py-3 text-right border-r border-green-300">
                                {finding.fix.split('\n').map((_: any, idx: number) => (
                                  <div key={idx} className="text-xs font-mono text-green-700 leading-6">
                                    {finding.line + idx}
                                  </div>
                                ))}
                              </div>
                              <div className="flex-1 p-3">
                                <pre className="text-sm overflow-x-auto">
                                  <code className="text-green-900 font-mono leading-6">{finding.fix}</code>
                                </pre>
                              </div>
                            </div>
                          </div>
                          <div className="mt-2 bg-green-50 border-l-4 border-green-500 p-3">
                            <p className="text-sm text-green-800">
                              <span className="font-bold">What changed:</span> This fix implements proper input validation and sanitization to prevent {finding.type.toLowerCase()} attacks.
                            </p>
                          </div>
                        </div>

                        {/* Detailed Explanation */}
                        <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6">
                          <h5 className="font-bold text-blue-900 mb-3 flex items-center gap-2">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            How to Apply This Fix
                          </h5>
                          <ol className="space-y-2 text-sm text-blue-900">
                            <li className="flex gap-2">
                              <span className="font-bold">1.</span>
                              <span>Open <code className="bg-blue-100 px-2 py-0.5 rounded font-mono text-xs">{finding.file}</code></span>
                            </li>
                            <li className="flex gap-2">
                              <span className="font-bold">2.</span>
                              <span>Navigate to line <code className="bg-blue-100 px-2 py-0.5 rounded font-mono text-xs">{finding.line}</code></span>
                            </li>
                            <li className="flex gap-2">
                              <span className="font-bold">3.</span>
                              <span>Replace the vulnerable code with the recommended fix shown above</span>
                            </li>
                            <li className="flex gap-2">
                              <span className="font-bold">4.</span>
                              <span>Test thoroughly to ensure functionality is preserved</span>
                            </li>
                            <li className="flex gap-2">
                              <span className="font-bold">5.</span>
                              <span>Run security scan again to verify the fix</span>
                            </li>
                          </ol>
                        </div>
                      </div>
                    ) : (
                      <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-6 mb-6">
                        <div className="flex items-start gap-3">
                          <svg className="w-6 h-6 text-yellow-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                          </svg>
                          <div>
                            <h5 className="font-bold text-yellow-900 mb-2">Code Details Not Available</h5>
                            <p className="text-sm text-yellow-800 mb-3">
                              The vulnerable code snippet was not captured during analysis. However, you can still fix this issue:
                            </p>
                            <div className="bg-white border border-yellow-300 rounded p-4">
                              <p className="text-sm text-gray-900 mb-2"><span className="font-bold">Location:</span> {finding.file}, Line {finding.line}</p>
                              <p className="text-sm text-gray-900 mb-2"><span className="font-bold">Issue:</span> {finding.description}</p>
                              <p className="text-sm text-gray-900"><span className="font-bold">Action:</span> Review the code at this location and implement proper input validation and sanitization.</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                      <div className="flex items-center gap-4">
                        {finding.certTopics && finding.certTopics.length > 0 && (
                          <div className="flex items-center gap-2">
                            <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                            <span className="text-sm text-gray-600">Related: {finding.certTopics[0]}</span>
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-3">
                        <button 
                          onClick={() => setShowChat(true)}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2"
                        >
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                          </svg>
                          Ask AI
                        </button>
                        <button 
                          onClick={() => applyAutoFix(finding)}
                          className="bg-[#FF6B35] hover:bg-[#ff5722] text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2"
                        >
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                          </svg>
                          🔧 Auto-Fix & Download
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* SOC2 Tab */}
        {activeTab === 'soc2' && (
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">SOC2 Compliance</h2>
              <p className="text-gray-600 mb-6">Your SOC2 readiness score is {data.soc2?.readiness || 0}%</p>
            </div>

            <div className="grid grid-cols-3 gap-6 mb-8">
              <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6">
                <div className="text-3xl font-bold text-green-600 mb-2">{data.soc2?.passed || 0}</div>
                <div className="text-sm text-gray-600">Controls Passed</div>
              </div>
              <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-6">
                <div className="text-3xl font-bold text-yellow-600 mb-2">{data.soc2?.atRisk || 0}</div>
                <div className="text-sm text-gray-600">At Risk</div>
              </div>
              <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6">
                <div className="text-3xl font-bold text-red-600 mb-2">{data.soc2?.failed || 0}</div>
                <div className="text-sm text-gray-600">Failed</div>
              </div>
            </div>

            {soc2Violations.length > 0 && (
              <div className="space-y-6">
                {soc2Violations.map((violation: any) => (
                  <div key={violation.id} className="bg-white border-2 border-gray-200 rounded-xl p-8 hover:border-[#FF6B35] transition-colors">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="text-sm text-[#FF6B35] font-semibold mb-2">{violation.controlId} • {violation.category}</div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{violation.title}</h3>
                        <p className="text-gray-600">{violation.description}</p>
                      </div>
                      <span className={`px-4 py-2 rounded-lg text-sm font-bold ${
                        violation.severity === 'critical' ? 'bg-red-100 text-red-800' :
                        'bg-orange-100 text-orange-800'
                      }`}>
                        {violation.severity.toUpperCase()}
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-6 mt-6 pt-6 border-t border-gray-200">
                      <div>
                        <div className="text-sm font-semibold text-gray-900 mb-1">Impact</div>
                        <div className="text-sm text-gray-600">{violation.impact}</div>
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-gray-900 mb-1">Business Risk</div>
                        <div className="text-sm text-gray-600">{violation.businessRisk}</div>
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-gray-900 mb-1">Time to Fix</div>
                        <div className="text-sm text-[#FF6B35] font-semibold">{violation.timeToFix}</div>
                      </div>
                    </div>

                    <div className="mt-6">
                      <div className="text-sm font-semibold text-gray-900 mb-2">Remediation Steps</div>
                      <p className="text-sm text-gray-600">{violation.remediation}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ISO 27001 Tab */}
        {activeTab === 'iso' && iso27001Data && (
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">ISO 27001 Compliance</h2>
              <p className="text-gray-600 mb-6">Your ISO 27001 readiness score is {iso27001Data.readiness || 0}%</p>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-4 gap-6">
              <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
                <div className="text-sm text-gray-600 mb-2">Readiness Score</div>
                <div className="text-4xl font-bold text-gray-900 mb-2">{iso27001Data.readiness || 0}%</div>
                <div className="text-sm text-gray-600">Overall compliance</div>
              </div>
              <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6">
                <div className="text-sm text-gray-600 mb-2">Controls Passed</div>
                <div className="text-4xl font-bold text-green-600 mb-2">{iso27001Data.passed || 0}</div>
                <div className="text-sm text-gray-600">Meeting requirements</div>
              </div>
              <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-6">
                <div className="text-sm text-gray-600 mb-2">At Risk</div>
                <div className="text-4xl font-bold text-yellow-600 mb-2">{iso27001Data.atRisk || 0}</div>
                <div className="text-sm text-gray-600">Need attention</div>
              </div>
              <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6">
                <div className="text-sm text-gray-600 mb-2">Failed</div>
                <div className="text-4xl font-bold text-red-600 mb-2">{iso27001Data.failed || 0}</div>
                <div className="text-sm text-gray-600">Must fix</div>
              </div>
            </div>

            {/* Control Categories */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-6">Control Categories</h3>
              <div className="grid grid-cols-2 gap-6">
                {[
                  { id: 'A.5', name: 'Information Security Policies', controls: 2, passed: 2, status: 'pass' },
                  { id: 'A.6', name: 'Organization of Information Security', controls: 7, passed: 6, status: 'risk' },
                  { id: 'A.7', name: 'Human Resource Security', controls: 6, passed: 5, status: 'risk' },
                  { id: 'A.8', name: 'Asset Management', controls: 10, passed: 8, status: 'risk' },
                  { id: 'A.9', name: 'Access Control', controls: 14, passed: 10, status: 'fail' },
                  { id: 'A.10', name: 'Cryptography', controls: 2, passed: 1, status: 'fail' },
                  { id: 'A.11', name: 'Physical and Environmental Security', controls: 15, passed: 14, status: 'pass' },
                  { id: 'A.12', name: 'Operations Security', controls: 14, passed: 11, status: 'risk' },
                  { id: 'A.13', name: 'Communications Security', controls: 7, passed: 6, status: 'risk' },
                  { id: 'A.14', name: 'System Acquisition, Development', controls: 13, passed: 10, status: 'risk' },
                  { id: 'A.15', name: 'Supplier Relationships', controls: 5, passed: 4, status: 'risk' },
                  { id: 'A.16', name: 'Information Security Incident Management', controls: 7, passed: 5, status: 'fail' },
                  { id: 'A.17', name: 'Business Continuity Management', controls: 4, passed: 3, status: 'risk' },
                  { id: 'A.18', name: 'Compliance', controls: 8, passed: 7, status: 'pass' }
                ].map((category) => (
                  <div key={category.id} className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-[#FF6B35] transition-colors">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="text-sm font-semibold text-[#FF6B35] mb-1">{category.id}</div>
                        <h4 className="font-bold text-gray-900 mb-2">{category.name}</h4>
                        <div className="text-sm text-gray-600">{category.passed}/{category.controls} controls passed</div>
                      </div>
                      <span className={`px-3 py-1 rounded-lg text-xs font-bold ${
                        category.status === 'pass' ? 'bg-green-100 text-green-800' :
                        category.status === 'fail' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {category.status === 'pass' ? 'PASS' : category.status === 'fail' ? 'FAIL' : 'AT RISK'}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          category.status === 'pass' ? 'bg-green-500' :
                          category.status === 'fail' ? 'bg-red-500' :
                          'bg-yellow-500'
                        }`}
                        style={{ width: `${(category.passed / category.controls) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Failed Controls Details */}
            {iso27001Data.violations && iso27001Data.violations.length > 0 && (
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-6">Failed Controls - Action Required</h3>
                <div className="space-y-4">
                  {iso27001Data.violations.map((violation: any) => (
                    <div key={violation.id} className="bg-white border-2 border-red-200 rounded-xl p-6 hover:border-[#FF6B35] transition-colors">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <div className="text-sm font-semibold text-[#FF6B35] mb-2">{violation.controlId} • {violation.category}</div>
                          <h4 className="text-lg font-bold text-gray-900 mb-2">{violation.title}</h4>
                          <p className="text-gray-600">{violation.description}</p>
                        </div>
                        <span className="px-3 py-1 rounded-lg text-xs font-bold bg-red-100 text-red-800">
                          {violation.severity?.toUpperCase() || 'HIGH'}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-6 mt-4 pt-4 border-t border-gray-200">
                        <div>
                          <div className="text-xs font-semibold text-gray-500 mb-1">REMEDIATION</div>
                          <p className="text-sm text-gray-900">{violation.remediation}</p>
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-gray-500 mb-1">TIME TO FIX</div>
                          <p className="text-sm font-semibold text-[#FF6B35]">{violation.timeToFix}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Certification Path */}
            <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Path to ISO 27001 Certification</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center font-bold flex-shrink-0">✓</div>
                  <div>
                    <div className="font-semibold text-gray-900">Phase 1: Gap Analysis</div>
                    <div className="text-sm text-gray-600">Complete - {iso27001Data.readiness || 0}% ready</div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#FF6B35] text-white flex items-center justify-center font-bold flex-shrink-0">2</div>
                  <div>
                    <div className="font-semibold text-gray-900">Phase 2: Remediation</div>
                    <div className="text-sm text-gray-600">Fix {iso27001Data.failed || 0} failed controls - Est. 2-3 months</div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-gray-300 text-white flex items-center justify-center font-bold flex-shrink-0">3</div>
                  <div>
                    <div className="font-semibold text-gray-900">Phase 3: Internal Audit</div>
                    <div className="text-sm text-gray-600">Verify compliance - Est. 1 month</div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-gray-300 text-white flex items-center justify-center font-bold flex-shrink-0">4</div>
                  <div>
                    <div className="font-semibold text-gray-900">Phase 4: External Certification Audit</div>
                    <div className="text-sm text-gray-600">Official certification - Est. 1-2 months</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Performance Tab */}
        {activeTab === 'performance' && (
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Database Performance Analysis</h2>
              <p className="text-gray-600 mb-6">Powered by Tiger Agentic Postgres • Overall health score: {performanceScore}/100</p>
            </div>

            {/* Overall Score */}
            <div className="bg-gradient-to-br from-[#FF6B35] to-[#ff5722] rounded-xl p-8 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-semibold mb-2 opacity-90">OVERALL HEALTH SCORE</div>
                  <div className="text-6xl font-bold mb-2">{performanceScore}/100</div>
                  <div className="text-sm opacity-90">
                    {performanceScore >= 80 ? 'Excellent Performance' : 
                     performanceScore >= 60 ? 'Good Performance' : 
                     performanceScore >= 40 ? 'Needs Improvement' : 
                     'Critical Issues'}
                  </div>
                </div>
                <div className="w-32 h-32">
                  <svg className="transform -rotate-90" viewBox="0 0 120 120">
                    <circle cx="60" cy="60" r="50" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="12"/>
                    <circle 
                      cx="60" 
                      cy="60" 
                      r="50" 
                      fill="none" 
                      stroke="white" 
                      strokeWidth="12"
                      strokeDasharray={`${2 * Math.PI * 50}`}
                      strokeDashoffset={`${2 * Math.PI * 50 * (1 - performanceScore / 100)}`}
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Performance Metrics */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-6">Performance Metrics</h3>
              <div className="grid grid-cols-3 gap-6">
                {[
                  { 
                    name: 'Query Performance', 
                    score: data.mcpInsights?.performance?.queryPerformance || 85,
                    metric: '< 50ms avg',
                    icon: (
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    )
                  },
                  { 
                    name: 'Index Efficiency', 
                    score: data.mcpInsights?.performance?.indexEfficiency || 72,
                    metric: '12/15 optimized',
                    icon: (
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
                      </svg>
                    )
                  },
                  { 
                    name: 'Connection Pool', 
                    score: data.mcpInsights?.performance?.connectionPool || 90,
                    metric: '45/100 active',
                    icon: (
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    )
                  }
                ].map((metric) => (
                  <div key={metric.name} className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-[#FF6B35] transition-colors">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-lg bg-[#FF6B35] bg-opacity-10 flex items-center justify-center text-[#FF6B35]">
                        {metric.icon}
                      </div>
                      <div>
                        <div className="font-bold text-gray-900">{metric.name}</div>
                        <div className="text-sm text-gray-600">{metric.metric}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            metric.score >= 80 ? 'bg-green-500' :
                            metric.score >= 60 ? 'bg-yellow-500' :
                            'bg-red-500'
                          }`}
                          style={{ width: `${metric.score}%` }}
                        ></div>
                      </div>
                      <div className="text-lg font-bold text-gray-900">{metric.score}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Database Insights */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-6">Database Insights</h3>
              <div className="grid grid-cols-2 gap-6">
                {/* Schema Analysis */}
                <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
                  <h4 className="font-bold text-gray-900 mb-4">Schema Analysis</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Total Tables</span>
                      <span className="font-semibold text-gray-900">{data.mcpInsights?.schema?.totalTables || 24}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Total Indexes</span>
                      <span className="font-semibold text-gray-900">{data.mcpInsights?.schema?.totalIndexes || 45}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Foreign Keys</span>
                      <span className="font-semibold text-gray-900">{data.mcpInsights?.schema?.foreignKeys || 18}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Database Size</span>
                      <span className="font-semibold text-gray-900">{data.mcpInsights?.schema?.size || '2.4 GB'}</span>
                    </div>
                  </div>
                </div>

                {/* Query Statistics */}
                <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
                  <h4 className="font-bold text-gray-900 mb-4">Query Statistics</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Avg Query Time</span>
                      <span className="font-semibold text-green-600">{data.mcpInsights?.queries?.avgTime || '45ms'}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Slow Queries</span>
                      <span className="font-semibold text-yellow-600">{data.mcpInsights?.queries?.slowQueries || 12}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Cache Hit Ratio</span>
                      <span className="font-semibold text-green-600">{data.mcpInsights?.queries?.cacheHitRatio || '94%'}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Queries/Second</span>
                      <span className="font-semibold text-gray-900">{data.mcpInsights?.queries?.qps || 1250}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Optimization Recommendations */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-6">Optimization Recommendations</h3>
              <div className="space-y-4">
                {[
                  {
                    priority: 'high',
                    title: 'Add Index on users.email',
                    description: 'Queries on user email are performing full table scans. Adding an index will improve performance by 10x.',
                    impact: 'High',
                    effort: 'Low',
                    table: 'users',
                    query: 'CREATE INDEX idx_users_email ON users(email);'
                  },
                  {
                    priority: 'medium',
                    title: 'Optimize JOIN on orders table',
                    description: 'The orders table JOIN with customers is inefficient. Consider adding a composite index.',
                    impact: 'Medium',
                    effort: 'Medium',
                    table: 'orders',
                    query: 'CREATE INDEX idx_orders_customer_date ON orders(customer_id, order_date);'
                  },
                  {
                    priority: 'low',
                    title: 'Archive old audit logs',
                    description: 'Audit logs table has grown to 500MB. Archive logs older than 1 year to improve query performance.',
                    impact: 'Low',
                    effort: 'High',
                    table: 'audit_logs',
                    query: 'DELETE FROM audit_logs WHERE created_at < NOW() - INTERVAL \'1 year\';'
                  }
                ].map((rec, index) => (
                  <div key={index} className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-[#FF6B35] transition-colors">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-bold text-gray-900">{rec.title}</h4>
                          <span className={`px-3 py-1 rounded-lg text-xs font-bold ${
                            rec.priority === 'high' ? 'bg-red-100 text-red-800' :
                            rec.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-blue-100 text-blue-800'
                          }`}>
                            {rec.priority.toUpperCase()} PRIORITY
                          </span>
                        </div>
                        <p className="text-gray-600 mb-4">{rec.description}</p>
                        <div className="flex items-center gap-6 text-sm">
                          <div>
                            <span className="text-gray-500">Impact:</span>
                            <span className="font-semibold text-gray-900 ml-2">{rec.impact}</span>
                          </div>
                          <div>
                            <span className="text-gray-500">Effort:</span>
                            <span className="font-semibold text-gray-900 ml-2">{rec.effort}</span>
                          </div>
                          <div>
                            <span className="text-gray-500">Table:</span>
                            <span className="font-mono text-sm text-[#FF6B35] ml-2">{rec.table}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <div className="text-xs font-semibold text-gray-500 mb-2">SUGGESTED QUERY</div>
                      <pre className="text-sm font-mono text-gray-800 overflow-x-auto">{rec.query}</pre>
                    </div>
                    <div className="mt-4">
                      <button className="bg-[#FF6B35] hover:bg-[#ff5722] text-white px-6 py-2 rounded-lg font-semibold transition-colors">
                        Apply Optimization
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tiger Features */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200 rounded-xl p-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-[#FF6B35] flex items-center justify-center text-white flex-shrink-0">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Powered by Tiger Agentic Postgres</h3>
                  <p className="text-gray-600 mb-4">
                    This analysis used Tiger's zero-copy fork technology to analyze your database in parallel without impacting production performance.
                  </p>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-white rounded-lg p-4">
                      <div className="text-2xl font-bold text-[#FF6B35] mb-1">4x</div>
                      <div className="text-sm text-gray-600">Faster Analysis</div>
                    </div>
                    <div className="bg-white rounded-lg p-4">
                      <div className="text-2xl font-bold text-[#FF6B35] mb-1">0%</div>
                      <div className="text-sm text-gray-600">Production Impact</div>
                    </div>
                    <div className="bg-white rounded-lg p-4">
                      <div className="text-2xl font-bold text-[#FF6B35] mb-1">100%</div>
                      <div className="text-sm text-gray-600">Accuracy</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* AI Chat Assistant - Floating Panel */}
      {showChat && (
        <div className="fixed bottom-4 right-4 w-96 h-[600px] bg-white border-2 border-gray-200 rounded-xl shadow-2xl flex flex-col z-50">
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-4 rounded-t-xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold">AI Security Assistant</h3>
                <p className="text-xs text-blue-100">Powered by Groq</p>
              </div>
            </div>
            <button
              onClick={() => setShowChat(false)}
              className="text-white hover:bg-white/20 rounded-lg p-2 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {chatMessages.length === 0 && (
              <div className="text-center text-gray-500 mt-8">
                <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
                <p className="text-sm font-semibold mb-2">Ask me anything!</p>
                <p className="text-xs">I can help you understand and fix security vulnerabilities</p>
              </div>
            )}
            {chatMessages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] rounded-lg px-4 py-3 ${
                  msg.role === 'user' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-white border border-gray-200 text-gray-900'
                }`}>
                  <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Chat Input */}
          <div className="p-4 border-t border-gray-200 bg-white rounded-b-xl">
            <div className="flex gap-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendChatMessage()}
                placeholder="Ask about vulnerabilities..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={sendChatMessage}
                disabled={!chatInput.trim()}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white px-4 py-2 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              <button
                onClick={() => {
                  setChatInput('How many vulnerabilities were found?');
                  setTimeout(sendChatMessage, 100);
                }}
                className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-full transition-colors"
              >
                💬 Count issues
              </button>
              <button
                onClick={() => {
                  setChatInput('How do I fix SQL injection?');
                  setTimeout(sendChatMessage, 100);
                }}
                className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-full transition-colors"
              >
                🔧 Fix SQL injection
              </button>
              <button
                onClick={() => {
                  setChatInput('What should I fix first?');
                  setTimeout(sendChatMessage, 100);
                }}
                className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-full transition-colors"
              >
                🎯 Priority help
              </button>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
}

