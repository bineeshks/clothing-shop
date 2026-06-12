import mongoose from 'mongoose'

export interface IInquiry extends mongoose.Document {
  customerName: string
  phone: string
  whatsappNumber: string
  productId: string
  productName: string
  size: string
  color: string
  message: string
  status: 'new' | 'read' | 'resolved'
  createdAt: Date
  updatedAt: Date
}

const inquirySchema = new mongoose.Schema<IInquiry>(
  {
    customerName: {
      type: String,
      required: [true, 'Please provide your name'],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, 'Please provide a phone number'],
      trim: true,
    },
    whatsappNumber: {
      type: String,
      default: '',
      trim: true,
    },
    productId: {
      type: String,
      default: '',
    },
    productName: {
      type: String,
      default: '',
    },
    size: {
      type: String,
      default: '',
    },
    color: {
      type: String,
      default: '',
    },
    message: {
      type: String,
      default: '',
    },
    status: {
      type: String,
      enum: ['new', 'read', 'resolved'],
      default: 'new',
    },
  },
  {
    timestamps: true,
  }
)

export default mongoose.models.Inquiry ||
  mongoose.model<IInquiry>('Inquiry', inquirySchema)
