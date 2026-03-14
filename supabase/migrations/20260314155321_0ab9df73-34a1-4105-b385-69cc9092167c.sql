
-- Create role enum
CREATE TYPE public.app_role AS ENUM ('admin', 'editor', 'viewer');

-- Create user_roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL DEFAULT 'viewer',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

-- Enable RLS
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Authenticated users can read all roles
CREATE POLICY "Authenticated users can read roles"
  ON public.user_roles FOR SELECT TO authenticated
  USING (true);

-- Authenticated users can insert roles
CREATE POLICY "Authenticated users can insert roles"
  ON public.user_roles FOR INSERT TO authenticated
  WITH CHECK (true);

-- Authenticated users can update roles
CREATE POLICY "Authenticated users can update roles"
  ON public.user_roles FOR UPDATE TO authenticated
  USING (true) WITH CHECK (true);

-- Authenticated users can delete roles
CREATE POLICY "Authenticated users can delete roles"
  ON public.user_roles FOR DELETE TO authenticated
  USING (true);
