import mongoose from 'mongoose'

export interface ITestimonial extends mongoose.Document {
  name: string
  location: string
  text: string
  rating: number
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

const testimonialSchema = new mongoose.Schema<ITestimonial>(
  {
    name: {
      type: String,
      required: [true, 'Please provide a name'],
      trim: true,
    },
    location: {
      type: String,
      default: '',
    },
    text: {
      type: String,
      required: [true, 'Please provide testimonial text'],
    },
    rating: {
      type: Number,
      default: 5,
      min: 1,
      max: 5,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
)

export default mongoose.models.Testimonial ||
  mongoose.model<ITestimonial>('Testimonial', testimonialSchema)
