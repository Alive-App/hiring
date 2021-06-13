import { Paper } from '@material-ui/core'

export interface SearchResultItemProps {
  stockName: string;
}

export const SearchResultItem = ({ stockName }:SearchResultItemProps) => (
  <Paper variant="outlined" style={{ padding: 10, margin: 10 }}>
    {stockName}
  </Paper>
)
