import { TableRow as MuiTableRow } from '@material-ui/core'
import { ReactNode } from 'react'

export interface TableRowProps {
  children: ReactNode;
}

export const TableRow = ({ children }: TableRowProps) => (
  <MuiTableRow>{children}</MuiTableRow>
)
