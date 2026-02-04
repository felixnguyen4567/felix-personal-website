# Deployment Guide

## Prerequisites

1.  **Vercel Account:** For hosting the Next.js application.
2.  **Supabase Account:** For Database and Authentication.
3.  **Environment Variables:** You will need the following secrets.

## Environment Variables

Configure these in Vercel Project Settings:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
DATABASE_URL=... (Transaction Mode - Port 6543)
DIRECT_URL=... (Session Mode - Port 5432)

# Automation
AUTOMATION_API_KEY=... (Generate a strong random string)
```

## First Deployment

1.  **Push to GitHub:** Ensure your repository is up to date.
2.  **Import to Vercel:** Connect your GitHub repo.
3.  **Build Settings:** Default Next.js settings are fine.
4.  **Deploy:** Click Deploy.

## Post-Deployment

1.  **Database Migration:**
    - Vercel does not run `prisma migrate` automatically.
    - Run locally against production DB or use Supabase SQL Editor.
    - Command: `npx prisma db push` (easiest for small projects).

2.  **Create Admin User:**
    - Sign up via the Supabase Auth UI or manually insert a user into `auth.users`.
    - Create a corresponding record in `public.User` if not using triggers (The app creates one lazily on first action, but best to set up).

## Systems Check

- Visit `/en/admin/login`.
- Login and check `/admin/system` for audit logs.
- Test Automation API using Curl:

```bash
curl -X POST https://your-site.com/api/automation \
  -H "Authorization: Bearer YOUR_KEY" \
  -H "Content-Type: application/json" \
  -d '{"title_en": "Hello Bot", "slug": "hello-bot", "content_en": "Sent from curl"}'
```
