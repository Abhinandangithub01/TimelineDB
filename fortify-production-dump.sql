-- Fortify Production Database Dump
-- For Tiger Cloud Import

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS vector;
CREATE EXTENSION IF NOT EXISTS pg_trgm;
CREATE EXTENSION IF NOT EXISTS timescaledb CASCADE;

-- Drop existing tables if they exist
DROP TABLE IF EXISTS analysis_results CASCADE;
DROP TABLE IF EXISTS analysis_sessions CASCADE;
DROP TABLE IF EXISTS soc2_controls CASCADE;
DROP TABLE IF EXISTS security_patterns CASCADE;

-- Create security_patterns table with vector embeddings
CREATE TABLE security_patterns (
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
CREATE INDEX idx_security_patterns_embedding ON security_patterns USING ivfflat (embedding vector_cosine_ops) WITH (lists = 100);
CREATE INDEX idx_security_patterns_description_gin ON security_patterns USING GIN (to_tsvector('english', description));
CREATE INDEX idx_security_patterns_type ON security_patterns(pattern_type);
CREATE INDEX idx_security_patterns_severity ON security_patterns(severity);

-- Create SOC2 controls table
CREATE TABLE soc2_controls (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    control_id VARCHAR(20) NOT NULL UNIQUE,
    category VARCHAR(50) NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    requirements TEXT[],
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_soc2_controls_category ON soc2_controls(category);
CREATE INDEX idx_soc2_controls_control_id ON soc2_controls(control_id);

-- Create analysis sessions table (TimescaleDB hypertable)
CREATE TABLE analysis_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code_snapshot TEXT,
    status VARCHAR(50) DEFAULT 'pending',
    progress INTEGER DEFAULT 0,
    current_stage INTEGER DEFAULT 1,
    started_at TIMESTAMPTZ DEFAULT NOW(),
    completed_at TIMESTAMPTZ,
    results JSONB,
    ai_provider VARCHAR(50),
    analysis_duration_ms INTEGER
);

-- Convert to hypertable for time-series analytics
SELECT create_hypertable('analysis_sessions', 'started_at', if_not_exists => TRUE);

CREATE INDEX idx_analysis_sessions_status ON analysis_sessions(status);
CREATE INDEX idx_analysis_sessions_started ON analysis_sessions(started_at DESC);

-- Create analysis results table
CREATE TABLE analysis_results (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID REFERENCES analysis_sessions(id) ON DELETE CASCADE,
    result_type VARCHAR(50) NOT NULL,
    severity VARCHAR(20),
    finding_data JSONB NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_analysis_results_session ON analysis_results(session_id);
CREATE INDEX idx_analysis_results_type ON analysis_results(result_type);
CREATE INDEX idx_analysis_results_severity ON analysis_results(severity);

-- Insert comprehensive security patterns
INSERT INTO security_patterns (pattern_type, description, code_example, fix_recommendation, severity, owasp_category, cwe_id, cvss_score) VALUES
-- Critical vulnerabilities
('SQL Injection', 'Unsanitized user input in SQL queries allowing database manipulation', 'query = f"SELECT * FROM users WHERE username=''{username}''"', 'Use parameterized queries: cursor.execute("SELECT * FROM users WHERE username=%s", (username,))', 'critical', 'A03:2021', 'CWE-89', 9.8),
('Command Injection', 'Unsafe command execution with user-controlled input', 'os.system(f"convert {filename}")', 'Use subprocess with array: subprocess.run(["convert", filename], check=True)', 'critical', 'A03:2021', 'CWE-78', 9.1),
('Hardcoded Credentials', 'Credentials stored in plain text in source code', 'PASSWORD = "admin123"\nDATABASE_URL = "postgres://admin:pass@localhost/db"', 'Use environment variables: PASSWORD = os.getenv("PASSWORD")', 'critical', 'A07:2021', 'CWE-798', 9.0),
('Path Traversal', 'Unsanitized file paths allowing directory traversal attacks', 'open(f"/files/{user_file}")', 'Validate paths: safe_path = os.path.join(base_dir, secure_filename(user_file))', 'critical', 'A01:2021', 'CWE-22', 8.6),
('Insecure Deserialization', 'Unsafe deserialization of untrusted data', 'pickle.loads(user_data)', 'Use safe serialization: json.loads(user_data)', 'critical', 'A08:2021', 'CWE-502', 9.0),

-- High severity vulnerabilities
('XSS', 'Unescaped user input in HTML output enabling script injection', 'return f"<div>{user_input}</div>"', 'Use HTML escaping: return f"<div>{escape(user_input)}</div>"', 'high', 'A03:2021', 'CWE-79', 7.5),
('CSRF', 'Missing CSRF token validation on state-changing operations', 'def transfer_money(request): amount = request.POST["amount"]', 'Add CSRF protection: @csrf_protect decorator and validate tokens', 'high', 'A01:2021', 'CWE-352', 8.1),
('Weak Cryptography', 'Use of weak or broken cryptographic algorithms', 'hashlib.md5(password).hexdigest()', 'Use strong algorithms: bcrypt.hashpw(password, bcrypt.gensalt())', 'high', 'A02:2021', 'CWE-327', 7.4),
('XML External Entity', 'Unsafe XML parsing allowing XXE attacks', 'tree = ET.parse(user_xml)', 'Disable external entities: parser = ET.XMLParser(resolve_entities=False)', 'high', 'A05:2021', 'CWE-611', 8.2),
('Insecure Direct Object Reference', 'Direct access to objects without authorization checks', 'file = File.objects.get(id=request.GET["id"])', 'Add authorization: if file.owner == request.user: ...', 'high', 'A01:2021', 'CWE-639', 7.7),

-- Medium severity vulnerabilities
('Information Disclosure', 'Sensitive information exposed in error messages or logs', 'except Exception as e: return str(e)', 'Generic error messages: return "An error occurred"', 'medium', 'A04:2021', 'CWE-209', 5.3),
('Missing Authentication', 'Endpoints accessible without authentication', 'def admin_panel(request): return render("admin.html")', 'Add authentication: @login_required decorator', 'medium', 'A07:2021', 'CWE-306', 6.5),
('Insecure Session Management', 'Weak session handling or token generation', 'session_id = str(random.randint(1000, 9999))', 'Use secure tokens: session_id = secrets.token_urlsafe(32)', 'medium', 'A07:2021', 'CWE-384', 6.8),
('Missing Rate Limiting', 'No rate limiting on sensitive endpoints', 'def login(request): authenticate(username, password)', 'Add rate limiting: @ratelimit(key="ip", rate="5/m")', 'medium', 'A07:2021', 'CWE-307', 5.9),
('Insufficient Logging', 'Critical security events not logged', 'def login(request): if authenticate(): return success', 'Add logging: logger.info(f"Login attempt: {username}")', 'medium', 'A09:2021', 'CWE-778', 5.0);

-- Insert SOC2 controls
INSERT INTO soc2_controls (control_id, category, title, description, requirements) VALUES
-- Common Criteria
('CC1.1', 'Control Environment', 'Demonstrates Commitment to Integrity and Ethical Values', 'The entity demonstrates a commitment to integrity and ethical values', ARRAY['Code of conduct', 'Ethics training', 'Whistleblower policy']),
('CC6.1', 'Security', 'Logical and Physical Access Controls', 'Implements controls to prevent unauthorized access to systems and data', ARRAY['Access control lists', 'Authentication mechanisms', 'Authorization checks', 'Physical security']),
('CC6.6', 'Security', 'Encryption of Data at Rest', 'Encrypts sensitive data stored in databases and file systems', ARRAY['Database encryption', 'File encryption', 'Key management', 'Secrets management']),
('CC6.7', 'Security', 'Encryption of Data in Transit', 'Encrypts data transmitted over networks', ARRAY['TLS/SSL', 'VPN', 'Secure protocols']),
('CC7.1', 'Security', 'Detects Security Events', 'Identifies and detects security events and incidents', ARRAY['IDS/IPS', 'SIEM', 'Log monitoring', 'Alerting']),
('CC7.2', 'Security', 'System Monitoring', 'Monitors systems for security events and anomalies', ARRAY['Audit logging', 'Event tracking', 'Performance monitoring', 'Alerting systems']),
('CC7.3', 'Security', 'Evaluates Security Events', 'Analyzes and evaluates detected security events', ARRAY['Incident response', 'Threat analysis', 'Forensics']),
('CC8.1', 'Change Management', 'Manages Changes', 'Manages changes to system components', ARRAY['Change control', 'Testing', 'Approval process', 'Rollback procedures']),

-- Privacy Criteria
('P1.1', 'Privacy', 'Privacy Notice', 'Provides notice about privacy practices', ARRAY['Privacy policy', 'Data collection disclosure', 'User consent']),
('P2.1', 'Privacy', 'Choice and Consent', 'Provides choice and obtains consent', ARRAY['Opt-in/opt-out', 'Consent management', 'Cookie consent']),
('P3.1', 'Privacy', 'Collection', 'Collects personal information consistent with notice', ARRAY['Data minimization', 'Purpose limitation', 'Consent verification']),
('P3.2', 'Privacy', 'Personal Information Protection', 'Protects personal information from unauthorized access', ARRAY['Data encryption', 'Access controls', 'Data classification', 'DLP']),
('P4.1', 'Privacy', 'Use and Retention', 'Uses and retains personal information consistent with notice', ARRAY['Data retention policy', 'Purpose limitation', 'Data disposal']),
('P5.1', 'Privacy', 'Access', 'Provides individuals with access to their personal information', ARRAY['Data access requests', 'User portals', 'API access']),
('P6.1', 'Privacy', 'Disclosure to Third Parties', 'Discloses personal information to third parties with consent', ARRAY['Third-party agreements', 'Data sharing policies', 'Consent tracking']),
('P7.1', 'Privacy', 'Quality', 'Maintains accurate and complete personal information', ARRAY['Data validation', 'Update mechanisms', 'Quality checks']),

-- Availability Criteria
('A1.1', 'Availability', 'Availability Commitments', 'Meets availability commitments and SLAs', ARRAY['SLA monitoring', 'Uptime tracking', 'Performance metrics']),
('A1.2', 'Availability', 'System Capacity', 'Maintains system capacity to meet commitments', ARRAY['Capacity planning', 'Load balancing', 'Scalability', 'Resource monitoring']);

-- Create hybrid search function
CREATE OR REPLACE FUNCTION hybrid_search_vulnerabilities(
    query_text TEXT,
    query_embedding vector(1536) DEFAULT NULL,
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
    -- If no embedding provided, do text-only search
    IF query_embedding IS NULL THEN
        RETURN QUERY
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
            )::DECIMAL(5,4) as similarity_score
        FROM security_patterns sp
        WHERE to_tsvector('english', sp.description) @@ 
              websearch_to_tsquery('english', query_text)
        ORDER BY similarity_score DESC
        LIMIT result_limit;
    ELSE
        -- Hybrid search with both text and vector
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
    END IF;
END;
$$ LANGUAGE plpgsql;

-- Create function to log analysis sessions
CREATE OR REPLACE FUNCTION log_analysis_session(
    p_code_snapshot TEXT,
    p_ai_provider VARCHAR(50)
) RETURNS UUID AS $$
DECLARE
    v_session_id UUID;
BEGIN
    INSERT INTO analysis_sessions (code_snapshot, status, ai_provider)
    VALUES (p_code_snapshot, 'running', p_ai_provider)
    RETURNING id INTO v_session_id;
    
    RETURN v_session_id;
END;
$$ LANGUAGE plpgsql;

-- Create function to complete analysis session
CREATE OR REPLACE FUNCTION complete_analysis_session(
    p_session_id UUID,
    p_results JSONB,
    p_duration_ms INTEGER
) RETURNS VOID AS $$
BEGIN
    UPDATE analysis_sessions
    SET status = 'completed',
        completed_at = NOW(),
        progress = 100,
        results = p_results,
        analysis_duration_ms = p_duration_ms
    WHERE id = p_session_id;
END;
$$ LANGUAGE plpgsql;

-- Grant permissions
GRANT ALL ON ALL TABLES IN SCHEMA public TO tsdbadmin;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO tsdbadmin;
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA public TO tsdbadmin;

-- Verify setup
SELECT 
    'Setup complete!' as status,
    (SELECT COUNT(*) FROM security_patterns) as security_patterns_count,
    (SELECT COUNT(*) FROM soc2_controls) as soc2_controls_count,
    (SELECT COUNT(*) FROM analysis_sessions) as analysis_sessions_count;
