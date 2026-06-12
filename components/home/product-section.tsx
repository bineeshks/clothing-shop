import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ProductGrid, GridProduct } from '@/components/product-grid'

interface ProductSectionProps {
  title: string
  subtitle?: string
  products: GridProduct[]
  viewAllLink?: string
  viewAllLabel?: string
  columns?: 2 | 3 | 4
  background?: 'default' | 'muted'
}

export function ProductSection({
  title,
  subtitle,
  products,
  viewAllLink,
  viewAllLabel = 'View All',
  columns = 4,
  background = 'default',
}: ProductSectionProps) {
  if (products.length === 0) return null

  return (
    <section
      className={`py-16 sm:py-24 ${background === 'muted' ? 'bg-muted/30' : 'bg-background'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-end justify-between mb-10 gap-4">
          <div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
              {title}
            </h2>
            {subtitle && (
              <p className="text-muted-foreground mt-2 text-lg">{subtitle}</p>
            )}
          </div>
          {viewAllLink && (
            <Link href={viewAllLink} className="flex-shrink-0">
              <Button
                variant="outline"
                className="border-primary text-primary hover:bg-primary/10 group"
              >
                {viewAllLabel}
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          )}
        </div>

        <ProductGrid products={products} columns={columns} />
      </div>
    </section>
  )
}
