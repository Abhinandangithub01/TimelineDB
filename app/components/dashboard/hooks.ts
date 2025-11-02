// Custom hooks for dashboard components
import { useState, useCallback, useMemo } from 'react';
import { SecurityFinding, ChatMessage } from './types';
import { generateAIResponse, downloadFile, generateFixedCode } from './utils';

/**
 * Hook for managing chat functionality
 */
export const useChat = (securityFindings: SecurityFinding[]) => {
  const [showChat, setShowChat] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState('');

  const sendChatMessage = useCallback(async () => {
    if (!chatInput.trim()) return;
    
    const userMessage = chatInput;
    setChatMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setChatInput('');
    
    // Simulate AI response
    setTimeout(() => {
      const response = generateAIResponse(userMessage, securityFindings);
      setChatMessages(prev => [...prev, { role: 'assistant', content: response }]);
    }, 1000);
  }, [chatInput, securityFindings]);

  return {
    showChat,
    setShowChat,
    chatMessages,
    chatInput,
    setChatInput,
    sendChatMessage
  };
};

/**
 * Hook for managing code viewing and copying
 */
export const useCodeActions = () => {
  const [expandedCode, setExpandedCode] = useState<number | null>(null);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyCode = useCallback((code: string, type: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(type);
    setTimeout(() => setCopiedCode(null), 2000);
  }, []);

  const toggleCodeExpansion = useCallback((index: number) => {
    setExpandedCode(prev => prev === index ? null : index);
  }, []);

  return {
    expandedCode,
    copiedCode,
    copyCode,
    toggleCodeExpansion
  };
};

/**
 * Hook for auto-fix functionality
 */
export const useAutoFix = () => {
  const applyAutoFix = useCallback((finding: SecurityFinding) => {
    const fixedContent = generateFixedCode(finding);
    downloadFile(fixedContent, "fixed-" + finding.file);
    alert("✅ Fix applied! Download your updated " + finding.file);
  }, []);

  return { applyAutoFix };
};

/**
 * Hook for export functionality
 */
export const useExport = () => {
  const [showExportMenu, setShowExportMenu] = useState(false);

  const exportToJSON = useCallback((data: any) => {
    const jsonData = JSON.stringify(data, null, 2);
    downloadFile(jsonData, 'fortify-analysis-' + new Date().toISOString().slice(0, 10) + '.json', 'application/json');
    setShowExportMenu(false);
  }, []);

  const exportToPDF = useCallback((report: string) => {
    downloadFile(report, 'fortify-analysis-' + new Date().toISOString().slice(0, 10) + '.txt', 'text/plain');
    setShowExportMenu(false);
  }, []);

  const exportToCSV = useCallback((csv: string) => {
    downloadFile(csv, 'fortify-analysis-' + new Date().toISOString().slice(0, 10) + '.csv', 'text/csv');
    setShowExportMenu(false);
  }, []);

  return {
    showExportMenu,
    setShowExportMenu,
    exportToJSON,
    exportToPDF,
    exportToCSV
  };
};
