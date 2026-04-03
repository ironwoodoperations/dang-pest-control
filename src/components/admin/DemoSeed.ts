import type { SupabaseClient } from '@supabase/supabase-js'

// ── Demo lead names (used for seeding + cleanup) ──
export const DEMO_LEAD_NAMES = [
  'Mike Johnson', 'Sarah Williams', 'Robert Davis', 'Emily Martinez',
  'James Wilson', 'Lisa Anderson', 'David Thompson', 'Jennifer Garcia',
  'Christopher Lee', 'Amanda White', 'Matthew Harris', 'Jessica Clark',
  'Daniel Lewis', 'Ashley Robinson', 'Ryan Walker', 'Brittany Hall',
  'Kevin Young', 'Stephanie King',
]

export const DEMO_BLOG_TITLES = [
  '5 Signs You Have a Termite Problem',
  'How to Keep Ants Out of Your Kitchen This Summer',
  'The Dangers of DIY Pest Control',
  'Why Fall is Prime Season for Rodent Invasions',
  'What to Expect From Your First Pest Inspection',
]

const DEMO_CAMPAIGN_TITLE = 'Spring Pest Prevention Campaign'

const DEMO_TESTIMONIAL_NAMES = [
  'Tom & Linda R.', 'Maria G.', 'James P.', 'Sandra K.', 'David & Amy T.', 'Rachel M.',
]

// ── Helpers ──
function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

function daysAgo(days: number) {
  return new Date(Date.now() - days * 86_400_000).toISOString()
}

function emailFor(name: string) {
  const [first, last] = name.toLowerCase().split(' ')
  return `${first}.${last}@gmail.com`
}

// ── Seed ──
export async function seedDemoData(tenantId: string, supabase: SupabaseClient) {
  const services = [
    'General Pest Control', 'Termite Inspection', 'Rodent Control',
    'Bed Bug Treatment', 'Mosquito Control', 'Ant Treatment',
  ]
  const statuses = ['new', 'contacted', 'quoted', 'won', 'lost']
  const messages = [
    'Seeing ants in kitchen', 'Need termite inspection before closing',
    'Mice in garage', 'Woke up with bug bites, possible bed bugs',
    'Mosquitoes are terrible in the backyard', 'Ants all over the patio',
    'Roaches in bathroom at night', 'Saw a rat near the trash cans',
    'Need annual pest inspection for home sale', 'Wasps building nest under eaves',
    'Spiders in basement getting worse', 'Termite swarmers inside house',
    'Fire ants in front yard', 'Need quote for commercial building',
    'Rodent droppings in attic', 'Fleas on pets despite treatment',
    'Scorpions near back door', 'Want a preventive spray plan',
  ]
  const phones = [
    '9035551001', '9035551002', '9035551003', '9035551004', '9035551005',
    '9035551006', '9035551007', '9035551008', '9035551009', '9035551010',
    '9035551011', '9035551012', '9035551013', '9035551014', '9035551015',
    '9035551016', '9035551017', '9035551018',
  ]

  // Leads — 18 leads, 3 per month over last 6 months
  const leads = DEMO_LEAD_NAMES.map((name, i) => ({
    tenant_id: tenantId,
    name,
    email: emailFor(name),
    phone: phones[i],
    service: services[i % services.length],
    status: statuses[i % statuses.length],
    message: messages[i],
    created_at: daysAgo(180 - Math.floor(i / 3) * 30 - (i % 3) * 8),
  }))

  // Blog posts
  const blogContent: Record<string, string> = {
    '5 Signs You Have a Termite Problem':
      'Termites cause billions in damage every year. Look for mud tubes along your foundation, hollow-sounding wood, and discarded wings near windowsills. Early detection saves thousands in repairs.',
    'How to Keep Ants Out of Your Kitchen This Summer':
      'Summer heat drives ants indoors seeking water and food. Seal cracks around windows, wipe down counters nightly, and store pet food in airtight containers. A perimeter spray treatment can stop them before they enter.',
    'The Dangers of DIY Pest Control':
      'Over-the-counter sprays often scatter pests rather than eliminate them. Improper chemical use can endanger children and pets. Professional technicians use targeted treatments that are both safer and more effective.',
    'Why Fall is Prime Season for Rodent Invasions':
      'As temperatures drop, mice and rats seek warm shelter inside your walls and attic. Seal gaps larger than a quarter inch, trim tree branches away from the roofline, and schedule a fall exclusion inspection.',
    'What to Expect From Your First Pest Inspection':
      'A thorough pest inspection takes 45-60 minutes and covers the interior, exterior, crawl space, and attic. Your technician will identify current activity, entry points, and conditions that attract pests, then recommend a treatment plan.',
  }

  const blogPosts = DEMO_BLOG_TITLES.map((title, i) => ({
    tenant_id: tenantId,
    title,
    slug: slugify(title),
    published: true,
    content: blogContent[title],
    excerpt: blogContent[title].slice(0, 120) + '...',
    author: 'Kirk Dang',
    created_at: daysAgo([90, 60, 42, 21, 7][i]),
  }))

  // Social posts — 12 across last 3 months
  const platforms = ['facebook', 'instagram', 'google']
  const socialStatuses = ['scheduled', 'posted']
  const captions = [
    'Spring is here — time to check for termite swarmers! Call us for a free inspection.',
    'Did you know fire ants can damage A/C units? Schedule a yard treatment today.',
    'Tip: Seal gaps around pipes under sinks to prevent roach entry.',
    'Our team just completed a full-home exclusion for a family in Jacksonville. Rodent-free!',
    'Mosquito season is coming. Ask about our monthly barrier spray program.',
    'Keep firewood at least 20 feet from your house to discourage termites.',
    'Happy customer spotlight: "Dang Pest Control saved us thousands on termite damage." — Sarah W.',
    'Bed bugs don\'t discriminate. Hotels, homes, dorms — call us for discreet treatment.',
    'Preventive pest control costs less than reactive treatment. Let\'s talk about a plan.',
    'Scorpion sighting? Don\'t panic. Our barrier treatment keeps them outside where they belong.',
    'Spring rain means more mosquitoes. Eliminate standing water in your yard.',
    'Thank you Jacksonville for voting us Best Pest Control 3 years running!',
  ]

  const socialPosts = captions.map((caption, i) => ({
    tenant_id: tenantId,
    platform: platforms[i % platforms.length],
    caption,
    status: socialStatuses[i % socialStatuses.length],
    image_url: null,
    scheduled_for: daysAgo(90 - i * 7),
    published_at: socialStatuses[i % socialStatuses.length] === 'posted' ? daysAgo(90 - i * 7) : null,
    campaign_title: i >= 4 && i <= 7 ? DEMO_CAMPAIGN_TITLE : null,
    created_at: daysAgo(90 - i * 7),
  }))

  // Testimonials — 6
  const testimonials = [
    { name: 'Tom & Linda R.', rating: 5, text: 'Kirk and his team were amazing. No more roaches after just one treatment. Highly recommend!', title: 'Highly Recommend!' },
    { name: 'Maria G.', rating: 5, text: 'Fast response and very professional. They found the termite entry point nobody else could.', title: 'Fast and Professional' },
    { name: 'James P.', rating: 4, text: 'Good service overall. Mice are gone and they sealed every gap they could find.', title: 'Great Experience' },
    { name: 'Sandra K.', rating: 5, text: 'We use them quarterly and haven\'t seen a single bug since. Worth every penny.', title: 'Best Pest Control Around' },
    { name: 'David & Amy T.', rating: 4, text: 'Handled our bed bug problem quickly and discreetly. Very grateful.', title: 'Excellent Service' },
    { name: 'Rachel M.', rating: 5, text: 'The best pest control in East Texas. They even followed up a week later to check on things.', title: 'Will Use Again' },
  ].map((t, i) => ({
    ...t,
    tenant_id: tenantId,
    is_featured: i < 3,
    created_at: daysAgo(120 - i * 20),
  }))

  // SEO keywords
  const seoKeywords = [
    'pest control Jacksonville TX', 'termite inspection East Texas',
    'rodent control near me', 'ant exterminator Jacksonville',
    'mosquito treatment Texas', 'bed bug removal East Texas',
    'commercial pest control', 'residential pest control Jacksonville',
    'wildlife removal Texas', 'emergency pest control',
  ]

  // Execute all inserts in parallel
  await Promise.all([
    supabase.from('leads').insert(leads),
    supabase.from('blog_posts').insert(blogPosts),
    supabase.from('social_posts' as any).insert(socialPosts),
    supabase.from('testimonials').insert(testimonials),
    supabase.from('site_config').upsert(
      { tenant_id: tenantId, key: 'seo_keywords', value: seoKeywords },
      { onConflict: 'key,tenant_id' }
    ),
    supabase.from('site_config').upsert(
      { tenant_id: tenantId, key: 'demo_mode', value: { active: true, seeded_at: new Date().toISOString() } },
      { onConflict: 'key,tenant_id' }
    ),
  ])
}

// ── Reset to live ──
export async function resetToLive(tenantId: string, supabase: SupabaseClient) {
  await Promise.all([
    supabase.from('leads').delete().eq('tenant_id', tenantId).in('name', DEMO_LEAD_NAMES),
    supabase.from('blog_posts').delete().eq('tenant_id', tenantId).in('title', DEMO_BLOG_TITLES),
    supabase.from('social_posts' as any).delete().eq('tenant_id', tenantId).eq('campaign_title', DEMO_CAMPAIGN_TITLE),
    supabase.from('testimonials').delete().eq('tenant_id', tenantId).in('name', DEMO_TESTIMONIAL_NAMES),
    supabase.from('site_config').upsert(
      { tenant_id: tenantId, key: 'demo_mode', value: { active: false, went_live_at: new Date().toISOString() } },
      { onConflict: 'key,tenant_id' }
    ),
  ])
}
