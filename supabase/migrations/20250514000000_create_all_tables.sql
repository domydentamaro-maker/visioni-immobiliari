-- Create properties table
CREATE TABLE IF NOT EXISTS public.properties (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  price NUMERIC,
  address TEXT,
  city TEXT,
  province TEXT,
  zip_code TEXT,
  country TEXT DEFAULT 'Italia',
  latitude NUMERIC,
  longitude NUMERIC,
  property_type TEXT,
  bedrooms INTEGER,
  bathrooms INTEGER,
  square_meters NUMERIC,
  year_built INTEGER,
  energy_class TEXT,
  heating_type TEXT,
  parking TEXT,
  garden BOOLEAN DEFAULT false,
  terrace BOOLEAN DEFAULT false,
  balcony BOOLEAN DEFAULT false,
  elevator BOOLEAN DEFAULT false,
  air_conditioning BOOLEAN DEFAULT false,
  floor INTEGER,
  total_floors INTEGER,
  status TEXT DEFAULT 'active',
  featured BOOLEAN DEFAULT false,
  is_preview BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create property_images table
CREATE TABLE IF NOT EXISTS public.property_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id UUID REFERENCES public.properties(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  is_primary BOOLEAN DEFAULT false,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create external_constructions table
CREATE TABLE IF NOT EXISTS public.external_constructions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  address TEXT,
  location TEXT,
  latitude DECIMAL,
  longitude DECIMAL,
  external_url TEXT,
  image_url TEXT,
  is_construction BOOLEAN DEFAULT true,
  is_investment BOOLEAN DEFAULT false,
  status TEXT DEFAULT 'active',
  completion_date DATE,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create contacts table for contact form submissions
CREATE TABLE IF NOT EXISTS public.contacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT,
  property_id UUID REFERENCES public.properties(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.property_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.external_constructions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;

-- Properties policies
CREATE POLICY "Anyone can view properties"
ON public.properties
FOR SELECT
USING (status = 'active' OR auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can insert properties"
ON public.properties
FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Authenticated users can update properties"
ON public.properties
FOR UPDATE
TO authenticated
USING (true);

CREATE POLICY "Authenticated users can delete properties"
ON public.properties
FOR DELETE
TO authenticated
USING (true);

-- Property images policies
CREATE POLICY "Anyone can view property images"
ON public.property_images
FOR SELECT
USING (true);

CREATE POLICY "Authenticated users can insert property images"
ON public.property_images
FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Authenticated users can update property images"
ON public.property_images
FOR UPDATE
TO authenticated
USING (true);

CREATE POLICY "Authenticated users can delete property images"
ON public.property_images
FOR DELETE
TO authenticated
USING (true);

-- External constructions policies
CREATE POLICY "Anyone can view external constructions"
ON public.external_constructions
FOR SELECT
USING (true);

CREATE POLICY "Authenticated users can insert external constructions"
ON public.external_constructions
FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Authenticated users can update external constructions"
ON public.external_constructions
FOR UPDATE
TO authenticated
USING (true);

CREATE POLICY "Authenticated users can delete external constructions"
ON public.external_constructions
FOR DELETE
TO authenticated
USING (true);

-- Contacts policies
CREATE POLICY "Anyone can insert contacts"
ON public.contacts
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Authenticated users can view contacts"
ON public.contacts
FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Authenticated users can delete contacts"
ON public.contacts
FOR DELETE
TO authenticated
USING (true);

-- Create storage bucket for property images
INSERT INTO storage.buckets (id, name, public)
VALUES ('property-images', 'property-images', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Storage policies
CREATE POLICY "Authenticated users can upload property images"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'property-images');

CREATE POLICY "Authenticated users can update property images"
ON storage.objects
FOR UPDATE
TO authenticated
USING (bucket_id = 'property-images');

CREATE POLICY "Authenticated users can delete property images"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'property-images');

CREATE POLICY "Public can view property images"
ON storage.objects
FOR SELECT
USING (bucket_id = 'property-images');
