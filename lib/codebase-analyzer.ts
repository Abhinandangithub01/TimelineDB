/**
 * Smart Codebase Analyzer for Large Projects
 * Handles codebases with lakhs of lines intelligently
 */

export interface FileInfo {
  path: string;
  content: string;
  lines: number;
  lastModified?: Date;
  size: number;
}

export interface FileRiskScore {
  file: FileInfo;
  riskScore: number;
  reasons: string[];
  priority: 'critical' | 'high' | 'medium' | 'low' | 'skip';
}

export interface AnalysisStrategy {
  name: 'full' | 'prioritized' | 'parallel' | 'incremental' | 'sampling';
  filesToAnalyze: FileInfo[];
  estimatedTime: number;
  coverage: number;
  reason: string;
}

// Risk scoring patterns
const RISK_PATTERNS = {
  // Critical patterns (100 points)
  authentication: {
    pattern: /auth|login|session|jwt|token|oauth|saml/i,
    score: 100,
    reason: 'Authentication & authorization code'
  },
  payment: {
    pattern: /payment|checkout|stripe|paypal|billing|invoice|credit.*card/i,
    score: 100,
    reason: 'Payment processing'
  },
  secrets: {
    pattern: /password|secret|key|credential|apikey|private.*key|access.*token/i,
    score: 100,
    reason: 'Contains sensitive keywords'
  },
  
  // High priority (80 points)
  api: {
    pattern: /api|endpoint|route|controller|handler/i,
    score: 80,
    reason: 'API endpoint'
  },
  database: {
    pattern: /database|query|sql|orm|model|migration|schema/i,
    score: 80,
    reason: 'Database operations'
  },
  fileUpload: {
    pattern: /upload|file.*upload|attachment|multipart/i,
    score: 80,
    reason: 'File upload handling'
  },
  
  // Medium priority (50 points)
  admin: {
    pattern: /admin|dashboard|manage|config/i,
    score: 50,
    reason: 'Admin functionality'
  },
  userData: {
    pattern: /user|account|profile|settings/i,
    score: 50,
    reason: 'User data handling'
  },
  
  // Low priority (skip or deprioritize)
  test: {
    pattern: /test|spec|mock|fixture|__tests__|\.test\.|\.spec\./i,
    score: -50,
    reason: 'Test file (lower priority)'
  },
  vendor: {
    pattern: /node_modules|vendor|third[_-]party|external|packages/i,
    score: -100,
    reason: 'Third-party code (skip)'
  },
  generated: {
    pattern: /generated|\.min\.|\.bundle\.|dist\/|build\//i,
    score: -100,
    reason: 'Generated code (skip)'
  }
};

/**
 * Calculate risk score for a file
 */
export function calculateRiskScore(file: FileInfo): FileRiskScore {
  let score = 0;
  const reasons: string[] = [];
  const path = file.path.toLowerCase();
  
  // Check each risk pattern
  for (const [category, config] of Object.entries(RISK_PATTERNS)) {
    if (config.pattern.test(path)) {
      score += config.score;
      reasons.push(config.reason);
    }
  }
  
  // Bonus for recently modified files (if available)
  if (file.lastModified) {
    const daysSinceModified = Math.floor(
      (Date.now() - file.lastModified.getTime()) / (1000 * 60 * 60 * 24)
    );
    if (daysSinceModified < 7) {
      score += 20;
      reasons.push('Recently modified (within 7 days)');
    }
  }
  
  // Determine priority
  let priority: FileRiskScore['priority'];
  if (score >= 100) priority = 'critical';
  else if (score >= 80) priority = 'high';
  else if (score >= 40) priority = 'medium';
  else if (score >= 0) priority = 'low';
  else priority = 'skip';
  
  return { file, riskScore: score, reasons, priority };
}

/**
 * Prioritize files by risk score
 */
export function prioritizeFiles(files: FileInfo[]): FileRiskScore[] {
  return files
    .map(file => calculateRiskScore(file))
    .filter(scored => scored.priority !== 'skip') // Remove skip files
    .sort((a, b) => b.riskScore - a.riskScore); // Highest risk first
}

/**
 * Count total lines in codebase
 */
export function countTotalLines(files: FileInfo[]): number {
  return files.reduce((sum, file) => sum + file.lines, 0);
}

/**
 * Estimate tokens from text
 */
export function estimateTokens(text: string): number {
  // Rough estimate: 1 token ≈ 4 characters
  return Math.ceil(text.length / 4);
}

/**
 * Chunk large file into smaller pieces
 */
export function chunkLargeFile(content: string, maxTokens: number = 8000): string[] {
  const chunks: string[] = [];
  const lines = content.split('\n');
  
  let currentChunk: string[] = [];
  let currentTokens = 0;
  
  for (const line of lines) {
    const lineTokens = estimateTokens(line);
    
    if (currentTokens + lineTokens > maxTokens && currentChunk.length > 0) {
      // Current chunk is full, save it
      chunks.push(currentChunk.join('\n'));
      currentChunk = [line];
      currentTokens = lineTokens;
    } else {
      // Add to current chunk
      currentChunk.push(line);
      currentTokens += lineTokens;
    }
  }
  
  // Add remaining chunk
  if (currentChunk.length > 0) {
    chunks.push(currentChunk.join('\n'));
  }
  
  return chunks;
}

/**
 * Determine optimal analysis strategy based on codebase size
 */
export function determineStrategy(files: FileInfo[]): AnalysisStrategy {
  const totalLines = countTotalLines(files);
  const totalFiles = files.length;
  
  console.log(`📊 Codebase Analysis:`);
  console.log(`   Files: ${totalFiles.toLocaleString()}`);
  console.log(`   Lines: ${totalLines.toLocaleString()}`);
  
  if (totalLines < 10_000) {
    // TIER 1: Small codebase - analyze everything
    return {
      name: 'full',
      filesToAnalyze: files,
      estimatedTime: Math.ceil(totalLines / 1000) * 2, // ~2 seconds per 1k lines
      coverage: 100,
      reason: 'Small codebase - full analysis recommended'
    };
    
  } else if (totalLines < 100_000) {
    // TIER 2: Medium codebase - prioritize high-risk files
    const prioritized = prioritizeFiles(files);
    const top50 = prioritized.slice(0, 50).map(s => s.file);
    const selectedLines = countTotalLines(top50);
    
    return {
      name: 'prioritized',
      filesToAnalyze: top50,
      estimatedTime: Math.ceil(selectedLines / 1000) * 3, // ~3 seconds per 1k lines
      coverage: Math.round((selectedLines / totalLines) * 100),
      reason: `Medium codebase - analyzing top 50 high-risk files (${selectedLines.toLocaleString()} lines)`
    };
    
  } else if (totalLines < 1_000_000) {
    // TIER 3: Large codebase - parallel analysis with priority
    const prioritized = prioritizeFiles(files);
    const top200 = prioritized.slice(0, 200).map(s => s.file);
    const selectedLines = countTotalLines(top200);
    
    return {
      name: 'parallel',
      filesToAnalyze: top200,
      estimatedTime: Math.ceil(selectedLines / 1000) * 2, // Parallel processing speeds up
      coverage: Math.round((selectedLines / totalLines) * 100),
      reason: `Large codebase - parallel analysis of top 200 high-risk files across 4 Tiger forks`
    };
    
  } else {
    // TIER 4: Massive codebase - sampling strategy
    const prioritized = prioritizeFiles(files);
    const top1Percent = Math.ceil(files.length * 0.01);
    const sampled = prioritized.slice(0, top1Percent).map(s => s.file);
    const selectedLines = countTotalLines(sampled);
    
    return {
      name: 'sampling',
      filesToAnalyze: sampled,
      estimatedTime: Math.ceil(selectedLines / 1000) * 2,
      coverage: Math.round((selectedLines / totalLines) * 100),
      reason: `Massive codebase - sampling top 1% by risk (${sampled.length} files, ${selectedLines.toLocaleString()} lines). Consider incremental analysis for better coverage.`
    };
  }
}

/**
 * Split files into groups for parallel processing
 */
export function splitIntoGroups<T>(items: T[], groupCount: number): T[][] {
  const groups: T[][] = Array.from({ length: groupCount }, () => []);
  
  items.forEach((item, index) => {
    groups[index % groupCount].push(item);
  });
  
  return groups;
}

/**
 * Get analysis summary for user display
 */
export function getAnalysisSummary(strategy: AnalysisStrategy, totalFiles: number, totalLines: number) {
  const selectedLines = countTotalLines(strategy.filesToAnalyze);
  
  return {
    strategy: strategy.name,
    totalFiles,
    totalLines,
    analyzingFiles: strategy.filesToAnalyze.length,
    analyzingLines: selectedLines,
    coverage: strategy.coverage,
    estimatedTime: strategy.estimatedTime,
    reason: strategy.reason,
    tier: totalLines < 10_000 ? 1 : totalLines < 100_000 ? 2 : totalLines < 1_000_000 ? 3 : 4
  };
}

/**
 * Main analysis function with smart strategy selection
 */
export async function analyzeCodebase(
  files: FileInfo[],
  options: {
    maxTokensPerChunk?: number;
    forceStrategy?: AnalysisStrategy['name'];
    onProgress?: (stage: string, progress: number) => void;
  } = {}
): Promise<{
  strategy: AnalysisStrategy;
  summary: ReturnType<typeof getAnalysisSummary>;
}> {
  
  const totalLines = countTotalLines(files);
  const totalFiles = files.length;
  
  // Determine strategy (or use forced strategy)
  let strategy: AnalysisStrategy;
  if (options.forceStrategy) {
    const prioritized = prioritizeFiles(files);
    strategy = {
      name: options.forceStrategy,
      filesToAnalyze: prioritized.slice(0, 100).map(s => s.file),
      estimatedTime: 0,
      coverage: 0,
      reason: 'User-specified strategy'
    };
  } else {
    strategy = determineStrategy(files);
  }
  
  // Log strategy
  console.log(`\n✅ Selected Strategy: ${strategy.name.toUpperCase()}`);
  console.log(`   Files to analyze: ${strategy.filesToAnalyze.length}`);
  console.log(`   Estimated time: ${strategy.estimatedTime} seconds`);
  console.log(`   Coverage: ~${strategy.coverage}%`);
  console.log(`   Reason: ${strategy.reason}\n`);
  
  // Get summary for UI
  const summary = getAnalysisSummary(strategy, totalFiles, totalLines);
  
  return { strategy, summary };
}

/**
 * Format file size for display
 */
export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

/**
 * Format time duration for display
 */
export function formatDuration(seconds: number): string {
  if (seconds < 60) return seconds + ' seconds';
  if (seconds < 3600) return Math.floor(seconds / 60) + ' minutes';
  return Math.floor(seconds / 3600) + ' hours ' + Math.floor((seconds % 3600) / 60) + ' minutes';
}
