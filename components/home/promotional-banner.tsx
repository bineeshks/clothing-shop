'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface Banner {
  _id: string
  title: string
  subtitle: string
  image: string
  link: string
}

interface PromotionalBannerProps {
  banners?: Banner[]
}

const DEFAULT_BANNERS: Banner[] = [
  {
    _id: '1',
    title: 'Elevate Your Style',
    subtitle: 'Discover our new seasonal collection — ethically made, beautifully crafted.',
    image: '',
    link: '/shop',
  },
  {
    _id: '2',
    title: 'Timeless Elegance',
    subtitle: 'Premium fabrics, artisan craftsmanship, sustainable fashion.',
    image: '',
    link: '/shop?category=Dresses',
  },
]

export function PromotionalBanner({ banners }: PromotionalBannerProps) {
  const items = banners && banners.length > 0 ? banners : DEFAULT_BANNERS
  const [current, setCurrent] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  const next = useCallback(() => {
    setCurrent(prev => (prev + 1) % items.length)
  }, [items.length])

  const prev = () => {
    setCurrent(prev => (prev - 1 + items.length) % items.length)
  }

  useEffect(() => {
    if (!isAutoPlaying) return
    const timer = setInterval(next, 5000)
    return () => clearInterval(timer)
  }, [isAutoPlaying, next])

  const slide = items[current]

  return (
    <section
      className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-secondary/5 border-b border-border"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center text-center max-w-3xl mx-auto"
          >
            <span className="inline-block px-4 py-2 bg-secondary/20 text-secondary rounded-full text-sm font-semibold mb-6">
              New Collection
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-foreground">
              {slide.title}
            </h2>
            <p className="text-muted-foreground text-lg sm:text-xl mb-8 max-w-xl leading-relaxed">
              {slide.subtitle}
            </p>
            <Link href={slide.link}>
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg group">
                Shop Now
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        {items.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background/80 backdrop-blur-sm border border-border hover:border-primary transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={next}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background/80 backdrop-blur-sm border border-border hover:border-primary transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Dots */}
            <div className="flex justify-center gap-2 mt-8">
              {items.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === current
                      ? 'w-6 bg-primary'
                      : 'w-2 bg-border hover:bg-muted-foreground'
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  )
}
