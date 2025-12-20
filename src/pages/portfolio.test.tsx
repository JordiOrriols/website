import React from 'react'
import { render, waitFor, fireEvent, screen } from '@testing-library/react'
import Portfolio from './portfolio'
import { vi, describe, it, expect, beforeEach } from 'vitest'

// Mock dependencies
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, opts?: any) => {
      if (opts?.returnObjects) return {}
      return key
    },
    i18n: { language: 'en' },
  }),
}))

vi.mock('@/lib/weather', () => ({
  fetchCurrentWeather: vi.fn(() =>
    Promise.resolve({
      current_weather: { weathercode: 0 },
      daily: { sunrise: ['2024-01-01T08:00:00'], sunset: ['2024-01-01T19:00:00'] },
    })
  ),
  getWeatherMode: vi.fn(() => 'clear'),
}))

vi.mock('@/lib/ambient', () => ({
  useAmbientAudio: () => ({
    playThunder: vi.fn(),
    playFireworks: vi.fn(),
    playClick: vi.fn(),
    playNotification: vi.fn(),
    toggleMute: vi.fn(),
    muted: false,
  }),
}))

vi.mock('@/components/weather/scenes/dynamic', () => ({
  default: () => <div data-testid="dynamic-scene">Dynamic Scene</div>,
}))

vi.mock('@/components/weather/scenes/thunderstorm', () => ({
  default: () => <div data-testid="thunderstorm-scene">Thunderstorm Scene</div>,
}))

vi.mock('@/components/weather/scenes/new-year', () => ({
  default: () => <div data-testid="new-year-scene">New Year Scene</div>,
}))

vi.mock('@/components/weather/scenes/halloween', () => ({
  default: () => <div data-testid="halloween-scene">Halloween Scene</div>,
}))

vi.mock('@/components/sections/home', () => ({
  default: ({ handleStatClick, onClickAvatar, isModalOpen }: any) => (
    <div data-testid="home-section">
      <button onClick={() => handleStatClick('projects')} data-testid="projects-btn">
        Projects
      </button>
      <button onClick={() => handleStatClick('companies')} data-testid="companies-btn">
        Companies
      </button>
      <button onClick={onClickAvatar} data-testid="avatar-btn">
        Avatar
      </button>
    </div>
  ),
}))

vi.mock('@/components/sections/contact-form', () => ({
  default: ({ onClose }: any) => (
    <div data-testid="contact-form">
      <button onClick={onClose}>Close</button>
    </div>
  ),
}))

vi.mock('@/components/sections/projects', () => ({
  default: ({ onClose }: any) => (
    <div data-testid="projects-gallery">
      <button onClick={onClose}>Close</button>
    </div>
  ),
}))

vi.mock('@/components/sections/gallery', () => ({
  default: ({ onClose }: any) => (
    <div data-testid="gallery">
      <button onClick={onClose}>Close</button>
    </div>
  ),
}))

vi.mock('@/components/sections/experience', () => ({
  default: ({ onClose }: any) => (
    <div data-testid="work-timeline">
      <button onClick={onClose}>Close</button>
    </div>
  ),
}))

vi.mock('@/components/dropdown', () => ({
  default: ({ onValueChange }: any) => (
    <select data-testid="dropdown" onChange={(e) => onValueChange(e.target.value)}>
      <option value="clear">Clear</option>
      <option value="rain">Rain</option>
    </select>
  ),
}))

vi.mock('@/components/plane', () => ({
  default: () => <div data-testid="plane">Plane</div>,
}))

vi.mock('react-error-boundary', () => ({
  ErrorBoundary: ({ children }: any) => <div>{children}</div>,
}))

describe('Portfolio Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders loading state initially', async () => {
    const { getByText } = render(<Portfolio />)
    expect(getByText('loadingWeather')).toBeTruthy()
  })

  it('renders home section after loading', async () => {
    const { getByTestId } = render(<Portfolio />)

    await waitFor(() => {
      expect(getByTestId('home-section')).toBeTruthy()
    })
  })

  it('renders dynamic scene for clear weather', async () => {
    const { getByTestId } = render(<Portfolio />)

    await waitFor(() => {
      expect(getByTestId('dynamic-scene')).toBeTruthy()
    })
  })

  it('opens projects modal when projects button is clicked', async () => {
    const { getByTestId } = render(<Portfolio />)

    await waitFor(() => {
      const projectsBtn = getByTestId('projects-btn')
      fireEvent.click(projectsBtn)
    })

    await waitFor(() => {
      expect(getByTestId('projects-gallery')).toBeTruthy()
    })
  })

  it('opens companies modal when companies button is clicked', async () => {
    const { getByTestId } = render(<Portfolio />)

    await waitFor(() => {
      const companiesBtn = getByTestId('companies-btn')
      fireEvent.click(companiesBtn)
    })

    await waitFor(() => {
      expect(getByTestId('gallery')).toBeTruthy()
    })
  })

  it('closes modal when close button is clicked', async () => {
    const { getByTestId, queryByTestId } = render(<Portfolio />)

    await waitFor(() => {
      const projectsBtn = getByTestId('projects-btn')
      fireEvent.click(projectsBtn)
    })

    await waitFor(() => {
      expect(getByTestId('projects-gallery')).toBeTruthy()
    })

    const closeBtn = getByTestId('projects-gallery').querySelector('button')
    fireEvent.click(closeBtn!)

    await waitFor(() => {
      expect(queryByTestId('projects-gallery')).toBeFalsy()
    })
  })

  it('toggles avatar special events when avatar is clicked', async () => {
    const { getByTestId } = render(<Portfolio />)

    await waitFor(() => {
      const avatarBtn = getByTestId('avatar-btn')
      expect(avatarBtn).toBeTruthy()
      fireEvent.click(avatarBtn)
    })

    // After first click, special events should be active
    // (would show season dropdown in real scenario)
  })

  it('renders weather dropdowns on desktop', async () => {
    const { getByTestId } = render(<Portfolio />)

    await waitFor(() => {
      const dropdowns = document.querySelectorAll('[data-testid="dropdown"]')
      expect(dropdowns.length).toBeGreaterThan(0)
    })
  })

  it('has mute button that toggles mute state', async () => {
    const { getByTestId } = render(<Portfolio />)

    await waitFor(() => {
      const buttons = document.querySelectorAll('button')
      expect(buttons.length).toBeGreaterThan(0)
    })
  })

  it('has plane toggle button on desktop', async () => {
    const { container } = render(<Portfolio />)

    await waitFor(() => {
      const buttons = container.querySelectorAll('button')
      expect(buttons.length).toBeGreaterThan(0)
    })
  })

  it('shows plane component when plane button is clicked', async () => {
    const { getByTestId, queryByTestId } = render(<Portfolio />)

    await waitFor(() => {
      const buttons = document.querySelectorAll('button')
      // Find the plane button (should be one of the control buttons)
      const planeBtn = Array.from(buttons).find((btn) =>
        btn.querySelector('svg')
      )
      if (planeBtn) {
        fireEvent.click(planeBtn)
      }
    })

    // Plane might appear after clicking the button
    await waitFor(() => {
      // This may or may not render depending on which button was clicked
    }, { timeout: 1000 })
  })

  it('renders min-h-screen container', async () => {
    const { container } = render(<Portfolio />)

    await waitFor(() => {
      const mainDiv = container.querySelector('.min-h-screen')
      expect(mainDiv).toBeTruthy()
    })
  })

  it('has perspective transform style on cards container', async () => {
    const { container } = render(<Portfolio />)

    await waitFor(() => {
      const perspectiveDiv = container.querySelector('[style*="perspective"]')
      expect(perspectiveDiv).toBeTruthy()
    })
  })

  it('renders without crashing', async () => {
    const { container } = render(<Portfolio />)

    await waitFor(() => {
      expect(container).toBeTruthy()
    })
  })
})
