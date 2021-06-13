import { ReactNode, MouseEventHandler } from 'react'
import { Button as MuiButton } from '@material-ui/core'

export interface ButtonProps {
  children: ReactNode;
  variant?: 'contained' | 'outlined';
  type?: 'button' | 'submit' | 'reset';
  marginRight?: number;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export const Button = ({
  children,
  onClick,
  marginRight = 0,
  type = 'button',
  variant = 'contained'
}: ButtonProps) => (
  <MuiButton
    style={{ marginRight }}
    type={type}
    variant={variant}
    color="primary"
    onClick={onClick}
  >
    {children}
  </MuiButton>
)
