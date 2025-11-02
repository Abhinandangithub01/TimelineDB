// Perplexity API client (OpenAI-compatible)
import OpenAI from 'openai';

let perplexityClient: OpenAI | null = null;

export function getPerplexityClient(): OpenAI {
  if (!perplexityClient) {
    perplexityClient = new OpenAI({
      apiKey: process.env.PERPLEXITY_API_KEY,
      baseURL: 'https://api.perplexity.ai',
    });
  }
  return perplexityClient;
}

/**
 * Analyze code for security vulnerabilities using Perplexity
 * Uses llama-3.1-sonar-large-128k-online - best for analysis with web context
 */
export async function analyzeCodeWithPerplexity(code: string): Promise<any> {
  try {
    const client = getPerplexityClient();
    const model = process.env.PERPLEXITY_MODEL || 'llama-3.1-sonar-large-128k-online';
    
    const prompt = `You are a security expert. Analyze the following code for security vulnerabilities.

Code:
\`\`\`
${code.slice(0, 8000)} // Perplexity supports larger context
\`\`\`

Identify:
1. Security vulnerabilities (SQL injection, XSS, command injection, etc.)
2. OWASP classification
3. CWE IDs
4. Severity (critical, high, medium, low)
5. Specific line numbers if possible
6. Fix recommendations

Return your analysis in JSON format:
{
  "vulnerabilities": [
    {
      "type": "SQL Injection",
      "severity": "critical",
      "description": "...",
      "line": 23,
      "owasp": "A03:2021",
      "cwe": "CWE-89",
      "fix": "..."
    }
  ]
}`;

    const completion = await client.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: 'You are a security expert specializing in code analysis. Always respond with valid JSON. Use your web search capabilities to reference latest security best practices.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      model: model,
      temperature: 0.2,
      max_tokens: 4000,
    });

    const response = completion.choices[0]?.message?.content;
    if (!response) {
      throw new Error('No response from Perplexity');
    }

    // Try to parse JSON from response
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    
    throw new Error('Could not parse JSON from Perplexity response');
  } catch (error) {
    console.error('Perplexity analysis error:', error);
    throw error;
  }
}

/**
 * Check SOC2 compliance using Perplexity
 */
export async function checkSOC2WithPerplexity(code: string, vulnerabilities: any[]): Promise<any> {
  try {
    const client = getPerplexityClient();
    const model = process.env.PERPLEXITY_MODEL || 'llama-3.1-sonar-large-128k-online';
    
    const prompt = `You are a SOC2 compliance expert. Based on these security vulnerabilities found in code, identify SOC2 control violations.

Vulnerabilities found:
${JSON.stringify(vulnerabilities.slice(0, 10), null, 2)}

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
          content: 'You are a SOC2 compliance expert. Always respond with valid JSON. Reference latest SOC2 Trust Service Criteria.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      model: model,
      temperature: 0.2,
      max_tokens: 3000,
    });

    const response = completion.choices[0]?.message?.content;
    if (!response) {
      throw new Error('No response from Perplexity');
    }

    const jsonMatch = response.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    
    throw new Error('Could not parse JSON from Perplexity response');
  } catch (error) {
    console.error('Perplexity SOC2 check error:', error);
    throw error;
  }
}

/**
 * Generate certification recommendations using Perplexity
 */
export async function recommendCertificationsWithPerplexity(vulnerabilities: any[]): Promise<any> {
  try {
    const client = getPerplexityClient();
    const model = process.env.PERPLEXITY_MODEL || 'llama-3.1-sonar-large-128k-online';
    
    const vulnTypes = vulnerabilities.map(v => v.type).join(', ');
    
    const prompt = `Based on these security vulnerabilities: ${vulnTypes}

Recommend relevant security certifications that would help address these issues.
Consider: CEH, CISSP, CISM, CISA, Security+, OSCP, etc.

Use your web search to get current certification costs and requirements.

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
          content: 'You are a cybersecurity training expert. Always respond with valid JSON. Use web search for current certification information.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      model: model,
      temperature: 0.3,
      max_tokens: 2000,
    });

    const response = completion.choices[0]?.message?.content;
    if (!response) {
      throw new Error('No response from Perplexity');
    }

    const jsonMatch = response.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    
    throw new Error('Could not parse JSON from Perplexity response');
  } catch (error) {
    console.error('Perplexity certification recommendation error:', error);
    throw error;
  }
}

/**
 * Check if Perplexity is configured
 */
export function isPerplexityConfigured(): boolean {
  return Boolean(process.env.PERPLEXITY_API_KEY);
}
