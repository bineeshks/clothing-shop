import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/db'
import Inquiry from '@/lib/models/Inquiry'
import { getCurrentUser } from '@/lib/auth'

// PATCH — update inquiry status (admin only)
export async function PATCH(
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

    const inquiry = await Inquiry.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    })

    if (!inquiry) {
      return NextResponse.json({ error: 'Inquiry not found' }, { status: 404 })
    }

    return NextResponse.json({ inquiry }, { status: 200 })
  } catch (error) {
    console.error('[vellora] Update inquiry error:', error)
    return NextResponse.json(
      { error: 'Failed to update inquiry' },
      { status: 500 }
    )
  }
}

// DELETE — delete inquiry (admin only)
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

    const inquiry = await Inquiry.findByIdAndDelete(id)
    if (!inquiry) {
      return NextResponse.json({ error: 'Inquiry not found' }, { status: 404 })
    }

    return NextResponse.json(
      { message: 'Inquiry deleted successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('[vellora] Delete inquiry error:', error)
    return NextResponse.json(
      { error: 'Failed to delete inquiry' },
      { status: 500 }
    )
  }
}
