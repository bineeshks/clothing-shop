'use client'

import { CATEGORIES, COLORS, SIZES } from '@/lib/products'
import { Checkbox } from '@/components/ui/checkbox'

interface ShopFiltersProps {
  onCategoryChange: (category: string) => void
  onColorChange: (color: string) => void
  onSizeChange: (size: string) => void
  onPriceChange: (min: number, max: number) => void
  selectedCategory?: string
  selectedColors: string[]
  selectedSizes: string[]
  priceRange: [number, number]
}

export function ShopFilters({
  onCategoryChange,
  onColorChange,
  onSizeChange,
  onPriceChange,
  selectedCategory = 'All',
  selectedColors,
  selectedSizes,
  priceRange,
}: ShopFiltersProps) {
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>, isMax: boolean) => {
    const value = parseInt(e.target.value) || 0
    const minVal = priceRange?.[0] ?? 0
    const maxVal = priceRange?.[1] ?? 500
    if (isMax) {
      onPriceChange(minVal, value)
    } else {
      onPriceChange(value, maxVal)
    }
  }

  return (
    <div className="space-y-6">
      {/* Category Filter */}
      <div>
        <h3 className="font-semibold text-lg mb-4">Category</h3>
        <div className="space-y-2">
          {CATEGORIES.map(category => (
            <label key={category} className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name="category"
                value={category}
                checked={selectedCategory === category}
                onChange={() => onCategoryChange(category)}
                className="w-4 h-4"
              />
              <span className="text-sm">{category}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Color Filter */}
      <div className="border-t border-border pt-6">
        <h3 className="font-semibold text-lg mb-4">Color</h3>
        <div className="space-y-2">
          {COLORS.map(color => (
            <label key={color} className="flex items-center gap-3 cursor-pointer">
              <Checkbox
                checked={selectedColors.includes(color)}
                onCheckedChange={() => onColorChange(color)}
              />
              <span className="text-sm">{color}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Size Filter */}
      <div className="border-t border-border pt-6">
        <h3 className="font-semibold text-lg mb-4">Size</h3>
        <div className="space-y-2">
          {SIZES.map(size => (
            <label key={size} className="flex items-center gap-3 cursor-pointer">
              <Checkbox
                checked={selectedSizes.includes(size)}
                onCheckedChange={() => onSizeChange(size)}
              />
              <span className="text-sm">{size}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Filter */}
      <div className="border-t border-border pt-6">
        <h3 className="font-semibold text-lg mb-4">Price</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm mb-2">Min: Rs. {priceRange?.[0] ?? 0}</label>
            <input
              type="range"
              min="0"
              max="500"
              value={priceRange?.[0] ?? 0}
              onChange={e => handlePriceChange(e, false)}
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm mb-2">Max: Rs. {priceRange?.[1] ?? 500}</label>
            <input
              type="range"
              min="0"
              max="500"
              value={priceRange?.[1] ?? 500}
              onChange={e => handlePriceChange(e, true)}
              className="w-full"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
