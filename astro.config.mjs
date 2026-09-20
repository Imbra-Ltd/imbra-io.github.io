// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

import sitemap from '@astrojs/sitemap';

import book from './src/data/book.json' with { type: 'json' };

// The booking page carries noindex until a scheduling URL is configured, so it
// stays out of the sitemap for as long as that holds.
const bookable = book.booking.url !== '';

export default defineConfig({
  site: 'https://imbra.io',
  integrations: [
    react(),
    sitemap({ filter: (page) => bookable || !page.endsWith('/book/') }),
  ],
});