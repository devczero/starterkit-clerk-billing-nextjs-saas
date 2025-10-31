# dev-saas

## Tech Stack
- **Frontend**: Next.js 15 (App Router), TypeScript, Tailwind CSS v4
- **Authentication**: Clerk
- **Database**: Supabase (PostgreSQL)
- **UI Components**: Radix UI, Lucide React
- **Styling**: Glass morphism with lime accent theme

## Prerequisites
- Node.js 18+ installed
- Git installed
- Supabase account
- Clerk account

---

## Step 1: Project Setup

### 1.1 Create Next.js Project
```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir=false --import-alias="@/*"

```

### 1.2 Install Dependencies
```bash
npm install @clerk/nextjs @supabase/ssr @supabase/supabase-js
npm install @radix-ui/react-progress @radix-ui/react-slot class-variance-authority
npm install clsx framer-motion lru-cache lucide-react pdfjs-dist svix
npm install tailwind-merge tailwindcss-animate zod

npm install -D @types/node @types/react @types/react-dom
```

### 1.3 Update package.json Scripts
Edit `package.json`:
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  }
}
```

---

## Step 2: Environment Configuration

### 2.1 Create .env
```bash
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key


### 2.2 Add .env.local to .gitignore
```bash
echo ".env" >> .gitignore
```

---

## Step 3: Database Setup (Supabase)

### 3.1 Create Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Create new project
3. Wait for setup to complete
4. Get your project URL and keys from Settings > API

### 3.2 Setup Database Schema
Go to SQL Editor in Supabase Dashboard and run the script from database-setup.sql

---

## Step 4: Clerk Authentication Setup

### 4.1 Create Clerk Application
1. Go to [clerk.com](https://clerk.com)
2. Create new application
3. Choose authentication methods (Email/Password, Google, etc.)
4. Get your publishable and secret keys

### 4.2 Configure Clerk Settings
In Clerk Dashboard:
1. **Sessions**: Set session lifetime
2. **User Profile**: Configure required fields
3. **Webhooks**: Set up webhook for user events (optional)
4. **Organizations**: Disable if not needed
