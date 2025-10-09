"use client"

import type React from "react"

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, MapPin, Phone, Clock, CheckCircle2, Heart } from "lucide-react"
import type { VeterinaryClinic } from "@/lib/mock-data"
import Image from "next/image"
import { useAuth } from "@/lib/auth-context"

interface VeterinaryCardProps {
  clinic: VeterinaryClinic
}

export function VeterinaryCard({ clinic }: VeterinaryCardProps) {
  const { user, toggleFavoriteVet } = useAuth()
  const isFavorite = user?.favoriteVets?.includes(clinic.id) || false

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    toggleFavoriteVet(clinic.id)
  }

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-48 w-full bg-muted">
        <Image src={clinic.image || "/placeholder.svg"} alt={clinic.name} fill className="object-cover" />
        {clinic.emergency24_7 && (
          <Badge className="absolute top-3 right-3 bg-accent text-accent-foreground">24/7 Emergency</Badge>
        )}
        {user && user.userType === "pet-owner" && (
          <Button
            size="icon"
            variant="secondary"
            className="absolute top-3 left-3 h-9 w-9 rounded-full shadow-md hover:scale-110 transition-transform"
            onClick={handleFavoriteClick}
          >
            <Heart className={`h-5 w-5 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
          </Button>
        )}
      </div>

      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="text-xl font-semibold mb-1 text-balance">
              <Link href={`/veterinary/${clinic.id}`} className="hover:text-primary transition-colors">
                {clinic.name}
              </Link>
            </h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
              <MapPin className="h-4 w-4" />
              <span>
                {clinic.city}, {clinic.state}
              </span>
              {clinic.distance && <span className="text-primary font-medium">• {clinic.distance} mi</span>}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1 mb-4">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-primary text-primary" />
            <span className="font-semibold">{clinic.rating}</span>
          </div>
          <span className="text-sm text-muted-foreground">({clinic.reviewCount} reviews)</span>
        </div>

        <div className="space-y-3 mb-4">
          <div className="flex items-start gap-2 text-sm">
            <Phone className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
            <a href={`tel:${clinic.phone}`} className="hover:text-primary transition-colors">
              {clinic.phone}
            </a>
          </div>

          <div className="flex items-start gap-2 text-sm">
            <Clock className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
            <span className="text-muted-foreground">{clinic.hours.monday}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {clinic.services.slice(0, 3).map((service) => (
            <Badge key={service} variant="secondary" className="text-xs">
              {service}
            </Badge>
          ))}
          {clinic.services.length > 3 && (
            <Badge variant="secondary" className="text-xs">
              +{clinic.services.length - 3} more
            </Badge>
          )}
        </div>

        {clinic.acceptsWalkIns && (
          <div className="flex items-center gap-2 text-sm text-primary mb-4">
            <CheckCircle2 className="h-4 w-4" />
            <span>Accepts walk-ins</span>
          </div>
        )}

        <Button asChild className="w-full">
          <Link href={`/veterinary/${clinic.id}`}>View Details</Link>
        </Button>
      </CardContent>
    </Card>
  )
}
