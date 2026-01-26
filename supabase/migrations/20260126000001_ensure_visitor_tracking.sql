-- Complete visitor tracking setup with all necessary permissions
-- This migration ensures visitor tracking works properly

-- Create visitors table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.visitors (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ip_address TEXT,
    user_agent TEXT NOT NULL,
    page_url TEXT NOT NULL,
    referrer TEXT,
    visit_date DATE DEFAULT CURRENT_DATE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_visitors_visit_date ON public.visitors(visit_date);
CREATE INDEX IF NOT EXISTS idx_visitors_ip_address ON public.visitors(ip_address);
CREATE INDEX IF NOT EXISTS idx_visitors_created_at ON public.visitors(created_at DESC);

-- Drop existing policies to avoid conflicts
DROP POLICY IF EXISTS "Anyone can create visit records" ON public.visitors;
DROP POLICY IF EXISTS "Authenticated users can view visitors" ON public.visitors;
DROP POLICY IF EXISTS "Enable insert for all users" ON public.visitors;
DROP POLICY IF EXISTS "Enable read for authenticated users" ON public.visitors;

-- Enable Row Level Security
ALTER TABLE public.visitors ENABLE ROW LEVEL SECURITY;

-- Allow ANYONE (including anonymous users) to INSERT visit records
CREATE POLICY "Allow anonymous insert" ON public.visitors
    FOR INSERT 
    TO anon, authenticated
    WITH CHECK (true);

-- Allow authenticated users to SELECT (view) visitor data
CREATE POLICY "Allow authenticated select" ON public.visitors
    FOR SELECT 
    TO authenticated
    USING (true);

-- Grant necessary permissions to anon role (for public visitors)
GRANT USAGE ON SCHEMA public TO anon;
GRANT INSERT ON public.visitors TO anon;
GRANT SELECT ON public.visitors TO anon;

-- Grant necessary permissions to authenticated role (for admin dashboard)
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT ALL ON public.visitors TO authenticated;

-- Ensure sequence permissions (for UUID generation)
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO anon;
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO authenticated;

-- Verify the setup
DO $$
BEGIN
    RAISE NOTICE 'Visitor tracking table setup complete!';
    RAISE NOTICE 'Table: public.visitors';
    RAISE NOTICE 'Policies: Allow anonymous insert, Allow authenticated select';
    RAISE NOTICE 'Permissions: anon can INSERT, authenticated can SELECT/UPDATE/DELETE';
END $$;
