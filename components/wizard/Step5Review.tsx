'use client';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Check, AlertTriangle, Pencil } from 'lucide-react';

import type { Step1Values } from './Step1Service';
import type { Step2Values } from './Step2Setup';
import type { OfferDraft  } from './Step3Offers';
import type { Step4Values } from './Step4Portals';

export interface Step5ReviewProps {
  step1:    Step1Values;
  step2:    Step2Values;
  offers:   OfferDraft[];
  step4:    Step4Values;
  onJumpTo: (idx: number) => void;
}

interface Section {
  title:     string;
  stepIndex: number;
  issues:    string[];
  detail:    string | null;
}

function buildSections(
  step1: Step1Values, step2: Step2Values,
  offers: OfferDraft[], step4: Step4Values,
): Section[] {
  const serviceIssues: string[] = [];
  if (!step1.name.trim())   serviceIssues.push('Service name is required');
  if (!step1.client.trim()) serviceIssues.push('Client is required');

  const setupIssues: string[] = [];
  if (step2.countries.length === 0) setupIssues.push('No countries selected');
  if (!step2.channelType)           setupIssues.push('No billing channel selected');

  const offersIssues: string[] = [];
  if (offers.length === 0) offersIssues.push('No offers configured');

  const portalsIssues: string[] = [];
  if (!step4.url.trim()) portalsIssues.push('Portal URL is required');

  const uniqueCountries = new Set(
    offers.flatMap((o) => (o.countries ?? []).map((c) => c.countryCode)),
  ).size;
  const totalOperators = offers.reduce(
    (sum, o) => sum + (o.countries ?? []).reduce((s, c) => s + c.operators.length, 0), 0,
  );
  const paramCount = step4.parameters.filter((p) => p.name.trim()).length;

  return [
    {
      title: 'Service', stepIndex: 0, issues: serviceIssues,
      detail: serviceIssues.length === 0
        ? [step1.name, step1.category, step1.client].filter(Boolean).join(' · ')
        : null,
    },
    {
      title: 'Set up', stepIndex: 1, issues: setupIssues,
      detail: setupIssues.length === 0
        ? `${step2.countries.join(', ')} · ${step2.defaultLang} · ${step2.channelType}`
        : null,
    },
    {
      title: 'Offers', stepIndex: 2, issues: offersIssues,
      detail: offersIssues.length === 0
        ? `${offers.length} offer${offers.length !== 1 ? 's' : ''} · ${uniqueCountries} countr${uniqueCountries !== 1 ? 'ies' : 'y'} · ${totalOperators} operator${totalOperators !== 1 ? 's' : ''}`
        : null,
    },
    {
      title: 'Portals', stepIndex: 3, issues: portalsIssues,
      detail: portalsIssues.length === 0
        ? `${step4.url}${paramCount > 0 ? ` · ${paramCount} parameter${paramCount !== 1 ? 's' : ''}` : ''}`
        : null,
    },
  ];
}

export function Step5Review({ step1, step2, offers, step4, onJumpTo }: Step5ReviewProps) {
  const sections  = buildSections(step1, step2, offers, step4);
  const complete  = sections.filter((s) => s.issues.length === 0).length;
  const readiness = Math.round((complete / sections.length) * 100);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>

      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 2 }}>
        <Box>
          <Typography component="h2" sx={{ fontSize: 16, fontWeight: 600, color: 'text.primary' }}>
            Review &amp; launch
          </Typography>
          <Typography sx={{ fontSize: 13, color: 'text.secondary', mt: 0.25 }}>
            Check the service is ready to go live. You can fix anything before launching.
          </Typography>
        </Box>
        <Box sx={{ textAlign: 'right', flexShrink: 0 }}>
          <Typography sx={{ fontSize: 11.5, fontWeight: 500, color: 'text.secondary', textTransform: 'uppercase', letterSpacing: '0.07em' }}>
            Readiness
          </Typography>
          <Typography sx={{ fontSize: 22, fontWeight: 600, color: 'text.primary', fontVariantNumeric: 'tabular-nums', lineHeight: 1.2, mt: 0.25 }}>
            {readiness}%
          </Typography>
        </Box>
      </Box>

      {/* Readiness bar */}
      <Box sx={{ height: 6, borderRadius: 9999, backgroundColor: '#e4e4e7', overflow: 'hidden' }}>
        <Box sx={{ height: '100%', backgroundColor: '#18181b', width: `${readiness}%`, transition: 'width .4s ease' }} />
      </Box>

      {/* Summary card */}
      <Box sx={{
        backgroundColor: '#ffffff',
        border: '1px solid #e4e4e7',
        borderRadius: 3,
        boxShadow: '0 1px 3px rgba(0,0,0,0.07)',
        overflow: 'hidden',
      }}>
        {sections.map((section, i) => {
          const ok = section.issues.length === 0;
          return (
            <Box key={section.title} sx={{
              px: 2.5, py: 2,
              display: 'flex', alignItems: 'flex-start', gap: 2,
              borderTop: i === 0 ? 'none' : '1px solid #f4f4f5',
            }}>

              {/* Status icon */}
              <Box sx={{
                width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
                display: 'grid', placeItems: 'center',
                backgroundColor: ok ? '#ecfdf5' : '#fffbeb',
                border: `1px solid ${ok ? '#d1fae5' : '#fde68a'}`,
                color: ok ? '#059669' : '#d97706',
              }}>
                {ok ? <Check size={14} /> : <AlertTriangle size={14} />}
              </Box>

              {/* Content */}
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography sx={{ fontSize: 13.5, fontWeight: 600, color: 'text.primary' }}>
                    {section.title}
                  </Typography>
                  <Typography sx={{ fontSize: 12, color: ok ? 'text.secondary' : '#b45309' }}>
                    {ok
                      ? 'Complete'
                      : `${section.issues.length} item${section.issues.length !== 1 ? 's' : ''} need attention`}
                  </Typography>
                </Box>
                {section.detail && (
                  <Typography sx={{ fontSize: 12.5, color: '#52525b', mt: 0.25 }}>
                    {section.detail}
                  </Typography>
                )}
                {!ok && (
                  <Box component="ul" sx={{ m: 0, p: 0, listStyle: 'none', mt: 1.5, display: 'flex', flexDirection: 'column', gap: 0.75 }}>
                    {section.issues.map((issue) => (
                      <Box component="li" key={issue} sx={{ display: 'flex', alignItems: 'center', gap: 1, fontSize: 12.5, color: '#3f3f46' }}>
                        <Box sx={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#f59e0b', flexShrink: 0 }} />
                        {issue}
                      </Box>
                    ))}
                  </Box>
                )}
              </Box>

              {/* Action button */}
              <Box
                component="button"
                type="button"
                onClick={() => onJumpTo(section.stepIndex)}
                sx={{
                  all: 'unset', cursor: 'pointer', flexShrink: 0,
                  height: 32, paddingLeft: '10px', paddingRight: '10px',
                  borderRadius: '6px',
                  display: 'inline-flex', alignItems: 'center', gap: '6px',
                  fontSize: 12.5,
                  ...(ok
                    ? { color: '#52525b', '&:hover': { backgroundColor: '#f4f4f5' } }
                    : { backgroundColor: '#18181b', color: '#ffffff', '&:hover': { backgroundColor: '#27272a' } }),
                  transition: 'background-color .1s',
                }}
              >
                <Pencil size={13} />
                {ok ? 'Edit' : 'Fix'}
              </Box>
            </Box>
          );
        })}
      </Box>

    </Box>
  );
}
