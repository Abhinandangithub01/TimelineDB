import Link from 'next/link';
import { FortifyLogo } from './icons/FortifyLogo';

export function HeroSection() {
  return (
    <section className="py-20 px-6 text-center bg-gradient-to-b from-tiger-light/30 to-white">
      <div className="max-w-5xl mx-auto">
        <FortifyLogo className="w-24 h-24 mx-auto mb-6" />
        <h1 className="text-5xl md:text-6xl font-bold text-fortress-black mb-6">
          Security Analysis with<br />
          <span className="text-tiger-orange">Cascading Intelligence</span>
        </h1>
        <p className="text-xl md:text-2xl text-fortress-slate mb-4">
          Autonomous RAG optimization · 8 Tiger forks · 4 parallel domains
        </p>
        <div className="inline-block bg-tiger-orange/10 border-2 border-tiger-orange rounded-full px-6 py-2 mb-8">
          <span className="text-sm font-bold text-tiger-orange">⚡ 8.5x faster with Tiger Agentic Postgres</span>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <div className="flex items-center gap-2 text-fortress-slate">
            <span className="text-success">✓</span>
            <span>No login required</span>
          </div>
          <div className="flex items-center gap-2 text-fortress-slate">
            <span className="text-success">✓</span>
            <span>Results in 7 seconds</span>
          </div>
          <div className="flex items-center gap-2 text-fortress-slate">
            <span className="text-success">✓</span>
            <span>Powered by Tiger Agentic Postgres</span>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link href="/dashboard" className="btn-primary text-lg px-8 py-4">
            Get Started - Free Analysis
          </Link>
          <a href="#demo" className="btn-secondary text-lg px-8 py-4">
            Watch Demo (3 min)
          </a>
        </div>
        
        {/* Screenshot placeholder */}
        <div className="mt-12 bg-white rounded-xl shadow-xl p-4 border-2 border-tiger-orange">
          <div className="bg-fortress-light rounded-lg h-96 flex items-center justify-center text-fortress-gray">
            [Results Dashboard Screenshot]
          </div>
        </div>
      </div>
    </section>
  );
}
