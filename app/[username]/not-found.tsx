import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen dark-bg flex items-center justify-center">
      <div className="text-center">
        <div className="mb-8">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full glass-card flex items-center justify-center glow-lime">
            <svg className="w-12 h-12 text-lime-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">Profile Not Found</h1>
          <p className="text-white/60 text-lg mb-2">
            The profile you&apos;re looking for doesn&apos;t exist or has been made private.
          </p>
          <p className="text-white/40 text-sm">
            Double-check the username or contact the profile owner.
          </p>
        </div>
        
        <div className="space-y-4">
          <Link
            href="/"
            className="inline-block px-6 py-3 glass-button-primary rounded-xl text-white font-medium transition-all duration-300 transform hover:scale-105 glow-hover"
          >
            Go Home
          </Link>
          <div>
            <Link
              href="/dashboard"
              className="inline-block px-6 py-3 glass-button rounded-xl text-white/80 hover:text-white font-medium transition-all duration-300 transform hover:scale-105"
            >
              Create Your Profile
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}