import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/db'
import Setting from '@/lib/models/Settings'
import { getCurrentUser } from '@/lib/auth'

// GET — all settings (admin only)
export async function GET(req: NextRequest) {
  try {
    const user = await getCurrentUser()
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await connectDB()
    const settings = await Setting.find({}).lean()
    const map = settings.reduce(
      (acc, s) => {
        acc[s.key] = s.value
        return acc
      },
      {} as Record<string, string>
    )

    return NextResponse.json({ settings: map }, { status: 200 })
  } catch (error) {
    console.error('[vellora] Get settings error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch settings' },
      { status: 500 }
    )
  }
}

// POST — upsert setting (admin only)
export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser()
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await connectDB()
    const { key, value } = await req.json()

    if (!key) {
      return NextResponse.json({ error: 'Key is required' }, { status: 400 })
    }

    const setting = await Setting.findOneAndUpdate(
      { key },
      { key, value },
      { upsert: true, new: true }
    )

    return NextResponse.json({ setting }, { status: 200 })
  } catch (error) {
    console.error('[vellora] Update setting error:', error)
    return NextResponse.json(
      { error: 'Failed to update setting' },
      { status: 500 }
    )
  }
}
