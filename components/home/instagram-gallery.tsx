'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Instagram } from 'lucide-react'

const images = [
  '/placeholder-dress-green.jpg',
  '/placeholder-dress-navy.jpg',
  '/placeholder-blazer-beige.jpg',
  '/placeholder-clutch-gold.jpg',
  '/placeholder-pants-beige.jpg',
]

export function InstagramGallery() {
  return (
    <section className="py-24 bg-background overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="flex justify-center mb-4">
            <Instagram className="w-8 h-8 text-foreground/80" />
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-medium mb-4 tracking-tight">
            Shop Our Instagram
          </h2>
          <p className="text-muted-foreground uppercase tracking-widest text-xs font-medium">
            @velloraofficial
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-2 sm:gap-4">
          {images.map((src, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative aspect-square overflow-hidden group cursor-pointer"
            >
              <Image
                src={src}
                alt={`Instagram post ${index + 1}`}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                <Instagram className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-50 group-hover:scale-100" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
