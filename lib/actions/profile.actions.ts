'use server'

import { auth } from '@clerk/nextjs/server'
import { revalidatePath } from 'next/cache'
import { createSupabaseClient, getCurrentUserId } from '@/lib/supabase'

export interface Profile {
  id: string
  user_id: string
  name: string
  email: string | null
  created_at: string
  updated_at: string
}

export interface ProfileFormData {
  name: string
  email?: string
}

// Get user's profile
export async function getProfile(): Promise<Profile | null> {
  const userId = await getCurrentUserId()
  if (!userId) throw new Error('Unauthorized')

  const supabase = await createSupabaseClient()
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('user_id', userId)
    .single()

  if (error) {
    if (error.code === 'PGRST116') return null // No profile found
    throw new Error(error.message)
  }

  return data
}

// Create user profile
export async function createProfile(formData: ProfileFormData): Promise<Profile> {
  const userId = await getCurrentUserId()
  if (!userId) throw new Error('Unauthorized')

  if (!formData.name.trim()) {
    throw new Error('Name is required')
  }

  const supabase = await createSupabaseClient()
  const { data, error } = await supabase
    .from('profiles')
    .insert({
      user_id: userId,
      name: formData.name,
      email: formData.email || null,
    })
    .select('*')
    .single()

  if (error) throw new Error(error.message)

  revalidatePath('/dashboard')
  return data
}

// Update user profile
export async function updateProfile(formData: ProfileFormData): Promise<Profile> {
  const userId = await getCurrentUserId()
  if (!userId) throw new Error('Unauthorized')

  if (!formData.name.trim()) {
    throw new Error('Name is required')
  }

  const supabase = await createSupabaseClient()
  const { data, error } = await supabase
    .from('profiles')
    .update({
      name: formData.name,
      email: formData.email || null,
    })
    .eq('user_id', userId)
    .select('*')
    .single()

  if (error) throw new Error(error.message)

  revalidatePath('/dashboard')
  return data
}

// Delete user profile
export async function deleteProfile(): Promise<void> {
  const userId = await getCurrentUserId()
  if (!userId) throw new Error('Unauthorized')

  const supabase = await createSupabaseClient()
  const { error } = await supabase
    .from('profiles')
    .delete()
    .eq('user_id', userId)

  if (error) throw new Error(error.message)

  revalidatePath('/dashboard')
}
