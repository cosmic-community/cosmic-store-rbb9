import { getCollections } from '@/lib/cosmic'
import CollectionCard from '@/components/CollectionCard'

export const revalidate = 60

export const metadata = {
  title: 'Collections — Cosmic Store',
  description: 'Browse Cosmic swag collections.',
}

export default async function CollectionsPage() {
  const collections = await getCollections()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-3xl md:text-4xl font-bold text-ink mb-12">Collections</h1>

      {collections.length === 0 ? (
        <p className="text-gray-500 text-center py-16">No collections available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {collections.map((collection) => (
            <CollectionCard key={collection.id} collection={collection} />
          ))}
        </div>
      )}
    </div>
  )
}