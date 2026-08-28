import { z } from 'zod';
import { VisualParametersSchema, VisualParameters } from './dream.types.js';

export const DimensionEntitySchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().nullable().optional(),
  coherence: z.number().nullable().optional(),
  stability: z.number().nullable().optional(),
  harmonic_frequency: z.number().nullable().optional(),
  environment: z.string().nullable().optional(),
  visual_parameters: VisualParametersSchema.nullable().optional(),
  created_at: z.string(),
});

export interface DimensionEntity {
  id: string;
  name: string;
  description: string | null;
  coherence: number | null;
  stability: number | null;
  harmonic_frequency: number | null;
  environment: string | null;
  visual_parameters: VisualParameters | null;
  created_at: string;
}
