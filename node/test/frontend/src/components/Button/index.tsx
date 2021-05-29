import * as S from './styles'
import { ImSpinner2 } from 'react-icons/im'

interface IButtonProps extends S.IButton {
  onClick?(): void
}

const Button: React.FC<IButtonProps> = ({ children, loading, ...props }) => {
  return (
    <S.Button loading={loading} {...props}>
      {loading ? <ImSpinner2 /> : children}
    </S.Button>
  )
}

export default Button
