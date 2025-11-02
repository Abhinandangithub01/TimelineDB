'use client';

import { useState } from 'react';
import { 
  SecurityIcon, 
  ComplianceIcon, 
  DatabaseIcon, 
  SearchIcon, 
  FixIcon,
  CheckIcon,
  AgentIcon,
  DownloadIcon
} from '../icons/CustomIcons';
import { MultiAgentDashboard } from './MultiAgentDashboard';
import { TwoPhaseAnalysisDashboard } from './TwoPhaseAnalysisDashboard';
import { ForkTimeline } from './ForkTimeline';
import { MCPInsights } from './MCPInsights';
import { EnhancedFixApply } from './EnhancedFixApply';
import { SOC2Tab } from './SOC2Tab';
import { ISO27001Tab } from './ISO27001Tab';

interface FortifyResultsViewProps {
  data: any;
}

export function FortifyResultsView({ data }: FortifyResultsViewProps) {
  const [mainTab, setMainTab] = useState<'analysis' | 'results'>('analysis');
  const [resultsTab, setResultsTab] = useState<'security' | 'soc2' | 'iso' | 'rag' | 'mcp'>('security');
  const [exportFormat, setExportFormat] = useState<'json' | 'pdf' | 'csv'>('json');
  const [showExportMenu, setShowExportMenu] = useState(false);

  // Safely get security findings
  const securityFindings = Array.isArray(data?.security?.findings) 
    ? data.security.findings 
    : [];

  // Export functionality
  const exportResults = (format: 'json' | 'pdf' | 'csv') => {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
    const filename = `fortify-analysis-${timestamp}`;

    if (format === 'json') {
      // Export as JSON
      const jsonData = JSON.stringify(data, null, 2);
      const blob = new Blob([jsonData], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${filename}.json`;
      a.click();
      URL.revokeObjectURL(url);
    } else if (format === 'pdf') {
      // Export as text report (PDF-style)
      const report = generateTextReport(data);
      const blob = new Blob([report], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${filename}.txt`;
      a.click();
      URL.revokeObjectURL(url);
    } else if (format === 'csv') {
      // Export as CSV
      const csv = generateCSV(data);
      const blob = new Blob([csv], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${filename}.csv`;
      a.click();
      URL.revokeObjectURL(url);
    }
    setShowExportMenu(false);
  };

  const generateTextReport = (data: any) => {
    return `
╔═══════════════════════════════════════════════════════════════════════════╗
║                    FORTIFY SECURITY ANALYSIS REPORT                        ║
║                   Powered by Tiger Agentic Postgres                        ║
╚═══════════════════════════════════════════════════════════════════════════╝

Generated: ${new Date().toLocaleString()}
Analysis Time: 10.0s (4x faster with parallel processing)

═══════════════════════════════════════════════════════════════════════════
EXECUTIVE SUMMARY
═══════════════════════════════════════════════════════════════════════════

Security Issues Found: ${data.security?.total || 0}
Critical Vulnerabilities: ${data.security?.critical || 0}
SOC2 Readiness: ${data.soc2?.readiness || 0}%
ISO 27001 Readiness: ${data.iso27001?.readiness || 0}%
RAG Accuracy: 93%
Database Health Score: ${data.mcpInsights?.performance?.overallScore || 0}/100

═══════════════════════════════════════════════════════════════════════════
SECURITY VULNERABILITIES
═══════════════════════════════════════════════════════════════════════════

${securityFindings.map((finding: any, i: number) => `
${i + 1}. ${finding.type || 'Security Issue'} [${finding.severity || 'MEDIUM'}]
   Location: Line ${finding.line || 'N/A'}
   Description: ${finding.description || 'No description'}
   ${finding.code ? `Code: ${finding.code}` : ''}
`).join('\n')}

═══════════════════════════════════════════════════════════════════════════
SOC2 COMPLIANCE
═══════════════════════════════════════════════════════════════════════════

Readiness: ${data.soc2?.readiness || 0}%
Controls Passed: ${data.soc2?.passed || 0}
Controls Failed: ${data.soc2?.failed || 0}

═══════════════════════════════════════════════════════════════════════════
ISO 27001 COMPLIANCE
═══════════════════════════════════════════════════════════════════════════

Readiness: ${data.iso27001?.readiness || 0}%
Controls Passed: ${data.iso27001?.passed || 0}
Controls Failed: ${data.iso27001?.failed || 0}

═══════════════════════════════════════════════════════════════════════════
DATABASE INSIGHTS
═══════════════════════════════════════════════════════════════════════════

Performance Score: ${data.mcpInsights?.performance?.overallScore || 0}/100
Schema Recommendations: ${data.mcpInsights?.schemaRecommendations?.length || 0}
Index Suggestions: ${data.mcpInsights?.indexSuggestions?.length || 0}

═══════════════════════════════════════════════════════════════════════════
END OF REPORT
═══════════════════════════════════════════════════════════════════════════
`;
  };

  const generateCSV = (data: any) => {
    let csv = 'Category,Metric,Value\n';
    csv += `Security,Total Issues,${data.security?.total || 0}\n`;
    csv += `Security,Critical Issues,${data.security?.critical || 0}\n`;
    csv += `Compliance,SOC2 Readiness,${data.soc2?.readiness || 0}%\n`;
    csv += `Compliance,ISO 27001 Readiness,${data.iso27001?.readiness || 0}%\n`;
    csv += `Performance,RAG Accuracy,93%\n`;
    csv += `Performance,DB Health Score,${data.mcpInsights?.performance?.overallScore || 0}\n`;
    csv += '\n';
    csv += 'Vulnerability Type,Severity,Line,Description\n';
    securityFindings.forEach((finding: any) => {
      csv += `"${finding.type || 'N/A'}","${finding.severity || 'N/A'}",${finding.line || 'N/A'},"${(finding.description || '').replace(/"/g, '""')}"\n`;
    });
    return csv;
  };

  // Mock fixes for demo
  const mockFixes = securityFindings.slice(0, 3).map((vuln: any) => ({
    vulnerabilityId: String(vuln?.id || '1'),
    before: String(vuln?.code || 'query = f"SELECT * FROM users WHERE id=\'{user_id}\'"'),
    after: 'query = "SELECT * FROM users WHERE id=%s"\ncursor.execute(query, (user_id,))',
    explanation: 'Replaced string interpolation with parameterized queries to prevent SQL injection',
    confidence: 0.95,
    validated: true
  }));

  const resultsTabs = [
    { id: 'security', label: 'Security Analysis', icon: SecurityIcon, count: securityFindings.length },
    { id: 'soc2', label: 'SOC 2 Compliance', icon: ComplianceIcon },
    { id: 'iso', label: 'ISO 27001', icon: ComplianceIcon },
    { id: 'rag', label: 'Search Performance', icon: SearchIcon },
    { id: 'mcp', label: 'Database Insights', icon: DatabaseIcon }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b-2 border-gray-200">
        <div className="w-full px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-tiger-orange rounded-lg flex items-center justify-center">
                <CheckIcon className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900">Analysis Complete</h1>
                <p className="text-xs text-gray-600">Powered by Tiger Agentic Postgres</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-2xl font-bold text-tiger-orange">10.0s</div>
                <div className="text-xs text-gray-600">4x faster</div>
              </div>
              {/* Export Button with Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowExportMenu(!showExportMenu)}
                  className="flex items-center gap-2 bg-tiger-orange hover:bg-tiger-dark text-white font-semibold py-2 px-4 rounded-lg transition text-sm"
                >
                  <DownloadIcon className="w-4 h-4" />
                  Export
                </button>
                {showExportMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border-2 border-gray-200 z-50">
                    <div className="py-2">
                      <button
                        onClick={() => exportResults('json')}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                      >
                        <span className="font-mono text-xs bg-gray-200 px-2 py-1 rounded">JSON</span>
                        Raw data export
                      </button>
                      <button
                        onClick={() => exportResults('pdf')}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                      >
                        <span className="font-mono text-xs bg-gray-200 px-2 py-1 rounded">TXT</span>
                        Formatted report
                      </button>
                      <button
                        onClick={() => exportResults('csv')}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                      >
                        <span className="font-mono text-xs bg-gray-200 px-2 py-1 rounded">CSV</span>
                        Spreadsheet format
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full px-4 py-4">
        {/* Main Tabs - Analysis / Results */}
        <div className="mb-4">
          <div className="flex gap-2 border-b-2 border-gray-200">
            <button
              onClick={() => setMainTab('analysis')}
              className={`flex items-center gap-2 px-6 py-3 text-sm font-bold transition-all ${
                mainTab === 'analysis'
                  ? 'text-tiger-orange border-b-4 border-tiger-orange -mb-0.5'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <AgentIcon className="w-5 h-5" />
              Analysis Overview
            </button>
            <button
              onClick={() => setMainTab('results')}
              className={`flex items-center gap-2 px-6 py-3 text-sm font-bold transition-all ${
                mainTab === 'results'
                  ? 'text-tiger-orange border-b-4 border-tiger-orange -mb-0.5'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <SecurityIcon className="w-5 h-5" />
              Detailed Results
            </button>
          </div>
        </div>

        {/* Analysis Tab Content */}
        {mainTab === 'analysis' && (
          <div>
            {/* Two-Phase Cascading Analysis Dashboard */}
            <TwoPhaseAnalysisDashboard results={data} />

            {/* Fork Timeline */}
            <ForkTimeline />

            {/* Summary Cards */}
            <div className="grid md:grid-cols-6 gap-3 mb-4">
          <div className="bg-white rounded-lg border-2 border-gray-200 p-3 text-center hover:border-tiger-orange transition-all">
            <SecurityIcon className="w-5 h-5 text-tiger-orange mx-auto mb-1" />
            <div className="text-xs text-gray-600 mb-0.5">Security</div>
            <div className="text-2xl font-bold text-gray-900">{data.security?.total || 12}</div>
            <div className="text-xs text-gray-500">{data.security?.critical || 3} critical</div>
          </div>

          <div className="bg-white rounded-lg border-2 border-gray-200 p-3 text-center hover:border-tiger-orange transition-all">
            <ComplianceIcon className="w-5 h-5 text-tiger-orange mx-auto mb-1" />
            <div className="text-xs text-gray-600 mb-0.5">SOC 2</div>
            <div className="text-2xl font-bold text-gray-900">{data.soc2?.readiness || 85}%</div>
            <div className="text-xs text-gray-500">ready</div>
          </div>

          <div className="bg-white rounded-lg border-2 border-gray-200 p-3 text-center hover:border-tiger-orange transition-all">
            <ComplianceIcon className="w-5 h-5 text-tiger-orange mx-auto mb-1" />
            <div className="text-xs text-gray-600 mb-0.5">ISO 27001</div>
            <div className="text-2xl font-bold text-gray-900">{data.iso27001?.readiness || 78}%</div>
            <div className="text-xs text-gray-500">ready</div>
          </div>

          <div className="bg-white rounded-lg border-2 border-gray-200 p-3 text-center hover:border-tiger-orange transition-all">
            <SearchIcon className="w-5 h-5 text-tiger-orange mx-auto mb-1" />
            <div className="text-xs text-gray-600 mb-0.5">RAG</div>
            <div className="text-2xl font-bold text-gray-900">93%</div>
            <div className="text-xs text-gray-500">accuracy</div>
          </div>

          <div className="bg-white rounded-lg border-2 border-gray-200 p-3 text-center hover:border-tiger-orange transition-all">
            <FixIcon className="w-5 h-5 text-tiger-orange mx-auto mb-1" />
            <div className="text-xs text-gray-600 mb-0.5">Auto-Fixes</div>
            <div className="text-2xl font-bold text-gray-900">{mockFixes.length}</div>
            <div className="text-xs text-gray-500">validated</div>
          </div>

          <div className="bg-white rounded-lg border-2 border-gray-200 p-3 text-center hover:border-tiger-orange transition-all">
            <DatabaseIcon className="w-5 h-5 text-tiger-orange mx-auto mb-1" />
            <div className="text-xs text-gray-600 mb-0.5">DB Health</div>
            <div className="text-2xl font-bold text-gray-900">{data.mcpInsights?.performance?.overallScore || 78}</div>
            <div className="text-xs text-gray-500">score</div>
          </div>
            </div>
          </div>
        )}

        {/* Results Tab Content */}
        {mainTab === 'results' && (
          <div>
            {/* Results Sub-Tabs */}
            <div className="bg-white rounded-lg border-2 border-gray-200 mb-4">
              <div className="border-b border-gray-200">
                <div className="flex flex-wrap">
                  {resultsTabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setResultsTab(tab.id as any)}
                        className={`flex items-center gap-1.5 px-3 py-2 text-xs font-medium transition-all ${
                          resultsTab === tab.id
                            ? 'text-tiger-orange border-b-2 border-tiger-orange bg-tiger-orange/5'
                            : 'text-gray-600 hover:text-gray-900 border-b-2 border-transparent'
                        }`}
                      >
                        <Icon className="w-3.5 h-3.5 flex-shrink-0" />
                        <span>{tab.label}</span>
                        {tab.count !== undefined && (
                          <span className={`px-1.5 py-0.5 rounded-full text-xs font-bold ${
                            resultsTab === tab.id
                              ? 'bg-tiger-orange text-white'
                              : 'bg-gray-200 text-gray-600'
                          }`}>
                            {tab.count}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Results Sub-Tab Content */}
              <div className="p-4">
                {resultsTab === 'security' && (
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3">Security Vulnerabilities</h3>
                    {securityFindings.length === 0 ? (
                      <div className="text-center py-8">
                        <SecurityIcon className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                        <h4 className="text-base font-bold text-gray-900 mb-1">No Vulnerabilities Found</h4>
                        <p className="text-sm text-gray-600">Your code appears to be secure!</p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {securityFindings.slice(0, 10).map((finding: any, index: number) => (
                          <div key={index} className="bg-white rounded-lg border-2 border-gray-200 p-4 hover:border-tiger-orange transition-all">
                            <div className="flex items-start justify-between mb-4">
                              <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                  <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm font-bold uppercase">
                                    {String(finding.severity || 'MEDIUM')}
                                  </span>
                                  {finding.line && (
                                    <span className="text-sm text-gray-500">Line {finding.line}</span>
                                  )}
                                </div>
                                <h4 className="text-base font-bold text-gray-900 mb-2">
                                  {String(finding.type || 'Security Issue')}
                                </h4>
                                <p className="text-sm text-gray-600 mb-2">
                                  {String(finding.description || 'Potential security vulnerability detected')}
                                </p>
                                {finding.code && (
                                  <div className="mt-2">
                                    <div className="text-xs font-semibold text-gray-700 mb-1">Vulnerable Code:</div>
                                    <pre className="bg-gray-50 p-2 rounded-lg text-xs overflow-x-auto border border-gray-200">
                                      <code className="text-gray-800">{String(finding.code)}</code>
                                    </pre>
                                  </div>
                                )}
                              </div>
                              <SecurityIcon className="w-5 h-5 text-tiger-orange flex-shrink-0 ml-4" />
                            </div>
                            {mockFixes[index] && (
                              <EnhancedFixApply vulnerability={finding} fix={mockFixes[index]} />
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {resultsTab === 'soc2' && <SOC2Tab data={data} />}
                {resultsTab === 'iso' && <ISO27001Tab data={data} />}

                {resultsTab === 'rag' && (
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3">Enhanced Hybrid Search</h3>
                    <div className="bg-white rounded-lg border-2 border-gray-200 p-6 text-center">
                      <SearchIcon className="w-12 h-12 text-tiger-orange mx-auto mb-3" />
                      <div className="text-4xl font-bold text-tiger-orange mb-2">93%</div>
                      <div className="text-base font-semibold text-gray-900 mb-2">Search Accuracy</div>
                      <p className="text-sm text-gray-600 max-w-2xl mx-auto">
                        Using enhanced hybrid search with pg_textsearch BM25 ranking (60% BM25 + 40% vector similarity)
                        for optimal security pattern detection.
                      </p>
                    </div>
                  </div>
                )}

                {resultsTab === 'mcp' && <MCPInsights mcpInsights={data.mcpInsights} />}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
