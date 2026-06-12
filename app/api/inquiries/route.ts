import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/db'
import Inquiry from '@/lib/models/Inquiry'
import { getCurrentUser } from '@/lib/auth'

// POST — submit inquiry (public)
export async function POST(req: NextRequest) {
  try {
    await connectDB()
    const body = await req.json()

    const { customerName, phone } = body
    if (!customerName || !phone) {
      return NextResponse.json(
        { error: 'Name and phone are required' },
        { status: 400 }
      )
    }

    const inquiry = await Inquiry.create(body)
    return NextResponse.json({ inquiry }, { status: 201 })
  } catch (error) {
    console.error('[vellora] Create inquiry error:', error)
    return NextResponse.json(
      { error: 'Failed to submit inquiry' },
      { status: 500 }
    )
  }
}

// GET — list all inquiries (admin only)
export async function GET(req: NextRequest) {
  try {
    const user = await getCurrentUser()
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await connectDB()
    const { searchParams } = new URL(req.url)
    const status = searchParams.get('status')

    const query: Record<string, any> = {}
    if (status && status !== 'all') query.status = status

    const inquiries = await Inquiry.find(query).sort({ createdAt: -1 }).lean()
    return NextResponse.json({ inquiries }, { status: 200 })
  } catch (error) {
    console.error('[vellora] Get inquiries error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch inquiries' },
      { status: 500 }
    )
  }
}
