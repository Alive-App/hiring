import { ReactNode } from 'react'

import { TableCell } from '../table-cell'

export interface TableHeadCellProps {
  children: ReactNode;
}

export const TableHeadCell = ({ children }: TableHeadCellProps) => (
  <TableCell>
    <strong>{children}</strong>
  </TableCell>
)
