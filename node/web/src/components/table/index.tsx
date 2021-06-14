import { Table as MuiTable, Paper } from '@material-ui/core'
import { ReactNode } from 'react'

export interface TableProps {
  children: ReactNode;
}

export const Table = ({ children }: TableProps) => (
  <Paper variant="outlined" style={{ padding: 10 }}>
    <MuiTable>{children}</MuiTable>
  </Paper>
)
