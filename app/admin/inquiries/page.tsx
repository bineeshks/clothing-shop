'use client'

import { useEffect, useState } from 'react'
import { AdminNav } from '@/components/admin/admin-nav'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  MessageSquare,
  Trash2,
  CheckCircle,
  Circle,
  Clock,
  Filter,
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface Inquiry {
  _id: string
  customerName: string
  phone: string
  whatsappNumber: string
  productId: string
  productName: string
  size: string
  color: string
  message: string
  status: 'new' | 'read' | 'resolved'
  createdAt: string
}

const STATUS_ICONS = {
  new: <Circle className="w-4 h-4 text-blue-500" />,
  read: <Clock className="w-4 h-4 text-yellow-500" />,
  resolved: <CheckCircle className="w-4 h-4 text-green-500" />,
}

export default function InquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'new' | 'read' | 'resolved'>(
    'all'
  )

  useEffect(() => {
    fetchInquiries()
  }, [filter])

  const fetchInquiries = async () => {
    setLoading(true)
    try {
      const qs = filter !== 'all' ? `?status=${filter}` : ''
      const res = await fetch(`/api/inquiries${qs}`)
      const data = await res.json()
      setInquiries(data.inquiries || [])
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const updateStatus = async (id: string, status: string) => {
    try {
      await fetch(`/api/inquiries/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      })
      fetchInquiries()
    } catch (err) {
      console.error(err)
    }
  }

  const deleteInquiry = async (id: string) => {
    if (!confirm('Delete this inquiry?')) return
    try {
      await fetch(`/api/inquiries/${id}`, { method: 'DELETE' })
      fetchInquiries()
    } catch (err) {
      console.error(err)
    }
  }

  const openWhatsApp = (inquiry: Inquiry) => {
    const num = (inquiry.whatsappNumber || inquiry.phone).replace(/\D/g, '')
    const msg = encodeURIComponent(
      `Hello ${inquiry.customerName}, thank you for your inquiry about ${inquiry.productName || 'our product'}. We'd love to help!`
    )
    window.open(`https://wa.me/${num}?text=${msg}`, '_blank')
  }

  const filterLabels: Array<{ value: typeof filter; label: string }> = [
    { value: 'all', label: 'All' },
    { value: 'new', label: 'New' },
    { value: 'read', label: 'Read' },
    { value: 'resolved', label: 'Resolved' },
  ]

  return (
    <div className="min-h-screen bg-background">
      <AdminNav />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="font-serif text-3xl font-bold">Customer Inquiries</h1>
            <p className="text-muted-foreground mt-1">
              {inquiries.length} inquiries
            </p>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-6">
          <Filter className="w-5 h-5 text-muted-foreground mt-0.5" />
          {filterLabels.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => setFilter(value)}
              className={cn(
                'px-4 py-1.5 rounded-full text-sm font-medium transition-colors',
                filter === value
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:text-foreground'
              )}
            >
              {label}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-12 text-muted-foreground">
            Loading inquiries...
          </div>
        ) : inquiries.length === 0 ? (
          <Card className="p-12 text-center">
            <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No inquiries found.</p>
          </Card>
        ) : (
          <div className="space-y-4">
            {inquiries.map(inquiry => (
              <Card key={inquiry._id} className="p-6">
                <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      {STATUS_ICONS[inquiry.status]}
                      <span className="font-semibold text-foreground">
                        {inquiry.customerName}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {new Date(inquiry.createdAt).toLocaleDateString()}
                      </span>
                      <span
                        className={cn(
                          'px-2 py-0.5 rounded-full text-xs font-medium',
                          inquiry.status === 'new' &&
                            'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
                          inquiry.status === 'read' &&
                            'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
                          inquiry.status === 'resolved' &&
                            'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                        )}
                      >
                        {inquiry.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-1 text-sm mb-3">
                      <p>
                        <span className="text-muted-foreground">Phone: </span>
                        <a
                          href={`tel:${inquiry.phone}`}
                          className="text-primary hover:underline"
                        >
                          {inquiry.phone}
                        </a>
                      </p>
                      {inquiry.whatsappNumber && (
                        <p>
                          <span className="text-muted-foreground">WhatsApp: </span>
                          {inquiry.whatsappNumber}
                        </p>
                      )}
                      {inquiry.productName && (
                        <p>
                          <span className="text-muted-foreground">Product: </span>
                          {inquiry.productName}
                        </p>
                      )}
                      {inquiry.size && (
                        <p>
                          <span className="text-muted-foreground">Size: </span>
                          {inquiry.size}
                        </p>
                      )}
                      {inquiry.color && (
                        <p>
                          <span className="text-muted-foreground">Color: </span>
                          {inquiry.color}
                        </p>
                      )}
                    </div>

                    {inquiry.message && (
                      <p className="text-sm text-muted-foreground bg-muted rounded-lg p-3">
                        {inquiry.message}
                      </p>
                    )}
                  </div>

                  <div className="flex sm:flex-col gap-2 flex-shrink-0">
                    <Button
                      size="sm"
                      variant="outline"
                      className="gap-1 text-xs text-accent border-accent hover:bg-accent/10"
                      onClick={() => openWhatsApp(inquiry)}
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      Reply
                    </Button>

                    {inquiry.status !== 'read' && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="gap-1 text-xs"
                        onClick={() => updateStatus(inquiry._id, 'read')}
                      >
                        <Clock className="w-3.5 h-3.5" />
                        Mark Read
                      </Button>
                    )}
                    {inquiry.status !== 'resolved' && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="gap-1 text-xs text-green-600 border-green-600 hover:bg-green-50"
                        onClick={() => updateStatus(inquiry._id, 'resolved')}
                      >
                        <CheckCircle className="w-3.5 h-3.5" />
                        Resolve
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="outline"
                      className="gap-1 text-xs text-destructive border-destructive hover:bg-destructive/10"
                      onClick={() => deleteInquiry(inquiry._id)}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      Delete
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
