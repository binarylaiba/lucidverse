import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useDream } from '@/context/DreamContext';
import { SEED_PROMPTS } from '@/data';

export default function WeaveModal() {
  const { weaveModalOpen, closeWeaveModal, synthesizeDream, isSynthesizing, synthesisStep } = useDream();
  const [prompt, setPrompt] = useState('');
  const [fog, setFog] = useState(45);
  const [particleDensity, setParticleDensity] = useState(80);
  const [lightingIntensity, setLightingIntensity] = useState(85);
  const [environmentDepth, setEnvironmentDepth] = useState(75);
  const navigate = useNavigate();

  if (!weaveModalOpen) return null;

  const handleSynthesize = async () => {
    if (!prompt.trim()) return;
    try {
      const newDream = await synthesizeDream(prompt, {
        fog,
        particleDensity,
        lightingIntensity,
        environmentDepth,
      });
      closeWeaveModal();
      setPrompt('');
      navigate(`/dream/${newDream.id}`);
    } catch {
      // error handled in context
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeWeaveModal}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.93, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.93, y: 20 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="relative glass-panel rounded-lg p-6 sm:p-8 max-w-xl w-full z-10 border border-violet-500/30 shadow-[0_0_60px_rgba(124,58,237,0.3)]"
        >
          {/* Close button */}
          <button
            onClick={closeWeaveModal}
            className="absolute top-5 right-5 w-8 h-8 rounded-sm glass-panel-light border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-violet-400/50 transition-colors"
            aria-label="Close Weaver"
          >
            ✕
          </button>

          {/* Header */}
          <div className="mb-5">
            <p className="font-mono text-xs text-violet-400 tracking-[0.3em] uppercase mb-1">
              Neural Dream Synthesizer
            </p>
            <h2 className="font-syne text-2xl sm:text-3xl font-bold text-slate-100 uppercase">
              Weave New Dreamscape
            </h2>
            <p className="font-body text-xs text-slate-400 mt-1">
              Calibrate subconscious parameters and materialize a new dimension.
            </p>
          </div>

          {/* Sliders Grid */}
          <div className="grid grid-cols-2 gap-3.5 mb-5 font-mono text-xs">
            <div className="glass-panel-light border border-white/05 rounded-sm p-3">
              <div className="flex justify-between text-slate-400 mb-1">
                <span>FOG DENSITY</span>
                <span className="text-cyan-400">{fog}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                value={fog}
                onChange={(e) => setFog(Number(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer"
              />
            </div>

            <div className="glass-panel-light border border-white/05 rounded-sm p-3">
              <div className="flex justify-between text-slate-400 mb-1">
                <span>STARDUST</span>
                <span className="text-violet-400">{particleDensity}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                value={particleDensity}
                onChange={(e) => setParticleDensity(Number(e.target.value))}
                className="w-full accent-violet-400 cursor-pointer"
              />
            </div>

            <div className="glass-panel-light border border-white/05 rounded-sm p-3">
              <div className="flex justify-between text-slate-400 mb-1">
                <span>LIGHT BLOOM</span>
                <span className="text-pink-400">{lightingIntensity}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                value={lightingIntensity}
                onChange={(e) => setLightingIntensity(Number(e.target.value))}
                className="w-full accent-pink-400 cursor-pointer"
              />
            </div>

            <div className="glass-panel-light border border-white/05 rounded-sm p-3">
              <div className="flex justify-between text-slate-400 mb-1">
                <span>VOID DEPTH</span>
                <span className="text-emerald-400">{environmentDepth}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                value={environmentDepth}
                onChange={(e) => setEnvironmentDepth(Number(e.target.value))}
                className="w-full accent-emerald-400 cursor-pointer"
              />
            </div>
          </div>

          {/* Dream Prompt Input */}
          <div className="mb-4">
            <label className="block font-mono text-xs text-slate-400 tracking-wider uppercase mb-1.5">
              Dream Core Manifest
            </label>
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g. Floating quartz spires above a mirror sea..."
              className="dream-input w-full px-4 py-3 rounded-sm text-sm"
              onKeyDown={(e) => e.key === 'Enter' && handleSynthesize()}
            />
          </div>

          {/* Quick Seeds */}
          <div className="flex flex-wrap gap-1.5 mb-6">
            {SEED_PROMPTS.slice(0, 3).map((seed) => (
              <button
                key={seed}
                onClick={() => setPrompt(seed)}
                className="font-mono text-[10px] px-2.5 py-1 rounded-full glass-panel-light border border-white/10 text-slate-400 hover:text-violet-300 hover:border-violet-400/40 transition-colors"
              >
                + {seed}
              </button>
            ))}
          </div>

          {/* Synthesis Status / Action */}
          {isSynthesizing ? (
            <div className="glass-panel-light border border-violet-500/40 rounded-sm p-4 text-center">
              <div className="w-6 h-6 border-2 border-violet-400 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
              <p className="font-mono text-xs text-violet-300 tracking-widest uppercase">
                {synthesisStep}
              </p>
            </div>
          ) : (
            <div className="flex items-center justify-end gap-3 pt-2 border-t border-white/05">
              <button
                onClick={closeWeaveModal}
                className="px-5 py-2.5 rounded-sm font-mono text-xs tracking-wider text-slate-400 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSynthesize}
                disabled={!prompt.trim()}
                className={[
                  'px-6 py-2.5 rounded-sm font-syne text-xs font-semibold tracking-widest uppercase transition-all',
                  prompt.trim()
                    ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white hover:shadow-[0_0_30px_rgba(124,58,237,0.4)] cursor-pointer'
                    : 'bg-white/05 text-slate-600 cursor-not-allowed',
                ].join(' ')}
              >
                Synthesize Realm
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
