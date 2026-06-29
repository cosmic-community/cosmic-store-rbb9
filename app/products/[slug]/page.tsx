// app/products/[slug]/page.tsx
import { getProductBySlug, getMetafieldValue, formatPrice } from '@/lib/cosmic'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import ProductGallery from '@/components/ProductGallery'
import AddToCartButton from '@/components/AddToCartButton'

export const revalidate = 60

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const product = await getProductBySlug(slug)

  if (!product) {
    notFound()
  }

  const name = getMetafieldValue(product.metadata?.name) || product.title
  const description = getMetafieldValue(product.metadata?.description)
  const price = product.metadata?.price
  const sizes = product.metadata?.available_sizes ?? []
  const collection = product.metadata?.collection

  const featuredImage = product.metadata?.featured_image

  const images = [
    product.metadata?.featured_image,
    ...(product.metadata?.gallery ?? []),
  ].filter((img): img is { url: string; imgix_url: string } => !!img)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <nav className="text-sm text-gray-500 mb-8">
        <Link href="/products" className="hover:text-accent">
          Products
        </Link>
        <span className="mx-2">/</span>
        <span className="text-ink">{name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <ProductGallery images={images} alt={name} />

        <div>
          {collection && (
            <Link
              href={`/collections/${collection.slug}`}
              className="text-sm text-accent font-medium uppercase tracking-wide"
            >
              {getMetafieldValue(collection.metadata?.name) || collection.title}
            </Link>
          )}
          <h1 className="text-3xl md:text-4xl font-bold text-ink mt-2">{name}</h1>

          {price !== undefined && (
            <p className="text-2xl text-ink mt-4 font-semibold">
              {formatPrice(price)}
            </p>
          )}

          {description && (
            <p className="text-gray-600 mt-6 leading-relaxed whitespace-pre-line">
              {description}
            </p>
          )}

          <AddToCartButton
            productId={product.id}
            title={name}
            price={price}
            image={featuredImage?.imgix_url}
            sizes={sizes}
          />
        </div>
      </div>
    </div>
  )
}
