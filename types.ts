// Base Cosmic object interface
export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
}

// Image / file metafield shape
export interface CosmicImage {
  url: string;
  imgix_url: string;
}

// Size literal type matching content model exactly
export type ProductSize = 'S' | 'M' | 'L' | 'XL';

// Collection object
export interface Collection extends CosmicObject {
  type: 'collections';
  metadata: {
    name?: string;
    description?: string;
    banner_image?: CosmicImage;
  };
}

// Product object
export interface Product extends CosmicObject {
  type: 'products';
  metadata: {
    name?: string;
    description?: string;
    price?: number;
    available_sizes?: ProductSize[];
    featured_image?: CosmicImage;
    gallery?: CosmicImage[];
    collection?: Collection;
    featured?: boolean;
  };
}

// Cosmic API response wrapper
export interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit: number;
  skip: number;
}

// Type guards
export function isProduct(obj: CosmicObject): obj is Product {
  return obj.type === 'products';
}

export function isCollection(obj: CosmicObject): obj is Collection {
  return obj.type === 'collections';
}