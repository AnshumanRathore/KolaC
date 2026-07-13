# Auth Module (Login, Signup, Google Login, Profile)

Built with **Next.js (App Router)** + **Supabase Auth**. Supabase gives you
a hosted database and auth system, so you don't need to build your own
backend for this module.

## 1. Create a Supabase project
1. Go to https://supabase.com → New Project (free tier is fine).
2. Once created, go to **Settings → API** and copy:
   - Project URL
   - anon public key
3. Paste them into a `.env.local` file (copy `.env.local.example` → `.env.local`).

## 2. Enable email/password auth
Supabase enables email/password sign-up by default.
Go to **Authentication → Providers → Email** and make sure it's enabled.
(Optional: turn OFF "Confirm email" while testing locally, so signup logs
you in immediately instead of waiting for an email.)

## 3. Enable Google login
1. In Supabase: **Authentication → Providers → Google** → toggle it on.
2. You'll need a Google OAuth Client ID/Secret:
   - Go to https://console.cloud.google.com/apis/credentials
   - Create an **OAuth client ID** → Application type: **Web application**.
   - Under **Authorized redirect URIs**, add the callback URL shown on the
     Supabase Google provider page (looks like
     `https://YOUR-PROJECT-ID.supabase.co/auth/v1/callback`).
   - Copy the generated **Client ID** and **Client Secret** into Supabase's
     Google provider settings and save.

## 4. Install and run
```bash
npm install
npm run dev
```
Visit http://localhost:3000

## How it's structured
- `/login` — email/password login + "Continue with Google"
- `/signup` — email/password signup + "Sign up with Google"
- `/auth/callback` — Google redirects here; exchanges the code for a session
- `/profile` — protected page, shows the logged-in user's name/email/avatar,
  has a Log Out button
- `middleware.ts` — keeps sessions refreshed and redirects unauthenticated
  users away from `/profile`

## Module 2 — Dashboard
- `/dashboard` — protected home screen after login: greeting, streak, a
  "Today's Topic" generator with a checklist that drives a live progress
  ring, stat cards, and a 30-day streak "barcode".
- The topic list, streak numbers, and stats are **mock/local state** for
  now (no database table yet) — search for `TOPICS`, `CURRENT_STREAK`, and
  the stat card values in `app/dashboard/dashboard-client.tsx` to wire them
  up to real data later.
- Branding: the `KolaC` logo (`components/logo.tsx`) and top navbar
  (`components/navbar.tsx`) appear on Dashboard and Profile. Every page's
  browser tab title now reads like `Dashboard · KolaC`, `Login · KolaC`,
  etc. (set via each route's `layout.tsx`/`metadata` and the title
  template in the root `app/layout.tsx`).

## Notes
- User accounts, sessions, and password hashing are all handled by Supabase
  — you don't need your own database table for basic auth.
- If you later want extra profile fields (bio, phone, preferences), create
  a `profiles` table in Supabase keyed by `user.id` and fetch/join it in
  `app/profile/page.tsx`.
- When you deploy (e.g. Vercel), update `NEXT_PUBLIC_SITE_URL` to your real
  domain, and add that domain's `/auth/callback` URL to Google's
  Authorized redirect URIs too.
