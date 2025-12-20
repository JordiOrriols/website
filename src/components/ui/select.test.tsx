import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectLabel,
  SelectSeparator,
} from './select';

describe('Select Components', () => {
  it('renders Select root component', () => {
    const { container } = render(
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Select..." />
        </SelectTrigger>
      </Select>
    );
    expect(container).toBeTruthy();
  });

  it('renders SelectTrigger component', () => {
    const { container } = render(
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Select..." />
        </SelectTrigger>
      </Select>
    );
    const trigger = container.querySelector('[data-slot="select-trigger"]');
    expect(trigger).toBeTruthy();
  });

  it.each<string>(['default', 'sm'])('renders SelectTrigger with size %s', (size) => {
    const { container } = render(
      <Select>
        <SelectTrigger size={size as 'default' | 'sm'}>
          <SelectValue placeholder="Select..." />
        </SelectTrigger>
      </Select>
    );
    const trigger = container.querySelector('[data-slot="select-trigger"]');
    expect(trigger).toBeTruthy();
  });

  it('renders SelectTrigger with custom className', () => {
    const { container } = render(
      <Select>
        <SelectTrigger className="custom-trigger">
          <SelectValue placeholder="Select..." />
        </SelectTrigger>
      </Select>
    );
    const trigger = container.querySelector('[data-slot="select-trigger"]');
    expect(trigger?.className).toContain('custom-trigger');
  });

  it('renders SelectLabel inside SelectGroup context', () => {
    const { container } = render(
      <Select>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Category</SelectLabel>
          </SelectGroup>
        </SelectContent>
      </Select>
    );
    const label = container.querySelector('[data-slot="select-label"]');
    expect(label).toBeTruthy();
    expect(label?.textContent).toBe('Category');
  });

  it('renders SelectLabel with custom className', () => {
    const { container } = render(
      <Select>
        <SelectContent>
          <SelectGroup>
            <SelectLabel className="custom-label">Category</SelectLabel>
          </SelectGroup>
        </SelectContent>
      </Select>
    );
    const label = container.querySelector('[data-slot="select-label"]');
    expect(label?.className).toContain('custom-label');
  });

  it('renders SelectGroup component', () => {
    const { container } = render(
      <Select>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Fruits</SelectLabel>
          </SelectGroup>
        </SelectContent>
      </Select>
    );
    const group = container.querySelector('[data-slot="select-group"]');
    expect(group).toBeTruthy();
  });

  it('renders SelectSeparator component', () => {
    const { container } = render(
      <Select>
        <SelectContent>
          <SelectSeparator />
        </SelectContent>
      </Select>
    );
    const separator = container.querySelector('[data-slot="select-separator"]');
    expect(separator).toBeTruthy();
    expect(separator?.className).toContain('h-px');
  });

  it.each<[string, string]>([
    ['opt1', 'Option 1'],
    ['opt2', 'Option 2'],
    ['opt3', 'Option 3'],
  ])('renders SelectItem with value %s', (value, label) => {
    const { container } = render(
      <Select>
        <SelectContent>
          <SelectItem value={value}>{label}</SelectItem>
        </SelectContent>
      </Select>
    );
    expect(container.textContent).toContain(label);
    expect(container.querySelector('[data-slot="select-item"]')).toBeTruthy();
  });

  it('renders SelectItem with disabled state', () => {
    const { container } = render(
      <Select>
        <SelectContent>
          <SelectItem value="disabled" disabled>
            Disabled Option
          </SelectItem>
        </SelectContent>
      </Select>
    );
    const item = container.querySelector('[data-slot="select-item"]');
    expect(item?.className).toContain('opacity-50');
  });

  it('SelectContent renders with custom className', () => {
    const { container } = render(
      <Select>
        <SelectContent className="custom-content">
          <SelectItem value="test">Test</SelectItem>
        </SelectContent>
      </Select>
    );
    const content = container.querySelector('[data-slot="select-content"]');
    expect(content?.className).toContain('custom-content');
  });

  it('Select components compose together', () => {
    const { container } = render(
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Select..." />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Group 1</SelectLabel>
            <SelectItem value="1">Item 1</SelectItem>
            <SelectItem value="2">Item 2</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    );
    expect(container.querySelector('[data-slot="select-trigger"]')).toBeTruthy();
  });
});
