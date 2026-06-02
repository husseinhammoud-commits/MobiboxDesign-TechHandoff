(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/tech-handoff/lib/service-detail.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

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
 */ __turbopack_context__.s([
    "deriveVertical",
    ()=>deriveVertical,
    "extractServiceKPIs",
    ()=>extractServiceKPIs,
    "mockActivity",
    ()=>mockActivity,
    "mockCountries",
    ()=>mockCountries,
    "mockOffers",
    ()=>mockOffers
]);
// =============================================================================
// Deterministic helpers
// =============================================================================
function hash(str) {
    let h = 0;
    for(let i = 0; i < str.length; i++)h = h * 31 + str.charCodeAt(i) | 0;
    return Math.abs(h);
}
function parseCountAfter(sub, key) {
    if (!sub) return 0;
    const m = sub.match(new RegExp(`(\\d+)\\s+${key}`, 'i'));
    return m ? parseInt(m[1], 10) : 0;
}
function extractServiceKPIs(svc) {
    const h = hash(svc.serviceId);
    // Pull anything that looks like "$X.YY" out of the service's sub for a real-ish payout
    const moneyMatch = svc.sub.match(/\$(\d+\.\d{1,2})/);
    const avgPayout = moneyMatch ? `$${moneyMatch[1]}` : `$${(0.65 + h % 280 / 100).toFixed(2)}`;
    const isPositive = h % 2 === 0;
    const deltaMag = h % 28 + 2;
    const weekDelta = svc.status === 'draft' ? '—' : `${isPositive ? '+' : '-'}${deltaMag}%`;
    const weekDeltaTone = svc.status === 'draft' ? 'neutral' : isPositive ? 'positive' : 'negative';
    const conversions = (1200 + h % 18000).toLocaleString('en-US');
    const markets = [
        'UAE',
        'KSA',
        'EG',
        'KW',
        'BH',
        'QA'
    ];
    const topMarket = markets[h % markets.length];
    return {
        avgPayout,
        weekDelta,
        weekDeltaTone,
        topMarket,
        conversions
    };
}
function mockOffers(svc) {
    const names = [
        'Daily premium pass',
        'Weekly subscription',
        'Monthly bundle',
        'Starter trial',
        'Power pack',
        'Premium access',
        'Pro tier',
        'Standard tier',
        'Free trial',
        'Loyalty offer'
    ];
    const h = hash(svc.serviceId);
    const count = parseCountAfter(svc.sub, 'offers') || 2;
    const countryPool = mockCountries(svc);
    return Array.from({
        length: count
    }, (_, i)=>{
        const price = (0.65 + (h + i * 7) % 280 / 100).toFixed(2);
        const countries = Math.max(1, (h + i) % 4 + 1);
        const operators = Math.max(1, Math.min(countries, 3));
        const country = countryPool[i % countryPool.length] || 'AE';
        const status = i === 0 ? svc.status : svc.status === 'draft' ? 'draft' : i % 4 === 0 ? 'draft' : 'online';
        return {
            id: `${svc.serviceId}-OFR-${i + 1}`,
            name: names[(h + i) % names.length],
            price: `$${price}`,
            countries,
            country,
            operators,
            status
        };
    });
}
function mockActivity(svc) {
    const firstOfferName = mockOffers(svc)[0]?.name ?? 'Premium';
    return [
        {
            id: '4',
            who: 'Karim N.',
            what: 'Adjusted CAPs in UAE',
            date: 'May 12, 2026'
        },
        {
            id: '3',
            who: 'Hussein H.',
            what: 'Updated default theme',
            date: 'Apr 18, 2026'
        },
        {
            id: '2',
            who: 'Sara Awad',
            what: `Added offer "${firstOfferName}"`,
            date: 'Mar 04, 2026'
        },
        {
            id: '1',
            who: 'System',
            what: 'Service created',
            date: svc.dateCreated
        }
    ];
}
// =============================================================================
// Configuration (drawer's "Overview" tab) — mirror of wizard values
// =============================================================================
const COUNTRY_POOL = [
    'UAE',
    'KSA',
    'EG',
    'KW',
    'BH',
    'OM',
    'QA',
    'IQ',
    'JO',
    'LB'
];
function mockCountries(svc) {
    const count = Math.max(1, parseCountAfter(svc.sub, 'countries') || 2);
    return COUNTRY_POOL.slice(0, count);
}
const CATEGORY_TO_VERTICAL = {
    'Gaming': 'Mobile gaming',
    'Music': 'Audio streaming',
    'Sports': 'Sports content',
    'Entertainment': 'Video & entertainment',
    'Education': 'EdTech',
    'Health & Fitness': 'Wellness',
    'Food & Drink': 'Food & recipes',
    'Travel': 'Travel',
    'Trivia': 'Casual content',
    'Lifestyle': 'Lifestyle',
    'Finance': 'FinTech',
    'Weather': 'Utilities',
    'Photo & Video': 'Photo & video',
    'Kids': 'Kids & family',
    'Utilities': 'Utilities',
    'Tools': 'Productivity',
    'Other': 'Other'
};
function deriveVertical(category) {
    return CATEGORY_TO_VERTICAL[category] ?? category;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/tech-handoff/lib/mock-services.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

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
 */ __turbopack_context__.s([
    "FILTER_MATCHERS",
    ()=>FILTER_MATCHERS,
    "SERVICES",
    ()=>SERVICES,
    "matchesQuery",
    ()=>matchesQuery
]);
// =============================================================================
// 24 hand-crafted seed services — port from the HTML prototype
// =============================================================================
const SEED = [
    {
        name: '25/3 ClientMain',
        serviceId: 'SRV-25103',
        category: 'Entertainment',
        client: 'Hexum Client',
        status: 'online',
        dateCreated: 'Mar 18, 2025',
        sub: 'Hexum Client · 3 offers · 5 countries',
        warning: '1 CAP missing for UAE'
    },
    {
        name: 'NEW Stack Service',
        serviceId: 'SRV-25118',
        category: 'Utilities',
        client: 'No client assigned',
        status: 'online',
        dateCreated: 'Apr 02, 2025',
        sub: 'No client · 3 offers · 3 countries'
    },
    {
        name: 'Automated Service 1',
        serviceId: 'SRV-25127',
        category: 'Tools',
        client: 'No client assigned',
        status: 'draft',
        dateCreated: 'Apr 11, 2025',
        sub: 'No client · 4 offers · 2 countries',
        warning: '2 issues need review'
    },
    {
        name: 'Test Service',
        serviceId: 'SRV-25134',
        category: 'Other',
        client: 'No client assigned',
        status: 'online',
        dateCreated: 'Apr 22, 2025',
        sub: 'No client · 1 offer · 1 country',
        warning: '1 CAP missing for KW'
    },
    {
        name: 'Premium Gaming Service',
        serviceId: 'SRV-25149',
        category: 'Gaming',
        client: 'Edie Games Co',
        status: 'online',
        dateCreated: 'May 05, 2025',
        sub: 'Edie Games Co · 6 offers · 8 countries'
    },
    {
        name: 'Music Streaming Bundle',
        serviceId: 'SRV-25156',
        category: 'Music',
        client: 'SoundWave Media',
        status: 'online',
        dateCreated: 'May 19, 2025',
        sub: 'SoundWave Media · 5 offers · 4 countries'
    },
    {
        name: 'Daily Quiz Master',
        serviceId: 'SRV-25168',
        category: 'Trivia',
        client: 'BrightStar Apps',
        status: 'online',
        dateCreated: 'Jun 04, 2025',
        sub: 'BrightStar Apps · 2 offers · 6 countries'
    },
    {
        name: 'Astro Daily Premium',
        serviceId: 'SRV-25174',
        category: 'Lifestyle',
        client: 'Pulse Studios',
        status: 'online',
        dateCreated: 'Jun 21, 2025',
        sub: 'Pulse Studios · 4 offers · 3 countries',
        warning: 'CAPs near limit in 2 countries'
    },
    {
        name: 'Fitness Routines',
        serviceId: 'SRV-25189',
        category: 'Health & Fitness',
        client: 'Apex Digital',
        status: 'draft',
        dateCreated: 'Jul 08, 2025',
        sub: 'Apex Digital · 3 offers · 4 countries'
    },
    {
        name: 'Cooking Recipes Plus',
        serviceId: 'SRV-25197',
        category: 'Food & Drink',
        client: 'MediaCo',
        status: 'online',
        dateCreated: 'Jul 24, 2025',
        sub: 'MediaCo · 2 offers · 5 countries'
    },
    {
        name: 'Sports Highlights HD',
        serviceId: 'SRV-25208',
        category: 'Sports',
        client: 'GlobalPay Ltd',
        status: 'online',
        dateCreated: 'Aug 11, 2025',
        sub: 'GlobalPay Ltd · 7 offers · 9 countries'
    },
    {
        name: 'Kids Stories Library',
        serviceId: 'SRV-25216',
        category: 'Kids',
        client: 'Northern Lights',
        status: 'online',
        dateCreated: 'Aug 28, 2025',
        sub: 'Northern Lights · 3 offers · 4 countries'
    },
    {
        name: 'Language Learning Daily',
        serviceId: 'SRV-25224',
        category: 'Education',
        client: 'BrightStar Apps',
        status: 'online',
        dateCreated: 'Sep 10, 2025',
        sub: 'BrightStar Apps · 4 offers · 7 countries'
    },
    {
        name: 'Movie Trailers Pro',
        serviceId: 'SRV-25231',
        category: 'Entertainment',
        client: 'MediaCo',
        status: 'offline',
        dateCreated: 'Sep 24, 2025',
        sub: 'MediaCo · 2 offers · 3 countries',
        warning: 'Approval blocked: 2 issues'
    },
    {
        name: 'Weather Plus Daily',
        serviceId: 'SRV-25245',
        category: 'Weather',
        client: 'Telco Direct',
        status: 'online',
        dateCreated: 'Oct 09, 2025',
        sub: 'Telco Direct · 1 offer · 8 countries'
    },
    {
        name: 'Football Live Updates',
        serviceId: 'SRV-25253',
        category: 'Sports',
        client: 'Edie Games Co',
        status: 'online',
        dateCreated: 'Oct 22, 2025',
        sub: 'Edie Games Co · 5 offers · 6 countries'
    },
    {
        name: 'Crypto Tips Premium',
        serviceId: 'SRV-25264',
        category: 'Finance',
        client: 'Apex Digital',
        status: 'draft',
        dateCreated: 'Nov 06, 2025',
        sub: 'Apex Digital · 2 offers · 2 countries',
        warning: 'Compliance review pending'
    },
    {
        name: 'Trivia Master Daily',
        serviceId: 'SRV-25272',
        category: 'Trivia',
        client: 'Pulse Studios',
        status: 'online',
        dateCreated: 'Nov 18, 2025',
        sub: 'Pulse Studios · 3 offers · 5 countries'
    },
    {
        name: 'Comedy Club Live',
        serviceId: 'SRV-25281',
        category: 'Entertainment',
        client: 'MediaCo',
        status: 'online',
        dateCreated: 'Dec 03, 2025',
        sub: 'MediaCo · 2 offers · 3 countries'
    },
    {
        name: 'Health Coach Pro',
        serviceId: 'SRV-25295',
        category: 'Health & Fitness',
        client: 'Northern Lights',
        status: 'online',
        dateCreated: 'Dec 19, 2025',
        sub: 'Northern Lights · 4 offers · 5 countries'
    },
    {
        name: 'Photo Filters Daily',
        serviceId: 'SRV-26104',
        category: 'Photo & Video',
        client: 'BrightStar Apps',
        status: 'online',
        dateCreated: 'Jan 14, 2026',
        sub: 'BrightStar Apps · 2 offers · 4 countries',
        warning: '1 CAP missing for BH'
    },
    {
        name: 'Religious Reminders',
        serviceId: 'SRV-26117',
        category: 'Lifestyle',
        client: 'Telco Direct',
        status: 'online',
        dateCreated: 'Feb 02, 2026',
        sub: 'Telco Direct · 1 offer · 6 countries'
    },
    {
        name: 'Fashion Tips Weekly',
        serviceId: 'SRV-26129',
        category: 'Lifestyle',
        client: 'Pulse Studios',
        status: 'draft',
        dateCreated: 'Mar 11, 2026',
        sub: 'Pulse Studios · 3 offers · 4 countries'
    },
    {
        name: 'Travel Deals Pro',
        serviceId: 'SRV-26142',
        category: 'Travel',
        client: 'GlobalPay Ltd',
        status: 'offline',
        dateCreated: 'Apr 27, 2026',
        sub: 'GlobalPay Ltd · 4 offers · 7 countries',
        warning: 'Multiple issues — needs attention'
    }
];
// =============================================================================
// Procedural padding — ~500 deterministically-generated services so the grid
// has enough data to make the infinite-scroll illusion convincing on any screen.
// =============================================================================
function buildGenerated(count) {
    const TOPICS = [
        'News',
        'Quiz',
        'Sports',
        'Music',
        'Astro',
        'Gaming',
        'Fitness',
        'Cooking',
        'Travel',
        'Photo',
        'Learning',
        'Stories',
        'Comedy',
        'Health',
        'Finance',
        'Weather',
        'Religion',
        'Kids',
        'Tech',
        'Movies',
        'Recipes',
        'Trivia',
        'Yoga',
        'Crypto',
        'Esports',
        'Fashion',
        'Wellness',
        'Studio',
        'Beats',
        'Mindful'
    ];
    const SUFFIXES = [
        'Pro',
        'Plus',
        'Premium',
        'Hub',
        'Live',
        'Daily',
        'Weekly',
        'Monthly',
        'Today',
        'Insights',
        'Tracker',
        'Stream',
        'Vault',
        'Connect',
        'Edge',
        'Boost',
        'Zone',
        'Lab',
        'Now',
        'One'
    ];
    const CLIENTS = [
        'Hexum Client',
        'Edie Games Co',
        'SoundWave Media',
        'BrightStar Apps',
        'Pulse Studios',
        'Apex Digital',
        'MediaCo',
        'GlobalPay Ltd',
        'Northern Lights',
        'Telco Direct',
        'Skyline Mobile',
        'Astra Group',
        'PrimeCast',
        'Velvet Studio',
        'Atlas Mobile',
        'Carbon Studio',
        'Coral Media',
        'Nimbus Apps'
    ];
    const CATEGORIES = [
        'Entertainment',
        'Utilities',
        'Tools',
        'Gaming',
        'Music',
        'Trivia',
        'Lifestyle',
        'Health & Fitness',
        'Food & Drink',
        'Sports',
        'Kids',
        'Education',
        'Finance',
        'Weather',
        'Photo & Video',
        'Travel'
    ];
    // Weighted: ~70% online, ~10% offline, ~20% draft
    const STATUSES = [
        'online',
        'online',
        'online',
        'online',
        'online',
        'online',
        'online',
        'offline',
        'draft',
        'draft'
    ];
    const MONTHS = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'
    ];
    // Deterministic LCG so refreshes produce the same dataset
    let seed = 4242;
    const nextInt = (max)=>{
        seed = (seed * 9301 + 49297) % 233280;
        return Math.floor(seed / 233280 * max);
    };
    const generated = [];
    let nextId = 26200;
    for(let i = 0; i < count; i++){
        const topic = TOPICS[nextInt(TOPICS.length)];
        const suffix = SUFFIXES[nextInt(SUFFIXES.length)];
        const client = CLIENTS[nextInt(CLIENTS.length)];
        const category = CATEGORIES[nextInt(CATEGORIES.length)];
        const status = STATUSES[nextInt(STATUSES.length)];
        const month = MONTHS[nextInt(12)];
        const day = String(1 + nextInt(28)).padStart(2, '0');
        const year = 2025 + nextInt(2);
        const offers = 1 + nextInt(7);
        const countries = 1 + nextInt(8);
        nextId++;
        generated.push({
            name: `${topic} ${suffix}`,
            serviceId: `SRV-${nextId}`,
            category,
            client,
            status,
            dateCreated: `${month} ${day}, ${year}`,
            sub: `${client} · ${offers} ${offers === 1 ? 'offer' : 'offers'} · ${countries} ${countries === 1 ? 'country' : 'countries'}`
        });
    }
    return generated;
}
const SERVICES = [
    ...SEED,
    ...buildGenerated(500)
];
const FILTER_MATCHERS = {
    all: ()=>true,
    online: (s)=>s.status === 'online',
    offline: (s)=>s.status === 'offline',
    draft: (s)=>s.status === 'draft'
};
function matchesQuery(service, query) {
    if (!query) return true;
    const hay = [
        service.name,
        service.client,
        service.category,
        service.status,
        service.serviceId,
        service.sub
    ].join(' ').toLowerCase();
    return query.toLowerCase().split(/\s+/).filter(Boolean).every((tok)=>hay.includes(tok));
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/tech-handoff/lib/mock-dashboard.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

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
 */ // =============================================================================
// PAYOUTS
// =============================================================================
__turbopack_context__.s([
    "MOCK_CAPS",
    ()=>MOCK_CAPS,
    "MOCK_PAYOUTS",
    ()=>MOCK_PAYOUTS,
    "aggregateMarkets",
    ()=>aggregateMarkets,
    "aggregatePayouts",
    ()=>aggregatePayouts,
    "avgPayout",
    ()=>avgPayout,
    "capHealth",
    ()=>capHealth,
    "capPct",
    ()=>capPct,
    "matchesCapQuery",
    ()=>matchesCapQuery,
    "matchesMarketQuery",
    ()=>matchesMarketQuery,
    "matchesPayoutQuery",
    ()=>matchesPayoutQuery,
    "topAggregated",
    ()=>topAggregated
]);
const MOCK_PAYOUTS = [
    {
        id: '1',
        serviceName: 'Games Portal',
        offer: 'Games Portal - Monthly',
        country: 'UAE',
        operator: 'Etisalat',
        event: 'Subscription',
        payout: 2.50,
        status: 'active'
    },
    {
        id: '2',
        serviceName: 'Games Portal',
        offer: 'Games Portal - Daily',
        country: 'UAE',
        operator: 'du',
        event: 'Subscription',
        payout: 1.20,
        status: 'active'
    },
    {
        id: '3',
        serviceName: 'Video Stream',
        offer: 'Video Stream - Weekly',
        country: 'SA',
        operator: 'STC',
        event: 'Subscription',
        payout: 3.00,
        status: 'active'
    },
    {
        id: '4',
        serviceName: 'Video Stream',
        offer: 'Video Stream - Daily',
        country: 'SA',
        operator: 'Zain',
        event: 'Subscription',
        payout: 1.50,
        status: 'paused'
    },
    {
        id: '5',
        serviceName: 'Music Hub',
        offer: 'Music Hub - Monthly',
        country: 'KW',
        operator: 'Ooredoo',
        event: 'Subscription',
        payout: 2.80,
        status: 'active'
    },
    {
        id: '6',
        serviceName: 'Fitness Pro',
        offer: 'Fitness Pro - One-off',
        country: 'EG',
        operator: 'Vodafone',
        event: 'One-off',
        payout: 0.50,
        status: 'active'
    },
    {
        id: '7',
        serviceName: 'Fitness Pro',
        offer: 'Fitness Pro - Monthly',
        country: 'EG',
        operator: 'Orange',
        event: 'Subscription',
        payout: 0.40,
        status: 'active'
    },
    {
        id: '8',
        serviceName: 'Games Portal',
        offer: 'Games Portal - One-off',
        country: 'QA',
        operator: 'Ooredoo',
        event: 'One-off',
        payout: 4.00,
        status: 'active'
    }
];
function aggregatePayouts(rows, metric) {
    const agg = rows.reduce((acc, r)=>{
        const k = r[metric];
        acc[k] = (acc[k] || 0) + r.payout;
        return acc;
    }, {});
    return Object.entries(agg).map(([name, value])=>({
            name,
            value: +value.toFixed(2)
        })).sort((a, b)=>b.value - a.value);
}
function topAggregated(rows, key) {
    if (rows.length === 0) return '—';
    const agg = rows.reduce((acc, r)=>{
        const k = r[key];
        acc[k] = (acc[k] || 0) + r.payout;
        return acc;
    }, {});
    return Object.entries(agg).sort((a, b)=>b[1] - a[1])[0]?.[0] || '—';
}
function avgPayout(rows) {
    if (rows.length === 0) return '0.00';
    const sum = rows.reduce((s, r)=>s + r.payout, 0);
    return (sum / rows.length).toFixed(2);
}
function matchesPayoutQuery(row, q) {
    if (!q) return true;
    const hay = [
        row.serviceName,
        row.offer,
        row.country,
        row.operator,
        row.event,
        row.status
    ].join(' ').toLowerCase();
    return q.toLowerCase().split(/\s+/).filter(Boolean).every((tok)=>hay.includes(tok));
}
const MOCK_CAPS = [
    {
        service: 'Games Portal',
        offer: 'Daily',
        country: 'UAE',
        operator: 'Etisalat',
        mode: 'Daily',
        limit: 300,
        used: 287
    },
    {
        service: 'Games Portal',
        offer: 'Daily',
        country: 'UAE',
        operator: 'du',
        mode: 'Daily',
        limit: 250,
        used: 182
    },
    {
        service: 'Video Stream',
        offer: 'Weekly',
        country: 'SA',
        operator: 'STC',
        mode: 'Weekly',
        limit: 1200,
        used: 1156
    },
    {
        service: 'Video Stream',
        offer: 'Weekly',
        country: 'SA',
        operator: 'Mobily',
        mode: 'Weekly',
        limit: 800,
        used: 412
    },
    {
        service: 'Video Stream',
        offer: 'Daily',
        country: 'SA',
        operator: 'Zain',
        mode: 'Daily',
        limit: 200,
        used: 200
    },
    {
        service: 'Music Hub',
        offer: 'Monthly',
        country: 'KW',
        operator: 'Ooredoo',
        mode: 'Monthly',
        limit: 5000,
        used: 1840
    },
    {
        service: 'Fitness Pro',
        offer: 'Monthly',
        country: 'EG',
        operator: 'Orange',
        mode: 'Monthly',
        limit: 3000,
        used: 720
    },
    {
        service: 'Fitness Pro',
        offer: 'Monthly',
        country: 'EG',
        operator: 'Vodafone',
        mode: 'Monthly',
        limit: 3000,
        used: 2940
    }
];
function capPct(c) {
    return c.limit > 0 ? Math.min(100, Math.round(c.used / c.limit * 100)) : 0;
}
function capHealth(c) {
    const ratio = c.used / c.limit;
    if (ratio >= 1) return 'exhausted';
    if (ratio >= 0.85) return 'near-limit';
    return 'healthy';
}
function matchesCapQuery(row, q) {
    if (!q) return true;
    const hay = [
        row.service,
        row.offer,
        row.country,
        row.operator,
        row.mode
    ].join(' ').toLowerCase();
    return q.toLowerCase().split(/\s+/).filter(Boolean).every((tok)=>hay.includes(tok));
}
function aggregateMarkets(rows) {
    const agg = new Map();
    for (const r of rows){
        const k = `${r.country}|${r.operator}`;
        const cur = agg.get(k) || {
            country: r.country,
            operator: r.operator,
            total: 0,
            count: 0,
            anyPaused: false
        };
        cur.total += r.payout;
        cur.count += 1;
        if (r.status === 'paused') cur.anyPaused = true;
        agg.set(k, cur);
    }
    const list = [
        ...agg.values()
    ].map((x)=>{
        // Deterministic trend per pair
        let h = 0;
        const key = x.country + x.operator;
        for(let i = 0; i < key.length; i++)h = h * 31 + key.charCodeAt(i) | 0;
        const trendNum = Math.abs(h) % 41 - 20;
        return {
            ...x,
            avg: x.total / x.count,
            conversions: x.count,
            trend: `${trendNum >= 0 ? '+' : ''}${trendNum}%`,
            trendUp: trendNum > 0
        };
    });
    list.sort((a, b)=>b.total - a.total);
    return list;
}
function matchesMarketQuery(row, q) {
    if (!q) return true;
    const hay = [
        row.country,
        row.operator
    ].join(' ').toLowerCase();
    return q.toLowerCase().split(/\s+/).filter(Boolean).every((tok)=>hay.includes(tok));
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/tech-handoff/hooks/useInfiniteScroll.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useInfiniteScroll",
    ()=>useInfiniteScroll
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$tech$2d$handoff$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/tech-handoff/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
/**
 * useInfiniteScroll — paginated rendering with cascade-load behavior.
 *
 * The grid renders `batchSize` items at a time. When the user scrolls the
 * sentinel into view, the next batch loads after `loadDelayMs` (so the
 * skeleton has time to animate). On tall displays where the initial batch
 * fits in the viewport without overflow, the hook cascade-loads further
 * batches until the page is tall enough to require scrolling — this avoids
 * the "stuck at 18 cards" issue that vanilla IntersectionObserver produces
 * on wide monitors.
 *
 * Returns:
 *   visibleItems  — the currently-rendered slice of the source array
 *   sentinelRef   — attach to a sentinel element placed AFTER the grid
 *   isLoading     — true while a batch is animating in (drive skeletons)
 *   reachedEnd    — true once all items are visible
 *
 * Usage:
 *   const { visibleItems, sentinelRef, isLoading, reachedEnd } = useInfiniteScroll(allServices);
 *   return (
 *     <>
 *       <div className="grid">{visibleItems.map(renderCard)}</div>
 *       {isLoading && <Skeletons count={9} />}
 *       <div ref={sentinelRef} />
 *       {reachedEnd && <EndOfList />}
 *     </>
 *   );
 */ 'use client';
;
function useInfiniteScroll(allItems, options = {}) {
    _s();
    const { batchSize = 9, loadDelayMs = 600, rootMargin = 300 } = options;
    const [visibleCount, setVisibleCount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$tech$2d$handoff$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(Math.min(batchSize, allItems.length));
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$tech$2d$handoff$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const sentinelRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$tech$2d$handoff$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const isLoadingRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$tech$2d$handoff$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    const loadNext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$tech$2d$handoff$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useInfiniteScroll.useCallback[loadNext]": ()=>{
            if (isLoadingRef.current) return;
            if (visibleCount >= allItems.length) return;
            isLoadingRef.current = true;
            setIsLoading(true);
            window.setTimeout({
                "useInfiniteScroll.useCallback[loadNext]": ()=>{
                    setVisibleCount({
                        "useInfiniteScroll.useCallback[loadNext]": (prev)=>{
                            const next = Math.min(prev + batchSize, allItems.length);
                            return next;
                        }
                    }["useInfiniteScroll.useCallback[loadNext]"]);
                    isLoadingRef.current = false;
                    setIsLoading(false);
                }
            }["useInfiniteScroll.useCallback[loadNext]"], loadDelayMs);
        }
    }["useInfiniteScroll.useCallback[loadNext]"], [
        allItems.length,
        batchSize,
        loadDelayMs,
        visibleCount
    ]);
    // IntersectionObserver — drives loading when the user scrolls
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$tech$2d$handoff$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useInfiniteScroll.useEffect": ()=>{
            const sentinel = sentinelRef.current;
            if (!sentinel) return;
            if (visibleCount >= allItems.length) return;
            const observer = new IntersectionObserver({
                "useInfiniteScroll.useEffect": (entries)=>{
                    for (const entry of entries){
                        if (entry.isIntersecting) loadNext();
                    }
                }
            }["useInfiniteScroll.useEffect"], {
                rootMargin: `${rootMargin}px`
            });
            observer.observe(sentinel);
            return ({
                "useInfiniteScroll.useEffect": ()=>observer.disconnect()
            })["useInfiniteScroll.useEffect"];
        }
    }["useInfiniteScroll.useEffect"], [
        allItems.length,
        loadNext,
        rootMargin,
        visibleCount
    ]);
    // Cascade-load — after each batch, if the sentinel is still within range
    // (i.e., the page isn't tall enough to require scrolling), trigger the next batch.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$tech$2d$handoff$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useInfiniteScroll.useEffect": ()=>{
            if (isLoadingRef.current) return;
            if (visibleCount >= allItems.length) return;
            const sentinel = sentinelRef.current;
            if (!sentinel) return;
            // Defer one frame so the just-added cards have laid out
            const id = requestAnimationFrame({
                "useInfiniteScroll.useEffect.id": ()=>{
                    const top = sentinel.getBoundingClientRect().top;
                    if (top < window.innerHeight + rootMargin) loadNext();
                }
            }["useInfiniteScroll.useEffect.id"]);
            return ({
                "useInfiniteScroll.useEffect": ()=>cancelAnimationFrame(id)
            })["useInfiniteScroll.useEffect"];
        }
    }["useInfiniteScroll.useEffect"], [
        visibleCount,
        allItems.length,
        loadNext,
        rootMargin
    ]);
    // Reset when the source array changes (e.g., filter applied)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$tech$2d$handoff$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useInfiniteScroll.useEffect": ()=>{
            setVisibleCount(Math.min(batchSize, allItems.length));
            isLoadingRef.current = false;
            setIsLoading(false);
        }
    }["useInfiniteScroll.useEffect"], [
        allItems,
        batchSize
    ]);
    return {
        visibleItems: allItems.slice(0, visibleCount),
        sentinelRef,
        isLoading,
        reachedEnd: visibleCount >= allItems.length,
        loadedCount: visibleCount,
        totalCount: allItems.length
    };
}
_s(useInfiniteScroll, "pDvg0sHt1h0pZ7XGHnqrVSuh1u0=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/tech-handoff/app/(shell)/services/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ServicesPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$tech$2d$handoff$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/tech-handoff/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$tech$2d$handoff$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/tech-handoff/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$tech$2d$handoff$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/tech-handoff/node_modules/@mui/material/Box/Box.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$tech$2d$handoff$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__ = __turbopack_context__.i("[project]/tech-handoff/node_modules/lucide-react/dist/esm/icons/download.js [app-client] (ecmascript) <export default as Download>");
var __TURBOPACK__imported__module__$5b$project$5d2f$tech$2d$handoff$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/tech-handoff/node_modules/lucide-react/dist/esm/icons/plus.js [app-client] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$tech$2d$handoff$2f$components$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/tech-handoff/components/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$tech$2d$handoff$2f$components$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/tech-handoff/components/Button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$tech$2d$handoff$2f$components$2f$PageHeader$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/tech-handoff/components/PageHeader.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$tech$2d$handoff$2f$components$2f$ServiceGrid$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/tech-handoff/components/ServiceGrid.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$tech$2d$handoff$2f$components$2f$ServiceWizardDrawer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/tech-handoff/components/ServiceWizardDrawer.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
/**
 * Services overview — the main page that exercises the most of the design system.
 *
 * Composition pattern:
 *   - Server component for the static shell (header, tabs)
 *   - `<ServiceGrid />` (client) owns the interactive state — filters, search, infinite scroll
 *
 * This file is intentionally small — most of the work happens inside the
 * composite components from `@/tech-handoff/components`.
 */ 'use client';
;
;
;
;
function ServicesPage() {
    _s();
    const [tab, setTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$tech$2d$handoff$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('active');
    const [wizardOpen, setWizardOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$tech$2d$handoff$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tech$2d$handoff$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$tech$2d$handoff$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tech$2d$handoff$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$tech$2d$handoff$2f$components$2f$PageHeader$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PageHeader"], {
                title: "Services",
                middle: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tech$2d$handoff$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ServiceTabs, {
                    value: tab,
                    onChange: setTab
                }, void 0, false, {
                    fileName: "[project]/tech-handoff/app/(shell)/services/page.tsx",
                    lineNumber: 30,
                    columnNumber: 17
                }, this),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tech$2d$handoff$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$tech$2d$handoff$2f$components$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                        variant: "secondary",
                        leftIcon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tech$2d$handoff$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$tech$2d$handoff$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__["Download"], {
                            size: 16
                        }, void 0, false, {
                            fileName: "[project]/tech-handoff/app/(shell)/services/page.tsx",
                            lineNumber: 32,
                            columnNumber: 47
                        }, this),
                        children: "Export"
                    }, void 0, false, {
                        fileName: "[project]/tech-handoff/app/(shell)/services/page.tsx",
                        lineNumber: 32,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tech$2d$handoff$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$tech$2d$handoff$2f$components$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                        variant: "primary",
                        leftIcon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tech$2d$handoff$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$tech$2d$handoff$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                            size: 16
                        }, void 0, false, {
                            fileName: "[project]/tech-handoff/app/(shell)/services/page.tsx",
                            lineNumber: 33,
                            columnNumber: 47
                        }, this),
                        onClick: ()=>setWizardOpen(true),
                        children: "Create service"
                    }, void 0, false, {
                        fileName: "[project]/tech-handoff/app/(shell)/services/page.tsx",
                        lineNumber: 33,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/tech-handoff/app/(shell)/services/page.tsx",
                lineNumber: 28,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tech$2d$handoff$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$tech$2d$handoff$2f$components$2f$ServiceGrid$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ServiceGrid"], {
                tab: tab
            }, void 0, false, {
                fileName: "[project]/tech-handoff/app/(shell)/services/page.tsx",
                lineNumber: 38,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tech$2d$handoff$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$tech$2d$handoff$2f$components$2f$ServiceWizardDrawer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ServiceWizardDrawer"], {
                open: wizardOpen,
                onClose: ()=>setWizardOpen(false)
            }, void 0, false, {
                fileName: "[project]/tech-handoff/app/(shell)/services/page.tsx",
                lineNumber: 40,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
_s(ServicesPage, "G1W12syfmU74/ylQbrG2IaFslfo=");
_c = ServicesPage;
// ----- internal: tab nav rendered inside the page header -----
function ServiceTabs({ value, onChange }) {
    const tabs = [
        {
            key: 'active',
            label: 'Active'
        },
        {
            key: 'archived',
            label: 'Archived'
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tech$2d$handoff$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$tech$2d$handoff$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        component: "nav",
        sx: {
            display: 'flex',
            alignItems: 'center',
            fontSize: 13.5
        },
        children: tabs.map((t)=>{
            const active = value === t.key;
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tech$2d$handoff$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$tech$2d$handoff$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                component: "button",
                type: "button",
                onClick: ()=>onChange(t.key),
                sx: {
                    all: 'unset',
                    cursor: 'pointer',
                    px: 1.5,
                    py: 0.75,
                    borderRadius: 1,
                    color: active ? 'text.primary' : 'text.secondary',
                    fontWeight: active ? 500 : 400,
                    backgroundColor: active ? 'surface.subtle' : 'transparent',
                    transition: 'background-color .12s, color .12s',
                    '&:hover': {
                        color: 'text.primary'
                    }
                },
                children: t.label
            }, t.key, false, {
                fileName: "[project]/tech-handoff/app/(shell)/services/page.tsx",
                lineNumber: 57,
                columnNumber: 11
            }, this);
        })
    }, void 0, false, {
        fileName: "[project]/tech-handoff/app/(shell)/services/page.tsx",
        lineNumber: 53,
        columnNumber: 5
    }, this);
}
_c1 = ServiceTabs;
var _c, _c1;
__turbopack_context__.k.register(_c, "ServicesPage");
__turbopack_context__.k.register(_c1, "ServiceTabs");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=tech-handoff_033vt-2._.js.map