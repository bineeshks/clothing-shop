'use client'

import { useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { motion, useScroll, useTransform, Variants } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.1 },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1] as const },
  },
}

export function Hero() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  // Parallax effects
  const yBg = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const opacityText = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const yText = useTransform(scrollYProgress, [0, 1], ['0%', '40%'])

  return (
    <section
      ref={ref}
      className="relative min-h-[100vh] sm:min-h-[90vh] flex items-center justify-center overflow-hidden"
    >
      {/* Background Image with Parallax */}
      <motion.div
        className="absolute inset-0 z-0 will-change-transform"
        style={{ y: yBg }}
      >
        <Image
          src="/premium_hero_bg_1781293320856.png"
          alt="Premium luxury fashion background"
          fill
          priority
          sizes="100vw"
          className="object-cover object-top"
          quality={90}
        />
        {/* Dark overlay for text readability and premium feel */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-black/40 to-black/60" />
        
        {/* Subtle noise texture */}
        <div className="absolute inset-0 bg-noise mix-blend-overlay" />
      </motion.div>

      {/* Main Content */}
      <motion.div
        className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center text-center mt-16 will-change-transform"
        style={{ opacity: opacityText, y: yText }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="mb-6" variants={itemVariants}>
          <span className="inline-block px-5 py-2 glassmorphism rounded-full text-xs sm:text-sm font-medium tracking-widest uppercase text-white/90">
            Premium Collection 2026
          </span>
        </motion.div>

        <motion.h1
          className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-medium mb-6 text-white leading-tight tracking-tight drop-shadow-lg"
          variants={itemVariants}
        >
          Redefining <br className="hidden sm:block" />
          <span className="italic text-white/90">Luxury</span> Fashion
        </motion.h1>

        <motion.p
          className="text-base sm:text-lg md:text-xl text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed font-light drop-shadow"
          variants={itemVariants}
        >
          Discover curated collections blending sustainable materials with impeccable craftsmanship. Designed for the modern aesthete.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full sm:w-auto"
          variants={itemVariants}
        >
          <Link href="/shop" className="w-full sm:w-auto">
            <Button className="w-full sm:w-auto bg-white text-black hover:bg-white/90 px-10 py-7 text-sm sm:text-base tracking-wide uppercase transition-all duration-300 group">
              Shop New Arrivals
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 smooth-transition" />
            </Button>
          </Link>
          <Link href="/about" className="w-full sm:w-auto">
            <Button
              variant="outline"
              className="w-full sm:w-auto glassmorphism text-white border-white/20 hover:bg-white/10 px-10 py-7 text-sm sm:text-base tracking-wide uppercase transition-all duration-300"
            >
              Our Story
            </Button>
          </Link>
        </motion.div>
      </motion.div>
      
      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <span className="text-xs uppercase tracking-widest text-white/60">Scroll</span>
        <div className="w-[1px] h-12 bg-white/20 overflow-hidden relative">
          <motion.div 
            className="w-full h-full bg-white absolute top-0 left-0"
            animate={{ y: ['-100%', '100%'] }}
            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
          />
        </div>
      </motion.div>
    </section>
  )
}
