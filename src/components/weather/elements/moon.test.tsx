import React from 'react'
import { render } from '@testing-library/react'
import Moon from './moon'

test('Moon renders a div', () => {
  const { container } = render(<Moon />)
  expect(container.querySelector('div')).toBeTruthy()
})
