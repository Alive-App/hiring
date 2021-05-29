import * as S from './styles'
import { ImSpinner2 } from 'react-icons/im'

type IButtonProps = {
  children?: HTMLCollection | string
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
