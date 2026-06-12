import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/db'
import Banner from '@/lib/models/Banner'
import { getCurrentUser } from '@/lib/auth'

// PUT — update banner (admin only)
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

    const banner = await Banner.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    })

    if (!banner) {
      return NextResponse.json({ error: 'Banner not found' }, { status: 404 })
    }

    return NextResponse.json({ banner }, { status: 200 })
  } catch (error) {
    console.error('[vellora] Update banner error:', error)
    return NextResponse.json(
      { error: 'Failed to update banner' },
      { status: 500 }
    )
  }
}

// DELETE — delete banner (admin only)
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

    const banner = await Banner.findByIdAndDelete(id)
    if (!banner) {
      return NextResponse.json({ error: 'Banner not found' }, { status: 404 })
    }

    return NextResponse.json(
      { message: 'Banner deleted successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('[vellora] Delete banner error:', error)
    return NextResponse.json(
      { error: 'Failed to delete banner' },
      { status: 500 }
    )
  }
}
