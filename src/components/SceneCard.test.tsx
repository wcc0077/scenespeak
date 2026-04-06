import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { SceneCard } from './SceneCard';
import type { Scene } from '../types';

const mockScene: Scene = {
  id: 'test-scene',
  category: 'social',
  title: 'Test Scene',
  coverImage: '🎉',
  description: 'A test scene for testing',
  coreSentence: 'This is a test.',
  dialogue: {
    id: 'dialogue-1',
    context: 'Testing',
    speakers: [],
    lines: [],
  },
  sentences: [],
};

describe('SceneCard', () => {
  const mockOnClick = vi.fn();

  it('renders scene information', () => {
    render(<SceneCard scene={mockScene} onClick={mockOnClick} />);

    expect(screen.getByText('Test Scene')).toBeDefined();
    expect(screen.getByText('A test scene for testing')).toBeDefined();
    expect(screen.getByText('"This is a test."')).toBeDefined();
    expect(screen.getByText('🎉')).toBeDefined();
  });

  it('calls onClick when clicked', () => {
    render(<SceneCard scene={mockScene} onClick={mockOnClick} />);
    fireEvent.click(screen.getByRole('button'));
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});
