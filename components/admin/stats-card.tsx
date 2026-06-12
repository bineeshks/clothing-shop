import { Card } from '@/components/ui/card'

interface StatsCardProps {
  title: string
  value: string | number
  icon: React.ReactNode
  trend: string
}

export function StatsCard({ title, value, icon, trend }: StatsCardProps) {
  return (
    <Card className="p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-3xl font-bold text-foreground mt-2">{value}</p>
          <p className="text-sm text-muted-foreground mt-3">{trend}</p>
        </div>
        <div className="text-primary/50">{icon}</div>
      </div>
    </Card>
  )
}
