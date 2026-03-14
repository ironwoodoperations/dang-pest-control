
-- Fix 1: Blog posts SELECT - only show published posts to public
DROP POLICY IF EXISTS "Anyone can read published blog posts" ON public.blog_posts;

CREATE POLICY "Anyone can read published blog posts"
  ON public.blog_posts FOR SELECT TO anon, authenticated
  USING (
    published = true
    OR public.has_role(auth.uid(), 'admin')
    OR public.has_role(auth.uid(), 'editor')
  );

-- Fix 2: user_roles SELECT - users can only read their own role
DROP POLICY IF EXISTS "Authenticated users can read roles" ON public.user_roles;

CREATE POLICY "Users can read own role or admins read all"
  ON public.user_roles FOR SELECT TO authenticated
  USING (
    user_id = auth.uid()
    OR public.has_role(auth.uid(), 'admin')
  );

-- Fix 3: leads anonymous INSERT - restrict to INSERT only (already is, but tighten WITH CHECK)
-- The existing "Anyone can insert leads" policy is the only permissive write remaining,
-- which is intentional for the public quote form. No change needed.
