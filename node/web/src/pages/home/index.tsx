import { Container } from '../../components/container'
import { Header } from '../../components/header'
import { Button } from '../../components/button'

import { StockList } from './styles'
import { StockItem } from './components/stock-item'

export const Home = () => (
  <Container>
    <Header>
      <Button>Incluir ação</Button>
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
