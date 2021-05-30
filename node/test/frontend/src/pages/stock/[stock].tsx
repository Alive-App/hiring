import { FormEvent, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { FiFilter } from 'react-icons/fi'
import { isValid, format, parseISO } from 'date-fns'

import { useStocks, IStockList } from 'contexts/stocks'
import * as S from './styles'
import Content from 'components/Content'
import Container from 'components/Container'
import Input from 'components/Input'
import Button from 'components/Button'
import api from 'services/api'

interface IHistory {
  opening: number
  low: number
  high: number
  closing: number
  pricedAt: string
  closed?: boolean
}

const Stock = () => {
  const maxDate = format(Date.now(), 'yyyy-MM-dd')

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const [history, setHistory] = useState<IHistory[]>([])
  const [stock, setStock] = useState<IStockList>({} as IStockList)

  const [to, setTo] = useState('')
  const [from, setFrom] = useState('')

  const { findStock } = useStocks()
  const { query, push } = useRouter()

  useEffect(() => {
    const getStock = findStock(query.stock as string)

    if (getStock === undefined) {
      return push('/')
    }

    setStock(getStock as IStockList)
    setLoading(false)
  }, [findStock, push, query.stock])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)

    if (!to || !from || !isValid(parseISO(to)) || !isValid(parseISO(from))) {
      setLoading(false)
      return
    }

    try {
      const response = await api.get(
        `/stocks/${stock.name}/history?from=${from}&to=${to}`
      )

      const data = response.data.prices.map((day: IHistory) => ({
        ...day,
        pricedAt: format(parseISO(day.pricedAt), 'dd/MM/yyyy')
      }))

      setHistory(data)
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message)
      }
    }

    setLoading(false)
  }

  return (
    <Content>
      <Container>
        {loading && !stock ? (
          <div className="header">
            <h1>Carregando...</h1>
          </div>
        ) : (
          <>
            <div className="header">
              <div className="header-title">
                <h1>{stock.name}</h1>
                <p>Veja o histórico do ativo abaixo</p>
              </div>
              <div className="header-info">
                <strong>${stock.lastPrice}</strong>
                <time>{stock.pricedAt}</time>
              </div>
            </div>

            <S.Form onSubmit={handleSubmit}>
              <p>Filtre por data</p>

              <div className="form-body">
                <Input
                  name="from"
                  type="date"
                  label="Data de início"
                  max={maxDate}
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                  required
                />
                <Input
                  name="to"
                  type="date"
                  label="Data fim"
                  max={maxDate}
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                  required
                />
                <Button type="submit" loading={String(loading)}>
                  <FiFilter />
                  Filtrar
                </Button>
              </div>

              {error && <div className="form-error">{error}</div>}
            </S.Form>

            {history.length > 0 && (
              <S.TableContainer>
                <table>
                  <thead>
                    <tr>
                      <th>Data</th>
                      <th>Abertura</th>
                      <th>Mínima</th>
                      <th>Máxima</th>
                      <th>Fechamento</th>
                    </tr>
                  </thead>
                  <tbody>
                    {history.map((day) =>
                      day.closed ? (
                        <tr key={day.pricedAt}>
                          <td>{day.pricedAt}</td>
                          <td colSpan={4}>Dia fechado</td>
                        </tr>
                      ) : (
                        <tr key={day.pricedAt}>
                          <td>{day.pricedAt}</td>
                          <td>${day.opening}</td>
                          <td>${day.low}</td>
                          <td>${day.high}</td>
                          <td>${day.closing}</td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </S.TableContainer>
            )}
          </>
        )}
      </Container>
    </Content>
  )
}

export default Stock
