import { FormEvent, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'

import { Container } from '../../components/container'
import { Header } from '../../components/header'
import { Button } from '../../components/button'
import { DateField } from '../../components/date-field'
import { TextField } from '../../components/text-field'

import { FilterContainer, Title, DataContainer } from './styles'
import { api } from '../../services/api'
import { formatDate, formatPrice } from '../../helpers/format'

export interface PurchasedDataApi {
  name: string;
  purchasedAmount: number;
  purchasedAt: string;
  priceAtDate: number;
  lastPrice: number;
  capitalGains: number;
}

export const Gains = () => {
  /**
   * Hooks
   */
  const { goBack } = useHistory()
  const { stockName } = useParams<{ stockName: string }>()

  /**
   * States
   */
  const [purchasedData, setPurchasedData] = useState({} as PurchasedDataApi)
  const [purchasedAt, setPurchasedAt] = useState(new Date())
  const [purchasedAmount, setPurchasedAmount] = useState<number>(0)

  /**
   * Handles
   */
  const handleBackClick = () => {
    goBack()
  }

  const handlePurchasedAmountChange = (value: string) => {
    setPurchasedAmount(Number(value))
  }

  const handleSearchSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const { data } = await api.get(`/stocks/${stockName}/gains`, {
      params: { purchasedAmount, purchasedAt }
    })
    setPurchasedData(data)
  }

  /**
   * Returns
   */
  return (
    <Container>
      <Header>
        <Button onClick={handleBackClick}>Voltar</Button>
        <Title>{stockName}</Title>
      </Header>

      <FilterContainer onSubmit={handleSearchSubmit}>
        <DateField
          marginRight={10}
          label="Data de compra"
          value={purchasedAt}
          onDateChange={setPurchasedAt}
        />
        <TextField
          marginRight={10}
          label="Quantidade de compra"
          value={purchasedAmount}
          onTextChange={handlePurchasedAmountChange}
        />
        <Button type="submit">Pesquisar</Button>
      </FilterContainer>

      <DataContainer>
        <p>Quantidade de compra: {purchasedData.purchasedAmount}</p>
        <p>Data da compra: {formatDate(purchasedData.purchasedAt)}</p>
        <p>Preço na compra: {formatPrice(purchasedData.priceAtDate)}</p>
        <p>Preço atual: {formatPrice(purchasedData.lastPrice)}</p>
        <p>Ganhos: {formatPrice(purchasedData.capitalGains)}</p>
      </DataContainer>
    </Container>
  )
}
