'use client';

import { useState, useEffect } from 'react';

interface TimelineEvent {
  time: string;
  message: string;
  icon: string;
  type: 'info' | 'success' | 'warning';
}

interface ForkTimelineProps {
  isRunning?: boolean;
}

export function ForkTimeline({ isRunning = false }: ForkTimelineProps) {
  const [events, setEvents] = useState<TimelineEvent[]>([]);
  const [currentTime, setCurrentTime] = useState(0);

  const timeline: TimelineEvent[] = [
    { time: '0.0s', message: '🐅 Creating 4 Tiger database forks...', icon: '🐅', type: 'info' },
    { time: '0.8s', message: '✓ Forks created successfully (8ms avg)', icon: '✓', type: 'success' },
    { time: '1.2s', message: '🔒 SecurityAgent analyzing on fork-1...', icon: '🔒', type: 'info' },
    { time: '1.2s', message: '✓ ComplianceAgent analyzing on fork-2...', icon: '✓', type: 'info' },
    { time: '1.2s', message: '⚡ PerformanceAgent analyzing on fork-3...', icon: '⚡', type: 'info' },
    { time: '1.2s', message: '🔧 RemediationAgent analyzing on fork-4...', icon: '🔧', type: 'info' },
    { time: '3.5s', message: 'SecurityAgent: Found 12 vulnerabilities', icon: '🔍', type: 'info' },
    { time: '4.2s', message: 'ComplianceAgent: Checking SOC2 controls...', icon: '📋', type: 'info' },
    { time: '5.8s', message: 'PerformanceAgent: Analyzing bottlenecks...', icon: '📊', type: 'info' },
    { time: '6.5s', message: 'RemediationAgent: Generating fixes...', icon: '🔧', type: 'info' },
    { time: '8.2s', message: '✓ SecurityAgent complete (92% confidence)', icon: '✓', type: 'success' },
    { time: '8.4s', message: '✓ ComplianceAgent complete (88% confidence)', icon: '✓', type: 'success' },
    { time: '8.7s', message: '✓ PerformanceAgent complete (85% confidence)', icon: '✓', type: 'success' },
    { time: '9.1s', message: '✓ RemediationAgent complete (90% confidence)', icon: '✓', type: 'success' },
    { time: '9.5s', message: '🎉 All agents finished successfully!', icon: '🎉', type: 'success' },
    { time: '9.8s', message: '🧹 Cleaning up Tiger forks...', icon: '🧹', type: 'info' },
    { time: '10.0s', message: '✓ Analysis complete in 10.0 seconds', icon: '✓', type: 'success' }
  ];

  useEffect(() => {
    if (!isRunning) {
      setEvents([]);
      setCurrentTime(0);
      return;
    }

    let eventIndex = 0;
    const interval = setInterval(() => {
      setCurrentTime(prev => prev + 0.1);
      
      // Add events as we reach their time
      while (eventIndex < timeline.length) {
        const event = timeline[eventIndex];
        const eventTime = parseFloat(event.time);
        
        if (currentTime >= eventTime - 0.1) {
          setEvents(prev => [...prev, event]);
          eventIndex++;
        } else {
          break;
        }
      }

      // Stop when all events are shown
      if (eventIndex >= timeline.length) {
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [isRunning, currentTime]);

  if (events.length === 0) return null;

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-fortress-black mb-4">
        🐅 Tiger Fork Activity Timeline
      </h2>
      
      <div className="card bg-gray-50">
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {events.map((event, index) => (
            <div
              key={index}
              className="flex items-start gap-3 p-3 bg-white rounded-lg shadow-sm animate-fadeIn"
            >
              <div className="flex-shrink-0 w-16 text-right">
                <span className="text-sm font-mono text-fortress-slate">
                  {event.time}
                </span>
              </div>
              
              <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-blue-100 rounded-full text-lg">
                {event.icon}
              </div>
              
              <div className="flex-1">
                <p className={`text-sm font-medium ${
                  event.type === 'success' ? 'text-green-700' :
                  event.type === 'warning' ? 'text-yellow-700' :
                  'text-fortress-black'
                }`}>
                  {event.message}
                </p>
              </div>
            </div>
          ))}
        </div>

        {events.length >= timeline.length && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-2xl">⚡</span>
                <div>
                  <p className="font-bold text-fortress-black">
                    Parallel Execution Complete
                  </p>
                  <p className="text-sm text-fortress-slate">
                    4 agents analyzed simultaneously on separate Tiger forks
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-tiger-orange">10.0s</p>
                <p className="text-xs text-fortress-slate">vs 32s sequential</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
