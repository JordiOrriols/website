import React from 'react'
import { render } from '@testing-library/react'
import Confetti, { generateConfetti } from './confetti'

test('generateConfetti returns requested amount and pieces have expected keys', () => {
  const pieces = generateConfetti(5)
  expect(pieces).toHaveLength(5)
  pieces.forEach((p) => {
    expect(p).toHaveProperty('id')
    expect(p).toHaveProperty('left')
    expect(p).toHaveProperty('delay')
    expect(p).toHaveProperty('duration')
    expect(p).toHaveProperty('rotation')
    expect(p).toHaveProperty('color')
  })
})

test('Confetti renders pieces to the DOM', async () => {
  const { container } = render(<Confetti max={5} timeOfDay={'day' as any} />)
  const nodes = container.querySelectorAll('.absolute.w-2.h-3')
  expect(nodes.length).toBe(5)
})
