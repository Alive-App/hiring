import { useHistory } from 'react-router-dom'

import { Container } from '../../components/container'
import { Header } from '../../components/header'
import { Button } from '../../components/button'
import { useStock } from '../../hooks/use-stock'

import { StockList } from './styles'
import { StockItem } from './components/stock-item'

export const Home = () => {
  /**
   * Hooks
   */
  const { push } = useHistory()
  const { stocks } = useStock()

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
        <Button marginRight={10} onClick={handleAddStockClick}>Incluir ativo</Button>
      </Header>

      <StockList>
        {stocks.map((stock) => (
          <StockItem stockName={stock} key={stock} />
        ))}
      </StockList>
    </Container>
  )
}
