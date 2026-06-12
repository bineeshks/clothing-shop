import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Eye } from 'lucide-react'

interface Order {
  _id: string
  customerName: string
  customerEmail: string
  totalAmount: number
  status: string
  createdAt: string
}

interface OrderTableProps {
  orders: Order[]
}

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  processing: 'bg-blue-100 text-blue-800',
  shipped: 'bg-purple-100 text-purple-800',
  delivered: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
}

export function OrderTable({ orders }: OrderTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left py-3 px-4 font-semibold text-foreground">Customer</th>
            <th className="text-left py-3 px-4 font-semibold text-foreground">Email</th>
            <th className="text-left py-3 px-4 font-semibold text-foreground">Amount</th>
            <th className="text-left py-3 px-4 font-semibold text-foreground">Status</th>
            <th className="text-left py-3 px-4 font-semibold text-foreground">Date</th>
            <th className="text-right py-3 px-4 font-semibold text-foreground">Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id} className="border-b border-border hover:bg-muted/50 transition-colors">
              <td className="py-4 px-4 font-medium text-foreground">{order.customerName}</td>
              <td className="py-4 px-4 text-muted-foreground text-sm">{order.customerEmail}</td>
              <td className="py-4 px-4 font-semibold text-foreground">Rs. {order.totalAmount.toFixed(2)}</td>
              <td className="py-4 px-4">
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                    statusColors[order.status] || 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
              </td>
              <td className="py-4 px-4 text-muted-foreground text-sm">
                {new Date(order.createdAt).toLocaleDateString()}
              </td>
              <td className="py-4 px-4 text-right">
                <Link href={`/admin/orders/${order._id}`}>
                  <Button variant="outline" size="sm" className="gap-1">
                    <Eye className="w-4 h-4" />
                    View
                  </Button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
