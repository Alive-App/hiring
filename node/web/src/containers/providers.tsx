import { ReactNode } from 'react'
import { StockContextProvider } from '../contexts/stock-context'

export interface ProvidersProps {
  children: ReactNode;
}

export const Providers = ({ children }: ProvidersProps) => (
  <StockContextProvider>{children}</StockContextProvider>
)
