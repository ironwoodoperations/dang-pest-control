import { useState } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { useToast } from '@/hooks/use-toast'

const STEP_LABELS = ['Business', 'Branding', 'Domain', 'Social', 'Plan', 'Review']

const PACKAGES = [
  { id: 'template-launch', name: 'Template Launch', price: 'Free\u2013$500 setup', desc: 'Fast template-based setup and branding' },
  { id: 'growth-setup', name: 'Growth Setup', price: '$500\u2013$1,500 setup', desc: 'Template deployment plus SEO and social integration setup' },
  { id: 'site-migration', name: 'Site Migration', price: '$2,000\u2013$3,500 setup', desc: 'We rebuild your current website from existing content and launch it in PestFlow Pro' },
  { id: 'custom-rebuild', name: 'Custom Rebuild', price: 'Custom quote', desc: 'Full custom redesign and multi-week implementation' },
]

const TEMPLATES = [
  { id: 'modern-pro', name: 'Modern Pro', desc: 'Clean and professional. Dark navy with bold accents.', swatches: ['#22c55e', '#3b82f6', '#8b5cf6'] },
  { id: 'bold-local', name: 'Bold Local', desc: 'Strong and confident. Built for local market leaders.', swatches: ['#f97316', '#ef4444', '#22c55e'] },
  { id: 'clean-friendly', name: 'Clean & Friendly', desc: 'Approachable and bright. Great for residential focus.', swatches: ['#38bdf8', '#22c55e', '#fb923c'] },
  { id: 'rustic-rugged', name: 'Rustic & Rugged', desc: 'Warm and established. Perfect for trusted local brands.', swatches: ['#b45309', '#4d7c0f', '#92400e'] },
]

const PALETTES: Record<string, { name: string; primary: string; accent: string }[]> = {
  'modern-pro': [
    { name: 'Classic Emerald', primary: '#22c55e', accent: '#000' },
    { name: 'Pacific Blue', primary: '#3b82f6', accent: '#000' },
    { name: 'Royal Violet', primary: '#8b5cf6', accent: '#000' },
  ],
  'bold-local': [
    { name: 'Amber Gold', primary: '#f59e0b', accent: '#000' },
    { name: 'Cardinal Red', primary: '#ef4444', accent: '#000' },
    { name: 'Forest Green', primary: '#16a34a', accent: '#000' },
  ],
  'clean-friendly': [
    { name: 'Sky Blue', primary: '#38bdf8', accent: '#0ea5e9' },
    { name: 'Sage Green', primary: '#22c55e', accent: '#15803d' },
    { name: 'Coral Warm', primary: '#fb923c', accent: '#ea580c' },
  ],
  'rustic-rugged': [
    { name: 'Rust & Brown', primary: '#c2410c', accent: '#1c1917' },
    { name: 'Pine Forest', primary: '#166534', accent: '#1c1917' },
    { name: 'Harvest Gold', primary: '#d97706', accent: '#1c1917' },
  ],
}

const PLANS = [
  { id: 'starter', name: 'Starter', price: 149, badge: '', features: ['Branded website', 'CRM & lead management', 'Basic SEO tools', 'Up to 3 locations', 'Team access'] },
  { id: 'grow', name: 'Grow', price: 249, badge: 'Most Popular', features: ['Everything in Starter +', 'Full SEO suite', 'Blog management', 'Social scheduling'] },
  { id: 'pro', name: 'Pro', price: 349, badge: '', features: ['Everything in Grow +', 'AI content tools', 'Advanced reports', 'Campaign management'] },
  { id: 'elite', name: 'Elite', price: 499, badge: 'Best Value', features: ['Everything in Pro +', 'Social analytics', 'Autopilot posting', 'Live review management'] },
]

const REGISTRARS = ['GoDaddy', 'Namecheap', 'Google Domains', 'Cloudflare', 'Network Solutions', 'Squarespace', 'Wix', 'Bluehost', 'HostGator', 'Other']

function toKebab(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

export default function ClientOnboardingWizard() {
  const { toast } = useToast()
  const [step, setStep] = useState(0)
  const [maxStep, setMaxStep] = useState(0)
  const [showPayment, setShowPayment] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Step 1 - Business
  const [form, setForm] = useState({
    companyName: '', slug: '', phone: '', email: '', address: '', hours: '',
  })
  // Step 2 - Branding
  const [selectedPackage, setSelectedPackage] = useState('')
  const [selectedTemplate, setSelectedTemplate] = useState('')
  const [selectedPalette, setSelectedPalette] = useState('')
  const [logoFile, setLogoFile] = useState('')
  // Step 3 - Domain
  const [noDomain, setNoDomain] = useState(false)
  const [domain, setDomain] = useState('')
  const [registrar, setRegistrar] = useState('')
  // Step 4 - Social
  const [social, setSocial] = useState({ facebook: '', google: '', instagram: '', youtube: '' })
  // Step 5 - Plan
  const [selectedPlan, setSelectedPlan] = useState('')
  // Payment
  const [customSetupAmount, setCustomSetupAmount] = useState('')

  const set = (k: keyof typeof form, v: string) => {
    setForm(p => {
      const next = { ...p, [k]: v }
      if (k === 'companyName') next.slug = toKebab(v)
      return next
    })
  }

  const setSoc = (k: keyof typeof social, v: string) => setSocial(p => ({ ...p, [k]: v }))

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '8px 10px', border: '0.5px solid var(--color-border-secondary)',
    borderRadius: 'var(--border-radius-md)', fontSize: '14px', color: 'var(--color-text-primary)',
    background: 'var(--color-background-primary)', fontFamily: 'var(--font-sans)',
  }

  const selectStyle: React.CSSProperties = { ...inputStyle }

  const sBtn = (label: string, color = '#1D9E75') => ({
    padding: '8px 20px', borderRadius: 'var(--border-radius-md)', fontSize: '14px',
    cursor: 'pointer', fontFamily: 'var(--font-sans)', background: color,
    border: 'none', color: '#fff', fontWeight: 500,
  } as React.CSSProperties)

  const field = (lbl: string, child: React.ReactNode, hint = '', required = false) => (
    <div style={{ marginBottom: '1.1rem' }}>
      <div style={{ marginBottom: '5px' }}>
        <label style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>
          {lbl}{required && <span style={{ color: '#ef4444' }}> *</span>}
        </label>
        {hint && <div style={{ fontSize: '11px', color: 'var(--color-text-tertiary)', marginTop: '2px' }}>{hint}</div>}
      </div>
      {child}
    </div>
  )

  const inp = (value: string, onChange: (v: string) => void, placeholder = '', type = 'text') => (
    <input type={type} value={value} placeholder={placeholder} onChange={e => onChange(e.target.value)} style={inputStyle} />
  )

  // Validation
  function validateStep(s: number): boolean {
    const errs: Record<string, string> = {}
    if (s === 0) {
      if (!form.companyName.trim()) errs.companyName = 'Company Name is required.'
      if (!form.slug.trim()) errs.slug = 'Site Slug is required.'
      if (!form.phone.trim()) errs.phone = 'Phone is required.'
      if (!form.email.trim()) errs.email = 'Email is required.'
      if (!form.address.trim()) errs.address = 'Address is required.'
    }
    if (s === 1) {
      if (!selectedPackage) errs.package = 'Select a setup package to continue.'
      if (!selectedTemplate) errs.template = 'Select a site template to continue.'
    }
    if (s === 4) {
      if (!selectedPlan) errs.plan = 'Select a plan to continue.'
    }
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  function goNext() {
    if (!validateStep(step)) return
    const next = step + 1
    setStep(next)
    if (next > maxStep) setMaxStep(next)
  }

  function goToStep(s: number) {
    if (s <= maxStep) {
      setShowPayment(false)
      setStep(s)
    }
  }

  const planObj = PLANS.find(p => p.id === selectedPlan)
  const pkgObj = PACKAGES.find(p => p.id === selectedPackage)
  const tmplObj = TEMPLATES.find(t => t.id === selectedTemplate)
  const paletteObj = selectedTemplate && selectedPalette
    ? (PALETTES[selectedTemplate] || []).find(p => p.name === selectedPalette)
    : null

  const socialCount = [social.facebook, social.google, social.instagram, social.youtube].filter(Boolean).length

  async function handleSubmit() {
    try {
      await (supabase as any).from('client_onboarding_submissions').insert({
        tenant_id: '1282b822-825b-4713-9dc9-6d14a2094d06',
        company_name: form.companyName,
        site_slug: form.slug,
        phone: form.phone,
        email: form.email,
        address: form.address,
        business_hours: form.hours,
        package_name: selectedPackage,
        template_name: selectedTemplate,
        palette_name: selectedPalette,
        domain: noDomain ? null : domain,
        registrar: noDomain ? null : registrar,
        social_links: { facebook: social.facebook, google: social.google, instagram: social.instagram, youtube: social.youtube },
        plan_name: planObj?.name || '',
        plan_price: planObj?.price || 0,
        custom_setup_amount: customSetupAmount ? Number(customSetupAmount) : null,
      })
      toast({ title: 'Payment link generated', description: `Onboarding saved for ${form.companyName}.` })
    } catch (err) {
      console.error('Failed to save submission:', err)
      toast({ title: 'Error', description: 'Failed to save submission. Please try again.', variant: 'destructive' })
    }
  }

  function resetAll() {
    setStep(0); setMaxStep(0); setShowPayment(false); setErrors({})
    setForm({ companyName: '', slug: '', phone: '', email: '', address: '', hours: '' })
    setSelectedPackage(''); setSelectedTemplate(''); setSelectedPalette(''); setLogoFile('')
    setNoDomain(false); setDomain(''); setRegistrar('')
    setSocial({ facebook: '', google: '', instagram: '', youtube: '' })
    setSelectedPlan(''); setCustomSetupAmount('')
  }

  // --- Step progress bar ---
  const progressBar = (
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '2rem' }}>
      {STEP_LABELS.map((lbl, i) => {
        const completed = i < step
        const current = i === step && !showPayment
        const future = i > step || showPayment
        return (
          <div key={i} style={{ display: 'flex', alignItems: 'center', flex: i < STEP_LABELS.length - 1 ? 1 : 'none' }}>
            <div
              onClick={() => completed && goToStep(i)}
              style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: completed ? 'pointer' : 'default',
                minWidth: '56px',
              }}
            >
              <div style={{
                width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '14px', fontWeight: 600, color: '#fff',
                background: completed || current ? '#1D9E75' : '#a1a1aa',
                transition: 'background 0.2s',
              }}>
                {completed ? '\u2713' : i + 1}
              </div>
              <div style={{ fontSize: '11px', marginTop: '4px', color: current ? '#1D9E75' : 'var(--color-text-secondary)', fontWeight: current ? 600 : 400 }}>
                {lbl}
              </div>
            </div>
            {i < STEP_LABELS.length - 1 && (
              <div style={{ flex: 1, height: '2px', background: completed ? '#1D9E75' : 'var(--color-border-tertiary)', margin: '0 4px', marginBottom: '18px' }} />
            )}
          </div>
        )
      })}
    </div>
  )

  // --- Error message ---
  const errMsg = (key: string) => errors[key] ? (
    <div style={{ fontSize: '12px', color: '#ef4444', marginTop: '4px' }}>{errors[key]}</div>
  ) : null

  // --- STEPS ---

  const step1 = (
    <div>
      <div style={{ fontSize: '22px', fontWeight: 500, color: 'var(--color-text-primary)', marginBottom: '0.25rem' }}>Business Info</div>
      <div style={{ fontSize: '14px', color: 'var(--color-text-secondary)', marginBottom: '1.5rem' }}>Core details about the client's business.</div>

      {field('Company Name', inp(form.companyName, v => set('companyName', v), 'Ironclad Pest Solutions'), '', true)}
      {errMsg('companyName')}

      {field('Site Slug', inp(form.slug, v => setForm(p => ({ ...p, slug: v })), 'ironclad-pest'), 'Enter your company name above', true)}
      {errMsg('slug')}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '0' }}>
        {field('Phone', inp(form.phone, v => set('phone', v), '(555) 555-5555', 'tel'), '', true)}
        {field('Email', inp(form.email, v => set('email', v), 'info@example.com', 'email'), '', true)}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        <div>{errMsg('phone')}</div>
        <div>{errMsg('email')}</div>
      </div>

      {field('Address', inp(form.address, v => set('address', v), '123 Main St, Houston TX 77001'), '', true)}
      {errMsg('address')}

      {field('Business Hours', inp(form.hours, v => set('hours', v), 'Mon\u2013Fri 8am\u20136pm, Sat 9am\u20132pm'))}
    </div>
  )

  const step2 = (
    <div>
      <div style={{ fontSize: '22px', fontWeight: 500, color: 'var(--color-text-primary)', marginBottom: '0.25rem' }}>Package & Branding</div>
      <div style={{ fontSize: '14px', color: 'var(--color-text-secondary)', marginBottom: '1.5rem' }}>Select your setup package and visual identity.</div>

      {/* Setup Package */}
      <div style={{ fontSize: '13px', fontWeight: 500, color: 'var(--color-text-secondary)', marginBottom: '8px' }}>Setup Package *</div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '8px' }}>
        {PACKAGES.map(pkg => (
          <div key={pkg.id} onClick={() => setSelectedPackage(pkg.id)}
            style={{
              padding: '14px', cursor: 'pointer', borderRadius: 'var(--border-radius-lg)',
              border: selectedPackage === pkg.id ? '2px solid #1D9E75' : '0.5px solid var(--color-border-tertiary)',
              background: selectedPackage === pkg.id ? 'var(--color-background-secondary)' : 'var(--color-background-primary)',
            }}>
            <div style={{ fontSize: '14px', fontWeight: 500, color: 'var(--color-text-primary)' }}>{pkg.name}</div>
            <div style={{ fontSize: '13px', fontWeight: 500, color: '#1D9E75', margin: '4px 0' }}>{pkg.price}</div>
            <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>{pkg.desc}</div>
          </div>
        ))}
      </div>
      <div style={{ fontSize: '11px', color: 'var(--color-text-tertiary)', marginBottom: '1.25rem' }}>
        Most Starter accounts can launch with little or no setup fee. Migration and custom work are quoted based on complexity.
      </div>
      {errMsg('package')}

      {/* Site Template */}
      <div style={{ fontSize: '13px', fontWeight: 500, color: 'var(--color-text-secondary)', marginBottom: '8px' }}>Site Template *</div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '10px', marginBottom: '1.25rem' }}>
        {TEMPLATES.map(t => (
          <div key={t.id} onClick={() => { setSelectedTemplate(t.id); setSelectedPalette('') }}
            style={{
              padding: '12px', cursor: 'pointer', borderRadius: 'var(--border-radius-lg)', textAlign: 'center',
              border: selectedTemplate === t.id ? '2px solid #1D9E75' : '0.5px solid var(--color-border-tertiary)',
              background: selectedTemplate === t.id ? 'var(--color-background-secondary)' : 'var(--color-background-primary)',
            }}>
            <div style={{ display: 'flex', gap: '4px', justifyContent: 'center', marginBottom: '8px' }}>
              {t.swatches.map((c, i) => (
                <div key={i} style={{ width: '20px', height: '20px', borderRadius: '50%', background: c }} />
              ))}
            </div>
            <div style={{ fontSize: '13px', fontWeight: 500, color: 'var(--color-text-primary)' }}>{t.name}</div>
            <div style={{ fontSize: '11px', color: 'var(--color-text-secondary)', marginTop: '2px' }}>{t.desc}</div>
          </div>
        ))}
      </div>
      {errMsg('template')}

      {/* Color Palette */}
      {selectedTemplate && PALETTES[selectedTemplate] && (
        <>
          <div style={{ fontSize: '13px', fontWeight: 500, color: 'var(--color-text-secondary)', marginBottom: '8px' }}>Color Palette</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', marginBottom: '1.25rem' }}>
            {PALETTES[selectedTemplate].map(pal => (
              <div key={pal.name} onClick={() => setSelectedPalette(pal.name)}
                style={{
                  padding: '12px', cursor: 'pointer', borderRadius: 'var(--border-radius-lg)', textAlign: 'center',
                  border: selectedPalette === pal.name ? '2px solid #1D9E75' : '0.5px solid var(--color-border-tertiary)',
                  background: selectedPalette === pal.name ? 'var(--color-background-secondary)' : 'var(--color-background-primary)',
                }}>
                <div style={{ display: 'flex', gap: '6px', justifyContent: 'center', marginBottom: '6px' }}>
                  <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: pal.primary, border: '1px solid var(--color-border-tertiary)' }} />
                  <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: pal.accent, border: '1px solid var(--color-border-tertiary)' }} />
                </div>
                <div style={{ fontSize: '12px', fontWeight: 500, color: 'var(--color-text-primary)' }}>{pal.name}</div>
                <div style={{ fontSize: '10px', color: 'var(--color-text-tertiary)', marginTop: '2px' }}>Primary &middot; Accent</div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Logo upload */}
      <div style={{ fontSize: '13px', fontWeight: 500, color: 'var(--color-text-secondary)', marginBottom: '8px' }}>Logo</div>
      <div style={{
        border: '2px dashed var(--color-border-secondary)', borderRadius: 'var(--border-radius-lg)',
        padding: '24px', textAlign: 'center', marginBottom: '4px', cursor: 'pointer', position: 'relative',
      }}>
        <div style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>
          {logoFile ? logoFile : 'Click to upload'}
        </div>
        <input type="file" accept="image/*"
          onChange={e => { if (e.target.files?.[0]) setLogoFile(e.target.files[0].name) }}
          style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer' }} />
      </div>
      <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
        <span onClick={() => setLogoFile('')}
          style={{ fontSize: '12px', color: '#1D9E75', cursor: 'pointer', textDecoration: 'underline' }}>
          Skip for now
        </span>
      </div>
    </div>
  )

  const step3 = (
    <div>
      <div style={{ fontSize: '22px', fontWeight: 500, color: 'var(--color-text-primary)', marginBottom: '0.25rem' }}>Domain</div>
      <div style={{ fontSize: '14px', color: 'var(--color-text-secondary)', marginBottom: '1.5rem' }}>Where does this client's domain live?</div>

      <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: 'var(--color-text-primary)', marginBottom: '1.25rem', cursor: 'pointer' }}>
        <input type="checkbox" checked={noDomain} onChange={e => setNoDomain(e.target.checked)} />
        I don't have a domain yet
      </label>

      {!noDomain && (
        <>
          {field('Current domain', inp(domain, setDomain, 'e.g. ironclad-pest.com'))}
          {field('Domain registrar',
            <select value={registrar} onChange={e => setRegistrar(e.target.value)} style={selectStyle}>
              <option value="">Select registrar</option>
              {REGISTRARS.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
          )}
        </>
      )}

      <div style={{ fontSize: '12px', color: 'var(--color-text-tertiary)', background: 'var(--color-background-secondary)', borderRadius: 'var(--border-radius-md)', padding: '10px 14px', marginTop: '1rem' }}>
        We'll need to update your domain's DNS settings to point to your new site. Our team will walk you through this during onboarding &mdash; no technical knowledge needed.
      </div>
    </div>
  )

  const step4 = (
    <div>
      <div style={{ fontSize: '22px', fontWeight: 500, color: 'var(--color-text-primary)', marginBottom: '0.25rem' }}>Social Links</div>
      <div style={{ fontSize: '14px', color: 'var(--color-text-secondary)', marginBottom: '0.5rem' }}>Fill in what you have &mdash; we can find the rest during setup.</div>
      <div style={{ fontSize: '12px', color: 'var(--color-text-tertiary)', marginBottom: '1.5rem' }}>All fields optional.</div>

      {field('Facebook Page URL', inp(social.facebook, v => setSoc('facebook', v), 'https://facebook.com/yourpage', 'url'))}
      {field('Google Business Profile URL', inp(social.google, v => setSoc('google', v), 'https://maps.google.com/...', 'url'))}
      {field('Instagram URL', inp(social.instagram, v => setSoc('instagram', v), 'https://instagram.com/yourprofile', 'url'))}
      {field('YouTube Channel URL', inp(social.youtube, v => setSoc('youtube', v), 'https://youtube.com/@yourchannel', 'url'))}
    </div>
  )

  const step5 = (
    <div>
      <div style={{ fontSize: '22px', fontWeight: 500, color: 'var(--color-text-primary)', marginBottom: '0.25rem' }}>Select Plan</div>
      <div style={{ fontSize: '14px', color: 'var(--color-text-secondary)', marginBottom: '1.5rem' }}>Choose the monthly subscription for this client.</div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '1rem' }}>
        {PLANS.map(p => (
          <div key={p.id} onClick={() => setSelectedPlan(p.id)}
            style={{
              padding: '16px', cursor: 'pointer', borderRadius: 'var(--border-radius-lg)', position: 'relative',
              border: selectedPlan === p.id ? '2px solid #1D9E75' : '0.5px solid var(--color-border-tertiary)',
              background: selectedPlan === p.id ? 'var(--color-background-secondary)' : 'var(--color-background-primary)',
            }}>
            {p.badge && (
              <span style={{
                position: 'absolute', top: '8px', right: '8px', fontSize: '10px', fontWeight: 600,
                padding: '2px 8px', borderRadius: '10px', background: '#E1F5EE', color: '#0F6E56',
              }}>{p.badge}</span>
            )}
            <div style={{ fontSize: '16px', fontWeight: 600, color: 'var(--color-text-primary)' }}>{p.name}</div>
            <div style={{ fontSize: '20px', fontWeight: 600, color: '#1D9E75', margin: '6px 0 10px' }}>${p.price}/mo</div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {p.features.map((f, i) => (
                <li key={i} style={{ fontSize: '12px', color: 'var(--color-text-secondary)', padding: '2px 0', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ color: '#1D9E75', fontSize: '12px' }}>{'\u2713'}</span> {f}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      {errMsg('plan')}
    </div>
  )

  const summaryRow = (label: string, value: React.ReactNode) => (
    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', padding: '8px 0', borderBottom: '0.5px solid var(--color-border-tertiary)' }}>
      <span style={{ color: 'var(--color-text-secondary)' }}>{label}</span>
      <span style={{ color: 'var(--color-text-primary)', fontWeight: 500, textAlign: 'right', maxWidth: '60%' }}>{value}</span>
    </div>
  )

  const step6 = (
    <div>
      <div style={{ fontSize: '22px', fontWeight: 500, color: 'var(--color-text-primary)', marginBottom: '0.25rem' }}>Review Client Details</div>
      <div style={{ fontSize: '14px', color: 'var(--color-text-secondary)', marginBottom: '1.5rem' }}>Confirm everything looks correct, then proceed to generate the payment link.</div>

      <div style={{ background: 'var(--color-background-secondary)', borderRadius: 'var(--border-radius-lg)', padding: '1rem 1.25rem', marginBottom: '1.5rem' }}>
        {summaryRow('Business', form.companyName)}
        {summaryRow('Site URL', <span style={{ color: '#1D9E75' }}>{form.slug}.pestflowpro.com</span>)}
        {summaryRow('Contact', `${form.phone} \u00b7 ${form.email}`)}
        {summaryRow('Address', form.address)}
        {summaryRow('Package', <span>{pkgObj?.name} <span style={{ color: 'var(--color-text-tertiary)' }}>{pkgObj?.price}</span></span>)}
        {summaryRow('Template', tmplObj?.name || '\u2014')}
        {summaryRow('Palette', paletteObj ? (
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: paletteObj.primary, display: 'inline-block', border: '1px solid var(--color-border-tertiary)' }} />
            <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: paletteObj.accent, display: 'inline-block', border: '1px solid var(--color-border-tertiary)' }} />
            {paletteObj.name}
          </span>
        ) : '\u2014')}
        {summaryRow('Logo', logoFile ? logoFile : 'Will add later')}
        {summaryRow('Domain', noDomain ? 'No domain yet' : (domain || '\u2014'))}
        {summaryRow('Social', socialCount > 0 ? `${socialCount} account(s) provided` : 'Will fill in during setup')}
        {summaryRow('Plan', planObj ? `${planObj.name} \u2014 $${planObj.price}/mo` : '\u2014')}
      </div>

      <button onClick={() => setShowPayment(true)}
        style={{ ...sBtn('Continue to Payment'), width: '100%', padding: '12px', fontSize: '15px' }}>
        Continue to Payment &rarr;
      </button>
    </div>
  )

  // --- Payment step ---
  const paymentStep = (
    <div>
      <div style={{ fontSize: '22px', fontWeight: 500, color: 'var(--color-text-primary)', marginBottom: '0.25rem' }}>Payment & Setup Fee</div>
      <div style={{ fontSize: '14px', color: 'var(--color-text-secondary)', marginBottom: '1.5rem' }}></div>

      {/* Package read-only */}
      {field('Package',
        <div style={{ ...inputStyle, background: 'var(--color-background-secondary)', color: 'var(--color-text-secondary)' }}>
          {pkgObj?.name} &mdash; {pkgObj?.price}
        </div>
      )}

      {/* Custom setup amount */}
      {field('Custom Setup Amount',
        <div style={{ position: 'relative' }}>
          <span style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-tertiary)', fontSize: '14px' }}>$</span>
          <input type="number" value={customSetupAmount} onChange={e => setCustomSetupAmount(e.target.value)}
            placeholder="Leave blank to use package default"
            style={{ ...inputStyle, paddingLeft: '24px' }} />
        </div>,
        '(optional \u2014 overrides package default)'
      )}

      {/* Monthly plan read-only */}
      {field('Monthly Plan',
        <div style={{ ...inputStyle, background: 'var(--color-background-secondary)', color: 'var(--color-text-secondary)' }}>
          {planObj?.name} &mdash; ${planObj?.price}/mo
        </div>
      )}

      {/* Summary card */}
      <div style={{ background: 'var(--color-background-secondary)', borderRadius: 'var(--border-radius-lg)', padding: '1rem 1.25rem', marginBottom: '1.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
          <div>
            <div style={{ fontSize: '11px', color: 'var(--color-text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>Client Email</div>
            <div style={{ fontSize: '13px', color: 'var(--color-text-primary)', fontWeight: 500 }}>{form.email || '\u2014'}</div>
          </div>
          <div>
            <div style={{ fontSize: '11px', color: 'var(--color-text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>Business</div>
            <div style={{ fontSize: '13px', color: 'var(--color-text-primary)', fontWeight: 500 }}>{form.companyName || '\u2014'}</div>
          </div>
          <div>
            <div style={{ fontSize: '11px', color: 'var(--color-text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>Site</div>
            <div style={{ fontSize: '13px', color: '#1D9E75', fontWeight: 500 }}>{form.slug}.pestflowpro.com</div>
          </div>
        </div>
      </div>

      <button onClick={handleSubmit}
        style={{ ...sBtn('Generate Payment Link'), width: '100%', padding: '12px', fontSize: '15px' }}>
        Generate Payment Link
      </button>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1.25rem' }}>
        <span onClick={() => setShowPayment(false)}
          style={{ fontSize: '14px', color: 'var(--color-text-secondary)', cursor: 'pointer' }}>
          &larr; Back
        </span>
        <span onClick={resetAll}
          style={{ fontSize: '14px', color: '#1D9E75', cursor: 'pointer' }}>
          Start New Client
        </span>
      </div>
    </div>
  )

  const steps = [step1, step2, step3, step4, step5, step6]
  const isLastStep = step === 5
  const isReviewStep = step === 5

  return (
    <div style={{ maxWidth: '720px', margin: '0 auto', padding: '1.5rem 0' }}>
      {!showPayment && progressBar}

      {showPayment ? paymentStep : steps[step]}

      {/* Navigation (hidden on Review and Payment) */}
      {!showPayment && !isReviewStep && (
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          marginTop: '2rem', paddingTop: '1rem', borderTop: '0.5px solid var(--color-border-tertiary)',
        }}>
          {step > 0
            ? <button onClick={() => setStep(s => s - 1)}
                style={{ padding: '8px 20px', borderRadius: 'var(--border-radius-md)', fontSize: '14px', cursor: 'pointer', background: 'transparent', border: '0.5px solid var(--color-border-secondary)', color: 'var(--color-text-secondary)', fontFamily: 'var(--font-sans)' }}>
                &larr; Back
              </button>
            : <div />}
          <span style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>Step {step + 1} of 6</span>
          {step === 4
            ? <button onClick={goNext} style={sBtn('Review')}>Review &rarr;</button>
            : <button onClick={goNext} style={sBtn('Next')}>Next &rarr;</button>}
        </div>
      )}
    </div>
  )
}
