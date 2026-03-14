-- Set a default tenant_id on leads so public quote submissions are automatically assigned
-- We use a trigger since DEFAULT can't reference another table

CREATE OR REPLACE FUNCTION public.set_default_tenant_id()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  IF NEW.tenant_id IS NULL THEN
    SELECT id INTO NEW.tenant_id FROM public.tenants LIMIT 1;
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER set_leads_tenant_id
  BEFORE INSERT ON public.leads
  FOR EACH ROW
  EXECUTE FUNCTION public.set_default_tenant_id();

-- Also fix the existing orphaned lead
UPDATE public.leads 
SET tenant_id = '1282b822-825b-4713-9dc9-6d14a2094d06' 
WHERE tenant_id IS NULL;