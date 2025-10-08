export interface Review {
  id: string
  providerId: string
  providerType: "veterinary" | "chaperone"
  userId: string
  userName: string
  rating: number
  title: string
  comment: string
  date: string
  helpful: number
}

export const mockReviews: Review[] = [
  {
    id: "1",
    providerId: "1",
    providerType: "veterinary",
    userId: "1",
    userName: "Sarah M.",
    rating: 5,
    title: "Excellent care for my dog",
    comment:
      "The staff at Paws & Claws are amazing! They took great care of my dog during his surgery and the follow-up care was exceptional. Highly recommend!",
    date: "2025-01-15",
    helpful: 12,
  },
  {
    id: "2",
    providerId: "1",
    providerType: "veterinary",
    userId: "2",
    userName: "Michael T.",
    rating: 5,
    title: "Very professional",
    comment:
      "Dr. Johnson was very thorough and explained everything clearly. The facility is clean and modern. Will definitely be coming back.",
    date: "2025-01-10",
    helpful: 8,
  },
  {
    id: "3",
    providerId: "1",
    providerType: "veterinary",
    userId: "3",
    userName: "Jennifer L.",
    rating: 4,
    title: "Good service, bit pricey",
    comment:
      "Great care for my cat, but the prices are a bit higher than other clinics in the area. Still worth it for the quality of service.",
    date: "2025-01-05",
    helpful: 5,
  },
  {
    id: "4",
    providerId: "2",
    providerType: "veterinary",
    userId: "4",
    userName: "David R.",
    rating: 5,
    title: "Saved my dog's life",
    comment:
      "Emergency situation at 2 AM and they were there for us. The staff was incredible and saved my dog's life. Forever grateful!",
    date: "2025-01-12",
    helpful: 24,
  },
  {
    id: "5",
    providerId: "1",
    providerType: "chaperone",
    userId: "5",
    userName: "Lisa K.",
    rating: 5,
    title: "Safe and comfortable transport",
    comment:
      "Sarah was wonderful with my anxious cat. The van was clean and climate-controlled. My cat arrived stress-free at the vet.",
    date: "2025-01-14",
    helpful: 9,
  },
  {
    id: "6",
    providerId: "1",
    providerType: "chaperone",
    userId: "6",
    userName: "Robert P.",
    rating: 5,
    title: "Highly professional",
    comment:
      "Very punctual and professional service. Sarah kept me updated throughout the transport. Will definitely use again!",
    date: "2025-01-08",
    helpful: 7,
  },
  {
    id: "7",
    providerId: "2",
    providerType: "chaperone",
    userId: "7",
    userName: "Amanda W.",
    rating: 5,
    title: "Great 24/7 service",
    comment:
      "Needed emergency transport at midnight and Mike was there within 30 minutes. Very reliable and caring with my dog.",
    date: "2025-01-11",
    helpful: 15,
  },
]

export function getReviewsForProvider(providerId: string, providerType: "veterinary" | "chaperone"): Review[] {
  return mockReviews.filter((review) => review.providerId === providerId && review.providerType === providerType)
}

export function getReviewsByUser(userId: string): Review[] {
  return mockReviews.filter((review) => review.userId === userId)
}

export function addReview(review: Omit<Review, "id" | "date" | "helpful">): Review {
  const newReview: Review = {
    ...review,
    id: Date.now().toString(),
    date: new Date().toISOString().split("T")[0],
    helpful: 0,
  }
  mockReviews.push(newReview)
  return newReview
}
