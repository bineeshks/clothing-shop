import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/db'
import User from '@/lib/models/User'
import { generateToken, setAuthCookie } from '@/lib/auth'

export async function POST(req: NextRequest) {
  try {
    await connectDB()

    const { email, password } = await req.json()

    // Validation
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    // Find user with password field selected
    const user = await User.findOne({ email }).select('+password')
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      )
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password)
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      )
    }

    // Check if user is admin
    if (user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Only admins can access this area' },
        { status: 403 }
      )
    }

    // Generate token
    const token = await generateToken({
      userId: user._id.toString(),
      email: user.email,
      role: user.role,
    })

    // Set cookie
    await setAuthCookie(token)

    return NextResponse.json(
      {
        message: 'Login successful',
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('[v0] Login error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
