'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { useCart } from '@/app/providers'
import { Button } from '@/components/ui/button'
import { Menu, X, ShoppingBag, Search } from 'lucide-react'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { totalItems } = useCart()

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/shop', label: 'Shop' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ]

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex flex-col justify-center">
            <span className="font-serif text-3xl font-medium tracking-[0.1em] uppercase text-foreground leading-none">
              Vellora
            </span>
            <span className="text-[0.55rem] uppercase tracking-[0.3em] text-muted-foreground mt-1 ml-1">
              Luxury Studio
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="text-foreground hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right side icons */}
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-muted rounded-full transition-colors hidden sm:flex">
              <Search className="w-5 h-5" />
            </button>
            <Link href="/cart" className="relative">
              <button className="p-2 hover:bg-muted rounded-full transition-colors">
                <ShoppingBag className="w-5 h-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </button>
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 hover:bg-muted rounded-full transition-colors"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-4 py-2 text-foreground hover:bg-muted rounded transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}
