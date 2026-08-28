import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { NAV_ITEMS } from '@/data';
import { mobileNavOverlay, mobileNavPanel, staggerContainer, staggerItem } from '@/animations/variants';

interface MobileNavigationProps {
  onClose: () => void;
}

export default function MobileNavigation({ onClose }: MobileNavigationProps) {
  return (
    <>
      {/* Backdrop */}
      <motion.div
        key="mobile-overlay"
        variants={mobileNavOverlay}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={onClose}
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
      />

      {/* Panel */}
      <motion.div
        key="mobile-panel"
        variants={mobileNavPanel}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="fixed top-0 right-0 bottom-0 z-50 w-72 glass-panel border-l border-white/05 flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/05">
          <span className="font-syne font-bold tracking-[0.2em] uppercase text-sm text-slate-100">
            Navigate
          </span>
          <button
            onClick={onClose}
            aria-label="Close navigation"
            className="w-8 h-8 flex items-center justify-center rounded-sm border border-white/10 text-slate-400 hover:text-white hover:border-violet-500/50 transition-all duration-200 cursor-pointer"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M1 1L11 11M11 1L1 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Nav Items */}
        <motion.nav
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="flex-1 px-6 py-8 flex flex-col gap-2"
          aria-label="Mobile navigation"
        >
          {NAV_ITEMS.map((item) => (
            <motion.div key={item.id} variants={staggerItem}>
              <NavLink
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  [
                    'flex items-center gap-3 px-4 py-3 rounded-sm',
                    'font-syne text-sm font-semibold tracking-widest uppercase',
                    'transition-all duration-200',
                    isActive
                      ? 'bg-violet-950/50 text-violet-300 border border-violet-500/30'
                      : 'text-slate-400 hover:text-violet-300 hover:bg-white/03 border border-transparent',
                  ].join(' ')
                }
              >
                <span className="w-1 h-1 rounded-full bg-current opacity-60" />
                {item.label}
              </NavLink>
            </motion.div>
          ))}

          {/* Divider */}
          <hr className="divider-glow my-4" />

          {/* Additional links */}
          <motion.div variants={staggerItem}>
            <NavLink
              to="/my-dreams"
              onClick={onClose}
              className={({ isActive }) =>
                [
                  'flex items-center gap-3 px-4 py-3 rounded-sm',
                  'font-syne text-sm font-semibold tracking-widest uppercase',
                  'transition-all duration-200',
                  isActive
                    ? 'bg-violet-950/50 text-violet-300 border border-violet-500/30'
                    : 'text-slate-400 hover:text-violet-300 hover:bg-white/03 border border-transparent',
                ].join(' ')
              }
            >
              <span className="w-1 h-1 rounded-full bg-current opacity-60" />
              MY DREAMS
            </NavLink>
          </motion.div>
        </motion.nav>

        {/* Footer status */}
        <div className="px-6 py-5 border-t border-white/05">
          <div className="flex items-center gap-2">
            <span className="status-dot status-dot-optimal" />
            <span className="font-mono text-xs text-cyan-400 tracking-widest">AETHER AI ONLINE</span>
          </div>
        </div>
      </motion.div>
    </>
  );
}
