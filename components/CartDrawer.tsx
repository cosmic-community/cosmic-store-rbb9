'use client'

import { useState } from 'react'
import { useCart } from '@/lib/cart-context'

function formatPrice(amount: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount)
}

export default function CartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    removeItem,
    updateQuantity,
    subtotal,
    itemCount,
  } = useCart()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleCheckout() {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map((i) => ({
            title: i.title,
            price: i.price,
            image: i.image,
            size: i.size,
            quantity: i.quantity,
          })),
        }),
      })
      const data = await res.json()
      if (!res.ok || !data.url) {
        throw new Error(data.error || 'Checkout failed')
      }
      window.location.href = data.url
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong')
      setLoading(false)
    }
  }

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/40 z-50 transition-opacity ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeCart}
        aria-hidden="true"
      />

      {/* Drawer */}
      <aside
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 shadow-xl flex flex-col transition-transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-label="Shopping cart"
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200">
          <h2 className="text-lg font-bold text-ink">
            Your Cart ({itemCount})
          </h2>
          <button
            type="button"
            onClick={closeCart}
            className="text-gray-400 hover:text-ink text-2xl leading-none"
            aria-label="Close cart"
          >
            &times;
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <p className="text-gray-500 text-center mt-12">
              Your cart is empty.
            </p>
          ) : (
            <ul className="divide-y divide-gray-100">
              {items.map((item) => (
                <li key={item.id} className="flex gap-4 py-4">
                  {item.image && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={`${item.image}?w=160&h=160&fit=crop&auto=format,compress`}
                      alt={item.title}
                      className="w-20 h-20 object-cover rounded bg-gray-50"
                    />
                  )}
                  <div className="flex-1">
                    <p className="font-medium text-ink text-sm">{item.title}</p>
                    {item.size && (
                      <p className="text-xs text-gray-500 mt-1">
                        Size: {item.size}
                      </p>
                    )}
                    <p className="text-sm text-ink mt-1">
                      {formatPrice(item.price)}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="w-7 h-7 border border-gray-300 rounded text-ink hover:border-ink"
                        aria-label="Decrease quantity"
                      >
                        &minus;
                      </button>
                      <span className="w-8 text-center text-sm">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="w-7 h-7 border border-gray-300 rounded text-ink hover:border-ink"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        className="ml-auto text-xs text-gray-400 hover:text-red-600"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-gray-200 px-6 py-5">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-gray-500">Subtotal</span>
              <span className="text-lg font-bold text-ink">
                {formatPrice(subtotal)}
              </span>
            </div>
            {error && (
              <p className="text-red-600 text-sm mb-3">{error}</p>
            )}
            <button
              type="button"
              onClick={handleCheckout}
              disabled={loading}
              className="w-full bg-ink text-white py-4 font-medium hover:bg-carbon transition-colors rounded disabled:opacity-60"
            >
              {loading ? 'Redirecting…' : 'Checkout'}
            </button>
          </div>
        )}
      </aside>
    </>
  )
}
