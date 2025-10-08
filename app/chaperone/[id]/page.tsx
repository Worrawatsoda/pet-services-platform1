import { notFound } from "next/navigation"
import { SiteHeader } from "@/components/site-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, MapPin, Phone, Mail, Clock, Shield, Car, CheckCircle2, DollarSign } from "lucide-react"
import { mockPetChaperones } from "@/lib/mock-data"
import Image from "next/image"
import Link from "next/link"
import { ReviewsSection } from "@/components/reviews-section"

export function generateStaticParams() {
  return mockPetChaperones.map((chaperone) => ({
    id: chaperone.id,
  }))
}

export default function ChaperoneDetailPage({
  params,
}: {
  params: { id: string }
}) {
  const chaperone = mockPetChaperones.find((c) => c.id === params.id)

  if (!chaperone) {
    notFound()
  }

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <main className="flex-1 py-8">
        <div className="container max-w-6xl">
          <Button variant="ghost" asChild className="mb-6">
            <Link href="/chaperone">← Back to Directory</Link>
          </Button>

          <div className="relative h-96 w-full rounded-xl overflow-hidden mb-8">
            <Image
              src={chaperone.image || "/placeholder.svg"}
              alt={chaperone.businessName || chaperone.name}
              fill
              className="object-cover"
            />
            <div className="absolute top-4 right-4 flex gap-2">
              {chaperone.licensed && (
                <Badge className="bg-primary text-primary-foreground text-base px-4 py-2">Licensed</Badge>
              )}
              {chaperone.insured && (
                <Badge className="bg-accent text-accent-foreground text-base px-4 py-2">Insured</Badge>
              )}
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h1 className="text-4xl font-bold mb-2 text-balance">{chaperone.businessName || chaperone.name}</h1>
                {chaperone.businessName && (
                  <p className="text-xl text-muted-foreground mb-4">Operated by {chaperone.name}</p>
                )}
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <Star className="h-5 w-5 fill-primary text-primary" />
                    <span className="text-xl font-semibold">{chaperone.rating}</span>
                    <span className="text-muted-foreground">({chaperone.reviewCount} reviews)</span>
                  </div>
                  {chaperone.distance && (
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span>{chaperone.distance} miles away</span>
                    </div>
                  )}
                </div>
                <p className="text-lg text-muted-foreground leading-relaxed">{chaperone.description}</p>
              </div>

              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-semibold mb-4">Services Offered</h2>
                  <div className="flex flex-wrap gap-2">
                    {chaperone.services.map((service) => (
                      <Badge key={service} variant="secondary" className="text-sm px-3 py-1">
                        {service}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <Car className="h-5 w-5 text-primary" />
                      <h3 className="text-xl font-semibold">Vehicle Types</h3>
                    </div>
                    <ul className="space-y-2">
                      {chaperone.vehicleTypes.map((vehicle) => (
                        <li key={vehicle} className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-primary" />
                          <span>{vehicle}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <Shield className="h-5 w-5 text-primary" />
                      <h3 className="text-xl font-semibold">Pet Types</h3>
                    </div>
                    <ul className="space-y-2">
                      {chaperone.petTypes.map((pet) => (
                        <li key={pet} className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-primary" />
                          <span>{pet}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-semibold mb-4">Experience & Credentials</h2>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <div className="text-3xl font-bold text-primary mb-1">{chaperone.yearsExperience}</div>
                      <p className="text-sm text-muted-foreground">Years of Experience</p>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-primary mb-1">{chaperone.licensed ? "✓" : "✗"}</div>
                      <p className="text-sm text-muted-foreground">Licensed Professional</p>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-primary mb-1">{chaperone.insured ? "✓" : "✗"}</div>
                      <p className="text-sm text-muted-foreground">Fully Insured</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <ReviewsSection
                providerId={chaperone.id}
                providerType="chaperone"
                providerName={chaperone.businessName || chaperone.name}
                rating={chaperone.rating}
                reviewCount={chaperone.reviewCount}
              />
            </div>

            <div className="space-y-6">
              <Card>
                <CardContent className="p-6 space-y-4">
                  <h3 className="text-xl font-semibold mb-4">Contact Information</h3>

                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium">Address</p>
                        <p className="text-sm text-muted-foreground">
                          {chaperone.address}
                          <br />
                          {chaperone.city}, {chaperone.state} {chaperone.zipCode}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Phone className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium">Phone</p>
                        <a href={`tel:${chaperone.phone}`} className="text-sm text-primary hover:underline">
                          {chaperone.phone}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Mail className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium">Email</p>
                        <a
                          href={`mailto:${chaperone.email}`}
                          className="text-sm text-primary hover:underline break-all"
                        >
                          {chaperone.email}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Clock className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium">Availability</p>
                        <p className="text-sm text-muted-foreground">{chaperone.availability}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <DollarSign className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium">Price Range</p>
                        <p className="text-sm text-muted-foreground">{chaperone.priceRange}</p>
                      </div>
                    </div>
                  </div>

                  <Button className="w-full mt-4" size="lg">
                    <Phone className="h-4 w-4 mr-2" />
                    Contact Now
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Quick Stats</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Rating</span>
                      <span className="font-medium">{chaperone.rating} / 5.0</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Reviews</span>
                      <span className="font-medium">{chaperone.reviewCount}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Experience</span>
                      <span className="font-medium">{chaperone.yearsExperience} years</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Services</span>
                      <span className="font-medium">{chaperone.services.length} offered</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
