import { createContext, ReactNode, useState } from 'react'

export interface StockContextProps {
  stocks: string[];
  addStock: (newStock: string) => void;
  removeStock: (stock: string) => void;
}

export const StockContext = createContext({} as StockContextProps)

export interface StockContextProviderProps {
  children: ReactNode;
}

export const StockContextProvider = ({
  children
}: StockContextProviderProps) => {
  /**
   * States
   */
  const [stocks, setStocks] = useState<string[]>([])

  /**
   * Functions
   */
  const addStock = (newStock: string) => {
    setStocks((prev) => [newStock, ...prev])
  }

  const removeStock = (stock: string) => {
    setStocks((prev) => prev.filter((item) => item !== stock))
  }

  /**
   * Returns
   */
  return (
    <StockContext.Provider value={{ addStock, removeStock, stocks }}>
      {children}
    </StockContext.Provider>
  )
}
