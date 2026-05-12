import { createContext, useContext, useState, ReactNode } from 'react'

interface CartContextType {
  count: number
  addItem: () => void
}

const CartContext = createContext<CartContextType>({ count: 0, addItem: () => {} })

export function CartProvider({ children }: { children: ReactNode }) {
  const [count, setCount] = useState(0)
  const addItem = () => setCount(c => c + 1)
  return (
    <CartContext.Provider value={{ count, addItem }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
