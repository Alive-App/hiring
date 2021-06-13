import { useHistory } from 'react-router-dom'
import { subMonths } from 'date-fns'

import { Container } from '../../components/container'
import { Header } from '../../components/header'
import { Button } from '../../components/button'
import { DateField } from '../../components/date-field'
import { Table } from '../../components/table'
import { TableBody } from '../../components/table-body'
import { TableCell } from '../../components/table-cell'
import { TableHead } from '../../components/table-head'
import { TableHeadCell } from '../../components/table-head-cell'
import { TableRow } from '../../components/table-row'

import { FilterContainer } from './styles'
import { useState } from 'react'

export interface HistoryItemApi {
  opening: number;
  closing: number;
  high: number;
  low: number;
  pricedAt: '2021-06-11T00:00:00.000Z';
}

export interface HistoryApi {
  name: string;
  prices: HistoryItemApi[];
}

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
  const [history, setHistory] = useState({
    prices: [],
    name: ''
  } as HistoryApi)

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

      <Table>
        <TableHead>
          <TableRow>
            <TableHeadCell>Data</TableHeadCell>
            <TableHeadCell>Abertura</TableHeadCell>
            <TableHeadCell>Fechamento</TableHeadCell>
            <TableHeadCell>Máximo</TableHeadCell>
            <TableHeadCell>Mínimo</TableHeadCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {history.prices.map((price) => (
            <TableRow key={JSON.stringify(price)}>
              <TableCell>{price.pricedAt}</TableCell>
              <TableCell>{price.opening}</TableCell>
              <TableCell>{price.closing}</TableCell>
              <TableCell>{price.high}</TableCell>
              <TableCell>{price.low}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  )
}
