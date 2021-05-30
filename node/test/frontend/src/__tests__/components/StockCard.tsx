import { render, screen } from '@testing-library/react'

import StockCard from 'components/StockCard'

describe('Component: <StockCard />', () => {
  it('should be able to render correctly', () => {
    render(
      <StockCard
        stock={{
          lastPrice: 39.4,
          name: 'IBM',
          pricedAt: '30/05/2021'
        }}
      />
    )

    expect(screen.getByTitle(/Ver histórico de IBM/)).toHaveAttribute(
      'href',
      '/stock/IBM'
    )

    expect(
      screen.getByTitle(/Faça projeções de ganhos com a IBM/)
    ).toHaveAttribute('href', '/stock/IBM/gains')

    expect(screen.getByRole('heading', { name: 'IBM' })).toBeInTheDocument()
  })
})
