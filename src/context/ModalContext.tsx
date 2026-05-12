import { createContext, useContext, useState, ReactNode } from 'react'

interface ModalContextType {
  isOpen: boolean
  amount: number
  openModal: (amount?: number) => void
  closeModal: () => void
}

const ModalContext = createContext<ModalContextType>({
  isOpen: false,
  amount: 50,
  openModal: () => {},
  closeModal: () => {},
})

export function ModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [amount, setAmount] = useState(50)
  const openModal = (amt = 50) => { setAmount(amt); setIsOpen(true) }
  const closeModal = () => setIsOpen(false)
  return (
    <ModalContext.Provider value={{ isOpen, amount, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  )
}

export const useModal = () => useContext(ModalContext)
