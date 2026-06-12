'use client'

import { useEffect, useState } from 'react'
import { AdminNav } from '@/components/admin/admin-nav'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Star, Plus, Pencil, Trash2, ToggleLeft, ToggleRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Testimonial {
  _id: string
  name: string
  location: string
  text: string
  rating: number
  isActive: boolean
}

const emptyTestimonial = {
  name: '',
  location: '',
  text: '',
  rating: 5,
  isActive: true,
}

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<Testimonial | null>(null)
  const [formData, setFormData] = useState<any>(emptyTestimonial)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetchTestimonials()
  }, [])

  const fetchTestimonials = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/testimonials')
      const data = await res.json()
      setTestimonials(data.testimonials || [])
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (t: Testimonial) => {
    setEditing(t)
    setFormData({ ...t })
    setShowForm(true)
  }

  const handleNew = () => {
    setEditing(null)
    setFormData(emptyTestimonial)
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
        await fetch(`/api/testimonials/${editing._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...formData, rating: parseInt(formData.rating) }),
        })
      } else {
        await fetch('/api/testimonials', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...formData, rating: parseInt(formData.rating) }),
        })
      }
      setShowForm(false)
      fetchTestimonials()
    } finally {
      setSaving(false)
    }
  }

  const handleToggle = async (t: Testimonial) => {
    await fetch(`/api/testimonials/${t._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isActive: !t.isActive }),
    })
    fetchTestimonials()
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this testimonial?')) return
    await fetch(`/api/testimonials/${id}`, { method: 'DELETE' })
    fetchTestimonials()
  }

  return (
    <div className="min-h-screen bg-background">
      <AdminNav />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="font-serif text-3xl font-bold">Testimonials</h1>
            <p className="text-muted-foreground mt-1">
              Manage customer reviews shown on homepage
            </p>
          </div>
          <Button onClick={handleNew} className="gap-2 bg-primary hover:bg-primary/90">
            <Plus className="w-4 h-4" />
            Add Testimonial
          </Button>
        </div>

        {/* Form */}
        {showForm && (
          <Card className="p-6 mb-6">
            <h2 className="font-semibold text-lg mb-4">
              {editing ? 'Edit Testimonial' : 'New Testimonial'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1.5">
                  Customer Name *
                </label>
                <Input
                  name="name"
                  value={formData.name || ''}
                  onChange={handleChange}
                  placeholder="Amara K."
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">
                  Location
                </label>
                <Input
                  name="location"
                  value={formData.location || ''}
                  onChange={handleChange}
                  placeholder="Addis Ababa"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">
                  Rating (1–5)
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map(n => (
                    <button
                      key={n}
                      type="button"
                      onClick={() =>
                        setFormData((prev: any) => ({ ...prev, rating: n }))
                      }
                      className="p-1"
                    >
                      <Star
                        className={cn(
                          'w-6 h-6 transition-colors',
                          n <= (formData.rating || 5)
                            ? 'fill-secondary text-secondary'
                            : 'text-muted'
                        )}
                      />
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-3 pt-4">
                <input
                  type="checkbox"
                  name="isActive"
                  id="isActiveTest"
                  checked={formData.isActive ?? true}
                  onChange={handleChange}
                  className="rounded"
                />
                <label htmlFor="isActiveTest" className="text-sm font-medium">
                  Show on homepage
                </label>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1.5">
                  Review Text *
                </label>
                <textarea
                  name="text"
                  value={formData.text || ''}
                  onChange={handleChange}
                  placeholder="What did the customer say about Vellora?"
                  rows={4}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground text-sm"
                  required
                />
              </div>
            </div>
            <div className="flex gap-3 mt-4">
              <Button
                onClick={handleSave}
                disabled={saving}
                className="bg-primary hover:bg-primary/90"
              >
                {saving ? 'Saving...' : 'Save Testimonial'}
              </Button>
              <Button variant="outline" onClick={() => setShowForm(false)}>
                Cancel
              </Button>
            </div>
          </Card>
        )}

        {/* List */}
        {loading ? (
          <div className="text-center py-12 text-muted-foreground">
            Loading...
          </div>
        ) : testimonials.length === 0 ? (
          <Card className="p-12 text-center">
            <Star className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No testimonials yet.</p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {testimonials.map(t => (
              <Card key={t._id} className="p-5">
                <div className="flex items-start gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <p className="font-semibold">{t.name}</p>
                      {t.location && (
                        <span className="text-xs text-muted-foreground">
                          {t.location}
                        </span>
                      )}
                      <span
                        className={cn(
                          'px-1.5 py-0.5 text-xs rounded-full',
                          t.isActive
                            ? 'bg-green-100 text-green-700'
                            : 'bg-muted text-muted-foreground'
                        )}
                      >
                        {t.isActive ? 'Visible' : 'Hidden'}
                      </span>
                    </div>
                    <div className="flex gap-0.5 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={cn(
                            'w-3.5 h-3.5',
                            i < t.rating
                              ? 'fill-secondary text-secondary'
                              : 'text-muted'
                          )}
                        />
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      &ldquo;{t.text}&rdquo;
                    </p>
                  </div>
                  <div className="flex flex-col gap-1.5 flex-shrink-0">
                    <button
                      onClick={() => handleToggle(t)}
                      className="p-1.5 rounded hover:bg-muted"
                    >
                      {t.isActive ? (
                        <ToggleRight className="w-5 h-5 text-green-600" />
                      ) : (
                        <ToggleLeft className="w-5 h-5 text-muted-foreground" />
                      )}
                    </button>
                    <button
                      onClick={() => handleEdit(t)}
                      className="p-1.5 rounded hover:bg-muted"
                    >
                      <Pencil className="w-4 h-4 text-primary" />
                    </button>
                    <button
                      onClick={() => handleDelete(t._id)}
                      className="p-1.5 rounded hover:bg-muted"
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
