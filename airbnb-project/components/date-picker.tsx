"use client"

import { useState } from "react"
import { addDays, format } from "date-fns"
import { CalendarIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function DatePicker() {
  const [date, setDate] = useState<{
    from: Date
    to?: Date
  }>({
    from: new Date(),
    to: addDays(new Date(), 5),
  })

  const [guests, setGuests] = useState("2")

  return (
    <div className="grid gap-4">
      <div className="grid gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn("justify-start border-dashed text-left font-normal", !date && "text-muted-foreground")}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date?.from ? (
                date.to ? (
                  <>
                    {format(date.from, "LLL dd, y")} - {format(date.to, "LLL dd, y")}
                  </>
                ) : (
                  format(date.from, "LLL dd, y")
                )
              ) : (
                <span>Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={date?.from}
              selected={date}
              onSelect={setDate}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>
      </div>

      <Select value={guests} onValueChange={setGuests}>
        <SelectTrigger>
          <SelectValue placeholder="Select guests" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="1">1 guest</SelectItem>
          <SelectItem value="2">2 guests</SelectItem>
          <SelectItem value="3">3 guests</SelectItem>
          <SelectItem value="4">4 guests</SelectItem>
          <SelectItem value="5">5 guests</SelectItem>
          <SelectItem value="6">6 guests</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}

