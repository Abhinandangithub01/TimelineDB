'use client';

export function NewStatsSection() {
  return (
    <section className="py-20 px-6 bg-[#1a1d29]">
      <div className="max-w-7xl mx-auto">
        {/* Main Stat Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-16">
          <div className="text-center">
            <div className="text-5xl font-bold text-[#FF6B35] mb-2">7s</div>
            <div className="text-gray-400 font-medium">Analysis Time</div>
          </div>
          <div className="text-center">
            <div className="text-5xl font-bold text-[#4285f4] mb-2">89%</div>
            <div className="text-gray-400 font-medium">RAG Accuracy</div>
          </div>
          <div className="text-center">
            <div className="text-5xl font-bold text-[#FF6B35] mb-2">8</div>
            <div className="text-gray-400 font-medium">Parallel Forks</div>
          </div>
          <div className="text-center">
            <div className="text-5xl font-bold text-[#4285f4] mb-2">4</div>
            <div className="text-gray-400 font-medium">Domain Analyses</div>
          </div>
        </div>

        {/* Feature Highlights */}
        <div className="grid md:grid-cols-3 gap-8">
          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 rounded-lg bg-[#FF6B35] flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-bold text-white mb-2">Two-Phase Cascading</h3>
              <p className="text-sm text-gray-400">
                Phase 1 picks optimal RAG strategy (2s), Phase 2 runs 4 domain analyses in parallel (5s).
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 rounded-lg bg-[#4285f4] flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-bold text-white mb-2">Multi-Agent System</h3>
              <p className="text-sm text-gray-400">
                4 specialized AI agents (Security, Compliance, Performance, Remediation) on separate forks.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 rounded-lg bg-[#FF6B35] flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-bold text-white mb-2">Fork Experiments</h3>
              <p className="text-sm text-gray-400">
                A/B test security configs, validate patterns, and compare strategies using zero-copy forks.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
