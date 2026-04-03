import { useState, useEffect, useCallback, createContext, useContext, type ReactNode } from 'react'
import { supabase } from '@/integrations/supabase/client'

const TENANT_ID = '1282b822-825b-4713-9dc9-6d14a2094d06'

export type PlanTier = 1 | 2 | 3 | 4

export interface PlanData {
  tier: PlanTier
  planName: string
  monthlyPrice: number
  loading: boolean
  canAccess: (minTier: number) => boolean
  refreshPlan: () => Promise<void>
  setTier: (newTier: PlanTier) => Promise<void>
}

export const TIER_NAMES: Record<PlanTier, string> = {
  1: 'Starter',
  2: 'Grow',
  3: 'Pro',
  4: 'Elite',
}

export const TIER_PRICES: Record<PlanTier, number> = {
  1: 149,
  2: 249,
  3: 349,
  4: 499,
}

export const TIER_COLORS: Record<PlanTier, { border: string; badge: string; text: string }> = {
  1: { border: 'border-slate-400', badge: 'bg-slate-100 text-slate-700', text: 'text-slate-700' },
  2: { border: 'border-blue-500', badge: 'bg-blue-100 text-blue-700', text: 'text-blue-700' },
  3: { border: 'border-purple-500', badge: 'bg-purple-100 text-purple-700', text: 'text-purple-700' },
  4: { border: 'border-green-500', badge: 'bg-green-100 text-green-700', text: 'text-green-700' },
}

export const TIER_FEATURES: Record<PlanTier, string[]> = {
  1: [
    'Professional website',
    'Lead capture + CRM',
    'Location pages (up to 3)',
    'Basic SEO meta editor',
    'Basic reports',
  ],
  2: [
    'Everything in Starter',
    'Full SEO suite (Lighthouse, CWV, GSC/GA4)',
    'Blog / content management',
    'Unlimited location pages',
    'Social scheduling (manual)',
    'Standard reports',
  ],
  3: [
    'Everything in Grow',
    'AI keyword research',
    'AI social post generation',
    'Multi-day campaign batch posting',
    'AIO structured data',
    'Advanced reports + trends',
  ],
  4: [
    'Everything in Pro',
    'Social analytics (all platforms)',
    'Ayrshare multi-platform posting',
    'LeadFusion live Google reviews',
    'White-glove onboarding support',
    'Priority support',
  ],
}

const PlanContext = createContext<PlanData | null>(null)

export function PlanProvider({ children }: { children: ReactNode }) {
  const [tier, setTier] = useState<PlanTier>(1)
  const [planName, setPlanName] = useState('Starter')
  const [monthlyPrice, setMonthlyPrice] = useState(149)
  const [loading, setLoading] = useState(true)

  const fetchPlan = useCallback(async () => {
    try {
      const { data } = await supabase
        .from('site_config')
        .select('value')
        .eq('tenant_id', TENANT_ID)
        .eq('key', 'plan')
        .single()

      if (data?.value) {
        const val = data.value as { tier?: number; plan_name?: string; monthly_price?: number }
        const t = (val.tier as PlanTier) || 1
        setTier(t)
        setPlanName(val.plan_name || TIER_NAMES[t])
        setMonthlyPrice(val.monthly_price || TIER_PRICES[t])
      }
    } catch {
      // fallback to tier 1
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchPlan()
  }, [fetchPlan])

  const canAccess = (minTier: number) => tier >= minTier

  const updateTier = useCallback(async (newTier: PlanTier) => {
    const meta = {
      1: { plan_name: 'Starter', monthly_price: 149 },
      2: { plan_name: 'Grow', monthly_price: 249 },
      3: { plan_name: 'Pro', monthly_price: 349 },
      4: { plan_name: 'Elite', monthly_price: 499 },
    }[newTier]

    await supabase
      .from('site_config')
      .upsert(
        { tenant_id: TENANT_ID, key: 'plan', value: { tier: newTier, ...meta } },
        { onConflict: 'key,tenant_id' }
      )

    await fetchPlan()
  }, [fetchPlan])

  return (
    <PlanContext.Provider value={{ tier, planName, monthlyPrice, loading, canAccess, refreshPlan: fetchPlan, setTier: updateTier }}>
      {children}
    </PlanContext.Provider>
  )
}

export function usePlan(): PlanData {
  const context = useContext(PlanContext)
  if (!context) {
    throw new Error('usePlan must be used within a PlanProvider')
  }
  return context
}
