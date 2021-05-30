import { render, screen } from '@testing-library/react'

import Input from 'components/Input'

describe('Component: <Input />', () => {
  it('should be able to render correctly', () => {
    render(<Input name="address" label="Endereço" />)

    expect(screen.getByRole('textbox')).toBeInTheDocument()

    expect(screen.getByLabelText(/Endereço/)).toBeInTheDocument()
  })
})
