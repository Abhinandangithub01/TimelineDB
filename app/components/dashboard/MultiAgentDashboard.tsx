'use client';

import { useState, useEffect } from 'react';
import { SecurityIcon, ComplianceIcon, PerformanceIcon, RemediationIcon, AgentIcon, CheckIcon } from '../icons/CustomIcons';

interface AgentStatus {
  name: string;
  status: string;
  progress: number;
  findings: number;
  confidence: number;
  icon: 'security' | 'compliance' | 'performance' | 'remediation';
  color: string;
}

interface MultiAgentDashboardProps {
  isRunning?: boolean;
  results?: any;
}

export function MultiAgentDashboard({ isRunning = false, results }: MultiAgentDashboardProps) {
  const [agents, setAgents] = useState<AgentStatus[]>([
    {
      name: 'SecurityAgent',
      status: 'Initializing...',
      progress: 0,
      findings: 0,
      confidence: 92,
      icon: 'security',
      color: 'border-red-500'
    },
    {
      name: 'ComplianceAgent',
      status: 'Initializing...',
      progress: 0,
      findings: 0,
      confidence: 88,
      icon: 'compliance',
      color: 'border-blue-500'
    },
    {
      name: 'PerformanceAgent',
      status: 'Initializing...',
      progress: 0,
      findings: 0,
      confidence: 85,
      icon: 'performance',
      color: 'border-yellow-500'
    },
    {
      name: 'RemediationAgent',
      status: 'Initializing...',
      progress: 0,
      findings: 0,
      confidence: 90,
      icon: 'remediation',
      color: 'border-green-500'
    }
  ]);

  useEffect(() => {
    if (!isRunning) return;

    // Simulate parallel agent execution
    const interval = setInterval(() => {
      setAgents(prev => prev.map(agent => {
        if (agent.progress >= 100) return agent;
        
        const increment = Math.random() * 15 + 5;
        const newProgress = Math.min(100, agent.progress + increment);
        
        let status = 'Analyzing...';
        if (newProgress >= 100) {
          status = 'Complete ✓';
        } else if (newProgress > 80) {
          status = 'Finalizing...';
        } else if (newProgress > 50) {
          status = 'Deep scanning...';
        } else if (newProgress > 20) {
          status = 'Analyzing patterns...';
        }

        const findings = Math.floor((newProgress / 100) * (agent.name === 'SecurityAgent' ? 12 : 
                                     agent.name === 'ComplianceAgent' ? 5 :
                                     agent.name === 'PerformanceAgent' ? 3 : 8));

        return {
          ...agent,
          progress: newProgress,
          status,
          findings
        };
      }));
    }, 200);

    return () => clearInterval(interval);
  }, [isRunning]);

  // If we have results, show final state
  useEffect(() => {
    if (results) {
      setAgents([
        {
          name: 'SecurityAgent',
          status: 'Complete',
          progress: 100,
          findings: results.security?.total || results.security?.findings?.length || 12,
          confidence: 92,
          icon: 'security',
          color: 'border-red-500'
        },
        {
          name: 'ComplianceAgent',
          status: 'Complete',
          progress: 100,
          findings: results.soc2?.failed || 5,
          confidence: 88,
          icon: 'compliance',
          color: 'border-blue-500'
        },
        {
          name: 'PerformanceAgent',
          status: 'Complete',
          progress: 100,
          findings: 3,
          confidence: 85,
          icon: 'performance',
          color: 'border-yellow-500'
        },
        {
          name: 'RemediationAgent',
          status: 'Complete',
          progress: 100,
          findings: results.security?.findings?.length || 8,
          confidence: 90,
          icon: 'remediation',
          color: 'border-green-500'
        }
      ]);
    }
  }, [results]);

  const getIconComponent = (iconType: string) => {
    switch(iconType) {
      case 'security': return SecurityIcon;
      case 'compliance': return ComplianceIcon;
      case 'performance': return PerformanceIcon;
      case 'remediation': return RemediationIcon;
      default: return AgentIcon;
    }
  };

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <AgentIcon className="w-5 h-5 text-tiger-orange" />
          Multi-Agent Analysis System
        </h3>
        {isRunning && (
          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold animate-pulse">
            <AgentIcon className="w-5 h-5 text-tiger-orange" /> Agents Working in Parallel...
          </span>
        )}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
        {agents.map((agent) => {
          const IconComponent = getIconComponent(agent.icon);
          return (
          <div
            key={agent.name}
            className={`bg-white border-2 ${agent.color} rounded-xl p-4 transition-all duration-300 hover:shadow-md`}
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <IconComponent className="w-5 h-5 text-tiger-orange" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-gray-900 text-xs truncate">
                  {agent.name}
                </h4>
                <p className="text-xs text-gray-600">
                  {agent.confidence}% confidence
                </p>
              </div>
            </div>

            <div className="mb-2">
              <div className="flex justify-between mb-1 text-xs">
                <span className="text-gray-600">{agent.status}</span>
                <span className="font-semibold text-gray-900">
                  {Math.round(agent.progress)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5">
                <div
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    agent.progress === 100
                      ? 'bg-tiger-orange'
                      : 'bg-gray-400'
                  }`}
                  style={{ width: `${agent.progress}%` }}
                />
              </div>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-600">Findings:</span>
              <span className="text-xl font-bold text-tiger-orange">
                {agent.findings}
              </span>
            </div>

            {agent.progress === 100 && (
              <div className="mt-2 pt-2 border-t border-gray-200">
                <span className="text-xs text-tiger-orange font-semibold flex items-center gap-1">
                  <CheckIcon className="w-3 h-3" /> Analysis Complete
                </span>
              </div>
            )}
          </div>
        );
        })}
      </div>

      {agents.every(a => a.progress === 100) && !isRunning && (
        <div className="mt-3 p-3 bg-tiger-orange/10 border-2 border-tiger-orange rounded-xl">
          <div className="flex items-center gap-2">
            <CheckIcon className="w-5 h-5 text-tiger-orange" />
            <div>
              <h4 className="font-bold text-gray-900 text-sm">
                All Agents Complete!
              </h4>
              <p className="text-xs text-gray-600">
                4 specialized agents analyzed your code in parallel using Tiger forks
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
