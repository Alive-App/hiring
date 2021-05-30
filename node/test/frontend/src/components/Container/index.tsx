import * as S from './styles'

const Container: React.FC = ({ children }) => {
  return <S.Container data-testid="container">{children}</S.Container>
}

export default Container
