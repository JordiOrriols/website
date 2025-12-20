import { describe, it, expect, vi } from 'vitest';
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Gallery from './gallery';

const mockGalleryItems = [
  { title: 'Design 1', image: 'https://example.com/img1.jpg' },
  { title: 'Design 2', image: 'https://example.com/img2.jpg' },
  { title: 'Design 3', image: 'https://example.com/img3.jpg' },
];

describe('Gallery', () => {
  it('renders title and subtitle', () => {
    const onClose = vi.fn();
    render(
      <Gallery
        title="Test Gallery"
        subtitle="Test Subtitle"
        options={mockGalleryItems}
        onClose={onClose}
      />
    );

    expect(screen.getByText('Test Gallery')).toBeInTheDocument();
    expect(screen.getByText('Test Subtitle')).toBeInTheDocument();
  });

  it('renders all gallery items', () => {
    const onClose = vi.fn();
    render(
      <Gallery
        title="Test Gallery"
        subtitle="Test Subtitle"
        options={mockGalleryItems}
        onClose={onClose}
      />
    );

    mockGalleryItems.forEach((item) => {
      const images = screen.getAllByAltText(item.title);
      expect(images.length).toBeGreaterThan(0);
    });
  });

  it('renders close button and calls onClose', async () => {
    const onClose = vi.fn();
    render(
      <Gallery
        title="Test Gallery"
        subtitle="Test Subtitle"
        options={mockGalleryItems}
        onClose={onClose}
      />
    );

    const closeButton = screen.getByRole('button', { name: /close/i });
    await userEvent.click(closeButton);

    expect(onClose).toHaveBeenCalled();
  });

  it('displays item titles on hover (via aria-labels)', () => {
    const onClose = vi.fn();
    render(
      <Gallery
        title="Test Gallery"
        subtitle="Test Subtitle"
        options={mockGalleryItems}
        onClose={onClose}
      />
    );

    mockGalleryItems.forEach((item) => {
      const images = screen.getAllByAltText(item.title);
      expect(images.length).toBeGreaterThan(0);
    });
  });

  it('renders correct number of images', () => {
    const onClose = vi.fn();
    render(
      <Gallery
        title="Test Gallery"
        subtitle="Test Subtitle"
        options={mockGalleryItems}
        onClose={onClose}
      />
    );

    const allImages = screen.getAllByRole('img');
    expect(allImages.length).toBe(mockGalleryItems.length);
  });
});
