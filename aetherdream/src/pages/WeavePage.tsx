import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import PageContainer from '@/components/PageContainer';
import { useDream } from '@/context/DreamContext';
import { staggerContainer, staggerItem } from '@/animations/variants';
import { SEED_PROMPTS, DEFAULT_SCENE_ENTITIES } from '@/data';

const PRESETS = [
  {
    id: 'crystal',
    name: 'Crystalline Sanctuary',
    mood: 'crystalline',
    fog: 35,
    particles: 75,
    light: 90,
    depth: 85,
    freq: 639,
    prompt: 'Colossal faceted quartz monoliths floating over mirror waters under violet moons',
    colors: ['#e2e8f0', '#7c3aed'],
  },
  {
    id: 'biolum',
    name: 'Bioluminescent Abyss',
    mood: 'ethereal',
    fog: 55,
    particles: 90,
    light: 80,
    depth: 95,
    freq: 528,
    prompt: 'Deep ocean of liquid light with pulsing chromatic coral and hovering astral dragonflies',
    colors: ['#06b6d4', '#7c3aed'],
  },
  {
    id: 'astral',
    name: 'Fractal Astral Library',
    mood: 'cosmic',
    fog: 40,
    particles: 85,
    light: 85,
    depth: 90,
    freq: 852,
    prompt: 'Floating fractal libraries preserving the collective memories and prophecies of all dreams',
    colors: ['#d946ef', '#6366f1'],
  },
  {
    id: 'solar',
    name: 'Solaris Stellar Core',
    mood: 'solar',
    fog: 20,
    particles: 95,
    light: 98,
    depth: 70,
    freq: 741,
    prompt: 'Plasma furnace of a collapsed star where golden filaments birth creative epiphanies',
    colors: ['#fbbf24', '#f97316'],
  },
];

export default function WeavePage() {
  const { synthesizeDream, isSynthesizing, synthesisStep } = useDream();
  const navigate = useNavigate();

  const [prompt, setPrompt] = useState('Colossal faceted quartz monoliths floating over mirror waters under violet moons');
  const [fog, setFog] = useState(45);
  const [particles, setParticles] = useState(80);
  const [lighting, setLighting] = useState(85);
  const [depth, setDepth] = useState(80);
  const [frequency, setFrequency] = useState(528);
  const [selectedPreset, setSelectedPreset] = useState<string | null>('crystal');
  const [selectedEntities, setSelectedEntities] = useState<string[]>(['crystal-spire', 'astral-avatar']);

  const applyPreset = (preset: typeof PRESETS[0]) => {
    setSelectedPreset(preset.id);
    setPrompt(preset.prompt);
    setFog(preset.fog);
    setParticles(preset.particles);
    setLighting(preset.light);
    setDepth(preset.depth);
    setFrequency(preset.freq);
  };

  const toggleEntity = (id: string) => {
    setSelectedEntities((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleWeave = async () => {
    if (!prompt.trim() || isSynthesizing) return;
    try {
      const dream = await synthesizeDream(prompt.trim(), {
        fog,
        particleDensity: particles,
        lightingIntensity: lighting,
        environmentDepth: depth,
        carrierFreq: frequency,
      });
      navigate(`/dream/${dream.id}`);
    } catch {
      // error handled in context
    }
  };

  return (
    <PageContainer>
      <div className="pt-32 pb-24 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="text-center mb-12"
        >
          <motion.p variants={staggerItem} className="font-mono text-xs text-violet-400 tracking-[0.4em] uppercase mb-3">
            ── Neural Dream Studio ──
          </motion.p>
          <motion.h1 variants={staggerItem} className="font-syne text-4xl sm:text-6xl font-black uppercase tracking-tight text-slate-100 mb-3">
            WEAVE A DREAM
          </motion.h1>
          <motion.p variants={staggerItem} className="font-display italic text-lg sm:text-xl text-slate-400 max-w-xl mx-auto">
            "Calibrate atmospheric harmonics and materialize your own living subconscious dimension."
          </motion.p>
        </motion.div>

        {/* Main 2-Column Weaver Deck */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Dream Manifest & Parameters (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            
            {/* 1. Environment Presets */}
            <div className="glass-panel border border-white/10 rounded-lg p-5">
              <div className="flex items-center justify-between mb-3.5 pb-2 border-b border-white/05">
                <span className="font-mono text-xs font-bold text-cyan-400 tracking-wider uppercase">
                  1. Choose Environment Matrix
                </span>
                <span className="font-mono text-[10px] text-slate-500">QUICK PRESETS</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {PRESETS.map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => applyPreset(preset)}
                    className={[
                      'p-3 rounded-sm text-left transition-all duration-300 border flex flex-col justify-between h-24 cursor-pointer',
                      selectedPreset === preset.id
                        ? 'bg-violet-950/60 border-violet-400 text-violet-200 shadow-[0_0_20px_rgba(124,58,237,0.3)]'
                        : 'glass-panel-light border-white/08 hover:border-violet-500/40 text-slate-400',
                    ].join(' ')}
                  >
                    <span className="font-syne text-xs font-bold leading-snug">
                      {preset.name}
                    </span>
                    <span className="font-mono text-[9px] text-cyan-400">
                      {preset.freq} Hz
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Core Prompt Manifest */}
            <div className="glass-panel border border-violet-500/30 rounded-lg p-5 shadow-[0_0_30px_rgba(124,58,237,0.15)]">
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-xs font-bold text-violet-300 tracking-wider uppercase">
                  2. Describe Subconscious Manifest
                </span>
                <span className="font-mono text-[10px] text-slate-500">PROMPT ENGINE</span>
              </div>

              <textarea
                value={prompt}
                onChange={(e) => {
                  setPrompt(e.target.value);
                  setSelectedPreset(null);
                }}
                rows={3}
                placeholder="Describe landscapes, celestial entities, impossible structures, emotions, or light behavior..."
                className="dream-input w-full p-4 rounded-sm text-sm sm:text-base resize-none bg-void-950/60"
              />

              {/* Seed chips */}
              <div className="flex flex-wrap gap-1.5 mt-3">
                <span className="font-mono text-[10px] text-slate-500 mr-1 self-center">SEEDS:</span>
                {SEED_PROMPTS.slice(0, 4).map((seed) => (
                  <button
                    key={seed}
                    onClick={() => {
                      setPrompt(seed);
                      setSelectedPreset(null);
                    }}
                    className="font-mono text-[10px] px-2.5 py-1 rounded-full glass-panel-light border border-white/10 text-slate-400 hover:text-cyan-300 hover:border-cyan-500/30 transition-colors cursor-pointer"
                  >
                    {seed}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Dimensional Calibration Sliders */}
            <div className="glass-panel border border-white/10 rounded-lg p-5">
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-white/05">
                <span className="font-mono text-xs font-bold text-cyan-400 tracking-wider uppercase">
                  3. Calibrate Physics & Atmosphere
                </span>
                <span className="font-mono text-[10px] text-slate-500">6 CONTINUOUS METRICS</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
                {/* Fog */}
                <div className="glass-panel-light border border-white/05 p-3 rounded-sm">
                  <div className="flex justify-between mb-1.5 text-slate-400">
                    <span>FOG DENSITY</span>
                    <span className="text-cyan-400 font-bold">{fog}%</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="100"
                    value={fog}
                    onChange={(e) => setFog(Number(e.target.value))}
                    className="w-full accent-cyan-400 cursor-pointer"
                  />
                </div>

                {/* Stardust */}
                <div className="glass-panel-light border border-white/05 p-3 rounded-sm">
                  <div className="flex justify-between mb-1.5 text-slate-400">
                    <span>STARDUST PARTICLES</span>
                    <span className="text-violet-400 font-bold">{particles}%</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={particles}
                    onChange={(e) => setParticles(Number(e.target.value))}
                    className="w-full accent-violet-400 cursor-pointer"
                  />
                </div>

                {/* Light */}
                <div className="glass-panel-light border border-white/05 p-3 rounded-sm">
                  <div className="flex justify-between mb-1.5 text-slate-400">
                    <span>BLOOM INTENSITY</span>
                    <span className="text-pink-400 font-bold">{lighting}%</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={lighting}
                    onChange={(e) => setLighting(Number(e.target.value))}
                    className="w-full accent-pink-400 cursor-pointer"
                  />
                </div>

                {/* Void Depth */}
                <div className="glass-panel-light border border-white/05 p-3 rounded-sm">
                  <div className="flex justify-between mb-1.5 text-slate-400">
                    <span>VOID DEPTH</span>
                    <span className="text-emerald-400 font-bold">{depth}%</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={depth}
                    onChange={(e) => setDepth(Number(e.target.value))}
                    className="w-full accent-emerald-400 cursor-pointer"
                  />
                </div>

                {/* Carrier Frequency */}
                <div className="glass-panel-light border border-white/05 p-3 rounded-sm sm:col-span-2">
                  <div className="flex justify-between mb-1.5 text-slate-400">
                    <span>HARMONIC CARRIER FREQUENCY</span>
                    <span className="text-violet-300 font-bold">{frequency} Hz</span>
                  </div>
                  <input
                    type="range"
                    min="216"
                    max="963"
                    step="9"
                    value={frequency}
                    onChange={(e) => setFrequency(Number(e.target.value))}
                    className="w-full accent-violet-500 cursor-pointer"
                  />
                  <div className="flex justify-between text-[9px] text-slate-600 mt-1">
                    <span>216Hz (Void)</span>
                    <span>432Hz (Neural)</span>
                    <span>528Hz (Ethereal)</span>
                    <span>639Hz (Crystal)</span>
                    <span>963Hz (Quantum)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 4. Entity Population */}
            <div className="glass-panel border border-white/10 rounded-lg p-5">
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-white/05">
                <span className="font-mono text-xs font-bold text-cyan-400 tracking-wider uppercase">
                  4. Populate Spatial Entities & Relics
                </span>
                <span className="font-mono text-[10px] text-slate-500">SELECT BEACONS</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {DEFAULT_SCENE_ENTITIES.map((entity) => {
                  const active = selectedEntities.includes(entity.id);
                  return (
                    <div
                      key={entity.id}
                      onClick={() => toggleEntity(entity.id)}
                      className={[
                        'p-3 rounded-sm border transition-all cursor-pointer flex items-center justify-between',
                        active
                          ? 'bg-violet-950/50 border-violet-400 text-slate-100 shadow-[0_0_15px_rgba(124,58,237,0.25)]'
                          : 'glass-panel-light border-white/08 text-slate-400 hover:border-white/20',
                      ].join(' ')}
                    >
                      <div>
                        <p className="font-syne text-xs font-bold">{entity.name}</p>
                        <p className="font-mono text-[9px] text-slate-500">{entity.role}</p>
                      </div>
                      <span className="font-mono text-xs text-cyan-400 font-bold">
                        {active ? '✓' : '+'}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right: Live Telemetry Preview & Synthesis Action (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6 sticky top-28">
            
            {/* Live Holographic Preview Card */}
            <div className="glass-panel border border-cyan-500/30 rounded-lg p-5 relative overflow-hidden shadow-[0_0_40px_rgba(6,182,212,0.15)]">
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-white/05">
                <span className="font-mono text-xs font-bold text-cyan-300 tracking-wider uppercase flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                  Live Dimension Visualizer
                </span>
                <span className="font-mono text-[10px] text-slate-500">REAL-TIME</span>
              </div>

              {/* Dynamic visual preview canvas representation */}
              <div
                className="h-52 rounded-sm relative overflow-hidden flex flex-col items-center justify-center p-4 border border-white/10"
                style={{
                  background: `radial-gradient(ellipse at 50% 50%, rgba(124,58,237,${particles * 0.004}) 0%, rgba(6,182,212,${fog * 0.003}) 70%, #020617 100%)`,
                }}
              >
                {/* Floating graphic wireframe shape */}
                <div
                  className="w-24 h-24 rounded-sm border border-cyan-400/40 animate-spin flex items-center justify-center"
                  style={{
                    animationDuration: `${16 - (lighting * 0.1)}s`,
                    boxShadow: `0 0 ${lighting * 0.4}px rgba(6,182,212,0.4)`,
                  }}
                >
                  <div className="w-16 h-16 rounded-full border border-violet-400/50" />
                </div>

                {/* Overlaid stats */}
                <div className="absolute bottom-3 left-3 right-3 flex justify-between font-mono text-[10px] text-slate-300 bg-void-950/80 px-3 py-1.5 rounded-sm border border-white/10 backdrop-blur-sm">
                  <span>FREQ: {frequency}Hz</span>
                  <span>ENTITIES: {selectedEntities.length}</span>
                  <span>FOG: {fog}%</span>
                </div>
              </div>

              {/* Calculated Metrics */}
              <div className="grid grid-cols-2 gap-3 mt-4 font-mono text-xs">
                <div className="glass-panel-light border border-white/05 p-2.5 rounded-sm">
                  <p className="text-[9px] text-slate-500 uppercase">Calculated Coherence</p>
                  <p className="text-sm font-bold text-cyan-300 mt-0.5">
                    {Math.min(99, Math.floor(75 + (particles * 0.1) + (lighting * 0.14)))}%
                  </p>
                </div>
                <div className="glass-panel-light border border-white/05 p-2.5 rounded-sm">
                  <p className="text-[9px] text-slate-500 uppercase">Estimated Depth</p>
                  <p className="text-sm font-bold text-violet-300 mt-0.5">
                    {(depth * 0.35).toFixed(1)} km
                  </p>
                </div>
              </div>
            </div>

            {/* Synthesize Button / Progress Block */}
            <div className="glass-panel border border-violet-500/40 rounded-lg p-6 text-center shadow-[0_0_40px_rgba(124,58,237,0.25)]">
              {isSynthesizing ? (
                <div className="py-4">
                  <div className="w-10 h-10 border-2 border-violet-400 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                  <h4 className="font-syne text-base font-bold text-slate-100 uppercase mb-1">
                    Synthesizing Dimension
                  </h4>
                  <p className="font-mono text-xs text-cyan-300 animate-pulse">
                    {synthesisStep}
                  </p>
                </div>
              ) : (
                <>
                  <h4 className="font-syne text-lg font-bold text-slate-100 uppercase mb-2">
                    Materialize Dimension
                  </h4>
                  <p className="font-body text-xs text-slate-400 mb-6">
                    Compiles your subconscious prompt, parameters, and entities into a persistent navigable dream.
                  </p>
                  <button
                    onClick={handleWeave}
                    disabled={!prompt.trim()}
                    className={[
                      'w-full py-4 rounded-sm font-syne text-sm font-bold tracking-widest uppercase transition-all duration-300',
                      prompt.trim()
                        ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-[0_0_30px_rgba(124,58,237,0.45)] hover:shadow-[0_0_50px_rgba(124,58,237,0.7)] cursor-pointer hover:scale-[1.02]'
                        : 'bg-white/05 text-slate-600 cursor-not-allowed',
                    ].join(' ')}
                  >
                    ✦ Synthesize & Enter Realm ✦
                  </button>
                </>
              )}
            </div>

          </div>
        </div>
      </div>
    </PageContainer>
  );
}
