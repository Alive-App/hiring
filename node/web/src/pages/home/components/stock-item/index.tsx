import { Paper, Typography } from '@material-ui/core'

import { Button } from '../../../../components/button'
import { ActionsContainer } from './styles'

export const StockItem = () => (
  <Paper variant="outlined" style={{ padding: 10, margin: 10, minWidth: 300 }}>
    <Typography variant="h6">Nome ação</Typography>
    <Typography variant="body1">Preço ação</Typography>
    <Typography variant="body1">Data atualização</Typography>

    <ActionsContainer>
      <Button>Ver detalhes</Button>
      <Button variant="outlined">Excluir</Button>
    </ActionsContainer>
  </Paper>
)
