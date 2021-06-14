import { render, screen } from '@testing-library/react'
import { Gains } from './index'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: jest.fn(),
    goBack: jest.fn()
  }),
  useParams: () => ({
    stockName: 'any_stock_name'
  })
}))

test('render gains page', () => {
  render(<Gains />)
  const element = screen.getByText(/Voltar/i)
  expect(element).toBeInTheDocument()
})
