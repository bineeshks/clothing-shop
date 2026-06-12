'use client'

import { MessageCircle, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface WhatsAppButtonProps {
  productName?: string
  size?: string
  color?: string
  price?: number | string
  message?: string
  phoneNumber?: string
  mode?: 'order' | 'enquire' | 'both'
  className?: string
}

function buildWhatsAppMessage({
  productName,
  size,
  color,
  price,
  message,
}: Omit<WhatsAppButtonProps, 'phoneNumber' | 'mode' | 'className'>) {
  if (message) return message

  const lines = [`Hello, I'm interested in:`]
  if (productName) lines.push(`Product Name: ${productName}`)
  if (size) lines.push(`Size: ${size}`)
  if (color) lines.push(`Color: ${color}`)
  if (price) lines.push(`Price: Rs. ${price}`)
  lines.push(`\nPlease provide more details.`)

  return lines.join('\n')
}

function openWhatsApp(phoneNumber: string, msg: string) {
  const cleaned = phoneNumber.replace(/\D/g, '')
  const encoded = encodeURIComponent(msg)
  window.open(`https://wa.me/${cleaned}?text=${encoded}`, '_blank')
}

export function WhatsAppButton({
  productName,
  size,
  color,
  price,
  message,
  phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+919000000000',
  mode = 'both',
  className,
}: WhatsAppButtonProps) {
  const msg = buildWhatsAppMessage({ productName, size, color, price, message })

  const orderMsg = `Hello, I would like to ORDER:\n${productName ? `Product: ${productName}` : ''}\n${size ? `Size: ${size}` : ''}\n${color ? `Color: ${color}` : ''}\n${price ? `Price: Rs. ${price}` : ''}\n\nPlease confirm availability and next steps.`

  if (mode === 'order') {
    return (
      <Button
        onClick={() => openWhatsApp(phoneNumber, orderMsg)}
        className={cn(
          'w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold',
          className
        )}
      >
        <MessageCircle className="w-4 h-4 mr-2" />
        Order on WhatsApp
      </Button>
    )
  }

  if (mode === 'enquire') {
    return (
      <Button
        onClick={() => openWhatsApp(phoneNumber, msg)}
        variant="outline"
        className={cn(
          'w-full border-accent text-accent hover:bg-accent/10 font-semibold',
          className
        )}
      >
        <Phone className="w-4 h-4 mr-2" />
        Enquire on WhatsApp
      </Button>
    )
  }

  // Both buttons
  return (
    <div className={cn('flex flex-col gap-3', className)}>
      <Button
        onClick={() => openWhatsApp(phoneNumber, orderMsg)}
        className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold"
      >
        <MessageCircle className="w-4 h-4 mr-2" />
        Order on WhatsApp
      </Button>
      <Button
        onClick={() => openWhatsApp(phoneNumber, msg)}
        variant="outline"
        className="w-full border-accent text-accent hover:bg-accent/10 font-semibold"
      >
        <Phone className="w-4 h-4 mr-2" />
        Enquire on WhatsApp
      </Button>
    </div>
  )
}
