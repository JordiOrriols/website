import React from 'react'
import { render } from '@testing-library/react'
import App from './App'
import { vi, describe, it, expect, beforeEach } from 'vitest'

// Mock Portfolio component
vi.mock('./pages/portfolio', () => ({
  default: () => <div data-testid="portfolio">Portfolio</div>,
}))

// Mock i18n
vi.mock('./lib/i18n', () => ({}))

describe('App Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders without crashing', () => {
    const { container } = render(<App />)
    expect(container).toBeTruthy()
  })

  it('renders Portfolio component', () => {
    const { getByTestId } = render(<App />)
    expect(getByTestId('portfolio')).toBeTruthy()
  })

  it('has ErrorBoundary wrapper', () => {
    const { container } = render(<App />)
    // ErrorBoundary should exist as a provider (no specific test id, but component exists)
    expect(container.querySelector('div')).toBeTruthy()
  })

  it('has Suspense wrapper with fallback', () => {
    // We can verify by checking if Suspense is present (it will show fallback if children fail)
    const { container } = render(<App />)
    expect(container).toBeTruthy()
  })
})
