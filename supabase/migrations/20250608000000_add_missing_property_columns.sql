-- Add missing columns to properties table
ALTER TABLE public.properties 
ADD COLUMN IF NOT EXISTS surface_area NUMERIC,
ADD COLUMN IF NOT EXISTS rooms INTEGER,
ADD COLUMN IF NOT EXISTS is_construction BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS is_investment BOOLEAN DEFAULT false;
