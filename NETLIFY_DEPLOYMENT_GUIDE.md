# Netlify Deployment Guide - Next.js Static Export

## Root Cause Analysis

Your Next.js project is configured for **static export** (`output: 'export'` in `next.config.ts`), which generates static HTML files. The build failure is likely caused by one or more of these issues:

### Primary Issues Identified:

1. **Netlify Auto-Detection Conflict**: Netlify auto-detects Next.js and tries to use `@netlify/plugin-nextjs`, which expects a server-side Next.js app. This conflicts with static export.

2. **Build-Time API Calls**: Your blog pages (`src/app/blog/[slug]/page.tsx` and `src/app/blog/page.tsx`) fetch data from your backend API during build time. If the API is:
   - Not accessible during build (cold start, network issues)
   - Returning errors
   - Timing out
   The build will fail.

3. **Genkit AI Server Code**: While not actively used in production, Next.js may try to process `'use server'` files during build, which can cause issues with static export.

4. **Missing Environment Variables**: If `NEXT_PUBLIC_API_URL` or `NEXT_PUBLIC_SITE_URL` are not set in Netlify, the build may fail or produce incorrect results.

5. **Node.js Version Mismatch**: Netlify defaults to Node 18.x, but your project may need Node 20.x.

## Solution Implemented

### 1. Created `netlify.toml`
- Configured for static export (not server-side Next.js)
- Set Node.js version to 20
- Specified correct publish directory (`out`)
- Added comments to prevent using Next.js Runtime plugin

### 2. Enhanced Error Handling
- Added timeout protection (10 seconds) to API calls during build
- Improved error handling in `generateStaticParams()` and `generateMetadata()`
- Build will continue even if API is temporarily unavailable

### 3. Updated `next.config.ts`
- Added comments explaining static export behavior
- Ensured Genkit AI code won't cause build failures

## Deployment Steps

### Step 1: Set Environment Variables in Netlify

1. Go to your Netlify site dashboard
2. Navigate to **Site settings** → **Environment variables**
3. Add these variables:

```
NEXT_PUBLIC_API_URL=https://avirahub-backend.onrender.com/api
NEXT_PUBLIC_SITE_URL=https://avirahub.in
```

**Important**: Replace with your actual production URLs if different.

### Step 2: Verify Build Settings

1. Go to **Site settings** → **Build & deploy**
2. Verify these settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `out`
   - **Node version**: `20` (or leave blank to use netlify.toml)

### Step 3: Disable Next.js Runtime Plugin (If Enabled)

1. Go to **Site settings** → **Plugins**
2. If you see `@netlify/plugin-nextjs`, **disable or remove it**
3. Static export does NOT need this plugin

### Step 4: Test Build Locally

Before deploying, test the build locally:

```bash
# Set environment variables
export NEXT_PUBLIC_API_URL=https://avirahub-backend.onrender.com/api
export NEXT_PUBLIC_SITE_URL=https://avirahub.in

# Run build
npm run build

# Verify out/ directory is created
ls -la out/
```

If the local build succeeds, Netlify build should also succeed.

### Step 5: Deploy

1. Commit and push the changes:
   ```bash
   git add netlify.toml next.config.ts src/app/blog/
   git commit -m "Fix Netlify deployment for static export"
   git push
   ```

2. Netlify will automatically trigger a new build
3. Monitor the build logs in Netlify dashboard

## Troubleshooting

### Build Still Fails?

#### Check Build Logs
Look for these specific errors:

1. **"Cannot find module 'genkit'" or Genkit-related errors**
   - **Fix**: The Genkit code is being processed. Move `src/ai/` outside `src/` or add to `.gitignore` if not needed in production.

2. **"API fetch failed" or network errors**
   - **Fix**: Your backend API is not accessible during build. Options:
     - Ensure backend is running and accessible
     - Use fallback data during build (already implemented)
     - Consider using ISR (Incremental Static Regeneration) instead of full static export

3. **"NEXT_PUBLIC_* variable not found"**
   - **Fix**: Set environment variables in Netlify dashboard (Step 1 above)

4. **"Module not found" or import errors**
   - **Fix**: Check that all dependencies are in `package.json` and committed to git

5. **"Build timeout"**
   - **Fix**: API calls are taking too long. The timeout protection should help, but you may need to:
     - Optimize API response times
     - Use static fallback data
     - Reduce the number of pages being generated

### Alternative: Use Netlify Functions (If API Must Be Dynamic)

If you need dynamic data fetching at runtime (not build time), consider:

1. Remove `output: 'export'` from `next.config.ts`
2. Use Netlify's Next.js Runtime plugin
3. Convert API calls to client-side only (use `'use client'` and `useEffect`)

However, this requires a different deployment strategy and may incur additional costs.

## Verification Checklist

Before redeploying, verify:

- [ ] `netlify.toml` exists and is committed
- [ ] Environment variables are set in Netlify dashboard
- [ ] Build command is `npm run build`
- [ ] Publish directory is `out`
- [ ] Next.js Runtime plugin is disabled
- [ ] Local build succeeds (`npm run build`)
- [ ] `out/` directory contains HTML files after build
- [ ] Backend API is accessible from Netlify's build servers

## Expected Build Output

After a successful build, you should see:

```
✓ Compiled successfully
✓ Linting and checking validity of types
✓ Collecting page data
✓ Generating static pages
✓ Finalizing page optimization
```

The `out/` directory should contain:
- `index.html`
- `blog/` directory with blog pages
- `_next/` directory with static assets
- Other page HTML files

## Support

If issues persist:
1. Check Netlify build logs for specific error messages
2. Verify all files are committed to git
3. Ensure Node.js version matches (20.x)
4. Test API accessibility from external network

