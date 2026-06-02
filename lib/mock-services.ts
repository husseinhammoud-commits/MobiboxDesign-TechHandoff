/**
 * Mock service data + procedural padding.
 *
 * Ports the prototype's `SAMPLE_SERVICES` array. The 24 hand-crafted entries
 * stay literal; an additional ~500 entries are generated deterministically so
 * the infinite-scroll grid has enough data to fill any viewport.
 *
 * Replace this file with a real data source (API client, server action, RSC
 * fetch, whatever the team prefers) — the rest of the app reads from `SERVICES`
 * and doesn't care where it comes from.
 */

export type ServiceStatus = 'online' | 'offline' | 'draft';

export interface Service {
  name:         string;
  serviceId:    string;
  category:     string;
  client:       string;
  status:       ServiceStatus;
  dateCreated:  string;
  sub:          string;
  warning?:     string;
}

// =============================================================================
// 24 hand-crafted seed services — port from the HTML prototype
// =============================================================================
const SEED: Service[] = [
  { name: '25/3 ClientMain',          serviceId: 'SRV-25103', category: 'Entertainment',    client: 'Hexum Client',          status: 'online',  dateCreated: 'Mar 18, 2025', sub: 'Hexum Client · 3 offers · 5 countries',          warning: '1 CAP missing for UAE' },
  { name: 'NEW Stack Service',        serviceId: 'SRV-25118', category: 'Utilities',        client: 'No client assigned',    status: 'online',  dateCreated: 'Apr 02, 2025', sub: 'No client · 3 offers · 3 countries' },
  { name: 'Automated Service 1',      serviceId: 'SRV-25127', category: 'Tools',            client: 'No client assigned',    status: 'draft',   dateCreated: 'Apr 11, 2025', sub: 'No client · 4 offers · 2 countries',             warning: '2 issues need review' },
  { name: 'Test Service',             serviceId: 'SRV-25134', category: 'Other',            client: 'No client assigned',    status: 'online',  dateCreated: 'Apr 22, 2025', sub: 'No client · 1 offer · 1 country',                warning: '1 CAP missing for KW' },
  { name: 'Premium Gaming Service',   serviceId: 'SRV-25149', category: 'Gaming',           client: 'Edie Games Co',         status: 'online',  dateCreated: 'May 05, 2025', sub: 'Edie Games Co · 6 offers · 8 countries' },
  { name: 'Music Streaming Bundle',   serviceId: 'SRV-25156', category: 'Music',            client: 'SoundWave Media',       status: 'online',  dateCreated: 'May 19, 2025', sub: 'SoundWave Media · 5 offers · 4 countries' },
  { name: 'Daily Quiz Master',        serviceId: 'SRV-25168', category: 'Trivia',           client: 'BrightStar Apps',       status: 'online',  dateCreated: 'Jun 04, 2025', sub: 'BrightStar Apps · 2 offers · 6 countries' },
  { name: 'Astro Daily Premium',      serviceId: 'SRV-25174', category: 'Lifestyle',        client: 'Pulse Studios',         status: 'online',  dateCreated: 'Jun 21, 2025', sub: 'Pulse Studios · 4 offers · 3 countries',         warning: 'CAPs near limit in 2 countries' },
  { name: 'Fitness Routines',         serviceId: 'SRV-25189', category: 'Health & Fitness', client: 'Apex Digital',          status: 'draft',   dateCreated: 'Jul 08, 2025', sub: 'Apex Digital · 3 offers · 4 countries' },
  { name: 'Cooking Recipes Plus',     serviceId: 'SRV-25197', category: 'Food & Drink',     client: 'MediaCo',               status: 'online',  dateCreated: 'Jul 24, 2025', sub: 'MediaCo · 2 offers · 5 countries' },
  { name: 'Sports Highlights HD',     serviceId: 'SRV-25208', category: 'Sports',           client: 'GlobalPay Ltd',         status: 'online',  dateCreated: 'Aug 11, 2025', sub: 'GlobalPay Ltd · 7 offers · 9 countries' },
  { name: 'Kids Stories Library',     serviceId: 'SRV-25216', category: 'Kids',             client: 'Northern Lights',       status: 'online',  dateCreated: 'Aug 28, 2025', sub: 'Northern Lights · 3 offers · 4 countries' },
  { name: 'Language Learning Daily',  serviceId: 'SRV-25224', category: 'Education',        client: 'BrightStar Apps',       status: 'online',  dateCreated: 'Sep 10, 2025', sub: 'BrightStar Apps · 4 offers · 7 countries' },
  { name: 'Movie Trailers Pro',       serviceId: 'SRV-25231', category: 'Entertainment',    client: 'MediaCo',               status: 'offline', dateCreated: 'Sep 24, 2025', sub: 'MediaCo · 2 offers · 3 countries',               warning: 'Approval blocked: 2 issues' },
  { name: 'Weather Plus Daily',       serviceId: 'SRV-25245', category: 'Weather',          client: 'Telco Direct',          status: 'online',  dateCreated: 'Oct 09, 2025', sub: 'Telco Direct · 1 offer · 8 countries' },
  { name: 'Football Live Updates',    serviceId: 'SRV-25253', category: 'Sports',           client: 'Edie Games Co',         status: 'online',  dateCreated: 'Oct 22, 2025', sub: 'Edie Games Co · 5 offers · 6 countries' },
  { name: 'Crypto Tips Premium',      serviceId: 'SRV-25264', category: 'Finance',          client: 'Apex Digital',          status: 'draft',   dateCreated: 'Nov 06, 2025', sub: 'Apex Digital · 2 offers · 2 countries',          warning: 'Compliance review pending' },
  { name: 'Trivia Master Daily',      serviceId: 'SRV-25272', category: 'Trivia',           client: 'Pulse Studios',         status: 'online',  dateCreated: 'Nov 18, 2025', sub: 'Pulse Studios · 3 offers · 5 countries' },
  { name: 'Comedy Club Live',         serviceId: 'SRV-25281', category: 'Entertainment',    client: 'MediaCo',               status: 'online',  dateCreated: 'Dec 03, 2025', sub: 'MediaCo · 2 offers · 3 countries' },
  { name: 'Health Coach Pro',         serviceId: 'SRV-25295', category: 'Health & Fitness', client: 'Northern Lights',       status: 'online',  dateCreated: 'Dec 19, 2025', sub: 'Northern Lights · 4 offers · 5 countries' },
  { name: 'Photo Filters Daily',      serviceId: 'SRV-26104', category: 'Photo & Video',    client: 'BrightStar Apps',       status: 'online',  dateCreated: 'Jan 14, 2026', sub: 'BrightStar Apps · 2 offers · 4 countries',       warning: '1 CAP missing for BH' },
  { name: 'Religious Reminders',      serviceId: 'SRV-26117', category: 'Lifestyle',        client: 'Telco Direct',          status: 'online',  dateCreated: 'Feb 02, 2026', sub: 'Telco Direct · 1 offer · 6 countries' },
  { name: 'Fashion Tips Weekly',      serviceId: 'SRV-26129', category: 'Lifestyle',        client: 'Pulse Studios',         status: 'draft',   dateCreated: 'Mar 11, 2026', sub: 'Pulse Studios · 3 offers · 4 countries' },
  { name: 'Travel Deals Pro',         serviceId: 'SRV-26142', category: 'Travel',           client: 'GlobalPay Ltd',         status: 'offline', dateCreated: 'Apr 27, 2026', sub: 'GlobalPay Ltd · 4 offers · 7 countries',         warning: 'Multiple issues — needs attention' },
];

// =============================================================================
// Procedural padding — ~500 deterministically-generated services so the grid
// has enough data to make the infinite-scroll illusion convincing on any screen.
// =============================================================================
function buildGenerated(count: number): Service[] {
  const TOPICS    = ['News','Quiz','Sports','Music','Astro','Gaming','Fitness','Cooking','Travel','Photo','Learning','Stories','Comedy','Health','Finance','Weather','Religion','Kids','Tech','Movies','Recipes','Trivia','Yoga','Crypto','Esports','Fashion','Wellness','Studio','Beats','Mindful'];
  const SUFFIXES  = ['Pro','Plus','Premium','Hub','Live','Daily','Weekly','Monthly','Today','Insights','Tracker','Stream','Vault','Connect','Edge','Boost','Zone','Lab','Now','One'];
  const CLIENTS   = ['Hexum Client','Edie Games Co','SoundWave Media','BrightStar Apps','Pulse Studios','Apex Digital','MediaCo','GlobalPay Ltd','Northern Lights','Telco Direct','Skyline Mobile','Astra Group','PrimeCast','Velvet Studio','Atlas Mobile','Carbon Studio','Coral Media','Nimbus Apps'];
  const CATEGORIES= ['Entertainment','Utilities','Tools','Gaming','Music','Trivia','Lifestyle','Health & Fitness','Food & Drink','Sports','Kids','Education','Finance','Weather','Photo & Video','Travel'];
  // Weighted: ~70% online, ~10% offline, ~20% draft
  const STATUSES: ServiceStatus[] = ['online','online','online','online','online','online','online','offline','draft','draft'];
  const MONTHS    = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

  // Deterministic LCG so refreshes produce the same dataset
  let seed = 4242;
  const nextInt = (max: number) => { seed = (seed * 9301 + 49297) % 233280; return Math.floor((seed / 233280) * max); };

  const generated: Service[] = [];
  let nextId = 26200;
  for (let i = 0; i < count; i++) {
    const topic     = TOPICS[nextInt(TOPICS.length)];
    const suffix    = SUFFIXES[nextInt(SUFFIXES.length)];
    const client    = CLIENTS[nextInt(CLIENTS.length)];
    const category  = CATEGORIES[nextInt(CATEGORIES.length)];
    const status    = STATUSES[nextInt(STATUSES.length)];
    const month     = MONTHS[nextInt(12)];
    const day       = String(1 + nextInt(28)).padStart(2, '0');
    const year      = 2025 + nextInt(2);
    const offers    = 1 + nextInt(7);
    const countries = 1 + nextInt(8);
    nextId++;
    generated.push({
      name:        `${topic} ${suffix}`,
      serviceId:   `SRV-${nextId}`,
      category,
      client,
      status,
      dateCreated: `${month} ${day}, ${year}`,
      sub:         `${client} · ${offers} ${offers === 1 ? 'offer' : 'offers'} · ${countries} ${countries === 1 ? 'country' : 'countries'}`,
    });
  }
  return generated;
}

export const SERVICES: Service[] = [...SEED, ...buildGenerated(500)];

// =============================================================================
// Filter matchers — single source of truth for chip semantics
// =============================================================================
export type FilterKey = 'all' | 'online' | 'offline' | 'draft';

export const FILTER_MATCHERS: Record<FilterKey, (s: Service) => boolean> = {
  all:     () => true,
  online:  (s) => s.status === 'online',
  offline: (s) => s.status === 'offline',
  draft:   (s) => s.status === 'draft',
};

/** Free-text search across the most useful fields. Case-insensitive, tokenized. */
export function matchesQuery(service: Service, query: string): boolean {
  if (!query) return true;
  const hay = [service.name, service.client, service.category, service.status, service.serviceId, service.sub].join(' ').toLowerCase();
  return query.toLowerCase().split(/\s+/).filter(Boolean).every((tok) => hay.includes(tok));
}
