'use client';

export function TimelineHowItWorksSection() {
  const steps = [
    {
      number: "01",
      title: "Connect Your Database",
      description: "Point TimelineDB to your PostgreSQL database. Works with any Postgres instance, optimized for Tiger.",
      icon: (
        <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
        </svg>
      )
    },
    {
      number: "02",
      title: "Create Timelines",
      description: "Branch your database instantly with zero-copy forks. Each timeline is an independent workspace.",
      icon: (
        <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      number: "03",
      title: "Test Fearlessly",
      description: "Make changes, run migrations, test features—all without touching production. Rollback anytime.",
      icon: (
        <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      number: "04",
      title: "Merge or Rollback",
      description: "Merge successful changes back to main in 8 seconds. Or rollback instantly if something goes wrong.",
      icon: (
        <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      )
    }
  ];

  return (
    <section id="how-it-works" className="py-24 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            How TimelineDB Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get started in minutes. No complex setup, no infrastructure changes.
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-[#6366F1] to-transparent -translate-x-4"></div>
              )}

              {/* Card */}
              <div className="relative bg-white border-2 border-gray-200 rounded-2xl p-8 hover:border-[#6366F1] hover:shadow-xl transition-all duration-300 h-full">
                {/* Number Badge */}
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
                  {step.number}
                </div>

                {/* Icon */}
                <div className="text-[#6366F1] mb-6 mt-4">
                  {step.icon}
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Code Example */}
        <div className="mt-16 bg-[#1E293B] border-2 border-gray-700 rounded-2xl p-8 shadow-2xl">
          <div className="flex items-center gap-2 mb-6 pb-4 border-b border-gray-700">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <span className="text-sm text-gray-400 ml-4">Quick Start Example</span>
          </div>

          <div className="space-y-4 font-mono text-sm">
            <div className="text-gray-400">
              <span className="text-[#6366F1]">$</span> npm install timelinedb
            </div>
            <div className="text-gray-400">
              <span className="text-[#6366F1]">$</span> timelinedb init
            </div>
            <div className="mt-6 space-y-2">
              <div className="text-gray-500">// Create a timeline</div>
              <div className="text-gray-300">
                <span className="text-[#8B5CF6]">const</span> timeline = <span className="text-[#8B5CF6]">await</span> timelineDB.<span className="text-[#06B6D4]">fork</span>(<span className="text-green-400">'test-feature'</span>);
              </div>
              <div className="mt-4 text-gray-500">// Make changes</div>
              <div className="text-gray-300">
                <span className="text-[#8B5CF6]">await</span> timeline.<span className="text-[#06B6D4]">migrate</span>(<span className="text-green-400">'./migrations/v2.sql'</span>);
              </div>
              <div className="mt-4 text-gray-500">// Merge if successful</div>
              <div className="text-gray-300">
                <span className="text-[#8B5CF6]">await</span> timelineDB.<span className="text-[#06B6D4]">merge</span>(timeline);
              </div>
            </div>
            <div className="mt-6 flex items-start gap-2 bg-[#0F172A] border border-gray-700 rounded p-3">
              <span className="text-green-400">✓</span>
              <span className="text-sm text-gray-300">Timeline merged successfully in 8 seconds!</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
