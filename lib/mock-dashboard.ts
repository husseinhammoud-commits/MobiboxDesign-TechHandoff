/**
 * Mock data + helpers for the Dashboard page.
 *
 * Three datasets:
 *   - MOCK_PAYOUTS — drives the Payouts section (chart + table)
 *   - MOCK_CAPS    — drives the CAPs section (progress bars + alerts)
 *   - Country×Operator aggregation — derived from MOCK_PAYOUTS at render time
 *
 * Replace with real fetches once the backend is wired. Components read from
 * typed interfaces; they don't care where the data comes from.
 */

// =============================================================================
// PAYOUTS
// =============================================================================
export interface PayoutRecord {
  id:          string;
  serviceName: string;
  offer:       string;
  country:     string;
  operator:    string;
  event:       'Subscription' | 'One-off' | string;
  payout:      number;
  status:      'active' | 'paused';
}

export const MOCK_PAYOUTS: PayoutRecord[] = [
  { id: '1', serviceName: 'Games Portal', offer: 'Games Portal - Monthly', country: 'UAE', operator: 'Etisalat', event: 'Subscription', payout: 2.50, status: 'active' },
  { id: '2', serviceName: 'Games Portal', offer: 'Games Portal - Daily',   country: 'UAE', operator: 'du',       event: 'Subscription', payout: 1.20, status: 'active' },
  { id: '3', serviceName: 'Video Stream', offer: 'Video Stream - Weekly',  country: 'SA',  operator: 'STC',      event: 'Subscription', payout: 3.00, status: 'active' },
  { id: '4', serviceName: 'Video Stream', offer: 'Video Stream - Daily',   country: 'SA',  operator: 'Zain',     event: 'Subscription', payout: 1.50, status: 'paused' },
  { id: '5', serviceName: 'Music Hub',    offer: 'Music Hub - Monthly',    country: 'KW',  operator: 'Ooredoo',  event: 'Subscription', payout: 2.80, status: 'active' },
  { id: '6', serviceName: 'Fitness Pro',  offer: 'Fitness Pro - One-off',  country: 'EG',  operator: 'Vodafone', event: 'One-off',      payout: 0.50, status: 'active' },
  { id: '7', serviceName: 'Fitness Pro',  offer: 'Fitness Pro - Monthly',  country: 'EG',  operator: 'Orange',   event: 'Subscription', payout: 0.40, status: 'active' },
  { id: '8', serviceName: 'Games Portal', offer: 'Games Portal - One-off', country: 'QA',  operator: 'Ooredoo',  event: 'One-off',      payout: 4.00, status: 'active' },
];

export type ChartMetric = 'country' | 'operator' | 'serviceName';

export function aggregatePayouts(rows: PayoutRecord[], metric: ChartMetric): { name: string; value: number }[] {
  const agg = rows.reduce<Record<string, number>>((acc, r) => {
    const k = r[metric];
    acc[k] = (acc[k] || 0) + r.payout;
    return acc;
  }, {});
  return Object.entries(agg)
    .map(([name, value]) => ({ name, value: +value.toFixed(2) }))
    .sort((a, b) => b.value - a.value);
}

export function topAggregated(rows: PayoutRecord[], key: keyof PayoutRecord): string {
  if (rows.length === 0) return '—';
  const agg = rows.reduce<Record<string, number>>((acc, r) => {
    const k = r[key] as string;
    acc[k] = (acc[k] || 0) + r.payout;
    return acc;
  }, {});
  return Object.entries(agg).sort((a, b) => b[1] - a[1])[0]?.[0] || '—';
}

export function avgPayout(rows: PayoutRecord[]): string {
  if (rows.length === 0) return '0.00';
  const sum = rows.reduce((s, r) => s + r.payout, 0);
  return (sum / rows.length).toFixed(2);
}

export function matchesPayoutQuery(row: PayoutRecord, q: string): boolean {
  if (!q) return true;
  const hay = [row.serviceName, row.offer, row.country, row.operator, row.event, row.status].join(' ').toLowerCase();
  return q.toLowerCase().split(/\s+/).filter(Boolean).every((tok) => hay.includes(tok));
}

// =============================================================================
// CAPS
// =============================================================================
export interface CapRecord {
  service:  string;
  offer:    string;
  country:  string;
  operator: string;
  mode:     'Daily' | 'Weekly' | 'Monthly' | string;
  used:     number;
  limit:    number;
}

export const MOCK_CAPS: CapRecord[] = [
  { service: 'Games Portal',  offer: 'Daily',   country: 'UAE', operator: 'Etisalat', mode: 'Daily',   limit: 300,  used: 287  },
  { service: 'Games Portal',  offer: 'Daily',   country: 'UAE', operator: 'du',       mode: 'Daily',   limit: 250,  used: 182  },
  { service: 'Video Stream',  offer: 'Weekly',  country: 'SA',  operator: 'STC',      mode: 'Weekly',  limit: 1200, used: 1156 },
  { service: 'Video Stream',  offer: 'Weekly',  country: 'SA',  operator: 'Mobily',   mode: 'Weekly',  limit: 800,  used: 412  },
  { service: 'Video Stream',  offer: 'Daily',   country: 'SA',  operator: 'Zain',     mode: 'Daily',   limit: 200,  used: 200  },
  { service: 'Music Hub',     offer: 'Monthly', country: 'KW',  operator: 'Ooredoo',  mode: 'Monthly', limit: 5000, used: 1840 },
  { service: 'Fitness Pro',   offer: 'Monthly', country: 'EG',  operator: 'Orange',   mode: 'Monthly', limit: 3000, used: 720  },
  { service: 'Fitness Pro',   offer: 'Monthly', country: 'EG',  operator: 'Vodafone', mode: 'Monthly', limit: 3000, used: 2940 },
];

export function capPct(c: CapRecord): number {
  return c.limit > 0 ? Math.min(100, Math.round((c.used / c.limit) * 100)) : 0;
}

export function capHealth(c: CapRecord): 'healthy' | 'near-limit' | 'exhausted' {
  const ratio = c.used / c.limit;
  if (ratio >= 1)    return 'exhausted';
  if (ratio >= 0.85) return 'near-limit';
  return 'healthy';
}

export function matchesCapQuery(row: CapRecord, q: string): boolean {
  if (!q) return true;
  const hay = [row.service, row.offer, row.country, row.operator, row.mode].join(' ').toLowerCase();
  return q.toLowerCase().split(/\s+/).filter(Boolean).every((tok) => hay.includes(tok));
}

// =============================================================================
// COUNTRY × OPERATOR AGGREGATION
// =============================================================================
export interface MarketRow {
  country:    string;
  operator:   string;
  conversions:number;
  avg:        number;
  total:      number;
  anyPaused:  boolean;
  /** Deterministic mock trend; -20% .. +20% */
  trend:      string;
  trendUp:    boolean;
}

export function aggregateMarkets(rows: PayoutRecord[]): MarketRow[] {
  const agg = new Map<string, { country: string; operator: string; total: number; count: number; anyPaused: boolean }>();
  for (const r of rows) {
    const k = `${r.country}|${r.operator}`;
    const cur = agg.get(k) || { country: r.country, operator: r.operator, total: 0, count: 0, anyPaused: false };
    cur.total += r.payout;
    cur.count += 1;
    if (r.status === 'paused') cur.anyPaused = true;
    agg.set(k, cur);
  }
  const list = [...agg.values()].map((x) => {
    // Deterministic trend per pair
    let h = 0;
    const key = x.country + x.operator;
    for (let i = 0; i < key.length; i++) h = (h * 31 + key.charCodeAt(i)) | 0;
    const trendNum = (Math.abs(h) % 41) - 20;
    return {
      ...x,
      avg:         x.total / x.count,
      conversions: x.count,
      trend:       `${trendNum >= 0 ? '+' : ''}${trendNum}%`,
      trendUp:     trendNum > 0,
    };
  });
  list.sort((a, b) => b.total - a.total);
  return list;
}

export function matchesMarketQuery(row: MarketRow, q: string): boolean {
  if (!q) return true;
  const hay = [row.country, row.operator].join(' ').toLowerCase();
  return q.toLowerCase().split(/\s+/).filter(Boolean).every((tok) => hay.includes(tok));
}
