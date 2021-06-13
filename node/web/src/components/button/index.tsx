import { ReactNode, MouseEventHandler } from 'react'
import { Button as MuiButton } from '@material-ui/core'

export interface ButtonProps {
  children: ReactNode;
  variant?: 'contained' | 'outlined';
  type?: 'button' | 'submit' | 'reset'
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export const Button = ({
  children,
  onClick,
  type = 'button',
  variant = 'contained'
}: ButtonProps) => (
  <MuiButton type={type} variant={variant} color="primary" onClick={onClick}>
    {children}
  </MuiButton>
)
