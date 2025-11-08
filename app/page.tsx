import Link from 'next/link';
import { TimelineHeroSection } from './components/TimelineHeroSection';
import { TimelineFeaturesSection } from './components/TimelineFeaturesSection';
import { TimelineHowItWorksSection } from './components/TimelineHowItWorksSection';
import { TimelineDemoSection } from './components/TimelineDemoSection';
import { TimelineDBLogo } from './components/icons/TimelineDBLogo';

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Navigation - KEPT AS REQUESTED */}
      <nav className="sticky top-0 z-50 bg-white backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TimelineDBLogo className="w-8 h-8" />
            <span className="text-xl font-bold text-gray-900">TimelineDB</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-gray-600 hover:text-[#6366F1] transition-colors font-medium">Features</a>
            <a href="#how-it-works" className="text-gray-600 hover:text-[#6366F1] transition-colors font-medium">How It Works</a>
            <a href="#demo" className="text-gray-600 hover:text-[#6366F1] transition-colors font-medium">Demo</a>
          </div>
          
          <Link href="/dashboard" className="bg-[#6366F1] hover:bg-[#4F46E5] text-white px-6 py-2 rounded-lg font-semibold transition-colors">
            Try TimelineDB
          </Link>
        </div>
      </nav>

      {/* TIMELINEDB SECTIONS */}
      <TimelineHeroSection />
      <TimelineFeaturesSection />
      <TimelineHowItWorksSection />
      <TimelineDemoSection />

      {/* Footer */}
      <footer className="bg-[#1a1d29] text-gray-300 py-12 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <TimelineDBLogo className="w-8 h-8" />
                <span className="text-xl font-bold text-white">TimelineDB</span>
              </div>
              <p className="text-sm text-gray-400 mb-2">
                Git for Databases - Powered by Tiger Agentic Postgres
              </p>
              <p className="text-xs text-gray-500">
                Built for Tiger Data Challenge 2025
              </p>
            </div>

            {/* Product */}
            <div>
              <h3 className="text-white font-semibold mb-3 text-sm">Product</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#features" className="text-gray-400 hover:text-[#6366F1] transition-colors">Features</a></li>
                <li><a href="#how-it-works" className="text-gray-400 hover:text-[#6366F1] transition-colors">How It Works</a></li>
                <li><a href="#demo" className="text-gray-400 hover:text-[#6366F1] transition-colors">Demo</a></li>
                <li><a href="/dashboard" className="text-gray-400 hover:text-[#6366F1] transition-colors">Dashboard</a></li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="text-white font-semibold mb-3 text-sm">Resources</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="https://github.com/Abhinandangithub01/TimelineDB" className="text-gray-400 hover:text-[#6366F1] transition-colors">Documentation</a></li>
                <li><a href="https://github.com/Abhinandangithub01/TimelineDB#api-reference" className="text-gray-400 hover:text-[#6366F1] transition-colors">API Reference</a></li>
                <li><a href="https://github.com/Abhinandangithub01/TimelineDB#how-it-works" className="text-gray-400 hover:text-[#6366F1] transition-colors">Guides</a></li>
                <li><a href="https://github.com/Abhinandangithub01/TimelineDB/issues" className="text-gray-400 hover:text-[#6366F1] transition-colors">Support</a></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="text-white font-semibold mb-3 text-sm">Company</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="https://github.com/Abhinandangithub01/TimelineDB" className="text-gray-400 hover:text-[#6366F1] transition-colors">GitHub</a></li>
                <li><a href="https://twitter.com" className="text-gray-400 hover:text-[#6366F1] transition-colors">Twitter</a></li>
                <li><a href="https://dev.to/challenges/agentic-postgres-2025-10-22" className="text-gray-400 hover:text-[#6366F1] transition-colors">Tiger Challenge</a></li>
                <li><a href="mailto:support@timelinedb.io" className="text-gray-400 hover:text-[#6366F1] transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500">
              © 2025 TimelineDB. Built with ❤️ for Tiger Data Challenge.
            </p>
            <div className="flex gap-6 text-sm text-gray-500">
              <a href="#" className="hover:text-[#6366F1] transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-[#6366F1] transition-colors">Terms of Service</a>
              <a href="https://github.com/Abhinandangithub01/TimelineDB/blob/main/LICENSE" className="hover:text-[#6366F1] transition-colors">MIT License</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
