import type { Product } from '@/types'
import ProductCard from '@/components/ProductCard'

interface ProductGridProps {
  products: Product[]
}

export default function ProductGrid({ products }: ProductGridProps) {
  if (!products || products.length === 0) {
    return (
      <div className="text-center py-16 text-gray-500">
        No products available right now.
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
      {products.map((product) => {
        if (!product || !product.id) return null
        return <ProductCard key={product.id} product={product} />
      })}
    </div>
  )
}