"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/lib/auth-context"
import { Loader2, Heart, Star, Settings, PawPrint } from "lucide-react"
import { AddPetDialog } from "@/components/add-pet-dialog"
import { PetProfileCard } from "@/components/pet-profile-card"
import { veterinaryClinics, chaperones } from "@/lib/mock-data"

export default function ProfilePage() {
  const router = useRouter()
  const { user, isLoading: authLoading } = useAuth()

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login")
    }
  }, [user, authLoading, router])

  if (authLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  const favoriteVetsList = veterinaryClinics.filter((vet) => user.favoriteVets?.includes(vet.id))
  const favoriteChaperonesList = chaperones.filter((chap) => user.favoriteChaperones?.includes(chap.id))

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <main className="flex-1 py-12">
        <div className="container max-w-6xl">
          {/* Header */}
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">My Profile</h1>
              <p className="text-muted-foreground">Manage your pets and preferences</p>
            </div>
            <Link href="/profile/settings">
              <Button variant="outline">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </Link>
          </div>

          <div className="grid gap-8">
            {/* My Pets Section */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <PawPrint className="h-6 w-6 text-primary" />
                  <h2 className="text-2xl font-bold">My Pets</h2>
                </div>
                <AddPetDialog />
              </div>

              {user.pets && user.pets.length > 0 ? (
                <div className="grid md:grid-cols-2 gap-4">
                  {user.pets.map((pet) => (
                    <PetProfileCard key={pet.id} pet={pet} />
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="py-12 text-center">
                    <PawPrint className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground mb-4">No pets added yet</p>
                    <AddPetDialog />
                  </CardContent>
                </Card>
              )}
            </section>

            {/* Favorites Section */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <Heart className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-bold">Favorites</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Favorite Vets */}
                <Card>
                  <CardHeader>
                    <CardTitle>Favorite Veterinary Clinics</CardTitle>
                    <CardDescription>Quick access to your trusted vets</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {favoriteVetsList.length > 0 ? (
                      <div className="space-y-3">
                        {favoriteVetsList.map((vet) => (
                          <Link
                            key={vet.id}
                            href={`/veterinary/${vet.id}`}
                            className="block p-3 rounded-lg border hover:bg-accent transition-colors"
                          >
                            <p className="font-medium">{vet.name}</p>
                            <p className="text-sm text-muted-foreground">{vet.address}</p>
                          </Link>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-sm text-muted-foreground mb-3">No favorite vets yet</p>
                        <Link href="/veterinary">
                          <Button variant="outline" size="sm">
                            Browse Vets
                          </Button>
                        </Link>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Favorite Chaperones */}
                <Card>
                  <CardHeader>
                    <CardTitle>Favorite Pet Transport</CardTitle>
                    <CardDescription>Your trusted pet chaperones</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {favoriteChaperonesList.length > 0 ? (
                      <div className="space-y-3">
                        {favoriteChaperonesList.map((chap) => (
                          <Link
                            key={chap.id}
                            href={`/chaperone/${chap.id}`}
                            className="block p-3 rounded-lg border hover:bg-accent transition-colors"
                          >
                            <p className="font-medium">{chap.name}</p>
                            <p className="text-sm text-muted-foreground">{chap.experience}</p>
                          </Link>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-sm text-muted-foreground mb-3">No favorite chaperones yet</p>
                        <Link href="/chaperone">
                          <Button variant="outline" size="sm">
                            Browse Transport
                          </Button>
                        </Link>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Reviews Section */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <Star className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-bold">My Reviews</h2>
              </div>

              <Card>
                <CardContent className="py-8 text-center">
                  <Star className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground mb-4">View and manage your reviews</p>
                  <Link href="/profile/reviews">
                    <Button>View All Reviews</Button>
                  </Link>
                </CardContent>
              </Card>
            </section>
          </div>
        </div>
      </main>
    </div>
  )
}
