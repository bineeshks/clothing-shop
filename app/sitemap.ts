import { MetadataRoute } from 'next'
import { products } from '@/lib/products'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || 'https://vellora.com'

  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/shop`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ]

  // Dynamic product routes — try DB first, fallback to static
  let productRoutes: MetadataRoute.Sitemap = []

  try {
    const res = await fetch(`${baseUrl}/api/products`, {
      next: { revalidate: 3600 },
    })
    if (res.ok) {
      const data = await res.json()
      productRoutes = (data.products || []).map((p: any) => ({
        url: `${baseUrl}/product/${p._id}`,
        lastModified: new Date(p.updatedAt || p.createdAt || new Date()),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      }))
    }
  } catch {
    // Fallback to static products
    productRoutes = products.map(p => ({
      url: `${baseUrl}/product/${p.id}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }))
  }

  return [...staticRoutes, ...productRoutes]
}
