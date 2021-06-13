import { ReactNode, MouseEventHandler } from 'react'
import { Button as MuiButton } from '@material-ui/core'

export interface ButtonProps {
  children: ReactNode;
  variant?: 'contained' | 'outlined';
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export const Button = ({
  children,
  onClick,
  variant = 'contained'
}: ButtonProps) => (
  <MuiButton variant={variant} color="primary" onClick={onClick}>
    {children}
  </MuiButton>
)
