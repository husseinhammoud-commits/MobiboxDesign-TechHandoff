/**
 * Storybook preview — wraps every story in our ThemeProvider so components
 * render against the design tokens, just like in the app.
 */

import type { Preview } from '@storybook/react';
import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';

import { theme } from '../theme';

const preview: Preview = {
  parameters: {
    actions:    { argTypesRegex: '^on[A-Z].*' },
    controls:   { matchers: { color: /(background|color)$/i, date: /Date$/ } },
    layout:     'centered',
    backgrounds: {
      default: 'app',
      values: [
        { name: 'app',   value: '#fafafa' },
        { name: 'white', value: '#ffffff' },
        { name: 'dark',  value: '#18181b' },
      ],
    },
  },
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={{ padding: 3, fontFamily: 'Inter, sans-serif' }}>
          <Story />
        </Box>
      </ThemeProvider>
    ),
  ],
};

export default preview;
