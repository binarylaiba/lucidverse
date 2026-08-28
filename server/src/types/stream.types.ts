import { z } from 'zod';

export const StreamTransmissionSchema = z.object({
  id: z.string(),
  traveler_name: z.string(),
  dimension_id: z.string().nullable().optional(),
  message: z.string(),
  frequency: z.number().nullable().optional(),
  reaction_count: z.number().default(0),
  created_at: z.string(),
});

export interface StreamTransmissionEntity {
  id: string;
  traveler_name: string;
  dimension_id: string | null;
  message: string;
  frequency: number | null;
  reaction_count: number;
  created_at: string;
}

export const CreateTransmissionRequestSchema = z.object({
  travelerName: z.string().min(1, 'Traveler name is required'),
  dimensionId: z.string().optional(),
  message: z.string().min(1, 'Message is required'),
  frequency: z.number().optional().default(432),
});

export type CreateTransmissionRequest = z.infer<typeof CreateTransmissionRequestSchema>;
