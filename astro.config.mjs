// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// Static output, deployed to GitHub Pages (custom domain prodory.com, see public/CNAME).
export default defineConfig({
  site: 'https://prodory.com',
  output: 'static',
  trailingSlash: 'always',
  integrations: [sitemap({ filter: (page) => !page.includes('/thank-you/') })],
  vite: {
    plugins: [tailwindcss()],
  },
});
