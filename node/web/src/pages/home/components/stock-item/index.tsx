import { useCallback, useEffect, useState } from 'react'
import { Paper, Typography } from '@material-ui/core'
import { useHistory } from 'react-router-dom'

import { useStock } from '../../../../hooks/use-stock'
import { Button } from '../../../../components/button'

import { ActionsContainer } from './styles'
import { api } from '../../../../services/api'
import { formatDateTime, formatPrice } from '../../../../helpers/format'

export interface StockItemProps {
  stockName: string;
}

export interface StockApi {
  lastPrice: number;
  name: string;
  pricedAt: string;
}

export const StockItem = ({ stockName }: StockItemProps) => {
  /**
   * Hooks
   */
  const { removeStock } = useStock()
  const { push } = useHistory()

  /**
   * States
   */
  const [stock, setStock] = useState({} as StockApi)

  /**
   * Functions
   */
  const loadStockOnApi = useCallback(async () => {
    const { data } = await api.get<StockApi>(`/stocks/${stockName}/quote`)
    setStock(data)
  }, [stockName])

  /**
   * Handles
   */
  const handleRemoveClick = () => {
    removeStock(stockName)
  }

  const handleNavigateToDetails = () => {
    push(`/${stockName}/details`)
  }

  /**
   * Effects
   */
  useEffect(() => {
    loadStockOnApi()
  }, [loadStockOnApi])

  /**
   * Returns
   */
  return (
    <Paper
      variant="outlined"
      style={{ padding: 10, margin: 10, minWidth: 300 }}
    >
      <Typography variant="h6">{stockName}</Typography>
      <Typography variant="body1">
        Preço atual: {stock.lastPrice ? formatPrice(stock.lastPrice) : 'Carregando...'}
      </Typography>
      <Typography variant="body1">
        Atualizado em: {formatDateTime(stock.pricedAt) || 'Carregando...'}
      </Typography>

      <ActionsContainer>
        <Button onClick={handleNavigateToDetails}>Ver detalhes</Button>
        <Button variant="outlined" onClick={handleRemoveClick}>
          Excluir
        </Button>
      </ActionsContainer>
    </Paper>
  )
}
