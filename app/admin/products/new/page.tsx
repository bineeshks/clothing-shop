'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { AdminNav } from '@/components/admin/admin-nav'
import { ProductForm } from '@/components/admin/product-form'
import { ArrowLeft } from 'lucide-react'

export default function NewProductPage() {
  const router = useRouter()
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (data: any) => {
    setError('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const errorData = await response.json()
        setError(errorData.error || 'Failed to create product')
        return
      }

      router.push('/admin/products')
    } catch (err) {
      setError('An error occurred. Please try again.')
      console.error('[v0] Create product error:', err)
    } finally {
      setIsLoading(false)
    }
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
          <h1 className="font-serif text-3xl font-bold text-foreground">Add New Product</h1>
          <p className="text-muted-foreground mt-2">Create a new product for your store</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-destructive/10 border border-destructive rounded-lg">
            <p className="text-destructive text-sm">{error}</p>
          </div>
        )}

        <Card className="p-6">
          <ProductForm onSubmit={handleSubmit} isLoading={isLoading} />
        </Card>
      </main>
    </div>
  )
}
