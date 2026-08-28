import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import type { Dimension } from '@/types';
import { cardHover } from '@/animations/variants';
import { useDream } from '@/context/DreamContext';

interface DimensionCardProps {
  dimension: Dimension;
  index?: number;
}

const moodGradients: Record<string, string> = {
  ethereal:   'from-cyan-600/20 to-violet-700/20',
  cosmic:     'from-indigo-600/20 to-violet-800/20',
  crystalline:'from-slate-400/10 to-violet-600/20',
  solar:      'from-orange-600/20 to-yellow-500/20',
  void:       'from-slate-900/40 to-indigo-900/20',
  neural:     'from-violet-600/20 to-indigo-800/20',
};

const statusColors: Record<string, string> = {
  nominal:  'text-green-400',
  elevated: 'text-yellow-400',
  critical: 'text-red-400',
  optimal:  'text-cyan-400',
};

function getStabilityStatus(n: number) {
  if (n >= 85) return 'optimal';
  if (n >= 60) return 'nominal';
  if (n >= 40) return 'elevated';
  return 'critical';
}

export default function DimensionCard({ dimension, index = 0 }: DimensionCardProps) {
  const { isBookmarked, toggleBookmark, openChronicle } = useDream();
  const mood = dimension.mood || 'ethereal';
  const gradient = moodGradients[mood] ?? moodGradients.cosmic;
  const stabilityStatus = getStabilityStatus(dimension.stability ?? 80);
  const bookmarked = isBookmarked(dimension.id);
  const colorPrimary = dimension.colorPrimary || '#06b6d4';
  const tags = dimension.tags || [mood];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: 'easeOut' }}
      variants={cardHover}
      whileHover="hover"
      className="group relative glass-panel rounded-sm overflow-hidden flex flex-col justify-between"
      style={{ borderColor: `${colorPrimary}25` }}
    >
      {/* Background gradient on hover */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
      />

      {/* Top accent color bar */}
      <div
        className="absolute top-0 left-0 right-0 h-px opacity-60 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `linear-gradient(90deg, transparent, ${colorPrimary}, transparent)`,
        }}
      />

      <div className="p-6 relative z-10 flex-1 flex flex-col justify-between">
        <div>
          {/* Header */}
          <div className="flex items-start justify-between mb-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: colorPrimary }}
                />
                <p className="font-mono text-xs text-slate-500 tracking-widest uppercase">
                  {mood} · {dimension.frequency || '432 Hz'}
                </p>
              </div>
              <Link to={`/dream/${dimension.id}`}>
                <h3 className="font-syne text-lg font-bold tracking-wide text-slate-100 group-hover:text-white transition-colors duration-300 hover:text-violet-300">
                  {dimension.title}
                </h3>
              </Link>
              <p className="font-body text-xs text-slate-400 mt-0.5">{dimension.subtitle}</p>
            </div>

            {/* Bookmark button */}
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleBookmark(dimension.id);
              }}
              title={bookmarked ? 'Remove Bookmark' : 'Bookmark to Codex'}
              className="p-1.5 rounded-sm glass-panel-light border border-white/10 text-slate-400 hover:text-violet-300 hover:border-violet-400/40 transition-colors cursor-pointer"
            >
              {bookmarked ? '★' : '☆'}
            </button>
          </div>

          {/* Description */}
          <p className="font-body text-sm text-slate-400 group-hover:text-slate-300 leading-relaxed mb-5 transition-colors duration-300 line-clamp-2">
            {dimension.description}
          </p>
        </div>

        <div>
          {/* Metrics */}
          <div className="grid grid-cols-3 gap-2.5 py-3 border-y border-white/05 mb-4">
            <div className="text-center">
              <p className="font-mono text-[10px] text-slate-500 tracking-wider uppercase mb-0.5">Coherence</p>
              <span className="font-mono text-xs sm:text-sm font-semibold" style={{ color: colorPrimary }}>
                {dimension.coherence ?? 85}%
              </span>
            </div>

            <div className="text-center">
              <p className="font-mono text-[10px] text-slate-500 tracking-wider uppercase mb-0.5">Stability</p>
              <span className={`font-mono text-xs sm:text-sm font-semibold ${statusColors[stabilityStatus]}`}>
                {dimension.stability ?? 80}%
              </span>
            </div>

            <div className="text-center">
              <p className="font-mono text-[10px] text-slate-500 tracking-wider uppercase mb-0.5">Depth</p>
              <span className="font-mono text-xs sm:text-sm font-semibold text-violet-300">
                {dimension.depth || '∞'}
              </span>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {tags.map((tag) => (
              <span
                key={tag}
                className="font-mono text-[10px] px-2 py-0.5 rounded-full"
                style={{
                  background: `${colorPrimary}12`,
                  color: `${colorPrimary}dd`,
                  border: `1px solid ${colorPrimary}22`,
                }}
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Action Row */}
          <div className="flex items-center justify-between pt-1">
            <button
              onClick={() => openChronicle(dimension)}
              className="font-mono text-xs text-slate-400 hover:text-cyan-300 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span>📖</span>
              <span>Chronicle</span>
            </button>

            <Link
              to={`/dream/${dimension.id}`}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-sm font-mono text-xs text-violet-300 glass-panel-light border border-violet-500/30 hover:border-violet-400 hover:bg-violet-600/20 transition-all cursor-pointer"
            >
              <span>Enter</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
