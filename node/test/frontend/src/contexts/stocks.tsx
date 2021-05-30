import {
  createContext,
  useContext,
  useCallback,
  useState,
  useEffect
} from 'react'

export interface IStockList {
  lastPrice: number
  name: string
  pricedAt: string
}

interface StocksContextData {
  stocks: IStockList[]
  getStocks(): void
  addStock(stock: IStockList): void
  findStock(stock_name: string): IStockList | undefined
}

const StocksContext = createContext<StocksContextData>({} as StocksContextData)

export const StocksProvider: React.FC = ({ children }) => {
  const [stocks, setStocks] = useState<IStockList[]>([])

  const findStock = (stock_name: string) => {
    return stocks.find((s) => s.name === stock_name)
  }

  const getStocks = useCallback(() => {
    const localStocks = localStorage.getItem('stocks')

    if (localStocks) {
      setStocks(JSON.parse(localStocks))
    }
  }, [])

  const addStock = useCallback(
    (stock) => {
      const indexExists = stocks.findIndex((s) => s.name === stock.name)

      if (indexExists >= 0) {
        stocks[indexExists] = stock

        localStorage.setItem('stocks', JSON.stringify(stocks))
        setStocks(stocks)
      } else {
        localStorage.setItem('stocks', JSON.stringify([...stocks, stock]))
        setStocks([...stocks, stock])
      }
    },
    [stocks]
  )

  useEffect(() => {
    getStocks()
  }, [])

  return (
    <StocksContext.Provider value={{ stocks, addStock, getStocks, findStock }}>
      {children}
    </StocksContext.Provider>
  )
}

export const useStocks = () => useContext(StocksContext)
