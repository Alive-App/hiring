import { render, screen } from '@testing-library/react'

import Container from 'components/Container'

describe('Component: <Container />', () => {
  it('should be able to render correctly', () => {
    render(
      <Container>
        <p>Testando</p>
      </Container>
    )

    expect(screen.getByTestId('container')).toBeInTheDocument()
  })
})
