import { Paper, Typography } from '@material-ui/core'

export const StockItem = () => (
  <Paper style={{ padding: 10, margin: 10, minWidth: 250 }}>
    <Typography variant="h6">Nome ação</Typography>
    <Typography variant="body1">Preço ação</Typography>
    <Typography variant="body1">Data atualização</Typography>
  </Paper>
)
