import React from 'react'
import { render, waitFor } from '@testing-library/react'
import Ghosts from './ghosts'

test('Ghosts renders requested number of ghost nodes', async () => {
  const { container } = render(<Ghosts max={4} />)

  await waitFor(() => {
    const nodes = container.querySelectorAll('.absolute.opacity-70')
    expect(nodes.length).toBe(4)
  })
})
