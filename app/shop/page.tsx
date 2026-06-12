'use client'

import { useState, useMemo } from 'react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { ShopFilters } from '@/components/shop-filters'
import { ProductGrid } from '@/components/product-grid'
import { products } from '@/lib/products'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedColors, setSelectedColors] = useState<string[]>([])
  const [selectedSizes, setSelectedSizes] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500])
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const categoryMatch =
        selectedCategory === 'All' || product.category === selectedCategory
      const colorMatch =
        selectedColors.length === 0 ||
        (product.colors && product.colors.some(c => selectedColors.includes(c)))
      const sizeMatch =
        selectedSizes.length === 0 ||
        (product.sizes && product.sizes.some(s => selectedSizes.includes(s)))
      const priceMatch = product.price >= priceRange[0] && product.price <= priceRange[1]

      return categoryMatch && colorMatch && sizeMatch && priceMatch
    })
  }, [selectedCategory, selectedColors, selectedSizes, priceRange])

  const handleColorChange = (color: string) => {
    setSelectedColors(prev =>
      prev.includes(color) ? prev.filter(c => c !== color) : [...prev, color]
    )
  }

  const handleSizeChange = (size: string) => {
    setSelectedSizes(prev =>
      prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
    )
  }

  const resetFilters = () => {
    setSelectedCategory('All')
    setSelectedColors([])
    setSelectedSizes([])
    setPriceRange([0, 500])
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="font-serif text-4xl sm:text-5xl font-bold mb-4">
              Explore Our Collection
            </h1>
            <p className="text-muted-foreground text-lg">
              Discover {filteredProducts.length} premium ethical pieces
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filters - Desktop */}
            <div className="hidden lg:block">
              <div className="sticky top-20">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-serif text-2xl font-semibold">Filters</h2>
                  {(selectedCategory !== 'All' ||
                    selectedColors.length > 0 ||
                    selectedSizes.length > 0) && (
                    <button
                      onClick={resetFilters}
                      className="text-sm text-primary hover:underline"
                    >
                      Reset
                    </button>
                  )}
                </div>
                <ShopFilters
                  onCategoryChange={setSelectedCategory}
                  onColorChange={handleColorChange}
                  onSizeChange={handleSizeChange}
                  onPriceChange={setPriceRange}
                  selectedCategory={selectedCategory}
                  selectedColors={selectedColors}
                  selectedSizes={selectedSizes}
                  priceRange={priceRange}
                />
              </div>
            </div>

            {/* Mobile Filters Button */}
            <div className="lg:hidden flex justify-between items-center mb-6">
              <Button
                onClick={() => setIsFilterOpen(true)}
                variant="outline"
                className="border-primary text-primary"
              >
                Filters
              </Button>
              {(selectedCategory !== 'All' ||
                selectedColors.length > 0 ||
                selectedSizes.length > 0) && (
                <button
                  onClick={resetFilters}
                  className="text-sm text-primary hover:underline flex items-center gap-1"
                >
                  <X className="w-4 h-4" />
                  Reset
                </button>
              )}
            </div>

            {/* Mobile Filters Modal */}
            {isFilterOpen && (
              <div className="fixed inset-0 z-[100] bg-black/50 lg:hidden">
                <div className="fixed right-0 top-0 bottom-0 w-80 bg-background shadow-lg flex flex-col">
                  <div className="p-6 overflow-y-auto flex-1">
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="font-serif text-2xl font-semibold">Filters</h2>
                      <button
                        onClick={() => setIsFilterOpen(false)}
                        className="p-2 hover:bg-muted rounded"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                    <ShopFilters
                      onCategoryChange={setSelectedCategory}
                      onColorChange={handleColorChange}
                      onSizeChange={handleSizeChange}
                      onPriceChange={setPriceRange}
                      selectedCategory={selectedCategory}
                      selectedColors={selectedColors}
                      selectedSizes={selectedSizes}
                      priceRange={priceRange}
                    />
                  </div>
                  <div className="p-4 border-t border-border mt-auto bg-background">
                    <Button onClick={() => setIsFilterOpen(false)} className="w-full">
                      Apply Filters
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Products */}
            <div className="lg:col-span-3">
              <ProductGrid products={filteredProducts} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
