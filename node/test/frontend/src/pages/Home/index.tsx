import * as S from './styles'
import { useStocks } from 'contexts/stocks'

import Content from 'components/Content'
import StockCard from 'components/StockCard'

export default function Home() {
  const { stocks } = useStocks()

  return (
    <>
      <Content direction="column" align="flex-start">
        <S.Container>
          <h1>Portfólio</h1>

          <div className="stock-list">
            {stocks.length ? (
              stocks.map((stock) => (
                <StockCard key={stock.name} stock={stock} />
              ))
            ) : (
              <p>Adicione algum ativo ao seu portfolio.</p>
            )}
          </div>
        </S.Container>
      </Content>
    </>
  )
}
