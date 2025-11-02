'use client';

import Link from 'next/link';

export function NewCTASection() {
  return (
    <section className="py-20 px-6 bg-[#1a1d29] text-white">
      <div className="max-w-4xl mx-auto text-center">
        {/* Main CTA */}
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Ready to secure your codebase?
        </h2>
        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Join modern development teams using Fortify for automated security analysis, compliance checking, and performance optimization.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link 
            href="/dashboard" 
            className="bg-[#FF6B35] hover:bg-[#ff5722] text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors inline-block"
          >
            Start Free Analysis
          </Link>
          <a 
            href="#features"
            className="bg-transparent border-2 border-white hover:bg-white/10 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors inline-block"
          >
            Learn More
          </a>
        </div>

        {/* Features List */}
        <div className="grid md:grid-cols-3 gap-6 pt-8 border-t border-gray-700">
          <div className="flex items-center justify-center gap-2 text-gray-300">
            <svg className="w-5 h-5 text-[#4CAF50]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-sm">No credit card required</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-gray-300">
            <svg className="w-5 h-5 text-[#4CAF50]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-sm">Results in 7 seconds</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-gray-300">
            <svg className="w-5 h-5 text-[#4CAF50]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-sm">Powered by Tiger Postgres</span>
          </div>
        </div>
      </div>
    </section>
  );
}
