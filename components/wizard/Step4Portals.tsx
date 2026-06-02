'use client';

import { useState } from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';
import { Check, FileCode2 } from 'lucide-react';

import { Card, Input, Select, Button } from '../';

export interface Step4Values {
  country:          string;
  operator:         string;
  premiumEnabled:   boolean;
  premiumUrl:       string;
  freemiumEnabled:  boolean;
  freemiumUrl:      string;
  parameters:       Array<{ name: string; value: string }>;
}

export interface Step4PortalsProps {
  values:   Step4Values;
  onChange: <K extends keyof Step4Values>(key: K, value: Step4Values[K]) => void;
}

const COUNTRY_OPTIONS  = ['UAE', 'KSA', 'Egypt', 'Kuwait'];
const OPERATOR_OPTIONS = ['Etisalat', 'du', 'STC', 'Mobily', 'Zain', 'Ooredoo', 'Vodafone', 'Orange'];
const VALUE_OPTIONS    = ['Static value', 'Dynamic from request', 'From offer config'];

// ─── Checkbox-expandable URL section ─────────────────────────────────────────

function PortalUrlSection({ label, enabled, url, onToggle, onUrlChange }: {
  label:       string;
  enabled:     boolean;
  url:         string;
  onToggle:    () => void;
  onUrlChange: (v: string) => void;
}) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25 }}>
      <Box
        component="button"
        type="button"
        onClick={onToggle}
        sx={{ all: 'unset', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 1 }}
      >
        <Box sx={{
          width: 16, height: 16, borderRadius: '4px', flexShrink: 0,
          border: '1.5px solid',
          borderColor: enabled ? '#18181b' : '#d4d4d8',
          backgroundColor: enabled ? '#18181b' : 'transparent',
          display: 'grid', placeItems: 'center',
          transition: 'all .1s',
        }}>
          {enabled && <Check size={10} color="#fff" strokeWidth={3} />}
        </Box>
        <Typography sx={{ fontSize: 13.5, fontWeight: 500, color: 'text.primary', userSelect: 'none' }}>
          {label}
        </Typography>
      </Box>
      <Collapse in={enabled}>
        <Input
          placeholder="https://example.com/subscribe"
          value={url}
          onChange={(e) => onUrlChange((e.target as HTMLInputElement).value)}
        />
      </Collapse>
    </Box>
  );
}

// ─── Step4Portals ─────────────────────────────────────────────────────────────

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

          <Box sx={{ borderTop: (t) => `1px solid ${t.palette.border.subtle}` }} />

          {/* Premium URL */}
          <PortalUrlSection
            label="Premium URL"
            enabled={values.premiumEnabled}
            url={values.premiumUrl}
            onToggle={() => onChange('premiumEnabled', !values.premiumEnabled)}
            onUrlChange={(v) => onChange('premiumUrl', v)}
          />

          {/* Freemium URL */}
          <PortalUrlSection
            label="Freemium URL"
            enabled={values.freemiumEnabled}
            url={values.freemiumUrl}
            onToggle={() => onChange('freemiumEnabled', !values.freemiumEnabled)}
            onUrlChange={(v) => onChange('freemiumUrl', v)}
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
