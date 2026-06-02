'use client';

import { useState, useRef, useEffect } from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';
import { ArrowLeft, ArrowRight, CheckCircle2, ChevronDown, ExternalLink, MousePointerClick, Paintbrush2, Plus, X } from 'lucide-react';

import { Input, Select, Switch, Button } from '../';
import type { ThemeState, ThemeElementId } from './ThemeEditorPanel';
import { ELEMENT_KIND, ELEMENT_LABEL } from './ThemeEditorPanel';

// ─── Public interface (kept compatible with ServiceWizardDrawer + Step5Review) ─

export interface Step2Values {
  countries:    string[];
  defaultLang:  string;
  channelType:  string;
  customThemes: boolean;
  heEnabled:    boolean;
}

export interface Step2SetupProps {
  values:   Step2Values;
  onChange: <K extends keyof Step2Values>(key: K, value: Step2Values[K]) => void;
  themeEditorOpen?:    boolean;
  themeChannel?:       'otp' | 'voice';
  onThemeEditorChange?:(open: boolean) => void;
  themeState?:         ThemeState;
  selectedThemeEl?:    ThemeElementId | null;
  onSelectThemeEl?:    (id: ThemeElementId | null) => void;
  onUpdateTheme?:      (channel: 'otp' | 'voice', id: ThemeElementId, patch: Record<string, unknown>) => void;
}

type TabKey = 'country' | 'billing' | 'theme';

// ─── Internal form shapes ────────────────────────────────────────────────────

interface CountryForm {
  country: string;           subscriptionFlow: string;
  headerEnrichment: boolean; operatorFirewall: string;
  sessionRecording: boolean; antiFraudProvider: string;
  actionWhenFlagged: string; checkOnLanding: boolean;
  verifyViaAF: boolean;
}

interface ThemeForm {
  themePreset: string; customDisclaimers: boolean; introPage: boolean;
}

interface SenderIdRow { id: string; type: string; }
interface KeywordRow  { keyword: string; ktype: string; method: string; lang: string; }
interface PriceTier     { enabled: boolean; price: string; otpIn: string; otpOut: string; keywords: KeywordRow[]; }
interface ExceptionTier { price: string; cycle: string; }

interface OperatorForm {
  operator: string;        billingProvider: string; adProvider: string;
  aggregator: string;      linkPosition: string;    operatorStatus: boolean;
  freeTrial: string;
  smsSenderId: string;     firewallId: string;      billingMode: string;
  showUnsub: boolean;      showMyAccount: boolean;  showWrongNumber: boolean;
  openKeypad: boolean;
  senderIds: SenderIdRow[];
  channelType: string;     consentGateway: string;  pinLength: string;
  resendTimer: string;
  autofillPin: boolean;    showResend: boolean;     autoVerify: boolean;
  numericPin: boolean;     consentCheckbox: boolean;
  pricingCurrency: string;
  daily: PriceTier; weekly: PriceTier; monthly: PriceTier;
  exceptionsEnabled: boolean;
  exceptions: ExceptionTier[];
}

// ─── Option lists ─────────────────────────────────────────────────────────────

const COUNTRY_OPTS     = ['United Arab Emirates','Saudi Arabia','Egypt','Kuwait','Bahrain','Oman','Qatar'];
const SUB_FLOW_OPTS    = ['Double opt-in (MO/MT)','Single opt-in','WAP click','Header enrichment only'];
const FIREWALL_OPTS    = ['Operator firewall · Tier 1','Operator firewall · Tier 2','None'];
const AF_OPTS          = ['AdScore','Anura','TrafficGuard','None'];
const AF_ACTION_OPTS   = ['Block + log','Log only','Challenge'];
const OPERATOR_OPTS    = ['du','Etisalat','STC','Mobily','Zain','Ooredoo'];
const BILL_PROV_OPTS   = ['Operator direct','DOCOMO','Boku','Fortumo'];
const AD_PROV_OPTS     = ['Payment','Organic','Programmatic'];
const AGG_OPTS         = ['None','Aggregator A','Aggregator B'];
const LINK_POS_OPTS    = ['Position 1','Position 2','Position 3'];
const FW_ID_OPTS       = ['None','FW-001','FW-002'];
const BILLING_MODE_OPTS= ['Recurring','One-time'];
const SENDER_TYPE_OPTS = ['Alphanumeric','Shortcode','Longcode'];
const CH_TYPE_OPTS     = ['OTP via SMS','Voice PIN','Direct'];
const CONSENT_GW_OPTS  = ['Gateway A','Gateway B','Default'];
const PIN_LEN_OPTS     = ['4 digits','5 digits','6 digits'];
const RESEND_OPTS      = ['30 seconds','60 seconds','90 seconds'];
const KW_TYPE_OPTS     = ['Subscribe / Stop / Help','Subscribe only','Stop only'];
const KW_METHOD_OPTS   = ['MO','MT','Both'];
const LANG_OPTS        = ['English','Arabic','French'];
const THEME_PRESET_OPTS= ['Light · Standard','Dark · Standard','Light · Minimal'];
const CURRENCY_OPTS    = ['USD','AED','SAR','EUR'];

const COUNTRY_FLAG: Record<string, string> = {
  'United Arab Emirates':'🇦🇪','Saudi Arabia':'🇸🇦','Egypt':'🇪🇬',
  'Kuwait':'🇰🇼','Bahrain':'🇧🇭','Oman':'🇴🇲','Qatar':'🇶🇦',
};

function freshKeywords(): KeywordRow[] {
  return [{ keyword: '', ktype: 'Subscribe / Stop / Help', method: '', lang: 'English' }];
}

function freshOperator(): OperatorForm {
  return {
    operator: 'du', billingProvider: 'Operator direct', adProvider: 'Payment',
    aggregator: '', linkPosition: '', operatorStatus: true,
    freeTrial: '0', smsSenderId: '', firewallId: 'None', billingMode: 'Recurring',
    showUnsub: false, showMyAccount: true, showWrongNumber: false, openKeypad: true,
    senderIds: [{ id: '', type: '' }],
    channelType: '', consentGateway: '', pinLength: '4 digits', resendTimer: '30 seconds',
    autofillPin: false, showResend: true, autoVerify: true, numericPin: true, consentCheckbox: true,
    pricingCurrency: 'USD',
    daily:   { enabled: false, price: '0.50', otpIn: '', otpOut: '', keywords: freshKeywords() },
    weekly:  { enabled: false, price: '2.00', otpIn: '', otpOut: '', keywords: freshKeywords() },
    monthly: { enabled: false, price: '7.00', otpIn: '', otpOut: '', keywords: freshKeywords() },
    exceptionsEnabled: false,
    exceptions: [],
  };
}

// ─── Main component ───────────────────────────────────────────────────────────

export function Step2Setup({ values, onChange, themeEditorOpen = false, themeChannel = 'otp', onThemeEditorChange, themeState, selectedThemeEl = null, onSelectThemeEl, onUpdateTheme }: Step2SetupProps) {
  const [tab, setTab] = useState<TabKey>('country');
  const tabTopRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    tabTopRef.current?.scrollIntoView({ behavior: 'instant' as ScrollBehavior, block: 'start' });
  }, [tab]);

  const handleTabChange = (next: TabKey) => {
    setTab(next);
    if (next === 'theme') onThemeEditorChange?.(true);
    else                  onThemeEditorChange?.(false);
  };

  const [countryForms, setCountryForms] = useState<CountryForm[]>(() =>
    (values.countries.length > 0 ? values.countries : ['United Arab Emirates']).map((c) => ({
      country: c, subscriptionFlow: 'Double opt-in (MO/MT)',
      headerEnrichment: true, operatorFirewall: 'Operator firewall · Tier 1',
      sessionRecording: true, antiFraudProvider: 'AdScore',
      actionWhenFlagged: 'Block + log', checkOnLanding: true, verifyViaAF: true,
    }))
  );

  const [themeForm, setThemeForm] = useState<ThemeForm>({
    themePreset:'Light · Standard', customDisclaimers:true, introPage:true,
  });

  const handleUpdateCountry = (idx: number, k: keyof CountryForm, v: CountryForm[keyof CountryForm]) => {
    const next = countryForms.map((f, i) => i === idx ? { ...f, [k]: v } : f);
    setCountryForms(next);
    if (k === 'country')    onChange('countries', next.map((f) => f.country).filter(Boolean));
    if (k === 'subscriptionFlow' && idx === 0) onChange('channelType', v as string);
    if (k === 'headerEnrichment') onChange('heEnabled', next.some((f) => f.headerEnrichment));
  };

  const handleAddCountry = () => {
    setCountryForms((prev) => [...prev, {
      country: '', subscriptionFlow: 'Double opt-in (MO/MT)',
      headerEnrichment: false, operatorFirewall: 'None',
      sessionRecording: false, antiFraudProvider: 'None',
      actionWhenFlagged: 'Log only', checkOnLanding: false, verifyViaAF: false,
    }]);
  };

  const handleRemoveCountry = (idx: number) => {
    const next = countryForms.filter((_, i) => i !== idx);
    setCountryForms(next);
    onChange('countries', next.map((f) => f.country).filter(Boolean));
    onChange('heEnabled', next.some((f) => f.headerEnrichment));
  };

  const updateTheme = <K extends keyof ThemeForm>(k: K, v: ThemeForm[K]) => {
    setThemeForm((s) => ({ ...s, [k]: v }));
    if (k === 'customDisclaimers') onChange('customThemes', v as boolean);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
      <div ref={tabTopRef} />
      {/* Sticky tab bar + Generate test link */}
      <Box sx={{
        position: 'sticky', top: 0, zIndex: 8, pb: 1.5,
        backgroundColor: 'surface.main',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2,
      }}>
        <TabSwitcher value={tab} onChange={handleTabChange} />
        <Button variant="secondary" size="sm" leftIcon={<ExternalLink size={13} />}>
          Generate test link
        </Button>
      </Box>

      {tab === 'country' && (
        <CountryTabContent
          forms={countryForms}
          onUpdate={handleUpdateCountry}
          onAdd={handleAddCountry}
          onRemove={handleRemoveCountry}
          onNextTab={() => handleTabChange('billing')}
        />
      )}
      {tab === 'billing' && (
        <BillingTabContent countryForms={countryForms} onUpdateCountry={handleUpdateCountry} onBackTab={() => handleTabChange('country')} onNextTab={() => handleTabChange('theme')} />
      )}
      {tab === 'theme' && (
        <ThemeTabContent
          form={themeForm} onUpdate={updateTheme}
          defaultLang={values.defaultLang}
          onLangChange={(v) => onChange('defaultLang', v)}
          editorOpen={themeEditorOpen}
          channel={themeChannel}
          onCloseEditor={() => onThemeEditorChange?.(false)}
          onOpenEditor={() => onThemeEditorChange?.(true)}
          themeState={themeState ?? null}
          selectedEl={selectedThemeEl}
          onSelectEl={onSelectThemeEl ?? null}
          onUpdateTheme={onUpdateTheme ?? null}
        />
      )}
    </Box>
  );
}

// ─── Tab switcher (pill style) ────────────────────────────────────────────────

function TabSwitcher({ value, onChange }: { value: TabKey; onChange: (t: TabKey) => void }) {
  return (
    <Box sx={{
      display: 'inline-flex', borderRadius: '6px',
      border: (t) => `1px solid ${t.palette.border.main}`,
      backgroundColor: 'surface.main', p: '2px', gap: '2px',
    }}>
      {(['country','billing','theme'] as TabKey[]).map((key) => (
        <Box key={key} component="button" onClick={() => onChange(key)} sx={{
          all: 'unset', cursor: 'pointer',
          px: '14px', py: '6px', borderRadius: '4px',
          fontSize: 13, fontWeight: 500,
          color: value === key ? 'text.primary' : 'text.secondary',
          backgroundColor: value === key ? 'surface.muted' : 'transparent',
          transition: 'background .1s, color .1s',
          '&:hover': { color: 'text.primary' },
        }}>
          {key === 'country' ? 'Country' : key === 'billing' ? 'Billing' : 'Theme'}
        </Box>
      ))}
    </Box>
  );
}

// ─── Shared primitives ────────────────────────────────────────────────────────

function AutoSaveBanner() {
  return (
    <Box sx={{
      borderRadius: '6px', border: '1px solid #d1fae5', backgroundColor: '#ecfdf5',
      px: 1.75, py: 1.25, fontSize: 12.5, color: '#064e3b',
      display: 'flex', alignItems: 'flex-start', gap: 1,
    }}>
      <CheckCircle2 size={16} style={{ marginTop: 2, color: '#059669', flexShrink: 0 }} />
      <Box>
        <Box sx={{ fontWeight: 500 }}>Saved. Last change 2 seconds ago.</Box>
        <Box sx={{ color: 'rgba(6,78,59,0.8)', mt: 0.25 }}>
          You can safely close this window — your draft is up to date.
        </Box>
      </Box>
    </Box>
  );
}

function SectionCard({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <Box sx={{
      backgroundColor: 'surface.main',
      border: (t) => `1px solid ${t.palette.border.main}`,
      borderRadius: '12px',
      boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
    }}>
      <Box sx={{ px: 3, py: 2, borderBottom: (t) => `1px solid ${t.palette.border.subtle}` }}>
        <Typography sx={{ fontSize: 14.5, fontWeight: 600, color: 'text.primary' }}>{title}</Typography>
        {subtitle && <Typography sx={{ fontSize: 12.5, color: 'text.secondary', mt: 0.5 }}>{subtitle}</Typography>}
      </Box>
      <Box sx={{ px: 3, py: 2.5, display: 'flex', flexDirection: 'column', gap: 2 }}>
        {children}
      </Box>
    </Box>
  );
}

function ToggleRow({ label, description, checked, onChange }: {
  label: string; description?: string; checked: boolean; onChange: (v: boolean) => void;
}) {
  return (
    <Box sx={{
      display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 2,
      pt: 1.5, mt: 0.5, borderTop: (t) => `1px solid ${t.palette.border.subtle}`,
    }}>
      <Box>
        <Typography sx={{ fontSize: 13, fontWeight: 500, color: 'text.primary' }}>{label}</Typography>
        {description && <Typography sx={{ fontSize: 12, color: 'text.secondary', mt: 0.25 }}>{description}</Typography>}
      </Box>
      <Switch checked={checked} onChange={(_e, v) => onChange(v)} />
    </Box>
  );
}

function MiniToggleRow({ label, description, checked, onChange }: {
  label: string; description?: string; checked: boolean; onChange: (v: boolean) => void;
}) {
  return (
    <Box sx={{ display: 'flex', alignItems: description ? 'flex-start' : 'center', justifyContent: 'space-between', gap: 2 }}>
      <Box>
        <Typography sx={{ fontSize: 13, color: 'text.primary' }}>{label}</Typography>
        {description && <Typography sx={{ fontSize: 11.5, color: 'text.secondary' }}>{description}</Typography>}
      </Box>
      <Switch checked={checked} onChange={(_e, v) => onChange(v)} />
    </Box>
  );
}

function InlineAddLink({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) {
  return (
    <Box component="button" onClick={onClick} sx={{
      all: 'unset', cursor: 'pointer',
      display: 'inline-flex', alignItems: 'center', gap: 0.5,
      fontSize: 12.5, color: 'text.secondary',
      '&:hover': { color: 'text.primary', textDecoration: 'underline' },
    }}>
      {children}
    </Box>
  );
}

// ─── Country tab ──────────────────────────────────────────────────────────────

function CountryTabContent({ forms, onUpdate, onAdd, onRemove, onNextTab }: {
  forms: CountryForm[];
  onUpdate: (idx: number, k: keyof CountryForm, v: CountryForm[keyof CountryForm]) => void;
  onAdd: () => void;
  onRemove: (idx: number) => void;
  onNextTab: () => void;
}) {
  const [expandedIdx, setExpandedIdx] = useState(0);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
      <AutoSaveBanner />

      {forms.map((form, idx) => (
        <CountryAccordionItem
          key={idx}
          form={form}
          expanded={expandedIdx === idx}
          onToggle={() => setExpandedIdx((i) => (i === idx ? -1 : idx))}
          onUpdate={(k, v) => onUpdate(idx, k, v)}
          onRemove={forms.length > 1 ? () => onRemove(idx) : undefined}
        />
      ))}

      {/* Footer */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2, pt: 0.5 }}>
        <Box
          component="button"
          onClick={() => { onAdd(); setExpandedIdx(forms.length); }}
          sx={{
            all: 'unset', cursor: 'pointer',
            display: 'inline-flex', alignItems: 'center', gap: 1,
            height: 36, px: 1.75, borderRadius: '6px',
            border: (t) => `1px dashed ${t.palette.border.main}`,
            fontSize: 13, fontWeight: 500, color: 'text.secondary',
            transition: 'border-color .1s, background .1s, color .1s',
            '&:hover': { borderColor: 'text.secondary', backgroundColor: 'surface.muted', color: 'text.primary' },
          }}
        >
          <Plus size={16} /> Add another country

        </Box>
        <Button variant="primary" rightIcon={<ArrowRight size={16} />} onClick={onNextTab}>
          Next: Billing
        </Button>
      </Box>
    </Box>
  );
}

function CountryAccordionItem({ form, expanded, onToggle, onUpdate, onRemove }: {
  form: CountryForm;
  expanded: boolean;
  onToggle: () => void;
  onUpdate: <K extends keyof CountryForm>(k: K, v: CountryForm[K]) => void;
  onRemove?: () => void;
}) {
  const flag  = COUNTRY_FLAG[form.country] ?? '';
  const label = form.country || 'New country';

  return (
    <Box sx={{
      backgroundColor: 'surface.main',
      border: (t) => `1px solid ${t.palette.border.main}`,
      borderRadius: '12px', overflow: 'hidden',
    }}>
      {/* Accordion header */}
      <Box component="button" type="button" onClick={onToggle} sx={{
        all: 'unset', cursor: 'pointer', width: '100%', boxSizing: 'border-box',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        px: 3, py: 2,
        borderBottom: expanded ? (t) => `1px solid ${t.palette.border.subtle}` : 'none',
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {flag && <Typography sx={{ fontSize: 15, lineHeight: 1 }}>{flag}</Typography>}
          <Typography sx={{ fontSize: 14.5, fontWeight: 600, color: form.country ? 'text.primary' : 'text.secondary' }}>
            {label}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          {onRemove && (
            <Box
              component="button" type="button"
              onClick={(e: React.MouseEvent) => { e.stopPropagation(); onRemove(); }}
              sx={{
                all: 'unset', cursor: 'pointer', width: 24, height: 24,
                display: 'grid', placeItems: 'center', borderRadius: '4px',
                color: 'text.secondary',
                '&:hover': { backgroundColor: '#fee2e2', color: '#ef4444' },
              }}
            >
              <X size={14} />
            </Box>
          )}
          <Box sx={{
            color: 'text.secondary',
            transform: expanded ? 'rotate(0deg)' : 'rotate(-90deg)',
            transition: 'transform .2s',
            display: 'flex', alignItems: 'center',
          }}>
            <ChevronDown size={16} />
          </Box>
        </Box>
      </Box>

      {/* Accordion body */}
      <Collapse in={expanded}>
        <Box sx={{ p: 2.5, display: 'flex', flexDirection: 'column', gap: 2.5 }}>
          <SectionCard title="General" subtitle="Where this country runs and how subscriptions flow.">
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
              <Select
                label="Country" required placeholder="Select country"
                options={COUNTRY_OPTS} value={form.country}
                description="The country this configuration applies to."
                onChange={(e) => onUpdate('country', e.target.value as string)}
              />
              <Select
                label="Subscription flow" required
                options={SUB_FLOW_OPTS} value={form.subscriptionFlow}
                description="How users opt in. Determines what consent screens appear."
                onChange={(e) => onUpdate('subscriptionFlow', e.target.value as string)}
              />
            </Box>
            <Select
              label="Operator firewall"
              options={FIREWALL_OPTS} value={form.operatorFirewall}
              description="Carrier-side fraud / spam protection layer."
              onChange={(e) => onUpdate('operatorFirewall', e.target.value as string)}
            />
            <ToggleRow
              label="Session recording"
              description="Record landing-page sessions for fraud investigation. Stored for 30 days."
              checked={form.sessionRecording}
              onChange={(v) => onUpdate('sessionRecording', v)}
            />
          </SectionCard>

          <SectionCard title="Security" subtitle="Layered checks that block fraudulent traffic from converting.">
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
              <Select
                label="Anti-fraud provider"
                options={AF_OPTS} value={form.antiFraudProvider}
                onChange={(e) => onUpdate('antiFraudProvider', e.target.value as string)}
              />
              <Select
                label="Action when flagged"
                options={AF_ACTION_OPTS} value={form.actionWhenFlagged}
                description="What the system does when the provider flags traffic."
                onChange={(e) => onUpdate('actionWhenFlagged', e.target.value as string)}
              />
            </Box>
            <ToggleRow
              label="Check on landing-page load"
              description="Score the visitor before they see the subscribe button. Adds ~80 ms."
              checked={form.checkOnLanding}
              onChange={(v) => onUpdate('checkOnLanding', v)}
            />
            <ToggleRow
              label="Verify via Anti-Fraud API"
              description="Server-side re-check at the moment of subscription. Stronger but adds latency."
              checked={form.verifyViaAF}
              onChange={(v) => onUpdate('verifyViaAF', v)}
            />
          </SectionCard>
        </Box>
      </Collapse>
    </Box>
  );
}

// ─── Billing tab ──────────────────────────────────────────────────────────────

function BillingTabContent({ countryForms, onUpdateCountry, onBackTab, onNextTab }: {
  countryForms:     CountryForm[];
  onUpdateCountry:  (idx: number, k: keyof CountryForm, v: CountryForm[keyof CountryForm]) => void;
  onBackTab:        () => void;
  onNextTab:        () => void;
}) {
  const [expandedIdx, setExpandedIdx] = useState(0);
  const hasCountries = countryForms.some((f) => f.country);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
      {!hasCountries ? (
        <Box sx={{
          borderRadius: '8px', border: (t) => `1px dashed ${t.palette.border.main}`,
          py: 4, textAlign: 'center',
        }}>
          <Typography sx={{ fontSize: 13, color: 'text.secondary' }}>
            No countries configured. Go back to the Country tab to add countries.
          </Typography>
        </Box>
      ) : (
        countryForms.map((cf, idx) => !cf.country ? null : (
          <CountryBillingSection
            key={cf.country}
            countryName={cf.country}
            flag={COUNTRY_FLAG[cf.country] ?? '🌍'}
            headerEnrichment={cf.headerEnrichment}
            onUpdateHE={(v) => onUpdateCountry(idx, 'headerEnrichment', v)}
            expanded={expandedIdx === idx}
            onToggle={() => setExpandedIdx((i) => (i === idx ? -1 : idx))}
          />
        ))
      )}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2, pt: 0.5 }}>
        <Button variant="ghost" leftIcon={<ArrowLeft size={16} />} onClick={onBackTab}>
          Back to Country
        </Button>
        <Button variant="primary" rightIcon={<ArrowRight size={16} />} onClick={onNextTab}>
          Next: Theme
        </Button>
      </Box>
    </Box>
  );
}

function CountryBillingSection({ countryName, flag, headerEnrichment, onUpdateHE, expanded, onToggle }: {
  countryName:       string;
  flag:              string;
  headerEnrichment:  boolean;
  onUpdateHE:        (v: boolean) => void;
  expanded:          boolean;
  onToggle:          () => void;
}) {
  const [operators, setOperators] = useState<OperatorForm[]>([freshOperator()]);
  const [expandedOpIdx, setExpandedOpIdx] = useState(0);
  const opRefs = useRef<(HTMLDivElement | null)[]>([]);
  const pendingScrollIdx = useRef<number | null>(null);

  useEffect(() => {
    if (pendingScrollIdx.current !== null) {
      opRefs.current[pendingScrollIdx.current]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      pendingScrollIdx.current = null;
    }
  }, [operators.length]);

  const updateOp = (idx: number, patch: Partial<OperatorForm>) =>
    setOperators((prev) => prev.map((o, i) => (i === idx ? { ...o, ...patch } : o)));

  const removeOp = (idx: number) => {
    setOperators((prev) => prev.filter((_, i) => i !== idx));
    setExpandedOpIdx((i) => (i === idx ? Math.max(0, idx - 1) : i > idx ? i - 1 : i));
  };

  return (
    <Box sx={{
      border: (t) => `1px solid ${t.palette.border.main}`,
      borderRadius: '12px', overflow: 'hidden',
      backgroundColor: 'surface.main',
    }}>
      <Box component="button" type="button" onClick={onToggle} sx={{
        all: 'unset', cursor: 'pointer', width: '100%', boxSizing: 'border-box',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        px: 3, py: 2,
        borderBottom: expanded ? (t) => `1px solid ${t.palette.border.subtle}` : 'none',
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography sx={{ fontSize: 15, lineHeight: 1 }}>{flag}</Typography>
          <Typography sx={{ fontSize: 14.5, fontWeight: 600, color: 'text.primary' }}>
            {countryName} · billing channel
          </Typography>
        </Box>
        <Box sx={{ color: 'text.secondary', transform: expanded ? 'rotate(0deg)' : 'rotate(-90deg)', transition: 'transform .2s', display: 'flex', alignItems: 'center' }}>
          <ChevronDown size={16} />
        </Box>
      </Box>
      <Collapse in={expanded}>
        <Box sx={{ p: 2.5, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          <ToggleRow
            label="Header enrichment (HE)"
            description="Carrier passes the subscriber's MSISDN in HTTP headers — enables one-tap subscribe."
            checked={headerEnrichment}
            onChange={onUpdateHE}
          />
          {operators.map((op, idx) => (
            <OperatorAccordionItem
              key={idx}
              form={op}
              expanded={expandedOpIdx === idx}
              onToggle={() => setExpandedOpIdx((i) => (i === idx ? -1 : idx))}
              onChange={(patch) => updateOp(idx, patch)}
              onRemove={operators.length > 1 ? () => removeOp(idx) : undefined}
              containerRef={(el) => { opRefs.current[idx] = el; }}
            />
          ))}
          <Box
            component="button"
            onClick={() => {
              const newIdx = operators.length;
              pendingScrollIdx.current = newIdx;
              setExpandedOpIdx(newIdx);
              setOperators((prev) => [...prev, freshOperator()]);
            }}
            sx={{
              all: 'unset', cursor: 'pointer', width: '100%', boxSizing: 'border-box',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1,
              py: 1.25, borderRadius: '8px',
              border: (t) => `1px dashed ${t.palette.border.main}`,
              fontSize: 13, fontWeight: 500, color: 'text.secondary',
              transition: 'border-color .1s, background .1s, color .1s',
              '&:hover': { borderColor: 'text.secondary', backgroundColor: 'surface.muted', color: 'text.primary' },
            }}
          >
            <Plus size={16} /> Add another operator
          </Box>
        </Box>
      </Collapse>
    </Box>
  );
}

function OperatorAccordionItem({ form, expanded, onToggle, onChange, onRemove, containerRef }: {
  form: OperatorForm;
  expanded: boolean;
  onToggle: () => void;
  onChange: (p: Partial<OperatorForm>) => void;
  onRemove?: () => void;
  containerRef?: (el: HTMLDivElement | null) => void;
}) {
  return (
    <Box ref={containerRef} sx={{
      border: (t) => `1px solid ${t.palette.border.main}`,
      borderRadius: '10px', overflow: 'hidden',
      backgroundColor: 'surface.main',
    }}>
      <Box component="button" type="button" onClick={onToggle} sx={{
        all: 'unset', cursor: 'pointer', width: '100%', boxSizing: 'border-box',
        display: 'flex', alignItems: 'center', gap: 1.5,
        px: 2.5, py: 1.75,
        borderBottom: expanded ? (t) => `1px solid ${t.palette.border.subtle}` : 'none',
        transition: 'background .1s',
        '&:hover': { backgroundColor: 'surface.muted' },
      }}>
        {/* Status dot */}
        <Box sx={{
          width: 8, height: 8, borderRadius: '50%', flexShrink: 0,
          backgroundColor: form.operatorStatus ? '#22c55e' : '#a1a1aa',
        }} />
        {/* Operator name */}
        <Typography sx={{ fontSize: 13.5, fontWeight: 600, color: 'text.primary', flex: 1, textAlign: 'left' }}>
          {form.operator || 'New operator'}
        </Typography>
        {/* Billing provider chip */}
        <Box sx={{
          px: 1.25, py: 0.4, borderRadius: '6px', flexShrink: 0,
          backgroundColor: '#f4f4f5', fontSize: 11.5, color: '#52525b', fontWeight: 500,
        }}>
          {form.billingProvider || 'No provider'}
        </Box>
        {/* Delete button */}
        {onRemove && (
          <Box
            component="button" type="button"
            onClick={(e: React.MouseEvent) => { e.stopPropagation(); onRemove(); }}
            sx={{
              all: 'unset', cursor: 'pointer', width: 24, height: 24, flexShrink: 0,
              display: 'grid', placeItems: 'center', borderRadius: '4px',
              color: 'text.secondary',
              '&:hover': { backgroundColor: '#fee2e2', color: '#ef4444' },
            }}
          >
            <X size={14} />
          </Box>
        )}
        {/* Chevron */}
        <Box sx={{
          color: 'text.secondary', flexShrink: 0,
          transform: expanded ? 'rotate(0deg)' : 'rotate(-90deg)',
          transition: 'transform .2s',
          display: 'flex', alignItems: 'center',
        }}>
          <ChevronDown size={15} />
        </Box>
      </Box>
      <Collapse in={expanded}>
        <Box sx={{ p: 2.5 }}>
          <OperatorBlock form={form} onChange={onChange} />
        </Box>
      </Collapse>
    </Box>
  );
}

function OperatorBlock({ form, onChange }: { form: OperatorForm; onChange: (p: Partial<OperatorForm>) => void }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
      {/* Basic */}
      <SectionCard title="Basic" subtitle="The operator and integration this billing setup applies to.">
        <Select label="Operator" required options={OPERATOR_OPTS} value={form.operator}
          onChange={(e) => onChange({ operator: e.target.value as string })} />

        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, pt: 1.5, mt: 0.5, borderTop: (t) => `1px solid ${t.palette.border.subtle}` }}>
          <Select label="Billing provider" options={BILL_PROV_OPTS} value={form.billingProvider}
            description="Backend integration handling the billing transactions."
            onChange={(e) => onChange({ billingProvider: e.target.value as string })} />
          <Select label="Ad provider" options={AD_PROV_OPTS} value={form.adProvider}
            onChange={(e) => onChange({ adProvider: e.target.value as string })} />
          <Select label="Aggregator" placeholder="Select aggregator" options={AGG_OPTS} value={form.aggregator}
            description="Intermediary between you and the operator, if any."
            onChange={(e) => onChange({ aggregator: e.target.value as string })} />
          <Select label="Link position" placeholder="Select position" options={LINK_POS_OPTS} value={form.linkPosition}
            onChange={(e) => onChange({ linkPosition: e.target.value as string })} />
        </Box>

        <ToggleRow
          label="Operator status"
          description="Turn off to pause billing through this operator without removing the configuration."
          checked={form.operatorStatus}
          onChange={(v) => onChange({ operatorStatus: v })}
        />

        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, pt: 1.5, mt: 0.5, borderTop: (t) => `1px solid ${t.palette.border.subtle}` }}>
          <Input label="Free trial (days)" placeholder="0" value={form.freeTrial}
            description="Days before billing begins. 0 = no trial."
            onChange={(e) => onChange({ freeTrial: (e.target as HTMLInputElement).value })} />
          <Input label="Default SMS Sender ID" placeholder="e.g. PREMIUM" value={form.smsSenderId}
            onChange={(e) => onChange({ smsSenderId: (e.target as HTMLInputElement).value })} />
          <Select label="Firewall ID" options={FW_ID_OPTS} value={form.firewallId}
            onChange={(e) => onChange({ firewallId: e.target.value as string })} />
          <Select label="Billing mode" options={BILLING_MODE_OPTS} value={form.billingMode}
            onChange={(e) => onChange({ billingMode: e.target.value as string })} />
        </Box>

        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, pt: 1.5, mt: 0.5, borderTop: (t) => `1px solid ${t.palette.border.subtle}` }}>
          <MiniToggleRow label={'Show "Unsubscribe" popup'} checked={form.showUnsub} onChange={(v) => onChange({ showUnsub: v })} />
          <MiniToggleRow label={'Show "My Account" button'} checked={form.showMyAccount} onChange={(v) => onChange({ showMyAccount: v })} />
          <MiniToggleRow label={'Show "Wrong number" option'} checked={form.showWrongNumber} onChange={(v) => onChange({ showWrongNumber: v })} />
          <MiniToggleRow label="Open keypad by default" checked={form.openKeypad} onChange={(v) => onChange({ openKeypad: v })} />
        </Box>
      </SectionCard>

      {/* Sender IDs */}
      <SectionCard title="Sender IDs" subtitle="SMS sender identities used by this operator.">
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          {form.senderIds.map((row, i) => (
            <Box key={i} sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
              <Input
                label={i === 0 ? 'Sender ID' : undefined}
                placeholder="Enter Sender ID" value={row.id}
                onChange={(e) => {
                  const next = form.senderIds.map((r, j) => j === i ? { ...r, id: (e.target as HTMLInputElement).value } : r);
                  onChange({ senderIds: next });
                }}
              />
              <Select
                label={i === 0 ? 'Type' : undefined}
                placeholder="Select type" options={SENDER_TYPE_OPTS} value={row.type}
                onChange={(e) => {
                  const next = form.senderIds.map((r, j) => j === i ? { ...r, type: e.target.value as string } : r);
                  onChange({ senderIds: next });
                }}
              />
            </Box>
          ))}
          <InlineAddLink onClick={() => onChange({ senderIds: [...form.senderIds, { id: '', type: '' }] })}>
            <Plus size={14} /> Add Sender ID
          </InlineAddLink>
        </Box>
      </SectionCard>

      {/* Consent & PIN */}
      <SectionCard title="Consent & PIN" subtitle="How users confirm their subscription via PIN.">
        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
          <Select label="Channel type" placeholder="Select channel type" options={CH_TYPE_OPTS} value={form.channelType}
            onChange={(e) => onChange({ channelType: e.target.value as string })} />
          <Select label="Consent gateway" placeholder="Select gateway" options={CONSENT_GW_OPTS} value={form.consentGateway}
            onChange={(e) => onChange({ consentGateway: e.target.value as string })} />
          <Select label="PIN length" options={PIN_LEN_OPTS} value={form.pinLength}
            onChange={(e) => onChange({ pinLength: e.target.value as string })} />
          <Select label="Resend timer" options={RESEND_OPTS} value={form.resendTimer}
            onChange={(e) => onChange({ resendTimer: e.target.value as string })} />
        </Box>
        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, pt: 1.5, mt: 0.5, borderTop: (t) => `1px solid ${t.palette.border.subtle}` }}>
          <MiniToggleRow label="Auto-fill PIN" description="Prefill from SMS if the browser supports it." checked={form.autofillPin} onChange={(v) => onChange({ autofillPin: v })} />
          <MiniToggleRow label="Show resend button" description="Let users request a new PIN." checked={form.showResend} onChange={(v) => onChange({ showResend: v })} />
          <MiniToggleRow label="Auto-verify" description="Submit when PIN length matches." checked={form.autoVerify} onChange={(v) => onChange({ autoVerify: v })} />
          <MiniToggleRow label="Numeric PIN" description="Restrict PIN input to numbers." checked={form.numericPin} onChange={(v) => onChange({ numericPin: v })} />
          <MiniToggleRow label="Consent checkbox" description="Require explicit consent." checked={form.consentCheckbox} onChange={(v) => onChange({ consentCheckbox: v })} />
        </Box>
      </SectionCard>

      {/* Pricing setup */}
      <SectionCard title="Pricing setup" subtitle="What the carrier charges the end-user. Client payouts are set later in Step 3.">
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Select
            label="Currency"
            options={CURRENCY_OPTS}
            value={form.pricingCurrency}
            onChange={(e) => onChange({ pricingCurrency: e.target.value as string })}
          />
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            <PricingTierRow
              label="Daily" summary={`${form.pricingCurrency} ${form.daily.price} / day`} tier={form.daily}
              onToggle={(v) => onChange({ daily: { ...form.daily, enabled: v } })}
              onChangeTier={(patch) => onChange({ daily: { ...form.daily, ...patch } })}
            />
            <PricingTierRow
              label="Weekly" summary={`${form.pricingCurrency} ${form.weekly.price} / week`} tier={form.weekly}
              onToggle={(v) => onChange({ weekly: { ...form.weekly, enabled: v } })}
              onChangeTier={(patch) => onChange({ weekly: { ...form.weekly, ...patch } })}
            />
            <PricingTierRow
              label="Monthly" summary={`${form.pricingCurrency} ${form.monthly.price} / month`} tier={form.monthly}
              onToggle={(v) => onChange({ monthly: { ...form.monthly, enabled: v } })}
              onChangeTier={(patch) => onChange({ monthly: { ...form.monthly, ...patch } })}
            />
            <ExceptionsRow
              enabled={form.exceptionsEnabled}
              exceptions={form.exceptions}
              onToggle={(v) => onChange({ exceptionsEnabled: v })}
              onAddException={() => onChange({ exceptions: [...form.exceptions, { price: '', cycle: '' }] })}
              onUpdateException={(idx, patch) => {
                const next = form.exceptions.map((e, i) => i === idx ? { ...e, ...patch } : e);
                onChange({ exceptions: next });
              }}
              onRemoveException={(idx) => onChange({ exceptions: form.exceptions.filter((_, i) => i !== idx) })}
            />
          </Box>
        </Box>
      </SectionCard>
    </Box>
  );
}

function PricingTierRow({ label, summary, tier, onToggle, onChangeTier }: {
  label: string; summary: string; tier: PriceTier;
  onToggle: (v: boolean) => void;
  onChangeTier: (patch: Partial<PriceTier>) => void;
}) {
  const updateKeyword = (i: number, patch: Partial<KeywordRow>) => {
    const next = tier.keywords.map((r, j) => j === i ? { ...r, ...patch } : r);
    onChangeTier({ keywords: next });
  };

  return (
    <Box sx={{ borderRadius: '8px', border: (t) => `1px solid ${t.palette.border.main}` }}>
      <Box component="label" sx={{ display: 'flex', alignItems: 'center', gap: 1.5, px: 2, py: 1.5, cursor: 'pointer' }}>
        <Box
          component="input" type="checkbox"
          checked={tier.enabled}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => onToggle(e.target.checked)}
          sx={{ width: 16, height: 16, borderRadius: '4px', cursor: 'pointer', accentColor: '#18181b' }}
        />
        <Typography sx={{ fontSize: 13, fontWeight: 600, color: 'text.primary' }}>{label}</Typography>
        <Typography sx={{ ml: 'auto', fontSize: 12, color: 'text.secondary', fontVariantNumeric: 'tabular-nums' }}>
          {summary}
        </Typography>
      </Box>
      {tier.enabled && (
        <Box sx={{ px: 2, pb: 2, pt: 1.5, borderTop: (t) => `1px solid ${t.palette.border.subtle}`, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          <Input label="Price" placeholder="0.00" value={tier.price}
            onChange={(e) => onChangeTier({ price: (e.target as HTMLInputElement).value })} />
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1.5 }}>
            <Input label="OTP-in code" placeholder="e.g. 3030" value={tier.otpIn}
              onChange={(e) => onChangeTier({ otpIn: (e.target as HTMLInputElement).value })} />
            <Input label="OTP-out code" placeholder="e.g. 3030" value={tier.otpOut}
              onChange={(e) => onChangeTier({ otpOut: (e.target as HTMLInputElement).value })} />
          </Box>
          <Box>
            <Typography sx={{ fontSize: 12, fontWeight: 500, color: 'text.secondary', mb: 1 }}>Keywords</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {tier.keywords.map((row, i) => (
                <Box key={i} sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1.5 }}>
                  <Input
                    label={i === 0 ? 'Keyword' : undefined}
                    placeholder="e.g. PREMIUM" value={row.keyword}
                    onChange={(e) => updateKeyword(i, { keyword: (e.target as HTMLInputElement).value })}
                  />
                  <Select
                    label={i === 0 ? 'Keyword type' : undefined}
                    options={KW_TYPE_OPTS} value={row.ktype}
                    onChange={(e) => updateKeyword(i, { ktype: e.target.value as string })}
                  />
                  <Select
                    label={i === 0 ? 'Method' : undefined}
                    placeholder="Select method" options={KW_METHOD_OPTS} value={row.method}
                    onChange={(e) => updateKeyword(i, { method: e.target.value as string })}
                  />
                  <Select
                    label={i === 0 ? 'Language' : undefined}
                    options={LANG_OPTS} value={row.lang}
                    onChange={(e) => updateKeyword(i, { lang: e.target.value as string })}
                  />
                </Box>
              ))}
              <InlineAddLink onClick={() => onChangeTier({ keywords: [...tier.keywords, { keyword: '', ktype: 'Subscribe / Stop / Help', method: '', lang: 'English' }] })}>
                <Plus size={14} /> Add keyword
              </InlineAddLink>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
}

function ExceptionsRow({ enabled, exceptions, onToggle, onAddException, onUpdateException, onRemoveException }: {
  enabled: boolean;
  exceptions: ExceptionTier[];
  onToggle: (v: boolean) => void;
  onAddException: () => void;
  onUpdateException: (idx: number, patch: Partial<ExceptionTier>) => void;
  onRemoveException: (idx: number) => void;
}) {
  return (
    <Box sx={{ borderRadius: '8px', border: (t) => `1px solid ${t.palette.border.main}` }}>
      <Box component="label" sx={{ display: 'flex', alignItems: 'center', gap: 1.5, px: 2, py: 1.5, cursor: 'pointer' }}>
        <Box
          component="input" type="checkbox"
          checked={enabled}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => onToggle(e.target.checked)}
          sx={{ width: 16, height: 16, borderRadius: '4px', cursor: 'pointer', accentColor: '#18181b' }}
        />
        <Typography sx={{ fontSize: 13, fontWeight: 600, color: 'text.primary' }}>Exceptions</Typography>
        <Typography sx={{ ml: 'auto', fontSize: 12, color: 'text.secondary' }}>
          {exceptions.length > 0
            ? `${exceptions.length} exception${exceptions.length !== 1 ? 's' : ''}`
            : 'Custom pricing overrides'}
        </Typography>
      </Box>
      {enabled && (
        <Box sx={{ px: 2, pb: 2, pt: 1.5, borderTop: (t) => `1px solid ${t.palette.border.subtle}`, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          {exceptions.map((ex, i) => (
            <Box key={i} sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: 1.5, alignItems: 'flex-end' }}>
              <Input
                label={i === 0 ? 'Price' : undefined}
                placeholder="0.00" value={ex.price}
                onChange={(e) => onUpdateException(i, { price: (e.target as HTMLInputElement).value })}
              />
              <Input
                label={i === 0 ? 'Billing cycle' : undefined}
                placeholder="e.g. 7 days" value={ex.cycle}
                onChange={(e) => onUpdateException(i, { cycle: (e.target as HTMLInputElement).value })}
              />
              <Box
                component="button" type="button"
                onClick={() => onRemoveException(i)}
                sx={{
                  all: 'unset', cursor: 'pointer',
                  width: 32, height: 32, display: 'grid', placeItems: 'center',
                  borderRadius: '6px', color: 'text.secondary',
                  '&:hover': { backgroundColor: '#fee2e2', color: '#ef4444' },
                }}
              >
                <X size={14} />
              </Box>
            </Box>
          ))}
          <InlineAddLink onClick={onAddException}>
            <Plus size={14} /> Add exception
          </InlineAddLink>
        </Box>
      )}
    </Box>
  );
}

// ─── Theme tab ────────────────────────────────────────────────────────────────

function ColorControl({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
      <Typography sx={{ fontSize: 12, fontWeight: 500, color: 'text.secondary' }}>{label}</Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Box sx={{ position: 'relative', width: 28, height: 28, borderRadius: '6px', border: '1px solid #e4e4e7', overflow: 'hidden', flexShrink: 0, backgroundColor: value }}>
          <Box
            component="input" type="color" value={value}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
            sx={{ position: 'absolute', inset: -4, width: 'calc(100% + 8px)', height: 'calc(100% + 8px)', opacity: 0, cursor: 'pointer' }}
          />
        </Box>
        <Box
          component="input" type="text" value={value}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
          sx={{
            flex: 1, height: 28, border: '1px solid #e4e4e7', borderRadius: '6px',
            px: '8px', fontSize: 12, fontFamily: 'monospace', color: 'text.primary', backgroundColor: 'surface.main',
            outline: 'none', '&:focus': { borderColor: '#6366f1', outline: '2px solid rgba(99,102,241,0.2)' },
          }}
        />
      </Box>
    </Box>
  );
}

function TextareaControl({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
      <Typography sx={{ fontSize: 12, fontWeight: 500, color: 'text.secondary' }}>{label}</Typography>
      <Box
        component="textarea" value={value}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => onChange(e.target.value)}
        rows={3}
        sx={{
          border: '1px solid #e4e4e7', borderRadius: '6px',
          px: '8px', py: '6px', fontSize: 12.5, color: 'text.primary', backgroundColor: 'surface.main',
          outline: 'none', resize: 'vertical', fontFamily: 'inherit', lineHeight: 1.5,
          '&:focus': { borderColor: '#6366f1', outline: '2px solid rgba(99,102,241,0.2)' },
        }}
      />
    </Box>
  );
}

function TextControl({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
      <Typography sx={{ fontSize: 12, fontWeight: 500, color: 'text.secondary' }}>{label}</Typography>
      <Box
        component="input" type="text" value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
        sx={{
          height: 32, border: '1px solid #e4e4e7', borderRadius: '6px',
          px: '8px', fontSize: 12.5, color: 'text.primary', backgroundColor: 'surface.main',
          outline: 'none', '&:focus': { borderColor: '#6366f1', outline: '2px solid rgba(99,102,241,0.2)' },
        }}
      />
    </Box>
  );
}

function NumberControl({ label, value, min, max, onChange }: {
  label: string; value: number; min?: number; max?: number; onChange: (v: number) => void;
}) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
      <Typography sx={{ fontSize: 12, fontWeight: 500, color: 'text.secondary' }}>{label}</Typography>
      <Box
        component="input" type="number" value={value}
        min={min} max={max}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(Number(e.target.value))}
        sx={{
          height: 32, border: '1px solid #e4e4e7', borderRadius: '6px',
          px: '8px', fontSize: 12.5, color: 'text.primary', backgroundColor: 'surface.main',
          outline: 'none', '&:focus': { borderColor: '#6366f1', outline: '2px solid rgba(99,102,241,0.2)' },
        }}
      />
    </Box>
  );
}

const FONT_WEIGHT_OPTS = [
  { value: 400, label: 'Regular' },
  { value: 500, label: 'Medium' },
  { value: 600, label: 'Semibold' },
  { value: 700, label: 'Bold' },
] as const;

function FontWeightControl({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
      <Typography sx={{ fontSize: 12, fontWeight: 500, color: 'text.secondary' }}>Font weight</Typography>
      <Box
        component="select" value={value}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => onChange(Number(e.target.value))}
        sx={{
          height: 32, border: '1px solid #e4e4e7', borderRadius: '6px',
          px: '8px', fontSize: 12.5, color: 'text.primary', backgroundColor: 'surface.main',
          outline: 'none', cursor: 'pointer',
          '&:focus': { borderColor: '#6366f1', outline: '2px solid rgba(99,102,241,0.2)' },
        }}
      >
        {FONT_WEIGHT_OPTS.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </Box>
    </Box>
  );
}

export function PropertyEditor({ elId, channel, themeState, onUpdateTheme, onClearSelection }: {
  elId: ThemeElementId;
  channel: 'otp' | 'voice';
  themeState: ThemeState;
  onUpdateTheme: (channel: 'otp' | 'voice', id: ThemeElementId, patch: Record<string, unknown>) => void;
  onClearSelection?: () => void;
}) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const t = themeState[channel] as any;
  const kind = ELEMENT_KIND[elId];
  const up = (patch: Record<string, unknown>) => onUpdateTheme(channel, elId, patch);

  return (
    <Box sx={{
      backgroundColor: 'surface.main',
      border: (th) => `1px solid ${th.palette.border.main}`,
      borderRadius: '12px',
      boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
    }}>
      <Box sx={{
        px: 3, py: 2,
        borderBottom: (th) => `1px solid ${th.palette.border.subtle}`,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <Typography sx={{ fontSize: 13.5, fontWeight: 600, color: 'text.primary' }}>
          {ELEMENT_LABEL[elId]}
        </Typography>
        {onClearSelection && (
          <Box component="button" onClick={onClearSelection} sx={{
            all: 'unset', cursor: 'pointer',
            fontSize: 12, color: 'text.secondary',
            '&:hover': { color: 'text.primary', textDecoration: 'underline' },
          }}>
            Clear selection
          </Box>
        )}
      </Box>
      <Box sx={{ px: 3, py: 2.5, display: 'flex', flexDirection: 'column', gap: 2 }}>
        {kind === 'background' && (
          <>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
              <Typography sx={{ fontSize: 12, fontWeight: 500, color: 'text.secondary' }}>Background image</Typography>
              <Box component="label" sx={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                height: 40, border: '1px dashed #e4e4e7', borderRadius: '6px',
                cursor: 'pointer', fontSize: 12.5, color: 'text.secondary',
                transition: 'border-color .1s, color .1s',
                '&:hover': { borderColor: '#6366f1', color: 'text.primary' },
              }}>
                Upload background image
                <Box component="input" type="file" accept="image/*" sx={{ display: 'none' }}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const file = e.target.files?.[0];
                    if (file) up({ backgroundImage: URL.createObjectURL(file) });
                  }}
                />
              </Box>
            </Box>
            <ColorControl label="Background color" value={t.background.color} onChange={(v) => up({ color: v })} />
          </>
        )}
        {kind === 'image' && (
          <>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
              <Typography sx={{ fontSize: 12, fontWeight: 500, color: 'text.secondary' }}>Logo image</Typography>
              <Box component="label" sx={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                height: 40, border: '1px dashed #e4e4e7', borderRadius: '6px',
                cursor: 'pointer', fontSize: 12.5, color: 'text.secondary',
                transition: 'border-color .1s, color .1s',
                '&:hover': { borderColor: '#6366f1', color: 'text.primary' },
              }}>
                Upload image
                <Box component="input" type="file" accept="image/*" sx={{ display: 'none' }}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const file = e.target.files?.[0];
                    if (file) up({ src: URL.createObjectURL(file) });
                  }}
                />
              </Box>
            </Box>
            <NumberControl label="Size (px)" value={t.logo.size} min={32} max={96} onChange={(v) => up({ size: v })} />
          </>
        )}
        {kind === 'text' && (
          <>
            <TextareaControl label="Text" value={t[elId].text} onChange={(v) => up({ text: v })} />
            <ColorControl label="Color" value={t[elId].color} onChange={(v) => up({ color: v })} />
            <NumberControl label="Font size (px)" value={t[elId].fontSize} min={10} max={48} onChange={(v) => up({ fontSize: v })} />
            {'fontWeight' in t[elId] && (
              <FontWeightControl value={t[elId].fontWeight} onChange={(v) => up({ fontWeight: v })} />
            )}
          </>
        )}
        {kind === 'phoneInput' && (
          <>
            <TextControl label="Flag emoji" value={t.phoneInput.flag} onChange={(v) => up({ flag: v })} />
            <TextControl label="Country code" value={t.phoneInput.countryCode} onChange={(v) => up({ countryCode: v })} />
            <TextControl label="Placeholder" value={t.phoneInput.placeholder} onChange={(v) => up({ placeholder: v })} />
            <ColorControl label="Border color" value={t.phoneInput.borderColor} onChange={(v) => up({ borderColor: v })} />
            <ColorControl label="Fill color" value={t.phoneInput.fillColor} onChange={(v) => up({ fillColor: v })} />
            <ColorControl label="Text color" value={t.phoneInput.textColor} onChange={(v) => up({ textColor: v })} />
            <NumberControl label="Corner radius (px)" value={t.phoneInput.radius} min={0} max={24} onChange={(v) => up({ radius: v })} />
          </>
        )}
        {kind === 'button' && (
          <>
            <TextControl label="Label" value={t.button.text} onChange={(v) => up({ text: v })} />
            <ColorControl label="Background" value={t.button.bgColor} onChange={(v) => up({ bgColor: v })} />
            <ColorControl label="Text color" value={t.button.textColor} onChange={(v) => up({ textColor: v })} />
            <NumberControl label="Corner radius (px)" value={t.button.radius} min={0} max={24} onChange={(v) => up({ radius: v })} />
          </>
        )}
        {kind === 'link' && (
          <>
            <TextControl label="Label" value={t.link.text} onChange={(v) => up({ text: v })} />
            <ColorControl label="Color" value={t.link.color} onChange={(v) => up({ color: v })} />
          </>
        )}
      </Box>
    </Box>
  );
}

function ThemeTabContent({ form, onUpdate, defaultLang, onLangChange, editorOpen, channel, onCloseEditor, onOpenEditor, themeState, selectedEl, onSelectEl, onUpdateTheme }: {
  form: ThemeForm;
  onUpdate: <K extends keyof ThemeForm>(k: K, v: ThemeForm[K]) => void;
  defaultLang: string;
  onLangChange: (v: string) => void;
  editorOpen: boolean;
  channel: 'otp' | 'voice';
  onCloseEditor: () => void;
  onOpenEditor: () => void;
  themeState: ThemeState | null;
  selectedEl: ThemeElementId | null;
  onSelectEl: ((id: ThemeElementId | null) => void) | null;
  onUpdateTheme: ((channel: 'otp' | 'voice', id: ThemeElementId, patch: Record<string, unknown>) => void) | null;
}) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
      <SectionCard title="Theme settings" subtitle="Service-level theme controls. Per-element styling is below.">
        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
          <Box>
            <Select label="Default language" options={LANG_OPTS} value={defaultLang}
              onChange={(e) => onLangChange(e.target.value as string)} />
            <InlineAddLink>
              <Plus size={14} style={{ marginTop: 6 }} /> Add secondary language
            </InlineAddLink>
          </Box>
          <Select label="Theme preset" options={THEME_PRESET_OPTS} value={form.themePreset}
            onChange={(e) => onUpdate('themePreset', e.target.value as string)} />
        </Box>
        <ToggleRow
          label="Custom disclaimers"
          description="Use your own legal copy instead of the carrier's default disclaimer."
          checked={form.customDisclaimers}
          onChange={(v) => onUpdate('customDisclaimers', v)}
        />
        <ToggleRow
          label="Intro page"
          description="Show a primer landing page before the subscription confirmation step."
          checked={form.introPage}
          onChange={(v) => onUpdate('introPage', v)}
        />
      </SectionCard>

      {editorOpen ? (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, fontSize: 13, color: 'text.secondary' }}>
              <Paintbrush2 size={16} />
              <span>Editing{' '}<strong style={{ color: 'inherit', fontWeight: 600 }}>{channel.toUpperCase()}</strong></span>
            </Box>
            <Box component="button" onClick={onCloseEditor} sx={{
              all: 'unset', cursor: 'pointer',
              fontSize: 12.5, fontWeight: 500, color: 'text.secondary',
              '&:hover': { color: 'text.primary', textDecoration: 'underline' },
            }}>Close editor</Box>
          </Box>

          {selectedEl && themeState && onUpdateTheme ? (
            <PropertyEditor
              elId={selectedEl}
              channel={channel}
              themeState={themeState}
              onUpdateTheme={onUpdateTheme}
              onClearSelection={onSelectEl ? () => onSelectEl(null) : undefined}
            />
          ) : (
            <Box sx={{
              backgroundColor: 'surface.main',
              border: (t) => `1px solid ${t.palette.border.main}`,
              borderRadius: '12px',
              px: 3, py: 5, textAlign: 'center',
              boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
            }}>
              <Box sx={{
                width: 40, height: 40, borderRadius: '50%',
                backgroundColor: '#f4f4f5', color: '#a1a1aa',
                display: 'grid', placeItems: 'center', mx: 'auto', mb: 1.5,
              }}>
                <MousePointerClick size={20} />
              </Box>
              <Typography sx={{ fontSize: 13.5, fontWeight: 500, color: 'text.primary' }}>
                Click an element in the preview
              </Typography>
              <Typography sx={{ fontSize: 12.5, color: 'text.secondary', mt: 0.5 }}>
                Pick any element in the phone mockup to edit its properties here.
              </Typography>
            </Box>
          )}
        </Box>
      ) : (
        <Box sx={{
          backgroundColor: 'surface.main',
          border: (t) => `1px solid ${t.palette.border.main}`,
          borderRadius: '12px',
          px: 3, py: 5, textAlign: 'center',
          boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
        }}>
          <Box sx={{
            width: 40, height: 40, borderRadius: '50%',
            backgroundColor: '#f4f4f5', color: '#a1a1aa',
            display: 'grid', placeItems: 'center', mx: 'auto', mb: 1.5,
          }}>
            <Paintbrush2 size={20} />
          </Box>
          <Typography sx={{ fontSize: 13.5, fontWeight: 500, color: 'text.primary' }}>Preview is closed</Typography>
          <Typography sx={{ fontSize: 12.5, color: 'text.secondary', mt: 0.5 }}>
            Open the preview to start editing elements.
          </Typography>
          <Button variant="primary" size="sm" leftIcon={<Paintbrush2 size={14} />} sx={{ mt: 2 }} onClick={onOpenEditor}>
            Open preview
          </Button>
        </Box>
      )}
    </Box>
  );
}
