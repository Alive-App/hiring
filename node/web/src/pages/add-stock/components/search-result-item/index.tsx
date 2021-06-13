import { Paper } from '@material-ui/core'
import { useHistory } from 'react-router-dom'

import { useStock } from '../../../../hooks/use-stock'
import { Button } from '../../../../components/button'

export interface SearchResultItemProps {
  stockName: string;
}

export const SearchResultItem = ({ stockName }: SearchResultItemProps) => {
  /**
   * Hooks
   */
  const { addStock } = useStock()
  const { goBack } = useHistory()

  /**
   * Handles
   */
  const handleAddStockClick = () => {
    addStock(stockName)
    goBack()
  }

  /**
   * Returns
   */
  return (
    <Paper
      variant="outlined"
      style={{
        padding: 10,
        margin: 10,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}
    >
      {stockName}
      <Button onClick={handleAddStockClick}>Adicionar</Button>
    </Paper>
  )
}
