'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import {
  Menu,
  X,
  LayoutDashboard,
  Package,
  ShoppingCart,
  LogOut,
  MessageSquare,
  Image as ImageIcon,
  Settings,
  Star,
} from 'lucide-react'
import { cn } from '@/lib/utils'

export function AdminNav() {
  const router = useRouter()
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/admin/login')
  }

  const navItems = [
    {
      href: '/admin/dashboard',
      label: 'Dashboard',
      icon: <LayoutDashboard className="w-4 h-4" />,
    },
    {
      href: '/admin/products',
      label: 'Products',
      icon: <Package className="w-4 h-4" />,
    },
    {
      href: '/admin/orders',
      label: 'Orders',
      icon: <ShoppingCart className="w-4 h-4" />,
    },
    {
      href: '/admin/inquiries',
      label: 'Inquiries',
      icon: <MessageSquare className="w-4 h-4" />,
    },
    {
      href: '/admin/banners',
      label: 'Banners',
      icon: <ImageIcon className="w-4 h-4" />,
    },
    {
      href: '/admin/testimonials',
      label: 'Testimonials',
      icon: <Star className="w-4 h-4" />,
    },
    {
      href: '/admin/settings',
      label: 'Settings',
      icon: <Settings className="w-4 h-4" />,
    },
  ]

  return (
    <nav className="bg-card border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/admin/dashboard" className="flex items-center gap-2">
            <div className="font-serif text-xl font-bold text-primary">
              Vellora Admin
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map(item => (
              <Link key={item.href} href={item.href}>
                <Button
                  variant="ghost"
                  size="sm"
                  className={cn(
                    'gap-2',
                    pathname === item.href &&
                      'bg-primary/10 text-primary hover:bg-primary/10'
                  )}
                >
                  {item.icon}
                  {item.label}
                </Button>
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="gap-2"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </Button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 hover:bg-muted rounded-lg"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden pb-4 grid grid-cols-2 gap-1">
            {navItems.map(item => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
              >
                <Button
                  variant="ghost"
                  className={cn(
                    'w-full justify-start gap-2',
                    pathname === item.href &&
                      'bg-primary/10 text-primary'
                  )}
                >
                  {item.icon}
                  {item.label}
                </Button>
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}
