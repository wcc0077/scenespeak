import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useAudio } from './useAudio';

describe('useAudio', () => {
  const mockSpeak = vi.fn();
  const mockCancel = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    // Mock SpeechSynthesisUtterance
    global.SpeechSynthesisUtterance = vi.fn().mockImplementation((text: string) => ({
      text,
      lang: '',
      rate: 1,
      pitch: 1,
      onstart: null,
      onend: null,
      onerror: null,
    })) as any;

    // Mock speechSynthesis
    Object.defineProperty(window, 'speechSynthesis', {
      value: {
        speak: mockSpeak,
        cancel: mockCancel,
      },
      writable: true,
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('initializes with isPlaying false', () => {
    const { result } = renderHook(() => useAudio());
    expect(result.current.isPlaying).toBe(false);
  });

  it('calls speechSynthesis.speak when play is called', () => {
    const { result } = renderHook(() => useAudio());

    act(() => {
      result.current.play('Hello world');
    });

    expect(mockSpeak).toHaveBeenCalled();
  });

  it('calls speechSynthesis.cancel when stop is called', () => {
    const { result } = renderHook(() => useAudio());

    act(() => {
      result.current.stop();
    });

    expect(mockCancel).toHaveBeenCalled();
  });
});
