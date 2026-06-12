import { NextRequest, NextResponse } from 'next/server'
import { verifyToken } from '@/lib/auth'

// Routes that don't require auth
const PUBLIC_ADMIN_ROUTES = ['/admin/login']

export default async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Only protect admin routes
  if (!pathname.startsWith('/admin')) {
    return NextResponse.next()
  }

  // Allow public admin routes (login page)
  if (PUBLIC_ADMIN_ROUTES.some(route => pathname.startsWith(route))) {
    return NextResponse.next()
  }

  // Check for auth token in cookies
  const token = req.cookies.get('auth_token')?.value

  if (!token) {
    const loginUrl = new URL('/admin/login', req.url)
    return NextResponse.redirect(loginUrl)
  }

  // Verify token
  const user = await verifyToken(token)
  if (!user || user.role !== 'admin') {
    const loginUrl = new URL('/admin/login', req.url)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
