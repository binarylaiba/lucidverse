import { motion, AnimatePresence } from 'framer-motion';
import { useDream } from '@/context/DreamContext';

export default function Toast() {
  const { toastMessage } = useDream();

  return (
    <AnimatePresence>
      {toastMessage && (
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="fixed bottom-6 right-6 z-50 pointer-events-none"
        >
          <div className="glass-panel border border-violet-500/40 rounded-sm px-5 py-3 shadow-[0_0_30px_rgba(124,58,237,0.3)] flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <p className="font-mono text-xs text-slate-200 tracking-wider">
              {toastMessage}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
