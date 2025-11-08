'use client';

import { useState, useEffect } from 'react';
import { LeftNavigation } from '@/app/components/LeftNavigation';

interface Timeline {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  parentId?: string;
}

export default function TimelineDashboard() {
  const [timelines, setTimelines] = useState<Timeline[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newTimeline, setNewTimeline] = useState({ name: '', description: '' });

  useEffect(() => {
    loadTimelines();
  }, []);

  const loadTimelines = async () => {
    try {
      const response = await fetch('/api/timeline/list');
      const data = await response.json();
      if (data.success) {
        setTimelines(data.timelines);
      }
    } catch (error) {
      console.error('Failed to load timelines:', error);
    } finally {
      setLoading(false);
    }
  };

  const createTimeline = async () => {
    try {
      const response = await fetch('/api/timeline/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTimeline),
      });

      const data = await response.json();
      if (data.success) {
        setShowCreateModal(false);
        setNewTimeline({ name: '', description: '' });
        loadTimelines();
      }
    } catch (error) {
      console.error('Failed to create timeline:', error);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <LeftNavigation />
      
      {/* Main Content */}
      <div className="flex-1 ml-64">
        <div className="px-8 py-12">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] rounded-2xl p-8 mb-12 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">
                Welcome to TimelineDB
              </h1>
              <p className="text-xl text-white/90">
                Create database branches in 8 seconds. Time travel, test fearlessly, rollback instantly.
              </p>
            </div>
            <div className="hidden lg:block">
              <div className="w-32 h-32 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Section Title */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Your Timelines
          </h2>
          <p className="text-gray-600">
            Manage your database branches, time travel, and compare states.
          </p>
        </div>

        {/* Actions */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex gap-4">
            <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">
              All Timelines
            </button>
            <button className="px-4 py-2 text-gray-600 hover:bg-gray-200 rounded-lg transition-colors">
              Active
            </button>
            <button className="px-4 py-2 text-gray-600 hover:bg-gray-200 rounded-lg transition-colors">
              Archived
            </button>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-[#6366F1] hover:bg-[#4F46E5] text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Create Timeline
          </button>
        </div>

        {/* Timelines Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-[#6366F1] border-t-transparent"></div>
            <p className="mt-4 text-gray-600">Loading timelines...</p>
          </div>
        ) : timelines.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl border-2 border-dashed border-gray-300">
            <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No timelines yet</h3>
            <p className="text-gray-600 mb-6">Create your first timeline to get started</p>
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-[#6366F1] hover:bg-[#4F46E5] text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Create Timeline
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {timelines.map((timeline) => (
              <div
                key={timeline.id}
                className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-[#6366F1] hover:shadow-lg transition-all cursor-pointer"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] rounded-lg flex items-center justify-center text-white font-bold text-xl">
                    {timeline.name[0].toUpperCase()}
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                      <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                      </svg>
                    </button>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2">{timeline.name}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{timeline.description}</p>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">
                    {new Date(timeline.createdAt).toLocaleDateString()}
                  </span>
                  <div className="flex gap-2">
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-semibold">
                      Active
                    </span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200 flex gap-2">
                  <button className="flex-1 px-3 py-2 bg-[#6366F1] text-white rounded-lg hover:bg-[#4F46E5] transition-colors text-sm font-semibold">
                    Checkout
                  </button>
                  <button className="flex-1 px-3 py-2 border-2 border-gray-200 text-gray-700 rounded-lg hover:border-[#6366F1] hover:text-[#6366F1] transition-colors text-sm font-semibold">
                    Fork
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Stats */}
        <div className="mt-12 grid md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl p-6 border-2 border-gray-200">
            <div className="text-3xl font-bold text-[#6366F1] mb-2">{timelines.length}</div>
            <div className="text-sm text-gray-600">Total Timelines</div>
          </div>
          <div className="bg-white rounded-xl p-6 border-2 border-gray-200">
            <div className="text-3xl font-bold text-[#8B5CF6] mb-2">8s</div>
            <div className="text-sm text-gray-600">Avg Fork Time</div>
          </div>
          <div className="bg-white rounded-xl p-6 border-2 border-gray-200">
            <div className="text-3xl font-bold text-[#06B6D4] mb-2">0</div>
            <div className="text-sm text-gray-600">Storage Overhead</div>
          </div>
          <div className="bg-white rounded-xl p-6 border-2 border-gray-200">
            <div className="text-3xl font-bold text-green-500 mb-2">100%</div>
            <div className="text-sm text-gray-600">Uptime</div>
          </div>
        </div>
      </div>

      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Create New Timeline</h2>
            
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Timeline Name
                </label>
                <input
                  type="text"
                  value={newTimeline.name}
                  onChange={(e) => setNewTimeline({ ...newTimeline, name: e.target.value })}
                  placeholder="e.g., feature-branch"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#6366F1] focus:outline-none"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={newTimeline.description}
                  onChange={(e) => setNewTimeline({ ...newTimeline, description: e.target.value })}
                  placeholder="What is this timeline for?"
                  rows={3}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#6366F1] focus:outline-none"
                />
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowCreateModal(false)}
                className="flex-1 px-6 py-3 border-2 border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={createTimeline}
                disabled={!newTimeline.name || !newTimeline.description}
                className="flex-1 px-6 py-3 bg-[#6366F1] hover:bg-[#4F46E5] text-white rounded-lg transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
}
