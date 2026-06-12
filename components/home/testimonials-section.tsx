'use client'

import { Star, CheckCircle2 } from 'lucide-react'
import { Card } from '@/components/ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { motion } from 'framer-motion'

export function TestimonialsSection({ dbTestimonials }: { dbTestimonials: any[] }) {
  const staticTestimonials = [
    {
      name: 'Amara K.',
      location: 'Addis Ababa',
      text: "I've never felt better about my fashion choices. The quality is exceptional and knowing the pieces are ethically made makes me love them even more.",
      rating: 5,
      date: '2 weeks ago',
    },
    {
      name: 'Zainab M.',
      location: 'Dire Dawa',
      text: 'Vellora pieces have become my everyday staples. The designs are timeless and the attention to detail is unmatched. Highly recommend!',
      rating: 5,
      date: '1 month ago',
    },
    {
      name: 'Hiwot T.',
      location: 'Adama',
      text: 'Finally found a brand that aligns with my values. The craftsmanship and sustainability practices are truly commendable. Worth every birr!',
      rating: 5,
      date: '3 months ago',
    },
    {
      name: 'Sarah L.',
      location: 'Nairobi',
      text: 'The silk collections are out of this world. Premium feel, excellent customer service, and fast shipping.',
      rating: 5,
      date: '4 months ago',
    },
  ]

  const testimonials =
    dbTestimonials && dbTestimonials.length > 0 ? dbTestimonials : staticTestimonials

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-noise opacity-5 pointer-events-none mix-blend-overlay" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 border border-border/50 rounded-full text-xs font-medium tracking-widest uppercase mb-6 text-muted-foreground">
            Trusted Quality
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl font-medium mb-4 tracking-tight">
            Loved by Our Customers
          </h2>
          <div className="flex items-center justify-center gap-2 mt-4 text-sm font-medium">
            <span className="font-bold text-lg mr-1">4.9</span>
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-yellow-500 text-yellow-500" />
              ))}
            </div>
            <span className="text-muted-foreground ml-2">Based on 500+ reviews</span>
          </div>
        </motion.div>

        <Carousel
          opts={{
            align: 'start',
            loop: true,
          }}
          className="w-full max-w-5xl mx-auto"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {testimonials.map((testimonial: any, index: number) => (
              <CarouselItem key={testimonial._id || index} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                <Card className="p-8 h-full bg-card hover:premium-shadow transition-shadow duration-300 border-border/40 rounded-2xl flex flex-col relative group">
                  {/* Google Review Badge Simulation */}
                  <div className="absolute top-6 right-6 opacity-40 group-hover:opacity-100 transition-opacity flex items-center gap-1.5">
                    <svg viewBox="0 0 24 24" className="w-5 h-5" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                  </div>

                  <div className="flex items-center gap-1 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < (testimonial.rating || 5)
                            ? 'fill-yellow-500 text-yellow-500'
                            : 'fill-muted text-muted'
                        }`}
                      />
                    ))}
                  </div>
                  
                  <p className="text-foreground/90 font-serif text-lg leading-relaxed mb-8 flex-1 italic">
                    &ldquo;{testimonial.text}&rdquo;
                  </p>
                  
                  <div className="mt-auto">
                    <p className="font-semibold text-foreground tracking-tight flex items-center gap-1.5">
                      {testimonial.name}
                      <CheckCircle2 className="w-4 h-4 text-blue-500" />
                    </p>
                    <div className="flex items-center justify-between mt-1">
                      <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                        {testimonial.location || 'Verified Buyer'}
                      </p>
                      <p className="text-xs text-muted-foreground/60">
                        {testimonial.date || 'Recently'}
                      </p>
                    </div>
                  </div>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-center gap-4 mt-12">
            <CarouselPrevious className="position-static transform-none" variant="outline" />
            <CarouselNext className="position-static transform-none" variant="outline" />
          </div>
        </Carousel>
      </div>
    </section>
  )
}
