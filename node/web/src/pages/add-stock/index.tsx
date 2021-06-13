import { useState } from 'react'
import { useHistory } from 'react-router-dom'

import { Container } from '../../components/container'
import { Header } from '../../components/header'
import { Button } from '../../components/button'
import { TextField } from '../../components/text-field'

export const AddStock = () => {
  /**
   * Hooks
   */
  const { goBack } = useHistory()

  /**
   * States
   */
  const [search, setSearch] = useState('')

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

      <TextField
        fullWidth
        marginTop={10}
        label="Pesquisar..."
        value={search}
        onTextChange={setSearch}
      />
    </Container>
  )
}
