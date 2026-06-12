export interface Product {
  id: string
  name: string
  category: string
  price: number
  discount?: number
  image: string
  images: string[]
  description: string
  details: string
  sizes?: string[]
  colors?: string[]
  inStock: boolean
  rating: number
  reviews: number
  status?: 'available' | 'out_of_stock'
  badge?: 'New' | 'Sale' | 'Trending' | null
  isFeatured?: boolean
  isNewArrival?: boolean
  isBestSeller?: boolean
  isTrending?: boolean
}

export const CATEGORIES = ['All', 'Dresses', 'Tops', 'Bottoms', 'Accessories', 'Outerwear']
export const COLORS = ['Black', 'White', 'Forest Green', 'Gold', 'Beige', 'Navy']
export const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL']

export const products: Product[] = [
  {
    id: '1',
    name: 'Forest Green Silk Dress',
    category: 'Dresses',
    price: 22800,
    image: '/placeholder-dress-green.jpg',
    images: ['/placeholder-dress-green.jpg', '/placeholder-dress-green-2.jpg'],
    description: 'Elegant floor-length silk dress in rich forest green. Perfect for evening events.',
    details: 'Made from premium sustainable silk. Features a flattering A-line silhouette with delicate hand-stitching details.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Forest Green', 'Black', 'Ivory'],
    inStock: true,
    rating: 4.8,
    reviews: 124,
  },
  {
    id: '2',
    name: 'Handwoven Gold Clutch',
    category: 'Accessories',
    price: 13200,
    image: '/placeholder-clutch-gold.jpg',
    images: ['/placeholder-clutch-gold.jpg'],
    description: 'Exquisite handwoven clutch with gold accents. A statement piece for any occasion.',
    details: 'Crafted by artisans using traditional weaving techniques. Features genuine leather trim and magnetic closure.',
    inStock: true,
    rating: 4.9,
    reviews: 89,
  },
  {
    id: '3',
    name: 'Organic Linen Blazer',
    category: 'Outerwear',
    price: 19600,
    image: '/placeholder-blazer-beige.jpg',
    images: ['/placeholder-blazer-beige.jpg', '/placeholder-blazer-beige-2.jpg'],
    description: 'Sophisticated organic linen blazer in natural beige. Versatile and eco-friendly.',
    details: 'Made from 100% organic linen. Tailored fit with hand-finished seams and sustainable production methods.',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Beige', 'Ivory', 'Navy'],
    inStock: true,
    rating: 4.7,
    reviews: 156,
  },
  {
    id: '4',
    name: 'Black Asymmetric Top',
    category: 'Tops',
    price: 10800,
    image: '/placeholder-top-black.jpg',
    images: ['/placeholder-top-black.jpg'],
    description: 'Modern asymmetric black top with unique geometric cut. Statement piece for bold styling.',
    details: 'Designed with precision cuts and premium cotton blend fabric. Perfect for layering or wearing standalone.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Black', 'White', 'Forest Green'],
    inStock: true,
    rating: 4.6,
    reviews: 102,
  },
  {
    id: '5',
    name: 'High-Waisted Linen Pants',
    category: 'Bottoms',
    price: 14000,
    image: '/placeholder-pants-beige.jpg',
    images: ['/placeholder-pants-beige.jpg', '/placeholder-pants-beige-2.jpg'],
    description: 'Comfortable high-waisted linen pants in natural beige. Perfect summer staple.',
    details: '100% organic linen with a relaxed fit. Features pleated front and natural texture for an effortless look.',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Beige', 'White', 'Navy'],
    inStock: true,
    rating: 4.7,
    reviews: 198,
  },
  {
    id: '6',
    name: 'Beaded Necklace Statement',
    category: 'Accessories',
    price: 10000,
    image: '/placeholder-necklace-gold.jpg',
    images: ['/placeholder-necklace-gold.jpg'],
    description: 'Handcrafted beaded necklace with 18k gold vermeil details. Unique artisan piece.',
    details: 'Each piece is individually made with reclaimed beads and sustainable materials. Adjustable length.',
    inStock: true,
    rating: 4.9,
    reviews: 74,
  },
  {
    id: '7',
    name: 'Navy Wrap Dress',
    category: 'Dresses',
    price: 17200,
    image: '/placeholder-dress-navy.jpg',
    images: ['/placeholder-dress-navy.jpg', '/placeholder-dress-navy-2.jpg'],
    description: 'Timeless navy wrap dress with versatile styling. Works for office or evening.',
    details: 'Made from sustainable viscose with wrap front and adjustable waist. Classic design never goes out of style.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Navy', 'Black', 'Forest Green'],
    inStock: true,
    rating: 4.8,
    reviews: 267,
  },
  {
    id: '8',
    name: 'Cream Cashmere Cardigan',
    category: 'Outerwear',
    price: 26000,
    image: '/placeholder-cardigan-cream.jpg',
    images: ['/placeholder-cardigan-cream.jpg', '/placeholder-cardigan-cream-2.jpg'],
    description: 'Luxury cream cashmere cardigan. Soft, warm, and eternally elegant.',
    details: 'Premium grade A cashmere from ethical suppliers. Seamless construction with mother-of-pearl buttons.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Cream', 'Black', 'Beige'],
    inStock: true,
    rating: 4.9,
    reviews: 312,
  },
]

export function getProductsByCategory(category: string): Product[] {
  if (category === 'All') return products
  return products.filter(p => p.category === category)
}

export function getProductById(id: string): Product | undefined {
  return products.find(p => p.id === id)
}

export function getRelatedProducts(productId: string, limit: number = 4): Product[] {
  const product = getProductById(productId)
  if (!product) return []
  return products
    .filter(p => p.id !== productId && p.category === product.category)
    .slice(0, limit)
}
