'use client';

import { useState, useEffect } from 'react';
import { SecurityIcon, ComplianceIcon, PerformanceIcon, CheckIcon, SearchIcon, TigerIcon } from '../icons/CustomIcons';

interface PhaseData {
  phase: number;
  stage: number;
  message: string;
  data?: any;
}

interface TwoPhaseAnalysisDashboardProps {
  isRunning?: boolean;
  onProgress?: PhaseData;
  results?: any;
}

export function TwoPhaseAnalysisDashboard({ isRunning = false, onProgress, results }: TwoPhaseAnalysisDashboardProps) {
  const [phase1Complete, setPhase1Complete] = useState(false);
  const [phase2Complete, setPhase2Complete] = useState(false);
  const [ragWinner, setRagWinner] = useState<{name: string, accuracy: number} | null>(null);
  const [domainProgress, setDomainProgress] = useState({
    security: 0,
    soc2: 0,
    iso: 0,
    performance: 0
  });

  useEffect(() => {
    if (onProgress) {
      const { phase, stage, message, data } = onProgress;

      if (phase === 1) {
        // Phase 1: RAG Testing
        if (stage === 3 && data) {
          // Winner announced
          setRagWinner({
            name: data.winner,
            accuracy: data.accuracy
          });
          setTimeout(() => setPhase1Complete(true), 500);
        }
      } else if (phase === 2) {
        // Phase 2: Domain Analysis
        if (stage >= 3) {
          // Individual domain completions
          if (message.includes('Security')) {
            setDomainProgress(prev => ({ ...prev, security: 100 }));
          }
          if (message.includes('SOC2')) {
            setDomainProgress(prev => ({ ...prev, soc2: 100 }));
          }
          if (message.includes('ISO')) {
            setDomainProgress(prev => ({ ...prev, iso: 100 }));
          }
          if (message.includes('Performance')) {
            setDomainProgress(prev => ({ ...prev, performance: 100 }));
          }
        }
        
        // Check if all domains complete
        if (Object.values(domainProgress).every(v => v === 100)) {
          setTimeout(() => setPhase2Complete(true), 500);
        }
      }
    }
  }, [onProgress, domainProgress]);

  // Simulate progress animation
  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setDomainProgress(prev => ({
        security: Math.min(100, prev.security + Math.random() * 10),
        soc2: Math.min(100, prev.soc2 + Math.random() * 10),
        iso: Math.min(100, prev.iso + Math.random() * 10),
        performance: Math.min(100, prev.performance + Math.random() * 10)
      }));
    }, 300);

    return () => clearInterval(interval);
  }, [isRunning]);

  // Set from results
  useEffect(() => {
    if (results) {
      setPhase1Complete(true);
      setPhase2Complete(true);
      if (results.rag?.winner) {
        const winnerStrategy = results.rag.strategies?.find((s: any) => s.name === results.rag.winner || s.winner);
        setRagWinner({
          name: results.rag.winner,
          accuracy: winnerStrategy?.accuracy || 0
        });
      }
      setDomainProgress({
        security: 100,
        soc2: 100,
        iso: 100,
        performance: 100
      });
    }
  }, [results]);

  return (
    <div className="space-y-8">
      {/* Phase 1: RAG Testing */}
      <div className={`border-2 rounded-xl p-6 transition-all duration-500 bg-white ${
        phase1Complete ? 'border-[#FF6B35]' : 'border-gray-200'
      }`}>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
              phase1Complete ? 'bg-[#FF6B35]' : 'bg-gray-200'
            }`}>
              <span className="text-white font-bold text-lg">1</span>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-lg">Phase 1: RAG Strategy Testing</h3>
              <p className="text-sm text-gray-600">Testing 4 search methods in parallel</p>
            </div>
          </div>
          {phase1Complete && (
            <CheckIcon className="w-6 h-6 text-[#FF6B35]" />
          )}
        </div>

        <div className="grid grid-cols-4 gap-4 mb-6">
          {['Vector', 'BM25', 'Hybrid', 'Rerank'].map((strategy) => (
            <div
              key={strategy}
              className={`p-4 rounded-lg border-2 text-center transition-all bg-white ${
                ragWinner?.name === strategy
                  ? 'border-[#FF6B35]'
                  : 'border-gray-200'
              }`}
            >
              <div className="text-sm font-semibold text-gray-900 mb-2">{strategy}</div>
              {ragWinner?.name === strategy && (
                <div className="text-2xl font-bold text-[#FF6B35]">{ragWinner.accuracy}%</div>
              )}
            </div>
          ))}
        </div>

        {ragWinner && (
          <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg border-2 border-green-200">
            <CheckIcon className="w-5 h-5 text-green-600 flex-shrink-0" />
            <p className="text-sm text-gray-900">
              <span className="font-bold text-[#FF6B35]">{ragWinner.name}</span> selected with{' '}
              <span className="font-bold">{ragWinner.accuracy}% accuracy</span>
            </p>
          </div>
        )}
      </div>

      {/* Arrow */}
      {phase1Complete && (
        <div className="flex justify-center">
          <div className="text-[#FF6B35] font-bold text-3xl">↓</div>
        </div>
      )}

      {/* Phase 2: Domain Analysis */}
      <div className={`border-2 rounded-xl p-6 transition-all duration-500 bg-white ${
        phase1Complete ? 'border-[#FF6B35]' : 'border-gray-200 opacity-50'
      }`}>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
              phase2Complete ? 'bg-[#FF6B35]' : phase1Complete ? 'bg-[#4285f4]' : 'bg-gray-200'
            }`}>
              <span className="text-white font-bold text-lg">2</span>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-lg">
                Phase 2: Domain Analysis{' '}
                {ragWinner && <span className="text-[#FF6B35]">using {ragWinner.name}</span>}
              </h3>
              <p className="text-sm text-gray-600">Security, SOC2, ISO, Performance in parallel</p>
            </div>
          </div>
          {phase2Complete && (
            <CheckIcon className="w-6 h-6 text-[#FF6B35]" />
          )}
        </div>

        <div className="grid grid-cols-2 gap-6">
          {/* Security Domain */}
          <div className="border-2 border-gray-200 rounded-lg p-4 bg-white hover:border-[#FF6B35] transition-colors">
            <div className="flex items-center gap-3 mb-4">
              <SecurityIcon className="w-6 h-6 text-[#FF6B35]" />
              <div>
                <h4 className="font-bold text-gray-900 text-sm">Security</h4>
                <p className="text-xs text-gray-600">Vulnerability scan</p>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
              <div
                className="h-2 rounded-full bg-[#FF6B35] transition-all duration-300"
                style={{ width: `${domainProgress.security}%` }}
              />
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">{Math.round(domainProgress.security)}%</span>
              {domainProgress.security === 100 && results && (
                <span className="text-sm font-bold text-[#FF6B35]">
                  {results.security?.total || 0} issues
                </span>
              )}
            </div>
          </div>

          {/* SOC2 Domain */}
          <div className="border-2 border-gray-200 rounded-lg p-4 bg-white hover:border-[#FF6B35] transition-colors">
            <div className="flex items-center gap-3 mb-4">
              <ComplianceIcon className="w-6 h-6 text-[#FF6B35]" />
              <div>
                <h4 className="font-bold text-gray-900 text-sm">SOC2</h4>
                <p className="text-xs text-gray-600">Compliance check</p>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
              <div
                className="h-2 rounded-full bg-[#FF6B35] transition-all duration-300"
                style={{ width: `${domainProgress.soc2}%` }}
              />
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">{Math.round(domainProgress.soc2)}%</span>
              {domainProgress.soc2 === 100 && results && (
                <span className="text-sm font-bold text-[#FF6B35]">
                  {results.soc2?.readiness || 0}% ready
                </span>
              )}
            </div>
          </div>

          {/* ISO Domain */}
          <div className="border-2 border-gray-200 rounded-lg p-4 bg-white hover:border-[#FF6B35] transition-colors">
            <div className="flex items-center gap-3 mb-4">
              <ComplianceIcon className="w-6 h-6 text-[#FF6B35]" />
              <div>
                <h4 className="font-bold text-gray-900 text-sm">ISO 27001</h4>
                <p className="text-xs text-gray-600">Certification</p>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
              <div
                className="h-2 rounded-full bg-[#FF6B35] transition-all duration-300"
                style={{ width: `${domainProgress.iso}%` }}
              />
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">{Math.round(domainProgress.iso)}%</span>
              {domainProgress.iso === 100 && results && (
                <span className="text-sm font-bold text-[#FF6B35]">
                  {results.iso27001?.readiness || 0}% ready
                </span>
              )}
            </div>
          </div>

          {/* Performance Domain */}
          <div className="border-2 border-gray-200 rounded-lg p-4 bg-white hover:border-[#FF6B35] transition-colors">
            <div className="flex items-center gap-3 mb-4">
              <PerformanceIcon className="w-6 h-6 text-[#FF6B35]" />
              <div>
                <h4 className="font-bold text-gray-900 text-sm">Performance</h4>
                <p className="text-xs text-gray-600">DB optimization</p>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
              <div
                className="h-2 rounded-full bg-[#FF6B35] transition-all duration-300"
                style={{ width: `${domainProgress.performance}%` }}
              />
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">{Math.round(domainProgress.performance)}%</span>
              {domainProgress.performance === 100 && results && (
                <span className="text-sm font-bold text-[#FF6B35]">
                  {results.mcpInsights?.performance?.overallScore || 0}/100
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Completion Message */}
      {phase2Complete && (
        <div className="p-6 bg-green-50 border-2 border-green-200 rounded-xl">
          <div className="flex items-center gap-4">
            <TigerIcon className="w-10 h-10 text-[#FF6B35] flex-shrink-0" />
            <div>
              <h4 className="font-bold text-gray-900 text-lg mb-2">Cascading Analysis Complete!</h4>
              <p className="text-sm text-gray-600 mb-1">
                Phase 1: Tested 4 RAG strategies → Selected <span className="font-bold text-[#FF6B35]">{ragWinner?.name}</span>
              </p>
              <p className="text-sm text-gray-600">
                Phase 2: Used {ragWinner?.name} for all 4 domain analyses in parallel
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
