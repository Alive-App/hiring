import { ImSpinner2 } from 'react-icons/im'

import * as S from './styles'

type IButtonProps = {
  children?: any
  onClick?(): void
} & S.IButton &
  React.ButtonHTMLAttributes<HTMLButtonElement>

const Button = ({ children, loading, ...props }: IButtonProps) => {
  return (
    <S.Button loading={loading === 'true' ? 'true' : undefined} {...props}>
      {loading === 'true' ? <ImSpinner2 /> : children}
    </S.Button>
  )
}

export default Button
