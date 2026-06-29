import Link from 'next/link'
import type { Product } from '@/types'
import { getMetafieldValue, formatPrice } from '@/lib/cosmic'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  if (!product) return null

  const name = getMetafieldValue(product.metadata?.name) || product.title
  const image = product.metadata?.featured_image
  const price = product.metadata?.price
  const featured = product.metadata?.featured

  return (
    <Link href={`/products/${product.slug}`} className="group block">
      <div className="relative aspect-square bg-gray-100 overflow-hidden rounded-lg">
        {image ? (
          <img
            src={`${image.imgix_url}?w=800&h=800&fit=crop&auto=format,compress`}
            alt={name}
            width={400}
            height={400}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            No image
          </div>
        )}
        {featured && (
          <span className="absolute top-3 left-3 bg-ink text-white text-xs font-semibold px-2.5 py-1 rounded-full">
            Featured
          </span>
        )}
      </div>
      <div className="mt-4">
        <h3 className="font-medium text-ink group-hover:text-accent transition-colors">
          {name}
        </h3>
        {price !== undefined && (
          <p className="text-gray-600 mt-1 text-sm">Sale price {formatPrice(price)}</p>
        )}
      </div>
    </Link>
  )
}