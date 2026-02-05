-- ============================================
-- VISITOR TRACKING SETUP - APPLY THIS IN SUPABASE
-- ============================================
-- This SQL script sets up the visitor tracking system
-- Copy and paste this entire script into Supabase SQL Editor and run it

-- Step 1: Create visitors table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.visitors (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ip_address TEXT,
    user_agent TEXT NOT NULL,
    page_url TEXT NOT NULL,
    referrer TEXT,
    visit_date DATE DEFAULT CURRENT_DATE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Step 2: Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_visitors_visit_date ON public.visitors(visit_date);
CREATE INDEX IF NOT EXISTS idx_visitors_ip_address ON public.visitors(ip_address);
CREATE INDEX IF NOT EXISTS idx_visitors_created_at ON public.visitors(created_at DESC);

-- Step 3: Drop existing policies to avoid conflicts
DROP POLICY IF EXISTS "Anyone can create visit records" ON public.visitors;
DROP POLICY IF EXISTS "Authenticated users can view visitors" ON public.visitors;
DROP POLICY IF EXISTS "Enable insert for all users" ON public.visitors;
DROP POLICY IF EXISTS "Enable read for authenticated users" ON public.visitors;
DROP POLICY IF EXISTS "Allow anonymous insert" ON public.visitors;
DROP POLICY IF EXISTS "Allow authenticated select" ON public.visitors;

-- Step 4: Enable Row Level Security
ALTER TABLE public.visitors ENABLE ROW LEVEL SECURITY;

-- Step 5: Create policies for anonymous INSERT (critical for tracking)
CREATE POLICY "Allow anonymous insert" ON public.visitors
    FOR INSERT 
    TO anon, authenticated
    WITH CHECK (true);

-- Step 6: Create policies for authenticated SELECT (for dashboard)
CREATE POLICY "Allow authenticated select" ON public.visitors
    FOR SELECT 
    TO authenticated
    USING (true);

-- Step 7: Grant permissions to anon role (for public visitors)
GRANT USAGE ON SCHEMA public TO anon;
GRANT INSERT ON public.visitors TO anon;
GRANT SELECT ON public.visitors TO anon;

-- Step 8: Grant permissions to authenticated role (for admin dashboard)
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT ALL ON public.visitors TO authenticated;

-- Step 9: Ensure sequence permissions
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO anon;
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO authenticated;

-- Step 10: Verify the setup
SELECT 
    'Visitor tracking setup complete!' as message,
    COUNT(*) as total_visitors,
    COUNT(DISTINCT visit_date) as days_tracked,
    MAX(created_at) as last_visit
FROM public.visitors;

-- If the table is empty, this will show 0 visitors
-- Once people visit your site, this number will increase automatically
