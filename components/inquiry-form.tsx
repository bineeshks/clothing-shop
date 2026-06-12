'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Check, Loader2, MessageSquare } from 'lucide-react'

interface InquiryFormProps {
  open: boolean
  onClose: () => void
  productId?: string
  productName?: string
  selectedSize?: string
  selectedColor?: string
}

export function InquiryForm({
  open,
  onClose,
  productId = '',
  productName = '',
  selectedSize = '',
  selectedColor = '',
}: InquiryFormProps) {
  const [formData, setFormData] = useState({
    customerName: '',
    phone: '',
    whatsappNumber: '',
    message: '',
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          productId,
          productName,
          size: selectedSize,
          color: selectedColor,
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        setError(data.error || 'Failed to submit inquiry')
        return
      }

      setSuccess(true)
      setTimeout(() => {
        setSuccess(false)
        onClose()
        setFormData({
          customerName: '',
          phone: '',
          whatsappNumber: '',
          message: '',
        })
      }, 2000)
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl">
            Send Inquiry
          </DialogTitle>
          <DialogDescription>
            {productName && (
              <span className="font-medium text-foreground">
                {productName}
              </span>
            )}
            {productName && ' — '}
            We'll get back to you as soon as possible.
          </DialogDescription>
        </DialogHeader>

        {success ? (
          <div className="flex flex-col items-center justify-center py-8 gap-4">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <Check className="w-8 h-8 text-primary" />
            </div>
            <p className="text-lg font-semibold text-foreground">
              Inquiry Sent!
            </p>
            <p className="text-muted-foreground text-center">
              We've received your inquiry and will contact you shortly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Product details read-only */}
            {(productName || selectedSize || selectedColor) && (
              <div className="p-3 bg-muted rounded-lg space-y-1 text-sm">
                {productName && (
                  <p>
                    <span className="text-muted-foreground">Product: </span>
                    <span className="font-medium">{productName}</span>
                  </p>
                )}
                {selectedSize && (
                  <p>
                    <span className="text-muted-foreground">Size: </span>
                    <span className="font-medium">{selectedSize}</span>
                  </p>
                )}
                {selectedColor && (
                  <p>
                    <span className="text-muted-foreground">Color: </span>
                    <span className="font-medium">{selectedColor}</span>
                  </p>
                )}
              </div>
            )}

            {error && (
              <div className="p-3 bg-destructive/10 border border-destructive rounded-lg">
                <p className="text-destructive text-sm">{error}</p>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium mb-1.5">
                Your Name *
              </label>
              <Input
                name="customerName"
                value={formData.customerName}
                onChange={handleChange}
                placeholder="e.g. Amara Kebede"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5">
                Phone Number *
              </label>
              <Input
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+251 912 345 678"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5">
                WhatsApp Number
                <span className="text-muted-foreground font-normal ml-1">
                  (optional, if different)
                </span>
              </label>
              <Input
                name="whatsappNumber"
                type="tel"
                value={formData.whatsappNumber}
                onChange={handleChange}
                placeholder="+251 912 345 678"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5">
                Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Any specific requirements or questions..."
                rows={3}
                className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            <div className="flex gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={loading}
                className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Send Inquiry
                  </>
                )}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
