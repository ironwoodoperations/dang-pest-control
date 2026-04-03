import { Lock } from 'lucide-react'
import { usePlan, TIER_NAMES, TIER_PRICES, TIER_FEATURES, TIER_COLORS, PlanTier } from './usePlan'

interface FeatureGateProps {
  minTier: PlanTier
  featureName: string
  children: React.ReactNode
  compact?: boolean
}

export function FeatureGate({ minTier, featureName, children, compact = false }: FeatureGateProps) {
  const { canAccess, loading } = usePlan()

  if (loading) return null

  if (canAccess(minTier)) return <>{children}</>

  const colors = TIER_COLORS[minTier]
  const name = TIER_NAMES[minTier]
  const price = TIER_PRICES[minTier]
  const features = TIER_FEATURES[minTier].slice(0, 3)

  if (compact) {
    return (
      <div className="flex items-center gap-3 rounded-lg border border-dashed border-border bg-muted/30 px-4 py-3">
        <Lock className="w-4 h-4 text-muted-foreground shrink-0" />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-foreground">{featureName}</p>
          <p className="text-xs text-muted-foreground">Requires {name} plan (${price}/mo)</p>
        </div>
        <a
          href="?tab=dashboard"
          className="text-xs font-medium px-3 py-1.5 rounded-md bg-primary text-primary-foreground hover:opacity-90 whitespace-nowrap"
        >
          Upgrade Plan
        </a>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center text-center p-10 rounded-xl border-2 border-dashed border-border bg-muted/10 min-h-[280px] gap-4">
      <div className="w-14 h-14 rounded-2xl bg-muted flex items-center justify-center">
        <Lock className="w-6 h-6 text-muted-foreground" />
      </div>

      <div>
        <span className={`text-xs font-semibold px-3 py-1 rounded-full ${colors.badge}`}>
          {name} plan required
        </span>
      </div>

      <div>
        <h3 className="text-base font-semibold text-foreground mb-1">{featureName}</h3>
        <p className="text-sm text-muted-foreground">
          Upgrade to {name} (${price}/mo) to unlock this feature.
        </p>
      </div>

      <ul className="text-left space-y-1.5">
        {features.map((f) => (
          <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className={`w-1.5 h-1.5 rounded-full ${colors.text} bg-current`} />
            {f}
          </li>
        ))}
      </ul>

      <a
        href="?tab=dashboard"
        className="mt-2 inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
      >
        Upgrade Plan →
      </a>
    </div>
  )
}
