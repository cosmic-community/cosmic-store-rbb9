import { createBucketClient } from '@cosmicjs/sdk'
import type { Product, Collection } from '@/types'

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
})

// Simple error helper for Cosmic SDK
export function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error
}

// Safely render metadata values that may be objects in JSX
export function getMetafieldValue(field: unknown): string {
  if (field === null || field === undefined) return ''
  if (typeof field === 'string') return field
  if (typeof field === 'number' || typeof field === 'boolean') return String(field)
  if (typeof field === 'object' && field !== null && 'value' in field) {
    return String((field as { value: unknown }).value)
  }
  if (typeof field === 'object' && field !== null && 'key' in field) {
    return String((field as { key: unknown }).key)
  }
  return ''
}

export function formatPrice(price: number | undefined): string {
  if (price === undefined || price === null) return ''
  return `$${price.toFixed(2)}`
}

export async function getProducts(): Promise<Product[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'products' })
      .props(['id', 'slug', 'title', 'metadata', 'type'])
      .depth(1)
    return response.objects as Product[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return []
    throw new Error('Failed to fetch products')
  }
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const products = await getProducts()
  return products.filter((p) => p.metadata?.featured === true)
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'products', slug })
      .depth(1)
    return response.object as Product
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return null
    throw new Error('Failed to fetch product')
  }
}

export async function getCollections(): Promise<Collection[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'collections' })
      .props(['id', 'slug', 'title', 'metadata', 'type'])
      .depth(1)
    return response.objects as Collection[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return []
    throw new Error('Failed to fetch collections')
  }
}

export async function getCollectionBySlug(slug: string): Promise<Collection | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'collections', slug })
      .depth(1)
    return response.object as Collection
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return null
    throw new Error('Failed to fetch collection')
  }
}

export async function getProductsByCollection(collectionId: string): Promise<Product[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'products', 'metadata.collection': collectionId })
      .props(['id', 'slug', 'title', 'metadata', 'type'])
      .depth(1)
    return response.objects as Product[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return []
    throw new Error('Failed to fetch products by collection')
  }
}