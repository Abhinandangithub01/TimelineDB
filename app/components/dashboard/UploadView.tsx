'use client';

import { useState } from 'react';

interface UploadViewProps {
  onStartAnalysis: (file: File | string) => void;
}

export function UploadView({ onStartAnalysis }: UploadViewProps) {
  const [githubUrl, setGithubUrl] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [pastedCode, setPastedCode] = useState('');
  const [activeTab, setActiveTab] = useState<'file' | 'paste' | 'github'>('file');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      setActiveTab('file');
    }
  };

  const handleSubmit = () => {
    if (activeTab === 'file' && selectedFile) {
      onStartAnalysis(selectedFile);
    } else if (activeTab === 'paste' && pastedCode.trim()) {
      // Create a File object from pasted code
      const blob = new Blob([pastedCode], { type: 'text/plain' });
      const file = new File([blob], 'pasted-code.txt', { type: 'text/plain' });
      onStartAnalysis(file);
    } else if (activeTab === 'github' && githubUrl.trim()) {
      onStartAnalysis(githubUrl);
    }
  };

  return (
    <div className="w-full mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-3">
        Security & Compliance Analysis
      </h1>
      <p className="text-sm text-gray-600 mb-6">
        Upload your code to get started. We'll analyze security vulnerabilities, check SOC2 compliance,
        and recommend certifications.
      </p>

      {/* Upload Card */}
      <div className="bg-white rounded-lg border-2 border-gray-200 p-6 mb-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Upload Code</h2>
        
        {/* Tabs */}
        <div className="flex gap-1 mb-4 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('file')}
            className={`px-4 py-2 text-sm font-medium transition ${
              activeTab === 'file'
                ? 'text-tiger-orange border-b-2 border-tiger-orange'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Upload File
          </button>
          <button
            onClick={() => setActiveTab('paste')}
            className={`px-4 py-2 text-sm font-medium transition ${
              activeTab === 'paste'
                ? 'text-tiger-orange border-b-2 border-tiger-orange'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Paste Code
          </button>
          <button
            onClick={() => setActiveTab('github')}
            className={`px-4 py-2 text-sm font-medium transition ${
              activeTab === 'github'
                ? 'text-tiger-orange border-b-2 border-tiger-orange'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            GitHub URL
          </button>
        </div>

        {/* File Upload Tab */}
        {activeTab === 'file' && (
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-4 hover:border-tiger-orange transition">
          <div className="flex justify-center mb-3">
            <svg className="w-16 h-16 text-tiger-orange" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Folder with fort elements */}
              <path d="M10 30 L40 30 L45 20 L90 20 L90 80 L10 80 Z" fill="currentColor" opacity="0.3" />
              <path d="M10 30 L90 30 L90 80 L10 80 Z" fill="currentColor" opacity="0.6" />
              {/* Fort battlements on folder */}
              <rect x="20" y="25" width="6" height="5" fill="currentColor" />
              <rect x="35" y="25" width="6" height="5" fill="currentColor" />
              <rect x="50" y="25" width="6" height="5" fill="currentColor" />
              <rect x="65" y="25" width="6" height="5" fill="currentColor" />
              <rect x="80" y="25" width="6" height="5" fill="currentColor" />
            </svg>
          </div>
          <p className="text-sm font-semibold text-gray-900 mb-2">Drop your code here</p>
          <p className="text-sm text-gray-600 mb-3">or</p>
          <label className="bg-tiger-orange hover:bg-tiger-dark text-white font-semibold py-2 px-6 rounded-lg cursor-pointer inline-block transition text-sm">
            Browse Files
            <input
              type="file"
              className="hidden"
              accept=".zip,.tar.gz"
              onChange={handleFileChange}
            />
          </label>
          {selectedFile && (
            <p className="mt-3 text-sm text-tiger-orange font-semibold">✓ {selectedFile.name} selected</p>
          )}
          <p className="text-xs text-gray-500 mt-3">
            Supported: .zip, .tar.gz | Max size: 500 MB
          </p>
        </div>
        )}

        {/* Paste Code Tab */}
        {activeTab === 'paste' && (
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-900 mb-2">Paste Your Code</label>
            <textarea
              value={pastedCode}
              onChange={(e) => setPastedCode(e.target.value)}
              placeholder="Paste your code here...&#10;&#10;Example:&#10;username = input('Username: ')&#10;query = f&quot;SELECT * FROM users WHERE username='{username}'&quot;&#10;PASSWORD = 'admin123'"
              className="w-full h-48 px-3 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-tiger-orange font-mono text-sm"
            />
            {pastedCode && (
              <p className="mt-2 text-sm text-tiger-orange font-semibold">✓ {pastedCode.split('\n').length} lines of code</p>
            )}
          </div>
        )}

        {/* GitHub URL Tab */}
        {activeTab === 'github' && (
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-900 mb-2">GitHub Repository URL</label>
            <input
              type="text"
              value={githubUrl}
              onChange={(e) => setGithubUrl(e.target.value)}
              placeholder="https://github.com/username/repository"
              className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-tiger-orange text-sm"
            />
            {githubUrl && (
              <p className="mt-2 text-sm text-tiger-orange font-semibold">✓ URL entered</p>
            )}
          </div>
        )}

        {/* Options */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Analysis Options</h3>
          <div className="space-y-2">
            <label className="flex items-center gap-2">
              <input type="checkbox" defaultChecked className="w-4 h-4 text-tiger-orange" />
              <span className="text-sm text-gray-700">Security vulnerability scan</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" defaultChecked className="w-4 h-4 text-tiger-orange" />
              <span className="text-sm text-gray-700">SOC2 compliance check</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" defaultChecked className="w-4 h-4 text-tiger-orange" />
              <span className="text-sm text-gray-700">ISO 27001 compliance check</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" defaultChecked className="w-4 h-4 text-tiger-orange" />
              <span className="text-sm text-gray-700">RAG strategy evaluation</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" defaultChecked className="w-4 h-4 text-tiger-orange" />
              <span className="text-sm text-gray-700">Certification recommendations</span>
            </label>
          </div>
        </div>

        {/* Start Button */}
        <button
          onClick={handleSubmit}
          disabled={
            (activeTab === 'file' && !selectedFile) ||
            (activeTab === 'paste' && !pastedCode.trim()) ||
            (activeTab === 'github' && !githubUrl.trim())
          }
          className="w-full bg-tiger-orange hover:bg-tiger-dark text-white font-semibold py-3 px-6 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition text-sm"
        >
          Start Analysis →
        </button>
      </div>

      {/* Info Cards */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg border-2 border-gray-200 p-4 text-center">
          <div className="flex justify-center mb-2">
            <svg className="w-12 h-12 text-tiger-orange" viewBox="0 0 100 100" fill="none">
              <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="4" fill="none"/>
              <path d="M35 50 L45 60 L65 40" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
            </svg>
          </div>
          <h3 className="text-base font-bold text-gray-900 mb-1">Fast Analysis</h3>
          <p className="text-sm text-gray-600">Results in under 10 seconds with Tiger's parallel processing</p>
        </div>
        
        <div className="bg-white rounded-lg border-2 border-gray-200 p-4 text-center">
          <div className="flex justify-center mb-2">
            <svg className="w-12 h-12 text-tiger-orange" viewBox="0 0 100 100" fill="none">
              <rect x="20" y="30" width="60" height="50" rx="4" stroke="currentColor" strokeWidth="4" fill="none"/>
              <circle cx="35" cy="50" r="3" fill="currentColor"/>
              <circle cx="50" cy="50" r="3" fill="currentColor"/>
              <circle cx="65" cy="50" r="3" fill="currentColor"/>
            </svg>
          </div>
          <h3 className="text-base font-bold text-gray-900 mb-1">Multi-Agent AI</h3>
          <p className="text-sm text-gray-600">4 specialized agents analyze your code in parallel</p>
        </div>
        
        <div className="bg-white rounded-lg border-2 border-gray-200 p-4 text-center">
          <div className="flex justify-center mb-2">
            <svg className="w-12 h-12 text-tiger-orange" viewBox="0 0 100 100" fill="none">
              <path d="M50 20 L60 40 L80 45 L65 60 L68 80 L50 70 L32 80 L35 60 L20 45 L40 40 Z" stroke="currentColor" strokeWidth="4" fill="none"/>
            </svg>
          </div>
          <h3 className="text-base font-bold text-gray-900 mb-1">Auto-Fix</h3>
          <p className="text-sm text-gray-600">One-click validated fixes powered by Tiger forks</p>
        </div>
      </div>
    </div>
  );
}
