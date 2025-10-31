'use server'

import { auth } from '@clerk/nextjs/server'
import { revalidatePath } from 'next/cache'
import { createSupabaseClient } from '@/lib/supabase'

export interface Analysis {
  id: string
  user_id: string
  title: string
  description: string | null
  status: string
  data: Record<string, any>
  created_at: string
  updated_at: string
}

export interface AnalysisFormData {
  title: string
  description?: string
  status?: string
  data?: Record<string, any>
}

// Get all user's analyses
export async function getAnalyses(): Promise<Analysis[]> {
  const { userId } = await auth()
  if (!userId) throw new Error('Unauthorized')

  const supabase = await createSupabaseClient()
  const { data, error } = await supabase
    .from('analyses')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  if (error) throw new Error(error.message)

  return data || []
}

// Get single analysis
export async function getAnalysis(id: string): Promise<Analysis | null> {
  const { userId } = await auth()
  if (!userId) throw new Error('Unauthorized')

  const supabase = await createSupabaseClient()
  const { data, error } = await supabase
    .from('analyses')
    .select('*')
    .eq('id', id)
    .eq('user_id', userId)
    .single()

  if (error) {
    if (error.code === 'PGRST116') return null
    throw new Error(error.message)
  }

  return data
}

// Create analysis
export async function createAnalysis(formData: AnalysisFormData): Promise<Analysis> {
  const { userId } = await auth()
  if (!userId) throw new Error('Unauthorized')

  if (!formData.title.trim()) {
    throw new Error('Title is required')
  }

  const supabase = await createSupabaseClient()
  const { data, error } = await supabase
    .from('analyses')
    .insert({
      user_id: userId,
      title: formData.title,
      description: formData.description || null,
      status: formData.status || 'draft',
      data: formData.data || {},
    })
    .select('*')
    .single()

  if (error) throw new Error(error.message)

  revalidatePath('/dashboard')
  return data
}

// Update analysis
export async function updateAnalysis(id: string, formData: AnalysisFormData): Promise<Analysis> {
  const { userId } = await auth()
  if (!userId) throw new Error('Unauthorized')

  if (!formData.title.trim()) {
    throw new Error('Title is required')
  }

  const supabase = await createSupabaseClient()
  const { data, error } = await supabase
    .from('analyses')
    .update({
      title: formData.title,
      description: formData.description || null,
      status: formData.status || 'draft',
      data: formData.data || {},
    })
    .eq('id', id)
    .eq('user_id', userId)
    .select('*')
    .single()

  if (error) throw new Error(error.message)

  revalidatePath('/dashboard')
  return data
}

// Delete analysis
export async function deleteAnalysis(id: string): Promise<void> {
  const { userId } = await auth()
  if (!userId) throw new Error('Unauthorized')

  const supabase = await createSupabaseClient()
  const { error } = await supabase
    .from('analyses')
    .delete()
    .eq('id', id)
    .eq('user_id', userId)

  if (error) throw new Error(error.message)

  revalidatePath('/dashboard')
}
