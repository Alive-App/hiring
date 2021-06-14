import { useHistory, useParams } from 'react-router-dom'
import { subMonths } from 'date-fns'
import { FormEvent, useState } from 'react'

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
import { Loading } from '../../components/loading'

import { FilterContainer, Title } from './styles'
import { api } from '../../services/api'
import { formatDate, formatPrice } from '../../helpers/format'

export interface HistoryItemApi {
  opening: number;
  closing: number;
  high: number;
  low: number;
  pricedAt: string;
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
  const { stockName } = useParams<{ stockName: string }>()

  /**
   * States
   */
  const [loading, setLoading] = useState(false)
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

  const handleSearchSubmit = async (e: FormEvent<HTMLFormElement>) => {
    try {
      setLoading(true)

      e.preventDefault()

      const { data } = await api.get<HistoryApi>(
        `/stocks/${stockName}/history`,
        {
          params: { to, from }
        }
      )
      setHistory(data)
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
        <Title>{stockName}</Title>
      </Header>

      <FilterContainer onSubmit={handleSearchSubmit}>
        <DateField
          required
          label="Data inicial"
          marginRight={10}
          value={from}
          onDateChange={setFrom}
        />
        <DateField
          required
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
              <TableCell>{formatDate(price.pricedAt)}</TableCell>
              <TableCell>{formatPrice(price.opening)}</TableCell>
              <TableCell>{formatPrice(price.closing)}</TableCell>
              <TableCell>{formatPrice(price.high)}</TableCell>
              <TableCell>{formatPrice(price.low)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  )
}
