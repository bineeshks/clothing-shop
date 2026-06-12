import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { CartProvider } from './providers'
import { Toaster } from '@/components/ui/toaster'
import { SmoothScrolling } from '@/components/smooth-scrolling'
import './globals.css'

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://vellora.com'

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: 'Vellora | Luxury Ethical Fashion',
  description: 'Discover premium ethical fashion with Vellora. Handcrafted pieces combining tradition, sustainability, and modern elegance.',
  generator: 'v0.app',
  keywords: ['ethical fashion', 'luxury clothing', 'sustainable fashion', 'Vellora', 'handcrafted clothing', 'African fashion'],
  authors: [{ name: 'Vellora' }],
  creator: 'Vellora',
  publisher: 'Vellora',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'Vellora | Luxury Ethical Fashion',
    description: 'Premium ethical clothing — handcrafted in Africa, designed for the world.',
    url: baseUrl,
    siteName: 'Vellora',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vellora | Luxury Ethical Fashion',
    description: 'Premium ethical clothing handcrafted with love.',
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${playfairDisplay.variable} ${inter.variable}`} data-scroll-behavior="smooth">
      <body className="bg-background font-sans antialiased flex flex-col min-h-screen">
        <CartProvider>
          <SmoothScrolling>
            {children}
            <Toaster />
          </SmoothScrolling>
        </CartProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
