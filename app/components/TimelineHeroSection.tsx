'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export function TimelineHeroSection() {
  const [currentDemo, setCurrentDemo] = useState(0);

  const demos = [
    {
      title: "Time Travel",
      code: "await timeline.checkout('2024-01-01');",
      result: "✅ Jumped to January 1st in 8 seconds"
    },
    {
      title: "Instant Fork",
      code: "const test = await timeline.fork('test-feature');",
      result: "✅ Created fork in 8 seconds (not 30 minutes!)"
    },
    {
      title: "Compare Timelines",
      code: "await timeline.compare('main', 'feature-branch');",
      result: "✅ Found 1,250 differences"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDemo((prev) => (prev + 1) % demos.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] text-white py-24 overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#6366F1] rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#8B5CF6] rounded-full filter blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Content */}
          <div>
            <div className="inline-flex items-center gap-2 bg-[#6366F1]/20 border border-[#6366F1]/30 rounded-full px-4 py-2 mb-6">
              <span className="w-2 h-2 bg-[#06B6D4] rounded-full animate-pulse"></span>
              <span className="text-sm font-medium text-[#06B6D4]">Powered by Tiger Agentic Postgres</span>
            </div>

            <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              What if you could
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#6366F1] to-[#8B5CF6]">
                Ctrl+Z
              </span>
              your entire database?
            </h1>

            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              TimelineDB gives you <strong>Git-like superpowers</strong> for databases.
              Time travel, instant branching, and zero-copy forks—all in <strong>8 seconds</strong>.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link
                href="/dashboard"
                className="bg-[#6366F1] hover:bg-[#4F46E5] text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all transform hover:scale-105 shadow-lg shadow-[#6366F1]/50 text-center"
              >
                Try TimelineDB Free
              </Link>
              <a
                href="#demo"
                className="border-2 border-[#6366F1] text-white hover:bg-[#6366F1]/10 px-8 py-4 rounded-lg font-semibold text-lg transition-colors text-center"
              >
                Watch Demo
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              <div>
                <div className="text-3xl font-bold text-[#06B6D4]">8s</div>
                <div className="text-sm text-gray-400">Fork Creation</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-[#8B5CF6]">0</div>
                <div className="text-sm text-gray-400">Data Duplication</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-[#6366F1]">∞</div>
                <div className="text-sm text-gray-400">Parallel Tests</div>
              </div>
            </div>
          </div>

          {/* Right: Interactive Demo */}
          <div className="relative">
            <div className="bg-[#1E293B] border border-gray-700 rounded-xl p-6 shadow-2xl">
              {/* Terminal Header */}
              <div className="flex items-center gap-2 mb-4 pb-4 border-b border-gray-700">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <span className="text-sm text-gray-400 ml-4">timelinedb-demo.ts</span>
              </div>

              {/* Code Demo */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <span className="text-[#6366F1]">$</span>
                  <span className="text-gray-500">// {demos[currentDemo].title}</span>
                </div>
                
                <div className="font-mono text-sm">
                  <span className="text-[#8B5CF6]">{demos[currentDemo].code}</span>
                </div>

                <div className="flex items-start gap-2 bg-[#0F172A] border border-gray-700 rounded p-3">
                  <span className="text-green-400">→</span>
                  <span className="text-sm text-gray-300">{demos[currentDemo].result}</span>
                </div>

                {/* Progress dots */}
                <div className="flex justify-center gap-2 pt-4">
                  {demos.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentDemo(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentDemo ? 'bg-[#6366F1] w-6' : 'bg-gray-600'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 bg-[#6366F1] text-white px-4 py-2 rounded-lg shadow-lg text-sm font-semibold animate-bounce">
              Zero-Copy Forks!
            </div>
            <div className="absolute -bottom-4 -left-4 bg-[#8B5CF6] text-white px-4 py-2 rounded-lg shadow-lg text-sm font-semibold">
              8 Second Branching
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
