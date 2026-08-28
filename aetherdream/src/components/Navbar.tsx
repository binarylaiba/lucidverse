import { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { NAV_ITEMS } from '@/data';
import MobileNavigation from './MobileNavigation';
import { useDream } from '@/context/DreamContext';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isAudioPlaying, audioFrequency, toggleAudio, openWeaveModal } = useDream();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={[
          'fixed top-0 left-0 right-0 z-40',
          'px-4 sm:px-6 lg:px-8',
          'transition-all duration-500',
          scrolled
            ? 'py-3 glass-panel border-b border-white/10 shadow-lg'
            : 'py-5 bg-transparent',
        ].join(' ')}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo / Wordmark */}
          <Link to="/" className="flex items-center gap-3 group">
            {/* Emblem */}
            <div className="relative w-8 h-8">
              <div className="absolute inset-0 rounded-sm bg-gradient-to-br from-violet-600 to-indigo-700 opacity-90 group-hover:scale-105 transition-transform" />
              <div className="absolute inset-0.5 rounded-sm bg-void-900 flex items-center justify-center">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path
                    d="M7 1L12.196 4V10L7 13L1.804 10V4L7 1Z"
                    stroke="rgba(167,139,250,0.9)"
                    strokeWidth="0.8"
                    fill="rgba(124,58,237,0.15)"
                  />
                  <circle cx="7" cy="7" r="1.5" fill="rgba(167,139,250,0.8)" />
                </svg>
              </div>
            </div>

            {/* Wordmark */}
            <div className="flex flex-col">
              <span className="font-syne font-bold tracking-[0.2em] uppercase text-sm text-slate-100 group-hover:text-violet-300 transition-colors duration-300">
                AetherDream
              </span>
              <span className="font-mono text-[8px] text-cyan-400 tracking-[0.25em] -mt-0.5 hidden sm:block">
                NEURAL EXPLORER v2.4
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.id}
                to={item.path}
                className={({ isActive }) =>
                  [
                    'relative font-syne text-xs font-semibold tracking-widest uppercase',
                    'transition-colors duration-300',
                    'hover:text-violet-300',
                    isActive ? 'text-violet-300' : 'text-slate-400',
                  ].join(' ')
                }
              >
                {({ isActive }) => (
                  <>
                    {item.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute -bottom-1 left-0 right-0 h-px"
                        style={{
                          background: 'linear-gradient(90deg, transparent, #a78bfa, transparent)',
                        }}
                        transition={{ type: 'spring', stiffness: 380, damping: 35 }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Right Controls */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Binaural Dream Audio Harmonics Toggle */}
            <button
              onClick={() => toggleAudio()}
              title="Toggle Binaural Harmonic Dream Soundscape"
              className={[
                'flex items-center gap-2 px-3 py-1.5 rounded-sm border text-xs font-mono transition-all duration-300 cursor-pointer',
                isAudioPlaying
                  ? 'glass-panel border-cyan-500/50 text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.3)]'
                  : 'glass-panel-light border-white/10 text-slate-400 hover:text-cyan-300 hover:border-cyan-500/30',
              ].join(' ')}
            >
              <div className="flex items-center gap-0.5 h-3">
                {[0.2, 0.4, 0.1, 0.3].map((delay, idx) => (
                  <span
                    key={idx}
                    className={[
                      'w-0.5 rounded-full transition-all duration-300',
                      isAudioPlaying ? 'bg-cyan-400 animate-pulse' : 'h-1 bg-slate-600',
                    ].join(' ')}
                    style={{
                      height: isAudioPlaying ? `${8 + (idx % 2) * 6}px` : '4px',
                      animationDelay: `${delay}s`,
                    }}
                  />
                ))}
              </div>
              <span className="text-[10px] hidden sm:inline tracking-wider">
                {isAudioPlaying ? `${audioFrequency}Hz HARMONICS` : '432Hz HARMONICS'}
              </span>
            </button>

            {/* Quick Weave AI Modal Button */}
            <button
              onClick={openWeaveModal}
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-sm font-mono text-xs text-violet-300 border border-violet-500/30 glass-panel-light hover:border-violet-400 hover:bg-violet-600/20 hover:shadow-[0_0_20px_rgba(124,58,237,0.3)] transition-all cursor-pointer"
            >
              <span>✦</span>
              <span className="tracking-widest">WEAVE AI</span>
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileOpen(true)}
              aria-label="Open navigation"
              className="md:hidden relative w-8 h-8 flex flex-col justify-center items-center gap-1.5 cursor-pointer glass-panel-light border border-white/10 rounded-sm"
            >
              <span className="block w-4 h-px bg-slate-300" />
              <span className="block w-3 h-px bg-slate-400" />
              <span className="block w-4 h-px bg-slate-300" />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <MobileNavigation onClose={() => setMobileOpen(false)} />
        )}
      </AnimatePresence>
    </>
  );
}
