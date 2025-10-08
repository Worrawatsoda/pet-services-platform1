import { Star, ThumbsUp } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { Review } from "@/lib/reviews"

interface ReviewCardProps {
  review: Review
}

export function ReviewCard({ review }: ReviewCardProps) {
  const reviewDate = new Date(review.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-semibold">{review.userName}</span>
              <span className="text-sm text-muted-foreground">•</span>
              <span className="text-sm text-muted-foreground">{reviewDate}</span>
            </div>
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${i < review.rating ? "fill-primary text-primary" : "fill-muted text-muted"}`}
                />
              ))}
            </div>
          </div>
        </div>

        <h4 className="font-semibold mb-2">{review.title}</h4>
        <p className="text-muted-foreground leading-relaxed mb-4">{review.comment}</p>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="h-8 gap-2">
            <ThumbsUp className="h-3.5 w-3.5" />
            <span className="text-xs">Helpful ({review.helpful})</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
