import { NextRequest, NextResponse } from 'next/server'
import { clearAuthCookie } from '@/lib/auth'

export async function POST(req: NextRequest) {
  try {
    await clearAuthCookie()

    return NextResponse.json(
      { message: 'Logout successful' },
      { status: 200 }
    )
  } catch (error) {
    console.error('[v0] Logout error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
