import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/db'
import User from '@/lib/models/User'
import { generateToken, setAuthCookie } from '@/lib/auth'

export async function POST(req: NextRequest) {
  try {
    await connectDB()

    const { email, password, name } = await req.json()

    // Validation
    if (!email || !password || !name) {
      return NextResponse.json(
        { error: 'Email, password, and name are required' },
        { status: 400 }
      )
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters' },
        { status: 400 }
      )
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return NextResponse.json(
        { error: 'Email already registered' },
        { status: 409 }
      )
    }

    // Create new user
    const user = await User.create({
      email,
      password,
      name,
      role: 'customer',
    })

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
        message: 'Registration successful',
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('[v0] Register error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
