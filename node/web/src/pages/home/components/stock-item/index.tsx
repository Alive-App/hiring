import { Paper, Typography } from '@material-ui/core'

import { useStock } from '../../../../hooks/use-stock'
import { Button } from '../../../../components/button'

import { ActionsContainer } from './styles'

export interface StockItemProps {
  stockName: string;
}

export const StockItem = ({ stockName }: StockItemProps) => {
  /**
   * Hooks
   */
  const { removeStock } = useStock()

  /**
   * Handles
   */
  const handleRemoveClick = () => {
    removeStock(stockName)
  }

  /**
   * Returns
   */
  return (
    <Paper
      variant="outlined"
      style={{ padding: 10, margin: 10, minWidth: 300 }}
    >
      <Typography variant="h6">{stockName}</Typography>
      <Typography variant="body1">Preço ação</Typography>
      <Typography variant="body1">Data atualização</Typography>

      <ActionsContainer>
        <Button>Ver detalhes</Button>
        <Button variant="outlined" onClick={handleRemoveClick}>Excluir</Button>
      </ActionsContainer>
    </Paper>
  )
}
