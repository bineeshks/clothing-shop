import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/db'
import Product from '@/lib/models/Product'
import { getCurrentUser } from '@/lib/auth'

// GET all products with optional filters
export async function GET(req: NextRequest) {
  try {
    await connectDB()

    const { searchParams } = new URL(req.url)
    const featured = searchParams.get('featured')
    const newArrival = searchParams.get('newArrival')
    const bestSeller = searchParams.get('bestSeller')
    const trending = searchParams.get('trending')
    const category = searchParams.get('category')
    const search = searchParams.get('search')
    const status = searchParams.get('status')
    const limit = searchParams.get('limit')

    const query: Record<string, any> = {}

    if (featured === 'true') query.isFeatured = true
    if (newArrival === 'true') query.isNewArrival = true
    if (bestSeller === 'true') query.isBestSeller = true
    if (trending === 'true') query.isTrending = true
    if (category && category !== 'All') query.category = category
    if (status) query.status = status
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { category: { $regex: search, $options: 'i' } },
      ]
    }

    let productsQuery = Product.find(query).sort({ createdAt: -1 })
    if (limit) productsQuery = productsQuery.limit(parseInt(limit))

    const products = await productsQuery.lean()
    return NextResponse.json({ products }, { status: 200 })
  } catch (error) {
    console.error('[vellora] Get products error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
}

// POST create product (admin only)
export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser()
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await connectDB()
    const body = await req.json()

    // Auto-set image from images array
    if (body.images?.length > 0 && !body.image) {
      body.image = body.images[0]
    }

    const product = await Product.create(body)
    return NextResponse.json({ product }, { status: 201 })
  } catch (error: any) {
    console.error('[vellora] Create product error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to create product' },
      { status: 500 }
    )
  }
}
