import { ModalProvider } from './modal'
import { StocksProvider } from './stocks'

const AppProvider: React.FC = ({ children }) => (
  <StocksProvider>
    <ModalProvider>{children}</ModalProvider>
  </StocksProvider>
)

export default AppProvider
