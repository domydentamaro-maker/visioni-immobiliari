-- Create enum for user roles
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Create user_roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL DEFAULT 'user',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
    AND role = _role
  )
$$;

-- RLS policies for user_roles
CREATE POLICY "Users can view their own roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Only admins can manage roles"
ON public.user_roles
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Create properties table
CREATE TABLE public.properties (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  price DECIMAL(12, 2) NOT NULL,
  surface_area DECIMAL(10, 2) NOT NULL,
  rooms INTEGER NOT NULL,
  floor INTEGER,
  latitude DECIMAL(10, 8) NOT NULL,
  longitude DECIMAL(11, 8) NOT NULL,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'sold', 'reserved')),
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on properties
ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;

-- RLS policies for properties
CREATE POLICY "Anyone can view active properties"
ON public.properties
FOR SELECT
USING (status = 'active');

CREATE POLICY "Admins can insert properties"
ON public.properties
FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update properties"
ON public.properties
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete properties"
ON public.properties
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Create property_images table
CREATE TABLE public.property_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id UUID REFERENCES public.properties(id) ON DELETE CASCADE NOT NULL,
  image_url TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on property_images
ALTER TABLE public.property_images ENABLE ROW LEVEL SECURITY;

-- RLS policies for property_images
CREATE POLICY "Anyone can view property images"
ON public.property_images
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.properties
    WHERE id = property_id AND status = 'active'
  )
);

CREATE POLICY "Admins can insert property images"
ON public.property_images
FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete property images"
ON public.property_images
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Create storage bucket for property images
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'property-images',
  'property-images',
  true,
  5242880,
  ARRAY['image/jpeg', 'image/png', 'image/webp']
);

-- Storage policies for property images
CREATE POLICY "Anyone can view property images"
ON storage.objects
FOR SELECT
USING (bucket_id = 'property-images');

CREATE POLICY "Admins can upload property images"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'property-images' AND
  public.has_role(auth.uid(), 'admin')
);

CREATE POLICY "Admins can delete property images"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'property-images' AND
  public.has_role(auth.uid(), 'admin')
);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

-- Create trigger for properties updated_at
CREATE TRIGGER update_properties_updated_at
BEFORE UPDATE ON public.properties
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX idx_properties_status ON public.properties(status);
CREATE INDEX idx_properties_created_by ON public.properties(created_by);
CREATE INDEX idx_property_images_property_id ON public.property_images(property_id);
CREATE INDEX idx_user_roles_user_id ON public.user_roles(user_id);