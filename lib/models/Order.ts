import mongoose from 'mongoose'

export interface IOrderItem {
  productId: string
  quantity: number
  price: number
}

export interface IOrder extends mongoose.Document {
  customerName: string
  customerEmail: string
  customerPhone: string
  items: IOrderItem[]
  totalAmount: number
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  shippingAddress: string
  notes: string
  createdAt: Date
  updatedAt: Date
}

const orderSchema = new mongoose.Schema<IOrder>(
  {
    customerName: {
      type: String,
      required: [true, 'Please provide customer name'],
    },
    customerEmail: {
      type: String,
      required: [true, 'Please provide customer email'],
    },
    customerPhone: {
      type: String,
      required: [true, 'Please provide customer phone'],
    },
    items: [
      {
        productId: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
        price: {
          type: Number,
          required: true,
          min: 0,
        },
      },
    ],
    totalAmount: {
      type: Number,
      required: [true, 'Please provide total amount'],
      min: 0,
    },
    status: {
      type: String,
      enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
      default: 'pending',
    },
    shippingAddress: {
      type: String,
      required: [true, 'Please provide shipping address'],
    },
    notes: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
)

export default mongoose.models.Order || mongoose.model<IOrder>('Order', orderSchema)
