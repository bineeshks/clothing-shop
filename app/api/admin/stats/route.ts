import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/db'
import Product from '@/lib/models/Product'
import Order from '@/lib/models/Order'
import { getCurrentUser } from '@/lib/auth'

export async function GET(req: NextRequest) {
  try {
    const user = await getCurrentUser()
    if (!user || user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    await connectDB()

    // Get stats
    const totalProducts = await Product.countDocuments({})
    const totalOrders = await Order.countDocuments({})
    const totalRevenue = await Order.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: '$totalAmount' },
        },
      },
    ])

    const pendingOrders = await Order.countDocuments({ status: 'pending' })

    // Get recent orders
    const recentOrders = await Order.find({})
      .sort({ createdAt: -1 })
      .limit(5)

    // Get orders by status
    const ordersByStatus = await Order.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
        },
      },
    ])

    const stats = {
      totalProducts,
      totalOrders,
      totalRevenue: totalRevenue[0]?.total || 0,
      pendingOrders,
      recentOrders,
      ordersByStatus: ordersByStatus.reduce(
        (acc, item) => {
          acc[item._id] = item.count
          return acc
        },
        {}
      ),
    }

    return NextResponse.json({ stats }, { status: 200 })
  } catch (error) {
    console.error('[v0] Dashboard stats error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    )
  }
}
