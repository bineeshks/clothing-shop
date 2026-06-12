import dynamic from 'next/dynamic'
import { Navbar } from '@/components/navbar'
import { Hero } from '@/components/hero'
import { ProductSection } from '@/components/home/product-section'

// Lazy loaded below-the-fold components
const Footer = dynamic(() => import('@/components/footer').then(mod => mod.Footer))
const FeaturedCategories = dynamic(() => import('@/components/featured-categories').then(mod => mod.FeaturedCategories))
const BrandStory = dynamic(() => import('@/components/brand-story').then(mod => mod.BrandStory))
const FAQSection = dynamic(() => import('@/components/home/faq-section').then(mod => mod.FAQSection))
const PromotionalBanner = dynamic(() => import('@/components/home/promotional-banner').then(mod => mod.PromotionalBanner))
const InstagramGallery = dynamic(() => import('@/components/home/instagram-gallery').then(mod => mod.InstagramGallery))
const NewsletterSection = dynamic(() => import('@/components/home/newsletter').then(mod => mod.NewsletterSection))
const TestimonialsSection = dynamic(() => import('@/components/home/testimonials-section').then(mod => mod.TestimonialsSection))
import { products as staticProducts } from '@/lib/products'
import { GridProduct } from '@/components/product-grid'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Vellora | Luxury Ethical Fashion',
  description:
    'Discover premium ethical fashion with Vellora. Handcrafted pieces combining tradition, sustainability, and modern elegance.',
  openGraph: {
    title: 'Vellora | Luxury Ethical Fashion',
    description:
      'Premium ethical clothing — handcrafted in Africa, designed for the world.',
    type: 'website',
    url: 'https://vellora.com',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vellora | Luxury Ethical Fashion',
    description: 'Premium ethical clothing handcrafted with love.',
  },
}

// Fetch products from MongoDB with fallback to static data
async function fetchProducts(params?: Record<string, string>): Promise<GridProduct[]> {
  try {
    const baseUrl =
      process.env.NEXT_PUBLIC_SITE_URL ||
      (process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : 'http://localhost:3000')

    const qs = params
      ? '?' + new URLSearchParams(params).toString()
      : ''

    const res = await fetch(`${baseUrl}/api/products${qs}`, {
      next: { revalidate: 60 }, // ISR: revalidate every 60 seconds
    })

    if (!res.ok) throw new Error('API error')
    const data = await res.json()
    return data.products || []
  } catch {
    // Fallback to static data
    return staticProducts.slice(0, 8) as GridProduct[]
  }
}

async function fetchBanners() {
  try {
    const baseUrl =
      process.env.NEXT_PUBLIC_SITE_URL ||
      (process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : 'http://localhost:3000')

    const res = await fetch(`${baseUrl}/api/banners`, {
      next: { revalidate: 300 },
    })
    if (!res.ok) return []
    const data = await res.json()
    return data.banners || []
  } catch {
    return []
  }
}

async function fetchTestimonials() {
  try {
    const baseUrl =
      process.env.NEXT_PUBLIC_SITE_URL ||
      (process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : 'http://localhost:3000')

    const res = await fetch(`${baseUrl}/api/testimonials`, {
      next: { revalidate: 300 },
    })
    if (!res.ok) return []
    const data = await res.json()
    return data.testimonials || []
  } catch {
    return []
  }
}

export default async function HomePage() {
  // Fetch all data in parallel
  const [
    banners,
    featuredProducts,
    newArrivals,
    bestSellers,
    trendingProducts,
    testimonials,
  ] = await Promise.all([
    fetchBanners(),
    fetchProducts({ featured: 'true', limit: '8' }),
    fetchProducts({ newArrival: 'true', limit: '8' }),
    fetchProducts({ bestSeller: 'true', limit: '8' }),
    fetchProducts({ trending: 'true', limit: '8' }),
    fetchTestimonials(),
  ])

  // Fallback: if no featured products in DB, show first 8 static products
  const displayFeatured =
    featuredProducts.length > 0
      ? featuredProducts
      : (staticProducts.slice(0, 8) as GridProduct[])

  const displayNewArrivals =
    newArrivals.length > 0
      ? newArrivals
      : (staticProducts.slice(0, 4) as GridProduct[])

  const displayBestSellers =
    bestSellers.length > 0
      ? bestSellers
      : (staticProducts.slice(4, 8) as GridProduct[])

  const displayTrending =
    trendingProducts.length > 0
      ? trendingProducts
      : (staticProducts.slice(2, 6) as GridProduct[])

  return (
    <>
      <Navbar />
      <main>
        {/* 1. Hero */}
        <Hero />

        {/* 2. Featured Products */}
        <ProductSection
          title="Featured Collection"
          subtitle="Handpicked pieces that define our signature aesthetic."
          products={displayFeatured}
          viewAllLink="/shop?featured=true"
          viewAllLabel="View All Featured"
        />

        {/* 3. New Arrivals */}
        <ProductSection
          title="New Arrivals"
          subtitle="Fresh styles just added to our collection."
          products={displayNewArrivals}
          viewAllLink="/shop?newArrival=true"
          background="muted"
        />

        {/* 4. Trending */}
        <ProductSection
          title="Trending Now"
          subtitle="What everyone is wearing this season."
          products={displayTrending}
          viewAllLink="/shop?trending=true"
        />

        {/* 5. Shop by Category */}
        <FeaturedCategories />

        {/* 6. Best Sellers */}
        <ProductSection
          title="Best Sellers"
          subtitle="Our most loved pieces by the Vellora community."
          products={displayBestSellers}
          viewAllLink="/shop?bestSeller=true"
          background="muted"
        />

        {/* 7. Promotional Banners */}
        <PromotionalBanner banners={banners} />

        {/* Brand Story (Interlude) */}
        <BrandStory />

        {/* 8. Testimonials */}
        <TestimonialsSection dbTestimonials={testimonials} />

        {/* 9. Instagram Gallery */}
        <InstagramGallery />

        {/* 10. FAQ */}
        <FAQSection />

        {/* 11. Newsletter */}
        <NewsletterSection />
      </main>
      {/* 12. Premium Footer */}
      <Footer />
    </>
  )
}

