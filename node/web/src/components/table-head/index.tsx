import { TableHead as MuiTableHead } from '@material-ui/core'
import { ReactNode } from 'react'

export interface TableHeadProps {
  children: ReactNode;
}

export const TableHead = ({ children }: TableHeadProps) => (
  <MuiTableHead>{children}</MuiTableHead>
)
