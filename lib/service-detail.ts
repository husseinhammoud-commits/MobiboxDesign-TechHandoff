/**
 * Mock data + derivation helpers for the Service-detail drawer.
 *
 * The drawer's Overview / Offers / Activity tabs need data we don't yet
 * fetch from a backend. These helpers produce deterministic mock content
 * from a Service so the prototype feels alive — same input → same output,
 * no flicker on refresh.
 *
 * Replace each helper with a real fetch (RSC, react-query, server action)
 * once the backend is wired. The drawer doesn't care where data comes from.
 */

import type { Service } from './mock-services';

// =============================================================================
// Deterministic helpers
// =============================================================================
function hash(str: string): number {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) | 0;
  return Math.abs(h);
}

function parseCountAfter(sub: string | undefined, key: string): number {
  if (!sub) return 0;
  const m = sub.match(new RegExp(`(\\d+)\\s+${key}`, 'i'));
  return m ? parseInt(m[1], 10) : 0;
}

// =============================================================================
// KPIs — Avg payout / Top GEO / Top operator / Conversions
// =============================================================================
export interface ServiceKPIs {
  avgPayout:    string;
  weekDelta:    string;
  weekDeltaTone:'positive' | 'negative' | 'neutral';
  topMarket:    string;
  conversions:  string;
}

export function extractServiceKPIs(svc: Service): ServiceKPIs {
  const h = hash(svc.serviceId);
  // Pull anything that looks like "$X.YY" out of the service's sub for a real-ish payout
  const moneyMatch = svc.sub.match(/\$(\d+\.\d{1,2})/);
  const avgPayout  = moneyMatch ? `$${moneyMatch[1]}` : `$${(0.65 + (h % 280) / 100).toFixed(2)}`;
  const isPositive = h % 2 === 0;
  const deltaMag   = (h % 28) + 2;
  const weekDelta  = svc.status === 'draft' ? '—' : `${isPositive ? '+' : '-'}${deltaMag}%`;
  const weekDeltaTone: ServiceKPIs['weekDeltaTone'] =
    svc.status === 'draft' ? 'neutral' : isPositive ? 'positive' : 'negative';
  const conversions = (1200 + (h % 18000)).toLocaleString('en-US');
  const markets     = ['UAE', 'KSA', 'EG', 'KW', 'BH', 'QA'];
  const topMarket   = markets[h % markets.length];
  return { avgPayout, weekDelta, weekDeltaTone, topMarket, conversions };
}

// =============================================================================
// Offers (drawer's "Offers" tab) — a small list of plausible offers
// =============================================================================
export interface ServiceOffer {
  id:        string;
  name:      string;
  price:     string;
  countries: number;
  country:   string;
  operators: number;
  status:    'online' | 'offline' | 'draft';
}

export function mockOffers(svc: Service): ServiceOffer[] {
  const names = [
    'Daily premium pass','Weekly subscription','Monthly bundle','Starter trial',
    'Power pack','Premium access','Pro tier','Standard tier','Free trial','Loyalty offer',
  ];
  const h        = hash(svc.serviceId);
  const count    = parseCountAfter(svc.sub, 'offers') || 2;
  const countryPool = mockCountries(svc);

  return Array.from({ length: count }, (_, i) => {
    const price     = (0.65 + ((h + i * 7) % 280) / 100).toFixed(2);
    const countries = Math.max(1, ((h + i) % 4) + 1);
    const operators = Math.max(1, Math.min(countries, 3));
    const country   = countryPool[i % countryPool.length] || 'AE';
    const status: ServiceOffer['status'] =
      i === 0 ? svc.status :
      svc.status === 'draft' ? 'draft' :
      i % 4 === 0 ? 'draft' : 'online';
    return {
      id:        `${svc.serviceId}-OFR-${i + 1}`,
      name:      names[(h + i) % names.length],
      price:     `$${price}`,
      countries,
      country,
      operators,
      status,
    };
  });
}

// =============================================================================
// Activity (drawer's "Activity" tab) — change log
// =============================================================================
export interface ActivityEntry {
  id:    string;
  who:   string;
  what:  string;
  date:  string;
}

export function mockActivity(svc: Service): ActivityEntry[] {
  const firstOfferName = mockOffers(svc)[0]?.name ?? 'Premium';
  return [
    { id: '4', who: 'Karim N.',   what: 'Adjusted CAPs in UAE',                  date: 'May 12, 2026' },
    { id: '3', who: 'Hussein H.', what: 'Updated default theme',                 date: 'Apr 18, 2026' },
    { id: '2', who: 'Sara Awad',  what: `Added offer "${firstOfferName}"`,       date: 'Mar 04, 2026' },
    { id: '1', who: 'System',     what: 'Service created',                       date: svc.dateCreated },
  ];
}

// =============================================================================
// Configuration (drawer's "Overview" tab) — mirror of wizard values
// =============================================================================
const COUNTRY_POOL = ['UAE', 'KSA', 'EG', 'KW', 'BH', 'OM', 'QA', 'IQ', 'JO', 'LB'];

export function mockCountries(svc: Service): string[] {
  const count = Math.max(1, parseCountAfter(svc.sub, 'countries') || 2);
  return COUNTRY_POOL.slice(0, count);
}

const CATEGORY_TO_VERTICAL: Record<string, string> = {
  'Gaming':           'Mobile gaming',
  'Music':            'Audio streaming',
  'Sports':           'Sports content',
  'Entertainment':    'Video & entertainment',
  'Education':        'EdTech',
  'Health & Fitness': 'Wellness',
  'Food & Drink':     'Food & recipes',
  'Travel':           'Travel',
  'Trivia':           'Casual content',
  'Lifestyle':        'Lifestyle',
  'Finance':          'FinTech',
  'Weather':          'Utilities',
  'Photo & Video':    'Photo & video',
  'Kids':             'Kids & family',
  'Utilities':        'Utilities',
  'Tools':            'Productivity',
  'Other':            'Other',
};

export function deriveVertical(category: string): string {
  return CATEGORY_TO_VERTICAL[category] ?? category;
}
