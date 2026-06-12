import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/db'
import Testimonial from '@/lib/models/Testimonial'
import { getCurrentUser } from '@/lib/auth'

// GET — list testimonials (active for public, all for admin)
export async function GET(req: NextRequest) {
  try {
    await connectDB()
    const user = await getCurrentUser()
    const isAdmin = user?.role === 'admin'

    const query = isAdmin ? {} : { isActive: true }
    const testimonials = await Testimonial.find(query)
      .sort({ createdAt: -1 })
      .lean()
    return NextResponse.json({ testimonials }, { status: 200 })
  } catch (error) {
    console.error('[vellora] Get testimonials error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch testimonials' },
      { status: 500 }
    )
  }
}

// POST — create testimonial (admin only)
export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser()
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await connectDB()
    const body = await req.json()
    const testimonial = await Testimonial.create(body)
    return NextResponse.json({ testimonial }, { status: 201 })
  } catch (error) {
    console.error('[vellora] Create testimonial error:', error)
    return NextResponse.json(
      { error: 'Failed to create testimonial' },
      { status: 500 }
    )
  }
}
