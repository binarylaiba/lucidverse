import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import type { TelemetryMetric } from '@/types';
import { DEFAULT_TELEMETRY_METRICS } from '@/data';
import { fadeInUp } from '@/animations/variants';

interface TelemetryPanelProps {
  metrics?: TelemetryMetric[];
}

const statusColors = {
  optimal:  { text: 'text-cyan-400',   bar: '#06b6d4', dot: 'status-dot-optimal' },
  nominal:  { text: 'text-green-400',  bar: '#22c55e', dot: 'status-dot-nominal' },
  elevated: { text: 'text-yellow-400', bar: '#f59e0b', dot: 'status-dot-elevated' },
  critical: { text: 'text-red-400',    bar: '#ef4444', dot: 'status-dot-critical' },
};

function MetricItem({ metric, index }: { metric: TelemetryMetric; index: number }) {
  const valueRef = useRef<HTMLSpanElement>(null);
  const colors = statusColors[metric.status];
  const numericValue = typeof metric.value === 'number' ? metric.value : null;

  useEffect(() => {
    if (!metric.animated || numericValue === null || !valueRef.current) return;
    const el = valueRef.current;
    const obj = { val: 0 };
    const tween = gsap.to(obj, {
      val: numericValue,
      duration: 1.8,
      delay: index * 0.15 + 0.3,
      ease: 'power2.out',
      onUpdate: () => {
        if (el) el.textContent = Math.round(obj.val).toString();
      },
    });

    return () => {
      tween.kill();
    };
  }, [numericValue, metric.animated, index]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="flex flex-col gap-2 glass-panel-light border-technical rounded-sm p-4"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <p className="font-mono text-xs text-slate-600 tracking-wider uppercase">
          {metric.label}
        </p>
        <span className={`status-dot ${colors.dot}`} />
      </div>

      {/* Value */}
      <div className="flex items-end gap-0.5">
        {metric.animated && numericValue !== null ? (
          <>
            <span ref={valueRef} className={`font-mono text-2xl font-medium ${colors.text}`}>
              0
            </span>
            {metric.unit && (
              <span className={`font-mono text-xs mb-1 ${colors.text} opacity-70`}>
                {metric.unit}
              </span>
            )}
          </>
        ) : (
          <>
            <span className={`font-mono text-2xl font-medium ${colors.text}`}>
              {metric.value}
            </span>
            {metric.unit && (
              <span className={`font-mono text-xs mb-1 ${colors.text} opacity-70`}>
                {metric.unit}
              </span>
            )}
          </>
        )}
      </div>

      {/* Bar (only for numeric values) */}
      {numericValue !== null && (
        <div className="h-px bg-white/05 rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ background: colors.bar }}
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(numericValue, 100)}%` }}
            transition={{ duration: 0.8, delay: index * 0.08 + 0.2, ease: 'easeOut' }}
          />
        </div>
      )}

      {/* Status label */}
      <p className={`font-mono text-xs uppercase tracking-widest ${colors.text} opacity-60`}>
        {metric.status}
      </p>
    </motion.div>
  );
}

export default function TelemetryPanel({ metrics = DEFAULT_TELEMETRY_METRICS }: TelemetryPanelProps) {
  return (
    <motion.section
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
    >
      {/* Section header */}
      <div className="flex items-center gap-4 mb-8">
        <hr className="flex-1 divider-glow" />
        <div className="flex items-center gap-3">
          <span className="status-dot status-dot-optimal" />
          <p className="font-mono text-xs text-slate-500 tracking-[0.3em] uppercase">
            Neural Telemetry
          </p>
        </div>
        <hr className="flex-1 divider-glow" />
      </div>

      {/* Metrics grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {metrics.map((metric, i) => (
          <MetricItem key={metric.id} metric={metric} index={i} />
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-center gap-6 mt-6">
        <span className="font-mono text-xs text-slate-700 tracking-widest">
          SYNC ·{' '}
          <span className="text-cyan-600">
            {new Date().toISOString().slice(11, 19)} UTC
          </span>
        </span>
        <span className="font-mono text-xs text-slate-700">|</span>
        <span className="font-mono text-xs text-slate-700 tracking-widest">
          AETHER_NODE ·{' '}
          <span className="text-violet-600">ONLINE</span>
        </span>
      </div>
    </motion.section>
  );
}
