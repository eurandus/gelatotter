import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

// Set `site` to your real domain so canonical + Open Graph URLs resolve.
export default defineConfig({
  site: 'https://example.com',
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
  },
});
