"use client"

import { useState } from "react"
import { ReviewCard } from "@/components/review-card"
import { ReviewForm } from "@/components/review-form"
import { Button } from "@/components/ui/button"
import { getReviewsForProvider } from "@/lib/reviews"
import { Star } from "lucide-react"

interface ReviewsSectionProps {
  providerId: string
  providerType: "veterinary" | "chaperone"
  providerName: string
  rating: number
  reviewCount: number
}

export function ReviewsSection({ providerId, providerType, providerName, rating, reviewCount }: ReviewsSectionProps) {
  const [reviews, setReviews] = useState(getReviewsForProvider(providerId, providerType))
  const [showForm, setShowForm] = useState(false)

  const handleReviewSubmitted = () => {
    setReviews(getReviewsForProvider(providerId, providerType))
    setShowForm(false)
  }

  return (
    <div className="space-y-6">
      {/* Rating Summary */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold mb-2">Reviews</h2>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 fill-primary text-primary" />
              <span className="text-2xl font-bold">{rating}</span>
            </div>
            <span className="text-muted-foreground">
              Based on {reviewCount} {reviewCount === 1 ? "review" : "reviews"}
            </span>
          </div>
        </div>
        {!showForm && <Button onClick={() => setShowForm(true)}>Write a Review</Button>}
      </div>

      {/* Review Form */}
      {showForm && (
        <div>
          <ReviewForm
            providerId={providerId}
            providerType={providerType}
            providerName={providerName}
            onReviewSubmitted={handleReviewSubmitted}
          />
          <Button variant="ghost" onClick={() => setShowForm(false)} className="mt-2">
            Cancel
          </Button>
        </div>
      )}

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.length > 0 ? (
          reviews.map((review) => <ReviewCard key={review.id} review={review} />)
        ) : (
          <p className="text-center text-muted-foreground py-8">No reviews yet. Be the first to review!</p>
        )}
      </div>
    </div>
  )
}
