import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import PageContainer from '@/components/PageContainer';
import { useDream } from '@/context/DreamContext';
import { staggerContainer, staggerItem } from '@/animations/variants';

export default function MyDreamsPage() {
  const { dreams, deleteDream, openWeaveModal, showToast } = useDream();
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredDreams = dreams.filter((dream) => {
    if (filterStatus !== 'all' && dream.status !== filterStatus) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        dream.title.toLowerCase().includes(q) ||
        dream.description.toLowerCase().includes(q) ||
        dream.mood.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const avgCoherence = dreams.length
    ? Math.round(dreams.reduce((acc, d) => acc + d.coherence, 0) / dreams.length)
    : 0;

  const handleCopyPrompt = (prompt: string) => {
    navigator.clipboard.writeText(prompt);
    showToast('Subconscious prompt copied to clipboard! 📋');
  };

  return (
    <PageContainer>
      <div className="pt-32 pb-24 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header & Quick Action */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8"
        >
          <div>
            <motion.p variants={staggerItem} className="font-mono text-xs text-violet-400 tracking-[0.4em] uppercase mb-2">
              ── Personal Subconscious Archive ──
            </motion.p>
            <motion.h1 variants={staggerItem} className="font-syne text-4xl sm:text-6xl font-black uppercase tracking-tight text-slate-100">
              MY DREAMS
            </motion.h1>
          </div>

          <motion.div variants={staggerItem}>
            <button
              onClick={openWeaveModal}
              className="px-6 py-3 rounded-sm font-syne text-xs font-semibold tracking-widest uppercase bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-[0_0_20px_rgba(124,58,237,0.3)] hover:shadow-[0_0_30px_rgba(124,58,237,0.5)] transition-all cursor-pointer flex items-center gap-2"
            >
              <span>+</span>
              <span>Weave New Dream</span>
            </button>
          </motion.div>
        </motion.div>

        {/* Statistics Summary Deck */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 mb-8">
          <div className="glass-panel border border-white/10 rounded-sm p-4">
            <p className="font-mono text-[10px] text-slate-500 uppercase tracking-wider">Total Recorded</p>
            <p className="font-mono text-2xl sm:text-3xl font-bold text-slate-100 mt-1">{dreams.length}</p>
            <span className="font-mono text-[9px] text-cyan-400">Dimensions in storage</span>
          </div>

          <div className="glass-panel border border-white/10 rounded-sm p-4">
            <p className="font-mono text-[10px] text-slate-500 uppercase tracking-wider">Avg Coherence</p>
            <p className="font-mono text-2xl sm:text-3xl font-bold text-cyan-300 mt-1">{avgCoherence}%</p>
            <span className="font-mono text-[9px] text-green-400">Optimal lucidity</span>
          </div>

          <div className="glass-panel border border-white/10 rounded-sm p-4">
            <p className="font-mono text-[10px] text-slate-500 uppercase tracking-wider">Deepest Dive</p>
            <p className="font-mono text-2xl sm:text-3xl font-bold text-violet-300 mt-1">23.1 km</p>
            <span className="font-mono text-[9px] text-slate-400">Crystal Metropolis</span>
          </div>

          <div className="glass-panel border border-white/10 rounded-sm p-4">
            <p className="font-mono text-[10px] text-slate-500 uppercase tracking-wider">Sync State</p>
            <p className="font-mono text-2xl sm:text-3xl font-bold text-green-400 mt-1">PRIME</p>
            <span className="font-mono text-[9px] text-cyan-400">Auto-record Active</span>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="glass-panel border border-white/10 rounded-lg p-4 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search my dreams..."
              className="dream-input w-full px-4 py-2 rounded-sm text-xs bg-void-950/60"
            />
          </div>

          <div className="flex flex-wrap gap-2 font-mono text-xs">
            {['all', 'active', 'archived'].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={[
                  'px-3 py-1 rounded-full uppercase transition-all cursor-pointer',
                  filterStatus === status
                    ? 'bg-violet-600 text-white border border-violet-400'
                    : 'glass-panel-light border border-white/10 text-slate-400 hover:text-white',
                ].join(' ')}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Dreams List */}
        {filteredDreams.length > 0 ? (
          <div className="space-y-3.5">
            <AnimatePresence>
              {filteredDreams.map((dream, i) => (
                <motion.div
                  key={dream.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: i * 0.05 }}
                  className="glass-panel border border-white/10 hover:border-violet-500/40 rounded-sm p-5 transition-all duration-300 group"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    
                    {/* Left: Info */}
                    <div className="flex items-start gap-4 flex-1">
                      <div className="w-2.5 h-2.5 rounded-full bg-violet-400 mt-1.5 flex-shrink-0 animate-pulse" />
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Link to={`/dream/${dream.id}`}>
                            <h3 className="font-syne text-base sm:text-lg font-bold text-slate-100 group-hover:text-violet-300 transition-colors">
                              {dream.title}
                            </h3>
                          </Link>
                          <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-violet-950 border border-violet-500/30 text-violet-300 uppercase">
                            {dream.mood}
                          </span>
                        </div>
                        <p className="font-body text-xs text-slate-400 line-clamp-2 max-w-2xl">
                          {dream.description}
                        </p>
                        <div className="flex items-center gap-4 mt-2 font-mono text-[11px] text-slate-500">
                          <span>Recorded: {dream.createdAt}</span>
                          <span>·</span>
                          <span>Freq: {dream.frequency}</span>
                          <span>·</span>
                          <span>Depth: {dream.depth}</span>
                        </div>
                      </div>
                    </div>

                    {/* Right: Metrics & Actions */}
                    <div className="flex items-center justify-between md:justify-end gap-6 pt-3 md:pt-0 border-t md:border-t-0 border-white/05">
                      <div className="text-right">
                        <p className="font-mono text-[10px] text-slate-500 uppercase">Coherence</p>
                        <p className="font-mono text-sm font-bold text-cyan-300">{dream.coherence}%</p>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleCopyPrompt(dream.prompt)}
                          title="Copy Subconscious Prompt"
                          className="px-2.5 py-1.5 rounded-sm glass-panel-light border border-white/10 text-xs font-mono text-slate-400 hover:text-white"
                        >
                          📋
                        </button>

                        <Link
                          to={`/dream/${dream.id}`}
                          className="px-4 py-1.5 rounded-sm font-mono text-xs text-violet-300 glass-panel-light border border-violet-500/30 hover:border-violet-400 hover:bg-violet-600/20 transition-all"
                        >
                          Explore →
                        </Link>

                        <button
                          onClick={() => deleteDream(dream.id)}
                          title="Delete Dream"
                          className="px-2.5 py-1.5 rounded-sm glass-panel-light border border-white/10 text-xs font-mono text-slate-500 hover:text-red-400 hover:border-red-500/30 transition-colors"
                        >
                          ✕
                        </button>
                      </div>
                    </div>

                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <div className="glass-panel border border-white/10 rounded-lg p-12 text-center my-8">
            <p className="font-syne text-xl text-slate-200 font-bold mb-2">No Recorded Dreams</p>
            <p className="font-body text-xs text-slate-400 mb-6">
              You haven't recorded or synthesized any dreamscapes in this filter tier.
            </p>
            <button
              onClick={openWeaveModal}
              className="px-6 py-2.5 rounded-sm font-syne text-xs font-bold tracking-wider uppercase bg-violet-600 text-white"
            >
              Weave Your First Dream
            </button>
          </div>
        )}
      </div>
    </PageContainer>
  );
}
