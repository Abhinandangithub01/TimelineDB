import { z } from 'zod';

// Analysis request validation
export const AnalysisRequestSchema = z.object({
  code: z.string().min(1, 'Code is required').max(100000, 'Code too large (max 100KB)').optional(),
  githubUrl: z.string().url('Invalid GitHub URL').optional(),
  options: z.object({
    security: z.boolean().default(true),
    soc2: z.boolean().default(true),
    rag: z.boolean().default(true),
    certifications: z.boolean().default(true),
  }).optional(),
}).refine(
  (data) => data.code || data.githubUrl,
  { message: 'Either code or GitHub URL must be provided' }
);

export type AnalysisRequest = z.infer<typeof AnalysisRequestSchema>;

// Validate file upload
export function validateFile(file: File): { valid: boolean; error?: string } {
  const maxSize = 10 * 1024 * 1024; // 10MB
  const allowedTypes = [
    'text/plain',
    'application/x-python',
    'application/javascript',
    'application/json',
    'text/x-python',
    'text/javascript',
  ];

  if (file.size > maxSize) {
    return { valid: false, error: 'File too large (max 10MB)' };
  }

  // Allow any text file for now
  if (file.type && !file.type.startsWith('text/') && !allowedTypes.includes(file.type)) {
    // Still allow it but warn
    console.warn('File type may not be supported:', file.type);
  }

  return { valid: true };
}

// Sanitize user input
export function sanitizeInput(input: string): string {
  // Remove potential XSS attacks
  return input
    .replace(/[<>]/g, '') // Remove angle brackets
    .trim()
    .slice(0, 100000); // Max 100KB
}

// Validate session ID
export function isValidSessionId(sessionId: string): boolean {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return uuidRegex.test(sessionId);
}
