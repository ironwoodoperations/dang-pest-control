import { useState } from 'react'

interface Service { name: string; desc: string }
interface TeamMember { name: string; role: string; bio: string; photo: string }

const PLAN_NAMES: Record<number,string> = {1:'Starter',2:'Grow',3:'Pro',4:'Elite'}
const PLAN_PRICES: Record<number,number> = {1:149,2:249,3:349,4:499}

const DEFAULT_SERVICES: Service[] = [
  {name:'General pest control',desc:'Comprehensive treatment for common household pests'},
  {name:'Rodent control',desc:'Inspection, exclusion, and removal services'},
  {name:'Termite treatment',desc:'Liquid barrier and baiting system options'},
]

export default function ClientOnboardingWizard() {
  const [slide, setSlide] = useState(0)
  const [plan, setPlan] = useState(3)
  const [template, setTemplate] = useState('bold')
  const [services, setServices] = useState<Service[]>(DEFAULT_SERVICES)
  const [team, setTeam] = useState<TeamMember[]>([{name:'',role:'Owner',bio:'',photo:''}])
  const [form, setForm] = useState({
    biz_name:'', contact_name:'', onboard_date: new Date().toISOString().split('T')[0],
    phone:'', email:'', address:'', city_state:'', domain:'', years:'', license:'', radius:'50',
    tagline:'', biz_desc:'', logo_url:'',
    color_primary:'#E85D04', color_secondary:'#1D9E75',
    primary_area:'', service_cities:'',
    hours_weekday:'Mon–Fri 7am–6pm', hours_weekend:'Sat 8am–2pm / Sun Closed',
    emergency_phone:'', quote_email:'', contact_email:'',
    fb_url:'', ig_handle:'', gmb_url:'', yelp_url:'', fb_token:'',
    gsc_code:'', ga4_id:'', place_id:'', keywords:'', competitors:'',
    sms_provider:'', sms_number:'', sms_api_key:'', resend_key:'',
    gcp_project:'', places_api_key:'', place_id_elite:'', ayrshare_key:'',
  })

  const total = 11
  const f = (k: keyof typeof form) => form[k]
  const set = (k: keyof typeof form, v: string) => setForm(p => ({...p, [k]:v}))
  const inp = (k: keyof typeof form, placeholder='', type='text') => (
    <input type={type} value={f(k)} placeholder={placeholder}
      onChange={e => set(k, e.target.value)}
      style={{width:'100%',padding:'8px 10px',border:'0.5px solid var(--color-border-secondary)',
        borderRadius:'var(--border-radius-md)',fontSize:'14px',color:'var(--color-text-primary)',
        background:'var(--color-background-primary)',fontFamily:'var(--font-sans)'}} />
  )
  const ta = (k: keyof typeof form, placeholder='', rows=3) => (
    <textarea value={f(k)} placeholder={placeholder} rows={rows}
      onChange={e => set(k, e.target.value)}
      style={{width:'100%',padding:'8px 10px',border:'0.5px solid var(--color-border-secondary)',
        borderRadius:'var(--border-radius-md)',fontSize:'14px',color:'var(--color-text-primary)',
        background:'var(--color-background-primary)',fontFamily:'var(--font-sans)',resize:'vertical'}} />
  )

  const label = (text: string, hint='') => (
    <div style={{marginBottom:'5px'}}>
      <label style={{fontSize:'13px',color:'var(--color-text-secondary)'}}>{text}</label>
      {hint && <div style={{fontSize:'11px',color:'var(--color-text-tertiary)',marginTop:'2px'}}>{hint}</div>}
    </div>
  )

  const field = (lbl: string, child: React.ReactNode, hint='') => (
    <div style={{marginBottom:'1.1rem'}}>
      {label(lbl, hint)}
      {child}
    </div>
  )

  const two = (a: React.ReactNode, b: React.ReactNode) => (
    <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'12px',marginBottom:'0'}}>
      {a}{b}
    </div>
  )

  const divider = (text: string) => (
    <div style={{fontSize:'12px',fontWeight:500,color:'var(--color-text-secondary)',
      textTransform:'uppercase',letterSpacing:'0.05em',margin:'1.25rem 0 0.75rem',
      paddingBottom:'4px',borderBottom:'0.5px solid var(--color-border-tertiary)'}}>{text}</div>
  )

  const badge = (text: string, color: string) => (
    <span style={{display:'inline-block',fontSize:'10px',fontWeight:500,padding:'2px 7px',
      borderRadius:'10px',marginLeft:'6px',verticalAlign:'middle',...tierStyle(color)}}>{text}</span>
  )

  function tierStyle(t: string) {
    const map: Record<string,{background:string,color:string}> = {
      s:{background:'#E1F5EE',color:'#0F6E56'},
      g:{background:'#E6F1FB',color:'#185FA5'},
      p:{background:'#EEEDFE',color:'#534AB7'},
      e:{background:'#FAEEDA',color:'#854F0B'},
    }
    return map[t]||map.s
  }

  const lockNotice = (text: string, show: boolean) => show ? (
    <div style={{fontSize:'12px',color:'#854F0B',background:'#FAEEDA',borderRadius:'var(--border-radius-md)',
      padding:'8px 12px',marginBottom:'1rem',display:'flex',alignItems:'center',gap:'8px'}}>
      {text}
    </div>
  ) : null

  const planCard = (p: number, name: string, price: string, desc: string) => (
    <div onClick={() => setPlan(p)}
      style={{padding:'12px',border: plan===p ? '2px solid #1D9E75' : '0.5px solid var(--color-border-tertiary)',
        borderRadius:'var(--border-radius-lg)',cursor:'pointer',
        background: plan===p ? 'var(--color-background-secondary)' : 'var(--color-background-primary)'}}>
      <div style={{fontSize:'14px',fontWeight:500,color:'var(--color-text-primary)'}}>{name}</div>
      <div style={{fontSize:'18px',fontWeight:500,color:'#1D9E75',margin:'4px 0'}}>{price}</div>
      <div style={{fontSize:'11px',color:'var(--color-text-secondary)'}}>{desc}</div>
    </div>
  )

  const tmplCard = (t: string, name: string, desc: string, bg: string) => (
    <div onClick={() => setTemplate(t)}
      style={{padding:'12px',border: template===t ? '2px solid #1D9E75' : '0.5px solid var(--color-border-tertiary)',
        borderRadius:'var(--border-radius-lg)',cursor:'pointer',textAlign:'center',
        background: template===t ? 'var(--color-background-secondary)' : 'var(--color-background-primary)'}}>
      <div style={{height:'50px',borderRadius:'6px',marginBottom:'8px',background:bg}}></div>
      <div style={{fontSize:'13px',fontWeight:500,color:'var(--color-text-primary)'}}>{name}</div>
      <div style={{fontSize:'11px',color:'var(--color-text-secondary)'}}>{desc}</div>
    </div>
  )

  function addService() { setServices(s => [...s,{name:'',desc:''}]) }
  function removeService(i: number) { setServices(s => s.filter((_,idx)=>idx!==i)) }
  function updateService(i: number, key: keyof Service, val: string) {
    setServices(s => s.map((item,idx) => idx===i ? {...item,[key]:val} : item))
  }

  function addTeam() { setTeam(t => [...t,{name:'',role:'Technician',bio:'',photo:''}]) }
  function removeTeam(i: number) { setTeam(t => t.filter((_,idx)=>idx!==i)) }
  function updateTeam(i: number, key: keyof TeamMember, val: string) {
    setTeam(t => t.map((item,idx) => idx===i ? {...item,[key]:val} : item))
  }

  function exportMD() {
    const cities = f('service_cities').split(',').map(c=>c.trim()).filter(Boolean)
    const keywords = f('keywords').split('\n').map(k=>k.trim()).filter(Boolean)
    const competitors = f('competitors').split('\n').map(c=>c.trim()).filter(Boolean)
    const servicesBlock = services.map(s=>`  - name: "${s.name}"\n    description: "${s.desc}"`).join('\n')
    const teamBlock = team.map(m=>`  - name: "${m.name}"\n    role: "${m.role}"\n    bio: "${m.bio}"\n    photo: "${m.photo}"`).join('\n')

    const md = `# PestFlow Pro — Client Setup File
# Generated: ${new Date().toISOString()}
# DO NOT share this file — contains API keys and credentials

---

## client

business_name: "${f('biz_name')}"
contact_name: "${f('contact_name')}"
onboard_date: "${f('onboard_date')}"

## plan

tier: ${plan}
plan_name: "${PLAN_NAMES[plan]}"
monthly_price: ${PLAN_PRICES[plan]}

## design

template: "${template}"
color_primary: "${f('color_primary')}"
color_secondary: "${f('color_secondary')}"
logo_url: "${f('logo_url')}"

## business_info

phone: "${f('phone')}"
email: "${f('email')}"
address: "${f('address')}"
city_state: "${f('city_state')}"
domain: "${f('domain')}"
years_in_business: ${f('years')||0}
license_number: "${f('license')}"
service_radius_miles: ${f('radius')||50}
tagline: "${f('tagline')}"
description: |
  ${f('biz_desc').replace(/\n/g,'\n  ')}

## hours

weekday: "${f('hours_weekday')}"
weekend: "${f('hours_weekend')}"
emergency_phone: "${f('emergency_phone')}"

## contact_routing

quote_email: "${f('quote_email')}"
contact_email: "${f('contact_email')}"

## services

${servicesBlock}

## service_areas

primary: "${f('primary_area')}"
cities:
${cities.map(c=>`  - "${c}"`).join('\n')}

## team

${teamBlock}

## social

facebook_url: "${f('fb_url')}"
instagram_handle: "${f('ig_handle')}"
google_business_url: "${f('gmb_url')}"
yelp_url: "${f('yelp_url')}"
facebook_page_token: "${f('fb_token')}"

## seo${plan<2?'  # LOCKED — requires Grow+':''}

google_place_id: "${f('place_id')}"
ga4_measurement_id: "${f('ga4_id')}"
gsc_verification_code: "${f('gsc_code')}"
target_keywords:
${keywords.map(k=>`  - "${k}"`).join('\n')}
competitor_sites:
${competitors.map(c=>`  - "${c}"`).join('\n')}

## sms${plan<3?'  # LOCKED — requires Pro+':''}

provider: "${f('sms_provider')}"
sending_number: "${f('sms_number')}"
api_key: "${f('sms_api_key')}"
resend_api_key: "${f('resend_key')}"

## elite${plan<4?'  # LOCKED — requires Elite':''}

google_cloud_project: "${f('gcp_project')}"
google_places_api_key: "${f('places_api_key')}"
google_place_id_confirmed: "${f('place_id_elite')}"
ayrshare_api_key: "${f('ayrshare_key')}"

---
# END OF CLIENT SETUP FILE
# Load into PestFlow Pro → Admin → Onboarding to auto-generate the client site
`
    const blob = new Blob([md],{type:'text/markdown'})
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = (f('biz_name')||'client').toLowerCase().replace(/\s+/g,'-')+'-pestflow-setup.md'
    a.click()
    URL.revokeObjectURL(url)
  }

  const sBtn = (label: string, color='#1D9E75') => ({
    padding:'8px 20px',borderRadius:'var(--border-radius-md)',fontSize:'14px',
    cursor:'pointer',fontFamily:'var(--font-sans)',background:color,
    border:'none',color:'#fff',fontWeight:500
  } as React.CSSProperties)

  const slides = [
    // 0 Welcome
    <div key={0}>
      <div style={{fontSize:'22px',fontWeight:500,color:'var(--color-text-primary)',marginBottom:'0.25rem'}}>Client onboarding</div>
      <div style={{fontSize:'14px',color:'var(--color-text-secondary)',marginBottom:'1.5rem'}}>Fill this out during your sales presentation. We'll generate a ready-to-deploy site file at the end.</div>
      {field('Client business name', inp('biz_name','e.g. Smith\'s Pest Control'))}
      {field('Client contact name', inp('contact_name','Owner or primary contact'))}
      {field('Date', inp('onboard_date','','date'))}
      {divider('Select plan')}
      <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'10px',marginBottom:'1.5rem'}}>
        {planCard(1,'Starter','$149/mo','Website + CRM + basic SEO')}
        {planCard(2,'Grow','$249/mo','+ Full SEO + Blog + Social')}
        {planCard(3,'Pro','$349/mo','+ AI tools + Campaigns')}
        {planCard(4,'Elite','$499/mo','+ Live reviews + All platforms')}
      </div>
    </div>,

    // 1 Business Info
    <div key={1}>
      <div style={{fontSize:'22px',fontWeight:500,marginBottom:'0.25rem'}}>Business information</div>
      <div style={{fontSize:'14px',color:'var(--color-text-secondary)',marginBottom:'1.5rem'}}>Core details that appear across the site.</div>
      {two(field('Phone', inp('phone','(555) 555-5555','tel')), field('Business email', inp('email','info@example.com','email')))}
      {two(field('Street address', inp('address','123 Main St')), field('City, State ZIP', inp('city_state','Houston, TX 77001')))}
      {two(field('Desired domain', inp('domain','smithspestcontrol.com'), 'We\'ll check availability and register it'), field('Years in business', inp('years','e.g. 12','number')))}
      {two(field('Pest control license #', inp('license','TX-12345')), field('Service radius (miles)', inp('radius','50','number')))}
      {field('Tagline / slogan', inp('tagline','e.g. Fast, Friendly, and Pest-Free Guaranteed'))}
      {field('Short business description', ta('biz_desc','What makes this company different? Family-owned? 24/7? Eco-friendly?'))}
    </div>,

    // 2 Branding
    <div key={2}>
      <div style={{fontSize:'22px',fontWeight:500,marginBottom:'0.25rem'}}>Branding & design</div>
      <div style={{fontSize:'14px',color:'var(--color-text-secondary)',marginBottom:'1.5rem'}}>Colors, logo, and template selection.</div>
      {field('Logo URL or file path', inp('logo_url','https://... or /public/logo.png'), 'Upload logo to the repo after onboarding if not yet available')}
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'12px',marginBottom:'1.1rem'}}>
        <div>
          {label('Primary brand color')}
          <div style={{display:'flex',gap:'8px',alignItems:'center'}}>
            <input type="color" value={f('color_primary')} onChange={e=>set('color_primary',e.target.value)}
              style={{width:'44px',height:'36px',padding:'2px',cursor:'pointer',border:'0.5px solid var(--color-border-secondary)',borderRadius:'var(--border-radius-md)'}} />
            <input type="text" value={f('color_primary')} onChange={e=>set('color_primary',e.target.value)}
              style={{flex:1,padding:'8px 10px',border:'0.5px solid var(--color-border-secondary)',borderRadius:'var(--border-radius-md)',fontSize:'14px',color:'var(--color-text-primary)',background:'var(--color-background-primary)'}} />
          </div>
        </div>
        <div>
          {label('Secondary brand color')}
          <div style={{display:'flex',gap:'8px',alignItems:'center'}}>
            <input type="color" value={f('color_secondary')} onChange={e=>set('color_secondary',e.target.value)}
              style={{width:'44px',height:'36px',padding:'2px',cursor:'pointer',border:'0.5px solid var(--color-border-secondary)',borderRadius:'var(--border-radius-md)'}} />
            <input type="text" value={f('color_secondary')} onChange={e=>set('color_secondary',e.target.value)}
              style={{flex:1,padding:'8px 10px',border:'0.5px solid var(--color-border-secondary)',borderRadius:'var(--border-radius-md)',fontSize:'14px',color:'var(--color-text-primary)',background:'var(--color-background-primary)'}} />
          </div>
        </div>
      </div>
      {divider('Design template')}
      <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'10px'}}>
        {tmplCard('bold','Bold','High-contrast, strong CTAs','linear-gradient(135deg,#E85D04,#FF8C42)')}
        {tmplCard('clean','Clean','Minimal, professional','linear-gradient(135deg,#185FA5,#378ADD)')}
        {tmplCard('modern','Modern','Dark accents, sharp','linear-gradient(135deg,#534AB7,#7F77DD)')}
      </div>
    </div>,

    // 3 Services
    <div key={3}>
      <div style={{fontSize:'22px',fontWeight:500,marginBottom:'0.25rem'}}>Services offered</div>
      <div style={{fontSize:'14px',color:'var(--color-text-secondary)',marginBottom:'1.5rem'}}>Each service becomes a card on the site.</div>
      {services.map((s,i) => (
        <div key={i} style={{border:'0.5px solid var(--color-border-tertiary)',borderRadius:'var(--border-radius-md)',padding:'10px 12px',marginBottom:'10px'}}>
          <div style={{display:'flex',gap:'8px',alignItems:'center',marginBottom:'6px'}}>
            <input type="text" value={s.name} placeholder="Service name" onChange={e=>updateService(i,'name',e.target.value)}
              style={{flex:1,padding:'8px 10px',border:'0.5px solid var(--color-border-secondary)',borderRadius:'var(--border-radius-md)',fontSize:'14px',color:'var(--color-text-primary)',background:'var(--color-background-primary)',fontWeight:500}} />
            <button onClick={()=>removeService(i)} style={{background:'transparent',border:'none',color:'var(--color-text-tertiary)',cursor:'pointer',fontSize:'18px',padding:'0 4px'}}>×</button>
          </div>
          <textarea value={s.desc} placeholder="Brief description" rows={2} onChange={e=>updateService(i,'desc',e.target.value)}
            style={{width:'100%',padding:'8px 10px',border:'0.5px solid var(--color-border-secondary)',borderRadius:'var(--border-radius-md)',fontSize:'13px',color:'var(--color-text-primary)',background:'var(--color-background-primary)',resize:'vertical'}} />
        </div>
      ))}
      <button onClick={addService} style={{background:'transparent',border:'0.5px dashed var(--color-border-secondary)',color:'var(--color-text-secondary)',borderRadius:'var(--border-radius-md)',padding:'6px 14px',cursor:'pointer',fontSize:'13px',fontFamily:'var(--font-sans)'}}>+ Add service</button>
      {divider('Service areas')}
      {field('Primary city / county', inp('primary_area','e.g. Houston, TX'))}
      {field('Additional service cities (comma separated)', inp('service_cities','Katy, Sugarland, Pearland, The Woodlands'), 'Each city becomes a location page on the site')}
    </div>,

    // 4 Hours
    <div key={4}>
      <div style={{fontSize:'22px',fontWeight:500,marginBottom:'0.25rem'}}>Hours & contact details</div>
      <div style={{fontSize:'14px',color:'var(--color-text-secondary)',marginBottom:'1.5rem'}}>Displayed on the Contact page and footer.</div>
      {two(field('Weekday hours', inp('hours_weekday','Mon–Fri 7am–6pm')), field('Weekend hours', inp('hours_weekend','Sat 8am–2pm / Sun Closed')))}
      {field('Emergency / after-hours line', inp('emergency_phone','Leave blank if none','tel'))}
      {two(
        field('Quote form recipient email', inp('quote_email','quotes@example.com','email'), 'Resend will forward quote submissions here'),
        field('Contact form recipient email', inp('contact_email','info@example.com','email'))
      )}
    </div>,

    // 5 Team
    <div key={5}>
      <div style={{fontSize:'22px',fontWeight:500,marginBottom:'0.25rem'}}>Team members</div>
      <div style={{fontSize:'14px',color:'var(--color-text-secondary)',marginBottom:'1.5rem'}}>Owner first, then technicians. Photos can be added later.</div>
      {team.map((m,i) => (
        <div key={i} style={{border:'0.5px solid var(--color-border-tertiary)',borderRadius:'var(--border-radius-md)',padding:'10px 12px',marginBottom:'10px'}}>
          <div style={{display:'flex',alignItems:'center',marginBottom:'8px'}}>
            <span style={{fontSize:'13px',fontWeight:500,color:'var(--color-text-secondary)'}}>Member {i+1}</span>
            {i>0 && <button onClick={()=>removeTeam(i)} style={{marginLeft:'auto',background:'transparent',border:'none',color:'var(--color-text-tertiary)',cursor:'pointer',fontSize:'18px'}}>×</button>}
          </div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'8px',marginBottom:'8px'}}>
            <input type="text" value={m.name} placeholder="Full name" onChange={e=>updateTeam(i,'name',e.target.value)}
              style={{padding:'8px 10px',border:'0.5px solid var(--color-border-secondary)',borderRadius:'var(--border-radius-md)',fontSize:'14px',color:'var(--color-text-primary)',background:'var(--color-background-primary)'}} />
            <input type="text" value={m.role} placeholder="Role / title" onChange={e=>updateTeam(i,'role',e.target.value)}
              style={{padding:'8px 10px',border:'0.5px solid var(--color-border-secondary)',borderRadius:'var(--border-radius-md)',fontSize:'14px',color:'var(--color-text-primary)',background:'var(--color-background-primary)'}} />
          </div>
          <input type="text" value={m.photo} placeholder="Photo URL (or upload later)" onChange={e=>updateTeam(i,'photo',e.target.value)}
            style={{width:'100%',padding:'8px 10px',border:'0.5px solid var(--color-border-secondary)',borderRadius:'var(--border-radius-md)',fontSize:'14px',color:'var(--color-text-primary)',background:'var(--color-background-primary)',marginBottom:'8px'}} />
          <textarea value={m.bio} placeholder="Short bio (1–2 sentences)" rows={2} onChange={e=>updateTeam(i,'bio',e.target.value)}
            style={{width:'100%',padding:'8px 10px',border:'0.5px solid var(--color-border-secondary)',borderRadius:'var(--border-radius-md)',fontSize:'13px',color:'var(--color-text-primary)',background:'var(--color-background-primary)',resize:'vertical'}} />
        </div>
      ))}
      <button onClick={addTeam} style={{background:'transparent',border:'0.5px dashed var(--color-border-secondary)',color:'var(--color-text-secondary)',borderRadius:'var(--border-radius-md)',padding:'6px 14px',cursor:'pointer',fontSize:'13px',fontFamily:'var(--font-sans)'}}>+ Add team member</button>
    </div>,

    // 6 Social
    <div key={6}>
      <div style={{fontSize:'22px',fontWeight:500,marginBottom:'0.25rem'}}>Social media accounts</div>
      <div style={{fontSize:'14px',color:'var(--color-text-secondary)',marginBottom:'1.5rem'}}>Links appear in the footer. Connections unlock social scheduling.</div>
      {field('Facebook page URL', inp('fb_url','https://facebook.com/smithspestcontrol','url'))}
      {field('Instagram handle', inp('ig_handle','@smithspestcontrol'))}
      {field('Google Business Profile URL', inp('gmb_url','https://maps.google.com/...','url'))}
      {field('Yelp page URL', inp('yelp_url','https://yelp.com/biz/...','url'))}
      {field('Facebook Page Access Token', inp('fb_token','Paste token from Meta Business Suite → Settings → Advanced'), 'Required to enable live social posting from the dashboard')}
    </div>,

    // 7 SEO
    <div key={7}>
      <div style={{fontSize:'22px',fontWeight:500,marginBottom:'0.25rem'}}>SEO & Google setup {badge('Grow+','g')}</div>
      <div style={{fontSize:'14px',color:'var(--color-text-secondary)',marginBottom:'1rem'}}>These unlock the full SEO suite in the dashboard.</div>
      {lockNotice('Included for reference — upgrade to Grow or higher to activate these features.', plan<2)}
      <div style={{opacity: plan<2 ? 0.45 : 1, pointerEvents: plan<2 ? 'none' : 'auto'}}>
        {field('Google Search Console verification code', inp('gsc_code','Paste meta tag content value from GSC'), 'Go to Google Search Console → Add Property → HTML tag method')}
        {field('Google Analytics 4 Measurement ID', inp('ga4_id','G-XXXXXXXXXX'))}
        {field('Google Business Profile — Place ID', inp('place_id','ChIJ...'), 'Find at developers.google.com/maps/documentation/javascript/examples/places-placeid-finder')}
        {two(
          field('Target keywords (top 5)', ta('keywords','pest control Houston\nexterminator near me\nrodent control Katy TX')),
          field('Competitor sites to track', ta('competitors','competitor1.com\ncompetitor2.com'))
        )}
      </div>
    </div>,

    // 8 SMS
    <div key={8}>
      <div style={{fontSize:'22px',fontWeight:500,marginBottom:'0.25rem'}}>SMS & communications {badge('Pro+','p')}</div>
      <div style={{fontSize:'14px',color:'var(--color-text-secondary)',marginBottom:'1rem'}}>Enables SMS confirmation texts after quote form submissions.</div>
      {lockNotice('Included for reference — upgrade to Pro or higher to activate SMS features.', plan<3)}
      <div style={{opacity: plan<3 ? 0.45 : 1, pointerEvents: plan<3 ? 'none' : 'auto'}}>
        {field('SMS provider',
          <select value={f('sms_provider')} onChange={e=>set('sms_provider',e.target.value)}
            style={{width:'100%',padding:'8px 10px',border:'0.5px solid var(--color-border-secondary)',borderRadius:'var(--border-radius-md)',fontSize:'14px',color:'var(--color-text-primary)',background:'var(--color-background-primary)'}}>
            <option value="">Select provider</option>
            <option value="simpletexting">SimpleTexting</option>
            <option value="twilio">Twilio</option>
            <option value="none">Not yet / set up later</option>
          </select>
        )}
        {two(field('Sending phone number', inp('sms_number','(555) 555-5555','tel')), field('API key', inp('sms_api_key','Paste SMS provider API key')))}
        {field('Resend API key (email delivery)', inp('resend_key','re_...'), 'Create a free account at resend.com — needed for quote + contact form email delivery')}
      </div>
    </div>,

    // 9 Elite
    <div key={9}>
      <div style={{fontSize:'22px',fontWeight:500,marginBottom:'0.25rem'}}>Reviews & Elite features {badge('Elite','e')}</div>
      <div style={{fontSize:'14px',color:'var(--color-text-secondary)',marginBottom:'1rem'}}>Unlocks live Google Reviews and Ayrshare all-platform posting.</div>
      {lockNotice('Included for reference — upgrade to Elite to activate these features.', plan<4)}
      <div style={{opacity: plan<4 ? 0.45 : 1, pointerEvents: plan<4 ? 'none' : 'auto'}}>
        {divider('LeadFusion Local — live Google reviews')}
        {field('Google Cloud project name', inp('gcp_project','e.g. smiths-pest-control'), 'Create at console.cloud.google.com — enable Places API (New)')}
        {field('Google Places API key', inp('places_api_key','AIza...'), 'Restrict key to Places API (New) only for security')}
        {field('Google Place ID (confirm)', inp('place_id_elite','ChIJ...'))}
        {divider('Ayrshare — all-platform social posting')}
        {field('Ayrshare API key', inp('ayrshare_key','Paste from app.ayrshare.com → API Key'), '$29/mo Ayrshare account enables FB, IG, LinkedIn, Twitter, TikTok, Pinterest')}
      </div>
    </div>,

    // 10 Summary
    <div key={10}>
      <div style={{fontSize:'22px',fontWeight:500,marginBottom:'0.25rem'}}>Review & export</div>
      <div style={{fontSize:'14px',color:'var(--color-text-secondary)',marginBottom:'1.5rem'}}>Confirm the details below, then export the client file to load into PestFlow Pro.</div>
      {[
        {title:'Account', rows:[['Business name',f('biz_name')],['Contact',f('contact_name')],['Plan',`${PLAN_NAMES[plan]} — $${PLAN_PRICES[plan]}/mo`],['Template',template]]},
        {title:'Business', rows:[['Phone',f('phone')],['Email',f('email')],['Domain',f('domain')],['License',f('license')],['Tagline',f('tagline')]]},
        {title:'Services', rows: services.map((s,i)=>[`${i+1}. ${s.name}`,s.desc.slice(0,60)+(s.desc.length>60?'...':'')] as [string,string])},
        {title:'Service areas', rows:[['Primary',f('primary_area')],['Cities',f('service_cities')]]},
        {title:'Team', rows: team.map(m=>[m.role||'Member',m.name||'(unnamed)'] as [string,string])},
        {title:'Social', rows:[['Facebook',f('fb_url')],['Instagram',f('ig_handle')],['GMB',f('gmb_url')]]},
        ...(plan>=2?[{title:'SEO & Google', rows:[['Place ID',f('place_id')],['GA4 ID',f('ga4_id')],['GSC code',f('gsc_code')?'✓ provided':'—']] as [string,string][]}]:[]),
        ...(plan>=3?[{title:'SMS & Email', rows:[['Provider',f('sms_provider')],['SMS number',f('sms_number')],['Resend key',f('resend_key')?'✓ provided':'—']] as [string,string][]}]:[]),
        ...(plan>=4?[{title:'Elite', rows:[['GCP project',f('gcp_project')],['Places API key',f('places_api_key')?'✓ provided':'—'],['Ayrshare key',f('ayrshare_key')?'✓ provided':'—']] as [string,string][]}]:[]),
      ].map(section => (
        <div key={section.title} style={{background:'var(--color-background-secondary)',borderRadius:'var(--border-radius-lg)',padding:'1rem 1.25rem',marginBottom:'1rem'}}>
          <div style={{fontSize:'12px',fontWeight:500,color:'var(--color-text-secondary)',textTransform:'uppercase',letterSpacing:'0.05em',marginBottom:'10px'}}>{section.title}</div>
          {section.rows.map(([k,v]) => (
            <div key={k} style={{display:'flex',justifyContent:'space-between',fontSize:'13px',padding:'4px 0',borderBottom:'0.5px solid var(--color-border-tertiary)'}}>
              <span style={{color:'var(--color-text-secondary)'}}>{k}</span>
              <span style={{color:'var(--color-text-primary)',fontWeight:500,textAlign:'right',maxWidth:'60%',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{v||'—'}</span>
            </div>
          ))}
        </div>
      ))}
      <div style={{textAlign:'center',marginTop:'1.5rem'}}>
        <button onClick={exportMD} style={{...sBtn('Export',undefined),background:'#534AB7',padding:'10px 28px',fontSize:'15px'}}>
          Export client setup file (.md)
        </button>
        <div style={{fontSize:'12px',color:'var(--color-text-secondary)',marginTop:'8px'}}>Exports a structured markdown file ready to load into PestFlow Pro</div>
      </div>
    </div>,
  ]

  return (
    <div style={{maxWidth:'720px',margin:'0 auto',padding:'1.5rem 0'}}>
      {/* Progress bar */}
      <div style={{display:'flex',gap:'4px',marginBottom:'1.5rem'}}>
        {Array.from({length:total},(_,i) => (
          <div key={i} style={{height:'4px',flex:1,borderRadius:'2px',
            background: i<slide ? '#1D9E75' : i===slide ? '#0F6E56' : 'var(--color-border-tertiary)',
            transition:'background 0.3s'}} />
        ))}
      </div>

      {/* Current slide */}
      {slides[slide]}

      {/* Navigation */}
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',
        marginTop:'2rem',paddingTop:'1rem',borderTop:'0.5px solid var(--color-border-tertiary)'}}>
        {slide>0
          ? <button onClick={()=>setSlide(s=>s-1)} style={{padding:'8px 20px',borderRadius:'var(--border-radius-md)',fontSize:'14px',cursor:'pointer',background:'transparent',border:'0.5px solid var(--color-border-secondary)',color:'var(--color-text-secondary)',fontFamily:'var(--font-sans)'}}>← Back</button>
          : <div />}
        <span style={{fontSize:'13px',color:'var(--color-text-secondary)'}}>Step {slide+1} of {total}</span>
        {slide<total-1
          ? <button onClick={()=>setSlide(s=>s+1)} style={sBtn('Next')}>Next →</button>
          : <div />}
      </div>
    </div>
  )
}
