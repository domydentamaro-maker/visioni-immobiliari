-- Add missing columns to external_constructions table
ALTER TABLE public.external_constructions 
ADD COLUMN IF NOT EXISTS address TEXT,
ADD COLUMN IF NOT EXISTS latitude DECIMAL,
ADD COLUMN IF NOT EXISTS longitude DECIMAL,
ADD COLUMN IF NOT EXISTS external_url TEXT,
ADD COLUMN IF NOT EXISTS is_construction BOOLEAN DEFAULT true,
ADD COLUMN IF NOT EXISTS is_investment BOOLEAN DEFAULT false;

-- Update status default value
ALTER TABLE public.external_constructions 
ALTER COLUMN status SET DEFAULT 'active';
