/**
 * ServiceCard — the composite card used in the services overview grid.
 *
 * Built from primitives (Card, Avatar, StatusPill, Menu) — this is exactly the
 * pattern the design system encourages: composites are pure compositions of
 * primitives, no new styling tokens. If you find yourself adding hex codes
 * here, that color belongs in design-tokens.ts.
 *
 * Clicking anywhere on the card (except the 3-dot menu) fires `onOpen`.
 * The menu actions are wired via the props rather than baked in, so the same
 * card can be reused in a different context with different menu items.
 */

'use client';

import { MouseEvent } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { MoreHorizontal, Banknote, Link as LinkIcon, Archive, Trash2 } from 'lucide-react';

import { Card, StatusPill, Avatar, Menu, useMenu, IconButton } from './';
import type { Service } from '@/tech-handoff/lib/mock-services';

export interface ServiceCardProps {
  service:           Service;
  onOpen?:           (service: Service) => void;
  onViewPayout?:     (service: Service) => void;
  onGenerateTestLink?: (service: Service) => void;
  onArchive?:        (service: Service) => void;
  onDelete?:         (service: Service) => void;
  isArchived?:       boolean;
}

export function ServiceCard({
  service, onOpen, onViewPayout, onGenerateTestLink, onArchive, onDelete, isArchived = false,
}: ServiceCardProps) {
  const { anchor, open, openMenu, closeMenu } = useMenu();

  const handleCardClick = (e: MouseEvent<HTMLDivElement>) => {
    // Don't open the card when the click is on the menu button
    if ((e.target as HTMLElement).closest('[data-card-menu-trigger]')) return;
    onOpen?.(service);
  };

  return (
    <Card hoverable padded onClick={handleCardClick} aria-label={`Open ${service.name}`}>
      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.25, mb: 1.5 }}>
        <Avatar name={service.name} />
        <Box sx={{ minWidth: 0, flex: 1 }}>
          <Typography sx={{
            fontSize: 14.5, fontWeight: 600, color: 'text.primary',
            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
          }}>
            {service.name}
          </Typography>
          <Typography sx={{
            fontSize: 12, color: 'text.secondary', mt: 0.25,
            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
          }}>
            {service.client}
          </Typography>
        </Box>
        <StatusPill status={service.status} />
        <IconButton
          size="sm"
          aria-label="More actions"
          data-card-menu-trigger
          onClick={openMenu}
        >
          <MoreHorizontal size={16} />
        </IconButton>
      </Box>

      {/* Info rows */}
      <Box component="dl" sx={{ display: 'flex', flexDirection: 'column', gap: 0.75, fontSize: 12.5, m: 0 }}>
        <InfoRow label="Service ID" value={<code style={{ fontSize: 12, fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace' }}>{service.serviceId}</code>} />
        <InfoRow label="Category"   value={service.category} />
        <InfoRow label="Created"    value={<span style={{ color: 'var(--mui-palette-text-disabled, #a1a1aa)' }}>{service.dateCreated}</span>} />
      </Box>

      {/* 3-dot menu */}
      <Menu anchorEl={anchor} open={open} onClose={closeMenu}>
        <Menu.Item icon={<Banknote size={14} />} onClick={() => { closeMenu(); onViewPayout?.(service); }}>
          View payout
        </Menu.Item>
        <Menu.Item icon={<LinkIcon size={14} />} onClick={() => { closeMenu(); onGenerateTestLink?.(service); }}>
          Generate testing link
        </Menu.Item>
        <Menu.Item icon={<Archive size={14} />}  onClick={() => { closeMenu(); onArchive?.(service); }}>
          {isArchived ? 'Restore from archive' : 'Archive'}
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item icon={<Trash2 size={14} />}  variant="danger" onClick={() => { closeMenu(); onDelete?.(service); }}>
          Delete service
        </Menu.Item>
      </Menu>
    </Card>
  );
}

function InfoRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 1 }}>
      <Box component="dt" sx={{ color: 'text.secondary' }}>{label}</Box>
      <Box component="dd" sx={{ m: 0, color: 'text.primary', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
        {value}
      </Box>
    </Box>
  );
}
