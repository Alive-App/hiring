import * as S from './styles'

const Content: React.FC<S.IContent> = ({ children, ...props }) => {
  return <S.Container {...props}>{children}</S.Container>
}

export default Content
