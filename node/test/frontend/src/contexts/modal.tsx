import { createContext, useContext, useState } from 'react'

interface ModalContextData {
  active: boolean
  setActive(status: boolean): void
}

const ModalContext = createContext<ModalContextData>({} as ModalContextData)

interface ModalProviderProps {
  visible?: boolean
}

export const ModalProvider: React.FC<ModalProviderProps> = ({
  children,
  visible
}) => {
  const [active, setActive] = useState(visible || false)

  return (
    <ModalContext.Provider value={{ active, setActive }}>
      {children}
    </ModalContext.Provider>
  )
}

export const useModal = () => useContext(ModalContext)
