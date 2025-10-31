import { hasProPlan } from '@/lib/subscription'
import { getProfile } from '@/lib/actions/profile.actions'
import { getAnalyses } from '@/lib/actions/analysis.actions'
import DatabaseSetupRequired from './_components/DatabaseSetupRequired'
import SimpleProfileForm from './_components/SimpleProfileForm'
import AnalysesSection from './_components/AnalysesSection'

export default async function Dashboard() {
  const hasPro = await hasProPlan()

  if (!hasPro) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="max-w-md p-6 bg-card rounded-lg border border-border text-center">
          <h2 className="text-xl font-semibold text-card-foreground mb-3">
            Upgrade Required
          </h2>
          <p className="text-muted-foreground">
            You need to upgrade your plan to access the dashboard.
          </p>
        </div>
      </div>
    )
  }

  // Try to get profile and analyses, handle database errors gracefully
  let profile = null
  let analyses: any[] = []
  let databaseError = false

  try {
    profile = await getProfile()
    if (profile) {
      analyses = await getAnalyses()
    }
  } catch (error) {
    console.error('Database error:', error)
    databaseError = true
  }

  return (
    <div className="min-h-screen dark-bg">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-lime-gradient mb-3">
            {profile ? 'Dashboard' : 'Setup Your Profile'}
          </h1>
          <p className="text-white/60 text-lg">
            {profile
              ? 'Test your Supabase + Clerk connection with RLS isolation'
              : 'Create your profile to test the database connection'
            }
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {databaseError ? (
            <DatabaseSetupRequired />
          ) : (
            <>
              <SimpleProfileForm profile={profile} />
              {profile && <AnalysesSection initialAnalyses={analyses} />}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
