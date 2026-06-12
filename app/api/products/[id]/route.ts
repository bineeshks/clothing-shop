import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/db'
import Product from '@/lib/models/Product'
import { getCurrentUser } from '@/lib/auth'

// GET product by ID
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB()
    const { id } = await params

    const product = await Product.findById(id)
    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ product }, { status: 200 })
  } catch (error) {
    console.error('[v0] Get product error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch product' },
      { status: 500 }
    )
  }
}

// PUT update product (admin only)
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
    const body = await req.json()

    const product = await Product.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    })

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ product }, { status: 200 })
  } catch (error) {
    console.error('[v0] Update product error:', error)
    return NextResponse.json(
      { error: 'Failed to update product' },
      { status: 500 }
    )
  }
}

// DELETE product (admin only)
export async function DELETE(
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

    const product = await Product.findByIdAndDelete(id)

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(
      { message: 'Product deleted successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('[v0] Delete product error:', error)
    return NextResponse.json(
      { error: 'Failed to delete product' },
      { status: 500 }
    )
  }
}
