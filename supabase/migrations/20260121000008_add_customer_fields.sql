-- Add new customer fields to orders table
-- Run this in Supabase SQL Editor: https://supabase.com/dashboard/project/sbovtiakuigihbkjgnmo/sql/new

-- Add customer_email column
ALTER TABLE orders 
ADD COLUMN IF NOT EXISTS customer_email TEXT;

-- Add customer_address column  
ALTER TABLE orders 
ADD COLUMN IF NOT EXISTS customer_address TEXT;

-- Add delivery_notes column
ALTER TABLE orders 
ADD COLUMN IF NOT EXISTS delivery_notes TEXT;

-- Verify the columns were added
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'orders' 
ORDER BY ordinal_position;
