import * as S from './styles'

const Content: React.FC<S.IContent> = ({ children, ...props }) => {
  return (
    <S.Container data-testid="content" {...props}>
      {children}
    </S.Container>
  )
}

export default Content
