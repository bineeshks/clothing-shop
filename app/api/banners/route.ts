import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/db'
import Banner from '@/lib/models/Banner'
import { getCurrentUser } from '@/lib/auth'

// GET — list banners (active only for public, all for admin)
export async function GET(req: NextRequest) {
  try {
    await connectDB()
    const user = await getCurrentUser()
    const isAdmin = user?.role === 'admin'

    const query = isAdmin ? {} : { isActive: true }
    const banners = await Banner.find(query).sort({ order: 1 }).lean()
    return NextResponse.json({ banners }, { status: 200 })
  } catch (error) {
    console.error('[vellora] Get banners error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch banners' },
      { status: 500 }
    )
  }
}

// POST — create banner (admin only)
export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser()
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await connectDB()
    const body = await req.json()
    const banner = await Banner.create(body)
    return NextResponse.json({ banner }, { status: 201 })
  } catch (error) {
    console.error('[vellora] Create banner error:', error)
    return NextResponse.json(
      { error: 'Failed to create banner' },
      { status: 500 }
    )
  }
}
