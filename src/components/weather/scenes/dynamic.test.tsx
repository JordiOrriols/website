import React from 'react'
import { render, waitFor } from '@testing-library/react'
import DynamicScene, { configClear } from './dynamic'
import { describe, it, expect } from 'vitest'

describe('DynamicScene', () => {
  it('renders logo and clouds for day/clear', async () => {
    const { container } = render(
      <DynamicScene weather={"clear" as any} timeOfDay={"day" as any} />
    )

    // Logo should always be present
    await waitFor(() => {
      expect(container.querySelector('svg')).toBeTruthy()
    })

    // Clouds should render some cloud nodes
    await waitFor(() => {
      const clouds = container.querySelectorAll('.absolute.animate-float')
      expect(clouds.length).toBeGreaterThan(0)
    })
  })

  it('renders sun for day/afternoon with clear weather', async () => {
    const { container } = render(
      <DynamicScene weather={"clear" as any} timeOfDay={"afternoon" as any} />
    )

    await waitFor(() => {
      const sun = container.querySelector('.w-28.h-28')
      expect(sun).toBeTruthy()
    })
  })

  it('renders moon for night/clear weather', async () => {
    const { container } = render(
      <DynamicScene weather={"clear" as any} timeOfDay={"night" as any} />
    )

    await waitFor(() => {
      const moon = container.querySelector('.bg-transparent')
      expect(moon).toBeTruthy()
    })
  })

  it('renders rain elements when weather is rain', async () => {
    const { container } = render(
      <DynamicScene weather={"rain" as any} timeOfDay={"day" as any} />
    )

    await waitFor(() => {
      const raindrops = container.querySelectorAll('.animate-rain')
      expect(raindrops.length).toBeGreaterThan(0)
    })
  })

  it('renders snow when weather is snow', async () => {
    const { container } = render(
      <DynamicScene weather={"snow" as any} timeOfDay={"day" as any} />
    )

    await waitFor(() => {
      const snowflakes = container.querySelectorAll('.animate-snow')
      expect(snowflakes.length).toBeGreaterThan(0)
    })
  })

  it('renders stars at night', async () => {
    const { container } = render(
      <DynamicScene weather={"clear" as any} timeOfDay={"night" as any} />
    )

    await waitFor(() => {
      const stars = container.querySelectorAll('.animate-pulse')
      expect(stars.length).toBeGreaterThan(0)
    })
  })

  it('does not render sun at night', async () => {
    const { container } = render(
      <DynamicScene weather={"clear" as any} timeOfDay={"night" as any} />
    )

    // Sun has class w-28 h-28, should not be present at night
    await waitFor(() => {
      const sun = container.querySelector('.w-28.h-28')
      expect(sun).toBeFalsy()
    })
  })
})
