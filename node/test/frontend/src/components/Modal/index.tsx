import { useState } from 'react'
import { FiXCircle } from 'react-icons/fi'

import * as S from './styles'
import { useModal } from 'contexts/modal'

import Input from 'components/Input'
import Button from 'components/Button'

const Modal = () => {
  const [loading, setLoading] = useState(false)
  const { active, setActive } = useModal()

  return (
    <S.Container active={active}>
      <S.Backdrop onClick={() => setActive(!active)} />

      <S.Content>
        <div className="header">
          <h2>Adicionar novo ativo</h2>
          <button className="close" onClick={() => setActive(!active)}>
            <FiXCircle />
          </button>
        </div>

        <div className="body">
          <Input
            name="stock_name"
            placeholder="Nome do ativo, ex: PETR4.SA"
            label="Ativo"
            fieldName="stock_name"
          />

          <Button
            loading={loading}
            width="100px"
            height="40px"
            onClick={() => setLoading(!loading)}
          >
            Adicionar
          </Button>
        </div>
      </S.Content>
    </S.Container>
  )
}

export default Modal
