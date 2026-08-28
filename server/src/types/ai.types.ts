import { z } from 'zod';

export const ChatRequestSchema = z.object({
  message: z.string().min(1, 'Message is required'),
  dreamContext: z.record(z.any()).optional().default({}),
  dimension: z.union([z.string(), z.record(z.any())]).optional(),
  telemetry: z.record(z.any()).optional().default({}),
});

export type ChatRequest = z.infer<typeof ChatRequestSchema>;

export interface ChatResponse {
  reply: string;
  suggestedActions?: string[];
  resonanceAlignment?: number;
  dimensionalEcho?: string;
}
