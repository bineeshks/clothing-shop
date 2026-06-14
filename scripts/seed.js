require('dotenv').config({ path: '.env' })
const mongoose = require('mongoose')
const bcryptjs = require('bcryptjs')

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/vellora'

// User Schema
const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  name: String,
  role: String,
  createdAt: Date,
  updatedAt: Date,
})

// Product Schema
const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  category: String,
  image: String,
  rating: Number,
  reviews: Number,
  colors: [String],
  sizes: [String],
  stock: Number,
  createdAt: Date,
  updatedAt: Date,
})

// Order Schema
const orderSchema = new mongoose.Schema({
  customerName: String,
  customerEmail: String,
  customerPhone: String,
  items: Array,
  totalAmount: Number,
  status: String,
  shippingAddress: String,
  notes: String,
  createdAt: Date,
  updatedAt: Date,
})

const User = mongoose.model('User', userSchema)
const Product = mongoose.model('Product', productSchema)
const Order = mongoose.model('Order', orderSchema)

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI)
    console.log('Connected to MongoDB')

    // Clear existing data
    await User.deleteMany({})
    await Product.deleteMany({})
    await Order.deleteMany({})
    console.log('Cleared existing data')

    // Create admin user
    const hashedPassword = await bcryptjs.hash('admin123', 10)
    const adminUser = await User.create({
      email: 'admin@vellora.com',
      password: hashedPassword,
      name: 'Admin User',
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    console.log('Created admin user:', adminUser.email)

    // Create sample products
    const products = [
      {
        name: 'Forest Green Silk Dress',
        description: 'Luxurious floor-length evening dress with hand-stitched details',
        price: 285,
        category: 'Dresses',
        image: '/placeholder-dress-green.jpg',
        rating: 4.8,
        reviews: 124,
        colors: ['Forest Green', 'Black', 'Ivory'],
        sizes: ['XS', 'S', 'M', 'L', 'XL'],
        stock: 15,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Handwoven Gold Clutch',
        description: 'Artisan-crafted evening clutch with leather trim',
        price: 145,
        category: 'Accessories',
        image: '/placeholder-clutch-gold.jpg',
        rating: 4.9,
        reviews: 89,
        colors: ['Gold', 'Silver', 'Copper'],
        sizes: ['One Size'],
        stock: 25,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Organic Linen Blazer',
        description: 'Tailored blazer with hand-finished seams',
        price: 195,
        category: 'Outerwear',
        image: '/placeholder-blazer-beige.jpg',
        rating: 4.7,
        reviews: 56,
        colors: ['Beige', 'Navy', 'Black'],
        sizes: ['XS', 'S', 'M', 'L', 'XL'],
        stock: 12,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Modern Asymmetric Top',
        description: 'Contemporary fashion piece with geometric design',
        price: 95,
        category: 'Dresses',
        image: '/placeholder-top-black.jpg',
        rating: 4.6,
        reviews: 42,
        colors: ['Black', 'White', 'Grey'],
        sizes: ['XS', 'S', 'M', 'L', 'XL'],
        stock: 30,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'High-Waisted Linen Pants',
        description: 'Relaxed fit pants with pleated front in natural linen',
        price: 165,
        category: 'Dresses',
        image: '/placeholder-pants-beige.jpg',
        rating: 4.8,
        reviews: 78,
        colors: ['Beige', 'White', 'Black'],
        sizes: ['XS', 'S', 'M', 'L', 'XL'],
        stock: 18,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Handcrafted Beaded Necklace',
        description: 'Artisan jewelry with reclaimed beads and 18k gold vermeil',
        price: 125,
        category: 'Accessories',
        image: '/placeholder-necklace-gold.jpg',
        rating: 5,
        reviews: 34,
        colors: ['Gold', 'Rose Gold'],
        sizes: ['One Size'],
        stock: 20,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Navy Wrap Dress',
        description: 'Versatile wrap dress perfect for office to evening wear',
        price: 205,
        category: 'Dresses',
        image: '/placeholder-dress-navy.jpg',
        rating: 4.9,
        reviews: 112,
        colors: ['Navy', 'Black', 'Burgundy'],
        sizes: ['XS', 'S', 'M', 'L', 'XL'],
        stock: 22,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Premium Cashmere Cardigan',
        description: 'Grade A cashmere with mother-of-pearl buttons',
        price: 325,
        category: 'Outerwear',
        image: '/placeholder-cardigan-cream.jpg',
        rating: 5,
        reviews: 67,
        colors: ['Cream', 'Grey', 'Navy'],
        sizes: ['XS', 'S', 'M', 'L', 'XL'],
        stock: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]

    const createdProducts = await Product.insertMany(products)
    console.log('Created', createdProducts.length, 'products')

    // Create sample orders
    const sampleOrders = [
      {
        customerName: 'Sarah Johnson',
        customerEmail: 'sarah@example.com',
        customerPhone: '+1 (555) 123-4567',
        items: [
          { productId: createdProducts[0]._id, quantity: 1, price: 285 },
          { productId: createdProducts[1]._id, quantity: 1, price: 145 },
        ],
        totalAmount: 430,
        status: 'delivered',
        shippingAddress: '123 Main St, New York, NY 10001',
        notes: 'Arrived in perfect condition',
        createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      },
      {
        customerName: 'Emma Davis',
        customerEmail: 'emma@example.com',
        customerPhone: '+1 (555) 234-5678',
        items: [
          { productId: createdProducts[2]._id, quantity: 1, price: 195 },
        ],
        totalAmount: 195,
        status: 'shipped',
        shippingAddress: '456 Oak Ave, Los Angeles, CA 90001',
        notes: '',
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      },
      {
        customerName: 'Michael Chen',
        customerEmail: 'michael@example.com',
        customerPhone: '+1 (555) 345-6789',
        items: [
          { productId: createdProducts[3]._id, quantity: 2, price: 95 },
          { productId: createdProducts[5]._id, quantity: 1, price: 125 },
        ],
        totalAmount: 315,
        status: 'processing',
        shippingAddress: '789 Pine Rd, Chicago, IL 60601',
        notes: 'Customer requested expedited shipping',
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      },
      {
        customerName: 'Jessica Martinez',
        customerEmail: 'jessica@example.com',
        customerPhone: '+1 (555) 456-7890',
        items: [
          { productId: createdProducts[6]._id, quantity: 1, price: 205 },
        ],
        totalAmount: 205,
        status: 'pending',
        shippingAddress: '321 Elm St, Houston, TX 77001',
        notes: '',
        createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000),
        updatedAt: new Date(Date.now() - 12 * 60 * 60 * 1000),
      },
      {
        customerName: 'David Wilson',
        customerEmail: 'david@example.com',
        customerPhone: '+1 (555) 567-8901',
        items: [
          { productId: createdProducts[7]._id, quantity: 1, price: 325 },
          { productId: createdProducts[4]._id, quantity: 1, price: 165 },
        ],
        totalAmount: 490,
        status: 'delivered',
        shippingAddress: '654 Maple Dr, Phoenix, AZ 85001',
        notes: 'Premium items - customer very satisfied',
        createdAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000),
      },
    ]

    const createdOrders = await Order.insertMany(sampleOrders)
    console.log('Created', createdOrders.length, 'sample orders')

    console.log('\n✓ Database seeded successfully!')
    console.log('\nDemo Admin Credentials:')
    console.log('Email: admin@vellora.com')
    console.log('Password: admin123')

    process.exit(0)
  } catch (error) {
    console.error('Error seeding database:', error)
    process.exit(1)
  }
}

seed()
