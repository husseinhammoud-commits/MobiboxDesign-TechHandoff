/**
 * Storybook 8 + Vite configuration for the design system.
 *
 * Uses @storybook/react-vite (instead of @storybook/nextjs) so there's no
 * dependency on removed Next.js internals (next/config was dropped in Next 16).
 * next/navigation and next/link are aliased to lightweight mocks so components
 * that import them (e.g. Sidebar) don't crash in Storybook.
 *
 * Run:
 *   npm run storybook       # dev server → http://localhost:6006
 *   npm run build-storybook # static export
 */

import path from 'path';
import react from '@vitejs/plugin-react';
import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../components/stories/**/*.stories.@(ts|tsx|mdx)'],
  addons:  ['@storybook/addon-essentials', '@storybook/addon-a11y'],
  framework: { name: '@storybook/react-vite', options: {} },
  typescript: {
    check: false,
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: { shouldExtractLiteralValuesFromEnum: true },
  },
  docs:  { autodocs: 'tag' },
  async viteFinal(config) {
    // Ensure React automatic JSX transform (needed for React 17+ "no import" JSX)
    config.plugins = [react(), ...(config.plugins ?? [])];
    config.resolve ??= {};
    config.resolve.alias = {
      ...config.resolve.alias,
      // Map Next.js router modules to lightweight stubs
      'next/navigation': path.resolve(__dirname, './mocks/next-navigation.ts'),
      'next/link':       path.resolve(__dirname, './mocks/next-link.tsx'),
      // Also map the @/ alias the components use
      '@/tech-handoff':  path.resolve(__dirname, '..'),
    };
    return config;
  },
};

export default config;
