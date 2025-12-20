import { describe, it, expect } from 'vitest';
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Textarea } from './textarea';

describe('Textarea', () => {
  it('renders textarea element', () => {
    const { container } = render(<Textarea />);
    const textarea = container.querySelector('textarea');
    expect(textarea).toBeInTheDocument();
  });

  it('accepts input value', async () => {
    render(<Textarea placeholder="Enter text" />);
    const textarea = screen.getByPlaceholderText('Enter text') as HTMLTextAreaElement;
    
    await userEvent.type(textarea, 'Hello World');
    expect(textarea.value).toBe('Hello World');
  });

  it('handles disabled state', () => {
    const { container } = render(<Textarea disabled />);
    const textarea = container.querySelector('textarea');
    expect(textarea).toBeDisabled();
  });

  it('accepts rows prop', () => {
    const { container } = render(<Textarea rows={10} />);
    const textarea = container.querySelector('textarea');
    expect(textarea).toHaveAttribute('rows', '10');
  });

  it('accepts className prop', () => {
    const { container } = render(<Textarea className="custom-textarea" />);
    const textarea = container.querySelector('textarea');
    expect(textarea?.className).toContain('custom-textarea');
  });
});
