/**
 * Root layout — wraps the entire app in MUI's ThemeProvider so every component
 * (wrapper or raw MUI) renders against our design tokens.
 *
 * `AppRouterCacheProvider` is required for Next 16 App Router + Emotion SSR
 * (MUI's preferred setup). It ensures Emotion's style cache is flushed correctly
 * during server-side rendering — without it you'll see a flash of unstyled
 * content on first paint.
 */

import type { Metadata } from 'next';
import { Providers } from './Providers';
import './globals.css';

export const metadata: Metadata = {
  title:       'DCB Platform',
  description: 'Direct Carrier Billing service management',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
