import { createContext, ReactNode, useState, useEffect } from 'react'

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
   * Consts
   */
  const STOCKS_KEY = '@stocks'

  /**
   * States
   */
  const [stocks, setStocks] = useState<string[]>([])

  /**
   * Functions
   */
  const addStock = (newStock: string) => {
    const exists = stocks.find((item) => item === newStock)

    if (exists) {
      return
    }

    setStocks((prev) => [newStock, ...prev])
  }

  const removeStock = (stock: string) => {
    setStocks((prev) => prev.filter((item) => item !== stock))
  }

  /**
   * Effects
   */
  useEffect(() => {
    const persistStocks = localStorage.getItem(STOCKS_KEY)

    if (!persistStocks) {
      return
    }

    setStocks(JSON.parse(persistStocks))
  }, [])

  useEffect(() => {
    localStorage.setItem(STOCKS_KEY, JSON.stringify(stocks))
  }, [stocks])

  /**
   * Returns
   */
  return (
    <StockContext.Provider value={{ addStock, removeStock, stocks }}>
      {children}
    </StockContext.Provider>
  )
}
