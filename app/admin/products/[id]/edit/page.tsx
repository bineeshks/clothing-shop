'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { AdminNav } from '@/components/admin/admin-nav'
import { ProductForm } from '@/components/admin/product-form'
import { ArrowLeft } from 'lucide-react'

export default function EditProductPage() {
  const router = useRouter()
  const params = useParams()
  const productId = params.id as string

  const [product, setProduct] = useState(null)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProduct()
  }, [productId])

  const fetchProduct = async () => {
    try {
      const response = await fetch(`/api/products/${productId}`)
      if (!response.ok) {
        setError('Failed to load product')
        return
      }
      const data = await response.json()
      const formattedData = {
        ...data.product,
        colors: data.product.colors.join(', '),
        sizes: data.product.sizes.join(', '),
      }
      setProduct(formattedData)
    } catch (err) {
      setError('Failed to load product')
      console.error('[v0] Fetch product error:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (data: any) => {
    setError('')
    setIsLoading(true)

    try {
      const response = await fetch(`/api/products/${productId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const errorData = await response.json()
        setError(errorData.error || 'Failed to update product')
        return
      }

      router.push('/admin/products')
    } catch (err) {
      setError('An error occurred. Please try again.')
      console.error('[v0] Update product error:', err)
    } finally {
      setIsLoading(false)
    }
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

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link href="/admin/products">
          <Button variant="ghost" className="gap-2 mb-6">
            <ArrowLeft className="w-4 h-4" />
            Back to Products
          </Button>
        </Link>

        <div className="mb-8">
          <h1 className="font-serif text-3xl font-bold text-foreground">Edit Product</h1>
          <p className="text-muted-foreground mt-2">Update product information</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-destructive/10 border border-destructive rounded-lg">
            <p className="text-destructive text-sm">{error}</p>
          </div>
        )}

        {product && (
          <Card className="p-6">
            <ProductForm
              initialData={product}
              onSubmit={handleSubmit}
              isLoading={isLoading}
            />
          </Card>
        )}
      </main>
    </div>
  )
}
