import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, MapPin, Clock, Shield, Car } from "lucide-react"
import type { PetChaperone } from "@/lib/mock-data"
import Image from "next/image"

interface ChaperoneCardProps {
  chaperone: PetChaperone
}

export function ChaperoneCard({ chaperone }: ChaperoneCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-48 w-full bg-muted">
        <Image
          src={chaperone.image || "/placeholder.svg"}
          alt={chaperone.businessName || chaperone.name}
          fill
          className="object-cover"
        />
        <div className="absolute top-3 right-3 flex gap-2">
          {chaperone.licensed && <Badge className="bg-primary text-primary-foreground">Licensed</Badge>}
          {chaperone.insured && <Badge className="bg-accent text-accent-foreground">Insured</Badge>}
        </div>
      </div>

      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="text-xl font-semibold mb-1 text-balance">
              <Link href={`/chaperone/${chaperone.id}`} className="hover:text-primary transition-colors">
                {chaperone.businessName || chaperone.name}
              </Link>
            </h3>
            {chaperone.businessName && <p className="text-sm text-muted-foreground mb-2">{chaperone.name}</p>}
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>
                {chaperone.city}, {chaperone.state}
              </span>
              {chaperone.distance && <span className="text-primary font-medium">• {chaperone.distance} mi</span>}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1 mb-4">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-primary text-primary" />
            <span className="font-semibold">{chaperone.rating}</span>
          </div>
          <span className="text-sm text-muted-foreground">({chaperone.reviewCount} reviews)</span>
          <span className="ml-auto text-sm font-medium text-muted-foreground">{chaperone.priceRange}</span>
        </div>

        <div className="space-y-3 mb-4">
          <div className="flex items-start gap-2 text-sm">
            <Car className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
            <span className="text-muted-foreground">{chaperone.vehicleTypes.join(", ")}</span>
          </div>

          <div className="flex items-start gap-2 text-sm">
            <Clock className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
            <span className="text-muted-foreground">{chaperone.availability}</span>
          </div>

          <div className="flex items-start gap-2 text-sm">
            <Shield className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
            <span className="text-muted-foreground">{chaperone.yearsExperience} years experience</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {chaperone.services.slice(0, 3).map((service) => (
            <Badge key={service} variant="secondary" className="text-xs">
              {service}
            </Badge>
          ))}
          {chaperone.services.length > 3 && (
            <Badge variant="secondary" className="text-xs">
              +{chaperone.services.length - 3} more
            </Badge>
          )}
        </div>

        <Button asChild className="w-full">
          <Link href={`/chaperone/${chaperone.id}`}>View Profile</Link>
        </Button>
      </CardContent>
    </Card>
  )
}
