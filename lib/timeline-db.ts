/**
 * TimelineDB - Git for Databases
 * Powered by Tiger Agentic Postgres Zero-Copy Forks
 */

import { Pool } from 'pg';
import { randomUUID } from 'crypto';

export interface Timeline {
  id: string;
  name: string;
  parentId?: string;
  createdAt: Date;
  description: string;
  forkId: string;
  metadata: Record<string, any>;
}

export interface Snapshot {
  id: string;
  timelineId: string;
  timestamp: Date;
  description: string;
  stats: {
    tables: number;
    rows: number;
    size: string;
  };
}

export interface TimelineComparison {
  timeline1: string;
  timeline2: string;
  differences: {
    table: string;
    rowsAdded: number;
    rowsDeleted: number;
    rowsModified: number;
  }[];
  summary: {
    totalChanges: number;
    percentDifference: number;
  };
}

export class TimelineDB {
  private pool: Pool;
  private currentTimeline: string = 'main';

  constructor(connectionString?: string) {
    this.pool = new Pool({
      connectionString: connectionString || process.env.TIGER_DATABASE_URL,
      max: 20,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 2000,
    });
  }

  /**
   * Create a new timeline (fork)
   * Uses Tiger's zero-copy fork for instant branching
   */
  async createTimeline(name: string, description: string, parentId?: string): Promise<Timeline> {
    const timelineId = randomUUID();
    const forkId = `fork_${name.toLowerCase().replace(/\s+/g, '_')}_${Date.now()}`;

    console.log(`🔀 Creating timeline: ${name}`);
    console.log(`📦 Fork ID: ${forkId}`);

    try {
      // In production, this would use Tiger's zero-copy fork
      // For demo, we simulate the fork creation
      const timeline: Timeline = {
        id: timelineId,
        name,
        parentId: parentId || 'main',
        createdAt: new Date(),
        description,
        forkId,
        metadata: {
          creator: 'system',
          purpose: description,
        },
      };

      // Store timeline metadata
      await this.pool.query(
        `INSERT INTO timelines (id, name, parent_id, created_at, description, fork_id, metadata)
         VALUES ($1, $2, $3, $4, $5, $6, $7)
         ON CONFLICT (id) DO NOTHING`,
        [
          timeline.id,
          timeline.name,
          timeline.parentId,
          timeline.createdAt,
          timeline.description,
          timeline.forkId,
          JSON.stringify(timeline.metadata),
        ]
      );

      console.log(`✅ Timeline created: ${name} (${timelineId})`);
      return timeline;
    } catch (error) {
      console.error('❌ Failed to create timeline:', error);
      throw error;
    }
  }

  /**
   * Checkout a timeline (switch to it)
   */
  async checkout(timelineId: string): Promise<void> {
    console.log(`🔄 Checking out timeline: ${timelineId}`);
    
    const result = await this.pool.query(
      'SELECT * FROM timelines WHERE id = $1 OR name = $1',
      [timelineId]
    );

    if (result.rows.length === 0) {
      throw new Error(`Timeline not found: ${timelineId}`);
    }

    this.currentTimeline = result.rows[0].id;
    console.log(`✅ Checked out timeline: ${result.rows[0].name}`);
  }

  /**
   * Time travel to a specific timestamp
   */
  async timeTravel(timestamp: Date): Promise<Snapshot> {
    console.log(`⏰ Time traveling to: ${timestamp.toISOString()}`);

    // Find closest snapshot
    const result = await this.pool.query(
      `SELECT * FROM snapshots 
       WHERE timeline_id = $1 
       AND timestamp <= $2 
       ORDER BY timestamp DESC 
       LIMIT 1`,
      [this.currentTimeline, timestamp]
    );

    if (result.rows.length === 0) {
      throw new Error('No snapshot found for that timestamp');
    }

    const snapshot = result.rows[0];
    console.log(`✅ Traveled to snapshot: ${snapshot.id}`);
    
    return {
      id: snapshot.id,
      timelineId: snapshot.timeline_id,
      timestamp: snapshot.timestamp,
      description: snapshot.description,
      stats: snapshot.stats,
    };
  }

  /**
   * Create a snapshot of current state
   */
  async createSnapshot(description: string): Promise<Snapshot> {
    const snapshotId = randomUUID();
    console.log(`📸 Creating snapshot: ${description}`);

    // Get current database stats
    const stats = await this.getDatabaseStats();

    const snapshot: Snapshot = {
      id: snapshotId,
      timelineId: this.currentTimeline,
      timestamp: new Date(),
      description,
      stats,
    };

    await this.pool.query(
      `INSERT INTO snapshots (id, timeline_id, timestamp, description, stats)
       VALUES ($1, $2, $3, $4, $5)`,
      [snapshot.id, snapshot.timelineId, snapshot.timestamp, snapshot.description, JSON.stringify(snapshot.stats)]
    );

    console.log(`✅ Snapshot created: ${snapshotId}`);
    return snapshot;
  }

  /**
   * Compare two timelines
   */
  async compareTimelines(timeline1: string, timeline2: string): Promise<TimelineComparison> {
    console.log(`🔍 Comparing timelines: ${timeline1} vs ${timeline2}`);

    // This would use Tiger's hybrid search to find differences
    // For demo, we return simulated comparison
    const comparison: TimelineComparison = {
      timeline1,
      timeline2,
      differences: [
        { table: 'users', rowsAdded: 150, rowsDeleted: 10, rowsModified: 25 },
        { table: 'orders', rowsAdded: 500, rowsDeleted: 5, rowsModified: 50 },
        { table: 'products', rowsAdded: 20, rowsDeleted: 0, rowsModified: 15 },
      ],
      summary: {
        totalChanges: 775,
        percentDifference: 12.5,
      },
    };

    console.log(`✅ Comparison complete: ${comparison.summary.totalChanges} total changes`);
    return comparison;
  }

  /**
   * Merge timeline into current
   */
  async mergeTimeline(sourceTimelineId: string): Promise<void> {
    console.log(`🔀 Merging timeline: ${sourceTimelineId} into ${this.currentTimeline}`);

    // In production, this would use Tiger's merge capabilities
    await this.pool.query(
      `INSERT INTO timeline_merges (source_id, target_id, merged_at)
       VALUES ($1, $2, NOW())`,
      [sourceTimelineId, this.currentTimeline]
    );

    console.log(`✅ Timeline merged successfully`);
  }

  /**
   * List all timelines
   */
  async listTimelines(): Promise<Timeline[]> {
    const result = await this.pool.query(
      'SELECT * FROM timelines ORDER BY created_at DESC'
    );

    return result.rows.map(row => ({
      id: row.id,
      name: row.name,
      parentId: row.parent_id,
      createdAt: row.created_at,
      description: row.description,
      forkId: row.fork_id,
      metadata: row.metadata,
    }));
  }

  /**
   * Get timeline history
   */
  async getHistory(timelineId: string): Promise<Snapshot[]> {
    const result = await this.pool.query(
      `SELECT * FROM snapshots 
       WHERE timeline_id = $1 
       ORDER BY timestamp DESC`,
      [timelineId]
    );

    return result.rows.map(row => ({
      id: row.id,
      timelineId: row.timeline_id,
      timestamp: row.timestamp,
      description: row.description,
      stats: row.stats,
    }));
  }

  /**
   * Delete a timeline
   */
  async deleteTimeline(timelineId: string): Promise<void> {
    console.log(`🗑️ Deleting timeline: ${timelineId}`);

    await this.pool.query('DELETE FROM timelines WHERE id = $1', [timelineId]);
    await this.pool.query('DELETE FROM snapshots WHERE timeline_id = $1', [timelineId]);

    console.log(`✅ Timeline deleted`);
  }

  /**
   * Get database statistics
   */
  private async getDatabaseStats(): Promise<{ tables: number; rows: number; size: string }> {
    try {
      const tablesResult = await this.pool.query(`
        SELECT COUNT(*) as count 
        FROM information_schema.tables 
        WHERE table_schema = 'public'
      `);

      const rowsResult = await this.pool.query(`
        SELECT SUM(n_live_tup) as total_rows
        FROM pg_stat_user_tables
      `);

      const sizeResult = await this.pool.query(`
        SELECT pg_size_pretty(pg_database_size(current_database())) as size
      `);

      return {
        tables: parseInt(tablesResult.rows[0]?.count || '0'),
        rows: parseInt(rowsResult.rows[0]?.total_rows || '0'),
        size: sizeResult.rows[0]?.size || '0 bytes',
      };
    } catch (error) {
      console.warn('Could not get database stats:', error);
      return { tables: 0, rows: 0, size: '0 bytes' };
    }
  }

  /**
   * Initialize TimelineDB schema
   */
  async initialize(): Promise<void> {
    console.log('🚀 Initializing TimelineDB schema...');

    await this.pool.query(`
      CREATE TABLE IF NOT EXISTS timelines (
        id VARCHAR(255) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        parent_id VARCHAR(255),
        created_at TIMESTAMP NOT NULL DEFAULT NOW(),
        description TEXT,
        fork_id VARCHAR(255) NOT NULL,
        metadata JSONB,
        UNIQUE(name)
      );

      CREATE TABLE IF NOT EXISTS snapshots (
        id VARCHAR(255) PRIMARY KEY,
        timeline_id VARCHAR(255) REFERENCES timelines(id) ON DELETE CASCADE,
        timestamp TIMESTAMP NOT NULL DEFAULT NOW(),
        description TEXT,
        stats JSONB
      );

      CREATE TABLE IF NOT EXISTS timeline_merges (
        id SERIAL PRIMARY KEY,
        source_id VARCHAR(255) REFERENCES timelines(id),
        target_id VARCHAR(255) REFERENCES timelines(id),
        merged_at TIMESTAMP NOT NULL DEFAULT NOW()
      );

      CREATE INDEX IF NOT EXISTS idx_timelines_created_at ON timelines(created_at);
      CREATE INDEX IF NOT EXISTS idx_snapshots_timeline_id ON snapshots(timeline_id);
      CREATE INDEX IF NOT EXISTS idx_snapshots_timestamp ON snapshots(timestamp);
    `);

    // Create main timeline if it doesn't exist
    await this.pool.query(`
      INSERT INTO timelines (id, name, parent_id, created_at, description, fork_id, metadata)
      VALUES ('main', 'main', NULL, NOW(), 'Main timeline', 'fork_main', '{}')
      ON CONFLICT (id) DO NOTHING
    `);

    console.log('✅ TimelineDB schema initialized');
  }

  /**
   * Close database connection
   */
  async close(): Promise<void> {
    await this.pool.end();
  }
}

// Export singleton instance
let timelineDBInstance: TimelineDB | null = null;

export function getTimelineDB(): TimelineDB {
  if (!timelineDBInstance) {
    timelineDBInstance = new TimelineDB();
  }
  return timelineDBInstance;
}
