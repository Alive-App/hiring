import { useContext } from 'react'

import { StockContext } from '../contexts/stock-context'

export const useStock = () => {
  const context = useContext(StockContext)

  return context
}
