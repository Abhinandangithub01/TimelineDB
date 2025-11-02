'use client';

import React from 'react';
import { DatabaseIcon, AlertIcon, CheckIcon } from '../icons/CustomIcons';

interface MCPInsightsProps {
  mcpInsights?: any;
}

export function MCPInsights({ mcpInsights }: MCPInsightsProps) {
  if (!mcpInsights) {
    // Show default data if no insights available
    mcpInsights = {
      performance: { overallScore: 78 },
      schemaRecommendations: [
        {
          table: 'security_patterns',
          impact: 'high',
          recommendation: 'Add GIN index on combined text fields for faster hybrid search',
          description: 'Current full-text searches scan entire table. GIN index will speed up by 10x',
          estimatedImprovement: '5 minutes'
        },
        {
          table: 'analysis_sessions',
          impact: 'medium',
          recommendation: 'Add BRIN index on created_at for time-series queries',
          description: 'Time-based queries will benefit from BRIN index optimization',
          estimatedImprovement: '2 minutes'
        }
      ],
      indexSuggestions: [
        {
          table: 'vulnerabilities',
          column: 'severity',
          type: 'btree',
          impact: 'medium',
          reason: 'Frequently used in WHERE clauses for filtering'
        },
        {
          table: 'code_analysis',
          column: 'language, framework',
          type: 'composite',
          impact: 'high',
          reason: 'Common filter combination in analysis queries'
        }
      ],
      slowQueries: []
    };
  }

  const { schemaRecommendations = [], indexSuggestions = [], performance = {}, slowQueries = [] } = mcpInsights;
  const score = performance.overallScore || 78;

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
          <DatabaseIcon className="w-7 h-7 text-tiger-orange" />
          Tiger MCP Database Insights
        </h2>
        <p className="text-sm text-gray-600">AI-powered database performance analysis and optimization</p>
      </div>

      {/* Performance Score Gauge */}
      <div className="grid md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
          <div className="text-center">
            <DatabaseIcon className="w-8 h-8 text-tiger-orange mx-auto mb-3" />
            <h3 className="text-xs font-semibold text-gray-600 mb-2">
              Performance Score
            </h3>
            <div className="relative inline-flex items-center justify-center">
              <svg className="w-24 h-24 transform -rotate-90">
                <circle
                  cx="48"
                  cy="48"
                  r="40"
                  stroke="#e5e7eb"
                  strokeWidth="8"
                  fill="none"
                />
                <circle
                  cx="48"
                  cy="48"
                  r="40"
                  stroke="#FF6B35"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 40}`}
                  strokeDashoffset={`${2 * Math.PI * 40 * (1 - score / 100)}`}
                  strokeLinecap="round"
                  className="transition-all duration-1000"
                />
              </svg>
              <div className="absolute">
                <div className="text-3xl font-bold text-gray-900">{score}</div>
                <div className="text-xs text-gray-600">/100</div>
              </div>
            </div>
            <p className="mt-2 text-xs font-semibold text-gray-600">
              {score >= 80 ? 'Excellent' : score >= 60 ? 'Good' : 'Needs Work'}
            </p>
          </div>
        </div>

        <div className="bg-white border-2 border-gray-200 rounded-xl p-4">
          <div className="text-center">
            <AlertIcon className="w-6 h-6 text-tiger-orange mx-auto mb-2" />
            <div className="text-3xl font-bold text-gray-900">{schemaRecommendations.length}</div>
            <div className="text-xs text-gray-600">Schema Tips</div>
          </div>
        </div>

        <div className="bg-white border-2 border-gray-200 rounded-xl p-4">
          <div className="text-center">
            <CheckIcon className="w-6 h-6 text-tiger-orange mx-auto mb-2" />
            <div className="text-3xl font-bold text-gray-900">{indexSuggestions.length}</div>
            <div className="text-xs text-gray-600">Index Ideas</div>
          </div>
        </div>

        <div className="bg-white border-2 border-gray-200 rounded-xl p-4">
          <div className="text-center">
            <DatabaseIcon className="w-6 h-6 text-tiger-orange mx-auto mb-2" />
            <div className="text-3xl font-bold text-gray-900">{slowQueries.length}</div>
            <div className="text-xs text-gray-600">Slow Queries</div>
          </div>
        </div>
      </div>

      {/* Schema Recommendations */}
      {schemaRecommendations.length > 0 && (
        <div className="mb-6">
          <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <AlertIcon className="w-5 h-5 text-tiger-orange" />
            Schema Recommendations
          </h4>
          <div className="space-y-3">
            {schemaRecommendations.map((rec: any, index: number) => (
              <div key={index} className="bg-white border-2 border-gray-200 rounded-xl p-4 hover:border-tiger-orange transition-all">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h5 className="font-bold text-gray-900">{rec.table}</h5>
                      <span className={`text-xs px-2 py-1 rounded-lg font-semibold ${
                        rec.impact === 'high' ? 'bg-tiger-orange/10 text-tiger-orange' :
                        rec.impact === 'medium' ? 'bg-gray-200 text-gray-700' :
                        'bg-gray-100 text-gray-600'
                      }`}>
                        {rec.impact} impact
                      </span>
                    </div>
                  </div>
                  <span className="text-xs text-gray-600 ml-4">{rec.estimatedImprovement}</span>
                </div>
                <p className="text-sm text-gray-900 font-semibold mb-1">
                  {rec.recommendation}
                </p>
                <p className="text-sm text-gray-600">{rec.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Index Suggestions */}
      {indexSuggestions.length > 0 && (
        <div>
          <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <CheckIcon className="w-5 h-5 text-tiger-orange" />
            Index Suggestions
          </h4>
          <div className="space-y-3">
            {indexSuggestions.map((sug: any, index: number) => (
              <div key={index} className="bg-white border-2 border-gray-200 rounded-xl p-4 hover:border-tiger-orange transition-all">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h5 className="font-bold text-gray-900">{sug.table}.{sug.column}</h5>
                      <span className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-lg font-semibold">
                        {sug.type}
                      </span>
                    </div>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-lg font-semibold ${
                    sug.impact === 'high' ? 'bg-tiger-orange/10 text-tiger-orange' :
                    sug.impact === 'medium' ? 'bg-gray-200 text-gray-700' :
                    'bg-gray-100 text-gray-600'
                  }`}>
                    {sug.impact} impact
                  </span>
                </div>
                <p className="text-sm text-gray-600">
                  {sug.reason}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
