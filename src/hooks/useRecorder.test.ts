import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useRecorder } from './useRecorder';

describe('useRecorder', () => {
  const mockGetUserMedia = vi.fn();
  const mockMediaRecorder = {
    start: vi.fn(),
    stop: vi.fn(),
    ondataavailable: null as ((event: { data: Blob }) => void) | null,
    onstop: null as (() => void) | null,
  };

  beforeEach(() => {
    vi.clearAllMocks();

    // Mock MediaRecorder
    global.MediaRecorder = vi.fn(() => mockMediaRecorder) as any;

    // Mock navigator.mediaDevices
    Object.defineProperty(navigator, 'mediaDevices', {
      value: {
        getUserMedia: mockGetUserMedia.mockResolvedValue({
          getTracks: () => [{ stop: vi.fn() }],
        }),
      },
      writable: true,
    });
  });

  it('initializes with isRecording false and no audioUrl', () => {
    const { result } = renderHook(() => useRecorder());
    expect(result.current.isRecording).toBe(false);
    expect(result.current.audioUrl).toBeNull();
  });

  it('starts recording when startRecording is called', async () => {
    const { result } = renderHook(() => useRecorder());

    await act(async () => {
      await result.current.startRecording();
    });

    expect(mockGetUserMedia).toHaveBeenCalledWith({ audio: true });
    expect(result.current.isRecording).toBe(true);
  });
});
