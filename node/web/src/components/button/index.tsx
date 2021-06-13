import { ReactNode } from 'react'
import { Button as MuiButton } from '@material-ui/core'

export interface ButtonProps {
  children: ReactNode;
  variant?: 'contained' | 'outlined'
}

export const Button = ({ children, variant = 'contained' }: ButtonProps) => (
  <MuiButton variant={variant} color='primary'>{children}</MuiButton>
)
