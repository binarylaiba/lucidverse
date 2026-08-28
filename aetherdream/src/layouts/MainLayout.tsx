import { Outlet, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import ShaderBackground from '@/components/ShaderBackground';
import CyberVoidScene from '@/components/CyberVoidScene';
import EntityInspectorModal from '@/components/EntityInspectorModal';
import ChronicleModal from '@/components/ChronicleModal';
import WeaveModal from '@/components/WeaveModal';
import Toast from '@/components/Toast';
import { DreamProvider, useDream } from '@/context/DreamContext';

function MainLayoutContent() {
  const { calibration, toggleAudio, isAudioPlaying } = useDream();

  return (
    <div className={`relative min-h-screen gradient-void text-slate-100 selection:bg-violet-600/40 selection:text-white ${calibration.scanlinesEnabled ? 'scanlines' : ''}`}>
      {/* 1. Global WebGL Volumetric Nebula Shader Layer */}
      <ShaderBackground />

      {/* 2. Global Three.js Interactive 3D Crystal & Stardust Scene */}
      <CyberVoidScene />

      {/* 3. Ambient lighting orbs */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0">
        <div
          className="atmo-orb w-[800px] h-[800px] top-[5%] left-[5%] opacity-[0.06]"
          style={{ background: 'radial-gradient(circle, #7c3aed 0%, transparent 70%)' }}
        />
        <div
          className="atmo-orb w-[600px] h-[600px] bottom-[10%] right-[10%] opacity-[0.05]"
          style={{ background: 'radial-gradient(circle, #06b6d4 0%, transparent 70%)' }}
        />
      </div>

      {/* 4. Global Navigation */}
      <Navbar />

      {/* 5. Page Content */}
      <main className="relative z-10 min-h-[85vh]">
        <Outlet />
      </main>

      {/* 6. Context Modals and HUD Toasts */}
      <EntityInspectorModal />
      <ChronicleModal />
      <WeaveModal />
      <Toast />

      {/* 7. Footer */}
      <footer className="relative z-10 border-t border-white/05 py-8 mt-16 bg-void-950/60 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="font-syne text-xs text-slate-400 tracking-[0.3em] uppercase font-bold">
                AetherDream
              </span>
              <span className="text-slate-700">·</span>
              <span className="font-mono text-xs text-slate-500">
                Neural Dreamscape Explorer v2.4
              </span>
            </div>

            <nav className="flex flex-wrap items-center gap-6 font-mono text-xs text-slate-500">
              <Link to="/codex" className="hover:text-violet-300 transition-colors">CODEX ARCHIVE</Link>
              <Link to="/stream" className="hover:text-violet-300 transition-colors">LIVE STREAMS</Link>
              <Link to="/shift" className="hover:text-violet-300 transition-colors">REALITY CALIBRATION</Link>
              <Link to="/my-dreams" className="hover:text-violet-300 transition-colors">MY DREAMS</Link>
            </nav>

            <div className="flex items-center gap-3">
              <button
                onClick={() => toggleAudio()}
                className="flex items-center gap-2 font-mono text-xs text-slate-400 hover:text-cyan-300 transition-colors cursor-pointer"
              >
                <span className={`w-1.5 h-1.5 rounded-full ${isAudioPlaying ? 'bg-cyan-400 animate-pulse' : 'bg-slate-600'}`} />
                <span>432Hz HARMONICS</span>
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function MainLayout() {
  return (
    <DreamProvider>
      <MainLayoutContent />
    </DreamProvider>
  );
}
