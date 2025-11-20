import { useCallback, useEffect, useRef, useState } from 'react';

export interface TTSOptions {
  rate?: number;
  pitch?: number;
  volume?: number;
  voice?: SpeechSynthesisVoice | null;
}

export interface TTSState {
  isPlaying: boolean;
  isPaused: boolean;
  isSupported: boolean;
  voices: SpeechSynthesisVoice[];
  currentText: string;
}

export function useTextToSpeech(options: TTSOptions = {}) {
  const {
    rate = 1,
    pitch = 1,
    volume = 1,
    voice = null,
  } = options;

  const [state, setState] = useState<TTSState>({
    isPlaying: false,
    isPaused: false,
    isSupported: typeof window !== 'undefined' && 'speechSynthesis' in window,
    voices: [],
    currentText: '',
  });

  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const textRef = useRef<string>('');

  // Load available voices
  useEffect(() => {
    if (!state.isSupported) return;

    const loadVoices = () => {
      const availableVoices = speechSynthesis.getVoices();
      setState(prev => ({ ...prev, voices: availableVoices }));
    };

    loadVoices();
    speechSynthesis.addEventListener('voiceschanged', loadVoices);

    return () => {
      speechSynthesis.removeEventListener('voiceschanged', loadVoices);
    };
  }, [state.isSupported]);

  const speak = useCallback((text: string) => {
    if (!state.isSupported || !text.trim()) return;

    // Stop any current speech
    speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = rate;
    utterance.pitch = pitch;
    utterance.volume = volume;
    
    if (voice) {
      utterance.voice = voice;
    }

    utterance.onstart = () => {
      setState(prev => ({ 
        ...prev, 
        isPlaying: true, 
        isPaused: false,
        currentText: text 
      }));
    };

    utterance.onend = () => {
      setState(prev => ({ 
        ...prev, 
        isPlaying: false, 
        isPaused: false,
        currentText: '' 
      }));
    };

    utterance.onerror = () => {
      setState(prev => ({ 
        ...prev, 
        isPlaying: false, 
        isPaused: false,
        currentText: '' 
      }));
    };

    utterance.onpause = () => {
      setState(prev => ({ ...prev, isPaused: true }));
    };

    utterance.onresume = () => {
      setState(prev => ({ ...prev, isPaused: false }));
    };

    utteranceRef.current = utterance;
    textRef.current = text;
    speechSynthesis.speak(utterance);
  }, [state.isSupported, rate, pitch, volume, voice]);

  const pause = useCallback(() => {
    if (state.isSupported && state.isPlaying && !state.isPaused) {
      speechSynthesis.pause();
    }
  }, [state.isSupported, state.isPlaying, state.isPaused]);

  const resume = useCallback(() => {
    if (state.isSupported && state.isPlaying && state.isPaused) {
      speechSynthesis.resume();
    }
  }, [state.isSupported, state.isPlaying, state.isPaused]);

  const stop = useCallback(() => {
    if (state.isSupported) {
      speechSynthesis.cancel();
      setState(prev => ({ 
        ...prev, 
        isPlaying: false, 
        isPaused: false,
        currentText: '' 
      }));
    }
  }, [state.isSupported]);

  const toggle = useCallback(() => {
    if (state.isPlaying) {
      if (state.isPaused) {
        resume();
      } else {
        pause();
      }
    }
  }, [state.isPlaying, state.isPaused, pause, resume]);

  return {
    ...state,
    speak,
    pause,
    resume,
    stop,
    toggle,
  };
}