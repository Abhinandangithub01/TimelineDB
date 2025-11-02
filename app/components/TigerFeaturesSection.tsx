import { ForkIcon, HybridSearchIcon, MCPIcon, FluidStorageIcon } from './icons/FeatureIcons';

export function TigerFeaturesSection() {
  return (
    <section id="tiger" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-fortress-black mb-4">
            Powered by Tiger Agentic Postgres
          </h2>
          <p className="text-xl text-fortress-slate max-w-3xl mx-auto">
            Using cascading intelligence with 8 database forks for autonomous optimization
          </p>
          <div className="mt-4 inline-block bg-tiger-orange/10 border-2 border-tiger-orange rounded-full px-6 py-2">
            <span className="text-sm font-bold text-tiger-orange">✨ Two-Phase Analysis Strategy</span>
          </div>
        </div>

        {/* Performance Comparison */}
        <div className="mb-16 bg-tiger-light/20 border-2 border-tiger-orange rounded-lg p-8">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-fortress-slate mb-2">Without Tiger</div>
              <div className="text-4xl font-bold text-fortress-gray">60+ seconds</div>
              <div className="text-sm text-fortress-slate mt-2">Sequential, single method</div>
              <div className="text-xs text-fortress-gray mt-1">No RAG testing, one DB</div>
            </div>
            
            <div className="flex items-center justify-center">
              <div className="text-6xl text-tiger-orange">→</div>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-bold text-tiger-orange mb-2">With Tiger Cascading</div>
              <div className="text-4xl font-bold text-tiger-orange">7 seconds</div>
              <div className="text-sm text-tiger-dark mt-2">8 forks, 2 phases, parallel ⚡</div>
              <div className="text-xs text-tiger-dark mt-1">RAG tested + 4 domains analyzed</div>
            </div>
          </div>
          <div className="text-center mt-6 pt-6 border-t-2 border-tiger-orange/30">
            <div className="text-sm text-fortress-slate">
              <strong className="text-tiger-orange">8.5x faster</strong> • 
              <strong className="text-tiger-orange"> 89% RAG accuracy</strong> (vs 73% single method) • 
              <strong className="text-tiger-orange"> Autonomous optimization</strong>
            </div>
          </div>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {/* Feature 1: Zero-Copy Forks */}
          <div className="card group">
            <div className="flex justify-center mb-4">
              <ForkIcon className="w-16 h-16" />
            </div>
            <h3 className="text-xl font-bold text-fortress-black mb-2">Zero-Copy Forks</h3>
            <div className="text-3xl font-bold text-tiger-orange mb-2">8 forks</div>
            <p className="text-fortress-slate text-sm mb-4">2 phases: 4 RAG + 4 domain forks</p>
            <ul className="space-y-2 text-sm text-fortress-slate">
              <li>✓ Phase 1: Test 4 RAG strategies</li>
              <li>✓ Phase 2: 4 domain analyses</li>
              <li>✓ Zero storage overhead</li>
            </ul>
            <div className="mt-4 bg-fortress-black rounded p-3">
              <code className="text-xs text-success font-mono">
                tiger service fork main --name test<br/>
                # Created in 8 seconds
              </code>
            </div>
          </div>

          {/* Feature 2: Hybrid Search */}
          <div className="card group">
            <div className="flex justify-center mb-4">
              <HybridSearchIcon className="w-16 h-16" />
            </div>
            <h3 className="text-xl font-bold text-fortress-black mb-2">Hybrid Search</h3>
            <div className="text-3xl font-bold text-tiger-orange mb-2">89%</div>
            <p className="text-fortress-slate text-sm mb-4">BM25 + Vector accuracy</p>
            <ul className="space-y-2 text-sm text-fortress-slate">
              <li>✓ Tested: Vector, BM25, Hybrid, Rerank</li>
              <li>✓ Winner: Hybrid (89% accurate)</li>
              <li>✓ 16% better than single method</li>
            </ul>
            <div className="mt-4 bg-fortress-black rounded p-3">
              <code className="text-xs text-success font-mono">
                SELECT * FROM hybrid_search(<br/>
                  code, embedding, 'hybrid'<br/>
                );
              </code>
            </div>
          </div>

          {/* Feature 3: Tiger MCP */}
          <div className="card group">
            <div className="flex justify-center mb-4">
              <MCPIcon className="w-16 h-16" />
            </div>
            <h3 className="text-xl font-bold text-fortress-black mb-2">Tiger MCP</h3>
            <div className="text-3xl font-bold text-tiger-orange mb-2">4 domains</div>
            <p className="text-fortress-slate text-sm mb-4">Security, SOC2, ISO, Performance</p>
            <ul className="space-y-2 text-sm text-fortress-slate">
              <li>✓ Parallel domain analysis</li>
              <li>✓ Autonomous coordination</li>
              <li>✓ All use winning RAG</li>
            </ul>
            <div className="mt-4 bg-fortress-black rounded p-3">
              <code className="text-xs text-success font-mono">
                tiger mcp install<br/>
                # Agents auto-coordinate
              </code>
            </div>
          </div>

          {/* Feature 4: Fluid Storage */}
          <div className="card group">
            <div className="flex justify-center mb-4">
              <FluidStorageIcon className="w-16 h-16" />
            </div>
            <h3 className="text-xl font-bold text-fortress-black mb-2">Fluid Storage</h3>
            <div className="text-3xl font-bold text-tiger-orange mb-2">110k+</div>
            <p className="text-fortress-slate text-sm mb-4">IOPS performance</p>
            <ul className="space-y-2 text-sm text-fortress-slate">
              <li>✓ 8 concurrent forks</li>
              <li>✓ Sub-second queries</li>
              <li>✓ 1.2M+ pattern database</li>
            </ul>
            <div className="mt-4 bg-fortress-black rounded p-3">
              <code className="text-xs text-success font-mono">
                # Avg query: 0.3 seconds<br/>
                # Across 4 forks simultaneously
              </code>
            </div>
          </div>
        </div>

        {/* Technical Architecture - Cascading Strategy */}
        <div className="bg-fortress-black text-white rounded-xl p-8">
          <h3 className="text-2xl font-bold mb-2 text-center">Cascading Intelligence Architecture</h3>
          <p className="text-center text-fortress-gray mb-8">Two-phase autonomous optimization using 8 Tiger forks</p>
          
          <div className="max-w-3xl mx-auto">
            <div className="space-y-6">
              {/* Phase 1 */}
              <div className="border-2 border-tiger-orange rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-tiger-orange flex items-center justify-center text-white font-bold text-lg">1</div>
                  <div>
                    <div className="font-bold text-lg">PHASE 1: RAG Strategy Testing</div>
                    <div className="text-sm text-fortress-gray">2 seconds • 4 forks in parallel</div>
                  </div>
                </div>
                
                <div className="ml-4 space-y-3 font-mono text-sm">
                  <div className="flex items-center gap-2">
                    <div className="text-tiger-light">→ Create 4 RAG testing forks (zero-copy)</div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 ml-4">
                    <div className="bg-fortress-black/50 p-2 rounded border border-tiger-dark">Fork 1: Vector (68%)</div>
                    <div className="bg-fortress-black/50 p-2 rounded border border-tiger-dark">Fork 2: BM25 (73%)</div>
                    <div className="bg-tiger-orange/20 p-2 rounded border border-tiger-orange">Fork 3: Hybrid (89%) ✓</div>
                    <div className="bg-fortress-black/50 p-2 rounded border border-tiger-dark">Fork 4: Rerank (85%)</div>
                  </div>
                  <div className="flex items-center gap-2 mt-3">
                    <div className="text-success">✓ Winner selected: Hybrid (89% accuracy)</div>
                  </div>
                  <div className="text-xs text-fortress-gray">Tiger features: Zero-Copy Forks, Hybrid Search, Fluid Storage</div>
                </div>
              </div>

              {/* Arrow */}
              <div className="text-center text-4xl text-tiger-orange">↓</div>

              {/* Phase 2 */}
              <div className="border-2 border-tiger-orange rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-tiger-orange flex items-center justify-center text-white font-bold text-lg">2</div>
                  <div>
                    <div className="font-bold text-lg">PHASE 2: Domain Analysis (using Hybrid)</div>
                    <div className="text-sm text-fortress-gray">5 seconds • 4 domains in parallel</div>
                  </div>
                </div>
                
                <div className="ml-4 space-y-3 font-mono text-sm">
                  <div className="flex items-center gap-2">
                    <div className="text-tiger-light">→ Create 4 domain forks (all use winning RAG)</div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 ml-4">
                    <div className="bg-tiger-orange/20 p-2 rounded border border-tiger-orange">
                      <div className="font-bold">Security Domain</div>
                      <div className="text-xs text-tiger-light">12 vulnerabilities found</div>
                    </div>
                    <div className="bg-tiger-orange/20 p-2 rounded border border-tiger-orange">
                      <div className="font-bold">SOC2 Domain</div>
                      <div className="text-xs text-tiger-light">60% compliance ready</div>
                    </div>
                    <div className="bg-tiger-orange/20 p-2 rounded border border-tiger-orange">
                      <div className="font-bold">ISO 27001 Domain</div>
                      <div className="text-xs text-tiger-light">100% certification ready</div>
                    </div>
                    <div className="bg-tiger-orange/20 p-2 rounded border border-tiger-orange">
                      <div className="font-bold">Performance Domain</div>
                      <div className="text-xs text-tiger-light">78/100 DB health score</div>
                    </div>
                  </div>
                  <div className="text-xs text-fortress-gray mt-3">Tiger features: Tiger MCP (domain coordination), Fluid Storage, Time-Series</div>
                </div>
              </div>

              {/* Completion */}
              <div className="flex items-center gap-3 justify-center py-4 border-2 border-success rounded-lg bg-success/10">
                <div className="w-10 h-10 rounded-full bg-success flex items-center justify-center text-white font-bold text-xl">✓</div>
                <div>
                  <div className="text-success font-bold text-lg">Complete in 7 seconds!</div>
                  <div className="text-sm text-fortress-gray">8.5x faster • Autonomous optimization • 89% accuracy</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <p className="text-lg text-fortress-slate mb-4">
            This performance is <strong className="text-tiger-orange">impossible without Tiger Agentic Postgres</strong>
          </p>
          <a 
            href="https://www.tigerdata.com/blog/postgres-for-agents"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary inline-block"
          >
            Learn More About Tiger Agentic Postgres →
          </a>
        </div>
      </div>
    </section>
  );
}
