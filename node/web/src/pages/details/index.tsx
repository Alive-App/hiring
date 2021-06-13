import { useHistory } from 'react-router-dom'
import { subMonths } from 'date-fns'

import { Container } from '../../components/container'
import { Header } from '../../components/header'
import { Button } from '../../components/button'
import { DateField } from '../../components/date-field'

import { FilterContainer } from './styles'
import { useState } from 'react'

export const Details = () => {
  /**
   * Hooks
   */
  const { goBack } = useHistory()

  /**
   * States
   */
  const [from, setFrom] = useState(subMonths(new Date(), 1))
  const [to, setTo] = useState(new Date())

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

      <FilterContainer>
        <DateField
          label="Data inicial"
          marginRight={10}
          value={from}
          onDateChange={setFrom}
        />
        <DateField
          label="Data final"
          marginRight={10}
          value={to}
          onDateChange={setTo}
        />
        <Button type="submit">Pesquisar</Button>
      </FilterContainer>
    </Container>
  )
}
