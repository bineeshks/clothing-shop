import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { ProductDetail } from '@/components/product-detail'
import { ProductGrid } from '@/components/product-grid'
import {
  getProductById,
  getRelatedProducts,
  products as staticProducts,
} from '@/lib/products'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Script from 'next/script'

// Allow dynamic rendering for MongoDB products
export const dynamic = 'force-dynamic'

// Static params for static products (SSG fallback)
export function generateStaticParams() {
  return staticProducts.map(product => ({
    id: product.id,
  }))
}

// Fetch product data — try MongoDB first, fallback to static
async function getProduct(id: string) {
  try {
    const baseUrl =
      process.env.NEXT_PUBLIC_SITE_URL ||
      (process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : 'http://localhost:3000')

    const res = await fetch(`${baseUrl}/api/products/${id}`, {
      cache: 'no-store',
    })
    if (res.ok) {
      const data = await res.json()
      return data.product
    }
  } catch {}
  // Fallback to static product
  return getProductById(id)
}

// Dynamic metadata
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const product = await getProduct(id)

  if (!product) {
    return {
      title: 'Product Not Found | Vellora',
    }
  }

  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || 'https://vellora.com'
  const productUrl = `${baseUrl}/product/${id}`
  const productImage =
    product.images?.[0] || product.image || `${baseUrl}/og-image.jpg`
  const discountedPrice =
    product.discount > 0
      ? product.price * (1 - product.discount / 100)
      : product.price

  return {
    title: `${product.name} | Vellora`,
    description:
      product.description ||
      `Shop ${product.name} from Vellora — premium ethical fashion.`,
    openGraph: {
      title: `${product.name} | Vellora`,
      description: product.description,
      url: productUrl,
      type: 'website',
      images: [
        {
          url: productImage,
          width: 800,
          height: 800,
          alt: product.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.name} | Vellora`,
      description: product.description,
      images: [productImage],
    },
    alternates: {
      canonical: productUrl,
    },
  }
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const product = await getProduct(id)

  if (!product) {
    notFound()
  }

  // Get related products (static fallback)
  const staticRelated = getRelatedProducts(id, 4)

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://vellora.com'
  const productUrl = `${baseUrl}/product/${id}`
  const productImage =
    product.images?.[0] || product.image || `${baseUrl}/og-image.jpg`
  const discountedPrice =
    (product.discount || 0) > 0
      ? product.price * (1 - product.discount / 100)
      : product.price

  // JSON-LD structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    url: productUrl,
    image: productImage,
    brand: {
      '@type': 'Brand',
      name: 'Vellora',
    },
    offers: {
      '@type': 'Offer',
      url: productUrl,
      priceCurrency: 'USD',
      price: discountedPrice.toFixed(2),
      availability:
        product.status === 'out_of_stock' || product.inStock === false
          ? 'https://schema.org/OutOfStock'
          : 'https://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        name: 'Vellora',
      },
    },
    aggregateRating:
      product.reviews > 0
        ? {
            '@type': 'AggregateRating',
            ratingValue: product.rating,
            reviewCount: product.reviews,
          }
        : undefined,
  }

  // Normalize product for ProductDetail component
  const normalizedProduct = {
    id: product.id || product._id?.toString(),
    _id: product._id,
    name: product.name,
    category: product.category,
    price: product.price,
    discount: product.discount || 0,
    description: product.description,
    details: product.details,
    images:
      product.images?.length > 0
        ? product.images
        : product.image
          ? [product.image]
          : [],
    image: product.image,
    rating: product.rating,
    reviews: product.reviews,
    colors: product.colors,
    sizes: product.sizes,
    inStock: product.inStock,
    status: product.status,
    badge: product.badge,
    isFeatured: product.isFeatured,
  }

  return (
    <>
      {/* JSON-LD */}
      <Script
        id="product-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Navbar />
      <main className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <ProductDetail product={normalizedProduct} />

          {staticRelated.length > 0 && (
            <section className="mt-16 sm:mt-24 pt-16 sm:pt-24 border-t border-border">
              <ProductGrid
                products={staticRelated as any}
                title="Related Products"
              />
            </section>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
