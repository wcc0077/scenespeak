import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { AudioPlayer } from './AudioPlayer';

// Mock useAudio hook
const mockPlay = vi.fn();
const mockStop = vi.fn();

vi.mock('../hooks/useAudio', () => ({
  useAudio: () => ({
    isPlaying: false,
    play: mockPlay,
    stop: mockStop,
  }),
}));

describe('AudioPlayer', () => {
  it('renders play button', () => {
    render(<AudioPlayer text="Hello" />);
    expect(screen.getByRole('button')).toBeDefined();
  });

  it('calls play when clicked', () => {
    render(<AudioPlayer text="Hello" />);
    fireEvent.click(screen.getByRole('button'));
    expect(mockPlay).toHaveBeenCalledWith('Hello');
  });
});
