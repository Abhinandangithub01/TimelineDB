import { NumberBadge } from './icons/FeatureIcons';

export function HowItWorksSection() {
  return (
    <section id="how" className="py-20 bg-fortress-light/30">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-fortress-black mb-16">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <NumberBadge number={1} className="w-20 h-20" />
            </div>
            <h3 className="text-2xl font-bold mb-3">Upload Code</h3>
            <p className="text-fortress-slate">Drop your code or paste GitHub URL</p>
          </div>
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <NumberBadge number={2} className="w-20 h-20" />
            </div>
            <h3 className="text-2xl font-bold mb-3">RAG Test</h3>
            <p className="text-fortress-slate">4 forks test RAG strategies in parallel</p>
          </div>
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <NumberBadge number={3} className="w-20 h-20" />
            </div>
            <h3 className="text-2xl font-bold mb-3">Results Ready</h3>
            <p className="text-fortress-slate">Security + SOC2 + Certifications</p>
          </div>
        </div>
      </div>
    </section>
  );
}
