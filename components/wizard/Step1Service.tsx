/**
 * Step 1 — Service. Captures the service-level identity:
 * name, client, category, premium toggle.
 *
 * Form state is held by the parent (the wizard page) so values survive
 * step navigation and feed into the Review step. This component is
 * controlled — pass values in, listen for changes via onChange.
 */

'use client';

import { useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Info, Upload, User } from 'lucide-react';

import { Card, Input, Select, Switch, Banner } from '../';

export interface Step1Values {
  name:     string;
  client:   string;
  category: string;
  premium:  boolean;
}

export interface Step1ServiceProps {
  values:   Step1Values;
  onChange: <K extends keyof Step1Values>(key: K, value: Step1Values[K]) => void;
}

const CLIENT_OPTIONS   = ['Hexum Client', 'Edie Games Co', 'SoundWave Media', 'BrightStar Apps', 'Pulse Studios', 'Apex Digital', 'MediaCo', 'GlobalPay Ltd', 'Northern Lights', 'Telco Direct'];
const CATEGORY_OPTIONS = ['Entertainment', 'Gaming', 'Music', 'Sports', 'Trivia', 'Lifestyle', 'Health & Fitness', 'Food & Drink', 'Education', 'Finance', 'Weather', 'Photo & Video', 'Travel', 'Kids', 'Utilities', 'Other'];

export function Step1Service({ values, onChange }: Step1ServiceProps) {
  const [iconPreview, setIconPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setIconPreview(ev.target?.result as string);
    reader.readAsDataURL(file);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
      <SectionHeader title="Service information" subtitle="Name the service and tag it for tracking. You can change these later." />

      <Card>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
          {/* Icon upload */}
          <Box>
            <Typography sx={{ fontSize: 13, fontWeight: 500, color: 'text.primary', mb: 1 }}>Icon</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box sx={{
                width: 64, height: 64, borderRadius: '9999px',
                backgroundColor: '#ede9fe', border: '1px solid #ddd6fe',
                display: 'grid', placeItems: 'center', color: '#7c3aed',
                overflow: 'hidden', flexShrink: 0,
              }}>
                {iconPreview
                  ? <Box component="img" src={iconPreview} alt="Service icon" sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  : <User size={24} />}
              </Box>
              <Box>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png,image/jpeg,image/svg+xml"
                  style={{ display: 'none' }}
                  onChange={handleFileChange}
                />
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box
                    component="button"
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    sx={{
                      all: 'unset', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 0.75,
                      height: 36, px: 1.5, borderRadius: 1,
                      border: (t) => `1px solid ${t.palette.border.main}`,
                      backgroundColor: 'surface.main', color: 'text.primary',
                      fontSize: 13, fontWeight: 500,
                      '&:hover': { backgroundColor: 'surface.muted' },
                    }}
                  >
                    <Upload size={14} />Upload image
                  </Box>
                  {iconPreview && (
                    <Box
                      component="button"
                      type="button"
                      onClick={() => { setIconPreview(null); if (fileInputRef.current) fileInputRef.current.value = ''; }}
                      sx={{ all: 'unset', cursor: 'pointer', fontSize: 12.5, color: 'text.secondary', '&:hover': { color: 'text.primary', textDecoration: 'underline' } }}
                    >
                      Remove
                    </Box>
                  )}
                </Box>
                <Typography sx={{ mt: 0.75, fontSize: 12, color: 'text.secondary' }}>PNG, JPG, or SVG. Max 2 MB.</Typography>
              </Box>
            </Box>
          </Box>

          <Input
            label="Service name"
            required
            description="Shown to your team and used in reports. Max 60 characters."
            placeholder="e.g. Premium VOD Package"
            value={values.name}
            onChange={(e) => onChange('name', (e.target as HTMLInputElement).value)}
          />
          <Select
            label="Client"
            required
            description="The brand or client this service runs under."
            placeholder="Select client"
            options={CLIENT_OPTIONS}
            value={values.client}
            onChange={(e) => onChange('client', e.target.value as string)}
          />
          <Select
            label="Category / Vertical"
            description="Categorize for reporting and filtering."
            placeholder="Select category"
            options={CATEGORY_OPTIONS}
            value={values.category}
            onChange={(e) => onChange('category', e.target.value as string)}
          />
          <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 2, pt: 1, borderTop: (t) => `1px solid ${t.palette.border.subtle}` }}>
            <Box>
              <Typography sx={{ fontSize: 13, fontWeight: 500, color: 'text.primary' }}>Premium</Typography>
              <Typography sx={{ fontSize: 12, color: 'text.secondary', mt: 0.25 }}>
                Limited number of users. Useful for VIP or invitation-only access.
              </Typography>
            </Box>
            <Switch checked={values.premium} onChange={(_e, v) => onChange('premium', v)} />
          </Box>
        </Box>
      </Card>

      <Banner tone="info" icon={<Info size={16} />}>
        <strong>These settings inherit to every offer in this service.</strong>{' '}
        Individual offers can override pricing, country list, or operator selection.
      </Banner>
    </Box>
  );
}

function SectionHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <Box>
      <Typography component="h2" sx={{ fontSize: 16, fontWeight: 600, color: 'text.primary' }}>{title}</Typography>
      <Typography sx={{ fontSize: 13, color: 'text.secondary', mt: 0.25 }}>{subtitle}</Typography>
    </Box>
  );
}
