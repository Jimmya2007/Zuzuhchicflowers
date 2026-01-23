-- Create visitors table to track website visits
CREATE TABLE IF NOT EXISTS public.visitors (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ip_address TEXT,
    user_agent TEXT,
    page_url TEXT,
    referrer TEXT,
    visit_date DATE DEFAULT CURRENT_DATE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_visitors_visit_date ON public.visitors(visit_date);
CREATE INDEX IF NOT EXISTS idx_visitors_ip_address ON public.visitors(ip_address);
CREATE INDEX IF NOT EXISTS idx_visitors_created_at ON public.visitors(created_at DESC);

-- Enable Row Level Security
ALTER TABLE public.visitors ENABLE ROW LEVEL SECURITY;

-- RLS Policies for visitors (public create, admin read)
CREATE POLICY "Anyone can create visit records" ON public.visitors
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Authenticated users can view visitors" ON public.visitors
    FOR SELECT USING (auth.role() = 'authenticated');
