import { RAGIcon, SecurityIcon, SOC2Icon, CertIcon } from './icons/FeatureIcons';

export function FeaturesGrid() {
  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-fortress-black mb-16">Features</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="card">
            <div className="flex justify-center mb-4">
              <RAGIcon className="w-16 h-16" />
            </div>
            <h3 className="text-xl font-bold mb-2">RAG Testing</h3>
            <p className="text-fortress-slate">Test 4 strategies to find which works best for security</p>
          </div>
          <div className="card">
            <div className="flex justify-center mb-4">
              <SecurityIcon className="w-16 h-16" />
            </div>
            <h3 className="text-xl font-bold mb-2">Security Scanning</h3>
            <p className="text-fortress-slate">OWASP, CWE, CVE with fix suggestions</p>
          </div>
          <div className="card">
            <div className="flex justify-center mb-4">
              <SOC2Icon className="w-16 h-16" />
            </div>
            <h3 className="text-xl font-bold mb-2">SOC2 Compliance</h3>
            <p className="text-fortress-slate">All 5 criteria, audit blockers, $50k+ savings</p>
          </div>
          <div className="card">
            <div className="flex justify-center mb-4">
              <CertIcon className="w-16 h-16" />
            </div>
            <h3 className="text-xl font-bold mb-2">Certifications</h3>
            <p className="text-fortress-slate">CEH, CISSP, CISA personalized roadmap</p>
          </div>
        </div>
      </div>
    </section>
  );
}
