"use client"

import { useState } from "react"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { BeanIcon as Beach, Mountain, Trees, Building, Home, Tent, Ship, Castle } from "lucide-react"

const categories = [
  { name: "Beach", icon: Beach },
  { name: "Mountains", icon: Mountain },
  { name: "Countryside", icon: Trees },
  { name: "City", icon: Building },
  { name: "Cabins", icon: Home },
  { name: "Camping", icon: Tent },
  { name: "Boats", icon: Ship },
  { name: "Castles", icon: Castle },
]

export default function SearchFilters() {
  const [priceRange, setPriceRange] = useState([50, 500])
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  return (
    <div className="mb-8">
      <div className="mb-6 flex items-center gap-4 overflow-x-auto pb-2">
        {categories.map((category) => (
          <Button
            key={category.name}
            variant={activeCategory === category.name ? "default" : "outline"}
            className="flex-shrink-0 gap-2"
            onClick={() => setActiveCategory(activeCategory === category.name ? null : category.name)}
          >
            <category.icon className="h-4 w-4" />
            {category.name}
          </Button>
        ))}
      </div>

      <div className="grid gap-4 rounded-lg border p-4">
        <h3 className="font-medium">Price range</h3>
        <Slider defaultValue={[50, 500]} max={1000} step={10} value={priceRange} onValueChange={setPriceRange} />
        <div className="flex items-center justify-between">
          <div className="rounded-md border px-2 py-1">
            <span className="text-sm">Min: ${priceRange[0]}</span>
          </div>
          <div className="rounded-md border px-2 py-1">
            <span className="text-sm">Max: ${priceRange[1]}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

