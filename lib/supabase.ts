import { createClient } from '@supabase/supabase-js'
import { auth } from '@clerk/nextjs/server'

export async function createSupabaseClient() {
  const { getToken } = await auth()
  const token = await getToken()
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { global: { headers: { Authorization: token ? `Bearer ${token}` : '' } } }
  )
}

// Helper function to get current user ID from Clerk
export async function getCurrentUserId(): Promise<string | null> {
  const { userId } = await auth()
  return userId
}