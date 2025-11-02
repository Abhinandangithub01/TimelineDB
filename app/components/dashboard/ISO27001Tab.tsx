'use client';

import { AlertIcon, CheckIcon, SecurityIcon } from '../icons/CustomIcons';

interface ISO27001TabProps {
  data: any;
}

export function ISO27001Tab({ data }: ISO27001TabProps) {
  const isoData = data?.iso27001 || {
    readiness: 78,
    passed: 95,
    failed: 19,
    total: 114
  };

  const domains = [
    {
      id: 'A.5',
      name: 'Information Security Policies',
      controls: 2,
      passed: 2,
      failed: 0,
      description: 'Management direction for information security'
    },
    {
      id: 'A.6',
      name: 'Organization of Information Security',
      controls: 7,
      passed: 6,
      failed: 1,
      description: 'Internal organization and mobile devices'
    },
    {
      id: 'A.7',
      name: 'Human Resource Security',
      controls: 6,
      passed: 5,
      failed: 1,
      description: 'Prior to, during, and after employment'
    },
    {
      id: 'A.8',
      name: 'Asset Management',
      controls: 10,
      passed: 8,
      failed: 2,
      description: 'Responsibility for assets and information classification'
    },
    {
      id: 'A.9',
      name: 'Access Control',
      controls: 14,
      passed: 12,
      failed: 2,
      description: 'Business requirements and user access management'
    },
    {
      id: 'A.10',
      name: 'Cryptography',
      controls: 2,
      passed: 1,
      failed: 1,
      description: 'Cryptographic controls'
    },
    {
      id: 'A.12',
      name: 'Operations Security',
      controls: 14,
      passed: 11,
      failed: 3,
      description: 'Operational procedures and malware protection'
    },
    {
      id: 'A.13',
      name: 'Communications Security',
      controls: 7,
      passed: 6,
      failed: 1,
      description: 'Network security and information transfer'
    }
  ];

  const mockGaps = [
    {
      id: 1,
      control: 'A.8.24',
      domain: 'Asset Management',
      title: 'Use of Cryptography',
      gap: 'Encryption keys are not properly managed and rotated',
      risk: 'High',
      recommendation: 'Implement a key management system with automatic rotation',
      effort: '2-3 weeks'
    },
    {
      id: 2,
      control: 'A.9.2.3',
      domain: 'Access Control',
      title: 'Management of Privileged Access Rights',
      gap: 'No formal process for reviewing privileged access',
      risk: 'Medium',
      recommendation: 'Establish quarterly access review process',
      effort: '1 week'
    },
    {
      id: 3,
      control: 'A.12.4.1',
      domain: 'Operations Security',
      title: 'Event Logging',
      gap: 'Insufficient logging of administrator activities',
      risk: 'High',
      recommendation: 'Enable comprehensive audit logging for all admin actions',
      effort: '1-2 weeks'
    }
  ];

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">ISO 27001:2022 Compliance</h2>
        <p className="text-gray-600">Information Security Management System certification readiness</p>
      </div>

      {/* Readiness Score */}
      <div className="bg-white rounded-xl border-2 border-gray-200 p-8 mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-gray-600 mb-2">Certification Readiness</h3>
            <div className="flex items-baseline gap-2">
              <span className="text-6xl font-bold text-tiger-orange">{isoData.readiness}%</span>
              <span className="text-gray-500">of controls implemented</span>
            </div>
          </div>
          <div className="flex gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">{isoData.passed}</div>
              <div className="text-sm text-gray-600">Compliant</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-tiger-orange">{isoData.failed}</div>
              <div className="text-sm text-gray-600">Gaps</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">{isoData.total}</div>
              <div className="text-sm text-gray-600">Total Controls</div>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-tiger-orange h-3 rounded-full transition-all"
              style={{ width: `${isoData.readiness}%` }}
            />
          </div>
        </div>
      </div>

      {/* Control Domains */}
      <div className="mb-8">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Annex A Control Domains</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {domains.map((domain) => (
            <div key={domain.id} className="bg-white rounded-xl border-2 border-gray-200 p-6 hover:border-tiger-orange transition-all">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-bold">
                      {domain.id}
                    </span>
                    <span className="text-xs text-gray-500">{domain.controls} controls</span>
                  </div>
                  <h4 className="font-bold text-gray-900 mb-1">{domain.name}</h4>
                  <p className="text-sm text-gray-600">{domain.description}</p>
                </div>
                <SecurityIcon className="w-5 h-5 text-tiger-orange flex-shrink-0 ml-3" />
              </div>
              <div className="flex items-center gap-3 mt-4">
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold text-gray-900">{domain.passed}</span>
                  <span className="text-gray-600 text-sm">/{domain.controls}</span>
                </div>
                <div className="flex-1">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-tiger-orange h-2 rounded-full transition-all"
                      style={{ width: `${(domain.passed / domain.controls) * 100}%` }}
                    />
                  </div>
                </div>
                <span className="text-sm font-semibold text-gray-600">
                  {Math.round((domain.passed / domain.controls) * 100)}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Compliance Gaps */}
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-4">Compliance Gaps</h3>
        <div className="space-y-4">
          {mockGaps.map((gap) => (
            <div key={gap.id} className="bg-white rounded-xl border-2 border-gray-200 p-6 hover:border-tiger-orange transition-all">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm font-bold">
                      {gap.control}
                    </span>
                    <span className="text-sm text-gray-600">{gap.domain}</span>
                    <span className="px-2 py-1 bg-tiger-orange/10 text-tiger-orange rounded text-xs font-semibold">
                      {gap.risk} Risk
                    </span>
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">{gap.title}</h4>
                  <p className="text-gray-600 mb-3">{gap.gap}</p>
                </div>
                <AlertIcon className="w-6 h-6 text-tiger-orange flex-shrink-0 ml-4" />
              </div>

              <div className="border-t border-gray-200 pt-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm font-semibold text-gray-700 block mb-1">Recommendation:</span>
                    <span className="text-sm text-gray-600">{gap.recommendation}</span>
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-gray-700 block mb-1">Implementation Effort:</span>
                    <span className="text-sm text-tiger-orange font-semibold">{gap.effort}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
