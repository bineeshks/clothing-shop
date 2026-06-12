'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { AdminNav } from '@/components/admin/admin-nav'
import { ArrowLeft } from 'lucide-react'

interface Order {
  _id: string
  customerName: string
  customerEmail: string
  customerPhone: string
  items: Array<{
    productId: string
    quantity: number
    price: number
  }>
  totalAmount: number
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  shippingAddress: string
  notes: string
  createdAt: string
  updatedAt: string
}

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  processing: 'bg-blue-100 text-blue-800',
  shipped: 'bg-purple-100 text-purple-800',
  delivered: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
}

const statuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled']

export default function OrderDetailPage() {
  const router = useRouter()
  const params = useParams()
  const orderId = params.id as string

  const [order, setOrder] = useState<Order | null>(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)

  useEffect(() => {
    fetchOrder()
  }, [orderId])

  const fetchOrder = async () => {
    try {
      const response = await fetch(`/api/orders/${orderId}`)
      if (!response.ok) {
        setError('Failed to load order')
        return
      }
      const data = await response.json()
      setOrder(data.order)
    } catch (err) {
      setError('Failed to load order')
      console.error('[v0] Fetch order error:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleStatusChange = async (newStatus: string) => {
    setUpdating(true)
    try {
      const response = await fetch(`/api/orders/${orderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      })

      if (!response.ok) {
        setError('Failed to update order status')
        return
      }

      const data = await response.json()
      setOrder(data.order)
    } catch (err) {
      setError('Failed to update order')
      console.error('[v0] Update order error:', err)
    } finally {
      setUpdating(false)
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

  if (!order) {
    return (
      <div className="min-h-screen bg-background">
        <AdminNav />
        <div className="max-w-4xl mx-auto px-4 py-8">
          <p className="text-muted-foreground">Order not found</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <AdminNav />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link href="/admin/orders">
          <Button variant="ghost" className="gap-2 mb-6">
            <ArrowLeft className="w-4 h-4" />
            Back to Orders
          </Button>
        </Link>

        <div className="mb-8">
          <h1 className="font-serif text-3xl font-bold text-foreground">Order #{order._id.slice(-8)}</h1>
          <p className="text-muted-foreground mt-2">
            {new Date(order.createdAt).toLocaleDateString()}
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-destructive/10 border border-destructive rounded-lg">
            <p className="text-destructive text-sm">{error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Order Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Customer Info */}
            <Card className="p-6">
              <h2 className="font-semibold text-lg mb-4">Customer Information</h2>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Name</p>
                  <p className="font-medium text-foreground">{order.customerName}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium text-foreground">{order.customerEmail}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p className="font-medium text-foreground">{order.customerPhone}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Shipping Address</p>
                  <p className="font-medium text-foreground">{order.shippingAddress}</p>
                </div>
              </div>
            </Card>

            {/* Order Items */}
            <Card className="p-6">
              <h2 className="font-semibold text-lg mb-4">Order Items</h2>
              <div className="space-y-4">
                {order.items.map((item, index) => (
                  <div key={index} className="flex justify-between items-center py-2 border-b border-border last:border-b-0">
                    <div>
                      <p className="font-medium text-foreground">Product {index + 1}</p>
                      <p className="text-sm text-muted-foreground">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <p className="font-semibold text-foreground">Rs. {item.price.toFixed(2)}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Status and Total */}
          <div className="space-y-6">
            {/* Status */}
            <Card className="p-6">
              <h2 className="font-semibold text-lg mb-4">Order Status</h2>
              <div className="mb-4">
                <span
                  className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                    statusColors[order.status]
                  }`}
                >
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
              </div>
              <select
                value={order.status || 'pending'}
                onChange={(e) => handleStatusChange(e.target.value)}
                disabled={updating}
                className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground"
              >
                {statuses.map((status) => (
                  <option key={status} value={status}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </option>
                ))}
              </select>
            </Card>

            {/* Total */}
            <Card className="p-6 bg-primary/5">
              <h2 className="font-semibold text-lg mb-4">Order Total</h2>
              <div className="text-3xl font-bold text-primary">
                Rs. {order.totalAmount.toFixed(2)}
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
