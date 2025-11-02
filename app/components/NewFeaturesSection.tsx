'use client';

export function NewFeaturesSection() {
  const features = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: 'Two-Phase Cascading Analysis',
      description: 'Phase 1 tests 4 RAG strategies (Vector, BM25, Hybrid, Rerank) in parallel, picks the winner. Phase 2 uses it for all domain analyses.',
      stat: '7 sec total',
      color: 'orange'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: 'Multi-Agent Security Analysis',
      description: '4 specialized AI agents (Security, Compliance, Performance, Remediation) work in parallel on separate Tiger forks.',
      stat: '4 agents',
      color: 'blue'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      ),
      title: 'SOC2 & ISO 27001 Compliance',
      description: 'Automated compliance checking with control mapping (CC6.6, A.10.1, etc.) and detailed remediation guidance for both frameworks.',
      stat: 'Dual certified',
      color: 'orange'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
        </svg>
      ),
      title: 'Tiger Fork Experiments',
      description: 'Run parallel A/B tests, validate new security patterns, and compare configurations using zero-copy database forks.',
      stat: '8 forks',
      color: 'blue'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      title: 'Tiger MCP Integration',
      description: 'Schema recommendations, index suggestions, and performance analysis powered by Model Context Protocol for intelligent coordination.',
      stat: 'MCP-powered',
      color: 'orange'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      ),
      title: 'Hybrid Search (BM25 + Vector)',
      description: 'Combines keyword matching with semantic understanding using pgvectorscale and pg_trgm for optimal accuracy.',
      stat: '89% accurate',
      color: 'blue'
    }
  ];

  return (
    <section id="features" className="py-20 px-6 bg-[#1a1d29]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Everything you need for secure development
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Comprehensive security analysis powered by Tiger Agentic Postgres
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-[#252836] border-2 border-gray-700 rounded-xl p-6 hover:border-[#FF6B35] hover:shadow-xl hover:shadow-[#FF6B35]/10 transition-all group"
            >
              {/* Icon */}
              <div className={`w-14 h-14 rounded-lg flex items-center justify-center mb-4 ${
                feature.color === 'orange' ? 'bg-[#FF6B35] text-white' : 'bg-[#4285f4] text-white'
              }`}>
                {feature.icon}
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-white mb-2">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-gray-400 mb-4 text-sm leading-relaxed">
                {feature.description}
              </p>

              {/* Stat */}
              <div className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                feature.color === 'orange' ? 'bg-[#FF6B35]/10 text-[#FF6B35]' : 'bg-[#4285f4]/10 text-[#4285f4]'
              }`}>
                {feature.stat}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
