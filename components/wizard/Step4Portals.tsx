/**
 * Step 4 — Portals. Configure the portal (URL + parameters) per
 * country/operator. The form mirrors the prototype's Step 4 design.
 */

'use client';

import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Asterisk, FileCode2 } from 'lucide-react';

import { Card, Input, Select, Switch, Button } from '../';

export interface Step4Values {
  country:     string;
  operator:    string;
  premium:     boolean;
  url:         string;
  parameters:  Array<{ name: string; value: string }>;
}

export interface Step4PortalsProps {
  values:   Step4Values;
  onChange: <K extends keyof Step4Values>(key: K, value: Step4Values[K]) => void;
}

const COUNTRY_OPTIONS  = ['UAE', 'KSA', 'Egypt', 'Kuwait'];
const OPERATOR_OPTIONS = ['Etisalat', 'du', 'STC', 'Mobily', 'Zain', 'Ooredoo', 'Vodafone', 'Orange'];
const VALUE_OPTIONS    = ['Static value', 'Dynamic from request', 'From offer config'];

export function Step4Portals({ values, onChange }: Step4PortalsProps) {
  const addParameter = () => onChange('parameters', [...values.parameters, { name: '', value: '' }]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Box>
        <Typography component="h2" sx={{ fontSize: 16, fontWeight: 600, color: 'text.primary' }}>Portal configuration</Typography>
        <Typography sx={{ fontSize: 13, color: 'text.secondary', mt: 0.25 }}>
          Configure where users land and the parameters passed to your portal.
        </Typography>
      </Box>

      <Card>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
          <Select
            label="Country"
            required
            placeholder="Select country"
            options={COUNTRY_OPTIONS}
            value={values.country}
            onChange={(e) => onChange('country', e.target.value as string)}
          />
          <Select
            label="Operator"
            required
            placeholder="Select operator"
            options={OPERATOR_OPTIONS}
            value={values.operator}
            onChange={(e) => onChange('operator', e.target.value as string)}
          />
          <Switch
            stacked
            checked={values.premium}
            onChange={(_e, v) => onChange('premium', v)}
            label="Premium Portal"
            description="Mark this portal as premium"
          />

          <Box sx={{ borderTop: (t) => `1px solid ${t.palette.border.subtle}` }} />

          <Input
            label="Portal URL"
            placeholder="https://example.com/subscribe"
            value={values.url}
            onChange={(e) => onChange('url', (e.target as HTMLInputElement).value)}
          />

          <Box sx={{ borderTop: (t) => `1px solid ${t.palette.border.subtle}` }} />

          {/* Parameters */}
          <Box>
            <Typography component="h3" sx={{ fontSize: 14, fontWeight: 600, color: 'text.primary', mb: 2 }}>Parameters</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {values.parameters.length === 0 ? (
                <Typography sx={{ fontSize: 12.5, color: 'text.secondary' }}>No parameters yet.</Typography>
              ) : (
                values.parameters.map((p, i) => (
                  <Box key={i} sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
                    <Input
                      label={i === 0 ? 'Parameter name' : undefined}
                      placeholder="Enter parameter name"
                      value={p.name}
                      onChange={(e) => {
                        const next = [...values.parameters];
                        next[i] = { ...next[i], name: (e.target as HTMLInputElement).value };
                        onChange('parameters', next);
                      }}
                    />
                    <Select
                      label={i === 0 ? 'Parameter value' : undefined}
                      placeholder="Select value"
                      options={VALUE_OPTIONS}
                      value={p.value}
                      onChange={(e) => {
                        const next = [...values.parameters];
                        next[i] = { ...next[i], value: e.target.value as string };
                        onChange('parameters', next);
                      }}
                    />
                  </Box>
                ))
              )}
            </Box>

            <Box sx={{ borderTop: (t) => `1px solid ${t.palette.border.subtle}`, mt: 2.5, pt: 2.5 }}>
              <Card padded={false} sx={{ px: 2, py: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', backgroundColor: '#ffffff' }}>
                <Box sx={{ width: 48, height: 48, borderRadius: '50%', backgroundColor: '#eff6ff', color: '#2563eb', display: 'grid', placeItems: 'center' }}>
                  <FileCode2 size={20} />
                </Box>
                <Typography sx={{ fontSize: 14, fontWeight: 500, color: 'text.primary', mt: 1.5 }}>Add a new parameter</Typography>
                <Typography sx={{ fontSize: 11.5, color: 'text.secondary', mt: 0.5 }}>
                  Pass additional values to the portal at request time.
                </Typography>
                <Button variant="primary" size="sm" sx={{ mt: 1.5 }} onClick={addParameter}>
                  Add Parameter
                </Button>
              </Card>
            </Box>
          </Box>
        </Box>
      </Card>
    </Box>
  );
}
