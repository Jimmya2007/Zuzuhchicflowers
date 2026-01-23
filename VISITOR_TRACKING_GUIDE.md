# Visitor Tracking System - Production Deployment Guide

## Overview
The visitor tracking system tracks page visits and displays statistics on the admin dashboard. This guide ensures everything works correctly in production.

## System Components

### 1. Database Table
- **Table**: `public.visitors`
- **Columns**:
  - `id`: UUID (primary key)
  - `ip_address`: TEXT (optional, for unique visitor counting)
  - `user_agent`: TEXT (browser info)
  - `page_url`: TEXT (visited page)
  - `referrer`: TEXT (where visitor came from)
  - `visit_date`: DATE (visit date for daily statistics)
  - `created_at`: TIMESTAMPTZ (exact timestamp)

### 2. Migrations Required
Execute these migrations in order:

1. **20260121000001_add_visitors.sql** - Creates visitors table with indexes
2. **20260121000006_fix_visitors_rls_production.sql** - Fixes RLS policies for production

### 3. Row Level Security (RLS) Policies

**For Public Users (Anonymous)**:
- ✅ **INSERT** - Anyone can create visit records
- ❌ **SELECT** - No read access (privacy)

**For Authenticated Users (Admin)**:
- ✅ **SELECT** - Can read all visitor data for dashboard
- ❌ **INSERT** - Uses public endpoint

### 4. Code Implementation

**Frontend Tracking** (`src/utils/visitorTracker.ts`):
- `trackPageVisit()` - Tracks individual page visits
- `getTotalVisitors()` - Gets total visitor count
- `getTodayVisitors()` - Gets today's visitor count
- `initVisitorTracking()` - Initializes tracking on app load

**App Integration** (`src/app/App.tsx`):
- Calls `initVisitorTracking()` on app mount
- Tracks URL changes automatically
- Silent failure (doesn't break UX if tracking fails)

**Dashboard Display** (`src/app/components/pages/ValentineDashboard.tsx`):
- Loads visitor stats from database
- Displays total visitors and today's visitors
- Updates stats in real-time

## Pre-Deployment Checklist

### Database Setup
- [ ] Execute migration `20260121000001_add_visitors.sql`
- [ ] Execute migration `20260121000006_fix_visitors_rls_production.sql`
- [ ] Verify RLS is enabled on visitors table
- [ ] Test INSERT permission for anonymous users
- [ ] Test SELECT permission for authenticated users

### Configuration
- [ ] Verify `projectId` is set correctly in `/utils/supabase/info.tsx`
- [ ] Verify `publicAnonKey` is set correctly in `/utils/supabase/info.tsx`
- [ ] Ensure Supabase URL is correct: `https://{projectId}.supabase.co`

### Testing
- [ ] Test visitor tracking on localhost
- [ ] Verify visitor data appears in database
- [ ] Check admin dashboard shows visitor counts
- [ ] Test with different pages
- [ ] Verify console logs show successful tracking

## Deployment Steps

### Step 1: Deploy Migrations
```sql
-- Connect to Supabase SQL Editor and run:

-- Migration 1: Create visitors table
-- Copy and paste contents of 20260121000001_add_visitors.sql

-- Migration 2: Fix RLS policies
-- Copy and paste contents of 20260121000006_fix_visitors_rls_production.sql
```

### Step 2: Verify Database Setup
```sql
-- Check table exists
SELECT * FROM public.visitors LIMIT 1;

-- Check RLS is enabled
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE tablename = 'visitors';
-- Should return: rowsecurity = true

-- Check policies exist
SELECT policyname, cmd, qual 
FROM pg_policies 
WHERE tablename = 'visitors';
-- Should show INSERT policy for anon and SELECT policy for authenticated
```

### Step 3: Test Visitor Tracking
1. Open browser console (F12)
2. Visit your website
3. Look for console messages:
   - `🚀 Initializing visitor tracking...`
   - `📊 Tracking page visit: [URL]`
   - `✅ Page visit tracked successfully`

### Step 4: Verify Data in Database
```sql
-- Check recent visits
SELECT * FROM public.visitors 
ORDER BY created_at DESC 
LIMIT 10;

-- Check today's visitor count
SELECT COUNT(*) as today_visitors 
FROM public.visitors 
WHERE visit_date = CURRENT_DATE;

-- Check total visitors
SELECT COUNT(*) as total_visitors 
FROM public.visitors;
```

### Step 5: Test Admin Dashboard
1. Login to admin dashboard
2. Verify visitor counts display:
   - Total Visitors card
   - Today's Visitors card
3. Check console for:
   - `🔄 Loading visitor statistics...`
   - `✅ Visitor stats loaded: { total: X, today: Y }`

## Troubleshooting

### Issue: "Failed to track visit: 401"
**Cause**: RLS policy blocking anonymous inserts
**Solution**: 
```sql
-- Grant INSERT permission to anonymous users
GRANT INSERT ON public.visitors TO anon;

-- Verify policy exists
CREATE POLICY "Enable insert for all users" ON public.visitors
    FOR INSERT WITH CHECK (true);
```

### Issue: "Failed to track visit: 403"
**Cause**: Table permissions not set correctly
**Solution**:
```sql
-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon;
GRANT INSERT ON public.visitors TO anon;
```

### Issue: Dashboard shows 0 visitors
**Cause**: Admin user doesn't have SELECT permission
**Solution**:
```sql
-- Grant SELECT permission to authenticated users
GRANT SELECT ON public.visitors TO authenticated;

-- Verify policy exists
CREATE POLICY "Enable read for authenticated users" ON public.visitors
    FOR SELECT USING (auth.role() = 'authenticated');
```

### Issue: Visitor tracking not initializing
**Cause**: Import error or code not executing
**Solution**:
- Check browser console for errors
- Verify `visitorTracker.ts` is imported in `App.tsx`
- Ensure `initVisitorTracking()` is called in useEffect

### Issue: CORS errors in production
**Cause**: Supabase REST API rejecting requests
**Solution**:
- Verify `apikey` header is included in all requests
- Check that `publicAnonKey` is correct
- Ensure URL format: `https://{projectId}.supabase.co/rest/v1/visitors`

## Production Environment Variables

Ensure these are set correctly:

```typescript
// /utils/supabase/info.tsx
export const projectId = 'sbovtiakuigihbkjgnmo';
export const publicAnonKey = 'YOUR_ANON_KEY_HERE';
export const supabaseUrl = `https://${projectId}.supabase.co`;
```

## Performance Considerations

### Database Indexes
The following indexes are created for optimal performance:
- `idx_visitors_visit_date` - Fast daily statistics
- `idx_visitors_ip_address` - Unique visitor counting
- `idx_visitors_created_at` - Recent visits queries

### Rate Limiting
Consider implementing rate limiting to prevent abuse:
```sql
-- Optional: Add a unique constraint to limit one visit per IP per minute
CREATE UNIQUE INDEX idx_visitors_rate_limit 
ON public.visitors (ip_address, date_trunc('minute', created_at));
```

## Monitoring

### Key Metrics to Monitor
1. **Visit Count Growth**: Track daily visitor increases
2. **Database Size**: Monitor `visitors` table size
3. **Failed Tracking Attempts**: Check browser console logs
4. **API Response Times**: Monitor Supabase API performance

### Cleanup Strategy
Consider implementing data retention policy:
```sql
-- Optional: Delete visits older than 1 year
DELETE FROM public.visitors 
WHERE created_at < NOW() - INTERVAL '1 year';
```

## Success Criteria

✅ **System is working correctly if**:
- Visitor tracking logs appear in browser console
- New records appear in `visitors` table
- Admin dashboard displays accurate counts
- No CORS or permission errors
- Stats update in real-time

## Support

If issues persist after following this guide:
1. Check all migrations are executed
2. Verify RLS policies in Supabase dashboard
3. Test API endpoints directly using browser network tab
4. Check Supabase logs for detailed error messages
5. Ensure Edge Function is deployed and running

## Summary

The visitor tracking system is designed to:
- ✅ Work in production without server-side code
- ✅ Handle failures gracefully
- ✅ Respect user privacy (no PII collected)
- ✅ Provide real-time statistics
- ✅ Scale with your website growth

Follow this guide carefully to ensure smooth deployment! 🚀
