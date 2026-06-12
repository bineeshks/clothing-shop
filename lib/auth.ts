import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production'
const JWT_EXPIRATION = '24h'

export interface JWTPayload {
  userId: string
  email: string
  role: 'admin' | 'customer'
}

export async function generateToken(payload: JWTPayload): Promise<string> {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRATION,
  })
}

export async function verifyToken(token: string): Promise<JWTPayload | null> {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload
    return decoded
  } catch (error) {
    return null
  }
}

export async function setAuthCookie(token: string) {
  const cookieStore = await cookies()
  cookieStore.set('auth_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 24 * 60 * 60, // 24 hours
    path: '/',
  })
}

export async function getAuthCookie(): Promise<string | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get('auth_token')
  return token?.value || null
}

export async function clearAuthCookie() {
  const cookieStore = await cookies()
  cookieStore.delete('auth_token')
}

export async function getCurrentUser(): Promise<JWTPayload | null> {
  const token = await getAuthCookie()
  if (!token) {
    return null
  }
  return verifyToken(token)
}
