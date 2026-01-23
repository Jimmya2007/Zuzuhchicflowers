-- Ensure visitors table has correct RLS policies for production

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Anyone can create visit records" ON public.visitors;
DROP POLICY IF EXISTS "Authenticated users can view visitors" ON public.visitors;

-- Enable RLS (if not already enabled)
ALTER TABLE public.visitors ENABLE ROW LEVEL SECURITY;

-- Allow anyone (including anonymous users) to insert visit records
CREATE POLICY "Enable insert for all users" ON public.visitors
    FOR INSERT 
    WITH CHECK (true);

-- Allow only authenticated users to read visitor data (for admin dashboard)
CREATE POLICY "Enable read for authenticated users" ON public.visitors
    FOR SELECT 
    USING (auth.role() = 'authenticated');

-- Grant necessary permissions
GRANT INSERT ON public.visitors TO anon;
GRANT SELECT ON public.visitors TO authenticated;
