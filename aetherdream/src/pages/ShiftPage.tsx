import { motion } from 'framer-motion';
import PageContainer from '@/components/PageContainer';
import { useDream } from '@/context/DreamContext';
import { staggerContainer, staggerItem } from '@/animations/variants';

export default function ShiftPage() {
  const { calibration, updateCalibration, resetCalibration, toggleAudio, isAudioPlaying, showToast } = useDream();

  const handleSave = () => {
    showToast('Reality Calibration profile saved to neural node! ✨');
  };

  const applyPreset = (name: string, patch: Partial<typeof calibration>) => {
    updateCalibration(patch);
    showToast(`Applied preset: ${name}`);
  };

  // Calculated overall lucidity index
  const lucidityIndex = Math.round(
    (calibration.neuralSensitivity * 0.3) +
    (calibration.coherenceThreshold * 0.4) +
    (calibration.temporalAnchor * 0.3)
  );

  return (
    <PageContainer>
      <div className="pt-32 pb-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="mb-10 text-center"
        >
          <motion.p variants={staggerItem} className="font-mono text-xs text-cyan-400 tracking-[0.4em] uppercase mb-2">
            ── Neural Calibration Deck ──
          </motion.p>
          <motion.h1 variants={staggerItem} className="font-syne text-4xl sm:text-6xl font-black uppercase tracking-tight text-slate-100 mb-3">
            REALITY SHIFT
          </motion.h1>
          <motion.p variants={staggerItem} className="font-display italic text-lg sm:text-xl text-slate-400 max-w-xl mx-auto">
            "Recalibrate neural sensitivity, visual bloom, and temporal stability."
          </motion.p>
        </motion.div>

        {/* Quick Calibration Presets Bar */}
        <div className="glass-panel border border-white/10 rounded-lg p-4 mb-8 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 font-mono text-xs text-slate-400 uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span>CALIBRATION PRESETS:</span>
          </div>
          <div className="flex flex-wrap gap-2 font-mono text-xs">
            <button
              onClick={() => applyPreset('Lucid Sanctuary', { neuralSensitivity: 85, coherenceThreshold: 92, particleDensity: 65, fogIntensity: 30, bloomStrength: 75 })}
              className="px-3 py-1.5 rounded-sm glass-panel-light border border-white/10 text-slate-300 hover:text-cyan-300 hover:border-cyan-500/40 transition-colors cursor-pointer"
            >
              ✦ Lucid Sanctuary
            </button>
            <button
              onClick={() => applyPreset('Deep Void', { neuralSensitivity: 60, coherenceThreshold: 96, particleDensity: 30, fogIntensity: 65, bloomStrength: 35 })}
              className="px-3 py-1.5 rounded-sm glass-panel-light border border-white/10 text-slate-300 hover:text-violet-300 hover:border-violet-500/40 transition-colors cursor-pointer"
            >
              ✦ Deep Void
            </button>
            <button
              onClick={() => applyPreset('Hyper-Neural', { neuralSensitivity: 95, coherenceThreshold: 80, particleDensity: 100, fogIntensity: 40, bloomStrength: 90 })}
              className="px-3 py-1.5 rounded-sm glass-panel-light border border-white/10 text-slate-300 hover:text-pink-300 hover:border-pink-500/40 transition-colors cursor-pointer"
            >
              ✦ Hyper-Neural
            </button>
          </div>
        </div>

        {/* 2-Column Grid: Sliders on Left, Live Telemetry Meter on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Deck (8 Cols) */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            
            {/* 1. Reality Calibration */}
            <div className="glass-panel border border-violet-500/20 rounded-lg p-6 shadow-lg">
              <h3 className="font-syne text-sm font-bold tracking-widest uppercase text-slate-200 mb-5 pb-3 border-b border-white/05 flex items-center justify-between">
                <span>1. Neural & Temporal Anchor</span>
                <span className="font-mono text-[10px] text-violet-400 font-normal">BRAINWAVE HARMONIZATION</span>
              </h3>

              <div className="space-y-6 font-mono text-xs">
                {/* Sensitivity */}
                <div>
                  <div className="flex justify-between text-slate-300 mb-2">
                    <span>NEURAL SENSITIVITY</span>
                    <span className="text-cyan-400 font-bold">{calibration.neuralSensitivity}%</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={calibration.neuralSensitivity}
                    onChange={(e) => updateCalibration({ neuralSensitivity: Number(e.target.value) })}
                    className="w-full accent-cyan-400 cursor-pointer"
                  />
                  <p className="font-body text-[11px] text-slate-500 mt-1">Controls how quickly your thought prompts materialize into 3D geometry.</p>
                </div>

                {/* Coherence */}
                <div>
                  <div className="flex justify-between text-slate-300 mb-2">
                    <span>COHERENCE THRESHOLD</span>
                    <span className="text-violet-400 font-bold">{calibration.coherenceThreshold}%</span>
                  </div>
                  <input
                    type="range"
                    min="40"
                    max="99"
                    value={calibration.coherenceThreshold}
                    onChange={(e) => updateCalibration({ coherenceThreshold: Number(e.target.value) })}
                    className="w-full accent-violet-400 cursor-pointer"
                  />
                  <p className="font-body text-[11px] text-slate-500 mt-1">Minimum stability barrier before dream collapse occurs.</p>
                </div>

                {/* Temporal Anchor */}
                <div>
                  <div className="flex justify-between text-slate-300 mb-2">
                    <span>TEMPORAL ANCHOR STRENGTH</span>
                    <span className="text-pink-400 font-bold">{calibration.temporalAnchor}%</span>
                  </div>
                  <input
                    type="range"
                    min="20"
                    max="100"
                    value={calibration.temporalAnchor}
                    onChange={(e) => updateCalibration({ temporalAnchor: Number(e.target.value) })}
                    className="w-full accent-pink-400 cursor-pointer"
                  />
                  <p className="font-body text-[11px] text-slate-500 mt-1">Stabilizes passage of subjective dream time relative to waking reality.</p>
                </div>
              </div>
            </div>

            {/* 2. Visual & Atmospheric Post-Processing */}
            <div className="glass-panel border border-cyan-500/20 rounded-lg p-6 shadow-lg">
              <h3 className="font-syne text-sm font-bold tracking-widest uppercase text-slate-200 mb-5 pb-3 border-b border-white/05 flex items-center justify-between">
                <span>2. Visual & Atmospheric Density</span>
                <span className="font-mono text-[10px] text-cyan-400 font-normal">RENDER PASS SHADER</span>
              </h3>

              <div className="space-y-6 font-mono text-xs">
                {/* Particle Density */}
                <div>
                  <div className="flex justify-between text-slate-300 mb-2">
                    <span>STARDUST PARTICLES</span>
                    <span className="text-cyan-300 font-bold">{calibration.particleDensity}%</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={calibration.particleDensity}
                    onChange={(e) => updateCalibration({ particleDensity: Number(e.target.value) })}
                    className="w-full accent-cyan-400 cursor-pointer"
                  />
                </div>

                {/* Fog Density */}
                <div>
                  <div className="flex justify-between text-slate-300 mb-2">
                    <span>ATMOSPHERIC FOG</span>
                    <span className="text-slate-300 font-bold">{calibration.fogIntensity}%</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="90"
                    value={calibration.fogIntensity}
                    onChange={(e) => updateCalibration({ fogIntensity: Number(e.target.value) })}
                    className="w-full accent-slate-400 cursor-pointer"
                  />
                </div>

                {/* Bloom Strength */}
                <div>
                  <div className="flex justify-between text-slate-300 mb-2">
                    <span>OPTICAL BLOOM</span>
                    <span className="text-violet-300 font-bold">{calibration.bloomStrength}%</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={calibration.bloomStrength}
                    onChange={(e) => updateCalibration({ bloomStrength: Number(e.target.value) })}
                    className="w-full accent-violet-400 cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* 3. Interface & Sensor Toggles */}
            <div className="glass-panel border border-white/10 rounded-lg p-6">
              <h3 className="font-syne text-sm font-bold tracking-widest uppercase text-slate-200 mb-5 pb-3 border-b border-white/05">
                3. Neural Guidance & Toggles
              </h3>

              <div className="space-y-4">
                {/* Guidance Mode */}
                <div className="flex items-center justify-between p-3 rounded-sm glass-panel-light border border-white/05">
                  <div>
                    <p className="font-syne text-xs font-bold text-slate-200">AI Dream Guidance Mode</p>
                    <p className="font-body text-[11px] text-slate-500">Auto-suggests dimensional stabilization paths during high lucidity.</p>
                  </div>
                  <button
                    onClick={() => updateCalibration({ guidanceMode: !calibration.guidanceMode })}
                    className={`w-12 h-6 rounded-full relative transition-colors duration-300 cursor-pointer ${
                      calibration.guidanceMode ? 'bg-violet-600' : 'bg-white/10'
                    }`}
                  >
                    <div
                      className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all duration-300 ${
                        calibration.guidanceMode ? 'left-7' : 'left-1'
                      }`}
                    />
                  </button>
                </div>

                {/* Chronicle Auto-Record */}
                <div className="flex items-center justify-between p-3 rounded-sm glass-panel-light border border-white/05">
                  <div>
                    <p className="font-syne text-xs font-bold text-slate-200">Chronicle Auto-Record</p>
                    <p className="font-body text-[11px] text-slate-500">Automatically logs woven dimensions and explored entities to My Dreams.</p>
                  </div>
                  <button
                    onClick={() => updateCalibration({ chronicleAutoRecord: !calibration.chronicleAutoRecord })}
                    className={`w-12 h-6 rounded-full relative transition-colors duration-300 cursor-pointer ${
                      calibration.chronicleAutoRecord ? 'bg-violet-600' : 'bg-white/10'
                    }`}
                  >
                    <div
                      className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all duration-300 ${
                        calibration.chronicleAutoRecord ? 'left-7' : 'left-1'
                      }`}
                    />
                  </button>
                </div>

                {/* Binaural Harmonics Sync */}
                <div className="flex items-center justify-between p-3 rounded-sm glass-panel-light border border-white/05">
                  <div>
                    <p className="font-syne text-xs font-bold text-slate-200">Binaural Harmonics Flow</p>
                    <p className="font-body text-[11px] text-slate-500">Web Audio pure carrier sound waves synchronized to your selected frequency.</p>
                  </div>
                  <button
                    onClick={() => toggleAudio()}
                    className={`w-12 h-6 rounded-full relative transition-colors duration-300 cursor-pointer ${
                      isAudioPlaying ? 'bg-cyan-500' : 'bg-white/10'
                    }`}
                  >
                    <div
                      className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all duration-300 ${
                        isAudioPlaying ? 'left-7' : 'left-1'
                      }`}
                    />
                  </button>
                </div>

                {/* Scanline Post-processing */}
                <div className="flex items-center justify-between p-3 rounded-sm glass-panel-light border border-white/05">
                  <div>
                    <p className="font-syne text-xs font-bold text-slate-200">CRT Hologram Scanlines</p>
                    <p className="font-body text-[11px] text-slate-500">Subtle retro-futuristic CRT scanline filter over the viewport.</p>
                  </div>
                  <button
                    onClick={() => updateCalibration({ scanlinesEnabled: !calibration.scanlinesEnabled })}
                    className={`w-12 h-6 rounded-full relative transition-colors duration-300 cursor-pointer ${
                      calibration.scanlinesEnabled ? 'bg-pink-600' : 'bg-white/10'
                    }`}
                  >
                    <div
                      className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all duration-300 ${
                        calibration.scanlinesEnabled ? 'left-7' : 'left-1'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>

          </div>

          {/* Right Status Card & Actions (4 Cols) */}
          <div className="lg:col-span-4 flex flex-col gap-6 sticky top-28">
            
            {/* Lucidity Index Meter */}
            <div className="glass-panel border border-violet-500/30 rounded-lg p-6 shadow-[0_0_40px_rgba(124,58,237,0.2)] text-center">
              <p className="font-mono text-[10px] text-violet-300 uppercase tracking-widest mb-1">
                SYNAPSE TELEMETRY STATUS
              </p>
              <h3 className="font-syne text-base font-bold text-slate-100 uppercase mb-4">
                Calculated Lucidity Index
              </h3>

              {/* Circular Gauge Representation */}
              <div className="relative w-36 h-36 mx-auto mb-4 flex items-center justify-center">
                <div
                  className="w-full h-full rounded-full border-4 border-violet-500/20 flex items-center justify-center"
                  style={{
                    borderColor: 'rgba(124,58,237,0.2)',
                    boxShadow: '0 0 30px rgba(124,58,237,0.25)',
                  }}
                >
                  <div className="flex flex-col items-center">
                    <span className="font-mono text-3xl font-bold text-cyan-300">
                      {lucidityIndex}%
                    </span>
                    <span className="font-mono text-[9px] text-slate-400 uppercase tracking-widest">
                      PRIME SYNC
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-left font-mono text-xs mb-6">
                <div className="glass-panel-light p-2.5 rounded-sm border border-white/05">
                  <span className="text-[9px] text-slate-500">STATUS</span>
                  <p className="text-green-400 font-bold">NOMINAL</p>
                </div>
                <div className="glass-panel-light p-2.5 rounded-sm border border-white/05">
                  <span className="text-[9px] text-slate-500">SCANLINES</span>
                  <p className={calibration.scanlinesEnabled ? 'text-pink-400 font-bold' : 'text-slate-500'}>
                    {calibration.scanlinesEnabled ? 'ACTIVE' : 'OFF'}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={handleSave}
                  className="w-full py-3 rounded-sm font-syne text-xs font-bold tracking-widest uppercase bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-[0_0_20px_rgba(124,58,237,0.3)] hover:shadow-[0_0_30px_rgba(124,58,237,0.5)] transition-all cursor-pointer"
                >
                  Save Calibration Profile
                </button>

                <button
                  onClick={resetCalibration}
                  className="w-full py-2.5 rounded-sm font-mono text-xs text-slate-400 glass-panel-light border border-white/10 hover:text-white hover:border-red-400/40 transition-colors cursor-pointer"
                >
                  Reset Factory Defaults
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </PageContainer>
  );
}
