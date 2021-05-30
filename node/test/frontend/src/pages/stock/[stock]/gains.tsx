import { FormEvent, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { FiDollarSign } from 'react-icons/fi'
import { FaChevronUp, FaChevronDown } from 'react-icons/fa'
import { parseISO, isValid, format } from 'date-fns'

import { useStocks, IStockList } from 'contexts/stocks'

import * as S from './styles'
import Content from 'components/Content'
import Container from 'components/Container'
import Input from 'components/Input'
import Button from 'components/Button'
import api from 'services/api'

interface IGains {
  name: string
  purchasedAmount: number
  purchasedAt: string
  priceAtDate: number
  lastPrice: number
  capitalGains: number
}

const Gains = () => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [gains, setGains] = useState<IGains>({} as IGains)
  const [stock, setStock] = useState<IStockList>({} as IStockList)

  const [purchasedAt, setPurchasedAt] = useState('')
  const [purchasedAmount, setPurchasedAmount] = useState('')

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
    setError('')
    setGains({} as IGains)

    if (!purchasedAt || !purchasedAmount || !isValid(parseISO(purchasedAt))) {
      setLoading(false)
      return
    }

    try {
      const response = await api.get<IGains>(
        `/stocks/${stock.name}/gains?purchasedAmount=${purchasedAmount}&purchasedAt=${purchasedAt}`
      )

      const data = {
        ...response.data,
        purchasedAt: format(parseISO(response.data.purchasedAt), 'dd/MM/yyyy'),
        capitalGains: Number(response.data.capitalGains.toFixed(2))
      }

      setGains(data)
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
                <p>Faça uma simulação de projeções de ganhos</p>
              </div>

              <div className="header-info">
                <strong>${stock.lastPrice}</strong>
                <time>{stock.pricedAt}</time>
              </div>
            </div>

            <S.Form onSubmit={handleSubmit}>
              <p>Fazer simulação</p>

              <div className="form-body">
                <Input
                  name="purchasedAt"
                  type="date"
                  label="Data da compra"
                  max={format(Date.now(), 'yyyy-MM-dd')}
                  value={purchasedAt}
                  onChange={(e) => setPurchasedAt(e.target.value)}
                  required
                />
                <Input
                  name="purchasedAmount"
                  type="number"
                  label="Quantidade de ações"
                  value={purchasedAmount}
                  onChange={(e) => setPurchasedAmount(e.target.value)}
                  required
                />
                <Button type="submit" loading={String(loading)}>
                  <FiDollarSign />
                  Simular
                </Button>
              </div>

              {error && <div className="form-error">{error}</div>}
            </S.Form>

            {gains.name && (
              <S.Gains>
                <div>
                  <span>Nome</span>
                  <p>{gains.name}</p>
                </div>
                <div>
                  <span>Quantidade de ações</span>
                  <p>{gains.purchasedAmount}</p>
                </div>
                <div>
                  <span>Data da compra</span>
                  <p>{gains.purchasedAt}</p>
                </div>
                <div>
                  <span>Preço na compra</span>
                  <p>${gains.priceAtDate}</p>
                </div>
                <div>
                  <span>Preço atual</span>
                  <p>${gains.lastPrice}</p>
                </div>
                <div>
                  <span>Ganhos estimados</span>
                  {gains.capitalGains >= 0 ? (
                    <p className="up">
                      <FaChevronUp />${gains.capitalGains}
                    </p>
                  ) : (
                    <p className="down">
                      <FaChevronDown />${gains.capitalGains}
                    </p>
                  )}
                </div>
              </S.Gains>
            )}
          </>
        )}
      </Container>
    </Content>
  )
}

export default Gains
