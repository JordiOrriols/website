import React from 'react'
import { render } from '@testing-library/react'
import AppLogo from './logo'

test('AppLogo renders an svg', () => {
  const { container } = render(<AppLogo />)
  expect(container.querySelector('svg')).toBeTruthy()
})
