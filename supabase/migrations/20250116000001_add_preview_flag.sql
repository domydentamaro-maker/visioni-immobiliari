-- Add is_preview flag to property_images table
ALTER TABLE public.property_images 
ADD COLUMN IF NOT EXISTS is_preview BOOLEAN DEFAULT false;

-- Create index for faster preview image queries
CREATE INDEX IF NOT EXISTS idx_property_images_preview 
ON public.property_images(property_id, is_preview) 
WHERE is_preview = true;
