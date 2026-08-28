import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import PageContainer from '@/components/PageContainer';
import { useDream } from '@/context/DreamContext';
import { staggerContainer, staggerItem } from '@/animations/variants';
import DimensionCard from '@/components/DimensionCard';

export default function CodexPage() {
  const { dimensions = [], bookmarkedIds = [] } = useDream();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'coherence' | 'stability' | 'title'>('coherence');
  const [showBookmarksOnly, setShowBookmarksOnly] = useState(false);

  const categories = ['All', 'Ethereal', 'Neural', 'Crystalline', 'Solar', 'Void', 'Cosmic'];

  const filteredDimensions = useMemo(() => {
    return (dimensions || [])
      .filter((dim) => {
        if (!dim) return false;

        // Bookmarks filter
        if (showBookmarksOnly && !bookmarkedIds.includes(dim.id)) {
          return false;
        }

        // Category filter
        const mood = (dim.mood || '').toLowerCase();
        if (selectedCategory !== 'All' && mood !== selectedCategory.toLowerCase()) {
          return false;
        }

        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchTitle = (dim.title || '').toLowerCase().includes(q);
          const matchSubtitle = (dim.subtitle || '').toLowerCase().includes(q);
          const matchDesc = (dim.description || '').toLowerCase().includes(q);
          const matchTags = Array.isArray(dim.tags) && dim.tags.some((t) => (t || '').toLowerCase().includes(q));
          return matchTitle || matchSubtitle || matchDesc || matchTags;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'coherence') return (b.coherence ?? 0) - (a.coherence ?? 0);
        if (sortBy === 'stability') return (b.stability ?? 0) - (a.stability ?? 0);
        return (a.title || '').localeCompare(b.title || '');
      });
  }, [dimensions, searchQuery, selectedCategory, sortBy, showBookmarksOnly, bookmarkedIds]);

  return (
    <PageContainer>
      <div className="pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="mb-10"
        >
          <motion.p variants={staggerItem} className="font-mono text-xs text-violet-400 tracking-[0.4em] uppercase mb-2">
            ── Subconscious Encyclopedia ──
          </motion.p>
          <motion.h1 variants={staggerItem} className="font-syne text-4xl sm:text-6xl font-black uppercase tracking-tight text-slate-100 mb-3">
            CODEX ARCHIVE
          </motion.h1>
          <motion.p variants={staggerItem} className="font-display italic text-lg sm:text-xl text-slate-400 max-w-xl">
            "All dimensions recorded across human memory and neural synthesis. None are forgotten."
          </motion.p>
        </motion.div>

        {/* Search, Filter & Sort Controls */}
        <div className="glass-panel border border-white/10 rounded-lg p-5 mb-8 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            
            {/* Search Input (6 Cols) */}
            <div className="md:col-span-6 relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by title, tag, frequency, or lore keywords..."
                className="dream-input w-full rounded-sm px-4 py-3 text-sm pr-10 bg-void-950/60"
                aria-label="Search codex dimensions"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white text-xs font-mono cursor-pointer"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Sort Dropdown (3 Cols) */}
            <div className="md:col-span-3 flex items-center gap-2">
              <span className="font-mono text-xs text-slate-500 uppercase tracking-wider whitespace-nowrap">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'coherence' | 'stability' | 'title')}
                className="dream-input w-full py-2.5 px-3 rounded-sm font-mono text-xs bg-void-950/80 text-slate-200 cursor-pointer"
              >
                <option value="coherence">Highest Coherence</option>
                <option value="stability">Highest Stability</option>
                <option value="title">Title (A-Z)</option>
              </select>
            </div>

            {/* Bookmarks Toggle (3 Cols) */}
            <div className="md:col-span-3 flex justify-end">
              <button
                onClick={() => setShowBookmarksOnly(!showBookmarksOnly)}
                className={[
                  'w-full md:w-auto px-4 py-2.5 rounded-sm font-mono text-xs tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer border',
                  showBookmarksOnly
                    ? 'bg-violet-600 border-violet-400 text-white shadow-[0_0_15px_rgba(124,58,237,0.4)]'
                    : 'glass-panel-light border-white/10 text-slate-400 hover:text-white',
                ].join(' ')}
              >
                <span>★</span>
                <span>Bookmarks ({bookmarkedIds.length})</span>
              </button>
            </div>

          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-white/05">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setShowBookmarksOnly(false);
                }}
                className={[
                  'font-mono text-xs px-3.5 py-1.5 rounded-full transition-all duration-200 cursor-pointer uppercase',
                  selectedCategory === cat && !showBookmarksOnly
                    ? 'bg-violet-700/50 border border-violet-400 text-violet-200 shadow-[0_0_15px_rgba(124,58,237,0.3)]'
                    : 'glass-panel-light border border-white/08 text-slate-400 hover:text-white',
                ].join(' ')}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between mb-6 font-mono text-xs text-slate-500">
          <span>
            SHOWING <strong className="text-cyan-400">{filteredDimensions.length}</strong> OF {dimensions.length} REALMS
          </span>
          {searchQuery && (
            <span>Filter: "{searchQuery}"</span>
          )}
        </div>

        {/* Dimensions Grid */}
        {filteredDimensions.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredDimensions.map((dim, i) => (
              <DimensionCard key={dim.id} dimension={dim} index={i} />
            ))}
          </div>
        ) : (
          <div className="glass-panel border border-white/10 rounded-lg p-12 text-center my-8">
            <p className="font-syne text-xl text-slate-300 font-bold mb-2">
              No Dimensions Found
            </p>
            <p className="font-body text-xs text-slate-500 max-w-sm mx-auto mb-5">
              No realms matched your current search or category filter.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                setShowBookmarksOnly(false);
              }}
              className="px-5 py-2 rounded-sm font-mono text-xs text-cyan-300 glass-panel-light border border-cyan-500/40 hover:bg-cyan-600/20 cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </PageContainer>
  );
}
