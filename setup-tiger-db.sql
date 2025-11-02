-- Fortify Tiger Database Setup Script
-- Run this in your Tiger database to set up the schema

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS vector;
CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- Create security patterns table with vector embeddings
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
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for hybrid search
CREATE INDEX IF NOT EXISTS idx_security_patterns_embedding 
    ON security_patterns USING ivfflat (embedding vector_cosine_ops);

CREATE INDEX IF NOT EXISTS idx_security_patterns_description_gin 
    ON security_patterns USING GIN (to_tsvector('english', description));

CREATE INDEX IF NOT EXISTS idx_security_patterns_type 
    ON security_patterns(pattern_type);

-- Create SOC2 controls table
CREATE TABLE IF NOT EXISTS soc2_controls (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    control_id VARCHAR(20) NOT NULL UNIQUE,
    category VARCHAR(50) NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    requirements TEXT[],
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create analysis sessions table
CREATE TABLE IF NOT EXISTS analysis_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code_snapshot TEXT,
    status VARCHAR(50) DEFAULT 'pending',
    progress INTEGER DEFAULT 0,
    current_stage INTEGER DEFAULT 1,
    started_at TIMESTAMPTZ DEFAULT NOW(),
    completed_at TIMESTAMPTZ,
    results JSONB
);

-- Create analysis results table
CREATE TABLE IF NOT EXISTS analysis_results (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID REFERENCES analysis_sessions(id),
    result_type VARCHAR(50) NOT NULL,
    severity VARCHAR(20),
    finding_data JSONB NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert sample security patterns
INSERT INTO security_patterns (pattern_type, description, code_example, fix_recommendation, severity, owasp_category, cwe_id, cvss_score)
VALUES 
    ('SQL Injection', 'Unsanitized user input in SQL queries', 'query = f"SELECT * FROM users WHERE id={user_id}"', 'Use parameterized queries: cursor.execute("SELECT * FROM users WHERE id=%s", (user_id,))', 'critical', 'A03:2021', 'CWE-89', 9.8),
    ('XSS', 'Unescaped user input in HTML output', 'return f"<div>{user_input}</div>"', 'Use HTML escaping: return f"<div>{escape(user_input)}</div>"', 'high', 'A03:2021', 'CWE-79', 7.5),
    ('Command Injection', 'Unsafe command execution with user input', 'os.system(f"convert {filename}")', 'Use subprocess with array: subprocess.run(["convert", filename])', 'critical', 'A03:2021', 'CWE-78', 9.1),
    ('Hardcoded Credentials', 'Credentials stored in source code', 'PASSWORD = "admin123"', 'Use environment variables: PASSWORD = os.getenv("PASSWORD")', 'critical', 'A07:2021', 'CWE-798', 9.0),
    ('Path Traversal', 'Unsanitized file paths', 'open(f"/files/{user_file}")', 'Validate and sanitize paths: safe_path = os.path.join(base_dir, secure_filename(user_file))', 'high', 'A01:2021', 'CWE-22', 8.1)
ON CONFLICT DO NOTHING;

-- Insert sample SOC2 controls
INSERT INTO soc2_controls (control_id, category, title, description, requirements)
VALUES 
    ('CC6.1', 'Security', 'Logical and Physical Access Controls', 'Implement controls to prevent unauthorized access', ARRAY['Access control lists', 'Authentication', 'Authorization']),
    ('CC6.6', 'Security', 'Encryption of Data at Rest', 'Encrypt sensitive data stored in databases', ARRAY['Database encryption', 'Key management', 'Secrets management']),
    ('CC7.2', 'Security', 'System Monitoring', 'Monitor systems for security events', ARRAY['Audit logging', 'Event tracking', 'Alerting']),
    ('P3.2', 'Privacy', 'Personal Information Protection', 'Protect personal information from unauthorized access', ARRAY['Data encryption', 'Access controls', 'Consent management'])
ON CONFLICT DO NOTHING;

-- Create hybrid search function
CREATE OR REPLACE FUNCTION hybrid_search_vulnerabilities(
    query_text TEXT,
    query_embedding vector(1536),
    bm25_weight DECIMAL DEFAULT 0.4,
    vector_weight DECIMAL DEFAULT 0.6,
    result_limit INTEGER DEFAULT 10
)
RETURNS TABLE (
    id UUID,
    pattern_type VARCHAR(100),
    description TEXT,
    code_example TEXT,
    fix_recommendation TEXT,
    severity VARCHAR(20),
    owasp_category VARCHAR(50),
    cwe_id VARCHAR(20),
    cvss_score DECIMAL(3,1),
    similarity_score DECIMAL(5,4)
) AS $$
BEGIN
    RETURN QUERY
    WITH text_matches AS (
        SELECT 
            sp.id,
            sp.pattern_type,
            sp.description,
            sp.code_example,
            sp.fix_recommendation,
            sp.severity,
            sp.owasp_category,
            sp.cwe_id,
            sp.cvss_score,
            ts_rank_cd(
                to_tsvector('english', sp.description),
                websearch_to_tsquery('english', query_text)
            ) as text_score
        FROM security_patterns sp
        WHERE to_tsvector('english', sp.description) @@ 
              websearch_to_tsquery('english', query_text)
    ),
    vector_matches AS (
        SELECT 
            sp.id,
            sp.pattern_type,
            sp.description,
            sp.code_example,
            sp.fix_recommendation,
            sp.severity,
            sp.owasp_category,
            sp.cwe_id,
            sp.cvss_score,
            1 - (sp.embedding <=> query_embedding) as vector_score
        FROM security_patterns sp
        WHERE sp.embedding IS NOT NULL
        ORDER BY sp.embedding <=> query_embedding
        LIMIT result_limit * 2
    )
    SELECT 
        COALESCE(tm.id, vm.id) as id,
        COALESCE(tm.pattern_type, vm.pattern_type) as pattern_type,
        COALESCE(tm.description, vm.description) as description,
        COALESCE(tm.code_example, vm.code_example) as code_example,
        COALESCE(tm.fix_recommendation, vm.fix_recommendation) as fix_recommendation,
        COALESCE(tm.severity, vm.severity) as severity,
        COALESCE(tm.owasp_category, vm.owasp_category) as owasp_category,
        COALESCE(tm.cwe_id, vm.cwe_id) as cwe_id,
        COALESCE(tm.cvss_score, vm.cvss_score) as cvss_score,
        (COALESCE(tm.text_score, 0) * bm25_weight + 
         COALESCE(vm.vector_score, 0) * vector_weight)::DECIMAL(5,4) as similarity_score
    FROM text_matches tm
    FULL OUTER JOIN vector_matches vm ON tm.id = vm.id
    WHERE (COALESCE(tm.text_score, 0) * bm25_weight + 
           COALESCE(vm.vector_score, 0) * vector_weight) > 0.3
    ORDER BY similarity_score DESC
    LIMIT result_limit;
END;
$$ LANGUAGE plpgsql;

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_analysis_sessions_status ON analysis_sessions(status);
CREATE INDEX IF NOT EXISTS idx_analysis_sessions_started ON analysis_sessions(started_at DESC);
CREATE INDEX IF NOT EXISTS idx_analysis_results_session ON analysis_results(session_id);
CREATE INDEX IF NOT EXISTS idx_analysis_results_type ON analysis_results(result_type);

-- Grant permissions (if needed)
-- GRANT ALL ON ALL TABLES IN SCHEMA public TO tsdbadmin;

-- Verify setup
SELECT 'Setup complete!' as status,
       (SELECT COUNT(*) FROM security_patterns) as security_patterns_count,
       (SELECT COUNT(*) FROM soc2_controls) as soc2_controls_count;
