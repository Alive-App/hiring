import { AiOutlineBarChart } from 'react-icons/ai'
import { DiGitCompare } from 'react-icons/di'
import Link from 'next/link'

import * as S from './styles'

import { IStockList } from 'contexts/stocks'

interface IStockCardProps {
  stock: IStockList
}

const StockCard: React.FC<IStockCardProps> = ({ stock }) => {
  return (
    <S.Container>
      <Link href={`/stock/${stock.name}`}>
        <a className="history" title={`Ver histórico de ${stock.name}`}>
          <AiOutlineBarChart />
        </a>
      </Link>

      <Link href={`/stock/${stock.name}`}>
        <a
          className="compare"
          title={`Compare ${stock.name} com outros ativos`}
        >
          <DiGitCompare />
        </a>
      </Link>

      <div className="price">
        <span>Último preço</span>
        <strong>${stock.lastPrice}</strong>
      </div>
      <div className="name">
        <span>Nome</span>
        <h2>{stock.name}</h2>
      </div>
      <div>
        <span>Última atualização</span>
        <time>{stock.pricedAt}</time>
      </div>
    </S.Container>
  )
}

export default StockCard
