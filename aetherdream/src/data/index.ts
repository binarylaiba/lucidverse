import type { Dimension, NavigationItem, TelemetryMetric, SceneEntity, LiveStream, RealityCalibration, Dream } from '../types';

// ─── Navigation ───────────────────────────────────────────────────────────────

export const NAV_ITEMS: NavigationItem[] = [
  { id: 'drift',  label: 'DRIFT',  path: '/' },
  { id: 'weave',  label: 'WEAVE',  path: '/weave' },
  { id: 'stream', label: 'STREAM', path: '/stream' },
  { id: 'codex',  label: 'CODEX',  path: '/codex' },
  { id: 'shift',  label: 'SHIFT',  path: '/shift' },
];

// ─── Seed Prompts ─────────────────────────────────────────────────────────────

export const SEED_PROMPTS: string[] = [
  'Crystalline City beyond the stars',
  'Bioluminescent Cyber-Abyss',
  'Floating ruins above a violet sea',
  'Neural lattice of infinite memory',
  'Solaris Prime at the edge of time',
  'Fractal cathedral of living light',
  'Mirror sanctuary beneath twin auroras',
  'Chronos observatory adrift in dark matter',
];

// ─── Scene Entities (Interactive Objects in 3D scene) ─────────────────────────

export const DEFAULT_SCENE_ENTITIES: SceneEntity[] = [
  {
    id: 'crystal-spire',
    name: 'Floating Quartz Spire',
    category: '3D SCENE OBJECT',
    role: 'Resonance Anchor',
    description: 'A colossal monolith carved from faceted quartz that channels subconscious brainwaves into crystalline architecture.',
    frequency: '528.0 Hz',
    color: '#06b6d4',
    icon: 'diamond',
    coordinates: '12.4°N, 45.1°W, Z: +32m',
  },
  {
    id: 'astral-avatar',
    name: 'Astral Navigator AI',
    category: 'ASTRAL ENTITY',
    role: 'Lucid Guardian',
    description: 'A sentient harmonic manifestation that guides wanderers through the deep sub-frequencies of the dreamscape.',
    frequency: '432.0 Hz',
    color: '#a78bfa',
    icon: 'account_circle',
    coordinates: '04.1°S, 89.2°E, Z: +14m',
  },
  {
    id: 'chronos-portal',
    name: 'Chronos Rift Gateway',
    category: 'CHRONO RELIC',
    role: 'Temporal Conduit',
    description: 'A rotating ring of compressed dark matter allowing safe transitions between ancestral and speculative memory tiers.',
    frequency: '639.0 Hz',
    color: '#ffafd3',
    icon: 'all_inclusive',
    coordinates: '78.9°N, 12.0°W, Z: -05m',
  },
  {
    id: 'biolum-core',
    name: 'Bioluminescent Reef Core',
    category: 'NEURAL FLORA',
    role: 'Coherence Fountain',
    description: 'Living chromatic flora that pulses in sync with theta brainwaves, emitting calm restorative frequencies.',
    frequency: '396.0 Hz',
    color: '#44e2cd',
    icon: 'spa',
    coordinates: '31.2°S, 54.8°W, Z: +02m',
  },
];

// ─── Dimensions Catalog ───────────────────────────────────────────────────────

export const FEATURED_DIMENSIONS: Dimension[] = [
  {
    id: 'neon-archipelago',
    title: 'NEON ARCHIPELAGO',
    subtitle: 'Chromatic Tidal Realm',
    mood: 'ethereal',
    coherence: 87,
    stability: 92,
    frequency: '528 Hz',
    depth: '∞',
    colorPrimary: '#06b6d4',
    colorSecondary: '#7c3aed',
    description:
      'Shimmering islands suspended in liquid light, where neon coral reefs pulse in time with the cosmic heartbeat.',
    storyLore: [
      'The Neon Archipelago was first discovered during the Great Neural Convergence of 2024.',
      'Wanderers report feeling a profound sense of temporal weightlessness as warm ultraviolet waves lap against crystalline shores.',
      'Ancient monoliths scattered across the shoals whisper forgotten melodies of peaceful civilisations.',
    ],
    entities: [
      DEFAULT_SCENE_ENTITIES[3],
      DEFAULT_SCENE_ENTITIES[1],
    ],
    tags: ['oceanic', 'bioluminescent', 'tidal', 'lucid'],
  },
  {
    id: 'neural-cascade',
    title: 'NEURAL CASCADE',
    subtitle: 'Mind Architecture',
    mood: 'neural',
    coherence: 73,
    stability: 65,
    frequency: '432 Hz',
    depth: '14.7 km',
    colorPrimary: '#a855f7',
    colorSecondary: '#4f46e5',
    description:
      'A vast crystalline mind-lattice where synaptic storms birth new realities from pure thought.',
    storyLore: [
      'An infinite network of geometric thoughts suspended in high-altitude consciousness.',
      'Electrical surges illuminate thoughts from eons ago, preserving human discovery in radiant amber filaments.',
      'Navigators must maintain strict theta coherence when passing through the central synaptic nexus.',
    ],
    entities: [
      DEFAULT_SCENE_ENTITIES[0],
      DEFAULT_SCENE_ENTITIES[1],
    ],
    tags: ['cognitive', 'electric', 'infinite', 'synaptic'],
  },
  {
    id: 'crystal-metropolis',
    title: 'CRYSTAL METROPOLIS',
    subtitle: 'Prismatic Citadel',
    mood: 'crystalline',
    coherence: 95,
    stability: 88,
    frequency: '639 Hz',
    depth: '23.1 km',
    colorPrimary: '#e2e8f0',
    colorSecondary: '#7c3aed',
    description:
      'Monolithic spires of living crystal rise from impossible angles, refracting light into new spectra.',
    storyLore: [
      'Built entirely of sound-hardened quartz, this citadel hums with mathematical precision.',
      'Light passing through the spires creates localized pockets of lucid awareness.',
      'It is revered as the ultimate sanctuary for mental focus and architectural dreaming.',
    ],
    entities: [
      DEFAULT_SCENE_ENTITIES[0],
      DEFAULT_SCENE_ENTITIES[2],
    ],
    tags: ['architectural', 'prismatic', 'ancient', 'sanctuary'],
  },
  {
    id: 'solaris-prime',
    title: 'SOLARIS PRIME',
    subtitle: 'Stellar Core Realm',
    mood: 'solar',
    coherence: 61,
    stability: 44,
    frequency: '741 Hz',
    depth: '∞',
    colorPrimary: '#fbbf24',
    colorSecondary: '#f97316',
    description:
      'The burning heart of a collapsed star, where plasma entities dance in the furnace of creation.',
    storyLore: [
      'Here, gravitational rules yield to sheer imaginative energy.',
      'Golden filaments bridge blazing solar prominences, radiating creative passion.',
      'Deep-dreamers visit Solaris Prime when seeking breakthrough epiphanies.',
    ],
    entities: [
      DEFAULT_SCENE_ENTITIES[2],
    ],
    tags: ['solar', 'volatile', 'primordial', 'epiphany'],
  },
  {
    id: 'void-sanctuary',
    title: 'VOID SANCTUARY',
    subtitle: 'Silent Singularity',
    mood: 'void',
    coherence: 98,
    stability: 96,
    frequency: '216 Hz',
    depth: '48.2 km',
    colorPrimary: '#64748b',
    colorSecondary: '#3b82f6',
    description:
      'An absolute chamber of quietude at the edge of subconscious oblivion, free from all sensory noise.',
    storyLore: [
      'Zero sensory interference. The baseline quietude of the mind before dreaming commences.',
      'A singular dark-matter monolith floats at its center, absorbing anxiety and cognitive fatigue.',
    ],
    entities: [
      DEFAULT_SCENE_ENTITIES[2],
    ],
    tags: ['zen', 'silence', 'sub-bass', 'restorative'],
  },
  {
    id: 'fractal-astral-library',
    title: 'FRACTAL ASTRAL LIBRARY',
    subtitle: 'Infinite Cosmic Chronicle',
    mood: 'cosmic',
    coherence: 89,
    stability: 81,
    frequency: '852 Hz',
    depth: '108 km',
    colorPrimary: '#d946ef',
    colorSecondary: '#6366f1',
    description:
      'Hovering fractal monoliths containing the collective archetypes and dream recordings of all human memory.',
    storyLore: [
      'Every dream ever dreamed is recorded as a resonant harmonic frequency.',
      'Opening a tome releases a brief hologram of past lives and futuristic visions.',
    ],
    entities: [
      DEFAULT_SCENE_ENTITIES[0],
      DEFAULT_SCENE_ENTITIES[1],
    ],
    tags: ['archive', 'astral', 'monuments', 'archetypes'],
  },
  {
    id: 'ethereal-oasis',
    title: 'ETHEREAL OASIS',
    subtitle: 'Bioluminescent Sanctuary',
    mood: 'ethereal',
    coherence: 94,
    stability: 91,
    frequency: '528 Hz',
    depth: '18.4 km',
    colorPrimary: '#34d399',
    colorSecondary: '#06b6d4',
    description:
      'Liquid emerald pools surrounded by glowing willow filaments and singing glass dragonfly avatars.',
    storyLore: [
      'A sanctuary designed for peaceful neural recovery and restorative lucid sleep.',
      'The water emits a gentle warmth that dissolves waking fatigue.',
    ],
    entities: [
      DEFAULT_SCENE_ENTITIES[3],
    ],
    tags: ['restoration', 'serenity', 'emerald', 'healing'],
  },
  {
    id: 'quantum-mirage',
    title: 'QUANTUM MIRAGE',
    subtitle: 'Superposition Citadel',
    mood: 'neural',
    coherence: 82,
    stability: 70,
    frequency: '963 Hz',
    depth: '∞',
    colorPrimary: '#c084fc',
    colorSecondary: '#38bdf8',
    description:
      'A shifting palace existing simultaneously in multiple states until observed by a conscious navigator.',
    storyLore: [
      'Walls shift between glass, water, and pure starlight depending on the observer gaze.',
      'Tuning your mental focus solidifies new passageways.',
    ],
    entities: [
      DEFAULT_SCENE_ENTITIES[0],
      DEFAULT_SCENE_ENTITIES[2],
    ],
    tags: ['quantum', 'observer', 'superposition', 'palace'],
  },
];

// ─── Initial Recorded Dreams (My Dreams) ──────────────────────────────────────

export const INITIAL_DREAMS: Dream[] = [
  {
    id: 'neon-archipelago',
    title: 'Neon Archipelago Session',
    subtitle: 'Chromatic Tidal Exploration',
    description: 'Drift through suspended oceanic bioluminescence under twin violet moons.',
    prompt: 'Shimmering islands of liquid crystal with neon reefs pulsing to 432Hz binaural frequencies.',
    mood: 'ethereal',
    environment: 'Bioluminescent Tidal Lagoon',
    story: 'You arrive at the edge of a mirror-flat sea tinted deep violet. As your feet touch the shore, ripples of cyan radiance illuminate submerged coral spires. An astral guide appears on the horizon, signaling that the tide of consciousness is rising.',
    colors: ['#06b6d4', '#7c3aed', '#ffafd3'],
    entities: [DEFAULT_SCENE_ENTITIES[3], DEFAULT_SCENE_ENTITIES[1]],
    coherence: 94,
    stability: 92,
    frequency: '528 Hz',
    depth: '12.4 km',
    visualParameters: { fog: 45, particleDensity: 80, lightingIntensity: 85, environmentDepth: 90, carrierFreq: 528 },
    status: 'active',
    createdAt: '2026-08-27',
  },
  {
    id: 'neural-cascade-drift',
    title: 'Neural Cascade Drift',
    subtitle: 'Deep Cognitive Synaptic Dive',
    description: 'High altitude descent into an infinite web of illuminated golden neurons.',
    prompt: 'Massive geometric neural lattice with electric sparks connecting floating memory stones.',
    mood: 'neural',
    environment: 'Synaptic Void Realm',
    story: 'Descending through layers of dark atmospheric fog, gigantic geometric pillars ignite with electric violet pulses. Each node contains a crystalline fragment of remembered dreams.',
    colors: ['#a855f7', '#4f46e5', '#38bdf8'],
    entities: [DEFAULT_SCENE_ENTITIES[0]],
    coherence: 86,
    stability: 78,
    frequency: '432 Hz',
    depth: '14.7 km',
    visualParameters: { fog: 60, particleDensity: 90, lightingIntensity: 75, environmentDepth: 80, carrierFreq: 432 },
    status: 'archived',
    createdAt: '2026-08-25',
  },
  {
    id: 'crystal-metropolis-dive',
    title: 'Crystal Metropolis Dive',
    subtitle: 'Prismatic Tower Calibration',
    description: 'Entering the acoustic sanctuary of ancient resonant quartz monoliths.',
    prompt: 'Giant multifaceted crystal spires rising from a reflective dark ground under star showers.',
    mood: 'crystalline',
    environment: 'Quartz Monolith Plaza',
    story: 'The air rings with a clean 639Hz chime. Spires towering miles into the celestial sky bend starlight into vibrant rainbows. The central beacon stabilizes your lucidity meter to 98%.',
    colors: ['#e2e8f0', '#7c3aed', '#67e8f9'],
    entities: [DEFAULT_SCENE_ENTITIES[0], DEFAULT_SCENE_ENTITIES[2]],
    coherence: 98,
    stability: 95,
    frequency: '639 Hz',
    depth: '23.1 km',
    visualParameters: { fog: 30, particleDensity: 70, lightingIntensity: 95, environmentDepth: 95, carrierFreq: 639 },
    status: 'archived',
    createdAt: '2026-08-22',
  },
];

// ─── Live Streams Mock Data ───────────────────────────────────────────────────

export const DEFAULT_STREAMS: LiveStream[] = [
  {
    id: '1',
    user: 'NAVIGATOR_77',
    title: 'Crystalline City: Dawn Over Quartz Spires',
    viewers: 342,
    duration: '02:14:33',
    mood: 'crystalline',
    frequency: '639 Hz',
    description: 'Floating across the upper terrace of the Crystal Metropolis while monitoring harmonic resonance.',
    tags: ['quartz', 'prismatic', 'lucid'],
  },
  {
    id: '2',
    user: 'DREAMER_AXIS',
    title: 'Neural Cascade: Navigating Synaptic Storms',
    viewers: 189,
    duration: '00:47:11',
    mood: 'neural',
    frequency: '432 Hz',
    description: 'Deep dive into theta wave frequencies with active brainwave synchronization.',
    tags: ['electric', 'synaptic', 'theta'],
  },
  {
    id: '3',
    user: 'VOID_WALKER_X',
    title: 'Solaris Prime: The Solar Forge of Creation',
    viewers: 512,
    duration: '04:02:57',
    mood: 'solar',
    frequency: '741 Hz',
    description: 'Witnessing high-energy solar prominences and cosmic plasma filaments.',
    tags: ['solar', 'plasma', 'high-intensity'],
  },
  {
    id: '4',
    user: 'AETHER_BORN',
    title: 'Bioluminescent Reef: Floating Shoals Dive',
    viewers: 126,
    duration: '01:11:04',
    mood: 'ethereal',
    frequency: '528 Hz',
    description: 'Drifting along chromatic underwater valleys with singing crystal dragonflies.',
    tags: ['biolum', 'coral', 'ambient'],
  },
  {
    id: '5',
    user: 'LOOP_SEEKER',
    title: 'Void Sanctuary: The Zero-Noise Drift',
    viewers: 94,
    duration: '00:33:22',
    mood: 'void',
    frequency: '216 Hz',
    description: 'Complete sensory quietude. Calming delta-theta transition session.',
    tags: ['silence', 'sub-bass', 'meditation'],
  },
  {
    id: '6',
    user: 'SYNAPSE_7',
    title: 'Fractal Astral Library: Forgotten Cosmic Lore',
    viewers: 278,
    duration: '01:55:19',
    mood: 'cosmic',
    frequency: '852 Hz',
    description: 'Scanning historical dream chronicles recorded over the last millennium.',
    tags: ['astral', 'records', 'fractal'],
  },
];

// ─── Telemetry Metrics ────────────────────────────────────────────────────────

export const DEFAULT_TELEMETRY_METRICS: TelemetryMetric[] = [
  {
    id: 'neural-coherence',
    label: 'NEURAL COHERENCE',
    value: 96,
    unit: '.8%',
    status: 'optimal',
    animated: true,
  },
  {
    id: 'dimension-stability',
    label: 'DIMENSION STABILITY',
    value: 94,
    unit: '%',
    status: 'optimal',
    animated: true,
  },
  {
    id: 'harmonic-frequency',
    label: 'CARRIER FREQUENCY',
    value: '432.0',
    unit: ' Hz',
    status: 'optimal',
    animated: false,
  },
  {
    id: 'aether-signal',
    label: 'SIGNAL INTEGRITY',
    value: 99,
    unit: '.4%',
    status: 'optimal',
    animated: true,
  },
  {
    id: 'dream-depth',
    label: 'IMMERSION DEPTH',
    value: 88,
    unit: '.5%',
    status: 'elevated',
    animated: true,
  },
];

// ─── Default Reality Calibration ──────────────────────────────────────────────

export const DEFAULT_CALIBRATION: RealityCalibration = {
  neuralSensitivity: 78,
  coherenceThreshold: 85,
  temporalAnchor: 65,
  particleDensity: 80,
  fogIntensity: 45,
  bloomStrength: 60,
  guidanceMode: true,
  chronicleAutoRecord: true,
  binauralHarmonics: false,
  scanlinesEnabled: false,
};
