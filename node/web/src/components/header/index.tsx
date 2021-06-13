import { ReactNode } from 'react'
import { Paper } from '@material-ui/core'

export interface HeaderProps {
  children: ReactNode;
}

export const Header = ({ children }: HeaderProps) => (
  <Paper variant="outlined" style={{ padding: '10px' }}>
    {children}
  </Paper>
)
