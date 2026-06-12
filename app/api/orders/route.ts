import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/db'
import Order from '@/lib/models/Order'
import { getCurrentUser } from '@/lib/auth'

// GET all orders (admin only)
export async function GET(req: NextRequest) {
  try {
    const user = await getCurrentUser()
    if (!user || user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    await connectDB()

    const orders = await Order.find({}).sort({ createdAt: -1 })
    return NextResponse.json({ orders }, { status: 200 })
  } catch (error) {
    console.error('[v0] Get orders error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 }
    )
  }
}

// POST create order
export async function POST(req: NextRequest) {
  try {
    await connectDB()

    const body = await req.json()

    const order = await Order.create(body)
    return NextResponse.json({ order }, { status: 201 })
  } catch (error) {
    console.error('[v0] Create order error:', error)
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    )
  }
}
