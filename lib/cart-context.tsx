'use client'

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  ReactNode,
} from 'react'

export interface CartItem {
  id: string
  productId: string
  title: string
  price: number
  image?: string
  size?: string
  quantity: number
}

interface CartContextValue {
  items: CartItem[]
  isOpen: boolean
  itemCount: number
  subtotal: number
  addItem: (item: Omit<CartItem, 'id' | 'quantity'>, quantity?: number) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  openCart: () => void
  closeCart: () => void
}

const CartContext = createContext<CartContextValue | undefined>(undefined)

const STORAGE_KEY = 'cosmic-store-cart'

function lineId(productId: string, size?: string) {
  return size ? `${productId}::${size}` : productId
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) setItems(JSON.parse(raw))
    } catch (e) {
      console.error('Failed to load cart', e)
    }
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (!hydrated) return
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch (e) {
      console.error('Failed to save cart', e)
    }
  }, [items, hydrated])

  const addItem = useCallback(
    (item: Omit<CartItem, 'id' | 'quantity'>, quantity = 1) => {
      setItems((prev) => {
        const id = lineId(item.productId, item.size)
        const existing = prev.find((i) => i.id === id)
        if (existing) {
          return prev.map((i) =>
            i.id === id ? { ...i, quantity: i.quantity + quantity } : i
          )
        }
        return [...prev, { ...item, id, quantity }]
      })
      setIsOpen(true)
    },
    []
  )

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id))
  }, [])

  const updateQuantity = useCallback((id: string, quantity: number) => {
    setItems((prev) =>
      quantity <= 0
        ? prev.filter((i) => i.id !== id)
        : prev.map((i) => (i.id === id ? { ...i, quantity } : i))
    )
  }, [])

  const clearCart = useCallback(() => setItems([]), [])
  const openCart = useCallback(() => setIsOpen(true), [])
  const closeCart = useCallback(() => setIsOpen(false), [])

  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0)
  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        itemCount,
        subtotal,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        openCart,
        closeCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within a CartProvider')
  return ctx
}
