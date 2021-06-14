import { TableBody as MuiTableBody } from '@material-ui/core'
import { ReactNode } from 'react'

export interface TableBodyProps {
  children: ReactNode;
}

export const TableBody = ({ children }: TableBodyProps) => (
  <MuiTableBody>{children}</MuiTableBody>
)
