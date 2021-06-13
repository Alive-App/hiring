import { useState, FormEvent } from 'react'
import { useHistory } from 'react-router-dom'

import { Container } from '../../components/container'
import { Header } from '../../components/header'
import { Button } from '../../components/button'
import { TextField } from '../../components/text-field'
import { Loading } from '../../components/loading'
import { api } from '../../services/api'

import { SearchBar, SearchResultsContainer } from './styles'
import { SearchResultItem } from './components/search-result-item'

export const AddStock = () => {
  /**
   * Hooks
   */
  const { goBack } = useHistory()

  /**
   * States
   */
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState('')
  const [stockNames, setStockNames] = useState<string[]>([])

  /**
   * Handles
   */
  const handleBackClick = () => {
    goBack()
  }

  const handleSearchSubmit = async (e: FormEvent<HTMLFormElement>) => {
    try {
      setLoading(true)

      e.preventDefault()

      const { data } = await api.get('/available-stock-names', {
        params: { search }
      })

      setStockNames(data)
    } catch (err) {
      alert(err)
    } finally {
      setLoading(false)
    }
  }

  /**
   * Returns
   */
  if (loading) {
    return <Loading />
  }

  return (
    <Container>
      <Header>
        <Button onClick={handleBackClick}>Voltar</Button>
      </Header>

      <SearchBar onSubmit={handleSearchSubmit}>
        <TextField
          fullWidth
          marginTop={10}
          marginRight={10}
          placeholder="digite para pesquisar (ex: VALE)"
          value={search}
          onTextChange={setSearch}
        />
        <Button type="submit">Pesquisar</Button>
      </SearchBar>

      <SearchResultsContainer>
        {stockNames.map((stockName) => (
          <SearchResultItem key={stockName} stockName={stockName} />
        ))}
      </SearchResultsContainer>
    </Container>
  )
}
