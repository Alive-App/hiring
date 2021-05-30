import { render, screen } from '@testing-library/react'

import Header from 'components/Header'

describe('Component: <Header />', () => {
  it('should be able to render correctly', () => {
    render(<Header />)

    expect(
      screen.getByRole('heading', { name: /StockPortfolio/ })
    ).toBeInTheDocument()

    expect(
      screen.getByRole('button', { name: /Adicionar ativo/ })
    ).toBeInTheDocument()
  })
})
