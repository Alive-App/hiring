import { ModalProvider } from './modal'

const AppProvider: React.FC = ({ children }) => (
  <ModalProvider>{children}</ModalProvider>
)

export default AppProvider
