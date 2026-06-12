'use client'

import { useEffect, useState } from 'react'
import { AdminNav } from '@/components/admin/admin-nav'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Plus, Pencil, Trash2, ToggleLeft, ToggleRight, Image as ImageIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Banner {
  _id: string
  title: string
  subtitle: string
  image: string
  link: string
  isActive: boolean
  order: number
}

const emptyBanner = {
  title: '',
  subtitle: '',
  image: '',
  link: '/shop',
  isActive: true,
  order: 0,
}

export default function BannersPage() {
  const [banners, setBanners] = useState<Banner[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<Banner | null>(null)
  const [formData, setFormData] = useState<any>(emptyBanner)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetchBanners()
  }, [])

  const fetchBanners = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/banners')
      const data = await res.json()
      setBanners(data.banners || [])
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (banner: Banner) => {
    setEditing(banner)
    setFormData({ ...banner })
    setShowForm(true)
  }

  const handleNew = () => {
    setEditing(null)
    setFormData(emptyBanner)
    setShowForm(true)
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target
    const checked =
      type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined
    setFormData((prev: any) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      if (editing) {
        await fetch(`/api/banners/${editing._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        })
      } else {
        await fetch('/api/banners', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        })
      }
      setShowForm(false)
      fetchBanners()
    } catch (err) {
      console.error(err)
    } finally {
      setSaving(false)
    }
  }

  const handleToggle = async (banner: Banner) => {
    await fetch(`/api/banners/${banner._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isActive: !banner.isActive }),
    })
    fetchBanners()
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this banner?')) return
    await fetch(`/api/banners/${id}`, { method: 'DELETE' })
    fetchBanners()
  }

  return (
    <div className="min-h-screen bg-background">
      <AdminNav />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="font-serif text-3xl font-bold">Promotional Banners</h1>
            <p className="text-muted-foreground mt-1">
              Manage homepage banners
            </p>
          </div>
          <Button onClick={handleNew} className="gap-2 bg-primary hover:bg-primary/90">
            <Plus className="w-4 h-4" />
            Add Banner
          </Button>
        </div>

        {/* Form */}
        {showForm && (
          <Card className="p-6 mb-6">
            <h2 className="font-semibold text-lg mb-4">
              {editing ? 'Edit Banner' : 'New Banner'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1.5">Title *</label>
                <Input
                  name="title"
                  value={formData.title || ''}
                  onChange={handleChange}
                  placeholder="Elevate Your Style"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Link</label>
                <Input
                  name="link"
                  value={formData.link || '/shop'}
                  onChange={handleChange}
                  placeholder="/shop"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">
                  Subtitle
                </label>
                <Input
                  name="subtitle"
                  value={formData.subtitle || ''}
                  onChange={handleChange}
                  placeholder="Discover our new seasonal collection"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Order</label>
                <Input
                  type="number"
                  name="order"
                  value={formData.order || 0}
                  onChange={handleChange}
                  min="0"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1.5">
                  Image URL
                </label>
                <Input
                  name="image"
                  value={formData.image || ''}
                  onChange={handleChange}
                  placeholder="https://example.com/banner.jpg or /images/banner.jpg"
                />
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  name="isActive"
                  id="isActive"
                  checked={formData.isActive ?? true}
                  onChange={handleChange}
                  className="rounded"
                />
                <label htmlFor="isActive" className="text-sm font-medium">
                  Active (visible on homepage)
                </label>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <Button
                onClick={handleSave}
                disabled={saving}
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                {saving ? 'Saving...' : 'Save Banner'}
              </Button>
              <Button variant="outline" onClick={() => setShowForm(false)}>
                Cancel
              </Button>
            </div>
          </Card>
        )}

        {/* Banners List */}
        {loading ? (
          <div className="text-center py-12 text-muted-foreground">Loading...</div>
        ) : banners.length === 0 ? (
          <Card className="p-12 text-center">
            <ImageIcon className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No banners yet. Add one above.</p>
          </Card>
        ) : (
          <div className="space-y-3">
            {banners.map(banner => (
              <Card key={banner._id} className="p-5">
                <div className="flex items-start gap-4">
                  {banner.image && (
                    <div className="w-16 h-16 rounded-lg bg-muted overflow-hidden flex-shrink-0">
                      <img
                        src={banner.image}
                        alt={banner.title}
                        className="w-full h-full object-cover"
                        onError={e => {
                          ;(e.target as HTMLImageElement).style.display = 'none'
                        }}
                      />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold">{banner.title}</h3>
                      <span
                        className={cn(
                          'px-2 py-0.5 text-xs rounded-full',
                          banner.isActive
                            ? 'bg-green-100 text-green-700'
                            : 'bg-muted text-muted-foreground'
                        )}
                      >
                        {banner.isActive ? 'Active' : 'Hidden'}
                      </span>
                    </div>
                    {banner.subtitle && (
                      <p className="text-sm text-muted-foreground">
                        {banner.subtitle}
                      </p>
                    )}
                    <p className="text-xs text-muted-foreground mt-1">
                      → {banner.link} | Order: {banner.order}
                    </p>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <button
                      onClick={() => handleToggle(banner)}
                      className="p-1.5 rounded hover:bg-muted transition-colors"
                      title="Toggle visibility"
                    >
                      {banner.isActive ? (
                        <ToggleRight className="w-5 h-5 text-green-600" />
                      ) : (
                        <ToggleLeft className="w-5 h-5 text-muted-foreground" />
                      )}
                    </button>
                    <button
                      onClick={() => handleEdit(banner)}
                      className="p-1.5 rounded hover:bg-muted transition-colors"
                    >
                      <Pencil className="w-4 h-4 text-primary" />
                    </button>
                    <button
                      onClick={() => handleDelete(banner._id)}
                      className="p-1.5 rounded hover:bg-muted transition-colors"
                    >
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </button>
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
