import { getCollections, getFeaturedProducts, getProducts } from '@/lib/cosmic'
import CollectionCard from '@/components/CollectionCard'
import ProductGrid from '@/components/ProductGrid'
import Link from 'next/link'

export const revalidate = 60

export default async function HomePage() {
  const [collections, featured, allProducts] = await Promise.all([
    getCollections(),
    getFeaturedProducts(),
    getProducts(),
  ])

  const showcaseProducts = featured.length > 0 ? featured : allProducts

  return (
    <div>
      {/* Hero / Collections grid */}
      <section className="bg-ink">
        {collections.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2">
            {collections.slice(0, 2).map((collection) => (
              <CollectionCard key={collection.id} collection={collection} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 px-4">
            <h1 className="text-white text-4xl md:text-6xl font-extrabold tracking-tight">
              Cosmic Store
            </h1>
            <p className="text-white/60 mt-4 text-lg">Official company swag.</p>
            <Link
              href="/products"
              className="inline-block mt-8 border border-white text-white px-8 py-3 font-medium hover:bg-white hover:text-ink transition-colors"
            >
              Shop All
            </Link>
          </div>
        )}
      </section>

      {/* All Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-ink mb-12">
          {featured.length > 0 ? 'Featured Products' : 'All Products'}
        </h2>
        <ProductGrid products={showcaseProducts} />

        {featured.length > 0 && allProducts.length > featured.length && (
          <div className="text-center mt-12">
            <Link
              href="/products"
              className="inline-block bg-ink text-white px-8 py-3 font-medium hover:bg-carbon transition-colors rounded"
            >
              View All Products
            </Link>
          </div>
        )}
      </section>
    </div>
  )
}