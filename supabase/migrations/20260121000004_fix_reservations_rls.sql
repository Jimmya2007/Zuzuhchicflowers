-- Drop existing policy if it exists
DROP POLICY IF EXISTS "Anyone can create reservations" ON public.reservations;

-- Create a permissive policy for inserting reservations
CREATE POLICY "Anyone can create reservations" ON public.reservations
    FOR INSERT 
    TO anon, authenticated
    WITH CHECK (true);
