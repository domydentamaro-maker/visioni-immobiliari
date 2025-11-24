-- Create table for external construction sites
CREATE TABLE IF NOT EXISTS public.external_constructions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  address TEXT NOT NULL,
  latitude DECIMAL,
  longitude DECIMAL,
  external_url TEXT NOT NULL,
  image_url TEXT,
  is_construction BOOLEAN DEFAULT true,
  is_investment BOOLEAN DEFAULT false,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.external_constructions ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Allow public read access" ON public.external_constructions
  FOR SELECT USING (status = 'active');

-- Allow authenticated users to insert/update/delete
CREATE POLICY "Allow authenticated users full access" ON public.external_constructions
  FOR ALL USING (auth.role() = 'authenticated');
