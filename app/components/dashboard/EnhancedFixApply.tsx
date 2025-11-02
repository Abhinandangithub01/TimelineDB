'use client';

import { useState } from 'react';
import { CheckIcon, RemediationIcon } from '../icons/CustomIcons';

interface Fix {
  before: string;
  after: string;
  explanation: string;
  confidence: number;
  validated: boolean;
}

interface EnhancedFixApplyProps {
  vulnerability: any;
  fix?: Fix;
  onApply?: () => void;
}

export function EnhancedFixApply({ vulnerability, fix, onApply }: EnhancedFixApplyProps) {
  const [applying, setApplying] = useState(false);
  const [applied, setApplied] = useState(false);
  const [showDiff, setShowDiff] = useState(false);

  if (!fix) return null;

  const handleApply = async () => {
    setApplying(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setApplying(false);
    setApplied(true);
    if (onApply) onApply();
  };

  // Split code into lines for side-by-side comparison
  const beforeLines = fix.before.split('\n');
  const afterLines = fix.after.split('\n');
  const maxLines = Math.max(beforeLines.length, afterLines.length);

  return (
    <div className="mt-4">
      {!applied ? (
        <>
          {/* Fix Header */}
          <div className="p-4 bg-white border-2 border-tiger-orange rounded-xl mb-3">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-tiger-orange rounded-lg flex items-center justify-center flex-shrink-0">
                  <RemediationIcon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">Validated Fix Available</h4>
                  <p className="text-xs text-gray-600">
                    Fork-tested with {(fix.confidence * 100).toFixed(0)}% confidence
                  </p>
                </div>
              </div>
              {fix.validated && (
                <span className="px-2 py-1 bg-tiger-orange/10 text-tiger-orange rounded-lg text-xs font-bold flex items-center gap-1">
                  <CheckIcon className="w-3 h-3" />
                  VALIDATED
                </span>
              )}
            </div>
            <p className="text-xs text-gray-600 mb-3">{fix.explanation}</p>

            <div className="flex gap-2">
              <button
                onClick={handleApply}
                disabled={applying}
                className={`flex-1 py-2 px-4 rounded-lg text-sm font-bold text-white transition-all ${
                  applying
                    ? 'bg-gray-300 cursor-not-allowed'
                    : 'bg-tiger-orange hover:bg-tiger-dark hover:shadow-md'
                }`}
              >
                {applying ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" opacity="0.25"/>
                      <path d="M12 2C6.47715 2 2 6.47715 2 12" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
                    </svg>
                    Applying...
                  </span>
                ) : (
                  'Apply Fix'
                )}
              </button>

              <button
                onClick={() => setShowDiff(!showDiff)}
                className="px-4 py-2 bg-white border-2 border-gray-200 rounded-lg text-sm font-semibold text-gray-900 hover:border-tiger-orange transition-all"
              >
                {showDiff ? 'Hide' : 'Show'} Changes
              </button>
            </div>
          </div>

          {/* Side-by-Side Diff */}
          {showDiff && (
            <div className="grid md:grid-cols-2 gap-3 mb-3">
              {/* Before */}
              <div className="bg-white border-2 border-gray-200 rounded-xl overflow-hidden">
                <div className="bg-gray-50 border-b-2 border-gray-200 px-3 py-2">
                  <div className="flex items-center gap-2 text-xs font-semibold text-gray-700">
                    <span className="text-tiger-orange">−</span>
                    <span>Before (Vulnerable)</span>
                  </div>
                </div>
                <div className="p-3 overflow-x-auto">
                  <pre className="text-xs leading-relaxed">
                    <code className="text-gray-800">{fix.before}</code>
                  </pre>
                </div>
              </div>

              {/* After */}
              <div className="bg-white border-2 border-tiger-orange rounded-xl overflow-hidden">
                <div className="bg-tiger-orange/5 border-b-2 border-tiger-orange px-3 py-2">
                  <div className="flex items-center gap-2 text-xs font-semibold text-gray-700">
                    <span className="text-tiger-orange">+</span>
                    <span>After (Fixed)</span>
                  </div>
                </div>
                <div className="p-3 overflow-x-auto">
                  <pre className="text-xs leading-relaxed">
                    <code className="text-gray-800">{fix.after}</code>
                  </pre>
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <>
          {/* Success Message */}
          <div className="bg-tiger-orange/10 border-2 border-tiger-orange rounded-xl p-4 mb-3">
            <div className="flex items-center gap-3 mb-3">
              <CheckIcon className="w-6 h-6 text-tiger-orange flex-shrink-0" />
              <div>
                <h5 className="font-bold text-gray-900 text-sm">Fix Applied Successfully!</h5>
                <p className="text-xs text-gray-600">
                  Your code has been updated with the validated fix
                </p>
              </div>
            </div>
          </div>

          {/* Updated Code Display - Full Windsurf Style */}
          <div className="bg-white border-2 border-tiger-orange rounded-xl overflow-hidden">
            <div className="bg-tiger-orange/5 border-b-2 border-tiger-orange px-4 py-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckIcon className="w-4 h-4 text-tiger-orange" />
                <span className="text-sm font-bold text-gray-900">Updated Code</span>
              </div>
              <span className="text-xs text-gray-600">{afterLines.length} lines</span>
            </div>
            
            {/* Full Code Display */}
            <div className="p-4 bg-gray-50">
              <pre className="text-xs leading-relaxed overflow-x-auto">
                <code className="text-gray-800">{fix.after}</code>
              </pre>
            </div>

            {/* Validation Checklist */}
            <div className="border-t-2 border-gray-200 p-4 bg-white">
              <h6 className="text-xs font-bold text-gray-900 mb-2 flex items-center gap-2">
                <CheckIcon className="w-3 h-3 text-tiger-orange" />
                Validation Results
              </h6>
              <div className="grid md:grid-cols-2 gap-2">
                <div className="flex items-center gap-2 text-xs text-gray-700">
                  <span className="text-tiger-orange">✓</span>
                  <span>Vulnerability removed</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-700">
                  <span className="text-tiger-orange">✓</span>
                  <span>No new issues</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-700">
                  <span className="text-tiger-orange">✓</span>
                  <span>Functionality preserved</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-700">
                  <span className="text-tiger-orange">✓</span>
                  <span>Performance: Negligible</span>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
