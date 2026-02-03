-- Add image_url field to reservations table
ALTER TABLE public.reservations 
ADD COLUMN IF NOT EXISTS image_url TEXT;

-- Add comment for clarity
COMMENT ON COLUMN public.reservations.image_url IS 'URL of the product screenshot uploaded by customer';

-- Create storage bucket for reservation images if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('reservation-images', 'reservation-images', true)
ON CONFLICT (id) DO NOTHING;

-- Allow public uploads to reservation-images bucket
CREATE POLICY IF NOT EXISTS "Allow public uploads"
ON storage.objects FOR INSERT
TO public
WITH CHECK (bucket_id = 'reservation-images');

-- Allow public reads from reservation-images bucket
CREATE POLICY IF NOT EXISTS "Allow public reads"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'reservation-images');

-- Allow authenticated users to delete from reservation-images bucket
CREATE POLICY IF NOT EXISTS "Allow authenticated deletes"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'reservation-images');
