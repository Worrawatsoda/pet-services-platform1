import { notFound } from "next/navigation"
import { SiteHeader } from "@/components/site-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, MapPin, Phone, Mail, Globe, CheckCircle2, AlertCircle } from "lucide-react"
import { mockVeterinaryClinics } from "@/lib/mock-data"
import Image from "next/image"
import Link from "next/link"
import { ReviewsSection } from "@/components/reviews-section"

export function generateStaticParams() {
  return mockVeterinaryClinics.map((clinic) => ({
    id: clinic.id,
  }))
}

export default function VeterinaryDetailPage({
  params,
}: {
  params: { id: string }
}) {
  const clinic = mockVeterinaryClinics.find((c) => c.id === params.id)

  if (!clinic) {
    notFound()
  }

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <main className="flex-1 py-8">
        <div className="container max-w-6xl">
          <Button variant="ghost" asChild className="mb-6">
            <Link href="/veterinary">← Back to Directory</Link>
          </Button>

          <div className="relative h-96 w-full rounded-xl overflow-hidden mb-8">
            <Image src={clinic.image || "/placeholder.svg"} alt={clinic.name} fill className="object-cover" />
            {clinic.emergency24_7 && (
              <Badge className="absolute top-4 right-4 bg-accent text-accent-foreground text-base px-4 py-2">
                24/7 Emergency Care
              </Badge>
            )}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h1 className="text-4xl font-bold mb-4 text-balance">{clinic.name}</h1>
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <Star className="h-5 w-5 fill-primary text-primary" />
                    <span className="text-xl font-semibold">{clinic.rating}</span>
                    <span className="text-muted-foreground">({clinic.reviewCount} reviews)</span>
                  </div>
                  {clinic.distance && (
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span>{clinic.distance} miles away</span>
                    </div>
                  )}
                </div>
                <p className="text-lg text-muted-foreground leading-relaxed">{clinic.description}</p>
              </div>

              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-semibold mb-4">Services Offered</h2>
                  <div className="flex flex-wrap gap-2">
                    {clinic.services.map((service) => (
                      <Badge key={service} variant="secondary" className="text-sm px-3 py-1">
                        {service}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-semibold mb-4">Hours of Operation</h2>
                  <div className="space-y-2">
                    {Object.entries(clinic.hours).map(([day, hours]) => (
                      <div key={day} className="flex justify-between py-2 border-b last:border-0">
                        <span className="font-medium capitalize">{day}</span>
                        <span className="text-muted-foreground">{hours}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-semibold mb-4">Features</h2>
                  <div className="space-y-3">
                    {clinic.acceptsWalkIns && (
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className="h-5 w-5 text-primary" />
                        <span>Accepts walk-in appointments</span>
                      </div>
                    )}
                    {clinic.emergency24_7 && (
                      <div className="flex items-center gap-3">
                        <AlertCircle className="h-5 w-5 text-accent" />
                        <span>24/7 emergency care available</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              <ReviewsSection
                providerId={clinic.id}
                providerType="veterinary"
                providerName={clinic.name}
                rating={clinic.rating}
                reviewCount={clinic.reviewCount}
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
                          {clinic.address}
                          <br />
                          {clinic.city}, {clinic.state} {clinic.zipCode}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Phone className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium">Phone</p>
                        <a href={`tel:${clinic.phone}`} className="text-sm text-primary hover:underline">
                          {clinic.phone}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Mail className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium">Email</p>
                        <a href={`mailto:${clinic.email}`} className="text-sm text-primary hover:underline break-all">
                          {clinic.email}
                        </a>
                      </div>
                    </div>

                    {clinic.website && (
                      <div className="flex items-start gap-3">
                        <Globe className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-medium">Website</p>
                          <a
                            href={clinic.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-primary hover:underline break-all"
                          >
                            Visit Website
                          </a>
                        </div>
                      </div>
                    )}
                  </div>

                  <Button className="w-full mt-4" size="lg">
                    <Phone className="h-4 w-4 mr-2" />
                    Call Now
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Quick Info</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Emergency Care</span>
                      <span className="font-medium">{clinic.emergency24_7 ? "24/7 Available" : "Not Available"}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Walk-ins</span>
                      <span className="font-medium">{clinic.acceptsWalkIns ? "Accepted" : "By Appointment"}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Services</span>
                      <span className="font-medium">{clinic.services.length} offered</span>
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
