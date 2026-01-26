-- Add price field to reservations table
ALTER TABLE public.reservations 
ADD COLUMN IF NOT EXISTS price NUMERIC(10, 2);

-- Add comment for clarity
COMMENT ON COLUMN public.reservations.price IS 'Price of the reserved product in local currency';
