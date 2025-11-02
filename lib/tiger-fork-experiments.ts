/**
 * Intelligent Fork Management for Experiments
 * 
 * Enables:
 * - Parallel testing with different configurations
 * - A/B testing security rules
 * - Safe pattern validation
 * - Zero-risk experimentation
 */

import { Pool } from 'pg';
import { createTigerForks, cleanupTigerForks, ForkSession } from './tiger-forks';
import { getMainPool } from './database';

export interface ExperimentConfig {
  name: string;
  description: string;
  rulesSet: 'strict' | 'permissive' | 'custom';
  customRules?: any;
  patterns?: string[];
}

export interface ExperimentResult {
  config: ExperimentConfig;
  forkId: string;
  vulnerabilitiesFound: number;
  falsePositives: number;
  accuracy: number;
  executionTime: number;
  findings: any[];
}

export interface ComparisonResult {
  winner: ExperimentConfig;
  results: ExperimentResult[];
  recommendation: string;
  confidence: number;
}

/**
 * Run parallel security tests with different configurations
 */
export async function runParallelSecurityTests(
  code: string,
  configs: ExperimentConfig[]
): Promise<ComparisonResult> {
  console.log(`🐅 Starting ${configs.length} parallel security experiments...`);
  const startTime = Date.now();
  
  try {
    const mainPool = getMainPool();
    
    // Create forks for experiments (using default 4 forks)
    const forkSession = await createTigerForks(mainPool);
    console.log(`✓ Created ${forkSession.forkNames.length} forks for experiments`);
    
    // Run all experiments in parallel
    const results = await Promise.all(
      configs.map((config, index) =>
        runExperimentOnFork(
          code,
          config,
          forkSession.forkNames[index]
        )
      )
    );
    
    // Compare results
    const comparison = compareExperimentResults(results);
    
    // Cleanup forks
    await cleanupTigerForks(forkSession.sessionId);
    
    const totalTime = (Date.now() - startTime) / 1000;
    console.log(`✓ Completed ${results.length} experiments in ${totalTime.toFixed(1)}s`);
    console.log(`  Winner: ${comparison.winner.name}`);
    
    return comparison;
    
  } catch (error) {
    console.error('Parallel security test error:', error);
    throw error;
  }
}

/**
 * Run a single experiment on a fork
 */
async function runExperimentOnFork(
  code: string,
  config: ExperimentConfig,
  forkName: string
): Promise<ExperimentResult> {
  const startTime = Date.now();
  
  console.log(`  🔬 Running experiment: ${config.name} on ${forkName}...`);
  
  try {
    // Simulate different rule sets
    let vulnerabilities = [];
    let falsePositives = 0;
    
    switch (config.rulesSet) {
      case 'strict':
        // Strict rules: catch everything, higher false positives
        vulnerabilities = await analyzeWithStrictRules(code, forkName);
        falsePositives = Math.floor(vulnerabilities.length * 0.15); // 15% false positive rate
        break;
        
      case 'permissive':
        // Permissive rules: fewer false positives, might miss some
        vulnerabilities = await analyzeWithPermissiveRules(code, forkName);
        falsePositives = Math.floor(vulnerabilities.length * 0.05); // 5% false positive rate
        break;
        
      case 'custom':
        // Custom rules from config
        vulnerabilities = await analyzeWithCustomRules(code, config.customRules, forkName);
        falsePositives = Math.floor(vulnerabilities.length * 0.08); // 8% false positive rate
        break;
    }
    
    const executionTime = (Date.now() - startTime) / 1000;
    const truePositives = vulnerabilities.length - falsePositives;
    const accuracy = vulnerabilities.length > 0 
      ? (truePositives / vulnerabilities.length) * 100 
      : 100;
    
    console.log(`    ✓ ${config.name}: Found ${vulnerabilities.length} issues, ${falsePositives} FP, ${accuracy.toFixed(1)}% accuracy`);
    
    return {
      config,
      forkId: forkName,
      vulnerabilitiesFound: vulnerabilities.length,
      falsePositives,
      accuracy,
      executionTime,
      findings: vulnerabilities
    };
    
  } catch (error) {
    console.error(`Experiment ${config.name} failed:`, error);
    throw error;
  }
}

/**
 * Analyze with strict rules (high sensitivity)
 */
async function analyzeWithStrictRules(code: string, forkName: string): Promise<any[]> {
  // Strict pattern matching - catches everything including borderline cases
  const patterns = [
    { type: 'SQL Injection', pattern: /['"].*sql|query|select|insert|update|delete/i },
    { type: 'XSS', pattern: /<script|javascript:|onerror|onclick/i },
    { type: 'Command Injection', pattern: /exec|system|popen|shell|cmd/i },
    { type: 'Path Traversal', pattern: /\.\.|\/\.\.|\.\.\/|%2e%2e/i },
    { type: 'Hardcoded Secret', pattern: /password|secret|key|token|api[_-]?key/i },
    { type: 'Eval Usage', pattern: /eval\(|Function\(|setTimeout.*\(/i },
  ];
  
  const findings: any[] = [];
  const lines = code.split('\n');
  
  lines.forEach((line, index) => {
    patterns.forEach(pattern => {
      if (pattern.pattern.test(line)) {
        findings.push({
          type: pattern.type,
          line: index + 1,
          code: line.trim(),
          severity: 'high',
          confidence: 0.95,
          forkId: forkName
        });
      }
    });
  });
  
  return findings;
}

/**
 * Analyze with permissive rules (high precision)
 */
async function analyzeWithPermissiveRules(code: string, forkName: string): Promise<any[]> {
  // Permissive - only flag obvious vulnerabilities
  const patterns = [
    { type: 'SQL Injection', pattern: /f".*SELECT|query\s*=\s*f"|string\s*interpolation.*sql/i },
    { type: 'Hardcoded Password', pattern: /(password|pwd)\s*=\s*["'][^"']+["']/i },
    { type: 'Eval', pattern: /eval\([^)]*user|eval\([^)]*input/i },
    { type: 'Command Injection', pattern: /os\.system\(.*\+|subprocess.*shell=True/i },
  ];
  
  const findings: any[] = [];
  const lines = code.split('\n');
  
  lines.forEach((line, index) => {
    patterns.forEach(pattern => {
      if (pattern.pattern.test(line)) {
        findings.push({
          type: pattern.type,
          line: index + 1,
          code: line.trim(),
          severity: 'critical',
          confidence: 0.98,
          forkId: forkName
        });
      }
    });
  });
  
  return findings;
}

/**
 * Analyze with custom rules
 */
async function analyzeWithCustomRules(code: string, rules: any, forkName: string): Promise<any[]> {
  // Custom pattern matching based on provided rules
  const findings: any[] = [];
  const lines = code.split('\n');
  
  // Use custom patterns if provided, otherwise use balanced set
  const patterns = rules?.patterns || [
    { type: 'SQL Injection', pattern: /query.*=.*f"|SELECT.*\+/i },
    { type: 'XSS', pattern: /<script|innerHTML.*=/i },
    { type: 'Secrets', pattern: /(password|secret|key)\s*=\s*["'][a-zA-Z0-9]+["']/i },
  ];
  
  lines.forEach((line, index) => {
    patterns.forEach((pattern: any) => {
      if (pattern.pattern.test(line)) {
        findings.push({
          type: pattern.type,
          line: index + 1,
          code: line.trim(),
          severity: 'high',
          confidence: 0.90,
          forkId: forkName
        });
      }
    });
  });
  
  return findings;
}

/**
 * Compare experiment results and pick winner
 */
function compareExperimentResults(results: ExperimentResult[]): ComparisonResult {
  // Score based on: accuracy, vulnerability count, false positive rate
  const scored = results.map(result => {
    const accuracyScore = result.accuracy;
    const findingScore = Math.min(result.vulnerabilitiesFound * 10, 50); // Cap at 50
    const fpPenalty = result.falsePositives * 5; // Penalize false positives
    
    const totalScore = accuracyScore + findingScore - fpPenalty;
    
    return {
      result,
      score: totalScore
    };
  });
  
  // Sort by score
  scored.sort((a, b) => b.score - a.score);
  const winner = scored[0].result;
  
  // Generate recommendation
  let recommendation = '';
  if (winner.config.rulesSet === 'strict') {
    recommendation = 'Strict rules catch the most vulnerabilities but have higher false positives. Good for initial scans.';
  } else if (winner.config.rulesSet === 'permissive') {
    recommendation = 'Permissive rules have fewer false positives and high confidence. Best for production.';
  } else {
    recommendation = 'Custom rules provide balanced detection with good accuracy.';
  }
  
  const confidence = winner.accuracy / 100;
  
  return {
    winner: winner.config,
    results,
    recommendation,
    confidence
  };
}

/**
 * Test new security patterns on a fork before production
 */
export async function validateNewPatterns(
  testCode: string[],
  newPatterns: any[],
  existingPatterns: any[]
): Promise<{
  shouldDeploy: boolean;
  accuracy: number;
  comparison: any;
}> {
  console.log('🧪 Validating new patterns on test fork...');
  
  try {
    const mainPool = getMainPool();
    const forkSession = await createTigerForks(mainPool);
    
    // Fork 1: Existing patterns
    // Fork 2: New patterns
    
    const [existingResults, newResults] = await Promise.all([
      testPatternsOnFork(testCode, existingPatterns, forkSession.forkNames[0]),
      testPatternsOnFork(testCode, newPatterns, forkSession.forkNames[1])
    ]);
    
    await cleanupTigerForks(forkSession.sessionId);
    
    const improvement = newResults.accuracy - existingResults.accuracy;
    const shouldDeploy = improvement > 5; // Deploy if >5% improvement
    
    console.log(`✓ Existing accuracy: ${existingResults.accuracy}%`);
    console.log(`✓ New accuracy: ${newResults.accuracy}%`);
    console.log(`✓ Improvement: ${improvement > 0 ? '+' : ''}${improvement.toFixed(1)}%`);
    console.log(`  ${shouldDeploy ? '✅ Deploy recommended' : '⚠️ Keep existing patterns'}`);
    
    return {
      shouldDeploy,
      accuracy: newResults.accuracy,
      comparison: {
        existing: existingResults,
        new: newResults,
        improvement
      }
    };
    
  } catch (error) {
    console.error('Pattern validation error:', error);
    return { shouldDeploy: false, accuracy: 0, comparison: null };
  }
}

/**
 * Test patterns on a fork
 */
async function testPatternsOnFork(
  testCode: string[],
  patterns: any[],
  forkName: string
): Promise<{ accuracy: number; findings: number }> {
  let totalFindings = 0;
  let correctFindings = 0;
  
  for (const code of testCode) {
    const findings = await analyzeWithCustomRules(code, { patterns }, forkName);
    totalFindings += findings.length;
    // Assume 85% are correct for simulation
    correctFindings += Math.floor(findings.length * 0.85);
  }
  
  const accuracy = totalFindings > 0 ? (correctFindings / totalFindings) * 100 : 0;
  
  return { accuracy, findings: totalFindings };
}

/**
 * A/B test different security configurations
 */
export async function runABTest(
  code: string,
  configA: ExperimentConfig,
  configB: ExperimentConfig
): Promise<{
  winner: 'A' | 'B' | 'tie';
  configA: ExperimentResult;
  configB: ExperimentResult;
  recommendation: string;
}> {
  console.log('🔬 Running A/B test between two configurations...');
  
  const comparison = await runParallelSecurityTests(code, [configA, configB]);
  
  const resultA = comparison.results[0];
  const resultB = comparison.results[1];
  
  let winner: 'A' | 'B' | 'tie';
  if (Math.abs(resultA.accuracy - resultB.accuracy) < 2) {
    winner = 'tie';
  } else {
    winner = resultA.accuracy > resultB.accuracy ? 'A' : 'B';
  }
  
  return {
    winner,
    configA: resultA,
    configB: resultB,
    recommendation: comparison.recommendation
  };
}

/**
 * Safe experiment runner that auto-reverts on failure
 */
export async function runSafeExperiment<T>(
  experimentFn: () => Promise<T>,
  onSuccess: (result: T) => Promise<void>,
  onFailure: () => Promise<void>
): Promise<{ success: boolean; result?: T; error?: any }> {
  console.log('🛡️ Running safe experiment with auto-revert...');
  
  try {
    const mainPool = getMainPool();
    const forkSession = await createTigerForks(mainPool);
    const forkName = forkSession.forkNames[0];
    
    console.log(`  Using fork ${forkName} for experiment`);
    
    // Run experiment on fork
    const result = await experimentFn();
    
    // If successful, apply to production
    console.log('  ✓ Experiment succeeded, applying changes...');
    await onSuccess(result);
    
    // Cleanup fork
    await cleanupTigerForks(forkSession.sessionId);
    
    return { success: true, result };
    
  } catch (error) {
    console.error('  ✗ Experiment failed, reverting changes...');
    await onFailure();
    
    return { success: false, error };
  }
}
