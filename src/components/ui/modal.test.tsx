import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Modal from './modal';

describe('Modal', () => {
  it('renders title, subtitle and children and calls onClose', async () => {
    const onClose = vi.fn();
    render(
      <Modal title={<span>Test Title</span>} subtitle={<span>Sub</span>} onClose={onClose}>
        <div>Child content</div>
      </Modal>
    );

    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Sub')).toBeInTheDocument();
    expect(screen.getByText('Child content')).toBeInTheDocument();

    const button = screen.getByRole('button', { name: /close/i });
    await userEvent.click(button);
    expect(onClose).toHaveBeenCalled();
  });
});
