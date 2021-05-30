import { render, screen } from '@testing-library/react'

import { ModalProvider } from 'contexts/modal'
import Modal from 'components/Modal'

describe('Component: <Modal />', () => {
  it('should be able to render correctly', () => {
    render(
      <ModalProvider visible>
        <Modal />
      </ModalProvider>
    )

    expect(
      screen.getByRole('heading', { name: /Adicionar novo ativo/ })
    ).toBeInTheDocument()
  })
})
