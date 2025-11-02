'use client';

import { useEffect, useState } from 'react';

/**
 * Success Animations
 * Celebrate when analysis completes successfully
 */

interface SuccessAnimationProps {
  title?: string;
  message?: string;
  onComplete?: () => void;
  autoHide?: boolean;
  duration?: number;
}

export function SuccessAnimation({
  title = "Analysis Complete!",
  message = "Your codebase has been successfully analyzed.",
  onComplete,
  autoHide = false,
  duration = 3000
}: SuccessAnimationProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (autoHide) {
      const timer = setTimeout(() => {
        setVisible(false);
        onComplete?.();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [autoHide, duration, onComplete]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl p-8 max-w-md mx-4 text-center animate-scale-up">
        {/* Animated Checkmark */}
        <div className="mb-6 flex justify-center">
          <div className="relative">
            {/* Outer circle animation */}
            <div className="w-24 h-24 rounded-full bg-green-100 animate-pulse-slow"></div>
            
            {/* Checkmark */}
            <div className="absolute inset-0 flex items-center justify-center">
              <svg 
                className="w-16 h-16 text-green-600 animate-draw-check" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={3} 
                  d="M5 13l4 4L19 7"
                  className="animate-draw-path"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          {title}
        </h3>

        {/* Message */}
        <p className="text-gray-600 mb-6">
          {message}
        </p>

        {/* Confetti effect */}
        <Confetti />

        {/* Close button if not auto-hiding */}
        {!autoHide && onComplete && (
          <button
            onClick={onComplete}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            View Results
          </button>
        )}
      </div>
    </div>
  );
}

// Compact success toast
export function SuccessToast({ 
  message, 
  onDismiss 
}: { 
  message: string; 
  onDismiss?: () => void 
}) {
  useEffect(() => {
    if (onDismiss) {
      const timer = setTimeout(onDismiss, 3000);
      return () => clearTimeout(timer);
    }
  }, [onDismiss]);

  return (
    <div className="fixed bottom-4 right-4 max-w-md bg-green-600 text-white rounded-lg shadow-lg p-4 flex items-center gap-3 animate-slide-up z-50">
      <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <p className="flex-1 font-medium">{message}</p>
      {onDismiss && (
        <button 
          onClick={onDismiss}
          className="text-white hover:text-green-200 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
}

// Progress completion animation
export function ProgressComplete({ score }: { score: number }) {
  return (
    <div className="flex flex-col items-center justify-center py-8">
      {/* Circular progress */}
      <div className="relative w-32 h-32 mb-4">
        <svg className="w-32 h-32 transform -rotate-90">
          <circle
            cx="64"
            cy="64"
            r="56"
            stroke="#e5e7eb"
            strokeWidth="8"
            fill="none"
          />
          <circle
            cx="64"
            cy="64"
            r="56"
            stroke="#10b981"
            strokeWidth="8"
            fill="none"
            strokeDasharray={`${2 * Math.PI * 56}`}
            strokeDashoffset={`${2 * Math.PI * 56 * (1 - score / 100)}`}
            className="animate-draw-circle"
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-3xl font-bold text-gray-900">{score}</span>
        </div>
      </div>

      <p className="text-lg font-semibold text-gray-900">Analysis Complete!</p>
      <p className="text-sm text-gray-600">Security Score</p>
    </div>
  );
}

// Inline success message
export function InlineSuccess({ message }: { message: string }) {
  return (
    <div className="flex items-start gap-2 p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-800">
      <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <span>{message}</span>
    </div>
  );
}

// Confetti animation component
function Confetti() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 animate-confetti"
          style={{
            left: `${Math.random() * 100}%`,
            top: '-10px',
            backgroundColor: ['#FF6B35', '#4285f4', '#10b981', '#f59e0b'][Math.floor(Math.random() * 4)],
            animationDelay: `${Math.random() * 0.5}s`,
            animationDuration: `${2 + Math.random() * 2}s`
          }}
        />
      ))}
    </div>
  );
}

// Step completion indicator
export function StepComplete({ step, total }: { step: number; total: number }) {
  return (
    <div className="flex items-center gap-2 text-sm text-green-600 font-medium">
      <svg className="w-5 h-5 animate-bounce-once" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
      <span>Step {step} of {total} complete</span>
    </div>
  );
}

// Badge animation for achievements
export function AchievementBadge({ 
  title, 
  description,
  icon 
}: { 
  title: string; 
  description: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl p-6 text-white shadow-lg animate-scale-up">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
          {icon || (
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
          )}
        </div>
        <div>
          <h4 className="text-xl font-bold mb-1">{title}</h4>
          <p className="text-white/90 text-sm">{description}</p>
        </div>
      </div>
    </div>
  );
}

// Loading to success transition
export function LoadingToSuccess({ 
  loading, 
  success, 
  message 
}: { 
  loading: boolean; 
  success: boolean;
  message: string;
}) {
  if (loading) {
    return (
      <div className="flex items-center gap-3 text-gray-600">
        <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <span>{message}</span>
      </div>
    );
  }

  if (success) {
    return (
      <div className="flex items-center gap-3 text-green-600 animate-fade-in">
        <svg className="w-5 h-5 animate-bounce-once" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
        <span className="font-medium">{message}</span>
      </div>
    );
  }

  return null;
}
