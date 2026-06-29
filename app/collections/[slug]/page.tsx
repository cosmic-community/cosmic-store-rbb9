// app/collections/[slug]/page.tsx
import { getCollectionBySlug, getProductsByCollection, getMetafieldValue } from '@/lib/cosmic'
import { notFound } from 'next/navigation'
import ProductGrid from '@/components/ProductGrid'

export const revalidate = 60

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const collection = await getCollectionBySlug(slug)

  if (!collection) {
    notFound()
  }

  const name = getMetafieldValue(collection.metadata?.name) || collection.title
  const description = getMetafieldValue(collection.metadata?.description)
  const banner = collection.metadata?.banner_image
  const products = await getProductsByCollection(collection.id)

  return (
    <div>
      <section className="relative bg-ink text-white">
        {banner && (
          <div className="absolute inset-0">
            <img
              src={`${banner.imgix_url}?w=2400&h=800&fit=crop&auto=format,compress`}
              alt={name}
              width={1200}
              height={400}
              className="w-full h-full object-cover opacity-50"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink to-transparent" />
          </div>
        )}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <h1 className="text-4xl md:text-5xl font-extrabold">[ {name} ]</h1>
          {description && (
            <p className="text-white/70 mt-4 max-w-2xl text-lg">{description}</p>
          )}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <ProductGrid products={products} />
      </section>
    </div>
  )
}