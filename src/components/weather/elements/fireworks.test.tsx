import React from 'react'
import { render } from '@testing-library/react'
import Fireworks from './fireworks'

import { vi } from 'vitest'

test('Fireworks calls playFireworks periodically', () => {
  vi.useFakeTimers()
  const play = vi.fn()

  // Make Math.random predictable so the interval will create fireworks
  const randomSpy = vi.spyOn(Math, 'random').mockReturnValue(0.9)

  render(<Fireworks playFireworks={play} />)

  // advance timers to allow interval to run a few times
  vi.advanceTimersByTime(1000 * 3)

  expect(play).toHaveBeenCalled()

  randomSpy.mockRestore()
  vi.useRealTimers()
})
