import { render, screen } from '@testing-library/react'
import { SearchResultItem } from './index'

test('render stock item', () => {
  render(<SearchResultItem stockName="IBM" />)
  const element = screen.getByText(/IBM/i)
  expect(element).toBeInTheDocument()
})
