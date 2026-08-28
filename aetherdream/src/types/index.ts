// ─── Navigation ───────────────────────────────────────────────────────────────

export interface NavigationItem {
  id: string;
  label: string;
  path: string;
  icon?: string;
}

// ─── Dimension ────────────────────────────────────────────────────────────────

export type DimensionMood = 'ethereal' | 'cosmic' | 'crystalline' | 'solar' | 'void' | 'neural';

export interface SceneEntity {
  id: string;
  name: string;
  category: '3D SCENE OBJECT' | 'ASTRAL ENTITY' | 'CHRONO RELIC' | 'NEURAL FLORA';
  role: string;
  description: string;
  frequency: string;
  color: string;
  icon: string;
  coordinates?: string;
}

export interface Dimension {
  id: string;
  title: string;
  subtitle: string;
  mood: DimensionMood;
  coherence: number;    // 0–100
  stability: number;    // 0–100
  frequency: string;    // e.g. "432 Hz"
  depth: string;        // e.g. "∞"
  colorPrimary: string;
  colorSecondary: string;
  description: string;
  colors?: string[];
  storyLore?: string[];
  entities?: SceneEntity[];
  tags: string[];
  isCustom?: boolean;
}

// ─── Telemetry ────────────────────────────────────────────────────────────────

export interface TelemetryMetric {
  id: string;
  label: string;
  value: number | string;
  unit?: string;
  status: 'nominal' | 'elevated' | 'critical' | 'optimal';
  animated?: boolean;
}

export interface TelemetryData {
  neuralCoherence: number;
  dimensionStability: number;
  harmonicFrequency: number;
  aetherSignal: number;
  dreamDepth: number;
  timestamp: Date;
}

// ─── Streams ──────────────────────────────────────────────────────────────────

export interface StreamMessage {
  id: string;
  user: string;
  text: string;
  time: string;
  isAi?: boolean;
  avatarColor?: string;
}

export interface LiveStream {
  id: string;
  user: string;
  title: string;
  viewers: number;
  duration: string;
  mood: DimensionMood;
  frequency: string;
  description: string;
  tags: string[];
}

// ─── Reality Calibration ──────────────────────────────────────────────────────

export interface RealityCalibration {
  neuralSensitivity: number;       // 0-100
  coherenceThreshold: number;      // 0-100
  temporalAnchor: number;          // 0-100
  particleDensity: number;         // 0-100
  fogIntensity: number;            // 0-100
  bloomStrength: number;           // 0-100
  guidanceMode: boolean;
  chronicleAutoRecord: boolean;
  binauralHarmonics: boolean;
  scanlinesEnabled: boolean;
}

// ─── Dream ────────────────────────────────────────────────────────────────────

export type DreamStatus = 'draft' | 'generating' | 'active' | 'archived';

export interface DreamVisualParameters {
  fog: number;           // 0–100
  particleDensity: number;
  lightingIntensity: number;
  environmentDepth: number;
  carrierFreq: number;
}

export interface Dream {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  prompt: string;
  mood: DimensionMood;
  environment: string;
  story: string;
  colors: string[];
  colorPrimary?: string;
  colorSecondary?: string;
  storyLore?: string[];
  tags?: string[];
  entities: SceneEntity[];
  coherence: number;
  stability: number;
  frequency: string;
  depth: string;
  visualParameters: DreamVisualParameters;
  status: DreamStatus;
  createdAt: string;
}
