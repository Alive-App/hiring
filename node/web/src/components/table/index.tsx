import { Table as MuiTable } from '@material-ui/core'
import { ReactNode } from 'react'

export interface TableProps {
  children: ReactNode;
}

export const Table = ({ children }: TableProps) => (
  <MuiTable>{children}</MuiTable>
)
