import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { staggerContainer, staggerItem, glowPulse } from '@/animations/variants';
import PrimaryButton from './PrimaryButton';
import SecondaryButton from './SecondaryButton';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 pb-32 overflow-hidden">
      {/* Atmospheric orbs */}
      <div
        className="atmo-orb w-[600px] h-[600px] top-[-200px] left-[-200px] opacity-20"
        style={{ background: 'radial-gradient(circle, #7c3aed 0%, transparent 70%)' }}
      />
      <div
        className="atmo-orb w-[500px] h-[500px] bottom-[-100px] right-[-150px] opacity-15"
        style={{ background: 'radial-gradient(circle, #06b6d4 0%, transparent 70%)' }}
      />
      <div
        className="atmo-orb w-[300px] h-[300px] top-[30%] right-[20%] opacity-10"
        style={{ background: 'radial-gradient(circle, #a855f7 0%, transparent 70%)' }}
      />

      {/* Decorative grid lines */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(124,58,237,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.5) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {/* Eyebrow */}
          <motion.div variants={staggerItem} className="mb-6">
            <div className="inline-flex items-center gap-3 glass-panel-light border-technical rounded-full px-5 py-2">
              <motion.span
                animate={glowPulse.animate}
                className="w-1.5 h-1.5 rounded-full bg-cyan-400"
                style={{ boxShadow: '0 0 6px #06b6d4' }}
              />
              <span className="font-mono text-xs text-cyan-400 tracking-[0.3em] uppercase">
                Neural Dreamscape Active
              </span>
            </div>
          </motion.div>

          {/* Main Title */}
          <motion.div variants={staggerItem}>
            <h1 className="font-display text-7xl sm:text-8xl lg:text-9xl font-bold italic text-slate-100 mb-0 glow-text-violet leading-none">
              AETHER
            </h1>
            <h1 className="font-syne text-7xl sm:text-8xl lg:text-9xl font-black uppercase tracking-[-0.02em] text-slate-100 mb-0 leading-none">
              DREAM
            </h1>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            variants={staggerItem}
            className="font-syne text-base sm:text-lg tracking-[0.4em] uppercase text-violet-300 mt-4 mb-2"
          >
            Neural Dreamscape Explorer
          </motion.p>

          {/* Tagline */}
          <motion.p
            variants={staggerItem}
            className="font-display italic text-xl sm:text-2xl text-slate-400 mt-3 mb-6"
          >
            "Enter the dream beyond reality."
          </motion.p>

          {/* Supporting text */}
          <motion.p
            variants={staggerItem}
            className="font-body text-slate-500 text-sm sm:text-base max-w-xl mx-auto leading-relaxed mb-10"
          >
            Explore impossible dimensions, weave new dreamscapes, and interact with an
            intelligence born from your imagination.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={staggerItem}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link to="/weave">
              <PrimaryButton size="lg">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M8 1L15 8L8 15M1 8H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Explore the Dream
              </PrimaryButton>
            </Link>
            <Link to="/weave">
              <SecondaryButton size="lg">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M8 2V14M2 8H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                Weave a Dream
              </SecondaryButton>
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="font-mono text-xs text-slate-600 tracking-widest uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-px h-8 bg-gradient-to-b from-violet-500/50 to-transparent"
          />
        </motion.div>
      </div>
    </section>
  );
}
