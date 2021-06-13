import { Paper, Typography } from '@material-ui/core'

import { useStock } from '../../../../hooks/use-stock'
import { Button } from '../../../../components/button'

import { ActionsContainer } from './styles'
import { useCallback, useEffect, useState } from 'react'
import { api } from '../../../../services/api'

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
      <Typography variant="body1">Preço atual: {stock.lastPrice}</Typography>
      <Typography variant="body1">Atualizado em: {stock.pricedAt}</Typography>

      <ActionsContainer>
        <Button>Ver detalhes</Button>
        <Button variant="outlined" onClick={handleRemoveClick}>
          Excluir
        </Button>
      </ActionsContainer>
    </Paper>
  )
}
