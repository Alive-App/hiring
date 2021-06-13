import { ReactNode } from 'react'
import { Button as MuiButton } from '@material-ui/core'

export interface ButtonProps {
  children: ReactNode;
}

export const Button = ({ children }: ButtonProps) => (
  <MuiButton variant='contained' color='primary'>{children}</MuiButton>
)
