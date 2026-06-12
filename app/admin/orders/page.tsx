'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card } from '@/components/ui/card'
import { AdminNav } from '@/components/admin/admin-nav'
import { OrderTable } from '@/components/admin/order-table'

interface Order {
  _id: string
  customerName: string
  customerEmail: string
  totalAmount: number
  status: string
  createdAt: string
}

export default function AdminOrdersPage() {
  const router = useRouter()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      const response = await fetch('/api/orders')
      if (!response.ok) {
        router.push('/admin/login')
        return
      }
      const data = await response.json()
      setOrders(data.orders)
    } catch (err) {
      setError('Failed to load orders')
      console.error('[v0] Orders error:', err)
    } finally {
      setLoading(false)
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

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="font-serif text-3xl font-bold text-foreground">Orders</h1>
          <p className="text-muted-foreground mt-2">Manage customer orders</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-destructive/10 border border-destructive rounded-lg">
            <p className="text-destructive text-sm">{error}</p>
          </div>
        )}

        <Card className="p-6">
          {orders.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No orders yet</p>
            </div>
          ) : (
            <OrderTable orders={orders} />
          )}
        </Card>
      </main>
    </div>
  )
}
