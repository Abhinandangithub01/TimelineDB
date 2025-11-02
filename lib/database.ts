import { Pool, PoolClient } from 'pg';

// Database connection pools
let mainPool: Pool | null = null;
let vectorPool: Pool | null = null;
let bm25Pool: Pool | null = null;
let hybridPool: Pool | null = null;
let rerankPool: Pool | null = null;

// Initialize main database pool
export function getMainPool(): Pool {
  if (!mainPool) {
    mainPool = new Pool({
      connectionString: process.env.TIGER_DATABASE_URL,
      max: 20,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 2000,
      ssl: process.env.TIGER_DATABASE_URL ? { rejectUnauthorized: false } : undefined,
    });
  }
  return mainPool;
}

// Initialize fork pools for RAG testing
export function getVectorPool(): Pool {
  if (!vectorPool) {
    vectorPool = new Pool({
      connectionString: process.env.TIGER_VECTOR_FORK_URL || process.env.TIGER_DATABASE_URL,
      max: 5,
      ssl: process.env.TIGER_DATABASE_URL ? { rejectUnauthorized: false } : undefined,
    });
  }
  return vectorPool;
}

export function getBM25Pool(): Pool {
  if (!bm25Pool) {
    bm25Pool = new Pool({
      connectionString: process.env.TIGER_BM25_FORK_URL || process.env.TIGER_DATABASE_URL,
      max: 5,
      ssl: process.env.TIGER_DATABASE_URL ? { rejectUnauthorized: false } : undefined,
    });
  }
  return bm25Pool;
}

export function getHybridPool(): Pool {
  if (!hybridPool) {
    hybridPool = new Pool({
      connectionString: process.env.TIGER_HYBRID_FORK_URL || process.env.TIGER_DATABASE_URL,
      max: 5,
      ssl: process.env.TIGER_DATABASE_URL ? { rejectUnauthorized: false } : undefined,
    });
  }
  return hybridPool;
}

export function getRerankPool(): Pool {
  if (!rerankPool) {
    rerankPool = new Pool({
      connectionString: process.env.TIGER_RERANK_FORK_URL || process.env.TIGER_DATABASE_URL,
      max: 5,
      ssl: process.env.TIGER_DATABASE_URL ? { rejectUnauthorized: false } : undefined,
    });
  }
  return rerankPool;
}

// Execute query with error handling
export async function executeQuery<T = any>(
  pool: Pool,
  query: string,
  params?: any[]
): Promise<T[]> {
  const client = await pool.connect();
  try {
    const result = await client.query(query, params);
    return result.rows;
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  } finally {
    client.release();
  }
}

// Test database connection
export async function testConnection(pool: Pool): Promise<boolean> {
  try {
    const result = await executeQuery(pool, 'SELECT NOW() as time');
    console.log('Database connection successful:', result[0]);
    return true;
  } catch (error) {
    console.error('Database connection failed:', error);
    return false;
  }
}

// Close all connections
export async function closeAllPools(): Promise<void> {
  const pools = [mainPool, vectorPool, bm25Pool, hybridPool, rerankPool];
  await Promise.all(
    pools.filter(Boolean).map((pool) => pool?.end())
  );
}

// Initialize database with mock data (for development without Tiger Cloud)
export async function initializeMockData(): Promise<void> {
  const pool = getMainPool();
  
  try {
    // Create tables if they don't exist
    await executeQuery(pool, `
      CREATE TABLE IF NOT EXISTS analysis_sessions (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        code_snapshot TEXT,
        status VARCHAR(50) DEFAULT 'pending',
        created_at TIMESTAMPTZ DEFAULT NOW(),
        completed_at TIMESTAMPTZ
      );
    `);

    console.log('Mock database initialized');
  } catch (error) {
    console.log('Using mock data mode (no database connection)');
  }
}
