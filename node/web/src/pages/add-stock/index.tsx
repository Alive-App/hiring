import { useState } from 'react'
import { useHistory } from 'react-router-dom'

import { Container } from '../../components/container'
import { Header } from '../../components/header'
import { Button } from '../../components/button'
import { TextField } from '../../components/text-field'

import { SearchBar } from './styles'

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

  const handleSearchClick = () => {}

  /**
   * Returns
   */
  return (
    <Container>
      <Header>
        <Button onClick={handleBackClick}>Voltar</Button>
      </Header>

      <SearchBar>
        <TextField
          fullWidth
          marginTop={10}
          marginRight={10}
          placeholder="digite para pesquisar (ex: VALE)"
          value={search}
          onTextChange={setSearch}
        />
        <Button onClick={handleSearchClick}>Pesquisar</Button>
      </SearchBar>
    </Container>
  )
}
