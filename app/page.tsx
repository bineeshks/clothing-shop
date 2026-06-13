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

import connectDB from '@/lib/db'
import Product from '@/lib/models/Product'
import Banner from '@/lib/models/Banner'
import Testimonial from '@/lib/models/Testimonial'

// Fetch products directly from MongoDB
async function fetchProductsFromDB(query: Record<string, any>, limit: number = 8): Promise<GridProduct[]> {
  try {
    await connectDB()
    const products = await Product.find(query).sort({ createdAt: -1 }).limit(limit).lean()
    return JSON.parse(JSON.stringify(products)) as GridProduct[]
  } catch {
    return []
  }
}

async function fetchBannersFromDB() {
  try {
    await connectDB()
    const banners = await Banner.find({ isActive: true }).sort({ order: 1 }).lean()
    return JSON.parse(JSON.stringify(banners))
  } catch {
    return []
  }
}

async function fetchTestimonialsFromDB() {
  try {
    await connectDB()
    const testimonials = await Testimonial.find({ isApproved: true }).sort({ rating: -1, createdAt: -1 }).lean()
    return JSON.parse(JSON.stringify(testimonials))
  } catch {
    return []
  }
}

export default async function HomePage() {
  // Fetch all data in parallel directly from DB
  const [
    banners,
    featuredProductsDB,
    newArrivalsDB,
    bestSellersDB,
    trendingProductsDB,
    testimonials,
  ] = await Promise.all([
    fetchBannersFromDB(),
    fetchProductsFromDB({ isFeatured: true }),
    fetchProductsFromDB({ isNewArrival: true }),
    fetchProductsFromDB({ isBestSeller: true }),
    fetchProductsFromDB({ isTrending: true }),
    fetchTestimonialsFromDB(),
  ])

  const featuredProducts = featuredProductsDB.length ? featuredProductsDB : []
  const newArrivals = newArrivalsDB.length ? newArrivalsDB : []
  const bestSellers = bestSellersDB.length ? bestSellersDB : []
  const trendingProducts = trendingProductsDB.length ? trendingProductsDB : []

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

