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
      console.log('🚀 Starting analysis...', { fileType: typeof file });
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

      // Handle GitHub URL or direct code string
      if (typeof file === 'string') {
        // Check if it's a GitHub URL
        if (file.includes('github.com')) {
          requestBody.githubUrl = file;
          console.log('📦 Using GitHub URL:', file);
        } else {
          // It's pasted code
          requestBody.code = file;
          console.log('📄 Code content length:', file.length, 'characters');
        }
      } else {
        // It's a file (shouldn't happen anymore, but keep for safety)
        const fileContent = await file.text();
        requestBody.code = fileContent;
        console.log('📄 File content length:', fileContent.length, 'characters');
      }
      
      console.log('📤 Sending request to /api/analysis/start');
      
      // Start analysis via API
      const response = await fetch('/api/analysis/start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
      });
      
      console.log('📥 Response status:', response.status, response.statusText);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
        throw new Error(errorData.error || errorData.details || 'Failed to start analysis');
      }

      const { sessionId: newSessionId } = await response.json();
      console.log('✅ Analysis started! Session ID:', newSessionId);
      setSessionId(newSessionId);

      // Wait for analysis to complete (simplified approach)
      // Poll every 2 seconds with timeout
      let attempts = 0;
      const maxAttempts = 90; // 3 minutes max
      
      console.log('🔄 Starting status polling...');
      
      const checkCompletion = setInterval(async () => {
        attempts++;
        console.log(`📊 Status check attempt ${attempts}/${maxAttempts}`);
        
        try {
          // Try direct fetch without using the problematic dynamic route
          const statusResponse = await fetch('/api/analysis/start', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ checkStatus: true, sessionId: newSessionId })
          });
          
          if (statusResponse.ok) {
            const statusData = await statusResponse.json();
            console.log('📊 Status data:', statusData);
            
            if (statusData.status === 'completed' && statusData.results) {
              console.log('✅ Analysis completed successfully!');
              clearInterval(checkCompletion);
              setAnalysisData(statusData.results);
              setCurrentView('results');
            } else if (statusData.status === 'error') {
              console.error('❌ Analysis failed!');
              clearInterval(checkCompletion);
              const errorMessage = statusData.error || statusData.message || 'Analysis failed';
              console.error('Analysis error from server:', statusData);
              setError(`Analysis failed: ${errorMessage}`);
              setCurrentView('upload');
            } else if (statusData.status === 'not_found') {
              // Session not found, keep polling but log it
              console.warn('⚠️ Session not found yet, continuing to poll...');
            } else {
              console.log(`⏳ Status: ${statusData.status}, Progress: ${statusData.progress}%`);
            }
          }
        } catch (err) {
          console.error('❌ Status check error:', err);
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
