'use client';

export function TimelineDemoSection() {
  return (
    <section id="demo" className="py-24 bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] text-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            See the Difference
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Traditional backups vs TimelineDB with Tiger zero-copy forks
          </p>
        </div>

        {/* Comparison */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {/* Traditional Way */}
          <div className="bg-red-500/10 border-2 border-red-500/30 rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-red-400">Traditional Backup</h3>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <span className="text-red-400 mt-1">❌</span>
                <div>
                  <div className="font-semibold text-white mb-1">30+ Minutes</div>
                  <div className="text-sm text-gray-400">Backup and restore time</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-red-400 mt-1">❌</span>
                <div>
                  <div className="font-semibold text-white mb-1">2x Storage Cost</div>
                  <div className="text-sm text-gray-400">Full data duplication per backup</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-red-400 mt-1">❌</span>
                <div>
                  <div className="font-semibold text-white mb-1">High Risk</div>
                  <div className="text-sm text-gray-400">Can't test changes safely</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-red-400 mt-1">❌</span>
                <div>
                  <div className="font-semibold text-white mb-1">Downtime</div>
                  <div className="text-sm text-gray-400">Service interruption during restore</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-red-400 mt-1">❌</span>
                <div>
                  <div className="font-semibold text-white mb-1">No Parallel Testing</div>
                  <div className="text-sm text-gray-400">Can't test multiple strategies</div>
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-8 pt-6 border-t border-red-500/30">
              <div className="text-sm text-gray-400 mb-2">Backup Progress</div>
              <div className="w-full bg-red-500/20 rounded-full h-3">
                <div className="bg-red-500 h-3 rounded-full animate-pulse" style={{ width: '45%' }}></div>
              </div>
              <div className="text-xs text-gray-500 mt-2">13 minutes remaining...</div>
            </div>
          </div>

          {/* TimelineDB Way */}
          <div className="bg-green-500/10 border-2 border-green-500/30 rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-green-400">TimelineDB</h3>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <span className="text-green-400 mt-1">✓</span>
                <div>
                  <div className="font-semibold text-white mb-1">8 Seconds</div>
                  <div className="text-sm text-gray-400">Instant fork creation</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-green-400 mt-1">✓</span>
                <div>
                  <div className="font-semibold text-white mb-1">Zero Storage Overhead</div>
                  <div className="text-sm text-gray-400">Copy-on-write technology</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-green-400 mt-1">✓</span>
                <div>
                  <div className="font-semibold text-white mb-1">Risk-Free Testing</div>
                  <div className="text-sm text-gray-400">Test on isolated forks</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-green-400 mt-1">✓</span>
                <div>
                  <div className="font-semibold text-white mb-1">Zero Downtime</div>
                  <div className="text-sm text-gray-400">Instant rollback if needed</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-green-400 mt-1">✓</span>
                <div>
                  <div className="font-semibold text-white mb-1">Unlimited Parallel Tests</div>
                  <div className="text-sm text-gray-400">Test multiple strategies simultaneously</div>
                </div>
              </div>
            </div>

            {/* Success Message */}
            <div className="mt-8 pt-6 border-t border-green-500/30">
              <div className="flex items-center gap-2 bg-green-500/20 border border-green-500/30 rounded-lg p-4">
                <svg className="w-5 h-5 text-green-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span className="text-sm text-green-300">Fork created successfully in 8 seconds!</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Comparison */}
        <div className="grid md:grid-cols-4 gap-6">
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
            <div className="text-4xl font-bold text-[#06B6D4] mb-2">225x</div>
            <div className="text-sm text-gray-400">Faster Operations</div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
            <div className="text-4xl font-bold text-[#8B5CF6] mb-2">50%</div>
            <div className="text-sm text-gray-400">Storage Savings</div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
            <div className="text-4xl font-bold text-[#6366F1] mb-2">∞</div>
            <div className="text-sm text-gray-400">Parallel Forks</div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
            <div className="text-4xl font-bold text-green-400 mb-2">99.99%</div>
            <div className="text-sm text-gray-400">Uptime</div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <a
            href="/dashboard"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-2xl hover:shadow-[#6366F1]/50 transition-all transform hover:scale-105"
          >
            Try TimelineDB Free
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
          <p className="text-gray-400 mt-4 text-sm">No credit card required • 5 minute setup</p>
        </div>
      </div>
    </section>
  );
}
