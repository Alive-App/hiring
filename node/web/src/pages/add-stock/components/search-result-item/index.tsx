import { Paper } from '@material-ui/core'

import { Button } from '../../../../components/button'

export interface SearchResultItemProps {
  stockName: string;
}

export const SearchResultItem = ({ stockName }: SearchResultItemProps) => {
  /**
   * Handles
   */
  const handleAddStockClick = () => {}

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
