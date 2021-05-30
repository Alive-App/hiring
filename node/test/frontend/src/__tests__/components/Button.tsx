import { render, screen } from '@testing-library/react'

import Button from 'components/Button'

describe('Component: <Button />', () => {
  it('should be able to render correctly', () => {
    render(<Button>Adicionar</Button>)

    expect(
      screen.getByRole('button', { name: /Adicionar/ })
    ).toBeInTheDocument()
  })

  it('should be able to render with a loading', () => {
    const { container } = render(<Button loading="true">Adicionar</Button>)

    expect(container.querySelector('svg')).toBeInTheDocument()
  })

  it('should be able to render with custom bg and color', () => {
    render(
      <Button background="#000" color="#09f">
        Adicionar
      </Button>
    )

    expect(screen.getByRole('button')).toHaveStyle('background: #000')
    expect(screen.getByRole('button')).toHaveStyle('color: #09f')
  })
})
