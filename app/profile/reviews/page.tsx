"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { SiteHeader } from "@/components/site-header"
import { ReviewCard } from "@/components/review-card"
import { useAuth } from "@/lib/auth-context"
import { getReviewsByUser, type Review } from "@/lib/reviews"
import { Loader2 } from "lucide-react"
import { mockVeterinaryClinics, mockPetChaperones } from "@/lib/mock-data"
import Link from "next/link"

export default function MyReviewsPage() {
  const router = useRouter()
  const { user, isLoading: authLoading } = useAuth()
  const [reviews, setReviews] = useState<Review[]>([])

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login")
    } else if (user) {
      setReviews(getReviewsByUser(user.id))
    }
  }, [user, authLoading, router])

  const getProviderName = (review: Review) => {
    if (review.providerType === "veterinary") {
      const clinic = mockVeterinaryClinics.find((c) => c.id === review.providerId)
      return clinic?.name || "Unknown Provider"
    } else {
      const chaperone = mockPetChaperones.find((c) => c.id === review.providerId)
      return chaperone?.businessName || chaperone?.name || "Unknown Provider"
    }
  }

  const getProviderLink = (review: Review) => {
    return `/${review.providerType}/${review.providerId}`
  }

  if (authLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <main className="flex-1 py-12">
        <div className="container max-w-4xl">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">My Reviews</h1>
            <p className="text-muted-foreground">Reviews you've written for service providers</p>
          </div>

          {reviews.length > 0 ? (
            <div className="space-y-6">
              {reviews.map((review) => (
                <div key={review.id}>
                  <div className="mb-2">
                    <Link
                      href={getProviderLink(review)}
                      className="text-lg font-semibold hover:text-primary transition-colors"
                    >
                      {getProviderName(review)}
                    </Link>
                    <p className="text-sm text-muted-foreground">
                      {review.providerType === "veterinary" ? "Veterinary Clinic" : "Pet Transport Service"}
                    </p>
                  </div>
                  <ReviewCard review={review} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground mb-4">You haven't written any reviews yet</p>
              <p className="text-sm text-muted-foreground mb-6">
                Share your experiences with veterinary clinics and pet transport services
              </p>
              <div className="flex gap-4 justify-center">
                <Link href="/veterinary" className="text-primary hover:underline">
                  Browse Veterinary Clinics
                </Link>
                <Link href="/chaperone" className="text-primary hover:underline">
                  Browse Pet Transport
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
