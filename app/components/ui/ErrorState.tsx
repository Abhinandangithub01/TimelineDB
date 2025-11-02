'use client';

import { useState } from 'react';

/**
 * Error State Components
 * Helpful error messages with recovery actions
 */

interface ErrorStateProps {
  title: string;
  message: string;
  errorCode?: string;
  onRetry?: () => void;
  onGoBack?: () => void;
  showDetails?: boolean;
  technicalDetails?: string;
}

export function ErrorState({
  title,
  message,
  errorCode,
  onRetry,
  onGoBack,
  showDetails = false,
  technicalDetails
}: ErrorStateProps) {
  const [detailsVisible, setDetailsVisible] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
      {/* Error Icon */}
      <div className="mb-6">
        <div className="w-24 h-24 rounded-full bg-red-100 flex items-center justify-center">
          <svg className="w-12 h-12 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
      </div>

      {/* Error Code */}
      {errorCode && (
        <div className="text-sm font-mono text-gray-500 mb-2">
          Error Code: {errorCode}
        </div>
      )}

      {/* Title */}
      <h3 className="text-2xl font-bold text-gray-900 mb-2">
        {title}
      </h3>

      {/* Message */}
      <p className="text-gray-600 max-w-md mb-6">
        {message}
      </p>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        {onRetry && (
          <button
            onClick={onRetry}
            className="bg-[#FF6B35] hover:bg-[#ff5722] text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Try Again
          </button>
        )}
        {onGoBack && (
          <button
            onClick={onGoBack}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Go Back
          </button>
        )}
      </div>

      {/* Technical Details Toggle */}
      {showDetails && technicalDetails && (
        <div className="w-full max-w-2xl">
          <button
            onClick={() => setDetailsVisible(!detailsVisible)}
            className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1 mx-auto"
          >
            {detailsVisible ? 'Hide' : 'Show'} technical details
            <svg 
              className={`w-4 h-4 transition-transform ${detailsVisible ? 'rotate-180' : ''}`} 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {detailsVisible && (
            <div className="mt-4 bg-gray-100 border border-gray-300 rounded-lg p-4 text-left">
              <pre className="text-xs text-gray-700 overflow-x-auto whitespace-pre-wrap font-mono">
                {technicalDetails}
              </pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// Specific error states

export function NetworkError({ onRetry }: { onRetry?: () => void }) {
  return (
    <ErrorState
      title="Connection Lost"
      message="We couldn't connect to the server. Please check your internet connection and try again."
      errorCode="NETWORK_ERROR"
      onRetry={onRetry}
    />
  );
}

export function AnalysisError({ onRetry, technicalDetails }: { onRetry?: () => void; technicalDetails?: string }) {
  return (
    <ErrorState
      title="Analysis Failed"
      message="Something went wrong while analyzing your codebase. Our team has been notified. Please try again."
      errorCode="ANALYSIS_ERROR"
      onRetry={onRetry}
      showDetails={!!technicalDetails}
      technicalDetails={technicalDetails}
    />
  );
}

export function UploadError({ onRetry }: { onRetry?: () => void }) {
  return (
    <ErrorState
      title="Upload Failed"
      message="We couldn't upload your files. Please ensure your files are under 100MB and try again."
      errorCode="UPLOAD_ERROR"
      onRetry={onRetry}
    />
  );
}

export function AuthError({ onGoBack }: { onGoBack?: () => void }) {
  return (
    <ErrorState
      title="Authentication Required"
      message="You need to be signed in to access this page. Please log in and try again."
      errorCode="AUTH_ERROR"
      onGoBack={onGoBack}
    />
  );
}

export function NotFoundError({ onGoBack }: { onGoBack?: () => void }) {
  return (
    <ErrorState
      title="Page Not Found"
      message="The page you're looking for doesn't exist. It may have been moved or deleted."
      errorCode="404"
      onGoBack={onGoBack}
    />
  );
}

export function RateLimitError({ onRetry }: { onRetry?: () => void }) {
  return (
    <ErrorState
      title="Too Many Requests"
      message="You've made too many requests. Please wait a few minutes and try again."
      errorCode="RATE_LIMIT"
      onRetry={onRetry}
    />
  );
}

export function FileSizeError({ onRetry }: { onRetry?: () => void }) {
  return (
    <ErrorState
      title="File Too Large"
      message="Your codebase exceeds the maximum file size of 100MB. Try uploading a smaller subset or contact support for enterprise options."
      errorCode="FILE_SIZE_ERROR"
      onRetry={onRetry}
    />
  );
}

export function TigerConnectionError({ onRetry, technicalDetails }: { onRetry?: () => void; technicalDetails?: string }) {
  return (
    <ErrorState
      title="Database Connection Failed"
      message="We couldn't connect to Tiger Postgres. This is usually temporary. Please try again in a moment."
      errorCode="TIGER_CONNECTION_ERROR"
      onRetry={onRetry}
      showDetails={!!technicalDetails}
      technicalDetails={technicalDetails}
    />
  );
}

// Inline error component for forms
export function InlineError({ message }: { message: string }) {
  return (
    <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-800">
      <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <span>{message}</span>
    </div>
  );
}

// Toast-style error notification
export function ErrorToast({ 
  message, 
  onDismiss 
}: { 
  message: string; 
  onDismiss: () => void 
}) {
  return (
    <div className="fixed bottom-4 right-4 max-w-md bg-red-600 text-white rounded-lg shadow-lg p-4 flex items-start gap-3 animate-slide-up z-50">
      <svg className="w-6 h-6 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <div className="flex-1">
        <p className="font-semibold mb-1">Error</p>
        <p className="text-sm text-red-100">{message}</p>
      </div>
      <button 
        onClick={onDismiss}
        className="text-white hover:text-red-200 transition-colors"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}
