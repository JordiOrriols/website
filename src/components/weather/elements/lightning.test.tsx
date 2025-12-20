import React from 'react'
import { render } from '@testing-library/react'
import Lightning from './lightning'
import { vi } from 'vitest'

test('Lightning triggers playThunder via interval', () => {
  vi.useFakeTimers()
  const play = vi.fn()

  const randomSpy = vi.spyOn(Math, 'random').mockReturnValue(0.9)

  render(<Lightning playThunder={play} />)

  vi.advanceTimersByTime(1000 * 2)

  expect(play).toHaveBeenCalled()

  randomSpy.mockRestore()
  vi.useRealTimers()
})
