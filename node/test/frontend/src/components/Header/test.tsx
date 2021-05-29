import { render, screen } from '@testing-library/react'

import Header from '.'

describe('<Header />', () => {
  it('should render heading title', () => {
    render(<Header />)

    expect(screen.getByRole('heading')).toBeInTheDocument()
  })
})
