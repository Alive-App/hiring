import Link from 'next/link'
import { FiPlus } from 'react-icons/fi'

import * as S from './styles'
import { useModal } from 'contexts/modal'
import Content from 'components/Content'
import Button from 'components/Button'

const Header = () => {
  const { setActive } = useModal()

  return (
    <S.Container>
      <Content justify="space-between">
        <h1>
          <Link href="/">
            <a title="StockPortfolio">
              Stock<strong>Portfolio</strong>
            </a>
          </Link>
        </h1>

        <Button onClick={() => setActive(true)}>
          <FiPlus />
          Adicionar ativo
        </Button>
      </Content>
    </S.Container>
  )
}

export default Header
