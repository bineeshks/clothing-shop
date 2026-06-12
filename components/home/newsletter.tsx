'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ArrowRight } from 'lucide-react'

export function NewsletterSection() {
  return (
    <section className="py-24 bg-foreground text-background relative overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/premium_newsletter_bg_1781294159058.png')",
        }}
      />
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/70" />
      
      {/* Decorative noise */}
      <div className="absolute inset-0 bg-noise opacity-10 pointer-events-none mix-blend-overlay" />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="inline-block px-4 py-1.5 border border-background/20 rounded-full text-xs font-medium tracking-widest uppercase mb-6">
            Join The Club
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-medium mb-6 tracking-tight">
            Exclusive Offers & <br /> Early Access
          </h2>
          <p className="text-background/70 text-lg max-w-xl mx-auto mb-10 font-light">
            Subscribe to receive updates on new arrivals, special collections, and 10% off your first order.
          </p>

          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
            <Input
              type="email"
              placeholder="Enter your email"
              className="bg-transparent border-background/30 text-background placeholder:text-background/40 px-6 py-6 rounded-full focus-visible:ring-background/50 text-base"
              required
            />
            <Button
              type="submit"
              className="bg-background text-foreground hover:bg-background/90 px-8 py-6 rounded-full text-base font-medium group transition-all"
            >
              Subscribe
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 smooth-transition" />
            </Button>
          </form>
          <p className="text-xs text-background/40 mt-4">
            By subscribing, you agree to our Terms of Service and Privacy Policy.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
