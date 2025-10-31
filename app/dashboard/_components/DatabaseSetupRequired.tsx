// =============================================================================
// DATABASE SETUP REQUIRED COMPONENT - EDUCATIONAL VERSION
// =============================================================================
//
// PURPOSE: Guide users through Supabase database setup when tables don't exist
// BUSINESS LOGIC: Blocks app usage until database is properly configured
// UX PATTERN: Friendly error state with actionable instructions
//
// WHEN THIS SHOWS:
// 1. User visits dashboard for first time
// 2. Database tables don't exist yet
// 3. getProfile() server action fails with table not found error
//
// ARCHITECTURE ROLE:
// - Error boundary for database connectivity
// - Self-service setup instructions
// - Prevents broken UI from missing database
//
// REACT PATTERNS DEMONSTRATED:
// - Client component (uses useState for interactivity)
// - Conditional rendering ({showInstructions && ...})
// - Event handlers (onClick)
// - State management for UI toggles
//

'use client' // Next.js directive: this component runs in browser (not server)

// React hooks for state management
// useState: Manages local component state (show/hide instructions)
import { useState } from 'react'

// Default export: ES6 module pattern for components
// Function component: Modern React pattern (hooks instead of classes)
export default function DatabaseSetupRequired() {
  // =============================================================================
  // COMPONENT STATE
  // =============================================================================
  //
  // STATE MANAGEMENT: Simple boolean toggle for expandable instructions
  // INITIAL VALUE: false (instructions hidden by default)
  // PATTERN: Accordion/collapsible content for better UX
  //
  // WHY LOCAL STATE:
  // - UI-only state (doesn't need global state management)
  // - Component-specific behavior
  // - No persistence needed (resets on page reload)
  //
  const [showInstructions, setShowInstructions] = useState(false)

  // =============================================================================
  // RENDER METHOD
  // =============================================================================
  //
  // UI STRUCTURE: Centered card with icon, title, and expandable instructions
  // STYLING APPROACH: Tailwind CSS with custom glass morphism classes
  // ACCESSIBILITY: Semantic HTML with proper heading hierarchy
  //
  return (
    // MAIN CONTAINER: Glass morphism card with centered content
    // glass-card: Custom CSS class for backdrop-blur effect
    // p-8: Padding 2rem on all sides
    // rounded-xl: Large border radius for modern look
    // text-center: Center-align all text content
    <div className="glass-card p-8 rounded-xl text-center">
      {/* VISUAL ICON: Database symbol to communicate purpose */}
      {/* DESIGN PATTERN: Circular icon container with glow effect */}
      {/* ACCESSIBILITY: Decorative icon (no alt text needed) */}
      <div className="w-16 h-16 mx-auto mb-6 rounded-full glass-card flex items-center justify-center glow-lime">
        {/* SVG ICON: Database/document icon from Heroicons */}
        {/* STYLING: Lime green color matching app theme */}
        {/* SIZE: w-8 h-8 (2rem) for good visual hierarchy */}
        <svg className="w-8 h-8 text-lime-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {/* DATABASE ICON PATHS: Visual representation of data storage */}
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 1.79 4 4 4h8c0 2.21 1.79 4 4 4V7c0-2.21-1.79-4-4-4H8c-2.21 0-4 1.79-4 4z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 11h6" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 15h6" />
        </svg>
      </div>
      
      {/* PRIMARY HEADING: Clear problem statement */}
      {/* TYPOGRAPHY: Large, bold text for attention */}
      {/* COLOR: Pure white for high contrast against dark background */}
      <h2 className="text-2xl font-bold text-white mb-4">Database Setup Required</h2>

      {/* DESCRIPTION: Explains why this screen is showing */}
      {/* UX PATTERN: Non-technical language for all skill levels */}
      {/* OPACITY: text-white/70 for visual hierarchy (less prominent than heading) */}
      <p className="text-white/70 mb-6 leading-relaxed">
        The Linktree database tables need to be created in Supabase before you can use this feature.
      </p>
      
      {/* TOGGLE BUTTON: Expand/collapse instructions */}
      {/* INTERACTION PATTERN: Clear action with dynamic text */}
      {/* ACCESSIBILITY: Button text changes based on state */}
      <button
        // EVENT HANDLER: Toggle boolean state
        // PATTERN: !previous flips true<->false
        onClick={() => setShowInstructions(!showInstructions)}

        // STYLING BREAKDOWN:
        // px-6 py-3: Comfortable click target (accessibility)
        // glass-button-primary: Custom styled button class
        // rounded-xl: Consistent border radius with parent container
        // transition-all duration-300: Smooth animations
        // hover:scale-105: Subtle grow effect on hover
        // glow-hover: Custom glow effect class
        className="px-6 py-3 glass-button-primary rounded-xl text-white font-medium transition-all duration-300 transform hover:scale-105 glow-hover mb-6"
      >
        {/* CONDITIONAL TEXT: Changes based on state */}
        {/* TERNARY OPERATOR: condition ? ifTrue : ifFalse */}
        {/* UX: Clear action indication */}
        {showInstructions ? 'Hide Instructions' : 'Show Setup Instructions'}
      </button>

      {/* CONDITIONAL RENDERING: Only show instructions when toggled */}
      {/* REACT PATTERN: {condition && <JSX>} renders JSX only if condition is true */}
      {/* SHORT-CIRCUIT EVALUATION: If showInstructions is false, nothing renders */}
      {showInstructions && (
        // INSTRUCTIONS CONTAINER: Nested glass card for visual separation
        // text-left: Override parent's text-center for readable instructions
        // space-y-4: Vertical spacing between child elements
        // text-sm: Smaller text size for detailed instructions
        <div className="glass-card p-6 text-left space-y-4 text-sm">
          {/* SECTION HEADING: Branded with lime accent color */}
          {/* TYPOGRAPHY: Smaller than main heading but still prominent */}
          <h3 className="text-lg font-semibold text-lime-300 mb-4">Quick Setup Instructions:</h3>

          {/* STEPS CONTAINER: Organized list of setup actions */}
          {/* space-y-4: Consistent spacing between steps */}
          <div className="space-y-4">
            {/* STEP 1: Numbered instruction with icon */}
            {/* LAYOUT: Flexbox with icon on left, content on right */}
            <div className="flex items-start gap-3">
              {/* STEP NUMBER: Circular badge with number */}
              {/* DESIGN: Consistent with app's lime theme */}
              {/* flex-shrink-0: Prevents icon from shrinking */}
              {/* mt-0.5: Slight top margin for visual alignment */}
              <div className="w-6 h-6 rounded-full bg-lime-500/20 text-lime-300 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">1</div>
              <div>
                {/* PRIMARY INSTRUCTION: What to do */}
                <p className="text-white font-medium">Open your Supabase dashboard</p>
                {/* SECONDARY DETAIL: How to do it */}
                <p className="text-white/60">Go to your project → SQL Editor</p>
              </div>
            </div>
            
            {/* STEP 2: Database schema setup */}
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-lime-500/20 text-lime-300 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">2</div>
              <div>
                <p className="text-white font-medium">Run the database setup script</p>
                {/* CODE REFERENCE: Inline code styling */}
                {/* bg-white/10: Subtle background for code */}
                {/* text-lime-300: Highlight important filename */}
                <p className="text-white/60">Copy and execute the contents of <code className="bg-white/10 px-2 py-1 rounded text-lime-300">database-setup.sql</code></p>
              </div>
            </div>
            
            {/* STEP 3: Database functions setup */}
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-lime-500/20 text-lime-300 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">3</div>
              <div>
                <p className="text-white font-medium">Run the functions script</p>
                {/* SECOND FILE: Additional database setup */}
                <p className="text-white/60">Copy and execute the contents of <code className="bg-white/10 px-2 py-1 rounded text-lime-300">database-functions.sql</code></p>
              </div>
            </div>
            
            {/* STEP 4: Verification step */}
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-lime-500/20 text-lime-300 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">4</div>
              <div>
                <p className="text-white font-medium">Refresh this page</p>
                {/* SUCCESS MESSAGE: Positive outcome expectation */}
                <p className="text-white/60">The database tables should now be ready!</p>
              </div>
            </div>
          </div>
          
          {/* WARNING CALLOUT: Important additional information */}
          {/* DESIGN PATTERN: Warning box with icon and colored background */}
          {/* COLOR SYSTEM: Yellow for warnings (not errors) */}
          <div className="mt-6 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
            <div className="flex items-start gap-2">
              {/* WARNING ICON: Triangle with exclamation */}
              <svg className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <div>
                {/* CALLOUT HEADING: Emphasizes importance */}
                <p className="text-yellow-300 font-medium text-sm">Important Note</p>
                {/* HELPFUL DETAIL: Prevents common setup mistakes */}
                <p className="text-yellow-200/80 text-sm">
                  Both SQL files are located in your project root directory. Make sure to run them in the correct order.
                </p>
              </div>
            </div>
          </div>
          
          {/* REFRESH BUTTON: Convenient action after setup */}
          {/* DOM API: window.location.reload() forces page refresh */}
          {/* UX: Saves user from manual browser refresh */}
          <button
            // BROWSER API: Reloads the current page
            // WHY NEEDED: Re-runs server actions to check if database now exists
            onClick={() => window.location.reload()}

            // FULL WIDTH: Prominent call-to-action
            // SUBTLE STYLING: Less prominent than main toggle button
            className="w-full mt-4 px-4 py-2 glass-button rounded-lg text-white/80 hover:text-white font-medium transition-all duration-300"
          >
            Refresh Page After Setup
          </button>
        </div>
      )}
      
      {/* HELP TEXT: Additional support information */}
      {/* TYPOGRAPHY: Small, subtle text for optional information */}
      {/* PLACEMENT: Bottom of component for supplementary help */}
      <div className="mt-6 text-white/40 text-xs">
        {/* SUPPORT RESOURCES: Points to additional help */}
        <p>Need help? Check the project README or Supabase documentation.</p>
      </div>
    </div>
  )
}