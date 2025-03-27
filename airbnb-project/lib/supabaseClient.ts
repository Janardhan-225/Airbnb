import { createClient } from "@supabase/supabase-js"

// These environment variables need to be set in your Vercel project
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Create a single supabase client for interacting with your database
export const supabase = createClient(supabaseUrl || "", supabaseAnonKey || "")

// Authentication helpers
export async function signInWithGoogle() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${window.location.origin}/auth/callback`,
    },
  })

  return { data, error }
}

export async function signInWithGithub() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "github",
    options: {
      redirectTo: `${window.location.origin}/auth/callback`,
    },
  })

  return { data, error }
}

export async function signOut() {
  const { error } = await supabase.auth.signOut()
  return { error }
}

export async function getSession() {
  const { data, error } = await supabase.auth.getSession()
  return { data, error }
}

// Database helpers
export async function getListings(filters = {}) {
  const { data, error } = await supabase.from("listings").select("*").match(filters)

  return { data, error }
}

export async function getListingById(id: string) {
  const { data, error } = await supabase
    .from("listings")
    .select(`
      *,
      host:profiles(*),
      reviews:reviews(*)
    `)
    .eq("id", id)
    .single()

  return { data, error }
}

export async function createBooking(bookingData: any) {
  const { data, error } = await supabase.from("bookings").insert(bookingData).select()

  return { data, error }
}

