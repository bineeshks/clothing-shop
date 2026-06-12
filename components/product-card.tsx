'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Star, Heart, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { cn } from '@/lib/utils'

interface ProductCardProps {
  id: string
  name: string
  price: number
  discount?: number
  image: string
  rating: number
  reviews: number
  category: string
  badge?: 'New' | 'Sale' | 'Trending' | null
  status?: 'available' | 'out_of_stock'
  isFeatured?: boolean
  index?: number
  whatsappNumber?: string
}

export function ProductCard({
  id,
  name,
  price,
  discount = 0,
  image,
  rating,
  reviews,
  category,
  badge,
  status = 'available',
  index = 0,
  whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+919000000000',
}: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false)

  const discountedPrice = discount > 0 ? price * (1 - discount / 100) : price
  const isOutOfStock = status === 'out_of_stock'

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsWishlisted(prev => !prev)
    try {
      const key = 'vellora-wishlist'
      const saved = JSON.parse(localStorage.getItem(key) || '[]') as string[]
      const updated = saved.includes(id)
        ? saved.filter(wid => wid !== id)
        : [...saved, id]
      localStorage.setItem(key, JSON.stringify(updated))
    } catch {}
  }

  const handleQuickWhatsApp = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    const msg = encodeURIComponent(
      `Hello, I'm interested in:\nProduct Name: ${name}\nPrice: Rs. ${discountedPrice.toFixed(2)}\n\nPlease provide more details.`
    )
    const cleaned = whatsappNumber.replace(/\D/g, '')
    window.open(`https://wa.me/${cleaned}?text=${msg}`, '_blank')
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true, margin: '-50px' }}
      className="group relative flex flex-col h-full bg-background rounded-2xl transition-all duration-500 hover:premium-shadow border border-transparent hover:border-border/50"
    >
      <Link href={`/product/${id}`} className="flex flex-col h-full cursor-pointer">
        {/* Image Container */}
        <div className="relative overflow-hidden rounded-t-2xl aspect-[4/5] bg-muted/30">
          <Image
            src={image || '/placeholder-dress-green.jpg'}
            alt={name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className={cn(
              'object-cover transition-transform duration-700 ease-out group-hover:scale-105',
              isOutOfStock && 'opacity-60 grayscale-[30%]'
            )}
          />

          {/* Hover overlay with glassmorphism */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />

          {/* Badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
            {badge && (
              <span
                className={cn(
                  'px-3 py-1 text-[10px] uppercase tracking-wider font-semibold rounded-full backdrop-blur-md border border-white/20',
                  badge === 'New' && 'bg-white/90 text-black',
                  badge === 'Sale' && 'bg-red-500/90 text-white border-red-500/20',
                  badge === 'Trending' && 'bg-black/80 text-white'
                )}
              >
                {badge}
              </span>
            )}
            {discount > 0 && !badge && (
              <span className="px-3 py-1 text-[10px] uppercase tracking-wider font-semibold rounded-full bg-red-500/90 text-white backdrop-blur-md border border-red-500/20">
                -{discount}%
              </span>
            )}
            {isOutOfStock && (
              <span className="px-3 py-1 text-[10px] uppercase tracking-wider font-semibold rounded-full bg-black/60 text-white backdrop-blur-md border border-white/20">
                Sold Out
              </span>
            )}
          </div>

          {/* Wishlist button */}
          <button
            onClick={handleWishlist}
            className="absolute top-4 right-4 p-2.5 rounded-full bg-white/40 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:scale-110 z-10 shadow-sm border border-white/40"
          >
            <Heart
              className={cn(
                'w-4 h-4 transition-colors duration-300',
                isWishlisted
                  ? 'fill-red-500 text-red-500'
                  : 'text-foreground'
              )}
            />
          </button>

          {/* Quick Action overlay */}
          {!isOutOfStock && (
            <div className="absolute bottom-2 sm:bottom-4 left-0 right-0 px-2 sm:px-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 z-10 flex justify-center">
              <button
                onClick={handleQuickWhatsApp}
                className="w-full glassmorphism flex items-center justify-center gap-1.5 sm:gap-2 px-2 sm:px-4 py-2 sm:py-3 rounded-full text-foreground hover:bg-white/90 text-[9px] sm:text-xs uppercase tracking-wider sm:tracking-widest font-semibold transition-all hover:scale-[1.02]"
              >
                <MessageCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">Quick Enquire</span>
                <span className="sm:hidden">Enquire</span>
              </button>
            </div>
          )}
        </div>

        {/* Info Container */}
        <div className="flex flex-col flex-1 p-3 sm:p-5">
          <p className="text-[9px] sm:text-[10px] text-muted-foreground uppercase tracking-widest mb-1 sm:mb-1.5 font-medium">
            {category}
          </p>
          <h3 className="font-serif text-sm sm:text-lg text-foreground font-medium line-clamp-2 mb-2 sm:mb-3 group-hover:text-primary transition-colors duration-300 leading-snug">
            {name}
          </h3>

          <div className="mt-auto flex items-end justify-between">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-1.5 sm:gap-2">
                {discount > 0 ? (
                  <>
                    <span className="text-xs sm:text-sm text-muted-foreground line-through decoration-1">
                      Rs. {price.toFixed(2)}
                    </span>
                    <span className="text-sm sm:text-base font-semibold text-red-600">
                      Rs. {discountedPrice.toFixed(2)}
                    </span>
                  </>
                ) : (
                  <span className="text-sm sm:text-base font-semibold text-foreground">
                    Rs. {price.toFixed(2)}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
