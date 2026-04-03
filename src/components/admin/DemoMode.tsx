import { useState, useEffect, useCallback } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { useTenant } from '@/hooks/useTenant'
import { AlertTriangle } from 'lucide-react'
import { seedDemoData, resetToLive } from './DemoSeed'

// ── Hook ──
export function useDemoMode() {
  const { tenantId } = useTenant()
  const [isDemoMode, setIsDemoMode] = useState(false)
  const [loading, setLoading] = useState(true)

  const fetchStatus = useCallback(async () => {
    if (!tenantId) return
    try {
      const { data } = await supabase
        .from('settings')
        .select('value')
        .eq('tenant_id', tenantId)
        .eq('key', 'demo_mode')
        .maybeSingle()
      setIsDemoMode(!!(data?.value as any)?.active)
    } catch {
      // default to false
    } finally {
      setLoading(false)
    }
  }, [tenantId])

  useEffect(() => { fetchStatus() }, [fetchStatus])

  const enableDemo = useCallback(async () => {
    if (!tenantId) return
    await seedDemoData(tenantId, supabase)
    setIsDemoMode(true)
  }, [tenantId])

  const disableDemo = useCallback(async () => {
    if (!tenantId) return
    await resetToLive(tenantId, supabase)
    setIsDemoMode(false)
  }, [tenantId])

  return { isDemoMode, loading, enableDemo, disableDemo, refreshStatus: fetchStatus }
}

// ── Banner ──
export function DemoBanner() {
  const { isDemoMode, loading } = useDemoMode()
  if (loading || !isDemoMode) return null

  return (
    <div
      className="flex items-center gap-2 px-4 py-2 text-sm font-body rounded-lg mb-4"
      style={{ background: 'hsl(45, 100%, 90%)', color: 'hsl(35, 80%, 30%)' }}
    >
      <AlertTriangle className="w-4 h-4 shrink-0" />
      <span className="flex-1">
        <strong>Demo Mode Active</strong> — this is sample data to preview your dashboard.
      </span>
    </div>
  )
}
