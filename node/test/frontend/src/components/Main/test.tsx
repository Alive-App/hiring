import { render, screen } from '@testing-library/react'

import Main from '.'

describe('<Main />', () => {
  it('should render heading title', () => {
    render(<Main />)

    expect(screen.getByRole('heading')).toBeInTheDocument()
  })
})
