'use client'

import Image from 'next/image'
import { useState } from 'react'

interface ImageGalleryProps {
  images: string[]
  alt: string
}

export function ImageGallery({ images, alt }: ImageGalleryProps) {
  const [mainImage, setMainImage] = useState(images[0])

  return (
    <div className="space-y-4">
      <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-muted">
        <Image
          src={mainImage}
          alt={alt}
          fill
          className="object-cover"
          priority
        />
      </div>
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setMainImage(image)}
              className={`relative aspect-square rounded-md overflow-hidden border-2 transition-colors ${
                mainImage === image
                  ? 'border-primary'
                  : 'border-border hover:border-muted-foreground'
              }`}
            >
              <Image
                src={image}
                alt={`${alt} ${index + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
