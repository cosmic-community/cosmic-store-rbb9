'use client'

import { useState } from 'react'
import type { CosmicImage } from '@/types'

interface ProductGalleryProps {
  images: CosmicImage[]
  alt: string
}

export default function ProductGallery({ images, alt }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0)

  if (!images || images.length === 0) {
    return (
      <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
        No image available
      </div>
    )
  }

  const active = images[activeIndex] ?? images[0]

  if (!active) {
    return (
      <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
        No image available
      </div>
    )
  }

  return (
    <div>
      <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
        <img
          src={`${active.imgix_url}?w=1200&h=1200&fit=crop&auto=format,compress`}
          alt={alt}
          width={600}
          height={600}
          className="w-full h-full object-cover"
        />
      </div>

      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-3 mt-4">
          {images.map((img, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`aspect-square bg-gray-100 rounded overflow-hidden border-2 transition-colors ${
                index === activeIndex ? 'border-ink' : 'border-transparent'
              }`}
            >
              <img
                src={`${img.imgix_url}?w=300&h=300&fit=crop&auto=format,compress`}
                alt={`${alt} thumbnail ${index + 1}`}
                width={150}
                height={150}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}