import React from 'react'
import { render, waitFor } from '@testing-library/react'
import Stars from './stars'

test('Stars renders the requested number of stars', async () => {
  const { container } = render(<Stars max={7} />)

  await waitFor(() => {
    const nodes = container.querySelectorAll('.animate-pulse')
    expect(nodes.length).toBe(7)
  })
})
