'use client'

import { useState } from 'react'
import { useCart } from '@/lib/cart-context'
import type { ProductSize } from '@/types'

interface Props {
  productId: string
  title: string
  price?: number
  image?: string
  sizes?: ProductSize[]
}

export default function AddToCartButton({
  productId,
  title,
  price,
  image,
  sizes = [],
}: Props) {
  const { addItem } = useCart()
  const [selectedSize, setSelectedSize] = useState<ProductSize | undefined>(
    undefined
  )
  const [error, setError] = useState<string | null>(null)

  const needsSize = sizes.length > 0

  function handleAdd() {
    if (needsSize && !selectedSize) {
      setError('Please select a size')
      return
    }
    setError(null)
    addItem(
      {
        productId,
        title,
        price: price ?? 0,
        image,
        size: selectedSize,
      },
      1
    )
  }

  return (
    <div className="mt-8">
      {needsSize && (
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-ink uppercase tracking-wide mb-3">
            Available Sizes
          </h3>
          <div className="flex flex-wrap gap-3">
            {sizes.map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => {
                  setSelectedSize(size)
                  setError(null)
                }}
                className={`min-w-[3rem] text-center border px-4 py-2 text-sm font-medium rounded transition-colors ${
                  selectedSize === size
                    ? 'border-ink bg-ink text-white'
                    : 'border-gray-300 text-ink hover:border-ink'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={handleAdd}
        className="w-full bg-ink text-white py-4 font-medium hover:bg-carbon transition-colors rounded"
      >
        Add to Cart
      </button>

      {error && <p className="text-red-600 text-sm mt-3">{error}</p>}
    </div>
  )
}
