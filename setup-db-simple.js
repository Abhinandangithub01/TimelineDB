// Simple Node.js script to set up Tiger database
const { Client } = require('pg');

// Disable SSL certificate validation for self-signed certs
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const connectionString = 'postgres://tsdbadmin:ut93pxbc1tnkdne6@be7s3a5lg8.b7upewy6bk.tsdb.cloud.timescale.com:30404/tsdb?sslmode=require';

async function setupDatabase() {
  const client = new Client({ 
    connectionString,
    ssl: { rejectUnauthorized: false } // Accept self-signed certificates
  });
  
  try {
    console.log('🐅 Connecting to Tiger database...');
    await client.connect();
    console.log('✅ Connected!');
    
    // Enable extensions
    console.log('📦 Enabling extensions...');
    await client.query('CREATE EXTENSION IF NOT EXISTS vector');
    await client.query('CREATE EXTENSION IF NOT EXISTS pg_trgm');
    
    // Try to enable pg_textsearch (Tiger's BM25 extension)
    try {
      await client.query('CREATE EXTENSION IF NOT EXISTS pg_textsearch');
      console.log('✅ pg_textsearch enabled (BM25 ranking)');
    } catch (err) {
      console.log('⚠️  pg_textsearch not available (using standard full-text search)');
    }
    
    console.log('✅ Extensions enabled');
    
    // Create security_patterns table
    console.log('📊 Creating security_patterns table...');
    await client.query(`
      CREATE TABLE IF NOT EXISTS security_patterns (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        pattern_type VARCHAR(100) NOT NULL,
        description TEXT NOT NULL,
        code_example TEXT,
        fix_recommendation TEXT,
        severity VARCHAR(20) DEFAULT 'medium',
        owasp_category VARCHAR(50),
        cwe_id VARCHAR(20),
        cvss_score DECIMAL(3,1),
        embedding vector(1536),
        created_at TIMESTAMPTZ DEFAULT NOW()
      )
    `);
    console.log('✅ security_patterns table created');
    
    // Create indexes
    console.log('🔍 Creating indexes...');
    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_security_patterns_description_gin 
      ON security_patterns USING GIN (to_tsvector('english', description))
    `);
    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_security_patterns_type 
      ON security_patterns(pattern_type)
    `);
    console.log('✅ Indexes created');
    
    // Insert sample data
    console.log('📝 Inserting sample security patterns...');
    await client.query(`
      INSERT INTO security_patterns (pattern_type, description, code_example, fix_recommendation, severity, owasp_category, cwe_id, cvss_score)
      VALUES 
        ('SQL Injection', 'Unsanitized user input in SQL queries', 'query = f"SELECT * FROM users WHERE id={user_id}"', 'Use parameterized queries', 'critical', 'A03:2021', 'CWE-89', 9.8),
        ('XSS', 'Unescaped user input in HTML output', 'return f"<div>{user_input}</div>"', 'Use HTML escaping', 'high', 'A03:2021', 'CWE-79', 7.5),
        ('Command Injection', 'Unsafe command execution', 'os.system(f"convert {filename}")', 'Use subprocess with array', 'critical', 'A03:2021', 'CWE-78', 9.1),
        ('Hardcoded Credentials', 'Credentials in source code', 'PASSWORD = "admin123"', 'Use environment variables', 'critical', 'A07:2021', 'CWE-798', 9.0),
        ('Path Traversal', 'Unsanitized file paths', 'open(f"/files/{user_file}")', 'Validate paths', 'high', 'A01:2021', 'CWE-22', 8.1)
      ON CONFLICT DO NOTHING
    `);
    console.log('✅ Sample data inserted');
    
    // Create SOC2 controls table
    console.log('📊 Creating soc2_controls table...');
    await client.query(`
      CREATE TABLE IF NOT EXISTS soc2_controls (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        control_id VARCHAR(20) NOT NULL UNIQUE,
        category VARCHAR(50) NOT NULL,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        created_at TIMESTAMPTZ DEFAULT NOW()
      )
    `);
    
    await client.query(`
      INSERT INTO soc2_controls (control_id, category, title, description)
      VALUES 
        ('CC6.1', 'Security', 'Logical and Physical Access Controls', 'Implement controls to prevent unauthorized access'),
        ('CC6.6', 'Security', 'Encryption of Data at Rest', 'Encrypt sensitive data stored in databases'),
        ('CC7.2', 'Security', 'System Monitoring', 'Monitor systems for security events'),
        ('P3.2', 'Privacy', 'Personal Information Protection', 'Protect personal information from unauthorized access')
      ON CONFLICT DO NOTHING
    `);
    console.log('✅ SOC2 controls created');
    
    // Create analysis_sessions table
    console.log('📊 Creating analysis_sessions table...');
    await client.query(`
      CREATE TABLE IF NOT EXISTS analysis_sessions (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        code_snapshot TEXT,
        status VARCHAR(50) DEFAULT 'pending',
        progress INTEGER DEFAULT 0,
        current_stage INTEGER DEFAULT 1,
        started_at TIMESTAMPTZ DEFAULT NOW(),
        completed_at TIMESTAMPTZ,
        results JSONB
      )
    `);
    console.log('✅ analysis_sessions table created');
    
    // Verify setup
    const result = await client.query('SELECT COUNT(*) FROM security_patterns');
    console.log(`\n🎉 Setup complete! ${result.rows[0].count} security patterns loaded.`);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  } finally {
    await client.end();
  }
}

setupDatabase();
