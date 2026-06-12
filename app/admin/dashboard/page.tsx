'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { AdminNav } from '@/components/admin/admin-nav'
import { StatsCard } from '@/components/admin/stats-card'
import { RecentOrders } from '@/components/admin/recent-orders'
import { Package, ShoppingCart, TrendingUp, Clock, MessageSquare, Image as ImageIcon, Settings, Star } from 'lucide-react'

interface DashboardStats {
  totalProducts: number
  totalOrders: number
  totalRevenue: number
  pendingOrders: number
  recentOrders: any[]
  ordersByStatus: {
    pending?: number
    processing?: number
    shipped?: number
    delivered?: number
    cancelled?: number
  }
}

export default function AdminDashboardPage() {
  const router = useRouter()
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/admin/stats')
      if (!response.ok) {
        router.push('/admin/login')
        return
      }
      const data = await response.json()
      setStats(data.stats)
    } catch (err) {
      setError('Failed to load dashboard')
      console.error('[v0] Dashboard error:', err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg text-muted-foreground">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <AdminNav />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="font-serif text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-2">Welcome back! Here&apos;s your store overview.</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-destructive/10 border border-destructive rounded-lg">
            <p className="text-destructive text-sm">{error}</p>
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Total Products"
            value={stats?.totalProducts || 0}
            icon={<Package className="w-6 h-6" />}
            trend="+12% from last month"
          />
          <StatsCard
            title="Total Orders"
            value={stats?.totalOrders || 0}
            icon={<ShoppingCart className="w-6 h-6" />}
            trend="+8% from last month"
          />
          <StatsCard
            title="Total Revenue"
            value={`Rs. ${(stats?.totalRevenue || 0).toLocaleString()}`}
            icon={<TrendingUp className="w-6 h-6" />}
            trend="+23% from last month"
          />
          <StatsCard
            title="Pending Orders"
            value={stats?.pendingOrders || 0}
            icon={<Clock className="w-6 h-6" />}
            trend="Needs attention"
          />
        </div>

        {/* Recent Orders and Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <RecentOrders orders={stats?.recentOrders || []} />
          </div>

          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="font-semibold text-lg mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <Link href="/admin/products">
                  <Button className="w-full bg-primary hover:bg-primary/90">
                    <Package className="w-4 h-4 mr-2" /> Manage Products
                  </Button>
                </Link>
                <Link href="/admin/products/new">
                  <Button variant="outline" className="w-full">
                    + Add New Product
                  </Button>
                </Link>
                <Link href="/admin/inquiries">
                  <Button variant="outline" className="w-full gap-2">
                    <MessageSquare className="w-4 h-4" /> View Inquiries
                  </Button>
                </Link>
                <Link href="/admin/banners">
                  <Button variant="outline" className="w-full gap-2">
                    <ImageIcon className="w-4 h-4" /> Manage Banners
                  </Button>
                </Link>
                <Link href="/admin/testimonials">
                  <Button variant="outline" className="w-full gap-2">
                    <Star className="w-4 h-4" /> Testimonials
                  </Button>
                </Link>
                <Link href="/admin/settings">
                  <Button variant="outline" className="w-full gap-2">
                    <Settings className="w-4 h-4" /> Store Settings
                  </Button>
                </Link>
                <Link href="/admin/orders">
                  <Button variant="outline" className="w-full gap-2">
                    <ShoppingCart className="w-4 h-4" /> View Orders
                  </Button>
                </Link>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold text-lg mb-4">Order Status</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Pending</span>
                  <span className="font-semibold">{stats?.ordersByStatus.pending || 0}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Processing</span>
                  <span className="font-semibold">{stats?.ordersByStatus.processing || 0}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Shipped</span>
                  <span className="font-semibold">{stats?.ordersByStatus.shipped || 0}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Delivered</span>
                  <span className="font-semibold">{stats?.ordersByStatus.delivered || 0}</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
