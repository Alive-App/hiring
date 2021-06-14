import { TableCell as MuiTableCell } from '@material-ui/core'
import { ReactNode } from 'react'

export interface TableCellProps {
  children: ReactNode;
}

export const TableCell = ({ children }: TableCellProps) => (
  <MuiTableCell>{children}</MuiTableCell>
)
