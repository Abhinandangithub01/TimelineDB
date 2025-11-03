import Groq from 'groq-sdk';
import { 
  analyzeCodeWithPerplexity, 
  checkSOC2WithPerplexity, 
  recommendCertificationsWithPerplexity,
  isPerplexityConfigured 
} from './perplexity-client';

let groqClient: Groq | null = null;

export function getGroqClient(): Groq {
  if (!groqClient) {
    const apiKey = process.env.GROQ_API_KEY;
    console.log('🔑 Groq API Key check:', apiKey ? `Present (${apiKey.substring(0, 10)}...)` : 'MISSING');
    
    if (!apiKey) {
      throw new Error('GROQ_API_KEY environment variable is not set. Please configure it in AWS Amplify environment variables.');
    }
    
    try {
      groqClient = new Groq({
        apiKey: apiKey,
      });
      console.log('✅ Groq client initialized successfully');
    } catch (error) {
      console.error('❌ Failed to initialize Groq client:', error);
      throw new Error(`Failed to initialize Groq client: ${(error as Error).message}`);
    }
  }
  return groqClient;
}

/**
 * Analyze code for security vulnerabilities using Groq LLM
 */
export async function analyzeCodeWithGroq(code: string): Promise<any> {
  console.log('📝 analyzeCodeWithGroq called, code length:', code.length);
  
  try {
    console.log('🔧 Getting Groq client...');
    const client = getGroqClient();
    const model = process.env.GROQ_MODEL || 'llama-3.3-70b-versatile';
    console.log('📡 Using model:', model);
    
    // Add line numbers to code for better analysis
    const numberedCode = code.split('\n').map((line, idx) => `${idx + 1}: ${line}`).join('\n');
    
    const prompt = `You are a security expert. Analyze the following code for security vulnerabilities.

Code (with line numbers):
\`\`\`
${numberedCode.slice(0, 4000)} // Limit to 4000 chars
\`\`\`

IMPORTANT: You MUST identify the exact line number where each vulnerability exists.

Identify:
1. Security vulnerabilities (SQL injection, XSS, command injection, hardcoded secrets, etc.)
2. EXACT line number where the vulnerability is (REQUIRED)
3. The vulnerable code snippet
4. OWASP classification
5. CWE IDs
6. Severity (critical, high, medium, low)
7. Detailed fix with corrected code

Return your analysis in JSON format:
{
  "vulnerabilities": [
    {
      "type": "SQL Injection",
      "severity": "critical",
      "description": "The code uses string formatting to construct SQL queries, allowing SQL injection attacks",
      "line": 23,
      "file": "uploaded-code",
      "owasp": "A03:2021",
      "cwe": "CWE-89",
      "code": "query = f\\"SELECT * FROM users WHERE username='{username}'\\"",
      "fix": "query = \\"SELECT * FROM users WHERE username=%s\\"; cursor.execute(query, (username,))"
    }
  ]
}

CRITICAL: Every vulnerability MUST have a line number and code snippet.`;

    console.log('🚀 Calling Groq API...');
    const completion = await client.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: 'You are a security expert specializing in code analysis. Always respond with valid JSON.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      model: model,
      temperature: 0.3,
      max_tokens: 2000,
      response_format: { type: 'json_object' }
    });
    
    console.log('✅ Groq API response received');

    const response = completion.choices[0]?.message?.content;
    if (!response) {
      throw new Error('No response from Groq');
    }

    const parsed = JSON.parse(response);
    console.log('✅ Parsed response:', Object.keys(parsed));
    return parsed;
  } catch (error) {
    console.error('❌ Groq analysis error:', error);
    console.error('Error type:', (error as any).constructor.name);
    console.error('Error message:', (error as Error).message);
    console.error('Error stack:', (error as Error).stack);
    
    // Fallback to Perplexity
    if (isPerplexityConfigured()) {
      console.log('🔄 Falling back to Perplexity...');
      return await analyzeCodeWithPerplexity(code);
    }
    
    console.error('❌ No fallback available, throwing error');
    throw new Error(`Groq API failed: ${(error as Error).message}`);
  }
}

/**
 * Check SOC2 compliance using Groq LLM
 */
export async function checkSOC2WithGroq(code: string, vulnerabilities: any[]): Promise<any> {
  try {
    const client = getGroqClient();
    const model = process.env.GROQ_MODEL || 'llama-3.3-70b-versatile';
    
    const prompt = `You are a SOC2 compliance expert. Based on these security vulnerabilities found in code, identify SOC2 control violations.

Vulnerabilities found:
${JSON.stringify(vulnerabilities, null, 2)}

Identify which SOC2 controls are violated and provide:
1. Control ID (e.g., CC6.1, CC6.6, CC7.2)
2. Category (Security, Privacy, etc.)
3. Severity
4. Business impact
5. Remediation steps
6. Time to fix

Return JSON format:
{
  "violations": [
    {
      "controlId": "CC6.6",
      "category": "Security",
      "title": "...",
      "severity": "critical",
      "description": "...",
      "impact": "...",
      "remediation": "...",
      "timeToFix": "2 hours"
    }
  ],
  "readiness": 65
}`;

    const completion = await client.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: 'You are a SOC2 compliance expert. Always respond with valid JSON.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      model: model,
      temperature: 0.3,
      max_tokens: 2000,
      response_format: { type: 'json_object' }
    });

    const response = completion.choices[0]?.message?.content;
    if (!response) {
      throw new Error('No response from Groq');
    }

    return JSON.parse(response);
  } catch (error) {
    console.error('Groq SOC2 check error, trying Perplexity fallback:', error);
    
    // Fallback to Perplexity
    if (isPerplexityConfigured()) {
      console.log('🔄 Falling back to Perplexity for SOC2...');
      return await checkSOC2WithPerplexity(code, vulnerabilities);
    }
    
    throw error;
  }
}

/**
 * Generate certification recommendations using Groq LLM
 */
export async function recommendCertificationsWithGroq(vulnerabilities: any[]): Promise<any> {
  try {
    const client = getGroqClient();
    const model = process.env.GROQ_MODEL || 'llama-3.3-70b-versatile';
    
    const vulnTypes = vulnerabilities.map(v => v.type).join(', ');
    
    const prompt = `Based on these security vulnerabilities: ${vulnTypes}

Recommend relevant security certifications that would help address these issues.
Consider: CEH, CISSP, CISM, CISA, Security+, etc.

Return JSON format:
{
  "certifications": [
    {
      "name": "CEH - Certified Ethical Hacker",
      "priority": "high",
      "duration": "3 months",
      "cost": 1199,
      "coverage": 70,
      "topics": ["SQL Injection", "XSS", "..."],
      "phase": 1
    }
  ]
}`;

    const completion = await client.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: 'You are a cybersecurity training expert. Always respond with valid JSON.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      model: model,
      temperature: 0.5,
      max_tokens: 1500,
      response_format: { type: 'json_object' }
    });

    const response = completion.choices[0]?.message?.content;
    if (!response) {
      throw new Error('No response from Groq');
    }

    return JSON.parse(response);
  } catch (error) {
    console.error('Groq certification recommendation error, trying Perplexity fallback:', error);
    
    // Fallback to Perplexity
    if (isPerplexityConfigured()) {
      console.log('🔄 Falling back to Perplexity for certifications...');
      return await recommendCertificationsWithPerplexity(vulnerabilities);
    }
    
    throw error;
  }
}

/**
 * Check if Groq is configured
 */
export function isGroqConfigured(): boolean {
  return Boolean(process.env.GROQ_API_KEY);
}
