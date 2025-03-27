import Link from "next/link"
import { Suspense } from "react"
import { ArrowLeft, Award, Heart, Share, Star, Wifi, Tv, Coffee, Utensils, Car, Snowflake, Waves } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import DatePicker from "@/components/date-picker"
import ImageGallery from "@/components/image-gallery"
import ReviewCard from "@/components/review-card"

async function getListingDetails(id: string) {
  // This would be a real API call in production
  // For demo purposes, we'll return mock data
  return {
    id,
    title: "Luxurious Beachfront Villa with Stunning Ocean Views",
    description:
      "Experience the ultimate beachfront getaway in this stunning villa. Wake up to panoramic ocean views and fall asleep to the sound of waves. This spacious property features modern amenities, a private pool, and direct beach access.",
    location: "Malibu, California",
    price: 349,
    rating: 4.92,
    reviewCount: 128,
    host: {
      name: "Sarah",
      image: "/placeholder.svg?height=50&width=50&text=S",
      isSuperhost: true,
      joinedDate: "2018",
    },
    amenities: [
      { name: "Wifi", icon: Wifi },
      { name: "TV", icon: Tv },
      { name: "Kitchen", icon: Utensils },
      { name: "Coffee maker", icon: Coffee },
      { name: "Free parking", icon: Car },
      { name: "Air conditioning", icon: Snowflake },
      { name: "Beach access", icon: Waves },
    ],
    images: [
      { url: "/placeholder.svg?height=600&width=800&text=Living+Room", alt: "Living Room" },
      { url: "/placeholder.svg?height=600&width=800&text=Bedroom", alt: "Bedroom" },
      { url: "/placeholder.svg?height=600&width=800&text=Kitchen", alt: "Kitchen" },
      { url: "/placeholder.svg?height=600&width=800&text=Bathroom", alt: "Bathroom" },
      { url: "/placeholder.svg?height=600&width=800&text=Pool", alt: "Pool" },
    ],
    reviews: [
      {
        id: "1",
        user: { name: "Michael", image: "/placeholder.svg?height=40&width=40&text=M" },
        date: "August 2023",
        rating: 5,
        comment:
          "Amazing place! The views are incredible and the house is exactly as pictured. We had a wonderful stay and would definitely come back.",
      },
      {
        id: "2",
        user: { name: "Jessica", image: "/placeholder.svg?height=40&width=40&text=J" },
        date: "July 2023",
        rating: 4,
        comment:
          "Beautiful property with great amenities. The host was very responsive and helpful. The only small issue was the WiFi was a bit spotty.",
      },
      {
        id: "3",
        user: { name: "David", image: "/placeholder.svg?height=40&width=40&text=D" },
        date: "June 2023",
        rating: 5,
        comment:
          "Perfect location! Steps from the beach and the house was immaculate. Highly recommend for a relaxing getaway.",
      },
    ],
  }
}

export default async function ListingPage({ params }: { params: { id: string } }) {
  const listing = await getListingDetails(params.id)

  return (
    <main className="container py-6">
      <div className="mb-6 flex items-center">
        <Button variant="ghost" size="icon" asChild className="mr-2">
          <Link href="/">
            <ArrowLeft className="h-5 w-5" />
            <span className="sr-only">Back</span>
          </Link>
        </Button>
        <h1 className="text-xl font-bold md:text-2xl">{listing.title}</h1>
      </div>

      <div className="flex justify-between">
        <div className="flex items-center gap-2">
          <div className="flex items-center">
            <Star className="mr-1 h-4 w-4 fill-primary" />
            <span className="font-medium">{listing.rating}</span>
          </div>
          <span className="text-muted-foreground">·</span>
          <span className="underline">{listing.reviewCount} reviews</span>
          <span className="text-muted-foreground">·</span>
          <span>{listing.location}</span>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-1">
            <Share className="h-4 w-4" />
            Share
          </Button>
          <Button variant="outline" size="sm" className="gap-1">
            <Heart className="h-4 w-4" />
            Save
          </Button>
        </div>
      </div>

      <Suspense fallback={<div className="mt-6 aspect-[4/3] w-full rounded-lg bg-muted" />}>
        <ImageGallery images={listing.images} className="mt-6" />
      </Suspense>

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-xl font-semibold">Entire villa hosted by {listing.host.name}</h2>
              <p className="text-muted-foreground">6 guests · 3 bedrooms · 4 beds · 3 baths</p>
            </div>
            <Avatar className="h-14 w-14">
              <AvatarImage src={listing.host.image} alt={listing.host.name} />
              <AvatarFallback>{listing.host.name[0]}</AvatarFallback>
            </Avatar>
          </div>

          {listing.host.isSuperhost && (
            <div className="mt-6 flex items-center gap-2">
              <Award className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium">{listing.host.name} is a Superhost</p>
                <p className="text-sm text-muted-foreground">Superhosts are experienced, highly rated hosts.</p>
              </div>
            </div>
          )}

          <Separator className="my-6" />

          <div className="prose max-w-none">
            <p>{listing.description}</p>
          </div>

          <Separator className="my-6" />

          <div>
            <h2 className="mb-4 text-xl font-semibold">What this place offers</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {listing.amenities.map((amenity, i) => (
                <div key={i} className="flex items-center gap-3">
                  <amenity.icon className="h-5 w-5 text-muted-foreground" />
                  <span>{amenity.name}</span>
                </div>
              ))}
            </div>
          </div>

          <Separator className="my-6" />

          <div>
            <div className="mb-4 flex items-center">
              <Star className="mr-2 h-5 w-5 fill-primary" />
              <span className="text-xl font-semibold">
                {listing.rating} · {listing.reviewCount} reviews
              </span>
            </div>

            <div className="grid gap-6">
              {listing.reviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}

              <Button variant="outline" className="mt-2 w-full sm:w-auto">
                Show all {listing.reviewCount} reviews
              </Button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <Card className="sticky top-6">
            <CardHeader>
              <CardTitle className="flex items-baseline justify-between">
                <span>
                  ${listing.price} <span className="text-base font-normal">night</span>
                </span>
                <div className="flex items-center text-base font-normal">
                  <Star className="mr-1 h-4 w-4 fill-primary" />
                  <span>{listing.rating}</span>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <DatePicker />

              <div className="mt-4">
                <Button className="w-full" size="lg">
                  Reserve
                </Button>
              </div>

              <p className="mt-4 text-center text-sm text-muted-foreground">You won't be charged yet</p>

              <div className="mt-6 space-y-4">
                <div className="flex justify-between">
                  <span className="underline">${listing.price} x 5 nights</span>
                  <span>${listing.price * 5}</span>
                </div>
                <div className="flex justify-between">
                  <span className="underline">Cleaning fee</span>
                  <span>$150</span>
                </div>
                <div className="flex justify-between">
                  <span className="underline">Service fee</span>
                  <span>$279</span>
                </div>
                <Separator />
                <div className="flex justify-between font-semibold">
                  <span>Total before taxes</span>
                  <span>${listing.price * 5 + 150 + 279}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}

