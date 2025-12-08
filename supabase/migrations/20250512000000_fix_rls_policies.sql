-- Fix RLS policies to allow authenticated users to manage properties

-- Drop existing restrictive policies
DROP POLICY IF EXISTS "Admins can insert properties" ON public.properties;
DROP POLICY IF EXISTS "Admins can update properties" ON public.properties;
DROP POLICY IF EXISTS "Admins can delete properties" ON public.properties;
DROP POLICY IF EXISTS "Admins can insert property images" ON public.property_images;
DROP POLICY IF EXISTS "Admins can delete property images" ON public.property_images;
DROP POLICY IF EXISTS "Admins can upload property images" ON storage.objects;
DROP POLICY IF EXISTS "Admins can delete property images" ON storage.objects;

-- Create new policies for authenticated users on properties
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

-- Update select policy to show all properties to authenticated users
DROP POLICY IF EXISTS "Anyone can view active properties" ON public.properties;
CREATE POLICY "Anyone can view properties"
ON public.properties
FOR SELECT
USING (status = 'active' OR auth.uid() IS NOT NULL);

-- Create new policies for authenticated users on property_images
CREATE POLICY "Authenticated users can insert property images"
ON public.property_images
FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Authenticated users can delete property images"
ON public.property_images
FOR DELETE
TO authenticated
USING (true);

-- Update select policy for property_images
DROP POLICY IF EXISTS "Anyone can view property images" ON public.property_images;
CREATE POLICY "Anyone can view property images"
ON public.property_images
FOR SELECT
USING (true);

-- Create new storage policies for authenticated users
CREATE POLICY "Authenticated users can upload property images"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'property-images');

CREATE POLICY "Authenticated users can delete property images"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'property-images');

-- Fix external_constructions policy
DROP POLICY IF EXISTS "Allow authenticated users full access" ON public.external_constructions;
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
