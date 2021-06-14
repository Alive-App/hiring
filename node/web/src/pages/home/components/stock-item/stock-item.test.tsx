import { render, screen } from '@testing-library/react'
import { StockItem } from './index'

test('render stock item', () => {
  render(<StockItem stockName="IBM" />)
  const element = screen.getByText(/IBM/i)
  expect(element).toBeInTheDocument()
})
