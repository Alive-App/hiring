import { render, screen } from '@testing-library/react'

import Content from 'components/Content'

describe('Component: <Content />', () => {
  it('should be able to render correctly', () => {
    render(
      <Content>
        <p>Testando</p>
      </Content>
    )

    expect(screen.getByTestId('content')).toBeInTheDocument()
  })

  it('should be able to recieve flex props', () => {
    render(
      <Content align="center" justify="space-between">
        <p>Testando</p>
      </Content>
    )

    expect(screen.getByTestId('content')).toHaveStyle(
      'justify-content: space-between'
    )
    expect(screen.getByTestId('content')).toHaveStyle('align-items: center;')
  })
})
