'use client';

import { InfoIcon, CheckIcon, AlertIcon } from '../icons/CustomIcons';

interface CodebaseStrategy {
  strategy: 'full' | 'prioritized' | 'parallel' | 'sampling' | 'incremental';
  totalFiles: number;
  totalLines: number;
  analyzingFiles: number;
  analyzingLines: number;
  coverage: number;
  estimatedTime: number;
  reason: string;
  tier: 1 | 2 | 3 | 4;
}

interface CodebaseStrategyCardProps {
  strategy: CodebaseStrategy;
  onContinue?: () => void;
  onCancel?: () => void;
}

export function CodebaseStrategyCard({ strategy, onContinue, onCancel }: CodebaseStrategyCardProps) {
  const getStrategyColor = () => {
    switch (strategy.tier) {
      case 1: return 'bg-green-50 border-green-500';
      case 2: return 'bg-blue-50 border-blue-500';
      case 3: return 'bg-yellow-50 border-yellow-500';
      case 4: return 'bg-orange-50 border-orange-500';
    }
  };

  const getStrategyIcon = () => {
    switch (strategy.tier) {
      case 1: return <CheckIcon className="w-6 h-6 text-green-600" />;
      case 2: return <InfoIcon className="w-6 h-6 text-blue-600" />;
      case 3: return <AlertIcon className="w-6 h-6 text-yellow-600" />;
      case 4: return <AlertIcon className="w-6 h-6 text-orange-600" />;
    }
  };

  const getStrategyTitle = () => {
    switch (strategy.strategy) {
      case 'full': return 'Full Analysis';
      case 'prioritized': return 'Prioritized Analysis';
      case 'parallel': return 'Parallel Analysis';
      case 'sampling': return 'Sampling Analysis';
      case 'incremental': return 'Incremental Analysis';
    }
  };

  const getStrategyDescription = () => {
    switch (strategy.strategy) {
      case 'full':
        return 'Analyzing entire codebase - recommended for small projects.';
      case 'prioritized':
        return 'Analyzing high-risk files first - optimized for medium codebases.';
      case 'parallel':
        return 'Using 4 Tiger forks for parallel processing - optimized for large codebases.';
      case 'sampling':
        return 'Analyzing top files by risk score - recommended for massive codebases.';
      case 'incremental':
        return 'Analyzing only changed files - optimized for CI/CD workflows.';
    }
  };

  const formatNumber = (num: number) => num.toLocaleString();
  
  const formatTime = (seconds: number) => {
    if (seconds < 60) return `${seconds} seconds`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes`;
    return `${Math.floor(seconds / 3600)}h ${Math.floor((seconds % 3600) / 60)}m`;
  };

  return (
    <div className={`border-2 rounded-xl p-6 ${getStrategyColor()}`}>
      {/* Header */}
      <div className="flex items-start gap-3 mb-4">
        {getStrategyIcon()}
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-900 mb-1">
            {getStrategyTitle()}
          </h3>
          <p className="text-sm text-gray-700">
            {getStrategyDescription()}
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <div className="bg-white rounded-lg p-3">
          <div className="text-xs text-gray-600 mb-1">Total Files</div>
          <div className="text-xl font-bold text-gray-900">
            {formatNumber(strategy.totalFiles)}
          </div>
        </div>

        <div className="bg-white rounded-lg p-3">
          <div className="text-xs text-gray-600 mb-1">Total Lines</div>
          <div className="text-xl font-bold text-gray-900">
            {formatNumber(strategy.totalLines)}
          </div>
        </div>

        <div className="bg-white rounded-lg p-3">
          <div className="text-xs text-gray-600 mb-1">Analyzing</div>
          <div className="text-xl font-bold text-tiger-orange">
            {formatNumber(strategy.analyzingFiles)} files
          </div>
          <div className="text-xs text-gray-600">
            {formatNumber(strategy.analyzingLines)} lines
          </div>
        </div>

        <div className="bg-white rounded-lg p-3">
          <div className="text-xs text-gray-600 mb-1">Coverage</div>
          <div className="text-xl font-bold text-tiger-orange">
            ~{strategy.coverage}%
          </div>
          <div className="text-xs text-gray-600">
            Est. {formatTime(strategy.estimatedTime)}
          </div>
        </div>
      </div>

      {/* Strategy Details */}
      <div className="bg-white rounded-lg p-4 mb-4">
        <h4 className="font-bold text-gray-900 mb-2 text-sm">Why this strategy?</h4>
        <p className="text-sm text-gray-700 mb-3">{strategy.reason}</p>

        {strategy.tier >= 2 && (
          <div className="border-t border-gray-200 pt-3 mt-3">
            <h5 className="font-bold text-gray-900 mb-2 text-xs">What we'll analyze:</h5>
            <ul className="space-y-1 text-xs text-gray-700">
              <li className="flex items-center gap-2">
                <CheckIcon className="w-3 h-3 text-green-600 flex-shrink-0" />
                <span>Authentication & authorization code (critical)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckIcon className="w-3 h-3 text-green-600 flex-shrink-0" />
                <span>Payment processing & sensitive data (critical)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckIcon className="w-3 h-3 text-green-600 flex-shrink-0" />
                <span>API endpoints & database operations (high)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckIcon className="w-3 h-3 text-green-600 flex-shrink-0" />
                <span>File upload & user data handling (high)</span>
              </li>
            </ul>
            
            <h5 className="font-bold text-gray-900 mb-2 text-xs mt-3">What we'll skip:</h5>
            <ul className="space-y-1 text-xs text-gray-600">
              <li className="flex items-center gap-2">
                <span className="w-3 h-3 flex-shrink-0">•</span>
                <span>Test files & mock data (lower risk)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-3 h-3 flex-shrink-0">•</span>
                <span>Third-party libraries (node_modules, vendor)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-3 h-3 flex-shrink-0">•</span>
                <span>Generated & minified files (build output)</span>
              </li>
            </ul>
          </div>
        )}

        {strategy.tier === 4 && (
          <div className="mt-3 p-3 bg-orange-100 border border-orange-300 rounded-lg">
            <p className="text-xs text-orange-900 font-semibold mb-1">
              💡 Tip for Massive Codebases:
            </p>
            <p className="text-xs text-orange-800">
              For better coverage, consider using <strong>incremental analysis</strong> in your CI/CD pipeline
              to analyze only changed files on each commit.
            </p>
          </div>
        )}
      </div>

      {/* Tiger Advantage */}
      {(strategy.strategy === 'parallel' || strategy.tier >= 3) && (
        <div className="bg-tiger-orange/10 border border-tiger-orange rounded-lg p-3 mb-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-tiger-orange text-lg">🐅</span>
            <h5 className="font-bold text-tiger-orange text-sm">Tiger Advantage</h5>
          </div>
          <p className="text-xs text-gray-800">
            Using <strong>4 Tiger zero-copy forks</strong> for parallel processing.
            This strategy would take <strong className="text-tiger-orange">
              {formatTime(strategy.estimatedTime * 4)}
            </strong> without Tiger's fork capabilities!
          </p>
        </div>
      )}

      {/* Action Buttons */}
      {(onContinue || onCancel) && (
        <div className="flex gap-3">
          {onContinue && (
            <button
              onClick={onContinue}
              className="flex-1 btn-primary py-3"
            >
              Continue with {getStrategyTitle()}
            </button>
          )}
          {onCancel && (
            <button
              onClick={onCancel}
              className="px-6 btn-secondary py-3"
            >
              Cancel
            </button>
          )}
        </div>
      )}
    </div>
  );
}

// Alert icon if not already defined
const AlertIconFallback = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12 2L2 22h20L12 2z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M12 9v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <circle cx="12" cy="17" r="1" fill="currentColor" />
  </svg>
);
