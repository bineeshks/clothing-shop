'use client'

import { useState, useEffect } from 'react'
import { Star, Heart, Share2, Check, Package } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ImageGallery } from './image-gallery'
import { WhatsAppButton } from './whatsapp-button'
import { InquiryForm } from './inquiry-form'
import { cn } from '@/lib/utils'

export interface ProductDetailData {
  id?: string
  _id?: string
  name: string
  category: string
  price: number
  discount?: number
  description: string
  details?: string
  images: string[]
  image?: string
  rating: number
  reviews: number
  colors?: string[]
  sizes?: string[]
  inStock?: boolean
  status?: 'available' | 'out_of_stock'
  badge?: 'New' | 'Sale' | 'Trending' | null
  isFeatured?: boolean
}

interface ProductDetailProps {
  product: ProductDetailData
  whatsappNumber?: string
}

export function ProductDetail({
  product,
  whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+919000000000',
}: ProductDetailProps) {
  const [selectedSize, setSelectedSize] = useState('')
  const [selectedColor, setSelectedColor] = useState('')
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [shareSuccess, setShareSuccess] = useState(false)
  const [showInquiry, setShowInquiry] = useState(false)

  const productId = product._id?.toString() || product.id || ''
  const isOutOfStock =
    product.status === 'out_of_stock' || product.inStock === false

  const discount = product.discount || 0
  const discountedPrice =
    discount > 0 ? product.price * (1 - discount / 100) : product.price

  // Load wishlist state
  useEffect(() => {
    try {
      const saved = JSON.parse(
        localStorage.getItem('vellora-wishlist') || '[]'
      ) as string[]
      setIsWishlisted(saved.includes(productId))
    } catch {}
  }, [productId])

  const handleWishlist = () => {
    try {
      const key = 'vellora-wishlist'
      const saved = JSON.parse(
        localStorage.getItem(key) || '[]'
      ) as string[]
      const updated = saved.includes(productId)
        ? saved.filter(id => id !== productId)
        : [...saved, productId]
      localStorage.setItem(key, JSON.stringify(updated))
      setIsWishlisted(!isWishlisted)
    } catch {}
  }

  const handleShare = async () => {
    const url = window.location.href
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: product.description,
          url,
        })
      } catch {}
    } else {
      await navigator.clipboard.writeText(url)
      setShareSuccess(true)
      setTimeout(() => setShareSuccess(false), 2000)
    }
  }

  const productImages =
    product.images?.length > 0
      ? product.images
      : product.image
        ? [product.image]
        : ['/placeholder-dress-green.jpg']

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {/* Gallery */}
        <div>
          <ImageGallery images={productImages} alt={product.name} />
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <p className="text-sm uppercase tracking-wide text-muted-foreground mb-2">
              {product.category}
            </p>
            <div className="flex items-start justify-between gap-4">
              <h1 className="font-serif text-4xl sm:text-5xl font-bold">
                {product.name}
              </h1>
              <div className="flex gap-2 pt-1 flex-shrink-0">
                <button
                  onClick={handleWishlist}
                  className="p-2 rounded-full border border-border hover:border-primary transition-colors"
                  title="Add to wishlist"
                >
                  <Heart
                    className={cn(
                      'w-5 h-5 transition-colors',
                      isWishlisted
                        ? 'fill-red-500 text-red-500'
                        : 'text-foreground'
                    )}
                  />
                </button>
                <button
                  onClick={handleShare}
                  className="p-2 rounded-full border border-border hover:border-primary transition-colors"
                  title={shareSuccess ? 'Copied!' : 'Share product'}
                >
                  {shareSuccess ? (
                    <Check className="w-5 h-5 text-primary" />
                  ) : (
                    <Share2 className="w-5 h-5 text-foreground" />
                  )}
                </button>
              </div>
            </div>

            {/* Badges */}
            <div className="flex items-center gap-2 mt-3 flex-wrap">
              {product.badge && (
                <span
                  className={cn(
                    'px-2.5 py-1 text-xs font-semibold rounded-full',
                    product.badge === 'New' &&
                      'bg-primary text-primary-foreground',
                    product.badge === 'Sale' &&
                      'bg-secondary text-secondary-foreground',
                    product.badge === 'Trending' &&
                      'bg-foreground text-background'
                  )}
                >
                  {product.badge}
                </span>
              )}
              <span
                className={cn(
                  'flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-full',
                  isOutOfStock
                    ? 'bg-muted text-muted-foreground'
                    : 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                )}
              >
                <Package className="w-3 h-3" />
                {isOutOfStock ? 'Out of Stock' : 'In Stock'}
              </span>
            </div>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    'w-5 h-5',
                    i < Math.floor(product.rating)
                      ? 'fill-secondary text-secondary'
                      : 'text-muted'
                  )}
                />
              ))}
            </div>
            <p className="text-sm text-muted-foreground">
              {product.rating} ({product.reviews} reviews)
            </p>
          </div>

          {/* Price */}
          <div className="flex items-center gap-4">
            <p className="text-4xl font-bold text-primary">
              Rs. {discountedPrice.toFixed(2)}
            </p>
            {discount > 0 && (
              <>
                <p className="text-xl text-muted-foreground line-through">
                  Rs. {product.price}
                </p>
                <span className="px-2 py-1 bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 text-sm font-semibold rounded">
                  {discount}% OFF
                </span>
              </>
            )}
          </div>

          {/* Description */}
          <p className="text-lg text-muted-foreground leading-relaxed">
            {product.description}
          </p>

          {/* Options */}
          <div className="space-y-4 border-t border-b border-border py-6">
            {product.colors && product.colors.length > 0 && (
              <div>
                <label className="block text-sm font-semibold mb-3">
                  Color{selectedColor && `: ${selectedColor}`}
                </label>
                <div className="flex gap-2 flex-wrap">
                  {product.colors.map(color => (
                    <button
                      key={color}
                      onClick={() =>
                        setSelectedColor(
                          selectedColor === color ? '' : color
                        )
                      }
                      className={cn(
                        'px-4 py-2 rounded-md border-2 transition-colors text-sm',
                        selectedColor === color
                          ? 'border-primary bg-primary/10 text-primary'
                          : 'border-border hover:border-primary'
                      )}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {product.sizes && product.sizes.length > 0 && (
              <div>
                <label className="block text-sm font-semibold mb-3">
                  Size{selectedSize && `: ${selectedSize}`}
                </label>
                <div className="flex gap-2 flex-wrap">
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      onClick={() =>
                        setSelectedSize(selectedSize === size ? '' : size)
                      }
                      className={cn(
                        'px-4 py-2 rounded-md border-2 transition-colors text-sm font-medium min-w-[48px]',
                        selectedSize === size
                          ? 'border-primary bg-primary/10 text-primary'
                          : 'border-border hover:border-primary'
                      )}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button
              onClick={() => setShowInquiry(true)}
              className="w-full py-6 text-lg bg-primary hover:bg-primary/90 text-primary-foreground"
              disabled={isOutOfStock}
            >
              {isOutOfStock ? 'Currently Unavailable' : 'Send Inquiry'}
            </Button>

            <WhatsAppButton
              productName={product.name}
              size={selectedSize}
              color={selectedColor}
              price={discountedPrice.toFixed(2)}
              phoneNumber={whatsappNumber}
              mode="both"
            />
          </div>

          {/* Tabs */}
          <Tabs defaultValue="details" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="shipping">Shipping</TabsTrigger>
            </TabsList>
            <TabsContent value="details" className="space-y-4 pt-4">
              <p className="text-muted-foreground leading-relaxed">
                {product.details || product.description}
              </p>
              {product.colors && (
                <div>
                  <h4 className="font-semibold mb-2">Available Colors:</h4>
                  <p className="text-muted-foreground">
                    {product.colors.join(', ')}
                  </p>
                </div>
              )}
              {product.sizes && (
                <div>
                  <h4 className="font-semibold mb-2">Available Sizes:</h4>
                  <p className="text-muted-foreground">
                    {product.sizes.join(', ')}
                  </p>
                </div>
              )}
            </TabsContent>
            <TabsContent value="shipping" className="space-y-4 pt-4">
              <div>
                <h4 className="font-semibold mb-2">Shipping Information</h4>
                <p className="text-muted-foreground mb-4">
                  We ship within 3–5 business days. Contact us on WhatsApp for
                  expedited delivery.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Returns</h4>
                <p className="text-muted-foreground">
                  30-day returns policy on all items in original condition.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Inquiry Modal */}
      <InquiryForm
        open={showInquiry}
        onClose={() => setShowInquiry(false)}
        productId={productId}
        productName={product.name}
        selectedSize={selectedSize}
        selectedColor={selectedColor}
      />
    </>
  )
}
