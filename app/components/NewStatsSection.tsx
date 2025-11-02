'use client';

export function NewStatsSection() {
  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Main Stat Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-16">
          <div className="text-center">
            <div className="text-5xl font-bold text-[#FF6B35] mb-2">7s</div>
            <div className="text-gray-600 font-medium">Analysis Time</div>
          </div>
          <div className="text-center">
            <div className="text-5xl font-bold text-[#4285f4] mb-2">89%</div>
            <div className="text-gray-600 font-medium">RAG Accuracy</div>
          </div>
          <div className="text-center">
            <div className="text-5xl font-bold text-[#FF6B35] mb-2">8</div>
            <div className="text-gray-600 font-medium">Parallel Forks</div>
          </div>
          <div className="text-center">
            <div className="text-5xl font-bold text-[#4285f4] mb-2">4</div>
            <div className="text-gray-600 font-medium">Domain Analyses</div>
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
              <h3 className="text-lg font-bold text-gray-900 mb-2">Lightning Fast</h3>
              <p className="text-sm text-gray-600">
                Complete security analysis in just 7 seconds using Tiger's zero-copy fork technology.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 rounded-lg bg-[#4285f4] flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Comprehensive</h3>
              <p className="text-sm text-gray-600">
                Security, compliance, and performance analysis all in one intelligent platform.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 rounded-lg bg-[#FF6B35] flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Scalable</h3>
              <p className="text-sm text-gray-600">
                Handle codebases from 10k to 10M lines with intelligent prioritization.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
