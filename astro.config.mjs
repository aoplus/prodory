// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

// Static output, deployed to Cloudflare Pages (project "prodory"). Pages Functions in functions/ handle /api/*.
export default defineConfig({
  site: 'https://prodory.com',
  output: 'static',
  trailingSlash: 'always',
  integrations: [
    react(),
    sitemap({ filter: (page) => !page.includes('/thank-you/') && !page.includes('/404') }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
