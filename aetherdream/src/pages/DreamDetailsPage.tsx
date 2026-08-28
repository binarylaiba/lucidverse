import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import PageContainer from '@/components/PageContainer';
import { useDream } from '@/context/DreamContext';
import { staggerContainer, staggerItem } from '@/animations/variants';
import PrimaryButton from '@/components/PrimaryButton';
import SecondaryButton from '@/components/SecondaryButton';

export default function DreamDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const { dimensions, dreams, isBookmarked, toggleBookmark, openInspector, toggleAudio, showToast } = useDream();
  const [isImmersionActive, setIsImmersionActive] = useState(false);

  // Search in both codex dimensions and custom dreams
  const rawDimension = dimensions.find((d) => d.id === id) || dreams.find((d) => d.id === id);

  if (!rawDimension) {
    return (
      <PageContainer>
        <div className="pt-40 pb-24 text-center max-w-lg mx-auto px-4">
          <div className="w-16 h-16 rounded-full border border-violet-500/30 bg-violet-950/40 flex items-center justify-center mx-auto mb-6 text-2xl text-violet-400">
            ✦
          </div>
          <h1 className="font-syne text-3xl font-bold text-slate-100 mb-3">Dimension Not Found</h1>
          <p className="font-body text-slate-400 mb-8 text-sm">
            This dimensional coordinate has either faded into the void or is awaiting synthesis.
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/codex">
              <SecondaryButton>Browse Codex</SecondaryButton>
            </Link>
            <Link to="/weave">
              <PrimaryButton>Weave It Now</PrimaryButton>
            </Link>
          </div>
        </div>
      </PageContainer>
    );
  }

  const primaryColor =
    ('colorPrimary' in rawDimension && rawDimension.colorPrimary)
      ? rawDimension.colorPrimary
      : ('colors' in rawDimension && rawDimension.colors && rawDimension.colors.length > 0)
      ? rawDimension.colors[0]
      : '#06b6d4';

  const secondaryColor =
    ('colorSecondary' in rawDimension && rawDimension.colorSecondary)
      ? rawDimension.colorSecondary
      : ('colors' in rawDimension && rawDimension.colors && rawDimension.colors.length > 1)
      ? rawDimension.colors[1]
      : '#7c3aed';

  const tagsList = rawDimension.tags || [rawDimension.mood];
  const storyList = rawDimension.storyLore || [rawDimension.description];

  const bookmarked = isBookmarked(rawDimension.id);
  const freqNum = parseInt(rawDimension.frequency) || 432;

  const handleTune = () => {
    toggleAudio(freqNum);
  };

  const handleEnterImmersion = () => {
    setIsImmersionActive(true);
    toggleAudio(freqNum);
    showToast(`Entering deep immersion: ${rawDimension.title}`);
  };

  return (
    <PageContainer>
      {/* Fullscreen Immersion Mode Overlay */}
      <AnimatePresence>
        {isImmersionActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-void-950/90 backdrop-blur-xl flex flex-col justify-between p-8"
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
                <span className="font-mono text-xs text-cyan-300 tracking-widest uppercase">
                  DEEP IMMERSION MODE · {rawDimension.title}
                </span>
              </div>
              <button
                onClick={() => setIsImmersionActive(false)}
                className="px-4 py-2 rounded-sm font-mono text-xs text-slate-400 hover:text-white glass-panel border border-white/10 cursor-pointer"
              >
                Exit Immersion (ESC)
              </button>
            </div>

            <div className="max-w-2xl mx-auto text-center space-y-4">
              <h2 className="font-display italic text-4xl sm:text-6xl text-slate-100">
                "{rawDimension.subtitle}"
              </h2>
              <p className="font-mono text-xs text-cyan-400 tracking-widest">
                HARMONIC RESONANCE: {rawDimension.frequency} · COHERENCE: {rawDimension.coherence}%
              </p>
            </div>

            <div className="flex justify-between items-center font-mono text-xs text-slate-500">
              <span>USE MOUSE TO NAVIGATE SPATIAL PARALLAX</span>
              <span>PRESS ESC TO RETURN</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="pt-32 pb-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {/* Breadcrumb */}
          <motion.div variants={staggerItem} className="flex items-center gap-2 mb-8 font-mono text-xs text-slate-500">
            <Link to="/" className="hover:text-violet-300 transition-colors">DRIFT</Link>
            <span>/</span>
            <Link to="/codex" className="hover:text-violet-300 transition-colors">CODEX</Link>
            <span>/</span>
            <span className="text-cyan-400">{rawDimension.title}</span>
          </motion.div>

          {/* Main Dimension Portal Box */}
          <motion.div
            variants={staggerItem}
            className="glass-panel rounded-lg overflow-hidden mb-8 border shadow-[0_0_60px_rgba(124,58,237,0.2)]"
            style={{ borderColor: `${primaryColor}40` }}
          >
            {/* Interactive Dimension Viewport Header */}
            <div
              className="h-72 sm:h-96 relative overflow-hidden flex flex-col justify-between p-6 sm:p-8"
              style={{
                background: `radial-gradient(ellipse at 50% 60%, ${primaryColor}25 0%, ${secondaryColor}15 50%, #020617 100%)`,
              }}
            >
              {/* Top Tags */}
              <div className="flex items-center justify-between z-10">
                <div className="flex items-center gap-2">
                  <span
                    className="w-2 h-2 rounded-full animate-pulse"
                    style={{ backgroundColor: primaryColor }}
                  />
                  <span
                    className="font-mono text-xs font-bold tracking-widest uppercase"
                    style={{ color: primaryColor }}
                  >
                    {rawDimension.mood} · {rawDimension.frequency}
                  </span>
                </div>

                <button
                  onClick={() => toggleBookmark(rawDimension.id)}
                  className="px-3.5 py-1.5 rounded-sm glass-panel-light border border-white/15 text-xs font-mono text-slate-300 hover:text-white flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <span>{bookmarked ? '★ Bookmarked' : '☆ Bookmark'}</span>
                </button>
              </div>

              {/* Central Title */}
              <div className="z-10 my-auto">
                <h1 className="font-syne text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-slate-100 mb-2">
                  {rawDimension.title}
                </h1>
                <p className="font-display italic text-lg sm:text-2xl text-violet-300">
                  "{rawDimension.subtitle}"
                </p>
              </div>

              {/* Bottom Quick Controls */}
              <div className="flex flex-wrap items-center justify-between gap-3 z-10 bg-void-950/80 p-3.5 rounded-sm border border-white/10 backdrop-blur-md">
                <div className="flex items-center gap-4 font-mono text-xs text-slate-400">
                  <span>COH: <strong className="text-cyan-300">{rawDimension.coherence}%</strong></span>
                  <span>STA: <strong className="text-green-400">{rawDimension.stability}%</strong></span>
                  <span>DEP: <strong className="text-violet-300">{rawDimension.depth}</strong></span>
                </div>

                <button
                  onClick={handleTune}
                  className="px-3.5 py-1.5 rounded-sm font-mono text-xs text-cyan-300 border border-cyan-500/40 hover:bg-cyan-600/20 transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <span>🎧</span>
                  <span>Tune Harmonics</span>
                </button>
              </div>
            </div>

            {/* Description & Metrics Section */}
            <div className="p-6 sm:p-8 space-y-8">
              <div>
                <h3 className="font-mono text-xs text-slate-500 uppercase tracking-widest mb-2">
                  Subconscious Description
                </h3>
                <p className="font-body text-base text-slate-300 leading-relaxed">
                  {rawDimension.description}
                </p>
              </div>

              {/* Detailed Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="glass-panel-light border border-white/05 rounded-sm p-4 text-center">
                  <p className="font-mono text-[10px] text-slate-500 tracking-wider uppercase mb-1">Neural Coherence</p>
                  <p className="font-mono text-2xl font-bold" style={{ color: primaryColor }}>
                    {rawDimension.coherence}%
                  </p>
                  <div className="w-full bg-white/05 h-1 rounded-full mt-2 overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${rawDimension.coherence}%`, background: primaryColor }} />
                  </div>
                </div>

                <div className="glass-panel-light border border-white/05 rounded-sm p-4 text-center">
                  <p className="font-mono text-[10px] text-slate-500 tracking-wider uppercase mb-1">Dimension Stability</p>
                  <p className="font-mono text-2xl font-bold text-green-400">
                    {rawDimension.stability}%
                  </p>
                  <div className="w-full bg-white/05 h-1 rounded-full mt-2 overflow-hidden">
                    <div className="h-full bg-green-400 rounded-full" style={{ width: `${rawDimension.stability}%` }} />
                  </div>
                </div>

                <div className="glass-panel-light border border-white/05 rounded-sm p-4 text-center">
                  <p className="font-mono text-[10px] text-slate-500 tracking-wider uppercase mb-1">Harmonic Carrier</p>
                  <p className="font-mono text-2xl font-bold text-violet-300">
                    {rawDimension.frequency}
                  </p>
                  <p className="font-mono text-[9px] text-slate-500 mt-1">Theta resonant</p>
                </div>

                <div className="glass-panel-light border border-white/05 rounded-sm p-4 text-center">
                  <p className="font-mono text-[10px] text-slate-500 tracking-wider uppercase mb-1">Dimensional Depth</p>
                  <p className="font-mono text-2xl font-bold text-pink-300">
                    {rawDimension.depth}
                  </p>
                  <p className="font-mono text-[9px] text-slate-500 mt-1">Void tier</p>
                </div>
              </div>

              {/* Story Lore Excerpts */}
              {storyList.length > 0 && (
                <div className="glass-panel-light border border-white/05 rounded-sm p-6 space-y-3">
                  <h3 className="font-mono text-xs text-slate-400 uppercase tracking-widest mb-1">
                    Archived Chronicle Excerpts
                  </h3>
                  {storyList.map((p: string, i: number) => (
                    <p key={i} className="font-body text-sm sm:text-base text-slate-300 leading-relaxed">
                      {p}
                    </p>
                  ))}
                </div>
              )}

              {/* Interactive Entities in this Realm */}
              {rawDimension.entities && rawDimension.entities.length > 0 && (
                <div>
                  <h3 className="font-mono text-xs text-slate-500 uppercase tracking-widest mb-3">
                    Discovered Scene Entities & Relics
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {rawDimension.entities.map((entity) => (
                      <div
                        key={entity.id}
                        onClick={() => openInspector(entity)}
                        className="glass-panel-light border border-white/08 hover:border-cyan-500/40 rounded-sm p-4 cursor-pointer transition-all group"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-syne text-sm font-bold text-slate-200 group-hover:text-cyan-300 transition-colors">
                            {entity.name}
                          </h4>
                          <span className="font-mono text-xs text-cyan-400">
                            {entity.frequency}
                          </span>
                        </div>
                        <p className="font-body text-xs text-slate-400 line-clamp-2">
                          {entity.role} · {entity.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tags */}
              <div className="flex flex-wrap gap-2 pt-2">
                {tagsList.map((tag: string) => (
                  <span
                    key={tag}
                    className="font-mono text-xs px-3 py-1 rounded-full"
                    style={{
                      background: `${primaryColor}15`,
                      color: `${primaryColor}ee`,
                      border: `1px solid ${primaryColor}30`,
                    }}
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 pt-4 border-t border-white/05">
                <button
                  onClick={handleEnterImmersion}
                  className="px-8 py-3.5 rounded-sm font-syne text-xs font-semibold tracking-widest uppercase bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-[0_0_25px_rgba(124,58,237,0.4)] hover:shadow-[0_0_35px_rgba(124,58,237,0.6)] transition-all cursor-pointer"
                >
                  ✦ Enter Immersion Mode
                </button>
                <button
                  onClick={() => toggleBookmark(rawDimension.id)}
                  className="px-6 py-3.5 rounded-sm font-mono text-xs tracking-wider text-slate-300 glass-panel-light border border-white/15 hover:text-white hover:border-violet-400 transition-all cursor-pointer"
                >
                  {bookmarked ? '★ Remove from Codex' : '☆ Add to Codex'}
                </button>
              </div>

            </div>
          </motion.div>
        </motion.div>
      </div>
    </PageContainer>
  );
}
