'use client';

import { useState, useEffect } from 'react';
import { MultiAgentDashboard } from './MultiAgentDashboard';
import { ForkTimeline } from './ForkTimeline';

interface AnalysisViewProps {
  sessionId?: string;
  onComplete?: (results: any) => void;
}

export function AnalysisView({ sessionId, onComplete }: AnalysisViewProps) {
  const [progress, setProgress] = useState(5);
  const [currentStage, setCurrentStage] = useState(1);
  const [stageMessage, setStageMessage] = useState('Initializing analysis...');

  useEffect(() => {
    // Simulate progress for visual feedback
    // Actual polling is handled by parent (dashboard)
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) return 95; // Stop at 95%, wait for actual completion
        return prev + 1;
      });
    }, 2000);

    const stageInterval = setInterval(() => {
      setCurrentStage((prev) => {
        if (prev >= 4) return 4;
        
        // Update stage message
        const messages = [
          'Initializing analysis...',
          'Creating Tiger database forks...',
          'Running AI analysis with Groq/Perplexity...',
          'Checking SOC2 compliance...',
          'Generating recommendations...'
        ];
        setStageMessage(messages[prev + 1] || messages[4]);
        
        return prev + 1;
      });
    }, 15000); // Change stage every 15 seconds

    return () => {
      clearInterval(progressInterval);
      clearInterval(stageInterval);
    };
  }, []);

  const stages = [
    { id: 1, name: 'RAG Strategy Evaluation', duration: '60s' },
    { id: 2, name: 'Security & Compliance Scan', duration: '90s' },
    { id: 3, name: 'Compliance Gap Analysis', duration: '45s' },
    { id: 4, name: 'Certification Recommendations', duration: '30s' },
  ];

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-fortress-black mb-4">
        Analysis in Progress...
      </h1>
      <p className="text-lg text-fortress-slate mb-8">
        Please wait while we analyze your code with 4 AI agents running in parallel
      </p>

      {/* Progress Bar */}
      <div className="card mb-8">
        <div className="mb-4">
          <div className="flex justify-between mb-2">
            <span className="font-semibold">Overall Progress</span>
            <span className="text-tiger-orange font-bold">{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-fortress-light rounded-full h-4">
            <div
              className="bg-tiger-orange h-4 rounded-full transition-all duration-1000"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
        <p className="text-sm text-fortress-slate">
          Stage {currentStage} of 4: {stages[currentStage - 1]?.name}
        </p>
      </div>

      {/* Multi-Agent Dashboard - Live View */}
      <MultiAgentDashboard isRunning={true} />

      {/* Fork Timeline - Live Activity */}
      <ForkTimeline isRunning={true} />

      {/* Current Status */}
      <div className="card mb-8">
        <div className="flex items-center gap-3 mb-6">
          <svg className="w-8 h-8 text-tiger-orange animate-spin" viewBox="0 0 100 100" fill="none">
            <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="8" opacity="0.3" />
            <path d="M50 10 A40 40 0 0 1 90 50" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
          </svg>
          <h2 className="text-2xl font-bold">AI Analysis in Progress</h2>
        </div>
        <div className="p-6 bg-tiger-light/20 rounded-lg">
          <p className="text-lg font-semibold text-fortress-black mb-2">{stageMessage}</p>
          <p className="text-sm text-fortress-slate">
            <strong>Status:</strong> Analyzing your code with Groq AI + 4 specialized agents on Tiger forks
          </p>
          {sessionId && (
            <p className="text-xs text-fortress-gray mt-2">Session ID: {sessionId}</p>
          )}
        </div>
      </div>

      {/* Stage Timeline */}
      <div className="card">
        <h2 className="text-2xl font-bold mb-6">Analysis Stages</h2>
        <div className="space-y-4">
          {stages.map((stage) => (
            <div
              key={stage.id}
              className={`flex items-center gap-4 p-4 rounded-lg ${
                stage.id < currentStage
                  ? 'bg-success/10'
                  : stage.id === currentStage
                  ? 'bg-tiger-orange/10'
                  : 'bg-fortress-light/30'
              }`}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                  stage.id < currentStage
                    ? 'bg-success text-white'
                    : stage.id === currentStage
                    ? 'bg-tiger-orange text-white'
                    : 'bg-fortress-gray text-white'
                }`}
              >
                {stage.id < currentStage ? '✓' : stage.id}
              </div>
              <div className="flex-1">
                <div className="font-semibold">{stage.name}</div>
                <div className="text-sm text-fortress-slate">{stage.duration}</div>
              </div>
              {stage.id === currentStage && (
                <span className="text-tiger-orange font-semibold">In Progress...</span>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 text-center text-fortress-slate">
        <p>Estimated time remaining: {Math.max(0, Math.round((100 - progress) * 1.8))} seconds</p>
      </div>
    </div>
  );
}
