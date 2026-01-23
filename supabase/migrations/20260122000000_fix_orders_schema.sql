-- Fix orders table to work with MonCash (email not required)
-- This migration updates the existing orders table

-- First, make customer_email nullable if it exists
DO $$ 
BEGIN
    -- Check if column exists and alter it
    IF EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_name = 'orders' 
        AND column_name = 'customer_email'
        AND table_schema = 'public'
    ) THEN
        ALTER TABLE public.orders ALTER COLUMN customer_email DROP NOT NULL;
    END IF;
END $$;

-- Add missing columns if they don't exist
DO $$ 
BEGIN
    -- Add amount column if missing
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'orders' AND column_name = 'amount' AND table_schema = 'public'
    ) THEN
        ALTER TABLE public.orders ADD COLUMN amount NUMERIC DEFAULT 0;
    END IF;

    -- Add currency column if missing
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'orders' AND column_name = 'currency' AND table_schema = 'public'
    ) THEN
        ALTER TABLE public.orders ADD COLUMN currency TEXT DEFAULT 'HTG';
    END IF;

    -- Add payment_method column if missing
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'orders' AND column_name = 'payment_method' AND table_schema = 'public'
    ) THEN
        ALTER TABLE public.orders ADD COLUMN payment_method TEXT DEFAULT 'moncash';
    END IF;

    -- Add items column if missing (for storing cart items as JSON)
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'orders' AND column_name = 'items' AND table_schema = 'public'
    ) THEN
        ALTER TABLE public.orders ADD COLUMN items JSONB DEFAULT '[]'::jsonb;
    END IF;
END $$;

-- Update status check constraint to include 'paid' status
ALTER TABLE public.orders DROP CONSTRAINT IF EXISTS orders_status_check;
ALTER TABLE public.orders ADD CONSTRAINT orders_status_check 
    CHECK (status IN ('pending', 'confirmed', 'processing', 'completed', 'cancelled', 'paid', 'failed'));

-- Create reservations table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.reservations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_name TEXT NOT NULL,
    email TEXT,
    phone TEXT NOT NULL,
    product TEXT,
    message TEXT,
    reservation_date DATE,
    reservation_time TIME,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create payments table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.payments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE,
    provider TEXT DEFAULT 'moncash',
    provider_transaction_id TEXT,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'success', 'failed', 'refunded')),
    raw_response JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_reservations_status ON public.reservations(status);
CREATE INDEX IF NOT EXISTS idx_reservations_created_at ON public.reservations(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_orders_status ON public.orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON public.orders(created_at DESC);

-- Disable RLS for easier access during development
ALTER TABLE public.orders DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.reservations DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments DISABLE ROW LEVEL SECURITY;

-- Grant permissions
GRANT ALL ON public.orders TO anon;
GRANT ALL ON public.orders TO authenticated;
GRANT ALL ON public.reservations TO anon;
GRANT ALL ON public.reservations TO authenticated;
GRANT ALL ON public.payments TO anon;
GRANT ALL ON public.payments TO authenticated;
