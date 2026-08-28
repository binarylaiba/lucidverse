import { motion, AnimatePresence } from 'framer-motion';
import { useDream } from '@/context/DreamContext';

export default function ChronicleModal() {
  const { chronicleDimension, closeChronicle, openInspector } = useDream();

  if (!chronicleDimension) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeChronicle}
          className="fixed inset-0 bg-black/80 backdrop-blur-lg"
        />

        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="relative glass-panel rounded-lg p-6 sm:p-8 max-w-2xl w-full z-10 border border-cyan-500/30 max-h-[85vh] overflow-y-auto shadow-[0_0_60px_rgba(6,182,212,0.2)]"
        >
          {/* Close */}
          <button
            onClick={closeChronicle}
            className="absolute top-5 right-5 w-8 h-8 rounded-sm glass-panel-light border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-cyan-400/50 transition-colors"
            aria-label="Close Chronicle"
          >
            ✕
          </button>

          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <p className="font-mono text-xs text-cyan-400 tracking-[0.3em] uppercase">
                AI Subconscious Chronicle · Archive Record
              </p>
            </div>
            <h1 className="font-syne text-2xl sm:text-4xl font-bold text-slate-100 uppercase tracking-wide">
              {chronicleDimension.title}
            </h1>
            <p className="font-display italic text-base text-violet-300 mt-1">
              "{chronicleDimension.subtitle}"
            </p>
          </div>

          {/* Telemetry Pill Bar */}
          <div className="flex flex-wrap gap-2 mb-6">
            <span className="font-mono text-xs px-3 py-1 rounded-sm glass-panel-light border border-white/10 text-slate-300">
              Coherence: <strong className="text-cyan-300">{chronicleDimension.coherence}%</strong>
            </span>
            <span className="font-mono text-xs px-3 py-1 rounded-sm glass-panel-light border border-white/10 text-slate-300">
              Stability: <strong className="text-green-400">{chronicleDimension.stability}%</strong>
            </span>
            <span className="font-mono text-xs px-3 py-1 rounded-sm glass-panel-light border border-white/10 text-slate-300">
              Frequency: <strong className="text-violet-300">{chronicleDimension.frequency}</strong>
            </span>
            <span className="font-mono text-xs px-3 py-1 rounded-sm glass-panel-light border border-white/10 text-slate-300">
              Depth: <strong className="text-slate-200">{chronicleDimension.depth}</strong>
            </span>
          </div>

          {/* Story Content */}
          <div className="glass-panel-light border border-white/05 rounded-sm p-5 mb-6 space-y-3">
            <p className="font-mono text-xs text-slate-500 uppercase tracking-widest">
              Neural Narrative Excerpt
            </p>
            {chronicleDimension.storyLore && chronicleDimension.storyLore.length > 0 ? (
              chronicleDimension.storyLore.map((p, i) => (
                <p key={i} className="font-body text-sm sm:text-base text-slate-300 leading-relaxed">
                  {p}
                </p>
              ))
            ) : (
              <p className="font-body text-sm sm:text-base text-slate-300 leading-relaxed">
                {chronicleDimension.description}
              </p>
            )}
          </div>

          {/* Entities in this realm */}
          {chronicleDimension.entities && chronicleDimension.entities.length > 0 && (
            <div className="mb-6">
              <p className="font-mono text-xs text-slate-500 uppercase tracking-widest mb-3">
                Identified Scene Entities
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {chronicleDimension.entities.map((entity) => (
                  <div
                    key={entity.id}
                    onClick={() => {
                      closeChronicle();
                      openInspector(entity);
                    }}
                    className="glass-panel-light border border-white/05 hover:border-cyan-500/40 rounded-sm p-3 cursor-pointer transition-all duration-200 group"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-syne text-xs font-bold text-slate-200 group-hover:text-cyan-300">
                        {entity.name}
                      </span>
                      <span className="font-mono text-[10px] text-cyan-400">
                        {entity.frequency}
                      </span>
                    </div>
                    <p className="font-body text-xs text-slate-500 line-clamp-1">
                      {entity.role} · {entity.category}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="flex justify-end pt-2 border-t border-white/05">
            <button
              onClick={closeChronicle}
              className="px-6 py-2.5 rounded-sm font-syne text-xs font-semibold tracking-widest uppercase bg-cyan-600/20 text-cyan-300 border border-cyan-500/40 hover:bg-cyan-600/30 transition-all"
            >
              Close Chronicle
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
