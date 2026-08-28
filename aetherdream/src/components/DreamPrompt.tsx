import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { SEED_PROMPTS } from '@/data';
import { fadeInUp } from '@/animations/variants';
import { useDream } from '@/context/DreamContext';

interface DreamPromptProps {
  onSubmit?: (prompt: string) => void;
}

export default function DreamPrompt({ onSubmit }: DreamPromptProps) {
  const [prompt, setPrompt] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const { synthesizeDream, isSynthesizing, synthesisStep } = useDream();
  const navigate = useNavigate();

  const handleSeed = (seed: string) => {
    setPrompt(seed);
    inputRef.current?.focus();
  };

  const handleSubmit = async () => {
    if (!prompt.trim() || isSynthesizing) return;
    if (onSubmit) {
      onSubmit(prompt.trim());
    } else {
      try {
        const dream = await synthesizeDream(prompt.trim());
        setPrompt('');
        navigate(`/dream/${dream.id}`);
      } catch {
        // error handled
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      handleSubmit();
    }
  };

  return (
    <motion.section
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
      className="max-w-3xl mx-auto px-4 sm:px-6"
    >
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel-light border border-violet-500/20 mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          <p className="font-mono text-[11px] text-cyan-400 tracking-widest uppercase">
            Neural Dream Synthesis Engine
          </p>
        </div>
        <h2 className="font-syne text-2xl sm:text-4xl font-bold text-slate-100 tracking-wide">
          Describe Your Dreamscape
        </h2>
        <p className="font-body text-sm text-slate-400 mt-2 max-w-lg mx-auto">
          Type any subconscious concept or select a seed below to synthesize a living, navigable dimension.
        </p>
      </div>

      {/* Input area */}
      <div
        className={[
          'relative glass-panel rounded-lg overflow-hidden',
          'transition-all duration-500',
          isFocused
            ? 'border-violet-500/60 shadow-[0_0_50px_rgba(124,58,237,0.25)]'
            : 'border-white/10',
        ].join(' ')}
      >
        {/* Top bar */}
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/05 bg-void-950/40">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <span className="w-2 h-2 rounded-full bg-red-500/70" />
              <span className="w-2 h-2 rounded-full bg-yellow-500/70" />
              <span className="w-2 h-2 rounded-full bg-green-500/70" />
            </div>
            <span className="font-mono text-xs text-slate-500 tracking-widest ml-2">
              SYNAPSE_INPUT.aether
            </span>
          </div>
          <span className="font-mono text-[10px] text-violet-400">
            COHERENCE FLUX 98.4%
          </span>
        </div>

        <textarea
          ref={inputRef}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onKeyDown={handleKeyDown}
          placeholder="Describe the world you want to enter (e.g. Floating crystal spires above an infinite ocean with glowing bioluminescent reefs...)"
          rows={4}
          disabled={isSynthesizing}
          className="dream-input w-full px-5 py-4 resize-none text-sm sm:text-base leading-relaxed bg-transparent"
          aria-label="Dream prompt input"
        />

        {/* Footer bar */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-white/05 bg-void-950/40">
          <span className="font-mono text-xs text-slate-500">
            {isSynthesizing ? (
              <span className="text-cyan-400 animate-pulse">{synthesisStep}</span>
            ) : prompt.length > 0 ? (
              `${prompt.length} chars · Press Cmd+Enter`
            ) : (
              'Cmd+Enter to synthesize'
            )}
          </span>

          <motion.button
            whileHover={{ scale: isSynthesizing ? 1 : 1.04 }}
            whileTap={{ scale: isSynthesizing ? 1 : 0.97 }}
            onClick={handleSubmit}
            disabled={!prompt.trim() || isSynthesizing}
            className={[
              'flex items-center gap-2 px-6 py-2.5 rounded-sm',
              'font-syne text-xs font-semibold tracking-widest uppercase',
              'transition-all duration-300',
              prompt.trim() && !isSynthesizing
                ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-[0_0_25px_rgba(124,58,237,0.35)] cursor-pointer hover:shadow-[0_0_35px_rgba(124,58,237,0.5)]'
                : 'bg-white/05 text-slate-600 cursor-not-allowed',
            ].join(' ')}
            aria-label="Synthesize dream"
          >
            {isSynthesizing ? (
              <>
                <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Synthesizing...</span>
              </>
            ) : (
              <>
                <span>✦ Synthesize</span>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2 6H10M7 3L10 6L7 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </>
            )}
          </motion.button>
        </div>
      </div>

      {/* Seed chips */}
      <div className="mt-6">
        <p className="font-mono text-xs text-slate-500 tracking-widest uppercase mb-3 text-center">
          Subconscious Seed Coordinates
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          <AnimatePresence>
            {SEED_PROMPTS.map((seed, i) => (
              <motion.button
                key={seed}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.04 }}
                whileHover={{ scale: 1.04, borderColor: 'rgba(167,139,250,0.6)' }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleSeed(seed)}
                className="glass-panel-light border border-white/10 rounded-full px-4 py-1.5 font-mono text-xs text-slate-400 hover:text-violet-300 hover:bg-violet-950/30 transition-all duration-200 cursor-pointer"
                aria-label={`Use prompt: ${seed}`}
              >
                + {seed}
              </motion.button>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </motion.section>
  );
}
