"use client"

import { useState } from "react"
import Image from "next/image"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

interface ImageGalleryProps {
  images: { url: string; alt: string }[]
  className?: string
}

export default function ImageGallery({ images, className }: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0)

  return (
    <div className={cn("grid grid-cols-1 gap-2 md:grid-cols-4 md:grid-rows-2", className)}>
      <Dialog>
        <div className="relative col-span-2 row-span-2 overflow-hidden rounded-lg">
          <DialogTrigger asChild>
            <div className="cursor-pointer">
              <Image
                src={images[0].url || "/placeholder.svg"}
                alt={images[0].alt}
                width={800}
                height={600}
                className="h-full w-full object-cover transition-transform hover:scale-105"
              />
            </div>
          </DialogTrigger>
        </div>

        {images.slice(1, 5).map((image, i) => (
          <div key={i} className="relative hidden overflow-hidden rounded-lg md:block">
            <DialogTrigger asChild>
              <div className="cursor-pointer">
                <Image
                  src={image.url || "/placeholder.svg"}
                  alt={image.alt}
                  width={400}
                  height={300}
                  className="h-full w-full object-cover transition-transform hover:scale-105"
                />
              </div>
            </DialogTrigger>
          </div>
        ))}

        <DialogContent className="max-w-4xl">
          <div className="grid gap-4">
            <div className="overflow-hidden rounded-lg">
              <Image
                src={images[selectedImage].url || "/placeholder.svg"}
                alt={images[selectedImage].alt}
                width={1200}
                height={900}
                className="h-full w-full object-contain"
              />
            </div>
            <div className="flex gap-2 overflow-auto pb-2">
              {images.map((image, i) => (
                <div
                  key={i}
                  className={cn(
                    "relative h-20 w-20 flex-shrink-0 cursor-pointer overflow-hidden rounded-md",
                    selectedImage === i && "ring-2 ring-primary",
                  )}
                  onClick={() => setSelectedImage(i)}
                >
                  <Image src={image.url || "/placeholder.svg"} alt={image.alt} fill className="object-cover" />
                </div>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <div className="mt-2 flex gap-2 overflow-auto md:hidden">
        {images.slice(1).map((image, i) => (
          <div key={i} className="relative h-24 w-32 flex-shrink-0 overflow-hidden rounded-lg">
            <Image src={image.url || "/placeholder.svg"} alt={image.alt} fill className="object-cover" />
          </div>
        ))}
      </div>
    </div>
  )
}

