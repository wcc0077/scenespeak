import { useState, useCallback, useRef, useEffect } from 'react';

interface UseAudioReturn {
  isPlaying: boolean;
  play: (text: string) => void;
  stop: () => void;
}

export function useAudio(): UseAudioReturn {
  const [isPlaying, setIsPlaying] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const stop = useCallback(() => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    }
  }, []);

  const play = useCallback((text: string) => {
    if (!window.speechSynthesis) {
      console.warn('Web Speech API not supported');
      return;
    }
    stop();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.onstart = () => setIsPlaying(true);
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);
    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  }, [stop]);

  useEffect(() => { return () => { stop(); }; }, [stop]);
  return { isPlaying, play, stop };
}
