'use client';

export function NewArchitectureSection() {
  return (
    <section id="architecture" className="py-20 px-6 bg-[#252836]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Powered by Tiger Agentic Postgres
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Two-phase cascading intelligence with 8 database forks
          </p>
        </div>

        {/* Performance Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <div className="bg-[#1a1d29] rounded-xl p-6 border-2 border-gray-700 text-center hover:border-[#FF6B35] transition-colors">
            <div className="text-4xl font-bold text-[#FF6B35] mb-2">7 sec</div>
            <div className="text-sm text-gray-300 font-medium">Complete Analysis</div>
            <div className="text-xs text-gray-500 mt-1">vs 60+ seconds without Tiger</div>
          </div>
          <div className="bg-[#1a1d29] rounded-xl p-6 border-2 border-gray-700 text-center hover:border-[#4285f4] transition-colors">
            <div className="text-4xl font-bold text-[#4285f4] mb-2">8.5x</div>
            <div className="text-sm text-gray-300 font-medium">Performance Boost</div>
            <div className="text-xs text-gray-500 mt-1">Parallel fork processing</div>
          </div>
          <div className="bg-[#1a1d29] rounded-xl p-6 border-2 border-gray-700 text-center hover:border-[#FF6B35] transition-colors">
            <div className="text-4xl font-bold text-[#FF6B35] mb-2">89%</div>
            <div className="text-sm text-gray-300 font-medium">RAG Accuracy</div>
            <div className="text-xs text-gray-500 mt-1">Autonomous optimization</div>
          </div>
        </div>

        {/* Architecture Diagram */}
        <div className="bg-[#1a1d29] rounded-2xl border-2 border-gray-700 p-8 md:p-12">
          {/* Phase 1 */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-[#FF6B35] flex items-center justify-center text-white font-bold text-lg">
                1
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">Phase 1: RAG Strategy Testing</h3>
                <p className="text-gray-400">2 seconds • 4 forks in parallel</p>
              </div>
            </div>

            <div className="grid md:grid-cols-4 gap-4 ml-4 md:ml-12">
              <div className="bg-[#252836] border-2 border-gray-700 rounded-lg p-4 text-center">
                <div className="w-10 h-10 mx-auto mb-2 rounded-lg bg-gray-200 flex items-center justify-center">
                  <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <div className="font-bold text-white text-sm mb-1">Vector</div>
                <div className="text-xs text-gray-400">68% accuracy</div>
              </div>

              <div className="bg-[#252836] border-2 border-gray-700 rounded-lg p-4 text-center">
                <div className="w-10 h-10 mx-auto mb-2 rounded-lg bg-gray-200 flex items-center justify-center">
                  <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <div className="font-bold text-white text-sm mb-1">BM25</div>
                <div className="text-xs text-gray-400">73% accuracy</div>
              </div>

              <div className="bg-[#FF6B35]/10 border-2 border-[#FF6B35] rounded-lg p-4 text-center">
                <div className="w-10 h-10 mx-auto mb-2 rounded-lg bg-[#FF6B35] flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div className="font-bold text-[#FF6B35] text-sm mb-1">Hybrid ✓</div>
                <div className="text-xs text-[#FF6B35]">89% accuracy</div>
              </div>

              <div className="bg-[#252836] border-2 border-gray-700 rounded-lg p-4 text-center">
                <div className="w-10 h-10 mx-auto mb-2 rounded-lg bg-gray-200 flex items-center justify-center">
                  <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <div className="font-bold text-white text-sm mb-1">Rerank</div>
                <div className="text-xs text-gray-400">85% accuracy</div>
              </div>
            </div>

            <div className="ml-4 md:ml-12 mt-4 text-sm text-gray-400">
              <span className="font-semibold text-white">Result:</span> Hybrid selected as optimal strategy
            </div>
          </div>

          {/* Arrow */}
          <div className="flex justify-center my-6">
            <svg className="w-8 h-8 text-[#FF6B35]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>

          {/* Phase 2 */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-[#4285f4] flex items-center justify-center text-white font-bold text-lg">
                2
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">Phase 2: Domain Analysis</h3>
                <p className="text-gray-400">5 seconds • 4 domains using Hybrid search</p>
              </div>
            </div>

            <div className="grid md:grid-cols-4 gap-4 ml-4 md:ml-12">
              <div className="bg-[#4285f4]/10 border-2 border-[#4285f4] rounded-lg p-4">
                <div className="w-10 h-10 mb-3 rounded-lg bg-[#4285f4] flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div className="font-bold text-white text-sm mb-1">Security</div>
                <div className="text-xs text-gray-400">12 issues found</div>
              </div>

              <div className="bg-[#4285f4]/10 border-2 border-[#4285f4] rounded-lg p-4">
                <div className="w-10 h-10 mb-3 rounded-lg bg-[#4285f4] flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                </div>
                <div className="font-bold text-white text-sm mb-1">SOC2</div>
                <div className="text-xs text-gray-400">60% compliant</div>
              </div>

              <div className="bg-[#4285f4]/10 border-2 border-[#4285f4] rounded-lg p-4">
                <div className="w-10 h-10 mb-3 rounded-lg bg-[#4285f4] flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="font-bold text-white text-sm mb-1">ISO 27001</div>
                <div className="text-xs text-gray-400">100% ready</div>
              </div>

              <div className="bg-[#4285f4]/10 border-2 border-[#4285f4] rounded-lg p-4">
                <div className="w-10 h-10 mb-3 rounded-lg bg-[#4285f4] flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div className="font-bold text-white text-sm mb-1">Performance</div>
                <div className="text-xs text-gray-400">78/100 score</div>
              </div>
            </div>
          </div>

          {/* Final Result */}
          <div className="mt-8 bg-[#4CAF50]/10 border-2 border-[#4CAF50] rounded-lg p-6 flex items-center justify-center gap-3">
            <svg className="w-8 h-8 text-[#4CAF50]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <div className="text-lg font-bold text-white">Complete in 7 seconds!</div>
              <div className="text-sm text-gray-400">8.5x faster • Autonomous optimization • 89% accuracy</div>
            </div>
          </div>
        </div>

        {/* Tiger Features Used */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-400 mb-4">All 5 Tiger features in action:</p>
          <div className="flex flex-wrap justify-center gap-3">
            <span className="px-4 py-2 bg-[#1a1d29] border-2 border-gray-700 rounded-full text-sm font-medium text-gray-300 hover:border-[#FF6B35] transition-colors">
              Zero-Copy Forks
            </span>
            <span className="px-4 py-2 bg-[#1a1d29] border-2 border-gray-700 rounded-full text-sm font-medium text-gray-300 hover:border-[#FF6B35] transition-colors">
              Hybrid Search
            </span>
            <span className="px-4 py-2 bg-[#1a1d29] border-2 border-gray-700 rounded-full text-sm font-medium text-gray-300 hover:border-[#FF6B35] transition-colors">
              Tiger MCP
            </span>
            <span className="px-4 py-2 bg-[#1a1d29] border-2 border-gray-700 rounded-full text-sm font-medium text-gray-300 hover:border-[#FF6B35] transition-colors">
              Fluid Storage
            </span>
            <span className="px-4 py-2 bg-[#1a1d29] border-2 border-gray-700 rounded-full text-sm font-medium text-gray-300 hover:border-[#FF6B35] transition-colors">
              Time-Series
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
