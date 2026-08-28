-- ========================================================
-- AETHERDREAM SUPABASE POSTGRESQL SCHEMA
-- ========================================================

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. DIMENSIONS TABLE
CREATE TABLE IF NOT EXISTS dimensions (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    coherence NUMERIC DEFAULT 85,
    stability NUMERIC DEFAULT 80,
    harmonic_frequency NUMERIC DEFAULT 432,
    environment TEXT,
    visual_parameters JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. DREAMS TABLE
CREATE TABLE IF NOT EXISTS dreams (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    prompt TEXT NOT NULL,
    description TEXT,
    mood TEXT,
    environment TEXT,
    story TEXT,
    colors JSONB DEFAULT '[]'::jsonb,
    characters JSONB DEFAULT '[]'::jsonb,
    objects JSONB DEFAULT '[]'::jsonb,
    coherence NUMERIC DEFAULT 85,
    stability NUMERIC DEFAULT 80,
    harmonic_frequency NUMERIC DEFAULT 432,
    visual_parameters JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. STREAM TRANSMISSIONS TABLE
CREATE TABLE IF NOT EXISTS stream_transmissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    traveler_name TEXT NOT NULL,
    dimension_id TEXT REFERENCES dimensions(id) ON DELETE SET NULL,
    message TEXT NOT NULL,
    frequency NUMERIC DEFAULT 432,
    reaction_count INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- INDEXES FOR PERFORMANCE
CREATE INDEX IF NOT EXISTS idx_dreams_created_at ON dreams (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_transmissions_created_at ON stream_transmissions (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_dimensions_name ON dimensions (name);

-- SEED INITIAL DIMENSIONS
INSERT INTO dimensions (id, name, description, coherence, stability, harmonic_frequency, environment, visual_parameters)
VALUES
    (
        'neon-archipelago',
        'NEON ARCHIPELAGO',
        'Shimmering islands suspended in liquid light, where neon coral reefs pulse in time with the cosmic heartbeat.',
        87,
        92,
        528,
        'Chromatic Tidal Realm',
        '{"fog": 45, "particleDensity": 80, "lightingIntensity": 85, "environmentDepth": 90, "distortion": 10, "energyLevel": 75}'::jsonb
    ),
    (
        'neural-cascade',
        'NEURAL CASCADE',
        'A vast crystalline mind-lattice where synaptic storms birth new realities from pure thought.',
        73,
        65,
        432,
        'Mind Architecture',
        '{"fog": 60, "particleDensity": 90, "lightingIntensity": 75, "environmentDepth": 80, "distortion": 25, "energyLevel": 85}'::jsonb
    ),
    (
        'crystal-metropolis',
        'CRYSTAL METROPOLIS',
        'Monolithic spires of living crystal rise from impossible angles, refracting light into new spectra.',
        95,
        88,
        639,
        'Prismatic Citadel',
        '{"fog": 30, "particleDensity": 70, "lightingIntensity": 95, "environmentDepth": 95, "distortion": 5, "energyLevel": 90}'::jsonb
    ),
    (
        'solaris-prime',
        'SOLARIS PRIME',
        'The burning heart of a collapsed star, where plasma entities dance in the furnace of creation.',
        61,
        44,
        741,
        'Stellar Core Realm',
        '{"fog": 20, "particleDensity": 95, "lightingIntensity": 98, "environmentDepth": 70, "distortion": 40, "energyLevel": 98}'::jsonb
    )
ON CONFLICT (id) DO NOTHING;

-- SEED INITIAL STREAM TRANSMISSIONS
INSERT INTO stream_transmissions (traveler_name, dimension_id, message, frequency, reaction_count)
VALUES
    ('NAVIGATOR_77', 'crystal-metropolis', 'Resonance coherence holding solid at 98.2% in the north quartz spire quadrant!', 639, 42),
    ('DREAMER_AXIS', 'neural-cascade', 'Synaptic pulse detected near the memory archive nexus.', 432, 19),
    ('VOID_WALKER_X', 'solaris-prime', 'Solar prominence temperature stabilized. Aether connection prime.', 741, 31)
ON CONFLICT DO NOTHING;
