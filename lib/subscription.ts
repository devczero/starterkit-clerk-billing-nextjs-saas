import { auth, currentUser } from '@clerk/nextjs/server'

export type PlanType = 'free' | 'pro'

interface UserMetadata {
  plan?: PlanType
}

export async function getUserPlan(): Promise<PlanType | null> {
  const { has, sessionClaims } = await auth()
  
  if (typeof has === 'function') {
    if (has({ plan: 'pro_plan' })) return 'pro'
    if (has({ plan: 'free_user' })) return 'free'
  }
  
  const claims = sessionClaims as Record<string, unknown> | null
  const claimPlan = claims?.plan ?? (claims?.publicMetadata as Record<string, unknown>)?.plan
  if (claimPlan) return claimPlan as PlanType
  
  const user = await currentUser()
  if (!user) return null // No authenticated user
  
  const userPlan = (user?.publicMetadata as UserMetadata)?.plan
  
  return userPlan ?? 'free'
}

export async function isOnFreePlan(): Promise<boolean> {
  const plan = await getUserPlan()
  return plan === 'free'
}

export async function isOnProPlan(): Promise<boolean> {
  const plan = await getUserPlan()
  return plan === 'pro'
}

export async function hasProPlan(): Promise<boolean> {
  const plan = await getUserPlan()
  return plan === 'pro'
}