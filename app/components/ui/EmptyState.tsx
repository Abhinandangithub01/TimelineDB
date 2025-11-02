'use client';

import Link from 'next/link';

/**
 * Empty State Components
 * Beautiful illustrations and helpful messages when no data exists
 */

interface EmptyStateProps {
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
  onAction?: () => void;
  icon?: React.ReactNode;
}

export function EmptyState({ 
  title, 
  description, 
  actionLabel, 
  actionHref, 
  onAction,
  icon 
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
      {/* Icon */}
      <div className="mb-6">
        {icon || <DefaultEmptyIcon />}
      </div>

      {/* Title */}
      <h3 className="text-2xl font-bold text-gray-900 mb-2">
        {title}
      </h3>

      {/* Description */}
      <p className="text-gray-600 max-w-md mb-6">
        {description}
      </p>

      {/* Action Button */}
      {(actionLabel && (actionHref || onAction)) && (
        actionHref ? (
          <Link 
            href={actionHref}
            className="bg-[#FF6B35] hover:bg-[#ff5722] text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            {actionLabel}
          </Link>
        ) : (
          <button
            onClick={onAction}
            className="bg-[#FF6B35] hover:bg-[#ff5722] text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            {actionLabel}
          </button>
        )
      )}
    </div>
  );
}

// Specific empty states for different scenarios

export function EmptyAnalysis() {
  return (
    <EmptyState
      icon={<AnalysisEmptyIcon />}
      title="No analysis yet"
      description="Upload your codebase to get started with security analysis. We'll scan for vulnerabilities, check compliance, and optimize performance."
      actionLabel="Start Analysis"
      actionHref="/dashboard"
    />
  );
}

export function EmptyResults() {
  return (
    <EmptyState
      icon={<CheckCircleIcon />}
      title="No issues found!"
      description="Great news! Your codebase passed all security checks. No vulnerabilities detected in this analysis."
      actionLabel="Run Another Analysis"
      actionHref="/dashboard"
    />
  );
}

export function EmptySearch() {
  return (
    <EmptyState
      icon={<SearchEmptyIcon />}
      title="No results found"
      description="We couldn't find any matches for your search. Try adjusting your filters or search terms."
    />
  );
}

export function EmptyHistory() {
  return (
    <EmptyState
      icon={<HistoryEmptyIcon />}
      title="No analysis history"
      description="Your analysis history will appear here once you complete your first security scan."
      actionLabel="Start First Analysis"
      actionHref="/dashboard"
    />
  );
}

export function EmptyFiles() {
  return (
    <EmptyState
      icon={<FileEmptyIcon />}
      title="No files uploaded"
      description="Drag and drop your codebase or click to browse files. Supports ZIP, folders, and individual files."
    />
  );
}

export function EmptyVulnerabilities() {
  return (
    <EmptyState
      icon={<ShieldCheckIcon />}
      title="No vulnerabilities detected"
      description="Excellent! Your code is secure. All security checks passed successfully."
    />
  );
}

export function EmptyCompliance() {
  return (
    <EmptyState
      icon={<ComplianceEmptyIcon />}
      title="Compliance check not run"
      description="Run a compliance analysis to check your codebase against SOC2 and ISO 27001 standards."
      actionLabel="Check Compliance"
    />
  );
}

// Custom Icons for Empty States

function DefaultEmptyIcon() {
  return (
    <svg className="w-24 h-24 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
    </svg>
  );
}

function AnalysisEmptyIcon() {
  return (
    <div className="relative">
      <svg className="w-24 h-24 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
      <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-[#FF6B35] rounded-full flex items-center justify-center">
        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      </div>
    </div>
  );
}

function CheckCircleIcon() {
  return (
    <svg className="w-24 h-24 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function SearchEmptyIcon() {
  return (
    <svg className="w-24 h-24 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  );
}

function HistoryEmptyIcon() {
  return (
    <svg className="w-24 h-24 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function FileEmptyIcon() {
  return (
    <svg className="w-24 h-24 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
    </svg>
  );
}

function ShieldCheckIcon() {
  return (
    <svg className="w-24 h-24 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  );
}

function ComplianceEmptyIcon() {
  return (
    <svg className="w-24 h-24 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
    </svg>
  );
}
