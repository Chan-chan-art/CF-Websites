// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import mdx from '@astrojs/mdx';


import icon from 'astro-icon';


// https://astro.build/config
export default defineConfig({
  integrations: [icon()],
  vite: {
    plugins: [tailwindcss()]
  },

  output: 'server',
  site: 'https://yourdomain.com', // Change this to your actual deployed website URL
});