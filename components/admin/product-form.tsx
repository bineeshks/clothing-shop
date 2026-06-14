'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Plus, Trash2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ProductFormProps {
  initialData?: any
  onSubmit: (data: any) => Promise<void>
  isLoading?: boolean
}

const CATEGORIES = [
  'Dresses',
  'Tops',
  'Bottoms',
  'Accessories',
  'Outerwear',
  'Other',
]
const SIZES_OPTIONS = ['XS', 'S', 'M', 'L', 'XL', 'XXL']
const BADGE_OPTIONS = ['', 'New', 'Sale', 'Trending']

export function ProductForm({
  initialData,
  onSubmit,
  isLoading = false,
}: ProductFormProps) {
  const [formData, setFormData] = useState(
    initialData || {
      name: '',
      description: '',
      details: '',
      price: '',
      discount: '0',
      category: 'Dresses',
      images: [''],
      stock: '',
      colors: 'Default',
      sizes: 'S,M,L',
      rating: '5',
      reviews: '0',
      status: 'available',
      isFeatured: false,
      isNewArrival: false,
      isBestSeller: false,
      isTrending: false,
      badge: '',
    }
  )

  const [imageInputs, setImageInputs] = useState<string[]>(
    initialData?.images?.length > 0 ? initialData.images : ['']
  )

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target
    const checked =
      type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined
    setFormData((prev: any) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    Array.from(files).forEach((file) => {
      const reader = new FileReader()
      reader.onloadend = () => {
        const base64String = reader.result as string
        setImageInputs(prev => {
          const valid = prev.filter(img => img.trim() !== '')
          return [...valid, base64String]
        })
      }
      reader.readAsDataURL(file)
    })
  }

  const removeImageInput = (indexToRemove: number) => {
    setImageInputs(prev => {
      const valid = prev.filter(img => img.trim() !== '')
      return valid.filter((_, i) => i !== indexToRemove)
    })
  }

  const handleSizeToggle = (size: string) => {
    const current = formData.sizes
      ? formData.sizes.split(',').map((s: string) => s.trim()).filter(Boolean)
      : []
    const updated = current.includes(size)
      ? current.filter((s: string) => s !== size)
      : [...current, size]
    setFormData((prev: any) => ({ ...prev, sizes: updated.join(',') }))
  }

  const currentSizes = formData.sizes
    ? formData.sizes.split(',').map((s: string) => s.trim()).filter(Boolean)
    : []

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const validImages = imageInputs.filter(img => img.trim() !== '')
    const data = {
      ...formData,
      price: parseFloat(formData.price),
      discount: parseFloat(formData.discount || '0'),
      stock: parseInt(formData.stock),
      rating: parseFloat(formData.rating),
      reviews: parseInt(formData.reviews),
      colors: formData.colors
        .split(',')
        .map((c: string) => c.trim())
        .filter(Boolean),
      sizes: formData.sizes
        .split(',')
        .map((s: string) => s.trim())
        .filter(Boolean),
      images: validImages,
      image: validImages[0] || '',
      badge: formData.badge || null,
    }
    await onSubmit(data)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Basic Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1.5">
              Product Name *
            </label>
            <Input
              name="name"
              value={formData.name || ''}
              onChange={handleChange}
              placeholder="e.g., Forest Green Silk Dress"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium mb-1.5">
                Price (USD) *
              </label>
              <Input
                type="number"
                name="price"
                value={formData.price || ''}
                onChange={handleChange}
                placeholder="285"
                step="0.01"
                min="0"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">
                Discount (%)
              </label>
              <Input
                type="number"
                name="discount"
                value={formData.discount || '0'}
                onChange={handleChange}
                placeholder="0"
                min="0"
                max="100"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5">
              Category *
            </label>
            <select
              name="category"
              value={formData.category || 'Dresses'}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground text-sm"
              required
            >
              {CATEGORIES.map(cat => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium mb-1.5">
                Stock Qty *
              </label>
              <Input
                type="number"
                name="stock"
                value={formData.stock || ''}
                onChange={handleChange}
                placeholder="50"
                min="0"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Status</label>
              <select
                name="status"
                value={formData.status || 'available'}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground text-sm"
              >
                <option value="available">Available</option>
                <option value="out_of_stock">Out of Stock</option>
              </select>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1.5">
              Colors (comma separated)
            </label>
            <Input
              name="colors"
              value={formData.colors || ''}
              onChange={handleChange}
              placeholder="Forest Green, Black, Ivory"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5">Sizes</label>
            <div className="flex flex-wrap gap-2">
              {SIZES_OPTIONS.map(size => (
                <button
                  key={size}
                  type="button"
                  onClick={() => handleSizeToggle(size)}
                  className={cn(
                    'px-3 py-1.5 border rounded text-sm transition-colors',
                    currentSizes.includes(size)
                      ? 'border-primary bg-primary/10 text-primary font-medium'
                      : 'border-border hover:border-primary'
                  )}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5">Badge</label>
            <select
              name="badge"
              value={formData.badge || ''}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground text-sm"
            >
              {BADGE_OPTIONS.map(b => (
                <option key={b} value={b}>
                  {b === '' ? 'None' : b}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium mb-1.5">Rating</label>
              <Input
                type="number"
                name="rating"
                value={formData.rating || '5'}
                onChange={handleChange}
                min="0"
                max="5"
                step="0.1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">
                Reviews
              </label>
              <Input
                type="number"
                name="reviews"
                value={formData.reviews || '0'}
                onChange={handleChange}
                min="0"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium mb-1.5">
          Description *
        </label>
        <textarea
          name="description"
          value={formData.description || ''}
          onChange={handleChange}
          placeholder="Short product description..."
          rows={3}
          className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground text-sm"
          required
        />
      </div>

      {/* Details */}
      <div>
        <label className="block text-sm font-medium mb-1.5">
          Full Details / Materials
        </label>
        <textarea
          name="details"
          value={formData.details || ''}
          onChange={handleChange}
          placeholder="Material composition, care instructions, craftsmanship details..."
          rows={3}
          className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground text-sm"
        />
      </div>

      {/* Images */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="block text-sm font-medium">
            Product Images
          </label>
          <div>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileUpload}
              className="hidden"
              id="image-upload"
            />
            <label htmlFor="image-upload">
              <Button type="button" variant="outline" size="sm" className="gap-1" asChild>
                <span>
                  <Plus className="w-4 h-4" />
                  Upload Images
                </span>
              </Button>
            </label>
          </div>
        </div>
        
        {imageInputs.filter(img => img.trim() !== '').length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
            {imageInputs.filter(img => img.trim() !== '').map((img, index) => (
              <div key={index} className="relative group aspect-square rounded-md overflow-hidden border bg-muted">
                <img src={img} alt={`Preview ${index}`} className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => removeImageInput(index)}
                  className="absolute top-2 right-2 bg-destructive text-destructive-foreground p-1.5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="border-2 border-dashed border-border rounded-lg p-8 text-center mt-2">
            <p className="text-sm text-muted-foreground">No images uploaded yet. Click "Upload Images" to select files.</p>
          </div>
        )}
        
        <p className="text-xs text-muted-foreground mt-2">
          First image will be the main product image.
        </p>
      </div>

      {/* Feature Flags */}
      <div>
        <label className="block text-sm font-medium mb-3">
          Product Labels
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { key: 'isFeatured', label: 'Featured' },
            { key: 'isNewArrival', label: 'New Arrival' },
            { key: 'isBestSeller', label: 'Best Seller' },
            { key: 'isTrending', label: 'Trending' },
          ].map(({ key, label }) => (
            <label
              key={key}
              className={cn(
                'flex items-center gap-2 px-4 py-3 border rounded-lg cursor-pointer transition-colors',
                formData[key]
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-border hover:border-primary'
              )}
            >
              <input
                type="checkbox"
                name={key}
                checked={formData[key] || false}
                onChange={handleChange}
                className="rounded"
              />
              <span className="text-sm font-medium">{label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Submit */}
      <div className="flex gap-4 pt-2">
        <Button
          type="submit"
          disabled={isLoading}
          className="bg-primary hover:bg-primary/90 text-primary-foreground px-8"
        >
          {isLoading ? 'Saving...' : 'Save Product'}
        </Button>
      </div>
    </form>
  )
}
