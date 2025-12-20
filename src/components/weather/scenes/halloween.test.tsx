import React from 'react'
import { render, waitFor } from '@testing-library/react'
import HalloweenScene from './halloween'

test('Halloween scene renders ghosts and logo', async () => {
  const { container } = render(<HalloweenScene />)

  await waitFor(() => {
    // Ghosts svg should be present
    const svgs = container.querySelectorAll('svg')
    expect(svgs.length).toBeGreaterThan(0)
  })
})
