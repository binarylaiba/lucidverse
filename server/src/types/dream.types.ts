import { z } from 'zod';

// Visual Parameters Schema
export const VisualParametersSchema = z.object({
  fog: z.number().min(0).max(100).default(50),
  particleDensity: z.number().min(0).max(100).default(75),
  lightingIntensity: z.number().min(0).max(100).default(80),
  environmentDepth: z.number().min(0).max(100).default(70),
  distortion: z.number().min(0).max(100).default(10),
  energyLevel: z.number().min(0).max(100).default(75),
});

export type VisualParameters = z.infer<typeof VisualParametersSchema>;

// Generated Dream Manifest Schema (Synthesized by OpenRouter AI)
export const GeneratedDreamSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  mood: z.string().min(1, 'Mood is required'),
  environment: z.string().min(1, 'Environment is required'),
  story: z.string().min(1, 'Story is required'),
  colors: z.array(z.string()).min(1, 'At least one color is required'),
  characters: z.array(z.any()).default([]),
  objects: z.array(z.any()).default([]),
  coherence: z.number().min(0).max(100).default(85),
  stability: z.number().min(0).max(100).default(80),
  harmonicFrequency: z.number().default(432),
  visualParameters: VisualParametersSchema,
});

export type GeneratedDream = z.infer<typeof GeneratedDreamSchema>;

// Request Schemas
export const GenerateDreamRequestSchema = z.object({
  prompt: z.string().min(3, 'Prompt must be at least 3 characters long'),
});

export type GenerateDreamRequest = z.infer<typeof GenerateDreamRequestSchema>;

export const CreateDreamRequestSchema = z.object({
  title: z.string().min(1),
  prompt: z.string().min(1),
  description: z.string().optional().default(''),
  mood: z.string().optional().default('ethereal'),
  environment: z.string().optional().default('Void Basin'),
  story: z.string().optional().default(''),
  colors: z.array(z.string()).optional().default(['#06b6d4', '#7c3aed']),
  characters: z.array(z.any()).optional().default([]),
  objects: z.array(z.any()).optional().default([]),
  coherence: z.number().min(0).max(100).optional().default(85),
  stability: z.number().min(0).max(100).optional().default(80),
  harmonicFrequency: z.number().optional().default(432),
  visualParameters: VisualParametersSchema.optional().default({
    fog: 50,
    particleDensity: 75,
    lightingIntensity: 80,
    environmentDepth: 70,
    distortion: 10,
    energyLevel: 75,
  }),
});

export type CreateDreamRequest = z.infer<typeof CreateDreamRequestSchema>;

// Database Entity
export interface DreamEntity {
  id: string;
  title: string;
  prompt: string;
  description: string | null;
  mood: string | null;
  environment: string | null;
  story: string | null;
  colors: string[] | null;
  characters: unknown[] | null;
  objects: unknown[] | null;
  coherence: number | null;
  stability: number | null;
  harmonic_frequency: number | null;
  visual_parameters: VisualParameters | null;
  created_at: string;
}
