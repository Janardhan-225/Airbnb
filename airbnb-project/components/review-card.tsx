import { Star } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface ReviewCardProps {
  review: {
    id: string
    user: {
      name: string
      image: string
    }
    date: string
    rating: number
    comment: string
  }
}

export default function ReviewCard({ review }: ReviewCardProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Avatar className="h-10 w-10">
          <AvatarImage src={review.user.image} alt={review.user.name} />
          <AvatarFallback>{review.user.name[0]}</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-medium">{review.user.name}</p>
          <p className="text-sm text-muted-foreground">{review.date}</p>
        </div>
      </div>
      <div className="flex items-center">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${
              i < review.rating ? "fill-primary text-primary" : "fill-muted text-muted-foreground"
            }`}
          />
        ))}
      </div>
      <p className="text-sm">{review.comment}</p>
    </div>
  )
}

