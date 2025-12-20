import { describe, it, expect } from 'vitest';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { Label } from './label';

describe('Label', () => {
  it('renders label with text', () => {
    render(<Label>Test Label</Label>);
    expect(screen.getByText('Test Label')).toBeInTheDocument();
  });

  it('accepts htmlFor prop', () => {
    render(<Label htmlFor="test-input">Test Label</Label>);
    const label = screen.getByText('Test Label');
    expect(label).toHaveAttribute('for', 'test-input');
  });

  it('renders as label element', () => {
    const { container } = render(<Label>Test</Label>);
    const label = container.querySelector('label');
    expect(label).toBeInTheDocument();
  });

  it('accepts className prop', () => {
    const { container } = render(<Label className="custom-label">Test</Label>);
    const label = container.querySelector('label');
    expect(label?.className).toContain('custom-label');
  });
});
