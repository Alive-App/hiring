import { render, screen } from '@testing-library/react'
import { Home } from './index'
import {} from '../../hooks/use-stock'

jest.mock('../../hooks/use-stock', () => ({
  ...jest.requireActual('../../hooks/use-stock'),
  useStock: () => ({
    stocks: []
  })
}))

test('render home page', () => {
  render(<Home />)
  const element = screen.getByText(/Incluir ativo/i)
  expect(element).toBeInTheDocument()
})
