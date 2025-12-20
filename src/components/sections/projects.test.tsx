import { describe, it, expect, vi } from 'vitest';
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProjectsGallery from './projects';

describe('ProjectsGallery', () => {
  it('renders title and subtitle', () => {
    const onClose = vi.fn();
    render(
      <ProjectsGallery
        title="Test Projects"
        subtitle="Test Subtitle"
        onClose={onClose}
      />
    );

    expect(screen.getByText('Test Projects')).toBeInTheDocument();
    expect(screen.getByText('Test Subtitle')).toBeInTheDocument();
  });

  it('renders close button and calls onClose', async () => {
    const onClose = vi.fn();
    render(
      <ProjectsGallery
        title="Test Projects"
        subtitle="Test Subtitle"
        onClose={onClose}
      />
    );

    const closeButton = screen.getByRole('button', { name: /close/i });
    await userEvent.click(closeButton);

    expect(onClose).toHaveBeenCalled();
  });

  it('renders all project cards', () => {
    const onClose = vi.fn();
    render(
      <ProjectsGallery
        title="Test Projects"
        subtitle="Test Subtitle"
        onClose={onClose}
      />
    );

    // Should render 8 projects based on hardcoded array
    const images = screen.getAllByRole('img');
    expect(images.length).toBe(8);
  });

  it('displays project titles', () => {
    const onClose = vi.fn();
    render(
      <ProjectsGallery
        title="Test Projects"
        subtitle="Test Subtitle"
        onClose={onClose}
      />
    );

    expect(screen.getByText('E-commerce Platform')).toBeInTheDocument();
    expect(screen.getByText('Mobile App Design')).toBeInTheDocument();
    expect(screen.getByText('Dashboard UI')).toBeInTheDocument();
  });
});
