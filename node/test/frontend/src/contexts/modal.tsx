import { createContext, useContext, useState } from 'react'

interface ModalContextData {
  active: boolean
  setActive(status: boolean): void
}

const ModalContext = createContext<ModalContextData>({} as ModalContextData)

export const ModalProvider: React.FC = ({ children }) => {
  const [active, setActive] = useState(false)

  return (
    <ModalContext.Provider value={{ active, setActive }}>
      {children}
    </ModalContext.Provider>
  )
}

export const useModal = () => useContext(ModalContext)
