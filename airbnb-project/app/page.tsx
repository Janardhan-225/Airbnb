import { Suspense } from "react"
import Image from "next/image"
import { CalendarDays, MapPin, Search, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ListingCard from "@/components/listing-card"
import SearchFilters from "@/components/search-filters"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <section className="relative flex flex-col items-center justify-center overflow-hidden py-20 md:py-32">
        <div className="absolute inset-0 z-0">
          <Image
            src="/placeholder.svg?height=1080&width=1920"
            alt="Hero background"
            fill
            className="object-cover brightness-[0.7]"
            priority
          />
        </div>
        <div className="container relative z-10 flex flex-col items-center text-center">
          <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
            Find your next stay
          </h1>
          <p className="mb-10 max-w-[600px] text-lg text-white md:text-xl">
            Search low prices on homes, apartments and much more...
          </p>
          <Card className="w-full max-w-3xl">
            <CardContent className="p-0">
              <Tabs defaultValue="stays" className="w-full">
                <TabsList className="grid w-full grid-cols-3 rounded-b-none rounded-t-lg bg-muted/50">
                  <TabsTrigger value="stays">Stays</TabsTrigger>
                  <TabsTrigger value="experiences">Experiences</TabsTrigger>
                  <TabsTrigger value="online-experiences">Online Experiences</TabsTrigger>
                </TabsList>
                <TabsContent value="stays" className="p-0">
                  <div className="grid grid-cols-1 gap-2 p-4 md:grid-cols-4 md:gap-4">
                    <div className="relative rounded-md border md:col-span-1">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input type="text" placeholder="Where" className="pl-9" />
                    </div>
                    <div className="grid grid-cols-2 gap-2 md:col-span-2">
                      <div className="relative rounded-md border">
                        <CalendarDays className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input type="text" placeholder="Check in" className="pl-9" />
                      </div>
                      <div className="relative rounded-md border">
                        <CalendarDays className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input type="text" placeholder="Check out" className="pl-9" />
                      </div>
                    </div>
                    <div className="relative rounded-md border md:col-span-1">
                      <Users className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input type="text" placeholder="Guests" className="pl-9" />
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="experiences" className="p-4">
                  <p className="text-sm text-muted-foreground">Find activities hosted by local experts.</p>
                </TabsContent>
                <TabsContent value="online-experiences" className="p-4">
                  <p className="text-sm text-muted-foreground">Live interactive activities led by hosts.</p>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="flex justify-between p-4 pt-0">
              <Button variant="ghost">Clear all</Button>
              <Button className="gap-2">
                <Search className="h-4 w-4" />
                Search
              </Button>
            </CardFooter>
          </Card>
        </div>
      </section>

      <section className="container py-10">
        <SearchFilters />

        <h2 className="mb-6 text-2xl font-bold tracking-tight">Popular places to stay</h2>

        <Suspense fallback={<ListingCardSkeleton />}>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 9 }).map((_, i) => (
              <ListingCard
                key={i}
                id={`listing-${i + 1}`}
                title={`Beautiful ${i % 2 === 0 ? "Beachfront" : "Mountain"} Retreat`}
                location={i % 3 === 0 ? "Malibu, California" : i % 3 === 1 ? "Aspen, Colorado" : "Miami, Florida"}
                price={99 + i * 20}
                rating={4.5 + (i % 5) / 10}
                reviewCount={10 + i}
                imageUrl={`/placeholder.svg?height=300&width=400&text=Listing+${i + 1}`}
              />
            ))}
          </div>
        </Suspense>

        <div className="mt-10 flex justify-center">
          <Button variant="outline" size="lg">
            Show more
          </Button>
        </div>
      </section>
    </main>
  )
}

function ListingCardSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <Card key={i} className="overflow-hidden">
          <Skeleton className="aspect-[4/3] w-full" />
          <CardContent className="p-4">
            <Skeleton className="mb-2 h-4 w-3/4" />
            <Skeleton className="mb-4 h-4 w-1/2" />
            <Skeleton className="h-4 w-1/4" />
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

