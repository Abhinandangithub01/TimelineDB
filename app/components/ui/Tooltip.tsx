'use client';

import { useState, useRef, useEffect } from 'react';

/**
 * Tooltip Component
 * Explain every icon and metric with helpful tooltips
 */

interface TooltipProps {
  content: string | React.ReactNode;
  children: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  delay?: number;
  maxWidth?: string;
}

export function Tooltip({ 
  content, 
  children, 
  position = 'top',
  delay = 200,
  maxWidth = '200px'
}: TooltipProps) {
  const [visible, setVisible] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const timeoutRef = useRef<NodeJS.Timeout>();
  const triggerRef = useRef<HTMLDivElement>(null);

  const showTooltip = () => {
    timeoutRef.current = setTimeout(() => {
      if (triggerRef.current) {
        const rect = triggerRef.current.getBoundingClientRect();
        setCoords({
          x: rect.left + rect.width / 2,
          y: rect.top
        });
      }
      setVisible(true);
    }, delay);
  };

  const hideTooltip = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setVisible(false);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const getPositionClasses = () => {
    switch (position) {
      case 'top':
        return 'bottom-full left-1/2 -translate-x-1/2 mb-2';
      case 'bottom':
        return 'top-full left-1/2 -translate-x-1/2 mt-2';
      case 'left':
        return 'right-full top-1/2 -translate-y-1/2 mr-2';
      case 'right':
        return 'left-full top-1/2 -translate-y-1/2 ml-2';
    }
  };

  const getArrowClasses = () => {
    switch (position) {
      case 'top':
        return 'top-full left-1/2 -translate-x-1/2 border-t-gray-900 border-x-transparent border-b-transparent';
      case 'bottom':
        return 'bottom-full left-1/2 -translate-x-1/2 border-b-gray-900 border-x-transparent border-t-transparent';
      case 'left':
        return 'left-full top-1/2 -translate-y-1/2 border-l-gray-900 border-y-transparent border-r-transparent';
      case 'right':
        return 'right-full top-1/2 -translate-y-1/2 border-r-gray-900 border-y-transparent border-l-transparent';
    }
  };

  return (
    <div className="relative inline-block">
      <div
        ref={triggerRef}
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
        onFocus={showTooltip}
        onBlur={hideTooltip}
        className="inline-block"
      >
        {children}
      </div>

      {visible && (
        <div
          className={`absolute z-50 ${getPositionClasses()} animate-fade-in`}
          style={{ maxWidth }}
        >
          <div className="bg-gray-900 text-white text-sm rounded-lg px-3 py-2 shadow-lg">
            {content}
          </div>
          <div className={`absolute w-0 h-0 border-4 ${getArrowClasses()}`}></div>
        </div>
      )}
    </div>
  );
}

// Icon with tooltip
export function IconWithTooltip({ 
  icon, 
  tooltip, 
  className = "" 
}: { 
  icon: React.ReactNode; 
  tooltip: string;
  className?: string;
}) {
  return (
    <Tooltip content={tooltip}>
      <div className={`cursor-help ${className}`}>
        {icon}
      </div>
    </Tooltip>
  );
}

// Metric with explanation tooltip
export function MetricWithTooltip({
  value,
  label,
  explanation,
  trend,
  className = ""
}: {
  value: string | number;
  label: string;
  explanation: string;
  trend?: 'up' | 'down' | 'neutral';
  className?: string;
}) {
  return (
    <Tooltip content={explanation}>
      <div className={`cursor-help ${className}`}>
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-gray-900">{value}</span>
          {trend && <TrendIndicator trend={trend} />}
        </div>
        <div className="text-sm text-gray-600">{label}</div>
      </div>
    </Tooltip>
  );
}

// Badge with tooltip
export function BadgeWithTooltip({
  label,
  explanation,
  color = 'blue'
}: {
  label: string;
  explanation: string;
  color?: 'blue' | 'green' | 'orange' | 'red' | 'gray';
}) {
  const colorClasses = {
    blue: 'bg-blue-100 text-blue-800 border-blue-200',
    green: 'bg-green-100 text-green-800 border-green-200',
    orange: 'bg-orange-100 text-orange-800 border-orange-200',
    red: 'bg-red-100 text-red-800 border-red-200',
    gray: 'bg-gray-100 text-gray-800 border-gray-200'
  };

  return (
    <Tooltip content={explanation}>
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border cursor-help ${colorClasses[color]}`}>
        {label}
      </span>
    </Tooltip>
  );
}

// Status indicator with tooltip
export function StatusWithTooltip({
  status,
  explanation
}: {
  status: 'success' | 'warning' | 'error' | 'info';
  explanation: string;
}) {
  const statusConfig = {
    success: {
      color: 'bg-green-500',
      icon: (
        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      )
    },
    warning: {
      color: 'bg-yellow-500',
      icon: (
        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      )
    },
    error: {
      color: 'bg-red-500',
      icon: (
        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      )
    },
    info: {
      color: 'bg-blue-500',
      icon: (
        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    }
  };

  const config = statusConfig[status];

  return (
    <Tooltip content={explanation}>
      <div className={`w-8 h-8 rounded-full ${config.color} flex items-center justify-center cursor-help`}>
        {config.icon}
      </div>
    </Tooltip>
  );
}

// Help icon with tooltip
export function HelpTooltip({ content }: { content: string | React.ReactNode }) {
  return (
    <Tooltip content={content}>
      <button className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors cursor-help">
        <svg className="w-3 h-3 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </button>
    </Tooltip>
  );
}

// Info icon with rich tooltip content
export function InfoTooltip({ 
  title, 
  description,
  learnMoreUrl 
}: { 
  title: string; 
  description: string;
  learnMoreUrl?: string;
}) {
  return (
    <Tooltip
      content={
        <div className="space-y-2">
          <div className="font-semibold">{title}</div>
          <div className="text-xs text-gray-300">{description}</div>
          {learnMoreUrl && (
            <a 
              href={learnMoreUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1"
            >
              Learn more
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          )}
        </div>
      }
      maxWidth="300px"
    >
      <button className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-blue-100 hover:bg-blue-200 transition-colors cursor-help">
        <svg className="w-3 h-3 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </button>
    </Tooltip>
  );
}

// Trend indicator helper
function TrendIndicator({ trend }: { trend: 'up' | 'down' | 'neutral' }) {
  if (trend === 'neutral') {
    return (
      <span className="text-gray-400">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14" />
        </svg>
      </span>
    );
  }

  const isUp = trend === 'up';
  return (
    <span className={isUp ? 'text-green-600' : 'text-red-600'}>
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d={isUp ? "M5 10l7-7m0 0l7 7m-7-7v18" : "M19 14l-7 7m0 0l-7-7m7 7V3"} 
        />
      </svg>
    </span>
  );
}

// Keyboard shortcut tooltip
export function KeyboardShortcutTooltip({
  children,
  shortcut
}: {
  children: React.ReactNode;
  shortcut: string;
}) {
  return (
    <Tooltip
      content={
        <div className="flex items-center gap-2">
          <span>Press</span>
          <kbd className="px-2 py-1 bg-gray-700 rounded text-xs font-mono">{shortcut}</kbd>
        </div>
      }
    >
      {children}
    </Tooltip>
  );
}
