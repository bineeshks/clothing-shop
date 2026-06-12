import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/db'
import Order from '@/lib/models/Order'
import { getCurrentUser } from '@/lib/auth'

// GET order by ID
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB()
    const { id } = await params

    const order = await Order.findById(id)
    if (!order) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ order }, { status: 200 })
  } catch (error) {
    console.error('[v0] Get order error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch order' },
      { status: 500 }
    )
  }
}

// PUT update order status (admin only)
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getCurrentUser()
    if (!user || user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    await connectDB()
    const { id } = await params
    const { status, notes } = await req.json()

    const updateData: any = {}
    if (status) updateData.status = status
    if (notes !== undefined) updateData.notes = notes

    const order = await Order.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    })

    if (!order) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ order }, { status: 200 })
  } catch (error) {
    console.error('[v0] Update order error:', error)
    return NextResponse.json(
      { error: 'Failed to update order' },
      { status: 500 }
    )
  }
}
