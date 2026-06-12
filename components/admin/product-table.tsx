import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Edit2, Trash2 } from 'lucide-react'

interface Product {
  _id: string
  name: string
  price: number
  category: string
  stock: number
  image: string
  createdAt: string
}

interface ProductTableProps {
  products: Product[]
  onDelete: (id: string) => void
}

export function ProductTable({ products, onDelete }: ProductTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left py-3 px-4 font-semibold text-foreground">Product</th>
            <th className="text-left py-3 px-4 font-semibold text-foreground">Category</th>
            <th className="text-left py-3 px-4 font-semibold text-foreground">Price</th>
            <th className="text-left py-3 px-4 font-semibold text-foreground">Stock</th>
            <th className="text-left py-3 px-4 font-semibold text-foreground">Created</th>
            <th className="text-right py-3 px-4 font-semibold text-foreground">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id} className="border-b border-border hover:bg-muted/50 transition-colors">
              <td className="py-4 px-4">
                <div className="flex items-center gap-3">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-10 h-10 rounded object-cover"
                  />
                  <span className="font-medium text-foreground">{product.name}</span>
                </div>
              </td>
              <td className="py-4 px-4 text-muted-foreground">{product.category}</td>
              <td className="py-4 px-4 font-semibold text-foreground">Rs. {product.price.toFixed(2)}</td>
              <td className="py-4 px-4">
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                  product.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {product.stock}
                </span>
              </td>
              <td className="py-4 px-4 text-muted-foreground text-sm">
                {new Date(product.createdAt).toLocaleDateString()}
              </td>
              <td className="py-4 px-4 text-right">
                <div className="flex items-center justify-end gap-2">
                  <Link href={`/admin/products/${product._id}/edit`}>
                    <Button variant="outline" size="sm" className="gap-1">
                      <Edit2 className="w-4 h-4" />
                      Edit
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onDelete(product._id)}
                    className="gap-1 text-destructive hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
