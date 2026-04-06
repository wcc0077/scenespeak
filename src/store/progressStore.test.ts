import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useProgressStore } from '../store/progressStore';

describe('useProgressStore', () => {
  beforeEach(() => {
    const { result } = renderHook(() => useProgressStore());
    act(() => {
      result.current.completedScenes = [];
      result.current.sentenceProgress = {};
      result.current.stats = {
        totalStudyTime: 0,
        streakDays: 0,
        lastStudyDate: '',
      };
    });
  });

  it('initializes with empty state', () => {
    const { result } = renderHook(() => useProgressStore());
    expect(result.current.completedScenes).toEqual([]);
    expect(result.current.stats.streakDays).toBe(0);
  });

  it('completes a scene', () => {
    const { result } = renderHook(() => useProgressStore());

    act(() => {
      result.current.completeScene('scene-1');
    });

    expect(result.current.completedScenes).toContain('scene-1');
    expect(result.current.isSceneCompleted('scene-1')).toBe(true);
  });

  it('records sentence attempt', () => {
    const { result } = renderHook(() => useProgressStore());

    act(() => {
      result.current.recordSentenceAttempt('sentence-1');
    });

    const progress = result.current.getSentenceProgress('sentence-1');
    expect(progress?.recorded).toBe(true);
    expect(progress?.attempts).toBe(1);
  });
});
