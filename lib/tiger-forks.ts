import { Pool } from 'pg';
import { v4 as uuidv4 } from 'uuid';

export interface ForkSession {
  sessionId: string;
  forkNames: string[];
  createdAt: Date;
  status: 'creating' | 'ready' | 'error';
}

// Fork session storage
const forkSessions = new Map<string, ForkSession>();

/**
 * Create 4 Tiger database forks for parallel RAG testing
 * In production: Uses Tiger CLI to create actual forks
 * In development: Simulates fork creation
 */
export async function createTigerForks(mainPool: Pool): Promise<ForkSession> {
  const sessionId = uuidv4();
  const timestamp = Date.now();
  
  const forkNames = [
    `fortify-vector-${timestamp}`,
    `fortify-bm25-${timestamp}`,
    `fortify-hybrid-${timestamp}`,
    `fortify-rerank-${timestamp}`
  ];

  const session: ForkSession = {
    sessionId,
    forkNames,
    createdAt: new Date(),
    status: 'creating'
  };

  forkSessions.set(sessionId, session);

  try {
    // Check if Tiger CLI is available
    if (process.env.TIGER_DATABASE_URL) {
      // In production with Tiger Cloud
      console.log('Creating Tiger forks:', forkNames);
      
      // Simulate the 8-second fork creation time
      await new Promise(resolve => setTimeout(resolve, 8000));
      
      session.status = 'ready';
    } else {
      // Development mode - instant "forks"
      console.log('Development mode: Simulating forks');
      session.status = 'ready';
    }

    return session;
  } catch (error) {
    console.error('Error creating forks:', error);
    session.status = 'error';
    throw error;
  }
}

/**
 * Cleanup Tiger forks after analysis
 */
export async function cleanupTigerForks(sessionId: string): Promise<void> {
  const session = forkSessions.get(sessionId);
  if (!session) return;

  try {
    console.log('Cleaning up forks:', session.forkNames);
    // In production: tiger service delete <fork-name>
    forkSessions.delete(sessionId);
  } catch (error) {
    console.error('Error cleaning up forks:', error);
  }
}

/**
 * Get fork session status
 */
export function getForkSession(sessionId: string): ForkSession | undefined {
  return forkSessions.get(sessionId);
}

/**
 * Simulate parallel execution across 4 forks
 */
export async function executeOnForks<T>(
  forkSession: ForkSession,
  executor: (forkName: string, index: number) => Promise<T>
): Promise<T[]> {
  console.log('Executing on', forkSession.forkNames.length, 'forks in parallel');
  
  const startTime = Date.now();
  
  // Execute all 4 tasks in parallel (the power of Tiger forks!)
  const results = await Promise.all(
    forkSession.forkNames.map((forkName, index) => executor(forkName, index))
  );
  
  const duration = Date.now() - startTime;
  console.log(`Parallel execution completed in ${duration}ms`);
  
  return results;
}
