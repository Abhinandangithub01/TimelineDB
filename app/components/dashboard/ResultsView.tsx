'use client';

import { useState } from 'react';

interface ResultsViewProps {
  data: any;
}

export function ResultsView({ data }: ResultsViewProps) {
  const [activeTab, setActiveTab] = useState<'security' | 'soc2' | 'iso' | 'rag' | 'certs'>('security');

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-fortress-black mb-2">
          Analysis Complete ✓
        </h1>
        <p className="text-fortress-slate">Completed 2 minutes ago</p>
      </div>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-5 gap-4 mb-8">
        <div className="card text-center">
          <div className="text-sm text-fortress-slate mb-1">Security</div>
          <div className="text-3xl font-bold text-fortress-black mb-1">
            {data.security.total}
          </div>
          <div className="text-sm text-error">🔴 {data.security.critical} Critical</div>
        </div>
        <div className="card text-center">
          <div className="text-sm text-fortress-slate mb-1">SOC2</div>
          <div className="text-3xl font-bold text-fortress-black mb-1">
            {data.soc2.readiness}%
          </div>
          <div className="text-sm text-error">🔴 {data.soc2.failed} Failed</div>
        </div>
        {data.iso27001 && (
          <div className="card text-center">
            <div className="text-sm text-fortress-slate mb-1">ISO 27001</div>
            <div className="text-3xl font-bold text-fortress-black mb-1">
              {data.iso27001.readiness}%
            </div>
            <div className="text-sm text-error">🔴 {data.iso27001.failed} Failed</div>
          </div>
        )}
        <div className="card text-center">
          <div className="text-sm text-fortress-slate mb-1">RAG Winner</div>
          <div className="text-3xl font-bold text-fortress-black mb-1">
            {data.rag.strategies.find((s: any) => s.winner)?.accuracy || 0}%
          </div>
          <div className="text-sm text-success">✓ {data.rag.winner || 'Unknown'}</div>
        </div>
        <div className="card text-center">
          <div className="text-sm text-fortress-slate mb-1">Certifications</div>
          <div className="text-3xl font-bold text-fortress-black mb-1">
            {data.certifications.length}
          </div>
          <div className="text-sm text-info">📚 Recommended</div>
        </div>
      </div>

      {/* Priority Actions */}
      <div className="card mb-8">
        <h2 className="text-2xl font-bold mb-4">🎯 Priority Actions</h2>
        <div className="space-y-3">
          <div className="p-3 bg-error/10 border-l-4 border-error rounded">
            <div className="font-semibold">1. Fix SQL Injection (login.py:23) - Critical</div>
            <div className="text-sm text-fortress-slate">OWASP A03 | CVSS 9.8</div>
          </div>
          <div className="p-3 bg-error/10 border-l-4 border-error rounded">
            <div className="font-semibold">2. Implement encryption at rest (CC6.6) - SOC2 Fail</div>
            <div className="text-sm text-fortress-slate">Will cause audit failure</div>
          </div>
          <div className="p-3 bg-warning/10 border-l-4 border-warning rounded">
            <div className="font-semibold">3. Add authentication logging (CC7.2) - Audit Risk</div>
            <div className="text-sm text-fortress-slate">Incomplete audit evidence</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="card">
        <div className="flex gap-4 border-b border-fortress-light mb-6">
          {[
            { id: 'security', label: 'Security' },
            { id: 'soc2', label: 'SOC2' },
            ...(data.iso27001 ? [{ id: 'iso', label: 'ISO 27001' }] : []),
            { id: 'rag', label: 'RAG Analysis' },
            { id: 'certs', label: 'Certifications' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-3 font-semibold border-b-2 transition ${
                activeTab === tab.id
                  ? 'border-tiger-orange text-tiger-orange'
                  : 'border-transparent text-fortress-slate hover:text-tiger-orange'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Security Tab */}
        {activeTab === 'security' && (
          <div>
            <h3 className="text-2xl font-bold mb-6">
              Security Vulnerabilities ({data.security.total})
            </h3>
            <div className="space-y-4">
              {data.security.findings.map((finding: any) => (
                <div key={finding.id} className="border border-fortress-light rounded-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span
                          className={`px-3 py-1 rounded text-sm font-semibold ${
                            finding.severity === 'critical'
                              ? 'bg-error text-white'
                              : finding.severity === 'high'
                              ? 'bg-warning text-white'
                              : 'bg-info text-white'
                          }`}
                        >
                          {finding.severity.toUpperCase()}
                        </span>
                        <h4 className="text-xl font-bold">{finding.type}</h4>
                      </div>
                      <div className="text-sm text-fortress-slate">
                        {finding.file}:{finding.line} | {finding.owasp} | {finding.cwe} | CVSS {finding.cvss}
                      </div>
                    </div>
                  </div>

                  <p className="mb-4 text-fortress-slate">{finding.description}</p>

                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <div className="text-sm font-semibold mb-2">Vulnerable Code:</div>
                      <pre className="bg-fortress-black text-error p-3 rounded text-sm overflow-x-auto">
                        <code>{finding.code}</code>
                      </pre>
                    </div>
                    <div>
                      <div className="text-sm font-semibold mb-2">Fixed Code:</div>
                      <pre className="bg-fortress-black text-success p-3 rounded text-sm overflow-x-auto">
                        <code>{finding.fix}</code>
                      </pre>
                    </div>
                  </div>

                  <div className="bg-tiger-light/20 p-4 rounded">
                    <div className="font-semibold mb-2">📚 Learning Path:</div>
                    <ul className="text-sm space-y-1">
                      {finding.certTopics.map((topic: string, i: number) => (
                        <li key={i}>• {topic}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SOC2 Tab */}
        {activeTab === 'soc2' && (
          <div>
            <h3 className="text-2xl font-bold mb-6">SOC2 Compliance Status</h3>
            
            <div className="mb-8">
              <div className="flex justify-between mb-2">
                <span className="font-semibold">Overall Readiness</span>
                <span className="text-2xl font-bold text-tiger-orange">{data.soc2.readiness}%</span>
              </div>
              <div className="w-full bg-fortress-light rounded-full h-6">
                <div
                  className="bg-tiger-orange h-6 rounded-full flex items-center justify-end pr-3 text-white text-sm font-semibold"
                  style={{ width: `${data.soc2.readiness}%` }}
                >
                  {data.soc2.readiness}%
                </div>
              </div>
              <div className="flex justify-between mt-2 text-sm">
                <span className="text-success">✓ Passed: {data.soc2.passed}</span>
                <span className="text-warning">⚠️ At Risk: {data.soc2.atRisk}</span>
                <span className="text-error">✗ Failed: {data.soc2.failed}</span>
              </div>
            </div>

            <div className="mb-8">
              <h4 className="font-bold text-lg mb-4">⚠️ Audit Blockers ({data.soc2.failed})</h4>
              <p className="text-sm text-fortress-slate mb-4">
                These violations will cause SOC2 audit failure:
              </p>
            </div>

            <div className="space-y-4">
              {data.soc2.violations.map((violation: any) => (
                <div key={violation.id} className="border-2 border-error rounded-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="px-3 py-1 bg-error text-white rounded text-sm font-semibold">
                          {violation.severity.toUpperCase()}
                        </span>
                        <h4 className="text-xl font-bold">{violation.controlId}: {violation.title}</h4>
                      </div>
                      <div className="text-sm text-fortress-slate">
                        Category: {violation.category}
                      </div>
                    </div>
                  </div>

                  <p className="mb-4">{violation.description}</p>

                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div className="bg-error/10 p-4 rounded">
                      <div className="font-semibold mb-1">Audit Impact:</div>
                      <div className="text-sm">{violation.impact}</div>
                    </div>
                    <div className="bg-warning/10 p-4 rounded">
                      <div className="font-semibold mb-1">Business Risk:</div>
                      <div className="text-sm">{violation.businessRisk}</div>
                    </div>
                  </div>

                  <div className="bg-success/10 p-4 rounded">
                    <div className="font-semibold mb-1">✓ Remediation:</div>
                    <div className="text-sm mb-2">{violation.remediation}</div>
                    <div className="text-sm text-fortress-slate">Time to fix: {violation.timeToFix}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ISO 27001 Tab */}
        {activeTab === 'iso' && data.iso27001 && (
          <div>
            <h3 className="text-2xl font-bold mb-6">ISO 27001:2022 Compliance Status</h3>
            
            <div className="mb-8">
              <div className="flex justify-between mb-2">
                <span className="font-semibold">Overall Readiness</span>
                <span className="text-2xl font-bold text-tiger-orange">{data.iso27001.readiness}%</span>
              </div>
              <div className="w-full bg-fortress-light rounded-full h-6">
                <div
                  className="bg-tiger-orange h-6 rounded-full flex items-center justify-end pr-3 text-white text-sm font-semibold"
                  style={{ width: `${data.iso27001.readiness}%` }}
                >
                  {data.iso27001.readiness}%
                </div>
              </div>
              <div className="flex justify-between mt-2 text-sm">
                <span className="text-success">✓ Passed: {data.iso27001.passed}</span>
                <span className="text-warning">⚠️ At Risk: {data.iso27001.atRisk}</span>
                <span className="text-error">✗ Failed: {data.iso27001.failed}</span>
              </div>
            </div>

            <div className="mb-8">
              <h4 className="font-bold text-lg mb-4">⚠️ Critical Non-Conformities ({data.iso27001.failed})</h4>
              <p className="text-sm text-fortress-slate mb-4">
                These violations must be addressed before ISO 27001 certification:
              </p>
            </div>

            <div className="space-y-4">
              {data.iso27001.violations.map((violation: any) => (
                <div key={violation.id} className="border-2 border-error rounded-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="px-3 py-1 bg-error text-white rounded text-sm font-semibold">
                          {violation.severity.toUpperCase()}
                        </span>
                        <h4 className="text-xl font-bold">{violation.controlId}: {violation.title}</h4>
                      </div>
                      <div className="text-sm text-fortress-slate">
                        {violation.category}
                      </div>
                    </div>
                  </div>

                  <p className="mb-4">{violation.description}</p>

                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div className="bg-error/10 p-4 rounded">
                      <div className="font-semibold mb-1">Certification Impact:</div>
                      <div className="text-sm">{violation.impact}</div>
                    </div>
                    <div className="bg-warning/10 p-4 rounded">
                      <div className="font-semibold mb-1">Business Risk:</div>
                      <div className="text-sm">{violation.businessRisk}</div>
                    </div>
                  </div>

                  <div className="bg-success/10 p-4 rounded">
                    <div className="font-semibold mb-1">✓ Remediation:</div>
                    <div className="text-sm mb-2">{violation.remediation}</div>
                    <div className="text-sm text-fortress-slate">Time to fix: {violation.timeToFix}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* RAG Tab */}
        {activeTab === 'rag' && (
          <div>
            <h3 className="text-2xl font-bold mb-6">RAG Strategy Evaluation Results</h3>
            <p className="text-fortress-slate mb-8">
              Which RAG strategy finds security issues best?
            </p>

            <div className="overflow-x-auto mb-8">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-fortress-light">
                    <th className="text-left py-3 px-4">Strategy</th>
                    <th className="text-center py-3 px-4">Accuracy</th>
                    <th className="text-center py-3 px-4">Latency</th>
                    <th className="text-center py-3 px-4">Precision</th>
                    <th className="text-center py-3 px-4">Recall</th>
                  </tr>
                </thead>
                <tbody>
                  {data.rag.strategies.map((strategy: any, i: number) => (
                    <tr
                      key={i}
                      className={`border-b border-fortress-light ${
                        strategy.winner ? 'bg-tiger-light/20' : ''
                      }`}
                    >
                      <td className="py-4 px-4 font-semibold">
                        {strategy.name} {strategy.winner && '✓'}
                      </td>
                      <td className="text-center py-4 px-4 font-bold text-tiger-orange">
                        {strategy.accuracy}%
                      </td>
                      <td className="text-center py-4 px-4">{strategy.latency}s</td>
                      <td className="text-center py-4 px-4">{strategy.precision}%</td>
                      <td className="text-center py-4 px-4">{strategy.recall}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="card bg-tiger-light/20 border-2 border-tiger-orange">
              <h4 className="text-xl font-bold mb-3">🏆 Winner: {data.rag.winner} Search</h4>
              <p className="mb-4">{data.rag.reason}</p>
              {data.rag.strategies && data.rag.strategies.find((s: any) => s.winner) && (
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <div className="font-semibold">{data.rag.strategies.find((s: any) => s.winner)?.accuracy}% accuracy</div>
                    <div className="text-fortress-slate">Overall performance</div>
                  </div>
                  <div>
                    <div className="font-semibold">{data.rag.strategies.find((s: any) => s.winner)?.precision}% precision</div>
                    <div className="text-fortress-slate">Relevance score</div>
                  </div>
                  <div>
                    <div className="font-semibold">{data.rag.strategies.find((s: any) => s.winner)?.latency}s average</div>
                    <div className="text-fortress-slate">Retrieval time</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Certifications Tab */}
        {activeTab === 'certs' && (
          <div>
            <h3 className="text-2xl font-bold mb-6">Your Personalized Certification Roadmap</h3>
            <p className="text-fortress-slate mb-8">
              Based on {data.security.total} vulnerabilities and {data.soc2.violations.length} SOC2 violations
            </p>

            <div className="space-y-6">
              {data.certifications.map((cert: any) => (
                <div key={cert.id} className="card border-2 border-tiger-orange">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="text-sm text-tiger-orange font-semibold mb-1">
                        Phase {cert.phase}
                      </div>
                      <h4 className="text-2xl font-bold mb-2">{cert.name}</h4>
                      <div className="flex gap-4 text-sm text-fortress-slate">
                        <span>⏱️ {cert.duration}</span>
                        <span>💰 ${cert.cost}</span>
                        <span>📊 {cert.coverage}% coverage</span>
                      </div>
                    </div>
                    <span
                      className={`px-3 py-1 rounded text-sm font-semibold ${
                        cert.priority === 'high'
                          ? 'bg-error text-white'
                          : 'bg-warning text-white'
                      }`}
                    >
                      {cert.priority.toUpperCase()} PRIORITY
                    </span>
                  </div>

                  <div className="mb-4">
                    <div className="font-semibold mb-2">Topics Covered:</div>
                    <div className="flex flex-wrap gap-2">
                      {cert.topics.map((topic: string, i: number) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-tiger-light/30 rounded text-sm"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="w-full bg-fortress-light rounded-full h-3">
                    <div
                      className="bg-tiger-orange h-3 rounded-full"
                      style={{ width: `${cert.coverage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            <div className="card bg-info/10 mt-8">
              <h4 className="font-bold mb-2">📊 Summary</h4>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div>
                  <div className="font-semibold">Total Investment:</div>
                  <div className="text-2xl font-bold text-tiger-orange">
                    ${data.certifications.reduce((sum: number, cert: any) => sum + cert.cost, 0)}
                  </div>
                </div>
                <div>
                  <div className="font-semibold">Total Timeline:</div>
                  <div className="text-2xl font-bold text-tiger-orange">8 months</div>
                </div>
                <div>
                  <div className="font-semibold">Expected Outcome:</div>
                  <div className="text-2xl font-bold text-success">95% reduction</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 mt-8">
        <button className="btn-primary">Download PDF Report</button>
        <button className="btn-secondary">Share Results</button>
        <button className="btn-secondary">New Analysis</button>
      </div>
    </div>
  );
}
