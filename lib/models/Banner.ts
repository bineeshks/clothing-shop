import mongoose from 'mongoose'

export interface IBanner extends mongoose.Document {
  title: string
  subtitle: string
  image: string
  link: string
  isActive: boolean
  order: number
  createdAt: Date
  updatedAt: Date
}

const bannerSchema = new mongoose.Schema<IBanner>(
  {
    title: {
      type: String,
      required: [true, 'Please provide a banner title'],
      trim: true,
    },
    subtitle: {
      type: String,
      default: '',
    },
    image: {
      type: String,
      required: [true, 'Please provide a banner image URL'],
    },
    link: {
      type: String,
      default: '/shop',
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
)

export default mongoose.models.Banner ||
  mongoose.model<IBanner>('Banner', bannerSchema)
