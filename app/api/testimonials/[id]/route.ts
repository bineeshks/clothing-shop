import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/db'
import Testimonial from '@/lib/models/Testimonial'
import { getCurrentUser } from '@/lib/auth'

// PUT — update testimonial (admin only)
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getCurrentUser()
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await connectDB()
    const { id } = await params
    const body = await req.json()

    const testimonial = await Testimonial.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    })

    if (!testimonial) {
      return NextResponse.json(
        { error: 'Testimonial not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ testimonial }, { status: 200 })
  } catch (error) {
    console.error('[vellora] Update testimonial error:', error)
    return NextResponse.json(
      { error: 'Failed to update testimonial' },
      { status: 500 }
    )
  }
}

// DELETE — delete testimonial (admin only)
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getCurrentUser()
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await connectDB()
    const { id } = await params

    const testimonial = await Testimonial.findByIdAndDelete(id)
    if (!testimonial) {
      return NextResponse.json(
        { error: 'Testimonial not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(
      { message: 'Testimonial deleted successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('[vellora] Delete testimonial error:', error)
    return NextResponse.json(
      { error: 'Failed to delete testimonial' },
      { status: 500 }
    )
  }
}
