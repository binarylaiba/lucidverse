import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Dimension, Dream, SceneEntity, LiveStream, RealityCalibration, DreamVisualParameters } from '@/types';
import { FEATURED_DIMENSIONS, INITIAL_DREAMS, DEFAULT_STREAMS, DEFAULT_SCENE_ENTITIES, DEFAULT_CALIBRATION } from '@/data';
import { dreamAudio } from '@/utils/audio';

interface DreamContextType {
  // Dimensions
  dimensions: Dimension[];
  bookmarkedIds: string[];
  toggleBookmark: (id: string) => void;
  isBookmarked: (id: string) => boolean;

  // Dreams (My Dreams)
  dreams: Dream[];
  deleteDream: (id: string) => void;
  synthesizeDream: (prompt: string, params?: Partial<DreamVisualParameters>) => Promise<Dream>;
  isSynthesizing: boolean;
  synthesisStep: string;

  // Live Streams
  streams: LiveStream[];
  activeStreamId: string;
  setActiveStreamId: (id: string) => void;

  // Reality Calibration
  calibration: RealityCalibration;
  updateCalibration: (patch: Partial<RealityCalibration>) => void;
  resetCalibration: () => void;

  // Audio Ambience
  isAudioPlaying: boolean;
  audioFrequency: number;
  toggleAudio: (freq?: number) => void;
  setAudioFrequency: (freq: number) => void;

  // Modals & Inspector
  inspectEntity: SceneEntity | null;
  openInspector: (entity: SceneEntity) => void;
  closeInspector: () => void;
  chronicleDimension: Dimension | null;
  openChronicle: (dim: Dimension) => void;
  closeChronicle: () => void;
  weaveModalOpen: boolean;
  openWeaveModal: () => void;
  closeWeaveModal: () => void;

  // Notification Toast
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const DreamContext = createContext<DreamContextType | null>(null);

const STORAGE_KEYS = {
  DREAMS: 'aetherdream_user_dreams_v1',
  BOOKMARKS: 'aetherdream_bookmarks_v1',
  CALIBRATION: 'aetherdream_calibration_v1',
};

export const DreamProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 1. Dimensions & Bookmarks
  const [dimensions, setDimensions] = useState<Dimension[]>(FEATURED_DIMENSIONS);
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.BOOKMARKS);
      return saved ? JSON.parse(saved) : ['neon-archipelago', 'crystal-metropolis'];
    } catch {
      return ['neon-archipelago', 'crystal-metropolis'];
    }
  });

  const toggleBookmark = (id: string) => {
    setBookmarkedIds((prev) => {
      const exists = prev.includes(id);
      const next = exists ? prev.filter((item) => item !== id) : [...prev, id];
      try {
        localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(next));
      } catch {
        // ignore
      }
      showToast(exists ? 'Dimension removed from bookmarks' : 'Dimension saved to Codex bookmarks ✨');
      return next;
    });
  };

  const isBookmarked = (id: string) => bookmarkedIds.includes(id);

  // 2. Dreams
  const [dreams, setDreams] = useState<Dream[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.DREAMS);
      return saved ? JSON.parse(saved) : INITIAL_DREAMS;
    } catch {
      return INITIAL_DREAMS;
    }
  });

  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const [synthesisStep, setSynthesisStep] = useState('');

  const deleteDream = (id: string) => {
    setDreams((prev) => {
      const next = prev.filter((d) => d.id !== id);
      try {
        localStorage.setItem(STORAGE_KEYS.DREAMS, JSON.stringify(next));
      } catch {
        // ignore
      }
      showToast('Dream deleted from personal chronicle');
      return next;
    });
  };

  const synthesizeDream = async (prompt: string, params?: Partial<DreamVisualParameters>): Promise<Dream> => {
    setIsSynthesizing(true);
    setSynthesisStep('Aligning Neural Theta Frequencies...');
    await new Promise((r) => setTimeout(r, 600));

    setSynthesisStep('Calibrating Volumetric Shaders & Stardust...');
    await new Promise((r) => setTimeout(r, 650));

    setSynthesisStep('Materializing 3D Crystal Monoliths & Astral Lore...');
    await new Promise((r) => setTimeout(r, 600));

    // Generate intelligent dream data based on prompt
    const id = 'dream-' + Date.now().toString(36);
    const cleanPrompt = prompt.trim();
    
    // Pick mood based on prompt keywords
    let mood: Dimension['mood'] = 'ethereal';
    let primary = '#06b6d4';
    let secondary = '#7c3aed';
    const pLower = cleanPrompt.toLowerCase();
    if (pLower.includes('crystal') || pLower.includes('spire') || pLower.includes('quartz')) {
      mood = 'crystalline';
      primary = '#e2e8f0';
      secondary = '#7c3aed';
    } else if (pLower.includes('solar') || pLower.includes('sun') || pLower.includes('fire') || pLower.includes('star')) {
      mood = 'solar';
      primary = '#fbbf24';
      secondary = '#f97316';
    } else if (pLower.includes('mind') || pLower.includes('neural') || pLower.includes('synapse') || pLower.includes('cyber')) {
      mood = 'neural';
      primary = '#a855f7';
      secondary = '#4f46e5';
    } else if (pLower.includes('void') || pLower.includes('dark') || pLower.includes('abyss') || pLower.includes('quiet')) {
      mood = 'void';
      primary = '#64748b';
      secondary = '#3b82f6';
    } else if (pLower.includes('cosmic') || pLower.includes('galaxy') || pLower.includes('astral') || pLower.includes('dimension')) {
      mood = 'cosmic';
      primary = '#d946ef';
      secondary = '#6366f1';
    }

    const words = cleanPrompt.split(' ').slice(0, 4).join(' ');
    const title = words.length > 2 ? words.toUpperCase() : 'SYNTHESIZED REALM';

    const visualParams: DreamVisualParameters = {
      fog: params?.fog ?? 45,
      particleDensity: params?.particleDensity ?? 80,
      lightingIntensity: params?.lightingIntensity ?? 85,
      environmentDepth: params?.environmentDepth ?? 80,
      carrierFreq: params?.carrierFreq ?? (mood === 'crystalline' ? 639 : mood === 'solar' ? 741 : 528),
    };

    const newDream: Dream = {
      id,
      title: title,
      subtitle: `Autonomous Synthesis (${mood.toUpperCase()})`,
      description: cleanPrompt,
      prompt: cleanPrompt,
      mood,
      environment: `${mood.charAt(0).toUpperCase() + mood.slice(1)} Subconscious Basin`,
      story: `Entering the realm of "${cleanPrompt}". Volumetric mist rolls across the horizon as geometry solidifies from thought. Resonating at ${visualParams.carrierFreq}Hz, the dream holds high lucid stability.`,
      colors: [primary, secondary, '#ffd8e7'],
      entities: [
        {
          id: `entity-${id}-1`,
          name: `${title} Anchor Monolith`,
          category: '3D SCENE OBJECT',
          role: 'Resonance Anchor',
          description: `Constructed directly from the dream prompt: "${cleanPrompt}". Channels continuous coherence.`,
          frequency: `${visualParams.carrierFreq}.0 Hz`,
          color: primary,
          icon: 'diamond',
        },
        DEFAULT_SCENE_ENTITIES[1],
      ],
      coherence: Math.floor(88 + Math.random() * 10),
      stability: Math.floor(85 + Math.random() * 12),
      frequency: `${visualParams.carrierFreq} Hz`,
      depth: `${(10 + Math.random() * 20).toFixed(1)} km`,
      visualParameters: visualParams,
      status: 'active',
      createdAt: new Date().toISOString().slice(0, 10),
    };

    // Also add to Codex dimensions catalog so it can be explored globally
    const newDim: Dimension = {
      id: newDream.id,
      title: newDream.title,
      subtitle: newDream.subtitle,
      mood: newDream.mood,
      coherence: newDream.coherence,
      stability: newDream.stability,
      frequency: newDream.frequency,
      depth: newDream.depth,
      colorPrimary: primary,
      colorSecondary: secondary,
      description: newDream.description,
      storyLore: [newDream.story],
      entities: newDream.entities,
      tags: [mood, 'synthesized', 'custom'],
      isCustom: true,
    };

    setDimensions((prev) => [newDim, ...prev]);

    setDreams((prev) => {
      const next = [newDream, ...prev];
      try {
        localStorage.setItem(STORAGE_KEYS.DREAMS, JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });

    setIsSynthesizing(false);
    setSynthesisStep('');
    showToast(`Dreamscape "${title}" synthesized & saved! ✨`);
    return newDream;
  };

  // 3. Streams
  const [streams] = useState<LiveStream[]>(DEFAULT_STREAMS);
  const [activeStreamId, setActiveStreamId] = useState<string>('1');

  // 4. Reality Calibration
  const [calibration, setCalibration] = useState<RealityCalibration>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CALIBRATION);
      return saved ? JSON.parse(saved) : DEFAULT_CALIBRATION;
    } catch {
      return DEFAULT_CALIBRATION;
    }
  });

  const updateCalibration = (patch: Partial<RealityCalibration>) => {
    setCalibration((prev) => {
      const next = { ...prev, ...patch };
      try {
        localStorage.setItem(STORAGE_KEYS.CALIBRATION, JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  const resetCalibration = () => {
    setCalibration(DEFAULT_CALIBRATION);
    try {
      localStorage.setItem(STORAGE_KEYS.CALIBRATION, JSON.stringify(DEFAULT_CALIBRATION));
    } catch {
      // ignore
    }
    showToast('Reality Calibration reset to default factory baseline');
  };

  // 5. Audio Ambience
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [audioFrequency, setAudioFrequencyState] = useState(432);

  const toggleAudio = (freq?: number) => {
    const f = freq || audioFrequency;
    const playing = dreamAudio.toggle(f);
    setIsAudioPlaying(playing);
    if (playing) {
      setAudioFrequencyState(f);
      showToast(`Harmonic Audio: ${f}Hz Binaural Flow ACTIVE 🎧`);
    } else {
      showToast('Harmonic Audio paused');
    }
  };

  const setAudioFrequency = (freq: number) => {
    setAudioFrequencyState(freq);
    dreamAudio.setFrequency(freq);
  };

  // 6. Modals
  const [inspectEntity, setInspectEntity] = useState<SceneEntity | null>(null);
  const openInspector = (entity: SceneEntity) => setInspectEntity(entity);
  const closeInspector = () => setInspectEntity(null);

  const [chronicleDimension, setChronicleDimension] = useState<Dimension | null>(null);
  const openChronicle = (dim: Dimension) => setChronicleDimension(dim);
  const closeChronicle = () => setChronicleDimension(null);

  const [weaveModalOpen, setWeaveModalOpen] = useState(false);
  const openWeaveModal = () => setWeaveModalOpen(true);
  const closeWeaveModal = () => setWeaveModalOpen(false);

  // 7. Toast Notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
  };

  useEffect(() => {
    if (!toastMessage) return;
    const t = setTimeout(() => setToastMessage(null), 3200);
    return () => clearTimeout(t);
  }, [toastMessage]);

  return (
    <DreamContext.Provider
      value={{
        dimensions,
        bookmarkedIds,
        toggleBookmark,
        isBookmarked,
        dreams,
        deleteDream,
        synthesizeDream,
        isSynthesizing,
        synthesisStep,
        streams,
        activeStreamId,
        setActiveStreamId,
        calibration,
        updateCalibration,
        resetCalibration,
        isAudioPlaying,
        audioFrequency,
        toggleAudio,
        setAudioFrequency,
        inspectEntity,
        openInspector,
        closeInspector,
        chronicleDimension,
        openChronicle,
        closeChronicle,
        weaveModalOpen,
        openWeaveModal,
        closeWeaveModal,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </DreamContext.Provider>
  );
};

export const useDream = () => {
  const context = useContext(DreamContext);
  if (!context) {
    throw new Error('useDream must be used within a DreamProvider');
  }
  return context;
};
