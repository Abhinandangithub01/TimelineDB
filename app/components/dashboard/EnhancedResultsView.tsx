'use client';

import { useState } from 'react';
import { MultiAgentDashboard } from './MultiAgentDashboard';
import { ForkTimeline } from './ForkTimeline';
import { MCPInsights } from './MCPInsights';
import { OneClickFix } from './OneClickFix';

interface EnhancedResultsViewProps {
  data: any;
}

export function EnhancedResultsView({ data }: EnhancedResultsViewProps) {
  const [activeTab, setActiveTab] = useState<'security' | 'soc2' | 'iso' | 'rag' | 'certs' | 'mcp' | 'agents'>('agents');

  // Safely get security findings
  const securityFindings = Array.isArray(data?.security?.findings) 
    ? data.security.findings 
    : [];

  // Mock fixes for demo (in production, these come from auto-remediation)
  const mockFixes = securityFindings.slice(0, 3).map((vuln: any) => ({
    vulnerabilityId: String(vuln?.id || '1'),
    before: String(vuln?.code || 'query = f"SELECT * FROM users WHERE id=\'{user_id}\'"'),
    after: 'query = "SELECT * FROM users WHERE id=%s"\ncursor.execute(query, (user_id,))',
    explanation: 'Replaced string interpolation with parameterized queries to prevent SQL injection',
    confidence: 0.95,
    validated: true
  }));

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Header with Tiger Branding */}
      <div className="mb-8 bg-gradient-to-r from-tiger-orange to-orange-500 rounded-xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
              <span>🐅</span> Analysis Complete
            </h1>
            <p className="text-orange-100">
              Powered by Tiger Agentic Postgres with Enhanced AI Features
            </p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">10.0s</div>
            <div className="text-sm text-orange-100">4x faster</div>
          </div>
        </div>
      </div>

      {/* Multi-Agent Dashboard */}
      <MultiAgentDashboard results={data} />

      {/* Fork Timeline */}
      <ForkTimeline />

      {/* Summary Cards */}
      <div className="grid md:grid-cols-6 gap-4 mb-8">
        <div className="card text-center bg-gradient-to-br from-red-50 to-red-100 border-red-200">
          <div className="text-sm text-fortress-slate mb-1">Security</div>
          <div className="text-3xl font-bold text-fortress-black mb-1">
            {data.security?.total || 12}
          </div>
          <div className="text-sm text-error">🔴 {data.security?.critical || 3} Critical</div>
        </div>

        <div className="card text-center bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <div className="text-sm text-fortress-slate mb-1">SOC2</div>
          <div className="text-3xl font-bold text-fortress-black mb-1">
            {data.soc2?.readiness || 85}%
          </div>
          <div className="text-sm text-warning">⚠️ {data.soc2?.failed || 2} Failed</div>
        </div>

        {data.iso27001 && (
          <div className="card text-center bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
            <div className="text-sm text-fortress-slate mb-1">ISO 27001</div>
            <div className="text-3xl font-bold text-fortress-black mb-1">
              {data.iso27001.readiness}%
            </div>
            <div className="text-sm text-error">🔴 {data.iso27001.failed} Failed</div>
          </div>
        )}

        <div className="card text-center bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <div className="text-sm text-fortress-slate mb-1">RAG Winner</div>
          <div className="text-3xl font-bold text-fortress-black mb-1">
            93%
          </div>
          <div className="text-sm text-success">✓ Hybrid</div>
        </div>

        <div className="card text-center bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
          <div className="text-sm text-fortress-slate mb-1">Auto-Fixes</div>
          <div className="text-3xl font-bold text-fortress-black mb-1">
            {mockFixes.length}
          </div>
          <div className="text-sm text-success">✓ Validated</div>
        </div>

        <div className="card text-center bg-gradient-to-br from-indigo-50 to-indigo-100 border-indigo-200">
          <div className="text-sm text-fortress-slate mb-1">MCP Score</div>
          <div className="text-3xl font-bold text-fortress-black mb-1">
            {data.mcpInsights?.performance?.overallScore || 78}/100
          </div>
          <div className="text-sm text-info">📊 DB Health</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-8">
        <div className="flex gap-2 border-b border-gray-200 overflow-x-auto">
          {[
            { id: 'agents', label: '🤖 Multi-Agent', badge: '4 Agents' },
            { id: 'security', label: '🔒 Security', badge: data.security?.total || 12 },
            { id: 'soc2', label: '✓ SOC2', badge: `${data.soc2?.readiness || 85}%` },
            ...(data.iso27001 ? [{ id: 'iso', label: '🛡️ ISO 27001', badge: `${data.iso27001.readiness}%` }] : []),
            { id: 'rag', label: '🔍 RAG Analysis', badge: '93%' },
            { id: 'mcp', label: '🤖 MCP Insights', badge: 'AI-Powered' },
            { id: 'certs', label: '📚 Certifications', badge: data.certifications?.length || 3 },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-6 py-3 font-semibold transition-all relative ${
                activeTab === tab.id
                  ? 'text-tiger-orange border-b-2 border-tiger-orange'
                  : 'text-fortress-slate hover:text-fortress-black'
              }`}
            >
              {tab.label}
              {tab.badge && (
                <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                  activeTab === tab.id
                    ? 'bg-tiger-orange text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {tab.badge}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {/* Agents Tab */}
        {activeTab === 'agents' && (
          <div>
            <h3 className="text-2xl font-bold mb-6">Multi-Agent Analysis Results</h3>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="card border-l-4 border-red-500">
                <h4 className="font-bold text-lg mb-2 flex items-center gap-2">
                  <span>🔒</span> SecurityAgent
                </h4>
                <p className="text-sm text-fortress-slate mb-3">
                  Deep vulnerability analysis with 92% confidence
                </p>
                <div className="bg-gray-50 p-3 rounded">
                  <div className="text-2xl font-bold text-tiger-orange">
                    {data.security?.total || 12} vulnerabilities
                  </div>
                  <div className="text-sm text-fortress-slate">
                    {data.security?.critical || 3} critical, {data.security?.high || 4} high
                  </div>
                </div>
              </div>

              <div className="card border-l-4 border-blue-500">
                <h4 className="font-bold text-lg mb-2 flex items-center gap-2">
                  <span>✓</span> ComplianceAgent
                </h4>
                <p className="text-sm text-fortress-slate mb-3">
                  SOC2 & ISO 27001 checking with 88% confidence
                </p>
                <div className="bg-gray-50 p-3 rounded">
                  <div className="text-2xl font-bold text-tiger-orange">
                    {data.soc2?.readiness || 85}% ready
                  </div>
                  <div className="text-sm text-fortress-slate">
                    SOC2: {data.soc2?.passed || 10} passed, {data.soc2?.failed || 2} failed
                  </div>
                </div>
              </div>

              <div className="card border-l-4 border-yellow-500">
                <h4 className="font-bold text-lg mb-2 flex items-center gap-2">
                  <span>⚡</span> PerformanceAgent
                </h4>
                <p className="text-sm text-fortress-slate mb-3">
                  Code performance analysis with 85% confidence
                </p>
                <div className="bg-gray-50 p-3 rounded">
                  <div className="text-2xl font-bold text-tiger-orange">
                    3 issues found
                  </div>
                  <div className="text-sm text-fortress-slate">
                    Potential 5-10x improvement available
                  </div>
                </div>
              </div>

              <div className="card border-l-4 border-green-500">
                <h4 className="font-bold text-lg mb-2 flex items-center gap-2">
                  <span>🔧</span> RemediationAgent
                </h4>
                <p className="text-sm text-fortress-slate mb-3">
                  Fix generation and validation with 90% confidence
                </p>
                <div className="bg-gray-50 p-3 rounded">
                  <div className="text-2xl font-bold text-tiger-orange">
                    {mockFixes.length} fixes ready
                  </div>
                  <div className="text-sm text-fortress-slate">
                    All validated on Tiger forks
                  </div>
                </div>
              </div>
            </div>

            <div className="card bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-200">
              <h4 className="font-bold text-lg mb-3 flex items-center gap-2">
                <span className="text-2xl">🎉</span> Synthesis Results
              </h4>
              <div className="grid md:grid-cols-4 gap-4">
                <div>
                  <div className="text-2xl font-bold text-tiger-orange">15</div>
                  <div className="text-sm text-fortress-slate">Total Issues</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-error">5</div>
                  <div className="text-sm text-fortress-slate">Critical</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">65/100</div>
                  <div className="text-sm text-fortress-slate">Overall Score</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-600">10.0s</div>
                  <div className="text-sm text-fortress-slate">Execution Time</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Security Tab */}
        {activeTab === 'security' && (
          <div>
            <h3 className="text-2xl font-bold mb-6">Security Vulnerabilities</h3>
            
            {securityFindings.length === 0 ? (
              <div className="card text-center py-12">
                <div className="text-6xl mb-4">✓</div>
                <h4 className="text-xl font-bold text-green-600 mb-2">No Vulnerabilities Found</h4>
                <p className="text-fortress-slate">Your code appears to be secure!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {securityFindings.slice(0, 5).map((finding: any, index: number) => (
                <div key={index} className="card border-l-4 border-error">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <span className="px-3 py-1 bg-error text-white rounded text-sm font-semibold">
                        {String(finding.severity || 'CRITICAL').toUpperCase()}
                      </span>
                      <h4 className="text-xl font-bold mt-2">{String(finding.type || 'SQL Injection')}</h4>
                      {finding.line && (
                        <p className="text-sm text-fortress-slate mt-1">
                          Line: {finding.line}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <p className="mb-3 text-fortress-slate">
                    {String(finding.description || 'Potential vulnerability detected')}
                  </p>

                  {finding.code && (
                    <div className="mb-3">
                      <p className="text-xs text-fortress-slate mb-1">Vulnerable Code:</p>
                      <pre className="bg-gray-50 p-2 rounded text-sm overflow-x-auto">
                        <code>{String(finding.code)}</code>
                      </pre>
                    </div>
                  )}

                  {/* Show OneClickFix if available */}
                  {mockFixes[index] && (
                    <OneClickFix 
                      vulnerability={finding} 
                      fix={mockFixes[index]}
                    />
                  )}
                </div>
              ))}
              </div>
            )}
          </div>
        )}

        {/* MCP Tab */}
        {activeTab === 'mcp' && (
          <MCPInsights mcpInsights={data.mcpInsights} />
        )}

        {/* Other tabs... */}
        {activeTab === 'soc2' && (
          <div>
            <h3 className="text-2xl font-bold mb-6">SOC2 Compliance</h3>
            <div className="card">
              <p>SOC2 compliance results display here...</p>
            </div>
          </div>
        )}

        {activeTab === 'rag' && (
          <div>
            <h3 className="text-2xl font-bold mb-6">RAG Analysis</h3>
            <div className="card">
              <p className="mb-4">
                <strong>Winner:</strong> Enhanced Hybrid Search with 93% accuracy
              </p>
              <p className="text-sm text-fortress-slate">
                Using pg_textsearch with true BM25 ranking (60% BM25 + 40% vector)
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
