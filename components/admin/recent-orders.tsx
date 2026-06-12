import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

interface Order {
  _id: string
  customerName: string
  totalAmount: number
  status: string
  createdAt: string
}

interface RecentOrdersProps {
  orders: Order[]
}

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  processing: 'bg-blue-100 text-blue-800',
  shipped: 'bg-purple-100 text-purple-800',
  delivered: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
}

export function RecentOrders({ orders }: RecentOrdersProps) {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-semibold text-lg">Recent Orders</h3>
        <Link href="/admin/orders">
          <Button variant="ghost" size="sm">
            View All <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </Link>
      </div>

      {orders.length === 0 ? (
        <p className="text-muted-foreground text-center py-8">No orders yet</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <Link key={order._id} href={`/admin/orders/${order._id}`}>
              <div className="flex items-center justify-between p-4 hover:bg-muted rounded-lg transition-colors cursor-pointer">
                <div className="flex-1">
                  <p className="font-medium text-foreground">{order.customerName}</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-foreground">Rs. {order.totalAmount.toFixed(2)}</p>
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-medium mt-2 ${
                      statusColors[order.status] || 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </Card>
  )
}
