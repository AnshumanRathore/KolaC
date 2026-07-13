# KolaC

KolaC is a learning/communication-practice web app. This repo currently
contains the frontend + auth foundation, built module by module.

**Theme:** a "secure access badge / keycard scanner" visual identity —
dark terminal background, mono-spaced labels, scan-line animations,
barcode motifs — used consistently across every module.

**Stack:** Next.js 14 (App Router, TypeScript) + Supabase (Auth + will
host the database once persistence is added).

---

## 1. Project status

| Module | Status | Notes |
|---|---|---|
| **Module 1 — Authentication** | ✅ Done | Login, Signup, Google OAuth, Profile. Fully working against Supabase. |
| **Module 2 — Dashboard** | ✅ Done | Greeting, streak, topic generator, progress ring, stats, streak history. Data is currently mock/local state. |
| **Module 3 — Speaking Session** | 🚧 In progress | All components are built (topic card, 5-tab workflow, mic recording, mock transcript + AI feedback, reflection journal, sidebar) but **not yet wired into a page** — no route, no styling pass, not linked in the navbar yet. Not runnable in this snapshot. |

### What's real vs. mocked right now
- **Real:** email/password auth, Google OAuth, session handling, route
  protection (middleware), the profile page's user data, and (once
  wired) real microphone/camera recording via the browser's Web Audio /
  MediaRecorder APIs.
- **Mocked (local state only, resets on refresh):** streak counts, topic
  lists, dashboard stats, speaking-session transcripts, and AI feedback
  scores. None of this is persisted to a database yet — there's no
  `sessions`, `progress`, or `streaks` table in Supabase yet.

---

## 2. Project structure

```
app/
  layout.tsx              Root layout, fonts, brand title template
  globals.css              All design tokens + component styles (the theme)
  page.tsx                 Landing page

  login/                   Module 1
  signup/
  profile/
  auth/callback/           Supabase OAuth redirect handler
  middleware.ts             Route protection + session refresh

  dashboard/               Module 2
    page.tsx
    dashboard-client.tsx

  speaking/                Module 3 (components built, not yet wired)
    data.ts                Topics, vocabulary, phrases, structure
    mock-analysis.ts       Mock transcript + AI feedback generator
    components/
      topic-card.tsx
      session-tabs.tsx
      sidebar.tsx
      save-modal.tsx
      tabs/
        read-topic.tsx
        record.tsx          Real mic/camera recording + live waveform
        transcript.tsx
        feedback.tsx
        reflection.tsx

components/
  logo.tsx                 KolaC brand mark
  navbar.tsx                Top nav for authenticated pages

lib/supabase/
  client.ts                Browser Supabase client
  server.ts                Server Supabase client
```

---

## 3. Local setup

### Requirements
- Node.js 18+
- A free [Supabase](https://supabase.com) project
- A Google Cloud OAuth client (for Google Login)

### Steps
```bash
npm install
cp .env.local.example .env.local
```

Fill in `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=https://YOUR-PROJECT-ID.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR-ANON-PUBLIC-KEY
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Then in your Supabase dashboard:
1. **Authentication → Providers → Email** — enabled by default.
2. **Authentication → Providers → Google** — toggle on, and paste in a
   Client ID/Secret from [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
   (Authorized redirect URI: `https://YOUR-PROJECT-ID.supabase.co/auth/v1/callback`).

Run it:
```bash
npm run dev
```
Visit **http://localhost:3000**.

---

## 4. Deployment (checking it live)

**Short answer: use Vercel, not GitHub Pages.**

GitHub Pages only serves static HTML/CSS/JS files. This app relies on
things GitHub Pages can't run:
- `middleware.ts` (server code that protects `/dashboard` and `/profile`)
- `app/auth/callback/route.ts` (a server route that completes Google login)
- Environment variables kept server-side (your Supabase keys)

You *could* force Next.js into "static export" mode to get something onto
GitHub Pages, but that means deleting the middleware and the auth
callback route — i.e. login would stop working. Not worth it here.

**Vercel** is built by the makers of Next.js, has a free tier, and just
works with everything in this repo (middleware, server routes, etc.)
with zero config changes.

### Steps to deploy on Vercel
1. Push this project to a GitHub repo.
2. Go to [vercel.com](https://vercel.com) → **Add New Project** → import
   that repo.
3. In the project's **Settings → Environment Variables**, add the same
   three variables from `.env.local`, but set:
   ```
   NEXT_PUBLIC_SITE_URL=https://your-project-name.vercel.app
   ```
4. Deploy. Vercel gives you a live URL immediately.
5. **Update two places so login keeps working on the live URL:**
   - Supabase → **Authentication → URL Configuration** — add your Vercel
     URL to "Redirect URLs."
   - Google Cloud Console → your OAuth client → **Authorized redirect
     URIs** — this one stays pointed at Supabase's callback
     (`https://YOUR-PROJECT-ID.supabase.co/auth/v1/callback`), so no
     change needed there.

Every push to your main branch after that auto-deploys.

---

## 5. What's next
1. **Wire up Module 3** — create `app/speaking/page.tsx` +
   `speaking-client.tsx` to assemble the already-built components, add
   the missing CSS classes to `globals.css`, add "Speaking" to the
   navbar, and protect `/speaking` in `middleware.ts`.
2. **Persistence** — add Supabase tables for sessions, streaks, and
   progress so Module 2 and 3 stop resetting on refresh.
3. **Module 4+** — whatever comes after Speaking Session (not scoped yet).
