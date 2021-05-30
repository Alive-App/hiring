import { FormEvent, useState } from 'react'
import { useRouter } from 'next/router'
import { FiXCircle } from 'react-icons/fi'
import { format, parseISO } from 'date-fns'

import { useModal } from 'contexts/modal'
import { useStocks } from 'contexts/stocks'
import api from 'services/api'

import * as S from './styles'
import Input from 'components/Input'
import Button from 'components/Button'

const Modal = () => {
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [stockName, setStockName] = useState('')

  const { addStock } = useStocks()
  const { active, setActive } = useModal()
  const router = useRouter()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    if (!stockName) {
      setLoading(false)
      return
    }

    try {
      const response = await api.get(`/stocks/${stockName}/quote`)
      const data = {
        ...response.data,
        pricedAt: format(parseISO(response.data.pricedAt), 'dd/MM/yyyy')
      }

      addStock(data)
      router.push('/')
      setActive(false)
    } catch (error) {
      console.log(error)

      if (error.response) {
        setError(error.response.data.message)
      }
    }

    setStockName('')
    setLoading(false)
  }

  return (
    <S.Container active={active}>
      <S.Backdrop onClick={() => setActive(!active)} />

      <S.Content>
        <div className="header">
          <h2>Adicionar novo ativo</h2>
          <small>Ao adicionar novamente um ativo, ele será atualizado</small>
          <button className="close" onClick={() => setActive(!active)}>
            <FiXCircle />
          </button>
        </div>

        <div className="body">
          {error && <div className="form-error">{error}</div>}

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
