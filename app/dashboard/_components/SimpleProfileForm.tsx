'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { createProfile, updateProfile, deleteProfile } from '@/lib/actions/profile.actions'
import type { Profile, ProfileFormData } from '@/lib/actions/profile.actions'

interface SimpleProfileFormProps {
  profile?: Profile | null
}

export default function SimpleProfileForm({ profile }: SimpleProfileFormProps) {
  const [formData, setFormData] = useState<ProfileFormData>({
    name: profile?.name || '',
    email: profile?.email || '',
  })
  const [pending, start] = useTransition()
  const [deleteConfirm, setDeleteConfirm] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const router = useRouter()

  const onSubmit = () => start(async () => {
    try {
      if (!formData.name.trim()) {
        setMessage({ type: 'error', text: 'Name is required' })
        return
      }

      if (profile) {
        await updateProfile(formData)
        setMessage({ type: 'success', text: 'Profile updated successfully!' })
      } else {
        await createProfile(formData)
        setMessage({ type: 'success', text: 'Profile created successfully!' })
      }

      router.refresh()
      setTimeout(() => setMessage(null), 3000)
    } catch (error: unknown) {
      console.error('Failed to save profile:', error)
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'
      setMessage({ type: 'error', text: `Failed to save profile: ${errorMessage}` })
    }
  })

  const onDelete = () => start(async () => {
    try {
      await deleteProfile()
      setMessage({ type: 'success', text: 'Profile deleted successfully!' })
      router.refresh()
      setTimeout(() => setMessage(null), 3000)
    } catch (error: unknown) {
      console.error('Failed to delete profile:', error)
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'
      setMessage({ type: 'error', text: `Failed to delete profile: ${errorMessage}` })
    }
  })

  return (
    <div className="glass-card p-8 rounded-xl">
      <h2 className="text-2xl font-bold text-lime-300 mb-6">
        {profile ? 'Update Your Profile' : 'Create Your Profile'}
      </h2>

      {/* Success/Error Message */}
      {message && (
        <div className={`mb-6 p-4 border rounded-lg ${
          message.type === 'success'
            ? 'bg-lime-500/10 border-lime-500/20 text-lime-400'
            : 'bg-red-500/10 border-red-500/20 text-red-400'
        }`}>
          <p className="text-sm">
            {message.type === 'success' ? '✅' : '❌'} {message.text}
          </p>
        </div>
      )}

      {profile && !message && (
        <div className="mb-6 p-4 bg-lime-500/10 border border-lime-500/20 rounded-lg">
          <p className="text-lime-400 text-sm">
            ✅ Database connection successful! Your profile exists.
          </p>
        </div>
      )}

      <div className="space-y-6">
        {/* Name Field */}
        <div>
          <label className="block text-white font-medium mb-2">
            Name <span className="text-red-400">*</span>
          </label>
          <input
            className="w-full px-4 py-3 glass-input text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-lime-400/50 transition-all duration-300"
            placeholder="Your name"
            value={formData.name}
            onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
            maxLength={100}
          />
        </div>

        {/* Email Field */}
        <div>
          <label className="block text-white font-medium mb-2">
            Email (Optional)
          </label>
          <input
            type="email"
            className="w-full px-4 py-3 glass-input text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-lime-400/50 transition-all duration-300"
            placeholder="your@email.com"
            value={formData.email}
            onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
            maxLength={100}
          />
        </div>

        {/* Submit Button */}
        <button
          onClick={onSubmit}
          disabled={pending || !formData.name.trim()}
          className="w-full px-6 py-4 glass-button-primary rounded-xl text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 active:scale-95 glow-hover"
        >
          {pending
            ? (profile ? 'Updating...' : 'Creating...')
            : (profile ? 'Update Profile' : 'Create Profile')
          }
        </button>

        {/* Delete Button (only show if profile exists) */}
        {profile && (
          <div className="pt-4 border-t border-white/10">
            {!deleteConfirm ? (
              <button
                onClick={() => setDeleteConfirm(true)}
                className="w-full px-6 py-3 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 rounded-xl text-red-400 font-medium transition-all duration-300"
              >
                Delete Profile
              </button>
            ) : (
              <div className="space-y-2">
                <p className="text-red-400 text-sm text-center">
                  Are you sure? This cannot be undone.
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={onDelete}
                    disabled={pending}
                    className="flex-1 px-6 py-3 bg-red-500 hover:bg-red-600 rounded-xl text-white font-medium transition-all duration-300 disabled:opacity-50"
                  >
                    {pending ? 'Deleting...' : 'Yes, Delete'}
                  </button>
                  <button
                    onClick={() => setDeleteConfirm(false)}
                    disabled={pending}
                    className="flex-1 px-6 py-3 glass-button rounded-xl text-white font-medium transition-all duration-300"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Debug Info */}
      {profile && (
        <div className="mt-6 p-4 bg-white/5 rounded-lg">
          <p className="text-white/40 text-xs font-mono">
            Profile ID: {profile.id}
          </p>
          <p className="text-white/40 text-xs font-mono">
            Clerk User ID: {profile.user_id}
          </p>
          <p className="text-white/40 text-xs font-mono">
            Created: {new Date(profile.created_at).toLocaleString()}
          </p>
        </div>
      )}
    </div>
  )
}
