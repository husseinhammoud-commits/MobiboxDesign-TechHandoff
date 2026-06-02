'use client';

import { useState } from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';
import {
  MoreHorizontal, Tag, Plus, Paintbrush,
  ChevronDown, Globe, Server, Info, Calendar, X, Trash2,
  DollarSign, TrendingUp,
} from 'lucide-react';

import { Card, Button, Input, Select, Switch, Menu, useMenu, IconButton } from '../';

// ─── Country / operator reference data ───────────────────────────────────────

const COUNTRY_OPERATORS: Record<string, string[]> = {
  'United Arab Emirates': ['du', 'Etisalat'],
  'Saudi Arabia':         ['STC', 'Mobily'],
  'UAE':                  ['du', 'Etisalat'],
  'KSA':                  ['STC', 'Mobily'],
};

const COUNTRY_CODE_MAP: Record<string, string> = {
  'United Arab Emirates': 'AE', 'UAE': 'AE',
  'Saudi Arabia': 'SA',         'KSA': 'SA',
};

const COUNTRY_FLAG_MAP: Record<string, string> = {
  'United Arab Emirates': '🇦🇪', 'UAE': '🇦🇪',
  'Saudi Arabia': '🇸🇦',         'KSA': '🇸🇦',
};

const CAP_MODE_OPTIONS      = ['Daily', 'Weekly', 'Monthly', 'Total'];
const TYPE_OPTIONS          = ['Subscription', 'One-off', 'CPA', 'CPA-Sub'];
const FIREWALL_OPTIONS      = ['Tier 1', 'Tier 2', 'No firewall'];
const BILLING_CYCLE_OPTIONS = ['Daily', 'Weekly', 'Monthly', 'Annual'];
const HE_PIN_OPTIONS        = ['HE (Header Enrichment)', 'PIN', 'Both'];

// ─── Types ────────────────────────────────────────────────────────────────────

export interface OperatorConversionData {
  name:      string;
  capMode:   string;
  capAmount: string;
  subDate:   string;
  online:    boolean;
}

export interface OfferCountryData {
  countryName: string;
  countryCode: string;
  flag:        string;
  operatorCap: boolean;
  capMode:     string;
  capAmount:   string;
  subDate:     string;
  event:       string;
  payout:      string;
  themed:      boolean;
  operators:   OperatorConversionData[];
}

export interface OfferDraft {
  id:           string;
  name:         string;
  type:         string;
  firewall:     string;
  online:       boolean;
  themed:       boolean;
  billingCycle: string;
  heOrPin:      string;
  countries:    OfferCountryData[];
}

export interface Step3OffersProps {
  countries:     string[];
  heEnabled?:    boolean;
  offers:        OfferDraft[];
  onAddOffer:    (offer: OfferDraft) => void;
  onUpdateOffer: (id: string, patch: Partial<OfferDraft>) => void;
  onRemoveOffer: (id: string) => void;
  onEditTheme:   (id: string) => void;
}

// ─── Helper ───────────────────────────────────────────────────────────────────

function initCountryData(countries: string[]): OfferCountryData[] {
  return countries.map((c) => ({
    countryName: c,
    countryCode: COUNTRY_CODE_MAP[c] ?? c.slice(0, 2).toUpperCase(),
    flag:        COUNTRY_FLAG_MAP[c] ?? '',
    operatorCap: false,
    capMode: '', capAmount: '', subDate: '',
    event: '', payout: '',
    themed: false,
    operators: (COUNTRY_OPERATORS[c] ?? []).map((name) => ({
      name, capMode: '', capAmount: '', subDate: '', online: true,
    })),
  }));
}

// ─── Step3Offers ──────────────────────────────────────────────────────────────

export function Step3Offers({ countries, heEnabled = false, offers, onAddOffer, onUpdateOffer, onRemoveOffer, onEditTheme }: Step3OffersProps) {
  const [creating, setCreating] = useState(offers.length === 0);

  if (creating || offers.length === 0) {
    return (
      <OfferForm
        countries={countries}
        heEnabled={heEnabled}
        onSave={(o) => { onAddOffer(o); setCreating(false); }}
        onCancel={offers.length > 0 ? () => setCreating(false) : undefined}
      />
    );
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 1 }}>
        <Box>
          <Typography component="h2" sx={{ fontSize: 16, fontWeight: 600, color: 'text.primary' }}>Offers</Typography>
          <Typography sx={{ fontSize: 13, color: 'text.secondary', mt: 0.25 }}>
            An offer is what the user subscribes to. Configure pricing and which operators it runs on.
          </Typography>
        </Box>
        <Button variant="secondary" leftIcon={<Plus size={14} />} onClick={() => setCreating(true)}>
          Add offer
        </Button>
      </Box>

      {offers.map((o, i) => (
        <OfferCard
          key={o.id}
          offer={o}
          idx={i + 1}
          onUpdateOffer={(patch) => onUpdateOffer(o.id, patch)}
          onEditTheme={() => onEditTheme(o.id)}
          onRemove={() => onRemoveOffer(o.id)}
        />
      ))}
    </Box>
  );
}

// ─── Shared card shell ────────────────────────────────────────────────────────

const cardShell = {
  backgroundColor: 'surface.main',
  border: (t: any) => `1px solid ${t.palette.border.main}`,
  borderRadius: 3,
  boxShadow: '0 1px 3px rgba(0,0,0,0.07)',
  overflow: 'hidden',
} as const;

const dividerLight = '1px solid #f4f4f5';

// ─── Collapsible card section ─────────────────────────────────────────────────

function CollapsibleCard({ title, subtitle, open, onToggle, children }: {
  title:     string;
  subtitle?: string;
  open:      boolean;
  onToggle:  () => void;
  children:  React.ReactNode;
}) {
  return (
    <Box sx={cardShell}>
      <Box
        component="button"
        type="button"
        onClick={onToggle}
        sx={{
          all: 'unset', cursor: 'pointer',
          width: '100%', boxSizing: 'border-box',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          px: 3, py: 2,
          borderBottom: open ? dividerLight : 'none',
        }}
      >
        <Box>
          <Typography sx={{ fontSize: 14.5, fontWeight: 600, color: 'text.primary' }}>{title}</Typography>
          {subtitle && (
            <Typography sx={{ fontSize: 12.5, color: 'text.secondary', mt: 0.25 }}>{subtitle}</Typography>
          )}
        </Box>
        <Box sx={{
          display: 'flex', alignItems: 'center', color: 'text.secondary',
          transition: 'transform .2s',
          transform: open ? 'rotate(0deg)' : 'rotate(-90deg)',
        }}>
          <ChevronDown size={16} />
        </Box>
      </Box>

      <Collapse in={open}>
        {children}
      </Collapse>
    </Box>
  );
}

// ─── Cap fields ───────────────────────────────────────────────────────────────

function CapFields({ capMode, capAmount, subDate, onCapModeChange, onCapAmountChange }: {
  capMode:           string;
  capAmount:         string;
  subDate:           string;
  onCapModeChange:   (v: string) => void;
  onCapAmountChange: (v: string) => void;
}) {
  return (
    <>
      <Select
        label="Cap Mode"
        placeholder="Select cap mode"
        options={CAP_MODE_OPTIONS}
        value={capMode}
        onChange={(e) => onCapModeChange(e.target.value as string)}
      />
      <Input
        label="Cap Amount"
        type="number"
        placeholder="0"
        value={capAmount}
        onChange={(e) => onCapAmountChange((e.target as HTMLInputElement).value)}
      />
      <Box sx={{ gridColumn: '1 / -1' }}>
        <Typography sx={{ fontSize: 13, fontWeight: 500, color: 'text.secondary', mb: 0.75 }}>
          Schedule CAP
        </Typography>
        <Box sx={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          height: 36, px: 1.5, borderRadius: 1,
          border: (t) => `1px solid ${t.palette.border.main}`,
          backgroundColor: 'surface.main', cursor: 'pointer',
        }}>
          <Typography sx={{ fontSize: 13, color: 'text.primary' }}>
            {subDate || 'June 01, 2025'}
          </Typography>
          <Calendar size={15} color="#71717a" />
        </Box>
      </Box>
    </>
  );
}

// ─── Country block card ───────────────────────────────────────────────────────

function CountryBlock({ data, onUpdate }: {
  data:     OfferCountryData;
  onUpdate: (patch: Partial<OfferCountryData>) => void;
}) {
  const patchOp = (i: number, patch: Partial<OperatorConversionData>) =>
    onUpdate({ operators: data.operators.map((op, j) => j === i ? { ...op, ...patch } : op) });

  return (
    <Box sx={cardShell}>
      <Box sx={{ px: 3, py: 2, borderBottom: dividerLight }}>
        <Box sx={{
          display: 'inline-flex', alignItems: 'center', gap: 0.75,
          height: 28, px: 1.25, borderRadius: 1,
          backgroundColor: '#f4f4f5',
          border: (t) => `1px solid ${t.palette.border.main}`,
          mb: 0.5,
        }}>
          <Typography sx={{ fontSize: 14, lineHeight: 1 }}>{data.flag}</Typography>
          <Typography sx={{ fontSize: 12, fontWeight: 500, color: 'text.primary' }}>{data.countryName}</Typography>
          {data.operators.length > 0 && (
            <>
              <Typography sx={{ fontSize: 12, color: '#d4d4d8', mx: 0.25 }}>·</Typography>
              <Typography sx={{ fontSize: 12, color: 'text.secondary' }}>
                operators: {data.operators.map((o) => o.name).join(', ')}
              </Typography>
            </>
          )}
        </Box>
        <Typography sx={{ fontSize: 12.5, color: 'text.secondary', mt: 0.5 }}>
          Configure caps and operator billing for this country.
        </Typography>
      </Box>

      <Box sx={{ px: 3, py: 2.5, display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: 2, rowGap: 2 }}>

        <Box sx={{ gridColumn: '1 / -1', pb: 2, borderBottom: dividerLight }}>
          <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 3 }}>
            <Box>
              <Typography sx={{ fontSize: 13, fontWeight: 500, color: 'text.primary' }}>Operator Cap</Typography>
              <Typography sx={{ fontSize: 12, color: 'text.secondary', mt: 0.25 }}>
                When switched on, the cap will focus on the operator level.
              </Typography>
            </Box>
            <Box sx={{ flexShrink: 0 }}>
              <Switch checked={data.operatorCap} onChange={(_e, v) => onUpdate({ operatorCap: v })} />
            </Box>
          </Box>
        </Box>

        {!data.operatorCap && (
          <CapFields
            capMode={data.capMode} capAmount={data.capAmount} subDate={data.subDate}
            onCapModeChange={(v)   => onUpdate({ capMode: v })}
            onCapAmountChange={(v) => onUpdate({ capAmount: v })}
          />
        )}

        {/* Event / Payout — once at country level */}
        <Box sx={{ gridColumn: '1 / -1', pt: 1, mt: 0.5, borderTop: dividerLight, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1.5 }}>
          <Input
            label="Event / Category"
            placeholder="e.g. LATAM Expansion"
            value={data.event}
            onChange={(e) => onUpdate({ event: (e.target as HTMLInputElement).value })}
          />
          <Box>
            <Typography sx={{ fontSize: 13, fontWeight: 500, color: 'text.secondary', mb: 0.75 }}>
              Advertiser's Payout
            </Typography>
            <Box sx={{ position: 'relative' }}>
              <Box component="span" sx={{
                position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)',
                color: '#a1a1aa', fontSize: 14, pointerEvents: 'none', lineHeight: 1,
              }}>$</Box>
              <Box
                component="input"
                type="number"
                step={0.01}
                placeholder="0.00"
                value={data.payout}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => onUpdate({ payout: e.target.value })}
                sx={{
                  display: 'block', width: '100%', boxSizing: 'border-box',
                  height: 40, pl: '28px', pr: 1.5,
                  borderRadius: 1,
                  border: (t) => `1px solid ${t.palette.border.main}`,
                  backgroundColor: 'surface.main',
                  fontSize: 13.5, color: 'text.primary',
                  outline: 'none', fontFamily: 'inherit',
                  '&:focus': { borderColor: '#a1a1aa' },
                }}
              />
            </Box>
          </Box>
        </Box>

        {data.operatorCap && data.operators.length > 0 && (
          <Box sx={{ gridColumn: '1 / -1', pt: 1, mt: 0.5, borderTop: dividerLight, display: 'flex', flexDirection: 'column', gap: 2.5 }}>
            {data.operators.map((op, i) => (
              <Box key={op.name}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                  <Typography sx={{ fontSize: 13, fontWeight: 600, color: 'text.primary' }}>{op.name}</Typography>
                  <Typography sx={{ fontSize: 11, color: 'text.secondary' }}>Operator</Typography>
                </Box>
                <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: 2, rowGap: 2 }}>
                  <CapFields
                    capMode={op.capMode} capAmount={op.capAmount} subDate={op.subDate}
                    onCapModeChange={(v)   => patchOp(i, { capMode: v })}
                    onCapAmountChange={(v) => patchOp(i, { capAmount: v })}
                  />
                </Box>
              </Box>
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
}

// ─── Offer creation form ──────────────────────────────────────────────────────

function OfferForm({ countries, heEnabled = false, onSave, onCancel }: {
  countries:  string[];
  heEnabled?: boolean;
  onSave:     (o: OfferDraft) => void;
  onCancel?:  () => void;
}) {
  const [name, setName]                 = useState('Weekly Premium');
  const [type, setType]                 = useState('');
  const [firewall, setFirewall]         = useState('');
  const [online, setOnline]             = useState(true);
  const [billingCycle, setBillingCycle] = useState('');
  const [heOrPin, setHeOrPin]           = useState('');
  const [generalOpen,    setGeneralOpen]    = useState(true);
  const [conversionOpen, setConversionOpen] = useState(true);
  const [countryData, setCountryData] = useState<OfferCountryData[]>(() => initCountryData(countries));

  const updateCountry = (idx: number, patch: Partial<OfferCountryData>) =>
    setCountryData((prev) => prev.map((c, i) => i === idx ? { ...c, ...patch } : c));

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      {/* Form title row */}
      <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 1.5 }}>
        <Box>
          <Typography sx={{ fontSize: 16, fontWeight: 600, color: 'text.primary' }}>New Offer</Typography>
          <Typography sx={{ fontSize: 13, color: 'text.secondary', mt: 0.25 }}>
            Configure the offers available for this service.
          </Typography>
        </Box>
        {onCancel && (
          <IconButton onClick={onCancel} aria-label="Cancel"><X size={16} /></IconButton>
        )}
      </Box>

      {/* Info banner */}
      <Box sx={{
        borderRadius: 2, backgroundColor: '#fafafa',
        border: '1px solid #e4e4e7', p: 2,
        display: 'flex', gap: 1.5,
      }}>
        <Box sx={{ flexShrink: 0, mt: 0.25 }}><Info size={16} color="#71717a" /></Box>
        <Box>
          <Typography sx={{ fontSize: 12.5, fontWeight: 600, color: 'text.primary' }}>Default state — Draft</Typography>
          <Typography sx={{ fontSize: 12.5, color: '#52525b', mt: 0.25 }}>
            Status will be managed automatically during review and launch phases.
          </Typography>
        </Box>
      </Box>

      {/* ── General Settings card ── */}
      <CollapsibleCard
        title="General Settings"
        subtitle="Basic configuration and billing type for this offer."
        open={generalOpen}
        onToggle={() => setGeneralOpen((v) => !v)}
      >
        <Box sx={{ px: 3, py: 2.5, display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: 2, rowGap: 2 }}>
          {/* Offer Name — full width */}
          <Box sx={{ gridColumn: '1 / -1' }}>
            <Input label="Offer Name" value={name} onChange={(e) => setName((e.target as HTMLInputElement).value)} />
          </Box>

          {/* Offer Type */}
          <Select
            label="Offer Type"
            placeholder="Select offer type"
            options={TYPE_OPTIONS}
            value={type}
            onChange={(e) => setType(e.target.value as string)}
          />

          {/* Firewall ID */}
          <Select
            label="Firewall ID"
            placeholder="Select firewall ID"
            options={FIREWALL_OPTIONS}
            value={firewall}
            onChange={(e) => setFirewall(e.target.value as string)}
          />

          {/* Billing Cycle */}
          <Select
            label="Billing Cycle"
            placeholder="Select billing cycle"
            options={BILLING_CYCLE_OPTIONS}
            value={billingCycle}
            onChange={(e) => setBillingCycle(e.target.value as string)}
          />

          {/* HE / PIN — only shown when HE is enabled in Step 2 */}
          {heEnabled ? (
            <Select
              label="HE / PIN"
              placeholder="Select method"
              options={HE_PIN_OPTIONS}
              value={heOrPin}
              onChange={(e) => setHeOrPin(e.target.value as string)}
            />
          ) : (
            <Box /> /* placeholder to keep grid alignment */
          )}

          {/* Online toggle — full-width */}
          <Box sx={{ gridColumn: '1 / -1', pt: 1.5, mt: 0.5, borderTop: dividerLight }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 3, py: 0.5 }}>
              <Box>
                <Typography sx={{ fontSize: 13, fontWeight: 500, color: 'text.primary' }}>Online</Typography>
                <Typography sx={{ fontSize: 12, color: 'text.secondary', mt: 0.25 }}>
                  Make this offer available to end users immediately after launch.
                </Typography>
              </Box>
              <Box sx={{ flexShrink: 0 }}>
                <Switch checked={online} onChange={(_e, v) => setOnline(v)} />
              </Box>
            </Box>
          </Box>
        </Box>
      </CollapsibleCard>

      {/* ── Conversion Rule card ── */}
      <CollapsibleCard
        title="Conversion Rule"
        subtitle="Set caps and operator payout per country."
        open={conversionOpen}
        onToggle={() => setConversionOpen((v) => !v)}
      >
        <Box sx={{ px: 3, py: 2.5, display: 'flex', flexDirection: 'column', gap: 2 }}>
          {countryData.map((cd, i) => (
            <CountryBlock key={cd.countryName} data={cd} onUpdate={(p) => updateCountry(i, p)} />
          ))}
        </Box>
      </CollapsibleCard>

      {/* Footer actions */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 1 }}>
        {onCancel && <Button variant="ghost" onClick={onCancel}>Cancel</Button>}
        <Button
          variant="primary"
          onClick={() => onSave({
            id: `offer-${Date.now()}`, name, type, firewall, online, themed: false,
            billingCycle, heOrPin,
            countries: countryData,
          })}
        >
          Save Offer
        </Button>
      </Box>
    </Box>
  );
}

// ─── Pill style ───────────────────────────────────────────────────────────────

const pillSx = {
  display: 'inline-flex', alignItems: 'center', gap: 0.5,
  height: 22, px: 1.25, borderRadius: 9999,
  backgroundColor: '#e4e4e7', color: '#3f3f46',
  fontSize: 11.5, fontWeight: 500,
} as const;

// ─── Per-country theme button / menu ─────────────────────────────────────────

function CountryThemeButton({ themed, onEdit, onDelete }: {
  themed:   boolean;
  onEdit:   () => void;
  onDelete: () => void;
}) {
  const { anchor, open, openMenu, closeMenu } = useMenu();

  return (
    <>
      <IconButton
        onClick={(e: React.MouseEvent) => { e.stopPropagation(); openMenu(e as any); }}
        aria-label="Theme options"
        size="sm"
      >
        <MoreHorizontal size={15} />
      </IconButton>
      <Menu anchorEl={anchor} open={open} onClose={closeMenu}>
        {themed ? (
          <>
            <Menu.Item icon={<Paintbrush size={14} />} onClick={() => { closeMenu(); onEdit(); }}>
              Edit theme
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item icon={<Trash2 size={14} />} variant="danger" onClick={() => { closeMenu(); onDelete(); }}>
              Delete theme
            </Menu.Item>
          </>
        ) : (
          <Menu.Item icon={<Paintbrush size={14} />} onClick={() => { closeMenu(); onEdit(); }}>
            Duplicate &amp; edit theme
          </Menu.Item>
        )}
      </Menu>
    </>
  );
}

// ─── Offer card (saved) ───────────────────────────────────────────────────────

function OfferCard({ offer, idx, onUpdateOffer, onEditTheme, onRemove }: {
  offer:          OfferDraft;
  idx:            number;
  onUpdateOffer:  (patch: Partial<OfferDraft>) => void;
  onEditTheme:    () => void;
  onRemove:       () => void;
}) {
  const { anchor, open, openMenu, closeMenu } = useMenu();
  const [expanded, setExpanded] = useState(false);
  const [editingCell, setEditingCell] = useState<{ ci: number; oi: number; field: 'payout' | 'event' } | null>(null);
  const [editVal, setEditVal] = useState('');

  const countries = offer.countries ?? [];

  const saveEdit = () => {
    if (!editingCell) return;
    const { ci, field } = editingCell;
    // payout/event live at country level; oi is only used to track which row shows the input
    const updatedCountries = offer.countries.map((c, cIdx) =>
      cIdx !== ci ? c : { ...c, [field]: editVal }
    );
    onUpdateOffer({ countries: updatedCountries });
    setEditingCell(null);
  };

  const startEdit = (ci: number, oi: number, field: 'payout' | 'event', currentVal: string) => {
    setEditingCell({ ci, oi, field });
    setEditVal(currentVal);
  };


  return (
    <Card padded={false}>
      {/* Header — clickable to expand */}
      <Box
        onClick={() => setExpanded((e) => !e)}
        sx={{ px: 2, py: 1.5, cursor: 'pointer', transition: 'background .1s', '&:hover': { backgroundColor: 'rgba(0,0,0,0.018)' } }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box sx={{ width: 36, height: 36, borderRadius: '12px', backgroundColor: '#eff6ff', color: '#2563eb', display: 'grid', placeItems: 'center', flexShrink: 0 }}>
            <Tag size={16} />
          </Box>
          <Box sx={{ width: 8, height: 8, borderRadius: '50%', flexShrink: 0, backgroundColor: offer.online ? '#10b981' : '#a1a1aa', boxShadow: '0 0 0 2px #fff' }} />
          <Box sx={{ minWidth: 0, flex: 1, display: 'flex', alignItems: 'center', gap: 1, fontSize: 14, overflow: 'hidden' }}>
            <Box sx={{ fontWeight: 600, color: 'text.primary', whiteSpace: 'nowrap' }}>Offer-{idx}</Box>
            <Box sx={{ color: '#d4d4d8' }}>|</Box>
            <Box sx={{ color: 'text.primary', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{offer.name || 'Untitled'}</Box>
            {offer.type && (<><Box sx={{ color: '#d4d4d8' }}>|</Box><Box sx={{ color: 'text.secondary', whiteSpace: 'nowrap' }}>{offer.type}</Box></>)}
            {offer.firewall && (<><Box sx={{ color: '#d4d4d8' }}>|</Box><Box sx={{ color: 'text.secondary', whiteSpace: 'nowrap' }}>{offer.firewall}</Box></>)}
            {offer.billingCycle && (<><Box sx={{ color: '#d4d4d8' }}>|</Box><Box sx={{ color: 'text.secondary', whiteSpace: 'nowrap' }}>{offer.billingCycle}</Box></>)}
            {offer.heOrPin && (<><Box sx={{ color: '#d4d4d8' }}>|</Box><Box sx={{ color: 'text.secondary', whiteSpace: 'nowrap' }}>{offer.heOrPin}</Box></>)}
          </Box>
          <IconButton onClick={(e: React.MouseEvent) => { e.stopPropagation(); openMenu(e as any); }} aria-label="More actions">
            <MoreHorizontal size={16} />
          </IconButton>
        </Box>

        {countries.length > 0 && (
          <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 0.5, mt: 1.25, pl: '60px' }}>
            {countries.map((c, ci) => (
              <Box key={c.countryCode} sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5 }}>
                {ci > 0 && <Box sx={{ width: 4, height: 4, borderRadius: '50%', backgroundColor: '#d4d4d8', mx: 0.75 }} />}
                <Box sx={pillSx}><Globe size={12} />{c.countryCode}</Box>
                <Box sx={{ ...pillSx, ml: 0.5 }}><Server size={12} />{c.operators.length}</Box>
              </Box>
            ))}
            {offer.themed && (
              <Box sx={{ display: 'inline-flex', alignItems: 'center' }}>
                <Box sx={{ width: 4, height: 4, borderRadius: '50%', backgroundColor: '#d4d4d8', mx: 0.75 }} />
                <Box sx={{ display: 'inline-flex', alignItems: 'center', height: 22, px: 1.25, borderRadius: 9999, backgroundColor: '#ede9fe', color: '#6d28d9' }} title="Has custom theme">
                  <Paintbrush size={12} />
                </Box>
              </Box>
            )}
          </Box>
        )}
      </Box>

      {/* Expanded body */}
      <Collapse in={expanded}>
        <Box sx={{ borderTop: '1px solid #f4f4f5', px: 3, py: 2.5, backgroundColor: 'rgba(250,250,250,0.5)', display: 'flex', flexDirection: 'column', gap: 3 }}>
          {countries.map((c, ci) => (
            <Box key={c.countryCode} sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              {/* Country header: chip + theme action */}
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 1 }}>
                <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.75 }}>
                  <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.75, height: 24, px: 1, borderRadius: '6px', backgroundColor: '#f4f4f5' }}>
                    <Typography sx={{ fontSize: 12, lineHeight: 1 }}>{c.flag}</Typography>
                    <Typography sx={{ fontSize: 10, fontWeight: 500, color: 'text.primary' }}>{c.countryName}</Typography>
                  </Box>
                  {c.themed && (
                    <Box sx={{ display: 'inline-flex', alignItems: 'center', height: 22, px: 1.25, borderRadius: 9999, backgroundColor: '#ede9fe', color: '#6d28d9' }} title="Has custom theme">
                      <Paintbrush size={12} />
                    </Box>
                  )}
                </Box>
                <CountryThemeButton
                  themed={c.themed ?? false}
                  onEdit={() => {
                    onUpdateOffer({
                      countries: offer.countries.map((c2, idx2) =>
                        idx2 === ci ? { ...c2, themed: true } : c2
                      ),
                    });
                    onEditTheme();
                  }}
                  onDelete={() => {
                    onUpdateOffer({
                      countries: offer.countries.map((c2, idx2) =>
                        idx2 === ci ? { ...c2, themed: false } : c2
                      ),
                    });
                  }}
                />
              </Box>

              {/* Operator rows — name | payout | event | online */}
              {c.operators.length > 0 && (
                <Box sx={{ borderRadius: '6px', overflow: 'hidden', border: '1px solid #e4e4e7' }}>
                  {c.operators.map((op, oi) => {
                    const isOnline     = op.online ?? true;
                    const editPayout   = editingCell?.ci === ci && editingCell?.oi === oi && editingCell?.field === 'payout';
                    const editEvent    = editingCell?.ci === ci && editingCell?.oi === oi && editingCell?.field === 'event';
                    return (
                      <Box key={op.name} sx={{
                        display: 'grid', gridTemplateColumns: '1fr auto auto 1fr',
                        gap: 2, alignItems: 'center',
                        backgroundColor: '#ffffff',
                        borderBottom: oi < c.operators.length - 1 ? '1px solid #e4e4e7' : 'none',
                        px: 1.5, py: 1.5,
                      }}>
                        {/* name */}
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, minWidth: 0 }}>
                          <Server size={14} style={{ color: '#a1a1aa', flexShrink: 0 }} />
                          <Typography sx={{ fontSize: 14, fontWeight: 500, color: 'text.primary', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {op.name}
                          </Typography>
                        </Box>

                        {/* payout pill */}
                        {editPayout ? (
                          <Box component="input" autoFocus type="text" value={editVal}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditVal(e.target.value)}
                            onBlur={saveEdit}
                            onKeyDown={(e: React.KeyboardEvent) => { if (e.key === 'Enter' || e.key === 'Escape') saveEdit(); }}
                            sx={{ height: 24, width: 72, px: '8px', borderRadius: 9999, border: '1px solid #6366f1', fontSize: 12, outline: 'none', fontFamily: 'inherit', color: 'text.primary' }}
                          />
                        ) : (
                          <Box component="button" type="button" onClick={(e: React.MouseEvent) => { e.stopPropagation(); startEdit(ci, oi, 'payout', c.payout); }} title="Edit payout"
                            sx={{ all: 'unset', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px', height: 24, px: '10px', borderRadius: 9999, backgroundColor: '#ffffff', border: '1px solid #e4e4e7', boxShadow: '0 1px 2px rgba(0,0,0,0.05)', fontSize: 13, color: 'text.primary', '&:hover': { backgroundColor: '#fafafa' }, transition: 'background .1s' }}>
                            <DollarSign size={13} style={{ color: '#71717a' }} />
                            <span>{c.payout || '—'}</span>
                          </Box>
                        )}

                        {/* event pill */}
                        {editEvent ? (
                          <Box component="input" autoFocus type="text" value={editVal}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditVal(e.target.value)}
                            onBlur={saveEdit}
                            onKeyDown={(e: React.KeyboardEvent) => { if (e.key === 'Enter' || e.key === 'Escape') saveEdit(); }}
                            sx={{ height: 24, width: 100, px: '8px', borderRadius: 9999, border: '1px solid #6366f1', fontSize: 12, outline: 'none', fontFamily: 'inherit', color: 'text.primary' }}
                          />
                        ) : (
                          <Box component="button" type="button" onClick={(e: React.MouseEvent) => { e.stopPropagation(); startEdit(ci, oi, 'event', c.event); }} title="Edit event"
                            sx={{ all: 'unset', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px', height: 24, px: '10px', borderRadius: 9999, backgroundColor: '#ffffff', border: '1px solid #e4e4e7', boxShadow: '0 1px 2px rgba(0,0,0,0.05)', fontSize: 13, color: 'text.primary', '&:hover': { backgroundColor: '#fafafa' }, transition: 'background .1s' }}>
                            <TrendingUp size={13} style={{ color: '#71717a' }} />
                            <span>{c.event || '—'}</span>
                          </Box>
                        )}

                        {/* online */}
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 1 }}>
                          <Typography sx={{ fontSize: 10, fontWeight: 500, color: isOnline ? '#059669' : '#a1a1aa' }}>
                            {isOnline ? 'Online' : 'Offline'}
                          </Typography>
                          <Switch
                            checked={isOnline}
                            onChange={(_e, v) => {
                              onUpdateOffer({
                                countries: offer.countries.map((c2, ci2) =>
                                  ci2 !== ci ? c2 : {
                                    ...c2,
                                    operators: c2.operators.map((o, oi2) => oi2 !== oi ? o : { ...o, online: v }),
                                  }
                                ),
                              });
                            }}
                            onClick={(e: React.MouseEvent) => e.stopPropagation()}
                          />
                        </Box>
                      </Box>
                    );
                  })}
                </Box>
              )}
            </Box>
          ))}
        </Box>
      </Collapse>

      <Menu anchorEl={anchor} open={open} onClose={closeMenu}>
        <Menu.Item icon={<Trash2 size={14} />} variant="danger" onClick={() => { closeMenu(); onRemove(); }}>
          Delete offer
        </Menu.Item>
      </Menu>
    </Card>
  );
}
