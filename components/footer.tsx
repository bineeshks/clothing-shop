import Link from 'next/link'
import { Instagram, Facebook, Twitter, Mail, MapPin } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-background border-t border-border/40 relative overflow-hidden">
      <div className="absolute inset-0 bg-noise opacity-5 pointer-events-none mix-blend-overlay" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8 mb-16">
          
          {/* Brand & Vision */}
          <div className="md:col-span-4 lg:col-span-5">
            <h3 className="font-serif text-3xl font-medium mb-6 tracking-tight">Vellora</h3>
            <p className="text-muted-foreground leading-relaxed max-w-sm font-light text-sm">
              Defining modern luxury through sustainable practices and impeccable craftsmanship. Handcrafted in Africa, designed for the world.
            </p>
          </div>

          {/* Shop Links */}
          <div className="md:col-span-2 lg:col-span-2">
            <h4 className="font-semibold mb-6 text-sm uppercase tracking-widest">Shop</h4>
            <ul className="space-y-4 text-sm font-light">
              <li>
                <Link href="/shop?category=Dresses" className="text-muted-foreground hover:text-foreground transition-colors">
                  Dresses
                </Link>
              </li>
              <li>
                <Link href="/shop?category=Tops" className="text-muted-foreground hover:text-foreground transition-colors">
                  Tops
                </Link>
              </li>
              <li>
                <Link href="/shop?category=Accessories" className="text-muted-foreground hover:text-foreground transition-colors">
                  Accessories
                </Link>
              </li>
              <li>
                <Link href="/shop" className="text-muted-foreground hover:text-foreground transition-colors">
                  New Arrivals
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div className="md:col-span-2 lg:col-span-2">
            <h4 className="font-semibold mb-6 text-sm uppercase tracking-widest">About</h4>
            <ul className="space-y-4 text-sm font-light">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                  Our Story
                </Link>
              </li>
              <li>
                <Link href="/sustainability" className="text-muted-foreground hover:text-foreground transition-colors">
                  Sustainability
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div className="md:col-span-4 lg:col-span-3">
            <h4 className="font-semibold mb-6 text-sm uppercase tracking-widest">Connect</h4>
            <ul className="space-y-4 text-sm font-light mb-8">
              <li className="flex items-start gap-3 text-muted-foreground hover:text-foreground transition-colors">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>Addis Ababa, Ethiopia</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 flex-shrink-0 text-muted-foreground" />
                <a href="mailto:hello@vellora.com" className="text-muted-foreground hover:text-foreground transition-colors">
                  hello@vellora.com
                </a>
              </li>
            </ul>
            
            <div className="flex gap-4">
              <a href="#" className="p-2 rounded-full border border-border/50 text-muted-foreground hover:text-foreground hover:border-foreground transition-all">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-full border border-border/50 text-muted-foreground hover:text-foreground hover:border-foreground transition-all">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-full border border-border/50 text-muted-foreground hover:text-foreground hover:border-foreground transition-all">
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border/40 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-xs font-light text-muted-foreground">
            <p>&copy; {currentYear} Vellora Clothing. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link>
              <Link href="/shipping" className="hover:text-foreground transition-colors">Shipping & Returns</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
