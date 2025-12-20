import React from 'react'
import { render, waitFor } from '@testing-library/react'
import Clouds from './cloud'

test('Clouds renders the requested number of clouds', async () => {
  const { container } = render(<Clouds maxNumber={3} maxSize={1} maxOpacity={0.5} />)

  await waitFor(() => {
    const nodes = container.querySelectorAll('.absolute.animate-float')
    expect(nodes.length).toBe(3)
  })
})
