'use client';

import { AlertIcon, CheckIcon } from '../icons/CustomIcons';

interface SOC2TabProps {
  data: any;
}

export function SOC2Tab({ data }: SOC2TabProps) {
  const soc2Data = data?.soc2 || {
    readiness: 85,
    passed: 10,
    atRisk: 2,
    failed: 2,
    violations: []
  };

  const categories = [
    {
      id: 'security',
      name: 'Security',
      controls: 12,
      passed: 10,
      failed: 2,
      description: 'Protection against unauthorized access'
    },
    {
      id: 'availability',
      name: 'Availability',
      controls: 8,
      passed: 7,
      failed: 1,
      description: 'System and service availability'
    },
    {
      id: 'confidentiality',
      name: 'Confidentiality',
      controls: 6,
      passed: 6,
      failed: 0,
      description: 'Data confidentiality measures'
    },
    {
      id: 'privacy',
      name: 'Privacy',
      controls: 5,
      passed: 4,
      failed: 1,
      description: 'Personal information protection'
    }
  ];

  const mockViolations = [
    {
      id: 1,
      controlId: 'CC6.1',
      category: 'Security',
      title: 'Encryption at Rest',
      severity: 'high',
      description: 'Sensitive data should be encrypted at rest using industry-standard encryption',
      remediation: 'Implement AES-256 encryption for database storage',
      timeToFix: '2-3 days'
    },
    {
      id: 2,
      controlId: 'CC6.7',
      category: 'Security',
      title: 'Secure Transmission',
      severity: 'medium',
      description: 'All data transmission must use TLS 1.2 or higher',
      remediation: 'Update SSL/TLS configuration to enforce minimum TLS 1.2',
      timeToFix: '1 day'
    },
    {
      id: 3,
      controlId: 'A1.2',
      category: 'Availability',
      title: 'Backup and Recovery',
      severity: 'medium',
      description: 'Regular backup procedures not fully documented',
      remediation: 'Document and test backup recovery procedures',
      timeToFix: '3-4 days'
    }
  ];

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">SOC 2 Compliance</h2>
        <p className="text-gray-600">System and Organization Controls compliance assessment</p>
      </div>

      {/* Readiness Score */}
      <div className="bg-white rounded-xl border-2 border-gray-200 p-8 mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-gray-600 mb-2">Overall Readiness</h3>
            <div className="flex items-baseline gap-2">
              <span className="text-6xl font-bold text-tiger-orange">{soc2Data.readiness}%</span>
              <span className="text-gray-500">ready for SOC 2 audit</span>
            </div>
          </div>
          <div className="flex gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">{soc2Data.passed}</div>
              <div className="text-sm text-gray-600">Passed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-tiger-orange">{soc2Data.atRisk}</div>
              <div className="text-sm text-gray-600">At Risk</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">{soc2Data.failed}</div>
              <div className="text-sm text-gray-600">Failed</div>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Service Categories */}
      <div className="mb-8">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Trust Service Categories</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {categories.map((category) => (
            <div key={category.id} className="bg-white rounded-xl border-2 border-gray-200 p-6 hover:border-tiger-orange transition-all">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="text-lg font-bold text-gray-900 mb-1">{category.name}</h4>
                  <p className="text-sm text-gray-600">{category.description}</p>
                </div>
                {category.failed === 0 ? (
                  <CheckIcon className="w-6 h-6 text-tiger-orange flex-shrink-0" />
                ) : (
                  <AlertIcon className="w-6 h-6 text-tiger-orange flex-shrink-0" />
                )}
              </div>
              <div className="flex items-center gap-4 mt-4">
                <div>
                  <span className="text-2xl font-bold text-gray-900">{category.passed}</span>
                  <span className="text-gray-600">/{category.controls}</span>
                </div>
                <div className="flex-1">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-tiger-orange h-2 rounded-full transition-all"
                      style={{ width: `${(category.passed / category.controls) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Violations */}
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-4">Control Violations</h3>
        <div className="space-y-4">
          {mockViolations.map((violation) => (
            <div key={violation.id} className="bg-white rounded-xl border-2 border-gray-200 p-6 hover:border-tiger-orange transition-all">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm font-semibold">
                      {violation.controlId}
                    </span>
                    <span className="text-sm text-gray-600">{violation.category}</span>
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">{violation.title}</h4>
                  <p className="text-gray-600 mb-3">{violation.description}</p>
                </div>
                <AlertIcon className="w-6 h-6 text-tiger-orange flex-shrink-0 ml-4" />
              </div>

              <div className="border-t border-gray-200 pt-4 mt-4">
                <div className="flex items-start gap-3 mb-3">
                  <span className="text-sm font-semibold text-gray-700 min-w-[100px]">Remediation:</span>
                  <span className="text-sm text-gray-600">{violation.remediation}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-semibold text-gray-700 min-w-[100px]">Time to Fix:</span>
                  <span className="text-sm text-tiger-orange font-semibold">{violation.timeToFix}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
