"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, Search, User, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { ModeToggle } from "@/components/mode-toggle"

export default function Navbar() {
  const pathname = usePathname()
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6 text-primary"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
          <span className="hidden font-bold sm:inline-block">Airbnb Clone</span>
        </Link>

        <div className="flex flex-1 items-center justify-center px-2">
          {isSearchOpen ? (
            <div className="relative flex w-full max-w-md items-center md:w-auto">
              <Input type="search" placeholder="Search destinations" className="pr-8" />
              <Search className="absolute right-3 h-4 w-4 text-muted-foreground" />
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-0 -mr-8"
                onClick={() => setIsSearchOpen(false)}
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Close search</span>
              </Button>
            </div>
          ) : (
            <Button
              variant="outline"
              className="hidden h-9 w-full justify-start gap-2 px-3 md:flex md:w-auto"
              onClick={() => setIsSearchOpen(true)}
            >
              <Search className="h-4 w-4" />
              <span>Search destinations</span>
            </Button>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="hidden md:flex" asChild>
            <Link href="/become-a-host">
              <span>Become a host</span>
            </Link>
          </Button>

          <ModeToggle />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="rounded-full">
                <User className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href="/login">Login</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/signup">Sign up</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/become-a-host">Become a host</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/help">Help</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <div className="grid gap-4 py-4">
                <Link
                  href="/login"
                  className={cn(
                    "flex items-center py-2 text-lg font-semibold",
                    pathname === "/login" && "text-primary",
                  )}
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className={cn(
                    "flex items-center py-2 text-lg font-semibold",
                    pathname === "/signup" && "text-primary",
                  )}
                >
                  Sign up
                </Link>
                <Link
                  href="/become-a-host"
                  className={cn(
                    "flex items-center py-2 text-lg font-semibold",
                    pathname === "/become-a-host" && "text-primary",
                  )}
                >
                  Become a host
                </Link>
                <Link
                  href="/help"
                  className={cn("flex items-center py-2 text-lg font-semibold", pathname === "/help" && "text-primary")}
                >
                  Help
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

