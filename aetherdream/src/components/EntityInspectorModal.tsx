import { motion, AnimatePresence } from 'framer-motion';
import { useDream } from '@/context/DreamContext';

export default function EntityInspectorModal() {
  const { inspectEntity, closeInspector, toggleAudio, showToast } = useDream();

  if (!inspectEntity) return null;

  const handleFocusResonance = () => {
    const freqNum = parseInt(inspectEntity.frequency) || 432;
    toggleAudio(freqNum);
    showToast(`Focused resonance calibrated to ${inspectEntity.frequency}`);
    closeInspector();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeInspector}
          className="fixed inset-0 bg-black/75 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative glass-panel rounded-lg p-6 sm:p-8 max-w-lg w-full z-10 border border-violet-500/30 shadow-[0_0_50px_rgba(124,58,237,0.25)]"
        >
          {/* Close button */}
          <button
            onClick={closeInspector}
            className="absolute top-5 right-5 w-8 h-8 rounded-sm glass-panel-light border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-violet-400/50 transition-colors"
            aria-label="Close Inspector"
          >
            ✕
          </button>

          {/* Header */}
          <div className="flex items-center gap-3.5 mb-5">
            <div
              className="w-12 h-12 rounded-sm flex items-center justify-center border text-xl"
              style={{
                background: `${inspectEntity.color}15`,
                borderColor: `${inspectEntity.color}40`,
                color: inspectEntity.color,
              }}
            >
              ✦
            </div>
            <div>
              <p className="font-mono text-xs tracking-widest uppercase text-cyan-400">
                {inspectEntity.category}
              </p>
              <h2 className="font-syne text-xl sm:text-2xl font-bold text-slate-100">
                {inspectEntity.name}
              </h2>
            </div>
          </div>

          {/* Description */}
          <div className="glass-panel-light border border-white/05 rounded-sm p-4 mb-5">
            <p className="font-mono text-[10px] text-slate-500 tracking-wider uppercase mb-1.5">
              Neural Telemetry & Lore
            </p>
            <p className="font-body text-sm text-slate-300 leading-relaxed">
              {inspectEntity.description}
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="glass-panel-light border border-white/05 rounded-sm p-3">
              <p className="font-mono text-[10px] text-slate-500 uppercase tracking-wider">
                Resonance Frequency
              </p>
              <p className="font-mono text-base text-cyan-300 font-bold mt-0.5">
                {inspectEntity.frequency}
              </p>
            </div>
            <div className="glass-panel-light border border-white/05 rounded-sm p-3">
              <p className="font-mono text-[10px] text-slate-500 uppercase tracking-wider">
                Role Classification
              </p>
              <p className="font-mono text-base text-violet-300 font-bold mt-0.5">
                {inspectEntity.role}
              </p>
            </div>
          </div>

          {inspectEntity.coordinates && (
            <p className="font-mono text-xs text-slate-600 text-center mb-5 tracking-widest">
              SPATIAL COORD: {inspectEntity.coordinates}
            </p>
          )}

          {/* Actions */}
          <div className="flex justify-end gap-3">
            <button
              onClick={closeInspector}
              className="px-5 py-2 rounded-sm font-mono text-xs tracking-wider text-slate-400 hover:text-white transition-colors"
            >
              Dismiss
            </button>
            <button
              onClick={handleFocusResonance}
              className="px-5 py-2.5 rounded-sm font-syne text-xs font-semibold tracking-widest uppercase bg-gradient-to-r from-violet-600 to-indigo-600 text-white hover:shadow-[0_0_25px_rgba(124,58,237,0.4)] transition-all"
            >
              Tune Harmonic Resonance
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
