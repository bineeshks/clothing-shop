'use client'

import { useEffect, useState, useMemo } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { AdminNav } from '@/components/admin/admin-nav'
import { ProductTable } from '@/components/admin/product-table'
import { Plus, Search, Filter, X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Product {
  _id: string
  name: string
  price: number
  discount?: number
  category: string
  stock: number
  image: string
  status?: string
  isFeatured?: boolean
  isNewArrival?: boolean
  isBestSeller?: boolean
  isTrending?: boolean
  badge?: string
  createdAt: string
}

const CATEGORIES = ['All', 'Dresses', 'Tops', 'Bottoms', 'Accessories', 'Outerwear', 'Other']
const STATUS_OPTIONS = [
  { value: 'all', label: 'All Status' },
  { value: 'available', label: 'Available' },
  { value: 'out_of_stock', label: 'Out of Stock' },
]
const FEATURE_OPTIONS = [
  { value: 'all', label: 'All Products' },
  { value: 'featured', label: 'Featured' },
  { value: 'newArrival', label: 'New Arrivals' },
  { value: 'bestSeller', label: 'Best Sellers' },
  { value: 'trending', label: 'Trending' },
]

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [status, setStatus] = useState('all')
  const [feature, setFeature] = useState('all')

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products')
      if (!response.ok) throw new Error('Failed')
      const data = await response.json()
      setProducts(data.products || [])
    } catch (err) {
      setError('Failed to load products')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return
    try {
      const response = await fetch(`/api/products/${id}`, { method: 'DELETE' })
      if (!response.ok) {
        setError('Failed to delete product')
        return
      }
      setProducts(products.filter(p => p._id !== id))
    } catch {
      setError('Failed to delete product')
    }
  }

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchSearch =
        !search ||
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.category.toLowerCase().includes(search.toLowerCase())
      const matchCategory = category === 'All' || p.category === category
      const matchStatus = status === 'all' || p.status === status
      const matchFeature =
        feature === 'all' ||
        (feature === 'featured' && p.isFeatured) ||
        (feature === 'newArrival' && p.isNewArrival) ||
        (feature === 'bestSeller' && p.isBestSeller) ||
        (feature === 'trending' && p.isTrending)
      return matchSearch && matchCategory && matchStatus && matchFeature
    })
  }, [products, search, category, status, feature])

  const hasFilters =
    search || category !== 'All' || status !== 'all' || feature !== 'all'

  const clearFilters = () => {
    setSearch('')
    setCategory('All')
    setStatus('all')
    setFeature('all')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <AdminNav />
        <div className="flex items-center justify-center h-96">
          <div className="text-lg text-muted-foreground">Loading...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <AdminNav />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="font-serif text-3xl font-bold text-foreground">
              Products
            </h1>
            <p className="text-muted-foreground mt-1">
              {filteredProducts.length} of {products.length} products
            </p>
          </div>
          <Link href="/admin/products/new">
            <Button className="bg-primary hover:bg-primary/90 gap-2">
              <Plus className="w-4 h-4" />
              Add Product
            </Button>
          </Link>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-destructive/10 border border-destructive rounded-lg">
            <p className="text-destructive text-sm">{error}</p>
          </div>
        )}

        {/* Search & Filters */}
        <Card className="p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search products..."
                className="pl-9"
              />
            </div>

            {/* Category */}
            <select
              value={category}
              onChange={e => setCategory(e.target.value)}
              className="px-3 py-2 border border-border rounded-lg bg-background text-sm text-foreground"
            >
              {CATEGORIES.map(c => (
                <option key={c} value={c}>
                  {c === 'All' ? 'All Categories' : c}
                </option>
              ))}
            </select>

            {/* Status */}
            <select
              value={status}
              onChange={e => setStatus(e.target.value)}
              className="px-3 py-2 border border-border rounded-lg bg-background text-sm text-foreground"
            >
              {STATUS_OPTIONS.map(s => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>

            {/* Feature Filter */}
            <select
              value={feature}
              onChange={e => setFeature(e.target.value)}
              className="px-3 py-2 border border-border rounded-lg bg-background text-sm text-foreground"
            >
              {FEATURE_OPTIONS.map(f => (
                <option key={f.value} value={f.value}>
                  {f.label}
                </option>
              ))}
            </select>

            {/* Clear */}
            {hasFilters && (
              <Button
                variant="outline"
                size="sm"
                onClick={clearFilters}
                className="gap-1 whitespace-nowrap"
              >
                <X className="w-4 h-4" />
                Clear
              </Button>
            )}
          </div>
        </Card>

        <Card className="p-6">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">
                {hasFilters
                  ? 'No products match your filters.'
                  : 'No products yet. Create your first product!'}
              </p>
              {!hasFilters && (
                <Link href="/admin/products/new">
                  <Button>Add Product</Button>
                </Link>
              )}
            </div>
          ) : (
            <ProductTable
              products={filteredProducts as any}
              onDelete={handleDelete}
            />
          )}
        </Card>
      </main>
    </div>
  )
}
