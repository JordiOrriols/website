import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import {
  Dialog,
  DialogTrigger,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from './dialog';

describe('Dialog Components', () => {
  it('renders Dialog wrapper component', () => {
    const { container } = render(
      <Dialog open>
        <div>Test</div>
      </Dialog>
    );
    expect(container).toBeTruthy();
  });

  it('renders DialogTrigger', () => {
    const { container } = render(
      <Dialog>
        <DialogTrigger>Open</DialogTrigger>
      </Dialog>
    );
    expect(container.textContent).toContain('Open');
  });

  it('renders DialogTitle inside Dialog context', () => {
    const { container } = render(
      <Dialog>
        <DialogTitle>Test Title</DialogTitle>
      </Dialog>
    );
    expect(container.textContent).toContain('Test Title');
    expect(container.querySelector('[data-slot="dialog-title"]')).toBeTruthy();
  });

  it('renders DialogTitle with custom className', () => {
    const { container } = render(
      <Dialog>
        <DialogTitle className="custom-class">Title</DialogTitle>
      </Dialog>
    );
    const title = container.querySelector('[data-slot="dialog-title"]');
    expect(title?.className).toContain('custom-class');
    expect(title?.className).toContain('text-lg');
  });

  it('renders DialogDescription inside Dialog context', () => {
    const { container } = render(
      <Dialog>
        <DialogDescription>Test Description</DialogDescription>
      </Dialog>
    );
    expect(container.textContent).toContain('Test Description');
    expect(container.querySelector('[data-slot="dialog-description"]')).toBeTruthy();
  });

  it('renders DialogDescription with custom className', () => {
    const { container } = render(
      <Dialog>
        <DialogDescription className="custom-desc">Desc</DialogDescription>
      </Dialog>
    );
    const desc = container.querySelector('[data-slot="dialog-description"]');
    expect(desc?.className).toContain('custom-desc');
    expect(desc?.className).toContain('text-sm');
  });

  it('renders DialogHeader with children', () => {
    const { container } = render(
      <Dialog>
        <DialogHeader>
          <DialogTitle>Title</DialogTitle>
          <DialogDescription>Desc</DialogDescription>
        </DialogHeader>
      </Dialog>
    );
    expect(container.textContent).toContain('Title');
    expect(container.textContent).toContain('Desc');
    expect(container.querySelector('[data-slot="dialog-header"]')).toBeTruthy();
  });

  it('renders DialogHeader with custom className', () => {
    const { container } = render(
      <Dialog>
        <DialogHeader className="custom-header">Content</DialogHeader>
      </Dialog>
    );
    const header = container.querySelector('[data-slot="dialog-header"]');
    expect(header?.className).toContain('custom-header');
    expect(header?.className).toContain('flex');
  });

  it('renders DialogFooter component', () => {
    const { container } = render(
      <Dialog>
        <DialogFooter>
          <button>Action</button>
        </DialogFooter>
      </Dialog>
    );
    expect(container.textContent).toContain('Action');
    expect(container.querySelector('[data-slot="dialog-footer"]')).toBeTruthy();
  });

  it('renders DialogFooter with custom className', () => {
    const { container } = render(
      <Dialog>
        <DialogFooter className="custom-footer">
          <button>Cancel</button>
        </DialogFooter>
      </Dialog>
    );
    const footer = container.querySelector('[data-slot="dialog-footer"]');
    expect(footer?.className).toContain('custom-footer');
    expect(footer?.className).toContain('flex');
  });

  it('renders DialogClose inside Dialog context', () => {
    const { container } = render(
      <Dialog>
        <DialogClose>Close</DialogClose>
      </Dialog>
    );
    expect(container.querySelector('[data-slot="dialog-close"]')).toBeTruthy();
  });

  it('renders DialogClose with disabled state', () => {
    const { container } = render(
      <Dialog>
        <DialogClose disabled>Close</DialogClose>
      </Dialog>
    );
    const closeBtn = container.querySelector('[data-slot="dialog-close"]') as HTMLButtonElement;
    expect(closeBtn?.disabled).toBe(true);
  });

  it('Dialog components compose together', () => {
    const { container } = render(
      <Dialog>
        <DialogHeader>
          <DialogTitle>Test</DialogTitle>
          <DialogDescription>Desc</DialogDescription>
        </DialogHeader>
        <div>Content</div>
        <DialogFooter>
          <button>Action</button>
        </DialogFooter>
      </Dialog>
    );
    expect(container.querySelector('[data-slot="dialog-header"]')).toBeTruthy();
    expect(container.querySelector('[data-slot="dialog-title"]')).toBeTruthy();
    expect(container.querySelector('[data-slot="dialog-footer"]')).toBeTruthy();
  });
});
