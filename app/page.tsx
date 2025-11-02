import Link from 'next/link';
import { NewHeroSection } from './components/NewHeroSection';
import { NewFeaturesSection } from './components/NewFeaturesSection';
import { NewArchitectureSection } from './components/NewArchitectureSection';
import { NewStatsSection } from './components/NewStatsSection';
import { NewCTASection } from './components/NewCTASection';
import { FortifyLogo } from './components/icons/FortifyLogo';

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Navigation - KEPT AS REQUESTED */}
      <nav className="sticky top-0 z-50 bg-white backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FortifyLogo className="w-8 h-8" />
            <span className="text-xl font-bold text-gray-900">Fortify</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-gray-600 hover:text-[#FF6B35] transition-colors font-medium">Features</a>
            <a href="#architecture" className="text-gray-600 hover:text-[#FF6B35] transition-colors font-medium">Architecture</a>
            <a href="#pricing" className="text-gray-600 hover:text-[#FF6B35] transition-colors font-medium">Pricing</a>
          </div>
          
          <Link href="/dashboard" className="bg-[#FF6B35] hover:bg-[#ff5722] text-white px-6 py-2 rounded-lg font-semibold transition-colors">
            Get Started
          </Link>
        </div>
      </nav>

      {/* NEW MARKETING SECTIONS */}
      <NewHeroSection />
      <NewFeaturesSection />
      <NewArchitectureSection />
      <NewStatsSection />
      <NewCTASection />

      {/* Footer */}
      <footer className="bg-[#1a1d29] text-gray-300 py-12 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <FortifyLogo className="w-8 h-8" />
                <span className="text-xl font-bold text-white">Fortify</span>
              </div>
              <p className="text-sm text-gray-400 mb-2">
                Security analysis powered by Tiger Agentic Postgres
              </p>
              <p className="text-xs text-gray-500">
                Built for Tiger Data Challenge 2025
              </p>
            </div>

            {/* Product */}
            <div>
              <h3 className="text-white font-semibold mb-3 text-sm">Product</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#features" className="text-gray-400 hover:text-[#FF6B35] transition-colors">Features</a></li>
                <li><a href="#architecture" className="text-gray-400 hover:text-[#FF6B35] transition-colors">Architecture</a></li>
                <li><a href="#pricing" className="text-gray-400 hover:text-[#FF6B35] transition-colors">Pricing</a></li>
                <li><a href="/dashboard" className="text-gray-400 hover:text-[#FF6B35] transition-colors">Dashboard</a></li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="text-white font-semibold mb-3 text-sm">Resources</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-400 hover:text-[#FF6B35] transition-colors">Documentation</a></li>
                <li><a href="#" className="text-gray-400 hover:text-[#FF6B35] transition-colors">API Reference</a></li>
                <li><a href="#" className="text-gray-400 hover:text-[#FF6B35] transition-colors">Guides</a></li>
                <li><a href="#" className="text-gray-400 hover:text-[#FF6B35] transition-colors">Support</a></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="text-white font-semibold mb-3 text-sm">Company</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="https://github.com" className="text-gray-400 hover:text-[#FF6B35] transition-colors">GitHub</a></li>
                <li><a href="https://twitter.com" className="text-gray-400 hover:text-[#FF6B35] transition-colors">Twitter</a></li>
                <li><a href="#" className="text-gray-400 hover:text-[#FF6B35] transition-colors">Blog</a></li>
                <li><a href="#" className="text-gray-400 hover:text-[#FF6B35] transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500">
              © 2025 Fortify. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-gray-500">
              <a href="#" className="hover:text-[#FF6B35] transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-[#FF6B35] transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-[#FF6B35] transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
