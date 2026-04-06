import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ProgressBar } from './ProgressBar';

describe('ProgressBar', () => {
  it('renders progress bar', () => {
    render(<ProgressBar current={2} total={5} />);
    expect(screen.getByText('Step 2 of 5')).toBeDefined();
    expect(screen.getByText('40%')).toBeDefined();
  });

  it('calculates percentage correctly', () => {
    const { rerender } = render(<ProgressBar current={1} total={4} />);
    expect(screen.getByText('25%')).toBeDefined();

    rerender(<ProgressBar current={3} total={4} />);
    expect(screen.getByText('75%')).toBeDefined();
  });

  it('hides label when showLabel is false', () => {
    render(<ProgressBar current={2} total={5} showLabel={false} />);
    expect(screen.queryByText('Step 2 of 5')).toBeNull();
  });
});
