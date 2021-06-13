import { useHistory } from 'react-router-dom'

import { Container } from '../../components/container'
import { Header } from '../../components/header'
import { Button } from '../../components/button'

import { StockList } from './styles'
import { StockItem } from './components/stock-item'

export const Home = () => {
  /**
   * Hooks
   */
  const { push } = useHistory()

  /**
   * Handles
   */
  const handleAddStockClick = () => {
    push('/add-stock')
  }

  /**
   * Returns
   */
  return (
    <Container>
      <Header>
        <Button onClick={handleAddStockClick}>Incluir ação</Button>
      </Header>

      <StockList>
        <StockItem />
        <StockItem />
        <StockItem />
        <StockItem />
        <StockItem />
        <StockItem />
        <StockItem />
        <StockItem />
        <StockItem />
        <StockItem />
        <StockItem />
        <StockItem />
        <StockItem />
        <StockItem />
      </StockList>
    </Container>
  )
}
