'use client';

import Link from 'next/link';
import Image from 'next/image';

export function NewHeroSection() {
  return (
    <section className="bg-[#1a1d29] text-white py-20 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="z-10">
            {/* Badge */}
            <div className="inline-block mb-6">
              <span className="bg-[#FF6B35] text-white px-4 py-2 rounded-full text-sm font-semibold">
                Transform your security analysis with Tiger-powered intelligence →
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Security analysis,
              <br />
              <span className="text-[#FF6B35]">simplified</span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl text-gray-300 mb-4 max-w-xl">
              Two-phase cascading intelligence with 4 specialized AI agents running in parallel on Tiger database forks.
            </p>

            <p className="text-lg text-gray-400 mb-8 max-w-xl">
              Phase 1 tests 4 RAG strategies and picks the winner. Phase 2 uses it for Security, SOC2, ISO 27001, and Performance analysis—all in 7 seconds with 89% accuracy.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/dashboard" 
                className="bg-[#FF6B35] hover:bg-[#ff5722] text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors inline-block text-center"
              >
                TRY FORTIFY FREE
              </Link>
              <button className="bg-transparent border-2 border-white hover:bg-white/10 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors">
                EXPLORE DEMO
              </button>
            </div>
          </div>

          {/* Right Dashboard Preview */}
          <div className="relative lg:block hidden">
            <div className="bg-[#0f1117] rounded-xl border border-gray-700 shadow-2xl overflow-hidden">
              {/* Dashboard Header */}
              <div className="bg-[#1a1d29] border-b border-gray-700 px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#FF6B35] rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <span className="text-white font-semibold">Dashboard</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <span>Search...</span>
                  <kbd className="px-2 py-1 bg-gray-800 rounded text-xs">⌘K</kbd>
                </div>
              </div>

              {/* Dashboard Content */}
              <div className="p-6">
                {/* User Card */}
                <div className="bg-[#1a1d29] rounded-lg p-4 mb-6 border border-gray-700">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#FF6B35] to-[#ff5722] rounded-full flex items-center justify-center text-white font-bold text-lg">
                      A
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">Analysis Results</h3>
                      <p className="text-sm text-gray-400">Completed • 7 seconds</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Security Score</span>
                      <span className="text-[#4CAF50] font-semibold">92/100</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div className="bg-[#4CAF50] h-2 rounded-full" style={{ width: '92%' }}></div>
                    </div>
                  </div>
                </div>

                {/* Activity Feed */}
                <div className="space-y-3">
                  <div className="flex items-start gap-3 bg-[#1a1d29] rounded-lg p-3 border border-gray-700">
                    <div className="w-8 h-8 bg-[#4285f4] rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-white font-medium text-sm mb-1">RAG Strategy Selected</h4>
                      <p className="text-gray-400 text-xs">Hybrid search achieved 89% accuracy</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 bg-[#1a1d29] rounded-lg p-3 border border-gray-700">
                    <div className="w-8 h-8 bg-[#FF6B35] rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-white font-medium text-sm mb-1">Security Scan Complete</h4>
                      <p className="text-gray-400 text-xs">Found 12 vulnerabilities across 4 domains</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#FF6B35] opacity-5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#4285f4] opacity-5 rounded-full blur-3xl"></div>
    </section>
  );
}
