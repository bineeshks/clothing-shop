'use client'

import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { useCart } from '@/app/providers'
import { getProductById } from '@/lib/products'
import { WhatsAppButton } from '@/components/whatsapp-button'
import { Button } from '@/components/ui/button'
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function CartPage() {
  const { items, removeItem, updateQuantity } = useCart()

  const cartItems = items.map(item => {
    const product = getProductById(item.productId)
    return { ...item, product }
  })

  const subtotal = cartItems.reduce((sum, item) => {
    if (!item.product) return sum
    return sum + item.product.price * item.quantity
  }, 0)

  const shipping = subtotal > 50 ? 0 : 10
  const tax = subtotal * 0.05
  const total = subtotal + shipping + tax

  const cartMessage = items
    .map(item => {
      const product = getProductById(item.productId)
      if (!product) return ''
      return `${product.name} - Qty: ${item.quantity}${
        item.size ? ` (Size: ${item.size})` : ''
      }${item.color ? ` (Color: ${item.color})` : ''}`
    })
    .filter(Boolean)
    .join('\n')

  const whatsappMessage = `Hi! I'd like to order:\n\n${cartMessage}\n\nSubtotal: Rs. ${subtotal.toFixed(2)}\nShipping: Rs. ${shipping.toFixed(2)}\nTax: Rs. ${tax.toFixed(2)}\nTotal: Rs. ${total.toFixed(2)}\n\nPlease confirm availability and provide payment details.`

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="font-serif text-4xl font-bold mb-8">Shopping Cart</h1>

          {items.length === 0 ? (
            <div className="text-center py-16">
              <ShoppingBag className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <h2 className="font-serif text-2xl font-semibold mb-2">Your cart is empty</h2>
              <p className="text-muted-foreground mb-6">
                Explore our collection and add some beautiful pieces!
              </p>
              <Link href="/shop">
                <Button className="bg-primary hover:bg-primary/90">
                  Continue Shopping
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {cartItems.map(item => (
                  <div
                    key={`${item.productId}-${item.size}-${item.color}`}
                    className="flex gap-4 pb-4 border-b border-border"
                  >
                    {item.product && (
                      <>
                        <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                          <Image
                            src={item.product.image}
                            alt={item.product.name}
                            fill
                            className="object-cover"
                          />
                        </div>

                        <div className="flex-grow">
                          <Link href={`/product/${item.productId}`}>
                            <h3 className="font-semibold hover:text-primary">
                              {item.product.name}
                            </h3>
                          </Link>
                          <p className="text-sm text-muted-foreground">
                            Rs. {item.product.price}
                          </p>
                          {item.size && (
                            <p className="text-xs text-muted-foreground">
                              Size: {item.size}
                            </p>
                          )}
                          {item.color && (
                            <p className="text-xs text-muted-foreground">
                              Color: {item.color}
                            </p>
                          )}

                          <div className="flex items-center gap-2 mt-2">
                            <button
                              onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                              className="p-1 hover:bg-muted rounded"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="w-8 text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                              className="p-1 hover:bg-muted rounded"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => removeItem(item.productId)}
                              className="ml-auto p-1 hover:bg-destructive/10 text-destructive rounded"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        <div className="text-right">
                          <p className="font-semibold">
                            Rs. {(item.product.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="bg-card rounded-lg p-6 border border-border h-fit">
                <h2 className="font-serif text-2xl font-semibold mb-6">Order Summary</h2>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal</span>
                    <span>Rs. {subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? 'Free' : `Rs. ${shipping.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Tax (Estimated)</span>
                    <span>Rs. {tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg pt-4 border-t border-border">
                    <span>Total</span>
                    <span className="text-primary">Rs. {total.toFixed(2)}</span>
                  </div>
                </div>

                {subtotal > 50 && (
                  <p className="text-sm text-green-600 mb-4 bg-green-50 p-2 rounded">
                    ✓ Free shipping applied!
                  </p>
                )}

                <WhatsAppButton
                  message={whatsappMessage}
                  className="w-full mb-3"
                  variant="primary"
                />

                <Link href="/shop" className="block">
                  <Button
                    variant="outline"
                    className="w-full border-primary text-primary"
                  >
                    Continue Shopping
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
