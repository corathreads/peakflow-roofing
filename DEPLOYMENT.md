# PeakFlow Roofing Deployment

## Recommended Host

Use Vercel for the web app and Supabase for auth + synced data.

## Before Deploying

1. Create a Supabase project.
2. Run `supabase-schema.sql` in the Supabase SQL editor.
3. In Supabase, copy the project URL and anon key.
4. In Vercel, add these environment variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`

## Deploy On Vercel

### Option 1: Vercel Dashboard

1. Push this project to GitHub.
2. Import the repo into Vercel.
3. Vercel should detect it as a Vite app automatically.
4. Add the Supabase environment variables.
5. Deploy.

### Option 2: Vercel CLI

1. Install the Vercel CLI:
   `npm i -g vercel`
2. In this project folder run:
   `vercel`
3. Add the environment variables in the Vercel dashboard or CLI.
4. Redeploy if needed:
   `vercel --prod`

## Build Check

Local production build:

```bash
npm run build
```

## Product Name

Deploy this as:

`PeakFlow Roofing`
