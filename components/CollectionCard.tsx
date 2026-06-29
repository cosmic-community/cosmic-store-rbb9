import Link from 'next/link'
import type { Collection } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'

interface CollectionCardProps {
  collection: Collection
}

export default function CollectionCard({ collection }: CollectionCardProps) {
  if (!collection) return null

  const name = getMetafieldValue(collection.metadata?.name) || collection.title
  const banner = collection.metadata?.banner_image

  return (
    <Link
      href={`/collections/${collection.slug}`}
      className="relative group block overflow-hidden bg-ink"
    >
      <div className="aspect-[16/10] relative">
        {banner ? (
          <img
            src={`${banner.imgix_url}?w=1600&h=1000&fit=crop&auto=format,compress`}
            alt={name}
            width={800}
            height={500}
            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-carbon to-smoke" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
      </div>
      <div className="absolute bottom-0 left-0 p-6 md:p-8">
        <h2 className="text-white text-2xl md:text-3xl font-bold mb-4">
          [ {name} ]
        </h2>
        <span className="inline-block border border-white text-white px-6 py-2 text-sm font-medium group-hover:bg-white group-hover:text-ink transition-colors">
          Shop All
        </span>
      </div>
    </Link>
  )
}