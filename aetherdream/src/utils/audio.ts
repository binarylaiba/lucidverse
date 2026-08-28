// ─── Web Audio API Binaural Harmonics Synthesizer ─────────────────────────────

class DreamAudioEngine {
  private ctx: AudioContext | null = null;
  private oscLeft: OscillatorNode | null = null;
  private oscRight: OscillatorNode | null = null;
  private oscSub: OscillatorNode | null = null;
  private masterGain: GainNode | null = null;
  private filter: BiquadFilterNode | null = null;
  private isPlaying = false;
  private currentFrequency = 432;

  private init() {
    if (this.ctx) return;
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    this.ctx = new AudioCtx();
  }

  public async start(freq = 432): Promise<boolean> {
    try {
      this.init();
      if (!this.ctx) return false;

      if (this.ctx.state === 'suspended') {
        await this.ctx.resume();
      }

      if (this.isPlaying) {
        this.setFrequency(freq);
        return true;
      }

      this.currentFrequency = freq;

      // Master Gain
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.0001, this.ctx.currentTime);
      this.masterGain.gain.exponentialRampToValueAtTime(0.07, this.ctx.currentTime + 2.0);

      // Low pass filter
      this.filter = this.ctx.createBiquadFilter();
      this.filter.type = 'lowpass';
      this.filter.frequency.setValueAtTime(800, this.ctx.currentTime);
      this.filter.Q.setValueAtTime(1.5, this.ctx.currentTime);

      this.filter.connect(this.masterGain);
      this.masterGain.connect(this.ctx.destination);

      // Left Channel (Carrier)
      const merger = this.ctx.createChannelMerger(2);
      
      this.oscLeft = this.ctx.createOscillator();
      this.oscLeft.type = 'sine';
      this.oscLeft.frequency.setValueAtTime(freq, this.ctx.currentTime);

      // Right Channel (Carrier + 5.5Hz Theta Beat)
      this.oscRight = this.ctx.createOscillator();
      this.oscRight.type = 'sine';
      this.oscRight.frequency.setValueAtTime(freq + 5.5, this.ctx.currentTime);

      // Sub harmonic for warmth (Half frequency)
      this.oscSub = this.ctx.createOscillator();
      this.oscSub.type = 'triangle';
      this.oscSub.frequency.setValueAtTime(freq * 0.5, this.ctx.currentTime);
      
      const subGain = this.ctx.createGain();
      subGain.gain.setValueAtTime(0.03, this.ctx.currentTime);
      this.oscSub.connect(subGain);
      subGain.connect(this.filter);

      this.oscLeft.connect(merger, 0, 0);
      this.oscRight.connect(merger, 0, 1);
      merger.connect(this.filter);

      this.oscLeft.start();
      this.oscRight.start();
      this.oscSub.start();

      this.isPlaying = true;
      return true;
    } catch (e) {
      console.warn('[AudioEngine] Could not start audio:', e);
      return false;
    }
  }

  public stop(): void {
    if (!this.ctx || !this.isPlaying || !this.masterGain) return;
    try {
      const now = this.ctx.currentTime;
      this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
      this.masterGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.8);

      setTimeout(() => {
        try {
          this.oscLeft?.stop();
          this.oscRight?.stop();
          this.oscSub?.stop();
          this.oscLeft?.disconnect();
          this.oscRight?.disconnect();
          this.oscSub?.disconnect();
        } catch {
          // ignore already stopped
        }
        this.isPlaying = false;
      }, 850);
    } catch {
      this.isPlaying = false;
    }
  }

  public toggle(freq?: number): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start(freq || this.currentFrequency);
      return true;
    }
  }

  public setFrequency(freq: number): void {
    this.currentFrequency = freq;
    if (!this.ctx || !this.isPlaying) return;
    const now = this.ctx.currentTime;
    this.oscLeft?.frequency.setTargetAtTime(freq, now, 0.3);
    this.oscRight?.frequency.setTargetAtTime(freq + 5.5, now, 0.3);
    this.oscSub?.frequency.setTargetAtTime(freq * 0.5, now, 0.3);
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public getFrequency(): number {
    return this.currentFrequency;
  }
}

export const dreamAudio = new DreamAudioEngine();
