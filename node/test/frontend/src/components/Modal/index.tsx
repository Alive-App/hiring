import { FormEvent, useState } from 'react'
import { FiXCircle } from 'react-icons/fi'

import { useModal } from 'contexts/modal'
import { useStocks } from 'contexts/stocks'
import api from 'services/api'

import * as S from './styles'
import Input from 'components/Input'
import Button from 'components/Button'

const Modal = () => {
  const [loading, setLoading] = useState(false)
  const [stockName, setStockName] = useState('')

  const { addStock } = useStocks()
  const { active, setActive } = useModal()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)

    if (!stockName) {
      setLoading(false)
      return
    }

    try {
      const { data } = await api.get(`/stocks/${stockName}/quote`)

      addStock(data)
    } catch (error) {
      console.log(error)
    }

    setActive(false)
    setStockName('')
    setLoading(false)
  }

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
          <form name="newStock" onSubmit={handleSubmit}>
            <Input
              value={stockName}
              onChange={(e) => setStockName(e.target.value)}
              name="stock_name"
              placeholder="Nome do ativo, ex: PETR4.SA"
              label="Ativo"
              autoComplete="off"
            />

            <Button
              loading={String(loading)}
              width="100px"
              height="40px"
              type="submit"
            >
              Adicionar
            </Button>
          </form>
        </div>
      </S.Content>
    </S.Container>
  )
}

export default Modal
