'use client';

import { useEffect, useState } from 'react';

/**
 * Progress Indicators
 * Beautiful progress bars and loading states
 */

interface ProgressBarProps {
  progress: number; // 0-100
  label?: string;
  showPercentage?: boolean;
  color?: 'orange' | 'blue' | 'green' | 'red';
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
}

export function ProgressBar({
  progress,
  label,
  showPercentage = true,
  color = 'orange',
  size = 'md',
  animated = true
}: ProgressBarProps) {
  const [displayProgress, setDisplayProgress] = useState(0);

  useEffect(() => {
    if (animated) {
      const timer = setTimeout(() => setDisplayProgress(progress), 100);
      return () => clearTimeout(timer);
    } else {
      setDisplayProgress(progress);
    }
  }, [progress, animated]);

  const colorClasses = {
    orange: 'bg-[#FF6B35]',
    blue: 'bg-[#4285f4]',
    green: 'bg-green-500',
    red: 'bg-red-500'
  };

  const sizeClasses = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3'
  };

  return (
    <div className="w-full">
      {(label || showPercentage) && (
        <div className="flex justify-between items-center mb-2">
          {label && <span className="text-sm font-medium text-gray-700">{label}</span>}
          {showPercentage && <span className="text-sm text-gray-600">{Math.round(displayProgress)}%</span>}
        </div>
      )}
      <div className={`w-full bg-gray-200 rounded-full overflow-hidden ${sizeClasses[size]}`}>
        <div
          className={`${colorClasses[color]} ${sizeClasses[size]} rounded-full transition-all duration-500 ease-out`}
          style={{ width: `${displayProgress}%` }}
        ></div>
      </div>
    </div>
  );
}

// Circular progress indicator
export function CircularProgress({
  progress,
  size = 120,
  strokeWidth = 8,
  label,
  color = 'orange'
}: {
  progress: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
  color?: 'orange' | 'blue' | 'green' | 'red';
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  const colorClasses = {
    orange: '#FF6B35',
    blue: '#4285f4',
    green: '#10b981',
    red: '#ef4444'
  };

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#e5e7eb"
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={colorClasses[color]}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-500 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold text-gray-900">{Math.round(progress)}</span>
        {label && <span className="text-xs text-gray-600 mt-1">{label}</span>}
      </div>
    </div>
  );
}

// Step progress indicator
export function StepProgress({
  steps,
  currentStep
}: {
  steps: string[];
  currentStep: number;
}) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center flex-1">
            {/* Step circle */}
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                  index < currentStep
                    ? 'bg-green-500 text-white'
                    : index === currentStep
                    ? 'bg-[#FF6B35] text-white'
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                {index < currentStep ? (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  index + 1
                )}
              </div>
              <span className="text-xs text-gray-600 mt-2 text-center max-w-[100px]">{step}</span>
            </div>

            {/* Connecting line */}
            {index < steps.length - 1 && (
              <div className="flex-1 h-1 mx-2 bg-gray-200 rounded">
                <div
                  className={`h-full rounded transition-all duration-500 ${
                    index < currentStep ? 'bg-green-500' : 'bg-gray-200'
                  }`}
                  style={{ width: index < currentStep ? '100%' : '0%' }}
                ></div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// Animated loading spinner
export function LoadingSpinner({
  size = 'md',
  color = 'orange',
  label
}: {
  size?: 'sm' | 'md' | 'lg';
  color?: 'orange' | 'blue' | 'white';
  label?: string;
}) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  const colorClasses = {
    orange: 'text-[#FF6B35]',
    blue: 'text-[#4285f4]',
    white: 'text-white'
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <svg
        className={`animate-spin ${sizeClasses[size]} ${colorClasses[color]}`}
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
      {label && <span className="text-sm text-gray-600">{label}</span>}
    </div>
  );
}

// Pulsing dots loader
export function PulsingDots({ color = 'orange' }: { color?: 'orange' | 'blue' }) {
  const colorClasses = {
    orange: 'bg-[#FF6B35]',
    blue: 'bg-[#4285f4]'
  };

  return (
    <div className="flex items-center gap-2">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={`w-3 h-3 rounded-full ${colorClasses[color]} animate-pulse`}
          style={{ animationDelay: `${i * 0.15}s` }}
        ></div>
      ))}
    </div>
  );
}

// Linear indeterminate progress
export function IndeterminateProgress({ color = 'orange' }: { color?: 'orange' | 'blue' }) {
  const colorClasses = {
    orange: 'bg-[#FF6B35]',
    blue: 'bg-[#4285f4]'
  };

  return (
    <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
      <div className={`h-full ${colorClasses[color]} animate-indeterminate rounded-full`}></div>
    </div>
  );
}

// Multi-step progress with descriptions
export function DetailedStepProgress({
  steps,
  currentStep,
  completedSteps
}: {
  steps: Array<{ title: string; description: string }>;
  currentStep: number;
  completedSteps: number[];
}) {
  return (
    <div className="space-y-4">
      {steps.map((step, index) => {
        const isCompleted = completedSteps.includes(index);
        const isCurrent = index === currentStep;
        const isPending = index > currentStep;

        return (
          <div key={index} className="flex gap-4">
            {/* Status indicator */}
            <div className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  isCompleted
                    ? 'bg-green-500'
                    : isCurrent
                    ? 'bg-[#FF6B35]'
                    : 'bg-gray-200'
                }`}
              >
                {isCompleted ? (
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : isCurrent ? (
                  <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                ) : (
                  <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                )}
              </div>
              {index < steps.length - 1 && (
                <div className={`w-0.5 h-12 ${isCompleted ? 'bg-green-500' : 'bg-gray-200'}`}></div>
              )}
            </div>

            {/* Step content */}
            <div className="flex-1 pb-8">
              <h4 className={`font-semibold ${isCurrent ? 'text-[#FF6B35]' : isCompleted ? 'text-green-600' : 'text-gray-500'}`}>
                {step.title}
              </h4>
              <p className="text-sm text-gray-600 mt-1">{step.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
