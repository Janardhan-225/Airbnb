"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Heart, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface ListingCardProps {
  id: string
  title: string
  location: string
  price: number
  rating: number
  reviewCount: number
  imageUrl: string
}

export default function ListingCard({ id, title, location, price, rating, reviewCount, imageUrl }: ListingCardProps) {
  const [isFavorite, setIsFavorite] = useState(false)

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsFavorite(!isFavorite)
  }

  return (
    <Link href={`/listing/${id}`}>
      <Card className="group overflow-hidden transition-all hover:shadow-md">
        <div className="relative aspect-[4/3] w-full overflow-hidden">
          <Image
            src={imageUrl || "/placeholder.svg"}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-2 z-10 rounded-full bg-white/80 backdrop-blur-sm"
            onClick={toggleFavorite}
          >
            <Heart className={`h-5 w-5 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
            <span className="sr-only">Add to favorites</span>
          </Button>
        </div>
        <CardContent className="p-4">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-semibold line-clamp-1">{title}</h3>
              <p className="text-sm text-muted-foreground">{location}</p>
            </div>
            <div className="flex items-center">
              <Star className="mr-1 h-4 w-4 fill-primary" />
              <span className="text-sm font-medium">{rating}</span>
            </div>
          </div>
          <p className="mt-2 text-sm">
            <span className="font-semibold">${price}</span> night
          </p>
        </CardContent>
      </Card>
    </Link>
  )
}

