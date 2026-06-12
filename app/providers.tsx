'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export interface CartItem {
  productId: string
  quantity: number
  size?: string
  color?: string
}

interface CartContextType {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  totalItems: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isHydrated, setIsHydrated] = useState(false)

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('vellora-cart')
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart))
      } catch (error) {
        console.error('Failed to load cart:', error)
      }
    }
    setIsHydrated(true)
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem('vellora-cart', JSON.stringify(items))
    }
  }, [items, isHydrated])

  const addItem = (newItem: CartItem) => {
    setItems(prevItems => {
      const existingItem = prevItems.find(
        item =>
          item.productId === newItem.productId &&
          item.size === newItem.size &&
          item.color === newItem.color
      )

      if (existingItem) {
        return prevItems.map(item =>
          item === existingItem ? { ...item, quantity: item.quantity + newItem.quantity } : item
        )
      }

      return [...prevItems, newItem]
    })
  }

  const removeItem = (productId: string) => {
    setItems(prevItems => prevItems.filter(item => item.productId !== productId))
  }

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId)
    } else {
      setItems(prevItems =>
        prevItems.map(item =>
          item.productId === productId ? { ...item, quantity } : item
        )
      )
    }
  }

  const clearCart = () => {
    setItems([])
  }

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, clearCart, totalItems }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
