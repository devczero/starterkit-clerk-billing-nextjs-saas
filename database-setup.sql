-- =============================================================================
-- COMPLETE SUPABASE + CLERK SETUP - STARTER KIT WITH BILLING
-- =============================================================================
-- This creates tables to test Supabase + Clerk integration with proper RLS
-- Run this ONCE in a fresh Supabase database (no need to drop anything first)
-- =============================================================================

-- =============================================================================
-- PROFILES TABLE - User profile information
-- =============================================================================

CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  email TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_profiles_user_id ON profiles(user_id);

-- =============================================================================
-- ANALYSES TABLE - User-specific analysis records (for testing RLS)
-- =============================================================================

CREATE TABLE IF NOT EXISTS analyses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'draft',
  data JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_analyses_user_id ON analyses(user_id);
CREATE INDEX IF NOT EXISTS idx_analyses_status ON analyses(status);

-- =============================================================================
-- ENABLE ROW LEVEL SECURITY
-- =============================================================================

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE analyses ENABLE ROW LEVEL SECURITY;

-- =============================================================================
-- RLS POLICIES FOR PROFILES
-- =============================================================================

CREATE POLICY "Users can view their own profile" ON profiles
  FOR SELECT USING (auth.jwt() ->> 'sub' = user_id);

CREATE POLICY "Users can insert their own profile" ON profiles
  FOR INSERT WITH CHECK (auth.jwt() ->> 'sub' = user_id);

CREATE POLICY "Users can update their own profile" ON profiles
  FOR UPDATE USING (auth.jwt() ->> 'sub' = user_id)
  WITH CHECK (auth.jwt() ->> 'sub' = user_id);

CREATE POLICY "Users can delete their own profile" ON profiles
  FOR DELETE USING (auth.jwt() ->> 'sub' = user_id);

-- =============================================================================
-- RLS POLICIES FOR ANALYSES
-- =============================================================================

CREATE POLICY "Users can view their own analyses" ON analyses
  FOR SELECT USING (auth.jwt() ->> 'sub' = user_id);

CREATE POLICY "Users can insert their own analyses" ON analyses
  FOR INSERT WITH CHECK (auth.jwt() ->> 'sub' = user_id);

CREATE POLICY "Users can update their own analyses" ON analyses
  FOR UPDATE USING (auth.jwt() ->> 'sub' = user_id)
  WITH CHECK (auth.jwt() ->> 'sub' = user_id);

CREATE POLICY "Users can delete their own analyses" ON analyses
  FOR DELETE USING (auth.jwt() ->> 'sub' = user_id);

-- =============================================================================
-- FUNCTIONS AND TRIGGERS
-- =============================================================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_analyses_updated_at
  BEFORE UPDATE ON analyses
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();