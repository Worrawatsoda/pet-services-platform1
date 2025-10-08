import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import type { LucideIcon } from "lucide-react"

interface ServiceCardProps {
  title: string
  description: string
  icon: LucideIcon
  href: string
  iconBgColor: string
  iconColor: string
}

export function ServiceCard({ title, description, icon: Icon, href, iconBgColor, iconColor }: ServiceCardProps) {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/50">
      <CardContent className="p-8">
        <div className={`inline-flex h-14 w-14 items-center justify-center rounded-xl ${iconBgColor} mb-6`}>
          <Icon className={`h-7 w-7 ${iconColor}`} />
        </div>
        <h3 className="text-2xl font-semibold mb-3 text-balance">{title}</h3>
        <p className="text-muted-foreground mb-6 leading-relaxed text-pretty">{description}</p>
        <Button asChild className="w-full group-hover:shadow-md transition-shadow">
          <Link href={href}>Browse {title}</Link>
        </Button>
      </CardContent>
    </Card>
  )
}
