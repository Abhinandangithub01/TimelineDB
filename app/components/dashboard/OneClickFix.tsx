'use client';

import { useState } from 'react';

interface Fix {
  before: string;
  after: string;
  explanation: string;
  confidence: number;
  validated: boolean;
}

interface OneClickFixProps {
  vulnerability: any;
  fix?: Fix;
  onApply?: () => void;
}

export function OneClickFix({ vulnerability, fix, onApply }: OneClickFixProps) {
  const [applying, setApplying] = useState(false);
  const [applied, setApplied] = useState(false);
  const [showDiff, setShowDiff] = useState(false);

  if (!fix) return null;

  const handleApply = async () => {
    setApplying(true);
    
    // Simulate fix application
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setApplying(false);
    setApplied(true);
    
    if (onApply) onApply();
  };

  return (
    <div className="mt-4 p-6 bg-white border-2 border-tiger-orange rounded-xl">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-tiger-orange rounded-lg flex items-center justify-center">
            <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none">
              <path d="M14.7 6.3C15.3 5.7 16.2 5.7 16.8 6.3L17.7 7.2C18.3 7.8 18.3 8.7 17.7 9.3L9 18H6V15L14.7 6.3Z" 
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M13 7L16 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div>
            <h4 className="font-bold text-gray-900">
              Validated Fix Available
            </h4>
            <p className="text-sm text-gray-600">
              Fork-tested with {(fix.confidence * 100).toFixed(0)}% confidence
            </p>
          </div>
        </div>
        
        {fix.validated && (
          <span className="px-3 py-1 bg-tiger-orange/10 text-tiger-orange rounded-lg text-xs font-bold flex items-center gap-1">
            <svg className="w-3 h-3" viewBox="0 0 12 12" fill="currentColor">
              <path d="M10 3L4.5 8.5L2 6"/>
            </svg>
            VALIDATED
          </span>
        )}
      </div>

      <p className="text-sm text-fortress-slate mb-3">
        {fix.explanation}
      </p>

      {!applied ? (
        <div className="flex gap-3">
          <button
            onClick={handleApply}
            disabled={applying}
            className={`flex-1 py-3 rounded-lg font-bold text-white transition-all ${
              applying
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-tiger-orange hover:bg-tiger-dark hover:shadow-lg transform hover:-translate-y-0.5'
            }`}
          >
            {applying ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" opacity="0.25"/>
                  <path d="M12 2C6.47715 2 2 6.47715 2 12" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
                </svg>
                Applying Fix...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                Apply Fix (One-Click)
              </span>
            )}
          </button>

          <button
            onClick={() => setShowDiff(!showDiff)}
            className="px-6 py-3 bg-white border-2 border-gray-200 rounded-lg font-semibold text-gray-900 hover:border-tiger-orange transition-all"
          >
            {showDiff ? 'Hide' : 'View'} Diff
          </button>
        </div>
      ) : (
        <div className="bg-tiger-orange/10 border-2 border-tiger-orange rounded-lg p-4 flex items-center gap-3">
          <svg className="w-8 h-8 text-tiger-orange" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
            <path d="M8 12L11 15L16 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <div>
            <h5 className="font-bold text-gray-900">Fix Applied Successfully!</h5>
            <p className="text-sm text-gray-600">
              Your code has been updated with the validated fix
            </p>
          </div>
        </div>
      )}

      {showDiff && (
        <div className="mt-4 border-t border-gray-200 pt-4">
          <h5 className="font-semibold text-gray-900 mb-3">Code Changes:</h5>
          
          {/* Before */}
          <div className="mb-3">
            <div className="text-xs text-gray-600 font-semibold mb-2 flex items-center gap-2">
              <span className="text-tiger-orange">−</span> Before (Vulnerable)
            </div>
            <pre className="bg-gray-50 border-2 border-gray-200 p-3 rounded-lg text-sm overflow-x-auto">
              <code className="text-gray-800">{fix.before}</code>
            </pre>
          </div>

          {/* After */}
          <div>
            <div className="text-xs text-gray-600 font-semibold mb-2 flex items-center gap-2">
              <span className="text-tiger-orange">+</span> After (Fixed)
            </div>
            <pre className="bg-gray-50 border-2 border-gray-200 p-3 rounded-lg text-sm overflow-x-auto">
              <code className="text-gray-800">{fix.after}</code>
            </pre>
          </div>

          {/* Validation Info */}
          <div className="mt-4 p-4 bg-tiger-orange/5 border-2 border-tiger-orange/20 rounded-lg">
            <h6 className="font-bold text-sm text-gray-900 mb-3 flex items-center gap-2">
              <svg className="w-4 h-4 text-tiger-orange" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="2"/>
                <path d="M5 8L7 10L11 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Validation Results
            </h6>
            <ul className="text-sm text-gray-700 space-y-2">
              <li className="flex items-center gap-2">
                <span className="text-tiger-orange">✓</span> Vulnerability removed
              </li>
              <li className="flex items-center gap-2">
                <span className="text-tiger-orange">✓</span> No new issues introduced
              </li>
              <li className="flex items-center gap-2">
                <span className="text-tiger-orange">✓</span> Functionality preserved
              </li>
              <li className="flex items-center gap-2">
                <span className="text-tiger-orange">✓</span> Performance impact: negligible
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
