import { getProducts } from '@/lib/cosmic'
import ProductGrid from '@/components/ProductGrid'

export const revalidate = 60

export const metadata = {
  title: 'All Products — Cosmic Store',
  description: 'Browse all Cosmic company swag.',
}

export default async function ProductsPage() {
  const products = await getProducts()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-3xl md:text-4xl font-bold text-ink mb-2">All Products</h1>
      <p className="text-gray-500 mb-12">
        {products.length} {products.length === 1 ? 'item' : 'items'}
      </p>
      <ProductGrid products={products} />
    </div>
  )
}