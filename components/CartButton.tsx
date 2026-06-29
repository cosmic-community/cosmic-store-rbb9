'use client'

import { useCart } from '@/lib/cart-context'

export default function CartButton() {
  const { itemCount, openCart } = useCart()

  return (
    <button
      type="button"
      onClick={openCart}
      className="relative hover:text-accent transition-colors"
      aria-label="Open cart"
    >
      Cart ({itemCount})
    </button>
  )
}
