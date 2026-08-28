import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import PageContainer from '@/components/PageContainer';
import { useDream } from '@/context/DreamContext';
import { staggerContainer, staggerItem } from '@/animations/variants';
import type { StreamMessage, DimensionMood } from '@/types';

const INITIAL_MESSAGES: StreamMessage[] = [
  { id: '1', user: 'ASTRO_VOX', text: 'Resonance coherence holding solid at 98.2% in the north quadrant!', time: '12:04:18', avatarColor: '#06b6d4' },
  { id: '2', user: 'LUCID_SEEKER', text: 'Whoa, look at the quartz spire refraction just now ✨', time: '12:05:02', avatarColor: '#a855f7' },
  { id: '3', user: 'NEURAL_LINK_9', text: 'Tuning carrier harmonics to 639Hz now... soundscape is incredible', time: '12:05:33', avatarColor: '#44e2cd' },
  { id: '4', user: 'AETHER_AI', text: 'Theta wave synchronisation optimal across all 342 observers.', time: '12:06:01', isAi: true, avatarColor: '#ec4899' },
];

const moodColors: Record<DimensionMood, string> = {
  crystalline: '#a78bfa',
  neural: '#818cf8',
  solar: '#fbbf24',
  ethereal: '#06b6d4',
  void: '#475569',
  cosmic: '#a855f7',
};

export default function StreamPage() {
  const { streams, activeStreamId, setActiveStreamId, toggleAudio, showToast } = useDream();
  const [messages, setMessages] = useState<StreamMessage[]>(INITIAL_MESSAGES);
  const [chatInput, setChatInput] = useState('');
  const [selectedMood, setSelectedMood] = useState<string>('all');
  const chatEndRef = useRef<HTMLDivElement>(null);

  const activeStream = streams.find((s) => s.id === activeStreamId) || streams[0];

  // Auto-scroll chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Handle sending user chat
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const newMsg: StreamMessage = {
      id: Date.now().toString(),
      user: 'YOU (NAVIGATOR)',
      text: chatInput.trim(),
      time: new Date().toTimeString().slice(0, 8),
      avatarColor: '#22c55e',
    };

    setMessages((prev) => [...prev, newMsg]);
    setChatInput('');

    // Simulate AI navigator reply
    setTimeout(() => {
      const replies = [
        'Synaptic telemetry verified. Beautiful coordination!',
        'Observing the same ripple anomaly here.',
        'Signal integrity boosted by your transmission.',
      ];
      const randomReply = replies[Math.floor(Math.random() * replies.length)];
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          user: 'ASTRAL_WATCHER',
          text: randomReply,
          time: new Date().toTimeString().slice(0, 8),
          avatarColor: '#c084fc',
        },
      ]);
    }, 1200);
  };

  const handleSendReaction = (emoji: string) => {
    showToast(`Reaction sent: ${emoji}`);
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        user: 'YOU',
        text: `Sent reaction: ${emoji} ${emoji} ${emoji}`,
        time: new Date().toTimeString().slice(0, 8),
        avatarColor: '#22c55e',
      },
    ]);
  };

  const handleTuneAudio = () => {
    const freq = parseInt(activeStream.frequency) || 432;
    toggleAudio(freq);
  };

  const filteredStreams = selectedMood === 'all'
    ? streams
    : streams.filter((s) => s.mood === selectedMood);

  return (
    <PageContainer>
      <div className="pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="mb-8"
        >
          <motion.p variants={staggerItem} className="font-mono text-xs text-cyan-400 tracking-[0.4em] uppercase mb-2">
            ── Neural Broadcasting Hub ──
          </motion.p>
          <motion.h1 variants={staggerItem} className="font-syne text-4xl sm:text-6xl font-black uppercase tracking-tight text-slate-100 mb-2">
            LIVE DREAM STREAMS
          </motion.h1>
          <motion.p variants={staggerItem} className="font-display italic text-lg sm:text-xl text-slate-400">
            "Observe the subconscious dimensions of fellow navigators in real time."
          </motion.p>
        </motion.div>

        {/* Live Theater Main Section: Video Player (8 Cols) + Live Chat (4 Cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-12 items-start">
          
          {/* Main Broadcast Player (8 Cols) */}
          <div className="lg:col-span-8 flex flex-col gap-4">
            <div className="glass-panel border border-violet-500/30 rounded-lg overflow-hidden shadow-[0_0_50px_rgba(124,58,237,0.2)]">
              
              {/* Broadcast Visualizer Canvas viewport */}
              <div
                className="h-80 sm:h-96 relative overflow-hidden flex flex-col justify-between p-6"
                style={{
                  background: `radial-gradient(ellipse at 50% 60%, ${moodColors[activeStream.mood]}33 0%, #020617 85%)`,
                }}
              >
                {/* Top Status Overlay */}
                <div className="flex items-center justify-between z-10">
                  <div className="flex items-center gap-2 bg-red-500/20 border border-red-500/40 rounded-full px-3 py-1 backdrop-blur-md">
                    <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
                    <span className="font-mono text-xs font-bold text-red-400 tracking-wider">LIVE</span>
                    <span className="font-mono text-xs text-slate-300">· {activeStream.duration}</span>
                  </div>

                  <div className="flex items-center gap-2 bg-void-950/80 border border-white/10 rounded-full px-3.5 py-1 backdrop-blur-md font-mono text-xs text-cyan-300">
                    <span>👁 {activeStream.viewers} observers</span>
                  </div>
                </div>

                {/* Animated Central Holo Ring */}
                <div className="flex flex-col items-center justify-center my-auto z-10">
                  <div
                    className="w-32 h-32 rounded-full border-2 border-dashed animate-spin flex items-center justify-center"
                    style={{
                      borderColor: moodColors[activeStream.mood],
                      animationDuration: '24s',
                      boxShadow: `0 0 40px ${moodColors[activeStream.mood]}40`,
                    }}
                  >
                    <div className="w-20 h-20 rounded-full border border-white/30 flex items-center justify-center font-mono text-xs text-white">
                      {activeStream.frequency}
                    </div>
                  </div>
                </div>

                {/* Bottom Stream Telemetry Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-void-950/90 p-4 rounded-sm border border-white/10 backdrop-blur-md z-10">
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-wider" style={{ color: moodColors[activeStream.mood] }}>
                      {activeStream.user} · {activeStream.mood.toUpperCase()}
                    </span>
                    <h3 className="font-syne text-base font-bold text-slate-100">
                      {activeStream.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleTuneAudio}
                      className="px-4 py-2 rounded-sm font-mono text-xs text-cyan-300 glass-panel border border-cyan-500/40 hover:bg-cyan-600/20 transition-all flex items-center gap-2 cursor-pointer"
                    >
                      <span>🎧</span>
                      <span>Tune {activeStream.frequency}</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Stream Description & Tags */}
              <div className="p-5 border-t border-white/05 bg-void-950/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <p className="font-body text-xs sm:text-sm text-slate-400 max-w-xl">
                  {activeStream.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {activeStream.tags.map((tag) => (
                    <span key={tag} className="font-mono text-[10px] px-2.5 py-0.5 rounded-full glass-panel-light border border-white/10 text-slate-400">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Live Telemetry & Navigator Chat (4 Cols) */}
          <div className="lg:col-span-4 flex flex-col h-[520px] glass-panel border border-white/10 rounded-lg overflow-hidden">
            {/* Chat Header */}
            <div className="p-4 border-b border-white/05 bg-void-950/60 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                <h4 className="font-syne text-xs font-bold tracking-wider text-slate-200 uppercase">
                  Navigator Telemetry Feed
                </h4>
              </div>
              <span className="font-mono text-[10px] text-slate-500">ENCRYPTED LINK</span>
            </div>

            {/* Chat Message Stream */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 font-mono text-xs">
              {messages.map((msg) => (
                <div key={msg.id} className="glass-panel-light p-2.5 rounded-sm border border-white/05">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-[11px]" style={{ color: msg.avatarColor || '#a78bfa' }}>
                      {msg.user}
                    </span>
                    <span className="text-[9px] text-slate-600">{msg.time}</span>
                  </div>
                  <p className="text-slate-300 font-body text-xs leading-relaxed">
                    {msg.text}
                  </p>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>

            {/* Quick Reactions Bar */}
            <div className="px-4 py-2 border-t border-white/05 flex items-center justify-between bg-void-950/40">
              <span className="font-mono text-[10px] text-slate-500">REACTIONS:</span>
              <div className="flex gap-2">
                {['✨', '🌌', '🔮', '⚡', '💎'].map((emoji) => (
                  <button
                    key={emoji}
                    onClick={() => handleSendReaction(emoji)}
                    className="hover:scale-125 transition-transform text-sm cursor-pointer p-1"
                    title={`Send ${emoji}`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>

            {/* Chat Input Box */}
            <form onSubmit={handleSendMessage} className="p-3 border-t border-white/05 bg-void-950/80 flex gap-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Transmit thoughts to stream..."
                className="dream-input flex-1 px-3 py-2 rounded-sm text-xs"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-sm font-syne text-xs font-bold tracking-wider uppercase bg-violet-600 text-white hover:bg-violet-500 transition-colors"
              >
                Send
              </button>
            </form>
          </div>
        </div>

        {/* All Available Streams Catalog */}
        <div className="pt-8 border-t border-white/05">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="font-syne text-xl sm:text-2xl font-bold text-slate-100 uppercase">
                Active Broadcast Channels
              </h3>
              <p className="font-body text-xs text-slate-400">
                Switch channels to tune into different subconscious realms.
              </p>
            </div>

            {/* Mood Category Filter */}
            <div className="flex flex-wrap gap-1.5 font-mono text-xs">
              {['all', 'crystalline', 'neural', 'solar', 'ethereal', 'void', 'cosmic'].map((mood) => (
                <button
                  key={mood}
                  onClick={() => setSelectedMood(mood)}
                  className={[
                    'px-3 py-1 rounded-full uppercase transition-all duration-200 cursor-pointer',
                    selectedMood === mood
                      ? 'bg-violet-600 text-white shadow-[0_0_15px_rgba(124,58,237,0.4)]'
                      : 'glass-panel-light border border-white/10 text-slate-400 hover:text-white',
                  ].join(' ')}
                >
                  {mood}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredStreams.map((stream) => {
              const isCurrent = stream.id === activeStreamId;
              return (
                <div
                  key={stream.id}
                  onClick={() => {
                    setActiveStreamId(stream.id);
                    window.scrollTo({ top: 120, behavior: 'smooth' });
                  }}
                  className={[
                    'glass-panel rounded-sm overflow-hidden cursor-pointer transition-all duration-300 group border',
                    isCurrent
                      ? 'border-cyan-400 shadow-[0_0_30px_rgba(6,182,212,0.3)] bg-cyan-950/20'
                      : 'border-white/10 hover:border-violet-400/50 hover:-translate-y-1',
                  ].join(' ')}
                >
                  {/* Thumbnail */}
                  <div
                    className="h-36 flex items-center justify-center relative p-4"
                    style={{
                      background: `linear-gradient(135deg, ${moodColors[stream.mood]}22, #020617)`,
                    }}
                  >
                    <span className="font-mono text-xs text-slate-500 uppercase tracking-widest">
                      {stream.mood} · {stream.frequency}
                    </span>
                    <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-red-500/20 border border-red-500/30 rounded-full px-2 py-0.5 font-mono text-[10px] text-red-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
                      <span>LIVE</span>
                    </div>
                    <span className="absolute bottom-3 right-3 font-mono text-[10px] text-slate-400 bg-void-950/80 px-2 py-0.5 rounded-sm border border-white/10">
                      {stream.viewers} watching
                    </span>
                  </div>

                  <div className="p-4">
                    <p className="font-mono text-[10px] text-slate-500 uppercase tracking-widest mb-1">
                      {stream.user}
                    </p>
                    <h4 className="font-syne text-sm font-bold text-slate-100 group-hover:text-cyan-300 transition-colors line-clamp-1 mb-2">
                      {stream.title}
                    </h4>
                    <p className="font-body text-xs text-slate-400 line-clamp-2">
                      {stream.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
