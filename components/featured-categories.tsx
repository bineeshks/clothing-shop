import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

const categories = [
  {
    name: 'Dresses',
    image: '/placeholder-dress-category.jpg',
    description: 'Elegant dresses for every occasion',
  },
  {
    name: 'Accessories',
    image: '/placeholder-accessories-category.jpg',
    description: 'Statement pieces to elevate your look',
  },
  {
    name: 'Outerwear',
    image: '/placeholder-outerwear-category.jpg',
    description: 'Premium layers for timeless style',
  },
]

export function FeaturedCategories() {
  return (
    <section className="py-16 sm:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-serif text-4xl sm:text-5xl font-bold mb-4">
            Shop by Category
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Explore our curated collections designed for the modern ethical consumer.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map(category => (
            <Link key={category.name} href={`/shop?category=${category.name}`}>
              <div className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-lg h-64 mb-4">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />
                </div>
                <h3 className="font-serif text-2xl font-semibold mb-2 group-hover:text-primary transition-colors">
                  {category.name}
                </h3>
                <p className="text-muted-foreground mb-4">{category.description}</p>
                <Button variant="outline" className="border-primary text-primary hover:bg-primary/10">
                  Explore {category.name}
                </Button>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
