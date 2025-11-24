-- Add new fields to properties table
ALTER TABLE public.properties 
ADD COLUMN IF NOT EXISTS address TEXT,
ADD COLUMN IF NOT EXISTS is_construction BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS is_investment BOOLEAN DEFAULT false;

-- Make latitude and longitude nullable since we'll use address
ALTER TABLE public.properties 
ALTER COLUMN latitude DROP NOT NULL,
ALTER COLUMN longitude DROP NOT NULL;
