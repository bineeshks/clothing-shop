import { Star } from 'lucide-react'
import { Card } from '@/components/ui/card'

const testimonials = [
  {
    name: 'Amara K.',
    location: 'Addis Ababa',
    text: 'I\'ve never felt better about my fashion choices. The quality is exceptional and knowing the pieces are ethically made makes me love them even more.',
    rating: 5,
  },
  {
    name: 'Zainab M.',
    location: 'Dire Dawa',
    text: 'Vellora pieces have become my everyday staples. The designs are timeless and the attention to detail is unmatched. Highly recommend!',
    rating: 5,
  },
  {
    name: 'Hiwot T.',
    location: 'Adama',
    text: 'Finally found a brand that aligns with my values. The craftsmanship and sustainability practices are truly commendable. Worth every birr!',
    rating: 5,
  },
]

export function Testimonials() {
  return (
    <section className="py-16 sm:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-serif text-4xl sm:text-5xl font-bold mb-4">
            Loved by Our Customers
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            See what our community says about Vellora and their experience with us.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="p-6">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-secondary text-secondary"
                  />
                ))}
              </div>
              <p className="text-foreground mb-4 leading-relaxed">
                "{testimonial.text}"
              </p>
              <div>
                <p className="font-semibold text-foreground">{testimonial.name}</p>
                <p className="text-sm text-muted-foreground">{testimonial.location}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
