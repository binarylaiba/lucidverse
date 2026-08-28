import Hero from '@/components/Hero';
import DreamPrompt from '@/components/DreamPrompt';
import DimensionCard from '@/components/DimensionCard';
import TelemetryPanel from '@/components/TelemetryPanel';
import { motion } from 'framer-motion';
import { useDream } from '@/context/DreamContext';
import { DEFAULT_SCENE_ENTITIES } from '@/data';
import { staggerContainer, staggerItem } from '@/animations/variants';
import { Link } from 'react-router-dom';

export default function LandingPage() {
  const { dimensions, openInspector, openWeaveModal } = useDream();

  return (
    <div>
      {/* Hero Section */}
      <Hero />

      {/* Interactive 3D Scene Entities Ribbon */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 mb-20 relative z-20">
        <div className="glass-panel border border-cyan-500/20 rounded-lg p-5 shadow-[0_0_40px_rgba(6,182,212,0.1)]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-white/05 mb-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <h3 className="font-mono text-xs font-bold tracking-widest text-cyan-300 uppercase">
                Interactive Scene Entities in Active Void
              </h3>
            </div>
            <span className="font-mono text-[10px] text-slate-500">
              CLICK AN ENTITY TO INSPECT RESONANCE & TELEMETRY
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {DEFAULT_SCENE_ENTITIES.map((entity) => (
              <div
                key={entity.id}
                onClick={() => openInspector(entity)}
                className="glass-panel-light border border-white/08 hover:border-cyan-500/40 rounded-sm p-3.5 cursor-pointer transition-all duration-300 group hover:-translate-y-0.5"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span
                    className="font-mono text-[10px] font-bold tracking-wider"
                    style={{ color: entity.color }}
                  >
                    {entity.category}
                  </span>
                  <span className="font-mono text-[10px] text-slate-500">
                    {entity.frequency}
                  </span>
                </div>
                <h4 className="font-syne text-sm font-bold text-slate-200 group-hover:text-cyan-300 transition-colors">
                  {entity.name}
                </h4>
                <p className="font-body text-xs text-slate-400 mt-1 line-clamp-1">
                  {entity.role} · {entity.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dream Synthesis Prompt Engine */}
      <section className="pb-24">
        <DreamPrompt />
      </section>

      {/* Divider */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <hr className="divider-glow" />
      </div>

      {/* Featured Dimensions */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-12"
        >
          <motion.div variants={staggerItem} className="flex items-center gap-4 mb-4">
            <hr className="flex-1 divider-glow" />
            <p className="font-mono text-xs text-violet-400 tracking-[0.3em] uppercase">
              Featured Dimensions
            </p>
            <hr className="flex-1 divider-glow" />
          </motion.div>
          <motion.h2
            variants={staggerItem}
            className="font-syne text-3xl sm:text-4xl font-bold text-slate-100 text-center tracking-wide"
          >
            Explore the Dreamscape
          </motion.h2>
          <motion.p
            variants={staggerItem}
            className="font-body text-slate-400 text-center mt-3 max-w-lg mx-auto text-sm sm:text-base"
          >
            Navigate curated dream dimensions, each a unique universe of consciousness and wonder.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {dimensions.slice(0, 4).map((dim, i) => (
            <DimensionCard key={dim.id} dimension={dim} index={i} />
          ))}
        </div>

        <div className="flex justify-center mt-10">
          <Link
            to="/codex"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-sm font-mono text-xs text-violet-300 glass-panel-light border border-violet-500/30 hover:border-violet-400 hover:bg-violet-600/20 transition-all"
          >
            <span>View Full Codex Archive ({dimensions.length} Realms)</span>
            <span>→</span>
          </Link>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <hr className="divider-glow" />
      </div>

      {/* Telemetry Flux Panel */}
      <TelemetryPanel />

      {/* Call to Weave banner */}
      <section className="py-16 max-w-5xl mx-auto px-4 sm:px-6 text-center">
        <div className="glass-panel border border-violet-500/30 rounded-xl p-8 sm:p-12 relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{
              background: 'radial-gradient(circle at 50% 50%, rgba(124, 58, 237, 0.4) 0%, transparent 70%)',
            }}
          />
          <h3 className="font-syne text-2xl sm:text-4xl font-bold text-slate-100 uppercase mb-3">
            Ready to Weave Your Own Universe?
          </h3>
          <p className="font-body text-slate-300 text-sm sm:text-base max-w-xl mx-auto mb-6">
            Calibrate environmental density, particle harmonics, and neural lucid stability to materialize a brand new subconscious dimension.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={openWeaveModal}
              className="px-7 py-3 rounded-sm font-syne text-xs font-semibold tracking-widest uppercase bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-[0_0_25px_rgba(124,58,237,0.4)] hover:shadow-[0_0_35px_rgba(124,58,237,0.6)] transition-all cursor-pointer"
            >
              ✦ Quick Weave HUD
            </button>
            <Link
              to="/weave"
              className="px-7 py-3 rounded-sm font-mono text-xs tracking-wider text-slate-300 glass-panel-light border border-white/15 hover:text-white hover:border-cyan-400 transition-all"
            >
              Open Full Studio
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
