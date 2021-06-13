import { useHistory } from 'react-router-dom'

import { Container } from '../../components/container'
import { Header } from '../../components/header'
import { Button } from '../../components/button'

export const AddStock = () => {
  /**
   * Hooks
   */
  const { goBack } = useHistory()

  /**
   * Handles
   */
  const handleBackClick = () => {
    goBack()
  }

  /**
   * Returns
   */
  return (
    <Container>
      <Header>
        <Button onClick={handleBackClick}>Voltar</Button>
      </Header>
    </Container>
  )
}
