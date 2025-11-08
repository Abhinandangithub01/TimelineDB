'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to timeline dashboard
    router.push('/dashboard/timeline');
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-[#6366F1] border-t-transparent mb-4"></div>
        <p className="text-gray-600">Redirecting to TimelineDB...</p>
      </div>
    </div>
  );
}
