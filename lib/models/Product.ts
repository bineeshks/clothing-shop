import mongoose from 'mongoose'

export interface IProduct extends mongoose.Document {
  name: string
  slug: string
  description: string
  details: string
  price: number
  discount: number // percentage 0-100
  category: string
  image: string
  images: string[]
  rating: number
  reviews: number
  colors: string[]
  sizes: string[]
  stock: number
  status: 'available' | 'out_of_stock'
  isFeatured: boolean
  isNewArrival: boolean
  isBestSeller: boolean
  isTrending: boolean
  badge: 'New' | 'Sale' | 'Trending' | null
  createdAt: Date
  updatedAt: Date
}

const productSchema = new mongoose.Schema<IProduct>(
  {
    name: {
      type: String,
      required: [true, 'Please provide a product name'],
      trim: true,
    },
    slug: {
      type: String,
      trim: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: [true, 'Please provide a description'],
    },
    details: {
      type: String,
      default: '',
    },
    price: {
      type: Number,
      required: [true, 'Please provide a price'],
      min: 0,
    },
    discount: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    category: {
      type: String,
      required: [true, 'Please provide a category'],
    },
    image: {
      type: String,
      default: '',
    },
    images: {
      type: [String],
      default: [],
    },
    rating: {
      type: Number,
      default: 5,
      min: 0,
      max: 5,
    },
    reviews: {
      type: Number,
      default: 0,
      min: 0,
    },
    colors: {
      type: [String],
      default: ['Default'],
    },
    sizes: {
      type: [String],
      default: ['M'],
    },
    stock: {
      type: Number,
      required: [true, 'Please provide stock quantity'],
      min: 0,
    },
    status: {
      type: String,
      enum: ['available', 'out_of_stock'],
      default: 'available',
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isNewArrival: {
      type: Boolean,
      default: false,
    },
    isBestSeller: {
      type: Boolean,
      default: false,
    },
    isTrending: {
      type: Boolean,
      default: false,
    },
    badge: {
      type: String,
      enum: ['New', 'Sale', 'Trending', null],
      default: null,
    },
  },
  {
    timestamps: true,
  }
)

// Auto-generate slug from name before save
productSchema.pre('save', function (next) {
  if (!this.slug && this.name) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
  }
  // Sync image with first of images array
  if (this.images && this.images.length > 0 && !this.image) {
    this.image = this.images[0]
  }
  next()
})

export default mongoose.models.Product ||
  mongoose.model<IProduct>('Product', productSchema)
