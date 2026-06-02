/**
 * BarChart — pure-CSS vertical bar chart with hover tooltip that follows
 * the cursor across the chart area.
 *
 * Built without Recharts/D3 — the dataset is small (5–10 bars typical),
 * and a tiny CSS implementation gives us full control over styling,
 * animations, and tooltip behavior. Swap for Recharts later if we need
 * axes, multi-series, or interactive zoom.
 *
 * Bars animate in on mount (scaleY 0→1 over 400ms), so changing the
 * dataset (e.g., chart-metric tab change) replays the animation.
 *
 * Usage:
 *   <BarChart
 *     data={[{ name: 'UAE', value: 3.70 }, { name: 'SA', value: 4.50 }, ...]}
 *     formatValue={(v) => `$${v.toFixed(2)}`}
 *     height={240}
 *   />
 */

'use client';

import { useState, useRef, useEffect, useMemo } from 'react';
import Box from '@mui/material/Box';

const DEFAULT_PALETTE = ['#3b82f6', '#6366f1', '#8b5cf6', '#ec4899', '#f43f5e', '#f97316'];

export interface BarChartDatum {
  name:  string;
  value: number;
}

export interface BarChartProps {
  data:           BarChartDatum[];
  /** ms — animation duration on mount + reseed. Default 420. */
  animateMs?:     number;
  /** Chart area height in px. Default 240. */
  height?:        number;
  /** Format the displayed value (in the tooltip + above each bar). */
  formatValue?:   (n: number) => string;
  /** Override the color palette (cycles per bar). */
  palette?:       string[];
  /** Hide the static value labels above each bar (tooltip only). Default false. */
  hideBarLabels?: boolean;
  /** Hide the x-axis labels below each bar. Default false. */
  hideAxisLabels?:boolean;
}

export function BarChart({
  data, animateMs = 420, height = 240, formatValue = (n) => String(n),
  palette = DEFAULT_PALETTE, hideBarLabels = false, hideAxisLabels = false,
}: BarChartProps) {
  const maxVal = useMemo(() => Math.max(1, ...data.map((d) => d.value)), [data]);
  const [tooltip, setTooltip] = useState<{ x: number; y: number; name: string; value: string } | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Replay enter animation when the dataset changes (e.g., chart-metric tab swap)
  const [animKey, setAnimKey] = useState(0);
  useEffect(() => { setAnimKey((k) => k + 1); }, [data]);

  if (data.length === 0) {
    return (
      <Box sx={{ height, display: 'grid', placeItems: 'center', fontSize: 12.5, color: 'text.disabled', borderBottom: (t) => `1px solid ${t.palette.border.subtle}` }}>
        No data for the current filters.
      </Box>
    );
  }

  return (
    <Box>
      {/* Chart area */}
      <Box
        ref={containerRef}
        sx={{
          position: 'relative',
          height, width: '100%',
          display: 'flex', alignItems: 'flex-end', gap: 1.5,
          paddingInline: 1,
          borderBottom: (t) => `1px solid ${t.palette.border.subtle}`,
        }}
        onMouseMove={(e) => {
          const cell = (e.target as HTMLElement).closest<HTMLElement>('[data-bar-cell]');
          if (!cell || !containerRef.current) { setTooltip(null); return; }
          const idx = Number(cell.dataset.barIdx);
          const d = data[idx];
          if (!d) { setTooltip(null); return; }
          const rect = containerRef.current.getBoundingClientRect();
          setTooltip({
            x:     e.clientX - rect.left,
            y:     e.clientY - rect.top,
            name:  d.name,
            value: formatValue(d.value),
          });
        }}
        onMouseLeave={() => setTooltip(null)}
      >
        {/* Cursor-tracking tooltip */}
        {tooltip && (
          <Tooltip x={tooltip.x} y={tooltip.y} containerWidth={containerRef.current?.clientWidth ?? 0} name={tooltip.name} value={tooltip.value} />
        )}

        {data.map((d, i) => {
          const pct = Math.max(4, (d.value / maxVal) * 100);
          const color = palette[i % palette.length];
          return (
            <Box
              key={`${d.name}-${i}`}
              data-bar-cell
              data-bar-idx={i}
              sx={{
                flex: 1, height: '100%',
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end',
                cursor: 'default',
              }}
            >
              {!hideBarLabels && (
                <Box sx={{ fontSize: 11, color: 'text.secondary', fontVariantNumeric: 'tabular-nums', mb: 0.5 }}>
                  {formatValue(d.value)}
                </Box>
              )}
              <Box
                key={`bar-${animKey}-${i}`}
                sx={{
                  width: '100%', height: `${pct}%`,
                  borderRadius: '6px 6px 0 0',
                  backgroundColor: color,
                  transformOrigin: 'bottom',
                  animation: `barGrow ${animateMs}ms cubic-bezier(0.4, 0, 0.2, 1) both`,
                  '@keyframes barGrow': {
                    from: { transform: 'scaleY(0)', opacity: 0 },
                    to:   { transform: 'scaleY(1)', opacity: 1 },
                  },
                }}
              />
            </Box>
          );
        })}
      </Box>

      {/* X-axis labels */}
      {!hideAxisLabels && (
        <Box sx={{ display: 'flex', gap: 1.5, paddingInline: 1, mt: 1 }}>
          {data.map((d, i) => (
            <Box
              key={`label-${i}`}
              sx={{
                flex: 1, textAlign: 'center', fontSize: 11.5, color: 'text.secondary',
                overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
              }}
            >
              {d.name}
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
}

// ----- internal -----------------------------------------------------------

function Tooltip({ x, y, containerWidth, name, value }: { x: number; y: number; containerWidth: number; name: string; value: string }) {
  // Position above-right of cursor; flip if it would overflow
  const TW = 90, TH = 50, OFFSET = 14;
  let left = x + OFFSET;
  if (left + TW > containerWidth - 4) left = x - TW - OFFSET;
  let top = y - TH - 10;
  if (top < 4) top = y + 18;
  return (
    <Box
      sx={{
        position: 'absolute', left, top, zIndex: 10,
        pointerEvents: 'none',
        backgroundColor: 'text.primary', color: '#fff',
        paddingInline: 1.5, paddingBlock: 0.75,
        borderRadius: 1,
        boxShadow: (t) => t.shadows[3],
        whiteSpace: 'nowrap',
        animation: 'tipFade 120ms ease-out',
        '@keyframes tipFade': { from: { opacity: 0 }, to: { opacity: 1 } },
      }}
    >
      <Box sx={{ fontSize: 10, color: 'rgba(255,255,255,0.65)', textTransform: 'uppercase', letterSpacing: 0.5 }}>{name}</Box>
      <Box sx={{ fontSize: 14, fontWeight: 600, fontVariantNumeric: 'tabular-nums', lineHeight: 1.2 }}>{value}</Box>
    </Box>
  );
}
