import { render, screen } from '@testing-library/react'
import { AddStock } from './index'

test('render add stock', () => {
  render(<AddStock />)
  const element = screen.getByText(/Voltar/i)
  expect(element).toBeInTheDocument()
})
