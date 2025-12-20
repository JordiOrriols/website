import React from 'react'
import { render, waitFor } from '@testing-library/react'
import DynamicScene, { configClear } from './dynamic'

test('DynamicScene renders logo and sun for day/clear', async () => {
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
