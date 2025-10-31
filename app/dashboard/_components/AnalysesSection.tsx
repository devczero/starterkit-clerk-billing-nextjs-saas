'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { createAnalysis, updateAnalysis, deleteAnalysis } from '@/lib/actions/analysis.actions'
import type { Analysis, AnalysisFormData } from '@/lib/actions/analysis.actions'

interface AnalysesSectionProps {
  initialAnalyses: Analysis[]
}

export default function AnalysesSection({ initialAnalyses }: AnalysesSectionProps) {
  const [analyses, setAnalyses] = useState<Analysis[]>(initialAnalyses)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [formData, setFormData] = useState<AnalysisFormData>({
    title: '',
    description: '',
    status: 'draft',
  })
  const [pending, start] = useTransition()
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const router = useRouter()

  const resetForm = () => {
    setFormData({ title: '', description: '', status: 'draft' })
    setEditingId(null)
    setIsCreating(false)
  }

  const handleEdit = (analysis: Analysis) => {
    setFormData({
      title: analysis.title,
      description: analysis.description || '',
      status: analysis.status,
    })
    setEditingId(analysis.id)
    setIsCreating(false)
  }

  const handleCreate = () => start(async () => {
    try {
      if (!formData.title.trim()) {
        setMessage({ type: 'error', text: 'Title is required' })
        return
      }

      await createAnalysis(formData)
      setMessage({ type: 'success', text: 'Analysis created successfully!' })
      resetForm()
      router.refresh()
      setTimeout(() => setMessage(null), 3000)
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'
      setMessage({ type: 'error', text: `Failed to create: ${errorMessage}` })
    }
  })

  const handleUpdate = (id: string) => start(async () => {
    try {
      if (!formData.title.trim()) {
        setMessage({ type: 'error', text: 'Title is required' })
        return
      }

      await updateAnalysis(id, formData)
      setMessage({ type: 'success', text: 'Analysis updated successfully!' })
      resetForm()
      router.refresh()
      setTimeout(() => setMessage(null), 3000)
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'
      setMessage({ type: 'error', text: `Failed to update: ${errorMessage}` })
    }
  })

  const handleDelete = (id: string) => start(async () => {
    if (!confirm('Are you sure you want to delete this analysis?')) return

    try {
      await deleteAnalysis(id)
      setMessage({ type: 'success', text: 'Analysis deleted successfully!' })
      router.refresh()
      setTimeout(() => setMessage(null), 3000)
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'
      setMessage({ type: 'error', text: `Failed to delete: ${errorMessage}` })
    }
  })

  return (
    <div className="glass-card p-8 rounded-xl">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-lime-300">Your Analyses</h2>
        <button
          onClick={() => setIsCreating(true)}
          disabled={isCreating || editingId !== null || pending}
          className="px-4 py-2 glass-button-primary rounded-lg text-sm font-medium transition-all duration-300 disabled:opacity-50"
        >
          + New Analysis
        </button>
      </div>

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

      {/* Create/Edit Form */}
      {(isCreating || editingId) && (
        <div className="mb-6 p-6 bg-white/5 rounded-lg border border-white/10">
          <h3 className="text-lg font-semibold text-white mb-4">
            {isCreating ? 'Create New Analysis' : 'Edit Analysis'}
          </h3>

          <div className="space-y-4">
            <div>
              <label className="block text-white font-medium mb-2">
                Title <span className="text-red-400">*</span>
              </label>
              <input
                className="w-full px-4 py-3 glass-input text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-lime-400/50"
                placeholder="Analysis title"
                value={formData.title}
                onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))}
                maxLength={100}
              />
            </div>

            <div>
              <label className="block text-white font-medium mb-2">Description</label>
              <textarea
                className="w-full px-4 py-3 glass-input text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-lime-400/50 resize-none h-20"
                placeholder="Analysis description..."
                value={formData.description}
                onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
                maxLength={500}
              />
            </div>

            <div>
              <label className="block text-white font-medium mb-2">Status</label>
              <select
                className="w-full px-4 py-3 glass-input text-white focus:outline-none focus:ring-2 focus:ring-lime-400/50 bg-transparent"
                value={formData.status}
                onChange={e => setFormData(prev => ({ ...prev, status: e.target.value }))}
              >
                <option value="draft" className="bg-gray-900">Draft</option>
                <option value="in-progress" className="bg-gray-900">In Progress</option>
                <option value="completed" className="bg-gray-900">Completed</option>
              </select>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => isCreating ? handleCreate() : handleUpdate(editingId!)}
                disabled={pending || !formData.title.trim()}
                className="flex-1 px-6 py-3 glass-button-primary rounded-lg text-white font-medium transition-all duration-300 disabled:opacity-50"
              >
                {pending ? (isCreating ? 'Creating...' : 'Updating...') : (isCreating ? 'Create' : 'Update')}
              </button>
              <button
                onClick={resetForm}
                disabled={pending}
                className="px-6 py-3 glass-button rounded-lg text-white font-medium transition-all duration-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Analyses List */}
      {initialAnalyses.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-white/60">No analyses yet. Create your first one!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {initialAnalyses.map((analysis) => (
            <div key={analysis.id} className="p-6 bg-white/5 rounded-lg border border-white/10 hover:border-lime-400/30 transition-all duration-300">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white mb-1">{analysis.title}</h3>
                  {analysis.description && (
                    <p className="text-white/60 text-sm">{analysis.description}</p>
                  )}
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  analysis.status === 'completed' ? 'bg-lime-500/20 text-lime-400' :
                  analysis.status === 'in-progress' ? 'bg-blue-500/20 text-blue-400' :
                  'bg-gray-500/20 text-gray-400'
                }`}>
                  {analysis.status}
                </span>
              </div>

              <div className="flex items-center justify-between text-xs text-white/40 mb-4">
                <span>Created: {new Date(analysis.created_at).toLocaleDateString()}</span>
                <span>ID: {analysis.id.slice(0, 8)}...</span>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(analysis)}
                  disabled={pending || editingId !== null || isCreating}
                  className="px-4 py-2 bg-lime-500/10 hover:bg-lime-500/20 border border-lime-500/30 rounded-lg text-lime-400 text-sm font-medium transition-all duration-300 disabled:opacity-50"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(analysis.id)}
                  disabled={pending}
                  className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 rounded-lg text-red-400 text-sm font-medium transition-all duration-300 disabled:opacity-50"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
