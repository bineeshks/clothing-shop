import { ProductCard } from './product-card'

export interface GridProduct {
  id: string
  _id?: string
  name: string
  price: number
  discount?: number
  image: string
  images?: string[]
  rating: number
  reviews: number
  category: string
  badge?: 'New' | 'Sale' | 'Trending' | null
  status?: 'available' | 'out_of_stock'
  isFeatured?: boolean
  inStock?: boolean
}

interface ProductGridProps {
  products: GridProduct[]
  title?: string
  columns?: 2 | 3 | 4
}

export function ProductGrid({
  products,
  title,
  columns = 4,
}: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No products found.</p>
      </div>
    )
  }

  const colClass = {
    2: 'sm:grid-cols-2',
    3: 'md:grid-cols-3',
    4: 'md:grid-cols-3 lg:grid-cols-4',
  }[columns]

  return (
    <div>
      {title && (
        <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-8">
          {title}
        </h2>
      )}
      <div className={`grid grid-cols-2 ${colClass} gap-3 sm:gap-6`}>
        {products.map((product, index) => (
          <ProductCard
            key={product._id || product.id}
            id={product._id?.toString() || product.id}
            name={product.name}
            price={product.price}
            discount={product.discount}
            image={product.image}
            rating={product.rating}
            reviews={product.reviews}
            category={product.category}
            badge={product.badge}
            status={product.status || (product.inStock === false ? 'out_of_stock' : 'available')}
            isFeatured={product.isFeatured}
            index={index}
          />
        ))}
      </div>
    </div>
  )
}
