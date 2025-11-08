'use client';

import { LeftNavigation } from '../components/LeftNavigation';
import { UserGuideContent } from '../components/UserGuideContent';

export default function UserGuidePage() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <LeftNavigation />
      
      <main className="flex-1 ml-64">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 sticky top-0 z-30">
          <div className="max-w-7xl mx-auto px-8 py-6">
            <h1 className="text-3xl font-bold text-gray-900">User Guide</h1>
            <p className="text-gray-600 mt-2">Complete guide to TimelineDB and Tiger Agentic Postgres</p>
          </div>
        </div>

        <UserGuideContent />
      </main>
    </div>
  );
}
