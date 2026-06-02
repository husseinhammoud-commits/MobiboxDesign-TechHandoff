/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    // MUI v6 ships ESM modules — Next 16 handles them natively, but explicitly
    // listing them here can help with tree-shaking.
    optimizePackageImports: ['@mui/material', '@mui/icons-material', 'lucide-react'],
  },
};

module.exports = nextConfig;
