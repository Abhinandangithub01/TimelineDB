'use client';

import { useState } from 'react';
import { LeftNav } from '../components/dashboard/LeftNav';
import { UploadView } from '../components/dashboard/UploadView';
import { AnalysisView } from '../components/dashboard/AnalysisView';
import { CleanResultsView } from '../components/dashboard/CleanResultsView';
import { ErrorBoundary } from '../components/ErrorBoundary';

type View = 'upload' | 'analysis' | 'results';

export default function Dashboard() {
  const [currentView, setCurrentView] = useState<View>('upload');
  const [analysisData, setAnalysisData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);

  const handleStartAnalysis = async (file: File | string) => {
    try {
      setCurrentView('analysis');
      setError(null);
      
      // Prepare request body
      let requestBody: any = {
        options: {
          security: true,
          soc2: true,
          rag: true,
          certifications: true
        }
      };

      // Handle file or URL
      if (typeof file === 'string') {
        // It's a GitHub URL
        requestBody.githubUrl = file;
        requestBody.code = `# GitHub Repository: ${file}\n# Code will be fetched and analyzed\n\n# Sample analysis for repository`;
      } else {
        // It's a file
        const fileContent = await file.text();
        requestBody.code = fileContent;
      }
      
      // Start analysis via API
      const response = await fetch('/api/analysis/start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
        throw new Error(errorData.error || errorData.details || 'Failed to start analysis');
      }

      const { sessionId: newSessionId } = await response.json();
      setSessionId(newSessionId);

      // Wait for analysis to complete (simplified approach)
      // Poll every 2 seconds with timeout
      let attempts = 0;
      const maxAttempts = 90; // 3 minutes max
      
      const checkCompletion = setInterval(async () => {
        attempts++;
        
        try {
          // Try direct fetch without using the problematic dynamic route
          const statusResponse = await fetch('/api/analysis/start', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ checkStatus: true, sessionId: newSessionId })
          });
          
          if (statusResponse.ok) {
            const statusData = await statusResponse.json();
            
            if (statusData.status === 'completed' && statusData.results) {
              clearInterval(checkCompletion);
              setAnalysisData(statusData.results);
              setCurrentView('results');
            } else if (statusData.status === 'error') {
              clearInterval(checkCompletion);
              setError('Analysis failed');
              setCurrentView('upload');
            } else if (statusData.status === 'not_found') {
              // Session not found, keep polling but log it
              console.warn('Session not found yet, continuing to poll...');
            }
          }
        } catch (err) {
          console.error('Status check error:', err);
        }
        
        // Timeout after max attempts
        if (attempts >= maxAttempts) {
          clearInterval(checkCompletion);
          setError('Analysis timed out');
          setCurrentView('upload');
        }
      }, 2000);
      
    } catch (error) {
      console.error('Error starting analysis:', error);
      setError(error instanceof Error ? error.message : 'Failed to start analysis');
      setCurrentView('upload');
    }
  };

  return (
    <ErrorBoundary>
      <div className="flex h-screen bg-bg-main">
        <LeftNav currentView={currentView} onNavigate={setCurrentView} />
        
        <main className="flex-1 overflow-auto">
          {error && (
            <div className="p-6">
              <div className="bg-error/10 border border-error text-error px-4 py-3 rounded">
                <strong>Error:</strong> {error}
              </div>
            </div>
          )}
          
          {currentView === 'upload' && !error && (
            <UploadView onStartAnalysis={handleStartAnalysis} />
          )}
          {currentView === 'analysis' && !error && (
            <AnalysisView 
              sessionId={sessionId || undefined}
              onComplete={(results) => {
                setAnalysisData(results);
                setCurrentView('results');
              }}
            />
          )}
          {currentView === 'results' && analysisData && !error && (
            <CleanResultsView data={analysisData} />
          )}
        </main>
      </div>
    </ErrorBoundary>
  );
}
